import { groq } from 'next-sanity'

// Newsletter LinkedIn : une édition est affichée si elle est publiée, numérotée et non vide
// (introduction ou au moins un contenu relié). Même règle pour ses pages, le sitemap et llms.txt.
const EDITION_AFFICHABLE = `_type == "editionNL" && defined(numero) && (defined(introduction) || count(*[_type in ["article", "casUsage"] && defined(slug.current) && references(^._id)]) > 0)`

// Cas d'usage
export const CAS_USAGE_LIST = groq`
  *[_type == "casUsage"] | order(datePublication desc) {
    _id,
    titre,
    "slug": slug.current,
    client,
    categorie,
    secteur,
    outils,
    kpis,
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
    client,
    categorie,
    secteur,
    outils,
    kpis,
    enBref,
    description,
    contenu,
    auteur,
    metaDescription,
    datePublication,
    dateMiseAJour,
    "edition": editionNL->{ numero, lienLinkedIn },
  }
`

// Études de cas clients
export const CAS_CLIENTS_LIST = groq`
  *[_type == "casClient"] | order(ordre asc, client asc) {
    _id,
    client,
    "slug": slug.current,
    secteur,
    pole,
    outils,
    titre,
    chapeau,
    logo,
    imageCouverture,
    ordre,
    aLaUne,
    "kpiPrincipal": kpis[0],
  }
`

export const CAS_CLIENTS_SLUGS = groq`
  *[_type == "casClient" && defined(slug.current)][].slug.current
`

export const CAS_CLIENT_BY_SLUG = groq`
  *[_type == "casClient" && slug.current == $slug][0] {
    _id,
    client,
    "slug": slug.current,
    secteur,
    pole,
    outils,
    titre,
    enBref,
    chapeau,
    logo,
    imageCouverture,
    titreAccent,
    taille,
    duree,
    periode,
    perimetre,
    kpis,
    verbatim,
    verbatimAuteur,
    verbatimFonction,
    enjeux,
    etapes,
    resultatsTexte,
    faq,
    auteur,
    datePublication,
    dateMiseAJour,
    metaDescription,
    ordre,
    aLaUne,
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
    lienCasClient,
    miseEnAvant,
    ordre,
  }
`

export const TEMOIGNAGES_FEATURED = groq`
  *[_type == "temoignage" && miseEnAvant == true] | order(ordre asc) {
    _id,
    quote,
    auteur,
    fonction,
    entreprise,
    lienCasClient,
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

// llms.txt et sitemap : pages détail publiées, avec une ligne de description
export const LLMS_CONTENT = groq`{
  "casClients": *[_type == "casClient" && defined(slug.current)] | order(ordre asc, client asc) {
    titre, "slug": slug.current, "description": coalesce(metaDescription, chapeau)
  },
  "casUsage": *[_type == "casUsage" && defined(slug.current)] | order(datePublication desc) {
    titre, "slug": slug.current, "description": coalesce(metaDescription, description)
  },
  "articles": *[_type == "article" && defined(slug.current)] | order(datePublication desc) {
    titre, "slug": slug.current, "description": coalesce(chapeau, metaDescription)
  },
  "editions": *[${EDITION_AFFICHABLE}] | order(numero desc) {
    numero, titre, "description": introduction
  }
}`

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
    auteur,
    datePublication,
    categorie,
    imageOg,
    metaDescription,
    "edition": editionNL->{ numero, lienLinkedIn },
  }
`

// Newsletter LinkedIn : éditions affichables (voir EDITION_AFFICHABLE), contenus liés et réglages
export const EDITIONS_LIST = groq`
  *[${EDITION_AFFICHABLE}] | order(numero desc) {
    numero,
    titre,
    datePublication,
    introduction,
    lienLinkedIn,
  }
`

export const EDITION_BY_NUMERO = groq`
  *[${EDITION_AFFICHABLE} && numero == $numero][0] {
    _id,
    numero,
    titre,
    datePublication,
    introduction,
    lienLinkedIn,
    "articles": *[_type == "article" && defined(slug.current) && references(^._id)] | order(datePublication desc) {
      _id, titre, "slug": slug.current, chapeau, categorie, datePublication
    },
    "casUsage": *[_type == "casUsage" && defined(slug.current) && references(^._id)] | order(datePublication desc) {
      _id, titre, "slug": slug.current, description, categorie, client
    },
  }
`

export const NEWSLETTER_REGLAGES = groq`
  *[_id == "reglagesNewsletter"][0] { lienAbonnement }
`

// Équipe (membres visibles)
export const EQUIPE_LIST = groq`
  *[_type == "membreEquipe" && visible != false] | order(ordre asc) {
    _id,
    nom,
    photo,
    fonction,
    titreOfficiel,
    formation,
    courteDescription,
    bioLongue,
    domaines,
    pole,
    linkedin,
    fondateur,
  }
`
