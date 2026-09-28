import type { Metadata } from 'next'
import CrmPageLayout, { type CrmData } from '@/components/CrmPageLayout'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Notion comme CRM | Luphy',
  description:
    "Conseil et configuration de Notion comme CRM léger. Pour les équipes agiles qui veulent centraliser contacts, pipeline et documentation dans un seul espace.",
  openGraph: {
    title: 'Notion comme CRM | Luphy',
    description: "Configuration de Notion comme CRM léger pour équipes agiles.",
    url: `${SITE_URL}/performance-commerciale/crm/notion`,
  },
}

const DATA: CrmData = {
  slug: 'notion',
  name: 'Notion',
  tagline: 'Un CRM léger et collaboratif pour les organisations agiles',
  description:
    "Notion n'est pas un CRM à proprement parler, mais bien configuré il remplace efficacement un CRM dédié pour les petites équipes. Base de contacts liée au pipeline, vues filtrées, templates de prise de notes : un espace de travail unique pour vos données commerciales.",
  pourQui: [
    "Startups et petites équipes qui utilisent déjà Notion comme espace de travail",
    "Organisations qui n'ont pas besoin de l'enrichissement automatique ou des séquences email d'un CRM dédié",
    "Équipes qui veulent centraliser contacts, pipeline et documentation dans un seul outil",
    "Structures qui cherchent une solution rapide à mettre en place à faible coût",
  ],
  pasFor:
    "Les fonds avec un dealflow intense (Affinity est indispensable). Les équipes qui ont besoin d'enrichissement automatique des contacts ou de séquences outbound natives. Au-delà de 15-20 personnes, un CRM dédié est généralement plus adapté.",
  setup: [
    { title: 'Architecture des bases de données', desc: "Création des bases liées : Contacts, Sociétés, Opportunités, Activités. Relations entre bases pour naviguer d'un contact à son entreprise et ses opportunités." },
    { title: 'Vues et filtres sur mesure', desc: "Pipeline en vue Kanban, liste des contacts filtrée par secteur ou statut, vue calendrier des relances. Chaque membre de l'équipe accède à sa vue adaptée." },
    { title: 'Templates et rituels', desc: "Templates de prise de notes pour les RDV, templates de suivi des opportunités, guide des règles de saisie pour maintenir la base propre." },
    { title: 'Automatisations légères', desc: "Automatisations Notion natives pour les rappels et les mises à jour de statut. Connexion avec n8n ou Zapier pour des workflows plus avancés si nécessaire." },
    { title: 'Formation et adoption', desc: "Formation de l'équipe sur l'architecture et les rituels de mise à jour. Un CRM Notion non maintenu se dégrade rapidement : nous mettons en place les bonnes habitudes dès le départ." },
  ],
  migrations: [
    'Depuis Excel ou Google Sheets',
    'Depuis une base Notion existante non structurée',
    'Depuis un CRM dédié (export CSV)',
  ],
  integrations: [
    'Gmail / Outlook (via Zapier ou Make)',
    'Slack (notifications)',
    'n8n / Zapier / Make',
    'Calendrier Google / Outlook',
  ],
  faq: [
    {
      q: 'Notion peut-il vraiment remplacer un CRM ?',
      a: "Pour une petite équipe avec un volume de contacts modéré et sans besoin d'enrichissement automatique, oui. Notion bien configuré couvre les besoins essentiels : contacts, pipeline, notes de RDV, relances. Au-delà d'une certaine taille ou complexité, un CRM dédié est plus robuste.",
    },
    {
      q: 'Quelle est la principale limite de Notion comme CRM ?',
      a: "Notion ne dispose pas d'enrichissement automatique des contacts, ni de séquences email natives, ni d'historique des interactions (emails, appels). Si ces fonctionnalités sont importantes pour vous, Affinity, HubSpot ou Pipedrive sont plus adaptés.",
    },
    {
      q: 'Combien de temps prend la configuration ?',
      a: "La configuration d'un CRM Notion est plus rapide qu'un CRM dédié. Un projet standard se fait en quelques jours à quelques semaines selon la complexité. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
    {
      q: 'Peut-on migrer vers un vrai CRM plus tard si on grandit ?',
      a: "Oui. Nous configurons le CRM Notion avec une structure claire qui facilite l'export vers Affinity, Pipedrive ou HubSpot le moment venu. La transition n'est pas un problème si les données sont bien organisées.",
    },
    {
      q: 'Combien coûte la configuration de Notion comme CRM ?',
      a: "C'est l'une de nos configurations les plus accessibles. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
  ],
  schemaDesc: "Conseil et configuration de Notion comme CRM léger pour équipes agiles. Contacts, pipeline, templates.",
}

export default function Page() {
  return <CrmPageLayout data={DATA} />
}
