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

type CasUsage = {
  _id: string
  titre: string
  slug: string
  categorie: string
  secteur: string
  description?: string
  contenu?: unknown[]
  metaDescription?: string
  datePublication?: string
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
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: '40px 0 16px', fontFamily: 'var(--font-sora)' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontSize: 20, fontWeight: 600, margin: '28px 0 12px', fontFamily: 'var(--font-sora)' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 18, color: 'rgba(255,255,255,0.85)' }}>{children}</p>
    ),
  },
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data: CasUsage | null = await client.fetch(CAS_USAGE_BY_SLUG, { slug })
  if (!data) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.titre,
        description: data.metaDescription || data.description,
        url: `${SITE_URL}/cas-usage/${slug}`,
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

      <section className="page-hero">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '4px 12px' }}>{data.categorie}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', padding: '4px 0' }}>{data.secteur}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>{data.titre}</h1>
        {data.description && <p style={{ maxWidth: 700 }}>{data.description}</p>}
      </section>

      {data.contenu && (
        <section className="section">
          <div className="container" style={{ maxWidth: 780 }}>
            <PortableText value={data.contenu as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          </div>
        </section>
      )}

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
