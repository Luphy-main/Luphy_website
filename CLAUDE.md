# CLAUDE.md – Site Luphy (www.luphy.io)

Site vitrine + blog de Luphy. HTML statique (une page = un fichier .html), CSS inline dans chaque page, pas de framework, pas de build.
Propriétaire : Tristan (Président Luphy). Répondre en français.

## Infrastructure
- **Code** : GitHub `Luphy-main/Luphy_website`, branche de production `main`
- **Hébergement** : Vercel, équipe « Luphy's projects » (Pro), projet `luphy-website-march26`
- **Domaine** : luphy.io chez IONOS (DNS : A `@` → 216.150.1.1, CNAME `www` → Vercel). `luphy.io` redirige (308) vers `www.luphy.io`
- `vercel.json` : site statique servi depuis la racine, `cleanUrls: true` (liens sans `.html`)
- Chaque push sur `main` = mise en production automatique. Chaque push sur une autre branche = URL de prévisualisation Vercel

## ⚠️ Règles de publication – à lire avant toute modification
- Par défaut, tout reste en local et se vérifie sur http://localhost:3000. **Ne jamais push sans accord explicite de Tristan.**
- Déclencheurs acceptés : « push », « publie », « mets en ligne », « deploy », « ship it ».
- « C'est bien », « parfait », « ok » ne sont PAS des déclencheurs de publication.
- Pour une modification importante (nouvelle page, refonte) : travailler sur une branche (`feat/...`), push la branche, donner l'URL de preview Vercel, puis merger dans `main` seulement après validation.
- Petite correction de texte validée : commit direct sur `main` possible si Tristan le demande.
- Messages de commit clairs, format `feat: ...` / `fix: ...`.
- En cas de doute : demander.

## Serveur local
- Lancer : `node serve.mjs` → http://localhost:3000 (sert la racine du projet)
- Le lancer en arrière-plan avant toute capture d'écran. Ne pas lancer une deuxième instance s'il tourne déjà.
- Ne jamais faire de capture sur une URL `file:///`.

## Captures d'écran
- Première fois : `npm install` (installe Puppeteer, défini dans package.json)
- `node screenshot.mjs http://localhost:3000` → enregistre dans `./temporary screenshots/screenshot-N.png`
- Libellé optionnel : `node screenshot.mjs http://localhost:3000/blog label` → `screenshot-N-label.png`
- Mobile : `node screenshot.mjs http://localhost:3000 mobile --mobile`
- Relire le PNG avec l'outil Read, comparer précisément (tailles, espacements, couleurs hex), corriger, recapturer
- Toujours vérifier le rendu desktop ET mobile
- `temporary screenshots/` est ignoré par git

## Bilingue FR / EN (obligatoire)
- Tout contenu ajouté (page, section, article, étude de cas) doit exister en français ET en anglais.
- Mécanisme : `lang.js` (inclus sur chaque page). Les éléments traduisibles portent `data-i18n="cle"` ; le texte FR est dans le HTML, le dictionnaire EN est passé à `initLang({ cle: "..." })` en bas de page.
- Bouton `#lang-toggle` dans le header ; langue mémorisée dans localStorage (`luphy-lang`).
- Header et footer doivent rester identiques et traduits sur toutes les pages.

## Charte & design
- Toujours partir des pages existantes (`index.html`, `crm.html`…) : réutiliser header, footer, variables CSS, composants.
- Couleurs (variables CSS) : `--deep #071E2C`, `--dark #0D3D58`, `--mid #144F6C`, `--accent #1B6A8A`, `--sky #4A9FBF`, `--gold #5BBEE8`
- Polices (Google Fonts) : Sora pour les titres, Inter pour le texte.
- Logos, polices et visuels : dossier `brand-assets/` (logos clients dans `brand-assets/Client logos/`). Ne jamais utiliser de placeholder si un vrai visuel existe.
- Images d'articles : `blog-assets/` ; images d'études de cas : `case-study-assets/`
- Responsive mobile-first. Pas de `transition-all` ; n'animer que `transform` et `opacity`.
- Chaque élément cliquable : états hover, focus-visible, active.
- Ne pas ajouter de sections ou contenus non demandés.

## SEO & partage
- Chaque page : `<title>`, meta description, balises Open Graph (og:image absolue en `https://www.luphy.io/...`, 1200×630).
- Liens internes sans `.html` (cleanUrls).
- Script analytics Midbound présent sur toutes les pages : le conserver sur toute nouvelle page.

## Structure
- Pages : `index`, `crm`, `ia-automation`, `outbound`, `cas-clients`, `case-study-*`, `blog`, `blog-*`, `team`
- Nouvel article de blog : fichier `blog-<sujet>-<année>.html` + carte ajoutée dans `blog.html` (FR + EN)
- Nouvelle étude de cas : `case-study-<client>.html` + carte dans `cas-clients.html`

## Commandes shell
- Les commandes sont lancées depuis la racine du repo : ne jamais préfixer par `cd "..." &&`.
- Pas de redirection `2>/dev/null` ni `> fichier` dans les commandes de lecture (elles déclenchent une validation manuelle).
- Une commande simple par appel plutôt que des chaînes `&&` / `|` quand c'est possible.
