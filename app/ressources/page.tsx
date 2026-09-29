import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { ARTICLES_LIST } from '@/sanity/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Ressources | Luphy',
  description:
    'Articles, guides et analyses sur le CRM, l\'IA et la performance commerciale pour les métiers de la finance. Par les consultants Luphy.',
  openGraph: {
    title: 'Ressources | Luphy',
    description: 'Articles et guides Luphy : CRM, IA, automatisation, performance commerciale pour la finance.',
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
    { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_URL}/ressources` },
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
  const articles: Article[] = await client.fetch(ARTICLES_LIST)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/ressources`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Ressources</span>
      </nav>

      <section className="page-hero">
        <div className="label">Blog &amp; guides</div>
        <h1>Lire pour<br /><em>décider mieux.</em></h1>
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
            <div className="offers-grid">
              {articles.map((a, i) => (
                <Link
                  key={a._id}
                  href={`/ressources/${a.slug}`}
                  className={`offer-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                    {a.categorie && (
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>{a.categorie}</span>
                    )}
                    {a.datePublication && (
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{formatDate(a.datePublication)}</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{a.titre}</h3>
                  {a.chapeau && (
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{a.chapeau}</p>
                  )}
                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>
                    Lire l&apos;article {SVG_ARROW}
                  </div>
                </Link>
              ))}
            </div>
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
