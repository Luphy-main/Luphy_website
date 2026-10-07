import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import ClientEffects from '@/components/ClientEffects'
import SchemaOrg from '@/components/SchemaOrg'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_USAGE_BY_SLUG, CAS_USAGE_SLUGS } from '@/sanity/lib/queries'

export const revalidate = 3600
export const dynamicParams = true

type Kpi = { valeur: string; libelle: string }

type CasUsage = {
  _id: string
  titre: string
  slug: string
  client?: string
  categorie: string
  secteur: string
  outils?: string[]
  kpis?: Kpi[]
  enBref?: string
  description?: string
  contenu?: unknown[]
  auteur?: string
  metaDescription?: string
  datePublication?: string
  dateMiseAJour?: string
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(CAS_USAGE_SLUGS)
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data: CasUsage | null = await client.fetch(CAS_USAGE_BY_SLUG, { slug })
  if (!data) return { title: "Cas d'usage | Luphy", robots: { index: false } }
  return {
    title: `${data.titre} | Luphy`,
    description: data.metaDescription || data.description,
    openGraph: {
      title: data.titre,
      description: data.metaDescription || data.description,
      url: `${SITE_URL}/cas-usage/${slug}`,
    },
  }
}

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '36px 0 12px', fontFamily: 'var(--font-sora)', color: 'var(--sky)' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: '24px 0 10px', fontFamily: 'var(--font-sora)' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 18, color: 'rgba(255,255,255,0.85)' }}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ margin: '0 0 18px', paddingLeft: 20 }}>{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 8, color: 'rgba(255,255,255,0.85)' }}>{children}</li>
    ),
  },
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function offerLink(categorie: string): { href: string; label: string } {
  if (categorie === 'Outbound') return { href: '/performance-commerciale', label: 'Performance commerciale' }
  if (categorie.startsWith('CRM')) return { href: '/performance-commerciale', label: 'Performance commerciale' }
  return { href: '/performance-operationnelle', label: 'Performance opérationnelle' }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data: CasUsage | null = await client.fetch(CAS_USAGE_BY_SLUG, { slug })
  if (!data) notFound()

  const offer = offerLink(data.categorie)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.titre,
        description: data.metaDescription || data.description,
        url: `${SITE_URL}/cas-usage/${slug}`,
        datePublished: data.datePublication,
        dateModified: data.dateMiseAJour || data.datePublication,
        author: data.auteur ? { '@type': 'Person', name: data.auteur } : undefined,
        publisher: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: "Cas d'usage", item: `${SITE_URL}/cas-usage` },
          { '@type': 'ListItem', position: 3, name: data.titre, item: `${SITE_URL}/cas-usage/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-usage/${slug}`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/cas-usage">Cas d&apos;usage</Link><span>/</span>
        <span>{data.titre}</span>
      </nav>

      {/* Hero */}
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '4px 12px' }}>{data.categorie}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{data.secteur}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)' }}>{data.titre}</h1>
        {data.client && (
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 8, fontWeight: 500 }}>{data.client}</p>
        )}
        {data.outils && data.outils.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {data.outils.map((o, i) => (
              <span key={i} style={{ fontSize: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 5, padding: '3px 10px', color: 'rgba(255,255,255,0.65)' }}>{o}</span>
            ))}
          </div>
        )}
      </section>

      {/* KPIs */}
      {data.kpis && data.kpis.length > 0 && (
        <section style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(data.kpis.length, 3)}, 1fr)`, gap: 16, marginBottom: 48 }}>
              {data.kpis.map((k, i) => (
                <div key={i} style={{ background: 'rgba(75,159,191,0.06)', border: '1px solid rgba(75,159,191,0.2)', borderRadius: 10, padding: '20px 24px' }}>
                  <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--sky)', fontFamily: 'var(--font-sora)', lineHeight: 1.1 }}>{k.valeur}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, lineHeight: 1.5 }}>{k.libelle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* En bref */}
      {data.enBref && (
        <section style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ background: 'rgba(75,159,191,0.06)', border: '1px solid rgba(75,159,191,0.18)', borderRadius: 10, padding: '24px 28px', marginBottom: 40 }}>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sky)', marginBottom: 12 }}>En bref</p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{data.enBref}</p>
            </div>
          </div>
        </section>
      )}

      {/* Contenu détaillé */}
      {data.contenu && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <PortableText value={data.contenu as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          </div>
        </section>
      )}

      {/* Lien offre */}
      <section style={{ paddingBottom: 32 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Offre concernée :</span>
            <Link href={offer.href} style={{ fontSize: 14, fontWeight: 600, color: 'var(--sky)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {offer.label} {SVG_ARROW}
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Ce cas d&apos;usage<br /><em>vous parle ?</em></h2>
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
