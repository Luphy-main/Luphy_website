import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: "Fonds d'investissement | Luphy",
  description:
    "CRM, automatisation et IA pour les fonds PE, VC, dette privée et fonds de fonds. Structurez votre dealflow, pilotez vos LPs, automatisez votre reporting.",
  openGraph: {
    title: "Fonds d'investissement | Luphy",
    description: "CRM Affinity, automatisation et IA pour les fonds d'investissement.",
    url: `${SITE_URL}/secteurs/fonds-investissement`,
  },
}

const ENJEUX = [
  "Dealflow non structuré : opportunités suivies dans des fichiers Excel éparpillés entre associés",
  "Suivi LPs fragmenté, aucune vue consolidée des engagements et interactions",
  "Reporting manuel chronophage : les équipes passent des heures chaque mois à consolider des données",
  "Aucune visibilité sur le pipeline d'investissement en temps réel",
  "Onboarding KYC/KYB long et non digitalisé, frein à la clôture des souscriptions",
]

const CE_QUE_NOUS_FAISONS = [
  {
    title: 'CRM Affinity pour le dealflow et les LPs',
    desc: "Affinity est le standard des fonds pour une raison : il capte automatiquement les interactions email et LinkedIn et les rattache aux deals et contacts. Nous le configurons pour votre processus exact (sourcing, DD, closing, portfolio suivi).",
  },
  {
    title: 'Automatisation du reporting',
    desc: "Connexion de vos sources de données (Affinity, fichiers portfolio, outils comptables) vers des rapports consolidés automatiques. Moins de saisie manuelle, plus de temps d'analyse.",
  },
  {
    title: 'IA pour l\'extraction de mémos',
    desc: "Utilisation de Claude pour extraire automatiquement les informations clés des mémos d'investissement, term sheets et documents de DD. Structurez vos données sans effort de saisie.",
  },
  {
    title: 'Formation et adoption des équipes',
    desc: "Déployer Affinity ne suffit pas : nous formons vos équipes sur vos processus réels, mettons en place les rituels de mise à jour et suivons l'adoption dans la durée.",
  },
]

const OUTILS = [
  {
    icon: '🔗',
    name: 'Affinity',
    desc: 'CRM relationnel conçu pour les fonds. Capture automatique des interactions, enrichissement des contacts, suivi dealflow et LPs.',
    link: '/performance-commerciale/crm/affinity',
  },
  {
    icon: '⚙️',
    name: 'n8n',
    desc: "Automatisation des flux : reporting, alertes, synchronisation de données entre vos outils.",
    link: null,
  },
  {
    icon: '🤖',
    name: 'Claude (IA)',
    desc: "Extraction et structuration automatique depuis vos documents : mémos, term sheets, rapports de portefeuille.",
    link: '/performance-operationnelle/ia',
  },
  {
    icon: '📋',
    name: 'Notion',
    desc: "Base de connaissances interne, suivi de portefeuille léger, documentation des processus.",
    link: '/performance-commerciale/crm/notion',
  },
]

const FAQ = [
  {
    q: "Pourquoi Affinity plutôt qu'Excel pour suivre le dealflow ?",
    a: "Excel est figé et individuel. Affinity capte automatiquement les emails et messages LinkedIn, enrichit les contacts et centralise les informations de l'ensemble de l'équipe. Vous arrêtez de vous demander qui a parlé à qui et quand. La vue pipeline en temps réel remplace les fichiers individuels des associés.",
  },
  {
    q: "Comment sont sécurisées les données de nos LPs ?",
    a: "Affinity est certifié SOC 2 Type II et hébergé sur infrastructure AWS. Les données restent dans votre espace de travail et ne sont jamais partagées avec d'autres organisations. Nous vous accompagnons sur la configuration des droits d'accès et la charte de confidentialité interne.",
  },
  {
    q: "Peut-on vraiment automatiser le reporting LP ?",
    a: "Oui, partiellement. Les données structurées (valorisations, mouvements de trésorerie, performances) peuvent être consolidées et mises en forme automatiquement. La partie narrative et les jugements qualitatifs restent à la charge des équipes, mais le temps de préparation est considérablement réduit.",
  },
  {
    q: "Combien de temps prend le déploiement d'Affinity dans un fonds ?",
    a: "Un déploiement standard (configuration, import des données existantes, formation) prend entre 4 et 8 semaines selon la complexité. Le premier usage opérationnel arrive bien avant la fin du projet.",
  },
  {
    q: "Quel est le tarif pour un fonds d'investissement ?",
    a: "Le tarif dépend du périmètre : CRM seul, automatisation, formation, ou les trois. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: "CRM et IA pour fonds d'investissement",
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "CRM Affinity, automatisation et IA pour les fonds PE, VC, dette privée et fonds de fonds.",
      serviceType: "Conseil CRM et automatisation pour fonds d'investissement",
      url: `${SITE_URL}/secteurs/fonds-investissement`,
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
        { '@type': 'ListItem', position: 3, name: "Fonds d'investissement", item: `${SITE_URL}/secteurs/fonds-investissement` },
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
      <SchemaOrg url={`${SITE_URL}/secteurs/fonds-investissement`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Fonds d&apos;investissement</span>
      </nav>

      <section className="page-hero">
        <div className="label">Secteur</div>
        <h1>Fonds<br /><em>d&apos;investissement</em></h1>
        <p>
          PE, VC, dette privée, fonds de fonds : des processus complexes, des données sensibles,
          des équipes réduites. Nous structurons votre dealflow, votre suivi LPs et votre reporting
          avec les outils adaptés à vos contraintes.
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
          <h2 className="sec-title reveal">Notre approche pour les fonds</h2>
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
          <h2 className="sec-title reveal">Tout savoir sur nos interventions en fonds</h2>
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
          <h2 className="reveal">Structurons votre dealflow<br /><em>et votre suivi LPs.</em></h2>
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
