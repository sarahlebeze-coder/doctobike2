import Link from 'next/link'

const font = "'Plus Jakarta Sans', sans-serif"

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFCFA', fontFamily: font }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2E8B6A 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontFamily: font, fontSize: 38, fontWeight: 800, lineHeight: 1.25, margin: '0 0 20px' }}>
            Doctobike, l'expertise vélo<br />pour les entreprises<br />et les particuliers
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, lineHeight: 1.7, margin: '0 auto 12px', maxWidth: 520 }}>
            Damien Hardy, mécanicien vélo certifié RNCP, met son expertise au service de votre mobilité.
          </p>
        </div>
      </section>

      {/* Deux offres */}
      <section style={{ padding: '64px 24px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>

          {/* Bloc Entreprise */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            border: '1px solid #E8F5EE',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E8B6A', marginBottom: 16 }}>
              Entreprises
            </div>
            <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 22, color: '#1B4D3E', margin: '0 0 8px' }}>
              Vous êtes une entreprise ?
            </h2>
            <p style={{ color: '#1B4D3E', fontWeight: 600, fontSize: 15, margin: '0 0 20px' }}>
              Maintenance vélo & mobilité des collaborateurs
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, flex: 1 }}>
              {[
                'Atelier vélo dans vos locaux',
                'Entretien et réparation du parc vélo des salariés',
                'Sensibilisation à la mobilité douce',
                'Gain de temps et amélioration du confort des collaborateurs',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#444', fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: '#2E8B6A', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/entreprise" style={{
              display: 'block', textAlign: 'center',
              background: '#1B4D3E', color: 'white',
              padding: '14px 24px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15, fontWeight: 700,
            }}>
              Accéder à l'espace Entreprise →
            </Link>
          </div>

          {/* Bloc Particulier */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            border: '1px solid #E8F5EE',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E8B6A', marginBottom: 16 }}>
              Particuliers
            </div>
            <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 22, color: '#1B4D3E', margin: '0 0 8px' }}>
              Vous êtes un particulier ?
            </h2>
            <p style={{ color: '#1B4D3E', fontWeight: 600, fontSize: 15, margin: '0 0 8px' }}>
              Assistance, formation & dépannage vélo
            </p>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
              Un expert vélo vous accompagne où que vous soyez pour entretenir, comprendre ou réparer votre vélo.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, flex: 1 }}>
              {[
                'Dépannage et diagnostic en visio',
                'Formation à la mécanique vélo',
                'Conseils personnalisés',
                "Aide à l'auto-réparation",
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#444', fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: '#2E8B6A', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/coaching" style={{
              display: 'block', textAlign: 'center',
              background: '#2E8B6A', color: 'white',
              padding: '14px 24px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15, fontWeight: 700,
            }}>
              Accéder à l'espace Particulier →
            </Link>
          </div>

        </div>
      </section>

      {/* Bloc Damien */}
      <section style={{ padding: '48px 24px 72px', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>🔧</div>
        <h2 style={{ color: '#1B4D3E', fontWeight: 800, fontSize: 22, marginBottom: 14 }}>Damien Hardy, mécanicien certifié RNCP</h2>
        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: '0 auto 24px' }}>
          Fort de plusieurs années d'expérience, Damien a créé Doctobike pour rendre la mécanique vélo accessible — en entreprise comme à domicile.
        </p>
        <Link href="/about" style={{ color: '#2E8B6A', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
          En savoir plus →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1B4D3E', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 12px' }}>© 2024 Doctobike — Mécanicien vélo certifié</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/mentions-legales" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/cgv" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>CGV</Link>
          <Link href="/confidentialite" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Confidentialité</Link>
          <Link href="/entreprise" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Atelier en entreprise</Link>
          <Link href="/coaching" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Assistance & dépannage</Link>
        </div>
      </footer>

    </div>
  )
}
