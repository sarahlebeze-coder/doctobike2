import Link from 'next/link'

const font = "'Nunito', sans-serif"

export default function MentionsLegales() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ color: '#042C53', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Mentions légales</h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.</p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#185FA5', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Éditeur du site</h2>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Nom :</strong> Damien Hardy</p>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Statut :</strong> Auto-entrepreneur</p>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>SIRET :</strong> 981 449 051 00029</p>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Adresse :</strong> 30 rue de la Paroisse, 78000 Versailles, France</p>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Email :</strong> <a href="mailto:damien.doctobike@gmail.com" style={{ color: '#185FA5' }}>damien.doctobike@gmail.com</a></p>
            <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Site :</strong> https://doctobike.vercel.app</p>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#185FA5', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Hébergement</h2>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p style={{ margin: '0 0 8px', color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.7 }}><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noreferrer" style={{ color: '#185FA5' }}>vercel.com</a></p>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#185FA5', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Propriété intellectuelle</h2>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
            <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.7 }}>
              L'ensemble du contenu de ce site (textes, images, logos, icônes) est la propriété exclusive de Damien Hardy. Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#185FA5', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Contact</h2>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
            <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.7 }}>
              Pour toute question, vous pouvez nous contacter à l'adresse : <a href="mailto:damien.doctobike@gmail.com" style={{ color: '#185FA5' }}>damien.doctobike@gmail.com</a>
            </p>
          </div>
        </section>

        <Link href="/" style={{ color: '#185FA5', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>← Retour à l'accueil</Link>
      </div>

      <footer style={{ background: '#042C53', padding: '32px 24px', textAlign: 'center', marginTop: 48 }}>
        <p style={{ color: '#B5D4F4', fontSize: 13, margin: 0 }}>© 2024 Doctobike — Réparation vélo en visio</p>
      </footer>
    </div>
  )
}
