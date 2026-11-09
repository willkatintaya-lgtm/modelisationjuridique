# Appliquer la direction artistique « Le bordereau » à une maquette

Racine : `/tmp/claude-0/-home-user-modelisationjuridique/bd862a5e-3892-589c-9c47-63e8a027882d/scratchpad/wt-da/` (copie de travail de la branche `claude/direction-artistique`, notée `R/`).

## Consigne de l'utilisateur, absolue
**LA FORME UNIQUEMENT, LE VISUEL. NI LA STRUCTURE, NI LE FOND.**

## À lire d'abord
1. `R/direction-artistique/DA.md` en entier : la direction figée, les rôles de chaque couleur, les sorts, les corrections, les accents ; le § 9 dit ce qui change et ce qui ne change pas.
2. `R/direction-artistique/da.css` en entier : les jetons `--da-*`, qui font foi, et les composants de référence facultatifs (feuille, bordereau, sorts, corrections, chevalet, boutons).
3. `R/direction-artistique/DECISIONS.md` : les décisions de l'utilisateur.
4. Facultatif, pour l'ambiance seulement : `R/direction-artistique/portfolio-01/planche-0*.jpg`. Ne copie pas leur trompe-l'œil : le rendu retenu est purement graphique.

## Ce que tu fais, pour TA maquette seulement (`R/maquettes/<nom>/`)
- Dans `source.html`, ajoute le marqueur `<!--DA-->` dans le `<head>`, juste avant ton `<style>`. `construire.py` le remplace par `da.css` en ligne.
- Ajoute aussi le lien Google Fonts indiqué en tête de `da.css` (Source Serif 4, IBM Plex Sans, Courier Prime). Retire les polices de l'inspiration.
- Réécris **le CSS** pour que tout prenne la forme de la direction :
  - bureau `#e4e1da`, papier `#fdfcf9`, encre ;
  - **aucun rayon** ;
  - **aucune ombre**, sauf sur les couches flottantes : menus, palettes, dialogues, barre d'outils flottante ;
  - aucun dégradé, aucun verre, aucune matière ;
  - listes et tableaux en **bordereau à cadre complet**, avec le numéro à la machine (Courier Prime) à gauche ;
  - sorts par mention en capitales et filet de marge, **sans couleur** ;
  - corrections : ajout bleu `--da-ins` souligné et gras ; suppression barrée en rouge `--da-del` ; passage disputé en **pointillé d'encre**, plus épais selon le nombre de propositions (classes `w1`, `w2`, `w3`) ;
  - bordeaux et or réservés à **ma rédaction** et au **bouton de validation** ;
  - groupes : un **carré de 8 px** de leur couleur, jamais un aplat ni un texte coloré ;
  - textes de loi en Source Serif 4, 16/26, longueur de ligne de 66 caractères au plus ;
  - interface en IBM Plex Sans ; numéros et cotes en Courier Prime ; en-têtes en capitales espacées.
- Fais correspondre les variables de couleur de la maquette aux jetons `--da-*`. Les noms de variables peuvent rester ; ce sont les valeurs qui changent.
- Dans `app.js`, ne change **que des valeurs d'apparence** : couleurs écrites en dur, styles en ligne, classes de rendu. Ne change ni la logique, ni les libellés, ni le contenu, ni la disposition, ni le nombre ou l'ordre des éléments, ni les gestes et raccourcis.
- Thème : clair uniquement. Si la maquette a un interrupteur clair/sombre, garde-le et fais afficher ce thème clair à ses deux positions. La structure ne change pas.
- La note « Lisez-moi / À propos » : tu peux y ajouter une phrase qui dit que la forme suit désormais la direction « Le bordereau » (`direction-artistique/DA.md`). Ne touche pas au reste du texte.

## Ce que tu ne touches pas
Le squelette et la disposition : panneaux, barres, colonnes, onglets, canevas, tailles des zones si elles portent la structure. Les composants et leur emplacement. Les mécanismes, les gestes et les raccourcis. Les libellés, le contenu, les données. **Ne modifie rien hors de `R/maquettes/<nom>/`** : ni `commun/`, ni `construire.py`, ni `verifier.js`, ni `direction-artistique/`. Ne fais aucune commande git.

## Vérifier
- `cd R/maquettes && python3 construire.py <nom> && node verifier.js <nom>`. Il ne doit y avoir aucune erreur console ni défilement horizontal à 400 px.
- Regarde les 8 captures `R/maquettes/captures/<nom>-<espace>-<d|m>.png` et compare-les aux captures d'avant, `R/maquettes/captures/avant/<nom>-…png` : **la disposition doit être identique**, seule la forme change.
- Relance le script d'interaction de la maquette, s'il existe : `node <nom>/interagir.js` (ou `node interagir-linear.js`). Il doit passer sans erreur.
- Itère jusqu'à ce que ce soit propre et fidèle à `DA.md`.
- Si un point de la direction est ambigu pour ta maquette, tranche au plus sobre et note-le.

## Rapport final, en français et court
Ce qui a changé dans le visuel ; les points ambigus et comment tu les as tranchés ; ce qui reste imparfait.
