import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENTS_LIST } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cas clients | Luphy',
  description:
    'Études de cas : fonds d\'investissement, boutiques M&A, sociétés de gestion. CRM Affinity, DealCloud, HubSpot, automatisation IA. Résultats mesurés.',
  openGraph: {
    title: 'Cas clients | Luphy',
    description: 'Études de cas documentées avec résultats mesurés. Allyum, Fundora, Hoppi et autres.',
    url: `${SITE_URL}/cas-clients`,
    images: [{ url: `${SITE_URL}/og-cas-clients.png`, width: 1200, height: 630 }],
  },
}

type CasClient = {
  _id: string
  client: string
  slug: string
  secteur?: string
  titre: string
  chapeau?: string
  logo?: Parameters<typeof urlFor>[0]
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
  ],
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default async function Page() {
  const etudes: CasClient[] = await client.fetch(CAS_CLIENTS_LIST)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-clients`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Cas clients</span>
      </nav>

      <section className="page-hero">
        <div className="label">Références</div>
        <h1>Ce qu&apos;on a<br /><em>construit ensemble.</em></h1>
        <p>
          Des missions documentées, des résultats mesurés. Chaque étude retrace le contexte,
          les enjeux, la méthode déployée et les indicateurs obtenus.
        </p>
      </section>

      <section className="section">
        <div className="container">
          {etudes.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Les études de cas arrivent bientôt.
            </p>
          ) : (
            <div className="offers-grid">
              {etudes.map((e, i) => {
                const logoUrl = e.logo ? urlFor(e.logo).width(120).height(60).fit('max').url() : null
                return (
                  <Link
                    key={e._id}
                    href={`/cas-clients/${e.slug}`}
                    className={`offer-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {logoUrl && (
                      <div style={{ marginBottom: 20 }}>
                        <Image src={logoUrl} alt={`Logo ${e.client}`} width={120} height={60} style={{ objectFit: 'contain', maxHeight: 44 }} />
                      </div>
                    )}
                    {e.secteur && (
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px', display: 'inline-block', marginBottom: 16 }}>{e.secteur}</span>
                    )}
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{e.titre}</h3>
                    {e.chapeau && (
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{e.chapeau}</p>
                    )}
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>
                      Lire l&apos;étude {SVG_ARROW}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Vous vous reconnaissez<br /><em>dans ces situations ?</em></h2>
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
