# Exploration « an-seance » : comptes rendus de séance et scrutins, toute la législature 17

Front : les 657 comptes rendus Syceron et les 9 759 scrutins de la XVIIe législature (juillet 2024 → 4 novembre 2026), pris en entier et non plus sur le seul narcotrafic. Tout ce qui suit a été **mesuré** sur les fichiers, sauf mention « supposé ».

## 1. Ce qui a été exploré, comment y accéder

| Gisement | Accès | Volume | Format |
|---|---|---|---|
| Comptes rendus de séance (Syceron brut) | `https://data.assemblee-nationale.fr/static/openData/repository/17/vp/syceronbrut/syseron.xml.zip` | 61 Mo zip, 345 Mo XML, 657 fichiers `CRSANR5L17S<année><session>N<nnn>.xml` | XML, espace de noms `http://schemas.assemblee-nationale.fr/referentiel` |
| Scrutins | `…/17/loi/scrutins/Scrutins.json.zip` | 30 Mo zip, 208 Mo JSON, 9 759 fichiers `VTANR5L17V<n>.json` | JSON, un scrutin par fichier |
| Amendements (pour la jointure) | aplatissement déjà fait par l'agent an-global : `scratchpad/raw-an-global/all.jsonl` (145 249 amendements, dont 85 561 de séance `org_ex = AN`) | 165 Mo | JSONL |

Scripts ajoutés (dans `scripts/`) :
- `an-seance_aplatir_cr.py` : **tous** les éléments porteurs d'un `code_grammaire` (points, paragraphes, ouverture/fin), avec les attributs que l'ancien `lire_cr.py` ignorait : `art`, `adt`, `ssadt`, `bibard`, `nivpoint`, `ordre_absolu_seance`, `stime`, titre du point de niveau 1. 393 680 éléments, 18 s. Sortie : `scratchpad/raw-an-seance/cr_all.jsonl` (292 Mo).
- `an-seance_scrutins.py` : un enregistrement par scrutin (objet classé, numéros d'amendement du titre, demandeur, ventilation par groupe, **dissidents nominatifs**, votes par délégation). Sortie : `raw-an-seance/scr.jsonl`.
- `an-seance_lier.py` : scrutin ↔ résultat dans le compte rendu ↔ uid d'amendement (méthode en 3). Sorties : `raw-an-seance/scr_cr_am.json`, `amlinks.json`.
- `an-seance_episodes.py` : découpage en épisodes de toute la législature (amélioré : coupures aux changements de phase, durée par `stime`, avis, demandes de scrutin, retraits, rectifications, suspensions). Sortie : `raw-an-seance/ep_all.jsonl` (25 344 épisodes).
- `an-seance_stats_scrutins.py`, `an-seance_extraits.py` (extraits ci-dessous).

Extraits (bruts, groupes et noms réels, à rendre fictifs) dans `scratchpad/extraits-bruts/` :
- `an-seance-grammaire.json` : les 298 codes, fréquence, nombre de séances, mots, famille, exemple.
- `an-seance-narco-episodes.json` : 537 épisodes du texte narcotrafic (durée, mots, prises de parole, interruptions, avis, scrutin, décision, orateurs).
- `an-seance-narco-scrutins.json` : 152 scrutins tenus pendant les séances narcotrafic, avec amendement lié (uid), groupe auteur, demandeur, ventilation par groupe et nombre de dissidents.

**Pièges rencontrés**
- Les attributs structurés sont sur l'élément `<point>` et `<paragraphe>` (ex. `adt=" 846" art=" 14" bibard=" (n[[o]] 3018)"`), avec espaces de tête et balises `[[o]]` pour l'exposant. Ils sont **souvent vides** sur le paragraphe de résultat du scrutin : il faut propager le dernier `bibard`/`art`/`adt` non vide du flux.
- `<texte stime="959.08">` : **horodatage en secondes dans la vidéo de séance** (présent sur 324 000 éléments sur 394 000). Vérifié sur une séance : ouverture à `stime` 900 = 9 h 00 ; dernier élément à 15 798 ≈ 13 h 08, « levée à treize heures dix ». C'est donc l'horloge murale, suspensions comprises. 18 séances sur 657 ne sont pas monotones. Pendant les suspensions, l'écart de `stime` est parfois quasi nul (la vidéo est coupée) : ne pas mesurer une suspension par `stime`, lire plutôt « (La séance, suspendue à seize heures dix, est reprise à dix-sept heures dix.) ».
- Les codes sont parfois fautifs (`SCyRUT_ADT_ANN`, `AM8ENDSORT_REJET_IDENTIQUES`), les titres de scrutin aussi (« sous-amendmeent », « amenedement », « aticle ») ; apostrophes droites et typographiques mélangées.
- Le scrutin ne donne pas l'uid de l'amendement, ni le texte ; mais il donne `seanceRef` et le **demandeur** (« Présidente du groupe "…" », « Président de séance », « Conférence des Présidents »), plusieurs demandeurs séparés par `\r`.
- Amendements de loi de finances numérotés `I-123` / `II-456` dans l'open data, mais « n° 123 » dans le compte rendu et le titre du scrutin.
- `positionMajoritaire` du groupe se calcule sur les présents : avec une participation médiane de 13 à 32 % par groupe, une « dissidence » peut être 1 voix contre 2.
- Un groupe (`AR`, environ 3 000 scrutins, apparu en cours de législature) est absent du référentiel `amo` téléchargé : référentiel à rafraîchir.

## 2. Ce qui a été observé

### 2.1 La grammaire : 298 codes, 16 familles

393 680 éléments. Deux codes font 63 % du volume : `PAROLE_GENERIQUE` (169 445, la suite d'une intervention) et `INTERRUPTION_1_10` (79 352, **20 % des éléments** : ce sont les apostrophes d'un député depuis son banc, toutes avec un orateur identifié ; « Madame Carvalho-Vallat, vous avez oublié de vous lever ! »). Les didascalies (applaudissements, exclamations) ne sont pas des interruptions : elles sont entre parenthèses **dans** le texte des autres paragraphes (39 782 « Applaudissements », 6 715 « Exclamations », 3 336 « Mêmes mouvements », 2 682 « Sourires », 1 255 « Protestations », 457 « Rires », 212 « Brouhaha », 17 « Huées », 4 « Claquements de pupitres »).

Les codes suivent un patron `FAMILLE_niveau_variante`, et les rites de vote se déroulent en **quatre codes consécutifs** : `…_1_2` (« Je mets aux voix l'amendement no 731 rectifié. »), `…_1_3` (« (Il est procédé au scrutin.) »), `…_1_4` (« Voici le résultat du scrutin : Nombre de votants 116… Pour l'adoption 41 Contre 75 »), `…_1_5` (« (L'amendement no 717 n'est pas adopté.) »). Même quadruplet en `_1_6…_1_9` (variante dont le sens n'est pas documenté ; supposé : scrutin annoncé à l'avance vs en cours). Familles (effectifs d'éléments, nombre de codes) :

| Famille | Codes | Éléments | Codes clés (exemple) |
|---|---|---|---|
| Cadre de séance | 10 | 5 055 | `OUV_SEAN_2_2` « (La séance est ouverte à quinze heures.) », `CHGT_PRES_1_1` « (À seize heures quinze, M. … remplace Mme … au fauteuil) », `FIN_SEAN_2_4` « (La séance est levée à vingt heures cinquante.) » |
| Ordre du jour, appel d'un texte | 12 | 3 542 | `ODJ_APPEL_DISCUSSION` « L'ordre du jour appelle la discussion… (nos 2841 rectifié, 3000, 3018) », `TITRE_TEXTE_DISCUSSION`, `PRESENTATION_1_0` |
| Discussion générale | 4 | 893 | `DISC_GENERALE_2` « Dans la discussion générale, la parole est à… », `_2_40` « La discussion générale est close. » |
| Motions | 22 | 549 | `MOTION_RP_2_1` « J'ai reçu de M. … une motion de rejet préalable », `SCR_MRJ_*` (son scrutin) |
| Questions | 8 | 4 160 | `QG_1_1` (1 946 titres de questions au gouvernement), `QOSD_*` (questions orales sans débat) |
| Articles, parties de lois de finances | 62 | 10 109 | `DISC_ARTICLES_2_4` « Article 3 bis (article soumis à la procédure de législation en commission) » (4 009), `SORT_ARTICLE_1_1` « (L'article 1er est adopté à l'unanimité.) », `PLF_PARTIES_*`, `PLFSS_*`, `SCR_PART_PLFSS_*` |
| Amendements | 43 | 97 159 | `DISC_ARTICLES_3_1` « La parole est à M. …, pour soutenir l'amendement no 13. » (22 224), `DISC_ARTICLES_3_4_1` (15 874, les interventions sur l'amendement), `DISC_ARTICLES_3_9_1` « Je suis saisie de quatre amendements identiques… » (6 330), `ADT_SORTS_DIRECT_1_10` « L'amendement no 30 de M. … est défendu. » (1 272), `REJET_ADT` (3 704), `ADOP_ADT` (1 829), `AM8ENDSORT_REJET_IDENTIQUES` (1 197), `RETRAIT_ADT` (1 243) |
| Sous-amendements | 28 | 9 019 | `DISC_ARTICLES_4_20` « Je suis favorable à l'amendement, sous réserve de l'adoption du sous-amendement. », `SORT_SS_ADT_*` |
| Annonce de scrutin public | 18 | 3 242 | `ANN_SCR_AUTRE_1_0` « …sur lesquels le groupe … a demandé un scrutin public » (3 108) |
| Explications de vote, vote sur l'ensemble | 52 | 1 431 | `VOTE_ENS_PPL_S_*` (proposition de loi, scrutin), `VOTE_ENS_CMP_S_*`, `_ML_` = main levée |
| Incidents de procédure | 9 | 4 953 | `RAP_REGLEMENT_2_1` « La parole est à M. …, pour un rappel au règlement. » (1 248 ; 350 séances), `RAP_REGLEMENT_2_30` « Je ne prends plus de rappels au règlement », `FAIT_PERSONNEL_0_1` (8), `VERIF_QUORUM_1_10` (10) |
| Suspensions | 10 | 4 684 | `SUSP_SEANCE_2_1` « La séance est suspendue pour cinq minutes. », `SUSP_SEANCE_2_2` « (La séance, suspendue à…, est reprise à….) » (995), `SUSP_BREVE_1_1` (57) |
| Responsabilité du gouvernement | 7 | 26 | `49_3_1_10` « Application de l'article 49, alinéa 3 » (8), `VOTE_CENSURE_1_20` « En conséquence, les conclusions de la CMP… sont considérées comme adoptées. » |
| Seconde délibération, réserve, retrait, prolongation | 10 | 60 | `SCDE_DELIB_2_1`, `RESERVE_VOTE_2_1` « le gouvernement lève la réserve… », `RETRAIT_PPL_2_1` (art. 84 al. 2), `AUTRE_VOTE_1_30` « (La demande de prolongation de la séance est adoptée.) » |

### 2.2 Épisodes et durées, toute la législature

25 344 épisodes (coupés à chaque décision de la présidence **et** à chaque changement de phase : ouverture, discussion générale, motion, articles, explications de vote, questions, 49.3). 2 257 heures de séance horodatées.

| Phase | Épisodes | Heures | Mots | Interruptions/heure |
|---|---|---|---|---|
| Articles (y compris « suite » d'un texte) | 22 096 | 1 640 | 13,5 M | 35 |
| Discussion générale | 444 | 284 | 2,5 M | 31 |
| Questions au gouvernement | 146 | 169 | 1,4 M | **47** |
| Explications de vote | 417 | 64 | 0,5 M | 38 |
| Questions orales sans débat | 815 | 58 | 0,7 M | 2 |
| Motions (rejet préalable) | 107 | 40 | 0,4 M | **70** |
| 49.3 (discours du Premier ministre) | 8 | 0,9 | — | **103** |

Épisodes d'amendement (16 098 avec durée, 1 124 h) :
- durée médiane **1,8 min**, 9e décile 12 min, maximum 2 h 44 (amendement no 746, article 55, PLF 2027, 24 347 mots) ;
- **concentration** : les 10 % d'épisodes les plus longs prennent 48 % du temps, les 1 % les plus longs 13 % ;
- **rafales** : 3 352 épisodes sans aucune prise de parole d'un député (« défendu », avis, sort), durée médiane **1,3 seconde** d'horodatage ;
- un amendement adopté prend moins de temps qu'un rejeté (médiane 1,6 vs 2,4 min) ; un épisode avec scrutin public dure deux fois plus (3,1 vs 1,5 min) ;
- les épisodes très longs sont souvent ceux qui portent les **inscrits sur l'article** (prises de parole avant le premier amendement) : l'épisode « amendement no 746 » est en réalité l'article 55.

Texte le plus long en séance sur la législature : fin de vie (126,6 h, 2 531 épisodes, 909 scrutins), puis PLF 2026 (121,9 h, 911 scrutins), PLFSS 2026 (90,2 h), PLF 2027 (73,3 h, en cours), PLF 2025 (60,3 h). Narcotrafic : 537 épisodes, 49,5 h sur 17 séances, 151 épisodes avec scrutin.

Avis (repérés quand le paragraphe qui suit « Quel est l'avis… ? » commence par la formule, donc **sous-estimés**) : « défavorable » 4 537, « même avis » 2 463, « favorable » 930, « sagesse » 394, « demande de retrait » 216. Issues mesurées :

| Avis rencontré dans l'épisode | Épisodes | Adopté | Rejeté | Retiré |
|---|---|---|---|---|
| favorable | 880 | 677 (77 %) | 179 | 20 |
| défavorable | 3 618 | **498 (14 %)** | 3 027 | 88 |
| sagesse | 187 | 102 (55 %) | 80 | 4 |
| demande de retrait | 213 | 41 | 116 | 56 (26 %) |

Commission et gouvernement donnent des avis **divergents** dans 280 des 2 116 épisodes où les deux sont lus (13 %) ; le cas le plus fréquent est « défavorable / sagesse » (88).

### 2.3 Scrutins publics ↔ amendements

**Jointure** : (1) par `seanceRef` et le couple pour/contre, dans l'ordre, en exigeant que le numéro du titre figure dans le « Je mets aux voix » précédent : **9 695 / 9 759 scrutins appariés à leur résultat dans le compte rendu (99,3 %)** ; les 64 restants sont surtout les motions de censure (décompte « pour » seul) ; (2) (numéro du texte dans `bibard`, numéro d'amendement) → uid, repli (date du sort, numéro) : **8 231 / 8 408 scrutins sur amendement ou sous-amendement reliés à un uid unique (97,9 %)**. Contrôle : sort du scrutin et sort de l'amendement concordent dans 8 214 cas sur 8 231.

Ce que ça montre :
- **34 % des amendements de séance mis aux voix (8 214 sur 23 884 adoptés ou rejetés) l'ont été au scrutin public.** C'est bien plus que les ~10 % estimés sur le narcotrafic. Proportion très inégale selon le groupe auteur : CP 52 %, UT 46 %, gouvernement 38 %, RC 33 %, SOL 33 %, AR 33 %, LL 26 %, PR 26 %, DC 23 %, NV 22 %, NI 17 %.
- 9 759 scrutins : amendement 7 634, article 954, sous-amendement 774, ensemble 227, motion 83, seconde délibération 43, résolution 13, **demande de suspension de séance** 12 (art. 58 : on vote sur la suspension), partie de loi de finances 9, déclaration du gouvernement (50-1) 4, prolongation de séance 3. Types : 9 661 ordinaires, 75 solennels (votants médian 531, contre 131 pour un ordinaire), 23 motions de censure.
- **Qui demande** (titre du scrutin) : CP 2 878, UT 2 277, PR 1 320, « président de séance » 1 118, RC 870, LL 761, SOL 671, ECO 332 ; 1 167 scrutins ont plusieurs demandeurs. Un groupe demande le scrutin sur **son propre** amendement dans 70 % des cas (5 052 contre 2 134). Exceptions : PR et AR (38 % sur leurs propres amendements), qui demandent surtout le scrutin sur les amendements des autres (PR sur ceux du gouvernement 95 fois).
- **Le scrutin « du doute »** : 1 118 scrutins ont pour demandeur la présidence de séance. Le compte rendu le dit : « (Le vote à main levée n'ayant pas été concluant, il est procédé à un scrutin public.) » (~880 fois). Ils se jouent serré (422 à moins de 10 voix d'écart) et sont adoptés plus souvent (40 % contre 33 %).
- **Écarts minces** : 336 scrutins décidés à 2 voix ou moins, dont 71 égalités parfaites (une égalité vaut rejet).
- **Participation** : votants médian 131 sur 577 (quartiles 89 et 188). Participation médiane par groupe (exprimés / membres) : de 9 % (DC, NI) à 32 % (CP). **15 % des voix sont émises par délégation** (218 064 sur 1 422 196).
- **Cohésion** (part des scrutins où le groupe présent compte au moins une voix contraire à sa position majoritaire) : RS 2,6 %, AR 2,4 %, UT 3,6 %, SOL 5,2 %, CP 10 %, ECO 14,8 %, LL 15,5 %, RC 15,8 %, NV 17,6 %, DC 17,7 %, PR 25,7 %. Groupe réellement coupé (au moins 30/70 et 6 voix) : NV 330 fois, ECO 294, PR 247, LL 212, RC 135. La dissidence est **concentrée** : un même député a voté contre la majorité de son groupe 689 fois ; les dix plus fréquents en totalisent chacun plus de 360.

### 2.4 Traces de négociation en séance

- **Retrait** : 1 409 sorts « retiré » (`RETRAIT_ADT(S)`). Après une « demande de retrait » explicite dans l'avis, 26 % sont retirés, 54 % rejetés, 19 % adoptés quand même.
- **« Je le retire au profit de… »** (ralliement à un amendement voisin) : 54 occurrences. **Retrait contre engagement** (« retravailler », « d'ici la navette / la CMP / le Sénat ») : 58. **Renvoi à la navette** (« ils pourront être corrigés au cours de la navette ») : 192 paragraphes.
- **Rectification** : 1 902 amendements de séance rectifiés (rect ≥ 1) ; ils sont adoptés à 21,6 % contre 8,2 % pour les autres. La rectification **orale en séance** est quasi absente (2 cas) : à l'AN, la négociation de rédaction passe par le sous-amendement et le dépôt d'un « rectifié » avant l'appel, pas par la parole. **Aucun « sous-amendement oral »** (0) ; le gouvernement « propose de sous-amender » 4 fois en le disant.
- **Sous-amendements** : 1 749 épisodes en comportent ; « Je suis favorable à l'amendement, sous réserve de l'adoption du sous-amendement » est la formule d'un accord conditionnel (`DISC_ARTICLES_4_20`, 2 065).
- **Sagesse** : 971 paragraphes « sagesse de l'Assemblée » ; l'issue est un pile ou face (55 % adoptés).
- **Seconde délibération** : 344 paragraphes, 43 scrutins ; « Mardi soir, nous étions d'accord… En concertation avec votre rapporteur… une seconde délibération de l'article » : c'est le rattrapage d'un vote après accord.
- **Suspensions** : 1 124 suspensions ; 409 demandées par un député (« Je demande une suspension de séance de cinq minutes », de droit pour un président de groupe, art. 58) ; les présidents de groupe les plus demandeurs en comptent 34, 13, 12. Motifs lisibles rares (« pour que nous puissions clarifier la formulation de l'article, avant que l'Assemblée ne s'exprime sur les amendements de suppression » → amendements identiques de suppression adoptés juste après). Durée médiane ≈ 6 min (mesure fragile, cf. pièges).
- **Vote bloqué / réserve** (art. 44 al. 3) : 22 mentions de « vote bloqué », 1 « levée de la réserve ». **Temps législatif programmé** : 32 mentions seulement, aucun décompte de temps restant structuré.

### 2.5 Les lois de finances et le 49.3

- 8 engagements de responsabilité (`49_3_1_10`) : PLFSS 2025 (2 déc. 2024 → censure adoptée 331 voix le 4 déc.), PLF 2025 et PLFSS 2025 (3, 5, 10 févr. 2025), PLF 2026 (20, 23, 30 janv. 2026). 23 motions de censure votées, une seule adoptée. Le 49.3 est l'épisode le plus interrompu de toute la législature (103 interruptions/heure).
- **Ce que devient la séance** : les amendements jamais appelés. Sort vide (`None`) pour **68 % des amendements de séance du PLF 2026** (7 453 / 10 948), 67 % du PLF 2025, 72 % du PLFSS 2025, 66 % du PLFSS 2027, 42 % du PLFSS 2026. Hors lois de finances, d'autres textes ont 100 % d'amendements sans sort : motion de rejet adoptée ou débat interrompu (3 460 sur la PPL « contraintes à l'exercice du métier d'agriculteur », 3 159 sur le projet de loi constitutionnel Nouvelle-Calédonie, 1 284 sur l'audiovisuel public, 1 659 sur une PPL organique).
- **Le texte amendé que personne ne vote** : première partie du PLF 2026 rejetée par **1 voix pour, 404 contre** (21 nov. 2025) ; première partie du PLF 2027 rejetée **0 pour, 458 contre** (4 nov. 2026) ; deuxième partie du PLFSS 2027, 1 pour 115 contre (23 oct. 2026). Après des centaines d'amendements adoptés (571 adoptés sur le PLF 2027), plus aucun groupe ne soutient le résultat.
- Les lois de finances ont leur propre grammaire (`APPEL_PLF_*`, `PLF_PARTIES_*`, `PLFSS_1_20` « Deuxième partie (suite) », `SCR_PART_PLFSS_*`, `MAV_PART_PLFSS`), l'« examen prioritaire » (46) et l'« appelé par priorité » (401) : l'ordre des articles n'est pas l'ordre du texte.

### 2.6 Applaudissements : qui applaudit avec qui

Les didascalies nomment les groupes (« Applaudissements sur les bancs des groupes PR, LL, NV et ECO »). Applaudissements où un groupe est cité : UT 15 960, CP 8 932, SOL 8 689, RC 8 356, PR 8 156, LL 4 926, NV 4 812, AR 4 765, RS 3 697, ECO 2 901, DC 1 196. Co-applaudissements dans une même didascalie : SOL+UT 4 681, CP+AR 4 308, SOL+RC 4 306, NV+PR 3 485, UT+RC 3 096, LL+PR 2 370 ; à l'autre bout, UT+CP 83, RS+AR 27. C'est un réseau d'affinités **observé**, sans vote, à chaque phrase.

## 3. Surprises, ou ce qui contredit l'acquis

1. **Le compte rendu est horodaté à la seconde** (`stime`), ce que l'acquis cherchait via `dateSort` ou les heures en toutes lettres. La durée réelle de chaque épisode, de chaque intervention, et le minutage d'une séance sont directement disponibles.
2. **Le compte rendu porte déjà la structure** (`art`, `adt`, `ssadt`, `bibard` sur chaque point ou paragraphe) : le rattachement à l'amendement n'a pas besoin de l'expression régulière sur « no X ».
3. **Le scrutin public n'est pas marginal : 34 % des amendements mis aux voix**, et 52 % pour les amendements d'un groupe. L'estimation de 10 % tirée du narcotrafic ne vaut pas pour la législature.
4. **Le demandeur figure dans le fichier scrutin** (pas seulement dans le compte rendu), et un scrutin sur neuf est demandé par la présidence parce que la main levée a été douteuse.
5. **Un épisode d’amendement sur cinq est une rafale d’une seconde** (3 352 sur 16 098). La séance est bimodale : des rafales muettes et quelques débats qui prennent la moitié du temps.
6. **La rectification orale n'existe presque pas** à l'AN : la négociation visible se fait par sous-amendement, retrait « au profit de », renvoi à la navette ou seconde délibération.
7. **Un avis défavorable n'empêche pas l'adoption** (14 % des cas) : en l'absence de majorité, le banc (commission + gouvernement) perd régulièrement.
8. **Les interruptions sont des paroles, pas du bruit** : 79 352 apostrophes, toutes attribuées à un orateur nommé. Le bruit (applaudissements, exclamations) est ailleurs, en didascalies, avec les groupes cités.
9. Les lois de finances finissent par des parties **rejetées à l'unanimité ou presque**, et deux tiers de leurs amendements ne sont jamais appelés.

## 4. Séquences, découpages, unités, fonctionnalités suggérées (large, non trié)

**Unités nouvelles**
- **La seconde de séance** (`stime`) comme unité de temps commune à tous les objets : intervention, épisode, scrutin, suspension, séance.
- **Le quadruplet de vote** (mise aux voix → scrutin → résultat → sort), unité atomique d'une décision.
- **La didascalie** comme événement collectif attribué à des groupes (applaudir, protester, « mêmes mouvements »).
- **L'apostrophe** (interruption) comme micro-intervention d'un député, avec cible implicite (l'orateur en cours).

**Séquences**
1. **La rafale** : vingt amendements « défendus », avis, rejet, en une minute. Représentation : feuilles empilées serrées, sans texte, que le tambour fait défiler d'un coup.
2. **Le débat qui dévore l'article** : les inscrits sur l'article puis le premier amendement ; 48 % du temps dans 10 % des épisodes. Montrer l'épaisseur réelle (minutes) de chaque feuille dans la pile.
3. **Se compter** (scrutin public) : demandé par l'auteur (70 %), par un autre groupe (30 %), ou par la présidence en cas de doute. Trois sous-séquences distinctes.
4. **Le doute** : main levée non concluante → scrutin → écart de quelques voix. Vue : la balance qui oscille.
5. **La défaite du banc** : avis défavorable commission + gouvernement, amendement adopté (498 cas). Pastilles d'avis barrées par la décision.
6. **Le désaccord du banc** : commission et gouvernement divergents (13 %), puis l'issue.
7. **Le ralliement** : « je le retire au profit du no X » ; flèche d'une feuille vers une autre dans la pile des autres.
8. **Le retrait contre promesse** : retrait + « d'ici la navette » ; trace à suivre dans la lecture suivante (lien avec le canal navette).
9. **L'accord conditionnel** : « favorable sous réserve de l'adoption du sous-amendement » ; le sous-amendement comme pièce qui ajuste ma feuille.
10. **La seconde délibération** : revenir sur un vote après accord ; une feuille déjà tombée qui remonte dans la pile.
11. **La suspension** : demandée par un groupe, durée, ce qui est adopté juste après la reprise.
12. **La dissidence** : un député qui vote contre son groupe, plusieurs centaines de fois pour certains ; vue « mon groupe s'est-il divisé sur cet amendement ? ».
13. **Le 49.3 et ce qu'il efface** : la pile des amendements jamais appelés (deux tiers sur un PLF), puis la censure.
14. **Le texte que plus personne ne vote** : partie de PLF rejetée 0 contre 458 après des centaines d'adoptions.
15. **La motion de rejet** : la séance la plus agitée (70 interruptions/heure), qui peut supprimer d'un coup 100 % des amendements.
16. **Le réseau des applaudissements** : qui applaudit avec qui, phrase par phrase.
17. **La séance comme partition** : une ligne par séance, chaque épisode à sa position `stime`, ses couleurs par famille de grammaire, les suspensions en blancs, les changements de président, les rappels au règlement.

**Fonctionnalités**
- **Minutage réel** sur chaque feuille (amendement, alinéa, article) : « 14 min en séance, 3 orateurs, 12 interruptions ».
- **Feuille de vote** par amendement : ventilation par groupe en barres papier, dissidents nommés en marge, part de délégations, participation (131 votants sur 577).
- **Bascule « main levée / scrutin »** : quels amendements de ma pile ont été comptés.
- **Indicateur de concurrence au scrutin** : pour un alinéa donné, les amendements concurrents qui ont été soumis au scrutin, et à la demande de qui.
- **Lecture « avis → issue »** en pastilles (commission | gouvernement | Assemblée), dans les trois volets.
- **Pile des amendements « jamais appelés »** (sort vide) en ombre derrière la pile des amendements discutés.
- **Index de la grammaire** : un filtre par famille (incidents, votes, sous-amendements) pour parcourir une séance.
- **Lecture vidéo** : `stime` est un décalage dans la vidéo de séance ; on peut caler un extrait vidéo sur chaque épisode (supposé : la vidéo AN accepte un paramètre de temps ; non vérifié).
- **Fiche de groupe** (sans score) : scrutins demandés, sur ses propres amendements ou sur ceux des autres, taux de division, co-applaudissements.

## 5. Questions ouvertes

- Que signifient exactement les variantes `_1_2…_1_5` et `_1_6…_1_9` des quadruplets de vote ? (Les deux existent pour les amendements, les articles, les sous-amendements.)
- Avis : le repérage par formule en tête de paragraphe manque les avis rendus au milieu d'une longue intervention du rapporteur. Il faudrait le paragraphe qui suit « Quel est l'avis de la commission / du gouvernement » sans exiger la formule, puis classer.
- Le texte sur lequel le gouvernement engage sa responsabilité (49.3) retient certains amendements adoptés en séance : où le trouver en open data (document `TAP`, texte considéré comme adopté) et comment le comparer aux amendements adoptés avant l'interruption ?
- Les « dissidents » : confronter aux mises au point (`miseAuPoint`, « X a fait savoir qu'il avait voulu voter… ») ; le champ existe dans le scrutin mais n'a pas été exploité ici.
- Groupe `AR` à identifier (référentiel `amo` plus récent).
- Logement : la séance AN est prévue du 16 au 20 novembre 2026 ; aucun compte rendu ni scrutin n'existe encore. Les scripts sont prêts à être relancés (aplatir → épisodes → lier) dès la publication.
- Peut-on attribuer chaque apostrophe à sa cible (l'orateur interrompu) et chaque applaudissement à l'intervention applaudie, pour un graphe orateur ↔ groupes ? Les données le permettent (ordre et orateur) ; la jointure orateur → groupe passe par `amo` (mandats).
