# Export Search Console vers Google Sheets

Script Google Apps Script qui copie chaque semaine les performances Search Console de `sc-domain:luphy.io` dans un Google Sheet, pour l'agent Sujets.

Il remplit 5 onglets (créés automatiquement s'ils n'existent pas, vidés puis réécrits à chaque exécution) :

| Onglet | Colonnes | Période |
|---|---|---|
| `requetes_28j` | query, page, clicks, impressions, ctr, position | 28 derniers jours disponibles |
| `requetes_28j_prec` | query, page, clicks, impressions, ctr, position | 28 jours précédents |
| `pages_28j` | page, clicks, impressions, ctr, position | 28 derniers jours disponibles |
| `pages_28j_prec` | page, clicks, impressions, ctr, position | 28 jours précédents |
| `infos` | « mis à jour le » (cellule B1), propriété, périodes couvertes | |

Les données Search Console arrivent avec 2 à 3 jours de retard : la période s'arrête 3 jours avant la date d'exécution. `ctr` est une fraction (0,0345 = 3,45 %), `position` la position moyenne.

Aucune clé ni identifiant dans le code : le script appelle l'API avec le compte Google qui l'exécute. Ce compte doit avoir accès à la propriété `sc-domain:luphy.io` dans Search Console.

## Mise en place (une seule fois)

1. **Créer le Sheet** : sur Google Drive, nouveau Google Sheets, par exemple « Luphy – Search Console ».
2. **Ouvrir l'éditeur de script** : dans le Sheet, menu *Extensions > Apps Script*.
3. **Afficher le manifeste** : dans l'éditeur, *Paramètres du projet* (roue dentée) > cocher « Afficher le fichier manifeste "appsscript.json" dans l'éditeur ».
4. **Coller le code** :
   - fichier `Code.gs` : remplacer tout son contenu par celui de [`Code.gs`](Code.gs) ;
   - fichier `appsscript.json` : remplacer tout son contenu par celui de [`appsscript.json`](appsscript.json).
   - Enregistrer (Ctrl + S).
5. **Lancer une première fois et autoriser** : choisir la fonction `exporterSearchConsole` dans la liste en haut de l'éditeur, cliquer sur *Exécuter*. Google demande l'autorisation : choisir votre compte, puis *Paramètres avancés > Accéder à … (non sécurisé)* (c'est votre propre script), puis *Autoriser*. Autorisations demandées : lecture Search Console, modification de vos Sheets, appels réseau, gestion des déclencheurs.
6. **Vérifier** : revenir sur le Sheet, les 5 onglets sont remplis et `infos!B1` indique l'heure de mise à jour.
7. **Installer le déclencheur** : dans l'éditeur, choisir la fonction `installerDeclencheur` puis *Exécuter*. Le script tournera chaque mercredi entre 22 h et 23 h (heure de Paris). Vérification : menu *Déclencheurs* (icône réveil) à gauche, une ligne `exporterSearchConsole`, « Basé sur le temps », hebdomadaire.

Après rechargement du Sheet, un menu **Search Console** apparaît aussi : *Mettre à jour maintenant* et *Installer le déclencheur hebdomadaire*. Relancer `installerDeclencheur` ne crée pas de doublon (l'ancien déclencheur est remplacé).

## En cas d'erreur

- **403 « User does not have sufficient permission for site »** : le compte qui exécute le script n'a pas accès à `sc-domain:luphy.io`. L'ajouter dans Search Console (*Paramètres > Utilisateurs et autorisations*) ou exécuter le script avec un compte propriétaire.
- **403 « Google Search Console API has not been used in project … or it is disabled »** : ouvrir le lien indiqué dans le message d'erreur et cliquer sur *Activer*, attendre quelques minutes puis relancer. Si le lien n'est pas accessible : créer un projet Google Cloud, y activer « Google Search Console API », configurer l'écran de consentement OAuth (type interne), puis dans Apps Script, *Paramètres du projet > Projet Google Cloud > Changer de projet* avec le numéro de ce projet.
- **Échecs du déclencheur** : Google envoie un e-mail récapitulatif ; le détail est dans *Exécutions* (icône liste) dans l'éditeur.
