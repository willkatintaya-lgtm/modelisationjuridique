# Exploration « Sénat » — Ameli, Akoma Ntoso, comptes rendus, scrutins

Front : le matériau du Sénat pour nos deux dossiers (narcotrafic `ppl23-735`, logement `pjl25-801`). Tout ce qui suit a été **vu dans les données** sauf mention « (supposé) ». Données brutes : `$S/raw-senat/` ; dérivés : `$S/senat/` ; extraits pour l'interface : `$S/extraits-bruts/senat-*.json` (`$S` = scratchpad de la session).

## 1. Sources : où, quoi, comment

| Gisement | URL exacte | Format, volume | Notes |
|---|---|---|---|
| Base Ameli complète | `https://data.senat.fr/data/ameli/ameli.zip` | 156 Mo zip → `ameli.sql` 727 Mo, dump PostgreSQL 8.4 (`COPY … FROM stdin`), **LATIN1** | ~277 000 amendements (séance depuis 2001, commission depuis 2010). Régénéré chaque nuit. Pas besoin de Postgres : `scripts/senat_ameli.py` lit les blocs `COPY` en flux (15 s). |
| Amendements d'un texte, CSV | `https://www.senat.fr/amendements/<session>/<num>/jeu_complet_<session>_<num>.csv` (séance) ; `…/amendements/commissions/<session>/<num>/jeu_complet_commission_<session>_<num>.csv` (commission) | TSV cp1252, 1re ligne `sep=`, dispositif/objet en HTML échappé | **Le numéro est celui du texte examiné**, pas du texte déposé : narcotrafic séance = 254 (2024-2025), et non 735. D'où le 404 sur `…/2023-2024/735/…`. Le CSV n'a **pas de groupe**, seulement « Auteur » (« Mme Tessier-Carvalho ») et « Au nom de ». |
| Liste de discussion, JSON | `https://www.senat.fr/enseance/<session>/<num>/liste_discussion.json` ; `…/encommission/<session>/<num>/liste_discussion.json` | JSON ~20-180 Ko | Ordre réel d'appel (`posder`, `subpos`), `isIdentique`, `isDiscussionCommune`, `isSousAmendement`, `idAmendementPere`, sort, auteur court, signet vers l'ancre du texte (`../../textes/2024-2025/254.html#AMELI_SUB_4__Article_1`). |
| Textes en Akoma Ntoso (« Monalisa ») | index : `https://www.senat.fr/akomantoso/depots.xml` (3 797 textes) et `…/adoptions.xml` (1 142) ; un texte : `https://www.senat.fr/akomantoso/<signet>.akn.xml` | XML AKN 3.0 + espace `data:` (`http://data.parlement.fr/v1`), 110-600 Ko | Depuis déc. 2019. Signets : `ppl23-735` (déposé), `ppl24-254` (commission), `tas24-045` (adopté Sénat), `ppl24-502` (texte AN transmis), `ppl24-535` (texte CMP), `tas24-108` (CMP adoptée) ; `pjl25-801`, `pjl25-835` (commission), `tas25-157` (adopté). |
| Fil d'un dossier | `https://www.senat.fr/dossierleg/rss/dosleg<signet>.xml` (ISO-8859-15) | Atom | **Le plus simple pour trouver tous les numéros** (textes, rapports, scrutins, CR) : la page HTML du dossier est remplie en JS et ne livre presque rien à curl. |
| Compte rendu intégral d'une journée | `https://www.senat.fr/seances/s<AAAAMM>/s<AAAAMMJJ>/s<AAAAMMJJ>_mono.html` | HTML 1-1,7 Mo, toute la journée (tous textes) | Balisage riche : `<!--cri:intervenant mat="20110Q" nom="Isnard-Lagarde" qua="" type="1|2">` (1 = sénateur, 2 = Gouvernement), ancres `<a name="amd_2024_254_120">` (amendement présenté), `class="amendements"` (dispositif lu), `info_entre_parentheses` (applaudissements, décisions « L'amendement est adopté. »), ancres d'articles `Niv3_art_…`. Découpe : `scripts/senat_cr.py`. |
| Base CR complète | `https://data.senat.fr/data/debats/cri.zip` (548 Mo, XML) ; `…/debats.zip` (Postgres) | | Non téléchargée (le `_mono.html` suffit pour deux dossiers). |
| Dosleg | `https://data.senat.fr/data/dosleg/dosleg.zip` (16 Mo, Postgres) + CSV (`dossiers-legislatifs.csv`, `promulguees.csv`…) | | Non exploré : l'Atom du dossier suffisait. |
| Scrutins publics | `https://www.senat.fr/scrutin-public/<annee>/scr<annee>-<n>.html` ; par dossier `…/scrutin-public/dossiers/<signet>_scr.html` | **HTML seulement**, nominatif par groupe | **Pas de jeu open data des scrutins** sur data.senat.fr (aucune rubrique). |

Pièges rencontrés :
- Encodages mêlés : dump LATIN1, CSV cp1252, Atom ISO-8859-15, AKN et JSON UTF-8.
- **AKN : alinéas imbriqués** (516 sur 1 112 dans `tas24-108`). Un « I. – » ou un « 1° » est un alinéa conteneur (il a sa pastille) qui contient d'autres alinéas. `itertext()` sur l'alinéa ramasse les enfants. Il faut prendre seulement `num` + `content` (corrigé dans `senat_akn.py`, champ `conteneur`). Le `num` est souvent répété dans le `<p>` (« I. – I. – Le 1° … ») : à dédoublonner à l'affichage.
- Doublons d'`eId` : un alinéa « (Supprimé) » et son remplaçant peuvent partager `al_1__art_1er`. Identifier par **GUID**, pas par eId.
- Codes de groupe Ameli historiques : le groupe SF apparaît en `SF`. Prendre `libcou` (libellé), pas `cod`.
- Ameli : `nomentid = 5` = Gouvernement, `nomentid = 0` = **amendement retiré avant séance, auteur effacé** (signataires absents de `amdsen` ; le CSV dit « Cet amendement est retiré avant séance »). `sort` vide = irrecevable (voir `irrid`) ou retiré avant séance.
- Les amendements de commission (`COM-12`) sont rattachés au **texte déposé** (735 rect., 801), ceux de séance au **texte de commission** (254, 835). Les deux numérotations sont indépendantes.

Scripts (dépôt, `canaux/1-assemblee/scripts/`) :
- `senat_ameli.py ameli.sql sortie.jsonl ppl23-735 pjl25-801` : amendements + signataires + groupes + sort + avis commission/Gouvernement + irrecevabilité + identique/discussion commune + subdivision + alinéa ; `sortie.jsonl.ref.json` : tables de référence, `sub` (subdivisions avec leur sort) et `intora` (orateurs inscrits).
- `senat_akn.py fichier.akn.xml` : un JSON par alinéa (article, pastille, GUID, `amdts`, `mention`, `conteneur`, texte propre).
- `senat_provenance.py akn_dir ameli.jsonl dépôt commission adopté num_com num_séance sortie.json` : origine de chaque alinéa du texte adopté.
- `senat_cr.py cr_mono.html …` : un JSON par intervention (orateur, type, ancres d'amendements, parenthèses, nombre de mots).

## 2. Ce que j'ai observé (chiffré)

### 2.1 Volumes et sorts (Ameli)

| Étape | Déposés | Adoptés | Groupes (déposés/adoptés) |
|---|---|---|---|
| Narcotrafic, commission des lois (sur 735 rect.) | 90 | 45 | commission/rapporteurs 35/34 ; SC 19/9 ; SE 10/2 ; SB 9/0 ; RC 9/0 ; SF 4/0 |
| Narcotrafic, séance (sur 254) | 271 | 87 | RC 51/14 ; Gouvernement 46/20 ; SC 37/21 ; SE 35/6 ; anonymes (retirés avant séance) 26 ; SB 22/7 ; SD 14/2 ; commission 13/12 ; SF 11/1 ; RTLI 7/2 ; NI 6/0 ; SG 3/2 |
| Narcotrafic, CMP (sur 535) | 9 | 9 | Gouvernement 7, commission 2, tous avis favorable/favorable |
| Logement, commission des affaires économiques (sur 801) | 86 | 23 | SB 35/1 ; commission 20/20 ; SC 14/0 ; SG 8/1 ; RTLI 5/0 |
| Logement, séance (sur 835) | 435 | 40 | RC 125/10 ; SC 80/10 ; SB 46/3 ; SD 44/0 ; SE 34/5 ; Gouvernement 14/3 ; anonymes 18 ; SF 29/2 ; SG 28/1 ; RTLI 11/0 ; commission 6/6 |

- **Cavaliers (art. 45)** : 127 des 435 amendements de séance logement (29 %), 33 sur 271 narcotrafic ; 21 sur 86 en commission logement. Art. 40 : 26 + 13. Art. 41 : 7 (logement). Même le Gouvernement s'en voit déclarer deux (n° 217, 218, narcotrafic).
- **Le rapporteur pèse encore plus qu'à l'AN** : en commission, les amendements des rapporteurs sont adoptés à 34/35 (narcotrafic) et 20/20 (logement) ; ceux des sénateurs à 11/55 et 3/66.
- Cosignatures : 10 signataires en moyenne par amendement de séance narcotrafic, 8,4 logement (1,7 à 4,4 en commission).
- Rectifications : 89/271 et 278/435 amendements de séance ont au moins une rectification (`rect. quater`, `septies`…) : **un amendement du Sénat a des versions** (rev 0, 1, 2…) ; seule la dernière est dans le dump.

### 2.2 Avis et issue (séance)

Le dump donne l'avis de la commission **et** celui du Gouvernement en champs séparés (à l'AN, il faut les lire dans le compte rendu).

| Avis commission / Gouvernement → sort | Narcotrafic (254) | Logement (835) |
|---|---|---|
| Favorable / Favorable → Adopté | 64 | 12 |
| Défavorable / Défavorable → Rejeté | 27 | 104 |
| **Favorable / Défavorable → Adopté** | 2 | **14 sur 14** |
| Défavorable / Favorable → Rejeté (adopté) | 7 (4) | 10 (2) |
| Demande de retrait → Retiré ou Tombé | 37 | 33 |
| Défavorable / Défavorable → **Adopté** | 0 | 6 |
| Favorable / Sagesse → Adopté | 12 | 0 |

Au Sénat, quand les deux avis divergent, **c'est la commission qui l'emporte** (logement : 14/14 contre le Gouvernement ; narcotrafic : 7 rejets sur 11 malgré un Gouvernement favorable). Six amendements logement passent contre les deux avis.

### 2.3 Identiques et discussions communes

- Narcotrafic séance : 15 grappes d'identiques (36 amendements), 14 sur 15 réunissent plusieurs groupes ; 34 discussions communes (jusqu'à 14 amendements).
- Logement séance : 57 grappes (156 amendements, jusqu'à 7), **54 sur 57 transpartisanes** ; 60 discussions communes, dont une de 37 amendements.
- Ameli : `ideid` pointe vers un amendement de référence **parfois absent du jeu** (supprimé ou retiré : la tête de grappe manque). `discomid` regroupe la discussion commune. Le JSON `liste_discussion` donne en plus l'ordre réel d'appel (`posder`, `subpos` -20 à +20 = avant/après l'article).
- Champ `alinea` (alinéa visé) : renseigné pour 145/271 et 236/435. Il concorde avec le premier « Alinéa n » du dispositif dans 117 cas sur 122 vérifiés. Il renvoie à la **pastille AKN du texte examiné** (vérifié : amendement 1 rect. bis « Alinéas 35 et 36 » = pastilles 35-36 de l'art. 3 de `ppl24-254`). **Le lien amendement → alinéa est donc direct au Sénat**, sans analyse du dispositif.

### 2.4 Le lien alinéa → amendement (`data:amdts`) : il existe, voici sa forme et sa couverture

Forme (vu) : attribut sur `<alinea>` (et parfois `<article>` pour un article additionnel), valeur textuelle : `data:amdts="n° 248, 266(s/amdt)"`, `"COM-54, COM-17 rect."`, `"n° 209 rect. ter, n° 409 rect. bis"` ; avec `data:mention="(nouveau)" | "(Supprimé)" | "(Non modifié)"` et `data:pastille="n"` (le numéro d'alinéa qu'on cite).

Il ne décrit **que la dernière étape** : le texte de commission porte les `COM-…`, le texte adopté porte les `n° …` de séance ; les textes déposés et le texte de l'AN transmis (`ppl24-502`) n'en ont aucun.

| Texte | Alinéas | Avec `amdts` | Amendements distincts cités |
|---|---|---|---|
| ppl24-254 (commission narcotrafic) | 625 | 478 (76 %) | 47 |
| tas24-045 (adopté Sénat narcotrafic) | 933 | 435 (47 %) | 72 chaînes |
| tas24-108 (CMP adoptée) | 1 112 | 66 (6 %) | 9 |
| pjl25-835 (commission logement) | 244 | 87 (36 %) | 24 |
| tas25-157 (adopté Sénat logement) | 322 | 98 (30 %) | 31 |

**Les GUID d'alinéa survivent d'une version à l'autre au Sénat**, ce qui permet de chaîner dépôt → commission → séance : 268 GUID communs entre 735 et 254, 562 entre 254 et TA 45, 1 069/1 117 entre le texte CMP et la CMP adoptée, 184 et 241 pour le logement. **Ils ne traversent pas la navette** : 0 GUID commun entre `tas24-045` et le texte AN transmis `ppl24-502` (le Sénat ressaisit le texte de l'AN).

Couverture réelle (alinéas dont le texte change sous le même GUID, ou nouveaux GUID) :
- Narcotrafic commission : 352 nouveaux GUID, tous étiquetés sauf 3 ; 124/151 modifiés étiquetés. Séance : 349/369 nouveaux étiquetés ; modifiés **81 étiquetés, 94 non** (surtout des retouches légères, ratio > 0,9 : 62).
- Logement commission : **103 alinéas modifiés non étiquetés sur 143** (coordinations et rédactionnels du rapporteur ; l'article 8 en a 40 alors que seuls COM-12 et COM-13 y sont nommés).
- → L'attribut est **fiable pour l'ajout et la réécriture**, **lacunaire pour les retouches** (mots remplacés). Pour la correction apparente fine, il faut quand même un diff de texte, mais ciblé : même GUID, deux versions.

Provenance du texte adopté par le Sénat (`senat_provenance.py`, alinéas vides « (Supprimé) » exclus ; le poids d'un alinéa issu de plusieurs amendements est partagé) :

| | Narcotrafic, TA 45 (931 al.) | Logement, TA 157 (322 al.) |
|---|---|---|
| Issu d'un amendement de séance | 435 (47 %) | 98 (30 %) |
| Issu d'un amendement de commission | 386 (41 %) | 73 (23 %) |
| Texte déposé inchangé | 65 (7 %) | 35 (11 %) |
| Déposé, retouché sans amendement nommé | 25 | 114 (35 %) |
| Nouveau sans amendement nommé | 20 | 2 |

Qui a écrit les alinéas venus de la séance (en alinéas) : narcotrafic : SC 136, Gouvernement 111, commission 73, RC 61, SE 15, SB 14, RTLI 12, SG 10, SD 2. Logement : SC 34, RC 24,5, Gouvernement 16, commission 13, SB 7, SF 2. Venus de la commission : à 88 % (narcotrafic) et 98 % (logement) les amendements des rapporteurs (en commission, ils sont co-signés par les rapporteurs de groupes différents : COM-57 = Rouvier-Vallat (SC) + Durain (RC)).

**Un seul amendement peut écrire des dizaines d'alinéas** : n° 73 rect. ter (art. 8, groupe SC, avis commission défavorable, Gouvernement favorable, adopté) = 59 alinéas ; COM-57 (art. 2, parquet national) = 49 ; COM-82 (art. 22) = 45 ; n° 182 (art. 23, RC) = 34. Logement : n° 435 du Gouvernement (art. 9, pouvoirs des maires) = 16 ; COM-15 (art. 10) = 14.

**Palimpseste** : 9 des 45 amendements de commission adoptés n'ont laissé aucune trace dans le texte adopté (COM-54, 55, 56 sur l'art. 1er : réécrits ensuite par l'amendement n° 155 rect. du Gouvernement en séance). Dans l'autre sens, 85/87 amendements de séance adoptés sont retrouvés dans le TA (les deux manquants : n° 156 et 201).

**CMP narcotrafic, par appariement de textes** (pas de GUID commun) : sur les 919 alinéas non triviaux du texte de la CMP (`ppl24-535`), 382 reprennent mot pour mot la version de l'AN seule, 29 la version du Sénat seule, 218 sont identiques dans les deux, **290 sont des rédactions nouvelles de la CMP**. Articles 1er, 2, 3, 9, 12, 13 : l'AN domine ; 15 quater, 21 quinquies : retour au Sénat.

### 2.5 Séance (comptes rendus)

- Narcotrafic, 28-29 janv. et 4 févr. 2025 : 2 213 interventions sur les trois journées (tous textes confondus), 282 du Gouvernement ; 115 ancres `amd_2024_254_*` = **115 amendements présentés** sur 271 déposés (les irrecevables, les retirés avant séance et les identiques/discussions communes, appelés en bloc, n'ont pas d'ancre propre).
- Épisodes (de l'ancre d'un amendement à la décision ; découpage approximatif) : médiane 6 interventions et ~490 mots (narcotrafic), 7 interventions et ~570 mots (logement) ; le plus long côté logement : 104 interventions et 8 800 mots sur l'amendement n° 431 (art. 2, Gouvernement, retiré). Présidents de séance : les plus nombreux à prendre la parole (appels, mises aux voix).
- Formule d'ouverture des discussions communes, lisible telle quelle : « Je suis saisie de huit amendements et deux sous-amendements faisant l'objet d'une discussion commune. »
- `intora` (Ameli) : **orateurs inscrits** par texte et par moment (G = discussion générale, A = sur article, V = explications de vote), avec rôle (`RAPF` rapporteur au fond, `AUPPL` auteur de la PPL…) : 75 lignes pour nos textes.

### 2.6 Scrutins

Peu de scrutins publics au Sénat, mais tous nominatifs : narcotrafic 3 (n° 182 sur l'amendement n° 271 du Gouvernement à l'art. 16, n° 185 sur l'ensemble, n° 262 sur la CMP) ; logement 5 (n° 329-333, 7 juillet 2026 ; ex. n° 331 sur les amendements n° 114 et 164 : 137 pour, 190 contre, avec liste nominative par groupe et mise au point). Le reste se vote à main levée : la décision n'existe que dans les parenthèses du CR et le champ `sort`.

### 2.7 Comparaison structurelle Sénat / AN

| | AN (open data) | Sénat |
|---|---|---|
| Amendement | un JSON par amendement, riche (cosignataires, exposé, sort, état) | dump Postgres (tout) ou CSV/JSON par texte (léger) |
| Groupe de l'auteur | uid d'organe à résoudre via AMO | libellé direct par signataire (`amdsen.grpid` → `grppol_ameli`) |
| Avis commission / Gouvernement | absents des champs, à lire dans le compte rendu | **deux champs** (`avcid`, `avgid`), dont « sagesse », « demande de retrait », « avis du Gouvernement » |
| Alinéa visé | dans `pointeurFragment`/`alinea`, à fiabiliser | champ `alinea` = pastille du texte examiné |
| Identiques / discussion commune | `discussionIdentique`, `discussionCommune` | `ideid`, `discomid` + ordre réel d'appel dans `liste_discussion.json` |
| Retirés avant séance | conservés avec auteur | **auteur effacé** |
| Versions d'un amendement | rectifications numérotées | idem (`rev`), dernière version seule |
| Texte → amendement | **rien** (sous-chaînes naïves, `survie.py`) | **`data:amdts` par alinéa + GUID stables** dans la chambre |
| Format des textes | HTML à classes | Akoma Ntoso (avec alinéas imbriqués) |
| CR de séance | Syceron XML, paragraphes codés par fonction (`code_grammaire`) | HTML annoté (`cri:intervenant`, ancres d'amendements), moins fin sur la fonction de la parole |
| Scrutins | open data JSON | HTML seulement |
| Débats de commission | dans le rapport | CR de commission séparé (`/compte-rendu-commissions/<date>/<commission>.html`, non exploré) |

## 3. Surprises / ce qui contredit ou nuance l'acquis

1. **Le champ supposé dans 02 (« un champ relierait certains alinéas aux amendements ») existe bien** (`data:amdts`). Mais il ne vaut que pour **la dernière étape** de chaque texte, il manque **la plupart des retouches légères**, et il ne passe pas d'une chambre à l'autre.
2. **Les GUID d'alinéa** sont la vraie trouvaille : ils donnent une identité stable à un alinéa à travers ses versions dans la chambre. On peut donc chaîner la provenance sans faire d'appariement de textes.
3. Au Sénat, **la commission bat le Gouvernement** quand leurs avis divergent (14/14 sur le logement).
4. Les amendements **retirés avant séance perdent leur auteur** dans l'open data (26 et 18 cas) : un trou volontaire, ou un artefact de publication (supposé).
5. Le texte du Sénat est **réécrit en profondeur dès la commission** : 352 des 623 alinéas du texte de commission narcotrafic sont de nouveaux GUID ; il ne reste que 7 % du texte déposé intact dans le texte adopté.
6. La CMP narcotrafic part du texte de l'AN et en garde l'essentiel ; un tiers des alinéas y sont **écrits par la CMP elle-même**, sans amendement ni trace d'auteur.
7. 29 % des amendements de séance logement sont des cavaliers : c'est le premier filtre au Sénat aussi.
8. L'Atom du dossier révèle un « Texte n° 2981 » de l'AN (projet de loi) sur le logement en plus du 3058 : (supposé) un dépôt antérieur ou une lettre rectificative, à vérifier.
9. Le site du Sénat ne sert presque rien sans JavaScript (page dossier), alors que les fichiers (Atom, JSON, AKN, CSV) se récupèrent tous sans clé.

## 4. Séquences, découpages, unités, fonctionnalités suggérés (large, sans tri)

**Unités nouvelles**
- **L'alinéa-GUID** : un alinéa identifié à travers ses versions (dépôt → commission → séance), avec sa pastille à chaque étape. C'est l'unité naturelle de la pile verticale de la maquette.
- **La couche de provenance** : pour chaque alinéa, « écrit par » (amendement, groupe, étape) : 4 états vus (inchangé / retouché / commission / séance) + « CMP ».
- **La version d'amendement** (rect., rect. bis… septies) comme mini-historique d'une rédaction.
- **La paire d'avis** (commission, Gouvernement) comme petit objet visuel prédictif.

**Séquences**
- S1. **La réécriture en commission au Sénat** (le rapporteur réécrit tout) : voir la feuille déposée se recouvrir de feuilles neuves alinéa par alinéa.
- S2. **La séance au Sénat** : appel en discussion commune (« Je suis saisie de huit amendements… »), avis des deux bancs, vote à main levée ou scrutin.
- S3. **Le palimpseste** : un amendement de commission adopté, puis effacé en séance (COM-54/55/56 → n° 155 rect.). Montrer les couches plutôt que le seul résultat.
- S4. **Le passage de navette** : le texte change de mains, d'identifiants, de mise en forme (ressaisie) ; « (Non modifié) », « (Supprimé) » deviennent des marques de navette.
- S5. **La CMP comme arbitrage alinéa par alinéa** : AN seul / Sénat seul / les deux / rédaction nouvelle. Mesurable, colorable.
- S6. **Le désaccord commission-Gouvernement** et qui l'emporte.
- S7. **L'amendement-monde** : un seul amendement qui écrit 59 alinéas (réécriture d'article) contre la poussière des retouches.

**Fonctionnalités pour la maquette**
- F1. **Filet de provenance** sur ma feuille et sur celles des autres : une marge colorée par étape (dépôt, commission, séance, CMP) et, au survol, « alinéa écrit par l'amendement n° 73 rect. ter (groupe X) ». Matière papier : un **tampon** en marge, pas un panneau.
- F2. **Dézoom « origine » étendu à toute la chaîne** : au lieu de « commission au-dessus de ma feuille », une pile de versions du même alinéa (même GUID) où l'on remonte dépôt → commission → séance. Le geste haut/bas existe déjà ; il faudrait un cran d'échelle « historique ».
- F3. **Index des amendements adoptés par poids** (nombre d'alinéas écrits) : repère les amendements-monde.
- F4. **Pastilles d'avis** (F/D/S/R pour la commission et le Gouvernement) sur chaque feuille d'amendement concurrent ; et un mode « prédire » : la règle « la commission l'emporte » vérifiée sur données.
- F5. **Feuilles fantômes** côté Sénat : irrecevables (cavalier, art. 40, 41), retirés avant séance **sans auteur** (une feuille sans signature : la donnée elle-même est muette).
- F6. **Vue CMP en trois colonnes** (AN | CMP | Sénat) avec une couleur par origine d'alinéa : c'est l'éclatement de la maquette, appliqué à la CMP.
- F7. **Couture de navette** : appariement par texte entre `tas24-045` et le texte AN pour reporter la provenance Sénat sur la pile AN (le GUID ne traverse pas).
- F8. **Ordre d'appel réel** (`posder`/`subpos`) pour ordonner la pile des autres comme en séance, et non par numéro.
- F9. **Versions d'un amendement** (rect. → rect. ter) : la loupe pourrait montrer les rectifications successives si on les récupère (le dump n'a que la dernière ; supposé : les pages `Amdt_<num>.html` gardent les intitulés).
- F10. **Orateurs inscrits** (`intora`) : qui parlera sur quel article, avant la séance, ce qui est utile pour la scène « avant la séance AN du 16 novembre ».

## 5. Questions ouvertes

- `data:amdts` : est-il posé par un outil (diff automatique) ou à la main par les services ? Le motif des absences (retouches légères, coordinations) laisse penser qu'il est posé à la main ou à partir des seuls amendements « structurants » (supposé).
- Les textes AN ont-ils un équivalent caché (AKN côté AN, Tricoteuses) ? Sinon, la provenance AN reste à reconstruire par diff, et l'asymétrie entre les chambres doit se voir dans l'interface (ou être comblée par calcul).
- Les **9 amendements de CMP** : sont-ce les mêmes textes déposés dans les deux chambres (supposé, cf. 9 côté AN) ?
- Les **versions successives** des amendements rectifiés sont-elles récupérables ailleurs (pages HTML d'amendement, `jeu_complet` à des dates différentes) ?
- Comptes rendus de **commission** du Sénat (`/compte-rendu-commissions/…`) : structure et ancres d'amendements COM- ? Non exploré.
- Pour le logement, l'AN examinera en séance le 16 novembre un texte qui a perdu les GUID du Sénat : comment présenter à l'utilisateur, sur l'article 4, « cet alinéa vient du Sénat, amendement n° 14 rect. quater » ? L'extrait `senat-logement-article4.json` donne la base (3 états Sénat, 79 amendements, provenance de 30 alinéas : 20 issus de la séance, SC n° 14/209/409 et SB n° 3).

## Extraits produits (hors dépôt, groupes et auteurs bruts)

- `$S/extraits-bruts/senat-provenance-narco.json` (931 alinéas du TA 45 : étape, amendements, groupe, auteur), `…-provenance-logement.json` (322 alinéas du TA 157).
- `$S/extraits-bruts/senat-amendements-narco.json` (370), `…-amendements-logement.json` (521) : num, étape, subdivision, alinéa, groupe, auteur, cosignataires, sort, deux avis, irrecevabilité, identique, discussion commune, dispositif tronqué.
- `$S/extraits-bruts/senat-logement-article4.json` : article 4 du logement dans les 3 états Sénat + amendements + provenance.
