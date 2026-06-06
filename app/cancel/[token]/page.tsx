'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function CancelPage() {
  const { token } = useParams() as { token: string }
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  async function handleCancel() {
    setStatus('loading')
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error ?? 'Une erreur est survenue.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setMessage('Erreur réseau. Réessaie.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h1 style={{ color: '#042C53', fontSize: 24, marginBottom: 12 }}>Rendez-vous annulé</h1>
        <p style={{ color: '#444' }}>Ton rendez-vous a bien été annulé. Aucun débit n'a été effectué sur ta carte.</p>
        <a href="/booking" style={{
          display: 'inline-block', marginTop: 24, padding: '12px 24px',
          background: '#185FA5', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600
        }}>
          Reprendre un rendez-vous
        </a>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h1 style={{ color: '#042C53', fontSize: 24, marginBottom: 12 }}>Annulation impossible</h1>
        <p style={{ color: '#444' }}>{message}</p>
        <a href="/booking" style={{
          display: 'inline-block', marginTop: 24, padding: '12px 24px',
          background: '#185FA5', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600
        }}>
          Retour à l'accueil
        </a>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚲</div>
      <h1 style={{ color: '#042C53', fontSize: 24, marginBottom: 12 }}>Annuler votre rendez-vous</h1>
      <p style={{ color: '#444', marginBottom: 24 }}>
        Êtes-vous sûr de vouloir annuler votre rendez-vous ?<br />
        <span style={{ fontSize: 13, color: '#666' }}>Aucun débit ne sera effectué sur votre carte.</span>
      </p>

      {!confirmed ? (
        <button
          onClick={() => setConfirmed(true)}
          style={{
            padding: '12px 32px', background: '#dc3545', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer'
          }}
        >
          Oui, annuler ce rendez-vous
        </button>
      ) : (
        <div>
          <p style={{ color: '#dc3545', fontWeight: 600, marginBottom: 16 }}>Confirmation définitive :</p>
          <button
            onClick={handleCancel}
            disabled={status === 'loading'}
            style={{
              padding: '12px 32px', background: '#dc3545', color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1
            }}
          >
            {status === 'loading' ? 'Annulation en cours...' : 'Confirmer l\'annulation'}
          </button>
          <button
            onClick={() => setConfirmed(false)}
            style={{
              display: 'block', margin: '12px auto 0', background: 'none',
              border: 'none', color: '#666', cursor: 'pointer', fontSize: 14
            }}
          >
            ← Revenir en arrière
          </button>
        </div>
      )}
    </main>
  )
}
