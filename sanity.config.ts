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
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
