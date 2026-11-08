# 3. Le modèle d'interface

## 0. Mode d'emploi

Le modèle a cinq étages. Les deux premiers sont communs à tout ; les trois suivants se choisissent ou s'éliminent.

| Étage | Contenu | Comment l'utilisateur tranche |
|---|---|---|
| **1. Socle** (S1–S8) | Les invariants : papier, règle de comparaison, symétrie, gestes, chiffre sobre. | Ne se discute pas, sauf S2 (reformulation, T1). |
| **2. Diagnostic** | D'où vient le poids de la maquette. | À lire. |
| **3. Allègements** (L1–L4) | Quatre changements de la maquette actuelle qui retirent du poids avant d'en ajouter. | Un par un : garder ou refuser. |
| **4. Charpente** (α, β, γ) | Comment plusieurs interfaces cohabitent dans un même espace. | **Un choix entre trois.** Je recommande α. |
| **5. Directions** (D1–D13) | Ce qu'on ajoute, rangé par direction entière, avec le lieu où chacune vit. | **Éliminer d'un geste** : chaque direction est autonome ; ses dépendances sont indiquées. |

Pour la refonte, je suggère de construire chaque direction **derrière un interrupteur** (`DIRECTIONS = { D1:true, D2:true, … }`). L'utilisateur pourra ainsi éliminer une direction en la regardant, sans toucher au code.

Notation des données : ★ donnée directe, ◐ reconstruction, ○ absente (reprise du canal 1).

---

## 1. Socle

- **S1. Papier.** Tout ce qui se lit est une feuille, en matière, encre et typographie de CLAUDE.md. Thème sombre unique.
- **S2. La règle de comparaison, reformulée.** *Une référence vierge ; les écarts portés sur l'autre texte, en corrections apparentes ; la même règle des deux côtés.* La référence par défaut est **le texte de la commission**. Elle s'affiche **en tête de toute feuille comparée** (« face à : la commission ») et peut être une autre version (D1). Ajout, suppression, loupe et calque miroir sont inchangés. *(Rouvre r.VIERGE : `04-arbitrages.md` §1.)*
- **S3. Symétrie autour du centre.** Toute règle appliquée à la feuille du centre s'applique à ses voisines, et inversement. Le centre est « ma » feuille (le député de groupe, D13 mis à part).
- **S4. Le chiffre compte, il ne combine pas.** Un nombre est admis s'il compte une seule chose (minutes, voix, amendements, alinéas). Pas de score, d'indice, de probabilité ni de mode « prédire ». Une régularité observée se dit en phrase.
- **S5. Trois gestes, un sens chacun**, dans toutes les interfaces :
  - **haut/bas = parcourir** ce qui est sous les yeux, dans l'ordre de l'interface courante ;
  - **gauche/droite = voisin** : volet ou objet voisin dans l'interface courante ;
  - **pincer/clic = échelle**, un cran à la fois.
- **S6. Une feuille est un objet, pas une vue.** La même feuille (un amendement, une rédaction, un alinéa à une étape) a une identité stable et **se retrouve d'une interface à l'autre**. Changer d'interface la *déplace*, ne la *duplique* pas.
- **S7. Toute vue est un document.** Les vues non textuelles prennent la forme du document réel de la procédure qui leur correspond. Une frise devient une **bande** de papier (le feuilleton, l'ordre du jour), une matrice un **tableau imprimé** (le tableau comparatif, la grille du rapport), un lien un **fil** tendu entre deux feuilles, un ordre de vote une **liste de vote**. *(Résout r.PAPIER : T9.)*
- **S8. Replier avant de montrer.** Ce qui est répétitif ou rituel est plié par défaut : identiques, séries, gages, rédactionnels. Une pile montre ce qui est **en concurrence**, pas tout ce qui existe. *(T6, V2.)*

---

## 2. Diagnostic de pesanteur

**Inventaire.** La maquette compte cinq volets. Le mien et les autres ont trois crans d'échelle chacun, les articles deux. Chaque volet « comparer » a une bibliothèque, un coffre et un éclatement. S'y ajoutent la loupe, l'édition et l'index des unités. Cela fait **une quinzaine d'états d'écran**, tous dans une scène, avec Échap pour les dérouler un par un.

**D'où vient le poids : ce n'est pas la quantité de contenu, ce sont quatre confusions.**

| | Confusion | Symptôme |
|---|---|---|
| **P1** | Les volets mêlent des **lieux** (le mien, les autres, les articles) et des **verbes** (comparer). | Deux volets sur cinq sont « comparer », chacun accessible d'un seul côté. Comparer, c'est une action, mais elle oblige à se déplacer. |
| **P2** | L'échelle mêle la **granularité** (unité ⇄ alinéa) et la **référence** (« face à la commission »). | Le cran « origine » n'est pas plus large : il *ajoute la référence*. Avec une référence variable (S2), ce cran exploserait en autant de crans que de références. |
| **P3** | La feuille est **mince** : elle n'a qu'un recto. | Toute information sur un objet (son sort, ses signataires, ses versions) devrait devenir un nouvel écran ou un nouveau mode. |
| **P4** | La scène est **unique**. | Chaque moment (écrire, suivre, revoir), chaque ordre (dépôt, texte, appel) et chaque information devient un *mode* de la même scène, dans les mêmes gestes. |

**Projection.** Si les 186 extensions comptées par le canal 2 entraient dans la scène actuelle, il faudrait un quatrième geste (le temps), une deuxième échelle (le droit), des filtres, des tris, des calques, des panneaux d'état et des circuits d'actes. Ce serait la maquette actuelle multipliée par trois, sans gain de lisibilité. Le poids n'est pas un problème de contenu. C'est un **problème de rangement** : tout est rangé au même endroit.

---

## 3. Allègements (valables quelle que soit la charpente)

### L1. Comparer devient un geste, plus un lieu
- **Le coffre devient transversal.** Toute feuille, dans toute interface, peut être déposée dans le coffre (glisser vers le haut, ou un clic sur un coin de la feuille). Les pastilles du coffre restent visibles en haut de l'écran, quelle que soit l'interface.
- **« Comparer » fait éclater le coffre sur place**, par-dessus l'interface courante, en colonnes : *une | la référence | l'autre*. Échap referme et rend l'interface intacte.
- **Les volets passent de cinq à trois** : `les articles ← LE MIEN → les autres`. La symétrie autour de ma feuille est intacte.
- **Les bibliothèques disparaissent comme volets.** Elles survivent comme **tiroir du coffre** : quand on le déplie, il montre toutes les rédactions de l'unité, de l'alinéa ou de l'article courant.
- *Ce qu'on perd* : le geste « encore un cran à droite pour comparer ». *Ce qu'on gagne* : on compare n'importe quoi depuis n'importe où, y compris des versions dans le temps (D1), deux étapes (D7) ou deux thèmes (D10).

### L2. « Face à » devient une référence, plus un cran
- **L'échelle redevient purement une granularité** : `unité de sens ⇄ alinéa ⇄ article`, puis, si D12, `⇄ texte`.
- **La référence s'affiche ou se masque** d'un clic sur l'en-tête de la feuille (« face à : la commission »). Affichée, elle se pose au-dessus de la feuille comme aujourd'hui, avec les corrections apparentes sur la feuille. Un second clic sur l'en-tête ouvre le choix de la référence (D1).
- *Variante conservatrice* : garder le dézoom vers « face à » comme aujourd'hui, et ne faire porter que le **choix** de la référence par l'en-tête.

### L3. Le dos de la feuille
- **Toute feuille a un verso.** On la retourne d'un clic sur le coin replié en bas à droite, ou avec la touche `R`. Elle pivote sur son axe vertical, et le tambour reste en place.
- **Le verso est la fiche de l'objet**, toujours dans le même ordre :
  1. identité : numéro, auteur, cosignataires, groupe, étape ;
  2. statut décomposé : traitement, recevabilité, avis de la commission, avis du Gouvernement, sort, mode de vote ;
  3. motif (exposé sommaire), avec la source revendiquée si elle existe ;
  4. versions : dépôt, mise en forme, rectifications ;
  5. liens : identiques, discussion commune, sous-amendements, cause de chute, famille de replis, lignée commission → séance ;
  6. provenance (pour un alinéa) ou survie (pour un amendement adopté).
- Matière : le même papier, un peu plus mat, sans filet doré. Les rubriques vides **ne s'affichent pas**.
- *Effet* : une bonne moitié des pistes X4, X5, X9 et X15 du canal 2, et une vingtaine des fonctionnalités du canal 1, trouvent leur place **sans nouvel écran**.

### L4. Le repli
- **Identiques** : une feuille, plusieurs pastilles de groupe ; on les déplie au zoom.
- **Séries** (même matrice, une valeur qui varie) : une feuille paramétrée, « 584 amendements : supprimer « 2027 » → [2028 … 2611] », qui s'ouvre en éventail.
- **Gage** : la clause rituelle est repliée en une ligne (« gage : tabac »).
- **Rédactionnels et coordinations** : rangés à part, comptés, non empilés.
- **Unité de la pile des autres** : la discussion commune si elle existe, sinon la rédaction distincte. L'amendement individuel est au verso. *(T5.)*

---

## 4. Charpente : plusieurs interfaces dans un même espace

Trois façons de faire cohabiter plusieurs interfaces sans changer d'espace. **Une seule est à retenir.**

### α. Les rangements *(recommandé)*

**Principe.** Les feuilles sont les mêmes partout (S6). **Une interface est une manière de les ranger**, et chaque rangement répond à une question. Changer d'interface, c'est **voir les mêmes feuilles se déplacer** vers leur nouvel ordre (transition animée de 0,5 s, chaque feuille glissant de sa place à la nouvelle). La feuille courante **reste au centre** pendant le passage : on ne perd jamais le fil (V12).

**Où se choisit le rangement.** Sur **le bord bas**, le seul côté libre : une poignée qui affiche le rangement courant et ses voisins (`le plan · ÉCRIRE · le dérouleur · l'histoire · les thèmes`). Un clic ou un glissement sur la poignée change de rangement. Le moment du dossier propose le rangement par défaut : avant le délai, *écrire* ; pendant la séance, *le dérouleur* ; après, *l'histoire*.

**Les rangements.** Chaque rangement garde les trois gestes avec le même sens (S5) ; seul ce qu'ils parcourent change.

| Rangement | Question | haut / bas parcourt | gauche / droite | échelle (pincer) | Directions qui s'y logent |
|---|---|---|---|---|---|
| **R0 · Le plan** | Où en est le dossier, où ça se dispute, où suis-je ? | les articles du texte | — | article ⇄ texte | D12, D6 (bandeau), D7 (marques d'étape) |
| **R1 · Écrire** | Que dit mon texte face aux autres ? | mes feuilles (alinéas, famille de replis) | les articles ← **le mien** → les autres | unité ⇄ alinéa ⇄ article (⇄ droit, si D4) | maquette actuelle, D9, D3, D4 |
| **R2 · Le dérouleur** | Dans quel ordre cela va-t-il se décider, et comment cela s'est-il décidé ? | les places, dans l'**ordre d'appel** | article précédent ← → suivant, dans l'itinéraire de séance | discussion commune ⇄ amendement ⇄ épisode (verbatim) | D2, D3, D5, D6 |
| **R3 · L'histoire** | D'où vient ce texte, qu'est-il devenu ? | les **étapes** du même alinéa ou article | Assemblée ← → Sénat (avec la CMP au centre dans l'éclatement) | alinéa ⇄ article ⇄ grille articles × étapes | D1, D7, D4 |
| **R4 · Les thèmes** | Sur un enjeu, qui porte quoi, à travers le texte ? | les passages du thème, en diagonale du texte | synthèse ← **mon texte du thème** → les autres | thème ⇄ passage ⇄ alinéa | D10, V14 (mon contre-projet) |

*Variante* : un rangement **R5 · Par auteur** (un groupe, le rapporteur, le Gouvernement, un tiers : ce qu'il a déposé, obtenu, rallié, sous forme de liste et sans score). Il ne s'ajoute que si D8 est gardé.

**Ce qui tient les rangements ensemble** : les feuilles (S6), la règle de comparaison (S2), le coffre qui suit la main d'un rangement à l'autre (L1), le verso (L3) et la feuille courante.

**Pourquoi α.** C'est la lecture la plus directe de « plusieurs interfaces dans un même espace » : l'espace et les objets ne changent pas, l'ordre change. Il n'y a ni nouvel écran ni panneau. Chaque rangement est **léger en lui-même**, avec trois volets au plus et trois crans. La lourdeur de la maquette actuelle est répartie au lieu d'être empilée. Éliminer une interface revient à retirer un nom de la poignée basse.

### β. Les tables

**Principe.** Les interfaces ont chacune **une place fixe** sur le plan sombre, comme des tables dans un atelier : le plan au centre, *écrire* à gauche, *le dérouleur* à droite, *l'histoire* en bas, *les thèmes* en haut. Un dézoom au-delà du cran le plus large montre l'atelier entier ; on zoome sur une table pour y entrer.
- *Pour* : mémoire spatiale très forte ; « le même espace » au sens littéral.
- *Contre* : un niveau d'échelle de plus. Les feuilles existent sur plusieurs tables à la fois, ce qui contredit S6, sauf à les faire voyager. Les déplacements de caméra sont longs.

### γ. Les calques

**Principe.** On garde une seule scène, la maquette actuelle, et on allume ou éteint des couches : état, provenance, temps, liens, séance.
- *Pour* : changement minimal.
- *Contre* : n'allège rien. Chaque couche ajoute une commande et des marques sur une scène déjà pleine. Elle ne résout ni P2 ni P4.
- *Usage recommandé* : **réservé aux marques légères**, à l'intérieur de α. Par exemple les pastilles d'avis (D2) ou le tampon de provenance (D7), allumés ou éteints par un interrupteur discret.

### Schémas (charpente α)

```
R0 · LE PLAN                                   R1 · ÉCRIRE (maquette allégée)
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│ bandeau : séance 16–20 nov · délai   │       │ ◦◦ coffre (pastilles)    face à : CE ▾│
│ 12 nov · prochain : art. 2           │       │                                      │
│ ┌──────────────────────────────────┐ │       │ articles ‹ ┌──────────────┐ › autres │
│ │ Art. 1er      ·                  │ │       │ index      │ MA FEUILLE   │          │
│ │ Art. 2  ▮▮▮▮▮ 53 tombés  ● moi   │ │       │ des unités │ (recto/verso)│          │
│ │ Art. 3  (Supprimé)               │ │       │ ─ seuil 4  │ ↺ coin       │          │
│ │ Art. 4  ▮▮▮   ● moi  ◆ thème    │ │       │ ─ taux 7   └──────────────┘          │
│ │ Art. 4 bis (nouveau)             │ │       │              tambour                 │
│ └──────────────────────────────────┘ │       │                                      │
│ le plan · écrire · dérouleur · …  ▾  │       │ le plan · ÉCRIRE · dérouleur · …  ▾  │
└──────────────────────────────────────┘       └──────────────────────────────────────┘

R2 · LE DÉROULEUR                              R3 · L'HISTOIRE
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│ art. 4 · place 12/31 · ▶ en séance   │       │ alinéa 13 · face à : étape précédente│
│ ┌ DC n° 12 ─────────────────────────┐│       │  dépôt        ─┐                     │
│ │ 1  UT 340   rejeté  ✕ ✕  13:02:11 ││       │  commission    ├ tambour des étapes  │
│ │ 2  SOL 212  ADOPTÉ  ✓ S  13:04:40 ││       │  séance AN    ─┘   tampon : CE 735   │
│ │ 3  ECO 87   tombé   ┄┄┄┄          ││       │  Sénat · CMP · loi                   │
│ │ 4  LL 15    tombé   ┄┄┄┄          ││       │ AN ‹  [ AN | CMP | Sénat ]  › Sénat  │
│ └───────────────────────────────────┘│       │       (éclatement)                   │
│ le plan · écrire · DÉROULEUR · …  ▾  │       │ … · dérouleur · L'HISTOIRE · …    ▾  │
└──────────────────────────────────────┘       └──────────────────────────────────────┘
```

Dans R2, les deux symboles après le sort sont les avis (commission, Gouvernement) : ✕ défavorable, ✓ favorable, S sagesse. Les « tombés » sont des feuilles basculées par le tambour, encore lisibles.

---

## 5. Directions (chacune éliminable d'un geste)

Format de chaque fiche : **Apporte** · **Vit dans** · **Formes papier** · **Données** · **Gisements** · **Touche** (règles de CLAUDE.md) · **Dépend de** · **Poids**.

### D1 · Versions et référence variable
- **Apporte** : comparer une feuille à n'importe quelle autre version d'elle-même ou d'un autre texte. Versions d'amendement (dépôt → mise en forme → rect. 1 → rect. 2) ; étapes d'un alinéa ; sous-amendement face à son amendement ; texte initial face au texte de la commission (« ce que la commission a déjà changé »).
- **Vit dans** : l'en-tête « face à : … » de toute feuille (L2) ; le verso, rubrique versions (L3) ; R3.
- **Formes papier** : les mêmes corrections apparentes ; une liasse de versions qu'on feuillette au tambour.
- **Données** : ★ textes par étape (AN) ; ★ versions d'amendement via l'historique git de Tricoteuses ; ◐ alignement alinéa par alinéa entre étapes (identifiants stables du Sénat dans une même chambre, appariement par le texte entre les chambres).
- **Gisements** : A1, F26 du canal 1 ; X1, A1-8, M1 du canal 2 ; M1 de la maquette.
- **Touche** : r.VIERGE, reformulée en S2. **Dépend de** : rien. **Poids** : faible, c'est un réglage et non un lieu.

### D2 · Sort et état
- **Apporte** : chaque feuille dit ce qui lui est arrivé. Matières par sort :
  - adopté : feuille pleine, tampon « ADOPTÉ » ;
  - rejeté : feuille pleine, une ligne de décision ;
  - tombé : feuille basculée, avec un fil vers celle qui l'a fait tomber ;
  - retiré : coin plié, avec « au profit de » ou « contre engagement » le cas échéant ;
  - non soutenu : feuille pâle ;
  - irrecevable : feuille fantôme, texte récupéré barré, motif en capitales espacées ;
  - jamais atteint : feuille en ombre derrière la pile.

  S'y ajoutent les pastilles d'avis à trois temps (commission | Gouvernement | issue) et le verdict « article 88 » comme préfiguration.
- **Vit dans** : la feuille (recto : matière et pastilles ; verso : statut décomposé) ; la **pile des écartés**, au dézoom de la pile des autres dans R1 ; R2.
- **Données** : ★ sort, état, sous-état, date du sort ; ★ avis (Sénat en champs, AN dans la phrase de décision du compte rendu) ; ★ texte des irrecevables via Tricoteuses (241 sur 242 sur le logement).
- **Gisements** : A2, F2, F3, F27, F31 du canal 1 ; X4 et la famille B du canal 2.
- **Touche** : r.ENCRE à surveiller ; les matières de sort ne sont pas des encres de texte. **Dépend de** : rien. **Poids** : faible ; c'est le levier le plus rentable des trois gisements (K2).

### D3 · La concurrence réelle
- **Apporte** : la pile des autres devient la **pile des concurrents**, rangée par discussion commune, avec les identiques pliés (L4) et l'**ordre** au choix (dépôt, texte, appel). La cascade : quand une rédaction est adoptée, les suivantes basculent en même temps. La simulation « et si celle-ci passait ? » montre sur calque ce qui tomberait et ce que deviendrait le texte. La discussion commune déclarée s'affiche à côté du regroupement calculé, chacun nommé comme tel (T10).
- **Vit dans** : R1 (les autres), R2 (dans l'ordre d'appel).
- **Formes papier** : la **liste de vote** comme partition ; le fil tendu vers la cause d'une chute.
- **Données** : ★ discussion commune et identiques (identifiant et position) ; ◐ cause de la chute ; ★ ordre d'appel (eLiasse, compte rendu).
- **Gisements** : A4, B3, B4, F4, F5 du canal 1 ; X5, X6, X18, M5, M6 du canal 2 ; regroupement par proposition de la maquette.
- **Touche** : rien. **Dépend de** : D2 pour la cascade. **Poids** : moyen (la simulation).

### D4 · Le droit (« le code tel qu'il deviendrait »)
- **Apporte** : un cran au-dessus de l'article. On y voit l'article de code en vigueur, en référence vierge, et en corrections apparentes le code après application **du texte de la commission, de ma rédaction ou de celle d'un groupe**, avec la même symétrie. Chaque instruction porte un statut : appliquée, ambiguë, en échec. S'y ajoutent l'alerte de **dérive de la cible** (le code a changé pendant l'examen) et le **vérificateur de renvois**. Les unités de sens retrouvent prise ici sur un texte modificatif (T7).
- **Vit dans** : un cran d'échelle dans R1 et R3 (*recommandé*) ; *variante* : un rangement à part.
- **Données** : ★ code consolidé en git (Tricoteuses) ; ◐ application des instructions (10 sur 10 sur l'article 4 du logement).
- **Gisements** : A3, A6, F28, F29 du canal 1 ; I4, O7-2 du canal 2.
- **Touche** : r.GESTES, si l'on en fait une seconde échelle. **Dépend de** : D1 (la référence devient le code en vigueur). **Poids** : moyen ; indispensable si l'on passe aux données réelles (`04-arbitrages.md` §6).

### D5 · La séance
- **Apporte** :
  - le **rite** : l'épisode au verso de chaque amendement de séance (appel, défense, avis, répliques, décision ; minutes, orateurs, interruptions), avec le verbatim au zoom ;
  - la **rafale** : feuilles serrées que le tambour fait défiler d'un coup ;
  - la **feuille de vote** sous un amendement soumis à scrutin (par groupe : pour, contre, abstention ; les dissidents nommés en marge ; le demandeur) ;
  - la **partition de séance** : une bande par séance, les épisodes à leur seconde, les suspensions en blancs ;
  - l'**itinéraire** dans le texte (priorités, réserves, seconde délibération).
- **Vit dans** : R2 ; le verso (épisode) ; R0 (itinéraire tracé sur le plan).
- **Formes papier** : compte rendu, bande, feuille de vote en colonnes imprimées.
- **Données** : ★ compte rendu codé et horodaté ; ★ scrutins (lien fiable à 97,9 % avec l'amendement) ; ★ compte rendu de commission par réunion.
- **Gisements** : A7, B2, B6, B7, F12, F13, F32–F34 du canal 1 ; familles B et G du canal 2.
- **Touche** : r.SCORE pour la feuille de vote : ce sont des voix, un chiffre admis par S4. **Dépend de** : D2. **Poids** : moyen à fort. *Sous-option éliminable à part* : le réseau des applaudissements.

### D6 · Le direct
- **Apporte** : sur un dossier vivant, la pile des autres **se remplit** pendant que j'écris, avec une latence affichée honnêtement (« déposé il y a ~3 j, visible depuis 2 h ») ; la **tête de lecture** du dérouleur avance ; les sorts tombent. Le bandeau d'état du dossier donne le compte à rebours du délai (calculé par défaut et signalé comme tel). Les **feuilles fantômes de redépôt** montrent les rédactions rejetées en commission qui pourraient revenir et deviennent réelles quand elles reviennent.
- **Vit dans** : R0 (bandeau), R1 (pile des autres), R2 (tête de lecture).
- **Données** : ★ open data toutes les 2 h ; ◐ WebSocket eLiasse (non testé) ; ○ délai de dépôt (publié nulle part en données).
- **Gisements** : A8, E3, F35–F37 du canal 1 ; X13, X19 du canal 2 ; et la question ouverte « en direct » de CLAUDE.md, qui reçoit un second sens : *les autres déposent pendant que j'écris*.
- **Touche** : rien. **Dépend de** : D2, D3. **Poids** : fort côté technique, faible côté interface.
- **Fenêtre** : séance logement du **16 au 20 nov. 2026**, délai estimé au 12 nov. Aujourd'hui, 8 nov. → `04-arbitrages.md` §7.

### D7 · La navette
- **Apporte** :
  - la **provenance** de chaque alinéa : un tampon en marge (dépôt, commission, séance, Sénat, CMP), et au survol l'amendement d'origine ;
  - le **palimpseste** (les couches successives, pas seulement le résultat) ;
  - la **CMP en éclatement** AN | CMP | Sénat ;
  - le **fil de vie** d'un amendement adopté (commission ✔ → séance ✔ → CMP ✘), au verso ;
  - la **grille articles × étapes** comme tableau imprimé ;
  - l'**aval** : censure, réserve, coquille au JO.

  Les trous de provenance (alinéas écrits par la CMP, sans auteur) sont montrés comme tels (V3).
- **Vit dans** : R3 ; le verso ; R0 (marques d'étape par article).
- **Données** : ★ Sénat, provenance de la dernière étape ; ◐ survie à l'AN, par sous-chaînes ; ★ dates de l'aval ; ○ texte des décisions du Conseil constitutionnel (site du Conseil).
- **Gisements** : A5, C1–C4, F14–F16, F30, F44 du canal 1 ; familles A et H, M9, M10, X10 du canal 2.
- **Touche** : r.COF si l'éclatement passe à N colonnes (le document à 4 colonnes). Je recommande de garder **trois colonnes**, la CMP en est un cas exact. **Dépend de** : D1. **Poids** : moyen.

### D8 · Acteurs et tiers
- **Apporte** :
  - le **Gouvernement** et la **commission ou rapporteur** deviennent des acteurs institutionnels, retirés de la liste des groupes, avec une matière propre aux amendements « du banc » ;
  - la **fiche de groupe** sur un dossier (liste, sans score) ;
  - la **fiche « qui a écrit ça ? »** (tiers revendiqué dans l'exposé, auditionné ou non, inscrit HATVP) ;
  - « qui était là » au moment d'une décision.

  La référence elle-même est attribuée : « texte de la commission, rapporteure X » (V4).
- **Vit dans** : le verso (source, signataires) ; R5 par auteur (variante de α) ; les en-têtes.
- **Données** : ★ auteurs, cosignataires, présences ; ◐ sources (regex sur l'exposé).
- **Gisements** : A6, D1–D3, F41, F42 du canal 1 ; X7 et la famille E du canal 2.
- **Touche** : rien (rester sur des groupes fictifs). **Dépend de** : rien. **Poids** : faible à moyen.

### D9 · L'atelier de rédaction
- **Apporte** :
  - **ma famille de replis** : la pile du mien devient, par alinéa, une échelle de positions du maximal au minimal, avec « dupliquer en repli » ;
  - **plusieurs amendements miens** par alinéa, des plages multi-alinéas et l'article additionnel ;
  - les **« en conséquence » générés** (et les alinéas touchés hors alinéa déclaré, éclairés) ;
  - le **gage** proposé ;
  - le **sas de confirmation** (scène 3), qui est un contrôle de recevabilité : art. 40 (proposer un gage ou une demande de rapport), art. 45 (lien avec le texte), doublon (« identique à SOL 212 : cosigner ? »), « déjà satisfait par la commission » ;
  - les **contrôles légistiques** : renvois, entrée en vigueur, outre-mer ;
  - le **brouillon de séance** tiré de mes rejetés de commission.
- **Vit dans** : R1 ; le sas est la frontière entre R1 et les autres rangements (rien ne sort de R1 sans le traverser).
- **Données** : ◐ heuristiques (sous-états d'irrecevabilité comme nomenclature) ; ○ contrôle réel (fait par les services).
- **Gisements** : A2, A5, F6, F20, F21, F36, F38 du canal 1 ; X9, X14, X20 et la famille C du canal 2 ; scènes 2 et 3 de la maquette.
- **Touche** : rien. **Dépend de** : D4 pour les renvois. **Poids** : moyen.

### D10 · Thèmes et synthèse (scènes 4 et 5)
- **Apporte** :
  - des **thèmes de trois sources**, chacune nommée : *déclarés* (séries annoncées par le rapporteur, groupements, discussions communes), *sémantiques* (unités de sens étendues au texte entier), *proposés* par Claude à la confirmation ;
  - la **vue diagonale** (les passages d'un thème à travers les articles) ;
  - une **synthèse en trois strates** : (1) le commentaire du rapport, « le texte / le Sénat / la commission » ; (2) les positions des autres d'après les épisodes ; (3) ce que fait mon texte ;
  - **mon contre-projet** lu en diagonale (V14).
- **Vit dans** : R4.
- **Formes papier** : la synthèse est une feuille ; la matrice thèmes × groupes est un tableau imprimé en texte court, sans chiffre composite.
- **Données** : ★ commentaires d'articles du rapport ; ★ séries du rapporteur (compte rendu de commission) ; ◐ `loiReference` (article de code visé) pour regrouper.
- **Gisements** : K9, F43, F47, E1 du canal 1 ; O6 du canal 2 ; M6 de la maquette.
- **Touche** : r.SCORE à tenir dans la synthèse. **Dépend de** : D3 (positions), D5 (épisodes) pour la strate 2. **Poids** : moyen.

### D11 · La négociation augmentée
- **Apporte** :
  - l'objet **« question »** ancré à un passage, adressé à un ou deux acteurs, avec réponse, assumé comme augmentation ;
  - sa transformation en acte (rectification, sous-amendement, amendement commun, retrait) ;
  - le sort **« a obtenu un engagement »** et le fil qui suit l'engagement jusqu'à la lecture suivante ;
  - la **rectification proposée** sur calque.
- **Vit dans** : un fil ancré, en marge de la feuille ; le verso ; le **calque** du provisoire (T10).
- **Données** : ○ entièrement saisie par l'utilisateur ; ◐ engagements repérés dans les comptes rendus (« d'ici la navette »).
- **Gisements** : O8, X11, X15, H0 du canal 2 ; F45 du canal 1 (retrait contre promesse).
- **Touche** : r.ENCRE (le provisoire). **Dépend de** : D13 (visibilité). **Poids** : moyen ; c'est la seule direction qui sorte du reflet de la procédure.

### D12 · Vue d'ensemble et volume
- **Apporte** :
  - **le plan** (R0) : le texte entier en une feuille longue, chaque article sur une ligne, avec en marge le nombre de passages disputés, mes amendements, les marques d'étape (nouveau, supprimé, conforme) et l'itinéraire de séance ;
  - le **cran « texte »** au-dessus de l'article ;
  - les **repliements** de L4, présentés comme des comptes (« 31 rédactionnels », « 1 série de 584 »).
- **Vit dans** : R0 ; le cran le plus large de chaque rangement.
- **Formes papier** : sommaire, feuilleton ; la « chaleur » rendue par une **épaisseur de marge** (un trait par amendement, en traits serrés), pas par une couleur de carte.
- **Données** : ★ tout est là (articles, positions, nombre d'amendements).
- **Gisements** : A9, F9 du canal 1 ; X3, X17, O7-3 du canal 2.
- **Touche** : rien. **Dépend de** : données de plusieurs articles. **Poids** : faible ; c'est l'entrée qui manquait (V13).

### D13 · Rôles et visibilité
- **Apporte** :
  - un centre variable (rapporteur, Gouvernement, isolé, observateur), la symétrie tenant autour du centre ;
  - la **visibilité** : privé (mon brouillon), partagé (mon groupe, un fil de négociation), public (le déposé) ;
  - les **actes** selon les droits : déposer, signer, retirer, reprendre ;
  - le **support** : poste, écran partagé, mobile en séance.
- **Vit dans** : un réglage global, hors de la scène.
- **Gisements** : X8, X12, P-C5 du canal 2.
- **Touche** : r.SYM. **Dépend de** : D8. **Poids** : fort ; elle change la nature de l'outil. Je recommande de la **reporter** et de garder seulement la visibilité (→ `04-arbitrages.md` §4).

### Hors champ (proposé)
- **Systèmes étrangers** : leurs *structures* sont reprises (liste de vote → D3 ; 4 colonnes → D7 ; arbre → sous-amendements au verso ; groupement → D10), pas leur procédure.
- **Lois de finances** : les crédits sont des tableaux et des flux, une autre matière.
- **Moteur multi-systèmes**, annuaire d'acteurs, outil d'administration, espace ministériel.
- **Vidéo de séance** (non vérifiée).

---

## 6. Données

### 6.1 Ce que le modèle doit porter (canal 2) et ce qu'on peut obtenir (canal 1)

| Élément du modèle (C5) | Disponibilité réelle | Directions qui en dépendent |
|---|---|---|
| M1 version visée | ★ texte à chaque étape ; ★ versions d'amendement (Tricoteuses) | D1, D7 |
| M2 identifiant stable | ◐ Sénat dans une chambre ; ✕ à travers la navette (appariement par le texte) | D1, D7, D11 |
| M3 opération + plage + auteur + motif | ★ auteur, exposé ; ◐ opérations (écart alinéa déclaré / portée réelle : 17 %) | D9, D3 |
| M4 statut à plusieurs dimensions | ★ sort, état ; ★ avis Sénat, ◐ avis AN ; ★ scrutin | D2 |
| M5 graphe de dépendances | ★ identiques, discussion commune, parent du sous-amendement ; ◐ cause de chute, replis | D3 |
| M6 trois ordres | ★ dépôt, place ; ★ appel (eLiasse, compte rendu) | D3, D5 |
| M7 acteurs et pouvoirs | ★ auteurs, rapporteur ; ○ règles (corpus) | D8, D13 |
| M8 temps | ★ horodatages ; ○ délai, temps législatif programmé | D5, D6 |
| M9 alignement de N versions | ◐ intitulés, identifiants Sénat | D7 |
| M10 attribution inverse | ★ Sénat (dernière étape) ; ◐ AN ; ✕ alinéas de CMP sans auteur | D7 |

### 6.2 Forme minimale d'une feuille (pour la refonte)

```js
// Une feuille = un objet ; les rangements ne font que la placer.
{
  id: "AN-L17-CE735",            // stable, survit aux renumérotations
  type: "amendement",            // amendement | redaction | alinea | version | episode | synthese
  cible: { article: "4", alinea: 13, plage: [13, 13], portee: [13, 15] },  // déclarée / réelle
  mode: "rediger",               // rediger | completer | supprimer | inserer | article_additionnel
  texte: "…",
  reference: "texte-commission", // ce face à quoi elle se compare par défaut
  auteur: { groupe: "SOL", signataires: [...], institution: null },  // "gouvernement" | "commission"
  statut: { traitement, recevabilite, avisCommission, avisGouvernement, sort, modeVote, dateSort },
  liens: [{ type: "identique|dc|repli|sous|tombe_par|consequence|lignee", vers: "…" }],
  ordres: { depot: 735, texte: "004-13-a", appel: 12 },
  versions: [{ date, texte, origine: "auteur|services|rect" }],
  motif: "…", source: "…",        // exposé ; tiers revendiqué
  provenance: null,               // pour un alinéa : { etape, amendement }
  repli: null                     // { serie: "…", valeurs: [...] } | { gage: true } | { redactionnel: true }
}
```

### 6.3 Fictif ou réel
Le canal 1 a déjà rendu les groupes fictifs dans ses extraits, avec les clés de la maquette (PR, SOL, ECO…). La règle « groupes fictifs » de CLAUDE.md est donc compatible avec les données réelles. Le choix porte sur le **texte** : garder l'article 4 fictif (normatif, lisible, 4 à 10 amendements par alinéa) ou passer à l'**article 4 réel** du logement (25 alinéas d'instructions sur l'art. 31 du CGI, 143 amendements, 62 passages disputés, sorts réels, version Sénat). → `04-arbitrages.md` §6. Une voie mixte est possible : réel dans R2 et R3, où les sorts et les étapes comptent ; fictif ou réel « consolidé » (D4) dans R1.

---

## 7. Montage suggéré pour la refonte

C'est un ordre de montage, pas un tri : tout est construit, puis l'utilisateur élimine.

1. **Allègements L1–L4** sur la maquette actuelle. C'est le préalable : sans eux, chaque direction alourdit.
2. **Charpente α** : la poignée basse et les rangements R0–R4, vides ou squelettiques, avec la transition qui fait voyager les feuilles.
3. **Directions sans dépendance** : D1, D2, D8, D12.
4. **Puis** D3, D4, D9, D7, D5, D10.
5. **Puis** D6 (direct), D11 (négociation), D13 (rôles).
6. Chaque direction derrière son interrupteur, avec un petit panneau papier « directions » (masqué par défaut, touche `D`) pour les allumer et les éteindre devant l'utilisateur.
