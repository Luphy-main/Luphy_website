# CLAUDE.md – Site Luphy (www.luphy.io)

Site vitrine + ressources de Luphy. Next.js 15 (App Router, TypeScript, Tailwind CSS), contenus éditoriaux gérés dans Sanity.
Propriétaire : Tristan (Président Luphy). Répondre en français.

## Infrastructure
- **Code** : GitHub `Luphy-main/Luphy_website`, branche de production `main`
- **Hébergement** : Vercel, équipe « Luphy's projects » (Pro), projet `luphy-website-march26` (`vercel.json` : `framework: nextjs`)
- **Domaine** : luphy.io chez IONOS (DNS : A `@` → 216.150.1.1, CNAME `www` → Vercel). `luphy.io` redirige (308) vers `www.luphy.io`
- **CMS** : Sanity (projet `fbdmm8o7`, dataset `production`), Studio intégré sur `/studio`
- Chaque push sur `main` = mise en production automatique. Chaque push sur une autre branche = URL de prévisualisation Vercel

## ⚠️ Règles de publication – à lire avant toute modification
- Par défaut, tout reste en local et se vérifie sur http://localhost:3000. **Ne jamais push sans accord explicite de Tristan.**
- Déclencheurs acceptés : « push », « publie », « mets en ligne », « deploy », « ship it ».
- « C'est bien », « parfait », « ok » ne sont PAS des déclencheurs de publication.
- Pour une modification importante (nouvelle page, refonte) : travailler sur une branche (`feat/...`), push la branche, donner l'URL de preview Vercel, puis merger dans `main` seulement après validation.
- Petite correction de texte validée : commit direct sur `main` possible si Tristan le demande.
- Messages de commit clairs, format `feat: ...` / `fix: ...`.
- Toujours lancer `npm run build` avant de committer : il doit passer.
- En cas de doute : demander.

## Commandes
- `npm run dev` → serveur local http://localhost:3000 (le lancer en arrière-plan, une seule instance)
- `npm run build` → build de production (vérifie aussi les types)
- `npm run lint`

## Variables d'environnement
- Locales dans `.env.local` (ignoré par git, modèle dans `.env.local.example`). À déclarer aussi dans Vercel.
- `SANITY_WRITE_TOKEN` : scripts d'import/patch Sanity (`scripts/`)
- `SANITY_REVALIDATE_SECRET` : secret du webhook Sanity
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` : optionnels (valeurs par défaut dans `sanity/lib/client.ts`)

## Structure
- `app/` : une route = un dossier avec `page.tsx`. `app/layout.tsx` contient le layout racine (polices, métadonnées par défaut, script Midbound, Vercel Analytics).
  - Offres : `performance-commerciale/` (crm et ses sous-pages par outil, outbound), `performance-operationnelle/` (ia, automatisation), `formation/`, `secteurs/`
  - Contenus Sanity : `cas-clients/`, `cas-usage/`, `temoignages/`, `ressources/` (listes + `[slug]`)
  - Autres : `methode`, `equipe`, `expertise-finance`, `faq`, `contact`, `sitemap.ts`, `robots.ts`, `not-found.tsx`
  - `api/revalidate/route.ts` : webhook Sanity, `POST /api/revalidate?secret=...`, revalide tout le site
  - `studio/` : Sanity Studio
- `components/` : `Header`, `Footer` (injectés par `ConditionalLayout`, sauf sur `/studio`), `SchemaOrg`, gabarits de pages détail (`CasClientDetailPage`, `ArticleDetailPage`, `CrmPageLayout`)…
- `lib/constants.ts` : URL du site, nom, description, image OG, URL du script Midbound
- `sanity/` : client (`useCdn: false`), requêtes GROQ (`lib/queries.ts`), schémas (`casUsage`, `casClient`, `temoignage`, `article`)
- `scripts/` : scripts ponctuels de migration/patch Sanity
- `next.config.ts` : redirections 301 des anciennes URL du site statique (`/crm`, `/blog`, `/case-study-*`, `*.html`…)

## Contenu
- Site en français uniquement.
- Les pages alimentées par Sanity utilisent `export const revalidate = 3600` (ISR) ; le webhook rafraîchit immédiatement après publication.
- Nouveau cas client, cas d'usage, témoignage ou article : le créer dans Sanity (`/studio`), pas dans le code.
- Ne jamais utiliser de tiret cadratin (—) dans les textes du site.

## Charte & design
- Toujours partir des pages et composants existants : réutiliser `Header`, `Footer`, classes et couleurs en place.
- Couleurs (Tailwind `tailwind.config.ts` et `app/globals.css`) : `deep #071E2C`, `dark #0D3D58`, `mid #144F6C`, `accent #1B6A8A`, `sky #4A9FBF`, `gold #5BBEE8`
- Polices : Sora (titres) et Inter (texte) via `next/font/google`.
- Visuels dans `public/` : `public/brand-assets/` (logos, favicon, photos d'équipe dans `team/`, logos clients dans `client-logos/`, versions blanches dans `client-logos/white/`), `public/blog-assets/`, `public/case-study-assets/`. Ne jamais utiliser de placeholder si un vrai visuel existe.
- Images lourdes : compresser avant de committer (photos < 400 Ko).
- Responsive mobile-first. Pas de `transition-all` ; n'animer que `transform` et `opacity`.
- Chaque élément cliquable : états hover, focus-visible, active.
- Ne pas ajouter de sections ou contenus non demandés.

## SEO & partage
- Chaque page exporte ses `metadata` (title, description, Open Graph). og:image absolue en `https://www.luphy.io/...`, 1200×630.
- Liens internes sans `.html`.
- Toute nouvelle page doit figurer dans `app/sitemap.ts`.
- Le script Midbound est chargé dans `app/layout.tsx` : ne pas le retirer.

## Captures d'écran
- `node screenshot.mjs http://localhost:3000` → `./temporary screenshots/screenshot-N.png` (Puppeteer, `npm install` la première fois)
- Libellé optionnel : `node screenshot.mjs http://localhost:3000/ressources label` ; mobile : ajouter `mobile --mobile`
- Relire le PNG avec l'outil Read, comparer, corriger, recapturer. Toujours vérifier desktop ET mobile.
- Ne jamais faire de capture sur une URL `file:///`. `temporary screenshots/` est ignoré par git.

## Commandes shell
- Les commandes sont lancées depuis la racine du repo : ne jamais préfixer par `cd "..." &&`.
- Pas de redirection `2>/dev/null` ni `> fichier` dans les commandes de lecture (elles déclenchent une validation manuelle).
- Une commande simple par appel plutôt que des chaînes `&&` / `|` quand c'est possible.
- Ne jamais utiliser `node -e` avec du code contenant `>`, `<`, `|` ou des guillemets imbriqués (Windows crée des fichiers parasites). Écrire le code dans un fichier temporaire `docs/private/tmp-*.mjs` et l'exécuter avec `node`.
