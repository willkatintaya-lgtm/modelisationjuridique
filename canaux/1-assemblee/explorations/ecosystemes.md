# Exploration — autres écosystèmes et précédents

Exploration du 8 nov. 2026, environ 40 min. **VU** = observé et compté dans les données téléchargées. **SUPPOSÉ** = connu ou déduit sans vérification ici. Les groupes et partis cités sont réels dans les données brutes (Parlement européen, Westminster, Congrès) ; l'interface les rendra fictifs. Je ne prête aucune opinion à un groupe : seulement des comptes.

Données brutes : `scratchpad/raw-ecosystemes/{ppl19-285,lfp,ep,uk,us,de}`. Extraits (< 300 Ko, champs `groupe`/`auteur` bruts) : `scratchpad/extraits-bruts/ecosystemes-*.json`, produits par `scripts/ecosystemes_extraits.py`.

---

## 1. Ce qui a été exploré, et comment y accéder

### 1.1 La Fabrique de la Loi (Regards Citoyens + médialab Sciences Po)
- **API statique** : `https://www.lafabriquedelaloi.fr/api/` (index Apache, 1 818 entrées). `dossiers.csv` (séparateur `;`, 1 530 dossiers, 623 Ko). Par dossier `<id>/` :
  - `viz/procedure.json` : étapes (`stage` = lecture, `institution`, `step` = depot/commission/hemicycle, dates, `nb_amendements`, `source_url` du texte), `stats` (≈ 50 compteurs), `table_concordance` (numéro provisoire → numéro définitif), `textes_cites` (codes touchés), `themes`.
  - `viz/articles_etapes.json` : **matrice article × étape** ; pour chaque case, `status` (depot/new/none/sup), `diff` (add/rem/both/none), `n_diff` (1 − similarité), `length`, `newnum`. Le texte lui-même n'y est pas.
  - `viz/amendements_<étape>.json` : amendements rangés par **« sujet »** (= division visée : « Article 3 », « Après l'article 10 »), avec `groupe`, `sort`, `aut`, `id_api` (identifiant NosDéputés/NosSénateurs), plus la palette des groupes.
  - `viz/interventions.json` : par étape de séance, **division × groupe × orateur** → nombre d'interventions et de mots, lien vers l'intervention NosDéputés.
  - `procedure/<NN_lecture_lieu_moment>/texte/texte.json` : le texte de chaque étape, articles → `alineas` numérotés `"001"…`, `liens` (articles de code cités), `statut`, `section`.
- **Code** : `git clone --depth 1 https://github.com/regardscitoyens/the-law-factory-parser` (l'API GitHub est refusée dans cette session, mais `git clone` passe). Python, ≈ 5 000 lignes dans `tlfp/tools`. Alignement : **par identité d'article** (titre « 10 bis ») d'une étape à l'autre, `difflib.ndiff` pour le type de diff, `complete_articles.py` pour remplacer les « (Non modifié) » et les articles conformes par le texte de l'étape précédente, `make_git_repos.py` pour faire **un dépôt git par loi** (un commit par étape, un fichier par article).
- **Pièges** : le serveur coupe une connexion sur deux (`Recv failure`), il faut `curl --http1.1` et 3 à 8 essais. L'index ne se lit qu'en HTML.
- **Fraîcheur (VU)** : **c'est figé**. Le dossier le plus récent date du 11 janv. 2022 (fin de la XVe législature). 22 lois promulguées en 2021, 2 dossiers 2022, **aucun dossier des législatures XVI ou XVII**. Le dernier commit du parser date du 29 mars 2022, les derniers fichiers de l'API du 27 juil. 2024 (`stats/`, `logs/`). Le parser dépend du site NosDéputés et des anciennes pages AN (non testé ici ; SUPPOSÉ cassé).

### 1.2 NosDéputés / NosSénateurs
- `https://www.nosdeputes.fr/deputes/json` (814 Ko) et `/synthese/data/json` (1,2 Mo) répondent, mais **ce sont les 618 députés de la XVIe** (mandats de 2022 à 2024 ; dernier début de mandat le 9 mars 2024). Pas de XVIIe. La page d'accueil renvoie une erreur 500 (`symfony project`) ; les routes de séance et d'amendement de `2017-2022.nosdeputes.fr` renvoient `sfCacheException`. La synthèse donne des compteurs par député (amendements proposés/signés/adoptés, présence en commission, interventions longues/courtes).
- `https://www.nossenateurs.fr/*` : page fixe « Le site NosSénateurs.fr est désormais arrêté », archive 2004-mars 2023 sur `archive.nossenateurs.fr`.
- Conséquence : les `id_api` et liens d'intervention de la Fabrique pointent vers des services dégradés.

### 1.3 Parlement européen — `https://data.europarl.europa.eu/api/v2/` (sans clé, JSON-LD, ELI)
- `meetings?year=2025` → séances `MTG-PL-AAAA-MM-JJ`. `meetings/<id>/vote-results` → points de vote (`VOT-ITM-<n>`, liés au rapport `A-10-2025-0175`). `meetings/<id>/decisions?limit=500` → **la liste de vote, une ligne par décision** (VU : 42 décisions le 21 oct. 2025, 321 Ko).
- Champs d'une décision (VU) : `activity_order` (ordre dans la liste de vote), `referenceText` (position : « Article 1 – alinéa 1 – point 3 ; Décision 89/367/CEE Article 2 – paragraphe 2 – point a », « Après le visa 4 », « Considérant 2 »), `decisionAboutId` (numéro voté : `7`, `17S`, `7PC1`, `146PC3=` / `150S=`), `responsible_organization_label` (auteur : un groupe ou « commission »), `decision_method` (VOTE_HAND, VOTE_ELECTRONIC, VOTE_ELECTRONIC_ROLLCALL), `decision_outcome` (ADOPTED, REJECTED, **LAPSED**), compteurs pour/contre/abstention, **liste nominative** `had_voter_favor/against/abstention`, et **`had_voter_intended_*`** (corrections de vote : ce que le député dit avoir voulu voter).
- `plenary-documents/A-10-2025-0175` → `inverse_foresees_change_of` donne les liasses d'amendements de séance (`A-10-2025-0175-AM-019-022`), téléchargeables en DOCX/PDF par langue : `https://data.europarl.europa.eu/distribution/reds_iPlRp_Amd/<id>/<id>_fr.docx` (redirection 302 vers `redmapl3.europarl.europa.eu`).
- **Ce qui est bloqué** : `www.europarl.europa.eu/doceo/...` (procès-verbaux RCV/VOT en XML) répond 202 avec une page anti-robot ; je n'ai pas contourné. Dans l'échantillon de `committee-documents` (1 000 premiers), il n'y a **ni liste d'amendements de commission ni amendements de compromis**, seulement projets de rapport et d'avis, et des `AGREEMENT_PROVISIONAL` (41 : textes d'accord de trilogue).

### 1.4 Westminster — `https://bills-api.parliament.uk/api/v1/` (sans clé, JSON)
- `Bills?SearchTerm=…` ; `Bills/<id>/Stages` ; `Bills/<id>/Stages/<stageId>/Amendments?take=1000` ; `…/Amendments/<amendmentId>` (texte et exposé) ; `…/Stages/<stageId>/PingPongItems` (motions sur les amendements de l'autre chambre) ; `Bills/<id>/Publications` (178 publications pour le cas étudié).
- Votes : `https://commonsvotes-api.parliament.uk/data/divisions.json/search?queryParameters.searchTerm=…`, `https://lordsvotes-api.parliament.uk/data/Divisions/search?SearchTerm=…`. Débats : `https://hansard-api.parliament.uk/search/debates.json?…` puis `…/debates/debate/<ExtId>.json` (items `Contribution` / `Division` / `Timestamp`).
- **Bloqué** : `publications.parliament.uk` (PDF des groupements, des listes « marshalled », des comptes rendus de procédure) répond 403 ; les **groupements** n'existent qu'en PDF, l'API ne les donne pas.
- Cas étudié (VU) : **Renters' Rights Act 2025** (bill 3764), un texte logement qui fait écho au dossier logement de la maquette. 18 étapes, du 11 sept. 2024 au 27 oct. 2025.

### 1.5 Congrès des États-Unis
- `https://api.congress.gov/v3/…` : `DEMO_KEY` accepté une fois, puis 429. Il faut une clé api.data.gov (gratuite).
- **Sans clé** : `https://www.govinfo.gov/bulkdata/BILLSTATUS/119/hr/BILLSTATUS-119hr1.xml` (2 Mo : actions, amendements, votes nominaux, versions) et `https://www.govinfo.gov/bulkdata/BILLS/119/1/hr/BILLS-119hr1eas.xml` (texte de l'amendement du Sénat, DTD `amend.dtd`, `amend-type="engrossed-amendment"`, 1,8 Mo).
- Cas étudié (VU) : H.R. 1, 119e Congrès (loi de réconciliation budgétaire 2025).

### 1.6 Bundestag (DIP)
- `https://search.dip.bundestag.de/api/v1/{vorgang,drucksache,plenarprotokoll,…}` : **401 sans clé**. La clé publique est affichée sur une page d'aide rendue en JavaScript, que je n'ai pas pu lire. Rien de vu. SUPPOSÉ : les amendements (`Änderungsantrag`) sont des imprimés (`Drucksache`) en PDF, et la recommandation de la commission (`Beschlussempfehlung`) présente le texte sur deux colonnes, projet du Gouvernement et décisions de la commission.

### 1.7 Akoma Ntoso / LegalDocML
- Non refait ici : le Sénat français publie en AKN (voir `explorations/senat.md`, `scripts/senat_akn.py`). Les amendements DOCX du PE contiennent des **balises structurées encodées dans le texte** (`<Amend><NumAm><Members><AuNomDe>{Verts/ALE}…<Article>…<DocAmend2>…<Original>{EN}`), héritées de leur chaîne d'édition (VU).

---

## 2. Observations chiffrées

### 2.1 Fabrique de la Loi : la navette article par article (ppl19-285, violences conjugales, 2019-2020)
- 10 étapes : AN dépôt → commission (131 amendements) → séance (261) → Sénat dépôt → commission (19) → séance (85) → CMP → lecture des conclusions à l'AN puis au Sénat (0 amendement) → promulgation. 496 amendements, dont 74 adoptés (VU, `stats`).
- La matrice a 37 articles. Sur ses 199 cases : `none` 103, `add` 44, `both` 30, `rem` 22 (VU). 14 articles en entrée, 29 en sortie ; pourtant `ratio_articles_growth` vaut 1,07 (calcul non élucidé) ; `ratio_texte_modif` 0,76.
- **Trajectoires d'articles (VU)** : 11 articles créés au dépôt, 3 à la commission de l'AN, 7 en séance AN, 1 à la commission du Sénat, **11 en séance au Sénat**, dont **quatre (1er A à 1er D) supprimés en CMP** ; 3 articles d'origine supprimés dès la commission de l'AN. La CMP est l'endroit où les ajouts de la seconde chambre se perdent.
- `table_concordance` : « 10 bis » devient 18, « 11 A » devient 21, « 14 » est supprimé. La renumérotation finale est une donnée de premier rang.
- `interventions.json` : 1 452 interventions et 116 intervenants. Elles sont ventilées **par division du texte × groupe × orateur**, avec le nombre de mots. Exemple VU : « Après l'article 10 bis » → LR 7 interventions et 422 mots, LREM 3 et 373, Présidence 8 et 137, Gouvernement 1 et 61.
- Les amendements de séance AN (261) se ventilent en non-voté 176, rejeté 60, adopté 25 (VU). « Non-voté » regroupe tombés, retirés, non soutenus et irrecevables : **la Fabrique écrase la distinction**.

### 2.2 Parlement européen : la liste de vote (plénière du 21 oct. 2025)
Point `974710` (rapport A10-0175/2025, comité forestier), dans l'ordre de la liste (VU) :
1. « Amendements de la commission compétente, vote en bloc » : `1, 3-6, 9-16`, à main levée, adopté. **Un seul vote pour 12 amendements.**
2. Article 1, alinéa 1, point 3 : amendement 7 (commission), adopté ; puis amendement 20 (un groupe), **LAPSED**.
3. Même position : 8 (commission) adopté, puis 18 et 21 (deux groupes) LAPSED ; 22 (un groupe) rejeté par appel nominal, 236 pour, 395 contre.
4. Visa 4 bis : 19 rejeté (260/372/10, trois corrections de vote). Considérant 2 : `17S` (suppression, un autre groupe) rejeté (198/422), puis 2 (commission) adopté.
5. Proposition de la Commission, adoptée (327/256/58) ; demande de renvoi en commission (art. 60), adoptée (352/242/40).

Points `974709` et `974712` : **un vote fait tomber tout le reste**. Une « proposition de rejet » adoptée (370/264) ou un « accord provisoire » (le compromis de trilogue, voté comme amendement unique 146 : 446/162/35) rend LAPSED tous les amendements suivants, y compris des **morceaux d'amendement** : `146PC1`, `146PC2`, `146PC3=` voté avec `150S=` (le signe `=` = identiques votés ensemble ; `S` = suppression ; `PC` = partie d'amendement soumise séparément, lecture SUPPOSÉE). L'objet voté n'est pas forcément l'amendement entier.
- Sur 42 décisions : 24 votes par appel nominal, 14 à main levée, 1 électronique sans liste ; 5 décisions « accord provisoire » ; 19 décisions LAPSED, 15 adoptées, 5 rejetées (VU).
- **Corrections de vote** : sur les 13 appels nominaux qui ont des listes, 0 à 7 « intentions » chacun (VU).
- **Amendement PE (DOCX, VU)** : tableau deux colonnes « Texte proposé par la Commission | Amendement ». L'ajout est en **gras italique**, la position est donnée à deux niveaux (« Article premier – alinéa 1 – point 3 » de l'acte modificatif, puis « Article 2 – paragraphe 2 – point a » de l'acte modifié). Langue originale indiquée (`Or. en`). Cosignataires et « au nom du groupe X » dans un champ séparé.

### 2.3 Westminster : Renters' Rights Bill (2024-2025)
- **Étapes (VU)** : Commons 1R, 2R (avec « reasoned amendment » rejeté 104/424), programme motion, money resolution, Ways and Means resolution, Committee (4 séances), Report + 3R le même jour ; Lords 1R, 2R, Committee (7 séances), Report (3), 3R ; puis **ping-pong** : examen des amendements des Lords aux Communes (8 sept. 2025), examen des « reasons » aux Lords (14 oct.), examen du message des Lords aux Communes (22 oct.), Royal Assent (27 oct.).
- **Sorts des amendements (VU)** :

| Étape | Nb | Sorts |
|---|---|---|
| Commons Committee | 95 | Agreed 40 (tous d'auteur du parti du Gouvernement), NotCalled 26, Withdrawn 25, NotMoved 2, NotSelected 1 |
| Commons Report | 86 | `NoDecision` partout : trou de l'API |
| Lords Committee | 339 | **NotMoved 230 (68 %)**, Withdrawn 58, Agreed 42, StoodPart 5, NotStoodPart 1 |
| Lords Report | 132 | NotMoved 53, Agreed 45 (dont 17 d'auteurs hors parti du Gouvernement), Withdrawn 23, Disagreed 6 |

- Typologie native : `EditBillBody` / `AddClauseOrSchedule` / `DeleteClauseOrSchedule`. Position **par page et ligne de l'impression du bill** (« Clause 92, page 126, line 13, at beginning insert “persistently” »). Exposé court obligatoire (« Member's explanatory statement »).
- **Ping-pong (VU)** : 21 motions aux Communes sur les amendements des Lords (11, 14, 18, 19, 26, 39, 53, 55 à 62, 64, 67). Sept motions « disagree » passent par division (par ex. LA 53 : 401/96). Aux Lords, 18 motions : le Gouvernement propose « ne pas insister », des pairs d'autres bancs proposent d'insister (LA 11, 18, 53 : `Disagreed`), un amendement est retiré avant débat. Lords : 3 divisions le 14 oct. (169/212, 204/215, 192/239).
- **Le groupement se lit dans le débat (VU, Hansard Lords 1er juil. 2025)** : « the government amendments in this group », « I will also speak to my related Amendments 26 to 28 », « my Amendment 41 was the first in line in this group ». Puis la suite procédurale : « Amendment 24 withdrawn », « Amendments 26 to 29 not moved », « Amendments 37 to 39 agreed ». Divisions encodées `5|21:42|45|126|Division on Amendment 34|Amendment 34 disagreed.`
- **Traces de négociation hors séance (VU)** : la catégorie de publication **« Will write letters »** (3 lettres de la ministre à des pairs nommés, après le comité des Lords) ; dans un discours : « taking the time to meet my noble friend … to discuss the contents of the government amendments in this group ». Il existe aussi des « Minutes of Reasons Committee » (motifs du désaccord avec les Lords) et 96 « Written evidence » (contributions d'organisations, numérotées RRB71…).

### 2.4 Congrès : H.R. 1 (119e), l'arbre des amendements
- 493 amendements, dont 492 au Sénat (VU). **415 sont du second degré** (`amendedAmendment`) : 413 visent SA 2360, « in the nature of a substitute », qui remplace tout le texte ; 2 sont du troisième niveau (sous SA 2848 et SA 2602).
- 466 sont « submitted » sans plus ; 11 not agreed to, 9 « point of order » (règle Byrd, analogue d'une irrecevabilité), 4 agreed to, 2 withdrawn. 22 amendements ont un vote nominal : 12 d'auteur D, 9 R, 1 I (VU).
- Exemples VU : SA 2848 (« To improve the bill », amendement au substitut) adopté **51-50** ; SA 2847 rejeté 50-50 ; SA 2849 (Klobuchar, sur SA 2848) rejeté 45-55.
- Côté Chambre : un seul amendement, « in the nature of a substitute consisting of the text of Rules Committee Print 119-3 », adopté en vertu d'une résolution de règle (H. Res. 436). C'est **la réécriture globale négociée en amont** : la séance ne retouche plus.

---

## 3. Surprises et ce qui contredit l'acquis

1. **Le précédent français le plus proche est mort.** La Fabrique de la Loi s'arrête en janvier 2022, NosSénateurs est fermé, NosDéputés est bloqué sur la XVIe et à moitié en panne. Aucun écosystème « civique » ne couvre la XVIIe : il reste l'open data AN (déjà exploité), Tricoteuses et le Sénat. Leur **modèle de données** reste en revanche la meilleure référence (matrice article × étape, interventions par division, dépôt git par loi).
2. **La Fabrique aligne par numéro d'article, pas par passage.** `n_diff` mesure combien un article a bougé, sans dire *où*. Le grain alinéa existe dans `texte.json` (`"001"`), mais il n'est pas aligné entre étapes. Notre « unité de sens » est plus fine que tout ce qu'ils ont fait.
3. **Au PE, l'unité votée n'est pas l'amendement** : bloc d'amendements de la commission, parties d'amendement (`PC1`, `PC2`), identiques votés ensemble (`=`), puis tout tombe (`LAPSED`) dès qu'un compromis global passe. La « discussion commune » française (cf. B3 de `02-sequences`) a ici un **équivalent formalisé et publié en données** : l'ordre de la liste de vote **est** la cascade.
4. **Les intentions de vote sont publiées** (`had_voter_intended_*`) : une donnée qui dit « ce que j'aurais voulu », séparée du vote compté. Je ne l'ai pas vue à l'AN.
5. **Westminster : 68 % des amendements du comité des Lords ne sont jamais soumis au vote** (NotMoved). Ce sont des amendements « d'exploration » qui servent à obtenir un débat ou un engagement du ministre, souvent par **lettre** : la catégorie officielle « Will write letters ». La négociation y a une trace documentaire nommée.
6. **Le groupement britannique n'est pas dans l'API** (PDF bloqués). On le reconstruit par le texte du débat (« in this group », « also speak to »). La situation ressemble à la nôtre pour les discussions communes.
7. **Congrès : la réécriture globale est la norme**, et la séance se joue en amendements au substitut (arbre à deux ou trois niveaux). La « guillotine de la réécriture globale » (B4) n'est pas une anomalie française : c'est un type de séquence à part entière.
8. **Le PE et Westminster ont déjà notre symétrie « une rédaction | la commission »** : le DOCX PE est littéralement un tableau deux colonnes « Texte proposé par la Commission | Amendement », avec les ajouts en gras italique. C'est une convention établie, pas une invention de la maquette.
9. Trous dans des API officielles : `NoDecision` pour tout le rapport aux Communes ; congress.gov inutilisable sans clé (alors que govinfo donne la même matière sans clé).

---

## 4. Séquences, découpages, unités, fonctionnalités suggérés (large, non trié)

### Séquences nouvelles ou mieux nommées
- **S1. La liste de vote comme partition.** Ordre de mise aux voix d'un passage : bloc commission → amendement concurrent → tombés → suppression → rédaction. Découpage : par position dans le texte, puis par ordre de vote. Transposable à la discussion commune AN (ordre d'appel dans le CR). *Fonctionnalité* : sur une unité de sens, une **bande verticale** qui défile dans l'ordre de vote (haut/bas = avancer dans la liste), chaque feuille passant adoptée / rejetée / tombée ; « tombé » grise toutes les feuilles concurrentes d'un coup.
- **S2. Le compromis qui emporte tout** (accord provisoire PE, substitut US, réécriture globale AN, conclusions de CMP). *Fonctionnalité* : une feuille « compromis » posée au-dessus de la pile ; à l'adoption, les autres feuilles se replient en tranche (comptées, toujours consultables) ; une loupe montre ce que le compromis a repris de chacune.
- **S3. Le vote en morceaux** (vote par division : `PC1/PC2`, « split vote »). Unité = partie d'amendement. *Fonctionnalité* : dans la loupe, découper ma rédaction en parties votables séparément, et montrer qu'une partie passe et l'autre tombe.
- **S4. Les identiques votés ensemble** (`=`) : grappe de rédactions identiques de groupes différents. Rejoint le « regroupement par proposition » de la maquette : la feuille unique porte les pastilles des groupes.
- **S5. L'amendement d'exploration** (NotMoved / Withdrawn) : déposé pour obtenir une réponse. *Fonctionnalité* : une catégorie de sort « a obtenu un engagement » (réponse du ministre, lettre), distincte de rejeté ou retiré ; lien vers l'extrait de débat.
- **S6. Le ping-pong** : les motions sur les amendements de l'autre chambre (accepter / ne pas insister / insister / amendement en lieu et place). Unité = amendement de l'autre chambre × aller-retour. *Fonctionnalité* : pour un passage, une **frise horizontale des allers-retours** ; chaque passage de chambre est une feuille ; la CMP française en est un cas particulier, à une seule rencontre.
- **S7. L'arbre d'amendements** (second et troisième degrés). Le sous-amendement AN est le même objet. *Fonctionnalité* : dans la pile, une feuille porte ses sous-feuilles (sous-amendements) en languette ; zoomer y entre.
- **S8. La trajectoire d'article** (matrice article × étape de la Fabrique) : naissance, modifications, suppression, renumérotation. *Fonctionnalité* : le volet « les articles » gagne une dimension temps ; une rangée de pastilles par étape sous chaque article (vide / modifié / supprimé / né ici), l'intensité suivant `n_diff`, et un clic qui ouvre la version de l'étape face à la précédente, en corrections apparentes (règle de symétrie respectée).
- **S9. La parole par passage** (interventions par division × groupe × mots). *Fonctionnalité* : à côté d'une unité de sens, une jauge de **mots prononcés** par groupe (chiffre qui a un sens, cf. CLAUDE.md), avec un lien vers les extraits.
- **S10. La correction de vote** (intention ≠ vote compté). *Fonctionnalité* : afficher l'écart quand il existe ; signale les votes serrés où l'erreur a compté.
- **S11. Les contributions extérieures** (« Written evidence » numérotées, déposées avec le texte). Rejoint D3 (tiers) : une bibliothèque de contributions rattachées à des passages.
- **S12. Le texte modificatif à deux niveaux** (acte modificatif → acte modifié : « Article premier – point 3 » puis « Décision 89/367 Article 2 – point a »). Rejoint A6. *Fonctionnalité* : double adresse sur chaque feuille ; bascule entre « le texte de loi » et « le code tel qu'il deviendrait ».

### Unités et découpages repris
- Position imprimée (page/ligne, Westminster) ≠ position logique (article/alinéa) : prévoir les deux.
- Typologie d'amendement par effet : `EditBody` / `AddClause` / `DeleteClause` ≈ nos modes rédiger / compléter (article additionnel) / supprimer.
- Sorts fins : Agreed, Disagreed, Withdrawn, WithdrawnBeforeDebate, NotMoved, NotCalled, NotSelected, LAPSED, point of order. Plus fin que le « non-voté » de la Fabrique, à aligner sur les sorts AN (tombé, non soutenu, irrecevable, retiré).
- Le **groupement** (sujet de débat, plusieurs amendements sur plusieurs articles) ≠ la discussion commune (concurrence sur un même passage). Westminster distingue les deux ; ce serait la brique des « thèmes » du flux cible (scène 5).

### Fonctionnalités dérivées (vrac)
- Export « une loi = un dépôt git » (Fabrique) : chaque étape est un commit et l'historique se lit avec un outil de diff standard. Pour nous : un journal des versions de *ma* feuille.
- **Calque « liste de vote »** sur la pile des autres : ordre réel de mise aux voix plutôt qu'ordre de dépôt.
- Tableau de concordance des numéros (provisoire → définitif) affiché dans l'en-tête papier de l'article.
- « Ce que la CMP a laissé tomber » : filtre sur les ajouts d'une chambre supprimés à la conciliation (4 articles sur 11 dans le cas Fabrique).
- Pastille « sous-amendements » et « identiques » sur chaque feuille.

---

## 5. Questions ouvertes
- Peut-on reconstruire, pour l'AN, l'équivalent de la liste de vote PE (ordre + « tombé à cause de ») à partir du compte rendu et des sorts ? C'est la cascade de B3. Le PE prouve que c'est un objet publiable.
- Faut-il adopter l'alignement de la Fabrique (par numéro d'article et `n_diff`) comme repli quand l'alignement par unité de sens échoue ?
- Les « amendements de compromis » des commissions du PE (le cas d'école de la négociation thématique) ne sont pas dans l'open data vu ici. Faut-il les chercher dans les pages de commission (emeeting), au risque de nouveaux blocages anti-robot ?
- Bundestag : obtenir une clé DIP pour vérifier la Synopse de la `Beschlussempfehlung` (deux colonnes) et les `Änderungsanträge` des groupes en séance.
- La catégorie « a obtenu un engagement » (S5) a-t-elle une trace exploitable à l'AN (« je retire au bénéfice de l'engagement du ministre » dans le CR) ? Une piste à tester par regex sur `cr_narco_f.jsonl`.
- Le ping-pong britannique (motions par amendement) et la CMP (texte global) ont des grains très différents : la frise S6 tient-elle les deux ?
