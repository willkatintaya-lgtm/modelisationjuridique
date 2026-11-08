# Exploration « an-global » — l'archive complète des amendements AN, 17e législature

Front : généraliser (ou contredire) les constats tirés de l'échantillon narcotrafic + logement à **toute la législature** (145 249 amendements, 345 dossiers), et vérifier la disponibilité des législatures 16 et 15.

## 1. Ce qui a été exploré, comment y accéder

| Jeu | URL | Taille (HEAD, 8 nov. 2026) | Remarque |
|---|---|---|---|
| Amendements L17 | `https://data.assemblee-nationale.fr/static/openData/repository/17/loi/amendements_div_legis/Amendements.json.zip` | 355 Mo zip, ~1 Go JSON, 145 249 fichiers | republié chaque jour (last-modified 8 nov. 15:20) |
| Amendements L16 | `…/repository/16/loi/amendements_div_legis/Amendements.json.zip` | 363 Mo | figé au 28 juin 2024 (dissolution) |
| Amendements L15 | `…/repository/15/loi/amendements_legis/Amendements_XV.json.zip` | **649 Mo** | autre chemin (`amendements_legis`, suffixe `_XV`) ; figé 9 juin 2022 |
| Dossiers L16 / L15 | `…/16/loi/dossiers_legislatifs/Dossiers_Legislatifs.json.zip` (9 Mo) ; `…/15/loi/dossiers_legislatifs/Dossiers_Legislatifs_XV.json.zip` (15 Mo) | | même convention `_XV` pour la 15 |
| Scrutins L16 / L15 | `…/16/loi/scrutins/Scrutins.json.zip` (10 Mo) ; `…/15/loi/scrutins/Scrutins_XV.json.zip` (9 Mo) | | |
| L14 | aucun des chemins testés (avec ou sans `_XIV`) | 404 | pas dans ce dépôt ; à chercher ailleurs |

Pièges : la racine `repository/16/` renvoie 404 (pas de listing) ; il faut connaître les chemins. Les chemins L15 ne suivent pas la convention L16/L17.

**Méthode.** Lecture directe dans le zip (`zipfile`, sans décompresser) : `scripts/an-global_aplatir.py` (39 s pour 145 249 fichiers) → `raw-an-global/all.jsonl` (165 Mo, un enregistrement compact par amendement + traits dérivés : nb d'opérations I./II., gage, demande de rapport, « rédactionnel », alinéas cités vs déclaré, grappes). `scripts/an-global_stats.py` → `extraits-bruts/an-global-stats.json` (50 Ko). `scripts/an-global_approfondir.py` → `extraits-bruts/an-global-approfondi.json` (crédits PLF, séries, vitesse, sources externes) et `an-global-approfondi-credits-adoptes.json` (400 amendements de crédits adoptés, mouvements programme par programme, champs `groupe` bruts).

Pièges de format VUS :
- les champs nuls sont des objets `{"@xsi:nil":"true"}` (y compris `dateDepot`, `amendementParentRef`, `cardinaliteAmdtMultiples` sur 4 fichiers) : normaliser avant tout `Counter` ;
- `discussionCommune` / `discussionIdentique` = `{idDiscussion, typePosition: Premier|Milieu|Dernier}` ; l'identifiant n'est unique qu'**au sein d'un examen** (clé = `examenRef` + `idDiscussion`) ;
- **le dispositif est vide pour 46 307 amendements (32 %)** : (a) les irrecevables et les « En traitement » n'ont pas de texte publié ; (b) **les 21 108 amendements de crédits** (PLF, `div_type = ANNEXE`) n'ont pas de `dispositif` HTML mais une structure `dispositifAmdtCreditPLF` (ou `…PLFR`) : liste de programmes avec AE/CP signés ; tout outil textuel les rate ;
- le zip L17 contient aussi des dossiers d'autres législatures (12 597 amendements sur des dossiers `DLR5L16…`, 511 sur un `DLR5L11…` « droit de vote des étrangers », 105 `L15`) : ce sont des textes repris (navette ou PPL sénatoriales anciennes) ; 170 amendements ont un dossier `incorrect` ;
- `alinea.numero` déclaré absent pour 81 165 amendements (56 %) : articles additionnels, crédits, titres, ou « Supprimer cet article ».

## 2. Chiffres clés (L17, au 8 nov. 2026)

| Indicateur | Valeur |
|---|---|
| Amendements | 145 249 ; 345 dossiers ; taille médiane d'un dossier 58, p90 604 ; **10 dossiers = 59 % du total** |
| Lieu | séance 85 561 (59 %) ; commissions 59 688 (CION_FIN 18 251, CION-Aubrac-Fournel 13 558, LOIS 7 237, ECO 6 157…) |
| Auteurs | députés 134 974 ; rapporteurs 8 762 ; Gouvernement 1 513 |
| Issue | adoptés 19 365 (**13,3 % des déposés, 23,5 % des examinés**) ; rejetés 35 138 ; tombés 13 491 ; non soutenus 9 797 ; retirés 13 971 (dont 1 431 avant publication) ; irrecevables 23 763 (**16,4 %**) ; **jamais examinés / en attente 29 720 (20,5 %)** |
| Irrecevabilités | art. 40 : 11 691 (charge 6 652, cavalier social 1 584, crédits 1 315, gage 856, cavalier budgétaire 551…) ; autres : 12 072 (cavalier art. 45 : 6 038, entonnoir 1 233, doublon 1 225, sous-amendement art. 98 : 1 104, satisfait/inopérant 387, hors champ 309, champ d'habilitation 114, hors délai 95, injonction 57…) |
| Adoption des examinés par auteur | Gouvernement 73,9 % ; rapporteur 67,3 % ; député 18,4 % |
| Discussions communes | 7 485 grappes, 31 316 amendements (21,6 %), médiane 3, **max 1 458** ; 73,6 % transpartisanes |
| Identiques | 9 477 grappes, 28 536 amendements (19,6 %), médiane 2, max 44 ; **78,7 % transpartisanes** |
| Adoption examinés : en discussion commune / hors | 12,9 % / 28,6 % |
| Adoption examinés : identique / non | 26,6 % / 22,2 % |
| Sous-amendements | 7 313 (5,0 %) sur 1 766 parents ; 30 % irrecevables ; un parent en porte **390** |
| Rectifications | 1 951 (1,3 %) : rect. 1 = 1 871, rect. 2 = 80 ; Gouvernement 8,7 %, députés 1,3 % |
| Multi-opérations (≥ 2 « I. – ») | 15,3 % (PLF 22,9 %, PLFSS 22,6 %, PPL 9,5 %, PJL 11,3 %) |
| Gage | 7,8 % (PLF 19,1 %, PLFSS 10,3 %, PPL/PJL < 1 %) ; adoption des examinés gagés 17,3 % |
| Demande de rapport | 3,1 % (PLFSS 4,9 %) ; adoption 24,6 % des examinés (!) |
| « Rédactionnel / coordination / précision » (exposé) | 5,3 % ; rapporteurs 28,2 % de leurs amendements ; adoption 61,1 % |
| « Supprimer cet article » | 8 182 ; **74 % en grappes d'identiques** ; 2 209 adoptés |
| Articles additionnels | 27,3 % (PLFSS 47,6 %) |
| Déclaré vs portée (alinéas cités) | sur 50 595 mesurables : 79,5 % seulement l'alinéa déclaré, **17,2 % d'autres en plus**, 3,3 % pas l'alinéa déclaré |
| Cosignataires (députés) | 0 : 21 % ; 1-4 : 15 % ; ≥ 60 : **22 %** (cosignature de groupe entier) |
| Concentration | 630 auteurs députés ; top 10 = 10,7 %, top 50 = 32,3 % ; max 2 570 amendements pour un seul député, médiane 132 |
| Séries (même auteur, même texte, dispositif identique à un nombre/une citation près, ≥ 10) | 398 séries, 9 123 amendements (6,3 %) |
| Crédits (PLF/PLFR) | 21 108 ; 85 % déplacent entre 2 programmes ; 86 % à solde nul ; 3 383 créations de programme ; **785 « à 1 € »** ; médiane 15 M€ déplacés ; 694 ≥ 1 Md€ ; adoption 25,2 % des examinés |
| Vitesse en séance | écart médian entre deux sorts consécutifs **16 s** (p25 1 s, p75 133 s, p90 6 min) ; 17 % des sorts à la même seconde ; médiane 17,9 amendements/heure par journée (p10 6, p90 38) ; pic 217 sorts en une heure (16 juil. 2026, 23 h) |
| Dépôt avant le premier sort de l'examen | séance : mode à 4 jours (14 562), 3-6 jours = 72 % ; commission : mode à 4 jours (19 525) |

### Par type de texte et lieu (pourcentage d'adoption sur les examinés ; irrecevabilité sur les déposés)

| | n | irrecevables | adoptés / examinés | jamais examinés |
|---|---|---|---|---|
| PPL séance | 32 131 | 16,8 % | 16,2 % | 9 358 |
| PPL commission | 18 460 | 14,2 % | 26,4 % | 171 |
| PLF séance | 24 144 | 9,4 % | 19,3 % | **10 505** |
| PLF commission | 22 313 | 13,6 % | 23,7 % | 131 |
| PJL séance | 12 355 | **26,2 %** | 21,9 % | 411 |
| PJL commission | 11 236 | 22,3 % | **34,5 %** | 1 |
| PLFSS séance | 10 208 | 22,4 % | 26,5 % | 3 238 |
| PLFSS commission | 6 673 | **32,5 %** | 23,0 % | 2 |
| Constitutionnel séance | 3 924 | 0,3 % | 22,8 % (sur 101) | **3 785 (96 %)** |
| Organique séance | 1 759 | 5,3 % | 10 % | 1 587 (90 %) |
| Résolutions | 651 | ~1 % | 30-47 % | 51 |

Commissions spéciales : très hauts taux d'irrecevabilité (CSPROENF 39 %, CSVIEECO 31 %) et d'adoption (CSCYBER 52 %, CSINTEG 45 % des examinés).

Groupes (chiffres bruts, sans interprétation ; seront rendus fictifs) : les dépôts vont de 23 879 (premier groupe) à 1 303 (non-inscrits) ; la part « non soutenu » varie de 0,6 % à 34 % des dépôts selon le groupe ; voir `groupe_issue` dans le JSON.

## 3. Ce que l'échantillon ne montrait pas / surprises

1. **Un cinquième des amendements n'est jamais examiné** (29 720, état « En traitement » ou « A discuter »). Ce n'est pas du bruit : c'est la trace de séquences qui coupent la discussion. VU : PLF 2026, 4 187 amendements de séance « en attente » sur l'article 49 (état B, crédits des missions) : la seconde partie n'a pas été discutée en séance (cause SUPPOSÉE : rejet de la première partie ou 49.3) ; PPL « métier d'agriculteur » 3 192 jamais examinés sur 4 650 (SUPPOSÉ : motion de rejet préalable) ; projet de loi constitutionnel Nouvelle-Calédonie 3 155 sur 3 205 ; PPL « abrogation retraite à 64 ans » 558 sur 1 015 (SUPPOSÉ : fin de journée réservée) ; PLF 2027 et PLFSS 2027 : en cours (normal). L'interface doit distinguer « rejeté » de « pas atteint ».
2. **L'obstruction a une signature nette : la série.** La plus grosse discussion commune compte 1 458 amendements (Nouvelle-Calédonie, art. 1er) : « substituer aux mots « tard le 26 juillet 2026 » les mots « tôt le 29 septembre 2039 » », puis 13 octobre 2039, etc. — une date par amendement, 584 pour un seul auteur. PLO calédonienne : 412 variantes « 28 juin » → « 3 février ». Fin de vie : un député seul dépose 125 variantes de « aide à mourir » → (autre expression), 122 retirées. Les séries ≥ 10 = 6,3 % du total mais se concentrent sur quelques dossiers.
3. **Les identiques ne sont pas plus perdants, au contraire** (26,6 % d'adoption contre 22,2 %), alors que **la discussion commune est un piège** (12,9 % contre 28,6 %) : être mis en concurrence avec d'autres rédactions divise par plus de deux les chances. L'acquis (identiques = coalition) se confirme à l'échelle de la législature (78,7 % transpartisans).
4. **L'écart déclaré/portée est plus faible qu'au narcotrafic** : 17,2 % touchent d'autres alinéas (30 % sur l'échantillon). Le narcotrafic surreprésentait le cas ; le phénomène reste massif en volume (8 724 amendements).
5. **Les demandes de rapport passent mieux que la moyenne des amendements de députés** (24,6 % contre 18,4 %) : monnaie d'échange ? (SUPPOSÉ).
6. **Un amendement sur cinq de PLF n'est pas un texte mais un tableau de chiffres.** 21 108 amendements de crédits : ici les chiffres ont un sens (euros déplacés d'un programme à un autre). 86 % sont à solde nul (contrainte de l'art. 40 / LOLF : on ne peut que déplacer). 785 déplacent **1 €** (amendement d'appel : signal politique sans effet budgétaire). Programmes les plus ponctionnés : Emploi outre-mer (1 612), Service public de l'énergie, Recherches pluridisciplinaires ; les plus abondés : Conditions de vie outre-mer, Accès et retour à l'emploi, agriculture, Vie de l'élève. Adoptés extrêmes : 9,5 Md€ (II-AC16, PLF 2027), 6,2 Md€ vers un programme créé « Gratuité de l'école publique » (II-CF451, PLF 2025).
7. **La séance est un débit, pas une conversation** : 16 s médianes entre deux sorts, 17 % à la même seconde (cascades : un vote fait tomber une grappe ; « Adopté + Tombé » à la même seconde 25 fois). Les journées les plus denses font ~600 sorts (Fin de vie 597 ; simplification 564 ; PLF 2026 528). Horaires : 9-13 h, 15-20 h, 21 h-1 h ; mercredi en commission (19 823 sorts) ; jeudi-vendredi en séance.
8. **Rapporteurs en séance : 932 amendements, dont 576 « en attente » et 315 retirés** : en séance, le rapporteur dépose peu et retire beaucoup ; c'est en commission qu'il fait le texte (7 830 amendements, 64 % adoptés).
9. **Gouvernement : 375 des 402 amendements « article 99 »** (dépôt hors délai) ; et c'est lui qui rectifie le plus (8,7 %).
10. Sous-amendements : un seul amendement de demande de rapport (« mariages simulés », PPL L16 reprise) a reçu 390 sous-amendements, 341 pour un autre : le sous-amendement est aussi une arme d'obstruction, la plupart irrecevables (art. 98).
11. Sources externes déclarées dans l'exposé (échantillon 1/3 des exposés) : 6,2 % mentionnent « travaillé / proposé / rédigé avec / par » ; organisations les plus citées : FNSEA (124), Fédération des Entreprises des Outre-mer (60), ESS France (46), USH, France Assos Santé, Jeunes Agriculteurs, Nexem, MEDEF, UNICEF, FHF, Fondation Abbé Peyrol-Delorme, CNB… L'extraction est grossière (regex) mais montre que la provenance externe est **mesurable à l'échelle de la législature**.
12. Le calendrier des dépôts suit l'agenda budgétaire : octobre 2024 (15 828), octobre 2025 (15 416), octobre 2026 (18 203, record) ; creux en août.

## 4. Séquences, unités et fonctionnalités suggérées (large, non trié)

Séquences :
- **« Le mur »** : ce qui n'a jamais été examiné. Une vue où la pile des autres montre, en filigrane estompé, les amendements jamais atteints (motion de rejet, 49.3, fin de niche, renvoi). Distinguer visuellement *rejeté* / *tombé* / *non soutenu* / *pas atteint* / *irrecevable*.
- **La recevabilité comme sas** : avant la confirmation (scène 3 du flux), un contrôle de recevabilité simulé : art. 40 (charge → proposer un gage, ou basculer en demande de rapport), art. 45 (cavalier : lien avec le texte), entonnoir (2e lecture), doublon (déjà déposé à l'identique → proposer de cosigner). Les sous-états donnent la nomenclature exacte des motifs.
- **L'obstruction / la série** : regrouper automatiquement les variantes d'une même matrice (« une date par amendement ») en une seule feuille paramétrée : « 584 amendements = 1 matrice × 584 valeurs ». Au dézoom, une série se lit comme un éventail.
- **La cascade** : un vote fait tomber N amendements à la même seconde ; animer la chute des feuilles concurrentes quand une rédaction est adoptée (la discussion commune est une compétition où une seule gagne).
- **La séance comme débit** : une frise horaire réelle (sorts horodatés à la seconde) ; rejouer une journée à vitesse réelle ou accélérée ; repérer les pauses (débat long sur un amendement) vs les rafales.
- **Le budget comme flux** : pour les amendements de crédits, la feuille n'est pas un texte mais une **flèche entre programmes** (de X vers Y, montant). Ici un chiffre a un sens : diagramme de flux mission par mission, amendements « à 1 € » marqués comme signaux.
- **La coalition des identiques** : grappe d'identiques = feuille unique avec les groupes porteurs en pastilles (déjà le « regroupement par proposition ») ; à généraliser à toute la législature : quels couples de groupes déposent le plus souvent à l'identique (mesurable, sans opinion).
- **Le rapporteur fait le texte en commission** : séquence commission où l'on voit les amendements du rapporteur (64 % adoptés, 28 % rédactionnels) réécrire l'article, et ce qui reste aux autres.
- **Le retrait négocié** : 4 761 retraits en cours de discussion (souvent après avis défavorable ou promesse) + 7 776 après publication : une séquence « retrait contre engagement » à documenter avec le compte rendu.
- **La rectification** : 1,3 % seulement ; montrer rect. 0 → 1 → 2 comme versions d'une même feuille (au Gouvernement surtout).
- **Sous-amendement** : feuille posée sur une feuille ; montrer l'arbre parent → enfants (jusqu'à 390).

Unités / fonctionnalités :
- étiquette « pas atteint » et compteur « N amendements jamais discutés sur cet alinéa » ;
- détecteur de matrice (normalisation chiffres + citations) → regroupement en séries ;
- gage détecté et **replié** par défaut (clause rituelle) ; demande de rapport classée à part ;
- « en conséquence » : relier visuellement les alinéas touchés hors alinéa déclaré (17 % des cas) ;
- indicateur de concurrence : « vous êtes en discussion commune avec N rédactions » (chances divisées par 2 dans les données) ;
- délai : compte à rebours de dépôt (pic à J-4 / J-3 avant le premier sort) ;
- vue législature : 345 dossiers, distribution très asymétrique (top 10 = 59 %) ; la boussole doit tenir à la fois un dossier de 9 270 amendements (Fin de vie) et un de 12.

## 5. Questions ouvertes

- « En attente » : distinguer mécaniquement les causes (49.3, motion de rejet, fin de niche, retrait de l'ordre du jour) en croisant avec l'agenda et les comptes rendus — non fait ici.
- Les sorts « à la même seconde » sont-ils de vrais votes groupés ou des saisies a posteriori par le service de la séance ? (horodatage = saisie, SUPPOSÉ).
- Délai limite réel : non présent dans le JSON ; le proxy « jours avant le premier sort » est approximatif (dépôts négatifs : sous-amendements et amendements du Gouvernement/commission hors délai).
- L15 (649 Mo) et L16 (363 Mo) : même schéma JSON ? (non téléchargés ; chemins et tailles vérifiés seulement). Une comparaison L15/L16/L17 dirait si l'obstruction par séries et le taux de « jamais examinés » sont propres à une Assemblée sans majorité.
- Provenance externe : passer de la regex à une extraction propre (liste d'organisations) pour mesurer les rédactions fournies clé en main.
- Les 46 307 dispositifs vides des irrecevables : le texte est-il récupérable ailleurs (PDF `documentURI`) ?
