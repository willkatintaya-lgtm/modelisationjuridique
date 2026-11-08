# Canal 2 — Pistes d'implémentation du corpus

Le corpus de référence est [`0-corpus.md`](0-corpus.md), *Situations de la discussion législative — synthèse comparative* (@Willka, 8 nov. 2026), copié sans modification. Il est tenu pour bon : rien ici ne le corrige ni ne le complète.

## Pré-cadrage (révisé)

**L'objet de cette étape.** Explorer les potentialités d'implémentation des situations décrites par le corpus dans une interface 2D interactive et dynamique, ou dans un ensemble d'interfaces. Pour chaque réalité, la question est : *de combien de façons une interface pourrait-elle la montrer, la faire manipuler, la faire comprendre ?*

**Ce que cette étape ne fait pas.** Elle ne regarde pas la maquette actuelle (« Boussole des amendements »). Elle ne confronte rien à sa grammaire, à ses gestes ou à sa direction artistique, et elle ne trie pas. Plusieurs pistes peuvent être incompatibles entre elles : c'est voulu.

**Étape suivante, plus tard.** La confrontation rigoureuse des pistes avec la maquette se fera une fois le catalogue complet. Un premier brouillon, prématuré, est rangé dans [`etape-2-brouillon/`](etape-2-brouillon/) pour cette occasion.

**Méthode.**
1. Dresser l'inventaire des **registres** dont dispose une interface 2D interactive et dynamique : alignement de textes, frise, graphe, matrice, simulation, alerte, animation, etc. C'est le vocabulaire des réponses possibles.
2. Pour **chaque situation** du corpus, parcourir ces registres et noter toutes les pistes qui ont un sens. Chaque situation reçoit donc plusieurs réponses de formes différentes.
3. Relever les **assemblages** possibles : plusieurs situations servies par un même dispositif, ou découpage en plusieurs interfaces distinctes.

## Fichiers

| Fichier | Contenu |
|---|---|
| [`1-registres.md`](1-registres.md) | Le vocabulaire : registres d'interface et dimensions de variation. |
| [`2-pistes.md`](2-pistes.md) | Les pistes, situation par situation, dans l'ordre du corpus. |
| [`3-assemblages.md`](3-assemblages.md) | Dispositifs transversaux et ensembles d'interfaces possibles. |

## Conventions

- Chaque piste a un identifiant citable : `B2-3` = famille B, situation 2, piste 3. Les exemples d'origine sont notés `O1` à `O8`, les vues de la partie II `V6` et `V7`, les éléments du modèle `M1` à `M10`.
- Chaque piste indique entre crochets le ou les registres mobilisés, par leur code défini dans `1-registres.md` : `[ALIGN]`, `[FRISE]`, `[GRAPHE]`…
