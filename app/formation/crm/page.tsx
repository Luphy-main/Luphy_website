import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Formation CRM | Adoption Luphy',
  description:
    "Formation à l'adoption CRM pour équipes commerciales. Règles de saisie, pipelines, reporting, rituels. Sur Affinity, DealCloud, HubSpot, Pipedrive, Notion.",
  openGraph: {
    title: 'Formation CRM | Adoption Luphy',
    description: "Formation adoption CRM sur vos données réelles.",
    url: `${SITE_URL}/formation/crm`,
  },
}

const CONTENU = [
  { num: '01', title: 'Pourquoi le CRM ne fonctionne pas (encore)', desc: "Analyse des causes réelles de non-adoption : trop complexe, pas dans le flux de travail, bénéfice peu visible. Identification des freins dans votre organisation spécifiquement." },
  { num: '02', title: 'Les règles de saisie et leur pourquoi', desc: "Chaque champ a un usage. Formation aux règles de saisie en partant des décisions qu'elles permettent : reporting, relances, segmentation. Comprendre le pourquoi augmente l'adhérence." },
  { num: '03', title: 'Maîtrise des vues et du pipeline', desc: "Navigation dans votre CRM configuré : vues filtrées, pipeline visuel, recherche. Rituel de mise à jour quotidienne en moins de 5 minutes." },
  { num: '04', title: 'Reporting et pilotage commercial', desc: "Comment lire les dashboards, interpréter les indicateurs clés, identifier les opportunités à traiter en priorité. Revue hebdomadaire structurée." },
  { num: '05', title: 'Rituels d\'équipe et maintien de la qualité', desc: "Mise en place des rituels de pilotage : revue hebdo, nettoyage mensuel de la base, onboarding nouveaux collaborateurs. La qualité de la donnée se dégrade sans rituel." },
]

const CRM_COUVERTS = ['Affinity', 'DealCloud', 'HubSpot', 'Pipedrive', 'Notion', 'CRM sur mesure']

const FAQ = [
  {
    q: 'La formation est-elle adaptée à notre CRM spécifique ?',
    a: "Oui. Nous formons sur votre CRM tel qu'il est configuré chez vous, avec vos pipelines, vos champs et vos données réelles. Nous couvrons Affinity, DealCloud, HubSpot, Pipedrive, Notion et les CRM sur mesure.",
  },
  {
    q: 'Peut-on former les nouveaux arrivants sur le même programme ?',
    a: "Oui. Nous créons souvent un programme allégé d'onboarding CRM (1 à 2 heures) pour les nouveaux arrivants, complémentaire à la formation complète de l'équipe existante.",
  },
  {
    q: 'Combien de temps prend la formation ?',
    a: "La formation complète se fait sur une demi-journée à une journée selon la taille de l'équipe et la complexité du CRM. Les rituels et le suivi s'étalent sur 4 à 6 semaines.",
  },
  {
    q: 'La formation est-elle efficace si nous avons déployé le CRM nous-mêmes ?',
    a: "Oui, à condition que le CRM soit bien configuré. Si ce n'est pas le cas, nous pouvons faire un audit de configuration en amont et proposer des ajustements avant la formation.",
  },
  {
    q: 'Combien coûte la formation CRM ?',
    a: "Le tarif est adapté au nombre de participants et au CRM concerné. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Formation CRM',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Formation à l'adoption CRM pour équipes commerciales. Règles de saisie, pipelines, reporting, rituels.",
      serviceType: 'Formation adoption CRM',
      url: `${SITE_URL}/formation/crm`,
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
        { '@type': 'ListItem', position: 2, name: 'Formation & adoption', item: `${SITE_URL}/formation` },
        { '@type': 'ListItem', position: 3, name: 'Formation CRM', item: `${SITE_URL}/formation/crm` },
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
      <SchemaOrg url={`${SITE_URL}/formation/crm`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/formation">Formation &amp; adoption</Link><span>/</span>
        <span>Formation CRM</span>
      </nav>

      <section className="page-hero">
        <div className="label">Formation</div>
        <h1>Adoption<br /><em>CRM</em></h1>
        <p>
          Un CRM non adopté ne crée aucune valeur. La formation porte sur vos données réelles,
          votre pipeline, vos processus. Règles de saisie, reporting, rituels d&apos;équipe.
          Sur Affinity, DealCloud, HubSpot, Pipedrive, Notion ou CRM sur mesure.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <Link href="/formation" className="btn-outline">Tous nos formats</Link>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">CRM couverts</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Nous formons sur votre outil</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
            {CRM_COUVERTS.map((crm, i) => (
              <span key={i} className={`reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}
                style={{ background: 'rgba(75,159,191,0.15)', border: '1px solid rgba(75,159,191,0.3)', borderRadius: 8, padding: '8px 18px', fontSize: 14, fontWeight: 600, color: 'var(--sky)' }}>
                {crm}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Contenu</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">5 modules pour ancrer l&apos;adoption</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            {CONTENU.map((m, i) => (
              <div key={i} className={`step-row reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="step-num" style={{ fontSize: 18, minWidth: 32 }}>{m.num}</div>
                <div className="step-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur la formation CRM</h2>
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
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Commencer</div>
          <h2 className="reveal">Formons vos équipes<br /><em>sur votre CRM réel.</em></h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min avec Titouan. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial {SVG_ARROW}
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
