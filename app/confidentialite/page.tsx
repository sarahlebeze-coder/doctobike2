import Link from 'next/link'

const font = "'Nunito', sans-serif"

export default function Confidentialite() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ color: '#042C53', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Politique de confidentialité</h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Dernière mise à jour : juin 2024</p>

        {[
          {
            title: '1. Responsable du traitement',
            content: 'Le responsable du traitement des données personnelles est Damien Hardy, auto-entrepreneur, domicilié au 30 rue de la Paroisse, 78000 Versailles. Contact : damien.doctobike@gmail.com'
          },
          {
            title: '2. Données collectées',
            content: 'Lors de la réservation, nous collectons les données suivantes : nom et prénom, adresse email, description du problème vélo, informations de paiement (traitées directement par Stripe — nous ne stockons pas les données de carte bancaire).'
          },
          {
            title: '3. Finalités du traitement',
            content: 'Les données sont collectées pour les finalités suivantes : gestion et confirmation des réservations, envoi des emails de confirmation et de rappel, traitement du paiement, amélioration du service.'
          },
          {
            title: '4. Base légale',
            content: 'Le traitement de vos données est fondé sur l\'exécution du contrat de prestation de services que vous avez souscrit en effectuant une réservation sur notre site.'
          },
          {
            title: '5. Durée de conservation',
            content: 'Les données sont conservées pendant la durée nécessaire à l\'exécution du service et aux obligations légales (5 ans pour les données comptables). Les données de paiement sont supprimées après chaque transaction.'
          },
          {
            title: '6. Partage des données',
            content: 'Vos données peuvent être partagées avec nos prestataires techniques dans le cadre strict de leur mission : Stripe (paiement), Supabase (base de données), Vercel (hébergement), Google (visioconférence et calendrier). Ces prestataires sont soumis à des obligations de confidentialité strictes.'
          },
          {
            title: '7. Vos droits',
            content: 'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : droit d\'accès à vos données, droit de rectification, droit à l\'effacement, droit à la portabilité, droit d\'opposition. Pour exercer ces droits, contactez-nous à : damien.doctobike@gmail.com'
          },
          {
            title: '8. Cookies',
            content: 'Notre site utilise des cookies techniques indispensables au fonctionnement du site (session, authentification). Nous utilisons également Google Fonts pour l\'affichage des polices. Aucun cookie publicitaire ou de tracking n\'est utilisé.'
          },
          {
            title: '9. Sécurité',
            content: 'Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.'
          },
          {
            title: '10. Contact et réclamation',
            content: 'Pour toute question relative à la protection de vos données, contactez-nous à damien.doctobike@gmail.com. Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale de l\'Informatique et des Libertés) sur le site www.cnil.fr.'
          },
        ].map((section, i) => (
          <section key={i} style={{ marginBottom: 28 }}>
            <h2 style={{ color: '#185FA5', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{section.title}</h2>
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6F1FB', padding: '20px 24px' }}>
              <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.8 }}>{section.content}</p>
            </div>
          </section>
        ))}

        <Link href="/" style={{ color: '#185FA5', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>← Retour à l'accueil</Link>
      </div>

      <footer style={{ background: '#042C53', padding: '32px 24px', textAlign: 'center', marginTop: 48 }}>
        <p style={{ color: '#B5D4F4', fontSize: 13, margin: 0 }}>© 2024 Doctobike — Réparation vélo en visio</p>
      </footer>
    </div>
  )
}
