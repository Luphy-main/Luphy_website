import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import ClientEffects from '@/components/ClientEffects'
import SchemaOrg from '@/components/SchemaOrg'
import MentionNewsletter from '@/components/MentionNewsletter'
import { SITE_URL, RESSOURCES_LABEL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG } from '@/sanity/lib/queries'
import { imageDimensions } from '@/sanity/lib/image'

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
  edition?: { numero?: number; lienLinkedIn?: string } | null
}

type PtBlock = {
  _type: string
  style?: string
  _key?: string
  children?: { text?: string }[]
}

type H2 = { key: string; id: string; title: string }

const makePtComponents = (h2s: H2[]) => ({
  block: {
    h2: ({ children, value }: { children?: React.ReactNode; value?: { _key?: string } }) => (
      <h2
        id={h2s.find(h => h.key === value?._key)?.id}
        style={{ fontSize: 28, fontWeight: 700, margin: '48px 0 16px', fontFamily: 'var(--font-sora)', scrollMarginTop: 110 }}
      >
        {children}
      </h2>
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
    image: ({ value }: { value?: { asset?: { _ref?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null
      const dims = imageDimensions(value)
      return (
        <figure style={{ margin: '40px 0' }}>
          <Image
            src={`https://cdn.sanity.io/images/fbdmm8o7/production/${value.asset._ref?.replace('image-', '').replace(/-(\w+)$/, '.$1')}`}
            alt={value.alt || ''}
            width={dims?.width ?? 1200}
            height={dims?.height ?? 675}
            sizes="(max-width: 768px) 100vw, 760px"
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
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
})

export async function fetchArticle(slug: string): Promise<Article | null> {
  return client.fetch(ARTICLE_BY_SLUG, { slug })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function slugify(s: string) {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'
}

// Titres H2 du corps, avec un id d'ancre unique généré depuis le titre
function extractH2s(contenu: unknown[]): H2[] {
  const used = new Set<string>()
  return (contenu as PtBlock[])
    .filter(b => b._type === 'block' && b.style === 'h2')
    .map(b => ({ key: b._key || '', title: b.children?.map(c => c.text || '').join('').trim() || '' }))
    .filter(h => h.title)
    .map(h => {
      const base = slugify(h.title)
      let id = base
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`
      used.add(id)
      return { ...h, id }
    })
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
          { '@type': 'ListItem', position: 2, name: RESSOURCES_LABEL, item: `${SITE_URL}/ressources` },
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
        <Link href="/ressources">{RESSOURCES_LABEL}</Link><span>/</span>
        <span>{data.titre}</span>
      </nav>

      <section className="page-hero" style={{ paddingBottom: 48 }}>
        <div className="container" style={{ maxWidth: 780, textAlign: 'left' }}>
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
          {data.chapeau && <p style={{ maxWidth: 'none', margin: 0, fontSize: 18 }}>{data.chapeau}</p>}
        </div>
      </section>

      {h2s.length > 1 && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <nav aria-label="Sommaire" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sky)', margin: '0 0 12px' }}>Sommaire</p>
              <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {h2s.map(h => (
                  <li key={h.id} style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                    <a href={`#${h.id}`} className="toc-link">{h.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>
      )}

      {data.contenu && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <PortableText value={data.contenu as Parameters<typeof PortableText>[0]['value']} components={makePtComponents(h2s)} />
          </div>
        </section>
      )}

      <MentionNewsletter edition={data.edition} maxWidth={780} />

      <ClientEffects />
    </>
  )
}
