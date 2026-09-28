import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Témoignages clients | Luphy',
  description:
    "Retours d'expérience de nos clients : fonds d'investissement, boutiques M&A, sociétés de gestion, cabinets de conseil. CRM, automatisation, formation IA.",
  openGraph: {
    title: 'Témoignages clients | Luphy',
    description: "Ce que disent nos clients sur leur transformation CRM et IA avec Luphy.",
    url: `${SITE_URL}/temoignages`,
  },
}

const VERBATIMS = [
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Fonds d\'investissement',
    sujet: 'Déploiement Affinity',
  },
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Boutique M&A',
    sujet: 'Déploiement DealCloud',
  },
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Société de gestion',
    sujet: 'Automatisation reporting LPs',
  },
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Cabinet de conseil',
    sujet: 'Acculturation IA',
  },
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Fonds d\'investissement',
    sujet: 'Formation équipes',
  },
  {
    quote: '[À COMPLÉTER : verbatim client]',
    auteur: '[Prénom Nom]',
    fonction: '[Fonction]',
    entreprise: '[Entreprise]',
    secteur: 'Société de gestion',
    sujet: 'Déploiement HubSpot',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Témoignages', item: `${SITE_URL}/temoignages` },
  ],
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/temoignages`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Témoignages</span>
      </nav>

      <section className="page-hero">
        <div className="label">Clients</div>
        <h1>Ce qu&apos;ils<br /><em>disent.</em></h1>
        <p>
          Retours d&apos;expérience de nos clients : fonds d&apos;investissement, boutiques M&amp;A,
          sociétés de gestion, cabinets de conseil. Chaque mission commence par un diagnostic,
          chaque résultat est mesuré.
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="testi-grid">
            {VERBATIMS.map((v, i) => (
              <div key={i} className={`testi-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>
                    {v.secteur}
                  </span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{v.sujet}</span>
                </div>
                <p className="testi-quote">&ldquo;{v.quote}&rdquo;</p>
                <div className="testi-author">
                  <strong>{v.auteur}</strong>
                  <span>{v.fonction}, {v.entreprise}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 780, textAlign: 'center' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Études de cas</div>
          <h2 className="sec-title reveal">Voir les résultats en détail</h2>
          <p className="reveal" style={{ marginBottom: 32, fontSize: 16 }}>
            Les études de cas documentent chaque projet : contexte, enjeux, méthode déployée, résultats mesurés.
          </p>
          <div className="cta-btns reveal" style={{ justifyContent: 'center' }}>
            <Link href="/cas-clients" className="btn-primary">
              Voir les études de cas {SVG_ARROW}
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</div>
          <h2 className="reveal">Parlons de<br /><em>votre situation.</em></h2>
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
