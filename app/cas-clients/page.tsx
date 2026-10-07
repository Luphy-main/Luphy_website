import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENTS_LIST } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cas clients | Luphy',
  description:
    'Des résultats mesurés chez des fonds, boutiques M&A et fintechs. Études de cas documentées : CRM, automatisation, IA.',
  openGraph: {
    title: 'Cas clients | Luphy',
    description: 'Études de cas documentées avec résultats mesurés. Allyum, Fundora, Hoppi et autres.',
    url: `${SITE_URL}/cas-clients`,
    images: [{ url: `${SITE_URL}/og-cas-clients.png`, width: 1200, height: 630 }],
  },
}

type Kpi = { _key?: string; valeur: string; unite?: string; libelle: string; source?: string }
type CasClient = {
  _id: string
  client: string
  slug: string
  secteur?: string
  pole?: string
  outils?: string[]
  titre: string
  chapeau?: string
  ordre?: number
  aLaUne?: boolean
  kpiPrincipal?: Kpi
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageCouverture?: any
}

type SearchParams = Promise<{ secteur?: string }>

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const SVG_ARROW = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { secteur: filterSlug } = await searchParams
  const allEtudes: CasClient[] = await client.fetch(CAS_CLIENTS_LIST)

  const filtered = filterSlug
    ? allEtudes.filter(e => e.secteur && toSlug(e.secteur) === filterSlug)
    : allEtudes

  const featured = filtered.find(e => e.aLaUne) ?? null
  const rest = filtered.filter(e => !e.aLaUne)

  const secteurs = [...new Set(allEtudes.map(e => e.secteur).filter(Boolean) as string[])]

  const listSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Cas clients Luphy',
        description: 'Des résultats mesurés chez des fonds, boutiques M&A et fintechs.',
        url: `${SITE_URL}/cas-clients`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: allEtudes.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/cas-clients/${e.slug}`,
            name: e.titre,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-clients`} />

      {/* ── Hero ── */}
      <header className="cc-lhero container">
        <span className="cc-eyebrow">Cas clients</span>
        <h1>
          Des résultats mesurés{' '}
          <span className="cc-accent">chez des fonds, boutiques M&amp;A et fintechs</span>
        </h1>
        <p>Chaque étude détaille le problème de départ, ce que Luphy a mis en place et les résultats chiffrés, validés avec le client.</p>
      </header>

      {/* ── Filtres ── */}
      <div className="container">
        <nav className="cc-filters" role="toolbar" aria-label="Filtrer les études de cas">
          <a className={`cc-chip${!filterSlug ? ' on' : ''}`} href="/cas-clients">Toutes</a>
          {secteurs.map(s => (
            <a
              key={s}
              className={`cc-chip${filterSlug === toSlug(s) ? ' on' : ''}`}
              href={`/cas-clients?secteur=${toSlug(s)}`}
            >
              {s}
            </a>
          ))}
        </nav>

        {/* ── Carte à la une ── */}
        {featured && (() => {
          const featuredCover = featured.imageCouverture ? urlFor(featured.imageCouverture).width(1200).height(400).fit('crop').url() : null
          const featuredLogo = featured.logo ? urlFor(featured.logo).height(48).fit('max').url() : null
          return (
            <article className="cc-featured">
              {featuredCover && (
                <div className="cc-featured-cover" style={{ gridColumn: '1 / -1' }}>
                  <Image
                    src={featuredCover}
                    alt={featured.imageCouverture?.alt ?? `Image ${featured.client}`}
                    width={1200}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}
              <div>
                {featuredLogo
                  ? <div className="cc-logo-tile" style={{ marginBottom: 12 }}>
                      <Image src={featuredLogo} alt={`Logo ${featured.client}`} width={120} height={40} style={{ objectFit: 'contain', maxHeight: 40, width: 'auto' }} />
                    </div>
                  : <span className="cc-chip accent" style={{ marginBottom: 12, display: 'inline-flex' }}>
                      {[featured.secteur, ...(featured.outils ?? [])].filter(Boolean).join(' · ')}
                    </span>
                }
                <h2>{featured.titre}</h2>
                {featured.chapeau && <p style={{ color: 'var(--text-2)', margin: '0 0 24px', fontSize: 16 }}>{featured.chapeau}</p>}
                <a className="btn-primary" href={`/cas-clients/${featured.slug}`}>
                  Lire l&apos;étude {featured.client} {SVG_ARROW}
                </a>
              </div>
              {featured.kpiPrincipal && (
                <div className="cc-featured-kpis">
                  <div className="cc-stat">
                    <div className="cc-stat-n">
                      {featured.kpiPrincipal.valeur}
                      {featured.kpiPrincipal.unite && <small>{featured.kpiPrincipal.unite}</small>}
                    </div>
                    <p>{featured.kpiPrincipal.libelle}</p>
                  </div>
                </div>
              )}
            </article>
          )
        })()}

        {/* ── Grille de cartes ── */}
        {filtered.length === 0 ? (
          <div className="cc-empty">
            <p>Aucune étude pour ce filtre pour l&apos;instant.</p>
            <a href="/cas-clients" style={{ color: 'var(--gold)', fontSize: 14, marginTop: 12, display: 'inline-block' }}>
              Voir toutes les études
            </a>
          </div>
        ) : rest.length > 0 ? (
          <div className="cc-cards">
            {rest.map(e => {
              const kpi = e.kpiPrincipal
              const cardCover = e.imageCouverture ? urlFor(e.imageCouverture).width(600).height(338).fit('crop').url() : null
              const cardLogo = e.logo ? urlFor(e.logo).height(48).fit('max').url() : null
              return (
                <a key={e._id} className="cc-card" href={`/cas-clients/${e.slug}`}>
                  {cardCover && (
                    <div className="cc-card-cover">
                      <Image
                        src={cardCover}
                        alt={e.imageCouverture?.alt ?? `Image ${e.client}`}
                        width={600}
                        height={338}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  )}
                  <div className="cc-card-body">
                    <div className="cc-card-meta-row">
                      {cardLogo
                        ? <div className="cc-card-logo-tile">
                            <Image src={cardLogo} alt={`Logo ${e.client}`} width={80} height={28} style={{ objectFit: 'contain', maxHeight: 28, width: 'auto' }} />
                          </div>
                        : <span className="cc-card-logo">{e.client.toUpperCase()}</span>
                      }
                      {e.secteur && <span className="cc-chip" style={{ minHeight: 28, fontSize: 12 }}>{e.secteur}</span>}
                    </div>
                    <p className="cc-card-client">
                      <strong className="cc-accent">{e.client}</strong>
                      {e.secteur && <span style={{ color: 'var(--text-3)', fontWeight: 400 }}> · {e.secteur}</span>}
                    </p>
                    {kpi && (
                      <div className="cc-kpi-inline">
                        <span className="cc-kpi-inline-val">{kpi.valeur}{kpi.unite}</span>
                        <span className="cc-kpi-inline-lbl">{kpi.libelle}</span>
                      </div>
                    )}
                    <h3>{e.titre}</h3>
                    {e.chapeau && <p className="cc-card-chapeau">{e.chapeau}</p>}
                    {e.outils && e.outils.length > 0 && (
                      <div className="cc-card-tools">
                        {e.outils.map(o => <span key={o} className="cc-tool-chip">{o}</span>)}
                      </div>
                    )}
                    <span className="cc-more">Lire l&apos;étude {SVG_ARROW}</span>
                  </div>
                </a>
              )
            })}
          </div>
        ) : null}
      </div>

      {/* ── CTA ── */}
      <section className="cta-sec" style={{ marginTop: 0 }}>
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Votre entreprise pourrait<br /><em>être la prochaine.</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              CRM &amp; commercial {SVG_ARROW}
            </a>
            <Link href="/ia-automation" className="btn-outline">
              IA &amp; opérationnel
            </Link>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
