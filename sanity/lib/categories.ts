// Catégories d'articles : liste fixe partagée par le Studio (schéma article) et le site (filtre /ressources).
// `titre` est la valeur enregistrée dans Sanity et affichée ; `slug` est utilisé dans l'URL (?categorie=crm).
export const CATEGORIES_ARTICLE = [
  { titre: 'Opérations financières', slug: 'operations-financieres' },
  { titre: 'Transformation digitale', slug: 'transformation-digitale' },
  { titre: 'CRM', slug: 'crm' },
  { titre: 'IA & automatisation', slug: 'ia-automatisation' },
] as const

// Un article de cette catégorie relié à une édition est présenté comme « l'opération » de l'édition
export const CATEGORIE_OPERATION = 'Opérations financières'
