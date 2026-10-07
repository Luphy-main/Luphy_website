import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Performance opérationnelle | Luphy',
  description:
    "Automatisation de processus, déploiement de l'IA et formation pour les acteurs de la finance. n8n, Make, Claude, agents IA sur vos données réelles.",
  openGraph: {
    title: 'Performance opérationnelle | Luphy',
    description: "Automatisation, IA et productivité pour les acteurs de la finance.",
    url: `${SITE_URL}/performance-operationnelle`,
  },
}

const PROBLEMS = [
  'Tâches manuelles chronophages : exports, copier-coller, resaisies entre outils',
  'Préparation de RDV ou d\'IC memos trop longue, sans structure commune',
  'Reporting manuel, peu fiable, mis à jour trop rarement',
  'Knowledge base inexistante : chaque collaborateur repart de zéro',
  'Outils IA adoptés individuellement, sans cadre ni sécurité',
  'Incertitude sur ce qui peut être confié à une IA avec des données sensibles',
]

const SERVICES = [
  {
    icon: '🤖',
    title: 'IA & automatisation',
    desc: 'Workflows intelligents avec n8n, Make, Zapier et cas d\'usage IA métier. Élimination des tâches répétitives, connexion entre vos outils.',
    link: '/performance-operationnelle/ia',
  },
  {
    icon: '📚',
    title: 'Formation & adoption',
    desc: 'Parcours Claude, acculturation IA, coaching dirigeant. Sur vos données et vos process réels, pas sur des exemples génériques.',
    link: '/formation',
  },
]

const FAQ = [
  {
    q: 'Par où commencer quand on n\'a encore rien automatisé ?',
    a: 'Par le diagnostic. Nous identifions les 3 à 5 processus les plus chronophages et les plus automatisables, nous chiffrons le gain potentiel de chacun, puis nous séquençons les déploiements du plus simple au plus structurant.',
  },
  {
    q: 'Nos données sont sensibles. Peut-on utiliser l\'IA en toute sécurité ?',
    a: 'Oui, à condition de définir un cadre d\'usage clair. Nous utilisons une classification par niveau de criticité (Explore, Assist, Execute, Restricted) et nous configurons les outils pour rester dans des environnements sécurisés, avec hébergement UE quand nécessaire.',
  },
  {
    q: 'Quels outils d\'automatisation utilisez-vous ?',
    a: 'n8n (open-source, hébergeable en interne), Make, Zapier, et Claude pour les tâches à forte composante de compréhension du langage. Le choix dépend de votre contexte, de vos outils existants et de vos exigences de confidentialité.',
  },
  {
    q: 'Combien de temps avant de voir les premiers résultats ?',
    a: 'Les quick wins (automatisation de tâches simples) peuvent être déployés en quelques semaines. Les projets structurants (agents IA métier, refonte de reporting) s\'inscrivent sur un horizon plus long, établi dans la feuille de route.',
  },
  {
    q: 'Combien coûte un projet d\'automatisation ou IA ?',
    a: 'Le tarif est adapté au périmètre : outils choisis, volume de workflows, niveau de complexité. Votre devis personnalisé en moins d\'une semaine après un premier échange.',
  },
]

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Performance opérationnelle',
        provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
        description: "Automatisation de processus, déploiement de l'IA et formation pour les acteurs de la finance.",
        serviceType: "Conseil en automatisation et intelligence artificielle",
        url: `${SITE_URL}/performance-operationnelle`,
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
          { '@type': 'ListItem', position: 2, name: 'Performance opérationnelle', item: `${SITE_URL}/performance-operationnelle` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/performance-operationnelle`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Performance opérationnelle</span>
      </nav>

      <section className="page-hero">
        <div className="label">Pôle 2</div>
        <h1>Performance<br /><em>opérationnelle</em></h1>
        <p>
          Productivité, automatisation, IA, traitement documentaire, reporting, gestion de la connaissance.
          Nous construisons des workflows intelligents sur vos processus réels et formons vos équipes
          à exploiter l&apos;IA dans un cadre sécurisé.
        </p>
        <div className="cta-btns">
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
            Parler IA &amp; opérationnel
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      {/* Problématiques */}
      <section className="section">
        <div className="container">
          <div className="label reveal">Vos enjeux</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ces situations vous parlent ?</h2>
          <div className="problems-grid">
            {PROBLEMS.map((p, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" style={{ background: 'var(--gold)' }} />
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Deux axes d&apos;intervention</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.link} className={`offer-card gold-card reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="offer-card-line" />
                <div className="offer-icon icon-gold">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="card-link">
                  Découvrir
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="label reveal">Notre approche</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Toujours partir d&apos;un diagnostic ROI</h2>
          <p className="sec-sub reveal">
            Nous ne déployons pas un outil parce qu&apos;il est dans l&apos;air du temps.
            Chaque projet démarre par une estimation du gain potentiel.
            Si le ROI n&apos;est pas là, nous le disons.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link href="/methode" className="btn-primary" style={{ fontSize: 14, padding: '12px 28px' }}>
              Voir le Diagnostic Performance ROI
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur nos projets IA &amp; automatisation</h2>
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

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Passons à l&apos;action</div>
          <h2 className="reveal">
            Identifions ensemble<br />
            <em>vos gains de productivité.</em>
          </h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min avec Tristan. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
              Parler IA &amp; opérationnel
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
