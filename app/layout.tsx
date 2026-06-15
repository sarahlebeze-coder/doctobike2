import type { Metadata } from 'next'
import NavHeader from './components/NavHeader'
export const metadata: Metadata = {
  title: 'Doctobike — Expertise vélo pour entreprises et particuliers',
  description: "L'expertise vélo accessible à tous. Atelier en entreprise pour vos collaborateurs, assistance et dépannage en visio pour les particuliers.",
  keywords: ['réparation vélo', 'atelier vélo entreprise', 'mécanique vélo', 'dépannage vélo visio', 'mobilité douce entreprise'],
  authors: [{ name: 'Damien', url: 'https://doctobike.vercel.app' }],
  creator: 'Doctobike',
  metadataBase: new URL('https://doctobike.vercel.app'),
  alternates: { canonical: '/' },
  verification: { google: '5cviuzPjNhYDBoNMacz8y4dhxokPKB_kNTL0iHBtyTY' },
  openGraph: {
    title: 'Doctobike — Expertise vélo pour entreprises et particuliers',
    description: "L'expertise vélo accessible à tous. Atelier en entreprise, assistance et dépannage en visio.",
    url: 'https://doctobike.vercel.app',
    siteName: 'Doctobike',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doctobike — Expertise vélo pour entreprises et particuliers',
    description: "L'expertise vélo accessible à tous. Atelier en entreprise, assistance et dépannage en visio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <NavHeader />
        {children}
      </body>
    </html>
  )
}
