# Direction artistique figée · « Le bordereau » (v1, 8 novembre 2026)

Décidée par l'utilisateur au fil de trois parapheurs (`DECISIONS.md`) ; le parapheur 03 (mise en système) a été validé d'emblée. Les jetons sont dans `da.css`, qui fait foi. Cette direction **remplace**, pour les huit maquettes de `maquettes/`, la forme visuelle empruntée à chaque logiciel d'inspiration. **Elle ne touche ni la structure ni le contenu** (voir § 9).

Origine de l'ambiance : planches `portfolio-01/` (six objets de l'administration et du travail législatif, regardés pour leur forme seulement).

## 1. Principe
Une feuille de bureau, sèche et rangée : papier clair, encre noire, **bordereau à cadre complet** comme grammaire de toutes les listes. **Purement graphique** : typographie, aplats, filets ; aucune matière (ni grain, ni ombre portée, ni rotation, ni tampon). Un seul accent, rare : **le bordeaux et l'or du parapheur**, réservés à ma rédaction et au geste de valider.

| Choix | D'où il vient |
|---|---|
| Le bordereau en base ; tampons écartés | Utilisateur, parapheur 01, note 1 (modifiée) |
| Degré purement graphique | Utilisateur, parapheur 01, note 2 (modifiée : C) |
| Sec partout, feutré en accent rare | Parapheur 01, note 3 ; un accent ne fonctionne que rare (règle d'usage 60-30-10) |
| Thème clair, le papier ne s'inverse jamais | Parapheur 01, note 4 ; lecture meilleure en polarité positive (Piepenbrock, Mayr, Buchner, *Human Factors*, 2014) |

## 2. Palette (rôles)
| Rôle | Jeton | Valeur | Contraste / remarque |
|---|---|---|---|
| Fond de l'application (bureau) | `--da-bureau` | #e4e1da | |
| Feuilles, panneaux, listes | `--da-papier` | #fdfcf9 | |
| Référence | `--da-papier-ref` | #f6f3ec | toujours vierge |
| Survol, pied, édition | `--da-papier-2` | #faf8f2 | |
| Texte principal | `--da-encre` | #1a1a1a | 16,9:1 |
| Texte secondaire | `--da-encre-2` | #4a453d | 9,3:1 |
| Mentions, en-têtes de colonnes | `--da-encre-3` | #655e52 | 6,2:1 sur papier, 4,9:1 sur bureau (WCAG AA) |
| Filet discret / bord de feuille / cadre | `--da-filet` / `--da-filet-fort` / `--da-filet-encre` | #e3ded3 / #cfc7b6 / #1a1a1a | |
| Accent parapheur | `--da-bordeaux` | #5b1e25 | 12,3:1 ; libellé « ma rédaction », bouton de validation |
| Filet d'or | `--da-or` | #a8843f | filets seulement, jamais du texte (3,4:1 ≥ 3:1, WCAG 1.4.11) |
| Ajout | `--da-ins` | #1f3a93 | encre bleue du stylo, 9,8:1 |
| Suppression | `--da-del` | #a8452f | 5,7:1 ; le texte barré reste lisible |
| Passage disputé | `--da-dispute` | #4a453d | pointillé d'encre |
| Intercalaires (familles, ex. thèmes) | `--da-int-1…5` | paille, tilleul, saumon, ciel, lavande | encre dessus ≥ 10:1 ; au-delà de cinq familles, la cote suffit |
| Groupes politiques (fictifs) | couleur des données | — | **un carré de 8 px** à côté du nom, jamais un aplat ni une couleur de texte |

Aucune couleur pour les sorts (§ 5). Le rouge ne sert qu'à la suppression, le bleu qu'à l'ajout, le bordeaux et l'or qu'au parapheur : une couleur, un rôle.

## 3. Typographie (parapheur 01, note 5)
| Voix | Police | Emploi | Taille / interligne |
|---|---|---|---|
| Texte de loi | Source Serif 4 (tailles optiques, licence libre) | alinéas, amendements, titres de feuille (600) | 16/26 ; compact 15/24 ; titre 20/28 |
| Interface | IBM Plex Sans | tout le reste | 13/20 courant ; 12/18 secondaire ; 15/22 titre de panneau (600) |
| Numéros, cotes | Courier Prime (700) | n° d'amendement, n° d'alinéa, cotes | 13 |
| En-têtes | IBM Plex Sans 600, capitales espacées 0,14 em | en-têtes de colonnes, de sections | 11/16 |
| Noms (chevalet) | IBM Plex Sans 600, capitales espacées 0,18 em, fonction dessous en 10 px | groupes, orateurs, places | 13 |

Longueur de ligne du texte de loi : 66 caractères au plus (Bringhurst, 45–75). Interligne ≥ 1,5 (WCAG 2.1, 1.4.12).

## 4. Le bordereau : listes et tableaux (parapheur 02, note 1)
**Cadre complet** : bord extérieur 1,5 px d'encre, toutes les cellules tracées en 1 px d'encre, en-tête en capitales espacées sur un filet de 1,5 px. **Numéro de pièce à la machine, dans la première colonne, à gauche.** Ligne de 32 px au moins ; survol `--da-papier-2` ; sélection : contour d'encre 2 px. Une liste de cartes (concurrents, post-its…) se transpose en cartes à filet d'encre de 1 px, sans rayon ni ombre, numéro à la machine en tête.

## 5. Les sorts, sans tampon ni couleur (parapheur 02, note 2)
Mention en capitales espacées **et** filet de marge à gauche de la ligne ou de la carte :

| Sort | Filet de marge | Mention |
|---|---|---|
| Adopté | 4 px plein, encre | ADOPTÉ, en encre |
| Rejeté | 1 px plein | REJETÉ, encre-3 |
| Tombé | 2 px pointillé | TOMBÉ, encre-3 |
| Retiré | 2 px tireté | RETIRÉ, encre-3 |
| Non soutenu, en attente | aucun | NON SOUTENU / EN ATTENTE, encre-3 |
| Irrecevable, écarté | aucun ; texte entier en encre-3 | IRRECEVABLE |

Forme et mot disent le sort, même en noir et blanc (WCAG 1.4.1). Les anciennes matières de sort de `CLAUDE.md` (tampon, feuille basculée, coin plié, fantôme) sont remplacées par ce système dans les maquettes.

## 6. Corrections apparentes (parapheur 02, note 4 ; règles du projet)
- La référence reste vierge ; les écarts sont portés **uniquement sur la rédaction comparée** ; symétrie stricte entre ma rédaction et celle d'un autre.
- **Ajout** : souligné 1 px, gras (600), encre bleue `--da-ins`.
- **Suppression** : barrée, en rouge `--da-del`, le texte reste visible.
- **Passage disputé** : souligné en **pointillé d'encre** (`--da-dispute`), décalé de 5 px sous la ligne ; épaisseur selon le nombre de propositions : 1 px (2), 1,5 px (3 à 5), 2,5 px (6 et plus). Survol : fond `--da-papier-2`.
- Calque miroir pendant la frappe : ajouts soulignés sans gras, suppressions en trait rouge fin.

## 7. Les accents, un rôle chacun (parapheur 02, note 3)
| Objet | Rôle unique |
|---|---|
| La note pour le ministre | l'en-tête de feuille (émetteur en capitales à gauche, date ou numéro à droite) et la ligne « Objet » soulignée |
| La table de commission | les noms (groupes, orateurs, places) en capitales espacées, la fonction dessous |
| Le parapheur | le bordeaux et l'or : ma rédaction (libellé bordeaux, filet d'or de 2 px en tête de feuille) et le bouton primaire (valider, confirmer) |
| La chemise d'archive | les cotes à la machine et les intercalaires de couleur pour séparer des familles (thèmes) |

## 8. Forme
- **Rayons : aucun** (0 partout : feuilles, boutons, champs, pastilles). Un formulaire imprimé est rectangulaire.
- **Ombres : aucune** sur les feuilles et panneaux (un filet de 1 px `--da-filet-fort`). Seule exception : les couches qui flottent au-dessus du contenu (menus, palette de commandes, dialogues, barre d'outils flottante), avec `--da-ombre-flottant`, pour rester lisibles quand elles recouvrent.
- **Espacement** : multiples de 4 px. Cible tactile de 44 px sur écran étroit (Apple HIG ; WCAG 2.5.5).
- **Boutons** : primaire = bordeaux plein (réservé à valider / confirmer) ; secondaire = cadre d'encre 1,5 px sur papier ; tertiaire = texte souligné. Libellés des deux premiers en capitales espacées 12 px.
- **Icônes** : trait 1,5 px, `currentColor` (encre-2), 16 ou 20 px ; aucune icône colorée.
- **Focus** : contour d'encre 2 px, décalé de 2 px.
- **Défilement** : natif, sans barre visible.
- **Thème** : clair uniquement ; pas de mode sombre (si une maquette avait un interrupteur de thème, il peut rester mais les deux positions affichent ce thème, ou l'interrupteur est masqué : la structure ne change pas).

## 9. Ce qui ne change pas (consigne pour l'application aux maquettes)
**La forme uniquement.** On remplace : couleurs, polices, tailles, filets, rayons, ombres, rendus des sorts, des corrections et des passages disputés, apparence des boutons, icônes et états.
On **ne touche pas** : le squelette et la disposition (panneaux, barres, colonnes, onglets, canevas…), les composants et leur emplacement, les mécanismes et les gestes, les raccourcis, le contenu, les libellés, les données, les fonctions. Chaque maquette garde la structure de son logiciel d'inspiration ; seules ses couleurs et sa matière deviennent celles de cette direction.
