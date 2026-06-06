import Link from 'next/link'

const font = "'Nunito', sans-serif"

const specialties = [
  { icon: '🚴', label: 'Vélo de route' },
  { icon: '🏔️', label: 'VTT' },
  { icon: '🏙️', label: 'Vélo de ville' },
  { icon: '⚡', label: 'Vélo électrique' },
  { icon: '🔧', label: 'Vintage & classique' },
  { icon: '🚲', label: 'Vélo cargo' },
]

export default function AboutPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', color: 'white' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36, fontWeight: 800, color: 'white' }}>
              D
            </div>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 12, fontWeight: 600 }}>Votre réparateur</p>
            <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 800, lineHeight: 1.25, margin: '0 0 12px' }}>Damien</h1>
            <p style={{ color: '#B5D4F4', fontSize: 16, margin: '0 0 24px' }}>Mécanicien cycles certifié · 10 ans d'expérience</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#E6F1FB' }}>
                🎓 Diplômé RNCP
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#E6F1FB' }}>
                🏆 Étape du Tour de France 2025
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

          {/* Citation */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', borderLeft: '4px solid #185FA5', padding: '24px 28px', marginBottom: 40 }}>
            <p style={{ fontSize: 17, color: '#042C53', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "Pouvoir réparer son vélo à tout moment, facilement et rapidement. Avec Doctobike, vous serez accompagné dans la réparation de A à Z. Un accompagnement entièrement personnalisé dès que vous en avez besoin."
            </p>
            <p style={{ margin: '12px 0 0', color: '#185FA5', fontWeight: 700, fontSize: 14 }}>— Damien, fondateur de Doctobike</p>
          </div>

          {/* Diplôme */}
          <div style={{ background: '#E6F1FB', borderRadius: 16, padding: '24px 28px', marginBottom: 40, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ fontSize: 40, flexShrink: 0 }}>🎓</div>
            <div>
              <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>Mécanicien cycles — Diplôme RNCP</h2>
              <p style={{ color: '#185FA5', fontSize: 14, margin: '0 0 8px', fontWeight: 600 }}>Enregistré au Répertoire National des Certifications Professionnelles</p>
              <p style={{ color: '#444', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Ce diplôme reconnu par l'État certifie les compétences professionnelles en mécanique cycles : diagnostic, réparation, réglage et entretien de tous types de vélos.
              </p>
            </div>
          </div>

          {/* Spécialités */}
          <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 22, marginBottom: 20 }}>Spécialités</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 40 }}>
            {specialties.map((s, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #E6F1FB', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#042C53' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tour de France */}
          <div style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', borderRadius: 16, padding: '28px 32px', marginBottom: 40, color: 'white' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
            <h2 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 12px', color: '#FAC775' }}>L'étape du Tour de France — Juillet 2025</h2>
            <p style={{ color: '#B5D4F4', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              En juillet 2025, Damien a relevé son plus grand défi cycliste : participer et terminer l'Etape du Tour. Une expérience qui confirme non seulement sa passion pour le vélo, mais aussi sa connaissance intime de ce que les cyclistes — amateurs comme confirmés — vivent sur la route.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', padding: '40px 24px' }}>
            <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Prêt à réparer votre vélo ?</h2>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 28 }}>Réservez une séance avec Damien en moins de 2 minutes.</p>
            <Link href="/booking" style={{ display: 'inline-block', background: '#185FA5', color: 'white', padding: '14px 36px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
              Réserver ma séance →
            </Link>
          </div>

        </div>

        {/* Footer */}
        <footer style={{ background: '#042C53', padding: '32px 24px', textAlign: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: font, fontSize: 22, fontWeight: 800, color: 'white' }}>Doctobike</span>
          </Link>
          <p style={{ color: '#B5D4F4', fontSize: 13, marginTop: 16 }}>© 2024 Doctobike — Réparation vélo en visio</p>
          <Link href="/booking" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Prendre rendez-vous</Link>
        </footer>

      </div>
    </>
  )
}
