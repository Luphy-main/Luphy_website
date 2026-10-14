import { defineField, defineType } from 'sanity'

export const editionNL = defineType({
  name: 'editionNL',
  title: 'Édition de la newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'numero',
      title: 'Numéro',
      type: 'number',
      description: "Utilisé dans l'URL : /ressources/newsletter/<numéro>",
      validation: r =>
        r.required().integer().min(1).custom(async (numero, context) => {
          if (numero == null) return true
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')
          const doublons = await context
            .getClient({ apiVersion: '2024-01-01' })
            .fetch<number>('count(*[_type == "editionNL" && numero == $numero && !(_id in [$id, $draft])])', {
              numero,
              id,
              draft: `drafts.${id}`,
            })
          return doublons === 0 || `Le numéro ${numero} est déjà utilisé par une autre édition`
        }),
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'date',
    }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'lienLinkedIn',
      title: "Lien LinkedIn de l'édition",
      type: 'url',
    }),
    defineField({
      name: 'introduction',
      title: 'Courte introduction',
      type: 'text',
      rows: 4,
    }),
  ],
  orderings: [
    { title: 'Numéro (récent)', name: 'numeroDesc', by: [{ field: 'numero', direction: 'desc' }] },
  ],
  preview: {
    select: { numero: 'numero', titre: 'titre', date: 'datePublication' },
    prepare: ({ numero, titre, date }) => ({
      title: `N° ${numero ?? '?'}${titre ? ` : ${titre}` : ''}`,
      subtitle: date,
    }),
  },
})
