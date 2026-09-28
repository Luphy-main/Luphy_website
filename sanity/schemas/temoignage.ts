import { defineField, defineType } from 'sanity'

export const temoignage = defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Verbatim',
      type: 'text',
      rows: 5,
      validation: r => r.required(),
    }),
    defineField({
      name: 'auteur',
      title: 'Prénom Nom',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'fonction',
      title: 'Fonction',
      type: 'string',
    }),
    defineField({
      name: 'entreprise',
      title: 'Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'secteur',
      title: 'Secteur',
      type: 'string',
      options: {
        list: [
          { title: "Fonds d'investissement", value: "Fonds d'investissement" },
          { title: 'Boutique M&A', value: 'Boutique M&A' },
          { title: 'Société de gestion', value: 'Société de gestion' },
          { title: 'Cabinet de conseil', value: 'Cabinet de conseil' },
        ],
      },
    }),
    defineField({
      name: 'sujet',
      title: 'Sujet (ex: Déploiement Affinity)',
      type: 'string',
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'auteur', subtitle: 'entreprise' },
  },
})
