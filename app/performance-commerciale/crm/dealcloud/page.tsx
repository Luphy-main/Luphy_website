import type { Metadata } from 'next'
import CrmPageLayout, { type CrmData } from '@/components/CrmPageLayout'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Implémentation DealCloud | Luphy',
  description:
    "Conseil et déploiement DealCloud pour boutiques M&A, banques d'affaires et advisory firms. Suivi des mandats, dealflow, préparation d'IC memos.",
  openGraph: {
    title: 'Implémentation DealCloud | Luphy',
    description: "Déploiement DealCloud pour boutiques M&A et banques d'affaires.",
    url: `${SITE_URL}/performance-commerciale/crm/dealcloud`,
  },
}

const DATA: CrmData = {
  slug: 'dealcloud',
  name: 'DealCloud',
  tagline: 'La solution enterprise pour les boutiques M&A et les banques d\'affaires',
  description:
    "DealCloud est la solution de référence pour les boutiques M&A mid-market, les banques d'affaires et les advisory firms. Gestion des mandats, dealflow, préparation des IC memos, reporting : une plateforme pensée pour les métiers du conseil en fusions-acquisitions.",
  pourQui: [
    "Boutiques M&A mid-market avec plusieurs mandats simultanés",
    "Banques d'affaires et advisory firms à la recherche d'une solution enterprise",
    "Équipes M&A qui veulent structurer le suivi des jalons (teaser, NDA, LOI, signing)",
    "Organisations qui ont besoin d'une solution robuste avec des droits d'accès granulaires",
  ],
  pasFor:
    "Les petites structures qui n'ont pas besoin de la complexité d'une plateforme enterprise. Affinity ou HubSpot sont souvent plus adaptés pour un démarrage rapide.",
  setup: [
    { title: 'Configuration des mandats et du dealflow', desc: "Modélisation de vos processus M&A : sourcing, teaser, NDA, LOI, due diligence, signing. Champs sur mesure selon votre méthodologie." },
    { title: 'Droits d\'accès et confidentialité', desc: "Configuration des cloisonnements par équipe et par mandat. Gestion fine des droits d'accès pour les informations sensibles." },
    { title: 'Suivi des jalons et alertes', desc: "Paramétrage des étapes clés de chaque mandat, alertes de relance, calendrier des échéances. Visibilité sur l'avancement de chaque dossier." },
    { title: 'Reporting et dashboards', desc: "Tableaux de bord pour le pilotage de l'activité : mandats actifs, pipeline de sourcing, volume d'honoraires projeté." },
    { title: 'Formation et adoption', desc: "Formation de l'équipe sur vos processus réels, rituels de mise à jour, bonnes pratiques de saisie pour garantir la fiabilité des données." },
  ],
  migrations: [
    'Depuis Excel ou Google Sheets',
    'Depuis Salesforce',
    'Depuis un CRM généraliste (HubSpot, Pipedrive)',
    'Depuis un autre outil de suivi des mandats',
  ],
  integrations: [
    'Gmail / Outlook',
    'PitchBook (données de marché)',
    'Bloomberg / Capital IQ (selon configuration)',
    'DocuSign (signature électronique)',
    'n8n / Zapier (automatisations)',
  ],
  faq: [
    {
      q: 'DealCloud est-il adapté à une petite boutique M&A ?',
      a: "DealCloud est conçu pour des structures d'une certaine taille et complexité. Pour une petite boutique de 2-5 personnes, Affinity ou HubSpot sont souvent plus rapides à déployer et moins coûteux. Nous vous aidons à choisir l'outil adapté à votre situation lors du premier échange.",
    },
    {
      q: 'Combien de temps prend le déploiement de DealCloud ?',
      a: "Un déploiement DealCloud est plus structurant qu'un CRM léger. La durée est précisée dans le devis selon le périmètre retenu. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
    {
      q: 'Comment gérer la confidentialité des mandats dans DealCloud ?',
      a: "DealCloud permet une gestion fine des droits d'accès par utilisateur, par équipe et par dossier. Nous configurons ces cloisonnements dès le départ selon vos règles de confidentialité internes.",
    },
    {
      q: 'Peut-on importer notre historique de mandats ?',
      a: "Oui. Nous gérons l'import de vos données historiques (mandats, contacts, sociétés) depuis Excel ou un autre système. Le nettoyage et la structuration des données font partie du projet.",
    },
    {
      q: 'Combien coûte le déploiement de DealCloud ?',
      a: "Le tarif est adapté au périmètre : modules activés, nombre d'utilisateurs, volume de données, intégrations. Votre devis personnalisé en moins d'une semaine après un premier échange.",
    },
  ],
  schemaDesc: "Conseil et déploiement DealCloud pour boutiques M&A, banques d'affaires et advisory firms.",
}

export default function Page() {
  return <CrmPageLayout data={DATA} />
}
