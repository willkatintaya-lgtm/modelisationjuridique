# Canal 2 — Fonctionnalisation du corpus

Le corpus de référence ([`0-corpus.md`](0-corpus.md), copie non modifiée) est *Situations de la discussion législative — synthèse comparative* (@Willka, 8 nov. 2026). Il est tenu pour bon : rien ici ne le corrige ni ne le complète. Ce dossier en tire des **propositions d'interface**, sans trier. Le tri revient à l'utilisateur et au canal 3.

## Pré-cadrage

**Ce que j'ai compris.** Le corpus range environ 280 situations réelles en 9 familles (A à I), puis il expose deux vues transversales et dix exigences pour le modèle de données. Son point d'entrée est un diagnostic : les huit exemples d'origine décrivent des *amendements vus comme des objets textuels localisés, observés à un instant donné, du point de vue de leurs auteurs et des groupes, dans une seule lecture et une seule chambre, avec une négociation horizontale entre groupes*.

C'est exactement la maquette actuelle. La Boussole sait montrer :
- une position dans le texte (haut/bas, crans d'échelle) ;
- un axe d'acteurs (gauche/droite, moi ↔ les autres) ;
- un instant unique, un texte de référence unique et des acteurs tous équivalents.

Fonctionnaliser le corpus revient donc surtout à ouvrir les huit dimensions laissées dans l'ombre : le temps, la mécanique du sort, l'asymétrie des acteurs, les instruments hors amendement, les documents de pilotage, l'effet juridique, le bicamérisme et le parlementaire isolé. Pour chacune, il faut décider si elle entre dans la grammaire existante ou si elle oblige à la casser.

**Hypothèse directrice.** Chaque dimension nouvelle devient l'une de ces quatre choses :
- un **axe** (on s'y déplace) ;
- un **calque** (on l'allume sur ce qu'on voit) ;
- une **marque** sur la feuille (un tampon, un filet, un pli) ;
- un **objet** nouveau (une feuille d'une autre nature).

La matière papier offre un vocabulaire riche et cohérent avec la direction artistique : tampons, signatures, plis, agrafes, papiers épinglés, recto/verso, feuilles découpées, cachets de cire.

**Comment je parcours le corpus.** En trois passes, dans trois fichiers principaux :

| Fichier | Contenu |
|---|---|
| [`1-primitives.md`](1-primitives.md) | Ce que l'interface doit savoir montrer, d'après les dix éléments du modèle de données. Ce sont les briques réutilisées partout, avec les données qu'elles demandent au canal 1. |
| [`2-situations.md`](2-situations.md) | Familles A à I, situation par situation : des propositions concrètes à plusieurs granularités. C'est le gros du travail. |
| [`3-vues-axes-echelles.md`](3-vues-axes-echelles.md) | Partie II du corpus : la vue par thème, la navigation à plusieurs échelles, les trois axes et le calque du graphe. Comment tout cela tient dans les gestes. |
| [`4-remises-en-cause.md`](4-remises-en-cause.md) | Ce que le corpus fragilise dans la maquette et CLAUDE.md, et ce qu'il confirme. |
| [`5-scenes-et-roles.md`](5-scenes-et-roles.md) | Recomposition en scènes : moments de la procédure × rôles de l'utilisateur. Le flux cible de CLAUDE.md est relu à la lumière du corpus. |
| [`6-questions.md`](6-questions.md) | Les décisions qui reviennent à l'utilisateur. |

**Ce que je ne fais pas** : corriger ou compléter le corpus, trier, prototyper, coder.

**Ce que je respecte** : la direction artistique (papier sur fond sombre, accent doré), l'absence de score global, des groupes fictifs, la symétrie moi / les autres. Quand une proposition heurte une de ces règles, je l'écris quand même et je la signale par ⚠.

## Conventions

Chaque proposition a un identifiant (`A4.b`, `P3.a`…) pour que le canal 3 et la session de refonte puissent la citer. Elle porte deux étiquettes en fin de ligne.

**Forme :**
- *marque* : un signe sur une feuille existante ;
- *geste* : une interaction ;
- *objet* : une nouvelle sorte de feuille ou d'élément ;
- *vue* : un cran d'échelle, un arrangement ;
- *volet* : une nouvelle destination gauche/droite ou autre ;
- *calque* : une surcouche qu'on allume ;
- *contrôle* : une vérification ou une alerte à la rédaction ;
- *mode* : une variante selon le rôle ou le moment ;
- *scène* : une étape du flux.

**Rapport à la maquette :**
- **prolonge** : étend un mécanisme existant ;
- **neuf** : n'a pas d'équivalent ;
- **remet en cause** : contredit un choix actuel.

Les références au corpus suivent son numérotage (`B2` = famille B, situation 2 ; `B0` = exemple d'origine placé en tête de famille).
