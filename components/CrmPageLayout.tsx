import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, SITE_URL } from '@/lib/constants'

export interface CrmFaq { q: string; a: string }

export interface CrmData {
  slug: string
  name: string
  tagline: string
  description: string
  pourQui: string[]
  pasFor?: string
  setup: { title: string; desc: string }[]
  migrations: string[]
  integrations: string[]
  faq: CrmFaq[]
  schemaDesc: string
  partnerBadge?: { label: string; href: string }
}

const SVG_ARROW = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CrmPageLayout({ data }: { data: CrmData }) {
  const pageUrl = `${SITE_URL}/performance-commerciale/crm/${data.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Implémentation ${data.name}`,
        provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
        description: data.schemaDesc,
        serviceType: 'Consulting CRM',
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map(f => ({
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
          { '@type': 'ListItem', position: 4, name: data.name, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={pageUrl} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/performance-commerciale">Performance commerciale</Link><span>/</span>
        <Link href="/performance-commerciale/crm">CRM</Link><span>/</span>
        <span>{data.name}</span>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="label">Consulting CRM</div>
        <h1><em>{data.name}</em></h1>
        {data.partnerBadge && (
          <a href={data.partnerBadge.href} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, padding: '5px 12px', textDecoration: 'none', marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {data.partnerBadge.label}
          </a>
        )}
        <p>{data.description}</p>
        <div className="cta-btns">
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial {SVG_ARROW}
          </a>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      {/* Pour qui */}
      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Profil idéal</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Pour qui est fait {data.name} ?</h2>
          <div className="problems-grid" style={{ marginTop: 32 }}>
            {data.pourQui.map((item, i) => (
              <div key={i} className={`problem-item reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="problem-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          {data.pasFor && (
            <div className="why-proof reveal" style={{ marginTop: 24, maxWidth: '100%' }}>
              <strong>Pour qui ce n&apos;est pas fait :</strong> {data.pasFor}
            </div>
          )}
        </div>
      </section>

      {/* Ce que nous mettons en place */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="label reveal">Ce que nous faisons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Ce que nous mettons en place</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            {data.setup.map((s, i) => (
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

      {/* Migrations & Intégrations */}
      <section className="section">
        <div className="container">
          <div className="why-cards" style={{ maxWidth: 920 }}>
            <div className="why-card reveal">
              <div className="why-card-diamond">◆</div>
              <h4>Migrations possibles</h4>
              <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                {data.migrations.map((m, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="why-card reveal d1">
              <div className="why-card-diamond">◆</div>
              <h4>Intégrations courantes</h4>
              <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                {data.integrations.map((it, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 820, textAlign: 'center' }}>
          <h2 className="sec-title reveal" style={{ marginBottom: 16 }}>
            Chaque déploiement part d&apos;un diagnostic ROI
          </h2>
          <p className="sec-sub reveal" style={{ margin: '0 auto 28px' }}>
            Avant de déployer {data.name}, nous chiffrons le gain potentiel. Si le ROI n&apos;est pas là, nous le disons.
          </p>
          <Link href="/methode" className="btn-primary reveal" style={{ fontSize: 14, padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Voir le Diagnostic Performance ROI {SVG_ARROW}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur {data.name} avec Luphy</h2>
          <div className="faq-list">
            {data.faq.map((f, i) => (
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
            Déployons {data.name}<br />
            <em>dans votre organisation.</em>
          </h2>
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
