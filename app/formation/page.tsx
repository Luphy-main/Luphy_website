import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Formation IA & CRM | Luphy',
  description:
    "Formation et adoption IA pour dirigeants et équipes. Acculturation IA, parcours Claude, adoption CRM, coaching dirigeant. Sur vos données et vos process réels.",
  openGraph: {
    title: 'Formation IA & CRM | Luphy',
    description: "Formation IA et CRM sur vos données et vos process réels.",
    url: `${SITE_URL}/formation`,
  },
}

const FORMATS = [
  {
    icon: '💡',
    label: 'Atelier découverte',
    title: 'Demi-journée de découverte IA',
    for: 'Dirigeants, associés, équipe complète',
    desc: 'Ce que l\'IA fait vraiment aujourd\'hui, démonstrations sur vos cas réels, premiers réflexes, cadre d\'usage. Un point de départ commun pour toute l\'organisation.',
    link: null,
  },
  {
    icon: '🎓',
    label: 'Acculturation IA',
    title: 'Acculturation IA',
    for: 'COMEX, associés, managers',
    desc: 'Fondamentaux, gouvernance et charte d\'usage, conduite du changement, ROI, suivi des usages. Sur plusieurs semaines pour ancrer les comportements.',
    link: '/formation/acculturation-ia',
  },
  {
    icon: '🤖',
    label: 'Parcours Claude',
    title: 'Parcours Claude',
    for: 'Tous profils, du débutant aux utilisateurs avancés',
    desc: '3 niveaux : Chat & Projets, Cowork & Skills, Claude Code & agents. Accessible aux non-développeurs. Cas d\'usage sur vos propres documents.',
    link: '/formation/claude',
  },
  {
    icon: '📋',
    label: 'Formation CRM',
    title: 'Adoption CRM',
    for: 'Équipes commerciales, managers',
    desc: 'Règles de saisie, pipelines, reporting, rituels de pilotage. Sur vos données réelles (Affinity, DealCloud, HubSpot, Pipedrive, Notion, CRM sur mesure).',
    link: '/formation/crm',
  },
  {
    icon: '👤',
    label: 'Coaching dirigeant',
    title: 'Coaching IA dirigeant',
    for: 'Fondateur, associé, directeur',
    desc: 'Séances d\'1 h, rythme libre, sans engagement. Repérer les bons cas d\'usage, écarter les mauvais, arbitrer un budget IA. Même interlocuteur tout au long.',
    link: '/formation/coaching-dirigeant',
  },
]

const DIFFERENCIANTS = [
  { title: 'Sur vos données, pas des exemples génériques', desc: 'Chaque session utilise vos documents, vos processus et vos cas d\'usage réels. L\'apprentissage est immédiatement applicable.' },
  { title: 'Des formateurs qui déploient', desc: 'Nous déployons ces outils chez des clients toute l\'année. Nous partageons ce qui fonctionne vraiment, pas une présentation PowerPoint.' },
  { title: 'Spécifique finance', desc: 'Manipulation de données confidentielles, niveaux de criticité (Explore / Assist / Execute / Restricted), cas d\'usage fonds et M&A. Nous connaissons vos contraintes.' },
  { title: 'Mesurée', desc: 'Indicateurs d\'usage, questionnaire avant/après, cas d\'usage activés, champions internes identifiés. La formation est une étape, l\'adoption est l\'objectif.' },
]

const FAQ = [
  {
    q: 'La formation est-elle finançable via l\'OPCO ou le CPF ?',
    a: "Luphy n'est pas certifié Qualiopi. Nos formations ne sont pas finançables via les dispositifs OPCO ou CPF.",
  },
  {
    q: 'Les formations se font-elles en présentiel ou en distanciel ?',
    a: "Les deux sont possibles selon le format. Les ateliers et séances collectives avec forte dynamique de groupe se font de préférence en présentiel. Les sessions techniques et le suivi individuel se font souvent en distanciel.",
  },
  {
    q: 'Faut-il un prérequis technique pour les formations IA ?',
    a: "Non. Nos formations sont conçues pour être accessibles aux non-développeurs. Le niveau de départ est évalué en amont pour adapter le contenu à votre équipe.",
  },
  {
    q: 'Peut-on combiner formation IA et déploiement CRM ?',
    a: "Oui, et c'est même notre recommandation. Un outil non adopté ne crée aucun ROI. Nous intégrons systématiquement une phase de formation dans chaque projet de déploiement.",
  },
  {
    q: 'Combien coûte une formation ?',
    a: "Le tarif est adapté au format, au nombre de participants et à la durée. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Formation IA & CRM',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Formation et adoption IA pour dirigeants et équipes. Acculturation IA, parcours Claude, adoption CRM, coaching dirigeant.",
      serviceType: 'Formation professionnelle IA et CRM',
      url: `${SITE_URL}/formation`,
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
      ],
    },
  ],
}

const SVG_ARROW = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/formation`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>Formation &amp; adoption</span>
      </nav>

      <section className="page-hero">
        <div className="label">Axe transverse</div>
        <h1>Formation<br /><em>&amp; adoption</em></h1>
        <p>
          Un outil non adopté ne crée aucun ROI. La formation n&apos;est pas un catalogue à part :
          c&apos;est l&apos;étape qui transforme un déploiement en usage réel. Sur vos données
          et vos processus, pas sur des exemples génériques.
        </p>
        <div className="cta-btns">
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
            Parler IA &amp; opérationnel {SVG_ARROW}
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      {/* Formats */}
      <section className="section">
        <div className="container">
          <div className="label reveal">Nos formats</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">5 formats selon votre situation</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {FORMATS.map((f, i) => {
              const card = (
                <>
                  <div className="offer-card-line" />
                  <div className="offer-icon icon-green" style={{ fontSize: 20 }}>{f.icon}</div>
                  <div className="offer-card-sub">{f.label}</div>
                  <h3>{f.title}</h3>
                  <p style={{ marginBottom: 6 }}><em style={{ color: 'var(--sky)', fontStyle: 'normal', fontSize: 12, fontWeight: 600 }}>Pour qui : </em>{f.for}</p>
                  <p>{f.desc}</p>
                  {f.link && (
                    <div className="card-link" style={{ marginTop: 20, color: 'var(--sky)' }}>
                      En savoir plus {SVG_ARROW}
                    </div>
                  )}
                </>
              )
              return f.link
                ? <Link key={i} href={f.link} className={`offer-card sky-card reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>{card}</Link>
                : <div key={i} className={`offer-card sky-card reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>{card}</div>
            })}
          </div>
        </div>
      </section>

      {/* Différenciants */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Ce qui nous distingue</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Pourquoi nos formations fonctionnent</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            {DIFFERENCIANTS.map((d, i) => (
              <div key={i} className={`why-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="why-card-diamond">◆</div>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur nos formations</h2>
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
          <h2 className="reveal">Formons ensemble<br /><em>vos équipes sur vos cas réels.</em></h2>
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
