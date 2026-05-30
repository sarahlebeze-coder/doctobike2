import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doctobike — Réparation de vélo à distance',
  description: 'Réservez un créneau visio avec un réparateur de vélo certifié.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
