import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, nom, email, telephone, entreprise, date, nombreVelos } = body

    if (!prenom || !nom || !email || !entreprise) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const dateFormatted = date
      ? new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : 'Non précisée'

    await transporter.sendMail({
      from: `"Doctobike" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // notif à Damien
      replyTo: email,
      subject: `🏢 Nouvelle demande de devis entreprise — ${entreprise}`,
      html: `
        <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #F8FAFF; padding: 32px; border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #042C53, #185FA5); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: white; font-size: 22px; margin: 0;">Nouvelle demande de devis</h1>
            <p style="color: #B5D4F4; margin: 8px 0 0; font-size: 14px;">Intervention entreprise</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #E6F1FB; margin-bottom: 16px;">
            <h2 style="color: #042C53; font-size: 16px; margin: 0 0 16px;">👤 Contact</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #666; width: 40%;">Nom</td><td style="color: #042C53; font-weight: 700;">${prenom} ${nom}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Email</td><td><a href="mailto:${email}" style="color: #185FA5;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Téléphone</td><td style="color: #042C53;">${telephone || '—'}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Entreprise</td><td style="color: #042C53; font-weight: 700;">${entreprise}</td></tr>
            </table>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #E6F1FB;">
            <h2 style="color: #042C53; font-size: 16px; margin: 0 0 16px;">🚲 Détails de l'intervention</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #666; width: 40%;">Date envisagée</td><td style="color: #042C53; font-weight: 700;">${dateFormatted}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Nombre de vélos</td><td style="color: #042C53; font-weight: 700;">${nombreVelos || 'Non précisé'}</td></tr>
            </table>
          </div>

          <p style="text-align: center; color: #888; font-size: 12px; margin-top: 24px;">
            Répondre directement à cet email pour contacter ${prenom} ${nom}
          </p>
        </div>
      `,
    })

    // Email de confirmation au prospect
    await transporter.sendMail({
      from: `"Damien — Doctobike" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✅ Votre demande de devis a bien été reçue — Doctobike`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #F8FAFF; padding: 32px; border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #042C53, #185FA5); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; font-size: 20px; margin: 0;">Demande bien reçue !</h1>
          </div>
          <p style="color: #333; font-size: 15px; line-height: 1.7;">Bonjour ${prenom},</p>
          <p style="color: #333; font-size: 15px; line-height: 1.7;">
            Merci pour votre demande d'intervention vélo pour <strong>${entreprise}</strong>. Je reviens vers vous sous 48h avec une proposition adaptée à vos besoins.
          </p>
          <p style="color: #333; font-size: 15px; line-height: 1.7;">À très bientôt,</p>
          <p style="color: #185FA5; font-weight: 700; font-size: 15px;">Damien — Doctobike</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erreur devis-entreprise:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
