'use client'

import { useState, useEffect } from 'react'

type Slot = { id: string; date: string; start_time: string; duration: number; is_active: boolean }

const PASSWORD = 'doctobike2024'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState('')
  const [slots, setSlots] = useState<Slot[]>([])
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('09:00')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (auth) loadSlots()
  }, [auth])

  const loadSlots = async () => {
    const res = await fetch('/api/availabilities')
    const data = await res.json()
    setSlots(Array.isArray(data) ? data : [])
  }

  const addSlot = async () => {
    if (!newDate || !newTime) return
    setLoading(true)
    await fetch('/api/availabilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slots: [{ date: newDate, start_time: newTime, duration: 45, is_active: true }] }),
    })
    setMsg('Créneau ajouté !')
    setNewDate('')
    await loadSlots()
    setLoading(false)
    setTimeout(() => setMsg(''), 2000)
  }

  const deleteSlot = async (id: string) => {
    await fetch('/api/availabilities', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await loadSlots()
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

  if (!auth) return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 360, margin: '100px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#185FA5', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: 24 }}>🔒</span>
      </div>
      <h1 style={{ color: '#042C53', fontWeight: 400, marginBottom: 24 }}>Espace réparateur</h1>
      <input type="password" placeholder="Mot de passe" value={pwd} onChange={e => setPwd(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && pwd === PASSWORD && setAuth(true)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14, width: '100%', marginBottom: 12 }} />
      <button onClick={() => pwd === PASSWORD ? setAuth(true) : alert('Mot de passe incorrect')}
        style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', width: '100%', fontSize: 14 }}>
        Connexion
      </button>
    </main>
  )

  const byDate = slots.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {} as Record<string, Slot[]>)

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#042C53', fontWeight: 400, margin: 0 }}>🔧 Espace réparateur</h1>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>Gérez vos disponibilités</p>
        </div>
        <a href="/booking" style={{ color: '#185FA5', fontSize: 13 }}>Voir le site client →</a>
      </div>

      <div style={{ background: '#E6F1FB', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#042C53', fontWeight: 500, fontSize: 16, marginBottom: 16 }}>Ajouter un créneau</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: '#185FA5', display: 'block', marginBottom: 4 }}>Date</label>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #B5D4F4', fontSize: 14, width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#185FA5', display: 'block', marginBottom: 4 }}>Heure</label>
            <select value={newTime} onChange={e => setNewTime(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #B5D4F4', fontSize: 14, width: '100%' }}>
              {['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={addSlot} disabled={loading || !newDate}
          style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#185FA5', color: 'white', cursor: 'pointer', fontSize: 14, width: '100%' }}>
          {loading ? 'Ajout...' : '+ Ajouter ce créneau'}
        </button>
        {msg && <p style={{ color: '#185FA5', fontSize: 13, marginTop: 8, textAlign: 'center' }}>{msg}</p>}
      </div>

      <h2 style={{ color: '#042C53', fontWeight: 500, fontSize: 16, marginBottom: 16 }}>Créneaux disponibles</h2>
      {Object.keys(byDate).length === 0 && <p style={{ color: '#666' }}>Aucun créneau pour le moment.</p>}
      {Object.entries(byDate).sort().map(([date, daySlots]) => (
        <div key={date} style={{ marginBottom: 16, background: 'white', borderRadius: 12, border: '1px solid #E6F1FB', padding: 16 }}>
          <p style={{ fontWeight: 500, color: '#185FA5', marginBottom: 12, textTransform: 'capitalize' }}>{formatDate(date)}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {daySlots.map(slot => (
              <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#E6F1FB', borderRadius: 8, padding: '6px 10px' }}>
                <span style={{ fontSize: 14, color: '#042C53' }}>{slot.start_time.slice(0, 5)}</span>
                <button onClick={() => deleteSlot(slot.id)}
                  style={{ background: 'none', border: 'none', color: '#E24B4A', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
