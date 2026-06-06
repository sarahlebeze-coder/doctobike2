import Link from 'next/link'

const font = "'Nunito', sans-serif"

export default function CGV() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', fontFamily: font }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ color: '#042C53', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Conditions Générales de Vente</h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Dernière mise à jour : juin 2024</p>

        {[
          {
            title: '1. Objet',
            content: 'Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Damien Hardy (auto-entrepreneur, SIRET 981 449 051 00029), ci-après "Doctobike", et tout client souhaitant réserver une séance de réparation vélo en visio via le site doctobike.vercel.app.'
          },
          {
            title: '2. Services proposés',
            content: 'Doctobike propose des séances de réparation vélo en visioconférence via Google Meet. Le réparateur guide le client à distance pour diagnostiquer et réparer son vélo. La durée et le tarif de chaque séance sont indiqués lors de la réservation.'
          },
          {
            title: '3. Réservation',
            content: 'La réservation est effectuée en ligne via le formulaire disponible sur le site. Elle est confirmée après saisie des coordonnées du client et validation du paiement par carte bancaire. Un email de confirmation est envoyé automatiquement à l\'adresse indiquée.'
          },
          {
            title: '4. Prix et paiement',
            content: 'Les prix sont indiqués en euros toutes taxes comprises (TTC). Le paiement est sécurisé via Stripe. La carte bancaire est autorisée au moment de la réservation mais n\'est débitée qu\'après la réalisation effective de la séance de réparation. En cas de séance non réalisée pour des raisons imputables à Doctobike, aucun débit ne sera effectué.'
          },
          {
            title: '5. Annulation et remboursement',
            content: 'Le client peut annuler sa réservation sans frais jusqu\'à 24 heures avant l\'heure prévue de la séance, via le lien d\'annulation fourni dans l\'email de confirmation. En cas d\'annulation dans ce délai, l\'autorisation de paiement est immédiatement libérée et aucun débit n\'est effectué. Passé ce délai de 24 heures, la séance ne peut plus être annulée et sera facturée, sauf cas de force majeure.'
          },
          {
            title: '6. Obligations du client',
            content: 'Le client s\'engage à disposer du matériel nécessaire pour la séance : un appareil avec caméra et microphone fonctionnels, une connexion internet stable, son vélo et si possible des outils de base (clés allen, tournevis). Le client s\'engage à être disponible à l\'heure convenue.'
          },
          {
            title: '7. Obligations de Doctobike',
            content: 'Doctobike s\'engage à fournir une prestation de qualité et à être disponible à l\'heure convenue. En cas d\'impossibilité de réaliser la séance pour des raisons imputables à Doctobike, le client sera contacté dans les meilleurs délais et une nouvelle date sera proposée ou un remboursement intégral effectué.'
          },
          {
            title: '8. Limitation de responsabilité',
            content: 'Doctobike fournit des conseils et un accompagnement à distance. La réparation est réalisée par le client lui-même sous la guidance du réparateur. Doctobike ne saurait être tenu responsable des dommages causés au vélo ou à des tiers résultant d\'une mauvaise application des conseils prodigués. Si le problème ne peut être résolu en visio, la séance ne sera pas facturée.'
          },
          {
            title: '9. Données personnelles',
            content: 'Les données collectées lors de la réservation (nom, email, informations de paiement) sont utilisées uniquement pour la gestion des réservations. Elles ne sont pas cédées à des tiers. Conformément au RGPD, le client dispose d\'un droit d\'accès, de rectification et de suppression de ses données en contactant damien.doctobike@gmail.com.'
          },
          {
            title: '10. Droit applicable',
            content: 'Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents de Versailles seront seuls compétents.'
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
