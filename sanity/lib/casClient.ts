// Études de cas clients : utilitaires partagés par la liste (/cas-clients) et la fiche détail.

// Secteurs des études de cas et des témoignages (valeur = libellé), dans l'ordre d'affichage du filtre
export const SECTEURS = [
  "Fonds d'investissement",
  'Family office',
  "Boutique M&A / banque d'affaires",
  'Conseil financier (dette, levée de fonds)',
  'Société de gestion / gestion de patrimoine',
  "Plateforme d'investissement / Fintech",
  'Écosystème marchés privés',
  'Cabinet de conseil',
  'Industrie et services',
  'Startup / Scale-up',
  'Art & luxe',
]

export type Localisation = { ville?: string; pays?: string }

// « Paris, France » ; une seule des deux valeurs si l'autre est vide ; null si rien
export function formatLocalisation(l?: Localisation | null): string | null {
  const parts = [l?.ville, l?.pays].map(s => s?.trim()).filter(Boolean)
  return parts.length ? parts.join(', ') : null
}
