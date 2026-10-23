import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL, RESSOURCES_LABEL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { ARTICLES_LIST, visibilite } from '@/sanity/lib/queries'
import RessourcesListe from '@/components/RessourcesListe'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `${RESSOURCES_LABEL} | Luphy`,
  // Les vues filtrées (?categorie=...) servent le même HTML : elles pointent vers la page complète
  alternates: { canonical: `${SITE_URL}/ressources` },
  description:
    'Actualités, articles, guides et analyses sur l\'IA, le CRM et la performance commerciale pour les métiers de la finance. Par les consultants Luphy.',
  openGraph: {
    title: `${RESSOURCES_LABEL} | Luphy`,
    description: 'Actualités et guides Luphy : IA, CRM, automatisation, performance commerciale pour la finance.',
    url: `${SITE_URL}/ressources`,
    images: [{ url: `${SITE_URL}/og-ressources.png`, width: 1200, height: 630 }],
  },
}

type Article = {
  _id: string
  titre: string
  slug: string
  chapeau?: string
  datePublication?: string
  categorie?: string
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: RESSOURCES_LABEL, item: `${SITE_URL}/ressources` },
  ],
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function Page() {
  const articles: Article[] = await client.fetch(ARTICLES_LIST, visibilite())

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/ressources`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>{RESSOURCES_LABEL}</span>
      </nav>

      <section className="page-hero">
        <div className="label">Blog &amp; guides</div>
        <h1>Actualités et Ressources<br /><em>IA et Finance</em></h1>
        <p>
          Articles, guides et analyses rédigés par les consultants Luphy sur le CRM,
          l&apos;IA et la performance commerciale pour les métiers de la finance.
        </p>
      </section>

      <section className="section">
        <div className="container">
          {articles.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Les articles arrivent bientôt.
            </p>
          ) : (
            <RessourcesListe
              articles={articles.map(({ datePublication, ...a }) => ({
                ...a,
                date: datePublication ? formatDate(datePublication) : undefined,
              }))}
            />
          )}
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Ces sujets vous<br /><em>concernent ?</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              CRM &amp; commercial {SVG_ARROW}
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              IA &amp; opérationnel
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
