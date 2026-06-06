import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'

function getMailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function GET(req: NextRequest) {
  // Sécurité : Vercel envoie ce header sur les cron jobs
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const db = supabaseAdmin()

  // Trouve les RDV dans 24h (+/- 1h de marge) pas encore rappelés
  const now = new Date()
  const in23h = new Date(now.getTime() + 23 * 60 * 60 * 1000)
  const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000)

  const dateFrom = in23h.toISOString().split('T')[0]
  const dateTo = in25h.toISOString().split('T')[0]
  const timeFrom = in23h.toTimeString().slice(0, 8)
  const timeTo = in25h.toTimeString().slice(0, 8)

  const { data: bookings, error } = await db
    .from('bookings')
    .select('*, availabilities(date, start_time, duration)')
    .eq('status', 'confirmed')
    .eq('reminder_sent', false)
    .gte('availabilities.date', dateFrom)
    .lte('availabilities.date', dateTo)

  if (error) {
    console.error('[cron/reminders]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!bookings || bookings.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  const transporter = getMailTransporter()
  let sent = 0

  for (const booking of bookings) {
    const avail = booking.availabilities
    if (!avail) continue

    const rdvDate = new Date(`${avail.date}T${avail.start_time}`)

    // Double vérification de la fenêtre 24h
    const diff = rdvDate.getTime() - now.getTime()
    if (diff < 23 * 3600 * 1000 || diff > 25 * 3600 * 1000) continue

    const dateFormatted = rdvDate.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    })

    try {
      await transporter.sendMail({
        from: `Doctobike <${process.env.GMAIL_USER}>`,
        to: booking.client_email,
        subject: '⏰ Rappel — Votre rendez-vous Doctobike demain',
        html: `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:24px;font-weight:700;color:#185FA5;">Doctobike</span>
          </div>
          <h2 style="color:#042C53;">Rappel de rendez-vous 🔧</h2>
          <p>Bonjour <strong>${booking.client_name}</strong>,</p>
          <p>Votre séance de réparation vélo en visio est <strong>demain</strong> :</p>
          <div style="background:#E6F1FB;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="margin:0;font-size:18px;font-weight:600;color:#042C53;">📅 ${dateFormatted}</p>
            ${booking.meet_link ? `<p style="margin:8px 0 0;"><a href="${booking.meet_link}" style="color:#185FA5;">🎥 Rejoindre la visio</a></p>` : ''}
          </div>
          <p style="color:#666;font-size:13px;">Pensez à avoir votre vélo à portée de main et une bonne connexion internet.</p>
          <p style="color:#666;font-size:13px;">⚠️ Ce rendez-vous est dans moins de 24h et ne peut plus être annulé.</p>
        </div>`,
      })

      await db
        .from('bookings')
        .update({ reminder_sent: true })
        .eq('id', booking.id)

      sent++
    } catch (mailErr) {
      console.error(`[cron/reminders] Erreur email pour ${booking.client_email}:`, mailErr)
    }
  }

  return NextResponse.json({ sent })
}
