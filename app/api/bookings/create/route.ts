import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { google } from 'googleapis'
import { supabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type SlotRow = {
  id: string
  date: string
  start_time: string
  duration: number
  is_active: boolean
}

type SettingRow = {
  key: string
  value: string
}

type BookingInsert = {
  id: string
}

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
    const body = await req.json() as {
      availability_id: string
      client_name: string
      client_email: string
      problem_description?: string
    }
    const { availability_id, client_name, client_email, problem_description } = body

    const db = supabaseAdmin()

    const slotResult = await db
      .from('availabilities')
      .select('id, date, start_time, duration, is_active')
      .eq('id', availability_id)
      .eq('is_active', true)
      .single()

    if (slotResult.error || !slotResult.data) {
      return NextResponse.json({ error: 'Ce créneau n\'est plus disponible.' }, { status: 409 })
    }

    const slot = slotResult.data as SlotRow

    const settingsResult = await db.from('settings').select('key, value')
    const settings = (settingsResult.data ?? []) as SettingRow[]
    const priceCents = parseInt(settings.find(s => s.key === 'price_cents')?.value ?? '4500')
    const repairerName = settings.find(s => s.key === 'repairer_name')?.value ?? 'Damien'

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceCents,
      currency: 'eur',
      capture_method: 'manual',
      payment_method_types: ['card'],
      metadata: { availability_id, client_email, client_name },
      description: `Doctobike — ${client_name} — ${slot.date} ${slot.start_time}`,
    })

    const auth = getGoogleAuth()
    const calendar = google.calendar({ version: 'v3', auth })
    const startDateTime = new Date(`${slot.date}T${slot.start_time}`)
    const endDateTime = new Date(startDateTime.getTime() + slot.duration * 60000)

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID ?? 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `🔧 Doctobike — ${client_name}`,
        description: `Réparation visio\nProblème : ${problem_description ?? 'Non précisé'}\nClient : ${client_email}`,
        start: { dateTime: startDateTime.toISOString(), timeZone: 'Europe/Paris' },
        end: { dateTime: endDateTime.toISOString(), timeZone: 'Europe/Paris' },
        attendees: [
          { email: client_email },
          { email: process.env.REPAIRER_EMAIL! },
        ],
        conferenceData: {
          createRequest: {
            requestId: `doctobike-${availability_id}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      },
    })

    const meetLink = event.data.conferenceData?.entryPoints?.[0]?.uri ?? null
    const googleEventId = event.data.id ?? null

    const bookingResult = await db.from('bookings').insert({
      availability_id,
      client_name,
      client_email,
      problem_description: problem_description ?? null,
      status: 'confirmed',
      stripe_payment_intent: paymentIntent.id,
      stripe_status: 'authorized',
      amount_cents: priceCents,
      google_event_id: googleEventId,
      meet_link: meetLink,
    }).select('id').single()

    if (bookingResult.error) throw bookingResult.error

    const booking = bookingResult.data as BookingInsert

    await db.rpc('book_slot', { p_availability_id: availability_id })

    const dateFormatted = new Date(`${slot.date}T${slot.start_time}`).toLocaleString('fr-FR', {
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
      to: client_email,
      subject: '✅ Votre rendez-vous Doctobike est confirmé',
      html: emailClientHTML({ client_name, dateFormatted, meetLink, repairerName, problem_description }),
    })

    await transporter.sendMail({
      from: `Doctobike <${process.env.GMAIL_USER}>`,
      to: process.env.REPAIRER_EMAIL!,
      subject: `📅 Nouveau RDV — ${client_name} — ${dateFormatted}`,
      html: emailRepairerHTML({ client_name, client_email, dateFormatted, meetLink, problem_description }),
    })

    return NextResponse.json({
      booking_id: booking.id,
      client_secret: paymentIntent.client_secret,
      meet_link: meetLink,
    })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    console.error('[bookings/create]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function emailClientHTML(p: {
  client_name: string
  dateFormatted: string
  meetLink: string | null
  repairerName: string
  problem_description?: string
}) {
  return `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;">
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:24px;font-weight:700;color:#185FA5;">Doctobike</span>
    </div>
    <h2 style="color:#042C53;">Votre rendez-vous est confirmé !</h2>
    <p>Bonjour <strong>${p.client_name}</strong>,</p>
    <p>Votre séance avec ${p.repairerName} est réservée pour :</p>
    <div style="background:#E6F1FB;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0;font-size:18px;font-weight:600;color:#042C53;">📅 ${p.dateFormatted}</p>
      ${p.meetLink ? `<p style="margin:8px 0 0;"><a href="${p.meetLink}" style="color:#185FA5;">🎥 Rejoindre la visio</a></p>` : ''}
    </div>
    ${p.problem_description ? `<p><strong>Problème :</strong> ${p.problem_description}</p>` : ''}
    <p style="color:#666;font-size:13px;">Votre carte sera débitée uniquement après la réparation.</p>
  </div>`
}

function emailRepairerHTML(p: {
  client_name: string
  client_email: string
  dateFormatted: string
  meetLink: string | null
  problem_description?: string
}) {
  return `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;">
    <h2 style="color:#042C53;">Nouveau rendez-vous 🔧</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#666;">Client</td><td><strong>${p.client_name}</strong></td></tr>
      <tr><td style="padding:8px 0;color:#666;">Email</td><td>${p.client_email}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Date</td><td><strong>${p.dateFormatted}</strong></td></tr>
      <tr><td style="padding:8px 0;color:#666;">Problème</td><td>${p.problem_description ?? 'Non précisé'}</td></tr>
      ${p.meetLink ? `<tr><td style="padding:8px 0;color:#666;">Meet</td><td><a href="${p.meetLink}">${p.meetLink}</a></td></tr>` : ''}
    </table>
  </div>`
}
