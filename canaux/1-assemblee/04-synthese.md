# Canal 1 — synthèse après exploration élargie (8 gisements)

Cette note croise `01-observations.md` (premier passage, deux dossiers) et les huit explorations parallèles de `explorations/` :
`senat`, `tricoteuses`, `legifrance`, `an-global`, `an-seance`, `an-commission`, `logement-direct`, `ecosystemes`.
Chacune a sa note détaillée (accès, chiffres, pièges, propositions). Ici : ce qui change, la carte des gisements, puis les séquences et fonctionnalités **fusionnées**, sans tri.

Groupes et personnes sont **fictifs** partout dans le dépôt (`scripts/fictionnaliser.py`, clés de la maquette : PR, SOL, ECO, UT, LL, RC, DC, AR, CP, + NV, RS, NI ; au Sénat SA…SI). Textes juridiques, sorts, dates et organisations non partisanes restent réels.

---

## 1. Ce que l'exploration élargie corrige

| Acquis du premier passage | Correction | Source |
|---|---|---|
| « Seule la dernière version d'un amendement est publique » | Vrai pour l'open data officiel, faux en pratique : **Tricoteuses archive chaque moisson en git** (772 commits depuis sept. 2024). On récupère les états datés (en traitement → à discuter → discuté → sort), les versions avant rectification, et **le texte de 241 irrecevables sur 242** (logement) que l'officiel efface. 190 amendements logement sur 548 ont été **retouchés sans numéro de rectification** pendant leur mise en forme. | tricoteuses |
| « Les textes juridiques consolidés sont hors de portée » | **Le code consolidé est en git** (git.tricoteuses.fr/codes/<code>, un fichier par article, un commit par loi modificatrice ; clone du CGI en 2 s). L'application automatique des instructions de l'article 4 logement à l'art. 31 du CGI **réussit 10 sur 10** (et 14/14 sur le texte déposé). Les numéros d'alinéa visent le texte **d'origine**, pas le texte déjà modifié par les instructions précédentes. | legifrance |
| « Pas de débats de commission en open data » | Il y a **un compte rendu par réunion** (`CRCANR5L17S…`, via `compteRenduRef` de l'agenda). L'agenda donne aussi **la présence nominative** de chaque membre. Les rapports narcotrafic sont en tomes (`…B1043-tI`, `-tII`). | an-commission |
| « La liasse et le dérouleur ne sont pas dans les données » | **eLiasse a une API JSON publique** (examens, dérouleur par places, prochain à discuter, statistiques) et un WebSocket de patchs incrémentaux. | logement-direct |
| « Open data régénéré chaque jour » | **Toutes les 2 h** (hh:20 UTC). Une sonde par requêtes Range sur le répertoire du zip donne un diff exact (CRC32) de toute l'AN en 3 s. | logement-direct |
| « Le lien scrutin ↔ amendement n'est que textuel » | Textuel, mais **fiable à 97,9 %** une fois croisé avec la séance et le décompte. Le **demandeur** est dans le fichier scrutin. Le compte rendu est **horodaté à la seconde** (`stime`) et porte la structure (`art`, `adt`, `ssadt`). | an-seance |
| « ≈ 10 % de scrutins publics », « 30 % d'écart entre alinéa déclaré et portée réelle » | Valeurs de l'échantillon. Sur toute la législature : **34 %** des amendements de séance mis aux voix le sont au scrutin public ; l'écart déclaré/portée vaut **17 %**. | an-seance, an-global |
| « Le lien alinéa → amendement du Sénat » (signal reçu) | Il existe (`data:amdts` dans l'Akoma Ntoso), mais **seulement pour la dernière étape**, et il rate la plupart des retouches légères. Les **identifiants d'alinéa sont stables** d'une version à l'autre dans une même chambre, ce qui permet de chaîner dépôt → commission → séance. Ils ne survivent pas à la navette. | senat |

## 2. Chiffres de cadrage (législature 17, 145 249 amendements, `an-global`)

- 13,3 % des amendements déposés sont adoptés (23,5 % des examinés). 16,4 % sont irrecevables. **20,5 % ne sont jamais examinés** : le « mur » (49.3, motion de rejet, fin de niche ; causes supposées, à vérifier).
- Adoption des examinés : Gouvernement 74 %, rapporteurs 67 %, députés 18 %.
- Discussions communes : 21,6 % des amendements, 74 % des grappes multi-groupes. **Être en discussion commune divise par deux les chances d'adoption** (12,9 % contre 28,6 %). Identiques : 19,6 %, 79 % des grappes multi-groupes, un peu plus souvent adoptés que la moyenne.
- Séance : écart médian de **16 s** entre deux sorts. Durée médiane d'un épisode d'amendement : **1,8 min**. **10 % des épisodes prennent 48 % du temps**. Un épisode sur cinq est une rafale muette d'environ une seconde.
- Un avis défavorable n'empêche pas l'adoption dans **14 %** des cas ; commission et Gouvernement divergent dans 13 % des épisodes. Au Sénat, quand ils divergent, **la commission l'emporte** (14 sur 14 sur le logement).
- Obstruction visible : 398 séries d'au moins 10 amendements (une date ou un mot qui varie), jusqu'à 584 variantes d'un même auteur.
- Lois de finances : 21 108 amendements de crédits sont des **tableaux** (programmes, AE/CP), pas du texte ; 785 déplacent 1 € (amendements d'appel). Deux tiers des amendements de séance PLF/PLFSS n'ont jamais de sort (49.3).
- Navette (Sénat narcotrafic) : dans le texte adopté, 47 % des alinéas viennent d'un amendement de séance, 41 % de la commission, **7 % du texte déposé inchangé**. CMP narcotrafic : 290 alinéas sur 919 sont **rédigés par la CMP elle-même**, sans amendement ni auteur.
- Aval : Conseil constitutionnel, décision 2025-885 DC : 3 censures totales, 3 partielles, 9 articles avec réserves. Au JO, les articles censurés restent comme des coquilles numérotées. La numérotation définitive (1 à 64) n'est pas celle de la CMP.

## 3. Carte des gisements

| Gisement | Accès | Ce qu'il apporte en propre |
|---|---|---|
| Open data AN (amendements, dossiers, scrutins, CR séance, agenda, acteurs) | data.assemblee-nationale.fr, zip, sans clé, toutes les 2 h | socle ; sorts ; DC et identiques ; horodatage des sorts ; CR codé et horodaté ; demandeur des scrutins ; présences |
| Textes et rapports AN | `/dyn/opendata/<uid>.html` | texte à chaque étape ; rapport (commentaires d'articles, débats de commission, auditions) |
| CR de commission AN | `/dyn/opendata/CRCANR…html` (uid via l'agenda) | épisodes de commission, présents |
| eLiasse | `eliasse.assemblee-nationale.fr/api-eliasse/`, WebSocket | dérouleur (ordre réel d'appel), prochain à discuter, direct |
| Tricoteuses | git.tricoteuses.fr (API Forgejo), parlement.tricoteuses.fr/v2 | **historique** : versions d'amendements, irrecevables, codes consolidés en git, JORF en git, appariement commission → séance, fusion AN + Sénat |
| Sénat | data.senat.fr (Ameli : dump PostgreSQL), senat.fr (CSV par texte, `liste_discussion.json`, Akoma Ntoso, CR `_mono.html`) | avis commission **et** Gouvernement en champs ; provenance des alinéas (`data:amdts`) ; identifiants d'alinéa stables ; orateurs inscrits ; scrutins en HTML seulement |
| Code consolidé, JO, Conseil constitutionnel | Tricoteuses `codes/`, `dila/jorf` ; site du Conseil | le code tel qu'il deviendrait ; censures, réserves |
| Écosystèmes étrangers (référence de structures) | API du Parlement européen, Bills API de Westminster, govinfo (Congrès) | liste de vote PE (blocs, parties d'amendement, LAPSED) ; « Will write letters » ; arbres d'amendements au substitut |
| La Fabrique de la Loi, NosDéputés | figés (2022, 2024) | un modèle de données (matrice article × étape) ; aucune donnée L17 |

Indisponibles ou partiels : Légifrance (403, OAuth PISTE), délai de dépôt et temps législatif programmé (publiés nulle part en données), scrutins du Sénat (HTML), groupements britanniques (PDF 403), procès-verbaux XML du PE (anti-robot).

## 4. Unités : la liste s'allonge

Aux unités de `01-observations.md` §3, les explorations ajoutent :
- **la version** d'un amendement (dépôt, mise en forme, rectifications, retouches après vote) ; source : Tricoteuses ;
- **l'instruction de modification** (cible dans le code, opération, contenu), entre l'alinéa du projet et l'alinéa du code ;
- **l'alinéa à identifiant stable** (Sénat) : la même ligne suivie de version en version ;
- **la provenance** d'un alinéa (dépôt / commission / séance / CMP, et quel amendement) ;
- **l'épisode horodaté** (séance, commission) et **la réunion** ;
- **la place du dérouleur** (eLiasse) et **le créneau d'ordre du jour** (séance × point, avec ses états datés) ;
- **la série** (matrice d'obstruction, famille de replis) ;
- **la décision de vote** au sens du PE (bloc, partie d'amendement, LAPSED) ;
- **la réserve d'interprétation** et **la censure** (mots précis, considérant).

## 5. Séquences fusionnées

Regroupées par moment. Pour chacune, les notes d'où elle vient, entre crochets. ★ donnée directe, ◐ reconstruction, ○ absent.

### Avant le texte
- **Inscription à l'ordre du jour** : un texte entre, sort, revient ; l'ordre du jour garde ses points supprimés, datés. ★ [logement-direct]
- **Préparation silencieuse** : désignation du rapporteur, auditions (dont des représentants d'intérêts marqués HATVP), audition du ministre. ★ [an-commission]

### Écrire et déposer
- **Fenêtre de dépôt** : d'abord un filet, puis un pic la veille du délai ; les redépôts arrivent tôt, les nouveautés à la fin. ★◐ [logement-direct, an-global]
- **Mise en forme par les services** : le texte déposé n'est pas le texte publié (re-ciblage, reformulation). Unité : la retouche, avec un diff mot à mot. ★ via Tricoteuses [tricoteuses]
- **Recevabilité** : les irrecevables sortent de la pile avec leur motif ; leur texte est récupérable. ★ [tricoteuses, an-global, senat]
- **Famille de replis et séries** : une intention déclinée du maximal au minimal ; les matrices d'obstruction repliables en une seule feuille paramétrée. ◐ [01, an-global]
- **Rectification** : rect. 0 → 1 → 2, avec le changement de portée et de cosignataires. ★ via Tricoteuses [tricoteuses, senat]
- **Redépôt de la commission vers la séance** : une lignée de rédactions ; 36 % des écartés en commission reviennent, mais ils réussissent peu (5 % adoptés). ★◐ [logement-direct, tricoteuses]

### Examiner en commission
- **Épisode de commission** : appel, défense, avis du rapporteur, débat, décision ; ou « suivant l'avis de la rapporteure » sans débat ; ou absent (irrecevable, tombé en bloc, non soutenu). ★ [an-commission]
- **Séries thématiques annoncées par le rapporteur** : des thèmes que les acteurs déclarent eux-mêmes. ★ [an-commission]
- **Réunion « article 88 »** : en 5 minutes, la commission rend son verdict sur les amendements de séance (accepté / repoussé), une préfiguration du sort. ★ [an-commission, logement-direct]
- **Réécriture en commission au Sénat** : la feuille déposée se recouvre de feuilles neuves alinéa par alinéa. ★ [senat]

### Examiner en séance
- **Construction du dérouleur**, puis **tête de lecture** : les places, le prochain à discuter, les sorts qui tombent. ★ eLiasse [logement-direct, tricoteuses]
- **Itinéraire de séance** : priorités, réserves, seconde délibération. ★ [01]
- **Le rite et ses variantes** : la rafale, le débat qui dévore l'article, se compter (scrutin demandé par l'auteur, par un autre groupe, par la présidence), le doute (main levée non concluante : 422 scrutins à moins de 10 voix), la défaite du banc, le désaccord du banc, le ralliement (« je le retire au profit du n° X »), le retrait contre promesse (« d'ici la navette »), l'accord conditionnel par sous-amendement, la suspension puis la reprise, la dissidence. ★ [an-seance]
- **Cascade de discussion commune** : sorts à la même seconde quand une rédaction passe. ★ [01, an-global, an-commission]
- **Liste de vote comme partition** (modèle du PE) et **vote en morceaux**. ◐ en France [ecosystemes]
- **Le mur** : 49.3, motion de rejet, fin de niche ; les amendements jamais appelés en ombre ; une partie de loi de finances rejetée 0 contre 458 après des centaines d'adoptions. ★ [an-global, an-seance]
- **Le réseau des applaudissements** : qui applaudit avec qui (les didascalies nomment les groupes). ★ [an-seance]

### Navette et aval
- **Palimpseste** : un amendement de commission adopté puis effacé en séance ; montrer les couches, pas seulement le résultat. ★ Sénat [senat]
- **Provenance alinéa par alinéa**, puis **la CMP comme arbitrage** (AN seule / Sénat seul / les deux / rédaction propre à la CMP). ★◐ [senat, 01]
- **Ping-pong** entre chambres, la CMP n'en étant qu'un cas. [ecosystemes]
- **« Le code tel qu'il deviendrait »**, la dérive de la cible (la version du code a changé pendant l'examen : le j) de l'art. 31 rétabli par la loi de finances pour 2026 au milieu du projet) et le vérificateur de renvois (trois renvois décalés d'un cran après application). ★◐ [legifrance]
- **Ce qui reste de mon article** : CMP → renumérotation → saisine → censure ou réserve → coquille au JO → nouveau commit du code. ★ [legifrance]

## 6. Fonctionnalités nouvelles (en plus des 25 de `02-sequences-et-propositions.md`)

26. **Curseur temporel sur toute feuille** : les corrections apparentes comparent la version n−1 à la version n (et non plus seulement la commission au groupe), symétriquement pour toutes les feuilles. [tricoteuses]
27. **Pile des écartés** : les irrecevables avec leur vrai texte et leur motif, barrés mais lisibles. [tricoteuses]
28. **Cran d'échelle « code »** au-dessus de l'origine : l'article de code avec les corrections produites par le texte de la commission, par ma rédaction ou par celle d'un groupe ; statut de chaque instruction (appliquée, ambiguë, en échec). [legifrance]
29. **Vérificateur de renvois et alerte de dérive de la cible.** [legifrance]
30. **Tampon de provenance en marge de chaque alinéa** (dépôt, commission, séance, CMP ; au survol, l'amendement), en matière papier. [senat]
31. **Pastilles d'avis à trois temps** : commission | Gouvernement | Assemblée ; un mode « prédire ». [an-seance, senat]
32. **Minutage réel** sur chaque feuille (minutes, orateurs, interruptions), par épaisseur ou par grain du papier. [an-seance, an-commission]
33. **Feuille de vote** : ventilation par groupe, dissidents, délégations, participation, demandeur. [an-seance]
34. **Partition de séance** : une ligne par séance, les épisodes placés à leur seconde, les suspensions en blancs. [an-seance, an-commission]
35. **Mode direct** : la sonde du zip toutes les 2 h et le WebSocket eLiasse alimentent la pile des autres et la tête de lecture, avec une latence affichée honnêtement (« déposé il y a ~3 j, visible depuis 2 h »). [logement-direct]
36. **Mes rejetés de commission comme brouillons de séance** (redéposer, replier) ; prévision des redépôts des autres, en feuilles fantômes. [logement-direct]
37. **Bandeau d'état du dossier** : ordre de passage, séances, réunion article 88, compte à rebours du délai, calculé par défaut faute de source. [logement-direct]
38. **Sas de recevabilité avant confirmation** (scène 3 du flux cible) : art. 40 (proposer un gage ou une demande de rapport), art. 45, doublon (proposer de cosigner). [an-global]
39. **Repli des séries** : une matrice de 584 amendements devient une feuille paramétrée, ouverte en éventail au dézoom. [an-global]
40. **Budget comme flux** : un amendement de crédits devient une flèche d'un programme vers un autre, avec un montant (un chiffre qui a du sens). [an-global]
41. **Fiche « qui a écrit ça ? »** : tiers revendiqué dans l'exposé, auditionné ou non, étiquette HATVP. [an-commission]
42. **« Qui était là »** au moment d'une décision (présences de l'agenda). [an-commission]
43. **Synthèse d'article tirée du rapport** (encadré « le texte / le Sénat / la commission »), complétée par les positions tirées des épisodes : base réelle de la scène 5 (thème, synthèse). [an-commission]
44. **Feuille compromis** (accord provisoire, substitut, réécriture globale, CMP) posée sur la pile : les autres se replient, une loupe montre ce qu'elle reprend de chacune. [ecosystemes]
45. **Sort « a obtenu un engagement »** (réponse du ministre, retrait contre promesse), distinct de rejeté ou retiré. [ecosystemes, an-seance]
46. **Sous-amendements en languettes** sur leur feuille, jusqu'à l'arbre de 390. [an-global, ecosystemes]
47. **Distinguer groupement** (un sujet sur plusieurs articles, brique des thèmes) **et discussion commune** (concurrence sur un passage). [ecosystemes]
48. **Journal des versions de ma feuille** sur le modèle « une loi = un dépôt git ». [ecosystemes, tricoteuses]

## 7. Pistes pour la fusion (canal 3) et la refonte

- La maquette a déjà la bonne matière pour trois découvertes : (a) le **regroupement par proposition** = les grappes d'identiques ; (b) la **loupe côte à côte** = la convention officielle du PE (texte de la commission | amendement) ; (c) la **pile** = l'ordre du dérouleur. Il suffit de les brancher sur les vraies données.
- Les deux axes que la maquette n'a pas sont **le temps** (versions, horodatage, direct) et **la hauteur juridique** (texte de loi → code). Les deux sont désormais accessibles.
- Les données réelles sont plus riches **après** l'événement qu'avant. Le seul « avant » vivant est le dossier logement (délai estimé au 12 nov., séance du 16 au 20 nov. 2026) : une fenêtre pour tester un mode direct en conditions réelles.

## 8. Questions ouvertes (ajoutées à celles de 02 §G)

7. Faut-il s'appuyer sur Tricoteuses (tiers associatif) pour l'historique, ou reconstruire nos propres moissons ?
8. Le cran « code consolidé » devient-il une échelle de la maquette (au-dessus de l'origine), ou un volet ?
9. Le temps : le curseur temporel remplace-t-il le geste haut / bas dans certains volets, ou s'y ajoute-t-il ?
10. Que faire des lois de finances (tableaux de crédits) : hors champ, ou une matière visuelle propre ?
11. Montrer le rite de séance (épisodes, avis, scrutins), ou rester sur le texte ?
