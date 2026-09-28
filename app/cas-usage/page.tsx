import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_USAGE_LIST } from '@/sanity/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Cas d'usage | Luphy",
  description:
    "Bibliothèque de cas d'usage CRM, automatisation et IA pour les acteurs de la finance. Alimentée au fil de l'eau.",
  openGraph: {
    title: "Cas d'usage CRM et IA | Luphy",
    description: "Cas d'usage CRM, automatisation et IA pour la finance.",
    url: `${SITE_URL}/cas-usage`,
  },
}

type CasUsage = {
  _id: string
  titre: string
  slug: string
  categorie: string
  secteur: string
  description: string
  datePublication?: string
}

const CATEGORIES = ['Tous', 'CRM Affinity', 'CRM DealCloud', 'CRM HubSpot', 'CRM Pipedrive', 'CRM Notion', 'Automatisation', 'IA Claude']

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: "Cas d'usage", item: `${SITE_URL}/cas-usage` },
  ],
}

const SVG_ARROW = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default async function Page() {
  const items: CasUsage[] = await client.fetch(CAS_USAGE_LIST)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-usage`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Cas d&apos;usage</span>
      </nav>

      <section className="page-hero">
        <div className="label">Bibliothèque</div>
        <h1>Cas d&apos;usage<br /><em>CRM &amp; IA</em></h1>
        <p>
          Des exemples concrets tirés de nos missions : quel outil, pour quel processus,
          avec quel résultat. Alimentée au fil de l&apos;eau avec des acteurs de la finance.
        </p>
      </section>

      <section className="section">
        <div className="container">
          {/* Filtres statiques, interactifs en Phase 4 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {CATEGORIES.map((cat, i) => (
              <span key={i}
                style={{
                  background: i === 0 ? 'var(--sky)' : 'rgba(75,159,191,0.1)',
                  border: `1px solid ${i === 0 ? 'var(--sky)' : 'rgba(75,159,191,0.25)'}`,
                  color: i === 0 ? 'var(--deep)' : 'var(--sky)',
                  borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600,
                }}>
                {cat}
              </span>
            ))}
          </div>

          {items.length === 0 ? (
            <div style={{ padding: '64px 0', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Les cas d&apos;usage arrivent bientôt. Revenez dans quelques jours.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {items.map((c, i) => (
                <Link key={c._id} href={`/cas-usage/${c.slug}`}
                  className={`offer-card sky-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}
                  style={{ textDecoration: 'none' }}>
                  <div className="offer-card-line" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>
                      {c.categorie}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{c.secteur}</span>
                  </div>
                  <h3 style={{ fontSize: 17, marginBottom: 10 }}>{c.titre}</h3>
                  {c.description && (
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{c.description}</p>
                  )}
                  <div className="card-link" style={{ marginTop: 20, color: 'var(--sky)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Lire le cas d&apos;usage {SVG_ARROW}
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
          <h2 className="reveal">Votre cas d&apos;usage<br /><em>mérite une réponse précise.</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur. Votre devis en moins d&apos;une semaine.
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
