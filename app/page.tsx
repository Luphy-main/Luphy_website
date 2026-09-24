import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import HeroAnimation from '@/components/HeroAnimation'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Luphy — Agence de performance digitale pour la finance',
  description:
    "Luphy conseille et implémente des solutions CRM, d'automatisation et d'IA pour les acteurs de la finance (fonds d'investissement, M&A, sociétés de gestion, conseil), en partant d'un diagnostic ROI.",
  openGraph: {
    title: 'Luphy — Agence de performance digitale pour la finance',
    description:
      "Du conseil à l'implémentation : CRM, automatisation et IA pour les fonds d'investissement, M&A et cabinets de conseil.",
    url: SITE_URL,
  },
}

const CLIENT_LOGOS = [
  { src: '/brand-assets/client-logos/dafinity-logo.png', alt: 'Dafinity' },
  { src: '/brand-assets/client-logos/ACM-logo.png', alt: 'ACM' },
  { src: '/brand-assets/client-logos/Allyum-logo.jpg', alt: 'Allyum' },
  { src: '/brand-assets/client-logos/Dotmarket-logo.png', alt: 'Dotmarket' },
  { src: '/brand-assets/client-logos/Fundora-logo.jpeg', alt: 'Fundora' },
  { src: '/brand-assets/client-logos/Logo-Jasmin-Capital-base-1.png', alt: 'Jasmin Capital' },
  { src: '/brand-assets/client-logos/IPEM_Logo_orange.webp', alt: 'IPEM' },
  { src: '/brand-assets/client-logos/committed-capital.webp', alt: 'Committed Capital' },
  { src: '/brand-assets/client-logos/Hoppi-logo.png', alt: 'Hoppi' },
]

export default function HomePage() {
  return (
    <>
      <SchemaOrg url={SITE_URL} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <HeroAnimation />
        <div className="hero-content">
          <h1 className="hero-h1 a1">
            Automatisez ce qui vous ralentit.
            <em>Concentrez-vous sur ce qui vous différencie.</em>
          </h1>
          <p className="hero-sub a2">
            Du conseil à l&apos;implémentation, Luphy accompagne les acteurs de la finance dans l&apos;amélioration
            de leur performance commerciale et opérationnelle — CRM, automatisation et IA.
          </p>
          <div className="hero-ctas a3">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
              Parler IA &amp; opérationnel
            </a>
          </div>
          <div className="hero-pills a4">
            <Link href="/performance-commerciale/crm" className="hero-pill">
              <span className="pdot" style={{ background: 'var(--sky)' }} />
              Consulting CRM
            </Link>
            <Link href="/performance-operationnelle/ia" className="hero-pill">
              <span className="pdot" style={{ background: 'var(--gold)' }} />
              IA &amp; Automatisation
            </Link>
            <Link href="/performance-commerciale/outbound" className="hero-pill">
              <span className="pdot" style={{ background: 'var(--sky)' }} />
              Outbound
            </Link>
            <Link href="/formation" className="hero-pill">
              <span className="pdot" style={{ background: 'rgba(74,191,130,0.9)' }} />
              Formation
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOGOS MARQUEE ── */}
      <section className="logos-sec">
        <p className="logos-heading">Ils nous font confiance</p>
        <div className="logos-track-wrap">
          <div className="logos-track">
            {/* Double pour l'effet marquee continu */}
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div className="logo-item" key={i}>
                <Image src={logo.src} alt={logo.alt} width={120} height={40} style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFRES ── */}
      <section className="section" style={{ background: 'var(--deep)' }}>
        <div className="container">
          <div className="offers-intro reveal">
            <div className="label">Ce que nous faisons</div>
            <div className="divider" />
            <h2 className="sec-title">Deux pôles.<br /><span style={{ color: 'var(--sky)' }}>Une méthode ROI.</span></h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>
              Luphy est une agence de performance digitale spécialisée dans la finance. Nous intervenons du diagnostic
              à l&apos;implémentation et à la formation, toujours en partant d&apos;un chiffrage ROI.
            </p>
          </div>
          <div className="offers-grid">
            <Link href="/performance-commerciale" className="offer-card reveal">
              <div className="offer-card-line" />
              <div className="offer-icon icon-sky">🏆</div>
              <div className="offer-card-sub">Pôle 1</div>
              <h3>Performance commerciale</h3>
              <p>
                Ciblage, prospection, CRM, nurturing, suivi des opportunités, capitalisation du réseau, pilotage.
                Nous déployons Affinity, DealCloud, HubSpot, Pipedrive, Notion et des CRM sur mesure.
              </p>
              <div className="card-link">
                Découvrir
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <Link href="/performance-operationnelle" className="offer-card gold-card reveal d1">
              <div className="offer-card-line" />
              <div className="offer-icon icon-gold">⚡</div>
              <div className="offer-card-sub">Pôle 2</div>
              <h3>Performance opérationnelle</h3>
              <p>
                Productivité, automatisation, IA, traitement documentaire, reporting, gestion de la connaissance.
                Des workflows intelligents construits sur vos processus réels.
              </p>
              <div className="card-link">
                Découvrir
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <Link href="/formation" className="offer-card sky-card reveal d2">
              <div className="offer-card-line" />
              <div className="offer-icon icon-green">📚</div>
              <div className="offer-card-sub">Axe transverse</div>
              <h3>Formation &amp; adoption</h3>
              <p>
                Un outil non adopté ne crée aucun ROI. Nous formons vos équipes sur vos données et vos process réels :
                acculturation IA, parcours Claude, adoption CRM, coaching dirigeant.
              </p>
              <div className="card-link" style={{ color: 'var(--sky)' }}>
                Découvrir
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY LUPHY ── */}
      <section className="why-sec">
        <div className="container">
          <div className="why-intro reveal">
            <div className="label" style={{ marginBottom: 12 }}>Pourquoi Luphy</div>
            <div className="divider" style={{ margin: '0 auto 20px' }} />
            <h2 className="sec-title">
              Nous ne découvrons pas votre secteur.<br />Nous y travaillons depuis le premier jour.
            </h2>
          </div>
          <p className="why-body reveal">
            Les secteurs avec lesquels nous travaillons ont leurs codes, leurs exigences, leurs sensibilités.
            Un agent IA qui fonctionne pour une scale-up SaaS ne fonctionnera pas pour un cabinet M&A.
            Nous l&apos;avons appris, et c&apos;est ce qui fait la différence.
          </p>

          {/* Stat validée */}
          <div className="why-stat-single reveal">
            <div className="why-stat-n">+30</div>
            <div className="why-stat-l">clients accompagnés dans la finance, le conseil et les services pro</div>
          </div>

          {/* Preuve Allyum */}
          <div className="why-proof reveal">
            <strong>Allyum (fonds d&apos;investissement) :</strong> environ +25 % de temps disponible pour la prospection
            et ×2 sur le nombre de mandats suivis après un an, sans recrutement supplémentaire.
          </div>

          <div className="why-cards">
            <div className="why-card reveal">
              <div className="why-card-diamond">◆</div>
              <h4>Spécialisation finance</h4>
              <p>Fonds VC/PE, M&A, sociétés de gestion, cabinets de conseil — nous connaissons vos enjeux, vos outils et vos contraintes de confidentialité.</p>
            </div>
            <div className="why-card reveal d1">
              <div className="why-card-diamond">◆</div>
              <h4>Du diagnostic à l&apos;implémentation</h4>
              <p>Nous chiffrons la valeur financière de chaque chantier avant de déployer. Aucun projet sans ROI identifié.</p>
            </div>
            <div className="why-card reveal d2">
              <div className="why-card-diamond">◆</div>
              <h4>Cas d&apos;usage éprouvés</h4>
              <p>Nos solutions s&apos;appuient sur des déploiements déjà réalisés chez des acteurs similaires, ce qui réduit les risques et accélère la mise en œuvre.</p>
            </div>
            <div className="why-card reveal d3">
              <div className="why-card-diamond">◆</div>
              <h4>Formation incluse</h4>
              <p>Un déploiement sans adoption ne crée aucune valeur. Nous formons vos équipes sur vos données et vos process réels, jusqu&apos;à l&apos;usage quotidien.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Parlons-en</div>
          <h2 className="reveal">
            Identifions ensemble<br />
            <em>vos chantiers prioritaires.</em>
          </h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min pour cadrer vos enjeux. Devis personnalisé sous 72 h.
          </p>
          <div className="cta-btns reveal">
            <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
              Parler CRM &amp; commercial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Parler IA &amp; opérationnel
            </a>
          </div>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
