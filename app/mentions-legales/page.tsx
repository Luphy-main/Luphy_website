import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import { SITE_URL, OG_IMAGE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mentions légales | Luphy',
  description:
    "Mentions légales de Luphy SAS, cabinet de conseil et d'intégration spécialisé dans la finance : éditeur, siège social, immatriculation, hébergement, propriété intellectuelle et données personnelles.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  openGraph: {
    title: 'Mentions légales | Luphy',
    description: 'Éditeur, immatriculation, hébergement et données personnelles du site luphy.io.',
    url: `${SITE_URL}/mentions-legales`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Mentions légales', item: `${SITE_URL}/mentions-legales` },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/mentions-legales`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Mentions légales</span>
      </nav>

      <section className="page-hero">
        <div className="label">Informations légales</div>
        <h1>Mentions<br /><em>légales.</em></h1>
        <p>
          Luphy est un cabinet de conseil et d&apos;intégration spécialisé dans la finance
          (CRM, automatisation IA, outbound). Luphy n&apos;est pas un éditeur de logiciel.
        </p>
      </section>

      <section className="section">
        <div className="container legal-page">
          <h2>Éditeur du site</h2>
          <p>
            <strong>LUPHY</strong>, société par actions simplifiée au capital de 4 500,00 €<br />
            Siège social : Centre commercial des Hameaux, 1 place des Hameaux, 91130 Ris-Orangis, France<br />
            Immatriculée au RCS d&apos;Evry sous le numéro 939 716 833<br />
            SIRET : 939 716 833 00016<br />
            TVA intracommunautaire : FR32939716833<br />
            Président : Tristan Camilli<br />
            Directeur général et directeur de la publication : Titouan Galpin<br />
            Contact : <a href="mailto:titouan@luphy.io">titouan@luphy.io</a>
          </p>

          <h2>Hébergement</h2>
          <p>
            Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis<br />
            Site : <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site sont la propriété exclusive de Luphy SAS
            et sont protégés par le droit de la propriété intellectuelle.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations collectées via les formulaires de contact sont utilisées uniquement pour
            répondre à vos demandes. Contact : <a href="mailto:titouan@luphy.io">titouan@luphy.io</a>
          </p>
        </div>
      </section>
    </>
  )
}
