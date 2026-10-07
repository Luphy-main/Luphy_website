import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Performance commerciale | Luphy',
  description:
    'CRM, prospection, nurturing et pilotage commercial pour les acteurs de la finance. Affinity, DealCloud, HubSpot, Pipedrive, Notion et CRM sur mesure.',
  openGraph: {
    title: 'Performance commerciale | Luphy',
    description: 'CRM, prospection et pilotage commercial pour les acteurs de la finance.',
    url: `${SITE_URL}/performance-commerciale`,
  },
}

const PROBLEMS = [
  'Données CRM incomplètes, contacts dupliqués, historique introuvable',
  'Prospection artisanale : Excel, emails manuels, relances oubliées',
  'Visibilité nulle sur le pipeline, impossible de piloter les opportunités',
  'Temps de préparation de RDV trop long, sans briefing structuré',
  'Réseau non capitalisé : chaque associé sait ce que l\'autre ignore',
  'Reporting commercial manuel, chronophage et peu fiable',
]

const CRM_TOOLS = [
  { name: 'Affinity', desc: 'Référence PE, VC et M&A. Enrichissement automatique des contacts, suivi des interactions, dealflow.', link: '/performance-commerciale/crm/affinity' },
  { name: 'DealCloud', desc: 'Solution enterprise pour boutiques M&A et banques d\'affaires. Mandats, dealflow, reporting.', link: '/performance-commerciale/crm/dealcloud' },
  { name: 'HubSpot', desc: 'Idéal pour les sociétés de gestion et les cabinets de conseil orientés croissance commerciale.', link: '/performance-commerciale/crm/hubspot' },
  { name: 'Pipedrive', desc: 'Simple, efficace, rapide à déployer. Pour les équipes qui veulent aller vite.', link: '/performance-commerciale/crm/pipedrive' },
  { name: 'Notion', desc: 'CRM léger et collaboratif pour les structures agiles qui n\'ont pas besoin de la complexité d\'un CRM dédié.', link: '/performance-commerciale/crm/notion' },
  { name: 'Sur mesure', desc: 'Quand aucune solution du marché ne correspond exactement à vos processus métier.', link: '/performance-commerciale/crm/sur-mesure' },
]

const FAQ = [
  {
    q: 'Combien de temps prend le déploiement d\'un CRM ?',
    a: 'La durée dépend du CRM choisi, de la taille de votre équipe et de la complexité de vos processus. Nous établissons un calendrier précis dans le devis. Votre devis personnalisé en moins d\'une semaine après un premier échange.',
  },
  {
    q: 'Peut-on migrer depuis notre Excel ou un autre CRM ?',
    a: 'Oui. Nous gérons les migrations depuis Excel, Notion, Salesforce ou tout autre CRM. Nettoyage des données, déduplication, remapping des champs : c\'est une étape standard de nos projets.',
  },
  {
    q: 'Comment vous assurez-vous que les équipes utilisent vraiment le CRM ?',
    a: 'La formation est incluse dans chaque déploiement. Nous formons sur vos données et vos process réels, pas sur des exemples génériques. Nous définissons ensemble les indicateurs d\'adoption.',
  },
  {
    q: 'Combien coûte un projet CRM ?',
    a: 'Le tarif est adapté au périmètre : CRM choisi, nombre d\'utilisateurs, volume de données, modules activés. Votre devis personnalisé en moins d\'une semaine après un premier échange.',
  },
]

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Performance commerciale',
        provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
        description: 'Conseil et implémentation CRM, structuration de la prospection et pilotage commercial pour les acteurs de la finance.',
        serviceType: 'Conseil CRM et performance commerciale',
        url: `${SITE_URL}/performance-commerciale`,
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
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/performance-commerciale`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Performance commerciale</span>
      </nav>

      <section className="page-hero">
        <div className="label">Pôle 1</div>
        <h1>Performance<br /><em>commerciale</em></h1>
        <p>
          Ciblage, prospection, CRM, nurturing, suivi des opportunités, capitalisation du réseau, pilotage.
          Du conseil à l&apos;implémentation : nous déployons le CRM adapté à vos processus et
          formons vos équipes jusqu&apos;à l&apos;usage quotidien.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial
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
          <h2 className="sec-title reveal">Vous vous reconnaissez dans l&apos;un de ces problèmes ?</h2>
          <div className="problems-grid">
            {PROBLEMS.map((p, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Ce que nous déployons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">6 CRM, une méthode commune</h2>
          <p className="sec-sub reveal">Chaque outil a son profil idéal. Nous vous aidons à choisir puis à déployer.</p>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {CRM_TOOLS.map((t, i) => (
              <Link key={i} href={t.link} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="offer-card-line" />
                <h3 style={{ marginBottom: 8, marginTop: 0 }}>{t.name}</h3>
                <p>{t.desc}</p>
                <div className="card-link" style={{ marginTop: 20 }}>
                  En savoir plus
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
            Avant de choisir un CRM, nous chiffrons la valeur financière de chaque chantier.
            Chaque projet démarre par un diagnostic qui identifie les irritants, estime le gain
            potentiel et séquence les déploiements.
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

      {/* Preuve */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Résultat client</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ce que ça change concrètement</h2>
          <div className="why-proof reveal" style={{ maxWidth: '100%', marginTop: 32, marginBottom: 24 }}>
            <strong>Allyum (fonds d&apos;investissement) :</strong> environ +25 % de temps disponible pour la
            prospection et ×2 sur le nombre de mandats suivis après un an, sans recrutement supplémentaire.
          </div>
          <div className="testi-card reveal">
            <p className="testi-quote">[VERBATIM À COLLECTER — Client Allyum, fonction]</p>
            <div className="testi-author">
              <strong>[Prénom Nom]</strong>
              <span>[Titre], Allyum</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
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

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Passons à l&apos;action</div>
          <h2 className="reveal">
            Structurons ensemble<br />
            <em>votre performance commerciale.</em>
          </h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min avec Titouan. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial
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
