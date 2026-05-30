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
    if (data.booking_id) { setConfirmed(data as Confirmed); setStep(4) }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const formatTime = (t: string) => t.slice(0, 5)

  const font = "'Nunito', 'Poppins', sans-serif"

  const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
          <circle cx="10" cy="22" r="7" fill="none" stroke="#E6F1FB" strokeWidth="1.5"/>
          <circle cx="10" cy="22" r="2" fill="#B5D4F4"/>
          <circle cx="26" cy="22" r="7" fill="none" stroke="#E6F1FB" strokeWidth="1.5"/>
          <circle cx="26" cy="22" r="2" fill="#B5D4F4"/>
          <path d="M10 22 L17 10 L26 22" fill="none" stroke="#E6F1FB" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M17 10 L21 22" stroke="#E6F1FB" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="14" y1="10" x2="19" y2="10" stroke="#E6F1FB" strokeWidth="2" strokeLinecap="round"/>
          <line x1="19" y1="10" x2="19" y2="14" stroke="#E6F1FB" strokeWidth="2" strokeLinecap="round"/>
          <g transform="translate(28,6) rotate(35)">
            <rect x="-2" y="-7" width="4" height="10" rx="1" fill="#FAC775"/>
            <rect x="-3.5" y="-9" width="7" height="3.5" rx="1.5" fill="#FAC775"/>
          </g>
        </svg>
      </div>
      <span style={{ fontFamily: font, fontSize: 22, fontWeight: 800, color: '#042C53', letterSpacing: '-0.01em' }}>Doctobike</span>
    </div>
  )

  if (step === 4 && confirmed) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ background: 'white', borderBottom: '1px solid #E6F1FB', padding: '12px 20px' }}><Logo /></div>
      <main style={{ maxWidth: 500, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32, border: '2px solid #B5D4F4' }}>✓</div>
        <h1 style={{ color: '#042C53', fontWeight: 700, fontFamily: font, marginBottom: 8 }}>Réservation confirmée !</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>Un email avec le lien Google Meet a été envoyé à <strong>{form.email}</strong></p>
        {confirmed.meet_link && (
          <a href={confirmed.meet_link} target="_blank" rel="noreferrer"
            style={{ display: 'block', background: '#185FA5', color: 'white', padding: '14px 20px', borderRadius: 12, textDecoration: 'none', marginBottom: 16, fontSize: 15, fontWeight: 600 }}>
            🎥 Rejoindre la visio
          </a>
        )}
        <button onClick={() => { setStep(1); setSelectedSlot(null); setConfirmed(null) }}
          style={{ background: 'none', border: '1px solid #ccc', padding: '10px 20px', borderRadius: 12, cursor: 'pointer', color: '#666', fontFamily: font }}>
          Nouvelle réservation
        </button>
      </main>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      <div style={{ background: 'white', borderBottom: '1px solid #E6F1FB', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <a href="/admin" style={{ fontSize: 13, color: '#888', textDecoration: 'none', fontFamily: font }}>Espace réparateur</a>
      </div>

      {step === 1 && (
        <div style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '48px 20px', textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 12, fontWeight: 600 }}>Réparation online</p>
          <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>
            Réparez votre vélo<br />depuis chez vous
          </h1>
          <p style={{ color: '#B5D4F4', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
            Réservez votre réparation en ligne avec Damien, réparateur certifié. Diagnostic et réparation guidée en direct.
          </p>
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
                <p style={{ fontWeight: 700, color: '#185FA5', marginBottom: 12, textTransform: 'capitalize', fontSize: 15 }}>
                  📅 {formatDate(date)}
                </p>
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
              <p style={{ color: '#185FA5', fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>
                📅 {formatDate(selectedSlot.date)} à {formatTime(selectedSlot.start_time)}
              </p>
            </div>
            <h2 style={{ color: '#042C53', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Vos coordonnées</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Prénom</label>
                  <input placeholder="Marie" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Nom</label>
                  <input placeholder="Laurent" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Email</label>
                <input placeholder="marie@exemple.fr" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', fontFamily: font }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4, fontWeight: 600 }}>Décrivez votre panne</label>
                <textarea placeholder="Ex: Mon dérailleur arrière saute des vitesses, surtout en montée. Vélo de route, 21 vitesses..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={4} style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 14, width: '100%', resize: 'vertical', fontFamily: font }} />
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
            <h2 style={{ color: '#042C53', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Récapitulatif</h2>
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
                <span style={{ color: '#666', fontSize: 14 }}>Client</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{form.firstName} {form.lastName}</span>
              </div>
              {form.description && (
                <div style={{ padding: '8px 0', borderBottom: '1px solid #E6F1FB' }}>
                  <p style={{ color: '#666', fontSize: 13, margin: '0 0 4px' }}>Panne décrite</p>
                  <p style={{ fontSize: 13, color: '#042C53', margin: 0 }}>{form.description}</p>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#185FA5', fontFamily: font }}>45 €</span>
              </div>
            </div>
            <div style={{ background: '#FFF8E6', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: '#856404', border: '1px solid #FAC775' }}>
              🔒 Votre carte est autorisée maintenant mais débitée uniquement après la réparation.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ padding: '10px 20px', borderRadius: 10, border: '1.5px solid #ddd', background: 'white', cursor: 'pointer', color: '#666', fontFamily: font }}>← Retour</button>
              <button onClick={handleBook} disabled={loading}
                style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', flex: 1, fontSize: 14, fontWeight: 700, fontFamily: font }}>
                {loading ? 'Confirmation...' : '✓ Confirmer et réserver'}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
