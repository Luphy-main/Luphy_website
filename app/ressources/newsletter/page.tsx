import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { SITE_URL } from '@/lib/constants'
import { getEditions, formatDateFr } from '@/sanity/lib/newsletter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Newsletter LinkedIn | Luphy',
  description: "Toutes les éditions de la newsletter Luphy sur LinkedIn : cas d'usage, opérations et articles de fond pour les acteurs de la finance.",
  alternates: { canonical: `${SITE_URL}/ressources/newsletter` },
  openGraph: {
    title: 'Newsletter LinkedIn | Luphy',
    description: "Toutes les éditions de la newsletter Luphy sur LinkedIn.",
    url: `${SITE_URL}/ressources/newsletter`,
    images: [{ url: `${SITE_URL}/og-ressources.png`, width: 1200, height: 630 }],
  },
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default async function Page() {
  const editions = await getEditions()
  // Aucune édition affichable : pas de page vide en ligne
  if (editions.length === 0) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_URL}/ressources` },
      { '@type': 'ListItem', position: 3, name: 'Newsletter', item: `${SITE_URL}/ressources/newsletter` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/ressources/newsletter`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/ressources">Ressources</Link><span>/</span>
        <span>Newsletter</span>
      </nav>

      <section className="page-hero">
        <div className="label">Newsletter LinkedIn</div>
        <h1>La newsletter<br /><em>Luphy.</em></h1>
        <p>
          Toutes les éditions de la newsletter Luphy publiée sur LinkedIn : cas d&apos;usage,
          opérations et articles de fond pour les acteurs de la finance.
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="offers-grid">
            {editions.map((e, i) => (
              <Link
                key={e.numero}
                href={`/ressources/newsletter/${e.numero}`}
                className={`offer-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>N° {e.numero}</span>
                  {e.datePublication && (
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{formatDateFr(e.datePublication)}</span>
                  )}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{e.titre ?? `Édition n° ${e.numero}`}</h3>
                {e.introduction && (
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{e.introduction}</p>
                )}
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>
                  Lire l&apos;édition {SVG_ARROW}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
