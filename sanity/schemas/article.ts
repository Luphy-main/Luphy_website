import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'chapeau',
      title: 'Chapeau (intro courte)',
      type: 'text',
      rows: 3,
      validation: r => r.required().max(300),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'Lien',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url' }),
                  defineField({ name: 'blank', title: 'Ouvrir dans un nouvel onglet', type: 'boolean', initialValue: true }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
            defineField({ name: 'caption', title: 'Légende', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'date',
      validation: r => r.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'CRM', value: 'CRM' },
          { title: 'IA', value: 'IA' },
          { title: 'Automatisation', value: 'Automatisation' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Méthode', value: 'Méthode' },
        ],
      },
    }),
    defineField({
      name: 'imageOg',
      title: 'Image OG (1200x630)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description SEO',
      type: 'text',
      rows: 2,
      validation: r => r.max(160),
    }),
  ],
  orderings: [
    { title: 'Date de publication (récent)', name: 'dateDesc', by: [{ field: 'datePublication', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'datePublication' },
  },
})
