# Front « commission » — rapports, comptes rendus de commission, agenda (canal 1, slug `an-commission`)

Échantillon : logement (DLR5L17N54608, commission des affaires économiques CION-ECO, rapport n° 3188, rapporteure + avis de la commission des finances) et narcotrafic (DLR5L17N50169, commission des lois CION_LOIS, rapport n° 1043, trois rapporteurs). Tout ce qui est chiffré ci-dessous a été **vu** dans les données ; les suppositions sont signalées « (supposé) ».

---

## 1. Ce que j'ai exploré, comment y accéder

| Gisement | Accès | Format, volume | Pièges |
|---|---|---|---|
| Rapport logement (un seul document) | `https://www.assemblee-nationale.fr/dyn/opendata/RAPPANR5L17B3188.html` | HTML Word-export, 1,9 Mo, 3 702 paragraphes, 160 000 mots | Contient **aussi l'avis de la commission des finances** (≈ 23 000 mots) à la fin, dans le même fichier |
| Rapport narcotrafic | `RAPPANR5L17B1043.html` → **404**. Il faut les tomes : `RAPPANR5L17B1043-tI.html` (synthèse, commentaires, personnes entendues : 2,5 Mo, 168 000 mots) et `RAPPANR5L17B1043-tII.html` (comptes rendus : 1,8 Mo, 154 000 mots) | | Les uid des tomes sont dans `dos/json/document/RAPP….json`, champ `divisions.division[].uid`. Les annexes `-COMPA` (texte comparatif) répondent 404 |
| Comptes rendus de commission, réunion par réunion | `https://www.assemblee-nationale.fr/dyn/opendata/<compteRenduRef>.html`, ex. `CRCANR5L17S2026PO419610N120.html` (logement, 21/9/2026 16 h 30), `CRCANR5L17S2025PO59051N053.html` (narcotrafic, réunion « article 88 ») | HTML, ≈ 250 Ko par réunion | Le `compteRenduRef` se lit dans l'agenda. Les URL « jolies » `/dyn/17/comptes-rendus/eco/…` que j'ai devinées répondent 404. Le CR est **le même texte que le rapport** (24 paragraphes sur 436 diffèrent, uniquement par découpage), plus la liste « Membres présents ou excusés » |
| Agenda | `raw/ag/json/reunion` (8 279 JSON) ; 49 réunions citent l'un des deux dossiers | JSON : début, fin, salle, état (Confirmé / Éventuel), ordre du jour, **présence de chaque membre** (`présent` / `absent` / `excusé`), `compteRenduRef` | Les présences ne listent que les **membres** de la commission (des orateurs non membres n'y figurent pas, (supposé) d'après les écarts) ; une réunion (narcotrafic 5/3 21 h) n'a aucune présence saisie |
| Open data amendements | `am.jsonl` + JSON bruts | `dateSort` **à la seconde** en commission | Non aplati jusqu'ici : c'est une horloge de la réunion (voir § 2.5) |

HTML des rapports : un paragraphe = un `<p class="assnat…">`. Classes utiles : `assnatAN1PARTIE` (grandes parties), `assnatEXA7Article` ou classe vide + `assnatEncaTitre` suivant (en-tête d'article commenté), `assnatEncaTitre`/`assnatEncaTexte` (encadré de synthèse), `assnatAnx2GdI`/`Anx3GdA`/`Anx4Pt1` (plan I/A/1), `assnatAN4Petit1` (réunion), `assnatTABCase` (cellules de tableau), `assnatFootnoteText` (notes).

Scripts (dans `scripts/`) :
- `an-commission_paragraphes.py` : HTML → paragraphes JSONL `{i, tag, cls, txt}`.
- `an-commission_examen.py` : partie « examen » → épisodes (titre « Amendement(s) … » → prises de parole → décisions).
- `an-commission_croiser.py` : épisodes × `am.jsonl` (mention, sort, avis du rapporteur, mots, orateurs).
- `an-commission_tiers.py` : organisations auditionnées × exposés sommaires × débats.
- `an-commission_agenda.py` : réunions de l'agenda liées aux dossiers (durées, présences, CR).

Extraits (groupes et auteurs bruts) dans `scratchpad/extraits-bruts/` :
`an-commission-logement-amendements-rapport.json` et `an-commission-narco-amendements-rapport.json` (une ligne par amendement de commission : sort open data, mention dans le rapport, épisode, mots, orateurs, avis du rapporteur heuristique), `an-commission-logement-art4-commission.json` (article 4 logement, l'écho de la maquette : commentaire du rapport + 26 épisodes de débat, 9 227 mots), `an-commission-logement-commentaires.json` (16 articles : statut, encadré, plan, « position de la commission »), `an-commission-art88-narco.json` (190 avis « Accepté » de la réunion article 88), `an-commission-agenda-reunions.json`.

---

## 2. Observations chiffrées

### 2.1 Anatomie d'un rapport

Logement (3188), en mots :

| Partie | § | Mots |
|---|---|---|
| Sommaire + introduction | 80 | 3 000 |
| Commentaires d'articles (16 articles) | 962 | 41 800 |
| Examen en commission : réunion 1 = audition du ministre + discussion générale | 207 | 15 400 |
| Examen en commission : réunions 2 à 5 = examen des articles | 1 671 | 76 500 |
| Personnes entendues par la rapporteure | 69 | 540 |
| Avis de la commission des finances : intro, articles, réunion, personnes entendues | 712 | 23 200 |

Narcotrafic : le tome I contient 59 articles commentés (139 000 mots, médiane 1 527 mots par article, de 59 à 13 193) ; le tome II contient 1 audition + 8 réunions d'examen (154 000 mots). **Le compte rendu des débats pèse à peu près autant que les commentaires**, et dix fois plus que le texte de loi.

### 2.2 Le commentaire d'article : une synthèse déjà écrite, en trois temps

Chaque article commenté s'ouvre sur un **statut** (« Adopté par la commission avec modifications » : 10 sur 16 ; « sans modification » : 3 ; « Introduit par la commission » : 2 ; « Supprimé par la commission » : 1 [article 3]) puis un **encadré** de 1 à 4 paragraphes (40 à 295 mots), qui suit presque toujours le même schéma : *ce que fait l'article* → *ce qu'en a fait le Sénat* → *ce qu'en a fait la commission*. Exemple, article 2 logement : « L'article 2 instaure les opérations d'intérêt local… » / « Le Sénat a renommé les OIL en "périmètres de développement du logement"… » / « La Commission a rétabli l'article 2 dans sa version initiale… ». Le corps suit un plan fixe : « I. Le droit existant » / « II. Le droit proposé » (avec « C. La position du Sénat ») / « III. La position de la commission ». Narcotrafic : encadré à rubriques nommées (« Résumé du dispositif et effets principaux », « Dernières modifications législatives intervenues », « Modifications apportées par le Sénat », « Position de la Commission »), sur 9 articles seulement.

La section « position de la commission » **énumère les amendements adoptés, avec auteur et avis du rapporteur**, ce que l'open data ne donne pas. Article 4 logement : « l'amendement CE284 de Mme [X], adopté avec un avis favorable de la rapporteure… » ; « l'amendement CE406 de Mme [Y], adopté avec un avis de sagesse… » ; « six amendements identiques, dont un amendement de la rapporteure (CE731), tendant à supprimer la possibilité, introduite par le Sénat, de bénéficier du dispositif en louant à un membre de sa famille ». Il y a des coquilles : CE734 est cité deux fois pour deux objets différents. Les 16 commentaires logement citent 41 amendements distincts ; les 59 commentaires narcotrafic en citent 133.

Le commentaire est **la voix du rapporteur** : il dit « la position de la commission », jamais celle des opposants. C'est une synthèse **à une voix**, pas l'inventaire des positions que vise la scène 5 de CLAUDE.md.

### 2.3 La grammaire de l'examen

Unité de base : l'**épisode**. Un titre (« Amendement CE497 de Mme X, amendements identiques CE196 de M. Y, CE311 de M. Z et CE424 de M. W (discussion commune) »), puis les prises de parole (« Mme X (GROUPE). … », « Mme X, rapporteure. … », « M. X, ministre. … »), puis la décision. Logement : 155 épisodes, 68 600 mots de débat, médiane 305 mots par épisode, maximum 2 150 ; 97 épisodes à un seul amendement, 58 à plusieurs (jusqu'à 6 et plus). Narcotrafic : 224 épisodes, 120 700 mots, médiane 377, maximum **7 148 mots et 19 orateurs** (amendement CL471 du Gouvernement, régime de détention, examiné « par priorité », avec 6 sous-amendements).

Formules de décision les plus fréquentes (logement 236, narcotrafic 372 lignes) : « La commission rejette l'amendement. » (58 / 68), « L'amendement est retiré. » (19 / 13), « La commission rejette successivement les amendements. » (17 / 12), « La commission adopte l'amendement. » (16 / 53), « Elle adopte l'amendement rédactionnel CE698 de Mme …, rapporteure. », « En conséquence, les amendements CE x à CE y tombent. », « Suivant l'avis de la rapporteure, elle rejette l'amendement CE561 de Mme … » (23 logement, 7 narcotrafic), « Contre l'avis du rapporteur, la commission rejette l'amendement. », « Elle adopte l'article 2 modifié. », « En conséquence, l'article 3 est supprimé et les autres amendements tombent. ».

**Trois régimes de visibilité** se dégagent :
1. *Débattu* : titre d'épisode + paroles. Logement 275 amendements sur 744, narcotrafic 359 sur 665.
2. *Voté sans débat retranscrit* : cité seulement dans une ligne de décision. Logement 70 : 23 adoptés (rédactionnels surtout), 24 tombés, 17 rejetés via la formule « Suivant l'avis de la rapporteure, elle rejette… ». **Cette formule marque précisément les amendements mis aux voix sans que personne ait parlé** ; elle n'apparaît jamais en tête d'épisode.
3. *Silencieux* : absent du rapport. Logement 399 : 224 irrecevables (140 au titre de l'article 45, 52 au titre de l'article 40 « charge », 7 « gage », 7 doublons, 7 hors du champ de l'habilitation, 3 injonctions…), 128 tombés en bloc (« les autres amendements tombent »), 28 non soutenus, 15 retirés avant l'examen. Narcotrafic 197, dont 75 tombés et 53 non soutenus.

Le rapport donne donc la **cause** des tombés en bloc (logement : 33 décisions horodatées à la même seconde, 19:36:14, au moment de la réécriture de l'article 2).

**Le rapport et l'open data concordent** : 0 numéro cité dans le rapport ne manque dans l'open data. Sur les amendements mentionnés, les sorts concordent pour 315 sur 345 (logement) et 430 sur 468 (narcotrafic). Les écarts viennent surtout de mon attribution des décisions anaphoriques dans les épisodes à plusieurs amendements (supposé), pas de vraies contradictions.

**Chiffres d'ouverture du président**, absents de l'open data : « Notre commission est saisie de 493 amendements » ; 64 irrecevables au titre de l'article 40, 3 au titre de l'article 20, 141 au titre de l'article 45 (« environ 19 % »). Dans l'open data : 744 amendements CE, 140 cavaliers, 61 « Irrecevable 40 ». Les comptes ne se recoupent pas exactement (à creuser : doublons, retraits, rectifications). Le président **explique le périmètre de l'article 45 en clair** (« Ont également été déclarés irrecevables les amendements qui concernaient les procédures d'urbanisme en général, hors… ») : c'est la seule trace textuelle de la frontière du texte.

**Ce que le rapport ajoute à l'open data** :
- **L'avis du rapporteur** sur chaque amendement débattu. Heuristique sur sa dernière prise de parole : logement 78 « défavorable » → rejeté ; 12 « retrait » → rejeté ; 10 « retrait » → retiré ; 7 « défavorable » → adopté quand même ; 5 « sagesse » → rejeté. Narcotrafic : 33 avis apparemment « favorables » suivis d'un rejet, ce qui est surtout du bruit dans les épisodes multiples (l'avis diffère d'un amendement à l'autre). Il faudrait découper l'avis par amendement cité.
- **Qui parle, combien** (logement, mots) : rapporteure 11 900, **ministre 11 600** (présent à toute la commission : il intervient dans 86 épisodes sur 160), puis par groupe de 2 000 à 9 000 mots. Narcotrafic : le ministre ne parle que 4 900 mots (audition + CL471), les rapporteurs 18 600, le groupe le plus disert 32 300 mots (27 % du débat).
- **Les retraits et leur négociation** : 31 retraits en réunion (logement), dont 10 après une demande de retrait explicite. On voit le marché se conclure en séance de commission : « Je vous propose de retirer l'amendement pour mener ensemble un travail de réécriture d'ici à l'examen du texte en séance publique » (ministre, article 6) ; « Je retire l'amendement CE280 » ; « Je retire mon amendement ».
- **La provenance politique d'une rédaction** : « notre amendement de réécriture reprend le texte de l'article 1er de la proposition de loi transpartisane, tel qu'issu de la commission » ; « cet article 6 ne sort pas de nulle part, il s'appuie sur le rapport des députés … » ; « cette proposition est issue des recommandations du Cese ».
- **La rhétorique de famille** : « mon avis sur cet amendement est défavorable, comme il le sera sur ceux qui ont trait à la même thématique » (la rapporteure annonce un avis pour toute une série) ; « Vous posez une question importante : faut-il être pour ou contre la démolition ? ». Les thèmes sont nommés par les acteurs eux-mêmes.

**Débat par article (logement)** : les épisodes les plus longs portent sur l'article 10 (amendements de suppression, 2 150 mots, 10 orateurs), l'article 1er (« reconquête républicaine » contre « égalité républicaine », 1 853 mots), l'article 6 (DPE : trois épisodes de plus de 1 600 mots) et l'article 2. L'article 4 (l'écho de la maquette) compte 26 épisodes et 9 227 mots.

### 2.4 Les tiers : auditionnés et sources citées ne coïncident qu'en partie

- **Logement** : 19 organisations entendues par la rapporteure, 10 marquées d'un astérisque, soit « inscrits au répertoire des représentants d'intérêts de la HATVP ». C'est une **étiquette lobby officielle**, dans le rapport. Huit seulement sont citées dans au moins un exposé sommaire. La Fondation pour le logement apparaît dans 27 exposés mais 3 fois dans les débats ; l'ANRU dans 31 exposés et 92 fois dans les débats (c'est l'objet de l'article 1er) ; l'USH dans 4 exposés et 8 + 9 (« USH ») fois dans les débats. Sept organisations auditionnées ne sont citées **nulle part** dans les exposés : UNIS, UNPI, FNAIM, architectes, Intercommunalités de France, notariat, UNIOPSS. À l'inverse, des sources revendiquées dans les exposés (« travaillé avec », « proposé par ») n'ont pas été auditionnées : Collectif des associations pour le logement, FAPIL, un syndicat de fabricants d'isolants, Fédération française du bâtiment, Syntec-Ingénierie, IGNES, Fédération des ascenseurs, Départements de France, Haut Comité pour le droit au logement. La commission des finances a sa propre liste (Direction de la législation fiscale, ministre, ANRU…).
- **Narcotrafic** : 122 lignes d'organisations ou personnes, sans astérisque HATVP, presque uniquement des administrations, des juridictions et des autorités indépendantes. Le Conseil national des barreaux est cité dans 81 exposés (≈ 50 avec « travaillé avec », dont 42 en commission), mais 2 fois seulement dans les débats de commission. La Cnil : 12 exposés, 22 mentions orales. Le Syndicat de la magistrature : 22 exposés, 1 mention orale. Sources des exposés absentes de la liste : Fédération française des télécoms, Institut pour la Justice (4 mentions orales), Comité européen pour la prévention de la torture, collectifs anti-mafia, un cabinet de conseil.
- Conclusion : il y a **deux réseaux de tiers distincts**. L'un est *écouté par le rapporteur* (auditions, pour fabriquer le texte de la commission) ; l'autre *écrit pour les groupes* (rédactions transmises, qui deviennent des amendements, souvent identiques). Ils se recouvrent peu, et le second est quasi invisible à l'oral.

### 2.5 L'agenda et l'horloge

- Réunions de commission (agenda) : logement, désignation de la rapporteure le 1/7/2026, audition du ministre le 16/9 (115 min), examen le 21/9 à 16 h 30 (205 min) et à 21 h 30 (135 min), le 22/9 à 15 h 30 (270 min) et à 21 h 30 (155 min), soit **≈ 13 h d'examen** ; commission des finances le 16/9 (60 min) et le 17/9 (95 min). Une réunion « Éventuel » est prévue le 16/11/2026 à 16 h 30 : c'est la réunion « article 88 » à venir, le jour de l'ouverture de la séance. Narcotrafic : une mission d'information le 17/2, l'audition des ministres le 4/3 (180 min), huit réunions d'examen du 5 au 7 mars (≈ 31 h), puis la réunion « article 88 » le 17/3 : **5 minutes, 4 présents**.
- **Présences** : 18 à 75 membres présents selon la réunion (narcotrafic 5/3 9 h : 75 présents, 4 absents ; 7/3 14 h : 27 présents). Logement : de 30 à 56 présents. Entre 2 et 10 orateurs par réunion ne figurent pas parmi les présents (non-membres, ou défaut de mon rapprochement des noms (supposé)).
- **`dateSort` est une horloge à la seconde** : logement, 498 amendements datés, du 21/9 16:47:31 au 23/9 00:04:47. Durée d'un épisode = écart entre deux décisions : médiane 3,2 min (logement), 5,4 min (narcotrafic). La **corrélation durée ↔ mots du compte rendu vaut 0,83** (logement), 0,64 (narcotrafic, pauses comprises) ; ≈ 91 mots retranscrits par minute (logement), 64 (narcotrafic). L'épisode le plus long dure 29,6 min (CE738, réécriture de l'article 6 bis par la rapporteure, avec sous-amendements), alors que le plus long en mots est l'article 10. Certains épisodes « courts en mots, longs en temps » (16,9 min pour 223 mots) signalent sans doute un vote compliqué, une suspension ou un rappel au règlement (supposé).
- **Réunion « article 88 »** (narcotrafic) : un tableau des avis de la commission sur les amendements de séance, avec **seulement les « Accepté »** (190) ; « les autres amendements… ont été repoussés ». Sur ces 190 : 112 adoptés en séance, 14 rejetés, 15 non soutenus, 20 sans sort. Inversement, 74 des 184 adoptions de séance se font **sans** avis favorable préalable de l'article 88 (amendements du Gouvernement tardifs, sous-amendements, avis changés en séance (supposé)). Répartition des « Accepté » par groupe : 72 pour le groupe du rapporteur principal, 46 pour un autre groupe, 14 pour le Gouvernement, de 1 à 14 pour chacun des autres. La commission, après son texte, rend donc un **second verdict** sur les amendements de séance, en 5 minutes.

---

## 3. Surprises, ou ce qui contredit l'acquis

1. **Le rapport narcotrafic n'existe pas en un seul fichier** : `RAPPANR5L17B1043.html` répond 404, il faut les tomes `-tI` et `-tII`. Le logement est en un seul fichier. La recette « RAPP + numéro » de `03-sources-et-recette.md` est donc à amender.
2. **Les comptes rendus de commission existent bien en open data**, un par réunion (`CRCANR5L17S…`), atteignables par l'agenda. L'acquis disait « l'open data comptes rendus ne couvre que la séance » : il ne les met pas dans le zip Syceron, mais ils sont servis par `/dyn/opendata/`, avec la liste des présents.
3. **L'agenda contient les présences nominatives** de chaque membre, réunion par réunion.
4. **`dateSort` à la seconde** fait une horloge de la commission ; une même seconde trahit une chute en bloc.
5. **« Suivant l'avis de la rapporteure… »** n'est pas une simple formule de politesse : elle repère les amendements mis aux voix sans défense orale.
6. **L'astérisque HATVP** : le rapport classe lui-même les auditionnés en « représentants d'intérêts » ou non.
7. **Le ministre parle autant que la rapporteure** en commission (logement) ; sur une proposition de loi (narcotrafic), il est presque absent hors audition. Le type de texte change la distribution de la parole.
8. **Le rapport logement contient l'avis d'une autre commission**, avec son propre débat et ses propres auditions, et ses amendements reviennent comme amendements CE (« amendements identiques CE338 de la commission des finances et CE495 de M. … »). Une commission saisie pour avis est un acteur collectif qui dépose.
9. **La réunion « article 88 » dure 5 minutes avec 4 présents** et tranche l'avis sur ≈ 1 000 amendements : le second passage de la commission est presque une formalité de tableau.
10. Le rapport **compresse** (« six amendements identiques, dont un de la rapporteure ») et **se trompe** (CE734 cité deux fois) : c'est un texte d'auteur, pas une base de données.

---

## 4. Séquences, découpages, unités, fonctionnalités (proposition large, non triée)

### Séquences nouvelles
- **C1. La préparation silencieuse (auditions)** : désignation du rapporteur (1/7) → auditions (liste chronologique, tables rondes, astérisque HATVP) → audition du ministre et discussion générale → examen. Le calendrier vient de l'agenda, les noms des tiers du rapport. Dans le logiciel : un **avant-texte** où chaque tiers auditionné est une petite fiche papier, et où l'on voit ce qui, dans la rédaction de la commission, porte sa trace (◐ par similarité avec les exposés et les commentaires).
- **C2. Le tri de recevabilité** : 744 → 493 discutables (logement) ; le président annonce et motive le périmètre de l'article 45. Dans le logiciel : un **filtre initial** qui fait tomber les feuilles irrecevables hors de la pile, avec leur motif (« cavalier », « charge », « gage », « injonction », « habilitation »), et la phrase du président comme « frontière du texte ».
- **C3. L'épisode de commission** (unité la plus naturelle du débat) : titre → présentation(s) par les auteurs → avis du rapporteur → avis du ministre → répliques → décision. Dans le logiciel : un **mode « déroulé »** sur l'alinéa où les feuilles concurrentes apparaissent dans l'ordre d'appel, chacune avec son avis et sa durée.
- **C4. La série thématique** : « défavorable, comme il le sera sur ceux qui ont trait à la même thématique ». Le rapporteur regroupe lui-même. Proposer ces séries comme **thèmes prédéfinis par les acteurs**, ce qui répond en partie à la question ouverte « thèmes prédéfinis ou découpés par Claude ? ».
- **C5. La négociation de retrait** : demande de retrait → « je vous propose de retravailler d'ici la séance » → retrait → réapparition en séance. Une séquence **commission → séance** à suivre par auteur et par passage (◐ : rapprocher l'amendement CE retiré d'un amendement de séance du même auteur sur le même alinéa).
- **C6. Le verdict article 88** : la commission range les amendements de séance en « Accepté » et le reste. C'est une préfiguration du sort, à comparer au sort réel (112 sur 190).
- **C7. La commission saisie pour avis** : un autre organe examine, adopte une douzaine d'amendements, et les redépose au fond. C'est une petite navette interne.
- **C8. L'horloge de la réunion** : 13 h d'examen, 3 min par épisode en médiane, des pics à 30 min. Une **frise de la réunion** où la longueur de chaque épisode est proportionnelle au temps (★ `dateSort`) ou aux mots (★ rapport).

### Unités et découpages
- **Épisode** (≈ 150 à 220 par texte) entre l'amendement et l'article. C'est une bonne unité pour le « regroupement par proposition » : les amendements d'un même épisode sont déjà, aux yeux de la commission, « la même question ».
- **Prise de parole** (orateur, groupe ou rôle, mots, avis exprimé).
- **Encadré de commentaire** (texte / Sénat / commission) : une synthèse en trois strates de l'article.
- **Présence** (membre × réunion).
- **Tiers** (organisation, astérisque HATVP, audition ou citation dans un exposé).

### Fonctionnalités pour la maquette
- **Feuille « avis du rapporteur »** collée sous chaque amendement concurrent : défavorable / retrait / sagesse / favorable, avec la phrase exacte (★ rapport, ◐ attribution par amendement). Pas de score : une citation.
- **Volet « les autres », échelle « unité de sens »** : afficher, à côté de chaque rédaction distincte, l'extrait de débat où l'auteur la défend (≤ 400 caractères), et la réponse du rapporteur. La symétrie est tenue : *ma* rédaction aurait la même case (« ce que je dirai pour la défendre »), à rédiger.
- **Scène 5 « thème / synthèse »** : partir de l'encadré du commentaire comme **première strate** (« le texte fait ceci ; le Sénat a fait cela ; la commission ceci »), puis ajouter les positions des autres d'après les épisodes, puisque le commentaire n'en donne qu'une. Le commentaire sert de squelette factuel, pas de synthèse contradictoire.
- **Trois états de visibilité de mes amendements** : débattu / voté sans débat / silencieux (irrecevable, tombé, non soutenu), sur le papier : feuille pleine, feuille pâle avec une ligne de décision, feuille repliée avec motif.
- **Chute en bloc** : quand une réécriture d'article est adoptée, les feuilles qu'elle fait tomber glissent hors de la pile en même temps (même seconde dans `dateSort`).
- **Fiche « qui a écrit ça ? »** : pour une rédaction, le tiers revendiqué dans l'exposé, sa présence ou non parmi les auditionnés, l'astérisque HATVP.
- **Frise d'une réunion** (bande papier horizontale) : épisodes proportionnels au temps, couleur par article ; clic sur un épisode, le débat s'ouvre.
- **« Qui était là »** : pour une décision, la composition présente ce soir-là (présences de l'agenda), à côté de l'issue du vote. Nuance à garder : les votes de commission ne sont pas nominatifs.
- **Préparer la séance** (aujourd'hui : 8 nov. 2026, séance le 16 nov.) : pour chaque amendement de commission retiré « pour retravailler », un pense-bête « à redéposer en séance » ; pour chaque rejet, le dernier argument du rapporteur, à contrer.
- **Lecture du rapport comme carte** : les 160 000 mots du rapport se rangent selon l'article et la strate (commentaire / débat / avis d'une autre commission) ; « dézoom » de la pile = tous les commentaires empilés, « zoom » = l'épisode.

---

## 5. Questions ouvertes

- Peut-on attribuer l'avis du rapporteur **amendement par amendement** dans les épisodes multiples (elle cite souvent « l'amendement de M. X ») ? Il faudrait rapprocher les noms d'auteurs des numéros.
- Pourquoi 493 (président) ≠ 744 − irrecevables (open data) ? Retirés avant publication, doublons, rectifiés ?
- Les orateurs absents des présences : non-membres (droit de parole sans droit de vote) ou présences incomplètes ? Vérifier sur la liste « Membres présents ou excusés » du CR.
- La réunion article 88 du logement (16/11/2026) sera-t-elle publiée avant la séance ? La surveiller permettrait une démonstration « en direct ».
- Les comptes rendus de commission sont-ils retouchés par rapport à la parole (91 mots par minute, contre ≈ 130 à 150 à l'oral) ? (supposé : compte rendu rédigé et condensé, pas intégral.) Les vidéos (`captationVideo` dans l'agenda) permettraient de comparer.
- Faut-il traiter le commentaire d'article comme un « texte de la commission » à part entière (papier, vierge, comme le texte de la commission dans les règles visuelles), ou comme une voix parmi d'autres ?
- Les débats de commission répètent-ils ceux de la séance (mêmes auteurs, mêmes arguments) ? Croisement à faire avec `cr_narco_f.jsonl` (séance) : taux de réemploi des arguments, amendements CE retirés puis redéposés.
