import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doctobike — Réparation de vélo en visio',
  description: 'Réparez votre vélo depuis chez vous. Damien, réparateur certifié, vous guide en temps réel par vidéo. Réservez votre séance en ligne.',
  keywords: ['réparation vélo', 'réparation vélo en ligne', 'mécanicien vélo visio', 'dépannage vélo', 'réparation vélo domicile'],
  authors: [{ name: 'Damien', url: 'https://doctobike.vercel.app' }],
  creator: 'Doctobike',
  metadataBase: new URL('https://doctobike.vercel.app'),
  alternates: {
    canonical: '/',
  },
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
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Nunito', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
