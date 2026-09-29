/**
 * Migration Sanity : Allyum, Fundora, Hoppi
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
  if (!match) throw new Error('SANITY_WRITE_TOKEN introuvable dans .env.local — colle-le d\'abord.')
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

function block(style, text) {
  return {
    _type: 'block',
    _key: k(),
    style,
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function resultat(metrique, label) {
  return { _key: k(), metrique, label }
}

// ─── ALLYUM ─────────────────────────────────────────────────────────────────
const allyum = {
  _id: 'cas-client-allyum',
  _type: 'casClient',
  client: 'Allyum',
  slug: { _type: 'slug', current: 'allyum' },
  secteur: 'Boutique M&A',
  ordre: 1,
  titre: "Vingt ans d'excellence opérationnelle : Allyum structure enfin son commercial",
  chapeau: "Boutique M&A premium small/mid cap. Pipeline doublé en 6 mois, 50 % des leads suivis systématiquement.",
  enjeux: [
    "Deux décennies sans démarche commerciale structurée : chaque partenaire prospectait à sa façon, sans coordination ni standardisation.",
    "50 % des leads potentiellement perdus : dans un métier à cycles longs de 18 à 36 mois, l'oubli d'un contact peut coûter un mandat.",
    "Scaling impossible sans infrastructure : nouvelle directrice recrutée, besoin d'un onboarding reproductible dès J1.",
  ],
  solution: [
    block('h3', "01. L'audit commercial : la pièce maîtresse"),
    block('normal', "Phase de travail structurée pour formaliser, pour la première fois collectivement, les étapes du chemin prospect d'Allyum. Identification des documents existants, des pratiques en vigueur chez chaque partenaire, des points de friction. Résultat : des process documentés, réutilisables à chaque onboarding, et une réflexion stratégique dont la valeur dépasse largement le setup HubSpot."),
    block('h3', '02. Structuration du pipeline par stade'),
    block('normal', "Mise en place d'un pipeline reflétant fidèlement le cycle de vente d'une boutique M&A : leads long terme, phases d'attente prolongées, deals à probabilité variable. Le circuit d'attente devient un actif géré et non plus une liste de leads qu'on espère se rappeler."),
    block('h3', '03. Séquences de relance et suivi systématisé'),
    block('normal', "Rappels et tâches automatiques à chaque étape du cycle. Tous les mardis matin, les partenaires passent en revue leur CRM et relancent sans rien laisser passer. Chaque contact devient une opportunité systématiquement traitée au bon moment."),
    block('h3', '04. Onboarding standardisé et kick-off équipe'),
    block('normal', "L'ensemble du setup est conçu pour être reproductible. La directrice recrutée est opérationnelle dès J1 sans dépendre du legacy des fondateurs. Le kick-off organisé en présence de Luphy a crédibilisé la démarche en interne."),
  ],
  resultats: [
    resultat('x2', 'les leads entrants doublés en 6 mois dans le pipeline'),
    resultat('50%', "du pipeline en circuit d'attente systématiquement suivi : zéro lead oublié"),
    resultat('½', 'commercial : capacité équivalente gagnée sans recrutement'),
  ],
  verbatim: "C'est comme si on avait engagé un demi-commercial. On a fait l'économie d'un demi-biz commercial parce que maintenant, on arrive à le faire nous-mêmes de manière vraiment hyper fluide et efficiente.",
  verbatimAuteur: 'Martin Delépine',
  verbatimFonction: 'Associé',
  metaDescription: "Boutique M&A Allyum : HubSpot déployé par Luphy, pipeline doublé en 6 mois, 50 % des leads suivis systématiquement. Étude de cas.",
}

// ─── FUNDORA ─────────────────────────────────────────────────────────────────
const fundora = {
  _id: 'cas-client-fundora',
  _type: 'casClient',
  client: 'Fundora',
  slug: { _type: 'slug', current: 'fundora' },
  ordre: 2,
  titre: "D'Airtable + notes iPhone à HubSpot : la single source of truth investisseur",
  chapeau: "Plateforme d'investissement B2C. HubSpot configuré end-to-end, 4 outils intégrés, 100 % d'autonomie équipe.",
  enjeux: [
    "HubSpot souscrit mais non configuré : non actionnable, inutilisable au quotidien par l'équipe.",
    "Données fragmentées sur trois outils en parallèle : Airtable, spreadsheets Excel et notes iPhone.",
    "Aucun champ uniformisé entre les contacts, aucune vue partagée sur le pipeline investisseur.",
  ],
  solution: [
    block('h3', '01. Modélisation des personas investisseurs'),
    block('normal', "Définition des types de contacts et de transactions spécifiques à la plateforme Fundora, en repartant de leurs enjeux business réels, pas d'un template prédéfini."),
    block('h3', '02. Fiches contact et transaction personnalisées'),
    block('normal', "Configuration des propriétés pour remonter les signaux clés : inscription sur la plateforme, historique d'investissements, segment investisseur. Uniformisation de tous les champs entre contacts."),
    block('h3', '03. Pipeline de transactions sur mesure'),
    block('normal', "Ajusté au cycle réel de Fundora, moins d'étapes que le B2B classique, mais tout aussi important. Gestion conjointe du pipe actif et du nurturing dans une vue unifiée."),
    block('h3', '04. Intégration API custom avec la plateforme propriétaire'),
    block('normal', "Pas de connecteur standard disponible. L'intégration a été construite sur mesure pour synchroniser la donnée en continu entre la plateforme Fundora et HubSpot."),
    block('h3', '05. Migration Airtable + synchronisation Brevo'),
    block('normal', "Réimportation de l'historique Airtable sans perte de donnée. Synchronisation de toutes les campagnes Brevo et communications entrantes/sortantes pour faire de HubSpot la single source of truth."),
  ],
  resultats: [
    resultat('1', 'seul outil au quotidien : HubSpot remplace tout'),
    resultat('4', 'outils intégrés à HubSpot'),
    resultat('100%', "autonomie de l'équipe sur le CRM au quotidien"),
  ],
  verbatim: "C'est un changement radical : avant on avait rien, maintenant on a quelque chose qui fonctionne très bien. On s'en sert full-time, c'est quasiment le seul outil servant dans la boîte.",
  verbatimAuteur: 'Benoît Feron',
  verbatimFonction: 'Fondateur',
  metaDescription: "Fundora : de zéro à HubSpot comme single source of truth investisseur. Configuration end-to-end, intégration API custom, 4 outils synchronisés. Étude de cas Luphy.",
}

// ─── HOPPI ───────────────────────────────────────────────────────────────────
const hoppi = {
  _id: 'cas-client-hoppi',
  _type: 'casClient',
  client: 'Hoppi',
  slug: { _type: 'slug', current: 'hoppi' },
  ordre: 3,
  titre: "De zéro à la stratégie commerciale : Hoppi bâtit sa machine de vente sur HubSpot",
  chapeau: "Startup go-to-market rapide. 800 prospects tiers 1 activables dès J1, temps commercial gâché quasi éliminé.",
  enjeux: [
    "Prospection sans coordination : doublons de démarchage, aucune visibilité partagée sur les établissements déjà contactés.",
    "~2 000 €/mois de temps commercial gâché : 30 % du temps des commerciaux perdu sans outil de suivi.",
    "Turnover commercial causé par une mauvaise infrastructure, pas par de mauvais recrutements.",
  ],
  solution: [
    block('h3', "01. L'audit commercial : la pièce maîtresse"),
    block('normal', "Phase d'audit structurée pour répondre à une question simple : comment Hoppi vend-il, à qui, et dans quel ordre ? Pour une équipe qui n'a jamais formalisé ses process, c'est souvent la première fois que ces questions sont posées collectivement. Résultat : des process documentés, réutilisables à l'onboarding de chaque nouveau commercial."),
    block('h3', '02. Segmentation tiers 1 / 2 / 3'),
    block('normal', "Sur la base de critères métier précis (type d'établissement, zone géographique, taille), tout le marché adressable a été segmenté en trois niveaux de priorité. Concrètement : 800 établissements classés en tiers 1, identifiés et prêts à être travaillés immédiatement. Un commercial qui rejoint Hoppi n'a pas à se demander par où commencer."),
    block('h3', "03. Séquences d'automatisation : la boucle infinie"),
    block('normal', "Dès qu'un contact partage son email, il entre dans un workflow de relance automatique. La séquence est pensée pour qu'aucun lead ne soit jamais laissé sans suivi. L'effet de levier est immédiat : chaque email récupéré devient une opportunité systématiquement traitée."),
    block('h3', '04. Onboarding commercial standardisé et scalable'),
    block('normal', "L'ensemble du setup est conçu pour être reproductible. Un nouveau commercial peut être opérationnel dès J1 sans dépendre du legacy des fondateurs. D'autant plus important qu'Hoppi prépare son expansion internationale."),
  ],
  resultats: [
    resultat('800', 'prospects tiers 1 identifiés et activables dès J1'),
    resultat('J1', 'nouveau commercial opérationnel sans dépendre des fondateurs'),
    resultat('~2k€', 'par mois de temps commercial gâché éliminé'),
  ],
  verbatim: "Tu as apporté l'élément fondateur de notre stratégie commerciale et de l'exécution de cette stratégie. Sans ça c'était à l'arrache. On pouvait construire une stratégie commerciale, mais son exécution était approximative parce qu'il n'y avait rien qui permettait aux commerciaux d'attaquer et d'exécuter.",
  verbatimAuteur: 'Arthur Sevestre',
  verbatimFonction: 'Co-fondateur',
  metaDescription: "Hoppi : de zéro à 800 prospects tiers 1 activables dès J1. Déploiement HubSpot from scratch par Luphy. Étude de cas startup go-to-market.",
}

// ─── MIGRATION ───────────────────────────────────────────────────────────────
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

console.log('\n✓ Migration terminée. Allyum, Fundora et Hoppi sont dans Sanity.')
