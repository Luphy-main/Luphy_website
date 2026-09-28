import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sociétés de gestion | Luphy',
  description:
    "CRM, automatisation et IA pour les sociétés de gestion d'actifs, asset managers et family offices. Suivi IR, reporting LPs, outbound structuré.",
  openGraph: {
    title: 'Sociétés de gestion | Luphy',
    description: "CRM Affinity ou HubSpot, automatisation et IA pour les sociétés de gestion.",
    url: `${SITE_URL}/secteurs/societes-de-gestion`,
  },
}

const ENJEUX = [
  "Suivi des relations investisseurs (IR) fragmenté entre emails, fichiers Excel et comptes rendus individuels",
  "Reporting LPs en multi-format : chaque LP a ses propres exigences et le reporting est refait à la main à chaque échéance",
  "Prospection nouveaux LPs sans outreach structuré : pas de liste qualifiée, pas de séquences, pas de suivi",
  "Onboarding souscripteurs lent et manuel, frein à la clôture des fonds",
  "Aucune visibilité consolidée sur les interactions de l'équipe avec les investisseurs",
]

const CE_QUE_NOUS_FAISONS = [
  {
    title: 'CRM Affinity ou HubSpot pour les relations investisseurs',
    desc: "Affinity capte automatiquement les interactions email et LinkedIn et est très utilisé pour l'IR. HubSpot est plus adapté si vous avez également une activité marketing ou de prospection LPs structurée. Nous choisissons avec vous selon votre priorité.",
  },
  {
    title: 'Automatisation du reporting LPs',
    desc: "Connexion de vos sources de données vers des templates de reporting automatisés. Réduction du temps de préparation des rapports trimestriels et annuels. La partie narrative reste humaine, l'assemblage des données devient automatique.",
  },
  {
    title: 'Acculturation IA pour les équipes',
    desc: "Utilisation de Claude pour l'analyse de documents (mémos, rapports de valorisation, analyses sectorielles), la rédaction de communications LPs, la synthèse de réunions. Formation de vos équipes sur vos cas d'usage réels.",
  },
  {
    title: 'Outbound structuré vers les LPs potentiels',
    desc: "Identification et qualification des LPs cibles (family offices, institutionnels, corporates), mise en place de séquences de prise de contact personnalisées. Un pipeline de levée de fonds structuré comme un pipeline commercial.",
  },
]

const OUTILS = [
  {
    icon: '🔗',
    name: 'Affinity',
    desc: "CRM relationnel avec capture automatique des interactions. Standard IR pour de nombreuses SGP.",
    link: '/performance-commerciale/crm/affinity',
  },
  {
    icon: '🟠',
    name: 'HubSpot',
    desc: "CRM plus complet pour les SGP qui ont une activité marketing et de prospection LPs structurée.",
    link: '/performance-commerciale/crm/hubspot',
  },
  {
    icon: '⚙️',
    name: 'n8n',
    desc: "Automatisation du reporting, alertes, synchronisation entre vos outils de gestion et votre CRM.",
    link: null,
  },
  {
    icon: '🤖',
    name: 'Claude (IA)',
    desc: "Analyse de documents, rédaction de communications investisseurs, synthèse de réunions.",
    link: '/performance-operationnelle/ia',
  },
]

const FAQ = [
  {
    q: "Affinity ou HubSpot pour une société de gestion ?",
    a: "Affinity est mieux adapté si votre priorité est la gestion des relations investisseurs : il capte automatiquement les interactions et est conçu pour les organisations qui gèrent de nombreuses relations en parallèle. HubSpot est plus adapté si vous souhaitez également gérer des campagnes de communication, du nurturing LP ou un pipeline de levée de fonds avec des fonctions marketing. Les deux sont déployables.",
  },
  {
    q: "Peut-on vraiment automatiser le reporting LPs ?",
    a: "Partiellement. Les données chiffrées (NAV, performances, cash-flows, valorisations) peuvent être consolidées et mises en forme automatiquement. Les commentaires qualitatifs et les analyses de marché restent à la charge des équipes. Le gain de temps est réel et significatif sur la phase de préparation.",
  },
  {
    q: "Comment est gérée la confidentialité des données investisseurs ?",
    a: "Affinity et HubSpot sont tous deux certifiés SOC 2 Type II. Nous configurons les droits d'accès pour que seules les personnes habilitées voient les données sensibles. Pour les équipes qui ont des exigences d'hébergement strictes, nous étudions les options disponibles au cas par cas.",
  },
  {
    q: "Combien de temps prend le déploiement d'un CRM IR ?",
    a: "Un déploiement standard (configuration, import des données, formation) prend entre 4 et 10 semaines selon la complexité et le nombre de LPs à migrer. Les équipes commencent à utiliser l'outil bien avant la fin du projet.",
  },
  {
    q: "Quel est le tarif pour une société de gestion ?",
    a: "Le tarif dépend du périmètre : CRM seul, automatisation reporting, formation IA, outbound, ou une combinaison. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: "CRM et IA pour sociétés de gestion",
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "CRM Affinity ou HubSpot, automatisation et IA pour les sociétés de gestion d'actifs et family offices.",
      serviceType: "Conseil CRM et automatisation pour sociétés de gestion",
      url: `${SITE_URL}/secteurs/societes-de-gestion`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Secteurs', item: `${SITE_URL}/secteurs` },
        { '@type': 'ListItem', position: 3, name: "Sociétés de gestion", item: `${SITE_URL}/secteurs/societes-de-gestion` },
      ],
    },
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
      <SchemaOrg url={`${SITE_URL}/secteurs/societes-de-gestion`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Sociétés de gestion</span>
      </nav>

      <section className="page-hero">
        <div className="label">Secteur</div>
        <h1>Sociétés<br /><em>de gestion</em></h1>
        <p>
          Asset managers, sociétés de gestion d&apos;actifs, family offices : des relations investisseurs
          complexes, un reporting exigeant, une prospection LPs souvent artisanale. Nous structurons
          votre IR, automatisons votre reporting et formons vos équipes à l&apos;IA.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
            Parler IA &amp; opérationnel
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Vos enjeux</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ces problèmes vous parlent ?</h2>
          <div className="problems-grid">
            {ENJEUX.map((e, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Notre approche pour les SGP</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            {CE_QUE_NOUS_FAISONS.map((c, i) => (
              <div key={i} className={`why-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="why-card-diamond">◆</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Nos outils</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les outils que nous déployons</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {OUTILS.map((o, i) => {
              const inner = (
                <>
                  <div className="offer-card-line" />
                  <div className="offer-icon icon-sky" style={{ fontSize: 20 }}>{o.icon}</div>
                  <div className="offer-card-sub">{o.name}</div>
                  <p>{o.desc}</p>
                  {o.link && <div className="card-link" style={{ marginTop: 16, color: 'var(--sky)' }}>En savoir plus {SVG_ARROW}</div>}
                </>
              )
              return o.link
                ? <Link key={i} href={o.link} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>{inner}</Link>
                : <div key={i} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur nos interventions en SGP</h2>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <div key={i} className={`faq-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <h3>{f.q}</h3>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Passons à l&apos;action</div>
          <h2 className="reveal">Structurons vos relations investisseurs<br /><em>et automatisons votre reporting.</em></h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial {SVG_ARROW}
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
