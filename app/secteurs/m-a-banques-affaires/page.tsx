import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'M&A et banques d\'affaires | Luphy',
  description:
    "CRM et automatisation pour boutiques M&A et banques d'affaires. Suivi des mandats, gestion de la confidentialité, sourcing acquéreurs, outbound structuré.",
  openGraph: {
    title: 'M&A et banques d\'affaires | Luphy',
    description: "CRM DealCloud ou Affinity, outbound et automatisation pour les acteurs M&A.",
    url: `${SITE_URL}/secteurs/m-a-banques-affaires`,
  },
}

const ENJEUX = [
  "Suivi des mandats éparpillé entre boîtes mail, Excel et conversations WhatsApp",
  "Base de contacts acheteurs et vendeurs non centralisée, requalifiée à chaque nouveau mandat",
  "NDAs et gestion de la confidentialité complexes : qui a accès à quoi et depuis quand ?",
  "Relances manuelles chronophages sur des dizaines de contacts simultanés",
  "Aucun dashboard d'activité : impossible de piloter l'équipe ni de visualiser le pipeline mandats",
]

const CE_QUE_NOUS_FAISONS = [
  {
    title: 'CRM DealCloud ou Affinity pour les mandats',
    desc: "DealCloud est conçu pour les boutiques M&A : suivi des mandats de bout en bout, gestion des relations acheteurs/vendeurs, pipeline deal. Affinity est une alternative plus accessible avec capture automatique des interactions. Nous choisissons avec vous selon votre taille et vos contraintes.",
  },
  {
    title: 'Gestion des droits d\'accès et confidentialité',
    desc: "Configuration fine des accès par mandat et par profil. Vos associés ne voient que ce qu'ils doivent voir. Traçabilité des accès aux datarooms et aux contacts sensibles.",
  },
  {
    title: 'Outbound sourcing acquéreurs',
    desc: "Structuration de vos listes d'acquéreurs potentiels, mise en place de séquences de prise de contact personnalisées. Lemlist ou La Growth Machine selon votre volume et vos usages.",
  },
  {
    title: 'Automatisation des process documentaires',
    desc: "Génération automatisée de NDA, envoi de courriers de confidentialité, suivi des signatures. Connexion avec DocuSign ou equivalents pour que rien ne se perde.",
  },
]

const OUTILS = [
  {
    icon: '🏦',
    name: 'DealCloud',
    desc: "CRM spécialisé M&A et banques d'affaires. Suivi des mandats, gestion des relations, pipeline deal.",
    link: '/performance-commerciale/crm/dealcloud',
  },
  {
    icon: '🔗',
    name: 'Affinity',
    desc: "Alternative plus accessible avec capture automatique des interactions email et LinkedIn.",
    link: '/performance-commerciale/crm/affinity',
  },
  {
    icon: '📧',
    name: 'Lemlist / La Growth Machine',
    desc: "Outbound structuré pour le sourcing acquéreurs et la prise de contact initiale.",
    link: '/performance-commerciale/outbound',
  },
  {
    icon: '⚙️',
    name: 'n8n',
    desc: "Automatisation des flux documentaires, alertes, synchronisation entre vos outils.",
    link: null,
  },
]

const FAQ = [
  {
    q: "DealCloud ou Affinity pour une boutique M&A ?",
    a: "DealCloud est plus puissant et plus complet pour les processus M&A (gestion des mandats, multiples entités, reporting avancé), mais plus coûteux et plus long à déployer. Affinity convient mieux aux boutiques de taille plus modeste qui veulent un outil rapidement opérationnel avec une bonne capture automatique des interactions. Le choix dépend de votre taille, de votre volume de mandats et de votre budget.",
  },
  {
    q: "Comment garantir la confidentialité des données de deal ?",
    a: "Les deux outils (DealCloud et Affinity) disposent de configurations de droits d'accès granulaires. Nous mettons en place une architecture d'accès par mandat : chaque collaborateur ne voit que les deals auxquels il est associé. Nous documentons également une charte interne de gestion des données confidentielles.",
  },
  {
    q: "Peut-on automatiser la prospection d'acquéreurs ?",
    a: "Oui, partiellement. La constitution de la liste d'acquéreurs potentiels reste un travail de qualification humaine, mais l'envoi des prises de contact initiales et les relances peuvent être automatisés avec Lemlist ou La Growth Machine. Chaque message reste personnalisé au niveau de l'entreprise cible.",
  },
  {
    q: "Peut-on migrer nos fichiers Excel et contacts Outlook existants ?",
    a: "Oui. Nous effectuons l'import, le nettoyage et la déduplication de vos données existantes. C'est une étape systématique dans chaque déploiement.",
  },
  {
    q: "Quel est le tarif pour une boutique M&A ?",
    a: "Le tarif dépend du périmètre (CRM seul, outbound, automatisation) et de la taille de l'équipe. Votre devis personnalisé en moins d'une semaine après un premier échange.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: "CRM et automatisation pour M&A et banques d'affaires",
      provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      description: "CRM DealCloud ou Affinity, outbound et automatisation pour les boutiques M&A et banques d'affaires.",
      serviceType: "Conseil CRM et automatisation pour acteurs M&A",
      url: `${SITE_URL}/secteurs/m-a-banques-affaires`,
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
        { '@type': 'ListItem', position: 2, name: 'Secteurs', item: `${SITE_URL}/secteurs` },
        { '@type': 'ListItem', position: 3, name: "M&A et banques d'affaires", item: `${SITE_URL}/secteurs/m-a-banques-affaires` },
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
      <SchemaOrg url={`${SITE_URL}/secteurs/m-a-banques-affaires`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>M&amp;A et banques d&apos;affaires</span>
      </nav>

      <section className="page-hero">
        <div className="label">Secteur</div>
        <h1>M&amp;A et banques<br /><em>d&apos;affaires</em></h1>
        <p>
          Boutiques M&amp;A, banques d&apos;affaires, conseil en transactions : des mandats complexes,
          des données confidentielles, des dizaines de contacts à gérer simultanément. Nous structurons
          votre CRM, votre sourcing acquéreurs et vos process documentaires.
        </p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
            Parler IA &amp; opérationnel
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Vos enjeux</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ces problèmes vous parlent ?</h2>
          <div className="problems-grid">
            {ENJEUX.map((e, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Notre approche pour les acteurs M&amp;A</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            {CE_QUE_NOUS_FAISONS.map((c, i) => (
              <div key={i} className={`why-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="why-card-diamond">◆</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label reveal">Nos outils</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les outils que nous déployons</h2>
          <div className="offers-grid" style={{ marginTop: 40 }}>
            {OUTILS.map((o, i) => {
              const inner = (
                <>
                  <div className="offer-card-line" />
                  <div className="offer-icon icon-sky" style={{ fontSize: 20 }}>{o.icon}</div>
                  <div className="offer-card-sub">{o.name}</div>
                  <p>{o.desc}</p>
                  {o.link && <div className="card-link" style={{ marginTop: 16, color: 'var(--sky)' }}>En savoir plus {SVG_ARROW}</div>}
                </>
              )
              return o.link
                ? <Link key={i} href={o.link} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>{inner}</Link>
                : <div key={i} className={`offer-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur nos interventions M&amp;A</h2>
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
          <h2 className="reveal">Structurons votre suivi mandats<br /><em>et votre sourcing acquéreurs.</em></h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial {SVG_ARROW}
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              Parler IA &amp; opérationnel
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
