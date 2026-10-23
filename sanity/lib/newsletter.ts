import { client } from './client'
import { EDITIONS_LIST, EDITION_BY_NUMERO, NEWSLETTER_REGLAGES, visibilite } from './queries'

export type Edition = {
  numero: number
  titre?: string
  datePublication?: string
  introduction?: string
  lienLinkedIn?: string
}

export type EditionDetail = Edition & {
  _id: string
  articles: { _id: string; titre: string; slug: string; chapeau?: string; categorie?: string; datePublication?: string }[]
  casUsage: { _id: string; titre: string; slug: string; description?: string; categorie?: string; client?: string }[]
}

export const getEditions = () => client.fetch<Edition[]>(EDITIONS_LIST, visibilite())

export function getEdition(numero: string) {
  // L'URL doit être un entier positif exact (pas de « 01 », « 1.0 »…) pour éviter les doublons de pages
  if (!/^[1-9]\d*$/.test(numero)) return Promise.resolve(null)
  return client.fetch<EditionDetail | null>(EDITION_BY_NUMERO, { numero: Number(numero), ...visibilite() })
}

export async function getLienAbonnement() {
  const r = await client.fetch<{ lienAbonnement?: string } | null>(NEWSLETTER_REGLAGES)
  return r?.lienAbonnement ?? null
}

export const titreEdition = (e: Edition) => `Newsletter Luphy n° ${e.numero}${e.titre ? ` : ${e.titre}` : ''}`

export const formatDateFr = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
