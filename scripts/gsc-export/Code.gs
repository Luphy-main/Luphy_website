/**
 * Export Search Console vers le Google Sheet qui contient ce script.
 * Propriété : sc-domain:luphy.io. Authentification : compte Google qui exécute le script
 * (ScriptApp.getOAuthToken), aucune clé ni identifiant dans le code.
 *
 * Onglets remplis à chaque exécution :
 *   requetes_28j, requetes_28j_prec : query, page, clicks, impressions, ctr, position
 *   pages_28j, pages_28j_prec       : page, clicks, impressions, ctr, position
 *   infos                           : « mis à jour le » et périodes couvertes
 */

var PROPRIETE = 'sc-domain:luphy.io';
var JOURS = 28;
// Les données Search Console arrivent avec 2 à 3 jours de retard : la période s'arrête 3 jours avant aujourd'hui
var DECALAGE_JOURS = 3;
var LIGNES_PAR_APPEL = 25000;
var FONCTION_EXPORT = 'exporterSearchConsole';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Search Console')
    .addItem('Mettre à jour maintenant', FONCTION_EXPORT)
    .addItem('Installer le déclencheur hebdomadaire', 'installerDeclencheur')
    .addToUi();
}

function exporterSearchConsole() {
  var classeur = SpreadsheetApp.getActive();
  // Fuseau du projet (appsscript.json : Europe/Paris) ; Search Console compte ses jours en heure du Pacifique,
  // le décalage de 3 jours absorbe l'écart
  var fuseau = Session.getScriptTimeZone();

  var fin = decalerJours(new Date(), -DECALAGE_JOURS);
  var debut = decalerJours(fin, -(JOURS - 1));
  var finPrec = decalerJours(debut, -1);
  var debutPrec = decalerJours(finPrec, -(JOURS - 1));

  var courante = { debut: formater(debut, fuseau), fin: formater(fin, fuseau) };
  var precedente = { debut: formater(debutPrec, fuseau), fin: formater(finPrec, fuseau) };

  ecrireOnglet(classeur, 'requetes_28j', ['query', 'page'], interroger(courante, ['query', 'page']));
  ecrireOnglet(classeur, 'requetes_28j_prec', ['query', 'page'], interroger(precedente, ['query', 'page']));
  ecrireOnglet(classeur, 'pages_28j', ['page'], interroger(courante, ['page']));
  ecrireOnglet(classeur, 'pages_28j_prec', ['page'], interroger(precedente, ['page']));

  var infos = obtenirOnglet(classeur, 'infos');
  infos.clearContents();
  infos.getRange(1, 1, 4, 2).setValues([
    ['mis à jour le', Utilities.formatDate(new Date(), fuseau, 'yyyy-MM-dd HH:mm')],
    ['propriété', PROPRIETE],
    ['période 28j', courante.debut + ' au ' + courante.fin],
    ['période 28j précédente', precedente.debut + ' au ' + precedente.fin],
  ]);
}

// Interroge searchAnalytics.query, page par page (25 000 lignes par appel)
function interroger(periode, dimensions) {
  var url = 'https://searchconsole.googleapis.com/webmasters/v3/sites/' +
    encodeURIComponent(PROPRIETE) + '/searchAnalytics/query';
  var lignes = [];
  for (var debutLigne = 0; ; debutLigne += LIGNES_PAR_APPEL) {
    var reponse = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
      payload: JSON.stringify({
        startDate: periode.debut,
        endDate: periode.fin,
        dimensions: dimensions,
        type: 'web',
        rowLimit: LIGNES_PAR_APPEL,
        startRow: debutLigne,
      }),
      muteHttpExceptions: true,
    });
    if (reponse.getResponseCode() !== 200) {
      throw new Error('Search Console a répondu ' + reponse.getResponseCode() + ' : ' + reponse.getContentText());
    }
    var page = JSON.parse(reponse.getContentText()).rows || [];
    lignes = lignes.concat(page);
    if (page.length < LIGNES_PAR_APPEL) return lignes;
  }
}

function ecrireOnglet(classeur, nom, dimensions, lignes) {
  var onglet = obtenirOnglet(classeur, nom);
  onglet.clearContents();
  var entete = dimensions.concat(['clicks', 'impressions', 'ctr', 'position']);
  var valeurs = [entete].concat(lignes.map(function (l) {
    return l.keys.concat([l.clicks, l.impressions, arrondir(l.ctr, 4), arrondir(l.position, 2)]);
  }));
  onglet.getRange(1, 1, valeurs.length, entete.length).setValues(valeurs);
}

function obtenirOnglet(classeur, nom) {
  return classeur.getSheetByName(nom) || classeur.insertSheet(nom);
}

// Déclencheur hebdomadaire : le mercredi vers 22 h (fuseau du projet, Europe/Paris)
function installerDeclencheur() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === FONCTION_EXPORT) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger(FONCTION_EXPORT)
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.WEDNESDAY)
    .atHour(22)
    .everyWeeks(1)
    .create();
}

function decalerJours(date, jours) {
  var d = new Date(date.getTime());
  d.setDate(d.getDate() + jours);
  return d;
}

function formater(date, fuseau) {
  return Utilities.formatDate(date, fuseau, 'yyyy-MM-dd');
}

function arrondir(valeur, decimales) {
  var f = Math.pow(10, decimales);
  return Math.round(valeur * f) / f;
}
