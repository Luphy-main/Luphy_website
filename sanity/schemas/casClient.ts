import { defineField, defineType } from 'sanity'

export const casClient = defineType({
  name: 'casClient',
  title: 'Étude de cas',
  type: 'document',
  fields: [
    // ── Identité ──────────────────────────────────────────────────────────────
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
      name: 'logo',
      title: 'Logo client',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageCouverture',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string', validation: r => r.required() }),
        defineField({ name: 'legende', title: 'Légende (optionnelle)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'titreAccent',
      title: 'Partie du titre en accent (couleur bleue — laisser vide pour auto)',
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
          { title: 'Fintech', value: 'Fintech' },
          { title: 'Startup / Scale-up', value: 'Startup / Scale-up' },
        ],
      },
    }),
    defineField({
      name: 'pole',
      title: 'Pôle (détermine le CTA)',
      type: 'string',
      options: {
        list: [
          { title: 'Performance commerciale', value: 'commercial' },
          { title: 'Performance opérationnelle', value: 'operationnel' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'outils',
      title: 'Outils déployés',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ── Contenu principal ─────────────────────────────────────────────────────
    defineField({
      name: 'titre',
      title: 'Titre résultat (client + résultat chiffré, max 70 car.)',
      type: 'string',
      validation: r => r.required().max(70),
    }),
    defineField({
      name: 'enBref',
      title: 'En bref (60-120 mots — réponse directe, obligatoire)',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
    }),
    defineField({
      name: 'chapeau',
      title: 'Chapeau court (carte de liste, max 200 car.)',
      type: 'text',
      rows: 2,
      validation: r => r.max(200),
    }),

    // ── Fiche projet ──────────────────────────────────────────────────────────
    defineField({ name: 'taille', title: 'Taille (ex : 4 associés)', type: 'string' }),
    defineField({ name: 'duree', title: 'Durée de la mission', type: 'string' }),
    defineField({ name: 'periode', title: 'Période (ex : T1 2025)', type: 'string' }),
    defineField({ name: 'perimetre', title: 'Périmètre de la mission', type: 'string' }),

    // ── KPIs ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'kpis',
      title: 'KPIs (2 à 4) — le 1er sert de KPI principal sur la carte de liste',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'valeur', title: 'Valeur (ex : x2, 50, ½)', type: 'string' }),
            defineField({ name: 'unite', title: 'Unité (ex : %, €) — laisser vide si dans la valeur', type: 'string' }),
            defineField({ name: 'libelle', title: 'Libellé', type: 'string' }),
            defineField({ name: 'source', title: 'Source / période', type: 'string' }),
          ],
          preview: { select: { title: 'valeur', subtitle: 'libelle' } },
        },
      ],
    }),

    // ── Verbatim ──────────────────────────────────────────────────────────────
    defineField({ name: 'verbatim', title: 'Verbatim client (citation exacte)', type: 'text', rows: 4 }),
    defineField({ name: 'verbatimAuteur', title: 'Auteur du verbatim', type: 'string' }),
    defineField({ name: 'verbatimFonction', title: 'Fonction', type: 'string' }),

    // ── Enjeux ────────────────────────────────────────────────────────────────
    defineField({
      name: 'enjeux',
      title: 'Enjeux identifiés (3 recommandés)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre court (3-4 mots)', type: 'string' }),
            defineField({ name: 'texte', title: 'Texte (1 phrase)', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'titre', subtitle: 'texte' } },
        },
      ],
    }),

    // ── Étapes de la solution ─────────────────────────────────────────────────
    defineField({
      name: 'etapes',
      title: 'Étapes de la solution (3 à 5)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: "Titre de l'étape", type: 'string' }),
            defineField({ name: 'texte', title: 'Texte (2 phrases max)', type: 'text', rows: 3 }),
            defineField({ name: 'livrable', title: 'Livrable (optionnel)', type: 'string' }),
          ],
          preview: { select: { title: 'titre', subtitle: 'texte' } },
        },
      ],
    }),

    // ── Résultats en texte ────────────────────────────────────────────────────
    defineField({
      name: 'resultatsTexte',
      title: 'Résultats en texte (reprend les chiffres pour les IA)',
      type: 'text',
      rows: 3,
    }),

    // ── FAQ ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'FAQ (2 à 4 questions)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    // ── Méta ──────────────────────────────────────────────────────────────────
    defineField({ name: 'auteur', title: 'Auteur (byline)', type: 'string' }),
    defineField({ name: 'datePublication', title: 'Date de publication', type: 'date' }),
    defineField({ name: 'dateMiseAJour', title: 'Date de mise à jour', type: 'date' }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description SEO (max 155 car.)',
      type: 'text',
      rows: 2,
      validation: r => r.max(160),
    }),

    // ── Organisation ──────────────────────────────────────────────────────────
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number' }),
    defineField({ name: 'aLaUne', title: 'À la une (grande carte en tête de liste)', type: 'boolean' }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'secteur' },
  },
})
