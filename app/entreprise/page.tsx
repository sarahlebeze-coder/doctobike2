'use client'

import { useState } from 'react'

const font = "'Plus Jakarta Sans', sans-serif"

const AVANTAGES = [
  { icon: '🚲', title: 'Zéro contrainte pour vos employés', desc: 'Ils déposent leur vélo le matin et le récupèrent réparé en fin de journée. Aucune démarche supplémentaire.' },
  { icon: '🔧', title: 'Un mécanicien certifié RNCP', desc: 'Damien intervient avec son matériel professionnel complet. Tous types de vélos pris en charge.' },
  { icon: '📋', title: 'Devis transparent pour chaque vélo', desc: 'Chaque employé reçoit un devis détaillé avant intervention. Aucune surprise sur la facture.' },
  { icon: '♻️', title: 'Valorisez votre politique mobilité', desc: "Encouragez le vélo au quotidien. Un levier concret pour votre bilan RSE et le bien-être de vos équipes." },
]

export default function EntreprisePage() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    entreprise: '', date: '', nombreVelos: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    if (!form.prenom || !form.nom || !form.email || !form.entreprise) {
      setErrorMsg('Merci de remplir tous les champs obligatoires.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/devis-entreprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Une erreur est survenue. Merci de réessayer ou de contacter Damien directement.')
    }
  }

  const inputStyle = {
    padding: '11px 14px',
    borderRadius: 10,
    border: '1.5px solid #ddd',
    fontSize: 14,
    width: '100%',
    fontFamily: font,
    boxSizing: 'border-box' as const,
    outline: 'none',
  }

  const labelStyle = {
    fontSize: 13,
    color: '#444',
    display: 'block' as const,
    marginBottom: 5,
    fontWeight: 600 as const,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFCFA', fontFamily: font }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2E8B6A 100%)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16, fontWeight: 600 }}>
            Service BtoB · Intervention sur site
          </p>
          <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 800, lineHeight: 1.25, margin: '0 0 16px' }}>
            Un atelier vélo<br />dans votre entreprise
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.7, margin: '0 auto 32px', maxWidth: 480 }}>
            Damien se déplace dans vos locaux pour une journée ou demi-journée. Vos collaborateurs déposent leur vélo le matin — il s'en occupe.
          </p>
          <a href="#devis" style={{ display: 'inline-block', background: '#FAC775', color: '#1B4D3E', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
            Demander un devis →
          </a>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 48 }}>Comment ça se passe ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 24 }}>
          {[
            { num: '1', icon: '📩', title: 'Vous faites une demande', desc: 'Remplissez le formulaire ci-dessous avec vos disponibilités et le nombre de vélos estimé.' },
            { num: '2', icon: '📞', title: 'Damien vous contacte', desc: 'Il revient vers vous sous 48h pour convenir des détails et établir un devis sur mesure.' },
            { num: '3', icon: '🚗', title: 'Damien se déplace', desc: 'Le jour J, il arrive avec tout son matériel. Vos employés déposent leur vélo le matin.' },
            { num: '4', icon: '✅', title: 'Vélos réparés le soir', desc: 'Chaque vélo est rendu avec un devis détaillé. Vos équipes repartent avec leur vélo en état.' },
          ].map(step => (
            <div key={step.num} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #E8F5EE', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
                {step.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2E8B6A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Étape {step.num}</div>
              <h3 style={{ color: '#1B4D3E', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section style={{ background: '#E8F5EE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 48 }}>Pourquoi faire appel à Doctobike ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {AVANTAGES.map((a, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #4DB892', display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{a.icon}</div>
                <div>
                  <h3 style={{ color: '#1B4D3E', fontWeight: 700, fontSize: 15, margin: '0 0 8px' }}>{a.title}</h3>
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire devis */}
      <section id="devis" style={{ padding: '64px 24px', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Demander un devis</h2>
        <p style={{ textAlign: 'center', color: '#555', fontSize: 15, marginBottom: 40 }}>
          Damien vous répond sous 48h avec une proposition adaptée à vos besoins.
        </p>

        {status === 'success' ? (
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E8F5EE', padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ color: '#1B4D3E', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Demande envoyée !</h3>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7 }}>
              Merci <strong>{form.prenom}</strong> ! Damien a bien reçu votre demande et vous contactera sous 48h à l'adresse <strong>{form.email}</strong>.
            </p>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E8F5EE', padding: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Prénom <span style={{ color: '#c0392b' }}>*</span></label>
                  <input value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                    placeholder="Marie" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nom <span style={{ color: '#c0392b' }}>*</span></label>
                  <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                    placeholder="Laurent" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email professionnel <span style={{ color: '#c0392b' }}>*</span></label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="marie.laurent@entreprise.fr" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Téléphone</label>
                <input type="tel" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })}
                  placeholder="06 12 34 56 78" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Nom de l'entreprise <span style={{ color: '#c0392b' }}>*</span></label>
                <input value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })}
                  placeholder="Acme SAS" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Date envisagée</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Estimation du nombre de vélos</label>
                <input value={form.nombreVelos} onChange={e => setForm({ ...form, nombreVelos: e.target.value })}
                  placeholder="Ex : entre 10 et 15 vélos" style={inputStyle} />
              </div>

              {errorMsg && (
                <p style={{ color: '#c0392b', background: '#fdecea', borderRadius: 8, padding: '10px 14px', fontSize: 13, margin: 0 }}>
                  {errorMsg}
                </p>
              )}

              <div style={{ background: '#FFF8E6', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#854F0B', border: '1px solid #FAC775' }}>
                📋 Le tarif est établi sur mesure selon vos besoins. Aucun engagement à ce stade.
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? '#aaa' : '#1B4D3E',
                  color: 'white',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  fontFamily: font,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                {status === 'loading' ? 'Envoi en cours...' : "Envoyer ma demande →"}
              </button>

            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: '#1B4D3E', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 12px' }}>© 2024 Doctobike — Mécanicien vélo certifié</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="/mentions-legales" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Mentions légales</a>
          <a href="/cgv" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>CGV</a>
          <a href="/confidentialite" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Confidentialité</a>
        </div>
      </footer>

    </div>
  )
}
