import Link from 'next/link'

const font = "'Nunito', sans-serif"

const packs = [
  {
    name: 'Pack Découverte',
    price: '25€',
    duration: '30 min',
    bgColor: '#E6F1FB',
    icon: '🔍',
    description: 'Idéal pour identifier un problème ou savoir comment entretenir son vélo.',
    features: [
      "Diagnostic complet en visio",
      "Conseils d'entretien personnalisés",
      "Recommandations sur les pièces à changer",
    ],
    highlight: false,
  },
  {
    name: 'Pack Dépannage',
    price: '45€',
    duration: 'Entre 45 min et 1h',
    bgColor: '#185FA5',
    icon: '🔧',
    description: "Pour réparer votre vélo en direct avec l'aide de Damien.",
    features: [
      "Accompagnement visio jusqu'à 1h",
      "Aide à la réparation en direct",
      'Guide simplifié "la réparation pour les nuls"',
    ],
    highlight: true,
  },
  {
    name: 'Pack Expert',
    price: '90€',
    duration: "Jusqu'à 2h",
    bgColor: '#042C53',
    icon: '⭐',
    description: "Pour les réparations importantes et devenir autonome sur son vélo.",
    features: [
      "Diagnostic complet en visio",
      "Accompagnement réparation importante",
      'Guide complet "devenir un as de la mécanique"',
      "Jusqu'à 2h d'accompagnement",
    ],
    highlight: false,
  },
]

const engagements = [
  { icon: '💳', title: 'Paiement après séance', desc: "Votre carte n'est débitée qu'une fois la séance terminée." },
  { icon: '❌', title: 'Annulation gratuite', desc: "Annulez jusqu'à 24h avant sans frais." },
  { icon: '🚲', title: 'Non réparable = gratuit', desc: "Si on ne peut pas réparer en visio, vous ne payez pas." },
  { icon: '🎥', title: 'Visio sécurisée', desc: "Séance via Google Meet, simple et fiable." },
]

export default function TarifsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

      <section style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '64px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 12, fontWeight: 600 }}>Nos offres</p>
        <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 800, color: 'white', margin: '0 0 16px', lineHeight: 1.25 }}>
          Choisissez votre pack
        </h1>
        <p style={{ color: '#B5D4F4', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Trois formules adaptées à votre niveau et à votre besoin. Votre carte n'est débitée qu'après la séance.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ background: '#FAC775', color: '#042C53', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 20 }}>
            ⭐ Le plus populaire : Pack Dépannage
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          {packs.map((pack, i) => (
            <div key={i} style={{
              background: pack.highlight ? pack.bgColor : 'white',
              borderRadius: 20,
              border: pack.highlight ? 'none' : '1px solid #E6F1FB',
              padding: 28,
              boxShadow: pack.highlight ? '0 20px 60px rgba(24,95,165,0.3)' : 'none',
              transform: pack.highlight ? 'scale(1.03)' : 'none',
              position: 'relative',
            }}>
              {pack.highlight && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FAC775', color: '#042C53', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                  Le plus populaire
                </div>
              )}
              <div style={{ fontSize: 36, marginBottom: 16 }}>{pack.icon}</div>
              <h2 style={{ color: pack.highlight ? 'white' : '#042C53', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>{pack.name}</h2>
              <p style={{ color: pack.highlight ? '#B5D4F4' : '#666', fontSize: 14, margin: '0 0 20px', lineHeight: 1.6 }}>{pack.description}</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: pack.highlight ? 'white' : '#042C53', fontFamily: font }}>{pack.price}</span>
                <span style={{ fontSize: 14, color: pack.highlight ? '#B5D4F4' : '#888', marginLeft: 8 }}>{pack.duration}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {pack.features.map((feature, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: pack.highlight ? '#FAC775' : '#185FA5', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: pack.highlight ? '#E6F1FB' : '#444', fontSize: 14, lineHeight: 1.5 }}>{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/booking" style={{
                display: 'block',
                textAlign: 'center',
                background: pack.highlight ? '#FAC775' : '#185FA5',
                color: pack.highlight ? '#042C53' : 'white',
                padding: '14px 20px',
                borderRadius: 12,
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 800,
                fontFamily: font,
              }}>
                Réserver ce pack →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#E6F1FB', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#042C53', fontWeight: 800, fontSize: 22, marginBottom: 32 }}>Notre engagement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {engagements.map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, padding: '20px 16px', textAlign: 'center', border: '1px solid #B5D4F4' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ color: '#042C53', fontWeight: 700, fontSize: 14, margin: '0 0 6px' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Pas sûr du pack à choisir ?</h2>
        <p style={{ color: '#666', fontSize: 15, maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.6 }}>
          Commencez par le Pack Découverte — Damien vous guidera vers la meilleure solution.
        </p>
        <Link href="/booking" style={{ display: 'inline-block', background: '#185FA5', color: 'white', padding: '14px 36px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
          Réserver ma séance →
        </Link>
      </section>

      <footer style={{ background: '#042C53', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#B5D4F4', fontSize: 13, margin: '0 0 12px' }}>© 2024 Doctobike — Réparation vélo en visio</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/mentions-legales" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/cgv" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>CGV</Link>
          <Link href="/confidentialite" style={{ color: '#378ADD', fontSize: 13, textDecoration: 'none' }}>Confidentialité</Link>
        </div>
      </footer>

    </div>
  )
}
