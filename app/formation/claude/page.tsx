import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Parcours Claude | Formation Luphy',
  description:
    "Formation Claude en 3 niveaux : Chat & Projets, Cowork & Skills, Claude Code & agents. Accessible aux non-développeurs, sur vos propres documents.",
  openGraph: {
    title: 'Parcours Claude | Formation Luphy',
    description: "Maîtrisez Claude en 3 niveaux, du Chat aux agents autonomes.",
    url: `${SITE_URL}/formation/claude`,
  },
}

const NIVEAUX = [
  {
    num: '01',
    title: 'Chat & Projets',
    subtitle: 'Utilisateur débutant à intermédiaire',
    items: [
      'Rédiger des prompts efficaces : structure, contexte, exemples',
      'Utiliser les Projets Claude pour travailler avec vos propres documents',
      'Garder la mémoire de vos contextes entre les sessions',
      'Cas d\'usage immédiats : mémos, synthèses, reformulation, recherche',
    ],
  },
  {
    num: '02',
    title: 'Cowork & Skills',
    subtitle: 'Utilisateur intermédiaire à avancé',
    items: [
      'Créer et partager des Skills (instructions réutilisables)',
      'Travailler en collaboration avec Claude sur des projets longs',
      'Gérer une mémoire persistante et des contextes complexes',
      'Automatisations légères : connexion avec vos outils via Claude',
    ],
  },
  {
    num: '03',
    title: 'Claude Code & agents',
    subtitle: 'Profils avancés, non-développeurs inclus',
    items: [
      'Utiliser Claude Code pour automatiser des tâches répétitives',
      'Comprendre la logique des agents : outils, mémoire, boucle d\'exécution',
      'Construire un agent simple sur un processus de votre organisation',
      'Cadre d\'usage et gouvernance des agents dans un contexte finance',
    ],
  },
]

const FAQ = [
  {
    q: 'Faut-il être développeur pour suivre le niveau 3 ?',
    a: "Non. Le niveau 3 est conçu pour être accessible aux non-développeurs. Nous travaillons sur des cas d'usage concrets à partir de vos processus réels, sans écrire de code. Les participants avec des notions de programmation iront plus loin, mais ce n'est pas un prérequis.",
  },
  {
    q: 'Les 3 niveaux sont-ils suivis en une seule session ?',
    a: "Non. Chaque niveau est une formation distincte, sur une demi-journée à une journée selon votre groupe. Vous choisissez le ou les niveaux adaptés à votre équipe. Nous recommandons souvent de commencer par une évaluation du niveau de départ pour éviter de payer pour du contenu déjà maîtrisé.",
  },
  {
    q: 'Peut-on suivre les formations sur nos propres documents ?',
    a: "Oui, et c'est même notre approche par défaut. Amener vos propres mémos, modèles, processus dans la formation rend l'apprentissage immédiatement applicable. Nous travaillons sur votre réalité, pas des cas fictifs.",
  },
  {
    q: 'Claude est-il adapté aux métiers de la finance ?',
    a: "Oui. Nous avons une expérience terrain sur des usages finance : extraction d'information dans des mémos d'investissement, analyse de documents contractuels, synthèses de due diligence, rédaction de rapports LPs. La formation intègre ces cas d'usage.",
  },
  {
    q: 'Combien coûte le parcours Claude ?',
    a: "Le tarif est adapté au nombre de participants et au nombre de niveaux suivis. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Parcours Claude',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Formation Claude en 3 niveaux : Chat & Projets, Cowork & Skills, Claude Code & agents.",
      serviceType: 'Formation IA Claude',
      url: `${SITE_URL}/formation/claude`,
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
        { '@type': 'ListItem', position: 3, name: 'Parcours Claude', item: `${SITE_URL}/formation/claude` },
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
      <SchemaOrg url={`${SITE_URL}/formation/claude`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/formation">Formation &amp; adoption</Link><span>/</span>
        <span>Parcours Claude</span>
      </nav>

      <section className="page-hero">
        <div className="label">Formation</div>
        <h1>Parcours<br /><em>Claude</em></h1>
        <p>
          3 niveaux progressifs pour maîtriser Claude : du Chat aux agents autonomes.
          Accessible aux non-développeurs. Cas d&apos;usage sur vos propres documents,
          adaptés aux métiers de la finance.
        </p>
        <div className="cta-btns">
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
            Parler IA &amp; opérationnel {SVG_ARROW}
          </a>
          <Link href="/formation" className="btn-outline">Tous nos formats</Link>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="label reveal">Programme</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">3 niveaux, du débutant à l&apos;avancé</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40 }}>
            {NIVEAUX.map((n, i) => (
              <div key={i} className={`reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}
                style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '32px 36px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-sora)', fontSize: 28, fontWeight: 700, color: 'var(--sky)', minWidth: 40 }}>{n.num}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 20 }}>{n.title}</h3>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>{n.subtitle}</p>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {n.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur le parcours Claude</h2>
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
          <h2 className="reveal">Maîtrisez Claude<br /><em>sur vos propres cas d&apos;usage.</em></h2>
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
