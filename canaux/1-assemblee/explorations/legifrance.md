# Exploration « legifrance » : code consolidé et aval (Légifrance, Conseil constitutionnel, JO)

Front : obtenir sans clé le texte consolidé d'un article de code visé par nos dossiers (CGI art. 31, visé par l'article 4 du projet logement), appliquer mécaniquement les instructions de modification, relier la décision du Conseil constitutionnel narcotrafic et la loi publiée au texte de CMP, et mesurer l'utilité du champ `loiReference` des amendements AN.
Ce qui suit distingue VU (mesuré dans les données) et SUPPOSÉ.

## 1. Sources : comment y accéder

| Source | Accès | Résultat |
|---|---|---|
| Légifrance (site) `www.legifrance.gouv.fr/codes/article_lc/…`, `/jorf/id/…` | curl via le proxy | **403** (protection anti-robots). Inutilisable en direct. |
| API Légifrance (PISTE, `api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/getArticle`) | OAuth2 client_credentials | Non tentée : il faut un compte piste.gouv.fr, une application, l'abonnement à l'API Légifrance, puis `client_id`/`client_secret` (à demander via `request_credential` pour `oauth.piste.gouv.fr` + `api.piste.gouv.fr`). Pas nécessaire vu la piste suivante. |
| Dump LEGI DILA `https://echanges.dila.gouv.fr/OPENDATA/LEGI/` | HTTP libre | VU : un seul fichier global `Freemium_legi_global_20261108-140000.tar.gz` (**1,2 Go**, daté du jour) + un PDF de présentation ; pas d'incréments listés. Non téléchargé (inutile, voir ci-dessous). |
| **Tricoteuses, codes en git** `https://git.tricoteuses.fr/codes/<code>` (Forgejo, API `/api/v1/…`) | `git clone --depth 1` sans clé | **VU, c'est la bonne porte.** Un dépôt par code (code_general_des_impots, code_penal, code_de_procedure_penale, code_de_la_securite_interieure, code_de_la_construction_et_de_l_habitation et code_de_l_urbanisme existent aussi (API 200), etc.). Un fichier Markdown par article, arborescence = plan du code. Clone superficiel du CGI : **1,7 s, 25 Mo, 3 537 fichiers .md**. Mis à jour la veille (2026-11-07). |
| Historique d'un article | `git clone --filter=blob:none` (2,2 s) puis `git log -- <chemin>` | VU : **2 312 commits** pour le CGI, **un commit par texte modificateur**, daté de l'entrée en vigueur, message = titre de la loi + lien. Art. 31 : **56 commits** (63 avec `--follow`), de 1950 à la UT 2026. |
| **JORF en git** `https://git.tricoteuses.fr/dila/jorf` (6,4 Go, miroir du dump JORF XML DILA, un commit par livraison quotidienne, dernier `JORF_20261108-004332`) | lecture fichier par fichier via `raw/branch/main/global/…` | VU : `global/texte/struct/JORF/TEXT/00/00/53/50/81/JORFTEXT000053508155.xml` (structure), `global/section_ta/JORF/SCTA/…`, `global/article/JORF/ARTI/…/JORFARTI….xml` (texte, balise `BLOC_TEXTUEL`), et **un index ELI** `global/eli/loi/2025/6/13/2025-532` → lien symbolique `JUSX2430702L/jo/texte/versions.xml` → `JORFTEXT000051734851`. On trouve donc une loi par son numéro sans moteur de recherche. |
| Conseil constitutionnel `https://www.conseil-constitutionnel.fr/decision/2025/2025885DC.htm` | curl (`--http1.1` + relance : coupures « connection reset » fréquentes) | VU : 351 Ko HTML, décision complète (considérants numérotés, dispositif). |

Pièges :
- Tricoteuses avertit « il peut contenir des erreurs ». Contrôle fait : le j) du 1° du I de l'art. 31 (13 alinéas) est **identique en découpage** à l'article 47 de la UT 2026 publié au JO (13 alinéas, `JORFARTI000053508409`). Bon signe, un seul contrôle.
- L'en-tête YAML de l'art. 31 en vigueur dit `État: ABROGE_DIFF`, `Date de fin: 2027-01-01` : une version future (au 1er janvier 2027) existe dans LEGI, **absente de la branche `main`** (qui ne montre que le droit en vigueur à la date du commit). Pour « le code au moment où la loi entrera en vigueur », il faudrait le dump LEGI (versions à venir) ou PISTE.
- Commit étrange : la version du 2024-06-02 est attribuée à « LOI n° 2021-1900… de finances pour 2022 » (entrée en vigueur différée) ; deux commits « !!! Texte non trouvé ». L'auteur d'une version = le texte qui l'a produite, pas toujours le dernier voté.
- Le dépôt `dila/textes_juridiques` (cité dans les messages de commit) n'est pas public (404).
- Typographie : textes AN avec `’` et trait d'union insécable `‑` (U+2011), Tricoteuses avec `'` et `-` : normaliser avant toute recherche de chaîne.

Fichiers produits (hors dépôt) :
- `…/scratchpad/raw-legifrance/` : clones `cgi/` (superficiel) et `cgih/` (sans blobs), `cc.html`/`cc.txt`, `loi_2025_532.json` (64 articles de la loi publiée), `jorf/JORFARTI000053508409.xml`.
- Extraits pour l'interface (`…/scratchpad/extraits-bruts/`) :
  - `legifrance-cgi31-art4-applique.json` (63 Ko) : les 10 instructions de l'art. 4 (texte 3188), leur statut, et les subdivisions g, i, j, l, m de l'art. 31 **avant / après**.
  - `legifrance-cgi31-versions.json` (23 Ko) : les 63 versions de l'art. 31 (date de début/fin, texte auteur, taille, lettres présentes).
  - `legifrance-narco-cmp-cc-jo.json` (23 Ko) : 64 articles TA 0102 ↔ article CMP 1277 ↔ verdict CC ↔ article JO.
- Scripts : `scripts/legifrance_appliquer.py` (applicateur d'instructions), `scripts/legifrance_aval.py` (CMP → TA → CC → JO).

## 2. Observations chiffrées

### 2.1 Le code « tel qu'il deviendrait » : l'applicateur marche sur l'article 4
`python3 -I scripts/legifrance_appliquer.py <article_31.md> PRJLANR5L17BTC3188.json "Article 4" sortie.json [origine|successive]`

VU, texte de la commission (3188) : **10 instructions sur 10 appliquées** automatiquement ; texte transmis (3058) : **14 sur 14** (après ajout de deux formes). Formes rencontrées et mécanisées :

| Forme | Exemple (art. 4) | Mécanisable |
|---|---|---|
| insérer après un mot / une référence, dans une phrase d'un alinéa | « À la dernière phrase du troisième alinéa du g, après la référence : « j », sont insérés les mots : … » | oui (localisation alinéa + phrase, 1 occurrence) |
| remplacer des mots | « les mots : « de le louer » sont remplacés par les mots : … » | oui |
| supprimer des mots | « À la fin de la seconde phrase du neuvième alinéa, les mots : « … » sont supprimés » (3058) | oui |
| compléter une phrase | « La deuxième phrase du cinquième alinéa du m est complétée par les mots : … » | oui (découpage en phrases à soigner : « L. 111‑1 », « n° ») |
| remplacer un alinéa par N alinéas cités | « Le premier alinéa est remplacé par trois alinéas ainsi rédigés : » | oui (alinéas cités = lignes suivantes entre guillemets) |
| insérer N alinéas après le N-ième | « Après le onzième alinéa, sont insérés trois alinéas ainsi rédigés : » | oui |
| modifications en tirets sous « Le neuvième alinéa est ainsi modifié : » | « – à la première phrase, le mot … » | oui, avec héritage du contexte |
| hors article modifié : entrée en vigueur (II), gages (V, VI : « taxe additionnelle à l'accise sur les tabacs ») | — | non : ce ne sont pas des modifications du code, à afficher à part |

**Convention de numérotation des alinéas : tranchée par les données.** Deux hypothèses testées : (a) « origine » : chaque « N-ième alinéa » désigne l'alinéa du texte en vigueur avant toute modification ; (b) « successive » : chaque instruction voit le texte déjà modifié par les précédentes. Résultat VU : (a) 10/10 ; (b) **3 échecs** (b, c, d : la chaîne cherchée n'est pas dans l'alinéa désigné, car le a) a ajouté deux alinéas). L'article 4 est rédigé en numérotation d'origine.

**Surprise forte : les renvois internes des alinéas insérés sont décalés d'un cran.** Une fois tout appliqué (j passe de 13 à 18 alinéas), VU :
- c) remplace « troisième » par « sixième » dans « majoré du montant des travaux mentionné au … alinéa » : le 6e alinéa du nouveau j est celui du **taux** ; l'alinéa du foncier « majoré le cas échéant du montant des travaux » est le **5e** ;
- d) remplace « deuxième » par « cinquième » (« période de location mentionnée au … alinéa ») : l'engagement de location est le **4e** ;
- d bis) insère « la société mentionnée au **douzième** alinéa du présent j » : la clause « société non soumise à l'IS » est le **11e**.
Trois renvois, même décalage +1. SUPPOSÉ : la rédaction a été faite sur une version du j comptant un alinéa de plus (le PLF 2026 avant adoption, ou un premier alinéa coupé en deux), puis la UT 2026 publiée le 20 février 2026 a fixé un j à 13 alinéas. Sans le texte du PLF on ne peut trancher ; mais un outil qui applique et renumérote **détecte ce type d'incohérence tout seul**.

Autre fait VU : la rédaction a changé entre 3058 et 3188 pour une même cible (« après les mots : « du j » » → « après la référence : « j » » ; « dans sa rédaction antérieure à **l'article 110 de** la loi n° 2023‑1322 » → « …à la loi n° 2023‑1322 ») : retouches de pure légistique, invisibles en lisant mais visibles en appliquant (le résultat dans le code est le même ou presque).

Ce que l'article 4 modifie, une fois appliqué : un seul gros changement de fond (j, alinéa 1 remplacé par 3 : suppression du critère « bâtiment d'habitation collectif », seuil de travaux 30 % → 20 % avec gain de classe énergétique, extension aux locaux transformés en logement), le reste est de la coordination (« dans sa rédaction antérieure à… » ajouté dans g, l, m : 3 instructions sur 10 ne servent qu'à **figer un renvoi vers une version passée** du j).

### 2.2 L'article 31 dans le temps
VU : 63 versions, dont une vingtaine depuis 2007 attribuées surtout aux lois de finances. La version en vigueur (2026-02-21, UT 2026) fait 52 824 caractères contre 41 147 pour la précédente : +28 % d'un coup (rétablissement des i et j). Le j visé par le projet logement **n'existe que depuis 8,5 mois** ; le j antérieur (supprimé en 2024) reste invoqué par trois renvois « dans sa rédaction antérieure ». La lettre « j » désigne donc deux dispositifs successifs différents : un identifiant de subdivision n'est pas stable dans le temps.

### 2.3 Conseil constitutionnel 2025-885 DC (12 juin 2025) et loi n° 2025-532 du 13 juin 2025
VU, dispositif :
- **Censures totales** : articles 5 (accès direct des services de renseignement à des informations financières et fiscales, art. L. 135 ZR LPF), 15 (extension des algorithmes de renseignement, L. 851‑3 CSI), 19 (circonstance aggravante de port d'arme, art. 222‑43‑2 C. pén.).
- **Censures partielles** : art. 40 (les trois derniers alinéas du 3°), art. 55 (le 2° du I et deux membres de phrase), art. 56 (10° et 11° du I).
- **Réserves** : 9 articles (4, 28, 38, 39, 40, 46, 60, 61, 62 ; le script en classe 8 « réserve » car le 40 est aussi partiellement censuré), chaque réserve ancrée sur un **considérant numéroté** (« au paragraphe 46… », 253, 319, 330, 351 et 353, 387, 512 et 520, 553 et 554, 585) et sur des **mots précis** d'une disposition du code « dans sa rédaction issue de l'article N de la loi déférée ».
- **Cavaliers (art. 45 C)** : griefs soulevés contre les art. 29, 61 et 62, **tous rejetés** ; le Conseil rattache chaque disposition à un article précis de la proposition initiale (ex. art. 29 ↔ art. 3 initial, art. 61 ↔ art. 23 initial). C'est un appariement « disposition ajoutée → article d'origine » fait par le juge lui-même.
- 32 rubriques « Sur l'article N » ; le décompte de mon script : 6 articles censurés, 8 avec réserve, 24 examinés conformes, 26 non examinés (sur 64).

VU, loi publiée (JORFTEXT000051734851, 64 articles) : les articles totalement censurés subsistent comme **coquilles numérotées** : « [Dispositions déclarées non conformes à la Constitution par la décision du Conseil constitutionnel n° 2025-885 DC du 12 juin 2025.] » (art. 5, 15, 19 : 1 alinéa chacun). Les censures partielles apparaissent comme crochets à l'intérieur de l'article (40, 55, 56 contiennent la mention). La numérotation n'est pas resserrée.

VU, chaîne des numérotations : le texte de CMP (1277) a **65 articles dont 39 en bis/ter/A/B** ; le texte adopté définitif TA 0102 a **64 articles numérotés 1 à 64** (renumérotation à l'adoption définitive), et c'est cette numérotation que le Conseil et le JO utilisent. Exemples d'appariement par similarité : TA 5 ← CMP 3 bis A ; TA 15 ← CMP 8 ; TA 19 ← CMP 9 bis ; TA 40 ← CMP 16 ; TA 55 ← CMP 22 bis ; TA 56 ← CMP 23. Similarité TA ↔ JO ≥ 0,95 pour presque tous les articles non censurés (le JO ne fait que la mise en forme). Limites : 6 articles CMP restent sans correspondant et une dizaine d'appariements sont faibles (articles courts, art. 64 de 294 alinéas) : à reprendre avec un appariement par alinéa.

### 2.4 `loiReference` (codeLoi / divisionCodeLoi) des amendements
VU sur nos 2 466 amendements : champ présent 1 222 fois, mais **utile (code + article) 356 fois (14 %)** ; le reste est du bruit : `codeLoi` = « 1 », « 0 », « 0.1 », « Z3 », « zzzz », « dc », divisions `xsi:nil`.
Règle découverte : **le champ n'est rempli que pour les articles additionnels**. Croisement `articleAdditionnel` × champ exploitable : additionnel 379 oui / 165 non ; non additionnel 96 oui / 1 824 non. Sur un échantillon 1/5 de l'archive L17 complète (29 050 amendements, 3 s de lecture du zip) : additionnels **60 %** exploitables (4 741 / 7 908), non additionnels **1,3 %** (267 / 21 141).
Conséquence VU sur l'article 4 logement : 143 amendements, **aucun** ne porte CGI 31 ; les 21 qui ont un `loiReference` sont des « après l'article 4 » qui visent d'autres articles (CGI 32, 150 U, 158, 199 tricies, 279‑0 bis, 793, CMF L. 631‑2‑1…). Aucun dispositif d'amendement à l'article 4 ne cite « article 31 » ; 75 sur 143 désignent leur cible par « alinéa N » du projet de loi.
Donc pour retrouver l'article de code touché par un amendement *sur* un article : **amendement → alinéa N du texte → instruction de l'alinéa → (subdivision du) code**, ce que l'applicateur sait faire. Le `loiReference` sert, lui, pour les articles additionnels (« de quel article de code parle cette proposition nouvelle ? »), une fois normalisés les libellés (« c sécurité intérieure » / « c sécurité intérieur », « c construction » / « c construction habitation », « CGI ») vers les noms de dépôts Tricoteuses (`code_general_des_impots`, …). Codes les plus cités dans l'archive (échantillon) : CGI 1 724, CSS 712, environnement 380, rural 312, santé publique 292.
Concordance : la division indiquée n'apparaît en clair dans le dispositif ou l'exposé que 80 fois sur 356 (le dispositif cite souvent « Le X de l'article … est ainsi modifié » sous une autre graphie, ou les dispositifs CE sont vides dans `am.jsonl`, à vérifier).

## 3. Surprises / ce qui contredit l'acquis
1. **Le code consolidé s'obtient sans clé, en git, en 2 secondes**, avec son histoire version par version (Tricoteuses). Ni PISTE ni le dump de 1,2 Go ne sont nécessaires pour le prototype. Le JORF est lui aussi en git, avec un index ELI.
2. Les instructions de l'article 4 sont **entièrement mécanisables** (10/10), alors qu'on les croyait du « langage naturel juridique ».
3. La numérotation d'origine est la bonne convention, et l'application automatique **révèle des renvois décalés** dans le texte de la commission (3 renvois off-by-one).
4. Le texte visé a **changé sous le projet de loi** : le j a été rétabli par la UT 2026 pendant la vie du projet ; une partie des instructions ne sert qu'à « figer » des renvois vers des versions passées.
5. `loiReference` ne dit rien des amendements à un article existant ; il ne sert qu'aux articles additionnels.
6. Le Conseil et le JO ne parlent pas la numérotation de la CMP : la renumérotation finale (bis → entiers) est une étape à part entière, et le JO garde des **coquilles numérotées** pour les articles censurés.

## 4. Séquences, unités et fonctionnalités suggérées (large, non trié)
Séquences
- **« Le code tel qu'il deviendrait »** : pour chaque article du projet, montrer l'article de code en vigueur sur papier et, en corrections apparentes (ajout bleu souligné, suppression barrée), le code après application ; même règle de symétrie : version de la commission, version d'un amendement, ma version appliquées au même code.
- **Amendement → code** : appliquer un amendement d'alinéa (« À l'alinéa 8, remplacer 20 % par 30 % ») au texte du projet, puis le projet au code : chaîne de deux corrections, visible en deux crans d'échelle (alinéa du projet ⇄ alinéa du code).
- **Le code bouge sous le texte** : séquence « dérive de la cible » : la version du code visée au dépôt, celle en vigueur à l'examen, celle à l'entrée en vigueur (ABROGE_DIFF 2027-01-01) ; signaler les instructions qui ne s'appliquent plus.
- **Vérification des renvois** : après application, recalculer les « N-ième alinéa du présent j » et signaler les décalages (cas réel trouvé). Utile au rédacteur d'amendement : « ton amendement casse/corrige tel renvoi ».
- **Aval** : CMP → renumérotation → saisine → décision (considérants, censures totales/partielles, réserves, cavaliers rejetés) → JO (coquilles) → code consolidé (nouveau commit Tricoteuses). Une séquence « ce qui reste de mon article ».
- **Cavaliers** : le juge rattache chaque disposition ajoutée à un article du texte initial : réutilisable pour une vue « parenté des dispositions » (à rapprocher de la survie des amendements, acquis du canal).
- **Histoire d'une subdivision** : frise des 63 versions de l'art. 31, avec la loi auteur de chaque version ; « j » réutilisé pour deux dispositifs différents.
Unités
- *Instruction de modification* (cible : code/article/subdivision/alinéa/phrase/occurrence ; opération : insérer, remplacer, supprimer, compléter, remplacer alinéa, insérer alinéas ; contenu) : unité intermédiaire entre l'alinéa du projet et l'alinéa du code.
- *Subdivision de code* (« j) du 1° du I de l'art. 31 CGI ») avec version datée.
- *Renvoi interne* (« au cinquième alinéa du présent j ») comme objet vérifiable.
- *Réserve d'interprétation* ancrée sur des mots précis d'une disposition et un considérant.
Fonctionnalités
- Bouton « appliquer au code » sur toute rédaction (la mienne, celle d'un groupe), avec statut par instruction (appliquée, ambiguë, échec : chaîne absente).
- Index des codes touchés par un dossier (depuis `loiReference` pour les additionnels, depuis les instructions pour le reste).
- Alerte « version de référence » quand le code a changé depuis le dépôt du texte.
- Lien direct vers Tricoteuses/Légifrance par identifiant LEGIARTI (dans l'en-tête YAML Tricoteuses).

## 5. Questions ouvertes
- Le décalage des renvois vient-il du PLF 2026 (version non adoptée du j) ? Récupérer le texte du PLF 2026 (art. correspondant) ou le tableau comparatif d'un rapport du Sénat (colonne « texte en vigueur ») pour trancher.
- Version future de l'art. 31 au 2027-01-01 : que change-t-elle au j ? (dump LEGI ou PISTE nécessaires.)
- Généraliser l'applicateur aux autres articles du projet logement (CCH, code de l'urbanisme : dépôts Tricoteuses présents) et aux amendements eux-mêmes (« À l'alinéa N… »).
- Un article peut cumuler censure partielle et réserve (art. 40) : le verdict par article doit être multiple, pas une étiquette unique.
- Apparier CMP ↔ TA alinéa par alinéa (6 articles CMP orphelins dans l'appariement actuel).
- Les messages de commit Tricoteuses pointent vers un dépôt `dila/textes_juridiques` non public : demander l'accès ?
