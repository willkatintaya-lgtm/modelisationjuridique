# Boussole des amendements — prototype

Interface pour rédiger un amendement parlementaire et voir, autour de lui, l'article visé et les amendements concurrents. Cas particulier d'un motif général : « une édition locale sur un objet se propage dans un réseau de positions (autres acteurs, versions passées) ». On construit le cas particulier d'abord ; on généralise après.

## État actuel
- `index.html` : page unique, vanilla JS/CSS, aucune dépendance. C'est la version de référence (2D interactive).
- `archive/v0-tableau-de-bord.html` : première tentative (jauges, score global). Rejetée, gardée pour mémoire.
- Une version 3D (three.js, plaque dans l'espace) a existé et a été abandonnée : « trop loufoque pour rien ». Ne pas y revenir sans demande explicite.
- Données fictives : groupes et textes inventés, article 4 d'un projet de loi logement, 10 amendements concurrents.

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
- Feuille centrale = mon amendement ; double-clic sur le texte → édition en place (Valider / Annuler, Ctrl+Entrée, Échap).
- **Haut / bas = les idées principales de mon texte** (pas les autres amendements, pas l'article). Ma feuille est un tambour de faces : face 0 = le texte seul ; face n = le même texte avec la n-ième idée surlignée (ex. « plus de 3 500 habitants », « 25 % de logements sociaux », « d'ici 2030 », « prélèvement sur les ressources fiscales de la commune »), étiquette « Seuil · idée 1 sur 4 » en pied. Défilement continu (deux doigts, glisser au doigt/à la souris, flèches, repères à gauche) puis calage : la face qui part en haut bascule en arrière (`rotateX` sur son bord bas), la suivante attend inclinée en dessous. Un petit geste suffit pour passer d'une idée ; élastique aux extrémités.
- Les idées sont repérées par les règles de l'archive (seuil, taux, échéance, sanction ; `IDEAS` dans `index.html`), dans l'ordre du texte, recalculées après chaque modification : on reste sur la même idée si elle existe encore. En édition sur une face, le surlignage suit la frappe.
- **Dézoomer = le texte d'origine** (pincer sur le pavé tactile → `wheel` + `ctrlKey` ; `gesture*` sous Safari ; deux doigts qui se rapprochent sur écran tactile ; ou poignée « Article 4 ⊖ »). Seul l'alinéa visé apparaît, en feuille surlignée au-dessus de ma feuille, la scène rapetisse légèrement ; le geste est suivi en continu puis se cale. Zoomer, la poignée ou Échap le renvoie. En dézoom, haut/bas ne fait rien et ma feuille montre les écarts au lieu de l'idée.
- Comparaison en direct (en dézoom) : écart mot à mot (plus longue sous-suite commune, guillemets « » ignorés). Dans l'original, **barré** = ce que mon amendement supprime ; dans ma feuille, **surligné doré** = ce qu'il ajoute. Un simple clic sur mon texte ouvre l'édition au point cliqué ; les marques se recalculent à chaque frappe (calque miroir sous une zone de saisie transparente).
- Droite : glisser vers la gauche → ma feuille sort, colonne de boîtes papier (groupe, numéro, objet, « + ») avec défilement à inertie ; « + » déplie l'amendement en feuille complète. Glisser vers la droite ramène ma feuille.
- Pavé tactile : le sens du geste à deux doigts est verrouillé à son début ; horizontal = `wheel` cumulés (seuil 90) valent un glisser, vertical = défilement continu des idées ; sens « naturel » supposé.

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
