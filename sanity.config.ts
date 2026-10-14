'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemas'

const projectId = 'fbdmm8o7'
const dataset = 'production'

export default defineConfig({
  name: 'luphy-website',
  title: 'Luphy — Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem().title("Cas d'usage").schemaType('casUsage').child(S.documentTypeList('casUsage')),
            S.listItem().title('Études de cas clients').schemaType('casClient').child(S.documentTypeList('casClient')),
            S.listItem().title('Témoignages').schemaType('temoignage').child(S.documentTypeList('temoignage')),
            S.listItem().title('Articles').schemaType('article').child(S.documentTypeList('article')),
            S.listItem()
              .title('Équipe')
              .schemaType('membreEquipe')
              .child(S.documentTypeList('membreEquipe').defaultOrdering([{ field: 'ordre', direction: 'asc' }])),
            S.listItem()
              .title('Newsletter')
              .child(
                S.list()
                  .title('Newsletter')
                  .items([
                    S.listItem()
                      .title('Éditions')
                      .schemaType('editionNL')
                      .child(S.documentTypeList('editionNL').defaultOrdering([{ field: 'numero', direction: 'desc' }])),
                    S.listItem()
                      .title('Réglages')
                      .schemaType('reglagesNewsletter')
                      .child(S.document().schemaType('reglagesNewsletter').documentId('reglagesNewsletter')),
                  ]),
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Réglages newsletter : document unique, pas de création depuis le bouton « + »
    templates: prev => prev.filter(t => t.schemaType !== 'reglagesNewsletter'),
  },
})
