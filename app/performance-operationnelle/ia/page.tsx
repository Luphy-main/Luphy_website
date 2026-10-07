import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'IA & automatisation | Luphy',
  description:
    "Workflows intelligents, enrichissement de leads par IA, reporting automatisé et intégration de vos outils, pour les acteurs de la finance. n8n, Make, Zapier, Claude.",
  openGraph: {
    title: 'IA & automatisation | Luphy',
    description: "Automatisez le superflu. Concentrez-vous sur l'essentiel.",
    url: `${SITE_URL}/performance-operationnelle/ia`,
  },
}

const PILIERS = [
  { icon: '🤖', title: 'Workflows intelligents', desc: 'Automatisations multi-étapes avec n8n, Make ou Zapier, déclenchées par des événements CRM, des emails ou des signaux de données externes.' },
  { icon: '🔍', title: 'Enrichissement de leads par IA', desc: 'Vos contacts sont enrichis automatiquement avec des données firmographiques, LinkedIn et des signaux d\'intention, sans recherche manuelle.' },
  { icon: '📈', title: 'Reporting automatisé', desc: 'Tableaux de bord en temps réel et rapports programmés livrés à votre équipe, sans jamais extraire les données à la main.' },
  { icon: '🔗', title: 'Intégration de votre stack', desc: 'CRM, email, facturation, fournisseurs de données et messagerie connectés en un système cohérent.' },
]

const CAS_USAGE = [
  { icon: '📬', title: 'Email vers CRM automatique', desc: 'Chaque email entrant est analysé, les contacts sont créés ou mis à jour dans le CRM et une tâche de suivi est assignée à la bonne personne.' },
  { icon: '🏷️', title: 'Scoring IA des leads', desc: 'Les leads sont scorés selon leur profil, leur comportement et leurs signaux d\'intention. Les plus prometteurs remontent en priorité.' },
  { icon: '📊', title: 'Rapport pipeline hebdomadaire', desc: 'Chaque lundi matin, votre équipe reçoit dans Slack un résumé du pipeline, des deals chauds et des opportunités à risque.' },
  { icon: '🔄', title: 'Synchronisation multi-outils', desc: 'HubSpot, Notion, Airtable et vos outils métiers restent synchronisés en temps réel. Plus de copier-coller, plus de doublons.' },
  { icon: '🧠', title: 'Enrichissement automatique', desc: 'À chaque nouveau contact, les données LinkedIn, firmographiques et d\'intention sont ajoutées à la fiche CRM.' },
  { icon: '📅', title: 'Relances automatiques', desc: 'Les relances sont planifiées selon l\'étape du deal et le comportement du prospect. Zéro oubli.' },
]

const OUTILS = ['n8n', 'Make', 'Zapier', 'Claude', 'OpenAI', 'HubSpot', 'Slack', 'Notion', 'Airtable']

const FAQ = [
  {
    q: 'Quelles tâches peut-on automatiser en priorité ?',
    a: "Les tâches répétitives à faible valeur ajoutée : saisie dans le CRM, enrichissement des contacts, relances, reporting hebdomadaire, synchronisation entre outils. Nous commençons par un diagnostic pour identifier celles qui libèrent le plus de temps.",
  },
  {
    q: 'Nos données sont sensibles. Peut-on utiliser l\'IA en toute sécurité ?',
    a: "Oui, avec un cadre d'usage clair. Nous classons chaque usage par niveau de criticité et configurons les outils dans des environnements sécurisés, avec hébergement UE quand c'est nécessaire. n8n peut être hébergé en interne.",
  },
  {
    q: 'Faut-il changer nos outils actuels ?',
    a: "Rarement. Nous construisons les automatisations sur vos outils existants et les connectons entre eux. Nous recommandons un nouvel outil uniquement quand il apporte un gain clair.",
  },
  {
    q: 'Combien coûte un projet IA ou automatisation ?',
    a: "Le tarif dépend du périmètre : nombre de workflows, outils à connecter, niveau de complexité. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'IA & automatisation',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: 'Workflows intelligents, enrichissement par IA, reporting automatisé et intégration des outils pour les acteurs de la finance.',
      serviceType: 'Conseil en automatisation et intelligence artificielle',
      url: `${SITE_URL}/performance-operationnelle/ia`,
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
        { '@type': 'ListItem', position: 3, name: 'IA & automatisation', item: `${SITE_URL}/performance-operationnelle/ia` },
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
      <SchemaOrg url={`${SITE_URL}/performance-operationnelle/ia`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/performance-operationnelle">Performance opérationnelle</Link><span>/</span>
        <span>IA &amp; automatisation</span>
      </nav>

      <section className="page-hero">
        <div className="label">Performance opérationnelle</div>
        <h1>Automatisez le superflu.<br /><em>Concentrez-vous sur l&apos;essentiel.</em></h1>
        <p>
          Connectez vos outils, éliminez les tâches manuelles et construisez des workflows intelligents
          adaptés à votre activité, propulsés par l&apos;IA et fondés sur vos données.
        </p>
        <div className="cta-btns">
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-primary">
            Parler IA &amp; opérationnel {SVG_ARROW}
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Éliminez les tâches qui n&apos;ont pas besoin de vous</h2>
          <p className="sec-sub reveal">
            Chaque heure passée sur une tâche répétitive est une heure de moins sur ce qui compte.
            Nous construisons des systèmes qui s&apos;occupent du reste, pour plus de 30 clients déjà accompagnés.
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

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Exemples</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Des cas d&apos;usage déjà déployés</h2>
          <p className="sec-sub reveal">Des automatisations en place chez nos clients, prêtes à adapter à votre contexte.</p>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {CAS_USAGE.map((c, i) => (
              <div key={i} className={`offer-card gold-card reveal${i % 3 ? ` d${i % 3}` : ''}`}>
                <div className="offer-card-line" />
                <div className="offer-icon icon-gold">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="sec-sub reveal" style={{ marginTop: 36 }}>
            Outils maîtrisés : {OUTILS.join(', ')}.
          </p>
        </div>
      </section>

      <section className="section">
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

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Passons à l&apos;action</div>
          <h2 className="reveal">Quelles tâches pouvons-nous<br /><em>automatiser pour vous ?</em></h2>
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
