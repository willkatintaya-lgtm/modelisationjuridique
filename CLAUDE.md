# Boussole des amendements — prototype

Logiciel de visualisation interactive (2D) de la discussion et de la négociation législatives. Le cas de départ : rédiger un amendement et le situer face au texte examiné et aux amendements des autres. Motif général : « une édition locale sur un objet se propage dans un réseau de positions (autres acteurs, versions passées) ».

## État actuel (refonte, branche `claude/refonte`)
- `index.html` : la page (CSS et squelette) ; le code est dans `app/` (`base.js` : écart mot à mot, versions, application au code, tambour ; `modele.js` : directions, brouillons, concurrents, unités ; `vues.js` : les feuilles ; `interfaces.js` : les interfaces de chaque espace ; `main.js` : rendu, gestes, surcouches). Vanilla JS, aucune dépendance.
- **Données réelles** : article 4 du projet de loi « relance et décentralisation du logement » (DLR5L17N54608), examiné par la commission des affaires économiques de l'Assemblée le 21 septembre 2026 : 4 étapes (Sénat dépôt, Sénat commission, texte transmis, texte de la commission AN), 143 amendements, 26 épisodes de compte rendu, article 31 du CGI avant / après. `data/logement-art4.js` est **généré** par `outils/construire_donnees.py` à partir des extraits du canal 1 (`canaux/1-assemblee/extraits/`) : ne pas l'éditer à la main.
- Groupes et personnes **fictifs** (clés PR, SOL, ECO, UT, LL, RC, DC, CP, NV, RS…) ; textes, sorts et dates réels. Le script remplace les noms réels restés dans les exposés (noms de groupes réels, surnom du dispositif).
- `archive/v1-boussole-fictive.html` : la maquette précédente (données fictives, cinq volets). `archive/v0-tableau-de-bord.html` : première tentative (jauges, score). Une version 3D a été abandonnée : ne pas y revenir sans demande explicite.
- `canaux/` et `canal-2/` : le travail des trois canaux de la refonte (Assemblée nationale, corpus technique, fusion). Le modèle construit ici est `canaux/3-fusion/03-modele.md` ; les arbitrages de l'utilisateur sont en fin de `canaux/3-fusion/04-arbitrages.md`.

## Direction artistique (ne pas dévier)
- Espace sombre (`#0b0d12`), grille discrète estompée ; accent doré `#d9b56a`.
- Les textes sont des feuilles de papier : dégradé `#f4f1e9 → #e9e4d8`, cadre `outline 14px #ece7db`, filet `#c9bfa6`, encre `#1d1a16`, Source Serif 4 pour le texte de loi, IBM Plex Sans pour l'interface, capitales espacées pour les en-têtes.
- **Toute vue est un document** : une frise devient une bande de papier, une matrice un tableau imprimé, un ordre de vote une liste de vote. Pas de panneau « UI » gris générique.
- Thème unique, assumé (pas de mode clair).

## Décisions de fond
- **Pas de score ni d'axe composite.** Un nombre n'est admis que s'il compte une seule chose (amendements, mots, alinéas). Une régularité se dit en phrase.
- **Groupes fictifs** : ne jamais attribuer de positions à des partis réels.
- **Espace et interface.** Un espace est composé de plusieurs interfaces qui travaillent **le même objet, au même moment, sur un état commun** ; c'est pourquoi elles partagent une forme et une structure de famille. La ressemblance de forme est une conséquence, pas le critère. Quand un espace sature (son cadre s'empile, ses interfaces répondent à des moments différents), on le divise en espaces.
- Changer d'interface = tourner la tête (volet, échelle). Changer d'espace = un vrai déplacement : le cadre change, et l'on emporte la feuille courante. Une feuille est un objet (`data-sid`), pas une vue : un passage la déplace, ne la duplique pas.
- **Maximalisme, puis élimination à l'œil** : tout est construit, chaque direction derrière un interrupteur (panneau « Directions », touche D) ; l'utilisateur coupe en regardant.
- Pas de direct sur la séance logement pour le moment (décision du 8 novembre) : D6 n'est pas construite.

## Règles visuelles de comparaison (partout, sans exception)
- **La référence reste vierge ; par défaut, le texte examiné.** Ici, en commission, c'est le texte transmis par le Sénat (le texte que les amendements visent). Elle s'affiche en tête de toute feuille comparée (« face à : … ») et se choisit (D1) : étapes du Sénat, texte de la commission de l'Assemblée.
- **Symétrie stricte** entre ma rédaction et celle d'un autre face à la référence : toute règle se fait des deux côtés.
- Les écarts sont portés **uniquement sur la rédaction comparée**, en corrections apparentes. **Ajout** : souligné, gras, encre bleue (`--ins`). **Suppression** : visible, barrée (`--del`). Les guillemets comptent (dans un texte modificatif, ils délimitent les mots cités).
- **Clic sur une modification → loupe** : la zone et le passage de la référence côte à côte, avec quelques mots de contexte.
- Pendant la frappe, le calque miroir ne peut pas insérer de texte : ajouts soulignés, suppressions en trait rouge fin ; la feuille montre les corrections complètes après validation.
- Les matières de sort (D2) ne sont pas des encres de texte : tampon « adopté », feuille basculée si tombée, coin plié si retirée, fantôme si irrecevable, pâle si non soutenue.
- Listes à défilement natif : **pas de barre de défilement visible**, bords fondus.

## Les espaces (barre du haut ; touches 1 à 4), dans l'ordre de la procédure
Dans chaque espace, trois gestes, même sens : **haut/bas = parcourir**, **gauche/droite = volet voisin**, **pincer/clic sur la poignée du haut = échelle, un cran à la fois**.

| Espace | Objet · moment | Cadre propre | Haut / bas | Gauche / droite | Échelle (profond ⇄ large) |
|---|---|---|---|---|---|
| **Le dossier** (D7, D12) | le projet de loi, d'étape en étape · s'orienter | — | les étapes d'un alinéa / d'un article ; les articles du projet | l'alinéa voisin | alinéa ⇄ article ⇄ grille des étapes ⇄ le projet de loi (départ) |
| **L'atelier** | mon amendement · avant le délai | « face à », le coffre, Comparer, le tiroir | mes brouillons / les concurrents / les versions d'article | `les articles ← MON AMENDEMENT → les autres` | unité de sens ⇄ alinéa ⇄ article ⇄ le code (D4) |
| **Les enjeux** (D10) | un enjeu à travers l'article · après la confirmation, pour négocier | les thèmes (index à gauche), « face à » | les alinéas du thème | `synthèse ← MON TEXTE → les autres` | thème ⇄ thèmes × groupes |
| **La réunion** (D5) | l'examen de l'article · comment cela s'est décidé | la bande des places (largeur selon les mots, dorée si un adopté) | les places, dans l'ordre d'appel | — | les paroles ⇄ la place (liste de vote) |

- **Les passages** relient les espaces et emportent la feuille : brouillon → « histoire ↗ » (dossier, l'alinéa d'étape en étape) ; concurrent → « en réunion ↗ » (sa place) ; sas confirmé → « Explorer les enjeux ↗ » ; alinéa d'étape → « amender ↗ » (atelier) ; plan → article 4 dans l'atelier ; une ligne de la liste de vote, une pastille, un numéro de la matrice → l'atelier.
- Le coffre appartient à l'atelier : ⊕ depuis un autre espace y emporte la feuille ; la barre des espaces montre « ⊕n » à côté de l'atelier.
- L'espace courant est mémorisé. **Échap** revient d'un cran : surcouche → édition → verso → échelle par défaut → volet central.

## Les briques
- **La pile** (tambour, classe `Drum`) : défilement continu puis calage ; la feuille du dessus bascule en arrière. Un geste commencé dans le texte d'une feuille y reste ; au bout, la pile tourne.
- **Face à (L2)** : un clic sur l'en-tête « ○ face à : … » montre la référence au-dessus de la feuille et met les corrections sur la feuille (des deux côtés) ; ▾ choisit la référence (D1). Éteindre L2 = variante conservatrice (un cran « face à la référence » dans l'échelle).
- **Unités de sens nées du débat** : une unité est une petite zone du texte que quelqu'un modifie ; les zones qui se recouvrent fusionnent ; les longues réécritures ne fabriquent pas d'unité, elles comptent comme une proposition sur chaque passage qu'elles couvrent. Mes propres modifications créent des unités. Filet doré plus épais quand il y a plus de propositions (2 / 3–5 / 6+). Index des passages disputés à gauche (en ligne au-dessus sur écran étroit) : un clic ouvre le **regroupement par proposition** dans le volet des autres. Au cran « unité », ma rédaction et la référence sont côte à côte (loupe et vue isolée fusionnées).
- **Le coffre (L1)** : ⊕ sur n'importe quelle feuille, dans n'importe quel espace ; deux au plus ; « tiroir » liste les rédactions d'ici ; « Comparer » (ou C) éclate en colonnes : **une | la référence | l'autre**, lignes alignées (sous-grille). Sur écran étroit, carrousel horizontal.
- **Le verso (L3)** : coin replié en bas à droite ou touche R. Identité, statut décomposé, dispositif et opérations appliquées, motif, sources citées (D8), versions, liens (identiques, discussion commune, chute, retrait), paroles en réunion (D5), survie, négociation (D11).
- **Le repli (L4)** : identiques pliés en une feuille (pastilles cliquables), séries pliées, gage en une ligne, rédactionnels rangés à part, écartés (irrecevables…) en fin de pile après une feuille de séparation. Les concurrents propres à l'alinéa d'abord, ceux qui visent l'article entier ensuite.
- **L'atelier (D9)** : plusieurs brouillons, « + repli », dispositif généré à partir de mon texte (verso), **sas de confirmation** (scène 3) : lien avec le texte, article 40 (heuristique, gage proposé), doublon, déjà satisfait par la commission, concurrence, application au code.
- **Le code (D4)** : les instructions de l'article sont appliquées mécaniquement à l'article 31 du CGI (convention « origine ») ; seuls les alinéas qui changent sont montrés ; chaque instruction a un statut.
- **Édition** : double-clic sur mon brouillon (ou simple clic quand la référence est affichée) ; Valider / Annuler, Ctrl+Entrée, Échap. Brouillons, notes et directions sont gardés dans le navigateur (`localStorage`, clé `boussole:*`).
- Poignées : en haut l'échelle, sur les côtés les volets voisins ; les espaces sont dans la barre du haut. Pincer : `wheel` + `ctrlKey`, `gesture*` (Safari), deux doigts. Pavé tactile : sens verrouillé au début du geste ; horizontal cumulé (seuil 90) = volet voisin.

## Flux cible
1. Accueil : mon amendement. ✔
2. Édition en place. ✔
3. Confirmation (« Confirmer l'amendement ? ») : le sas. ✔ (simulation)
4. Thèmes : ✔ en espace (les enjeux) (déclarés par le rapport ou calculés par mots-clés, dits comme tels). Reste : segmenter mon texte confirmé en passages colorés par thème.
5. Synthèse : ✔ trois strates (le rapport, les positions en réunion, ce que fait mon texte). Reste : dire où un compromis est atteignable, si l'utilisateur le veut.
Questions ouvertes : le « en direct » au double sens (les autres déposent pendant que j'écris) ; les autres articles du projet de loi ; la séance (seule la commission est chargée).

## Méthode de travail
- Maximaliste, puis élimination à l'œil ; à chaque changement, vérifier avec Playwright (captures 1280×800 et 400 px, aucune erreur console) avant de montrer.
- Régénérer les données après toute modification du script : `python3 -I outils/construire_donnees.py`.
- Le lien d'artefact public (https://claude.ai/artifact/FUCe2fcntYYWgVB7Yjy7MP) montre l'ancienne maquette à des testeurs extérieurs : **ne jamais republier dessus sans demande explicite**. La refonte a son propre lien.
