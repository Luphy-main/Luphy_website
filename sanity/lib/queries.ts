import { groq } from 'next-sanity'

// Cas d'usage
export const CAS_USAGE_LIST = groq`
  *[_type == "casUsage"] | order(datePublication desc) {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    secteur,
    description,
    datePublication,
  }
`

export const CAS_USAGE_SLUGS = groq`
  *[_type == "casUsage" && defined(slug.current)][].slug.current
`

export const CAS_USAGE_BY_SLUG = groq`
  *[_type == "casUsage" && slug.current == $slug][0] {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    secteur,
    description,
    contenu,
    metaDescription,
    datePublication,
  }
`

// Études de cas clients
export const CAS_CLIENTS_LIST = groq`
  *[_type == "casClient"] | order(ordre asc, client asc) {
    _id,
    client,
    "slug": slug.current,
    secteur,
    titre,
    chapeau,
    logo,
    ordre,
  }
`

export const CAS_CLIENT_BY_SLUG = groq`
  *[_type == "casClient" && slug.current == $slug][0] {
    _id,
    client,
    "slug": slug.current,
    secteur,
    titre,
    chapeau,
    logo,
    enjeux,
    solution,
    resultats,
    verbatim,
    verbatimAuteur,
    verbatimFonction,
    metaDescription,
  }
`

// Témoignages
export const TEMOIGNAGES_LIST = groq`
  *[_type == "temoignage"] | order(ordre asc) {
    _id,
    quote,
    auteur,
    fonction,
    entreprise,
    secteur,
    sujet,
    ordre,
  }
`

// Articles
export const ARTICLES_LIST = groq`
  *[_type == "article"] | order(datePublication desc) {
    _id,
    titre,
    "slug": slug.current,
    chapeau,
    datePublication,
    categorie,
    imageOg,
    metaDescription,
  }
`

export const ARTICLE_SLUGS = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`

export const ARTICLE_BY_SLUG = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    titre,
    "slug": slug.current,
    chapeau,
    contenu,
    datePublication,
    categorie,
    imageOg,
    metaDescription,
  }
`
