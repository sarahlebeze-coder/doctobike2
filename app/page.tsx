import Link from 'next/link'
import Image from 'next/image'

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
      <link href="https://fonts.googleapis.com/css2?family=Nunito
