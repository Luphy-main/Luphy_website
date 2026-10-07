import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

const HUBSPOT_PARTNER_URL = 'https://ecosystem.hubspot.com/fr/marketplace/solutions/luphy'

export const metadata: Metadata = {
  title: 'L\'équipe | Luphy',
  description:
    "Titouan Galpin et Tristan Camilli, co-fondateurs de Luphy. Spécialistes CRM, IA et performance commerciale pour les acteurs de la finance.",
  openGraph: {
    title: "L'équipe | Luphy",
    description: "Rencontrez les co-fondateurs de Luphy, spécialistes CRM et IA pour la finance.",
    url: `${SITE_URL}/equipe`,
  },
}

const TEAM = [
  {
    prenom: 'Titouan',
    nom: 'Galpin',
    role: 'Co-fondateur, Pôle performance commerciale',
    bio: [
      "Titouan accompagne les acteurs de la finance sur leur performance commerciale : déploiement CRM, structuration du pipeline, prospection outbound. Il intervient principalement sur Affinity, DealCloud et HubSpot.",
      "Avant Luphy, il a acquis une expérience dans le conseil et le développement commercial auprès d'acteurs financiers. Il connaît les contraintes de suivi de dealflow, de gestion des relations LPs et de sourcing M&A.",
    ],
    domaines: ['CRM Affinity, DealCloud, HubSpot, Pipedrive', 'Prospection outbound', 'Pipeline et performance commerciale', 'Formation équipes commerciales'],
    cta: CTA_COMMERCIAL,
    ctaLabel: 'Échanger avec Titouan',
    photo: '/brand-assets/team/titouan-galpin-2026.jpg',
    photoAlt: 'Titouan Galpin, co-fondateur de Luphy',
    badge: { label: 'HubSpot Solutions Partner', href: HUBSPOT_PARTNER_URL },
  },
  {
    prenom: 'Tristan',
    nom: 'Camilli',
    role: 'Co-fondateur, Pôle performance opérationnelle & IA',
    bio: [
      "Tristan accompagne les acteurs de la finance sur l'automatisation, l'IA et la formation. Il déploie des workflows n8n, des agents Claude et des programmes d'acculturation IA pour les organisations qui souhaitent gagner en productivité sans recruter.",
      "Avant Luphy, il a développé une expertise en transformation digitale et en IA appliquée. Il connaît les enjeux de confidentialité des données et les niveaux de criticité spécifiques aux métiers financiers.",
    ],
    domaines: ['Automatisation (n8n, Make)', 'IA et agents Claude', 'Acculturation IA dirigeants et équipes', 'Coaching IA individuel'],
    cta: CTA_OPERATIONNEL,
    ctaLabel: 'Échanger avec Tristan',
    photo: '/brand-assets/team/tristan-camilli.png',
    photoAlt: 'Tristan Camilli, co-fondateur de Luphy',
    badge: null,
  },
]

const VALEURS = [
  { title: 'Spécialisation finance', desc: 'Nous travaillons exclusivement avec des acteurs de la finance. Nos recommandations sont adaptées à vos contraintes métier, pas copiées depuis un autre secteur.' },
  { title: 'Des praticiens, pas des théoriciens', desc: 'Nous déployons ces outils chez des clients toute l\'année. Nous partageons ce qui fonctionne sur le terrain, pas des benchmarks ou des présentations PowerPoint.' },
  { title: 'Transparence sur les limites', desc: 'Nous disons clairement ce que nous ne faisons pas : pas de développement logiciel lourd, pas de data science avancée, pas de projets à 6 mois sans livrable intermédiaire.' },
  { title: 'ROI mesurable', desc: 'Chaque projet commence par un diagnostic avec des indicateurs clairs. Nous mesurons l\'impact et nous en rendons compte.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: "L'équipe Luphy",
      url: `${SITE_URL}/equipe`,
      description: "Titouan Galpin et Tristan Camilli, co-fondateurs de Luphy.",
    },
    {
      '@type': 'Person',
      name: 'Titouan Galpin',
      jobTitle: 'Co-fondateur, Pôle performance commerciale',
      worksFor: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      url: `${SITE_URL}/equipe`,
    },
    {
      '@type': 'Person',
      name: 'Tristan Camilli',
      jobTitle: 'Co-fondateur, Pôle performance opérationnelle & IA',
      worksFor: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      url: `${SITE_URL}/equipe`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: "L'équipe", item: `${SITE_URL}/equipe` },
      ],
    },
  ],
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: '100%', maxWidth: 320, borderRadius: 12, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        priority
      />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/equipe`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>L&apos;équipe</span>
      </nav>

      <section className="page-hero">
        <div className="label">L&apos;équipe</div>
        <h1>Deux spécialistes,<br /><em>un seul secteur.</em></h1>
        <p>
          Luphy est fondée par Titouan Galpin et Tristan Camilli. Nous travaillons exclusivement
          avec des acteurs de la finance : fonds, sociétés de gestion, boutiques M&amp;A, cabinets de conseil.
          Pas de conseil généraliste. Pas de projets à l&apos;aveugle.
        </p>
      </section>

      {/* Fiches membres */}
      {TEAM.map((m, i) => (
        <section key={i} className="section" style={i % 2 === 1 ? { background: 'var(--dark)', paddingTop: 80, paddingBottom: 80 } : { paddingTop: 80, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'start' }}
              className={`reveal team-grid${i % 2 === 1 ? ' team-grid-reverse' : ''}`}>
              <div><TeamPhoto src={m.photo} alt={m.photoAlt} /></div>
              <div>
                <div className="label" style={{ marginBottom: 8 }}>{m.role}</div>
                <h2 style={{ margin: '0 0 12px', fontSize: 36 }}>{m.prenom} <strong>{m.nom}</strong></h2>
                {m.badge && (
                  <a href={m.badge.href} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 10px', textDecoration: 'none', marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {m.badge.label}
                  </a>
                )}
                {!m.badge && <div style={{ marginBottom: 20 }} />}
                {m.bio.map((para, j) => (
                  <p key={j} style={{ marginBottom: 16, fontSize: 16, lineHeight: 1.7 }}>{para}</p>
                ))}
                <div style={{ marginTop: 28, marginBottom: 28 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Domaines</p>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {m.domaines.map((d, k) => (
                      <li key={k} style={{ background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 6, padding: '5px 12px', fontSize: 13, color: 'var(--sky)' }}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={m.cta} target="_blank" rel="noopener" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {m.ctaLabel} {SVG_ARROW}
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Valeurs */}
      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Notre approche</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ce qui nous distingue</h2>
          <div className="why-cards" style={{ marginTop: 40 }}>
            {VALEURS.map((v, i) => (
              <div key={i} className={`why-card reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="why-card-diamond">◆</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Parlons-nous</div>
          <h2 className="reveal">Un premier échange<br /><em>sans engagement.</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur selon votre sujet.
            Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              CRM &amp; commercial (Titouan) {SVG_ARROW}
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              IA &amp; opérationnel (Tristan)
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
