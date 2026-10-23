import { defineField, defineType } from 'sanity'

// Document unique (id fixe « reglagesAgentSujets »), lu par l'agent Sujets, non affiché sur le site
export const reglagesAgentSujets = defineType({
  name: 'reglagesAgentSujets',
  title: "Réglages de l'agent Sujets",
  type: 'document',
  fields: [
    defineField({
      name: 'modeAutomatique',
      title: "Mode automatique (veto) de l'agent Sujets",
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'commentaire',
      title: 'Commentaire',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages de l'agent Sujets" }),
  },
})
