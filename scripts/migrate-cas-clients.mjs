/**
 * Migration Sanity : Allyum, Fundora, Hoppi (v2 — nouveau schéma casClient)
 * Lit SANITY_WRITE_TOKEN depuis .env.local
 * Usage : node scripts/migrate-cas-clients.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomBytes } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

function readEnvLocal() {
  const path = join(__dirname, '..', '.env.local')
  const content = readFileSync(path, 'utf-8')
  const match = content.match(/^\s*SANITY_WRITE_TOKEN=(.+)$/m)
  if (!match) throw new Error('SANITY_WRITE_TOKEN introuvable dans .env.local')
  return match[1].trim()
}

const client = createClient({
  projectId: 'fbdmm8o7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: readEnvLocal(),
  useCdn: false,
})

const k = () => randomBytes(5).toString('hex')

function kpi(valeur, unite, libelle, source = '') {
  return { _key: k(), valeur, unite, libelle, source }
}

function enjeu(titre, texte) {
  return { _key: k(), titre, texte }
}

function etape(titre, texte, livrable = '') {
  return { _key: k(), titre, texte, livrable }
}

function faqItem(question, reponse) {
  return { _key: k(), question, reponse }
}

// ─── ALLYUM ──────────────────────────────────────────────────────────────────
const allyum = {
  _id: 'cas-client-allyum',
  _type: 'casClient',
  client: 'Allyum',
  slug: { _type: 'slug', current: 'allyum' },
  secteur: 'Boutique M&A',
  pole: 'commercial',
  outils: ['HubSpot'],
  ordre: 1,
  aLaUne: true,
  auteur: 'Titouan Galpin',

  titre: 'Allyum double ses leads en 6 mois avec HubSpot, sans recruter',
  enBref: "Allyum, boutique M&A small/mid cap, prospectait sans démarche commerciale commune entre ses associés. Chacun gérait ses contacts à sa façon, sur des cycles de 18 à 36 mois, sans outil de suivi partagé. Luphy a formalisé le process, structuré le pipeline HubSpot par étape du cycle de vente et automatisé les relances hebdomadaires. Résultat en 6 mois : leads entrants doublés, 50 % du pipeline en attente suivi systématiquement, et l'équivalent d'un demi-poste commercial gagné sans recrutement.",
  chapeau: "Boutique M&A premium small/mid cap. Pipeline doublé en 6 mois, 50 % des leads suivis systématiquement.",
  perimetre: 'Audit commercial, CRM HubSpot, relances, onboarding',

  kpis: [
    kpi('×2', '', 'leads entrants dans le pipeline en 6 mois', '[À VÉRIFIER avec Tristan]'),
    kpi('½', '', 'ETP commercial de capacité gagnée, sans recrutement', 'Estimation des associés'),
    kpi('50', '%', 'du pipeline en attente suivi systématiquement', '[source / période]'),
  ],

  verbatim: "C'est comme si on avait engagé un demi-commercial. On a fait l'économie d'un demi-biz commercial parce que maintenant, on arrive à le faire nous-mêmes de manière vraiment hyper fluide et efficiente.",
  verbatimAuteur: 'Martin Delépine',
  verbatimFonction: 'Associé',

  enjeux: [
    enjeu('Pas de démarche commune', "Chaque associé prospectait à sa façon, sans coordination ni standard partagé."),
    enjeu('Des leads potentiellement perdus', "Sur des cycles de 18 à 36 mois, oublier un contact peut coûter un mandat."),
    enjeu('Onboarding impossible sans infrastructure', "Une directrice recrutée devait être opérationnelle dès son arrivée, sans dépendre du legacy des fondateurs."),
  ],

  etapes: [
    etape(
      'Audit commercial',
      "Phase structurée pour formaliser, pour la première fois collectivement, les étapes du chemin prospect d'Allyum. Identification des documents existants, des pratiques en vigueur chez chaque associé, des points de friction.",
      'Process documenté et réutilisable',
    ),
    etape(
      'Pipeline HubSpot par stade',
      "Mise en place d'un pipeline reflétant fidèlement le cycle M&A : leads long terme, phases d'attente prolongées, deals à probabilité variable.",
      'Pipeline + vues personnalisées',
    ),
    etape(
      'Relances systématisées',
      "Rappels et tâches automatiques à chaque étape. Tous les mardis matin, les associés passent en revue leur CRM. Chaque contact devient une opportunité systématiquement traitée.",
      'Séquences + rituel hebdomadaire',
    ),
    etape(
      'Onboarding standardisé et kick-off',
      "L'ensemble du setup est conçu pour être reproductible. La directrice recrutée est opérationnelle dès J1 sans dépendre du legacy des fondateurs.",
      "Guide d'onboarding + formation",
    ),
  ],

  resultatsTexte: "En 6 mois, Allyum a doublé ses leads entrants, assure désormais un suivi systématique de son circuit d'attente et a gagné l'équivalent d'un demi-poste commercial sans recruter. Le process est documenté et réutilisé à chaque arrivée.",

  faq: [
    faqItem(
      'Combien de temps a duré la mission Allyum ?',
      "[Durée réelle], de l'audit au kick-off de l'équipe.",
    ),
    faqItem(
      'Faut-il changer de CRM pour obtenir ces résultats ?',
      "Non. Allyum utilisait déjà HubSpot : le gain vient de la structuration du process et des relances.",
    ),
    faqItem(
      'Cette approche fonctionne-t-elle pour un fonds ?',
      "Oui, la même méthode s'applique au dealflow et à la relation LP. Voir la page Performance commerciale.",
    ),
  ],

  metaDescription: "Boutique M&A Allyum : HubSpot déployé par Luphy, pipeline structuré, relances automatisées. Leads entrants doublés en 6 mois, sans recrutement.",
}

// ─── FUNDORA ──────────────────────────────────────────────────────────────────
const fundora = {
  _id: 'cas-client-fundora',
  _type: 'casClient',
  client: 'Fundora',
  slug: { _type: 'slug', current: 'fundora' },
  secteur: 'Fintech',
  pole: 'commercial',
  outils: ['HubSpot', 'Airtable', 'Brevo'],
  ordre: 2,
  aLaUne: false,
  auteur: 'Titouan Galpin',

  titre: "Fundora centralise 4 outils dans HubSpot, 100 % d'autonomie",
  enBref: "Fundora, plateforme d'investissement B2C, avait souscrit HubSpot sans le configurer, et gérait ses contacts investisseurs entre Airtable, Excel et notes iPhone. Luphy a tout centralisé : configuration complète de HubSpot, fiches contact et pipeline sur mesure, intégration API custom avec la plateforme propriétaire, migration de l'historique Airtable et synchronisation Brevo. L'équipe est aujourd'hui autonome à 100 % sur un seul outil.",
  chapeau: "Plateforme d'investissement B2C. HubSpot configuré end-to-end, 4 outils intégrés, 100 % d'autonomie équipe.",

  kpis: [
    kpi('100', '%', "d'autonomie de l'équipe sur le CRM au quotidien", ''),
    kpi('4', '', 'outils intégrés à HubSpot', ''),
    kpi('1', '', 'seul outil au quotidien : HubSpot remplace tout', ''),
  ],

  verbatim: "C'est un changement radical : avant on avait rien, maintenant on a quelque chose qui fonctionne très bien. On s'en sert full-time, c'est quasiment le seul outil servant dans la boîte.",
  verbatimAuteur: 'Benoît Feron',
  verbatimFonction: 'Fondateur',

  enjeux: [
    enjeu('HubSpot souscrit mais non configuré', "Non actionnable, inutilisable au quotidien par l'équipe sans configuration préalable."),
    enjeu('Données fragmentées sur trois outils', "Airtable, spreadsheets Excel et notes iPhone en parallèle, sans vue partagée sur le pipeline investisseur."),
    enjeu('Aucun champ uniformisé', "Aucun standard entre les contacts, aucun pipeline commun pour suivre les investisseurs."),
  ],

  etapes: [
    etape(
      'Modélisation des personas investisseurs',
      "Définition des types de contacts et de transactions spécifiques à Fundora, en repartant de leurs enjeux business réels, pas d'un template prédéfini.",
      '',
    ),
    etape(
      'Fiches contact et transaction personnalisées',
      "Configuration des propriétés pour remonter les signaux clés : inscription sur la plateforme, historique d'investissements, segment investisseur. Uniformisation de tous les champs.",
      '',
    ),
    etape(
      'Pipeline de transactions sur mesure',
      "Ajusté au cycle réel de Fundora, moins d'étapes que le B2B classique, mais tout aussi important. Gestion conjointe du pipe actif et du nurturing dans une vue unifiée.",
      '',
    ),
    etape(
      'Intégration API custom avec la plateforme propriétaire',
      "Pas de connecteur standard disponible. L'intégration a été construite sur mesure pour synchroniser la donnée en continu entre la plateforme Fundora et HubSpot.",
      '',
    ),
    etape(
      'Migration Airtable et synchronisation Brevo',
      "Réimportation de l'historique Airtable sans perte de donnée. Synchronisation de toutes les campagnes Brevo et communications entrantes/sortantes.",
      '',
    ),
  ],

  resultatsTexte: "Fundora dispose désormais d'un seul outil central : HubSpot remplace Airtable, les spreadsheets et les notes. Quatre outils sont intégrés, et l'équipe est autonome à 100 % sur le CRM au quotidien.",

  faq: [
    faqItem(
      'Peut-on intégrer une plateforme propriétaire à HubSpot ?',
      "Oui. Dans le cas de Fundora, l'intégration a été construite sur mesure via API, sans connecteur standard disponible.",
    ),
    faqItem(
      'Combien de temps faut-il pour former une équipe à HubSpot ?',
      "[À compléter selon la mission réelle]",
    ),
  ],

  metaDescription: "Fundora centralise 4 outils dans HubSpot grâce à Luphy : API custom, migration Airtable, synchronisation Brevo. 100 % d'autonomie CRM au quotidien.",
}

// ─── HOPPI ───────────────────────────────────────────────────────────────────
const hoppi = {
  _id: 'cas-client-hoppi',
  _type: 'casClient',
  client: 'Hoppi',
  slug: { _type: 'slug', current: 'hoppi' },
  secteur: 'Startup / Scale-up',
  pole: 'commercial',
  outils: ['HubSpot'],
  ordre: 3,
  aLaUne: false,
  auteur: 'Titouan Galpin',

  titre: 'Hoppi structure 800 prospects tier 1 avec HubSpot dès J1',
  enBref: "Hoppi, startup en phase de go-to-market rapide, prospectait sans coordination : doublons de démarchage, pas de visibilité partagée sur les établissements contactés, et 30 % du temps commercial gâché faute de suivi. Luphy a posé l'infrastructure commerciale depuis zéro : segmentation en trois tiers, 800 établissements tier 1 identifiés et activables dès J1, pipeline HubSpot et séquences de relance automatiques. Un nouveau commercial est opérationnel dès son premier jour.",
  chapeau: "Startup go-to-market rapide. 800 prospects tiers 1 activables dès J1, temps commercial gâché quasi éliminé.",

  kpis: [
    kpi('800', '', 'prospects tier 1 identifiés et activables dès J1', ''),
    kpi('J1', '', 'nouveau commercial opérationnel sans dépendre des fondateurs', ''),
    kpi('~2k€', '', 'par mois de temps commercial gâché éliminé', "Estimation de l'équipe"),
  ],

  verbatim: "Tu as apporté l'élément fondateur de notre stratégie commerciale et de l'exécution de cette stratégie. Sans ça c'était à l'arrache. On pouvait construire une stratégie commerciale, mais son exécution était approximative parce qu'il n'y avait rien qui permettait aux commerciaux d'attaquer et d'exécuter.",
  verbatimAuteur: 'Arthur Sevestre',
  verbatimFonction: 'Co-fondateur',

  enjeux: [
    enjeu('Prospection sans coordination', "Doublons de démarchage, aucune visibilité partagée sur les établissements déjà contactés."),
    enjeu('Temps commercial gâché', "Environ 2 000 euros/mois de temps commercial perdu, sans outil de suivi structuré."),
    enjeu('Turnover causé par une mauvaise infrastructure', "Les départs n'étaient pas liés aux profils recrutés, mais à l'absence d'infrastructure commerciale."),
  ],

  etapes: [
    etape(
      'Audit commercial',
      "Phase structurée pour répondre à une question simple : comment Hoppi vend-il, à qui, et dans quel ordre ? Pour une équipe qui n'a jamais formalisé ses process, c'est souvent la première fois que ces questions sont posées collectivement.",
      'Process documenté, réutilisable à chaque onboarding commercial',
    ),
    etape(
      'Segmentation tiers 1 / 2 / 3',
      "Sur la base de critères précis (type d'établissement, zone géographique, taille), tout le marché adressable a été segmenté en trois niveaux de priorité. Résultat : 800 établissements classés en tier 1, identifiés et prêts à être travaillés immédiatement.",
      '',
    ),
    etape(
      "Séquences d'automatisation",
      "Dès qu'un contact partage son email, il entre dans un workflow de relance automatique. La séquence est pensée pour qu'aucun lead ne soit jamais laissé sans suivi.",
      '',
    ),
    etape(
      'Onboarding commercial standardisé',
      "L'ensemble du setup est conçu pour être reproductible. Un nouveau commercial peut être opérationnel dès J1 sans dépendre du legacy des fondateurs.",
      '',
    ),
  ],

  resultatsTexte: "Hoppi dispose désormais de 800 prospects tier 1 identifiés et activables dès J1. Un nouveau commercial peut démarrer sans dépendre des fondateurs. Le temps commercial gâché, estimé à environ 2 000 euros par mois, a été éliminé.",

  faq: [
    faqItem(
      'Comment segmenter son marché avant de prospecter ?',
      "Luphy définit des critères précis : type d'établissement, zone géographique, taille. Hoppi a ainsi identifié 800 établissements prioritaires (tier 1) dès le démarrage.",
    ),
    faqItem(
      "Qu'est-ce qu'un onboarding commercial reproductible ?",
      "Un processus documenté qui permet à un nouveau commercial d'être opérationnel dès J1, sans dépendre des fondateurs. C'est ce qui a été mis en place pour Hoppi.",
    ),
  ],

  metaDescription: "Hoppi structure 800 prospects tier 1 avec HubSpot dès J1. Séquences automatiques, onboarding reproductible. Infrastructure commerciale posée par Luphy.",
}

// ─── SUPPRESSION DU DOCUMENT TEST ────────────────────────────────────────────
async function deleteTestDoc() {
  const testId = await client.fetch(
    `*[_type == "casClient" && slug.current == "test-etude-de-cas"][0]._id`
  )
  if (testId) {
    await client.delete(testId)
    console.log('✓ Document test-etude-de-cas supprimé')
  } else {
    console.log('  (pas de document test à supprimer)')
  }
}

// ─── MIGRATION ───────────────────────────────────────────────────────────────
await deleteTestDoc()

const docs = [allyum, fundora, hoppi]
for (const doc of docs) {
  process.stdout.write(`→ Migration ${doc.client} (${doc._id})... `)
  try {
    const result = await client.createOrReplace(doc)
    console.log(`✓ (révision ${result._rev?.slice(0, 8)})`)
  } catch (err) {
    console.error(`✗ ERREUR: ${err.message}`)
    process.exit(1)
  }
}

console.log('\n✓ Migration terminée. Allyum, Fundora et Hoppi sont dans Sanity (v2).')
