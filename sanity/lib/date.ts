// Date du jour à Paris au format AAAA-MM-JJ (comparable aux champs Sanity de type date)
export const aujourdhuiParis = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())

// dateModified du JSON-LD : la date de mise à jour éditoriale si elle est postérieure à la publication,
// sinon la dernière modification Sanity (_updatedAt), jamais antérieure à la publication
// (un contenu programmé est souvent modifié avant sa date de publication).
// Comparaison de chaînes ISO : '2026-11-10T16:37:09Z' > '2026-11-02'.
export function dateDeModification(dateMiseAJour?: string, updatedAt?: string, datePublication?: string) {
  const apresPublication = (d?: string) => d && (!datePublication || d > datePublication) ? d : undefined
  return apresPublication(dateMiseAJour) ?? apresPublication(updatedAt) ?? datePublication
}
