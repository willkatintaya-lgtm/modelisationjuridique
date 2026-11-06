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
Trois gestes, même sens à chaque échelle (c'est la symétrie voulue, ne pas la casser) :
- **Haut / bas = parcourir mon texte** : l'unité voisine, au même niveau.
- **Gauche = la même unité chez les autres groupes**, en pile. Droite ramène la mienne.
- **Clic / pincer = changer d'échelle.** Dézoomer remonte d'un cran : passage → groupes → alinéa → texte d'origine. Zoomer (ou cliquer un surlignage) redescend.

| | Échelle **alinéa** (départ) | Échelle **passage** (clic sur un surlignage) |
|---|---|---|
| Au centre | mon amendement sur l'alinéa, passages surlignés en léger | le passage seul, isolé, en grand |
| Haut / bas | alinéa 2 → 3 → … → 6 | passage suivant du même alinéa |
| Gauche | pile des amendements des autres groupes sur cet alinéa | pile des rédactions de ce passage chez les autres (mots qui diffèrent de la mienne surlignés) ; versions identiques mises à part (« 6 groupes gardent la vôtre ») ; « Supprime ce point » si le groupe le retire |
| Dézoomer | l'alinéa d'origine au-dessus de ma feuille, écarts en direct | petits carrés papier, un par groupe (le mien, le texte d'origine, chaque amendement) ; on en coche, « Sélectionner » les met côte à côte |

Détails :
- **La pile** (« tambour ») sert partout : défilement continu (deux doigts, glisser au doigt ou à la souris, flèches, repères à gauche) puis calage ; la feuille du dessus bascule en arrière (`rotateX` sur son bord bas), la suivante attend inclinée en dessous. Un petit geste suffit ; élastique aux extrémités. Classe `Drum` dans `index.html`.
- **Passages** : chaque alinéa déclare ses `points` (règle qui retrouve le passage dans n'importe quelle rédaction : la mienne, celles des autres, l'origine). Surlignage léger (fond doré pâle + filet), plus marqué au survol, pour ne pas saturer quand il y en a beaucoup. Un clic sur un surlignage attend 260 ms pour laisser place au double-clic d'édition. Cliquer un surlignage dans l'amendement d'un autre groupe ouvre le passage côté autres, sur sa rédaction.
- **Édition** : double-clic sur mon texte (alinéa) → édition en place (Valider / Annuler, Ctrl+Entrée, Échap) ; les surlignages suivent la frappe. En vue « texte d'origine », un simple clic suffit et ma feuille montre les écarts mot à mot (plus longue sous-suite commune, guillemets « » ignorés) : **barré** dans l'original = supprimé, **surligné** dans le mien = ajouté.
- **Échap** = revenir d'un cran (côte à côte → carrés → passage → alinéa ; origine → alinéa ; autres → les miens).
- Pincer : `wheel` + `ctrlKey` (Chrome, Edge, Firefox), `gesture*` (Safari), deux doigts au tactile ; un cran par geste. Poignée du haut = même chose au clic. Pavé tactile à deux doigts : sens verrouillé au début du geste ; horizontal cumulé (seuil 90) = changer de volet.

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
