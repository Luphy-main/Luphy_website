import type { Metadata } from 'next'
import CrmPageLayout, { type CrmData } from '@/components/CrmPageLayout'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Implémentation HubSpot | Luphy',
  description:
    "Conseil et déploiement HubSpot pour sociétés de gestion et cabinets de conseil. CRM, séquences outbound, nurturing, reporting marketing et commercial.",
  openGraph: {
    title: 'Implémentation HubSpot | Luphy',
    description: "Déploiement HubSpot pour sociétés de gestion et cabinets de conseil.",
    url: `${SITE_URL}/performance-commerciale/crm/hubspot`,
  },
}

const DATA: CrmData = {
  slug: 'hubspot',
  name: 'HubSpot',
  tagline: 'Le CRM tout-en-un pour les équipes orientées croissance commerciale',
  description:
    "HubSpot est idéal pour les sociétés de gestion et les cabinets de conseil qui veulent structurer leur développement commercial : pipeline de prospects, séquences outbound, nurturing, reporting. Un écosystème complet, accessible et puissant.",
  pourQui: [
    "Sociétés de gestion qui structurent leur approche commerciale (levée de fonds, développement LP)",
    "Cabinets de conseil et services professionnels avec une démarche de développement commercial active",
    "Équipes qui veulent combiner CRM, marketing automation et reporting dans un seul outil",
    "Organisations qui migrent depuis Salesforce et cherchent une alternative plus accessible",
  ],
  pasFor:
    "Les fonds PE/VC ou boutiques M&A dont l'activité est centrée sur le dealflow et la relation investisseur (Affinity ou DealCloud sont plus adaptés).",
  setup: [
    { title: 'Configuration du CRM et des pipelines', desc: "Modélisation de vos pipelines de prospection et de suivi des opportunités. Champs personnalisés, étapes de vente, règles d'assignation." },
    { title: 'Séquences d\'emails et automatisations', desc: "Création des séquences outbound, workflows de nurturing, alertes de relance. Tout ce qui peut être automatisé l'est, pour que les commerciaux se concentrent sur les conversations." },
    { title: 'Connexion aux outils existants', desc: "Intégration avec votre boîte mail (Gmail / Outlook), LinkedIn Sales Navigator, outils de signature électronique et votre stack existant." },
    { title: 'Reporting et tableaux de bord', desc: "Dashboards sur mesure pour piloter l'activité commerciale : volume d'activité, taux de conversion, pipeline par étape, prévisions." },
    { title: 'Formation et adoption', desc: "Formation de l'équipe sur vos processus et vos données réels. Rituels de pilotage, bonnes pratiques de saisie, indicateurs d'adoption." },
  ],
  migrations: [
    'Depuis Salesforce (migration complète)',
    'Depuis Pipedrive ou Zoho',
    'Depuis Excel ou Google Sheets',
    'Depuis un CRM maison ou sur mesure',
  ],
  integrations: [
    'Gmail / Google Workspace',
    'Outlook / Microsoft 365',
    'LinkedIn Sales Navigator',
    'Slack, Teams',
    'n8n / Make / Zapier',
    'DocuSign / HelloSign',
  ],
  faq: [
    {
      q: 'HubSpot est-il adapté aux acteurs de la finance ?',
      a: "Oui, pour les structures dont l'activité commerciale ressemble à une logique B2B classique : prospection de LPs, développement d'un portefeuille clients conseil, etc. Pour les fonds avec un dealflow intense, Affinity est plus adapté.",
    },
    {
      q: 'Quelle version de HubSpot recommandez-vous ?',
      a: "Cela dépend de vos besoins. Le CRM de base est gratuit et couvre beaucoup de cas. Les versions Sales Hub et Marketing Hub apportent les séquences, le scoring et le reporting avancé. Nous vous conseillons sur la version adaptée à votre budget et vos objectifs.",
    },
    {
      q: 'Peut-on migrer depuis Salesforce ?',
      a: "Oui. La migration Salesforce vers HubSpot est un projet standard pour nous. Nous gérons la cartographie des champs, le nettoyage des données, l'import et la validation des données migrées.",
    },
    {
      q: 'Combien coûte le déploiement de HubSpot ?',
      a: "Le tarif couvre le conseil, la configuration et la formation, en plus du coût de la licence HubSpot. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
  ],
  schemaDesc: "Conseil et déploiement HubSpot pour sociétés de gestion et cabinets de conseil. CRM, outbound, nurturing.",
  partnerBadge: {
    label: 'HubSpot Solutions Partner',
    href: 'https://ecosystem.hubspot.com/fr/marketplace/solutions/luphy',
  },
}

export default function Page() {
  return <CrmPageLayout data={DATA} />
}
