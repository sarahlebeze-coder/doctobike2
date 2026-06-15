import Link from 'next/link'

const font = "'Plus Jakarta Sans', sans-serif"

const HeroIllustration = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flexShrink: 0, width: 340 }}>
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20 }}>
      <div style={{ color: '#E24B4A', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>SANS DOCTOBIKE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: '😤', text: 'Déplacement atelier' },
          { icon: '⏳', text: "File d'attente" },
          { icon: '💸', text: 'Coût imprévisible' },
          { icon: '📅', text: "Semaines d'attente" },
          { icon: '🚫', text: 'Vélo inaccessible' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', fontSize: 13 }}>
            <span>{item.icon}</span> {item.text}
          </div>
        ))}
      </div>
    </div>
    <div style={{ background: 'rgba(77,184,146,0.15)', border: '1px solid #4DB892', borderRadius: 14, padding: 20 }}>
      <div style={{ color: '#FAC775', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>AVEC DOCTOBIKE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: '🏠', text: 'Depuis chez vous' },
          { icon: '⚡', text: 'RDV immédiat' },
          { icon: '✅', text: 'Prix fixe et clair' },
          { icon: '🎥', text: 'Visio en direct' },
          { icon: '🔧', text: 'Guidé pas à pas' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontSize: 13 }}>
            <span>{item.icon}</span> {item.text}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const faqs = [
  { q: "Comment ça marche ?", a: "Vous réservez un créneau en ligne, puis vous rejoignez Damien en visio via Google Meet. Il diagnostique votre problème et vous guide pas à pas pour réparer votre vélo vous-même." },
  { q: "De quoi ai-je besoin pour la séance ?", a: "D'un smartphone ou ordinateur avec caméra, d'une bonne connexion internet, et bien sûr de votre vélo à portée de main. Un minimum d'outillage de base peut être utile (clés allen, tournevis)." },
  { q: "Quand est-ce que ma carte est débitée ?", a: "Votre carte est uniquement débitée après la réparation. À la réservation, on effectue simplement une autorisation pour sécuriser le créneau." },
  { q: "Que se passe-t-il si mon problème n'est pas réparable en visio ?", a: "Si Damien constate que la réparation nécessite une intervention physique, la séance ne vous sera pas facturée." },
  { q: "Puis-je annuler mon rendez-vous ?", a: "Oui, jusqu'à 24h avant la séance via le lien dans votre email de confirmation. Aucun débit ne sera effectué." },
  { q: "Quels types de vélos sont pris en charge ?", a: "Vélos de route, VTT, vélos de ville, vélos électriques — tous types de vélos sont acceptés." },
]

const PACKS = [
  { key: 'decouverte', name: 'Pack Découverte', price: '30€', duration: '40 min', desc: 'Diagnostic rapide, panne simple.', bg: '#E8F5EE', text: '#1B4D3E', sub: '#2E8B6A' },
  { key: 'depannage',  name: 'Pack Dépannage',  price: '45€', duration: '45 min – 1h', desc: 'Réparation complète guidée.', bg: '#1B4D3E', text: 'white', sub: 'rgba(255,255,255,0.65)' },
  { key: 'expert',    name: 'Pack Expert',     price: '90€', duration: "Jusqu'à 2h", desc: 'Révision approfondie, réglages complexes.', bg: '#2E8B6A', text: 'white', sub: 'rgba(255,255,255,0.65)' },
]

export default function CoachingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFCFA', fontFamily: font }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2E8B6A 100%)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: 280, color: 'white' }}>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16, fontWeight: 600 }}>Assistance & dépannage vélo</p>
            <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 800, lineHeight: 1.25, margin: '0 0 16px' }}>
              Réparez votre vélo<br />depuis chez vous
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 420 }}>
              Damien, mécanicien certifié RNCP, vous guide en temps réel par vidéo pour diagnostiquer et réparer votre vélo. Pas besoin de se déplacer.
            </p>
            <Link href="/booking" style={{ display: 'inline-block', background: '#FAC775', color: '#1B4D3E', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
              Prendre rendez-vous →
            </Link>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 48 }}>Comment ça marche ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { num: '1', icon: '📅', title: 'Réservez un créneau', desc: 'Choisissez un horaire disponible et renseignez votre problème. Votre carte est sécurisée mais pas encore débitée.' },
            { num: '2', icon: '🎥', title: 'Rejoignez la visio', desc: "À l'heure du rendez-vous, connectez-vous via Google Meet depuis votre téléphone ou ordinateur." },
            { num: '3', icon: '🔧', title: 'Réparez votre vélo', desc: "Damien vous guide pas à pas. Votre carte n'est débitée qu'une fois la réparation effectuée." },
          ].map(step => (
            <div key={step.num} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #E8F5EE', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
                {step.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2E8B6A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Étape {step.num}</div>
              <h3 style={{ color: '#1B4D3E', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section style={{ background: '#E8F5EE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 12 }}>Nos formules</h2>
          <p style={{ textAlign: 'center', color: '#2E8B6A', fontSize: 15, marginBottom: 40 }}>Choisissez le pack adapté à votre besoin</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {PACKS.map(pack => (
              <div key={pack.key} style={{ background: pack.bg, borderRadius: 20, padding: 28, border: pack.key === 'depannage' ? '2px solid #FAC775' : '1px solid rgba(0,0,0,0.06)' }}>
                {pack.key === 'depannage' && (
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAC775', marginBottom: 10 }}>⭐ Le plus populaire</div>
                )}
                <h3 style={{ color: pack.text, fontWeight: 800, fontSize: 18, margin: '0 0 6px', fontFamily: font }}>{pack.name}</h3>
                <p style={{ color: pack.sub, fontSize: 13, margin: '0 0 16px' }}>{pack.duration}</p>
                <div style={{ fontSize: 32, fontWeight: 800, color: pack.text, fontFamily: font, marginBottom: 12 }}>{pack.price}</div>
                <p style={{ color: pack.sub, fontSize: 14, lineHeight: 1.5, margin: '0 0 20px' }}>{pack.desc}</p>
                <Link href={`/booking?pack=${pack.key}`} style={{
                  display: 'block', textAlign: 'center',
                  background: pack.key === 'depannage' ? '#FAC775' : 'rgba(255,255,255,0.15)',
                  color: pack.key === 'depannage' ? '#1B4D3E' : pack.text,
                  border: pack.key === 'decouverte' ? '1.5px solid #2E8B6A' : 'none',
                  padding: '12px 20px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 700,
                }}>
                  Choisir ce pack →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#1B4D3E', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Votre vélo vous attend 🚲</h2>
        <p style={{ color: '#2E8B6A', fontSize: 16, marginBottom: 28 }}>Réservez votre séance en moins de 2 minutes.</p>
        <Link href="/booking" style={{ display: 'inline-block', background: '#1B4D3E', color: 'white', padding: '14px 36px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
          Réserver ma séance →
        </Link>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 24px 64px', maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1B4D3E', fontWeight: 800, fontSize: 26, marginBottom: 40 }}>Questions fréquentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #E8F5EE', padding: '20px 24px' }}>
              <h3 style={{ color: '#1B4D3E', fontWeight: 700, fontSize: 15, margin: '0 0 8px' }}>{faq.q}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1B4D3E', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 12px' }}>© 2024 Doctobike — Assistance & dépannage vélo</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/mentions-legales" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/cgv" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>CGV</Link>
          <Link href="/confidentialite" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Confidentialité</Link>
          <Link href="/booking" style={{ color: '#4DB892', fontSize: 13, textDecoration: 'none' }}>Prendre rendez-vous</Link>
        </div>
      </footer>

    </div>
  )
}
