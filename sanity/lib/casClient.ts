// Études de cas clients : utilitaires partagés par la liste (/cas-clients) et la fiche détail.

export type Localisation = { ville?: string; pays?: string }

// « Paris, France » ; une seule des deux valeurs si l'autre est vide ; null si rien
export function formatLocalisation(l?: Localisation | null): string | null {
  const parts = [l?.ville, l?.pays].map(s => s?.trim()).filter(Boolean)
  return parts.length ? parts.join(', ') : null
}
