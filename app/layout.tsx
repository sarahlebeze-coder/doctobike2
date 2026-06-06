import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Doctobike — Réparation de vélo en visio',
  description: 'Réparez votre vélo depuis chez vous. Damien, réparateur certifié, vous guide en temps réel par vidéo. Réservez votre séance en ligne.',
  keywords: ['réparation vélo', 'réparation vélo en ligne', 'mécanicien vélo visio', 'dépannage vélo', 'réparation vélo domicile'],
  authors: [{ name: 'Damien', url: 'https://doctobike.vercel.app' }],
  creator: 'Doctobike',
  metadataBase: new URL('https://doctobike.vercel.app'),
  alternates: { canonical: '/' },
  verification: { google: '5cviuzPjNhYDBoNMacz8y4dhxokPKB_kNTL0iHBtyTY' },
  openGraph: {
    title: 'Doctobike — Réparation de vélo en visio',
    description: 'Réparez votre vélo depuis chez vous. Guidé par un expert en temps réel par vidéo.',
    url: 'https://doctobike.vercel.app',
    siteName: 'Doctobike',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doctobike — Réparation de vélo en visio',
    description: 'Réparez votre vélo depuis chez vous. Guidé par un expert en temps réel par vidéo.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const font = "'Nunito', sans-serif"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          .nav-links { display: flex; align-items: center; gap: 8px; }
          .nav-link-text { display: inline; }
          @media (max-width: 480px) {
            .nav-link-text { display: none; }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: font }}>
        <header style={{
          background: 'white',
          borderBottom: '1px solid #E6F1FB',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
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
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 800, color: '#042C53' }}>Doctobike</span>
          </Link>

          <nav className="nav-links">
            <Link href="/" className="nav-link-text" style={{
              fontSize: 14, color: '#444', textDecoration: 'none',
              padding: '8px 12px', borderRadius: 8, fontFamily: font, fontWeight: 600,
            }}>
              Accueil
            </Link>
            <Link href="/about" className="nav-link-text" style={{
              fontSize: 14, color: '#444', textDecoration: 'none',
              padding: '8px 12px', borderRadius: 8, fontFamily: font, fontWeight: 600,
            }}>
              À propos
            </Link>
            <Link href="/booking" style={{
              background: '#185FA5', color: 'white',
              padding: '10px 18px', borderRadius: 10,
              textDecoration: 'none', fontSize: 14, fontWeight: 700,
              fontFamily: font, whiteSpace: 'nowrap',
            }}>
              Réserver
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
