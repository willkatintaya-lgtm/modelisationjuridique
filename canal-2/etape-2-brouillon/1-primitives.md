# 1. Primitives — ce que l'interface doit savoir montrer

Le corpus termine par dix éléments que le modèle de données doit porter. Chacun devient ici une **primitive d'interface**, c'est-à-dire une brique visuelle et interactive que les situations de `2-situations.md` réutilisent. Le corpus ne dit rien de leur forme ; tout ce qui suit est proposition.

---

## P1. La version visée

Chaque amendement vise une version précise du texte : initiale, commission, séance, Sénat, CMP, nouvelle lecture.

- **P1.a — Tampon de version.** Chaque feuille porte en en-tête, en petites capitales, la version qu'elle vise (« vise : texte de la commission, 1re lecture AN »). La feuille de référence porte le même tampon, « version », sans plus. — *marque, prolonge*
- **P1.b — « Le texte de référence reste vierge », généralisé.** La règle de CLAUDE.md vaut pour *la version visée*, quelle qu'elle soit. En commission, la feuille vierge est le texte initial ; en séance, le texte de la commission ; en CMP, les deux textes des chambres. Tout le dispositif de corrections apparentes s'applique sans changement. — *vue, prolonge*
- **P1.c — Sélecteur de référence.** On peut confronter une même rédaction à une autre version que celle qu'elle vise : mon amendement de séance face au texte initial, pour voir ce que la commission a déjà fait de mon idée. La règle reste qu'une seule version de référence est vierge à la fois. — *geste, prolonge*
- **P1.d — Frise des versions.** Une ligne de jalons (initial → commission → séance → navette → CMP → définitif), discrète sur le bord de l'écran. Elle indique où l'on est et à quelle version chaque feuille se rattache. Voir P8. — *objet, neuf*

*Données (canal 1)* : identifiant de la version visée par chaque amendement ; textes complets de chaque version.

## P2. L'unité stable

Il faut un identifiant de chaque unité qui survive aux renumérotations. Le corpus cite le `wId` d'Akoma Ntoso, quasi absent en pratique.

- **P2.a — Double numérotation.** Un alinéa affiche son numéro dans la version courante et, estompé, son ancien numéro (« al. 4 · ex-3 »). Même chose pour les articles (« art. 5 · ex-4 bis »). — *marque, neuf*
- **P2.b — Fil d'unité.** Un clic long sur une unité (ou un geste de l'axe temps, voir 3) montre la même unité à travers toutes les versions, alignées : la « carrière » d'un alinéa. — *vue, neuf*
- **P2.c — Unités de structure et unités de sens.** La maquette a des *unités de sens* sémantiques (taux, seuil, échéance), retrouvées par règle. Le corpus impose des *unités de structure* légistiques (I, A, 1°, a), alinéa, phrase, mots avec leur occurrence). Ce sont deux calques distincts : la structure porte l'identité stable, le sens se superpose. Le filet doré reste réservé au sens ; la structure se marque par la marge (numéros, retraits). — *calque, prolonge*
- **P2.d — Ancrages qui survivent.** Une note, une question (H), un motif (I0) ou un fil de dépendance s'ancre à l'unité stable et non à une position. Quand le texte bouge, l'ancre suit ; si l'unité disparaît, l'ancre devient orpheline, visible comme telle (A1.c). — *donnée, neuf*

*Données* : identifiants stables d'unités. S'ils manquent, il faut un alignement calculé entre versions, ce qui est une tâche à part entière pour le canal 1.

## P3. L'amendement comme opération + plage + auteur + motif

La maquette stocke chaque amendement comme un alinéa entièrement réécrit (mode `rediger`, plus `completer` et `supprimer`). Le corpus en fait une opération sur une plage.

- **P3.a — Recto / verso.** La feuille d'amendement a deux faces. Le **recto** est l'effet : le texte visé avec les corrections apparentes, ce que fait la maquette aujourd'hui. Le **verso** est l'acte : le dispositif formel (« À l'alinéa 2, substituer au taux : « 25 % » le taux : « 30 % ». »), l'exposé sommaire, les signataires, les tampons. On retourne la feuille d'un geste. — *objet, prolonge*
- **P3.b — Dispositif généré.** Quand j'édite en place (WYSIWYG), le logiciel écrit le dispositif légistique correspondant, et inversement : un dispositif saisi produit l'effet. C'est le passage de « mon texte » à « mon amendement ». — *contrôle, neuf*
- **P3.c — Plage visible.** Sur le texte de référence, l'emprise de l'amendement (la plage réellement touchée) est un trait de marge, distinct des corrections. Si la plage déclarée diffère de la plage réelle (I1), on voit deux traits. — *marque, neuf*
- **P3.d — Vocabulaire complet des opérations** : supprimer, rédiger, substituer, insérer, compléter, rétablir, plus *article additionnel* (« Après l'article 4, insérer un article ainsi rédigé »), absent de la maquette. Chaque opération a sa signature visuelle, mais toutes restent dans la règle ajout = bleu souligné gras, suppression = barré. Le rétablissement d'un passage supprimé par la commission montre le passage en ajout, avec mention « rétablit ». — *marque, prolonge*
- **P3.e — Signature.** Un pied de feuille porte les signatures manuscrites stylisées : premier signataire, cosignataires, groupe (voir E6). — *marque, neuf*

*Données* : dispositif structuré (type d'opération, cible, plage), texte, auteur, cosignataires, exposé sommaire.

## P4. Le statut à plusieurs dimensions

Le statut se décompose en traitement, recevabilité, avis, sort et mode de vote. Ce n'est pas un badge unique.

- **P4.a — Bande de tampons.** Une colonne de cases en marge droite de chaque feuille, une case par dimension, dans un ordre fixe : *recevabilité · avis commission · avis Gouvernement · sort · mode de vote*. Une case vide signifie « pas encore » ; une case remplie porte un tampon encré (couleur sourde, légèrement de travers, comme un vrai tampon). On lit la trajectoire de l'amendement d'un coup d'œil. — *marque, neuf*
- **P4.b — Grammaire matérielle du sort** (détails en B0) : adopté = la feuille se fond dans le texte ; rejeté = tampon ; tombé = feuille ombrée avec un fil vers la cause ; retiré = feuille pliée ; non soutenu = sans signature ; irrecevable = découpée. — *marque, neuf*
- **P4.c — Filtres sur les dimensions.** Dans toute pile, on filtre ou on trie par case : « seulement les avis favorables », « seulement ce qui est encore en jeu ». — *geste, neuf*
- **P4.d — Libellé exact.** Le corpus cite environ 40 valeurs de sort dans l'open data. Elles sont regroupées en 6 à 8 familles visuelles ; le libellé officiel exact apparaît au survol du tampon. — *marque, neuf*

## P5. Le graphe de dépendances

Identiques, concurrents, sous-amendements, compromis, conséquences, repli : le corpus demande de pouvoir calculer « si X est adopté, alors Y et Z tombent ».

- **P5.a — Fils.** Sur la pile ou la vue d'ensemble, des fils fins relient les feuilles liées. Chaque type de lien a son trait : trait plein pour la concurrence, double trait pour l'identité, épingle pour le sous-amendement, accolade pour le compromis, pointillé pour la conséquence, escalier pour le repli. — *calque, neuf*
- **P5.b — Survol prédictif.** Au survol d'une feuille, celles qui tomberaient si elle était adoptée s'inclinent légèrement en arrière et s'estompent, comme la feuille du tambour qui bascule. Celles qui deviendraient votables se redressent. — *geste, prolonge*
- **P5.c — Mode scénario.** On pose des hypothèses (« X adopté », « Y rejeté ») avec des tampons au crayon, pas à l'encre. Le texte résultant se recompose en direct et la pile se met à jour. C'est l'équivalent légistique du « en direct » de CLAUDE.md. — *mode, neuf*
- **P5.d — Compte des conséquences.** « Fait tomber 12 amendements » : c'est un chiffre qui a un sens au sens de CLAUDE.md, car c'est un dénombrement, pas un score. — *marque, neuf*

## P6. Les trois ordres

L'ordre de dépôt (le numéro), l'ordre du texte et l'ordre d'appel sont trois données distinctes.

- **P6.a — Tri du tambour.** La pile des autres, aujourd'hui dans un ordre fixe, se trie selon l'un des trois ordres. Un sélecteur discret donne les trois positions : n°, texte, appel. Changer de tri fait glisser les feuilles à leur nouvelle place (animation). — *geste, prolonge*
- **P6.b — Le dérouleur comme document.** Le dérouleur (l'ordre d'appel annoté, discussions communes comprises) est une feuille de papier à part entière, lisible comme un ordre du jour, cliquable ligne par ligne. — *objet, neuf*
- **P6.c — « Nous sommes ici ».** En séance, un repère doré sur le dérouleur et dans la pile indique l'amendement en discussion. Ceux qui sont passés portent leur tampon de sort. — *marque, neuf*

## P7. Les acteurs et leurs pouvoirs

Les pouvoirs des acteurs varient selon l'étape.

- **P7.a — Acteurs institutionnels distincts des groupes.** Le Gouvernement, le rapporteur et le président de séance ne sont pas des groupes parmi d'autres (voir 4-remises-en-cause). Ils ont leur propre place, au-dessus ou autour de la pile, pas dedans. — *vue, remet en cause*
- **P7.b — Fiche des droits.** Pour l'étape courante, une petite feuille « ce que chacun peut faire maintenant » : déposer, sous-amender, voter, s'opposer à l'examen, lever le gage. Ma ligne est mise en avant. — *objet, neuf*
- **P7.c — Actions contextuelles.** Les boutons d'une feuille n'apparaissent que si j'en ai le droit : retirer et ajouter des signataires pour le premier signataire seulement ; reprendre un amendement retiré ; sous-amender ; rectifier. — *geste, neuf*

## P8. Le temps

Délais, budgets de parole, étapes de la navette, état de chaque article à chaque étape.

- **P8.a — Poignée du bas = le temps.** La maquette a des poignées en haut (l'échelle) et sur les côtés (les volets). Le bas est libre : il devient l'accès au temps (frise des étapes, P1.d). Voir 3-vues-axes-echelles. — *geste, prolonge*
- **P8.b — Horloges.** Le délai de dépôt restant, sur l'article ou le texte ; le budget de temps législatif programmé de mon groupe ; le couperet. Ce sont des chiffres qui ont un sens. — *marque, neuf*
- **P8.c — Tableau d'états.** Pour chaque article, son état à chaque étape (créé, modifié, conforme, supprimé, rétabli), en grille article × lecture. C'est la vue « navette ». — *vue, neuf*

## P9. L'alignement de N versions et le compromis en construction

Document à 4 colonnes, CMP, synopse. Le corpus le dit : aucun standard ne le modélise, c'est un vrai espace d'innovation.

- **P9.a — Éclatement à N colonnes.** L'éclatement de la maquette (une rédaction | la commission | l'autre) se généralise à N colonnes alignées par sous-grille. Par exemple : Commission européenne | Parlement | Conseil | compromis, ou texte AN | texte Sénat | proposition de rédaction. — *vue, prolonge*
- **P9.b — Colonne de compromis éditable.** La dernière colonne est une feuille vierge qu'on rédige en piochant dans les autres colonnes : un clic sur un passage d'une colonne le copie dans le compromis. Le compromis montre en marge, passage par passage, de quelle colonne il vient (voir P10). — *objet, neuf*
- **P9.c — Lignes résolues et lignes ouvertes.** Dans l'alignement, chaque ligne (alinéa ou unité) porte un état : accord, divergence, réservée. On peut replier les lignes en accord. — *marque, neuf*
- **P9.d — Coffre à plus de deux places.** Le coffre de comparaison (deux pastilles aujourd'hui) peut en accepter davantage dans le cas des N versions. ⚠ Cela heurte la symétrie « une | commission | l'autre » ; voir 4-remises-en-cause. — *geste, remet en cause*

## P10. L'attribution inverse

De quel amendement vient chaque passage du texte adopté ? Seul le Sénat l'expose partiellement.

- **P10.a — Filet de provenance.** Sur un texte adopté, chaque passage issu d'un amendement porte un filet très fin dans la couleur du groupe auteur, en marge ou sous les mots. Au survol, on voit le n° de l'amendement ; au clic, on ouvre sa feuille. — *calque, neuf*
- **P10.b — « Ce qu'il reste de moi ».** Pour mon groupe, ou pour moi, la liste de tous les passages du texte final qui viennent de nous, et de ceux qui ont été adoptés puis perdus en route (seconde délibération, 49-3, CMP). — *vue, neuf*
- **P10.c — Strates.** Une vue « géologique » du texte : chaque passage est coloré par l'étape où il est apparu (initial, commission, séance, Sénat, CMP). — *calque, neuf*

---

## Besoins de données à transmettre au canal 1 (récapitulatif)

1. Les textes complets de chaque version, articles conformes compris (reconstitution des textes à trous, A2).
2. Des identifiants d'unités stables ou un alignement calculé entre versions.
3. Les amendements avec leur dispositif structuré, la version visée, les signataires (premier et cosignataires), l'exposé sommaire, les rectifications successives.
4. Le statut décomposé : recevabilité (et motif), avis commission, avis Gouvernement, sort (libellé exact), mode de vote, scrutin.
5. Les dérouleurs et les listes de vote : ordre d'appel, discussions communes, réserves, priorités.
6. Les liens entre amendements : identiques, sous-amendements, conséquence, compromis, repli quand il est déclaré.
7. Les comptes rendus, pour les engagements du ministre, les suspensions et les explications de vote.
8. Les délais de dépôt et le temps législatif programmé, avec ce qui a été consommé par groupe.
9. Les tableaux comparatifs : droit en vigueur, texte, amendement.
10. Les acteurs et leurs rôles par texte : rapporteur, rapporteurs pour avis, membres de la commission, membres de la CMP.
