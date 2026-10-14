import type { PortableTextBlock } from '@portabletext/react'
import { client } from './client'
import { EQUIPE_LIST } from './queries'
import { urlFor } from './image'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL, SITE_URL } from '@/lib/constants'

export interface MembreEquipe {
  _id: string
  nom: string
  photo?: { asset?: { _ref?: string }; alt?: string; hotspot?: { x: number; y: number } }
  fonction?: string
  titreOfficiel?: string
  formation?: string[]
  courteDescription?: string
  bioLongue?: PortableTextBlock[]
  domaines?: string[]
  pole?: 'commercial' | 'operationnel'
  linkedin?: string
  fondateur?: boolean
}

// Membres visibles, triés par ordre. Une erreur Sanity ne doit pas casser les pages qui affichent l'équipe.
// revalidate sur la requête : le JSON-LD founder (SchemaOrg) est aussi rendu par des pages sans `export const revalidate`.
export async function getEquipe(): Promise<MembreEquipe[]> {
  try {
    return (await client.fetch<MembreEquipe[]>(EQUIPE_LIST, {}, { next: { revalidate: 3600 } })) ?? []
  } catch {
    return []
  }
}

// « Titouan Galpin » → { prenom: 'Titouan', nomFamille: 'Galpin' }
export function decouperNom(nom: string) {
  const i = nom.indexOf(' ')
  return i === -1 ? { prenom: nom, nomFamille: '' } : { prenom: nom.slice(0, i), nomFamille: nom.slice(i + 1) }
}

export function photoMembre(m: MembreEquipe) {
  if (!m.photo?.asset) return null
  const h = m.photo.hotspot
  return {
    src: urlFor(m.photo).url(),
    alt: m.photo.alt ?? m.nom,
    // Sans point focal défini dans le Studio, cadrage historique : centré en haut
    objectPosition: h ? `${h.x * 100}% ${h.y * 100}%` : 'center top',
  }
}

export function ctaMembre(m: MembreEquipe) {
  if (m.pole === 'commercial') return CTA_COMMERCIAL
  if (m.pole === 'operationnel') return CTA_OPERATIONNEL
  return null
}

// @id stable par personne, partagé entre le JSON-LD de l'organisation (founder) et celui de /equipe
export function personId(nom: string) {
  const slug = nom.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${SITE_URL}/#${slug}`
}

// jobTitle : en pratique le titre officiel (repli sur la fonction affichée), passé par l'appelant
export function personJsonLd(m: MembreEquipe, jobTitle: string | undefined, extra: Record<string, unknown> = {}) {
  const photo = photoMembre(m)
  return {
    '@type': 'Person',
    '@id': personId(m.nom),
    name: m.nom,
    ...(jobTitle && { jobTitle }),
    worksFor: { '@id': `${SITE_URL}/#organization` },
    ...(m.formation?.length ? { alumniOf: m.formation } : {}),
    ...(m.linkedin && { sameAs: m.linkedin }),
    ...(photo && { image: photo.src }),
    ...extra,
  }
}
