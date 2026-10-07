import type { Metadata } from 'next'
import CrmPageLayout, { type CrmData } from '@/components/CrmPageLayout'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Implémentation Affinity CRM | Luphy',
  description:
    "Conseil et déploiement Affinity CRM pour fonds d'investissement, boutiques M&A et family offices. Dealflow, enrichissement automatique des contacts, reporting LP/GP.",
  openGraph: {
    title: 'Implémentation Affinity CRM | Luphy',
    description: "Déploiement Affinity CRM pour PE, VC et M&A.",
    url: `${SITE_URL}/performance-commerciale/crm/affinity`,
  },
}

const DATA: CrmData = {
  slug: 'affinity',
  name: 'Affinity',
  tagline: 'Le CRM de référence pour le dealflow et la relation investisseur',
  description:
    "Affinity est le CRM de référence pour les fonds PE, VC et les boutiques M&A. Il enrichit automatiquement vos contacts, centralise les interactions et structure votre dealflow. Luphy déploie et configure Affinity en partant de vos processus réels.",
  pourQui: [
    'Fonds PE, VC, fonds de dette et family offices qui gèrent un dealflow actif',
    'Boutiques M&A mid-market avec plusieurs mandats simultanés',
    'Équipes de 2 à 50 personnes qui veulent capitaliser sur leur réseau',
    'Organisations qui passent d\'Excel ou de Notion à un CRM dédié',
  ],
  pasFor:
    "Les équipes SaaS B2B avec un cycle de vente classique (HubSpot ou Pipedrive sont plus adaptés). Les organisations qui n'ont pas besoin d'enrichissement automatique des contacts.",
  setup: [
    { title: 'Configuration des pipelines', desc: 'Modélisation de vos pipelines dealflow (sourcing, screening, LOI, closing) et de vos processus LP/GP selon votre fonctionnement réel.' },
    { title: 'Enrichissement et import des contacts', desc: "Import de vos contacts existants (Excel, LinkedIn, autre CRM), déduplication, enrichissement automatique via les connecteurs Affinity." },
    { title: 'Paramétrage des champs et vues', desc: "Création des champs sur mesure (secteur, géographie, stade, assigné), vues filtrées par équipe ou par type d'opportunité." },
    { title: 'Intégrations email et calendrier', desc: 'Connexion Gmail ou Outlook pour le suivi automatique des interactions. Synchronisation calendrier pour les réunions et relances.' },
    { title: 'Formation et adoption', desc: 'Formation de l\'équipe sur vos données et vos processus réels : règles de saisie, rituels de mise à jour, pilotage hebdomadaire.' },
  ],
  migrations: [
    'Depuis Excel ou Google Sheets',
    'Depuis Notion (bases de contacts)',
    'Depuis HubSpot, Salesforce ou Pipedrive',
    'Depuis un autre CRM dealflow',
  ],
  integrations: [
    'Gmail / Google Workspace',
    'Outlook / Microsoft 365',
    'LinkedIn (via extension)',
    'Slack (notifications dealflow)',
    'n8n / Zapier (workflows personnalisés)',
  ],
  faq: [
    {
      q: 'En quoi Affinity est-il différent d\'un CRM classique comme HubSpot ?',
      a: "Affinity est conçu pour les métiers du capital et du M&A. Son enrichissement automatique des contacts (emails, réunions, mentions web) et sa logique dealflow sont spécifiquement pensés pour ces usages. Un CRM généraliste comme HubSpot est plus adapté à une logique commerciale classique avec pipeline d'opportunités standardisé.",
    },
    {
      q: 'Combien de temps prend le déploiement d\'Affinity ?',
      a: "Un déploiement standard (import des contacts, configuration des pipelines, formation) prend généralement quelques semaines. La durée exacte est précisée dans le devis selon la taille de l'équipe et le volume de données.",
    },
    {
      q: 'Peut-on migrer nos contacts depuis Excel ou un autre CRM ?',
      a: "Oui. Nous gérons le nettoyage, la déduplication et l'import des données depuis Excel, Notion, HubSpot, Salesforce ou tout autre outil. C'est une étape standard de nos projets.",
    },
    {
      q: 'Combien coûte le déploiement d\'Affinity ?',
      a: "Le tarif couvre le conseil, la configuration et la formation. Il est adapté à la taille de l'équipe et au périmètre. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
  ],
  schemaDesc: "Conseil et déploiement Affinity CRM pour fonds d'investissement, boutiques M&A et family offices.",
}

export default function Page() {
  return <CrmPageLayout data={DATA} />
}
