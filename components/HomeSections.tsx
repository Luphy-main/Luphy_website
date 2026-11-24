import Link from 'next/link'
import Image from 'next/image'
import { DEFINITION_LUPHY, PARTNER_LINKS } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENTS_RESULTATS } from '@/sanity/lib/queries'
import { getEquipe, photoMembre } from '@/sanity/lib/equipe'

// Sections de l'accueil : Résultats, Équipe, Partenaires et presse, FAQ

const SVG_ARROW = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── RÉSULTATS ── */

// Cas clients mis en avant, dans l'ordre d'affichage. Le chiffre affiché est le premier KPI du cas dans Sanity.
const RESULTATS = [
  { slug: 'ipem-lead-scoring-hubspot', logo: '/brand-assets/client-logos/white/IPEM_Logo_orange-white.png' },
  { slug: 'allyum', logo: '/brand-assets/client-logos/white/Allyum-logo-white.png' },
  { slug: 'fundora', logo: '/brand-assets/client-logos/white/Fundora-logo-white.png' },
]

type Kpi = { valeur?: string; unite?: string; libelle?: string }
type CasResultat = { client: string; slug: string; titre: string; kpi?: Kpi | null }

export async function HomeResultats() {
  let cas: CasResultat[] = []
  try {
    cas = (await client.fetch<CasResultat[]>(CAS_CLIENTS_RESULTATS, { slugs: RESULTATS.map(r => r.slug) })) ?? []
  } catch {
    cas = []
  }
  const cartes = RESULTATS.flatMap(r => {
    const c = cas.find(x => x.slug === r.slug)
    return c ? [{ ...c, logo: r.logo }] : []
  })
  if (cartes.length === 0) return null

  return (
    <section className="section" style={{ background: 'var(--dark)' }} aria-labelledby="home-resultats-titre">
      <div className="container">
        <div className="offers-intro reveal">
          <div className="label">Résultats</div>
          <div className="divider" />
          <h2 className="sec-title" id="home-resultats-titre">Des résultats mesurés chez nos clients</h2>
        </div>
        <div className="home-res-grid">
          {cartes.map((c, i) => {
            const kpi = c.kpi?.valeur?.trim() ? c.kpi : null
            return (
              <Link key={c.slug} href={`/cas-clients/${c.slug}`} className={`offer-card home-res-card reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="offer-card-line" />
                <Image src={c.logo} alt={c.client} width={120} height={32} className="home-res-logo" />
                {kpi && (
                  <div className="home-res-kpi">
                    <div className="home-res-val">
                      {kpi.valeur!.trim()}
                      {kpi.unite?.trim() && <small>{' '}{kpi.unite.trim()}</small>}
                    </div>
                    {kpi.libelle && <p className="home-res-lbl">{kpi.libelle.trim()}</p>}
                  </div>
                )}
                <h3>{c.titre}</h3>
                <div className="card-link">Lire le cas client {SVG_ARROW}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── ÉQUIPE ── */

export async function HomeEquipe() {
  const fondateurs = (await getEquipe()).filter(m => m.fondateur)
  if (fondateurs.length === 0) return null

  return (
    <section className="section" style={{ background: 'var(--deep)' }} aria-labelledby="home-equipe-titre">
      <div className="container">
        <div className="offers-intro reveal">
          <div className="label">L&apos;équipe</div>
          <div className="divider" />
          <h2 className="sec-title" id="home-equipe-titre">Les fondateurs de Luphy</h2>
        </div>
        <div className="home-team-grid">
          {fondateurs.map((m, i) => {
            const photo = photoMembre(m)
            const role = m.titreOfficiel ?? m.fonction
            return (
              <Link key={m._id} href="/equipe" className={`home-team-card reveal${i > 0 ? ` d${i}` : ''}`}>
                {photo && (
                  <div className="home-team-photo">
                    <Image src={photo.src} alt={photo.alt} fill sizes="96px" style={{ objectFit: 'cover', objectPosition: photo.objectPosition }} />
                  </div>
                )}
                <div>
                  <h3>{m.nom}</h3>
                  {role && <p>{role}</p>}
                  <span className="card-link">Voir l&apos;équipe {SVG_ARROW}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── PARTENAIRES ET PRESSE ── */

const PARTENAIRES = [
  { nom: 'HubSpot', detail: 'Partenaire Solutions, listé sur la marketplace HubSpot', url: PARTNER_LINKS.hubspot },
  { nom: 'Capsens', url: PARTNER_LINKS.capsens },
  { nom: 'FindFi', url: PARTNER_LINKS.findfi },
]

export function HomePartenaires() {
  return (
    <section className="section" style={{ background: 'var(--dark)' }} aria-labelledby="home-partenaires-titre">
      <div className="container">
        <div className="offers-intro reveal">
          <div className="label">Partenaires et presse</div>
          <div className="divider" />
          <h2 className="sec-title" id="home-partenaires-titre">Notre écosystème</h2>
        </div>
        <ul className="home-partners">
          {PARTENAIRES.map(p => {
            const contenu = (
              <>
                <strong>{p.nom}</strong>
                {p.detail && <span>{p.detail}</span>}
              </>
            )
            return (
              <li key={p.nom} className="reveal">
                {p.url && p.url !== '#' ? (
                  <a href={p.url} target="_blank" rel="noopener" className="home-partner home-partner-link">{contenu}</a>
                ) : (
                  <div className="home-partner">{contenu}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ── FAQ ── */

const FAQ_ACCUEIL = [
  { q: 'Que fait Luphy ?', a: DEFINITION_LUPHY },
  {
    q: 'Pour quels acteurs de la finance travaillez-vous ?',
    a: "Nous travaillons avec les fonds d'investissement, les boutiques M&A et de conseil en dette, les sociétés de gestion, les CGP et family offices, et les fintechs.",
  },
  {
    q: 'Quels CRM intégrez-vous ?',
    a: "Principalement HubSpot : Luphy est partenaire HubSpot, listé sur la marketplace HubSpot. Nous travaillons aussi avec les outils déjà en place chez le client.",
  },
  {
    q: 'Comment se déroule un projet ?',
    a: "Chaque projet commence par un diagnostic qui chiffre le ROI. Vous recevez un devis sous une semaine, puis nous déployons par étapes, avec la formation de vos équipes à l'usage des outils.",
  },
  {
    q: 'Comment vos agents IA protègent-ils nos données ?',
    a: "Vos données restent dans vos outils, les accès sont limités au strict besoin, et nos prestations sont encadrées par un accord de confidentialité.",
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ACCUEIL.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function HomeFaq() {
  return (
    <section className="section" style={{ background: 'var(--deep)' }} aria-labelledby="home-faq-titre">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="offers-intro reveal" style={{ marginBottom: 40 }}>
          <div className="label">Questions fréquentes</div>
          <div className="divider" />
          <h2 className="sec-title" id="home-faq-titre">Vos questions sur Luphy</h2>
        </div>
        <div className="home-faq">
          {FAQ_ACCUEIL.map(f => (
            <details key={f.q} className="home-faq-item reveal">
              <summary>
                <h3>{f.q}</h3>
                <span className="home-faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="home-faq-more reveal">
          <Link href="/faq">Toutes les questions fréquentes</Link>
        </p>
      </div>
    </section>
  )
}
