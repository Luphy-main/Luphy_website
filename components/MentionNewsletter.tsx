// Fin de page d'un article ou d'un cas d'usage relié à une édition de la newsletter LinkedIn.
// Simple mention avec lien : pas de canonical vers LinkedIn, la page du site reste la version de référence.
type Props = { edition?: { numero?: number; lienLinkedIn?: string } | null; maxWidth: number }

export default function MentionNewsletter({ edition, maxWidth }: Props) {
  if (!edition?.numero) return null
  const libelle = 'la newsletter Luphy sur LinkedIn'
  return (
    <section style={{ paddingBottom: 32 }}>
      <div className="container" style={{ maxWidth }}>
        <p className="mention-nl">
          Publié initialement dans{' '}
          {edition.lienLinkedIn ? (
            <a href={edition.lienLinkedIn} target="_blank" rel="noopener">{libelle}</a>
          ) : (
            libelle
          )}{' '}
          (n° {edition.numero})
        </p>
      </div>
    </section>
  )
}
