'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Slot = { id: string; date: string; start_time: string; duration: number }
type Confirmed = { booking_id: string; meet_link: string | null; date: string; start_time: string; cancel_token?: string }

const font = "'Nunito', sans-serif"

const PACKS = {
  decouverte: { name: 'Pack Découverte', price: 30, priceCents: 3000, duration: 40, label: '30€ · 40 min' },
  depannage:  { name: 'Pack Dépannage',  price: 45, priceCents: 4500, duration: 60, label: '45€ · Entre 45 min et 1h' },
  expert:     { name: 'Pack Expert',     price: 90, priceCents: 9000, duration: 120, label: '90€ · Jusqu\'à 2h' },
} as const

type PackKey = keyof typeof PACKS

function buildGoogleCalendarUrl(date: string, startTime: string, meetLink: string | null, durationMinutes: number) {
  const start = new Date(`${date}T${startTime}`).toISOString().replace(/-|:|\.\d\d\d/g, '')
  const end = new Date(new Date(`${date}T${startTime}`).getTime() + durationMinutes * 60000).toISOString().replace(/-|:|\.\d\d\d/g, '')
  const title = encodeURIComponent('🔧 Réparation vélo — Doctobike')
  const details = encodeURIComponent(`Réparation visio avec Damien${meetLink ? `\n\nLien Meet : ${meetLink}` : ''}`)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`
}

function BookingForm() {
  const searchParams = useSearchParams()
  const packParam = searchParams.get('pack') as PackKey | null
  const selectedPack = packParam && PACKS[packParam] ? PACKS[packParam] : PACKS.depannage
  const selectedPackKey = packParam && PACKS[packParam] ? packParam : 'depannage'

  const stripe = useStripe()
  const elements = useElements()
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null)

  useEffect(() => {
    fetch('/api/availabilities')
      .then(r => r.json())
      .then(data => setSlots(Array.isArray(data) ? data : []))
  }, [])

  const byDate = slots.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {} as Record<string, Slot[]>)

  const handleBook = async () => {
    if (!selectedSlot || !stripe || !elements) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          availability_id: selectedSlot.id,
          client_name: `${form.firstName} ${form.lastName}`,
          client_email: form.email,
          problem_description: form.description,
          pack: selectedPackKey,
          pack_name: selectedPack.name,
          pack_duration: selectedPack.duration,
          pack_price_cents: selectedPack.priceCents,
        }),
      })
      const data = await res.json()

      if (!data.client_secret) {
        setError(data.error || 'Erreur lors de la réservation.')
        setLoading(false)
        return
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { error: stripeError } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: `${form.firstName} ${form.lastName}`, email: form.email },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Erreur de paiement.')
        setLoading(false)
        return
      }

      setConfirmed({
        booking_id: data.booking_id,
        meet_link: data.meet_link,
        date: selectedSlot.date,
        start_time: selectedSlot.start_time,
        cancel_token: data.cancel_token,
      })
      setStep(4)
    } catch {
      setError('Une erreur est survenue.')
    }
    setLoading(false)
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const formatTime = (t: string) => t.slice(0, 5)

  if (step === 4 && confirmed) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <main style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32, border: '2px solid #B5D4F4' }}>✓</div>
        <h1 style={{ color: '#042C53', fontWeight: 700, fontFamily: font, marginBottom: 8 }}>Réservation confirmée !</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>Un email de confirmation a été envoyé à <strong>{form.email}</strong></p>

        <div style={{ background: '#E6F1FB', borderRadius: 12, padding: 16, marginBottom: 8, textAlign: 'left' }}>
          <p style={{ color: '#185FA5', fontWeight: 700, margin: '0 0 4px', textTransform: 'capitalize' }}>📅 {formatDate(confirmed.date)}</p>
          <p style={{ color: '#185FA5', fontWeight: 600, margin: '0 0 4px' }}>🕐 {formatTime(confirmed.start_time)}</p>
          <p style={{ color: '#185FA5', fontWeight: 600, margin: 0 }}>📦 {selectedPack.name} — {selectedPack.label}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {confirmed.meet_link && (
            <a href={confirmed.meet_link} target="_blank" rel="noreferrer"
              style={{ display: 'block', background: '#185FA5', color: 'white', padding: '14px 20px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
              🎥 Rejoindre la visio
            </a>
          )}
          <a href={buildGoogleCalendarUrl(confirmed.date, confirmed.start_time, confirmed.meet_link, selectedPack.duration)}
            target="_blank" rel="noreferrer"
            style={{ display: 'block', background: 'white', color: '#185FA5', padding: '14px 20px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700, border: '2px solid #B5D4F4' }}>
            📆 Ajouter à Google Calendar
          </a>
          {confirmed.cancel_token && (
            <a href={`/cancel/${confirmed.cancel_token}`}
              style={{ display: 'block', background: 'none', color: '#999', padding: '10px 20px', borderRadius: 12, textDecoration: 'none', fontSize: 13 }}>
              Annuler ce rendez-vous
            </a>
          )}
        </div>

        <button onClick={() => { setStep(1); setSelectedSlot(null); setConfirmed(null) }}
          style={{ background: 'none', border: '1px solid #ccc', padding: '10px 20px', borderRadius: 12, cursor: 'pointer', color: '#666', fontFamily: font }}>
          Nouvelle réservation
        </button>
      </main>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

      {step === 1 && (
        <div style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '32px 20px', textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 8, fontWeight: 600 }}>Réparation online</p>
          <h1 style={{ fontFamily: font, fontSize: 24, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>Réparez votre vélo depuis chez vous</h1>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px', fontSize: 14, color: '#FAC775', fontWeight: 700 }}>
            📦 {selectedPack.name} — {selectedPack.label}
          </div>
        </div>
      )}

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '24px 20px' }}>

        {step === 1 && (
          <div>
            <h2 style={{ color: '#042C53', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Créneaux disponibles</h2>
            {Object.keys(byDate).length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888', background: 'white', borderRadius: 16, border: '1px solid #E6F1FB' }}>
                Aucun créneau disponible pour le moment.
              </div>
            )}
            {Object.entries(byDate).sort().map(([date, daySlots]) => (
              <div key={date} style={{ background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', padding: 20, marginBottom: 12 }}>
                <p style={{ fontWeight: 700, color: '#185FA5', marginBottom: 12, textTransform: 'capitalize', fontSize: 15 }}>📅 {formatDate(date)}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {daySlots.map(slot => (
                    <button key={slot.id} onClick={() => { setSelectedSlot(slot); setStep(2) }}
                      style={{ padding: '10px 18px', borderRadius: 10, border: '2px solid #B5D4F4', background: '#E6F1FB', color: '#042C53', cursor: 'pointer', fontSize: 14, fontWeight: 700, fontFamily: font }}>
                      {formatTime(slot.start_time)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && selectedSlot && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', padding: 24 }}>
            <div style={{ background: '#E6F1FB', borderRadius: 10, padding: 12, marginBottom: 20, textAlign: 'center' }}>
              <p style={{ color: '#185FA5', fontWeight: 700, margin: '0 0 4px', textTransform: 'capitalize' }}>📅 {formatDate(selectedSlot.date)} à {formatTime(selectedSlot.start_time)}</p>
              <p style={{ color: '#185FA5', fontWeight: 600, margin: 0, fontSize: 13 }}>📦 {selectedPack.name} — {selectedPack.label}</p>
            </div>
            <h2 style={{ color: '#042C53', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Vos coordonnées</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Prénom</label>
                  <input placeholder="Marie" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Nom</label>
                  <input placeholder="Laurent" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font, boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Email</label>
                <input placeholder="marie@exemple.fr" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Décrivez votre panne</label>
                <textarea placeholder="Ex: Mon dérailleur arrière saute des vitesses..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={4} style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', resize: 'vertical', fontFamily: font, boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={() => setStep(1)} style={{ padding: '10px 20px', borderRadius: 10, border: '1.5px solid #ddd', background: 'white', cursor: 'pointer', color: '#666', fontFamily: font }}>← Retour</button>
              <button onClick={() => setStep(3)} disabled={!form.firstName || !form.lastName || !form.email}
                style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', flex: 1, fontSize: 14, fontWeight: 700, fontFamily: font }}>
                Continuer →
              </button>
            </div>
          </div>
        )}

        {step === 3 && selectedSlot && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', padding: 24 }}>
            <h2 style={{ color: '#042C53', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Paiement sécurisé</h2>
            <div style={{ background: '#F8FAFF', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E6F1FB' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Date</span>
                <span style={{ fontSize: 14, fontWeight: 700, textTransform: 'capitalize' }}>{formatDate(selectedSlot.date)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E6F1FB' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Heure</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{formatTime(selectedSlot.start_time)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E6F1FB' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Pack</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#185FA5' }}>{selectedPack.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#185FA5', fontFamily: font }}>{selectedPack.price}€</span>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 8, fontWeight: 600 }}>Carte bancaire</label>
              <div style={{ padding: '12px 14px', borderRadius: 10, border: '1.5px solid #ddd', background: 'white' }}>
                <CardElement options={{ style: { base: { fontSize: '15px', color: '#042C53', fontFamily: font, '::placeholder': { color: '#aaa' } } } }} />
              </div>
            </div>

            {error && <p style={{ color: '#E24B4A', fontSize: 13, marginBottom: 12 }}>{error}</p>}

            <div style={{ background: '#FFF8E6', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: '#856404', border: '1px solid #FAC775' }}>
              🔒 Votre carte est autorisée maintenant mais débitée uniquement après la réparation.
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ padding: '10px 20px', borderRadius: 10, border: '1.5px solid #ddd', background: 'white', cursor: 'pointer', color: '#666', fontFamily: font }}>← Retour</button>
              <button onClick={handleBook} disabled={loading || !stripe}
                style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', flex: 1, fontSize: 14, fontWeight: 700, fontFamily: font }}>
                {loading ? 'Traitement...' : `🔒 Confirmer — ${selectedPack.price}€`}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function BookingPageInner() {
  return (
    <Elements stripe={stripePromise}>
      <BookingForm />
    </Elements>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185FA5', fontFamily: "'Nunito', sans-serif" }}>Chargement...</div>}>
      <BookingPageInner />
    </Suspense>
  )
}
