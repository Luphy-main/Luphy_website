import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import MethodeCalculator from '@/components/MethodeCalculator'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Diagnostic Performance ROI | Luphy',
  description:
    'La méthode Luphy en 7 étapes : identifier, chiffrer et prioriser les chantiers CRM, automatisation et IA à plus fort ROI avant tout déploiement.',
  openGraph: {
    title: 'Diagnostic Performance ROI | Luphy',
    description: 'Identifier, chiffrer et prioriser les chantiers CRM, automatisation et IA à plus fort ROI.',
    url: `${SITE_URL}/methode`,
  },
}

const STEPS = [
  { n: '01', title: 'Comprendre les objectifs business', desc: 'Priorités de développement, contraintes, indicateurs de succès, horizon de temps.', highlight: false },
  { n: '02', title: 'Cartographier les processus actuels', desc: 'Identifier les flux de travail, les outils utilisés, les données disponibles et les points de friction.', highlight: false },
  { n: '03', title: 'Identifier irritants, pertes de temps et opportunités', desc: 'Entretiens individuels, observation des pratiques, analyse des données existantes.', highlight: false },
  { n: '04', title: 'Estimer la valeur financière de chaque chantier', desc: 'Temps actuel × coût horaire × volume × fréquence = coût de la situation actuelle. Gain potentiel estimé, coût du projet, ROI, payback. C\'est l\'étape qui différencie notre méthode.', highlight: true },
  { n: '05', title: 'Prioriser selon impact × complexité', desc: 'Quick wins, projets intermédiaires, projets structurants. Séquencement réaliste en fonction des ressources disponibles.', highlight: false },
  { n: '06', title: 'Déployer et former les équipes', desc: 'Implémentation technique et formation sur vos données et vos process réels. Un outil non adopté ne crée aucun ROI.', highlight: false },
  { n: '07', title: 'Mesurer et améliorer', desc: 'Indicateurs d\'usage, itérations, capitalisation des apprentissages, extension progressive.', highlight: false },
]

const DELIVERABLES = [
  { icon: '🗺️', title: 'Cartographie des processus', desc: 'Visualisation claire de vos flux actuels, identification des goulots et redondances.' },
  { icon: '📊', title: 'Liste des chantiers chiffrés', desc: 'Chaque chantier : coût actuel, gain potentiel, coût projet, ROI, payback.' },
  { icon: '🎯', title: 'Matrice de priorisation', desc: 'Quick wins, projets intermédiaires et structurants selon impact × complexité.' },
  { icon: '📅', title: 'Feuille de route séquencée', desc: 'Plan d\'action avec jalons, responsables et indicateurs de succès.' },
]

const FAQ = [
  {
    q: 'Comment se déroule le diagnostic concrètement ?',
    a: 'En trois temps : un premier échange de 30 min pour cadrer vos enjeux, une phase de collecte (entretiens, observation des pratiques, analyse des outils et données), et une restitution avec la feuille de route chiffrée.',
  },
  {
    q: 'Combien de temps dure le diagnostic ?',
    a: 'La durée est adaptée à la taille de votre organisation et à la complexité des processus à analyser. Elle est précisée dans le devis. [À COMPLÉTER]',
  },
  {
    q: 'Faut-il être déjà équipé d\'un CRM ou d\'outils IA ?',
    a: 'Non. Le diagnostic est justement conçu pour déterminer quels outils déployer, dans quel ordre et avec quel bénéfice attendu. Nous travaillons aussi bien avec des organisations qui partent de zéro qu\'avec celles qui optimisent un écosystème existant.',
  },
  {
    q: 'Que se passe-t-il après le diagnostic ?',
    a: 'Trois options : déployer avec Luphy (nous gérons l\'implémentation et la formation), déployer en interne (vous avez la feuille de route), ou faire appel à un autre prestataire. Le livrable est conçu pour être exploitable indépendamment de nous.',
  },
  {
    q: 'Combien coûte le diagnostic ?',
    a: 'Le tarif est adapté au périmètre de la mission. Votre devis personnalisé en moins d\'une semaine après un premier échange de 30 min.',
  },
]

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Diagnostic Performance ROI',
        provider: { '@type': 'Organization', name: 'Luphy', url: SITE_URL },
        description: 'Méthode en 7 étapes pour identifier, chiffrer et prioriser les chantiers CRM, automatisation et IA à plus fort ROI.',
        serviceType: 'Conseil en transformation digitale',
        url: `${SITE_URL}/methode`,
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
          { '@type': 'ListItem', position: 2, name: 'Diagnostic Performance ROI', item: `${SITE_URL}/methode` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SchemaOrg url={`${SITE_URL}/methode`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Diagnostic Performance ROI</span>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="label">La méthode</div>
        <h1>Le Diagnostic<br /><em>Performance ROI</em></h1>
        <p>
          Le Diagnostic Performance Luphy identifie, chiffre et priorise les chantiers CRM,
          automatisation et IA à plus fort ROI, avant tout déploiement. Chaque chantier est
          évalué en termes de coût actuel, gain potentiel, investissement requis et payback.
        </p>
        <div className="cta-btns">
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
      </section>

      {/* 7 étapes */}
      <section className="section">
        <div className="container">
          <div className="label reveal">La méthode</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les 7 étapes du diagnostic</h2>
          <p className="sec-sub reveal">Une approche structurée, de la compréhension des enjeux à la feuille de route séquencée.</p>
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`step-row reveal${i > 0 ? ` d${Math.min(i, 4)}` : ''}${s.highlight ? ' step-highlight' : ''}`}>
                <div className="step-num">{s.n}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculateur ROI */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Comment nous chiffrons</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Chaque chantier, traduit en euros</h2>
          <p className="sec-sub reveal">
            Temps actuel × coût horaire × volume = coût de la situation actuelle.
            Gain potentiel automatisable, coût du projet, ROI et délai de retour sur investissement.
          </p>
          <MethodeCalculator />
        </div>
      </section>

      {/* Matrice */}
      <section className="section">
        <div className="container">
          <div className="label reveal">Priorisation</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Matrice impact × complexité</h2>
          <p className="sec-sub reveal">Tous les chantiers ne se valent pas. Nous les classons pour séquencer les déploiements de manière réaliste.</p>
          <div className="matrix-grid">
            <div className="matrix-card mc-quick reveal">
              <div className="mc-label">Quick wins</div>
              <h3>Fort impact, faible complexité</h3>
              <p>À déployer en priorité. Résultats rapides qui financent les projets suivants et créent de l&apos;adhésion en interne.</p>
              <ul>
                <li>Automatisation de tâches répétitives</li>
                <li>Structuration du CRM existant</li>
                <li>Modèles et templates IA sur vos documents</li>
              </ul>
            </div>
            <div className="matrix-card mc-mid reveal d1">
              <div className="mc-label">Projets intermédiaires</div>
              <h3>Fort impact, complexité modérée</h3>
              <p>Déploiement après les quick wins. Nécessitent plus de préparation mais génèrent une valeur durable.</p>
              <ul>
                <li>Déploiement ou migration CRM</li>
                <li>Workflows multi-outils (n8n, Make)</li>
                <li>Formation et adoption des équipes</li>
              </ul>
            </div>
            <div className="matrix-card mc-struct reveal d2">
              <div className="mc-label">Projets structurants</div>
              <h3>Impact majeur, complexité élevée</h3>
              <p>Chantiers de transformation. Séquencés après avoir stabilisé les fondations et gagné l&apos;adhésion des équipes.</p>
              <ul>
                <li>CRM sur mesure</li>
                <li>Agents IA métier</li>
                <li>Refonte des processus de reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Livrables */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="label reveal">Ce que vous recevez</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Les livrables du diagnostic</h2>
          <p className="sec-sub reveal">Des documents actionnables, conçus pour être exploitables indépendamment de Luphy.</p>
          <div className="delivs-grid">
            {DELIVERABLES.map((d, i) => (
              <div key={i} className={`deliv-item reveal${i > 0 ? ` d${Math.min(i, 3)}` : ''}`}>
                <div className="deliv-icon">{d.icon}</div>
                <div className="deliv-text">
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Format</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Comment se déroule le diagnostic ?</h2>
          <div className="steps-list" style={{ marginTop: 32 }}>
            <div className="step-row reveal">
              <div className="step-num" style={{ fontSize: 18 }}>①</div>
              <div className="step-content">
                <h3>Premier échange (30 min, gratuit)</h3>
                <p>Cadrage de vos enjeux, confirmation de la pertinence du diagnostic, présentation de notre approche.</p>
              </div>
            </div>
            <div className="step-row reveal d1">
              <div className="step-num" style={{ fontSize: 18 }}>②</div>
              <div className="step-content">
                <h3>Phase de collecte</h3>
                <p>Entretiens individuels avec vos collaborateurs clés, observation des pratiques, analyse des outils et données. Durée : [À COMPLÉTER].</p>
              </div>
            </div>
            <div className="step-row reveal d2">
              <div className="step-num" style={{ fontSize: 18 }}>③</div>
              <div className="step-content">
                <h3>Restitution</h3>
                <p>Présentation de la feuille de route chiffrée devant vos décideurs. Échanges, arbitrages, questions. Jalons : [À CONFIRMER].</p>
              </div>
            </div>
          </div>
          <div className="why-proof reveal" style={{ marginTop: 28, maxWidth: '100%' }}>
            <strong>Après le diagnostic, trois options :</strong> déployer avec Luphy (nous gérons l&apos;implémentation et la formation),
            déployer en interne (vous avez la feuille de route), ou faire appel à un autre partenaire.
            Le livrable est conçu pour être exploitable indépendamment de nous.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--dark)', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="label reveal">Questions fréquentes</div>
          <div className="divider reveal" style={{ margin: '0 0 20px' }} />
          <h2 className="sec-title reveal">Tout savoir sur le diagnostic</h2>
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
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Commencer</div>
          <h2 className="reveal">
            Identifions ensemble vos<br />
            <em>3 à 5 chantiers prioritaires.</em>
          </h2>
          <p className="cta-intro reveal">
            Premier échange de 30 min pour cadrer vos enjeux. Votre devis personnalisé en moins d&apos;une semaine.
          </p>
          <div className="cta-btns reveal">
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
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
