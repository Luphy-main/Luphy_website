import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { SITE_URL } from '@/lib/constants'
import { CATEGORIE_OPERATION } from '@/sanity/lib/categories'
import { getEditions, getEdition, getLienAbonnement, titreEdition, formatDateFr } from '@/sanity/lib/newsletter'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ numero: string }> }

export async function generateStaticParams() {
  const editions = await getEditions()
  return editions.map(e => ({ numero: String(e.numero) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { numero } = await params
  const e = await getEdition(numero)
  if (!e) return { title: 'Newsletter | Luphy', robots: { index: false } }
  const description = e.introduction || `Édition n° ${e.numero} de la newsletter Luphy sur LinkedIn.`
  return {
    title: `${titreEdition(e)} | Luphy`,
    description,
    alternates: { canonical: `${SITE_URL}/ressources/newsletter/${e.numero}` },
    openGraph: {
      title: titreEdition(e),
      description,
      url: `${SITE_URL}/ressources/newsletter/${e.numero}`,
      images: [{ url: `${SITE_URL}/og-ressources.png`, width: 1200, height: 630 }],
    },
  }
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type Carte = { _id: string; href: string; badge?: string; titre: string; texte?: string; action: string }

function Rubrique({ label, cartes, fond }: { label: string; cartes: Carte[]; fond?: boolean }) {
  if (cartes.length === 0) return null
  return (
    <section className="section" style={fond ? { background: 'var(--dark)' } : undefined}>
      <div className="container">
        <div className="label reveal">{label}</div>
        <div className="divider reveal" style={{ margin: '0 0 32px' }} />
        <div className="offers-grid">
          {cartes.map((c, i) => (
            <Link key={c._id} href={c.href} className={`offer-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`} style={{ textDecoration: 'none' }}>
              {c.badge && (
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>{c.badge}</span>
                </div>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{c.titre}</h3>
              {c.texte && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{c.texte}</p>}
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>
                {c.action} {SVG_ARROW}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function Page({ params }: Props) {
  const { numero } = await params
  const [e, lienAbonnement] = await Promise.all([getEdition(numero), getLienAbonnement()])
  if (!e) notFound()

  const versCarte = (a: (typeof e.articles)[number]): Carte => ({
    _id: a._id, href: `/ressources/${a.slug}`, badge: a.categorie, titre: a.titre, texte: a.chapeau, action: "Lire l'article",
  })
  const casUsage: Carte[] = e.casUsage.map(c => ({
    _id: c._id, href: `/cas-usage/${c.slug}`, badge: c.categorie, titre: c.titre, texte: c.description, action: "Lire le cas d'usage",
  }))
  const operations = e.articles.filter(a => a.categorie === CATEGORIE_OPERATION).map(versCarte)
  const articlesDeFond = e.articles.filter(a => a.categorie !== CATEGORIE_OPERATION).map(versCarte)

  const url = `${SITE_URL}/ressources/newsletter/${e.numero}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_URL}/ressources` },
      { '@type': 'ListItem', position: 3, name: 'Newsletter', item: `${SITE_URL}/ressources/newsletter` },
      { '@type': 'ListItem', position: 4, name: `N° ${e.numero}`, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={url} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/ressources">Ressources</Link><span>/</span>
        <Link href="/ressources/newsletter">Newsletter</Link><span>/</span>
        <span>N° {e.numero}</span>
      </nav>

      <section className="page-hero">
        <div className="label">Newsletter Luphy · N° {e.numero}</div>
        <h1>{e.titre ?? `Édition n° ${e.numero}`}</h1>
        {e.introduction && <p>{e.introduction}</p>}
        {(e.datePublication || e.lienLinkedIn) && (
          <p className="mention-nl" style={{ borderTop: 0, paddingTop: 0, marginTop: 16 }}>
            {e.datePublication && <>Publiée le {formatDateFr(e.datePublication)}</>}
            {e.datePublication && e.lienLinkedIn && ' · '}
            {e.lienLinkedIn && <a href={e.lienLinkedIn} target="_blank" rel="noopener">Lire sur LinkedIn</a>}
          </p>
        )}
      </section>

      <Rubrique label="Cas d'usage" cartes={casUsage} />
      <Rubrique label="Opération" cartes={operations} fond />
      <Rubrique label="Article de fond" cartes={articlesDeFond} />

      {lienAbonnement && (
        <section className="cta-sec">
          <div className="cta-glow" />
          <div className="container" style={{ position: 'relative' }}>
            <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Newsletter</div>
            <h2 className="reveal">Recevez les prochaines<br /><em>éditions.</em></h2>
            <div className="cta-btns reveal">
              <a href={lienAbonnement} target="_blank" rel="noopener" className="btn-primary">
                S&apos;abonner sur LinkedIn {SVG_ARROW}
              </a>
            </div>
          </div>
        </section>
      )}

      <ClientEffects />
    </>
  )
}
