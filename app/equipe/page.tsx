import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL, OG_IMAGE } from '@/lib/constants'
import { getEquipe, decouperNom, photoMembre, ctaMembre, personJsonLd } from '@/sanity/lib/equipe'

export const revalidate = 3600

const HUBSPOT_PARTNER_URL = 'https://ecosystem.hubspot.com/fr/marketplace/solutions/luphy'

export const metadata: Metadata = {
  title: 'L\'équipe | Luphy',
  description:
    "Titouan Galpin et Tristan Camilli, co-fondateurs de Luphy. Spécialistes CRM, IA et performance commerciale pour les acteurs de la finance.",
  openGraph: {
    title: "L'équipe | Luphy",
    description: "Rencontrez les co-fondateurs de Luphy, spécialistes CRM et IA pour la finance.",
    url: `${SITE_URL}/equipe`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
}

const BIO_PARAGRAPHE = { marginBottom: 16, fontSize: 16, lineHeight: 1.7 }

const BIO_COMPONENTS: PortableTextComponents = {
  block: { normal: ({ children }) => <p style={BIO_PARAGRAPHE}>{children}</p> },
}

const VALEURS = [
  { title: 'Spécialisation finance', desc: 'Nous travaillons exclusivement avec des acteurs de la finance. Nos recommandations sont adaptées à vos contraintes métier, pas copiées depuis un autre secteur.' },
  { title: 'Des praticiens, pas des théoriciens', desc: 'Nous déployons ces outils chez des clients toute l\'année. Nous partageons ce qui fonctionne sur le terrain, pas des benchmarks ou des présentations PowerPoint.' },
  { title: 'Transparence sur les limites', desc: 'Nous disons clairement ce que nous ne faisons pas : pas de développement logiciel lourd, pas de data science avancée, pas de projets à 6 mois sans livrable intermédiaire.' },
  { title: 'ROI mesurable', desc: 'Chaque projet commence par un diagnostic avec des indicateurs clairs. Nous mesurons l\'impact et nous en rendons compte.' },
]


const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function TeamPhoto({ src, alt, objectPosition }: { src: string; alt: string; objectPosition: string }) {
  return (
    <div style={{ width: '100%', maxWidth: 320, borderRadius: 12, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        style={{ objectFit: 'cover', objectPosition }}
      />
    </div>
  )
}

export default async function Page() {
  const team = await getEquipe()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: "L'équipe Luphy",
        url: `${SITE_URL}/equipe`,
        description: "Titouan Galpin et Tristan Camilli, co-fondateurs de Luphy.",
      },
      ...team.map(m => personJsonLd(m, m.titreOfficiel ?? m.fonction, { url: `${SITE_URL}/equipe` })),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: "L'équipe", item: `${SITE_URL}/equipe` },
        ],
      },
    ],
  }

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

      {/* ── NOTRE HISTOIRE ── */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="label reveal">NOTRE HISTOIRE</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal" style={{ textAlign: 'left' }}>L&apos;équipe digitale des acteurs de la finance</h2>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
            Fondée au début de l&apos;ère de l&apos;IA, Luphy part d&apos;une conviction : les dirigeants de la finance n&apos;ont pas le temps de devenir experts du digital. C&apos;est notre rôle.
          </p>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
            Avant Luphy, Tristan et Titouan ont tous deux travaillé chez Caption, l&apos;un côté opérations, l&apos;autre côté relations investisseurs. Ils y ont vu de près ce qui ralentit les équipes d&apos;un fonds : des informations dispersées, des relances oubliées, des heures passées sur des tâches qui ne créent pas de valeur.
          </p>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
            Luphy est née pour y répondre. Nous sommes d&apos;abord des conseillers : nous partons de vos process et de vos enjeux business, nous chiffrons le gain, puis nous implémentons les outils (CRM, automatisation, IA) et formons les équipes pour qu&apos;ils soient réellement utilisés.
          </p>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 0 }}>
            Aujourd&apos;hui, Luphy accompagne plus de 30 clients dans la finance, les startups et le conseil, depuis Paris. Nous sommes entourés de consultants seniors et d&apos;experts partenaires (data &amp; finance, produit, design, SEO/GEO), incubés à la Blue Factory ESCP et{' '}
            <a href={HUBSPOT_PARTNER_URL} target="_blank" rel="noopener" style={{ color: 'var(--sky)', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid rgba(75,159,191,0.4)' }}>HubSpot Solutions Partner</a>.
          </p>
        </div>
      </section>

      {/* Fiches membres */}
      {team.map((m, i) => {
        const { prenom, nomFamille } = decouperNom(m.nom)
        const photo = photoMembre(m)
        const cta = ctaMembre(m)
        return (
          <section key={m._id} className="section" style={i % 2 === 0 ? { paddingTop: 80, paddingBottom: 80 } : { background: 'var(--dark)', paddingTop: 80, paddingBottom: 80 }}>
            <div className="container" style={{ maxWidth: 1040 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'start' }}
                className={`reveal team-grid${i % 2 === 1 ? ' team-grid-reverse' : ''}`}>
                <div>{photo && <TeamPhoto {...photo} />}</div>
                <div>
                  {m.fonction && <div className="label" style={{ marginBottom: 8 }}>{m.fonction}</div>}
                  <h2 style={{ margin: '0 0 24px', fontSize: 36 }}>{prenom} <strong>{nomFamille}</strong></h2>
                  {m.bioLongue?.length ? (
                    <PortableText value={m.bioLongue} components={BIO_COMPONENTS} />
                  ) : (
                    m.courteDescription?.split(/\n+/).map((para, j) => <p key={j} style={BIO_PARAGRAPHE}>{para}</p>)
                  )}
                  {m.domaines?.length ? (
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
                  ) : null}
                  {cta && (
                    <a href={cta} target="_blank" rel="noopener" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      Échanger avec {prenom} {SVG_ARROW}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}

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
                <h3>{v.title}</h3>
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
