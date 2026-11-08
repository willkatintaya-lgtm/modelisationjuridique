# Canal 1 — le matériau de l'Assemblée nationale (et autour)

Échantillon central : deux dossiers de la 17e législature, **narcotrafic** (navette complète, 2025) et **relance et décentralisation du logement** (dossier vivant : séance AN du 16 au 20 novembre 2026). L'exploration élargie couvre aussi l'archive AN complète (145 249 amendements, 657 séances, 9 759 scrutins), le Sénat, Tricoteuses, le code consolidé et l'aval (CC, JO), le direct, et des parlements étrangers (comme références de structures).

**Groupes politiques et personnes sont fictifs** dans tout le dépôt (`scripts/fictionnaliser.py` ; table de correspondance gardée hors dépôt). Textes, sorts, dates et organisations non partisanes sont réels. Exception : `explorations/ecosystemes.md` parle de parlements étrangers.

À lire dans l'ordre :
1. `04-synthese.md` — **commencer ici** : ce que l'exploration élargie corrige, chiffres de cadrage, carte des gisements, séquences fusionnées, fonctionnalités 26 à 48, pistes pour la fusion.
2. `01-observations.md` — premier passage sur les deux dossiers ; unités candidates.
3. `02-sequences-et-propositions.md` — séquences, découpages, fonctionnalités 1 à 25, questions ouvertes.
4. `explorations/*.md` — huit notes détaillées (accès exacts, chiffres, pièges, propositions) : `senat`, `tricoteuses`, `legifrance`, `an-global`, `an-seance`, `an-commission`, `logement-direct`, `ecosystemes`.
5. `03-sources-et-recette.md` — sources et recette du premier passage (les compléments sont dans chaque note d'exploration).
6. `00-precadrage.md` — pré-cadrage écrit avant d'ouvrir les données ; `pistes.md` — les pistes reçues.

`extraits/` — extraits JSON autoportants (fictionnalisés) pour la refonte, notamment :
- `logement-art4-commission.json` (article 4 réel : 30 → 25 alinéas, 143 amendements) et `logement-art4-passages.json` (62 passages disputés reconstruits) ;
- `an-commission-logement-art4-commission.json` (épisodes de commission de l'article 4), `an-commission-logement-commentaires.json` (synthèses d'articles du rapport) ;
- `senat-logement-article4.json` (même article au Sénat : 3 états, 79 amendements, provenance des 30 alinéas) ; `senat-provenance-*.json` ;
- `legifrance-cgi31-art4-applique.json` (l'art. 31 du CGI tel qu'il deviendrait), `legifrance-cgi31-versions.json`, `legifrance-narco-cmp-cc-jo.json` ;
- `narcotrafic-art2-seance.json`, `an-seance-narco-episodes.json`, `an-seance-narco-scrutins.json`, `an-seance-grammaire.json` ;
- `tricoteuses-*.json` (cycle de vie, irrecevables retrouvés, rectifications, redépôts) ; `logement-direct-instantane.json` ;
- `an-global-*.json` (statistiques de législature) ; `ecosystemes-*.json` (PE, Westminster, Congrès, Fabrique de la Loi).

`scripts/` — Python standard ; préfixe = exploration d'origine. `resultats/` — sorties brutes.
