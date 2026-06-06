import Link from 'next/link'

const font = "'Nunito', sans-serif"

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
    <span style={{ fontFamily: font, fontSize: 22, fontWeight: 800, color: '#042C53' }}>Doctobike</span>
  </div>
)

const experiences = [
  {
    period: '2023 — aujourd\'hui',
    role: 'Fondateur',
    company: 'Doctobike',
    desc: 'Création du service de réparation vélo en visio. Accompagnement de cyclistes partout en France pour diagnostiquer et réparer leur vélo depuis chez eux.',
    color: '#185FA5',
  },
  {
    period: '2021 — 2023',
    role: 'Technicien vélo',
    company: 'Fabricant de vélos pour collectivités territoriales',
    desc: 'Maintenance et réparation de flottes de vélos pour les collectivités. Expertise sur les vélos robustes et les systèmes d\'assistance électrique.',
    color: '#378ADD',
  },
  {
    period: '2019 — 2021',
    role: 'Mécanicien cycles',
    company: 'Marque de vélo électrique parisienne',
    desc: 'Spécialisation sur les vélos à assistance électrique : diagnostic, réparation moteur, batterie, electronique embarquée.',
    color: '#378ADD',
  },
  {
    period: '2015 — 2019',
    role: 'Gérant',
    company: 'Boutique de vente et réparation de vélos — Paris',
    desc: 'Gestion complète d\'une boutique parisienne : vente, réparation tous types de vélos, relation client, gestion des stocks.',
    color: '#378ADD',
  },
]

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
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #E6F1FB', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <Link href="/" style={{ textDecoration: 'none' }}><Logo /></Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>Accueil</Link>
            <Link href="/booking" style={{ background: '#185FA5', color: 'white', padding: '10px 20px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              Réserver
            </Link>
          </div>
        </header>

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
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#E6F1FB' }}>
                📍 Paris
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

          {/* Citation */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E6F1FB', borderLeft: '4px solid #185FA5', padding: '24px 28px', marginBottom: 40 }}>
            <p style={{ fontSize: 17, color: '#042C53', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "J'ai passé des années à réparer des vélos en atelier à Paris. Avec Doctobike, je veux rendre cette expertise accessible à tous, depuis chez soi. Parce qu'un vélo en panne ne devrait pas vous immobiliser."
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

          {/* Parcours */}
          <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 22, marginBottom: 24 }}>Parcours professionnel</h2>
          <div style={{ position: 'relative', marginBottom: 40 }}>
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: exp.color, border: '2px solid white', boxShadow: `0 0 0 3px ${exp.color}40`, marginTop: 4 }}/>
                  {i < experiences.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: '#E6F1FB', marginTop: 8 }}/>
                  )}
                </div>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '16px 20px', flex: 1, marginBottom: i < experiences.length - 1 ? 0 : 0 }}>
                  <div style={{ fontSize: 12, color: '#185FA5', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{exp.period}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#042C53', marginBottom: 2 }}>{exp.role}</div>
                  <div style={{ fontSize: 13, color: '#185FA5', fontWeight: 600, marginBottom: 8 }}>{exp.company}</div>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
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

          {/* Anecdote Tour de France */}
          <div style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', borderRadius: 16, padding: '28px 32px', marginBottom: 40, color: 'white' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
            <h2 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 12px', color: '#FAC775' }}>L'étape du Tour de France — Juillet 2025</h2>
            <p style={{ color: '#B5D4F4', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              En juillet 2025, Damien a relevé son plus grand défi cycliste : compléter une étape officielle du Tour de France. Une expérience qui confirme non seulement sa passion pour le vélo, mais aussi sa connaissance intime de ce que les cyclistes — amateurs comme confirmés — vivent sur la route.
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
          <Logo />
          <p style={{ color: '#B5D4F4', fontSize: 13, marginTop: 16 }}>© 2024 Doctobike — Réparation vélo en visio</p>
          <Link href="/booking" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Prendre rendez-vous</Link>
        </footer>

      </div>
    </>
  )
}
