import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaOrg from '@/components/SchemaOrg'
import ClientEffects from '@/components/ClientEffects'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ | Luphy',
  description:
    "Questions fréquentes sur Luphy : qui nous sommes, ce que nous faisons, combien ça coûte, comment se déroule une mission, quels CRM nous déployons.",
  openGraph: {
    title: 'FAQ | Luphy',
    description: "Toutes les réponses sur Luphy : CRM, automatisation, IA, formation, tarifs, délais.",
    url: `${SITE_URL}/faq`,
  },
}

const FAQ_SECTIONS = [
  {
    section: 'Qui est Luphy ?',
    questions: [
      {
        q: "C'est quoi Luphy ?",
        a: "Luphy est une agence de performance digitale spécialisée dans la finance. Nous déployons des CRM, automatisons des processus métier et formons les équipes à l'IA. Nous travaillons exclusivement avec des fonds d'investissement, des boutiques M&A, des sociétés de gestion et des cabinets de conseil.",
      },
      {
        q: "Luphy fait-il du développement logiciel ?",
        a: "Non. Nous n'écrivons pas de code de production ni d'applications métier sur mesure. Nous configurons des outils existants (CRM, outils IA, plateformes no-code/low-code) et automatisons des processus. Pour les cas les plus spécifiques, nous utilisons Notion, Airtable ou n8n.",
      },
      {
        q: "Luphy travaille-t-il avec des entreprises hors finance ?",
        a: "Non. Nous sommes spécialisés sur les acteurs de la finance. Cette spécialisation nous permet de proposer des recommandations adaptées à vos contraintes métier, pas des approches copiées depuis d'autres secteurs.",
      },
      {
        q: "Qui sont les fondateurs de Luphy ?",
        a: "Titouan Galpin (pôle performance commerciale : CRM, outbound, pipeline) et Tristan Camilli (pôle performance opérationnelle : automatisation, IA, formation). Vous avez le même interlocuteur du début à la fin de votre projet.",
      },
    ],
  },
  {
    section: 'Missions et méthode',
    questions: [
      {
        q: "Comment se déroule une mission Luphy ?",
        a: "Toutes les missions commencent par un diagnostic ROI : audit de l'existant, identification des enjeux prioritaires, chiffrage de l'impact. Ce diagnostic produit un rapport avec des recommandations priorisées et un plan d'action. Ensuite vient le déploiement, puis la formation et le suivi d'adoption.",
      },
      {
        q: "Combien de temps prend un déploiement CRM ?",
        a: "Entre 4 et 12 semaines selon le CRM, le volume de données à migrer et la taille de l'équipe. Un déploiement Pipedrive ou Notion est plus rapide qu'un DealCloud ou un HubSpot avec marketing automation.",
      },
      {
        q: "Est-ce que vous faites de la maintenance après le déploiement ?",
        a: "Oui. Nous proposons un accompagnement post-déploiement : suivi d'adoption, ajustements de configuration, formation des nouveaux arrivants. Les modalités sont définies au cas par cas.",
      },
      {
        q: "Peut-on démarrer avec juste un diagnostic sans s'engager sur la suite ?",
        a: "Oui. Le diagnostic ROI est une prestation autonome. Il n'implique aucun engagement sur le déploiement. Certains clients l'utilisent uniquement pour prioriser leurs projets internes.",
      },
    ],
  },
  {
    section: 'CRM',
    questions: [
      {
        q: "Quels CRM déployez-vous ?",
        a: "Affinity, DealCloud, HubSpot, Pipedrive, Notion et les CRM sur mesure (Notion avancé, Airtable, applications légères). Le choix du CRM est déterminé lors du diagnostic selon votre processus, votre équipe et vos contraintes.",
      },
      {
        q: "Peut-on migrer depuis Excel vers un CRM ?",
        a: "Oui. C'est le cas le plus fréquent. Nous nettoyons, structurons et importons vos données. La qualité de la migration dépend de la qualité des données de départ : nous faisons un audit avant tout import.",
      },
      {
        q: "Quel CRM est le mieux adapté à un fonds PE/VC ?",
        a: "Affinity est le standard pour le suivi de dealflow et les relations LPs. DealCloud est plutôt positionné sur les boutiques M&A et les besoins de compliance plus avancés. Nous recommandons après avoir compris votre processus exact.",
      },
      {
        q: "Vos déploiements CRM incluent-ils la formation ?",
        a: "Oui, systématiquement. Un CRM non adopté ne crée aucun ROI. La formation équipe et les rituels de pilotage font partie de chaque déploiement.",
      },
    ],
  },
  {
    section: 'IA et automatisation',
    questions: [
      {
        q: "Quels outils d'automatisation utilisez-vous ?",
        a: "Principalement n8n, Make et Zapier selon les besoins. Pour l'IA, nous travaillons avec Claude (Anthropic) et les APIs associées. Nous ne développons pas de modèles IA sur mesure.",
      },
      {
        q: "L'IA est-elle compatible avec la confidentialité des données financières ?",
        a: "Oui, à condition de choisir les bons niveaux d'usage. Nous appliquons un cadre de criticité en 4 niveaux (Explore, Assist, Execute, Restricted) et recommandons des hébergements adaptés selon la sensibilité des données.",
      },
      {
        q: "Peut-on automatiser la génération de rapports LPs ?",
        a: "Oui. C'est un cas d'usage fréquent : extraction des données depuis le CRM ou les tableurs, génération du rapport au format défini, envoi automatique. Nous configurons ces workflows selon votre format de rapport actuel.",
      },
    ],
  },
  {
    section: 'Formation',
    questions: [
      {
        q: "Vos formations sont-elles finançables via l'OPCO ou le CPF ?",
        a: "Non. Luphy n'est pas certifié Qualiopi. Nos formations ne sont pas éligibles aux dispositifs OPCO ou CPF.",
      },
      {
        q: "Proposez-vous des formations pour des non-techniciens ?",
        a: "Oui. Nos formations IA (acculturation, parcours Claude, coaching dirigeant) sont conçues pour des profils non-techniques. Nous partons des usages, pas de la technologie.",
      },
      {
        q: "Quelle est la différence entre l'acculturation IA et le coaching dirigeant ?",
        a: "L'acculturation IA est un programme collectif sur plusieurs semaines (COMEX, managers, équipes). Le coaching dirigeant est individuel, en séances d'1 h à rythme libre, centré sur vos décisions et projets en cours.",
      },
    ],
  },
  {
    section: 'Tarifs et logistique',
    questions: [
      {
        q: "Combien coûte une mission Luphy ?",
        a: "Nous ne publions pas de tarifs. Le tarif dépend du périmètre, de la durée et des outils concernés. Votre devis personnalisé en moins d'une semaine après un premier échange de 30 minutes.",
      },
      {
        q: "Travaillez-vous en présentiel ou à distance ?",
        a: "Les deux. Les ateliers de diagnostic et de formation collective se font de préférence en présentiel. La configuration des outils, le suivi et les réunions de pilotage se font en distanciel.",
      },
      {
        q: "Comment démarrer avec Luphy ?",
        a: "Un premier échange de 30 minutes sans engagement avec le bon interlocuteur : Titouan pour les sujets CRM et commercial, Tristan pour les sujets IA et opérationnel. Les liens de prise de RDV sont en bas de page.",
      },
    ],
  },
]

const ALL_FAQ = FAQ_SECTIONS.flatMap(s => s.questions)

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: ALL_FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
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
      <SchemaOrg url={`${SITE_URL}/faq`} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <span>FAQ</span>
      </nav>

      <section className="page-hero">
        <div className="label">Questions fréquentes</div>
        <h1>Tout ce que<br /><em>vous voulez savoir.</em></h1>
        <p>
          Qui nous sommes, comment nous travaillons, quels outils nous déployons,
          ce que ça coûte. Questions formulées comme vous les poseriez.
        </p>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {FAQ_SECTIONS.map((sec, si) => (
            <div key={si} style={{ marginBottom: 64 }}>
              <div className="label reveal" style={{ marginBottom: 12 }}>{sec.section}</div>
              <div className="divider reveal" style={{ margin: '0 0 24px' }} />
              <div className="faq-list">
                {sec.questions.map((f, fi) => (
                  <div key={fi} className={`faq-item reveal${fi > 0 ? ' d1' : ''}`}>
                    <h3>{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-glow" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="label reveal" style={{ display: 'inline-block', marginBottom: 16 }}>Une question non couverte ?</div>
          <h2 className="reveal">Parlons-en<br /><em>directement.</em></h2>
          <p className="cta-intro reveal">
            30 minutes avec le bon interlocuteur. Sans engagement.
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
