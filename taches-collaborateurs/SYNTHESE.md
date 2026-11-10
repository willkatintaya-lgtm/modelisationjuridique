# Tâches des collaborateurs parlementaires : où un outil peut aider

*Synthèse de la recherche du 10 novembre 2026. Projet « Boussole des amendements », branche `claude/taches-collaborateurs`.*

**Fichiers de la recherche**
- `SYNTHESE.md` (ce fichier) : carte des tâches, classement des pistes, limites.
- `INVENTAIRE.md` : toutes les tâches par axe, sous forme de tableau.
- `inventaire-taches.csv` : le même inventaire en tableur, au schéma décrit dans `INVENTAIRE.md`.
- `notes/01` à `notes/07` : notes détaillées et sourcées de chaque axe.

---

## 0. En bref

1. **Le métier.** Un député dispose de 11 463 € par mois pour employer jusqu'à cinq collaborateurs. Environ 60 % travaillent en circonscription et 40 % au Palais Bourbon. Le métier est polyvalent : sur 239 offres d'emploi codées, la préparation et le suivi des travaux parlementaires apparaissent dans 118 offres. La création de contenus de communication en est très proche : 117 offres.
2. **L'usage de l'IA.** Les équipes l'utilisent déjà massivement, mais sans outil fourni par l'Assemblée : 85,4 % des répondants s'en servent, ChatGPT en tête (63,4 %). La confidentialité et les hallucinations sont les deux freins cités. Aucun outil n'est prévu pour les équipes de députés avant 2027.
3. **Les besoins exprimés** au groupe de travail de l'Assemblée recoupent presque mot pour mot le créneau de la Boussole :
   - « visualisation des modifications proposées par un amendement » ;
   - « placement de l'amendement » dans le texte ;
   - vérification de l'irrecevabilité et du gage ;
   - « synthèse et analyse des amendements déposés » ;
   - tableaux de « 100 à 200 amendements », jugés « humainement impossible[s] » dans le temps imparti.
4. **Les pistes les plus fortes** sont celles où il faut **comparer des textes**, **ne rien oublier** (délais, mesures d'application, relances) ou **retrouver** (précédents, positions passées). Les données y sont ouvertes et l'outil n'a pas à trancher à la place de l'élu.
5. **Les pistes les plus fragiles** sont celles où l'outil parlerait à la place du député : réponses aux administrés, discours, prédiction de vote présentée comme un score, génération de masse d'amendements.

**Les cinq pistes en tête du classement** (détail au § 4) :

| Rang | Piste |
|---|---|
| 1 | La Boussole branchée sur les données réelles : on applique les dispositifs des amendements au texte, on montre les concurrents et les identiques, on simule l'ordre d'appel et les amendements qui tombent. |
| 2 | Le pré-contrôle de forme et de recevabilité avant dépôt, avec recherche de précédents. |
| 3 | La veille législative personnalisée et explicable, avec le calcul des délais. |
| 4 | « Mes mesures en attente » : l'application des lois suivie au niveau de l'amendement, et la loi face au décret. |
| 5 | La fiche commune ou de déplacement en circonscription, faite de données ouvertes. |

Le carnet de dossiers de permanence et le tri du courrier ont le gain le plus élevé de tout l'inventaire. Ils sont pourtant classés juste après : ils exigent un hébergement maîtrisé et touchent des données sensibles.

---

## 1. Méthode, et ce qu'elle vaut

**Organisation.** Sept sous-agents ont mené en parallèle une recherche web sur un axe chacun :
1. circonscription ;
2. travail législatif ;
3. contrôle et évaluation ;
4. communication et presse ;
5. veille, documentation et parties prenantes ;
6. organisation du bureau et conditions d'emploi ;
7. outils et IA existants, en France et à l'étranger.

Chacun a écrit une note où chaque affirmation est marquée **[S]** (source lue, avec URL), **[I]** (inférence) ou par une variante signalant une source lue seulement en résumé ([S-r], [S-extrait], [V], [NV], [C]). Six agents d'extraction ont ensuite converti les inventaires en un CSV commun. L'orchestrateur a contrôlé et dédoublonné l'ensemble.

**Limite principale : le quota de recherche web.** Il était partagé entre les agents (200 requêtes) et s'est épuisé avant la fin de chaque axe. Chaque note liste en section 5 ce qui n'a pas pu être vérifié. Les manques principaux :
- les ouvrages de sociologie (Boelaert, Michon et Ollion, *Métier : député* ; Courty ; Beauvallet et Michon, *Dans l'ombre des élus*) : leur existence est attestée, leur contenu n'a pas été lu ;
- les enquêtes syndicales récentes ;
- le Sénat, moins documenté que l'Assemblée ;
- plusieurs outils étrangers.

**Contrôle croisé.** L'orchestrateur a téléchargé et relu lui-même les sources qui portent la synthèse.

| Source | Résultat |
|---|---|
| Fiche AN n° 11 (collaborateurs) | Confirmé : 11 463 €, cinq collaborateurs, « 60 % environ » en circonscription. |
| Fiche AN n° 7 (situation matérielle) | Confirmé : depuis 2026, l'avance de frais de mandat (AFM) et la dotation matérielle sont fusionnées en une **dotation de fonctionnement parlementaire** de 7 238,04 € par mois. |
| Rapport du groupe de travail IA de l'Assemblée (Bonnet et Masséglia, 22 mai 2026) | Confirmé : 518 réponses, dont 425 exploitables, sur 2 600 personnes ; 85,4 % d'utilisateurs ; reformulation 60,6 % ; synthèse documentaire 53,2 % ; ChatGPT 63,4 % ; synthèse des amendements en une phrase par LLM depuis octobre 2025, à 60 amendements par minute ; regroupement des identiques sur Eloi visé fin du premier semestre 2026 ; Copilot via le cloud « Bleu » pas avant fin 2027 ; amendements de séance de 83 868 (XVIe législature, au 31/12/2023) et 51 580 (XVIIe, au 31/12/2025). |
| Note Fondation Jean-Jaurès et Agora des collaborateurs (avril 2026) | Confirmé : 239 offres d'emploi ; 55 % des tâches (11 sur 20) automatisables à plus de 50 % ; tableau complet au § 2.3. |
| FedScoop, Congressional Research Service | Le taux de moins de 3 % de résultats conformes est confirmé, mais le test portait sur **environ 1 000 propositions de loi**, et non 3 000 résumés. Note 07 corrigée. |
| Business AM, Parlement européen | Le passage sur les amendements citant des lois inexistantes est attribué à des responsables parlementaires, pas à Roberta Metsola elle-même. Note 07 corrigée. |
| LLaMandement (dépôt DGFiP) | Non vérifiable : le dépôt est bloqué par une protection anti-robot. Le projet est connu par plusieurs articles de presse cités en notes 02 et 07. |

**Contradictions repérées et tranchées**
- **Nombre de répondants à l'enquête de l'Assemblée** : 363 selon la presse, 518 ou 425 selon le rapport. Le chiffre de 363 correspond aux réponses à la seule question sur les usages. Notes 02 et 07 corrigées.
- **Répartition entre Paris et la circonscription** : environ 60/40 selon la Fiche 11 (2026), 50/50 selon une statistique de l'Assemblée de 2023, 57 % ou 69 % en circonscription selon d'autres sources. On retient « une majorité en circonscription, environ 60 % ». Les écarts tiennent probablement aux définitions (contrats ou personnes, temps partagé).

**Ce qu'aucune source ne donne : le temps passé par tâche.** Aucune mesure française n'a été trouvée. Les fréquences et difficultés de l'inventaire sont donc des **estimations**, sauf mention contraire. Les seuls ordres de grandeur viennent de l'étranger : environ 1 300 dossiers par an pour un élu de circonscription écossais. Un journal de bord tenu une ou deux semaines par quelques collaborateurs serait la prochaine étape la plus utile (§ 6).

---

## 2. Carte des tâches

### 2.1 Deux populations, sept domaines

L'inventaire compte **304 tâches** :
- 52 en circonscription ;
- 64 de travail législatif ;
- 44 de contrôle et d'évaluation ;
- 50 de communication ;
- 44 de veille et de relations avec les parties prenantes ;
- 50 d'organisation du bureau.

Une dizaine de tâches se recoupent d'un axe à l'autre ; elles sont signalées dans `INVENTAIRE.md`. Dans le tableur, la colonne `pistes` rattache chaque tâche aux pistes du § 4. Elles se rangent en sept domaines. Chaque domaine existe des deux côtés, mais pas avec le même poids.

| Domaine | En circonscription (≈ 60 % des collaborateurs) | À Paris (≈ 40 %) |
|---|---|---|
| **Entrées** : ce qui arrive | Accueil, courrier et courriels des administrés, campagnes de masse, invitations, appels des élus locaux | Ordre du jour, dépôts, liasses d'amendements, sollicitations des représentants d'intérêts, demandes du groupe et de la presse |
| **Comprendre** | Qualifier une demande (quel organisme, quelle urgence), comprendre un dispositif local de financement | Lire un texte, son étude d'impact et l'avis du Conseil d'État ; reconstituer le droit modifié ; situer le texte dans la jurisprudence constitutionnelle |
| **Produire** | Courriers d'intervention, fiches de déplacement, discours locaux, lettre de mandat | Amendements, propositions de loi, questions écrites, notes, interventions en séance, rapports |
| **Relier** | Maires, intercommunalités, préfecture, associations, entreprises, presse locale | Groupe, administrateurs, ministères, lobbies, autres collaborateurs, journalistes nationaux |
| **Suivre** | Dossiers individuels et relances, engagements pris, subventions (DETR, DSIL, Fonds vert) | Navette, sort des amendements, décrets d'application, réponses aux questions écrites, recommandations des rapports |
| **Faire savoir** | Presse locale, réseaux sociaux, réunions publiques, bilan de mandat | Communiqués, clips de séance, réseaux sociaux, tribunes |
| **Faire tourner le bureau** | Permanence (horaires, sécurité), agenda local, fichier des contacts conforme à la CNIL | Agenda du député, présences, dotation de fonctionnement, crédit collaborateurs, déontologie, recrutement, coordination avec la circonscription |

### 2.2 Les tâches implicites

Ces tâches n'apparaissent dans aucune fiche de poste, mais toutes les notes les retrouvent. Ce sont souvent elles qui coûtent le plus.

| Tâche implicite | Où elle se joue | Ce qu'un outil peut faire, sans trancher |
|---|---|---|
| **Prioriser et trier** les sollicitations, les textes et les articles | partout | montrer volumes, échéances et liens avec les engagements ; ne pas classer à la place de l'élu |
| **Qualifier une demande** : est-ce du ressort du député, et de quel organisme ? | circonscription | base des circuits administratifs, suggestion d'organisme avec sa source |
| **Anticiper** une échéance, un pic de courrier, l'issue d'un vote | partout | alertes de délais ; votes passés sur des sujets voisins, présentés comme des faits et non comme une probabilité |
| **Retrouver un précédent** : amendement déjà jugé irrecevable, réponse ministérielle, dossier semblable | Paris et circonscription | recherche par similarité avec citation |
| **Tenir la cohérence** des positions du député dans le temps | Paris (et communication) | chronologie des votes, interventions et amendements par thème |
| **Choisir un repli** : quelle rédaction reste adoptable si la mienne tombe | Paris | comparaison des rédactions concurrentes, simulation de l'ordre d'appel |
| **Doser l'engagement** de l'élu : signer, se déplacer, intervenir ou non | circonscription | historique des visites et des engagements, équilibre territorial montré sans note |
| **Transmettre la mémoire** à la fin d'un contrat ou à la dissolution | partout | base d'équipe, dossiers et contacts documentés |
| **Arbitrer l'agenda** entre séance, commissions, groupe et circonscription | Paris et circonscription | conflits d'horaires, obligations de présence, options côte à côte |

### 2.3 Le seul chiffrage disponible du potentiel d'automatisation

Il vient de la note de la Fondation Jean-Jaurès et de l'Agora des collaborateurs (avril 2026), vérifiée sur le PDF. Ce sont des **estimations d'experts**, pas des mesures. Plusieurs ont été revues à la baisse en cours d'étude.

| Tâche (taxonomie de la Fondation) | Offres d'emploi qui la citent (sur 239) | Part automatisable estimée |
|---|---|---|
| Veille législative et politique | 116 | 80 % |
| Veille médiatique et numérique | 40 | 80 % |
| Secrétariat et traitement des sollicitations | 100 | 70 % |
| Gérer l'agenda | 89 | 70 % |
| Recherches et note de synthèse | 18 | 70 % (estimation initiale : 50 %) |
| Gestion comptable et budgétaire du mandat | 17 | 70 % |
| Administrer et modérer les supports numériques | 41 | 60 % |
| Analyser et synthétiser un projet de loi | 26 | 50 % |
| Créer des contenus de communication | 117 | 50 % (estimation initiale : 70 %) |
| Publications pour les réseaux sociaux | 86 | 50 % |
| Éléments d'une intervention orale | 47 | 50 % |
| Relations avec les journalistes | 69 | 40 % |
| Rédiger un amendement ou une proposition de loi | 64 | 40 % (jugé « critique » : suppose l'accès au système d'information) |
| Ressources humaines de l'équipe | 4 | 40 % |
| Coordonner l'équipe | 25 | 30 % |
| Organiser un événement ou un déplacement | 94 | 30 % |
| Préparer et suivre les travaux parlementaires | 118 | 30 % |
| Accompagner l'élu | 11 | 20 % |
| Réseau de partenaires | 45 | 20 % |
| Tenir la permanence | 31 | 20 % |

Lecture : ce tableau mesure ce qu'une IA générative pourrait **faire à la place** de l'humain. Notre question est un peu différente : ce qu'un outil (modèle, visualisation, simulation) peut faire **à côté** de l'humain. Deux tâches peu « automatisables » selon la Fondation sont précisément celles où une modélisation apporte le plus, parce que le jugement reste humain mais la matière est énorme et structurée :
- rédiger un amendement (40 %) ;
- suivre les travaux parlementaires (30 %).

---

## 3. Grille de classement

Le projet refuse les scores composites, et le classement les refuse aussi. Les pistes ne reçoivent pas de note globale. Elles sont décrites sur cinq critères, en mots, puis ordonnées par un jugement explicité :

- **Gain** : fréquence, temps et pénibilité de la tâche, et part que l'outil peut réellement prendre.
- **Données** : ouvertes, partiellement ouvertes, ou internes au bureau.
- **Faisabilité** : pour un prototype de quelques semaines (modèle Python et interface).
- **Risque** : confidentialité, déontologie, responsabilité politique, fiabilité.
- **Lien avec la Boussole** : réutilise-t-elle sa grammaire (texte de référence vierge, corrections apparentes, symétrie, loupe) ou son motif général, « une édition locale se propage dans un réseau de positions » ?

---

## 4. Classement des pistes

### 4.1 Tableau

| # | Piste | Tâches servies (notes) | Gain | Données | Faisabilité | Risque | Lien Boussole |
|---|---|---|---|---|---|---|---|
| **1** | **Boussole sur données réelles** : application des dispositifs au texte, concurrents, identiques, ordre d'appel et amendements « tombés » | 02 (8, 12, 14-15, 21, 25, 28-39) ; 07 (manques 1 à 3) ; 05 (piste 3) | très fort : par texte, sur des liasses de centaines d'amendements | ouvertes (open data de l'Assemblée et Tricoteuses pour les textes) | moyenne : il faut un analyseur des formules normalisées de la fiche n° 51 | faible si l'outil compare sans recommander | c'est la Boussole elle-même |
| **2** | **Pré-contrôle de forme et de recevabilité**, avec recherche de précédents | 02 (15-20, 26, 44-45) ; 07 (manque 5) | fort : chaque amendement, et chaque irrecevabilité coûte cher | partielles (mots-clés de la cellule article 40 publiés ; décisions passées en partie ouvertes) | moyenne | moyen : l'outil doit dire « risque », jamais « recevable » | le volet « mon amendement » |
| **3** | **Veille législative personnalisée et explicable**, avec calcul des délais de dépôt | 05 (1-7) ; 02 (1-3) ; 03 ; 04 (veille) | fort : quotidienne, potentiel estimé à 80 % | ouvertes (Assemblée, Sénat, JO, EUR-Lex) | élevée | faible | elle alimente la Boussole (quels textes, quels délais) |
| **4** | **« Mes mesures en attente »**, puis **loi et décret face à face** | 03 (1-8, 11, 14) ; 02 (48) | moyen à fort : rapport à six mois, questions écrites, contrôle | ouvertes (baromètre LexImpact sur data.gouv, Légifrance) | élevée pour les alertes, moyenne pour le face-à-face | faible | la Boussole prolongée dans le temps ; même grammaire visuelle |
| **5** | **Fiche commune ou fiche de déplacement** | 01 (21, 28, 34-35, 46) ; 05 (piste 5) | moyen : hebdomadaire, pour l'équipe la plus nombreuse | ouvertes (INSEE, DGCL DETR/DSIL, Fonds vert, répertoire des élus, RNA) | élevée | faible (pas de SIRENE ni d'état civil en communication politique) | matière papier, lecture thème par thème |
| **6** | **Carnet de dossiers de permanence et tri du courrier** | 01 (1-4, 11-18, 47-49) ; 06 (E1-E5) | **le plus fort** : quotidien, potentiel estimé à 70 % | internes et sensibles (santé, séjour) | moyenne | **élevé** : CNIL, confidentialité, réponses génériques mal reçues | indirect |
| **7** | **Mémoire du député** : positions, votes, interventions, cohérence | 05 (18, 22-23) ; 04 (40) ; 02 (43) | moyen à fort : besoin cité comme « très chronophage » | ouvertes pour l'essentiel | moyenne : recherche avec citation obligatoire | moyen : un contresens sur une position est coûteux | les « versions passées » du motif général |
| **8** | **Du cas individuel à la question écrite**, et suivi des questions écrites | 01 (19, 44, 47) ; 03 (10-13) | moyen | ouvertes pour les questions et réponses, internes pour les dossiers | moyenne | moyen : anonymisation, biais de sélection | le terrain qui se propage vers une position nationale |
| **9** | **Garde-fous de conformité** : dotation de fonctionnement et déontologie, calendrier électoral (article L. 52-1), crédit collaborateurs | 06 (C1-C3, D1, D8-D9, G2, G5) ; 04 (29, 41, 48-50) | moyen : 72 % des saisines du déontologue portent sur les frais | publiques (arrêtés du Bureau, rapports du déontologue, Code électoral) | élevée : règles et calculs, sans IA | faible : l'outil ne remplace pas une saisine | aucun |
| **10** | **Fiche « amendement → communication »** et clip de séance avec son contexte | 04 (7, 17, 22, 24-25, 40) | moyen : 117 offres sur 239 citent la communication | ouvertes (compte rendu intégral en XML, portail vidéo) | moyenne | moyen : uniformisation du discours, extraits hors contexte | la loupe pour le contexte ; prolonge le flux « confirmer, puis expliquer » |
| **11** | **Parties prenantes** : fiche d'acteur reliée au registre de la HATVP, comparateur des rédactions reçues de tiers | 05 (15, 27-31, 34, 39) ; 06 (G4) ; 02 (23) | moyen | ouvertes (registre HATVP), internes (rendez-vous) | moyenne | moyen : ne pas « blanchir » un texte de lobby, ne pas classer moralement les acteurs | fort : un texte reçu se compare aux amendements déposés |
| **12** | **Contrôle et évaluation** : atelier d'audition, registre des recommandations, séries budgétaires (projets et rapports annuels de performance) | 03 (18-22, 25, 27-37, 42) | moyen : ponctuel mais lourd | partielles | moyenne | moyen (secret des commissions d'enquête) | « qui a dit quoi », thème par thème |
| **13** | **Lois de finances** : module relié à LexImpact et OpenFisca | 02 (53-56) | fort en saison budgétaire, nul le reste de l'année | ouvertes en partie | faible à moyenne : dépend de LexImpact | moyen : incertitude sur les comportements | chiffres seulement là où ils ont un sens |
| **14** | **Tri des commentaires et dossier de menaces** | 04 (32-34) ; 06 (H1) | moyen, et protège les collaborateurs | accès aux API des plateformes incertain | moyenne | moyen : faux positifs, liberté d'expression | aucun |

### 4.2 Pourquoi cet ordre

**1. La Boussole sur données réelles.** C'est la piste où les quatre conditions se réunissent :
- le besoin est le premier cité par le rapport de l'Assemblée ;
- les données sont ouvertes : amendements et dispositifs dans l'open data de l'Assemblée, texte de la commission via Tricoteuses ;
- les formules de rédaction sont normalisées par la fiche n° 51 (« substituer aux mots… les mots… », « compléter par… »), donc analysables par des règles ;
- aucun outil existant ne la couvre. Éliasse donne la liste, LexImpact le chiffrage, La Fabrique de la loi l'historique ; l'outil interne de l'Assemblée regroupe les identiques pour les services, pas pour un groupe ; LLaMandement sert le Gouvernement.

La brique technique centrale est un **analyseur de dispositifs** : il applique chaque amendement au texte et produit la feuille en corrections apparentes. Il doit **signaler les cas qu'il ne sait pas appliquer** plutôt que deviner. La Fabrique de la loi rapportait environ 30 % d'échecs sur des textes mal structurés en 2014 ; la Comparative Print Suite de la Chambre des représentants renvoie une erreur plutôt que d'inventer un point d'insertion.

Viennent ensuite deux couches :
- la **simulation de l'ordre d'appel** : « si X est adopté, le mien tombe » ;
- les **identiques et discussions communes probables**.

Toutes deux prolongent le volet « les autres » sans casser la symétrie voulue.

**2. Le pré-contrôle.** Même matière que la piste 1, même public, mais le risque est plus élevé : la décision appartient au président de la commission des finances, ou de l'Assemblée pour l'article 45. L'outil doit afficher « risque d'irrecevabilité, voir tel précédent », jamais « recevable ». Les irrecevabilités financières en séance sont tombées de 16,4 % (2021-2022) à 7,3 % (2024-2025) : le gain marginal est réel mais pas illimité.

**3. La veille.** C'est la tâche la plus « automatisable » selon la Fondation, et la plus partagée : elle figure dans 116 offres sur 239. Les données sont ouvertes et déjà nettoyées par Tricoteuses, qui propose une API et deux serveurs MCP. Elle passe derrière les deux premières pour deux raisons :
- Contexte, Politico Pro, l'Agence parlementaire et les veilles de groupe occupent déjà le terrain ;
- elle ne prolonge pas directement la Boussole, même si elle l'alimente.

Sa valeur propre tient à deux choses : une veille **explicable** (« signalé parce que l'article L. 302-5 du code de la construction, que vous suivez, est modifié ») et le **calcul automatique des délais de dépôt** (troisième jour ouvrable à 17 h, avec les dérogations).

**4. « Mes mesures en attente ».** Toutes les données sont ouvertes : le baromètre de l'application des lois de LexImpact est sur data.gouv, avec une ligne par mesure et une mise à jour quotidienne. Le besoin est attesté : au Sénat, 66 % des mesures d'application étaient publiées au 31 mars 2026, et 27 % seulement dans les six mois selon le baromètre de l'Assemblée. Le lien manquant est précis : **amendement adopté → article de la loi → mesure attendue → décret**.

Le face-à-face entre la loi et son décret réutilise exactement la grammaire de la Boussole : la loi reste vierge, le décret est porté en corrections apparentes, la loupe montre les passages côte à côte. C'est le motif général du projet étendu dans le temps.

**5. La fiche commune.** Elle sert les collaborateurs de circonscription, majoritaires et oubliés par les outils pensés pour Paris. Elle repose presque entièrement sur des données ouvertes et ne pose presque aucun risque RGPD : les données publiques concernent des collectivités et des élus. Elle se prête bien à la « feuille de papier » de la direction artistique. Son gain unitaire est modeste, mais répété à chaque déplacement ou rendez-vous.

**6. Le carnet de permanence et le tri du courrier.** C'est le gain le plus fort de tout l'inventaire. Le secrétariat et les sollicitations figurent dans 100 offres sur 239, avec un potentiel estimé à 70 %. Environ 5 millions de courriels entrent chaque mois sur le réseau de l'Assemblée. Le rapport du groupe de travail signale aussi un « risque grave de sécurité » : des équipes redirigent leurs courriels vers des messageries externes pour les faire analyser par une IA.

Mais c'est aussi la piste la plus exposée :
- données de santé et de séjour ;
- recommandation n° 2012-020 de la CNIL ;
- réponses génériques qui font baisser la confiance (Kreps et Jakesch, 2023) ;
- avertissement d'un utilisateur cité par le rapport : « Si nous disons que les sollicitations des citoyens sont traitées par une IA, je pense que nous allons au-devant de grandes difficultés. »

Elle n'est faisable sérieusement qu'avec un **modèle local** ou un hébergement souverain, et une relecture humaine systématique. Elle vient en sixième position pour cette raison, pas pour un manque d'intérêt. Une première version sans modèle de langage, faite de règles, d'étiquettes, de regroupement des campagnes identiques et de relances, apporterait déjà beaucoup.

**7 à 14.** Ces pistes sont utiles mais plus étroites :
- leur saison est courte : lois de finances, contrôle ;
- ou leurs données sont incertaines : commentaires des réseaux sociaux ;
- ou leur risque d'uniformisation est élevé : communication ;
- ou un simple outil à règles, sans IA, suffit : conformité, crédit collaborateurs. Ces outils sont à faire, mais ce ne sont pas des sujets de modélisation.

### 4.3 Ce qu'il vaut mieux ne pas construire

- **Générer des amendements en masse ou des replis automatiques.** C'est le premier risque cité par les deux assemblées : saturation et obstruction. Le Sénat envisage d'interdire les automates de dépôt. La Boussole doit aider à **comprendre et comparer**, pas à multiplier les dépôts.
- **Présenter la prédiction d'un vote comme un score.** Montrer les votes passés sur des sujets voisins est un fait. Une probabilité agrégée, en l'absence de majorité absolue, serait fragile et pourrait devenir auto-réalisatrice.
- **Juger.** Pas de « détecteur de mensonge » en audition, pas de note par commune, pas de classement moral des représentants d'intérêts.
- **Répondre à la place de l'élu.** Discours et courriers personnalisés sont « relus et réécrits systématiquement pour conserver la "patte" de l'élu », selon le rapport de l'Assemblée. L'outil fournit la matière, sourcée ; il ne parle pas.
- **Faire une revue de presse générique.** Le marché est saturé (Onclusive, Visibrain) et les droits voisins de la presse posent problème. Seule la variante croisée avec l'ordre du jour a un intérêt propre.

---

## 5. Le motif général, vérifié sur l'inventaire

Le CLAUDE.md pose un motif plus large que les amendements : « une édition locale sur un objet se propage dans un réseau de positions (autres acteurs, versions passées) ». L'inventaire en donne au moins cinq instances indépendantes. C'est un argument pour construire une **grammaire commune** (texte de référence vierge, rédaction en corrections apparentes, loupe, regroupement par proposition) plutôt que des outils séparés.

| Édition locale | se propage vers | Axe | Piste |
|---|---|---|---|
| Mon amendement sur un alinéa | les amendements des autres groupes | législatif | 1 |
| Un amendement adopté | la mesure d'application attendue, le décret, la question écrite, le rapport à six mois | contrôle | 4 |
| Un cas individuel de permanence | un thème, une question écrite, un amendement | circonscription | 8 |
| Une rédaction reçue d'un lobby ou d'une ONG | les amendements déposés qui la reprennent | veille et parties prenantes | 11 |
| Une déclaration du député | ses positions et votes passés | communication | 7 |

---

## 6. Ce qui reste incertain, et comment le lever

1. **Le temps par tâche est inconnu.** Faire tenir un journal de bord d'une à deux semaines par cinq à dix collaborateurs, de circonscription et de Paris, de plusieurs groupes. C'est la seule façon de passer des estimations aux mesures.
2. **La fiche métier de l'accord collectif de 2018** (40 missions en 4 thématiques) n'a pas été trouvée en ligne. La demander aux syndicats (USCP, SNCP-FO, CFTC, CGT-CP, CFDT) ou à la Questure.
3. **Ouvrages de sociologie non lus** : *Métier : député* ; Beauvallet et Michon, *Dans l'ombre des élus* ; Courty ; Kerrouche (2009) sur les dossiers de permanence.
4. **Le Sénat est moins documenté** : crédit collaborateurs, répartition, outils. Les montants cités viennent de sources secondaires.
5. **Les outils commerciaux d'aide aux amendements** montrés au groupe de travail de l'Assemblée n'ont pas été identifiés. Ce sont les concurrents directs de la Boussole : à rechercher en priorité.
6. **L'accès des collaborateurs aux outils internes** n'est pas documenté : peuvent-ils déposer eux-mêmes sur Eloi ? Ont-ils accès à la synthèse des amendements par LLM, aujourd'hui réservée aux services ?
7. **Le texte de la charte IA de l'Assemblée** (juillet 2025, diffusée au personnel le 14 octobre 2025) n'a pas été lu en entier. Selon le rapport, elle ne vise que les personnels de l'Assemblée, pas les députés ni leurs collaborateurs.
8. **La qualité réelle des données ouvertes** (textes de Tricoteuses, jeux DETR/DSIL, baromètre LexImpact) n'a pas été testée. C'est la première chose à faire avant un prototype.
9. **Quota de recherche** : une seconde passe ciblée sur les points 2 à 5 compléterait utilement les notes.

---

## 7. Prochaine étape suggérée

Rester sur la piste 1, conformément au principe du CLAUDE.md (« le cas particulier d'abord ») :

1. télécharger, pour un vrai texte récent, le texte de la commission (Tricoteuses) et les amendements d'un article (open data de l'Assemblée) ;
2. écrire en Python l'analyseur des formules de la fiche n° 51 et mesurer sa part de dispositifs appliqués sans erreur ;
3. brancher le résultat sur `index.html` à la place des données fictives `OTHERS`. Les groupes réels posent la question de la règle « groupes fictifs » du CLAUDE.md : c'est à l'utilisateur de trancher.

Les pistes 4 et 8 réutiliseraient ensuite la même grammaire, appliquée aux décrets et aux questions écrites.
