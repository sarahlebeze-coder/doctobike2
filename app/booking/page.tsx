'use client'

import { useEffect, useState } from 'react'

type Slot = { id: string; date: string; start_time: string; duration: number }
type Confirmed = { booking_id: string; meet_link: string | null }

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', description: '' })
  const [loading, setLoading] = useState(false)
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
    if (!selectedSlot) return
    setLoading(true)
    const res = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        availability_id: selectedSlot.id,
        client_name: `${form.firstName} ${form.lastName}`,
        client_email: form.email,
        problem_description: form.description,
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.booking_id) {
      setConfirmed(data as Confirmed)
      setStep(4)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const formatTime = (t: string) => t.slice(0, 5)

  if (step === 4 && confirmed) return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 500, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
      <h1 style={{ color: '#042C53', fontWeight: 400, marginBottom: 8 }}>Réservation confirmée !</h1>
      <p style={{ color: '#666', marginBottom: 20 }}>Email envoyé à <strong>{form.email}</strong></p>
      {confirmed.meet_link && (
        <a href={confirmed.meet_link} target="_blank" rel="noreferrer" style={{ display: 'block', background: '#E6F1FB', color: '#185FA5', padding: '12px 20px', borderRadius: 8, textDecoration: 'none', marginBottom: 20 }}>
          🎥 Rejoindre la visio
        </a>
      )}
      <button onClick={() => { setStep(1); setSelectedSlot(null); setConfirmed(null) }}
        style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}>
        Nouvelle réservation
      </button>
    </main>
  )

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#185FA5', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: 24 }}>🚲</span>
        </div>
        <h1 style={{ color: '#042C53', fontWeight: 400, margin: 0 }}>Doctobike</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Réparation de vélo à distance</p>
      </div>

      {step === 1 && (
        <div>
          <h2 style={{ color: '#042C53', fontWeight: 500, marginBottom: 16 }}>Choisissez un créneau</h2>
          {Object.keys(byDate).length === 0 && <p style={{ color: '#666' }}>Aucun créneau disponible pour le moment.</p>}
          {Object.entries(byDate).map(([date, daySlots]) => (
            <div key={date} style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 500, color: '#185FA5', marginBottom: 8, textTransform: 'capitalize' }}>{formatDate(date)}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {daySlots.map(slot => (
                  <button key={slot.id} onClick={() => { setSelectedSlot(slot); setStep(2) }}
                    style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #B5D4F4', background: '#E6F1FB', color: '#042C53', cursor: 'pointer', fontSize: 14 }}>
                    {formatTime(slot.start_time)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && selectedSlot && (
        <div>
          <p style={{ color: '#185FA5', marginBottom: 16 }}>📅 {formatDate(selectedSlot.date)} à {formatTime(selectedSlot.start_time)}</p>
          <h2 style={{ color: '#042C53', fontWeight: 500, marginBottom: 16 }}>Vos coordonnées</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input placeholder="Prénom" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} />
            <input placeholder="Nom" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} />
            <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} />
            <input placeholder="Décrivez votre problème" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => setStep(1)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>← Retour</button>
            <button onClick={() => setStep(3)} disabled={!form.firstName || !form.lastName || !form.email}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', flex: 1 }}>
              Continuer →
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedSlot && (
        <div>
          <h2 style={{ color: '#042C53', fontWeight: 500, marginBottom: 16 }}>Confirmation</h2>
          <div style={{ background: '#E6F1FB', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <p style={{ margin: '4px 0', color: '#042C53' }}>📅 {formatDate(selectedSlot.date)} à {formatTime(selectedSlot.start_time)}</p>
            <p style={{ margin: '4px 0', color: '#042C53' }}>👤 {form.firstName} {form.lastName}</p>
            <p style={{ margin: '4px 0', color: '#042C53' }}>✉️ {form.email}</p>
          </div>
          <div style={{ background: '#fff3cd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: '#856404' }}>
            🔒 Votre carte sera autorisée mais débitée uniquement après la réparation.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(2)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>← Retour</button>
            <button onClick={handleBook} disabled={loading}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', flex: 1 }}>
              {loading ? 'Confirmation...' : '✓ Confirmer'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
