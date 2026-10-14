import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import { SITE_URL, OG_IMAGE } from '@/lib/constants'

// Texte : docs/private/legal/pages-legales-v1.md, page 1 (repris à l'identique)
export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité de Luphy : données collectées, finalités, bases légales, durées de conservation, destinataires et exercice de vos droits.",
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  openGraph: {
    title: 'Politique de confidentialité | Luphy',
    description: 'Données personnelles collectées par Luphy, finalités, conservation et exercice de vos droits.',
    url: `${SITE_URL}/confidentialite`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Politique de confidentialité', item: `${SITE_URL}/confidentialite` },
  ],
}

const EMAIL = 'tristan@luphy.io'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/confidentialite`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Politique de confidentialité</span>
      </nav>

      <section className="page-hero">
        <div className="label">Informations légales</div>
        <h1>Politique de<br /><em>confidentialité</em></h1>
      </section>

      <section className="section">
        <div className="container legal-page legal-doc">
          <p className="legal-maj">Dernière mise à jour : 14 octobre 2026</p>

          <h2>Qui est responsable de vos données ?</h2>
          <p>LUPHY, société par actions simplifiée au capital de 4 500,00 €, immatriculée au RCS d&apos;Evry sous le numéro 939 716 833, dont le siège social est situé Centre commercial des Hameaux, 1 place des Hameaux, 91130 Ris-Orangis (« Luphy », « nous »).</p>
          <p>Pour toute question sur vos données personnelles : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>

          <h2>Quelles données collectons-nous, pourquoi et sur quelle base ?</h2>
          <p><strong>1. Prise de rendez-vous et échanges avec nous</strong></p>
          <p>Quand vous réservez un échange via nos liens de prise de rendez-vous ou que vous nous écrivez par e-mail, nous recevons les informations que vous nous transmettez : nom, prénom, adresse e-mail, entreprise, fonction, et le contenu de votre message.</p>
          <p>Finalité : organiser l&apos;échange, répondre à votre demande et, le cas échéant, préparer une proposition.</p>
          <p>Base légale : mesures précontractuelles prises à votre demande et notre intérêt légitime à répondre aux sollicitations.</p>

          <p><strong>2. Gestion de la relation commerciale</strong></p>
          <p>Ces informations sont enregistrées dans notre outil de gestion de la relation client (HubSpot) pour suivre nos échanges avec vous.</p>
          <p>Base légale : notre intérêt légitime à gérer nos relations avec nos clients et prospects professionnels, ou l&apos;exécution du contrat lorsque vous êtes client.</p>

          <p><strong>3. Mesure d&apos;audience</strong></p>
          <ul>
            <li>Statistiques de visite sans cookies (Vercel Web Analytics) : nombre de visites, pages consultées, pays, type d&apos;appareil, site d&apos;origine. Ces données sont agrégées et ne permettent pas de vous identifier. Base légale : notre intérêt légitime à mesurer la fréquentation du site.</li>
            <li>Mesure d&apos;audience détaillée (HubSpot) : uniquement si vous l&apos;acceptez dans le bandeau cookies. Elle nous permet de connaître les pages consultées et, si vous êtes déjà en contact avec nous, de les rattacher à vos échanges. Base légale : votre consentement, que vous pouvez retirer à tout moment via le lien « Gérer les cookies » en bas de page.</li>
          </ul>

          <p>Nous ne vendons pas vos données, nous ne les utilisons pas pour de la publicité ciblée et nous ne prenons aucune décision automatisée produisant des effets juridiques à votre égard.</p>

          <h2>Combien de temps conservons-nous vos données ?</h2>
          <ul>
            <li>Prospects : 3 ans à compter de notre dernier échange.</li>
            <li>Clients : pendant la durée de la relation contractuelle, puis selon les durées légales de conservation (par exemple 10 ans pour les pièces comptables).</li>
            <li>Cookies de mesure d&apos;audience HubSpot : 6 mois au maximum (voir la Politique cookies).</li>
            <li>Statistiques Vercel : données agrégées, sans identification.</li>
          </ul>

          <h2>Qui a accès à vos données ?</h2>
          <p>Uniquement l&apos;équipe de Luphy, et nos prestataires techniques, agissant pour notre compte :</p>
          <ul>
            <li>HubSpot (gestion de la relation client, prise de rendez-vous, mesure d&apos;audience). Notre compte HubSpot est hébergé dans l&apos;Union européenne.</li>
            <li>Vercel (hébergement du site et statistiques sans cookies).</li>
            <li>Google Workspace (messagerie électronique).</li>
          </ul>
          <p>Certains de ces prestataires sont établis aux États-Unis ou peuvent y accéder aux données. Ces transferts sont encadrés par le cadre de protection des données UE–États-Unis (Data Privacy Framework) lorsque le prestataire y adhère, ou par les clauses contractuelles types de la Commission européenne.</p>

          <h2>Quels sont vos droits ?</h2>
          <p>Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et d&apos;opposition, ainsi que du droit de retirer votre consentement à tout moment et de définir des directives sur le sort de vos données après votre décès.</p>
          <p>Pour les exercer : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Nous répondons dans un délai d&apos;un mois.</p>
          <p>Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>).</p>

          <h2>Cookies</h2>
          <p>Voir notre Politique cookies : <Link href="/cookies">/cookies</Link>.</p>
        </div>
      </section>
    </>
  )
}
