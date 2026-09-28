import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Coaching IA dirigeant | Formation Luphy',
  description:
    "Coaching IA individuel pour fondateurs, associés et directeurs. Séances d'1 h, rythme libre, sans engagement. Repérer les bons cas d'usage, arbitrer un budget IA.",
  openGraph: {
    title: 'Coaching IA dirigeant | Formation Luphy',
    description: "Coaching IA individuel pour dirigeants de la finance. Séances d'1 h, rythme libre.",
    url: `${SITE_URL}/formation/coaching-dirigeant`,
  },
}

const POUR_QUI = [
  { label: 'Fondateur', desc: 'Structurer une vision IA pour l\'organisation sans perdre de temps sur des sujets qui ne vous concernent pas encore.' },
  { label: 'Associé', desc: 'Comprendre ce que l\'IA peut faire dans votre périmètre, écarter les mauvais cas d\'usage, arbitrer un budget.' },
  { label: 'Directeur', desc: 'Identifier les 2-3 automatisations à fort ROI dans votre équipe et avoir le vocabulaire pour piloter un projet IA.' },
]

const CE_QUE_NOUS_ABORDONS = [
  'Évaluation de votre maturité IA actuelle et de vos besoins réels',
  'Identification des 5 à 10 cas d\'usage à fort ROI dans votre activité',
  'Arbitrage entre build (développement sur mesure) et buy (outils du marché)',
  'Cadre de gouvernance IA adapté à votre organisation',
  'Évaluation des propositions de prestataires ou d\'outils IA que vous recevez',
  'Suivi des projets IA en cours : diagnostic si un projet s\'emballe ou n\'avance pas',
]

const FAQ = [
  {
    q: 'En quoi le coaching dirigeant est-il différent de la formation en groupe ?',
    a: "La formation en groupe couvre un socle commun. Le coaching dirigeant est 100 % personnalisé à votre contexte, votre organisation, vos projets en cours. Nous parlons de vos décisions réelles, pas d'exemples génériques.",
  },
  {
    q: 'À quelle fréquence se déroulent les séances ?',
    a: "Le rythme est libre. Certains clients ont une séance par mois, d'autres toutes les deux semaines, d'autres ponctuellement sur un sujet spécifique. Il n'y a pas d'engagement de durée ou de fréquence.",
  },
  {
    q: 'Faut-il avoir un projet IA en cours pour commencer ?',
    a: "Non. Beaucoup de dirigeants commencent par une séance de cadrage pour comprendre où en est leur organisation et ce qui mérite d'être priorisé. D'autres ont déjà un projet et veulent un regard externe.",
  },
  {
    q: 'Avec qui se déroulent les séances ?',
    a: "Avec Tristan Camilli, co-fondateur de Luphy et responsable du pôle opérationnel et IA. Même interlocuteur tout au long, pas de rotation de consultants.",
  },
  {
    q: 'Combien coûte le coaching IA dirigeant ?',
    a: "Tarif à la séance ou à l'abonnement mensuel selon votre préférence. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Coaching IA dirigeant',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Coaching IA individuel pour fondateurs, associés et directeurs. Séances d'1 h, rythme libre, sans engagement.",
      serviceType: 'Coaching IA dirigeant',
      url: `${SITE_URL}/formation/coaching-dirigeant`,
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
        { '@type': 'ListItem', position: 3, name: 'Coaching dirigeant', item: `${SITE_URL}/formation/coaching-dirigeant` },
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
      <SchemaOrg url={`${SITE_URL}/formation/coaching-dirigeant`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/formation">Formation &amp; adoption</Link><span>/</span>
        <span>Coaching dirigeant</span>
      </nav>

      <section className="page-hero">
        <div className="label">Formation</div>
        <h1>Coaching IA<br /><em>dirigeant</em></h1>
        <p>
          Séances d&apos;1 heure, rythme libre, sans engagement. Repérer les bons cas d&apos;usage,
          écarter les mauvais, arbitrer un budget IA, évaluer un prestataire. Même interlocuteur tout au long.
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
          <h2 className="sec-title reveal">Un coaching adapté à votre rôle</h2>
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
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="label reveal">Ce que nous abordons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les sujets des séances</h2>
          <div className="problems-grid" style={{ marginTop: 32 }}>
            {CE_QUE_NOUS_ABORDONS.map((s, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur le coaching dirigeant</h2>
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
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Première séance</div>
          <h2 className="reveal">Prenons 30 minutes<br /><em>pour cadrer votre situation.</em></h2>
          <p className="cta-intro reveal">
            Échange avec Tristan. Pas d&apos;engagement. Votre devis personnalisé en moins d&apos;une semaine si vous souhaitez aller plus loin.
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
