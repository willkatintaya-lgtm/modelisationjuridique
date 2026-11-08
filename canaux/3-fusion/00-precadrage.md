# Canal 3 — pré-cadrage (écrit après lecture des trois gisements, avant l'assemblage)

## Ce que je fais
Je croise trois gisements et j'en tire un **modèle d'interface sur papier**, que la session de refonte construira.
- **La maquette** (`index.html`, `CLAUDE.md`, commit 497ce12) : une scène unique, cinq volets, trois échelles, la commission comme pivot.
- **Le canal 1** (`claude/canal-1-assemblee`, jusqu'à 7e48b00) : le matériau réel. Deux dossiers de la 17e législature (narcotrafic, logement), l'archive AN complète, le Sénat, Tricoteuses, le code consolidé, le direct et les parlements étrangers.
- **Le canal 2** (`claude/canal-2-corpus`, jusqu'à dd3116d) : le corpus des situations (9 familles, vues, modèle M1–M10), le vocabulaire des registres, 248 pistes et leur confrontation à la maquette (20 leviers d'extension, heurts avec CLAUDE.md).

Le canal 2 travaille encore. Ce qu'il ajoutera recoupera en partie ce que j'écris ici, et je l'intégrerai s'il arrive.

## Ce que je ne fais pas
- Additionner. 248 pistes du canal 2, 48 fonctionnalités et une quarantaine de séquences du canal 1 : les juxtaposer donnerait un catalogue de plus, pas un modèle.
- Trier à la place de l'utilisateur. Je propose large, mais rangé **par directions entières** qu'on peut éliminer d'un geste. Quand je recommande, je le dis et je laisse l'alternative visible.
- Toucher à `index.html`, publier sur l'artefact public, pousser ailleurs que sur `claude/canal-3-fusion`.

## La lentille : la pesanteur
L'intuition de l'utilisateur : la maquette est une seule interface faite de sous-interfaces, peut-être trop lourde pour ce qu'elle contient ; l'espace resterait le même, mais il pourrait accueillir plusieurs interfaces.

Je la reformule en trois questions, que je pose à chaque gisement :
1. **D'où vient le poids ?** De la quantité de contenu, ou du fait que tout est un *mode* d'une seule scène, servi par les mêmes gestes ?
2. **Où mettre ce qui arrive ?** Les canaux 1 et 2 ouvrent beaucoup (72 % des pistes du canal 2 demandent une extension de la grammaire). Si tout entre dans la scène actuelle, elle s'effondre. Il faut donc dire **où vit** chaque direction : dans la scène, au dos d'une feuille, dans un calque, ou dans une autre interface du même espace.
3. **Qu'est-ce qui reste commun ?** Plusieurs interfaces dans un même espace n'ont de sens que si quelque chose les tient ensemble : les mêmes feuilles, les mêmes gestes, la même règle de comparaison.

## Hypothèses de travail (à vérifier en écrivant)
- Une partie du poids vient de **deux confusions d'axes** dans la maquette : les volets mêlent des *lieux* (le mien, les autres, les articles) et des *verbes* (comparer) ; l'échelle mêle la *granularité* (unité, alinéa) et la *référence* (« face à la commission »).
- Les deux axes que la maquette n'a pas, **le temps** et **la hauteur juridique** (texte → code), sont ceux sur lesquels les canaux 1 et 2 convergent le plus. Ils ne peuvent pas devenir de nouveaux volets sans alourdir encore la scène.
- Les **documents réels de la procédure** (dérouleur, liste de vote, tableau comparatif, feuilleton) sont déjà du papier. Ils pourraient résoudre le heurt entre la règle « tout est papier » et les registres non textuels (frise, matrice, graphe).

## Livrables (dans `canaux/3-fusion/`)
| Fichier | Contenu |
|---|---|
| `00-precadrage.md` | Ce texte. |
| `01-cartographie.md` | Dans quelles directions pousse chaque gisement. |
| `02-croisement.md` | Convergences, tensions, directions propres, angles morts. |
| `03-modele.md` | Le modèle : socle, diagnostic de pesanteur, charpente (plusieurs interfaces dans un même espace), directions éliminables, données. |
| `04-arbitrages.md` | Les décisions qui reviennent à l'utilisateur, avec ma recommandation. |
