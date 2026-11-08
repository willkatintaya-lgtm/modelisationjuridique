# Exploration — Tricoteuses (git.tricoteuses.fr, parlement.tricoteuses.fr)

Exploration du 8 nov. 2026, environ 40 min. **VU** = observé et compté dans les données. **SUPPOSÉ** = déduit sans vérification complète. Les groupes cités sont réels dans les données brutes ; l'interface les rendra fictifs. Aucun avis politique n'est prêté à un groupe.

## 1. Ce qui existe et comment y accéder

### Forge git (Forgejo/Gitea) : `https://git.tricoteuses.fr`
- API publique sans clé : `https://git.tricoteuses.fr/api/v1/repos/search?limit=50&page=N`. **429 dépôts** (VU). Les utiles au canal 1 :
  - `assemblee-opendata/*_opendata` : l'open data AN **réorganisé** (un fichier par objet), **une moisson = un commit**, à peu près quotidien et parfois plusieurs fois par jour. `Amendements_XVII_opendata` compte 772 commits, du 22 sept. 2024 au 8 nov. 2026 15h09. Existent aussi Dossiers_Legislatifs, Agenda, Scrutins, AMO10/20/30/40/50, Comptes_Rendus_Seances, Questions.
  - `assemblee/*` : les mêmes données **nettoyées** (nil supprimés, champs renommés : `representations` → `representation`, `cosignataires` → `cosignatairesRefs`, `avant_A_Apres` → `avantAApres`). Pas de contenu en plus. Ce jeu est moins frais (Amendements_XVII arrêté au 30 oct.).
  - `assemblee/Comptes_Rendus_Commissions_XVII` (2,5 Go) : **comptes rendus de commission structurés** (JSON façon Syceron). L'open data officiel ne les donne pas sous cette forme.
  - `assemblee/Documents_enrichis` (36 Go) : textes AN (PRJL, PION, RAPP, AVIS, ETDI, LETT…) en HTML, avec liens Légifrance, segmentation, et annotations des renvois et des **verbes d'action légistique**.
  - `assemblee-moissons/Amendements_en_attente_moisson` : amendements « en traitement » moissonnés sur le site AN. **Mort depuis déc. 2023** (VU : dernier commit le 13 déc. 2023, dossiers `15` et `16` seulement).
  - `senat/ameli` (amendements Sénat, base SQL Ameli → JSON), `senat/dosleg`, `senat/leg` et `senat/leg_enrichi` (textes Sénat enrichis), `senat/debats`, `senat/scrutins`, `senat/rap` (rapports).
  - `parlement/transcriptions` : transcriptions automatiques de vidéos AN/Sénat, découpées en segments, orateurs identifiés par fenêtres. Pilote : 12 réunions AN en 2026 (VU).
  - `codes/<code>` : chaque code consolidé sous git. **Un commit par texte modificatif, daté de l'entrée en vigueur**. Le message donne le texte source (JORFTEXT, NOR). `dila/legi`, `dila/jorf`, `dila/dole` (dossiers législatifs Légifrance), `dila/constit`.
  - Logiciels : `logiciels/tricoteuses-assemblee` (TypeScript : moisson, nettoyage, `diff_amendements.ts`, `retrieve_pending_amendments.ts`, `retrieve_videos.ts`), `tricoteuses-api-parlement`, `tricoteuses-assemblee-canutes` (projection dans PostgreSQL « Canutes »), `tricoteuses-juridique` (parseur légistique), `tricoteuses-composants-react`.
- **Lire un fichier à une version donnée** : `GET /api/v1/repos/<owner>/<repo>/raw/<chemin>?ref=<sha>`.
- **Historique d'un fichier** : `GET /api/v1/repos/<owner>/<repo>/commits?path=<chemin>&limit=50&stat=false&files=false&verification=false`. Sans `stat=false&files=false`, la réponse est très lente.
- **Diff d'un commit** : `https://git.tricoteuses.fr/<owner>/<repo>/commit/<sha>.diff`.
- Pièges :
  - Lister un gros répertoire par `contents/` peut dépasser 60 s (j'ai eu un timeout sur `PRJLANR5L17BTC3188`, qui n'existe pas encore).
  - Les paramètres `since`/`until` de `/commits` sont ignorés.
  - `curl --http1.1` fiabilise les transferts.
  - Les dépôts dépassent largement la taille du disque : ne jamais cloner, passer par l'API.

### API REST en ligne : `https://parlement.tricoteuses.fr/v2/…`
Version 0.3.0, « production », sans clé (VU).
- **Routes** : `/amendements`, `/amendements/:uid`, `/amendements/:uid/resume` (résumé IA, `pending` partout), `/amendements/export` (ODT, ZIP, **« liasse PDF »** de 1 à 100 uid), `/dossiers/:uid`, `/alineas`, `/subdivisions`, `/coSignatairesAmendement`, `/liensAmitie*` (proximité entre deux acteurs ; prend `acteurRefUid` et `amiRefUid`), `/reunions`, `/pointsOdj`, `/debats`, `/directs`, `/paragraphesDirects`, `/scrutins`, `/votes`, `/search`.
- **Filtres** des amendements (schéma `src/schemas/amendementsSchemas.ts`) : `chambre`, `dossierRefUid`, `documentRefUid`, `codeEtape`, `subdivisionRefHash`, `sortAmendement`, `estIdentique`, `idDiscussionIdentique`, `groupe`, etc.
- **Pagination** : 10 résultats par page par défaut ; je n'ai pas trouvé comment l'augmenter.
- **Fusion AN et Sénat** : un dossier porte les amendements des deux chambres. Les uid Sénat ont la forme `pjl25-801-435` ; `codeEtape` vaut `SN1-DEBATS`, `AN1-COM`, `AN1-DEBATS`…
- Il y a aussi un serveur MCP « Moulineuse », annoncé sur `https://www.tricoteuses.fr/mcp` (URL `https://mcp.code4code.eu/mcp`). Non testé.

### Hors Tricoteuses
- `lafabriquedelaloi.fr` (Regards Citoyens) et `nossenateurs.fr` : connexion coupée (reset).
- `nosdeputes.fr` : erreur HTTP 500.
- Dépôts GitHub `regardscitoyens/*` : non accessibles depuis cette session (accès GitHub limité).
- **Rien de tout cela n'a donc été comparé.**

## 2. Observations chiffrées

### 2.1 Historique git des amendements = cycle de vie que l'officiel efface (VU)
Script `scripts/tricoteuses_historique.py`. J'ai lu l'historique des **790 amendements de commission logement** (texte 3058) et de 38 amendements narcotrafic (29 rectifiés sur 1043, plus les 9 de CMP 1277).

**Versions par amendement** (logement) :

| Versions | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 |
|---|---|---|---|---|---|---|---|---|
| Amendements | 22 | 72 | 321 | 249 | 92 | 21 | 12 | 1 |

**États successifs** : `En traitement > A discuter > Discuté` pour 456 amendements, `En traitement > Irrecevable` pour 153, `En traitement > Irrecevable 40` pour 75.
- Le premier commit date du 17 sept. pour 673 amendements (dépôt du 17 sept.). Le sort tombe 5 jours après le premier commit pour 378 d'entre eux.
- Sous-états finaux :

  | Sous-état | Nombre |
  |---|---|
  | Discuté, Rejeté | 214 |
  | Discuté, Tombé | 172 |
  | Irrecevable, Cavalier (45) | 142 |
  | Discuté, Adopté | 82 |
  | Irrecevable 40, Charge | 63 |
  | Discuté, Retiré | 32 |
  | Discuté, Non soutenu | 31 |
  | Retiré après publication | 13 |
  | Irrecevable 40, Gage | 10 |
  | Irrecevable, Doublon | 7 |
  | Irrecevable, Champ de l'habilitation (38) | 7 |
  | Irrecevable, Injonction (20) | 3 |
  | Irrecevable, Entonnoir (45) | 1 |
  | Irrecevable, Sous-amendement (98) | 1 |
  | `effacé` | 2 |

- Le `cartoucheInformatif` vaut « Sous réserve de son traitement par les services de l'Assemblée nationale et de sa recevabilité » tant que l'amendement est en traitement ; il passe à nil à la publication.

**Surprise majeure : les textes des irrecevables sont effacés de l'open data.**
- Tous les 242 irrecevables logement ont un `dispositif` vide dans l'officiel actuel (le nôtre, am.jsonl, et la dernière moisson).
- **241 sur 242** ont leur texte complet (dispositif et exposé) dans une version git antérieure.
- Narcotrafic : 217 irrecevables sur 232 ont un texte antérieur récupérable.
- Extrait : `tricoteuses-irrecevables-textes-perdus.json`.
- Exemple CE281 (Irrecevable 40) : « Après l'alinéa 3, insérer les trois alinéas suivants : aa) après la première phrase du troisième alinéa… ». Ce texte n'existe plus que dans git.

**Les rectifications ne gardent que la dernière version dans l'officiel ; git garde la version d'origine.** Exemples :
- Narco **CL537** (texte 1043) :
  - le 15 mars, « Supprimer l'alinéa 14. » ;
  - le 16 mars, encore en traitement et sans numéro de rectification, « les alinéas 14 à 16 » ;
  - le 18 mars (rect 1), « I. – Supprimer l'alinéa 14. II. – En conséquence, au début de l'alinéa 15, insérer la mention « Art. L. 224-8. – » ». Un cosignataire disparaît de la liste au même moment.
- Narco **395** : version de l'auteur « L'alinéa 65 est ainsi rédigé : … », devenue après passage par les services « Après l'alinéa 73, insérer les quatre alinéas suivants : 3° octies… ». Le 21 mars, la 2e rectification passe à « dix alinéas ».

**Retouches silencieuses** (logement, hors irrecevables, sans changement du numéro de rectification) :
- **190 amendements sur 548** ont un dispositif modifié dans l'historique.
- Ampleur de la pire retouche :

  | Ampleur | Amendements |
  |---|---|
  | Typographique seulement | 8 |
  | 1 à 3 mots | 46 |
  | 4 à 15 mots | 86 |
  | Plus de 15 mots | 50 |

- 148 de ces changements surviennent pendant « En traitement » : c'est la mise en forme légistique par les services (SUPPOSÉ : services, pas auteur). 60 surviennent pendant « A discuter ».
- **10 surviennent après « Discuté »**, donc après le vote.
- Au total, 345 changements d'exposé et 41 changements de liste de cosignataires.
- Aucun amendement logement n'a de numéro de rectification. Narco : 29 rectifiés, dont 3 en « 2ème Rect ».
- Extraits : `tricoteuses-cycle-de-vie-amendements.json` (828 amendements, toutes versions datées) et `tricoteuses-rectifications-narco.json` (textes avant et après).

**Limite** : la granularité dépend des moissons. Les moissons narco de mars 2025 sont quotidiennes, à 03h43. Celles de sept. 2026 tombent plusieurs fois par jour. **La liasse et le dérouleur ne sont pas dans ces dépôts.** L'ordre de discussion (`triAmendement`, qui change 637 fois) et les discussions communes et identiques (205 et 161 changements) donnent une trace du dérouleur en train de se construire. L'API propose un export « liasse PDF ».

### 2.2 Séance AN logement (16-20 nov.)
**Aucun amendement de séance** n'apparaît encore : ni `PRJLANR5L17BTC3188` dans les dépôts, ni `codeEtape=AN1-DEBATS` dans l'API (VU). Comme l'historique est moissonné en continu, la séance de la semaine prochaine sera **observable en direct, version par version**.

### 2.3 Liens commission → séance (« redépôts »), calculés par Tricoteuses (VU, API)
- Chaque amendement AN porte `linkedCommissionAmendementUid`, `linkedScoreSimilarity` et `linkedSeanceAmendements`.
- Narco, texte de séance 1043 : **127 amendements sur 1002** sont reliés à un amendement de commission du texte 0907.
  - Score de similarité entre 0,81 et 1 ; médiane 0,92 ; 61 à 1,0.
  - **127 sur 127 ont le même auteur** (sans doute une condition de l'appariement, SUPPOSÉ).
- Devenir des paires :
  - 75 rejetés en commission puis rejetés en séance ;
  - 14 non soutenus deux fois ;
  - **11 rejetés, non soutenus, tombés ou retirés en commission puis adoptés en séance**.
- Extrait : `tricoteuses-redepots-narco.json`.
- Autres champs en plus de l'officiel :
  - `alineaDesignation` : « Alinéa 7 » ;
  - `divisionArticleDesignation` ;
  - `etapeLegislativeRef` : `DLR5L17N54608-AN1-COM` ;
  - `dateMaj`, `urlPdf` ;
  - groupe avec `couleurAssociee` ;
  - cosignataires avec `datePremierAjout`. **Piège** : cette date est celle de l'import (2026-10-09) pour tous, pas la date réelle de la cosignature.

### 2.4 Comptes rendus de commission structurés (VU)
- Chemin : `assemblee/Comptes_Rendus_Commissions_XVII/AN/R5/L17/S2026/000/CRCANR5L17S2026PO419610N1xx.json`.
- **Volume** : 126 comptes rendus de la commission des affaires économiques en session 2026, 17 en S2027.
- **Logement**, six réunions :

  | Réunion | Date | Paragraphes |
  |---|---|---|
  | N120 | 21 sept. | 268 |
  | N121 | 21 sept. | 231 |
  | N122 | 22 sept. | 370 |
  | N123 | 22 sept. | 264 |
  | N124 | 29 sept. | 111 |
  | N127 | 30 sept. | 38 |

- **Structure d'un paragraphe** : `code_grammaire` (`PAROLE_GENERIQUE`), `orateurs.orateur[].nom` (« M. Tessier-Carvalho (RS) »), `code_style` (« Info Italiques » pour les didascalies : « Amendement CE432 de Mme … », « La commission rejette successivement les amendements CE646, CE682 et CE213 », « L'amendement CE491 est retiré »).
- **Piège** : l'`id` d'orateur est vide et la qualité aussi ; il faut apparier les noms avec le groupe entre parenthèses.
- **Ce que j'ai extrait** :
  - 160 épisodes ouverts par « Amendement(s) … » ;
  - 379 numéros CE cités ;
  - décisions : 123 « rejette », 67 « adopte », 29 « retiré », 19 « tombe » ;
  - interventions par épisode : 1 à 8 et plus (36 épisodes en ont 8 ou plus).
- L'API `/v2/alineas` expose les paragraphes des rapports et avis (« Amendement CF53 de M. … », « La commission émet un avis favorable… ») rattachés à un `articleRefHash`.

### 2.5 Sénat via `senat/ameli` (VU)
- **Logement** (`2025/pjl25-801`, 521 fichiers) : 86 amendements de commission (`COM-…`, texte 801, 28-30 juin 2026) et 435 de séance (texte 835, 2-7 juillet).
- **Narco** (`2024/ppl23-735`, 271 fichiers) : 270 amendements de séance (texte 254) et 1 de CMP. Aucun `COM-` (SUPPOSÉ : les amendements de commission du Sénat de 2024 ne sont pas dans ce dépôt).
- Champs **absents de l'open data AN** :
  - `avis_commission` et `avis_gouvernement` (logement : 146 défavorables, 35 demandes de retrait, 30 favorables côté commission) ;
  - `revision` (0 à 7) et `type_rectification` (« porte sur la liste des signataires » pour 258 amendements, « changement de place » pour 5) ;
  - `observations` (« Gage », « Amendement repris par Mme …, son auteur l'ayant retiré ») ;
  - `identique_id` (156), `discussion_commune_id` (248), `scrutin_num` (10) ;
  - `subdivision_*` avec la position dans le texte et dans la discussion ;
  - `alinea`.
- Sorts logement : **148 irrecevables art. 45 (cavaliers), soit 28 %**, 138 rejetés, 63 adoptés, 38 retirés, 34 tombés, 34 non soutenus, 30 irrecevables art. 40.
- Sorts narco : 88 adoptés, 33 cavaliers.
- L'historique git d'Ameli est grossier : 4 commits pour le dossier logement, le premier le 8 juillet, après les dépôts. Les révisions antérieures **ne sont pas** récupérables (VU sur l'amendement n°5, révision 7).

### 2.6 Textes enrichis (Sénat `leg_enrichi`, AN `Documents_enrichis`) (VU)
- Pour `pjl25-801` comme pour `PRJLANR5L17BTC3188` : variantes `_avec_liens.html`, `_avec_references.html`, `_avec_liens_ou_references.html`, `segmentation.json` (titres, chapitres, articles avec positions), `sommaire.json`, `textes_references.json` et un dossier `_transformations` (28 étapes intermédiaires, en HTML et JSON).
- Les alinéas sont balisés `span.alinea[data-alinea=n]` : 224 dans pjl25-801.
- **Références**, 157 annotées :

  | Type de référence | Nombre |
  |---|---|
  | `reference_article` | 136 |
  | `reference_texte` | 14 |
  | `reference_division` | 7 |

  Chaque référence a des positions et, pour 37 d'entre elles, une **action** : `modifier` 12, `application` 9, `insérer` 4, `abroger` 4, `remplacer` 2, `compléter` 1… avec les citations (`originalCitations`).
- Les liens pointent vers les articles LEGI (`https://www.tricoteuses.fr/legifrance/articles/LEGIARTI…`). Exemple de répartition : 65 références au code de la construction et de l'habitation dans le projet de loi logement.

### 2.7 Codes sous git : l'aval de la loi (VU)
- La loi narcotrafic (n° 2025-532) produit des commits dans six codes, en **deux vagues d'entrée en vigueur** :
  - 15 juin 2025 : procédure pénale, pénal, sécurité intérieure, monétaire et financier, douanes, pénitentiaire ;
  - 5 janv. 2026 : procédure pénale, douanes.
- Taille des diffs :
  - procédure pénale, 15 juin : 90 fichiers (articles), +764/−346 lignes ;
  - pénal : 52 fichiers, +363/−238 ;
  - procédure pénale, 5 janv. 2026 : 26 fichiers, avec des articles en `ABROGE_DIFF` jusqu'au 1er janv. 2029.
- Les décrets d'application arrivent ensuite comme commits distincts. Exemple : décret 2025-1330 « pris pour l'application des articles 706-75-3 et 706-75-4… issus de l'article 30 de la loi n° 2025-532 ».

## 3. Surprises et contradictions avec l'acquis
1. **L'open data officiel est un instantané destructif.** Il efface les textes des irrecevables (241 sur 242 en logement), écrase les versions rectifiées et les retouches des services, et ne date pas les changements d'état. Pour l'acquis, am.jsonl suffisait à décrire les amendements. C'est faux pour 30 % d'entre eux (les irrecevables), et l'histoire de 60 % des autres manque.
2. Une même rédaction a **plusieurs auteurs successifs** : l'auteur, puis les services (re-ciblage d'alinéas, reformulation légistique) avant publication. Le texte « déposé » n'est pas le texte « publié ».
3. Des dispositifs changent **après le vote** (10 cas) ; et deux amendements sont en état `effacé`.
4. Tricoteuses calcule déjà l'**appariement commission → séance** et fusionne AN et Sénat par dossier. Une partie du « réseau de positions » est servie toute prête.
5. Côté Sénat, les **avis** commission et gouvernement sont des champs. À l'AN, il faut les extraire du compte rendu.
6. Le dépôt des amendements « en attente » est abandonné depuis 2023. Le script existe (`retrieve_pending_amendments.ts`) mais ne tourne plus en public.
7. La version « nettoyée » (`assemblee/`) n'apporte pas de contenu : la valeur est dans l'historique de `assemblee-opendata/`.

## 4. Séquences, unités, fonctionnalités suggérées (large, non trié)

### Séquences nouvelles
- **S-dépôt→publication** (« la mise en forme ») : version de l'auteur, puis version des services, puis publication. Unité : la *retouche*, avec un diff mot à mot. 190 cas en logement.
- **S-recevabilité** : en traitement, puis irrecevable avec un motif (cavalier 45, charge 40, gage, doublon, injonction, habilitation 38, entonnoir). Montrer **le texte qui a été écarté**, barré mais lisible, avec son motif. C'est un volet « ce qui n'a pas pu être dit ».
- **S-rectification** : rect 0, puis 1, puis 2. Ce qui change : la portée (« alinéa 14 » devient « alinéas 14 à 16 »), le nombre (« quatre » devient « dix alinéas »), les cosignataires.
- **S-construction du dérouleur** : `triAmendement`, discussions communes et identiques qui bougent jusqu'à la veille. C'est l'ordre de passage en train de se faire.
- **S-commission→séance** : redépôt du même amendement par le même auteur, avec un score de similarité, et le changement de sort (11 rejets en commission devenus adoptions en séance).
- **S-navette du même alinéa** : amendements Sénat COM puis séance, avec les avis, puis amendements AN commission puis séance, dans un seul dossier (`codeEtape`).
- **S-épisode de commission** : didascalie « Amendement CE… », interventions (auteur, rapporteure, ministre, autres), puis décision. Structuré dans les comptes rendus de commission.
- **S-aval** : loi, puis commits datés par entrée en vigueur dans les codes, puis décrets d'application, puis abrogations différées.

### Fonctionnalités pour la maquette
- **Curseur temporel sur une feuille d'amendement** : faire défiler les versions git. Le calque de corrections apparentes montre *version n−1 → n* au lieu de *commission → groupe*. C'est la même mécanique, une autre référence. Symétrie : appliquer la même chose aux feuilles des autres groupes.
- **Pastille d'état datée** (en traitement, à discuter, discuté, sort) avec l'heure de chaque transition. « Sous réserve… » en filigrane tant que l'amendement est en traitement.
- **Pile des écartés** : un volet ou un filtre des irrecevables, texte récupéré, barré, motif en capitales espacées.
- **Loupe « qui a écrit quoi »** : la retouche des services (re-ciblage) en encre distincte. Pour la règle, il faut une 3e encre ou un trait, à arbitrer.
- **Fil de redépôt** : sur une feuille de séance, un lien vers sa jumelle de commission, avec le score de similarité seulement là où il a un sens.
- **Avis (Sénat)** en marge de chaque feuille : avis de la commission et avis du gouvernement, en texte.
- **Couche « ce que l'article touche dans le code »** : depuis les références enrichies (verbe d'action, article LEGI), ouvrir l'article du code et son historique git.
- **Mode direct pour la séance du 16-20 nov.** : sonder `Amendements_XVII_opendata` ou l'API et faire apparaître les nouvelles feuilles ou versions au fil des moissons.
- **Liasse** : l'export PDF de l'API comme source du contenu « papier ».

### Unités de découpage confirmées par ces données
- La version (sha et date).
- La transition d'état.
- La retouche (diff).
- Le motif d'irrecevabilité.
- La paire commission → séance.
- L'épisode de compte rendu.
- La référence (article LEGI avec son verbe).
- Le commit de code (entrée en vigueur).

## 5. Questions ouvertes
- Qui fait les retouches pendant « En traitement » : l'auteur ou les services ? Le dépôt ne le dit pas. Il faudrait comparer avec le PDF initial ou l'horodatage `chronotag`, non exploité ici.
- Le critère exact d'appariement commission → séance (même auteur obligatoire ? seuil 0,8 ?) : à lire dans le code de `tricoteuses-api-parlement`, non lu.
- Pagination et volume de l'API : la limite de 10 par page bloque l'export en masse. Faut-il passer par `/export` ?
- Les amendements de commission du Sénat (COM-) de 2024 pour narco sont-ils ailleurs ?
- Comment se fait la liaison orateur → acteur dans les comptes rendus de commission (`id` vide) ? Faut-il faire l'appariement par nom et groupe nous-mêmes ?
- Jusqu'où remonte l'historique d'`Amendements_XVII_opendata` ? Le premier commit est du 22 sept. 2024 : le début de la L17 (juillet 2024) manque-t-il ?
- Faut-il archiver nous-mêmes les moissons de la séance logement, au cas où une granularité horaire serait nécessaire ?
- Regards Citoyens (La Fabrique de la loi, NosDéputés) n'est pas joignable d'ici : à retenter ailleurs.

## Fichiers produits
- Script : `canaux/1-assemblee/scripts/tricoteuses_historique.py`. Usage : `python3 -I tricoteuses_historique.py chemins.txt sortie.jsonl 10`, avec un chemin par ligne de la forme `PRJLANR5L17B3058/AMANR5L17PO419610B3058P0D1N000660.json`. Environ 4 min pour 790 amendements avec 10 fils.
- Extraits (scratchpad `extraits-bruts/`) :
  - `tricoteuses-irrecevables-textes-perdus.json` (241, logement) ;
  - `tricoteuses-cycle-de-vie-amendements.json` (828) ;
  - `tricoteuses-rectifications-narco.json` (29) ;
  - `tricoteuses-redepots-narco.json` (127).
- Brut (scratchpad `raw-tricoteuses/`) :
  - `hist_log.jsonl`, `hist_narco.jsonl`, `hist_narco_irr.jsonl` ;
  - `sen/pjl25-801`, `sen/ppl23-735` (Ameli) ;
  - `crc/` (comptes rendus de commission logement) ;
  - `leg/` (textes enrichis Sénat) ;
  - `api/` (1002 réponses de l'API pour le texte 1043).
