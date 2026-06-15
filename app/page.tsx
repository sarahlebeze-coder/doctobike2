import Link from 'next/link'

const font = "'Nunito', sans-serif"

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 16, fontWeight: 600 }}>
            Mécanicien vélo certifié RNCP
          </p>
          <h1 style={{ fontFamily: font, fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: '0 0 20px' }}>
            La mécanique vélo,<br />accessible à tous
          </h1>
          <p style={{ color: '#B5D4F4', fontSize: 17, lineHeight: 1.7, margin: '0 auto 48px', maxWidth: 500 }}>
            Damien vous accompagne pour réparer votre vélo — que vous soyez chez vous ou en entreprise.
          </p>

          {/* Les deux offres */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 640, margin: '0 auto' }}>

            {/* Coaching vidéo */}
            <Link href="/coaching" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: 28,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>🎥</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAC775', marginBottom: 8 }}>
                  Particuliers
                </div>
                <h2 style={{ color: 'white', fontWeight: 800, fontSize: 20, margin: '0 0 10px', fontFamily: font }}>
                  Coaching Vidéo
                </h2>
                <p style={{ color: '#B5D4F4', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                  Réparez votre vélo depuis chez vous. Damien vous guide en temps réel par visio.
                </p>
                <span style={{ display: 'inline-block', background: '#FAC775', color: '#042C53', padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 800 }}>
                  Prendre rendez-vous →
                </span>
              </div>
            </Link>

            {/* Intervention entreprise */}
            <Link href="/entreprise" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: 28,
                textAlign: 'left',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>🏢</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAC775', marginBottom: 8 }}>
                  Entreprises
                </div>
                <h2 style={{ color: 'white', fontWeight: 800, fontSize: 20, margin: '0 0 10px', fontFamily: font }}>
                  Intervention Entreprise
                </h2>
                <p style={{ color: '#B5D4F4', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                  Damien se déplace dans vos locaux pour prendre en charge les vélos de vos collaborateurs.
                </p>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 800, border: '1px solid rgba(255,255,255,0.3)' }}>
                  Demander un devis →
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Bloc Damien */}
      <section style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>🔧</div>
        <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Damien Hardy, mécanicien certifié RNCP</h2>
        <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 32px' }}>
          Fort de plusieurs années d'expérience en réparation vélo, Damien a développé Doctobike pour rendre la mécanique accessible à tous — particuliers comme professionnels.
        </p>
        <Link href="/about" style={{ color: '#185FA5', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
          En savoir plus sur Damien →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: '#042C53', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#B5D4F4', fontSize: 13, margin: '0 0 12px' }}>© 2024 Doctobike — Mécanicien vélo certifié</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/mentions-legales" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/cgv" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>CGV</Link>
          <Link href="/confidentialite" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Confidentialité</Link>
          <Link href="/coaching" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Coaching Vidéo</Link>
          <Link href="/entreprise" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Intervention Entreprise</Link>
        </div>
      </footer>

    </div>
  )
}
