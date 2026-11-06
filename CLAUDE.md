# Boussole des amendements — prototype

Interface pour rédiger un amendement parlementaire et voir, autour de lui, l'article visé et les amendements concurrents. Cas particulier d'un motif général : « une édition locale sur un objet se propage dans un réseau de positions (autres acteurs, versions passées) ». On construit le cas particulier d'abord ; on généralise après.

## État actuel
- `index.html` : page unique, vanilla JS/CSS, aucune dépendance. C'est la version de référence (2D interactive).
- `archive/v0-tableau-de-bord.html` : première tentative (jauges, score global). Rejetée, gardée pour mémoire.
- Une version 3D (three.js, plaque dans l'espace) a existé et a été abandonnée : « trop loufoque pour rien ». Ne pas y revenir sans demande explicite.
- Données fictives : groupes et textes inventés ; article 4 d'un projet de loi logement, un chapeau (alinéa 1, hors pile) et 5 alinéas de fond (2 à 6), chacun avec 4 à 10 amendements d'autres groupes (`OTHERS`, par numéro d'alinéa ; modes rédiger / compléter / supprimer).

## Direction artistique (ne pas dévier)
- Espace sombre (`#0b0d12`), grille discrète estompée, poussière implicite ; accent doré `#d9b56a`.
- Les textes juridiques sont des feuilles de papier : dégradé `#f4f1e9 → #e9e4d8`, cadre `outline 14px #ece7db`, filet `#c9bfa6`, encre `#1d1a16`, serif Source Serif 4 pour le texte de loi, IBM Plex Sans pour l'interface, capitales espacées pour les en-têtes.
- Tout nouvel élément textuel (amendement d'un autre groupe, article, synthèse) adopte la même matière papier. Pas de panneau « UI » gris générique.
- Thème unique, assumé (pas de mode clair).

## Décisions de fond
- **Pas de score global ni d'axe composite** : additionner un taux, une année et un verbe modal dans un nombre ne veut rien dire. La comparaison se fait thème par thème, en texte ; les chiffres n'apparaissent que là où ils ont un sens.
- Les règles d'extraction (taux, échéance, seuil, modalité, sanction, conditions) de l'archive restent une brique utile pour segmenter/colorer, pas pour noter.
- Les groupes politiques sont fictifs : ne pas attribuer de positions à des partis réels.

## Interactions en place
Trois gestes, même sens partout (c'est la symétrie voulue, ne pas la casser) :
- **Haut / bas = parcourir** ce qu'on a sous les yeux (une pile, ou une liste qui défile).
- **Gauche / droite = changer de volet.** Les volets s'enchaînent : `tout l'article ← le mien → la pile des autres → comparer (bibliothèque)`. Glisser vers la gauche avance d'un volet vers la droite, et inversement.
- **Clic / pincer = changer d'échelle, un cran à la fois** : texte d'origine ⇄ alinéa ⇄ passage. Dézoomer remonte (passage → alinéa → origine), zoomer ou cliquer un surlignage redescend. Même échelle dans tous les volets (sauf l'article, qui est toujours entier).

| | **Alinéa** (départ) | **Passage** (clic sur un surlignage) | **Origine** (dézoom depuis l'alinéa) |
|---|---|---|---|
| Le mien | pile de mes amendements, alinéas 2 → 6 ; passages surlignés en léger | pile des passages de l'alinéa, isolés en grand | l'alinéa de la commission au-dessus de ma feuille, écarts en direct ; haut/bas change d'alinéa |
| Les autres | pile de leurs amendements sur cet alinéa | pile de leurs rédactions de ce passage (mots qui diffèrent de la mienne surlignés ; identiques mises à part, « 6 groupes gardent la vôtre » ; « Supprime ce point ») | la commission au-dessus de leur feuille, leur écart en direct |
| Comparer | bibliothèque de toutes les rédactions de l'alinéa (commission, la mienne, chaque amendement) | idem pour le passage | (traité comme l'alinéa) |

- **Tout l'article** (volet de gauche) : ma version consolidée, alinéa par alinéa, en corrections apparentes contre une référence choisie par puces : le texte de la commission (défaut) ou la version d'un groupe (ses amendements appliqués ; sans amendement de sa part, la commission). Barré = dans la référence et pas chez moi, surligné = chez moi et pas dans la référence. Clic sur un alinéa → j'y vais. Défilement natif.
- **Comparer** : bibliothèque au centre (défilement natif) ; un clic coche une rédaction, la bibliothèque glisse à gauche et la sélection apparaît à droite **en petit format**, surlignant l'écart avec la commission. La sélection survit au changement d'échelle (cocher deux groupes à l'alinéa, zoomer : on voit leurs deux rédactions du passage). Elle est remise à zéro quand on change d'alinéa. Sur mobile, la sélection passe en bandeau horizontal sous la bibliothèque.
- **La pile** (« tambour ») : défilement continu (deux doigts, glisser au doigt ou à la souris, flèches, repères à gauche) puis calage ; la feuille du dessus bascule en arrière (`rotateX` sur son bord bas), la suivante attend inclinée en dessous. Un petit geste suffit ; élastique aux extrémités. Classe `Drum` dans `index.html`. Au dézoom et en édition, les voisines s'estompent.
- **Passages** : chaque alinéa déclare ses `points` (règle qui retrouve le passage dans n'importe quelle rédaction). Surlignage léger (fond doré pâle + filet), plus marqué au survol. Le texte de la commission n'est jamais surligné en bloc. Un clic sur un surlignage attend 260 ms pour laisser place au double-clic d'édition. Zoomer (pincer) au-dessus d'un surlignage entre dans ce passage-là ; sinon le dernier visité.
- **Édition** : double-clic sur mon texte (alinéa) → édition en place (Valider / Annuler, Ctrl+Entrée, Échap) ; les surlignages suivent la frappe. En vue origine, un simple clic suffit et ma feuille montre les écarts mot à mot (plus longue sous-suite commune, guillemets « » ignorés).
- **Échap** revient d'un cran : bibliothèque → pile des autres ; article → le mien ; puis l'échelle vers l'alinéa ; puis la pile des autres → le mien.
- Poignées : en haut l'échelle (clic = un cran), sur les côtés les volets voisins. Pincer : `wheel` + `ctrlKey` (Chrome, Edge, Firefox), `gesture*` (Safari), deux doigts au tactile ; un cran par geste. Pavé tactile à deux doigts : sens verrouillé au début du geste ; horizontal cumulé (seuil 90) = volet voisin ; dans une liste qui défile, le vertical lui revient.

## Flux cible (scènes, à construire dans l'ordre)
1. Accueil : mon amendement. ✔
2. Édition en place. ✔
3. Confirmation (« Confirmer l'amendement ? ») : frontière entre écrire et explorer. À faire.
4. Texte confirmé segmenté en passages colorés, une couleur par thème ; cliquer une couleur ouvre le thème.
5. Scène thème : mon amendement, cases de thèmes à droite ; pour un thème, synthèse à gauche (« notre texte fait ceci ; en présence, telles opinions, articulables ou non ») et défilement des amendements concurrents sur ce thème.
Questions ouvertes : le « en direct » (retoucher le texte et voir la synthèse se réorganiser) survit-il au flux écrire → confirmer → explorer ? Les thèmes sont-ils prédéfinis ou découpés par Claude à la confirmation ? La synthèse inventorie-t-elle seulement les positions ou dit-elle aussi où un compromis est atteignable ?

## Méthode de travail
- Itérations courtes ; à chaque changement, vérifier avec Playwright (capture 1280×800 et 400 px, pas d'erreur console) avant de montrer.
- Garder une seule page tant que ça tient ; découper en modules (données, feuille, article, liste) seulement quand ça grossit.
- Le lien d'artefact claude.ai existant peut être republié à chaque jalon pour partage.
