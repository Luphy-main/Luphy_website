import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'CRM sur mesure | Luphy',
  description:
    "Quand Affinity, DealCloud, HubSpot, Pipedrive et Notion ne suffisent pas : ce que nous construisons pour vous. CRM sur mesure pour les processus atypiques.",
  openGraph: {
    title: 'CRM sur mesure | Luphy',
    description: "Ce que nous construisons quand les CRM du marché ne suffisent pas.",
    url: `${SITE_URL}/performance-commerciale/crm/sur-mesure`,
  },
}

const QUAND = [
  'Votre processus est trop atypique pour rentrer dans les pipelines d\'un CRM standard',
  'Vous avez besoin d\'une logique multi-entités que les CRM du marché ne gèrent pas bien',
  'Vous voulez intégrer des données propriétaires (modèles financiers, référentiels internes) directement dans le CRM',
  'Vos contraintes de confidentialité imposent un hébergement totalement interne',
  'Vous utilisez déjà plusieurs outils et souhaitez un point de centralisation sur mesure',
]

const CE_QUE_NOUS_CONSTRUISONS = [
  { icon: '🗄️', title: 'Bases Notion sur mesure', desc: 'Architecture de bases de données Notion avancées avec relations complexes, formules, automatisations et vues personnalisées pour chaque profil.' },
  { icon: '📊', title: 'Bases Airtable configurées', desc: 'Pour les équipes qui ont besoin de la puissance d\'Airtable : vues galerie, formulaires d\'entrée, scripts d\'automatisation, intégrations API.' },
  { icon: '⚙️', title: 'Workflows d\'automatisation', desc: 'Connexion entre vos outils existants via n8n, Make ou Zapier. Synchronisation de données entre plusieurs bases, alertes, enrichissement.' },
  { icon: '🔧', title: 'Applications légères sur mesure', desc: 'Pour les cas les plus spécifiques : interfaces web légères (Next.js) connectées à vos données. [À préciser selon vos besoins]' },
]

const FAQ = [
  {
    q: 'Comment savoir si j\'ai besoin d\'un CRM sur mesure plutôt qu\'un CRM du marché ?',
    a: "La première question est : est-ce qu'un CRM du marché (Affinity, DealCloud, HubSpot, Pipedrive, Notion) répond à 80 % de vos besoins ? Si oui, mieux vaut le déployer et l'adapter. Si votre processus est vraiment atypique, ou si vos contraintes techniques ou de confidentialité l'exigent, le sur-mesure s'impose.",
  },
  {
    q: 'Un CRM sur mesure n\'est-il pas plus risqué à maintenir ?',
    a: "Oui, c'est le principal inconvénient. Nous le signalons systématiquement lors du diagnostic. Un CRM sur mesure est plus flexible mais dépend d'une maintenance continue. Nous documentons tout et formons votre équipe pour réduire cette dépendance.",
  },
  {
    q: 'Quels outils utilisez-vous pour construire un CRM sur mesure ?',
    a: "Selon votre contexte : Notion ou Airtable pour les bases de données no-code/low-code, n8n ou Make pour les automatisations, et ponctuellement des interfaces web légères en Next.js pour les cas les plus spécifiques.",
  },
  {
    q: 'Peut-on migrer vers un CRM du marché plus tard ?',
    a: "Oui, à condition que les données soient bien structurées dès le départ. Nous concevons les bases en pensant à la portabilité : formats standards, documentation claire, export facile.",
  },
  {
    q: 'Combien coûte un CRM sur mesure ?',
    a: "Le tarif dépend de la complexité du projet : nombre d'entités, volume de données, intégrations, développement éventuel. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'CRM sur mesure',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "Conception et déploiement de CRM sur mesure pour les processus atypiques que les CRM du marché ne couvrent pas.",
      serviceType: 'Développement CRM sur mesure',
      url: `${SITE_URL}/performance-commerciale/crm/sur-mesure`,
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
        { '@type': 'ListItem', position: 2, name: 'Performance commerciale', item: `${SITE_URL}/performance-commerciale` },
        { '@type': 'ListItem', position: 3, name: 'Consulting CRM', item: `${SITE_URL}/performance-commerciale/crm` },
        { '@type': 'ListItem', position: 4, name: 'CRM sur mesure', item: `${SITE_URL}/performance-commerciale/crm/sur-mesure` },
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
      <SchemaOrg url={`${SITE_URL}/performance-commerciale/crm/sur-mesure`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/performance-commerciale">Performance commerciale</Link><span>/</span>
        <Link href="/performance-commerciale/crm">CRM</Link><span>/</span>
        <span>Sur mesure</span>
      </nav>

      <section className="page-hero">
        <div className="label">Consulting CRM</div>
        <h1>Quand les solutions du marché<br /><em>ne suffisent pas.</em></h1>
        <p>
          Affinity, DealCloud, HubSpot, Pipedrive, Notion : ces outils couvrent la grande majorité des besoins.
          Parfois ce n&apos;est pas le cas. Nous concevons alors la solution adaptée à votre processus exact.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Quand opter pour le sur-mesure</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ces situations vous correspondent ?</h2>
          <div className="problems-grid" style={{ marginTop: 32 }}>
            {QUAND.map((q, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Ce que nous construisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Nos approches sur-mesure</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {CE_QUE_NOUS_CONSTRUISONS.map((c, i) => (
              <div key={i} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="offer-card-line" />
                <div className="offer-icon icon-sky" style={{ fontSize: 20 }}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur le CRM sur mesure</h2>
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
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Parlons-en</div>
          <h2 className="reveal">Construisons ensemble<br /><em>votre CRM sur mesure.</em></h2>
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
