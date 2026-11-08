# Exploration — le dossier logement « en direct » (J-8 de la séance)

Front : ce qui est accessible **aujourd'hui, dimanche 8 novembre 2026, vers 17 h (heure de Paris)** sur le projet de loi logement (DLR5L17N54608), dont la séance est prévue du 16 au 20 novembre sur le texte de commission n° 3188. Comment un « mode en direct » pourrait s'alimenter, avec quelle latence. Les heures sont en UTC sauf mention contraire.

Légende : **VU** = constaté dans les données ou par requête ; **SUPPOSÉ** = déduit, non vérifié.

Scripts (dans `scripts/`) :
- `logement-direct_agenda.py` : historique de l'ordre du jour (points confirmés / supprimés, dates de création et de clôture) ;
- `logement-direct_sonde_zip.py` : sonde de l'archive des amendements **sans la télécharger** (lecture du répertoire central du zip par requêtes Range, 3 s pour 145 249 entrées, CRC32 compris) ;
- `logement-direct_redepots.py` : appariement « amendement de séance ↔ amendement de commission du même auteur » ;
- `logement-direct_instantane.py` : construit l'extrait.

Extrait : `scratchpad/extraits-bruts/logement-direct-instantane.json` (263 Ko) : séances prévues et historique des points, base commission (article × groupe × sort), réservoir de 414 redépôts probables, répétition générale sur le texte cybersécurité (dérouleur eliasse), 50 exemples de redépôts du narcotrafic. Les champs `groupe` et `auteur` sont bruts.

---

## 1. Sources sondées, accès, pièges

| Source | URL | Ce qu'elle donne aujourd'hui pour le logement |
|---|---|---|
| Archive open data des amendements | `https://data.assemblee-nationale.fr/static/openData/repository/17/loi/amendements_div_legis/Amendements.json.zip` | 145 249 entrées, **0 sur `PRJLANR5L17BTC3188`** (VU sur les versions de 09:20 et de 15:20) |
| Recherche du site | `https://www.assemblee-nationale.fr/dyn/17/amendements?dossier_legislatif=DLR5L17N54608` (filtres : `examen=EXANR5L17PO838901BTC3188`, `order=`, `page=`, `limit=`) | 788 résultats, tous de commission ; 0 avec le filtre séance (VU). L'open data en a 790 (2 « effacés » ne s'affichent pas sur le site). |
| Fiche d'un amendement | `https://www.assemblee-nationale.fr/dyn/17/amendements/<n° texte>/<organe>/<numéro>` (ex. `.../3058/CION-ECO/CE1`, `.../1043/AN/1`) | `.../3188/AN/1` à `/200` : 404 (VU) |
| `dyn/opendata/<uid>` | `https://www.assemblee-nationale.fr/dyn/opendata/<uid>.html` | marche pour les **textes** ; **404 pour les amendements** (VU, `.html` comme `.json`) |
| Liasse | `https://www.assemblee-nationale.fr/dyn/api/amendements/bundle/paths/17?dossier_legislatif=DLR5L17N54608&typeLiasse=pdf` (ou `rtf`) | JSON avec les chemins de 2 PDF générés **à la demande**, datés du jour (`/dyn/17/amendements/liasse/2026-11-08/<hash>-1.pdf`) |
| Fiche du dossier | `https://www.assemblee-nationale.fr/dyn/17/dossiers/DLR5L17N54608` | étape « Discussion en séance publique, lundi 16 novembre », **pas encore de lien « amendements déposés sur le texte 3188 »** ; dates de mise en ligne : texte de commission le 2 oct. 13 h 30, rapport le 9 oct. 19 h (VU) |
| **eLiasse** (dérouleur en direct) | appli : `https://eliasse.assemblee-nationale.fr/eliasse/index.html` ; **API JSON sans clé : `https://eliasse.assemblee-nationale.fr/api-eliasse/`** | examen de séance logement **pas encore ouvert** (`404`) ; 12 examens ouverts, dont la séance cybersécurité du 9 nov. (VU) |
| Feuille verte (ordre du jour à 3 semaines) | `https://www.assemblee-nationale.fr/agendas/conference.pdf` (redirige vers `/dyn/static/seance/conference.pdf`) | PDF « RECTIFIÉE », conférence des présidents du mardi 3 nov. et lettre du Gouvernement du 4 nov., créé le 4 nov. à 22:28 (VU) |
| Agenda open data | `.../17/vp/reunions/Agenda.json.zip` | 9 séances logement, la réunion de commission « article 88 », l'historique des points (VU) |
| Dossiers open data | `.../17/loi/dossiers_legislatifs/Dossiers_Legislatifs.json.zip` | 9 actes `AN1-DEBATS-SEANCE` déjà créés, avec `reunionRef` (VU) |

### Fraîcheur de l'open data (VU)
- **L'archive des amendements est régénérée toutes les deux heures, à hh:20 UTC.** On voit les `Last-Modified` 09:20:30, 13:20:28 et 15:20:27 le même dimanche. Dossiers : 11:16 ; scrutins : 11:26 ; agenda : 11:40 ; comptes rendus (Syceron) : 03:05.
- **Piège CDN** : `cache-control: max-age=14400` (4 h). Le même nœud (`x-cdn-pop: bhs`) sert **plusieurs versions à la fois** : sur 8 HEAD successifs, j'obtiens 09:20, 13:20 ou 15:20, avec des tailles différentes (355 367 369 et 355 366 584 octets). Deux requêtes Range peuvent tomber sur deux versions différentes : la sonde le détecte (taille de `Content-Range` et signature `PK\x01\x02`) et retente. Ajouter une query string (`?x=…`) ne contourne pas le cache.
- **Les dates des fichiers dans le zip ne servent à rien** : les 145 249 entrées sont toutes datées du jour (archive reconstruite en bloc). Ce qui marche, c'est le **CRC32 du répertoire central** : entre 09:20 et 15:20, **une seule entrée a changé** (un amendement d'une proposition de loi de la niche du 19 nov.). Un dimanche est calme ; la sonde donne quand même un **diff complet de l'AN en 3 s et ~17 Mo** au lieu de 355 Mo.
- Le zip contient aussi les amendements **« En traitement »**, avec leur dispositif et le cartouche « Sous réserve de son traitement par les services de l'Assemblée nationale et de sa recevabilité », parfois sans `datePublication` (VU sur le texte 1779 : 35 « En traitement », dont 7 sans date de publication, dont un déposé le 6 nov. et présent dès le 8 à 09:20). Conséquence : **0 entrée sur BTC3188 veut probablement dire 0 dépôt enregistré**, pas seulement 0 publié (SUPPOSÉ, fort).

### eLiasse : l'API du « jaune » (VU)
L'application web (Angular, PWA) dialogue avec `api-eliasse/` et un **WebSocket STOMP** `wss://eliasse.assemblee-nationale.fr/ws-eliasse`. J'ai trouvé les points d'accès dans `main-UDL7RYVZ.js` :
- `GET organes` : liste des organes (séance et commissions) ;
- `GET examens` : examens ouverts (`uid` = `EXANR5L17PO838901BTC1779P0D1`, statut « En cours » / « Terminé », et, pour les lois de finances, **`missions[].delaiDepot` horodaté**) ;
- `GET prochainadiscuter` : **pour chaque organe, l'uid du prochain amendement à discuter**, c'est-à-dire la tête de lecture de l'AN entière ;
- `GET examens/<uid>/derouleur` : `places` (une par article ou par position « avant / après l'article X »), chacune avec ses amendements **dans l'ordre de discussion** (`ordre`, `positionDiscussionIdentique`, `positionDiscussionCommune`, `sort`, `estVisible`, `auteur`) et une `version` ;
- `GET examens/<uid>/statistiques` : total, examinés, restants ;
- `GET textes/<texte>/examens/<examen>/amendements/<uid>/with_neighbors` : l'amendement et ses 4 voisins, **avec dispositif, exposé, cosignataires, photo de l'auteur et `contenuHtmlDuTexteDeReference`** (le texte de l'article visé, embarqué) ;
- topics WebSocket : `/topic/get-derouleur-update/<examen>` (patchs incrémentaux, `appliquerPatchIncremental`), `/topic/get-statistiques-update/<examen>`, `/topic/get-all-prochains-a-discuter`. Je n'ai pas testé l'abonnement au WebSocket.
- Divers : `version` (« eliasse-api_v1.0.0.1392_release_candidate »), `ping`, `maintenance`.

---

## 2. Observations chiffrées

### 2.1 Où en est le dossier (VU)
- Aucun amendement de séance nulle part : ni dans l'open data (15:20), ni dans la recherche du site, ni sur les fiches, ni dans eLiasse, ni sur la fiche du dossier. Tricoteuses non plus (déjà constaté par l'exploration `tricoteuses.md`).
- **Le calendrier est fixé depuis peu et a été réécrit.** L'agenda garde l'historique des points (`cycleDeVie.etat` = Confirmé / Supprimé, `chrono.creation` / `cloture`) :
  - créneaux 17-20 nov. : points logement **créés le 26 oct.** ;
  - lundi 16 nov. (16 h et 21 h 30) : points logement **créés le 4 nov.** Ils remplacent « suite de la seconde partie du projet de loi de finances pour 2027 » (créé le 28 sept., supprimé le 19 oct., recréé le 20 oct., supprimé le 4 nov.) ;
  - la semaine du 9 nov. a subi la même réécriture le 4 nov. : PLF supprimé, cybersécurité (texte 1779) inscrite ; les séances des samedis 14 et lundi 16 au matin sont « Supprimé ».
  - Le 16 à 16 h, le logement passe **après** une proposition de loi sur l'épargne salariale : il commence donc à une heure inconnue.
  - Mercredi 18 à 21 h 30, il partage la soirée avec une deuxième lecture. **Jeudi 19 : pas de logement**, la journée est réservée à un groupe, avec 9 propositions de loi. Le dossier reprend vendredi 20 (3 séances).
- **Réunion « article 88 »** : commission des affaires économiques, **lundi 16 nov. à 16 h 30**, salle 6241, état « Eventuel », créée le 5 nov. : « examen, en application de l'article 88 du Règlement, des amendements restant en discussion ». La commission donne son avis sur les amendements de séance **pendant** que la séance s'ouvre sur un autre texte. Dans l'arbre du dossier, c'est l'acte `AN1-COM-FOND-REUNION` du 16 nov., sans `reunionRef`.
- **Les comptes rendus ont un identifiant avant d'exister** : la séance du lundi 9 nov. à 16 h porte déjà `compteRenduRef = CRSANR5L17S2027O1N057`.
- La feuille verte (PDF) donne la même chose sous forme lisible, plus les notes « ordre du jour proposé par le groupe … ». **Ni le délai de dépôt, ni un temps législatif programmé n'y figurent** ; aucune source sondée ne les donne pour ce texte (VU : absence). La conférence des présidents n'est pas dans l'agenda open data (aucune réunion de l'organe PO846702).
- **Délai de dépôt (SUPPOSÉ)** : par défaut (art. 99 du Règlement), 17 h le troisième jour ouvrable avant la discussion. Pour lundi 16 nov., en comptant le samedi et sans le 11 novembre : **jeudi 12 nov., 17 h**. Les données de commission vont dans ce sens : pour l'examen des articles du lundi 21 sept., pic de 458 dépôts le **jeudi 17 sept.**
- **Généalogie inattendue (VU)** : le projet de loi a d'abord été déposé **à l'Assemblée** le 24 juin 2026 (n° 2981, dossier DLR5L17N54566 : étude d'impact, avis du Conseil d'État, procédure accélérée, rapporteur nommé), **retiré le 25 juin** et déposé le même jour au Sénat (n° 801). Le dossier AN est marqué « Dossier absorbé » (`fusionDossier.dossierAbsorbantRef` = DLR5L17N54608). La recherche d'amendements garde les deux entrées « La relance et la décentralisation du logement (Textes : 2981) » et « (Textes : 3058, 3188) ».

### 2.2 Latence dépôt → publication, et ce qu'elle implique (VU, `am.jsonl`)
| Examen | dépôt → publication (jours, distribution) | publiés le jour où l'examen commence ou après |
|---|---|---|
| Logement, commission (texte 3058) | 0 : 45 ; 1 : 125 ; 2 : 65 ; **3 : 261** ; 4 : 115 ; 5 : 61 ; 6 : 113 | **786 / 786 datés** (examen à partir du 16 sept. ; 388 publiés d'un coup le dimanche 20 sept.) |
| Narcotrafic, séance (texte 1043) | médiane ≈ 3-4 j ; jusqu'à 13 j | **839 / 996** (436 publiés le jour de l'ouverture, lundi 17 mars) |
| Narcotrafic, commission (907) | médiane ≈ 4 j | 616 / 665 |

**Le direct public est en retard sur le direct réel.** Pour un observateur extérieur, le gros des amendements apparaît le jour même où l'examen commence, voire après. Avant, on ne voit qu'un filet. Les dépôts sont massés la veille du délai : 623 des 1 002 amendements de séance du narcotrafic le vendredi 14 mars. Les premiers arrivent environ six jours avant la séance (narcotrafic, J-6 : 63 dépôts). À J-8, le zéro du logement est donc normal (SUPPOSÉ).

### 2.3 Répétition générale : la séance cybersécurité du 9 novembre (VU)
Même configuration que le logement, une semaine plus tôt : un projet de loi adopté par le Sénat, en séance AN, inscrit le 4 nov.
- Open data : 398 amendements de séance, dont 325 « A discuter », 35 « En traitement », 28 « Retiré », 10 « Irrecevable 40 ».
- eLiasse : `statistiques` = **360 total, 0 examiné, 360 restants**. Le dérouleur montre **325** amendements visibles, soit exactement les « A discuter » ; 360 − 325 = 35, soit exactement les « En traitement ». eLiasse et l'open data **concordent**.
- Le dérouleur a 59 places (« Article PREMIER » : 38 amendements ; « Article 14 » : 46). 97 amendements sont en discussion identique et 85 en discussion commune. **Tout est déjà rangé à la veille de la séance**, sorts à « Aucun ».
- Temporalité : dépôts massés les 1-3 oct. (dont 220 le samedi 3 oct.), **plus d'un mois avant** une séance qui n'a été (re)fixée que le 4 nov. ; publications étalées jusqu'au 6 nov. (112 ce jour-là). Un délai peut donc survivre à un report (SUPPOSÉ : séance initialement prévue début octobre, puis repoussée).

### 2.4 Commission → séance : redépôts et reformulations (VU sur le narcotrafic, projeté sur le logement)
Le logement n'a pas encore d'amendements de séance. J'ai donc mesuré le phénomène sur le narcotrafic (commission sur le texte 907, séance sur le texte 1043), avec `logement-direct_redepots.py` : même premier signataire ; numéros d'alinéas neutralisés ; même article exigé pour les dispositifs courts, sinon « Supprimer cet article » s'apparie n'importe où.
- Sur 776 amendements de séance de députés avec dispositif publié : **157 identiques** à un amendement de commission du même auteur (ratio ≥ 0,92), 47 « reformulés » (0,60-0,92), 572 « nouveaux ».
- **D'où viennent les identiques** : 114 avaient été **rejetés** en commission, 21 non soutenus, 13 tombés, 9 retirés. Côté commission, **36 % du « réservoir »** (405 amendements de députés rejetés, non soutenus, retirés ou tombés) reviennent tels quels en séance.
- **Ils arrivent tôt** : 15 % des identiques sont déposés dès le premier jour (23 / 157), contre 6 % des nouveaux (35 / 572). Les redépôts sont prêts d'avance ; les nouveautés attendent la veille du délai.
- **Ils réussissent peu** : 8 / 157 identiques adoptés en séance (5 %), contre 148 / 572 nouveaux (26 %). Les nouveaux comprennent ceux des députés du bloc central ; je n'ai pas séparé le rapporteur.
- **Le taux de redépôt varie beaucoup d'un groupe à l'autre** : de 4-7 % à 53 % d'identiques ou reformulés selon le groupe. Les groupes qui déposent peu en commission ont un taux faible (détail par groupe dans l'extrait, groupes bruts).
- Les « reformulés » mélangent de vrais replis et des faux positifs, ceux-ci sous ≈ 0,75. Exemples vrais : « substituer à l'année 2028 l'année 2026 » (commission, retiré) devient « … le mot 2027 » (séance) : **le repli se fait d'une session à l'autre** ; « le préfet peut enjoindre » → « le préfet doit automatiquement enjoindre » (commission) devient « peut » → « doit automatiquement » (séance) : resserrement de la rédaction.
- **Projection logement (SUPPOSÉ)** : réservoir de **414** amendements de commission de députés (214 rejetés, 172 tombés, 47 retirés, 31 non soutenus, répartis surtout sur les articles 6 : 94, 4 : 59, 2 : 51, 1er : 50, 6 bis : 37). Au taux du narcotrafic, environ **150 redépôts identiques**. Volume total de séance : au ratio séance / commission du narcotrafic (1 002 / 665), de l'ordre de **1 100** amendements. Les 167 irrecevables art. 45 de commission ne devraient pas revenir tels quels.

---

## 3. Surprises / ce qui corrige l'acquis
1. **« L'open data est régénéré chaque jour » (acquis) est faux par défaut** : c'est **toutes les 2 heures** pour les amendements. Mais le CDN sert en même temps des versions de plusieurs âges (jusqu'à 6 h d'écart dans la même minute).
2. **Il existe une API publique du dérouleur, en temps réel (eLiasse, JSON + WebSocket)**. Les notes précédentes disaient « la liasse et le dérouleur ne sont pas dans les données ». Ils sont accessibles, mais seulement pendant la vie de l'examen : 12 examens ouverts aujourd'hui, les anciens disparaissent sans doute (SUPPOSÉ).
3. **Le direct est surtout un direct de veille** : la publication arrive trop tard pour « voir arriver » les amendements avant l'examen. Ce qui bouge vraiment avant la séance, c'est **l'ordre du jour** (réécrit le 4 nov.) et le **classement** (dérouleur, discussions communes).
4. **L'ordre du jour est un palimpseste daté** : chaque créneau garde ses points supprimés, avec leur date. On peut reconstituer « ce qui était prévu à telle date » sans moissonner.
5. **Le zip permet un diff exact, pour presque rien** : CRC32 du répertoire central.
6. **Le projet de loi a changé d'assemblée de départ en 24 h** (déposé à l'AN, retiré, redéposé au Sénat).
7. **La commission siège sur les amendements de séance pendant que la séance a commencé** (art. 88, lundi 16 h 30) : l'avis de la commission naît en direct, il n'existe pas avant.
8. Le site affiche 788 amendements, l'open data en contient 790 (2 « effacés »).

---

## 4. Séquences, découpages, unités, fonctionnalités (large, non trié)

**Séquences nouvelles**
- **S-inscription** : un texte entre à l'ordre du jour, en sort, revient (points créés / supprimés, avec dates). Unité : le *créneau* (séance × point), avec ses états successifs.
- **S-fenêtre de dépôt** : de l'ouverture de l'examen au délai. Unité : le *jour de dépôt*. Profil connu : un filet puis un pic la veille ; les redépôts d'abord, les nouveautés à la fin.
- **S-mise en forme / publication** : déposé → « En traitement » (publié sous réserve) → « A discuter » ou irrecevable. Unité : la *latence* (0-6 j).
- **S-construction du dérouleur** : les places, puis les identiques et les communes, avec la `version` du dérouleur. Unité : la *place* d'eLiasse (article, ou « avant / après article »), plus fine que l'article.
- **S-avis article 88** : la commission rend ses avis sur les amendements de séance, souvent le jour même.
- **S-tête de lecture** : `prochainadiscuter` avance d'amendement en amendement ; les sorts tombent ; les statistiques décroissent.
- **S-redépôt** : la vie d'une rédaction à travers les lieux d'examen : commission (rejet) → séance (identique, repli, reformulation). Unité : la *lignée* d'une rédaction pour un auteur.

**Fonctionnalités pour un « mode en direct »** (source, latence)
1. **Bandeau d'état du dossier** : « séance dans 8 jours ; commence lundi 16 après un autre texte ; pas de séance jeudi 19 ; avis de la commission lundi 16 h 30 » (agenda open data, ≤ 2-6 h ; feuille verte PDF pour la version lisible).
2. **Compte à rebours du délai** : calculé (règle par défaut) tant qu'aucune source ne publie le délai réel ; pour les lois de finances, `delaiDepot` d'eLiasse.
3. **Pile des autres qui se remplit** : sonde du zip toutes les 2 h (diff CRC → nouvelles feuilles, feuilles modifiées) ; marquer « en traitement » par une feuille encore humide ou sous calque (le cartouche officiel le dit). La latence affichée doit être honnête : « déposé il y a ~3 jours, visible depuis 2 h ».
4. **Prévision des redépôts** : avant même le premier dépôt, montrer sur chaque article le **réservoir** (les rédactions rejetées ou retirées en commission) : « ces 59 rédactions de l'article 4 pourraient revenir ». Quand le dépôt arrive, la feuille fantôme devient réelle (apparier par auteur + dispositif) : *identique*, *repli* (diff en corrections apparentes face à la version de commission, même règle de symétrie que la maquette) ou *nouveau*.
5. **« Mon amendement » face au calendrier** : mes amendements de commission rejetés sont des brouillons de séance tout prêts (bouton « redéposer / replier »).
6. **Dérouleur vivant** (eLiasse, WebSocket) : une fois l'examen ouvert, la pile des autres suit l'ordre de discussion réel, groupée par place et par discussion commune ; la tête de lecture avance ; un sort fait tomber les concurrents (« tombés » en grappe). Latence de l'ordre de la seconde (SUPPOSÉ : WebSocket non testé ; le REST suffit en sondage à la minute).
7. **Alerte d'itinéraire** : « l'article qui vous intéresse est la prochaine place » (`prochainadiscuter` + places).
8. **Fil « commission → séance » sur chaque feuille** : commission (rejeté le 21 sept.) → séance (redéposé le …, sort …), puis CMP.
9. **Calque « ce qui était prévu »** : rejouer l'agenda à une date donnée (points supprimés en filigrane).
10. **Diff global quotidien de l'AN** (sonde CRC) comme fil d'activité : « 1 amendement modifié dimanche ; 600 mardi ».

**Unités candidates** : créneau d'ordre du jour ; place du dérouleur ; jour de dépôt ; lignée de rédaction (auteur × lieux d'examen) ; version du dérouleur.

**Sources et latences pour le direct, du plus rapide au plus lent**

| Source | Latence |
|---|---|
| WebSocket eLiasse | secondes (SUPPOSÉ) |
| REST eLiasse | à la demande |
| Fiches et recherche du site | à la publication |
| Archive amendements | 2 h + jusqu'à 4 h de cache |
| Agenda, dossiers, scrutins | ~1 j |
| Syceron (comptes rendus) | ~1 j, régénéré la nuit |
| Rapport de commission | 16 j après le vote pour le logement |

---

## 5. Questions ouvertes
- **Quand l'examen de séance logement s'ouvrira-t-il dans eLiasse, et avec quelle date de délai ?** À sonder chaque jour : `GET api-eliasse/examens` et `GET api-eliasse/examens/EXANR5L17PO838901BTC3188P0D1/derouleur`.
- Les examens terminés restent-ils interrogeables dans eLiasse (le texte 3393, « Terminé », répond encore) ? Combien de temps ? Peut-on récupérer l'historique des `version` du dérouleur ?
- Le WebSocket est-il ouvert sans authentification hors du navigateur (contrôle d'origine) ?
- Le délai réel : où est-il publié (feuille de la conférence des présidents, annonce en séance, plateforme de dépôt) ? Un temps législatif programmé est-il prévu ? Aucune source sondée ne le dit.
- Les « En traitement » sans date de publication sont-ils visibles sur le site, ou seulement dans l'open data ? Si seulement dans l'open data, celui-ci voit plus tôt que le site.
- La règle d'appariement des redépôts : faut-il aussi chercher chez les **cosignataires** (un même groupe change souvent de premier signataire) et entre textes (amendement « après l'article X » devenu article) ?
- À rejouer en vraie grandeur dès le 12-16 nov. : sonde zip toutes les 2 h et dérouleur eLiasse toutes les 10 min, pour mesurer la vraie courbe dépôt / publication / classement du logement.
