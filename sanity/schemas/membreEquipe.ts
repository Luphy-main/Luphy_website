import { defineArrayMember, defineField, defineType } from 'sanity'

export const membreEquipe = defineType({
  name: 'membreEquipe',
  title: "Membre de l'équipe",
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Prénom Nom',
      type: 'string',
      description: 'Le premier mot est affiché comme prénom, le reste en gras',
      validation: r => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string', validation: r => r.required() }),
      ],
    }),
    defineField({
      name: 'fonction',
      title: 'Titre / fonction',
      type: 'string',
    }),
    defineField({
      name: 'titreOfficiel',
      title: 'Titre officiel (données structurées)',
      type: 'string',
      description: 'jobTitle déclaré pour les co-fondateurs dans le JSON-LD de toutes les pages. Ex : Co-fondateur & Président',
    }),
    defineField({
      name: 'formation',
      title: 'Formation (écoles)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Une école par ligne, déclarée en alumniOf dans les données structurées',
    }),
    defineField({
      name: 'courteDescription',
      title: 'Courte description',
      type: 'text',
      rows: 4,
      description: 'Affichée sur /expertise-finance, et sur /equipe si la bio longue est vide',
      validation: r => r.max(300),
    }),
    defineField({
      name: 'bioLongue',
      title: 'Bio longue (optionnelle)',
      type: 'array',
      description: 'Affichée sur /equipe',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'domaines',
      title: 'Domaines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'pole',
      title: 'Pôle (détermine le bouton de prise de rendez-vous)',
      type: 'string',
      options: {
        list: [
          { title: 'Performance commerciale', value: 'commercial' },
          { title: 'Performance opérationnelle', value: 'operationnel' },
        ],
      },
    }),
    defineField({
      name: 'linkedin',
      title: 'URL LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'fondateur',
      title: 'Co-fondateur',
      type: 'boolean',
      initialValue: false,
      description: 'Déclaré comme fondateur dans les données structurées et affiché sur /expertise-finance',
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'visible',
      title: 'Visible sur le site',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nom', subtitle: 'fonction', media: 'photo' },
  },
})
