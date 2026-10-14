import { defineField, defineType } from 'sanity'

// Document unique (id fixe « reglagesNewsletter »), ouvert depuis la rubrique Newsletter du Studio
export const reglagesNewsletter = defineType({
  name: 'reglagesNewsletter',
  title: 'Réglages de la newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'lienAbonnement',
      title: "Lien d'abonnement LinkedIn",
      type: 'url',
      description: "Ex : https://www.linkedin.com/newsletters/... Le bouton d'abonnement ne s'affiche pas tant que ce champ est vide.",
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages de la newsletter' }),
  },
})
