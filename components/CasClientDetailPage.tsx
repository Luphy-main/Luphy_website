import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import ClientEffects from '@/components/ClientEffects'
import SchemaOrg from '@/components/SchemaOrg'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENT_BY_SLUG } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type Resultat = { _key: string; metrique: string; label: string }

type CasClient = {
  _id: string
  client: string
  slug: string
  secteur?: string
  titre: string
  chapeau?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any
  enjeux?: string[]
  solution?: unknown[]
  resultats?: Resultat[]
  verbatim?: string
  verbatimAuteur?: string
  verbatimFonction?: string
  metaDescription?: string
}

const ptComponents = {
  block: {
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

export async function fetchCasClient(slug: string): Promise<CasClient | null> {
  return client.fetch(CAS_CLIENT_BY_SLUG, { slug })
}

export default async function CasClientDetailPage({ slug }: { slug: string }) {
  const data = await fetchCasClient(slug)
  if (!data) notFound()

  const logoUrl = data.logo ? urlFor(data.logo).width(160).height(80).fit('max').url() : null

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.titre,
        description: data.metaDescription || data.chapeau,
        url: `${SITE_URL}/cas-clients/${slug}`,
        publisher: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
          { '@type': 'ListItem', position: 3, name: data.client, item: `${SITE_URL}/cas-clients/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-clients/${slug}`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/cas-clients">Cas clients</Link><span>/</span>
        <span>{data.client}</span>
      </nav>

      <section className="page-hero">
        {logoUrl && (
          <div style={{ marginBottom: 24 }}>
            <Image src={logoUrl} alt={`Logo ${data.client}`} width={160} height={80} style={{ objectFit: 'contain', maxHeight: 56 }} />
          </div>
        )}
        {data.secteur && <div className="label">{data.secteur}</div>}
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)' }}>{data.titre}</h1>
        {data.chapeau && <p style={{ maxWidth: 680 }}>{data.chapeau}</p>}
      </section>

      {data.resultats && data.resultats.length > 0 && (
        <section className="section" style={{ background: 'var(--dark)', paddingTop: 56, paddingBottom: 56 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
              {data.resultats.map(r => (
                <div key={r._key} style={{ textAlign: 'center', minWidth: 140 }}>
                  <div style={{ fontSize: 42, fontWeight: 800, fontFamily: 'var(--font-sora)', color: 'var(--sky)', lineHeight: 1 }}>{r.metrique}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.enjeux && data.enjeux.length > 0 && (
        <section className="section">
          <div className="container" style={{ maxWidth: 820 }}>
            <div className="label reveal">Enjeux identifiés</div>
            <div className="divider reveal" style={{ margin: '0 0 24px' }} />
            <div className="problems-grid">
              {data.enjeux.map((e, i) => (
                <div key={i} className={`problem-item reveal${i > 0 ? ' d1' : ''}`}>
                  <div className="problem-dot" />
                  <p>{e}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.solution && (
        <section className="section" style={{ background: 'var(--dark)', paddingTop: 64, paddingBottom: 64 }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <div className="label reveal">Solution déployée</div>
            <div className="divider reveal" style={{ margin: '0 0 24px' }} />
            <PortableText value={data.solution as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          </div>
        </section>
      )}

      {data.verbatim && (
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <blockquote className="reveal" style={{
              borderLeft: '3px solid var(--sky)', paddingLeft: 28, margin: '0 auto',
              fontSize: 20, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7,
            }}>
              &ldquo;{data.verbatim}&rdquo;
            </blockquote>
            {data.verbatimAuteur && (
              <div className="reveal" style={{ marginTop: 20, paddingLeft: 31 }}>
                <strong style={{ display: 'block', fontSize: 14 }}>{data.verbatimAuteur}</strong>
                {data.verbatimFonction && (
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{data.verbatimFonction}, {data.client}</span>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Ce cas vous parle ?<br /><em>Parlons de votre situation.</em></h2>
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
