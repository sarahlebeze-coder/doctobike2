import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { google } from 'googleapis'
import { supabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

function getGoogleAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return oauth2
}

function getMailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json() as { token: string }

    if (!token) {
      return NextResponse.json({ error: 'Token manquant.' }, { status: 400 })
    }

    const db = supabaseAdmin()

    // Récupère la réservation via le token
    const { data: booking, error } = await db
      .from('bookings')
      .select('*, availabilities(date, start_time)')
      .eq('cancel_token', token)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Lien d\'annulation invalide.' }, { status: 404 })
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json({ error: 'Ce rendez-vous est déjà annulé.' }, { status: 400 })
    }

    if (booking.status === 'completed') {
      return NextResponse.json({ error: 'Ce rendez-vous est terminé et ne peut pas être annulé.' }, { status: 400 })
    }

    // Vérifie la règle des 24h
    const rdvDate = new Date(`${booking.availabilities.date}T${booking.availabilities.start_time}`)
    const now = new Date()
    const heuresRestantes = (rdvDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (heuresRestantes < 24) {
      return NextResponse.json({ error: 'Ce rendez-vous est dans moins de 24h et ne peut plus être annulé.' }, { status: 403 })
    }

    // 1. Libère l'autorisation Stripe
    await stripe.paymentIntents.cancel(booking.stripe_payment_intent)

    // 2. Supprime l'événement Google Calendar
    if (booking.google_event_id) {
      try {
        const auth = getGoogleAuth()
        const calendar = google.calendar({ version: 'v3', auth })
        await calendar.events.delete({
          calendarId: process.env.GOOGLE_CALENDAR_ID ?? 'primary',
          eventId: booking.google_event_id,
        })
      } catch (calErr) {
        console.error('[cancel] Erreur suppression Calendar:', calErr)
        // On continue même si Calendar échoue
      }
    }

    // 3. Remet le slot disponible
    await db
      .from('availabilities')
      .update({ is_active: true })
      .eq('id', booking.availability_id)

    // 4. Met à jour la réservation
    await db
      .from('bookings')
      .update({ status: 'cancelled', stripe_status: 'refunded' })
      .eq('id', booking.id)

    // 5. Emails de notification
    const dateFormatted = rdvDate.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    })

    const transporter = getMailTransporter()

    await transporter.sendMail({
      from: `Doctobike <${process.env.GMAIL_USER}>`,
      to: booking.client_email,
      subject: '❌ Votre rendez-vous Doctobike a été annulé',
      html: `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:24px;font-weight:700;color:#185FA5;">Doctobike</span>
        </div>
        <h2 style="color:#042C53;">Rendez-vous annulé</h2>
        <p>Bonjour <strong>${booking.client_name}</strong>,</p>
        <p>Votre rendez-vous du <strong>${dateFormatted}</strong> a bien été annulé.</p>
        <p style="color:#666;font-size:13px;">Aucun débit n'a été effectué sur votre carte.</p>
        <p>Pour reprendre un rendez-vous : <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://doctobike.vercel.app'}/booking" style="color:#185FA5;">Réserver une nouvelle séance</a></p>
      </div>`,
    })

    await transporter.sendMail({
      from: `Doctobike <${process.env.GMAIL_USER}>`,
      to: process.env.REPAIRER_EMAIL!,
      subject: `❌ RDV annulé — ${booking.client_name} — ${dateFormatted}`,
      html: `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;">
        <h2 style="color:#042C53;">Rendez-vous annulé ❌</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;">Client</td><td><strong>${booking.client_name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td>${booking.client_email}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Date annulée</td><td><strong>${dateFormatted}</strong></td></tr>
        </table>
        <p style="color:#666;font-size:13px;">Le créneau a été remis disponible automatiquement.</p>
      </div>`,
    })

    return NextResponse.json({ success: true })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    console.error('[bookings/cancel]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
