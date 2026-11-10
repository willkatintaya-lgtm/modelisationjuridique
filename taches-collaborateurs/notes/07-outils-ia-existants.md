# 07 — État de l'art : outils et IA dans les parlements (France et étranger)

*Note de recherche, 10 novembre 2026. Contexte : projet « Boussole des amendements ».*

**Conventions.**
- **[S]** = sourcé (URL donnée juste après).
- **[I]** = inféré : mon analyse, non affirmée par une source.
- **[NV]** = non vérifié dans cette session. Le budget de recherche web partagé a été épuisé avant la fin. Ces points sont à revérifier avant tout usage.
- Les chiffres viennent de la presse ou des institutions elles-mêmes (autodéclarés), sauf mention contraire.

---

## 1. Panorama France

### 1.1 Assemblée nationale

**Constat d'ensemble (2026).**
- [S] L'IA est déjà massivement utilisée par les équipes, sans outil institutionnel. Un rapport des députés Denis Masséglia (EPR) et Nicolas Bonnet (Écologiste) a été rendu public le 17 juin 2026. Il repose sur un questionnaire (518 réponses, dont 425 exploitables, sur 2 600 personnes ; 363 réponses à la question sur les usages) et une quinzaine d'entretiens. *[Vérifié par l'orchestrateur le 10/11/2026 sur le PDF : 518 réponses, dont 425 exploitables, sur 2 600 personnes ; « 363 » est le nombre de réponses à la seule question sur les usages.]* Les trois usages majoritaires sont la reformulation de courriers, la synthèse documentaire et la recherche web. ChatGPT est utilisé quotidiennement par plus de 60 % des répondants ; Mistral arrive en deuxième position, à moins de 20 %. Le rapport signale un « gros risque de fuite de données ». Aucune licence d'IA générative sécurisée n'est prévue pour tous, pour raisons budgétaires. — https://acteurspublics.fr/articles/lassemblee-nationale-cherche-son-modele-dintelligence-artificielle/
- [S] **Outil « amendements » en préparation.** Plusieurs éditeurs ont été auditionnés et un cahier des charges est en cours. Une collaboration avec le Sénat n'est pas exclue. Un appel d'offres est possible, pour un déploiement « courant 2027 ». Aucun marché n'est attribué à ce jour. — même source.
- [S] Une dépêche AFP reprise par la presse parle d'un outil de classement des amendements déjà développé, d'un « assistant légistique » et d'un futur appel d'offres pour « mieux visualiser l'impact des amendements » (annonce de D. Masséglia). Je n'ai pu lire l'article qu'à travers le résumé du moteur de recherche (page en erreur 503) : à confirmer. — https://www.boursedirect.fr/fr/actualites/categorie/economie-et-finances/au-parlement-l-ia-fera-t-elle-bientot-la-loi-afp-23cc465dcdd7fcbcd26a8d1ef2a34617ea3f23f6
- [S] **Charte.** Une « Charte d'utilisation des systèmes d'IA » a été adoptée par le collège des questeurs en juillet 2025. Elle était peu connue des personnes interrogées début 2026. — https://www.jean-jaures.org/publication/une-feuille-de-route-pour-integrer-lia-au-travail-parlementaire/ (texte de la charte non consulté [NV]).
- [S] **Note de la Fondation Jean-Jaurès et de l'Agora des collaborateurs (27 avril 2026).**
  - Méthode : analyse de 239 offres d'emploi de collaborateurs (AN, Sénat, PE).
  - Résultats : 55 % des tâches sont automatisables à plus de 50 % ; la veille l'est à environ 80 % ; le suivi des travaux parlementaires est classé « critique », car il exige l'accès au système d'information.
  - Enquête interne AN (février-mars 2026, formulation de la Fondation : « plus de 518 assistants » ; d'après le rapport GT IA, il s'agit de 518 réponses de députés et collaborateurs, dont 425 exploitables) : la moitié utilise l'IA chaque jour, un tiers au moins chaque semaine.
  - Recommandations : « Encadrer, outiller, intégrer », avec une plateforme supervisée et un suivi avancé des amendements, dont l'historique des propositions similaires. La note met aussi en garde contre l'« industrialisation des amendements ».
  - Sources : https://www.jean-jaures.org/publication/une-feuille-de-route-pour-integrer-lia-au-travail-parlementaire/ ; https://lcp.fr/actualites/l-intelligence-artificielle-deja-largement-utilisee-a-l-assemblee-mais-sans-cadre ; https://acteurspublics.fr/articles/plus-de-la-moitie-des-taches-parlementaires-sont-automatisables-selon-la-fondation-jean-jaures/
- [S] Selon Public Sénat (27 avril 2026), « aucune grande assemblée française » ne propose d'outil d'IA intégré, sécurisé et supervisé. — https://www.publicsenat.fr/actualites/parlementaire/comment-lia-sintegre-au-travail-parlementaire/

**Outils métier existants.**
- [S] **Éloi** : application officielle et obligatoire de dépôt des amendements (aucun dépôt par courriel). Elle est accessible sur le réseau AN ou par le portail. — https://ressources-ext.assemblee-nationale.fr/web/eLoi/pdf/eLoi_guide-utilisation-auteurs.pdf
- **Éliasse** (suivi en temps réel des amendements en séance) et **dérouleur** de séance :
  - [S] Ils sont cités comme sources « temps réel » moissonnées par Tricoteuses et ajoutées à la base Canutes. — https://hackathon2026.assemblee-nationale.fr/supports-conferences/EmmanuelRAVIART_presentation_des_ressources.pdf
  - [NV] Fonctionnalités internes détaillées non documentées publiquement dans ce que j'ai lu.
- [S] **LexImpact** : cellule de l'AN, rattachée à la direction du contrôle et de l'évaluation. Logiciels libres, forge https://git.leximpact.dev/leximpact. — https://leximpact.an.fr/ ; https://next.ink/brief-article/lassemblee-nationale-pousse-leximpact-logiciel-libre-de-simulation-fiscale/
  - Simulateur socio-fiscal, sur OpenFisca, avec une variante budgétaire : https://socio-fiscal.leximpact.an.fr/accueil
  - Simulateur des dotations communales : https://dotations.leximpact.an.fr
  - Baromètre de l'application des lois : https://www.assemblee-nationale.fr/dyn/taux-application-lois
  - DataCirco, données par circonscription : https://datacirco.leximpact.an.fr/
  - [NV] Simulateur « cotisations » distinct : non retrouvé comme outil séparé sur la page d'accueil. Les cotisations sont couvertes par le simulateur socio-fiscal.
- [S] **Open data** : https://data.assemblee-nationale.fr/
  - Contenu : députés, organes, amendements, votes, réunions, comptes rendus, dossiers législatifs, questions.
  - Formats : XML, JSON (et CSV).
  - Limite : les textes eux-mêmes (projets et propositions de loi, rapports) y **manquent**.
  - Il existe aussi un fichier XML par amendement, par exemple https://www.assemblee-nationale.fr/dyn/opendata/AMANR5L17PO838901BTC2123P0D1N000008.xml
  - Source : présentation des ressources du hackathon 2026, citée plus haut.
- [S] **Hackathon de l'AN, 3-4 juillet 2026**, « Le parcours de la loi : vers une IA de confiance ». Défis : Webmcp-AN (pages AN exposées aux agents IA), « trame hypertexte » de la séance, croisement activité parlementaire / représentants d'intérêts (HATVP), Compar:IA juridique, ParlementClair (résumés LLM des rapports), « La loi et le territoire ». Lauréats non trouvés [NV]. — https://hackathon2026.assemblee-nationale.fr/

### 1.2 Sénat
- [S] **Ameli** : base des amendements, en commission depuis octobre 2010 et en séance depuis octobre 2001. Elle est diffusée sur data.senat.fr avec les auteurs, le dispositif, l'objet et le sort. Format : dump PostgreSQL 8.4, jugé « ancien ». Autres jeux : Monalisa (textes en Akoma Ntoso XML depuis décembre 2019), Dosleg, questions, comptes rendus. — https://data.senat.fr/ ; https://hackathon2026.assemblee-nationale.fr/supports-conferences/EmmanuelRAVIART_presentation_des_ressources.pdf
- [S] **Amendements du PLF.** Les services utilisent une IA générative open source de la DGFiP, LLaMandement ou sa dérivée, pour le référencement des amendements et la rédaction d'avis. Selon la sénatrice S. Vermeillet, cela prend environ 15 minutes contre 6 à 10 heures auparavant. Le travail a été engagé en avril 2024. — https://www.publicsenat.fr/actualites/parlementaire/comment-lia-sintegre-au-travail-parlementaire/ ; https://www.publicsenat.fr/actualites/parlementaire/budget-lintelligence-artificielle-pourrait-simplifier-le-traitement-des-amendements-au-senat
- [S] **Aide à la révision légistique des amendements** : en expérimentation ; elle propose des ajustements selon les règles du droit parlementaire. — mêmes sources Public Sénat (2026) et Fondation Jean-Jaurès.
- [S] Accès à Mistral testé pour 100 collaborateurs ; aucune IA intégrée au système d'information. Une charte existe pour les personnels, et un document pour les collaborateurs est en préparation. — https://acteurspublics.fr/articles/plus-de-la-moitie-des-taches-parlementaires-sont-automatisables-selon-la-fondation-jean-jaures/ ; note Jean-Jaurès.
- [S] **Comptes rendus** : partenariat d'innovation (fin 2023) pour la transcription par IA générative ; deuxième phase de test autorisée par les questeurs en juillet 2024 (résumé de recherche). — https://acteurspublics.fr/articles/au-senat-les-balbutiements-de-lia-generative-pour-retranscrire-les-debats/
- [S] **Délégation sénatoriale à la prospective** : programme 2024 sur l'IA et l'avenir du service public, sous forme de mini-rapports thématiques. C'est lors de ces auditions que S. Vermeillet a découvert LLaMandement. — https://www.actuia.com/actualite/lia-et-lavenir-du-service-public-programme-de-travail-2024-de-la-delegation-a-la-prospective-du-senat/ ; Public Sénat (2024). Liste exhaustive des rapports [NV].
- [NV] « Senat'Data » comme marque distincte : non retrouvé ; data.senat.fr est le portail.

### 1.3 État (Gouvernement, DILA, DINUM)

**LLaMandement (DGFiP), cas à étudier en détail.**
- [S] **Ce que c'est.** Un modèle Llama 2 (Meta) affiné par la DGFiP, avec l'appui de la DILA et de la DINUM, pour **résumer de façon neutre** les amendements et appuyer la chaîne de traitement côté Gouvernement : fiches de banc, réunions interministérielles. — https://arxiv.org/abs/2401.16182 (Gesnouin et al., janvier 2024, 28 auteurs, CC BY 4.0)
- [S] **Chaîne de traitement.**
  1. Attribution de chaque amendement à l'administration compétente.
  2. Recherche des amendements similaires et des réponses passées.
  3. Résumé.
  4. Projet de fiche de banc pour le ministre.
  - Les données d'apprentissage viennent de **SIGNALE**, application de la DILA utilisée par les ministères depuis 2020 pour traiter les amendements : PLF 2023, LPM 2024-2030, loi d'accélération du nucléaire. — https://acteurspublics.fr/articles/a-la-dgfip-la-preparation-du-debat-parlementaire-se-fait-grace-a-lia-generative/ (13 février 2024)
- [S] **Chiffres (PLF 2024, autodéclarés).**
  - Plus de 10 000 amendements traités.
  - 94 % des 5 367 amendements de première lecture à l'AN attribués en environ 10 minutes, avec 5 à 10 % d'erreurs.
  - Résumés de toute la lecture en environ 15 minutes.
  - 15 397 paires amendement/résumé pour l'entraînement.
  - Contexte de volume : environ 10 000 amendements en 2016-2017 et environ 80 000 en 2019-2020.
  - Sources : même source ; https://www.publicsenat.fr/actualites/parlementaire/budget-lintelligence-artificielle-pourrait-simplifier-le-traitement-des-amendements-au-senat
- [S] **Ouverture.** Modèles et données publiés.
  - Hugging Face : `AgentPublic/LlaMAndement-7b`, licence Llama 2 Community, gabarit de prompt Alpaca. — https://huggingface.co/AgentPublic/LlaMAndement-7b/raw/main/README.md
  - Code : https://gitlab.adullact.net/dgfip/projets-ia/llamandement
  - L'article mentionne aussi une version 13B (`ActeurPublic/LlaMAndement-13b`, selon un résumé secondaire). Les tailles exactes sont à vérifier dans le PDF.
- [S] **Limites signalées.** Erreurs d'attribution de 5 à 10 % ; biais proches de ceux de Llama selon l'article (résumé secondaire). Le rapporteur général du Sénat doute d'un gain de temps important. — Public Sénat (2024).
- [I] **Pour notre projet.** LLaMandement sert le **Gouvernement**, pas les collaborateurs de groupe. Il résume et route ; il ne compare pas les rédactions concurrentes et ne montre pas l'effet sur l'article consolidé. Il fournit en revanche un jeu de 15 000 paires réutilisable pour des résumés neutres, et une preuve que la recherche de similarité entre amendements est un besoin réel.

**Albert (DINUM).**
- [S] IA générative souveraine de l'État. L'API Albert, socle de dizaines de projets, permet de brancher divers modèles, dont Mistral. Le chatbot n'est pas généralisé « dans sa forme actuelle » (janvier 2026). L'assistant pour agents est expérimenté auprès de 10 000 agents jusqu'en juin 2026. — https://acteurspublics.fr/articles/de-chatbot-experimental-a-socle-interministeriel-pour-lia-de-letat-le-parcours-dalbert-ia/ ; https://www.weka.fr/actualite/administration/article/albert-l-outil-d-ia-generative-experimente-a-france-services-ne-sera-pas-generalise-209194/
- [S] Aucune source trouvée sur un usage d'Albert par le Parlement.

**Autres briques publiques.**
- [S] **compar:IA** (arène gouvernementale de comparaison de LLM en français) : 104 modèles au 7 février 2026. Ce n'est pas un benchmark juridique. — https://arxiv.org/html/2602.06669
- [S] **Légifrance / DILA** :
  - Open data XML (JO, textes consolidés) : https://echanges.dila.gouv.fr/OPENDATA/
  - Base LEGI : https://www.data.gouv.fr/datasets/legi-codes-lois-et-reglements-consolides
  - API par PISTE (OAuth), avec le client Python `pylegifrance` : https://pylegifrance.github.io/pylegifrance/en/concepts/cid-and-versioning/
- [S] **OpenFisca** : moteur libre (AGPL) de microsimulation socio-fiscale, base de LexImpact. — https://openfisca.org/fr/ ; https://interoperable-europe.ec.europa.eu/collection/joinup/solution/openfisca
- [NV] Etalab, Code du travail numérique, Légistix (outil de légistique du SGG) : non vérifiés dans cette session.

### 1.4 Civic tech
- [S] **Tricoteuses** (E. Raviart et al., AGPL-3.0). C'est la ressource la plus utile pour un prototype. — https://www.tricoteuses.fr/ ; https://www.npmjs.com/package/%40tricoteuses%2Fassemblee ; présentation du hackathon citée plus haut. Contenu :
  - données AN nettoyées en JSON sous Git (https://git.en-root.org/tricoteuses/data/assemblee-nettoye) ;
  - données Sénat converties en JSON (https://git.tricoteuses.fr/senat) ;
  - DILA, codes et Constitution sous Git (https://git.tricoteuses.fr/dila, https://git.tricoteuses.fr/codes) ;
  - schémas JSON (https://www.tricoteuses.fr/assemblee/schemas) ;
  - base PostgreSQL unifiée « Canutes », avec dumps hebdomadaires (https://dump.tricoteuses.fr/) ;
  - API Parlement (https://parlement.tricoteuses.fr/docs) et API PostgREST (https://db.code4code.eu/canutes/) ;
  - deux serveurs MCP : Parlement (https://www.tricoteuses.fr/services/mcp-parlement) et Moulineuse, qui exécute SQL et JavaScript (https://www.tricoteuses.fr/services/mcp-moulineuse).
  - Les textes AN, le dérouleur, Éliasse et les scrutins sont moissonnés en temps réel.
- [S] **La Fabrique de la loi** (médialab et CEE de Sciences Po, Regards Citoyens ; lancée en 2011 avec un financement PICRI). Visualisation de l'évolution des textes et des amendements, plus de 800 lois. Mises à jour irrégulières selon les sources. — https://www.regardscitoyens.org/category/picri/ ; https://influencemapping.github.io/toolbox/casestudies/la_fabrique_de_la_loi.html
- [S] **Datan** (bénévole, depuis juillet 2020, GPL-3.0) : votes et comportements des députés, jeux hebdomadaires sur data.gouv.fr. Site actif en 2026. — https://datan.fr/a-propos ; https://github.com/datanfr
- [S] **NosParlementaires** : plateforme de suivi (votes, amendements, questions), dumps quotidiens, API, Licence Ouverte 2.0. — https://www.data.gouv.fr/organizations/nos-parlementaires
- [NV] Statut actuel de NosDéputés.fr : la page renvoyait une erreur 503 lors de ma consultation.
- [S] **Archéo Lex** : codes LEGI en Markdown, versionnés sous Git. — https://www.data.gouv.fr/reuses/archeo-lex-histoire-de-la-loi-francaise
- [S] **DuraLex** (Legilibre, AGPL-3.0, Python) : « compilateur » de projets de loi. Il transforme un texte en français juridique en JSON sémantique : articles, éditions add/remove/replace, références. Il sert de backend à SedLex. Activité récente non confirmée. — https://github.com/Legilibre/DuraLex
- [I] Les modes « rédiger / compléter / supprimer » de notre prototype correspondent aux opérations d'édition de DuraLex.
- [NV] Parlement & Citoyens, Make.org : non vérifiés.

### 1.5 Legaltech et veille
- [S] **Doctrine** a racheté **Predictice** (2025), puis l'espagnol Maite (février 2026). — https://app.mergerlinks.com/transactions/2025-09-17-predictice ; https://www.pulse.bot/legal/news/doctrine-buys-spains-maite-in-pan-european-move-b1335cbe-88a1-4f98-be0a-5289e3b1d691/
- [S] **Lefebvre Dalloz GenIA-L** (annoncé en janvier 2024) : IA générative alimentée par les fonds éditoriaux maison ; GenIA-L Assistant et GenIA-L for Search ; partenariat avec le Barreau de Paris. — https://www.actuia.com/actualite/ia-generative-et-droit-lefebvre-dalloz-annonce-le-lancement-de-genia-l/ ; https://www.lemondedudroit.fr/institutions/94983-le-barreau-de-paris-et-lefebvre-dalloz-s-allient-pour-democratiser-l-ia-juridique.html
- [S] **Lexis+ AI** (LexisNexis France) : recherche conversationnelle, rédaction, synthèse. — https://www.actuia.com/actualite/lexisnexis-france-presente-lexis-ai-un-assistant-dia-generative-dedie-aux-professionnels-du-droit/
- [S] **Pappers Politique** : veille institutionnelle avec alertes par thème, briefings générés par IA, onglet amendements avec suivi, « cartographie des parlementaires à contacter ». — https://politique.pappers.fr/fonctionnalites
- [NV] Jus Mundi, Contexte, Politico Pro, Agence parlementaire, Pluricité, Eurogroup : fonctions IA non vérifiées.
- [I] Ces outils servent le droit positif (jurisprudence, codes) ou la veille des représentants d'intérêts. Aucun ne cible la **comparaison des amendements concurrents** du point de vue d'un groupe.

---

## 2. Panorama étranger

### 2.1 Union interparlementaire (UIP)
- [S] **World e-Parliament Report 2024** : 115 chambres dans 86 pays. Près d'un tiers des parlements utilisent l'IA au quotidien ; 68 % ont une stratégie numérique pluriannuelle ; la fracture numérique se creuse. — https://www.ipu.org/news/press-releases/2024-10/new-ipu-report-parliaments-embrace-technology-digital-divide-persists
- [S] **Lignes directrices UIP sur l'IA dans les parlements** (décembre 2024), élaborées par le Centre for Innovation in Parliament (CIP) après un atelier à Brasília en avril 2024. Elles s'accompagnent de plus de 40 cas d'usage (Brésil, Estonie, PE, Finlande, Israël…). Un « AI Maturity Framework » a suivi en novembre 2025. — https://www.ipu.org/resources/publications/reference/2024-12/guidelines-ai-in-parliaments ; https://www.ipu.org/news/press-releases/2024-12/new-ipu-tools-harness-potential-ai-in-parliament ; https://www.ipu.org/news/news-in-brief/2025-11/new-ipu-framework-parliaments-develop-ai
- [NV] Contenu détaillé des lignes directrices : pages ipu.org en erreur 403 lors de la consultation.

### 2.2 Brésil (Câmara dos Deputados), référence mondiale
- [S] **Ulysses**, lancé le 28 novembre 2018 : suite de modules d'IA. — https://www.camara.leg.br/noticias/548730-camara-lanca-ulysses-robo-digital-que-articula-dados-legislativos/ ; https://apolitical.co/en/navigator/case-studies/brazil-how-the-chamber-of-deputies-uses-ai-across-high-volume-legislative-tasks ; https://oecd.ai/en/dashboards/policy-initiatives/ulysses-legislative-demand-router
  - routage des demandes des députés vers la Consultoria Legislativa (22 domaines, plus de 20 000 demandes par an) ;
  - recherche d'études et propositions similaires ;
  - **analyse des amendements** : rattachement au bon point du texte et **regroupement des amendements qui se recoupent** ;
  - **regroupement par argument des commentaires citoyens** recueillis par sondages en ligne ;
  - transcription relue par un humain ; thématisation du portail ;
  - depuis 2025, Ulysses Chat (règlement intérieur), accès du personnel à Claude, Gemini et GPT, signalement de conflits constitutionnels possibles.
- [S] Politique de gouvernance de l'IA : Ato da Mesa n° 225 (15 décembre 2025) et Portaria n° 227 (23 décembre 2025). — https://www2.camara.leg.br/legin/int/portar/2025/portaria-227-23-dezembro-2025-798596-publicacaooriginal-177616-cd-dg.html
- [S] Gains d'efficacité **non mesurés ni publiés**. — Apolitical, même source.
- [S] Le CIP de l'UIP héberge un « Parliamentary Data Science Hub » animé par la Câmara. — page des lignes directrices UIP citée plus haut.

### 2.3 Italie
- [S] **Camera dei deputati** : projets présentés le 9 juillet 2025, budget de 438 000 € voté par les questeurs. — https://pagellapolitica.it/articoli/camera-costi-progetti-intelligenza-artificiale-deputati
  - **MSE, « Macchina scrittura emendamenti »** : chatbot d'aide à la rédaction d'amendements. Il croise les demandes de modification avec les suggestions issues des auditions d'experts. Développé par Alma Human AI (Université de Bologne), avec LUISS, CNR, Vérone et Turin. Expérimental pour les groupes ; pleine opération visée fin 2025.
  - **NORMA** : assistant sur la production législative.
  - **DEPUCHAT** : chatbot citoyen sur l'activité des députés.
  - La Camera utilise déjà l'IA pour **créer et ordonner les fascicules d'amendements**.
  - Statut fin 2026 [NV].
- [S] Le Sénat italien utilise l'IA pour gérer les amendements (récit UIP « How AI helps Italian Senate manage amendments »). Contenu non lu (erreur 403) [NV]. — https://www.ipu.org/innovation-tracker/story/how-ai-helps-italian-senate-manage-amendments

### 2.4 Parlement européen
- [S] **AT4AM** : éditeur web d'amendements en XML, utilisé depuis 2010. Publié en open source sous le nom « AT4AM for All » (EUPL, 2012-2013, Akoma Ntoso). Maintenance actuelle [NV]. — https://interoperable-europe.ec.europa.eu/collection/justice-law-and-security/solution/at4am-all ; https://publicadministration.un.org/parliaments/news/id/1/at4am-for-all-the-web-editor-for-amending-legislation-of-the-european-parliament-is-released-in-open-source
- [S] **Archibot / « Ask the EP Archives »** : RAG sur Claude (Amazon Bedrock) ; index de plus de 100 000 documents d'archives (1952-1994) ; réponses multilingues avec citations. — https://historicalarchives.europarl.europa.eu/home/cultural-heritage-collections/news/ai-dashboard.html ; https://claude.com/customers/european-parliament
- [S] **EPGenAI Hub** (annoncé en juillet 2026, déploiement visé dès septembre 2026) : plateforme interne. Modèles hébergés en interne (Llama, GPT-OSS, Mistral Small) ou externes (ChatGPT, Claude Sonnet), au choix selon la sensibilité. Environ 2 100 personnes, soit environ 20 % du personnel, utilisent l'IA chaque jour. — https://thenextweb.com/news/european-parliament-epgenai-hub-ai-platform-meps
- [S] Fonctions IA intégrées aux tablettes désactivées (février 2026). — https://www.techradar.com/pro/eu-parliament-bans-ai-use-on-government-work-devices
- [S] **Mise en garde de R. Metsola** (article du 6 novembre 2026 ; date de la réunion non précisée) contre l'IA comme substitut au processus législatif. Selon des responsables parlementaires cités par l'article (et non Metsola elle-même), les amendements rédigés par IA augmentent, et certains citent des textes législatifs **inexistants**. Un député a reçu un conseil juridique erroné ; il a fallu deux jours aux experts pour le corriger. Le personnel doit déclarer l'usage de l'IA depuis 2024, mais pas les eurodéputés. Une réforme du règlement est envisagée. — https://fr.businessam.be/?p=295833
- [S] EPRS : modèle de classification automatique par domaine politique (présentation de 2023). — https://site.unibo.it/hypermodelex/en/agenda/ai4legs-second-edition-2023-ai-for-legislation-1/05-ai-eu-parliaments-dgeprs.pdf/@@download/file/05.AI-EU-Parliaments-DGEPRS.pdf

### 2.5 États-Unis
- [S] **Comparative Print Suite** (Clerk de la Chambre, issu des règles « Posey ») :
  - fonctions : « How a Bill Changes Current Law », « Bill to Bill Differences », « How an Amendment Changes a Bill », Bill Viewer ;
  - version complète présentée le 11 juin 2026, ouverte à tous les membres et utilisée par le CRS ; pilote d'environ 80 agents au Sénat ; non publique ;
  - décrit comme « probablement le premier outil à IA développé au sein de la Chambre ».
  - Sources : https://congressionaldata.org/?p=1251 ; https://usgpo.github.io/innovation/resources/reports/Clerk-QR16-Comparative-Print-Project.pdf
  - [S] Il **renvoie une erreur quand il ne trouve pas où insérer une modification**, ce qui prévient l'hallucination. — https://engadget.com/2238945/ai-generated-bills-causing-problems-in-the-capitol
- [S] **CRS** :
  - TAP 2.0 (Text Analysis Program) retrouve les textes similaires d'un Congrès à l'autre, depuis le 113e. — https://congressionaldata.org/?p=1251
  - Test de résumés par LLM (audition du 25 juin 2026) : 6 modèles testés sur deux ans sur environ 1 000 propositions de loi, **moins de 3 % des résultats conformes** aux standards. La priorité va désormais à la décomposition du flux de travail ; demande budgétaire de 3,5 M$. — https://fedscoop.com/crs-tried-to-use-ai-but-less-than-3-of-results-met-their-standards/ ; https://cha.house.gov/2026/6/top-takeaways-from-full-committee-hearing-on-the-congressional-research-service-and-ai
- [S] **Office of Legislative Counsel** (Politico, 17 août 2026) : les propositions de loi rédigées par IA arrivent avec des termes erronés, de fausses citations et des confusions (crédit d'impôt contre déduction ; « State » limité aux 50 États). Les juristes passent plus de temps à corriger qu'à rédiger. — https://engadget.com/2238945/ai-generated-bills-causing-problems-in-the-capitol
- [S] **Politique IA de la Chambre** (HITPOL 8, CAO, 2024) : le CAO évalue les outils et la commission de l'administration les approuve par cas d'usage. Outils autorisés sous conditions : ChatGPT, Gemini, Copilot, puis Claude Pro et ChatGPT Pro ; jamais de données sensibles ni de données personnelles d'administrés. — https://fedscoop.com/?p=87019 ; https://rollcall.com/2026/04/28/congress-has-been-slow-on-ai-this-staffer-tried-his-own-thing/ ; https://www.axios.com/2025/09/17/microsoft-ai-house-of-representatives
- [S] **Sénat américain** (mémo du SAA, mars 2026) : ChatGPT Enterprise ou Gemini, plus Copilot dans M365 Gouvernement ; Claude n'est pas sur la liste. — https://www.spokesman.com/stories/2026/mar/10/chatgpt-other-chatbots-approved-for-official-use-i
- [S] Commission de l'administration : série de « flash reports » IA (2023-2024). — https://cha.house.gov/2024/10/committee-on-house-administration-releases-october-2024-artificial-intelligence-flash-report
- [S] Les 202 recommandations de la Select Committee on Modernization ne mentionnent l'IA qu'une fois. — https://ctse.aei.org/can-congress-use-ai/ (résumé de recherche)
- [S] **POPVOX Foundation** : guide de terrain IA pour les équipes, formations, guide des GPT personnalisés. — https://futureproofingcongress.substack.com/p/future-proofing-congress-next-steps
- [S] **Privé** :
  - **Quorum Copilot** : résumés et analyse de textes. — https://www.quorum.us/products/copilot
  - **FiscalNote PolicyNote** : prévision d'adoption (juin 2025), textes similaires, comparaison de textes (octobre 2025), précision non publiée. — https://www.businesswire.com/news/home/20250612678578/en/FiscalNote-Accelerates-AI-Innovation-with-New-Enhancements-to-PolicyNote-for-Legislative-Forecasting-Alerts-and-Bill-Discovery ; https://www.businesswire.com/news/home/20251016380655/en/fiscalnote-introduces-ai-powered-bill-comparison-in-policynote/
  - **Fireside** (FiscalNote, gestion de la relation avec les administrés, tri par IA). — https://www.businesswire.com/news/home/20240806374973/en/FiscalNote-Announces-New-AI-powered-Enhancements-for-Fireside---the-Industry-leading-All-in-one-Constituent-Relationship-Management-SaaS-Platform
  - **Indigov** (gestion des administrés, désormais Granicus). — https://indigov.com/solutions
- [NV] « Senate Comparison Tool », API Congress.gov (https://api.congress.gov/, URL connue mais non revérifiée), LegiScan, NationBuilder, IQ : non vérifiés.

### 2.6 Royaume-Uni
- [S] Pilote M365 Copilot (députés et personnel) terminé en novembre 2025, non déployé en production. — https://parallelparliament.co.uk/question/88200/house-of-commons-artificial-intelligence ; https://www.computing.co.uk/news/4326718/parliament-trial-microsoft-copilot-mps-lobby-ai
- [S] **Questions écrites** (juin 2026) : une fonction IA ajoutée à l'outil EQM du Table Office signale les questions similaires à au moins 80 % à des questions déjà posées ; les agents tranchent. — https://www.publictechnology.net/2026/06/02/government-and-politics/parliament-taps-ai-to-help-process-mps-questions/
- [S] **Casework** :
  - Caseworker.mp (outil le plus répandu selon W4MP) : https://w4mp.org/w4mp-guides/in-the-constituency/casework-guides/case-management-software-information/
  - eCasework : https://subscribed.fyi/?p=92469
  - Frontbench (Starlight) : référence trouvée sans URL propre.
  - Seuls 7 députés ont déclaré des frais pour un produit IA (mars 2026) : https://labourlist.org/2026/03/mps-offices-need-a-massive-upgrade-to-help-rebuild-public-trust
  - Débat public sur le casework assisté par IA : https://www.politicshome.com/opinion/article/i-use-artificial-intelligence-as-an-mp-and-im-not-apologising-for-it
- [NV] « Mosaic » : aucun résultat. Expérimentations IA de la House of Commons Library et API Hansard (https://developer.parliament.uk/, URL connue mais non revérifiée) : non vérifiées.

### 2.7 Autres pays
- [S] **Estonie, HANS** (Finestmedia, reconnaissance vocale TalTech, 2020, puis LLM) : transcription de toutes les séances, plénière et commissions, relue par des éditeurs. Le directeur met en garde : un mensonge répété peut ressortir comme « vrai » dans un compte rendu généré par IA. — https://www.riigikogu.ee/en/press-releases/others/the-riigikogu-has-a-new-system-for-making-verbatim-reports/ ; https://e-estonia.com/hans-ai-support-tool-for-estonian-parliament/ ; https://www.ipu.org/ai-use-cases/ai-powered-verbatim-records-system-hans
- [S] **Finlande** : en avril 2021, le Committee for the Future a « auditionné » GPT-3, probablement une première mondiale. — https://www.eduskunta.fi/EN/tiedotteet/Pages/Committee-for-the-Future-heard-AI-probably-as-the-first-parliamentary-committee-in-the-world.aspx
- [S] **Chili** (Cámara) : CAMINAR (IA, 2024), ArChileBot (archives), chatbot prévu pour Congreso Virtual, protocole IA par niveaux de risque (le conseil législatif et les rapports de commission sont classés à haut risque). — https://www.camara.cl/cms/2024/06/13/caminar-el-proyecto-de-inteligencia-artificial-creado-por-la-camara/ ; https://www.camara.cl/transparencia/doc/protocolo_IA.pdf ; https://www.opengovpartnership.org/members/chile/commitments/CL0081/
- [S] **Allemagne** : un avis des Wissenschaftliche Dienste (WD 7, 2025) porte sur l'IA dans l'administration et la justice. Rien de trouvé sur les outils internes du Bundestag [NV]. — https://www.bundestag.de/resource/blob/1062038/WD-7-004-25-pdf.pdf
- [NV] Canada (récit UIP « AI journey House of Commons Canada », erreur 403), Grèce, Argentine, Kenya, « Bússola Parlamentar » / Bússola Tech (seul indice : un communiqué ParlAmericas « BussolaTech Chile » vu en résultat de recherche), « Bowling for Democracy » : non vérifiés.

### 2.8 Travaux académiques et modèles
- [S] **War of Words II** (Kristof et al., WWW 2021) : prédiction de l'adoption des amendements en commission au **Parlement européen**, à partir de caractéristiques des amendements, des députés et des textes, de facteurs latents et du texte des modifications. — https://infoscience.epfl.ch/record/284828
- [S] Nay (2016) : prédiction de l'adoption des propositions de loi au Congrès par vecteurs de mots. — https://arxiv.org/html/1607.02109
- [S] Aucune étude trouvée sur l'Assemblée nationale française en particulier : manque académique.
- [S] **Text reuse / bill similarity** :
  - Linder, Desmarais, Burgess, Giraudy, « Text as Policy » (PSJ 2020), 500 000 propositions de loi d'États américains : https://pure.psu.edu/en/publications/text-as-policy-measuring-policy-similarity-through-bill-text-reus/
  - Legislative Influence Detector (KDD 2016) : https://unpaywall.org/10.1145%2F2939672.2939697
- [S] **JuriBERT** (Douka et al., NLLP 2021) : BERT pré-entraîné sur du français juridique. — https://arxiv.org/abs/2110.01485
- [S] Aucun benchmark indépendant des LLM sur le droit français trouvé ; seulement des benchmarks d'éditeurs (par exemple HAQQ). — https://www.haqq.ai/fr/resources/research/cross-model-benchmark

---

## 3. Tableau de synthèse

| Outil | Pays | Institution / éditeur | Tâche servie | Techno | Ouvert ? | Statut | URL |
|---|---|---|---|---|---|---|---|
| Éloi | FR | AN | Dépôt d'amendements | Application métier | Non | Actif | https://ressources-ext.assemblee-nationale.fr/web/eLoi/pdf/eLoi_guide-utilisation-auteurs.pdf |
| Éliasse / dérouleur | FR | AN | Suivi des amendements en séance | Web temps réel | Données moissonnées par Tricoteuses | Actif | (via Tricoteuses) |
| LexImpact simulateur socio-fiscal | FR | AN | Chiffrage d'une réforme IR / prestations | OpenFisca | Oui (forge) | Actif | https://socio-fiscal.leximpact.an.fr/accueil |
| LexImpact dotations | FR | AN | Effet sur les dotations communales | OpenFisca | Oui | Actif | https://dotations.leximpact.an.fr |
| Baromètre de l'application des lois | FR | AN | Suivi des décrets | Web | Oui | Actif | https://www.assemblee-nationale.fr/dyn/taux-application-lois |
| data.assemblee-nationale.fr | FR | AN | Open data | XML / JSON | Oui | Actif (sans textes) | https://data.assemblee-nationale.fr/ |
| Outil IA amendements AN | FR | AN | Classement, aide à la rédaction | ? | ? | Cahier des charges ; 2027 | https://acteurspublics.fr/articles/lassemblee-nationale-cherche-son-modele-dintelligence-artificielle/ |
| Ameli / data.senat.fr | FR | Sénat | Base des amendements | PostgreSQL | Oui | Actif | https://data.senat.fr/ |
| Aide légistique amendements | FR | Sénat | Révision légistique | LLM | Non | Expérimental | https://www.publicsenat.fr/actualites/parlementaire/comment-lia-sintegre-au-travail-parlementaire/ |
| LLaMandement | FR | DGFiP / DILA / DINUM | Résumé, attribution, similarité, fiches de banc | Llama 2 affiné | Oui (modèles et données) | Utilisé PLF 2024 ; adapté au Sénat | https://gitlab.adullact.net/dgfip/projets-ia/llamandement |
| SIGNALE | FR | DILA | Traitement interministériel des amendements | ? | Non | Actif depuis 2020 | (cité par Acteurs publics, URL propre [NV]) |
| Albert (API) | FR | DINUM | Socle LLM de l'État | Multi-modèles | Partiel | Actif ; chatbot non généralisé | https://acteurspublics.fr/articles/de-chatbot-experimental-a-socle-interministeriel-pour-lia-de-letat-le-parcours-dalbert-ia/ |
| compar:IA | FR | Ministère de la Culture / DINUM | Comparaison de LLM | Arène | Oui | Actif | https://arxiv.org/html/2602.06669 |
| Tricoteuses / Canutes / MCP | FR | Collectif | Données parlementaires nettoyées, API, MCP | JSON, PostgreSQL, MCP | Oui (AGPL) | Actif | https://www.tricoteuses.fr/ |
| La Fabrique de la loi | FR | Sciences Po / Regards Citoyens | Visualisation de l'évolution des textes | Web | Oui | Mises à jour irrégulières | https://www.regardscitoyens.org/category/picri/ |
| Datan | FR | Association | Analyse des votes | PHP | Oui (GPL) | Actif | https://datan.fr/a-propos |
| DuraLex | FR | Legilibre | Analyse des projets de loi en éditions | Python | Oui (AGPL) | Activité incertaine | https://github.com/Legilibre/DuraLex |
| Archéo Lex | FR | Particulier | Historique des codes sous Git | Python / Git | Oui | Incertain | https://www.data.gouv.fr/reuses/archeo-lex-histoire-de-la-loi-francaise |
| Pappers Politique | FR | Pappers | Veille, alertes, suivi des amendements | IA (briefings) | Non | Actif | https://politique.pappers.fr/fonctionnalites |
| Doctrine (et Predictice) | FR | Doctrine | Recherche juridique | IA | Non | Actif | https://app.mergerlinks.com/transactions/2025-09-17-predictice |
| GenIA-L | FR | Lefebvre Dalloz | Recherche et rédaction juridiques | LLM + RAG éditorial | Non | Actif | https://www.actuia.com/actualite/ia-generative-et-droit-lefebvre-dalloz-annonce-le-lancement-de-genia-l/ |
| Lexis+ AI | FR | LexisNexis | Recherche et rédaction juridiques | LLM | Non | Actif | https://www.actuia.com/actualite/lexisnexis-france-presente-lexis-ai-un-assistant-dia-generative-dedie-aux-professionnels-du-droit/ |
| Ulysses | BR | Câmara | Routage, similarité, regroupement d'amendements, commentaires citoyens, chat | Suite ML / LLM | Non | Actif, programme institutionnel | https://apolitical.co/en/navigator/case-studies/brazil-how-the-chamber-of-deputies-uses-ai-across-high-volume-legislative-tasks |
| MSE | IT | Camera | Rédaction d'amendements | LLM (universités) | Non | Expérimental 2025 | https://pagellapolitica.it/articoli/camera-costi-progetti-intelligenza-artificiale-deputati |
| NORMA / DEPUCHAT | IT | Camera | Assistant législatif / citoyen | LLM | Non | Annoncés 2025 | idem |
| AT4AM for All | UE | PE | Éditeur d'amendements XML | Akoma Ntoso | Oui (EUPL) | Ancien (2013) | https://interoperable-europe.ec.europa.eu/collection/justice-law-and-security/solution/at4am-all |
| Archibot | UE | PE | Questions sur les archives | Claude, RAG | Accès public | Actif | https://historicalarchives.europarl.europa.eu/home/cultural-heritage-collections/news/ai-dashboard.html |
| EPGenAI Hub | UE | PE | Plateforme LLM interne | Multi-modèles | Non | Déploiement fin 2026 | https://thenextweb.com/news/european-parliament-epgenai-hub-ai-platform-meps |
| Comparative Print Suite | US | Clerk de la Chambre | Effet d'un texte ou amendement sur la loi ; comparaisons | IA + règles | Non (interne) | Actif 2026 | https://congressionaldata.org/?p=1251 |
| CRS TAP 2.0 | US | CRS | Textes similaires | Analyse de texte | Non | Actif | https://congressionaldata.org/?p=1251 |
| Résumés LLM du CRS | US | CRS | Résumés de propositions de loi | 6 LLM testés | — | Échec (< 3 %) | https://fedscoop.com/crs-tried-to-use-ai-but-less-than-3-of-results-met-their-standards/ |
| Quorum Copilot | US | Quorum | Veille, résumés | LLM | Non | Actif | https://www.quorum.us/products/copilot |
| FiscalNote PolicyNote | US | FiscalNote | Prévision d'adoption, similarité, comparaison | ML / LLM | Non | Actif | https://www.businesswire.com/news/home/20250612678578/en/FiscalNote-Accelerates-AI-Innovation-with-New-Enhancements-to-PolicyNote-for-Legislative-Forecasting-Alerts-and-Bill-Discovery |
| Fireside / Indigov | US | FiscalNote / Granicus | Relation avec les administrés | SaaS + IA | Non | Actif | https://indigov.com/solutions |
| EQM, détection de similarité | UK | Commons Table Office | Doublons de questions écrites | IA (non précisée) | Non | Actif 2026 | https://www.publictechnology.net/2026/06/02/government-and-politics/parliament-taps-ai-to-help-process-mps-questions/ |
| Caseworker.mp | UK | Elected Technologies | Casework | SaaS | Non | Actif | https://caseworkermp.com/ |
| HANS | EE | Riigikogu | Comptes rendus | ASR + LLM | Non | Actif | https://e-estonia.com/hans-ai-support-tool-for-estonian-parliament/ |
| CAMINAR / ArChileBot | CL | Cámara | Participation, archives | IA | ? | Actif / prévu | https://www.camara.cl/cms/2024/06/13/caminar-el-proyecto-de-inteligencia-artificial-creado-por-la-camara/ |

---

## 4. Retours d'expérience et risques documentés

1. **Hallucinations dans les textes normatifs.**
   - [S] PE : des amendements citent des lois inexistantes, et un conseil juridique erroné a demandé deux jours de correction. — https://fr.businessam.be/?p=295833
   - [S] Office of Legislative Counsel américain : citations erronées, confusions de notions ; corriger coûte plus cher que rédiger. — https://engadget.com/2238945/ai-generated-bills-causing-problems-in-the-capitol
2. **Résumés juridiques : qualité insuffisante sans spécialisation.**
   - [S] CRS : moins de 3 % de résultats conformes (6 modèles, environ 1 000 propositions de loi ; chiffre corrigé par l'orchestrateur après lecture de l'article). — https://fedscoop.com/crs-tried-to-use-ai-but-less-than-3-of-results-met-their-standards/
   - [S] À l'inverse, LLaMandement, affiné sur 15 000 paires, a été jugé satisfaisant, avec 5 à 10 % d'erreurs d'attribution (autodéclaré). — https://acteurspublics.fr/articles/a-la-dgfip-la-preparation-du-debat-parlementaire-se-fait-grace-a-lia-generative/
   - [I] Leçon : un modèle spécialisé, des tâches étroites et une vérification structurée valent mieux qu'un LLM générique.
3. **La bonne conception : échouer bruyamment.** [S] La Comparative Print Suite renvoie une erreur plutôt que d'inventer un point d'insertion. — même source Engadget.
   - [I] C'est un principe directement transposable à notre calcul des corrections apparentes et des « unités de sens » : ne jamais deviner un ancrage.
4. **Confidentialité et souveraineté.**
   - [S] AN : usage majoritaire de ChatGPT et risque de fuite (rapport Masséglia-Bonnet). — https://acteurspublics.fr/articles/lassemblee-nationale-cherche-son-modele-dintelligence-artificielle/
   - [S] Fondation Jean-Jaurès : risque d'ingérence étrangère. — https://lcp.fr/actualites/l-intelligence-artificielle-deja-largement-utilisee-a-l-assemblee-mais-sans-cadre
   - [S] PE : désactivation de l'IA sur les tablettes. — https://www.techradar.com/pro/eu-parliament-bans-ai-use-on-government-work-devices
   - [S] Royaume-Uni : protections des droits sur l'information exigées avant Copilot. — https://www.publictechnology.net/2024/10/23/government-and-politics/parliament-explores-how-generative-could-support-mps-and-peers/
5. **Dépendance aux fournisseurs.**
   - [S] Les listes d'outils autorisés varient selon les chambres et les fournisseurs (Claude exclu au Sénat américain en mars 2026). — https://www.spokesman.com/stories/2026/mar/10/chatgpt-other-chatbots-approved-for-official-use-i
   - [I] La politique d'achat peut changer brutalement ; mieux vaut une architecture indépendante du modèle.
6. **Inflation et industrialisation des amendements.**
   - [S] La Fondation Jean-Jaurès redoute « plusieurs milliers par texte ». — LCP, même source.
   - [S] Le PE constate une hausse des amendements à traduire. — TNW, même source.
   - [S] Volumes historiques : environ 80 000 amendements en 2019-2020. — Acteurs publics 2024.
   - [NV] Une affaire au Brésil (député déposant plus de 300 propositions en un jour, soupçon d'IA, juillet 2026) apparaît dans un titre de résultat (Correio da Manhã) mais n'a pas été vérifiée.
7. **Rédaction cachée.**
   - [S] Porto Alegre, loi 993/2023 : texte rédigé par ChatGPT à partir d'un prompt de 289 caractères, adopté à l'unanimité ; l'usage de l'IA n'a été révélé qu'après la promulgation. Le président du conseil y voit un « précédent dangereux ». — https://law.com/2023/12/04/undisclosed-use-of-chatgpt-to-draft-ordinance-in-brazil-sparks-debate-397-79623 ; https://canaltech.com.br/inteligencia-artificial/lei-escrita-pelo-chatgpt-e-aprovada-em-porto-alegre-271605/
   - [S] France : amendement LIOT rédigé par ChatGPT (J.-F. Acquaviva, mars 2023, projet de loi JO 2024). — https://www.corsenetinfos.corsica/Intelligence-artificielle-Le-coup-d-eclat-de-Jean-Felix-Acquaviva-avec-un-amendement-redige-par-ChatGPT_a70317.html
8. **Transparence.** [S] Au PE, aucune obligation de déclaration pour les eurodéputés ; obligation pour le personnel depuis 2024. — https://fr.businessam.be/?p=295833
9. **Biais et perte d'expertise.**
   - [S] Biais de LLaMandement proches de ceux de Llama (article arXiv, d'après un résumé secondaire).
   - [S] Les équipes comprennent moins bien les textes qu'elles font rédiger par l'IA. — Engadget / Politico.
   - [S] Estonie : un compte rendu généré par IA peut répéter une affirmation fausse. — https://www.ipu.org/innovation-tracker/story/view-estonia-ai-advanced-beginners (citation reprise d'un résumé de recherche).
10. **Uniformisation.**
    - [S] Le PE repère des « styles de rédaction reconnaissables » dans les amendements. — TNW.
    - [I] Si tous les groupes passent par les mêmes modèles, les rédactions convergent et la détection des « vraies » positions distinctes devient plus difficile, mais plus nécessaire.
11. **Bénéfices non mesurés.** [S] Le Brésil, leader du domaine, n'a pas publié de gains mesurés. — Apolitical.

---

## 5. Manques identifiés : tâches de collaborateurs peu ou pas outillées

Toute cette section est inférée [I] à partir du panorama ci-dessus.

1. **Comparer les amendements concurrents du point de vue d'un groupe.** Les outils existants servent l'institution ou le Gouvernement : LLaMandement résume et route ; Ulysses et la Camera regroupent pour ordonner la discussion. Aucun outil ne montre au collaborateur **sa** rédaction face à la commission et aux autres groupes, sur le même alinéa et avec les mêmes conventions de corrections apparentes. Ni la Fondation Jean-Jaurès (« historique des propositions similaires ») ni l'appel d'offres AN (« visualiser l'impact ») ne sont encore réalisés. C'est exactement le créneau de la Boussole.
2. **Montrer l'article consolidé « si mon amendement passe », et selon les combinaisons.** La Comparative Print Suite le fait aux États-Unis (« How an Amendment Changes a Bill ») ; rien d'équivalent n'est public en France. DuraLex ou Archéo Lex fournissent des briques, sans interface métier. La Fondation Jean-Jaurès cite la « pré-génération de textes finaux selon des scénarios » comme besoin.
3. **Regroupement sémantique au niveau de l'unité de sens** (taux, seuil, échéance, sanction), plutôt qu'au niveau de l'amendement entier. Les outils de similarité (TAP, EQM, LLaMandement, Ulysses) travaillent sur des documents entiers. Aucun ne segmente par thème juridique pour dire « 4 groupes veulent 3 taux différents ».
4. **Synthèse des positions et zones de compromis** (« articulables ou non »). Aucun outil vérifié ne le fait. La prévision d'adoption existe (FiscalNote, War of Words II pour le PE), mais pas pour l'AN, et sans explication thème par thème.
5. **Vérification légistique fiable avant dépôt** : recevabilité, références exactes, insertion. Seul le Sénat l'expérimente. Le risque d'hallucination documenté au PE et aux États-Unis en fait une tâche à forte valeur, à condition d'échouer bruyamment.
6. **Préparation rapide de séance pour le groupe** (fiches de banc de groupe : avis du rapporteur, positions des autres groupes, historique). Elle existe côté Gouvernement (LLaMandement, SIGNALE), pas côté groupes.
7. **Chiffrage d'un amendement** hors champ socio-fiscal et dotations. LexImpact couvre l'IR, les prestations et les dotations ; aucun outil ne couvre par exemple le logement, thème du prototype.
8. **Ce qui est déjà bien couvert, à ne pas refaire.**
   - Veille et alertes : Pappers, Quorum, FiscalNote.
   - Rédaction de courriers et synthèses génériques : ChatGPT et Mistral, déjà utilisés par la majorité.
   - Casework au Royaume-Uni et aux États-Unis : CRM.
   - Transcription : HANS, Sénat.

---

## 6. Ressources réutilisables pour un prototype

| Ressource | Usage pour la Boussole | Licence / accès | URL |
|---|---|---|---|
| Open data AN (amendements, dossiers, votes) | Vrais amendements, sort, auteurs, alinéa visé | Licence ouverte | https://data.assemblee-nationale.fr/travaux-parlementaires/amendements/tous-les-amendements |
| XML par amendement AN | Exemple de schéma | Licence ouverte | https://www.assemblee-nationale.fr/dyn/opendata/AMANR5L17PO838901BTC2123P0D1N000008.xml |
| data.senat.fr (Ameli, Monalisa en Akoma Ntoso) | Amendements et textes Sénat | Licence du Sénat | https://data.senat.fr/ |
| Tricoteuses : données nettoyées en JSON + schémas | Ingestion simple en Python | AGPL / données ouvertes | https://git.en-root.org/tricoteuses/data/assemblee-nettoye ; https://www.tricoteuses.fr/assemblee/schemas |
| API Parlement / PostgREST Canutes | Requêtes sans base locale | Ouvert | https://parlement.tricoteuses.fr/docs ; https://db.code4code.eu/canutes/ |
| Dumps Canutes | Base PostgreSQL complète | Ouvert | https://dump.tricoteuses.fr/ |
| MCP Parlement / Moulineuse | Brancher un assistant (Claude) sur les données parlementaires | Ouvert | https://www.tricoteuses.fr/services/mcp-parlement ; https://www.tricoteuses.fr/services/mcp-moulineuse |
| Légifrance : LEGI, open data DILA, API PISTE (`pylegifrance`) | Texte en vigueur, versions | Licence ouverte ; compte PISTE requis pour l'API | https://www.data.gouv.fr/datasets/legi-codes-lois-et-reglements-consolides ; https://echanges.dila.gouv.fr/OPENDATA/ ; https://pylegifrance.github.io/pylegifrance/en/concepts/cid-and-versioning/ |
| Codes sous Git (Tricoteuses) | Différences entre versions d'un article | Ouvert | https://git.tricoteuses.fr/codes |
| LLaMandement : modèle 7B et code / données | Résumés neutres, jeu de 15 000 paires | Licence Llama 2 / open source | https://huggingface.co/AgentPublic/LlaMAndement-7b ; https://gitlab.adullact.net/dgfip/projets-ia/llamandement |
| Article LLaMandement | Méthode, évaluation, biais | CC BY 4.0 | https://arxiv.org/abs/2401.16182 |
| DuraLex | Analyse des opérations d'édition (insérer, remplacer, supprimer) | AGPL-3.0 | https://github.com/Legilibre/DuraLex |
| OpenFisca-France (paramètres) et LexImpact | Chiffrer un amendement fiscal | AGPL | https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/parameters ; https://git.leximpact.dev/leximpact |
| JuriBERT | Plongements pour le regroupement d'amendements français | Publié par les auteurs | https://arxiv.org/abs/2110.01485 |
| War of Words II | Méthode de prédiction de l'adoption (référence, à ne pas confondre avec un « score » ; cf. CLAUDE.md) | Article | https://infoscience.epfl.ch/record/284828 |
| Text as Policy / Legislative Influence Detector | Méthodes de text reuse | Articles | https://pure.psu.edu/en/publications/text-as-policy-measuring-policy-similarity-through-bill-text-reus/ |
| AT4AM for All | Modèle d'interface d'amendement XML (Akoma Ntoso) | EUPL | https://interoperable-europe.ec.europa.eu/collection/justice-law-and-security/solution/at4am-all |
| Lignes directrices UIP sur l'IA | Cadre de gouvernance à citer | Public | https://www.ipu.org/resources/publications/reference/2024-12/guidelines-ai-in-parliaments |

**[I] Recommandations pour le prototype.**
- Remplacer les données fictives (`OTHERS`) par un vrai article et ses amendements, tirés de Tricoteuses ou de l'open data AN.
- Calculer les corrections apparentes par différence de mots, et rattacher les « points » ou unités de sens par règles, sur le modèle de DuraLex.
- Réserver le LLM à deux usages : (a) le regroupement par proposition, (b) la synthèse textuelle thème par thème. Toujours avec citation du passage source, et en échouant bruyamment quand l'ancrage est introuvable (leçon de la Comparative Print Suite).

---

### Limites de cette note
- Le budget de recherche web a été épuisé avant d'avoir couvert : Ameli dans le détail, Senat'Data, Légistix, Code du travail numérique, Etalab, Make.org, Parlement & Citoyens, Jus Mundi, Contexte, Politico Pro, Agence parlementaire, Pluricité, Eurogroup, NationBuilder, IQ, Mosaic, le Senate Comparison Tool, l'API Congress.gov, l'API Hansard, la House of Commons Library, l'administration du Bundestag, le Canada, la Grèce, l'Argentine, le Kenya, Bússola, Bowling for Democracy, ainsi que le texte de la charte IA de l'AN (juillet 2025) et les lauréats du hackathon de juillet 2026.
- Plusieurs pages (ipu.org, nosdeputes.fr, dépêche AFP) étaient inaccessibles (403 ou 503). Les points correspondants reposent sur des résumés de moteur de recherche et sont signalés.
