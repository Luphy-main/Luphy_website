import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Expertise financière | Luphy',
  description:
    "Luphy ne découvre pas votre métier. Spécialisation finance d'investissement, M&A, sociétés de gestion et conseil. CRM Affinity, DealCloud, HubSpot. Confidentialité des données.",
  openGraph: {
    title: 'Expertise financière | Luphy',
    description: "Spécialisation finance d'investissement, M&A, sociétés de gestion et conseil.",
    url: `${SITE_URL}/expertise-finance`,
  },
}

const USE_CASES = [
  { icon: '🔍', title: 'Dealflow et sourcing', desc: 'Enrichissement automatique des contacts, alertes sectorielles, scoring des opportunités, pipeline de sourcing structuré dans Affinity ou DealCloud.' },
  { icon: '📋', title: 'Préparation d\'IC memos', desc: 'Recherche sectorielle assistée par IA, consolidation des données financières, génération de premières ébauches sur vos modèles. Temps de préparation réduit significativement.' },
  { icon: '🤝', title: 'Relation LP/GP et reporting investisseurs', desc: 'Automatisation des rapports de portefeuille, suivi des engagements, mise en forme des données pour les reportings trimestriels.' },
  { icon: '📁', title: 'Suivi des mandats M&A', desc: 'Pipeline des mandats dans DealCloud, suivi des jalons (teaser, NDA, LOI, signing), alertes de relance, historique des interactions.' },
  { icon: '🌐', title: 'Capitalisation du réseau', desc: 'Chaque associé sait ce que les autres ont croisé. Base de contacts partagée, historique des interactions, alertes de recontact dans Affinity.' },
  { icon: '📊', title: 'Revue de présentations et modèles', desc: 'Analyse et synthèse de decks, revue de modèles financiers, identification des points clés, rédaction de questions de due diligence.' },
]

const CRM_FINANCE = [
  { name: 'Affinity', note: 'PE, VC, family offices, boutiques M&A' },
  { name: 'DealCloud', note: 'Boutiques M&A, banques d\'affaires, advisory' },
  { name: 'HubSpot', note: 'Sociétés de gestion, cabinets de conseil' },
  { name: 'Pipedrive', note: 'Équipes commerciales agiles' },
  { name: 'Notion', note: 'CRM léger, organisations flexibles' },
  { name: 'CRM sur mesure', note: 'Quand les solutions du marché ne suffisent pas' },
]

const SECTORS = [
  { label: 'PE, VC, family offices', link: '/secteurs/fonds-investissement' },
  { label: 'M&A, advisory, banques d\'affaires', link: '/secteurs/m-a-banques-affaires' },
  { label: 'Sociétés de gestion, CGP, MFO', link: '/secteurs/societes-de-gestion' },
  { label: 'Cabinets de conseil et services pro', link: '/secteurs/conseil' },
]

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Expertise financière',
        provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
        description: "Luphy est une agence de performance digitale spécialisée dans la finance : fonds d'investissement, M&A, sociétés de gestion, conseil.",
        serviceType: 'Conseil digital spécialisé finance',
        url: `${SITE_URL}/expertise-finance`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Expertise financière', item: `${SITE_URL}/expertise-finance` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/expertise-finance`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Expertise financière</span>
      </nav>

      <section className="page-hero">
        <div className="label">Notre différenciant</div>
        <h1>Nous ne découvrons pas<br /><em>votre métier.</em></h1>
        <p>
          Luphy est une agence de performance digitale basée à Paris, spécialisée dans la finance.
          Nous travaillons avec des fonds d&apos;investissement, des boutiques M&A, des sociétés de gestion
          et des cabinets de conseil. Nous connaissons vos outils, vos processus et vos enjeux de confidentialité.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
            Parler IA &amp; opérationnel
          </a>
        </div>
      </section>

      {/* Équipe */}
      <section className="section">
        <div className="container">
          <div className="label reveal">L&apos;équipe</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Deux fondateurs issus du secteur</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            <div className="why-card reveal">
              <div className="why-card-diamond">◆</div>
              <h4>Titouan Galpin</h4>
              <p>Expérience en investissement, relations investisseurs, finance et accompagnement de sociétés financières. Pôle performance commerciale : CRM, outbound, structuration de la relation investisseur.</p>
            </div>
            <div className="why-card reveal d1">
              <div className="why-card-diamond">◆</div>
              <h4>Tristan Camilli</h4>
              <p>Opérations, digitalisation, CRM, automatisation et IA. Ancien Head of Operations chez Caption.market. INSA Toulouse, ESCP. Pôle performance opérationnelle : automatisation, IA, formation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cas d'usage métier */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Cas d&apos;usage métier</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ce que nous faisons concrètement pour la finance</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {USE_CASES.map((u, i) => (
              <div key={i} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="offer-card-line" />
                <div className="offer-icon icon-sky" style={{ fontSize: 20 }}>{u.icon}</div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM finance */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="label reveal">Nos outils</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les CRM que nous déployons pour la finance</h2>
          <p className="sec-sub reveal">
            Affinity et DealCloud sont les références du PE/VC et du M&A, peu maîtrisés par les agences françaises.
            Nous déployons également HubSpot, Pipedrive, Notion et des CRM sur mesure.
          </p>
          <div className="problems-grid" style={{ marginTop: 36 }}>
            {CRM_FINANCE.map((c, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p><strong style={{ color: '#fff' }}>{c.name}</strong> : {c.note}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/performance-commerciale/crm" className="btn-primary" style={{ fontSize: 14, padding: '12px 28px' }}>
              Voir tous nos CRM
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Confidentialité */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Confidentialité</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Vos données sensibles restent vos données</h2>
          <p className="sec-sub reveal">
            La finance traite des données confidentielles par nature : portefeuilles, transactions,
            données investisseurs. Nous configurons les outils IA dans un cadre sécurisé.
          </p>
          <div className="why-cards" style={{ marginTop: 40 }}>
            <div className="why-card reveal">
              <div className="why-card-diamond">◆</div>
              <h4>Niveaux de criticité</h4>
              <p>Explore, Assist, Execute, Restricted. Chaque donnée est classifiée et traitée dans l&apos;environnement adapté à son niveau de sensibilité.</p>
            </div>
            <div className="why-card reveal d1">
              <div className="why-card-diamond">◆</div>
              <h4>Hébergement UE</h4>
              <p>Quand la réglementation ou vos contraintes internes l&apos;exigent, nous configurons des solutions avec hébergement européen. [À CONFIRMER selon engagements contractuels]</p>
            </div>
            <div className="why-card reveal d2">
              <div className="why-card-diamond">◆</div>
              <h4>Pas d&apos;entraînement sur vos données</h4>
              <p>Les outils que nous déployons ne s&apos;entraînent pas sur vos données clients. [À CONFIRMER selon configurations retenues]</p>
            </div>
            <div className="why-card reveal d3">
              <div className="why-card-diamond">◆</div>
              <h4>Charte d&apos;usage IA</h4>
              <p>Incluse dans chaque mission de formation. Elle définit clairement ce que les équipes peuvent confier à l&apos;IA, dans quelles conditions et avec quels garde-fous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="label reveal">Nos secteurs</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Par secteur</h2>
          <div className="problems-grid" style={{ marginTop: 32 }}>
            {SECTORS.map((s, i) => (
              <Link key={i} href={s.link}
                className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="problem-dot" />
                <p style={{ color: 'var(--sky)', fontWeight: 600 }}>{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Parlons-en</div>
          <h2 className="reveal">
            Identifions ensemble<br />
            <em>vos chantiers prioritaires.</em>
          </h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min pour cadrer vos enjeux. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              Parler IA &amp; opérationnel
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
