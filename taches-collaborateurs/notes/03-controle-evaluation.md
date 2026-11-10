# 03 — Contrôle de l'action du Gouvernement et évaluation des politiques publiques

*Note de recherche, novembre 2026. Axe : les tâches des collaborateurs parlementaires (surtout ceux de députés, à Paris ; sénateurs quand c'est pertinent) liées au contrôle et à l'évaluation, et ce qu'un outil (modèle Python + interface, tableau de bord, simulation, assistant IA) pourrait en appuyer.*

**Conventions.** **[S]** = sourcé (URL donnée). **[I]** = inféré : raisonnement à partir des sources, de la pratique connue des institutions, ou de l'organisation du travail. Ce n'est pas un fait vérifié. Aucune citation n'est inventée. Les citations entre guillemets sont recopiées des documents téléchargés.

**Limite de méthode.** Le quota de recherches web partagé entre agents a été épuisé en cours de travail. Plusieurs points restent donc à vérifier (voir §5) : le nombre de commissions d'enquête de la XVIIe législature, les statistiques officielles des questions écrites, des témoignages directs de collaborateurs, et les outils IA de l'EPRS, du NAO et du GAO.

---

## 1. Contexte chiffré

### 1.1 Cadre et instruments

- **Fondement.** L'art. 24 de la Constitution (révision du 23 juillet 2008) dispose que le Parlement « contrôle l'action du Gouvernement » et « évalue les politiques publiques ». Les instruments sont les suivants : rapports d'application en commission, missions d'information, commissions d'enquête, OPECST, CEC, délégations, « Printemps de l'évaluation ». **[S]** Fiche de synthèse AN n° 58 : https://www.assemblee-nationale.fr/dyn/contenu/telechargement/629149/file/Fiche%2058%20-%20Application%20et%20%C3%A9valuation%20pol%20publiques.pdf
- **Semaine de contrôle.** L'art. 48 de la Constitution réserve une semaine de séance sur quatre au contrôle et à l'évaluation. Le CEC peut proposer des débats sans vote ou des séances de questions sur ses rapports (art. 146-7 RAN). **[S]** Fiche 58 (ci-dessus). Des critiques récurrentes portent sur son rendement ; exemple : « la deuxième semaine de contrôle… n'a rien apporté » (opposition, 2009). **[S]** https://acteurspublics.fr/articles/lopposition-reste-sur-sa-faim/ (résumé de recherche, texte non relu en entier).
- **Rapport d'application à six mois (art. 145-7 al. 1 RAN).** Depuis 2004, un rapport sur la mise en application est présenté à la commission six mois après l'entrée en vigueur d'une loi qui appelle des textes réglementaires. Deux députés le rédigent : le rapporteur du texte et un député d'opposition, désigné dès le renvoi du texte (réforme du 4 juin 2019). Le rapport recense les textes publiés, les circulaires et les dispositions restées sans texte d'application. Il peut donner lieu à un débat sans vote. **[S]** Fiche 58.
- **Évaluation à trois ans (art. 145-7, réforme du 28 novembre 2014).** Le rapport porte sur les « conséquences juridiques, économiques, financières, sociales et environnementales de la loi, le cas échéant au regard des critères d'évaluation définis dans l'étude d'impact préalable ». **[S]** Fiche 58.
- **Sources de travail que l'AN indique elle-même.** Les commissions disposent « des échéanciers de mise en œuvre des textes mis à disposition par le Gouvernement sur le site Légifrance », des études d'impact, et peuvent « requérir toute information utile auprès des ministères ». **[S]** Fiche 58.
- **Missions d'information.** Elles sont créées par une commission, par plusieurs commissions ou par la Conférence des présidents. Une mission de deux membres compte obligatoirement un député d'opposition. Elles durent « souvent quelques mois », avec auditions et déplacements, et se concluent par un rapport d'information. Il existe aussi des « missions flash » de quelques semaines, conclues par une communication orale. **[S]** Fiche 58 ; Fiche AN n° 60 : https://questions.assemblee-nationale.fr/contenu/telechargement/629155/file/Fiche%2060%20-%20R%C3%B4le%20contr%C3%B4le%20commissions.pdf
- **Auditions.** Les commissions permanentes et spéciales ont organisé 3 094 auditions sous la XVe législature. Ne pas répondre à une convocation est puni de 7 500 € d'amende (art. 5 bis, ordonnance de 1958). **[S]** Fiche 60.
- **Commissions d'enquête.** Elles comptent 31 membres au plus. La présidence ou le rapport revient de droit à l'opposition. Leur durée est de **six mois au plus**. Elles disposent d'un droit de citation directe, avec **audition sous serment**. Les rapporteurs exercent leur mission **« sur pièces et sur place »** et peuvent se faire communiquer tout document de service, hors secret défense, affaires étrangères et sécurité de l'État. Les travaux non publics sont couverts par un secret de 25 ans. Les groupes minoritaires joignent une « contribution » au rapport. Six mois après la publication, un rapport sur la mise en œuvre des conclusions est présenté à la commission permanente. **[S]** Fiche AN n° 61 (version actualisée du 5 juillet 2024) : https://www.assemblee-nationale.fr/dyn/contenu/telechargement/629158/file/Fiche%2061%20-%20Commissions%20d%27enqu%C3%AAte_actualis%C3%A9e050724.pdf
- **Droit de tirage.** Depuis la réforme de novembre 2014, la création est de droit sur demande d'un président de groupe d'opposition ou minoritaire, une fois par session ordinaire, sauf la dernière année de la législature. La commission compétente ne contrôle alors que la recevabilité. Un groupe ne peut pas lancer une nouvelle demande tant que la précédente n'a pas achevé ses travaux. **[S]** Fiche 61. Exemple : usage du droit de tirage par le groupe Droite républicaine à la Conférence des présidents du 10 juin 2025. **[S]** https://www.assemblee-nationale.fr/dyn/17/rapports/cion_lois/l17b1602_rapport-fond.pdf (résumé de recherche).
- **Volume des commissions d'enquête.** Sous la XVe législature (2017-2022), la Fiche 61 en recense 25, plus deux attributions de prérogatives d'enquête (commission des lois en 2018 ; mission Covid en 2020). **[S]** Fiche 61. Le chiffre de la XVIIe législature n'a pas été vérifié.
- **CEC.** Créé en 2009, il compte 36 membres et est présidé par le Président de l'AN. Il évalue les politiques transversales. **Chaque groupe peut obtenir de droit une évaluation par session ordinaire** (art. 146-3). Il peut réaliser l'**évaluation préalable d'un amendement** à la demande de son auteur (art. 146-6). **[S]** Fiche 58.
- **Contrôle budgétaire.** L'art. 57 de la LOLF confie aux commissions des finances le suivi de l'exécution. Les rapporteurs spéciaux contrôlent toute l'année « sur pièces et sur place ». La XVe législature compte en moyenne 45 rapports spéciaux par session et une soixantaine d'avis budgétaires par an. Les rapporteurs obtiennent une grande partie de leurs informations par des « questionnaires envoyés avant le 10 juillet aux ministres concernés ». L'art. 47-2 de la Constitution prévoit l'assistance de la Cour des comptes. Le Printemps de l'évaluation remplace la MEC, mise en sommeil. La MECSS a publié 6 rapports sous la XVe législature. **[S]** Fiche 60. Le délai de réponse aux questionnaires est le **10 octobre** (art. 49 LOLF). Les taux de réponse sont historiquement inégaux : 56 % à la date butoir pour le PLF 2006 ; 67,2 % pour un rapporteur pour avis au 11 octobre 2017. **[S]** https://www.senat.fr/rap/l05-099-324/l05-099-3241.pdf ; https://www.assemblee-nationale.fr/15/pdf/budget/plf2018/a0276-tIII.pdf (chiffres issus des résumés de recherche, PDF non relus en entier).
- **Nominations (art. 13 C).** Sont concernés 55 postes. Le rapporteur, obligatoirement d'opposition ou minoritaire depuis 2019, **établit un questionnaire** auquel la personnalité répond par écrit avant l'audition. **[S]** Fiche 60.
- **Délégations AN.** Elles sont cinq : droits des femmes (1999), renseignement (2007, commune), outre-mer (2012), collectivités territoriales (2017), droits des enfants (2022). **[S]** Fiche 58.
- **OPECST.** Il est saisi par une commission ou par le Bureau. Il réalise d'abord une étude de faisabilité, puis un rapport de six à dix-huit mois. Il publie aussi des « notes scientifiques » courtes, écrites en quelques semaines. Il est appuyé par un conseil scientifique de 24 membres. **[S]** Fiche AN n° 18 : https://www.assemblee-nationale.fr/dyn/contenu/telechargement/627154/file/Fiche%2018%20-%20OPECST.pdf (résumé de recherche).
- **Administration.** La direction du Contrôle et de l'évaluation existe depuis janvier 2021 et regroupe les secrétariats des organes de contrôle. La cellule **LexImpact** est opérationnelle depuis 2020. **[S]** Fiche 58.

### 1.2 Application des lois : les chiffres

- **Sénat, bilan au 31 mars 2026 (session 2024-2025).** Il porte sur 56 lois promulguées, dont seulement 22 d'application directe. Parmi les 34 lois qui appellent des mesures : 14 sont entièrement applicables, 12 partiellement, 8 sans aucune mesure. **394 mesures prévues, 262 publiées (179 décrets, 83 arrêtés), soit un taux de 66 %** (+4 points), contre plus de 75 % entre 2012 et 2019. Plus de 80 % des textes sont d'initiative parlementaire. Le taux des lois d'initiative parlementaire est de 50 %, celui des mesures issues d'amendements de 55 %, celui des amendements sénatoriaux de 51 %. Le taux en procédure accélérée est de 56 %. LFI 2025 : 94 % ; LFSS 2025 : 70 %. **Rapports demandés au Gouvernement : 7 remis sur 35 (20 %)** ; rapports de l'art. 67 de la loi de 2004 : 81 %. Le Sénat a identifié **841 mesures en attente depuis 2014**, en a signalé **184 « essentielles »** au SGG, et le Gouvernement en a publié 69 en priorité. Exemple : la loi « Narcotrafic » est appliquée à 30 % (8 mesures sur 27). La circulaire du 27 décembre 2022 fixe au Gouvernement un délai de six mois. **[S]** Synthèse du rapport Sénat n° 802 (2025-2026) : https://www.senat.fr/rap/r25-802/r25-802-syn.pdf
- **Sénat : méthode.** Le dialogue avec le SGG est devenu trimestriel. Depuis le 1er janvier 2024, le SGG suit aussi les arrêtés. Les mesures différées ne sont plus comptées. Il existe des divergences d'appréciation : un décret peut être publié sans traduire pleinement la loi. **[S]** https://www.senat.fr/rap/r25-802/r25-8022.html
- **AN, baromètre LexImpact (fin 2023).** Pour la XVIe législature : 84 % de mesures appliquées, dont **27 % dans les six mois**. Pour la XVIIe : 43 %, dont 23 % dans les six mois (chiffres cités avant le débat du 10 février 2026). Par commission : affaires économiques 60 % (24 % dans les six mois), développement durable 65 %, affaires sociales environ 88 %. Le ministre indiquait 100 décrets publiés sur 320 attendus pour la XVIIe législature en décembre 2025. **[S]** https://lcp.fr/actualites/la-loi-ne-vaut-que-par-son-application-dans-l-hemicycle-un-debat-inedit-va-se-tenir-ce
- **Premier débat en séance sur l'application des lois : 10 février 2026.** Chaque président de commission dispose de 6 minutes, le Gouvernement de 3 minutes, puis viennent des questions de groupes de 2 minutes. Les groupes doivent « signaler à l'avance les lois visées et désigner leurs orateurs ». **[S]** https://www.leclubdesjuristes.com/politique/controler-lapplication-de-la-loi-un-debat-inedit-a-lassemblee-nationale-14097/
- **Exemples de communications de commission.** La commission des affaires culturelles (24 septembre 2025) présente des tableaux loi par loi : texte, rapporteurs, dates d'examen, état des décrets. **[S]** https://questions.assemblee-nationale.fr/dyn/contenu/visualisation/951397/file/Communication%20sur%20l%27application%20des%20lois%20sept2025.pdf. La commission des lois (5 février 2026) tient un tableau par loi : dispositions appelant un décret, publiées, taux, en attente. **[S]** https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1101440/file/Bilan%20application%20des%20lois%20-%20commission%20des%20Lois%20f%C3%A9vrier%202026.pdf
- **Ordonnances.** Il y en a eu 9 en 2024 (moyenne de 52 par an sur 20 ans) et 23 en 2023. Seulement 20,3 % ont été ratifiées pendant le quinquennat 2017-2022. Le Sénat publie un suivi des habilitations, publications et ratifications. **[S]** https://www.vie-publique.fr/en-bref/298459-lois-decrets-le-bilan-2024-de-lactivite-normative ; https://www.senat.fr/fileadmin/cru-1746021083/Seance/Controle/Suivi_des_ordonnances/Essentiel_ordoinfo_1sem2023_VDEF1.pdf (chiffres issus des résumés de recherche).

### 1.3 Questions écrites

- Délai réglementaire : 2 mois, ramené à 10 jours pour une question « signalée » par un président de groupe (procédure de 1994). **[S]** Résumé de recherche sur des questions écrites de l'AN, dont https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE17790.pdf (non relu en entier).
- **XVIIe législature, 20 mai 2025 : 6 931 questions, 1 936 réponses (27,93 %).** La Santé a reçu 1 024 questions (10,74 % de réponses) et l'Intérieur 601 (7,82 %). **[S]** https://lcp.fr/actualites/questions-ecrites-des-deputes-taux-de-reponse-des-ministres-les-bons-et-les-mauvais
- Une question écrite d'avril 2025 cite un taux global de 25 % et **11,6 % de réponses dans le délai de deux mois**. **[S]** Résumé de recherche, URL exacte non confirmée : l'une des questions QANR5L17QE… listées par la recherche, page en erreur 503 lors de la vérification.
- Données : XML natif (et JSON dérivé) sur data.assemblee-nationale.fr, mises à jour chaque semaine selon l'équipe de l'AN. **[S]** https://www.data.gouv.fr/datasets/questions-ecrites/discussions

### 1.4 Cour des comptes et suivi des recommandations

- **76 %** des recommandations de la Cour et des CRTC sont totalement ou partiellement suivies d'effet (campagne 2024, sur des rapports de 2021), un taux stable depuis 2018. La transmission de comptes rendus de suites est obligatoire. **[S]** https://www.ccomptes.fr/sites/default/files/2025-09/20250919-suivi-recommandations-JF_0.pdf
- Il existe un jeu de données ouvert des recommandations de la Cour, mais ancien (2015 à mai 2018, non documenté). La Cour annonce un portail de données. **[S]** https://www.data.gouv.fr/datasets/recommandations-publiees-par-la-cour-des-comptes-2015-mai-2018 ; https://www.data.gouv.fr/organizations/cour-des-comptes
- Enquêtes demandées à la Cour par les commissions des finances (art. 58-2° LOLF). Exemple : enquête sur l'entretien du réseau ferroviaire (Sénat, 2012). **[S]** https://www.vie-publique.fr/rapport/35072-enquete-cour-des-comptes-entretien-du-reseau-ferroviaire-national

### 1.5 Collaborateurs et IA

- L'AN comptait 1 838 collaborateurs en 2018, soit un peu plus de 3 par député. Parmi leurs tâches : « préparer les auditions qui se déroulent dans le cadre des commissions ou délégations », notes, liens avec les administrateurs et les institutions d'expertise (Cour des comptes, Conseil d'État, Défenseur des droits). **[S]** Beauvallet et Michon, *La Vie des idées*, 2022 : https://laviedesidees.fr/Dans-l-ombre-des-parlementaires
- **Enquête des questeures de l'AN, mars 2026** : 425 réponses exploitables sur 2 600 personnes interrogées. **85,4 % utilisent l'IA**, près de 50 % chaque jour. Usages : reformulation 60,6 %, **synthèse documentaire 53,2 %**, recherche web 43,3 %. Les besoins cités incluent l'« aide à la rédaction de questionnaires pour une audition », l'« aide à la rédaction de rapports (ou parties descriptives) et illustration par des graphiques », le traitement de données sous forme de tableurs, la synthèse du droit existant. Un groupe de travail « IA comptes rendus » prévoit la transcription des réunions, puis une synthèse ciblée pour les administrateurs, notamment de la direction du Contrôle et de l'évaluation. Les risques cités sont des **références et jurisprudences inventées**. **[S]** Rapport Bonnet-Masséglia, 22 mai 2026 : https://www2.assemblee-nationale.fr/static/17/gtia_rapport_bonnet_masseglia_20260522.pdf
- **Fondation Jean-Jaurès (avril 2026)** : 55 % des tâches des équipes parlementaires seraient automatisables à plus de 50 %. Veille : 80 %. « Effectuer des recherches et rédiger » : 70 %. « Analyser et synthétiser un projet… » : 50 %. Préparer et suivre les travaux : 30 %. Aucune des trois chambres (AN, Sénat, PE) ne propose d'IA interne. **[S]** https://www.jean-jaures.org/wp-content/uploads/2026/04/IA_AN.pdf

---

## 2. Inventaire des tâches (44 tâches)

Légende. **Qui** : CP = collaborateur du député à Paris ; CG = collaborateur de groupe ; CS = collaborateur de sénateur ; Adm = administrateur (fonctionnaire, hors périmètre mais interlocuteur). **Fréq.** : fréquence. **Diff.** : difficulté de 1 à 5. **Apport** : V visualiser, S simuler, C classer, R résumer, Cp comparer, A alerter, J premier jet.

Sauf mention [S], la colonne « qui / fréquence / difficulté / temps » est **[I]**. Il n'existe pas de mesure publiée du temps passé par les collaborateurs sur le contrôle.

### A. Application des lois (« service après-vote »)

**1. Tenir la liste des mesures attendues pour les lois suivies par le député** (rapporteur, co-rapporteur 145-7, auteur d'amendements adoptés).
Qui : CP, CS. Fréquence : continue. Difficulté : 2.
Données : échéanciers Légifrance ; données du baromètre (data.gouv, quotidiennes, une ligne par mesure, avec article, date prévue, décret, état et délai en jours) [S] https://www.data.gouv.fr/datasets/donnees-du-barometre-de-lapplication-des-lois/informations.
Apport : V/A. Tableau de bord filtré sur « mes lois / mes amendements », avec alerte au dépassement de six mois.
Limite : le baromètre propose déjà un abonnement par courriel ou RSS loi par loi [S] https://leximpact.an.fr/. La valeur ajoutée est le filtrage par amendement d'origine, qui n'existe pas aujourd'hui [I].

**2. Relier un amendement adopté du député à la mesure réglementaire qu'il appelle.**
Qui : CP. Fréquence : après chaque promulgation. Difficulté : 3.
Contexte : 47 % des mesures prévues viennent d'amendements parlementaires ; 55 % sont appliquées [S] rapport Sénat 802.
Apport : Cp/C. Correspondance automatique entre amendement adopté (data.assemblee-nationale.fr) et article de la loi consolidée, puis avec la mesure de l'échéancier [I].
Limite : la renumérotation entre lectures rend le rapprochement délicat. C'est le même problème de « retrouver le passage » que les `points` de la Boussole [I].

**3. Vérifier qu'un décret publié traduit fidèlement la loi (contrôle de conformité, pas seulement de publication).**
Qui : CP, rapporteurs. Fréquence : ponctuelle. Difficulté : 4.
Contexte : exemples sourcés du décret qui ne couvre que partiellement les dispositions (loi antisémitisme dans l'enseignement supérieur) et de la réécriture d'une instruction fiscale « CumCum » [S] rapport Sénat 802.
Apport : Cp/J. Mise côte à côte de l'article de loi et du décret, avec corrections apparentes et extraction des seuils, dates et conditions. C'est exactement la grammaire visuelle de la Boussole [I].
Limite : l'interprétation reste juridique et politique ; l'outil signale, il ne juge pas.

**4. Préparer le rapport d'application à six mois (art. 145-7 al. 1)** : tableau des textes publiés, circulaires, dispositions sans texte, explication des retards.
Qui : CP du rapporteur et du co-rapporteur d'opposition, avec l'Adm. Fréquence : quelques fois par an et par député concerné. Difficulté : 3. Temps : inconnu.
Apport : J. Tableau pré-rempli et premier jet de la partie descriptive.
Limite : les échanges avec les ministères sur les causes de retard ne sont pas dans les données.

**5. Préparer l'évaluation à trois ans** : confronter la loi aux « critères d'évaluation définis dans l'étude d'impact » [S] Fiche 58.
Qui : CP, Adm. Fréquence : rare. Difficulté : 5.
Apport : R/Cp. Extraction des objectifs et indicateurs promis dans l'étude d'impact, puis recherche des données observées (INSEE, DREES, DARES, PAP/RAP) [I].
Limite : l'attribution causale relève de l'évaluation, pas de l'outil ; il faut éviter les corrélations trompeuses.

**6. Préparer les questions du député pour un débat d'application des lois en séance** (format du 10 février 2026 : choix des lois à l'avance, questions de 2 minutes) [S] Club des juristes.
Qui : CG, CP. Fréquence : annuelle ou plus. Difficulté : 2.
Apport : C/J. Classement des lois du champ du groupe par retard, avec premier jet de question.
Limite : le choix politique des cibles appartient au groupe.

**7. Suivre les ordonnances** : habilitations, publication dans le délai, dépôt du projet de ratification, ratification.
Qui : CP, CG. Fréquence : continue. Difficulté : 3.
Données : suivi Sénat [S] ; Légifrance.
Apport : V/A. Frise habilitation, ordonnance et ratification, avec alerte sur la caducité.
Limite : faible volume récent (9 en 2024) [S].

**8. Suivre les rapports demandés au Gouvernement par la loi** (souvent issus d'amendements de l'opposition).
Qui : CP. Difficulté : 2.
Contexte : 20 % remis [S] rapport Sénat 802.
Apport : A/V. Liste « rapports dus, échus, non remis » par député auteur. La remise de ces rapports est un argument fréquent de question écrite [I].

**9. Signaler des mesures « prioritaires » au ministre chargé des relations avec le Parlement et au SGG** (méthode sénatoriale depuis 2025) [S].
Qui : CS, Adm. Difficulté : 3.
Apport : C. Classement de l'arriéré (841 mesures [S]) selon des critères explicites : ancienneté, nombre de bénéficiaires, saillance.
Limite : la hiérarchie relève d'un choix politique. Un « score » de priorité serait contraire à la doctrine du projet (pas de score composite) ; mieux vaut des filtres et des critères affichés [I].

### B. Questions écrites et questions orales comme outils de contrôle

**10. Rédiger des questions écrites** (souvent à partir de sollicitations de la circonscription).
Qui : CP. Fréquence : hebdomadaire. Difficulté : 2.
Apport : J/C. Premier jet ; recherche des questions déjà posées et des réponses déjà données sur le même sujet, pour éviter le doublon et citer la réponse antérieure.
Données : data.assemblee-nationale.fr, data.senat.fr [S].
Limite : la responsabilité politique et la vérification des faits restent humaines.

**11. Suivre les réponses et relancer** : questions « signalées » par le président de groupe (délai de 10 jours), questions renouvelées.
Qui : CP, CG. Fréquence : continue. Difficulté : 1 à 2.
Contexte : 11,6 % de réponses dans les deux mois [S, URL à confirmer].
Apport : A. Échéancier des questions sans réponse, proposition de signalement au groupe.

**12. Analyser la qualité d'une réponse ministérielle** : répond-elle à la question ? Contient-elle un engagement, un chiffre, une date ?
Qui : CP. Difficulté : 2.
Apport : R/C. Extraction des engagements (date, montant, texte à venir) et suivi de leur réalisation [I].
Limite : un classement automatique « réponse évasive » est sensible et à présenter comme indice, pas comme verdict.

**13. Statistiques de contrôle par ministère** (taux et délais de réponse) pour une communication ou une intervention en Conférence des présidents.
Qui : CG. Difficulté : 1.
Contexte : l'AN publie des statistiques de taux de réponse [S, résumé de recherche] ; LCP les relaie [S].
Apport : V.

**14. Préparer les questions au Gouvernement (QAG) et questions orales sans débat liées à un retard d'application ou à un rapport non remis.**
Qui : CP, CG. Fréquence : hebdomadaire pour les QAG. Difficulté : 2.
Apport : J/A. Proposer un sujet de QAG adossé à une échéance dépassée [I].

### C. Missions d'information, commissions d'enquête, CEC

**15. Repérer des sujets de contrôle et préparer la demande** : proposition de résolution de commission d'enquête au titre du droit de tirage, ou demande d'évaluation CEC (une par groupe et par session [S]).
Qui : CG, CP. Fréquence : annuelle par groupe. Difficulté : 4.
Apport : R/C. Cartographie des rapports existants (AN, Sénat, Cour des comptes, inspections) sur un sujet ; repérage des angles morts.
Limite : vérification de la recevabilité (« faits » ou « services », absence de poursuites judiciaires [S] Fiche 61) : c'est un contrôle juridique humain.

**16. Rédiger l'exposé des motifs de la proposition de résolution** (objet « avec précision » [S] Fiche 61).
Qui : CG, CP. Difficulté : 3. Apport : J.

**17. Vérifier qu'aucune procédure judiciaire en cours ne borne le champ de l'enquête.**
Qui : CG, avec l'Adm et le garde des sceaux, notifié par le Président [S]. Difficulté : 3.
Apport : faible (veille de presse) [I].

**18. Bâtir le programme d'auditions** : choisir les personnes, équilibrer les points de vue, ordonner (ministres en dernier).
Qui : CP du rapporteur ou du président, Adm. Fréquence : par mission. Difficulté : 3.
Apport : C/V. Cartographie des acteurs à partir des rapports, de la presse et des registres de représentants d'intérêts HATVP ; vérification que toutes les positions sont représentées [I].
Limite : le choix des auditions est un acte politique et parfois stratégique ; risque d'exposer le programme d'une commission d'enquête si l'outil n'est pas souverain.

**19. Rédiger les questionnaires préalables aux auditions.**
Qui : CP, Adm. Fréquence : plusieurs par semaine pendant une mission. Difficulté : 3.
Contexte : questionnaire « courant mais en rien obligatoire » [S, résumé de recherche] https://www.leclubdesjuristes.com/politique/pour-une-clarification-du-cadre-juridique-des-commissions-parlementaires-12704/ ; besoin exprimé dans l'enquête de l'AN [S] gtia.
Apport : J. Premier jet nourri des contradictions repérées entre les auditions précédentes et les documents.

**20. Préparer la fiche d'audition du député** : biographie, positions publiques, déclarations antérieures, chiffres clés, questions de relance.
Qui : CP. Fréquence : par audition. Difficulté : 2 à 3.
Apport : R/J.
Limite : risque d'hallucination sur des personnes réelles, avec un enjeu de diffamation. La vérification des sources est indispensable [S] gtia (risques de références inventées).

**21. Pendant l'audition sous serment : repérer en temps réel les contradictions avec les pièces ou les auditions précédentes.**
Qui : CP en salle, si présent [I]. Difficulté : 4.
Apport : A. Transcription en direct et comparaison avec le corpus [I].
Limite : fiabilité en temps réel ; enjeu de faux témoignage (sanctions pénales [S] Fiche 61) ; ne jamais accuser sur la foi d'une alerte automatique.

**22. Exploiter les comptes rendus d'auditions** : synthèse par thème, citations, tableau « qui a dit quoi ».
Qui : CP, Adm. Fréquence : continue. Difficulté : 3.
Contexte : un groupe de travail « IA comptes rendus » existe pour l'administration [S] gtia.
Apport : R/Cp. Regroupement des positions par thème, à la manière du « regroupement par proposition » de la Boussole [I].

**23. Contrôle sur pièces : demander, recevoir et dépouiller des documents administratifs** (notes, courriels, tableaux, marchés).
Qui : rapporteur et Adm ; CP selon les pratiques [I]. Fréquence : par enquête. Difficulté : 4 à 5.
Apport : C/R. Classement, chronologie, extraction d'entités, recherche plein texte.
Limite majeure : **confidentialité et secret de 25 ans** des travaux non publics [S] Fiche 61. L'outil doit fonctionner localement ou sur infrastructure souveraine. L'accès des collaborateurs aux pièces non publiques est à vérifier [I].

**24. Contrôle sur place : préparer les déplacements** (France, outre-mer, étranger) : interlocuteurs, logistique, grille de visite.
Qui : CP, Adm. Difficulté : 2.
Apport : J/V (DataCirco et données territoriales [S] https://leximpact.an.fr/).

**25. Établir la chronologie des faits** (commission d'enquête portant sur des faits).
Qui : CP, Adm. Difficulté : 3.
Apport : V. Frise reliant les pièces sources.

**26. Rédiger des parties du rapport** (état des lieux descriptif, encadrés, graphiques).
Qui : Adm surtout ; CP pour les parties propres au député [I]. Difficulté : 4.
Apport : J. Besoin explicitement cité : « aide à la rédaction de rapports (ou parties descriptives) et illustration par des graphiques » [S] gtia.
Limite : la responsabilité du rapporteur ; le rapport engage l'institution.

**27. Rédiger et prioriser les recommandations**, les rendre suivables (destinataire, échéance, vecteur : loi, décret, budget).
Qui : CP, Adm. Difficulté : 4.
Apport : Cp. Vérifier qu'une recommandation n'existe pas déjà (Cour des comptes, Sénat, rapports antérieurs) et la formuler de façon mesurable [I].

**28. Rédiger la contribution du groupe ou du député minoritaire au rapport.**
Qui : CG, CP. Fréquence : par rapport. Difficulté : 3.
Contexte : usage d'une partie « contributions des groupes ou des membres » [S] Fiche 61.
Apport : Cp/J. Repérer les passages du rapport à contester, en face à face, avec corrections apparentes [I].

**29. Préparer la communication publique** : conférence de presse après le délai de 5 jours, fiches, visuels.
Qui : CP, CG. Difficulté : 2. Apport : J/V.
Contexte : publication du rapport puis conférence de presse « en pratique » [S] Fiche 61.

**30. Suivre la mise en œuvre des recommandations six mois après** (rapport de suivi devant la commission permanente [S] Fiche 61), puis au-delà.
Qui : CP. Difficulté : 3.
Apport : A/V. Registre des recommandations, destinataires et preuves de réalisation (JO, PLF, réponses aux questions écrites).
Limite : aucun suivi consolidé publié des recommandations parlementaires n'a été trouvé, contrairement à la Cour (76 % [S]) [I, absence de résultat].

**31. Transformer les conclusions en vecteurs** : proposition de loi, amendements au PLF, questions écrites, proposition de résolution (art. 34-1 C).
Qui : CP. Difficulté : 3.
Apport : J. Le lien rapport → amendement est le point de jonction avec la Boussole [I].

**32. Demander une évaluation préalable d'un amendement au CEC (art. 146-6)** [S] Fiche 58.
Qui : CP. Fréquence : rare [I]. Difficulté : 3.
Apport : S. Pré-chiffrage avec les simulateurs LexImpact (socio-fiscal, dotations) [S].

### D. Contrôle budgétaire et évaluation financière

**33. Rédiger et envoyer les questionnaires budgétaires** (avant le 10 juillet, réponses dues au 10 octobre) [S] Fiche 60 ; art. 49 LOLF.
Qui : CP du rapporteur spécial ou pour avis, Adm. Fréquence : annuelle. Difficulté : 3.
Apport : J/Cp. Reprendre le questionnaire de l'an passé, signaler les questions restées sans réponse et les indicateurs PAP modifiés.

**34. Dépouiller les réponses aux questionnaires et suivre le taux de réponse.**
Qui : CP. Difficulté : 2 à 3.
Apport : A/R. Comparer les réponses d'une année à l'autre (chiffres changés sans explication) [I].

**35. Analyser les PAP** : crédits, objectifs, indicateurs et cibles par programme.
Qui : CP, rapporteurs. Fréquence : annuelle (octobre). Difficulté : 4.
Données : jeux ouverts des PAP 2025 et des RAP 2024 [S] https://www.data.gouv.fr/datasets/plf-2025-performance-de-la-depense-pap/informations ; https://www.data.gouv.fr/datasets/performance-de-la-depense-rap-2024/community-resources.
Apport : V/Cp. Séries d'indicateurs dans le temps ; indicateurs supprimés ou redéfinis ; cibles régulièrement manquées.
Limite : ruptures de série et changements de maquette.

**36. Analyser l'exécution** : RAP, projet de loi relative aux résultats de la gestion et d'approbation des comptes, notes d'exécution budgétaire de la Cour, mouvements de crédits en cours d'année.
Qui : CP, Adm. Fréquence : annuelle (printemps). Difficulté : 4.
Apport : V/A. Écart entre prévision et exécution par programme ; reports, annulations, décrets d'avance [I].

**37. Préparer l'évaluation du Printemps de l'évaluation** (une politique choisie par rapporteur spécial, auditions de ministres en CEPP, propositions de résolution en juin) [S] Fiche 58 et 60.
Qui : CP. Fréquence : annuelle. Difficulté : 4.
Apport : J/V.

**38. Contrôle sur pièces et sur place du rapporteur spécial** (administrations, opérateurs, entreprises publiques) [S] Fiche 60.
Qui : CP, Adm. Difficulté : 4.
Apport et limites : identiques à la tâche 23.

**39. Proposer et suivre une enquête de la Cour des comptes (art. 58-2° LOLF)**, puis l'exploiter dans un rapport.
Qui : CP. Fréquence : annuelle. Difficulté : 3.
Apport : R/Cp.

**40. Préparer les amendements de crédits en PLF** à partir des constats de contrôle (pont entre contrôle et législation).
Qui : CP. Difficulté : 3.
Apport : S/J. Chiffrage des transferts entre programmes ; recevabilité au titre de l'art. 40 [I].
Note : ce point relève de l'axe « budget » d'une autre note.

**41. Sécurité sociale : Printemps social de l'évaluation, MECSS, LACSS** [S] Fiche 60.
Qui : CP de la commission des affaires sociales. Difficulté : 4.
Apport : V/S (simulateur LexImpact socio-fiscal [S]).

### E. Veille, expertise et organes permanents

**42. Veiller sur les rapports de contrôle externes** : Cour des comptes et CRC, inspections générales, Défenseur des droits, AAI, France Stratégie. Les ranger par thème suivi par le député.
Qui : CP. Fréquence : quotidienne. Difficulté : 2.
Contexte : veille automatisable à 80 % selon la FJJ [S].
Apport : C/R/A.

**43. Préparer les travaux de délégation et de l'OPECST** : droits des femmes, outre-mer, collectivités, droits des enfants ; notes scientifiques ; études de faisabilité [S] Fiche 58 et 18.
Qui : CP des membres. Difficulté : 3 à 4.
Apport : R. État de l'art documentaire, avec citations vérifiables.

**44. Comparaison internationale** : demander ou exploiter une note de législation comparée du Sénat (élaborée « à partir de documents en langue originale », sans prise de position) [S, résumé de recherche] https://www.senat.fr/doctrav/ ; ou la faire soi-même.
Qui : CS, CP. Difficulté : 4.
Apport : R/Cp. Traduction et tableau comparatif par critère (seuil, sanction, délai).
Limite : risque élevé d'erreur sur le droit étranger.

*Tâches mineures et implicites, comptées dans les précédentes :* tenir le calendrier de la semaine de contrôle ; négocier au sein du groupe qui portera le droit de tirage ; gérer la relation avec l'administrateur de la mission ; archiver les pièces dans le respect du secret ; préparer le passage du député au questionnaire d'une nomination (art. 13 [S] Fiche 60) ; repérer les engagements pris par les ministres en audition pour les rappeler ensuite.

---

## 3. Outils et données existants

| Outil / source | Ce qu'il fait | Accès | Source |
|---|---|---|---|
| **Échéanciers Légifrance** (SGG/DILA) | Mesures attendues par loi, état, date prévue | public | Fiche 58 (lien §1.1) |
| **Baromètre de l'application des lois** (LexImpact, AN, fin 2023) | Taux et délais par loi depuis 2002, statistiques par période, alertes courriel/RSS | public, logiciel libre | https://leximpact.an.fr/ ; LCP (lien §1.2) |
| **Données du baromètre** (data.gouv, quotidien, Licence ouverte) | 2 tables : lois (commission, type, taux…) et mesures (article, décret, date prévue, état, délai) | ouvert | https://www.data.gouv.fr/datasets/donnees-du-barometre-de-lapplication-des-lois/informations |
| **Base sénatoriale de l'application des lois** (stock depuis 1981) et bilan annuel | Suivi, alertes « mesures essentielles » | public (rapports) | rapport 802 (lien §1.2) |
| **Suivi des ordonnances** (Sénat) | Habilitations, ordonnances, ratifications | public | lien §1.2 |
| **LexImpact : simulateurs socio-fiscal et dotations, DataCirco** | Chiffrage de réformes, données par circonscription | public, libre | https://leximpact.an.fr/ |
| **data.assemblee-nationale.fr / data.senat.fr** | Questions écrites (XML/JSON), amendements, organes, rapports | ouvert | data.gouv (lien §1.3) |
| **PAP / RAP open data** | Objectifs, indicateurs, crédits | ouvert | liens tâche 35 |
| **Cour des comptes** : rapports, rapport annuel de suivi des recommandations, jeux data.gouv | Recommandations et suites | ouvert, partiel | liens §1.4 |
| **NosDéputés.fr** (Regards Citoyens, depuis 2009) ; **Datan** | Activité des députés, votes | public | https://www.data.gouv.fr/fr/reuses/5fd3a48cceabae6525742865/ (Datan) ; résumé de recherche |
| **Notes de législation comparée** (Sénat) | Comparaison multi-pays | public | https://www.senat.fr/doctrav/ |
| **IA interne AN** | Aucun outil institutionnel généraliste ; expérimentations sur les comptes rendus et les amendements | — | gtia (lien §1.5) ; https://acteurspublics.fr/articles/lassemblee-nationale-cherche-son-modele-dintelligence-artificielle/ |
| **Étranger** | PBO canadien (appui au contrôle des dépenses, à la demande des parlementaires) ; Parlement européen : plateforme interne « EPGenAI Hub » en test ; GAO : travaux sur l'IA générative dans les agences | — | https://www.pbo-dpb.ca/en/faqs--faq ; https://thenextweb.com/news/european-parliament-epgenai-hub-ai-platform-meps ; https://www.gao.gov/assets/gao-25-107653-highlights.pdf (résumés de recherche) |

**Manques constatés [I]** :
- aucun registre public et structuré des **recommandations des rapports parlementaires** ni de leur suivi ;
- aucun lien automatique **amendement adopté → mesure d'application** ;
- aucun outil de **comparaison loi / décret** sur le fond ;
- pas de suivi agrégé des **engagements pris dans les réponses ministérielles** ;
- les données PAP/RAP existent, mais sans interface de séries longues pensée pour un rapporteur.

---

## 4. Pistes d'outils les plus prometteuses

Les critères de tri sont les suivants : données ouvertes disponibles ; fréquence de la tâche ; faible risque déontologique ; cohérence avec la Boussole (comparaison texte à texte, symétrie, corrections apparentes, pas de score composite).

1. **« Mes mesures en attente » : application des lois au niveau de l'amendement.**
   - Principe : jointure entre les amendements adoptés d'un député (data.assemblee-nationale.fr), les articles de la loi promulguée et les mesures du baromètre (data.gouv). Résultat : tableau de bord, alertes à six mois, premier jet de question écrite ou de QAG, et tableau pré-rempli pour le rapport 145-7.
   - Données : 100 % ouvertes [S].
   - Risque : faible.
   - Difficulté technique : la correspondance amendement → article final.
   - Tâches couvertes : 1, 2, 4, 6, 8, 11, 14.

2. **Loi ⇄ décret face à face (contrôle de conformité).**
   - Principe : reprise directe de la grammaire visuelle de la Boussole. L'article de loi reste « vierge », le décret est porté en corrections apparentes. Les points de sens (seuils, délais, conditions, sanctions) sont extraits par les règles d'extraction de l'archive, et la loupe montre les passages côte à côte.
   - Appui sourcé : cas de décrets partiels ou infidèles [S] rapport Sénat 802.
   - Tâche couverte : 3.

3. **Registre des recommandations et de leurs suites.**
   - Principe : extraction (IA + relecture) des recommandations des rapports d'information, des commissions d'enquête et des rapports de la Cour sur un thème. Chaque recommandation est rattachée à son destinataire, à son vecteur et à ses preuves de réalisation (JO, PLF, réponses ministérielles).
   - Usages : rapport à six mois de la commission d'enquête, recherche de doublons avant d'écrire une recommandation, contribution d'opposition.
   - Tâches couvertes : 27, 30, 31, 42.
   - Statut de chaque ligne : « non suivie / partielle / totale », sur le modèle de la Cour [S]. Ce sont des catégories, pas une note agrégée.

4. **Atelier d'audition (local / souverain).**
   - Principe : corpus de la mission (comptes rendus, pièces, rapports). Fonctions : fiche d'audition, questionnaire préalable, tableau « qui a dit quoi » par thème (l'équivalent du regroupement par proposition), relevé des engagements pris.
   - Appui sourcé : besoin explicite dans l'enquête de l'AN [S].
   - Tâches couvertes : 18 à 22, 25.
   - Garde-fous : hébergement souverain obligatoire (secret des travaux non publics [S]), citations toujours liées à la source, aucun « détecteur de mensonge ».

5. **Séries de performance budgétaire pour rapporteurs (PAP/RAP).**
   - Principe : visualisation pluriannuelle des indicateurs d'un programme. Signalement des ruptures de définition, des cibles revues à la baisse et des écarts entre prévision et exécution. Comparaison automatique des réponses aux questionnaires d'une année sur l'autre. Les chiffres apparaissent seulement là où ils ont un sens, indicateur par indicateur.
   - Tâches couvertes : 33 à 37.
   - Données : ouvertes [S], mais hétérogènes selon les années.

*Pistes secondaires* : suivi des questions écrites et des engagements ministériels (tâches 10 à 13) ; tableau de bord des ordonnances (tâche 7) ; aide à la note de législation comparée (tâche 44, risque élevé) ; carte des acteurs à auditionner (tâche 18).

**Lien avec la Boussole [I].** Le motif général du projet, « une édition locale se propage dans un réseau de positions », s'étend naturellement au contrôle. Un amendement adopté se propage vers une mesure réglementaire attendue, puis un décret (conforme ou non), puis une question écrite, puis un rapport d'application. Les pistes 1 et 2 prolongent la Boussole dans le temps (« versions passées ») plutôt que dans l'espace (« autres acteurs »).

---

## 5. Incertitudes et points à vérifier

- **Temps passé** : aucune donnée publiée sur la part du contrôle dans le travail des collaborateurs. Les fréquences et difficultés du §2 sont des estimations [I].
- **Accès des collaborateurs aux travaux non publics** d'une commission d'enquête (pièces, auditions à huis clos) : non vérifié. La répartition du travail entre administrateurs et collaborateurs varie sans doute selon le rapporteur [I].
- **Chiffres des questions écrites** : le « 11,6 % dans les deux mois » provient d'un résumé de recherche dont l'URL précise n'a pas pu être rouverte (erreur 503). La page officielle des statistiques de l'AN n'a pas été consultée directement.
- **Baromètre XVIIe législature** : 43 % (LCP, début 2026) contre 69 % « hors lois de moins de six mois » (autre résumé de recherche). Les périmètres diffèrent. Il faut toujours préciser le périmètre (mesures différées, arrêtés, lois récentes).
- **Écarts entre Sénat et AN** : méthodes de décompte différentes (le Sénat exclut désormais les mesures différées [S]). Les taux ne sont pas directement comparables.
- **Nombre de commissions d'enquête et de missions sous la XVIIe législature**, activité récente du CEC, format 2026 du Printemps de l'évaluation : non vérifiés (quota de recherche épuisé).
- **Pratiques étrangères d'IA** (EPRS, POST/NAO, CRS/GAO, Wissenschaftliche Dienste du Bundestag) : seulement effleurées. Aucune source solide sur un outil d'IA d'appui au contrôle en production.
- **Travaux académiques** (Rozenberg, Avril et Gicquel) et rapport final du groupe de travail Barrot-Éliaou de 2018 (proposition d'une « agence parlementaire d'évaluation » [S] https://lcp.fr/actualites/le-parlement-veut-muscler-son-controle-du-gouvernement-avec-une-batterie-dexperts) : non lus directement.
- **Asymétrie d'information** : le Gouvernement détient les données de gestion, les projets de décret et les raisons des retards (consultations, notification à l'UE : exemple PFAS [S] rapport 802). Un outil fondé sur les données ouvertes voit les **effets** (non-publication), pas les **causes**. Il ne remplace pas l'audition ni la question.
- **Déontologie et responsabilité** : tout premier jet (question, recommandation, contribution) engage le député. Les fiches sur des personnes réelles exposent à l'erreur factuelle et à la diffamation. Les références inventées sont un risque documenté [S] gtia. Les données des commissions d'enquête sont soumises au secret pénalement sanctionné [S] Fiche 61.
