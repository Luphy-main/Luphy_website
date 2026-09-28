import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Prospection outbound | Luphy',
  description:
    "Structuration et automatisation de la prospection outbound pour les acteurs de la finance. Ciblage, séquences, outils et intégration CRM.",
  openGraph: {
    title: 'Prospection outbound | Luphy',
    description: "Prospection outbound structurée et automatisée pour la finance.",
    url: `${SITE_URL}/performance-commerciale/outbound`,
  },
}

const PROBLEMES = [
  'Prospection artisanale : emails manuels un par un, relances oubliées',
  'Ciblage trop large et pas assez qualifié, taux de réponse faible',
  'Aucune visibilité sur ce qui fonctionne (ni taux d\'ouverture, ni tracking)',
  'Pas de processus de qualification : tous les prospects traitent de la même manière',
  'Le CRM et les outils outbound sont déconnectés, les données ne remontent pas',
]

const CE_QUE_NOUS_FAISONS = [
  { title: 'Définition de l\'ICP et du ciblage', desc: 'Identification précise de votre profil de prospect idéal (secteur, taille, fonction, géographie, signaux d\'achat). Construction ou enrichissement de la base de cibles.' },
  { title: 'Conception des séquences', desc: 'Rédaction des messages (email, LinkedIn), paramétrage des délais et des conditions de rebond. Approche multicanale selon votre contexte.' },
  { title: 'Mise en place des outils', desc: 'Configuration de Lemlist, La Growth Machine, Clay ou Apollo selon votre cas. Connexion avec votre boîte mail et votre CRM pour que tout remonte automatiquement.' },
  { title: 'Intégration CRM', desc: 'Les prospects qui répondent ou avancent dans la séquence apparaissent automatiquement dans votre CRM avec le bon statut. Pas de saisie manuelle.' },
  { title: 'Pilotage et itération', desc: 'Mise en place des indicateurs clés (taux d\'ouverture, taux de réponse, taux de RDV pris) et rituels de revue hebdomadaire pour itérer sur les messages et le ciblage.' },
]

const FAQ = [
  {
    q: 'L\'outbound est-il adapté aux acteurs de la finance ?',
    a: "Oui, mais la forme est différente du B2B SaaS. Les messages doivent être courts, personnalisés et pertinents. Le volume est plus faible, la qualité prime. Une approche bien paramétrée donne de bons résultats pour les fonds en quête de LPs, les boutiques M&A qui développent leur sourcing ou les cabinets de conseil qui prospectent de nouveaux clients.",
  },
  {
    q: 'Quels outils outbound utilisez-vous ?',
    a: "Nous utilisons principalement Lemlist, La Growth Machine et Clay selon les besoins. Le choix dépend de votre contexte : volume de prospects, canaux utilisés (email vs LinkedIn), niveau de personnalisation souhaité. Nous vous conseillons l'outil adapté.",
  },
  {
    q: 'Combien de temps avant de voir les premiers résultats ?',
    a: "Les premières réponses arrivent généralement dans les 2 à 4 semaines après le lancement des séquences. Les résultats s'améliorent au fil des itérations sur les messages et le ciblage. L'outbound est un canal qui se construit dans la durée.",
  },
  {
    q: 'L\'outbound est-il intégré au CRM ?',
    a: "Oui, systématiquement. Un prospect qui répond à une séquence doit apparaître dans votre CRM avec les informations nécessaires pour le suivi commercial. Nous configurons cette intégration pour éviter toute saisie manuelle.",
  },
  {
    q: 'Combien coûte la mise en place d\'une stratégie outbound ?',
    a: "Le tarif couvre le conseil, la configuration des outils et la formation. Il est adapté au périmètre retenu. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Prospection outbound',
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: 'Structuration et automatisation de la prospection outbound pour les acteurs de la finance.',
      serviceType: 'Conseil en prospection commerciale',
      url: `${SITE_URL}/performance-commerciale/outbound`,
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
        { '@type': 'ListItem', position: 3, name: 'Prospection outbound', item: `${SITE_URL}/performance-commerciale/outbound` },
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
      <SchemaOrg url={`${SITE_URL}/performance-commerciale/outbound`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/performance-commerciale">Performance commerciale</Link><span>/</span>
        <span>Prospection outbound</span>
      </nav>

      <section className="page-hero">
        <div className="label">Performance commerciale</div>
        <h1>Prospection<br /><em>outbound</em></h1>
        <p>
          Ciblage précis, séquences multicanales, outils connectés à votre CRM.
          Une approche outbound structurée génère des conversations qualifiées,
          pas du volume pour le volume.
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
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">De la stratégie à l&apos;exécution</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            {CE_QUE_NOUS_FAISONS.map((s, i) => (
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

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur la prospection outbound</h2>
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
          <h2 className="reveal">Structurons ensemble<br /><em>votre prospection.</em></h2>
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
