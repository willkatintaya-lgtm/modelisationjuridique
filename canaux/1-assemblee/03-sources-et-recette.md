# Canal 1 — sources, recette, pièges

## Sources utilisées (toutes publiques, sans clé)
Racine open data AN, législature 17 : `https://data.assemblee-nationale.fr/static/openData/repository/17/`

| Jeu | Chemin | Taille (zip) | Contenu |
|---|---|---|---|
| Amendements | `loi/amendements_div_legis/Amendements.json.zip` | 355 Mo (1 Go décompressé, 145 249 fichiers) | un JSON par amendement, rangés `json/<dossier>/<texte>/<uid>.json` |
| Dossiers et documents | `loi/dossiers_legislatifs/Dossiers_Legislatifs.json.zip` | 11 Mo | 3 402 dossiers (arbre des actes : dépôt, commission, séance, CMP, CC, promulgation) et 7 622 documents (métadonnées des textes, pas leur contenu) |
| Scrutins | `loi/scrutins/Scrutins.json.zip` | 30 Mo | 9 759 scrutins, décompte nominatif par groupe |
| Comptes rendus de séance | `vp/syceronbrut/syseron.xml.zip` | 61 Mo | 657 séances, XML Syceron, paragraphes étiquetés (`code_grammaire`) |
| Agenda | `vp/reunions/Agenda.json.zip` | 9 Mo | réunions (séance et commissions), ordres du jour |
| Acteurs, organes | `amo/deputes_actifs_mandats_actifs_organes/AMO10_….json.zip` | 5 Mo | députés, groupes, commissions |

Textes (contenu) et rapports : `https://www.assemblee-nationale.fr/dyn/opendata/<uid>.html` (ex. `PRJLANR5L17BTC3188`). Les uid des textes se trouvent dans l'arbre du dossier (`texteAssocie`, `texteAdopte`). Les rapports (`RAPPANR5L17B….html`) contiennent les débats de commission.

Non explorés encore : Tricoteuses (`git.tricoteuses.fr`, site `tricoteuses.fr`), Sénat (Ameli, Akoma Ntoso, `data.senat.fr` répond), Légifrance (code consolidé).

L'archive est régénérée quotidiennement (fichiers datés du jour). Le téléchargement du compte rendu a échoué une fois (flux HTTP/2 coupé) : relancer suffit.

## Recette (reproduire l'échantillon)
Les données brutes ne sont pas dans le dépôt. Dans un répertoire de travail `$S` :
```sh
B=https://data.assemblee-nationale.fr/static/openData/repository/17
curl -o $S/raw/amendements.zip $B/loi/amendements_div_legis/Amendements.json.zip   # etc. pour les autres jeux
unzip -q $S/raw/amendements.zip 'json/DLR5L17N54608/*' 'json/DLR5L17N50169/*' -d $S/raw/am
python3 -I scripts/aplatir_amendements.py $S/raw/am/json $S/am.jsonl
curl -o $S/raw/textes/PRJLANR5L17BTC3188.html https://www.assemblee-nationale.fr/dyn/opendata/PRJLANR5L17BTC3188.html
python3 -I scripts/decouper_texte.py $S/raw/textes/PRJLANR5L17BTC3188.html $S/PRJLANR5L17BTC3188.json
python3 -I scripts/lire_cr.py $S/raw/cr/xml/compteRendu 'piège du narcotrafic' $S/cr_narco.jsonl   # puis filtrer les séances (voir notes)
python3 -I scripts/episodes_cr.py $S/cr_narco_f.jsonl $S/ep_narco.jsonl
python3 -I scripts/explorer.py $S/am.jsonl $S/ref.json
python3 -I scripts/survie.py $S/am.jsonl DLR5L17N50169 $S/PIONANR5L17B0907.json … $S/PIONANR5L17BTA0102.json
python3 -I scripts/extraire.py $S extraits
```
`ref.json` (noms des groupes et des députés) se fabrique depuis le jeu AMO10 : voir le début de `extraire.py` pour le format attendu (`{"org": {uid: {abr…}}, "act": {uid: nom}}`).

## Scripts
| Script | Rôle |
|---|---|
| `aplatir_amendements.py` | JSON AN (un fichier par amendement) → JSONL plat (position, auteur, groupe, dispositif en texte, sort, discussions communes, identiques…) |
| `decouper_texte.py` | HTML d'un texte → articles → alinéas numérotés 1..n (numérotation des amendements) |
| `lire_cr.py` | compte rendu Syceron → paragraphes JSONL (code, orateur, texte) |
| `episodes_cr.py` | paragraphes → épisodes délimités par les décisions de la présidence |
| `explorer.py` | statistiques exploratoires par examen (commission, séance) |
| `survie.py` | traçabilité naïve des insertions adoptées à travers les textes successifs |
| `extraire.py` | fabrique les extraits autoportants de `extraits/` |

## Extraits (dans le dépôt)
- `extraits/logement-art4-commission.json` : article 4 du projet de loi logement, texte déposé (25 alinéas) et texte de la commission, **143 amendements** de commission triés dans l'ordre de la liasse, avec dispositif, exposé, sort, discussion commune, identiques. Remplaçant direct des données fictives de la maquette.
- `extraits/narcotrafic-art2-seance.json` : article 2 (parquet national anti-criminalité organisée) dans quatre états (Sénat transmis, commission, adopté AN, CMP), amendements de commission (49) et de séance (44), **24 épisodes** de séance et **391 paragraphes** de compte rendu.

## Pièges rencontrés
- Valeurs nulles codées `{"@xsi:nil": "true"}` partout : à neutraliser avant tout comptage.
- `alinea` est un objet (`numero`, `alineaDesignation` : « Alinéa 12 », « Après l'alinéa 3 »), absent pour les amendements d'article entier ou additionnels.
- Le texte visé par un amendement est le texte **sur lequel il est déposé** (déposé pour la commission, texte de commission pour la séance) : la numérotation des alinéas change entre les deux.
- Les irrecevables n'ont pas de dispositif ; certains amendements sont « effacés » (2 cas).
- Un compte rendu de séance couvre plusieurs points de l'ordre du jour (questions au Gouvernement, autres textes) : filtrer sur l'appel de l'ordre du jour, pas sur une simple mention du titre.
- Scrutin ↔ amendement : seulement par le numéro dans le titre du scrutin ; scrutin ↔ séance : `seanceRef`.
- Les espaces insécables (`\xa0`) sont omniprésents dans les dispositifs (« II.\xa0– ») : les regex doivent les accepter.
