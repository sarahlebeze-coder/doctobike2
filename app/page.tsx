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

const HeroIllustration = () => (
  <div style={{ flexShrink: 0, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)' }}>
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      {/* Roues */}
      <circle cx="55" cy="145" r="45" fill="none" stroke="#B5D4F4" strokeWidth="6"/>
      <circle cx="55" cy="145" r="8" fill="#B5D4F4"/>
      <circle cx="165" cy="145" r="45" fill="none" stroke="#B5D4F4" strokeWidth="6"/>
      <circle cx="165" cy="145" r="8" fill="#B5D4F4"/>
      {/* Rayons roue gauche */}
      <line x1="55" y1="100" x2="55" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="55" y1="145" x2="19" y2="162" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="55" y1="145" x2="91" y2="162" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="10" y1="145" x2="55" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="100" y1="145" x2="55" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      {/* Rayons roue droite */}
      <line x1="165" y1="100" x2="165" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="165" y1="145" x2="129" y2="162" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="165" y1="145" x2="201" y2="162" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="120" y1="145" x2="165" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="210" y1="145" x2="165" y2="145" stroke="#B5D4F4" strokeWidth="2"/>
      {/* Cadre */}
      <path d="M55 145 L110 80 L165 145" fill="none" stroke="#E6F1FB" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M110 80 L140 145" fill="none" stroke="#E6F1FB" strokeWidth="5" strokeLinecap="round"/>
      <path d="M85 145 L110 80" fill="none" stroke="#E6F1FB" strokeWidth="5" strokeLinecap="round"/>
      {/* Guidon */}
      <line x1="110" y1="80" x2="110" y2="55" stroke="#E6F1FB" strokeWidth="5" strokeLinecap="round"/>
      <line x1="95" y1="55" x2="125" y2="55" stroke="#E6F1FB" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="95" cy="55" r="4" fill="#FAC775"/>
      <circle cx="125" cy="55" r="4" fill="#FAC775"/>
      {/* Selle */}
      <line x1="140" y1="145" x2="140" y2="105" stroke="#E6F1FB" strokeWidth="5" strokeLinecap="round"/>
      <line x1="125" y1="105" x2="158" y2="105" stroke="#E6F1FB" strokeWidth="6" strokeLinecap="round"/>
      {/* Pédalier */}
      <circle cx="110" cy="145" r="10" fill="none" stroke="#FAC775" strokeWidth="4"/>
      <line x1="100" y1="155" x2="90" y2="165" stroke="#FAC775" strokeWidth="4" strokeLinecap="round"/>
      <line x1="120" y1="135" x2="130" y2="125" stroke="#FAC775" strokeWidth="4" strokeLinecap="round"/>
      {/* Écran visio */}
      <rect x="148" y="28" width="58" height="42" rx="6" fill="#185FA5" stroke="#B5D4F4" strokeWidth="2"/>
      <rect x="153" y="33" width="48" height="28" rx="3" fill="#042C53"/>
      <circle cx="162" cy="47" r="8" fill="#378ADD" opacity="0.6"/>
      <circle cx="162" cy="47" r="4" fill="#E6F1FB"/>
      <line x1="177" y1="42" x2="193" y2="42" stroke="#B5D4F4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="177" y1="47" x2="190" y2="47" stroke="#B5D4F4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="177" y1="52" x2="188" y2="52" stroke="#B5D4F4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="177" y1="70" x2="177" y2="80" stroke="#B5D4F4" strokeWidth="2"/>
      <line x1="170" y1="80" x2="184" y2="80" stroke="#B5D4F4" strokeWidth="3" strokeLinecap="round"/>
      {/* Clé à molette */}
      <g transform="translate(18,30) rotate(-30)">
        <rect x="-4" y="-18" width="8" height="26" rx="2" fill="#FAC775"/>
        <rect x="-7" y="-22" width="14" height="8" rx="3" fill="#FAC775"/>
        <rect x="-3" y="8" width="6" height="4" rx="1" fill="#FAC775"/>
      </g>
    </svg>
  </div>
)

const faqs = [
  {
    q: "Comment ça marche ?",
    a: "Vous réservez un créneau en ligne, puis vous rejoignez Damien en visio via Google Meet. Il diagnostique votre problème et vous guide pas à pas pour réparer votre vélo vous-même."
  },
  {
    q: "De quoi ai-je besoin pour la séance ?",
    a: "D'un smartphone ou ordinateur avec caméra, d'une bonne connexion internet, et bien sûr de votre vélo à portée de main. Un minimum d'outillage de base peut être utile (clés allen, tournevis)."
  },
  {
    q: "Quand est-ce que ma carte est débitée ?",
    a: "Votre carte est uniquement débitée après la réparation. À la réservation, on effectue simplement une autorisation pour sécuriser le créneau."
  },
  {
    q: "Que se passe-t-il si mon problème n'est pas réparable en visio ?",
    a: "Si Damien constate que la réparation nécessite une intervention physique, la séance ne vous sera pas facturée."
  },
  {
    q: "Puis-je annuler mon rendez-vous ?",
    a: "Oui, jusqu'à 24h avant la séance via le lien dans votre email de confirmation. Aucun débit ne sera effectué."
  },
  {
    q: "Quels types de vélos sont pris en charge ?",
    a: "Vélos de route, VTT, vélos de ville, vélos électriques — tous types de vélos sont acceptés."
  },
]

export default function HomePage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>

        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #E6F1FB', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/admin" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>Espace réparateur</Link>
            <Link href="/booking" style={{ background: '#185FA5', color: 'white', padding: '10px 20px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              Réserver
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #042C53 0%, #185FA5 100%)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280, color: 'white' }}>
              <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B5D4F4', marginBottom: 16, fontWeight: 600 }}>Réparation vélo en visio</p>
              <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 800, lineHeight: 1.25, margin: '0 0 16px' }}>
                Réparez votre vélo<br />depuis chez vous
              </h1>
              <p style={{ color: '#B5D4F4', fontSize: 16, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 420 }}>
                Damien, réparateur certifié, vous guide en temps réel par vidéo pour diagnostiquer et réparer votre vélo. Pas besoin de se déplacer.
              </p>
              <Link href="/booking" style={{ display: 'inline-block', background: '#FAC775', color: '#042C53', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
                Prendre rendez-vous →
              </Link>
            </div>
            <HeroIllustration />
          </div>
        </section>

        {/* Comment ça marche */}
        <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#042C53', fontWeight: 800, fontSize: 26, marginBottom: 48 }}>Comment ça marche ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { num: '1', icon: '📅', title: 'Réservez un créneau', desc: 'Choisissez un horaire disponible et renseignez votre problème. Votre carte est sécurisée mais pas encore débitée.' },
              { num: '2', icon: '🎥', title: 'Rejoignez la visio', desc: 'À l\'heure du rendez-vous, connectez-vous via Google Meet depuis votre téléphone ou ordinateur.' },
              { num: '3', icon: '🔧', title: 'Réparez votre vélo', desc: 'Damien vous guide pas à pas. Votre carte n\'est débitée qu\'une fois la réparation effectuée.' },
            ].map(step => (
              <div key={step.num} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #E6F1FB', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#378ADD', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Étape {step.num}</div>
                <h3 style={{ color: '#042C53', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA intermédiaire */}
        <section style={{ background: '#E6F1FB', padding: '48px 24px', textAlign: 'center' }}>
          <h2 style={{ color: '#042C53', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Votre vélo vous attend 🚲</h2>
          <p style={{ color: '#185FA5', fontSize: 16, marginBottom: 28 }}>Réservez votre séance en moins de 2 minutes.</p>
          <Link href="/booking" style={{ display: 'inline-block', background: '#185FA5', color: 'white', padding: '14px 36px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
            Réserver ma séance →
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#042C53', fontWeight: 800, fontSize: 26, marginBottom: 40 }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
                <h3 style={{ color: '#042C53', fontWeight: 700, fontSize: 15, margin: '0 0 8px' }}>{faq.q}</h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

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
