import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Consulting CRM | Luphy',
  description:
    "Conseil, migration et optimisation CRM pour les acteurs de la finance : Affinity, DealCloud, HubSpot, Pipedrive, Notion et CRM sur mesure. Architecture, automatisation et adoption.",
  openGraph: {
    title: 'Consulting CRM | Luphy',
    description: "Faites de votre CRM la colonne vertébrale de votre organisation.",
    url: `${SITE_URL}/performance-commerciale/crm`,
  },
}

const PROBLEMES = [
  'Un CRM contre lequel les équipes se battent au lieu de s\'en servir',
  'Des données incomplètes ou en doublon, qui se transforment en heures perdues',
  'Des processus commerciaux non cartographiés, chacun saisit à sa façon',
  'Des outils déconnectés : email, calendrier, outbound et reporting vivent à part',
  'Un taux d\'adoption faible après le lancement, faute de formation et de suivi',
]

const PILIERS = [
  { icon: '📊', title: 'Visibilité et architecture des données', desc: 'Cartographie des processus, segmentation de la base de données et structure unifiée à travers tous vos outils et parties prenantes.' },
  { icon: '⚙️', title: 'Automatisation et intégrations', desc: 'Workflows personnalisés, automatisation via n8n et intégration avec votre stack existante.' },
  { icon: '👥', title: 'Conduite du changement et adoption', desc: 'Formations, ateliers et accompagnement continu pour que vos équipes utilisent vraiment le CRM au quotidien.' },
  { icon: '🔄', title: 'Partenariat dans la durée', desc: 'Nous ne disparaissons pas après le lancement. Nous itérons et faisons évoluer votre CRM avec votre organisation.' },
]

const OFFRES = [
  { tag: 'Démarrer', title: 'Audit et diagnostic', desc: 'Cartographie des processus, évaluation des besoins, choix de l\'outil et recommandations à gains rapides.' },
  { tag: 'Déployer', title: 'Migration et onboarding', desc: 'Migration complète avec transfert de données, architecture personnalisée, segmentation, automatisation et formation.' },
  { tag: 'Optimiser', title: 'Optimisation CRM', desc: 'Workflows sur mesure, automatisation n8n, intégrations API et tableaux de bord de pilotage en temps réel.' },
]

const CRMS = [
  { name: 'Affinity', desc: 'Le CRM de référence pour le dealflow et la relation investisseur.', link: '/performance-commerciale/crm/affinity' },
  { name: 'DealCloud', desc: 'La solution enterprise pour les boutiques M&A et les banques d\'affaires.', link: '/performance-commerciale/crm/dealcloud' },
  { name: 'HubSpot', desc: 'Le CRM tout-en-un pour les équipes orientées croissance commerciale.', link: '/performance-commerciale/crm/hubspot' },
  { name: 'Pipedrive', desc: 'Le CRM simple et efficace pour les équipes qui veulent aller vite.', link: '/performance-commerciale/crm/pipedrive' },
  { name: 'Notion', desc: 'Un CRM léger et collaboratif pour les organisations agiles.', link: '/performance-commerciale/crm/notion' },
  { name: 'Sur mesure', desc: 'Quand aucun outil du marché ne colle à vos processus.', link: '/performance-commerciale/crm/sur-mesure' },
]

const ETAPES = [
  { title: 'Cadrage', desc: 'Définition du périmètre d\'intervention pour maximiser la valeur créée.' },
  { title: 'Audit et cartographie', desc: 'Audit complet des données existantes et cartographie des processus.' },
  { title: 'Feuille de route', desc: 'Plan de livraison avec un calendrier clair de migration ou d\'optimisation.' },
  { title: 'Déploiement', desc: 'Architecture sur mesure, workflows automatisés et intégration complète de la stack.' },
  { title: 'Adoption', desc: 'Formation, ateliers et points réguliers pour une adoption maximale.' },
  { title: 'Itération', desc: 'Nous affinons et faisons évoluer vos systèmes dans la durée.' },
]

const FAQ = [
  {
    q: 'Quel CRM choisir pour un acteur de la finance ?',
    a: "Cela dépend de votre métier et de votre taille. Affinity s'impose souvent pour les fonds, DealCloud pour les banques d'affaires et grandes structures, HubSpot ou Pipedrive pour les équipes commerciales plus classiques, Notion pour les petites équipes. Nous vous recommandons l'outil adapté après le diagnostic, sans parti pris.",
  },
  {
    q: 'Pouvez-vous reprendre un CRM déjà en place ?',
    a: "Oui. Une grande partie de nos missions consiste à remettre d'aplomb un CRM existant : nettoyage des données, refonte de l'architecture, automatisations et relance de l'adoption. Une migration n'est pas toujours nécessaire.",
  },
  {
    q: 'Combien de temps dure un projet CRM ?',
    a: "Un audit se fait en quelques jours. Une migration ou un déploiement complet prend généralement quelques semaines selon le volume de données et le nombre d'intégrations. Le calendrier est fixé dans la feuille de route.",
  },
  {
    q: 'Combien coûte un projet CRM ?',
    a: "Le tarif dépend du périmètre : outil retenu, volume de données, intégrations et formation. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Consulting CRM',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: 'Conseil, migration et optimisation CRM pour les acteurs de la finance.',
      serviceType: 'Conseil CRM',
      url: `${SITE_URL}/performance-commerciale/crm`,
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
      <SchemaOrg url={`${SITE_URL}/performance-commerciale/crm`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/performance-commerciale">Performance commerciale</Link><span>/</span>
        <span>Consulting CRM</span>
      </nav>

      <section className="page-hero">
        <div className="label">Performance commerciale</div>
        <h1>Faites de votre CRM<br /><em>la colonne vertébrale de votre organisation</em></h1>
        <p>
          Trop souvent, un CRM est un outil contre lequel on se bat plutôt qu&apos;un levier de croissance.
          Notre mission : faire de votre écosystème l&apos;allié de vos équipes, pour opérer plus vite et gagner plus de deals.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Vos enjeux</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ces problèmes vous parlent ?</h2>
          <div className="problems-grid">
            {PROBLEMES.map((p, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Notre approche</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Un CRM pensé pour votre métier</h2>
          <p className="sec-sub reveal">
            Processus clairs, données propres, automatisation utile et équipes formées :
            c&apos;est ce qui fait gagner du temps et des deals. Plus de 30 clients nous ont déjà fait confiance.
          </p>
          <div className="delivs-grid" style={{ marginTop: 36 }}>
            {PILIERS.map((p, i) => (
              <div key={i} className={`deliv-item reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="deliv-icon">{p.icon}</div>
                <div className="deliv-text">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Nos offres</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Par quoi commencer ?</h2>
          <p className="sec-sub reveal">Choisissez selon votre étape. Chaque mission est dimensionnée à vos besoins.</p>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {OFFRES.map((o, i) => (
              <div key={i} className={`offer-card reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="offer-card-line" />
                <div className="offer-card-sub">{o.tag}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Les outils</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les CRM que nous déployons</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {CRMS.map((c, i) => (
              <Link key={c.name} href={c.link} className={`offer-card reveal${i % 3 ? ` d${i % 3}` : ''}`}>
                <div className="offer-card-line" />
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <div className="card-link">Découvrir {SVG_ARROW}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Notre méthode</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Six étapes pour un impact durable</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            {ETAPES.map((s, i) => (
              <div key={i} className={`step-row reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="step-num" style={{ fontSize: 18, minWidth: 32 }}>0{i + 1}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur nos projets CRM</h2>
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
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Prêt à démarrer ?</div>
          <h2 className="reveal">Faisons de votre CRM<br /><em>un levier de croissance.</em></h2>
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
