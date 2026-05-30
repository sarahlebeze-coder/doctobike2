import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doctobike — Réparation de vélo en ligne',
  description: 'Réservez votre réparation de vélo en ligne avec Damien, réparateur certifié.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Nunito', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
