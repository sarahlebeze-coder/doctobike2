import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type BookingRow = {
  id: string
  stripe_payment_intent: string | null
  stripe_status: string
}

export async function POST(req: NextRequest) {
  try {
    const { booking_id } = await req.json() as { booking_id: string }
    const db = supabaseAdmin()

    const result = await db
      .from('bookings')
      .select('id, stripe_payment_intent, stripe_status')
      .eq('id', booking_id)
      .single()

    if (result.error || !result.data) {
      return NextResponse.json({ error: 'Réservation introuvable' }, { status: 404 })
    }

    const booking = result.data as BookingRow

    if (booking.stripe_status === 'captured') {
      return NextResponse.json({ error: 'Déjà capturé' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.capture(booking.stripe_payment_intent!)

    await db
      .from('bookings')
      .update({ stripe_status: 'captured', status: 'completed' })
      .eq('id', booking_id)

    return NextResponse.json({ success: true, amount: paymentIntent.amount_received })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
