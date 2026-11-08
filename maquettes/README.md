# Maquettes d'inspiration (8)

Huit maquettes de la Boussole, construites le 8 novembre 2026 dans la session « vigie ». Chacune reprend **les quatre espaces de la refonte** (Dossier, Atelier, Enjeux, Réunion) sur les **données réelles de l'article 4** (groupes fictifs), dans **la structure, les mécanismes d'interaction et la forme visuelle** d'un logiciel reconnu :

| Dossier | Inspiration | Structure empruntée (à garder) |
|---|---|---|
| `figma/` | Figma (UI3) | Pages = espaces ; canevas de cadres (pan, zoom) ; panneau Calques à gauche, propriétés de la sélection à droite ; barre d'outils flottante en bas ; bulles de commentaire = passages disputés ; étiquettes « multijoueur » = groupes ; historique des versions ; Inspecteur (Dev Mode) ; menu Actions Ctrl K ; réunion en tableau blanc (post-its) ; Comparer réduit l'interface. |
| `linear/` | Linear | « L inversé » : barre latérale + contenu incrusté en 4 couches ; liste | détail | propriétés ; Inbox = réunion en fil d'activité ; tableau groupé par thème ; Ctrl K, « ? », Peek (Espace), entraîneur de raccourcis. |
| `vscode/` | Visual Studio Code | Barre d'activité, arbre latéral, onglets, fil d'Ariane, gouttière = numéros d'alinéa, diff en ligne / côte à côte, ondulés + vue incrustée (Peek), panneau « problèmes » = concurrents, palette F1, notebook = réunion, barre d'état. |
| `raycast/` | Raycast | Une fenêtre flottante : recherche unifiée, liste à sections + détail, barre d'actions (↵, Ctrl K), pile de vues (Échap), grille des thèmes, formulaire d'édition. |
| `affinity/` | Affinity | Personas = espaces ; barre contextuelle par outil ; Studio en groupes de panneaux à onglets (Calques, Historique = étapes) ; page sur pasteboard ; barre d'état pédagogique. |
| `phantom/` | Phantom | Mobile d'abord (colonne + panneau latéral sur grand écran) ; onglets en pilules ; grand chiffre ; boutons d'action carrés ; lignes « jetons » ; Activité en langage clair ; feuille de confirmation « Changements estimés ». |
| `jupiter/` | Jupiter | Carte de « swap » (de la référence → vers ma rédaction, bouton d'inversion) ; navigation en sections verbales ; bandeau défilant ; modale de sélection ; réunion en terminal 3 colonnes ; dossier en page « portfolio ». |
| `sky/` | Sky | En-tête à 4 onglets en pilules ; cartes produit (phrase avant les chiffres, métriques entre filets, jauge 3 traits) ; filtres en pilules ; pages détail « ‹ Retour » ; De / Vers ; étapes numérotées. |

## Construire, vérifier
- Socle commun (ne pas modifier sans raison) : `commun/data.js` (copie de `data/logement-art4.js`), `commun/base.js` et `commun/modele.js` (repris de `app/` de la refonte), `commun/noyau.js` (aides : `NX.*`).
- Chaque maquette : `<nom>/source.html` (CSS + squelette ; marqueurs `<!--NOYAU-->` et `<!--APP-->`) et `<nom>/app.js`.
- `python3 maquettes/construire.py <nom>` → `maquettes/boussole-<nom>.html` (autonome, ~1 Mo).
- `node maquettes/verifier.js <nom>` → captures 1280×800 et 400×800 des 4 espaces dans `maquettes/captures/`, erreurs console, défilement horizontal. `python3 maquettes/planche.py <nom>` (depuis `maquettes/`) → planche des captures.
- Scripts d'interaction : `maquettes/<nom>/interagir.js` (et `maquettes/interagir-linear.js`).
- Consignes données aux constructeurs : `CONSIGNES.md` (périmètre fonctionnel, règles du projet).

## Règles gardées dans les 8
Référence vierge ; corrections apparentes portées uniquement sur la rédaction comparée ; symétrie stricte ma rédaction / celle d'un autre ; comparaison en 3 colonnes (une | référence | l'autre) ; aucun score ; groupes fictifs. La direction artistique « papier sombre » de `CLAUDE.md` était **suspendue** dans ces maquettes (chacune suivait la forme de son inspiration).
