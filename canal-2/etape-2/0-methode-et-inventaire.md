# Étape 2 — Confrontation du catalogue avec la maquette

**0. Méthode et inventaire de la maquette**

Le catalogue de l'étape 1 (`../2-pistes.md`, `../3-assemblages.md`) est validé par l'utilisateur. Cette étape confronte chacune de ses pistes à la maquette actuelle (`index.html` et `CLAUDE.md`, commit 497ce12). Elle remplace le brouillon prématuré de la première passe, retiré du dossier mais disponible dans l'historique au commit af735d8.

Tout le travail reste sur papier : aucune modification de la maquette, aucun tri des pistes. L'objet est de savoir, pour chaque piste, ce qu'elle demande à la maquette.

## Inventaire de la maquette (référentiel de la confrontation)

| Code | Élément | Ce qu'il fait aujourd'hui |
|---|---|---|
| `m.VOL` | Cinq volets en ligne | `comparer des articles ← les articles ← MON AMENDEMENT → les autres → comparer des rédactions`. Gauche/droite pour changer de volet. Poignées en haut (échelle), à gauche et à droite (volets) ; **aucune poignée en bas**. |
| `m.ECH` | Trois crans d'échelle | Unité de sens ⇄ alinéa ⇄ origine (face à la commission). Deux crans pour les articles. Un cran par geste. |
| `m.PILE` | Pile en tambour | Défilement vertical continu puis calage ; la feuille du dessus bascule en arrière. |
| `m.DIFF` | Corrections apparentes | Le texte de la commission reste vierge ; les ajouts sont en bleu souligné gras, les suppressions barrées, sur la rédaction du groupe. Une suppression montre l'alinéa entier barré, un ajout par « compléter » montre la phrase ajoutée. |
| `m.LOUPE` | Loupe | Clic sur une modification : la zone et le passage de la commission côte à côte, avec du contexte estompé. |
| `m.UNI` | Unités de sens | Règles (expressions régulières) par alinéa : seuil, taux, échéance, sanction, plafond, affectation, délai, instrument, procédure, exemption, décompte, limite. Filet doré. **Index des unités** à gauche avec le nombre de propositions. |
| `m.REG` | Regroupement par proposition | Au cran unité, volet des autres : une feuille par rédaction distincte, commission comprise, avec les groupes qui la portent. |
| `m.ART` | Pile des articles | L'article complet dans chaque version : la mienne, puis celle de chaque groupe, **ses amendements appliqués**. Filet doré sur les alinéas modifiés. Au dézoom : la commission et la version côte à côte, alinéa par alinéa. |
| `m.COF` | Coffre et éclatement | Bibliothèque qui défile, coffre à **deux places au plus**, éclatement en **trois colonnes : une rédaction \| commission \| l'autre**, lignes alignées. |
| `m.EDIT` | Édition en place | Double-clic, puis Valider ou Annuler ; un calque miroir pendant la frappe. |
| `m.DA` | Direction artistique | Fond sombre, feuilles de papier, encre, serif pour la loi, accent doré. Tout élément textuel est en papier, **pas de panneau « UI » gris**. Thème unique. |
| `m.DATA` | Données fictives | Un seul article (art. 4), un chapeau (« … est ainsi modifié : »), cinq alinéas de fond. Amendements rangés **par alinéa**, chacun avec `g` (groupe), `num`, `titre`, `texte`, `mode` (`rediger`, `completer`, `supprimer`) et parfois `note` (« collègue de votre groupe »). `GOUV` est **un groupe parmi d'autres** ; `ME = "PR"` (« moi » est un groupe). Mes amendements : un par alinéa. |
| `m.FLUX` | Flux cible | Scènes 1 (accueil) et 2 (édition) faites. **Prévues** : 3 confirmation, 4 segmentation par thème, 5 scène thème avec synthèse. |

**Règles de CLAUDE.md qu'une piste peut heurter** (code `r.`) :

| Code | Règle |
|---|---|
| `r.VIERGE` | « Le texte de la commission reste vierge » : la référence est unique et c'est la commission. |
| `r.SYM` | Symétrie stricte entre mon alinéa et celui d'un groupe X face à la commission ; ma feuille au centre. |
| `r.COF` | Coffre à deux au plus ; éclatement en trois colonnes, la commission au centre. |
| `r.SCORE` | Pas de score global ni d'axe composite ; des chiffres seulement là où ils ont un sens. |
| `r.GESTES` | Trois gestes au même sens partout ; cinq volets ; la symétrie des volets autour de ma feuille. |
| `r.ENCRE` | Trois marques seulement : ajout bleu, suppression barrée, filet doré réservé aux unités. Le gras est réservé aux ajouts. |
| `r.PAPIER` | Tout élément textuel en papier ; pas de panneau UI générique. Une jauge ou un diagramme est à traduire. |

## Grille de verdicts

| Verdict | Sens |
|---|---|
| **✔ présent** | La maquette le fait déjà. |
| **◐ partiel** | Un élément existant le fait en partie. Le levier indique ce qui manque. |
| **◇ prévu** | Inscrit dans le flux cible de CLAUDE.md (scènes 3 à 5), pas encore construit. |
| **G greffe** | Entre dans la grammaire telle quelle : on l'ajoute sans changer de règle, de geste ou de modèle de données. |
| **X extension** | Demande d'étendre la grammaire. Le levier `X1`…`X20` dit laquelle (liste ci-dessous). |
| **↗ ailleurs** | N'a pas sa place dans *cette* interface. Soit `étr.` : propre à un système étranger, sans équivalent français à prototyper ; soit `int.` : relève d'une autre interface de l'ensemble (voir `../3-assemblages.md`). |

Une piste peut porter en plus un **heurt** `r.…` : elle contredit une règle de CLAUDE.md telle qu'elle est écrite.

## Les extensions possibles de la grammaire

Ce sont les **leviers** : chacun regroupe les pistes qui demandent la même extension.

| Code | Extension | Ce qu'elle change |
|---|---|---|
| `X1` | **Référence variable** | La version vierge peut être autre chose que la commission : texte initial, autre version, amendement (pour un sous-amendement), code en vigueur. |
| `X2` | **Axe du temps** | Versions successives, étapes, navette. Aucun geste ni aucune poignée ne le porte aujourd'hui. |
| `X3` | **Échelle étendue** | Des crans au-delà des trois actuels : mots, plusieurs articles, texte entier, dossier, droit en vigueur. Les données n'ont qu'un article. |
| `X4` | **Marques d'état** | Statut décomposé (recevabilité, avis, sort, mode de vote) et autres états sur les feuilles. Seule `note` existe aujourd'hui. |
| `X5` | **Liens entre amendements** | Calque de relations : concurrent, identique, repli, sous-amendement, conséquence, cause d'une chute. |
| `X6` | **Tri et filtres** | Plusieurs ordres et des filtres dans les piles et les listes, aujourd'hui fixes. |
| `X7` | **Acteurs institutionnels** | Gouvernement, commission/rapporteur, président hors des groupes (`GOUV` est un groupe aujourd'hui). |
| `X8` | **Point de vue variable** | « Moi » n'est plus forcément un groupe : isolé, rapporteur, Gouvernement, observateur ; visibilité selon le rôle. |
| `X9` | **Modèle d'amendement complet** | Opération et plage de toute granularité : plusieurs alinéas, article additionnel, texte entier, sous-amendement, deux niveaux de texte. Plusieurs amendements miens par alinéa. Cosignataires, motif. |
| `X10` | **Comparaison à N colonnes** | Plus de trois colonnes, colonne de compromis éditable. |
| `X11` | **Registre du provisoire** | Une marque pour l'hypothétique, le suggéré, le pressenti. |
| `X12` | **Actes et circuits** | Déposer, signer, retirer, reprendre, demander, avec des droits. |
| `X13` | **Direct et relecture** | Suivre une séance en cours, la rejouer. |
| `X14` | **Contrôles à la rédaction** | Recevabilité, renvois, cohérence, contraintes de procédure. |
| `X15` | **Annotations ancrées** | Motifs localisés, questions, fils de négociation, engagements. |
| `X16` | **Vues tabulaires et documents** | Matrices, grilles, documents fidèles (dérouleur, tableau comparatif). |
| `X17` | **Vue d'ensemble spatiale** | Carte du texte entier, zones, constellation. |
| `X18` | **Simulation** | « Si X est adopté, alors… » : texte et piles recalculés. |
| `X19` | **Notifications** | Être prévenu d'un changement. |
| `X20` | **Génération assistée** | Dispositif, gage, reformulation, synthèse. |
