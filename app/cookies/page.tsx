import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import { SITE_URL, OG_IMAGE } from '@/lib/constants'

// Texte : docs/private/legal/pages-legales-v1.md, page 2 (repris à l'identique)
export const metadata: Metadata = {
  title: 'Politique cookies',
  description:
    'Politique cookies de Luphy : cookies nécessaires, cookies de mesure d’audience HubSpot déposés avec votre accord, statistiques sans cookies et gestion de vos choix.',
  alternates: { canonical: `${SITE_URL}/cookies` },
  openGraph: {
    title: 'Politique cookies | Luphy',
    description: 'Cookies utilisés sur luphy.io et gestion de vos choix.',
    url: `${SITE_URL}/cookies`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Politique cookies', item: `${SITE_URL}/cookies` },
  ],
}

type Cookie = [nom: string, fournisseur: string, finalite: string, duree: string]

const NECESSAIRES: Cookie[] = [
  ['__hs_cookie_cat_pref', 'HubSpot', 'Mémorise les catégories de cookies que vous avez acceptées', '6 mois'],
  ['__hs_opt_out', 'HubSpot', 'Mémorise votre choix pour ne pas vous solliciter à nouveau', '6 mois'],
  ['__hs_do_not_track', 'HubSpot', "Empêche l'envoi d'informations de suivi lorsque vous refusez", '6 mois'],
  ['__hs_gpc_banner_dismiss', 'HubSpot', 'Mémorise la fermeture du bandeau lié au signal Global Privacy Control', '180 jours'],
]

const MESURE: Cookie[] = [
  ['__hstc', 'HubSpot', 'Suivi des visites (horodatages, nombre de sessions)', '6 mois'],
  ['hubspotutk', 'HubSpot', 'Identifiant anonyme du navigateur, permettant de rattacher les visites à un contact déjà connu', '6 mois'],
  ['__hssc', 'HubSpot', 'Suivi de la session en cours', '30 minutes'],
  ['__hssrc', 'HubSpot', 'Détecte le redémarrage du navigateur', 'Fin de session'],
]

const COLONNES = ['Cookie', 'Fournisseur', 'Finalité', 'Durée']

// Tableau classique sur ordinateur ; sur mobile, chaque ligne devient une fiche (data-label, voir globals.css)
function TableCookies({ cookies }: { cookies: Cookie[] }) {
  return (
    <table className="legal-table">
      <thead>
        <tr>{COLONNES.map(c => <th key={c} scope="col">{c}</th>)}</tr>
      </thead>
      <tbody>
        {cookies.map(ligne => (
          <tr key={ligne[0]}>
            {ligne.map((valeur, i) => <td key={i} data-label={COLONNES[i]}>{valeur}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const EMAIL = 'tristan@luphy.io'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cookies`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Politique cookies</span>
      </nav>

      <section className="page-hero">
        <div className="label">Informations légales</div>
        <h1>Politique<br /><em>cookies</em></h1>
      </section>

      <section className="section">
        <div className="container legal-page legal-doc">
          <p className="legal-maj">Dernière mise à jour : 14 octobre 2026</p>

          <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p>Un cookie est un petit fichier déposé sur votre appareil lors de la visite d&apos;un site. Il permet par exemple de mémoriser vos choix ou de mesurer l&apos;audience.</p>

          <h2>Notre principe</h2>
          <p>Aucun cookie de mesure d&apos;audience n&apos;est déposé avant votre accord. Vous pouvez accepter, refuser ou choisir par catégorie dans le bandeau qui s&apos;affiche à votre première visite, puis modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de chaque page. Refuser est aussi simple qu&apos;accepter. Si votre navigateur envoie le signal Global Privacy Control, nous le respectons.</p>

          <h2>Cookies nécessaires (toujours actifs)</h2>
          <p>Ils mémorisent vos choix en matière de cookies. Ils sont exemptés de consentement.</p>
          <TableCookies cookies={NECESSAIRES} />

          <h2>Cookies de mesure d&apos;audience (avec votre accord)</h2>
          <TableCookies cookies={MESURE} />

          <h2>Statistiques sans cookies</h2>
          <p>Nous utilisons aussi Vercel Web Analytics, qui mesure la fréquentation sans déposer de cookie et sans permettre de vous identifier.</p>

          <h2>Gérer vos choix</h2>
          <ul>
            <li>Sur ce site : lien « Gérer les cookies » en bas de page.</li>
            <li>Dans votre navigateur : vous pouvez aussi supprimer ou bloquer les cookies depuis ses paramètres.</li>
          </ul>

          <p>Pour toute question : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
      </section>
    </>
  )
}
