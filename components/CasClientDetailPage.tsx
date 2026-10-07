import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ClientEffects from '@/components/ClientEffects'
import SchemaOrg from '@/components/SchemaOrg'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENT_BY_SLUG } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type Kpi     = { _key?: string; valeur: string; unite?: string; libelle: string; source?: string }
type Enjeu   = { _key?: string; titre: string; texte: string }
type Etape   = { _key?: string; titre: string; texte: string; livrable?: string }
type FaqItem = { _key?: string; question: string; reponse: string }

type CasClient = {
  _id: string; client: string; slug: string
  secteur?: string; pole?: string; outils?: string[]
  titre: string; titreAccent?: string; enBref?: string; chapeau?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageCouverture?: any
  taille?: string; duree?: string; periode?: string; perimetre?: string
  kpis?: Kpi[]
  verbatim?: string; verbatimAuteur?: string; verbatimFonction?: string
  enjeux?: Enjeu[]
  etapes?: Etape[]
  resultatsTexte?: string
  faq?: FaqItem[]
  auteur?: string; datePublication?: string; dateMiseAJour?: string
  metaDescription?: string
}

function initiales(nom: string): string {
  return nom.split(' ').filter(Boolean).map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function splitTitre(titre: string, titreAccent?: string): { blanc: string; accent: string } | null {
  if (titreAccent) {
    const idx = titre.indexOf(titreAccent)
    if (idx >= 0) {
      const blanc = titre.slice(0, idx).trimEnd()
      return { blanc, accent: titreAccent }
    }
    return { blanc: titre, accent: titreAccent }
  }
  const colonIdx = titre.indexOf(' : ')
  if (colonIdx > 0) return { blanc: titre.slice(0, colonIdx + 2), accent: titre.slice(colonIdx + 3) }
  return null
}

const SVG_ARROW = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export async function fetchCasClient(slug: string): Promise<CasClient | null> {
  return client.fetch(CAS_CLIENT_BY_SLUG, { slug })
}

export default async function CasClientDetailPage({ slug }: { slug: string }) {
  const data = await fetchCasClient(slug)
  if (!data) notFound()

  const logoUrl = data.logo ? urlFor(data.logo).height(80).fit('max').url() : null
  const coverUrl = data.imageCouverture ? urlFor(data.imageCouverture).width(1080).fit('max').url() : null
  const coverAlt: string = data.imageCouverture?.alt ?? `Image de couverture ${data.client}`
  const coverLegende: string | undefined = data.imageCouverture?.legende

  const ctaHref = data.pole === 'operationnel' ? CTA_OPERATIONNEL : CTA_COMMERCIAL
  const ctaLabel = data.pole === 'operationnel' ? 'IA & opérationnel' : 'CRM & commercial'
  const offreHref = data.pole === 'operationnel' ? '/ia-automation' : '/crm'
  const offreLabel = data.pole === 'operationnel' ? 'Performance IA & automatisation' : 'Performance commerciale : CRM'

  const enBref = data.enBref || data.chapeau || ''
  const titreParts = splitTitre(data.titre, data.titreAccent)

  const faqSchema = data.faq && data.faq.length > 0
    ? {
        '@type': 'FAQPage',
        mainEntity: data.faq.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.reponse },
        })),
      }
    : null

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.titre,
        description: enBref.slice(0, 155),
        url: `${SITE_URL}/cas-clients/${slug}`,
        ...(data.datePublication && { datePublished: data.datePublication }),
        ...(data.dateMiseAJour && { dateModified: data.dateMiseAJour }),
        author: { '@type': 'Person', name: data.auteur || 'Luphy' },
        publisher: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
      },
      ...(faqSchema ? [faqSchema] : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Cas clients', item: `${SITE_URL}/cas-clients` },
          { '@type': 'ListItem', position: 3, name: data.client, item: `${SITE_URL}/cas-clients/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/cas-clients/${slug}`} />

      {/* ── Fil d'Ariane ── */}
      <nav className="cc-crumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/cas-clients">Cas clients</Link><span>/</span>
        <span aria-current="page">{data.client}</span>
      </nav>

      {/* ── Hero v2 : logo + H1 + chapeau + méta ── */}
      <header className="cc-hero-v2">
        {logoUrl && (
          <div className="cc-logo-tile">
            <Image
              src={logoUrl}
              alt={`Logo ${data.client}`}
              width={160}
              height={56}
              style={{ objectFit: 'contain', maxHeight: 56, width: 'auto' }}
            />
          </div>
        )}

        <h1 className="cc-h1">
          {titreParts ? (
            <>{titreParts.blanc} <span className="cc-accent">{titreParts.accent}</span></>
          ) : data.titre}
        </h1>

        {enBref && <p className="cc-chapeau">{enBref}</p>}

        <div className="cc-chips-row">
          {data.secteur && <span className="cc-chip accent">{data.secteur}</span>}
          {data.pole && (
            <span className="cc-chip">
              {data.pole === 'operationnel' ? 'Performance opérationnelle' : 'Performance commerciale'}
            </span>
          )}
        </div>

        {/* Bandeau méta horizontal */}
        <dl className="cc-meta-band">
          {data.secteur && <div><dt>Secteur</dt><dd>{data.secteur}</dd></div>}
          {data.taille && <div><dt>Taille</dt><dd>{data.taille}</dd></div>}
          {data.duree && <div><dt>Durée</dt><dd>{data.duree}</dd></div>}
          {data.periode && <div><dt>Période</dt><dd>{data.periode}</dd></div>}
          {data.perimetre && <div><dt>Périmètre</dt><dd>{data.perimetre}</dd></div>}
          {data.outils && data.outils.length > 0 && (
            <div style={{ flexBasis: '100%' }}>
              <dt style={{ marginBottom: 6 }}>Outils</dt>
              <dd>
                <div className="cc-chips-row">
                  {data.outils.map(o => <span key={o} className="cc-tool-chip">{o}</span>)}
                </div>
              </dd>
            </div>
          )}
          {data.auteur && <div><dt>Par</dt><dd>{data.auteur}</dd></div>}
          {data.datePublication && <div><dt>Publié le</dt><dd>{fmtDate(data.datePublication)}</dd></div>}
          {data.dateMiseAJour && <div><dt>Mis à jour le</dt><dd>{fmtDate(data.dateMiseAJour)}</dd></div>}
        </dl>

        <a href={ctaHref} target="_blank" rel="noopener" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
          Parler {ctaLabel} {SVG_ARROW}
        </a>
      </header>

      {/* ── KPIs sans boîte ── */}
      {data.kpis && data.kpis.length > 0 && (
        <section className="cc-results" aria-label="Résultats clés">
          <div className="cc-results-wrap">
            <span className="cc-eyebrow">Résultats</span>
            <div className="cc-results-grid">
              {data.kpis.map((k, i) => (
                <div key={k._key ?? i} className="cc-stat">
                  <div className="cc-stat-n">
                    {k.valeur}{k.unite && <small>{k.unite}</small>}
                  </div>
                  <p>{k.libelle}</p>
                  {k.source && !k.source.trim().startsWith('[') && (
                    <span className="cc-stat-src">{k.source}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Image de couverture ── */}
      {coverUrl && (
        <div className="container">
          <figure className="cc-cover">
            <Image
              src={coverUrl}
              alt={coverAlt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 1080px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {coverLegende && <figcaption>{coverLegende}</figcaption>}
          </figure>
        </div>
      )}

      {/* ── Verbatim ── */}
      {data.verbatim && (
        <section className="cc-quote">
          <figure className="cc-quote-fig">
            <blockquote>{data.verbatim}</blockquote>
            {data.verbatimAuteur && (
              <figcaption className="cc-who">
                <span className="cc-avatar" aria-hidden="true">{initiales(data.verbatimAuteur)}</span>
                <span>
                  <b>{data.verbatimAuteur}</b>
                  <span>{data.verbatimFonction}{data.verbatimFonction ? ', ' : ''}{data.client}</span>
                </span>
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {/* ── Enjeux ── */}
      {data.enjeux && data.enjeux.length > 0 && (
        <section className="cc-section">
          <div className="cc-section-inner">
            <div className="cc-section-head">
              <span className="cc-eyebrow">Contexte</span>
              <h2>Quel était le problème de <span className="cc-accent">{data.client} ?</span></h2>
              <p className="cc-section-lead">
                {data.chapeau || `Les enjeux qui ont conduit ${data.client} à faire appel à Luphy.`}
              </p>
            </div>
            <div className="cc-issues">
              {data.enjeux.map((e, i) => (
                <div key={e._key ?? i} className="cc-issue">
                  <h3>{e.titre}</h3>
                  <p>{e.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Étapes ── */}
      {data.etapes && data.etapes.length > 0 && (
        <section className="cc-section" style={{ background: 'var(--surface)' }}>
          <div className="cc-section-inner">
            <div className="cc-section-head">
              <span className="cc-eyebrow">Solution</span>
              <h2>Qu&apos;a mis en place <span className="cc-accent">Luphy ?</span></h2>
            </div>
            <ol className="cc-steps">
              {data.etapes.map((e, i) => (
                <li key={e._key ?? i} className="cc-step">
                  <span className="cc-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{e.titre}</h3>
                    <p>{e.texte}</p>
                    {e.livrable && <span className="cc-livrable">Livrable : {e.livrable}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Résultats en texte ── */}
      {data.resultatsTexte && (
        <section className="cc-section">
          <div className="cc-section-inner">
            <div className="cc-section-head">
              <span className="cc-eyebrow">Résultats</span>
              <h2>Quels résultats pour <span className="cc-accent">{data.client} ?</span></h2>
            </div>
            <p className="cc-recap">{data.resultatsTexte}</p>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {data.faq && data.faq.length > 0 && (
        <section className="cc-section" style={{ background: 'var(--surface)' }}>
          <div className="cc-section-inner">
            <div className="cc-section-head">
              <span className="cc-eyebrow">FAQ</span>
              <h2>Questions fréquentes</h2>
            </div>
            <div className="cc-faq">
              {data.faq.map((f, i) => (
                <details key={f._key ?? i} {...(i === 0 ? { open: true } : {})}>
                  <summary>{f.question}</summary>
                  <p>{f.reponse}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pour aller plus loin ── */}
      <section className="cc-section">
        <div className="cc-section-inner">
          <div className="cc-section-head">
            <span className="cc-eyebrow">Pour aller plus loin</span>
          </div>
          <div className="cc-related">
            <a className="cc-rel" href={offreHref}>
              <span className="cc-rel-cat">Offre</span>
              <b>{offreLabel}</b>
            </a>
            <a className="cc-rel" href="/cas-clients">
              <span className="cc-rel-cat">Études de cas</span>
              <b>Toutes nos références clients</b>
            </a>
            <a className="cc-rel" href="/#methode">
              <span className="cc-rel-cat">Méthode</span>
              <b>Le Diagnostic Performance</b>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <span className="cc-eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>Votre projet</span>
          <h2 className="reveal">Ce cas vous parle ?<br /><em>Parlons de votre situation.</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              CRM &amp; commercial {SVG_ARROW}
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              IA &amp; opérationnel
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
