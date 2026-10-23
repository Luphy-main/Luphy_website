// Date du jour à Paris au format AAAA-MM-JJ (comparable aux champs Sanity de type date)
export const aujourdhuiParis = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
