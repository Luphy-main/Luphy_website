import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cabinets de conseil | Luphy',
  description:
    "CRM, outbound et IA pour les cabinets de conseil en stratégie, management et boutiques spécialisées finance. Pilotage du pipe missions, prospection structurée, productivité IA.",
  openGraph: {
    title: 'Cabinets de conseil | Luphy',
    description: "CRM HubSpot ou Pipedrive, outbound et formation IA pour les cabinets de conseil.",
    url: `${SITE_URL}/secteurs/conseil`,
  },
}

const ENJEUX = [
  "Pipeline commercial non piloté : impossible de savoir combien de missions sont en cours de négociation ni à quelle étape",
  "Chasse de missions artisanale : chaque associé prospecte dans son coin sans processus commun",
  "Relances oubliées : des prospects chauds tombent dans l'oubli faute de système de suivi",
  "Pas de suivi des contacts après la fin d'une mission : un client satisfait n'est pas reciblé pour une prochaine mission",
  "Reporting d'activité chronophage : les associés passent du temps à consolider des données au lieu de prospecter",
]

const CE_QUE_NOUS_FAISONS = [
  {
    title: 'CRM HubSpot ou Pipedrive pour le pipe missions',
    desc: "HubSpot pour les cabinets qui ont une activité marketing et de nurturing (newsletters, events, inbound), Pipedrive pour ceux qui veulent un outil simple et opérationnel rapidement centré sur le pipe commercial. Nous structurons les étapes de votre processus de vente de missions.",
  },
  {
    title: 'Outbound structuré',
    desc: "Définition de l'ICP (secteurs cibles, fonction, taille d'entreprise), constitution des listes, rédaction des séquences de prise de contact email et LinkedIn. Un processus de chasse répétable et piloté plutôt qu'artisanal.",
  },
  {
    title: 'Formation IA pour les consultants',
    desc: "Utilisation de Claude pour la production de livrables (synthèses, analyses sectorielles, reformulations), la préparation de réunions clients, la veille et la recherche. Formation accessible sans compétences techniques.",
  },
  {
    title: 'Automatisation du reporting',
    desc: "Tableaux de bord commerciaux automatisés : pipe missions, taux de conversion, activité par associé. Les données viennent du CRM, le reporting se génère sans intervention manuelle.",
  },
]

const OUTILS = [
  {
    icon: '🟠',
    name: 'HubSpot',
    desc: "CRM complet avec marketing automation pour les cabinets avec une activité de nurturing clients et prospects.",
    link: '/performance-commerciale/crm/hubspot',
  },
  {
    icon: '🔵',
    name: 'Pipedrive',
    desc: "CRM simple et rapide à déployer, centré sur le pipeline commercial et l'activité de prospection.",
    link: '/performance-commerciale/crm/pipedrive',
  },
  {
    icon: '📧',
    name: 'Lemlist',
    desc: "Outbound email et LinkedIn pour la chasse de missions et la prise de contact structurée.",
    link: '/performance-commerciale/outbound',
  },
  {
    icon: '🤖',
    name: 'Claude (IA)',
    desc: "Productivité des consultants : livrables, synthèses, analyses sectorielles, préparation clients.",
    link: '/performance-operationnelle/ia',
  },
]

const FAQ = [
  {
    q: "HubSpot ou Pipedrive pour un cabinet de conseil ?",
    a: "Pipedrive est plus adapté si votre priorité est d'avoir un CRM opérationnel rapidement centré sur le suivi du pipe missions. HubSpot est plus pertinent si vous avez une activité de communication (newsletter, events, inbound) ou si vous souhaitez nurturing de vos anciens clients. Pour un cabinet de moins de 20 personnes sans besoin marketing, Pipedrive est souvent le bon choix.",
  },
  {
    q: "Peut-on automatiser la chasse de missions ?",
    a: "La qualification des cibles et la personnalisation des messages restent un travail humain. En revanche, l'envoi des prises de contact initiales, les relances automatiques et le suivi des taux de réponse peuvent être automatisés avec Lemlist. Résultat : un processus de chasse répétable et piloté par les données.",
  },
  {
    q: "L'IA est-elle accessible aux consultants non techniques ?",
    a: "Oui. Nos formations IA sont conçues pour des non-développeurs. Nous travaillons sur vos cas d'usage réels : comment utiliser Claude pour une synthèse de rapport annuel, une analyse sectorielle, la préparation d'un comité client. L'objectif est que chaque consultant gagne au moins une heure par jour.",
  },
  {
    q: "Combien de temps prend le déploiement d'un CRM dans un cabinet ?",
    a: "Un déploiement standard (configuration, import des contacts, formation) prend entre 3 et 6 semaines selon la taille du cabinet et la complexité du processus commercial. L'équipe commence à utiliser l'outil bien avant la fin du projet.",
  },
  {
    q: "Quel est le tarif pour un cabinet de conseil ?",
    a: "Le tarif dépend du périmètre : CRM seul, outbound, formation IA, ou une combinaison. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: "CRM et IA pour cabinets de conseil",
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "CRM HubSpot ou Pipedrive, outbound structuré et formation IA pour les cabinets de conseil en stratégie et management.",
      serviceType: "Conseil CRM, outbound et IA pour cabinets de conseil",
      url: `${SITE_URL}/secteurs/conseil`,
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
        { '@type': 'ListItem', position: 3, name: "Cabinets de conseil", item: `${SITE_URL}/secteurs/conseil` },
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
      <SchemaOrg url={`${SITE_URL}/secteurs/conseil`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Cabinets de conseil</span>
      </nav>

      <section className="page-hero">
        <div className="label">Secteur</div>
        <h1>Cabinets<br /><em>de conseil</em></h1>
        <p>
          Conseil en stratégie, management, boutiques spécialisées finance : la chasse de missions
          se fait encore trop souvent à l&apos;instinct. Nous structurons votre pipe commercial,
          votre outbound et la productivité IA de vos équipes.
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
          <h2 className="sec-title reveal">Notre approche pour les cabinets de conseil</h2>
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
          <h2 className="sec-title reveal">Tout savoir sur nos interventions en cabinets de conseil</h2>
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
          <h2 className="reveal">Structurons votre pipe missions<br /><em>et votre chasse commerciale.</em></h2>
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
