import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Acculturation IA | Formation Luphy',
  description:
    "Programme d'acculturation IA pour COMEX, associés et managers. Fondamentaux, gouvernance, charte d'usage, conduite du changement. Sur plusieurs semaines.",
  openGraph: {
    title: 'Acculturation IA | Formation Luphy',
    description: "Programme d'acculturation IA pour dirigeants et managers des métiers de la finance.",
    url: `${SITE_URL}/formation/acculturation-ia`,
  },
}

const MODULES = [
  { num: '01', title: 'Ce que l\'IA fait (et ne fait pas) en 2025', desc: "Etat des capacités réelles, limites, biais. Démonstrations sur vos cas métier. Démystifier sans survendre." },
  { num: '02', title: 'Gouvernance et charte d\'usage', desc: "Niveaux de criticité (Explore / Assist / Execute / Restricted), données sensibles, hébergement, responsabilité. Rédaction ou révision de votre charte interne." },
  { num: '03', title: 'Cas d\'usage prioritaires par métier', desc: "Atelier collaboratif : identification des 5-10 cas d'usage à fort ROI dans vos processus existants. Priorisation et plan d'activation." },
  { num: '04', title: 'Conduite du changement', desc: "Comment embarquer les équipes, gérer les résistances, identifier les champions internes. Rituels d'adoption et suivi d'usage." },
  { num: '05', title: 'ROI et pilotage', desc: "Comment mesurer l'impact de l'IA en entreprise. Indicateurs, tableau de bord, questionnaires avant/après. Arbitrage budget IA." },
  { num: '06', title: 'Suivi et itération', desc: "Session de bilan à 6-8 semaines. Cas d'usage activés vs prévus, blocages identifiés, ajustements du programme." },
]

const POUR_QUI = [
  { label: 'COMEX et associés', desc: 'Comprendre les enjeux stratégiques et arbitrer les investissements IA.' },
  { label: 'Managers et chefs de pôle', desc: 'Identifier les cas d\'usage dans leur périmètre et conduire l\'adoption.' },
  { label: 'Équipes opérationnelles', desc: 'Acquérir les premiers réflexes et commencer à utiliser l\'IA au quotidien.' },
]

const FAQ = [
  {
    q: 'Combien de temps dure le programme d\'acculturation ?',
    a: "La durée est adaptée à votre contexte. Un programme standard s'étale sur 4 à 8 semaines : sessions collectives espacées, travaux pratiques entre les sessions, suivi individuel des managers. Nous définissons le rythme ensemble lors du cadrage.",
  },
  {
    q: 'Le programme se fait-il en présentiel ou en distanciel ?',
    a: "Les sessions collectives (modules 01 à 04) se font de préférence en présentiel pour favoriser la dynamique de groupe. Le suivi individuel et le bilan (modules 05-06) se font en distanciel.",
  },
  {
    q: 'Faut-il des compétences techniques pour suivre ce programme ?',
    a: "Non. Le programme est conçu pour des profils non-techniques. Nous partons des usages, pas de la technologie. Les démonstrations utilisent vos propres documents et processus.",
  },
  {
    q: 'La formation est-elle personnalisée à notre secteur ?',
    a: "Oui. Nous travaillons exclusivement avec des acteurs de la finance (fonds, SGP, M&A, conseil). Tous les cas d'usage présentés sont tirés de notre expérience terrain avec ces métiers.",
  },
  {
    q: 'Combien coûte le programme d\'acculturation IA ?',
    a: "Le tarif est adapté à la taille de votre équipe et à la durée du programme. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Acculturation IA',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Programme d'acculturation IA pour COMEX, associés et managers. Fondamentaux, gouvernance, charte d'usage, conduite du changement.",
      serviceType: 'Formation professionnelle IA',
      url: `${SITE_URL}/formation/acculturation-ia`,
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
        { '@type': 'ListItem', position: 3, name: 'Acculturation IA', item: `${SITE_URL}/formation/acculturation-ia` },
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
      <SchemaOrg url={`${SITE_URL}/formation/acculturation-ia`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/formation">Formation &amp; adoption</Link><span>/</span>
        <span>Acculturation IA</span>
      </nav>

      <section className="page-hero">
        <div className="label">Formation</div>
        <h1>Acculturation<br /><em>IA</em></h1>
        <p>
          Un programme sur plusieurs semaines pour ancrer une culture IA dans votre organisation :
          fondamentaux, gouvernance, cas d&apos;usage prioritaires, conduite du changement.
          Sur vos processus réels, pas des exemples génériques.
        </p>
        <div className="cta-btns">
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
            Parler IA &amp; opérationnel {SVG_ARROW}
          </a>
          <Link href="/formation" className="btn-outline">Tous nos formats</Link>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Pour qui</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Un programme pour toute l&apos;organisation</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            {POUR_QUI.map((p, i) => (
              <div key={i} className={`why-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="why-card-diamond">◆</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Programme</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">6 modules, de la théorie à l&apos;adoption</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            {MODULES.map((m, i) => (
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
          <h2 className="sec-title reveal">Tout savoir sur l&apos;acculturation IA</h2>
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
          <h2 className="reveal">Acculturez votre organisation<br /><em>à l&apos;IA.</em></h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min avec Tristan. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
              Parler IA &amp; opérationnel {SVG_ARROW}
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
