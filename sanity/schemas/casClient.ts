import { defineField, defineType } from 'sanity'

export const casClient = defineType({
  name: 'casClient',
  title: 'Étude de cas',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Nom du client',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'client', maxLength: 96 },
      validation: r => r.required(),
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
      name: 'titre',
      title: "Titre de l'étude",
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'chapeau',
      title: 'Chapeau (court, carte)',
      type: 'text',
      rows: 2,
      validation: r => r.max(200),
    }),
    defineField({
      name: 'logo',
      title: 'Logo client',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'enjeux',
      title: 'Enjeux identifiés',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'solution',
      title: 'Solution déployée',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'resultats',
      title: 'Résultats (métriques)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'metrique', title: 'Chiffre clé (ex: +25%)', type: 'string' }),
            defineField({ name: 'label', title: 'Label (ex: temps prospection)', type: 'string' }),
          ],
          preview: { select: { title: 'metrique', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'verbatim',
      title: 'Verbatim client',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'verbatimAuteur',
      title: 'Auteur du verbatim',
      type: 'string',
    }),
    defineField({
      name: 'verbatimFonction',
      title: 'Fonction',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description SEO',
      type: 'text',
      rows: 2,
      validation: r => r.max(160),
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'secteur' },
  },
})
