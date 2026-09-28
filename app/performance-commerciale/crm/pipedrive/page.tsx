import type { Metadata } from 'next'
import CrmPageLayout, { type CrmData } from '@/components/CrmPageLayout'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Implémentation Pipedrive | Luphy',
  description:
    "Conseil et déploiement Pipedrive pour équipes commerciales agiles. CRM simple, rapide à mettre en place, orienté pipeline et activité.",
  openGraph: {
    title: 'Implémentation Pipedrive | Luphy',
    description: "Déploiement Pipedrive pour équipes commerciales agiles.",
    url: `${SITE_URL}/performance-commerciale/crm/pipedrive`,
  },
}

const DATA: CrmData = {
  slug: 'pipedrive',
  name: 'Pipedrive',
  tagline: 'Le CRM simple et efficace pour les équipes qui veulent aller vite',
  description:
    "Pipedrive est le CRM le plus rapide à déployer pour une équipe commerciale. Interface claire, pipeline visuel, focus sur les activités : un outil conçu pour être utilisé au quotidien, pas pour être configuré à l'infini.",
  pourQui: [
    "Équipes commerciales de 2 à 20 personnes qui veulent un CRM opérationnel rapidement",
    "Structures qui n'ont pas besoin de l'enrichissement automatique d'Affinity ou de la complexité de HubSpot",
    "Organisations qui migrent depuis Excel et cherchent une solution simple et abordable",
    "Équipes orientées activité commerciale (appels, emails, RDV) avec un pipeline court",
  ],
  pasFor:
    "Les fonds PE/VC ou boutiques M&A (Affinity ou DealCloud sont plus adaptés). Les équipes qui ont besoin de marketing automation avancé (HubSpot est plus complet).",
  setup: [
    { title: 'Configuration des pipelines et étapes', desc: "Modélisation de votre processus commercial : nombre d'étapes, critères de passage, champs obligatoires par étape." },
    { title: 'Import et nettoyage des contacts', desc: "Import depuis Excel, nettoyage, déduplication. Votre base de contacts est propre dès le premier jour." },
    { title: 'Automatisations de base', desc: "Création des rappels d'activité, alertes de relance, emails automatiques sur certains déclencheurs. Pipedrive couvre l'essentiel sans sur-ingénierie." },
    { title: 'Connexion email et calendrier', desc: "Synchronisation Gmail ou Outlook pour le suivi des interactions et la planification des activités." },
    { title: 'Formation et adoption', desc: "Formation de l'équipe sur vos processus réels. Rituels de pilotage hebdomadaire, indicateurs clés à suivre." },
  ],
  migrations: [
    'Depuis Excel ou Google Sheets',
    'Depuis HubSpot ou Zoho',
    'Depuis un autre CRM généraliste',
  ],
  integrations: [
    'Gmail / Outlook',
    'Slack',
    'Zapier / Make',
    'DocuSign',
    'Lemlist / La Growth Machine (outbound)',
  ],
  faq: [
    {
      q: 'Pipedrive est-il suffisamment puissant pour une PME ?',
      a: "Oui. Pipedrive couvre l'essentiel des besoins CRM d'une équipe de taille moyenne. Pour des besoins plus avancés (marketing automation, scoring), HubSpot peut être envisagé. Mais beaucoup d'équipes n'ont pas besoin de cette complexité.",
    },
    {
      q: 'Combien de temps prend le déploiement de Pipedrive ?',
      a: "C'est l'un des CRM les plus rapides à déployer. Un projet standard (configuration, import des données, formation) se fait en quelques semaines. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
    {
      q: 'Peut-on migrer depuis Excel vers Pipedrive ?',
      a: "Oui. C'est le cas le plus fréquent. Nous nettoyons votre fichier Excel, structurons les données et les importons dans Pipedrive avec une configuration adaptée à vos pipelines.",
    },
    {
      q: 'Pipedrive peut-il être connecté à nos outils de prospection ?',
      a: "Oui. Pipedrive s'intègre avec Lemlist, La Growth Machine, et d'autres outils outbound via Zapier ou des intégrations natives. Nous configurons ces connexions pour que les leads entrant dans vos séquences alimentent automatiquement votre CRM.",
    },
    {
      q: 'Combien coûte le déploiement de Pipedrive ?',
      a: "Le tarif couvre le conseil, la configuration et la formation, en plus de la licence Pipedrive. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
  ],
  schemaDesc: "Conseil et déploiement Pipedrive pour équipes commerciales agiles. CRM simple, pipeline visuel, orienté activité.",
}

export default function Page() {
  return <CrmPageLayout data={DATA} />
}
