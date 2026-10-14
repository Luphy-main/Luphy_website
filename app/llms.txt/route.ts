import { client } from '@/sanity/lib/client'
import { SITE_URL } from '@/lib/constants'
import { LLMS_CONTENT } from '@/sanity/lib/queries'
import { titreEdition } from '@/sanity/lib/newsletter'

// Même rythme que les pages Sanity ; le webhook /api/revalidate rafraîchit immédiatement
export const revalidate = 3600

type Lien = { titre: string; url: string; description?: string }
type Doc = { titre?: string; slug?: string; description?: string }
type Contenu = { casClients: Doc[]; casUsage: Doc[]; articles: Doc[]; editions: Array<{ numero: number; titre?: string; description?: string }> }

const url = (path: string) => `${SITE_URL}${path}`

// Pas de tiret cadratin dans les textes du site
const nettoyer = (texte = '') => texte.replace(/\s*—\s*/g, ' : ').replace(/\s+/g, ' ').trim()

const OFFRES: Lien[] = [
  { titre: 'Méthode : Diagnostic Performance ROI', url: url('/methode'), description: 'La méthode Luphy en 7 étapes : identifier, chiffrer et prioriser les chantiers CRM, automatisation et IA à plus fort ROI avant tout déploiement.' },
  { titre: 'Performance commerciale', url: url('/performance-commerciale'), description: 'CRM, prospection, nurturing et pilotage commercial pour les acteurs de la finance. Affinity, DealCloud, HubSpot, Pipedrive, Notion et CRM sur mesure.' },
  { titre: 'Consulting CRM', url: url('/performance-commerciale/crm'), description: 'Conseil, migration et optimisation CRM pour les acteurs de la finance : Affinity, DealCloud, HubSpot, Pipedrive, Notion et CRM sur mesure. Architecture, automatisation et adoption.' },
  { titre: 'Implémentation Affinity CRM', url: url('/performance-commerciale/crm/affinity'), description: "Conseil et déploiement Affinity CRM pour fonds d'investissement, boutiques M&A et family offices. Dealflow, enrichissement automatique des contacts, reporting LP/GP." },
  { titre: 'Implémentation DealCloud', url: url('/performance-commerciale/crm/dealcloud'), description: "Conseil et déploiement DealCloud pour boutiques M&A, banques d'affaires et advisory firms. Suivi des mandats, dealflow, préparation d'IC memos." },
  { titre: 'Implémentation HubSpot', url: url('/performance-commerciale/crm/hubspot'), description: 'Conseil et déploiement HubSpot pour sociétés de gestion et cabinets de conseil. CRM, séquences outbound, nurturing, reporting marketing et commercial.' },
  { titre: 'Implémentation Pipedrive', url: url('/performance-commerciale/crm/pipedrive'), description: 'Conseil et déploiement Pipedrive pour équipes commerciales agiles. CRM simple, rapide à mettre en place, orienté pipeline et activité.' },
  { titre: 'Notion comme CRM', url: url('/performance-commerciale/crm/notion'), description: 'Conseil et configuration de Notion comme CRM léger. Pour les équipes agiles qui veulent centraliser contacts, pipeline et documentation dans un seul espace.' },
  { titre: 'CRM sur mesure', url: url('/performance-commerciale/crm/sur-mesure'), description: 'Quand Affinity, DealCloud, HubSpot, Pipedrive et Notion ne suffisent pas : ce que nous construisons pour vous. CRM sur mesure pour les processus atypiques.' },
  { titre: 'Prospection outbound', url: url('/performance-commerciale/outbound'), description: 'Structuration et automatisation de la prospection outbound pour les acteurs de la finance. Ciblage, séquences, outils et intégration CRM.' },
  { titre: 'Performance opérationnelle', url: url('/performance-operationnelle'), description: "Automatisation de processus, déploiement de l'IA et formation pour les acteurs de la finance. n8n, Make, Claude, agents IA sur vos données réelles." },
  { titre: 'IA & automatisation', url: url('/performance-operationnelle/ia'), description: 'Workflows intelligents, enrichissement de leads par IA, reporting automatisé et intégration de vos outils, pour les acteurs de la finance. n8n, Make, Zapier, Claude.' },
  { titre: 'Formation IA & CRM', url: url('/formation'), description: 'Formation et adoption IA pour dirigeants et équipes. Acculturation IA, parcours Claude, adoption CRM, coaching dirigeant. Sur vos données et vos process réels.' },
  { titre: 'Acculturation IA', url: url('/formation/acculturation-ia'), description: "Programme d'acculturation IA pour COMEX, associés et managers. Fondamentaux, gouvernance, charte d'usage, conduite du changement. Sur plusieurs semaines." },
  { titre: 'Parcours Claude', url: url('/formation/claude'), description: 'Formation Claude en 3 niveaux : Chat & Projets, Cowork & Skills, Claude Code & agents. Accessible aux non-développeurs, sur vos propres documents.' },
  { titre: 'Formation CRM', url: url('/formation/crm'), description: 'Formation à l\'adoption CRM pour équipes commerciales. Règles de saisie, pipelines, reporting, rituels. Sur Affinity, DealCloud, HubSpot, Pipedrive, Notion.' },
  { titre: 'Coaching IA dirigeant', url: url('/formation/coaching-dirigeant'), description: "Coaching IA individuel pour fondateurs, associés et directeurs. Séances d'1 h, rythme libre, sans engagement. Repérer les bons cas d'usage, arbitrer un budget IA." },
]

const A_PROPOS: Lien[] = [
  { titre: "L'équipe", url: url('/equipe'), description: 'Titouan Galpin et Tristan Camilli, co-fondateurs de Luphy. Spécialistes CRM, IA et performance commerciale pour les acteurs de la finance.' },
  { titre: 'Contact', url: url('/contact'), description: "Parlons de votre organisation. Premier échange de 30 min pour cadrer vos enjeux. Votre devis personnalisé en moins d'une semaine." },
]

const OPTIONAL: Lien[] = [
  { titre: 'Témoignages clients', url: url('/temoignages'), description: "Retours d'expérience de nos clients : fonds d'investissement, boutiques M&A, sociétés de gestion, cabinets de conseil. CRM, automatisation, formation IA." },
  { titre: 'FAQ', url: url('/faq'), description: 'Questions fréquentes sur Luphy : qui nous sommes, ce que nous faisons, combien ça coûte, comment se déroule une mission, quels CRM nous déployons.' },
  { titre: 'Expertise financière', url: url('/expertise-finance'), description: "Spécialisation finance d'investissement, M&A, sociétés de gestion et conseil. CRM Affinity, DealCloud, HubSpot. Confidentialité des données." },
  { titre: "Fonds d'investissement", url: url('/secteurs/fonds-investissement'), description: 'CRM, automatisation et IA pour les fonds PE, VC, dette privée et fonds de fonds. Structurez votre dealflow, pilotez vos LPs, automatisez votre reporting.' },
  { titre: "M&A et banques d'affaires", url: url('/secteurs/m-a-banques-affaires'), description: "CRM et automatisation pour boutiques M&A et banques d'affaires. Suivi des mandats, gestion de la confidentialité, sourcing acquéreurs, outbound structuré." },
  { titre: 'Sociétés de gestion', url: url('/secteurs/societes-de-gestion'), description: "CRM, automatisation et IA pour les sociétés de gestion d'actifs, asset managers et family offices. Suivi IR, reporting LPs, outbound structuré." },
  { titre: 'Cabinets de conseil', url: url('/secteurs/conseil'), description: 'CRM, outbound et IA pour les cabinets de conseil en stratégie, management et boutiques spécialisées finance. Pilotage du pipe missions, prospection structurée, productivité IA.' },
  { titre: 'Mentions légales', url: url('/mentions-legales'), description: "Luphy SAS, cabinet de conseil et d'intégration (pas un éditeur de logiciel) : siège, RCS Evry 939 716 833, TVA, hébergement." },
  { titre: 'Politique de confidentialité', url: url('/confidentialite'), description: 'Données personnelles collectées par Luphy, finalités, bases légales, durées de conservation, prestataires et exercice des droits RGPD.' },
  { titre: 'Politique cookies', url: url('/cookies'), description: "Cookies utilisés sur luphy.io : cookies nécessaires, mesure d'audience HubSpot avec consentement, statistiques Vercel sans cookies, gestion des choix." },
]

const ligne = ({ titre, url, description }: Lien) =>
  `- [${nettoyer(titre)}](${url})${description ? `: ${nettoyer(description)}` : ''}`

const depuisSanity = (docs: Doc[], base: string): Lien[] =>
  docs
    .filter((d) => d.slug && d.titre)
    .map((d) => ({ titre: d.titre!, url: url(`${base}/${d.slug}`), description: d.description }))

const section = (titre: string, liens: Lien[]) => [`## ${titre}`, '', ...liens.map(ligne)].join('\n')

export async function GET() {
  const { casClients, casUsage, articles, editions } = await client.fetch<Contenu>(LLMS_CONTENT)

  // Newsletter : listée seulement s'il existe au moins une édition affichable
  const newsletter: Lien[] = editions.length
    ? [
        { titre: 'Newsletter LinkedIn', url: url('/ressources/newsletter'), description: "Toutes les éditions de la newsletter Luphy sur LinkedIn : cas d'usage, opérations et articles de fond pour les acteurs de la finance." },
        ...editions.map((e) => ({ titre: titreEdition(e), url: url(`/ressources/newsletter/${e.numero}`), description: e.description })),
      ]
    : []

  const texte = [
    '# Luphy',
    '',
    "> Luphy est un cabinet de conseil et d'intégration spécialisé dans la finance (fonds d'investissement, boutiques M&A, banques d'affaires) : CRM (HubSpot, Affinity, DealCloud, Pipedrive, Notion), automatisation IA et outbound. Luphy n'est pas un éditeur de logiciel.",
    '',
    "Luphy accompagne plus de 30 clients dans la finance, les startups et le conseil, depuis Paris. Luphy est HubSpot Solutions Partner. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    '',
    section('Offres', OFFRES),
    '',
    section('Cas clients', [
      { titre: 'Tous les cas clients', url: url('/cas-clients'), description: 'Des résultats mesurés chez des fonds, boutiques M&A et fintechs. Études de cas documentées : CRM, automatisation, IA.' },
      ...depuisSanity(casClients, '/cas-clients'),
    ]),
    '',
    section("Cas d'usage", [
      { titre: "Tous les cas d'usage", url: url('/cas-usage'), description: "Bibliothèque de cas d'usage CRM, automatisation et IA pour les acteurs de la finance. Alimentée au fil de l'eau." },
      ...depuisSanity(casUsage, '/cas-usage'),
    ]),
    '',
    section('Ressources', [
      { titre: 'Toutes les ressources', url: url('/ressources'), description: "Articles, guides et analyses sur le CRM, l'IA et la performance commerciale pour les métiers de la finance. Par les consultants Luphy." },
      ...depuisSanity(articles, '/ressources'),
      ...newsletter,
    ]),
    '',
    section('À propos', A_PROPOS),
    '',
    section('Optional', OPTIONAL),
    '',
  ].join('\n')

  return new Response(texte, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
