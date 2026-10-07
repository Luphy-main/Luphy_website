import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import ClientEffects from '@/components/ClientEffects'
import SchemaOrg from '@/components/SchemaOrg'
import { SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG } from '@/sanity/lib/queries'

type Article = {
  _id: string
  titre: string
  slug: string
  chapeau?: string
  contenu?: unknown[]
  auteur?: string
  datePublication?: string
  categorie?: string
  metaDescription?: string
}

type PtBlock = {
  _type: string
  style?: string
  _key?: string
  children?: { text?: string }[]
}

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: '48px 0 16px', fontFamily: 'var(--font-sora)' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontSize: 20, fontWeight: 600, margin: '32px 0 12px', fontFamily: 'var(--font-sora)' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 20, color: 'rgba(255,255,255,0.85)' }}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: '#fff' }}>{children}</strong>,
    link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children?: React.ReactNode }) => (
      <a href={value?.href} target={value?.blank ? '_blank' : undefined} rel={value?.blank ? 'noopener' : undefined}
        style={{ color: 'var(--sky)', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: unknown; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null
      return (
        <figure style={{ margin: '40px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://cdn.sanity.io/images/fbdmm8o7/production/${(value.asset as { _ref?: string })?._ref?.replace('image-', '').replace(/-(\w+)$/, '.$1')}`}
            alt={value.alt || ''}
            style={{ width: '100%', borderRadius: 8 }}
          />
          {value.caption && (
            <figcaption style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 8 }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  return client.fetch(ARTICLE_BY_SLUG, { slug })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function extractH2s(contenu: unknown[]): string[] {
  return (contenu as PtBlock[])
    .filter(b => b._type === 'block' && b.style === 'h2')
    .map(b => b.children?.map(c => c.text || '').join('') || '')
    .filter(Boolean)
}

export default async function ArticleDetailPage({ slug }: { slug: string }) {
  const data = await fetchArticle(slug)
  if (!data) notFound()

  const h2s = data.contenu ? extractH2s(data.contenu) : []

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.titre,
        description: data.metaDescription || data.chapeau,
        url: `${SITE_URL}/ressources/${slug}`,
        datePublished: data.datePublication,
        author: data.auteur ? { '@type': 'Person', name: data.auteur } : undefined,
        publisher: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_URL}/ressources` },
          { '@type': 'ListItem', position: 3, name: data.titre, item: `${SITE_URL}/ressources/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/ressources/${slug}`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/ressources">Ressources</Link><span>/</span>
        <span>{data.titre}</span>
      </nav>

      <section className="page-hero" style={{ maxWidth: 860, paddingBottom: 48 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
          {data.categorie && (
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '4px 12px' }}>{data.categorie}</span>
          )}
          {data.datePublication && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{formatDate(data.datePublication)}</span>
          )}
          {data.auteur && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Par {data.auteur}</span>
          )}
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)' }}>{data.titre}</h1>
        {data.chapeau && <p style={{ maxWidth: 680, fontSize: 18 }}>{data.chapeau}</p>}
      </section>

      {h2s.length > 1 && (
        <section style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <nav aria-label="Sommaire" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sky)', margin: '0 0 12px' }}>Sommaire</p>
              <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {h2s.map((title, i) => (
                  <li key={i} style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>{title}</li>
                ))}
              </ol>
            </nav>
          </div>
        </section>
      )}

      {data.contenu && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <PortableText value={data.contenu as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          </div>
        </section>
      )}

      <ClientEffects />
    </>
  )
}
