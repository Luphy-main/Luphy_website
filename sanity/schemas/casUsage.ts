import { defineField, defineType } from 'sanity'

export const casUsage = defineType({
  name: 'casUsage',
  title: "Cas d'usage",
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
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'CRM Affinity', value: 'CRM Affinity' },
          { title: 'CRM DealCloud', value: 'CRM DealCloud' },
          { title: 'CRM HubSpot', value: 'CRM HubSpot' },
          { title: 'CRM Pipedrive', value: 'CRM Pipedrive' },
          { title: 'CRM Notion', value: 'CRM Notion' },
          { title: 'Automatisation', value: 'Automatisation' },
          { title: 'IA Claude', value: 'IA Claude' },
        ],
      },
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
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte (carte)',
      type: 'text',
      rows: 3,
      validation: r => r.max(200),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu détaillé',
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
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description SEO',
      type: 'text',
      rows: 2,
      validation: r => r.max(160),
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'categorie' },
  },
})
