# Inventaire des tâches des collaborateurs parlementaires

*304 tâches, extraites des six notes d'axe (`notes/01` à `notes/06`). La note `notes/07` couvre les outils existants et ne contient pas de tâches. Même contenu en tableur : `inventaire-taches.csv`. Classement des pistes : `SYNTHESE.md`.*

## Lire l'inventaire

**Colonnes du tableur `inventaire-taches.csv`.**
- `id` : identifiant, dont la lettre donne l'axe (C circonscription, L législatif, E contrôle et évaluation, M communication et médias, V veille, O organisation).
- `ref_note` : numéro de la tâche dans sa note, où se trouvent le détail et les sources.
- `qui` : `terrain` (circonscription), `paris`, `les deux` ou `depute`.
- `frequence` : fréquence de la tâche.
- `difficulte` : de 1 à 3. 1 = routine, 2 = méthode, 3 = jugement politique ou expertise.
- `indication_chiffree` : temps, volume ou potentiel d'automatisation, seulement quand une source en donne un.
- `donnees` : sources de données utiles. `donnees_ouvertes` dit si elles sont ouvertes : `oui`, `partiel` ou `non`.
- `apport_outil` : ce qu'un outil peut faire. `type_outil` dit sous quelle forme.
- `limites` : risques et contraintes.
- `sourcage` : `S` si la tâche est attestée par une source lue, `I` si elle est inférée, `mixte` sinon.
- `pistes` : numéros des pistes de `SYNTHESE.md` § 4 qui servent la tâche.

**Précautions.**
- **Fréquence et difficulté sont des estimations.** Aucune source ne mesure le temps passé par tâche.
- **Les échelles ont été harmonisées.** Les notes utilisaient des échelles différentes (1 à 5 pour la circonscription, 1 à 3 ailleurs). Les fourchettes, comme « 2-3 », ont été ramenées tantôt à la borne basse, tantôt à la borne haute selon l'agent d'extraction. Une difficulté peut donc varier d'un cran.
- **Les sources ne sont pas dans l'inventaire.** Chaque tâche renvoie à sa note par `ref_note`, et c'est la note qui porte les URL.

## Vue d'ensemble

| Axe | Tâches | Terrain | Paris | Les deux | Difficulté 3 | Données ouvertes (oui / partiel) |
|---|---|---|---|---|---|---|
| Circonscription | 52 | 46 | 0 | 6 | 11 | 11 / 9 |
| Travail législatif | 64 | 0 | 64 | 0 | 27 | 24 / 28 |
| Contrôle et évaluation | 44 | 0 | 44 | 0 | 14 | 18 / 17 |
| Communication, presse, réseaux sociaux | 50 | 5 | 30 | 15 | 14 | 13 / 5 |
| Veille, documentation, parties prenantes | 44 | 3 | 33 | 8 | 10 | 18 / 16 |
| Organisation, agenda, gestion du bureau | 50 | 7 | 22 | 21 | 10 | 14 / 12 |
| **Total** | **304** | 61 | 193 | 50 | 86 | 98 / 87 |

**Pourquoi la circonscription paraît sous-représentée.** Elle emploie environ 60 % des collaborateurs, mais ne compte que le quart des tâches. Deux raisons :
- les tâches de terrain sont moins nombreuses et plus répétitives (accueil, dossiers, courrier), alors que le travail parisien se découpe en nombreuses étapes de procédure ;
- elles sont moins documentées.

Le décompte des tâches ne dit donc rien du temps qu'elles prennent.

## Recoupements entre axes

Certaines tâches apparaissent dans plusieurs notes, vues sous un angle différent. Elles ont été gardées dans chaque axe pour ne pas perdre ce point de vue, et sont signalées ici.

| Tâche commune | Identifiants |
|---|---|
| Tri du courrier et des courriels, campagnes de masse | C16, C17, O29, O30, O31 |
| Accueil et permanence téléphonique | C01, O32 |
| Fichier des contacts et suivi des dossiers individuels | C04, C48, O33 |
| Suivi de l'application des lois | L48, V05, E01 à E08 |
| Questions écrites (rédaction, suivi, relance) | C19, E10 à E13, V07 |
| Amendements des autres, liasse, concurrents | L28, L29, V03 |
| Mémoire et cohérence des positions du député | L43, M40, V22 |
| Représentants d'intérêts et fiches d'amendement « clés en main » | L23, V27, V28, O43 |
| Cadeaux, invitations, déontologie | V30, O41, O44 |
| Revue de presse et veille médiatique | voir le bloc « Veille » des axes communication et veille |
| Agenda du député | voir les blocs « Agenda » des axes circonscription et organisation |

## Circonscription (52 tâches) — détail et sources : `notes/01-circonscription.md`


### Accueil et cas individuels

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C01 | Accueillir physiquement et au téléphone à la permanence | terrain | quotidienne | 1 | non | classer, rédiger : fiche de premier contact guidée (motif, organisme, urgence, pièces) qui génère le dossier ; script d'orientation | base/CRM | 6 | S |
| C02 | Qualifier une demande : ressort du député, organisme, urgence | terrain | quotidienne | 2 | oui | classer, rechercher : classifieur de motifs, organisme compétent et pièces à demander suggérés, base de circuits | assistant LLM | 6 | mixte |
| C03 | Mener un rendez-vous de permanence avec un administré | terrain | hebdomadaire | 2 | non | résumer : fiche de préparation d'une page (historique, démarches faites, réponses reçues) | assistant LLM | 6 | S |
| C04 | Ouvrir et tenir un dossier individuel (historique, pièces, mandat, relances) | terrain | quotidienne | 1 | non | classer, alerter : suivi d'état, rappels, dossiers dormants (type Caseworker.MP) | base/CRM | 6 | S |
| C05 | Suivre les dossiers de logement social (demande, commission d'attribution, mutation, insalubrité) | terrain | hebdomadaire | 3 | partiel | visualiser, rédiger : délais moyens et tension par commune pour expliquer la situation ; modèle de lettre d'appui | tableau de bord |  | S |
| C06 | Traiter titres de séjour et naturalisation (rendez-vous introuvables, dossiers bloqués, ANEF) | terrain | hebdomadaire | 3 | non | rédiger, calculer : modèles de saisine, suivi des délais, agrégation anonyme des blocages | base/CRM |  | S |
| C07 | Traiter les prestations sociales (CAF, CPAM, CARSAT, MSA, MDPH) : retards, indus, droits | terrain | hebdomadaire | 2 | oui | rechercher, rédiger : voie de recours et délais rappelés, premier jet de saisine | formulaire/règles |  | mixte |
| C08 | Traiter les demandes d'emploi, d'appui et de stages (France Travail) | terrain | hebdomadaire | 2 | oui | rechercher : orientation vers les dispositifs | base/CRM |  | mixte |
| C09 | Traiter impôts, URSSAF et litiges avec une administration fiscale | terrain | mensuelle | 2 |  | rechercher, rédiger : comme T07 | formulaire/règles |  | I |
| C10 | Accompagner les entreprises en difficulté (délais de paiement, aides, contentieux, plans sociaux) | terrain | mensuelle | 3 | oui | résumer, alerter : fiche entreprise automatique ; alerte sur les procédures BODACC de la circonscription | moteur de veille/alerte |  | S |
| C11 | Rédiger le courrier d'intervention auprès d'une administration ou du préfet | terrain | quotidienne | 2 | non | rédiger : premier jet adapté au destinataire et au motif, avec références du dossier | assistant LLM | 6 | S |
| C12 | Relancer, suivre les réponses, clôturer et répondre à l'administré | terrain | quotidienne | 1 | non | alerter, classer : échéancier, relances automatiques, détection des dossiers sans réponse | base/CRM | 6 | S |
| C13 | Gérer les attentes et dire non (hors compétence, passe-droits) | terrain | hebdomadaire | 3 |  | rédiger : modèles de réponse explicative, fiches sur ce que peut un député | assistant LLM | 6 | mixte |
| C14 | Orienter vers les relais locaux (France services, CCAS, associations, avocats, Défenseur des droits) | terrain | hebdomadaire | 1 | oui | rechercher, visualiser : annuaire géolocalisé des relais | base/CRM | 6 | mixte |
| C15 | Repérer les situations d'urgence ou de détresse (expulsion, violences, risque suicidaire) | terrain | ponctuelle | 3 |  | alerter : marquage urgence à la saisie, protocole et numéros | formulaire/règles | 6 | I |

### Courrier, courriels, campagnes

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C16 | Trier le courrier et les courriels entrants | terrain | quotidienne | 1 | non | classer : étiquetage automatique, priorisation (cas individuels avant opinions) | assistant LLM | 6 | S |
| C17 | Répondre aux courriels d'opinion et aux campagnes de masse | les deux | hebdomadaire | 1 | non | classer, rédiger : regroupement des messages quasi identiques, réponse type alignée sur le vote, tableau qui écrit sur quoi | assistant LLM | 6 | S |
| C18 | Écrire lettres de félicitations, condoléances et remerciements | terrain | hebdomadaire | 1 | partiel | rédiger : premiers jets personnalisés | assistant LLM | 6 | S |
| C19 | Transmettre à Paris le courrier utile (questions écrites, propositions de loi suggérées) | les deux | hebdomadaire | 1 | non | classer : transmission étiquetée vers l'équipe de Paris | formulaire/règles | 8 | I |

### Relations avec le territoire

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C20 | Entretenir les relations avec maires et présidents d'intercommunalité | terrain | hebdomadaire | 2 | oui | visualiser : carte des communes visitées et non visitées, dernière rencontre, engagements | base/CRM |  | S |
| C21 | Suivre les dossiers des communes (projets, blocages avec l'État, fermetures) | terrain | hebdomadaire | 2 | partiel | résumer, visualiser : fiche par commune (population, projets financés, dossiers en cours) | tableau de bord | 5 | mixte |
| C22 | Entretenir les relations avec le conseil départemental et le conseil régional | terrain | mensuelle | 2 |  | résumer, visualiser : comme T21 | tableau de bord |  | I |
| C23 | Entretenir les relations avec la préfecture et la sous-préfecture | terrain | mensuelle | 2 |  | alerter, classer : suivi des sujets ouverts avec l'État | base/CRM |  | mixte |
| C24 | Entretenir les relations avec les associations | terrain | hebdomadaire | 1 | oui | visualiser, alerter : cartographie des associations par commune et thème, repérage des créations | base/CRM |  | mixte |
| C25 | Entretenir les relations avec entreprises, chambres consulaires et syndicats | terrain | mensuelle | 2 | oui | résumer : fiche de préparation des visites d'entreprise | assistant LLM |  | S |
| C26 | Animer un conseil de circonscription ou des comités thématiques | terrain | ponctuelle | 2 |  | rédiger, résumer : invitations, comptes rendus, suivi des propositions | assistant LLM |  | S |
| C27 | Organiser les visites de l'Assemblée pour écoles et associations | les deux | mensuelle | 1 |  | classer : réservations et listes | formulaire/règles |  | S |

### Financements et projets locaux

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C28 | Accompagner les communes dans leurs demandes DETR, DSIL ou Fonds vert | terrain | annuelle | 2 | oui | visualiser, comparer : financements par commune, comparaison avec communes similaires, communes qui ne déposent jamais | tableau de bord | 5 | mixte |
| C29 | Préparer la commission DETR : avis sur les projets de plus de 100 000 euros | terrain | annuelle | 2 | partiel | comparer : fiche par projet (commune, historique, équité territoriale) | comparateur |  | S |
| C30 | Répondre aux associations demandant une subvention | terrain | mensuelle | 1 |  | rechercher, rédiger : orientation vers les guichets (FDVA, région, département), réponse type | base/CRM |  | S |
| C31 | Suivre grands projets d'infrastructure et appels à projets nationaux | terrain | mensuelle | 2 | oui | alerter, visualiser : alerte sur les appels ouverts, carte des programmes par commune | moteur de veille/alerte |  | I |

### Agenda, représentation, événements

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C32 | Construire et arbitrer l'agenda du député en circonscription | les deux | quotidienne | 3 | non | visualiser, calculer : carte des communes visitées sur 12 mois, détection de conflits, temps de trajet | tableau de bord |  | S |
| C33 | Trier les invitations et y répondre | terrain | quotidienne | 2 | non | classer, rédiger : extraction date, lieu, organisateur ; brouillon de réponse ou d'excuse | assistant LLM |  | I |
| C34 | Préparer les dossiers de déplacement (contexte, interlocuteurs, chiffres, éléments de langage) | terrain | hebdomadaire | 2 | partiel | résumer : fiche commune générée automatiquement multi-sources | assistant LLM | 5 | S |
| C35 | Rédiger les discours locaux (vœux, 8 Mai, 11 Novembre, inaugurations) | terrain | hebdomadaire | 2 | partiel | rédiger : premier jet à partir de la fiche commune et du thème | assistant LLM | 5 | S |
| C36 | Accompagner le député, prendre des notes, suivre les engagements pris | terrain | hebdomadaire | 1 |  | rédiger, classer : capture rapide vocal vers note, liste d'engagements avec échéances | assistant LLM |  | mixte |
| C37 | Organiser réunions publiques et comptes rendus de mandat | terrain | ponctuelle | 2 |  | résumer : logistique, invitations ciblées, synthèse des questions posées | assistant LLM |  | S |
| C38 | Représenter le député en son absence | terrain | mensuelle | 2 |  | résumer : fiche de contexte (cf. T34) | assistant LLM |  | S |

### Communication et presse locale

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C39 | Assurer la revue de presse locale quotidienne | terrain | quotidienne | 1 | partiel | rechercher, résumer, classer : collecte, déduplication, résumé, marquage par commune et thème | moteur de veille/alerte |  | S |
| C40 | Gérer les relations avec la presse locale (communiqués, tribunes, journalistes) | terrain | hebdomadaire | 2 |  | rédiger : premier jet de communiqué | assistant LLM |  | S |
| C41 | Animer réseaux sociaux, site et lettre d'information | terrain | quotidienne | 1 |  | rédiger : calendrier éditorial, déclinaison d'un contenu par canal, visuels | assistant LLM |  | S |
| C42 | Valoriser l'action locale (bilan des dossiers aidés, financements, présence) | terrain | annuelle | 2 | non | visualiser, calculer : bilan agrégé et anonymisé, carte des visites | tableau de bord |  | S |

### Veille territoriale et remontée vers Paris

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C43 | Veiller sur les mouvements des concurrents et partenaires politiques locaux | terrain | continue | 3 | partiel | alerter : veille presse et réseaux par acteur | moteur de veille/alerte |  | S |
| C44 | Agréger les cas individuels en signaux pour le travail législatif | les deux | mensuelle | 3 | partiel | classer, rechercher, rédiger : regroupement thématique, questions écrites déjà posées, brouillon de question écrite ; pont avec la Boussole | modèle+interface | 8 | S |
| C45 | Préparer le député le vendredi ou le lundi (synthèse de la semaine en circonscription) | les deux | hebdomadaire | 2 | non | résumer : note hebdomadaire générée (agenda, dossiers chauds, presse, engagements dus) | assistant LLM |  | I |
| C46 | Comprendre le territoire (profils socio-économiques, évolutions, fractures) | terrain | ponctuelle | 2 | oui | visualiser : portrait automatique par commune ou IRIS | tableau de bord | 5 | I |
| C47 | Retrouver un précédent dans les dossiers et courriers passés | terrain | hebdomadaire | 2 | non | rechercher : recherche plein texte et sémantique | assistant LLM | 6 8 | mixte |

### Fichiers et base de données

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C48 | Tenir le fichier des contacts (élus, associations, presse, partenaires, administrés) | terrain | continue | 3 | non | classer : fichiers séparés par finalité, dédoublonnage, durées de conservation et purge | base/CRM | 6 | S |
| C49 | Répondre aux demandes d'exercice des droits RGPD et sécuriser les données | terrain | ponctuelle | 2 | non | rechercher, alerter : registre, journal d'accès, export des données d'une personne | formulaire/règles | 6 | mixte |

### Gestion de la permanence

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C50 | Gérer l'administration et la logistique de la permanence (bail, fournitures, budget DFP, horaires) | terrain | mensuelle | 1 | non | calculer, classer : suivi des dépenses par catégorie de la DFP | aucun |  | S |
| C51 | Assurer la sécurité de la permanence et du personnel (incivilités, menaces, procédures d'alerte) | terrain | ponctuelle | 3 |  | classer : registre des incidents, aide au dépôt de plainte | formulaire/règles |  | I |

### Politique et élections

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| C52 | Assurer la liaison avec le parti local et préparer les échéances électorales | terrain | ponctuelle | 3 |  | classer : séparation stricte des fichiers et des temps de travail, calendrier | formulaire/règles |  | mixte |

## Travail législatif (64 tâches) — détail et sources : `notes/02-travail-legislatif.md`


### Veille et anticipation

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L01 | Suivre l'ordre du jour et repérer les textes où le député veut intervenir | paris | hebdomadaire | 1 | oui | alerter : calendrier personnel par thème | moteur de veille/alerte | 3 | I |
| L02 | Repérer les textes déposés (projets, propositions, Sénat compris) et transmis | paris | quotidienne | 1 | partiel | alerter, rechercher : alerte par mots-clés et par code modifié | moteur de veille/alerte | 3 | mixte |
| L03 | Calculer les délais de dépôt de chaque texte et les mettre au calendrier | paris | par texte | 2 | partiel | calculer, alerter : 3e jour ouvrable à 17 h et alerte | formulaire/règles | 3 | S |
| L04 | Faire la veille sectorielle et presse sur les sujets du député | paris | quotidienne | 1 | non | résumer, classer : revues de presse et notes | moteur de veille/alerte |  | mixte |
| L05 | Prioriser les textes et les articles selon engagements, circonscription et ligne du groupe | depute | hebdomadaire | 3 | non | visualiser : matrice des enjeux, mémoire des priorités | base/CRM |  | I |
| L06 | Anticiper l'issue d'un vote (rapports de force, cohésion, abstentions) | paris | par texte | 3 | oui | simuler : majorités à partir des votes passés sur sujets voisins | simulateur |  | I |

### Comprendre le texte

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L07 | Lire et résumer un projet ou une proposition de loi article par article | paris | par texte | 2 | partiel | résumer, visualiser : résumé et carte des articles | assistant LLM |  | mixte |
| L08 | Reconstituer le droit existant modifié (texte consolidé avant et après chaque article) | paris | par texte | 3 | oui | comparer, visualiser : consolidation automatique et diff des versions | comparateur | 1 | S |
| L09 | Lire l'étude d'impact du projet de loi | paris | par texte | 2 | oui | résumer, rechercher : extraire les chiffres, repérer rubriques vides ou état néant | assistant LLM |  | S |
| L10 | Lire l'avis du Conseil d'État sur le projet de loi | paris | par texte | 3 | oui | résumer, comparer : relier chaque point de l'avis à l'article visé | assistant LLM |  | S |
| L11 | Situer le texte dans la jurisprudence constitutionnelle | paris | par texte | 3 | oui | rechercher : précédents par notion | assistant LLM |  | I |
| L12 | Repérer les unités de sens d'un article pour savoir où amender | paris | par texte | 2 | oui | classer, visualiser : segmentation et coloration, déjà dans la Boussole | modèle+interface | 1 | I |
| L13 | Produire une note de synthèse pour le député (enjeux, positions, propositions) | paris | par texte | 2 | partiel | rédiger, résumer : premier jet structuré | assistant LLM |  | S |

### Rédiger les amendements

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L14 | Traduire une intention politique en dispositif d'amendement | paris | par texte | 3 | oui | rédiger : premier jet de dispositif, choix de la formule, vérification de syntaxe | assistant LLM | 1 | S |
| L15 | Placer l'amendement : bon article, bon alinéa, texte de la commission | paris | par texte | 2 | partiel | comparer : vérifier que les mots cités existent dans la version en vigueur | formulaire/règles | 1 2 | S |
| L16 | Vérifier la recevabilité financière (article 40) : charge, perte de recettes, base de référence | paris | par texte | 3 | partiel | alerter, rechercher : pré-contrôle et amendements semblables déjà jugés | formulaire/règles | 2 | S |
| L17 | Rédiger le gage (compensation d'une perte de recettes) | paris | par texte | 1 | oui | rédiger : insertion automatique du gage adapté | formulaire/règles | 2 | S |
| L18 | Vérifier le lien avec le texte (article 45) et la règle de l'entonnoir | paris | par texte | 3 | oui | comparer, rechercher : périmètre du texte initial, décisions de censure | assistant LLM | 2 | S |
| L19 | Vérifier le domaine de la loi (article 41) pour éviter le réglementaire | paris | par texte | 3 | partiel | alerter : signaler le risque d'empiètement réglementaire | formulaire/règles | 2 | S |
| L20 | Rédiger l'exposé sommaire (objet, justification, chiffrage) | paris | par texte | 2 | non | rédiger : premier jet à partir de la note et du dispositif | assistant LLM | 2 | S |
| L21 | Décliner des amendements de repli et des amendements d'appel | paris | par texte | 3 | non | rédiger, simuler : variantes graduées et ordre d'appel | assistant LLM | 1 | S |
| L22 | Rédiger des sous-amendements | paris | par texte | 2 | oui | comparer : vérifier la compatibilité avec l'amendement visé | formulaire/règles |  | S |
| L23 | Reprendre une fiche amendement de représentant d'intérêts : la tracer, la réécrire, décider de la porter | paris | par texte | 3 | partiel | comparer, rechercher : similarité avec textes reçus ou déjà déposés, journal de traçabilité | base/CRM | 11 | mixte |
| L24 | Déposer sur Eloi (ou Ameli au Sénat), puis rectifier ou retirer | paris | par texte | 1 | non | rédiger : modèle pré-rempli, contrôle de forme avant dépôt | formulaire/règles |  | S |
| L25 | Chercher des cosignataires et gérer les cosignatures | paris | par texte | 2 | oui | rechercher, visualiser : carte des alliés possibles par alinéa | tableau de bord | 1 | S |
| L26 | Éviter les doublons avec son propre groupe | paris | par texte | 2 | partiel | comparer, alerter : détection d'identiques avant dépôt | comparateur | 2 | I |
| L27 | Demander un chiffrage (administration, LexImpact, ministère) pour un amendement fiscal ou social | paris | par texte | 3 | partiel | simuler, calculer : chiffrage de l'amendement | simulateur |  | I |

### Commission

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L28 | Lire la liasse des amendements déposés en commission dès sa publication | paris | par texte | 2 | oui | classer, résumer : regroupement par article et alinéa, synthèse en une phrase, identiques | assistant LLM | 1 | S |
| L29 | Repérer les amendements concurrents du sien et ceux qui le feraient tomber | paris | par texte | 3 | oui | comparer, visualiser : regrouper par proposition, voir le sens de chaque rédaction | modèle+interface | 1 | I |
| L30 | Préparer la défense orale des amendements (argumentaire, réponses aux objections) | paris | par texte | 2 | non | rédiger : premier jet d'argumentaire, objections probables | assistant LLM | 1 | I |
| L31 | Préparer les positions de vote du député sur les amendements des autres, alignées sur le groupe | paris | par texte | 3 | non | classer, résumer : tableau avec position proposée et justification | tableau de bord | 1 | I |
| L32 | Suivre la réunion de commission en direct (sort des amendements, rectifications orales) | paris | par texte | 1 | partiel | visualiser, alerter : tableau de bord en temps réel | tableau de bord | 1 | S |
| L33 | Reconstituer le texte adopté par la commission et le comparer au texte initial | paris | par texte | 2 | partiel | comparer : consolidation automatique des amendements adoptés | comparateur | 1 | I |
| L34 | Travailler avec les administrateurs de commission (recevabilité, rédaction, placement) | paris | par texte | 2 | non | rédiger : préparer des questions précises | aucun | 1 | S |

### Séance publique

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L35 | Redéposer pour la séance (amendements rejetés, nouveaux sur le texte de la commission) | paris | par texte | 2 | partiel | comparer : transposer les amendements vers le texte de la commission (renumérotation) | comparateur | 1 | I |
| L36 | Lire le dérouleur (feuille jaune) et l'ordre d'appel en temps réel | paris | par texte | 2 | partiel | alerter : savoir quand l'amendement sera appelé, prévenir le député | moteur de veille/alerte | 1 | S |
| L37 | Anticiper l'ordre d'appel et les amendements tombés | paris | par texte | 3 | oui | simuler : cascade (si A adopté, B et C tombent) | simulateur | 1 | S |
| L38 | Préparer les discussions communes (amendements exclusifs discutés ensemble) | paris | par texte | 2 | oui | classer, comparer : prévoir le regroupement des rédactions | comparateur | 1 | S |
| L39 | Gérer le temps de parole sous temps législatif programmé | paris | par texte | 3 | non | calculer, classer : temps restant et priorisation des amendements à défendre | tableau de bord |  | S |
| L40 | Suivre réserves, secondes délibérations et votes bloqués | paris | par texte | 2 | partiel | alerter : alerte en direct, mise à jour du texte | moteur de veille/alerte |  | mixte |
| L41 | Préparer la discussion générale et l'explication de vote du député | paris | par texte | 2 | partiel | rédiger : premier jet, vérification des chiffres cités | assistant LLM |  | S |
| L42 | Relayer les consignes de vote du groupe et les demandes de scrutin public | paris | par texte | 2 | non | rédiger, classer : fiche de vote par amendement | tableau de bord |  | I |
| L43 | Vérifier la cohérence des votes et déclarations passés du député | paris | par texte | 2 | oui | rechercher : retrouver votes et déclarations dans le corpus du député | assistant LLM | 7 | S |

### Navette, CMP, fin de parcours

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L44 | Suivre la navette (texte transmis, amendements sénatoriaux, articles conformes) | paris | par texte | 2 | partiel | visualiser, alerter : articles restant en discussion, alerte sur article conforme | moteur de veille/alerte | 2 | S |
| L45 | Appliquer l'entonnoir en deuxième et nouvelle lecture avec ses dérogations | paris | par texte | 3 | oui | alerter : filtre de recevabilité entonnoir | formulaire/règles | 2 | S |
| L46 | Suivre la CMP et les amendements recevables sur son texte | paris | par texte | 2 | partiel | comparer : tableau à trois colonnes (Assemblée, Sénat, CMP) | comparateur |  | S |
| L47 | Préparer une saisine du Conseil constitutionnel (griefs, 60 signatures) | paris | par texte | 3 | oui | rechercher, classer : jurisprudence, repérage des cavaliers probables | assistant LLM |  | mixte |
| L48 | Suivre l'application de la loi (décrets, rapports demandés) | paris | annuelle | 2 | oui | alerter : alerte de retard (délai de six mois) | moteur de veille/alerte | 4 | mixte |

### Quand le député est rapporteur

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L49 | Organiser et préparer les auditions (personnes, questionnaires, comptes rendus) | paris | par texte | 2 | non | rédiger, résumer : questionnaire de premier jet, synthèse des contributions | assistant LLM |  | S |
| L50 | Rédiger ou relire le rapport et le tableau comparatif | paris | par texte | 3 | partiel | comparer, rédiger : tableau comparatif automatique | comparateur |  | I |
| L51 | Donner les avis du rapporteur sur chaque amendement et préparer la réunion de balayage | paris | par texte | 3 | partiel | résumer, comparer : tableau pré-rempli (synthèse, identiques, avis passés) | tableau de bord |  | S |
| L52 | Déposer les amendements du rapporteur (rédactionnels, de coordination) | paris | par texte | 2 | partiel | comparer, alerter : incohérences et renvois cassés après adoption | comparateur |  | S |

### Lois de finances

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L53 | Lire le PLF et les documents budgétaires (missions, programmes, projets annuels de performance) | paris | annuelle | 3 | oui | visualiser, comparer : navigation par mission, comparaison avec l'année précédente | tableau de bord | 13 | S |
| L54 | Rédiger des amendements de crédits (transferts entre programmes d'une même mission) | paris | annuelle | 2 | partiel | calculer : vérificateur d'équilibre (somme nulle, AE et CP) | formulaire/règles | 13 | mixte |
| L55 | Rédiger des amendements fiscaux de première partie et les chiffrer | paris | annuelle | 3 | partiel | simuler, calculer : impact sur foyers types et recettes | simulateur | 13 | S |
| L56 | Amender le PLFSS dans le cadre de l'ONDAM et des objectifs par branche | paris | annuelle | 3 | oui | calculer : vérifier l'équilibre au sein de l'objectif | formulaire/règles | 13 | S |
| L57 | Préparer les rapports et avis budgétaires (rapporteur spécial ou pour avis d'une mission) | paris | annuelle | 3 | partiel | visualiser : séries historiques, graphiques | tableau de bord |  | I |
| L58 | Suivre l'examen accéléré des lois de finances (délais de 70 et 50 jours, 49.3, ordonnances) | paris | annuelle | 2 | oui | visualiser, alerter : calendrier et état du texte en direct | tableau de bord |  | S |

### Propositions de loi et niche

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L59 | Rédiger une proposition de loi (exposé des motifs, articles, gage, contrôle de l'article 40) | paris | par texte | 3 | partiel | rédiger, rechercher : premier jet légistique, PPL antérieures sur le même sujet | assistant LLM |  | S |
| L60 | Préparer une niche parlementaire (choix des textes, obstruction, motions de rejet) | paris | annuelle | 3 | partiel | simuler, calculer : estimation du temps d'examen selon le nombre d'amendements | simulateur |  | S |

### Questions au Gouvernement

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L61 | Rédiger des questions écrites, vérifier les doublons, relancer ou signaler | paris | hebdomadaire | 2 | oui | rechercher, alerter : détecter doublons, suivre les délais, signaler | moteur de veille/alerte |  | S |
| L62 | Préparer les questions au Gouvernement et les questions orales sans débat | paris | hebdomadaire | 2 | partiel | rédiger : premier jet, vérification des chiffres | assistant LLM |  | I |

### Coordination : groupe, ministères, représentants d'intérêts

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| L63 | Faire le lien avec le groupe (réunion hebdomadaire, responsables de texte, répartition des amendements) | paris | hebdomadaire | 3 | non | visualiser : tableau partagé des amendements du groupe par article et par porteur | tableau de bord |  | I |
| L64 | Gérer les relations avec cabinets ministériels et représentants d'intérêts (rendez-vous, traçabilité) | paris | quotidienne | 2 | partiel | rechercher, comparer : journal des contacts, rapprochement amendements et contributions | base/CRM |  | mixte |

## Contrôle et évaluation (44 tâches) — détail et sources : `notes/03-controle-evaluation.md`


### Application des lois (service après-vote)

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| E01 | Tenir la liste des mesures attendues pour les lois suivies par le député | paris | continue | 1 | oui | visualiser, alerter : tableau de bord filtré sur « mes lois / mes amendements », alerte au dépassement de six mois | tableau de bord | 4 | mixte |
| E02 | Relier un amendement adopté du député à la mesure réglementaire qu'il appelle | paris | ponctuelle | 2 | oui | comparer, classer : correspondance automatique amendement adopté, article de la loi consolidée, mesure de l'échéancier | modèle+interface | 4 | mixte |
| E03 | Vérifier qu'un décret publié traduit fidèlement la loi (contrôle de conformité) | paris | ponctuelle | 3 | oui | comparer, rédiger : article de loi et décret côte à côte, corrections apparentes, extraction des seuils, dates, conditions | comparateur | 4 | mixte |
| E04 | Préparer le rapport d'application à six mois (art. 145-7 al. 1) | paris | ponctuelle | 2 | oui | rédiger : tableau pré-rempli et premier jet de la partie descriptive | assistant LLM | 4 | mixte |
| E05 | Préparer l'évaluation à trois ans en confrontant la loi aux critères de l'étude d'impact | paris | ponctuelle | 3 | partiel | résumer, comparer : extraction des objectifs et indicateurs promis, recherche des données observées | assistant LLM | 4 | mixte |
| E06 | Préparer les questions du député pour un débat d'application des lois en séance | paris | annuelle | 1 | oui | classer, rédiger : classement des lois du champ du groupe par retard, premier jet de question | assistant LLM | 4 | mixte |
| E07 | Suivre les ordonnances : habilitation, publication, ratification | paris | continue | 2 | oui | visualiser, alerter : frise habilitation, ordonnance, ratification, alerte sur la caducité | tableau de bord | 4 | mixte |
| E08 | Suivre les rapports demandés au Gouvernement par la loi | paris |  | 1 | partiel | alerter, visualiser : liste « rapports dus, échus, non remis » par député auteur | tableau de bord | 4 | mixte |
| E09 | Signaler des mesures prioritaires au ministre chargé des relations avec le Parlement et au SGG | paris |  | 2 | partiel | classer : classement de l'arriéré selon des critères explicites (ancienneté, bénéficiaires, saillance) | tableau de bord |  | mixte |

### Questions écrites et questions orales comme outils de contrôle

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| E10 | Rédiger des questions écrites, souvent à partir de sollicitations de la circonscription | paris | hebdomadaire | 1 | oui | rédiger, rechercher : premier jet, recherche des questions et réponses déjà données sur le sujet | assistant LLM | 8 | mixte |
| E11 | Suivre les réponses aux questions écrites et relancer | paris | continue | 1 | oui | alerter : échéancier des questions sans réponse, proposition de signalement au groupe | tableau de bord | 4 8 | mixte |
| E12 | Analyser la qualité d'une réponse ministérielle | paris |  | 1 | oui | résumer, classer : extraction des engagements (date, montant, texte à venir) et suivi de leur réalisation | assistant LLM | 8 | I |
| E13 | Produire des statistiques de contrôle par ministère (taux et délais de réponse) | paris |  | 1 | oui | visualiser : taux et délais de réponse par ministère pour une communication ou la Conférence des présidents | tableau de bord | 8 | mixte |
| E14 | Préparer les QAG et questions orales liées à un retard d'application ou à un rapport non remis | paris | hebdomadaire | 1 | oui | rédiger, alerter : proposition de sujet de QAG adossé à une échéance dépassée | assistant LLM | 4 | I |

### Missions d'information, commissions d'enquête, CEC

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| E15 | Repérer des sujets de contrôle et préparer la demande (droit de tirage, évaluation CEC) | paris | annuelle | 3 | partiel | rechercher, classer : cartographie des rapports existants et repérage des angles morts | assistant LLM |  | mixte |
| E16 | Rédiger l'exposé des motifs de la proposition de résolution | paris |  | 2 | partiel | rédiger : premier jet de l'exposé | assistant LLM |  | S |
| E17 | Vérifier qu'aucune procédure judiciaire en cours ne borne le champ de l'enquête | paris |  | 2 | non | rechercher : veille de presse, apport faible | aucun |  | mixte |
| E18 | Bâtir le programme d'auditions (choix, équilibre des points de vue, ordre) | paris | ponctuelle | 2 | partiel | classer, visualiser : cartographie des acteurs, vérification que toutes les positions sont représentées | modèle+interface | 12 | I |
| E19 | Rédiger les questionnaires préalables aux auditions | paris | hebdomadaire | 2 | non | rédiger : premier jet nourri des contradictions repérées entre auditions et documents | assistant LLM | 12 | mixte |
| E20 | Préparer la fiche d'audition du député | paris | ponctuelle | 2 | partiel | résumer, rédiger : fiche et questions de relance | assistant LLM | 12 | mixte |
| E21 | Repérer en temps réel les contradictions pendant une audition sous serment | paris | ponctuelle | 3 | non | alerter, comparer : transcription en direct comparée au corpus | assistant LLM | 12 | I |
| E22 | Exploiter les comptes rendus d'auditions (synthèse par thème, « qui a dit quoi ») | paris | continue | 2 | non | résumer, comparer, classer : regroupement des positions par thème | assistant LLM | 12 | mixte |
| E23 | Dépouiller les documents administratifs obtenus par contrôle sur pièces | paris | ponctuelle | 3 | non | classer, résumer, rechercher : classement, chronologie, extraction d'entités, recherche plein texte | modèle+interface |  | mixte |
| E24 | Préparer les déplacements de contrôle sur place (interlocuteurs, logistique, grille de visite) | paris |  | 1 | oui | rédiger, visualiser : grille de visite et données territoriales | assistant LLM |  | mixte |
| E25 | Établir la chronologie des faits d'une commission d'enquête | paris |  | 2 | non | visualiser : frise reliant les pièces sources | modèle+interface | 12 | I |
| E26 | Rédiger des parties du rapport (état des lieux, encadrés, graphiques) | paris |  | 3 | partiel | rédiger, visualiser : aide à la rédaction des parties descriptives et graphiques | assistant LLM |  | mixte |
| E27 | Rédiger et prioriser des recommandations suivables (destinataire, échéance, vecteur) | paris |  | 3 | partiel | comparer, rédiger : vérifier qu'une recommandation n'existe pas déjà, la formuler de façon mesurable | assistant LLM | 12 | I |
| E28 | Rédiger la contribution du groupe ou du député minoritaire au rapport | paris | ponctuelle | 2 | non | comparer, rédiger : passages du rapport à contester en face à face, corrections apparentes | comparateur | 12 | mixte |
| E29 | Préparer la communication publique après le rapport (conférence de presse, fiches, visuels) | paris |  | 1 | oui | rédiger, visualiser : fiches et visuels | assistant LLM |  | mixte |
| E30 | Suivre la mise en œuvre des recommandations six mois après, puis au-delà | paris |  | 2 | partiel | alerter, visualiser : registre des recommandations, destinataires et preuves de réalisation | base/CRM | 12 | mixte |
| E31 | Transformer les conclusions en vecteurs (PPL, amendements au PLF, questions écrites, PPR) | paris |  | 2 | partiel | rédiger : premier jet des vecteurs ; lien rapport vers amendement | assistant LLM | 12 | I |
| E32 | Demander une évaluation préalable d'un amendement au CEC (art. 146-6) | paris | ponctuelle | 2 | oui | simuler : pré-chiffrage avec les simulateurs LexImpact | simulateur | 12 | mixte |

### Contrôle budgétaire et évaluation financière

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| E33 | Rédiger et envoyer les questionnaires budgétaires (avant le 10 juillet, réponses dues au 10 octobre) | paris | annuelle | 2 | partiel | rédiger, comparer : reprise du questionnaire précédent, questions sans réponse, indicateurs PAP modifiés | assistant LLM | 12 | mixte |
| E34 | Dépouiller les réponses aux questionnaires et suivre le taux de réponse | paris | annuelle | 2 | non | alerter, résumer, comparer : comparaison d'une année à l'autre, chiffres changés sans explication | assistant LLM | 12 | mixte |
| E35 | Analyser les PAP : crédits, objectifs, indicateurs et cibles par programme | paris | annuelle | 3 | oui | visualiser, comparer : séries d'indicateurs, indicateurs supprimés ou redéfinis, cibles manquées | tableau de bord | 12 | S |
| E36 | Analyser l'exécution budgétaire (RAP, loi d'approbation des comptes, notes de la Cour, mouvements de crédits) | paris | annuelle | 3 | partiel | visualiser, alerter : écart prévision/exécution par programme, reports, annulations, décrets d'avance | tableau de bord | 12 | mixte |
| E37 | Préparer l'évaluation du Printemps de l'évaluation | paris | annuelle | 3 | partiel | rédiger, visualiser : aide à la préparation de la politique évaluée | assistant LLM | 12 | mixte |
| E38 | Exercer le contrôle sur pièces et sur place du rapporteur spécial | paris |  | 3 | non | classer, résumer : identique à la tâche 23 | modèle+interface |  | mixte |
| E39 | Proposer et suivre une enquête de la Cour des comptes (art. 58-2° LOLF), puis l'exploiter | paris | annuelle | 2 | oui | résumer, comparer : exploitation de l'enquête dans un rapport | assistant LLM |  | mixte |
| E40 | Préparer les amendements de crédits en PLF à partir des constats de contrôle | paris |  | 2 | oui | simuler, rédiger : chiffrage des transferts entre programmes, recevabilité art. 40 | simulateur |  | I |
| E41 | Suivre la sécurité sociale : Printemps social de l'évaluation, MECSS, LACSS | paris |  | 3 | partiel | visualiser, simuler : appui avec le simulateur socio-fiscal | simulateur |  | mixte |

### Veille, expertise et organes permanents

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| E42 | Veiller sur les rapports de contrôle externes (Cour des comptes, inspections, DDD, AAI, France Stratégie) | paris | quotidienne | 1 | oui | classer, résumer, alerter : rangement par thème suivi par le député | moteur de veille/alerte | 12 | mixte |
| E43 | Préparer les travaux de délégation et de l'OPECST | paris |  | 3 | partiel | résumer : état de l'art documentaire avec citations vérifiables | assistant LLM |  | S |
| E44 | Réaliser ou exploiter une comparaison internationale (note de législation comparée du Sénat) | paris |  | 3 | partiel | comparer, résumer : traduction et tableau comparatif par critère (seuil, sanction, délai) | comparateur |  | mixte |

## Communication, presse, réseaux sociaux (50 tâches) — détail et sources : `notes/04-communication-presse.md`


### Veille et renseignement médiatique

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M01 | Faire la revue de presse quotidienne (nationale et PQR) sur l'élu, ses sujets et sa circonscription | les deux | quotidienne | 1 | partiel | résumer, classer : synthèse par thème et tonalité, dédoublonnée (potentiel 80 % selon Jean-Jaurès) | moteur de veille/alerte |  | S |
| M02 | Surveiller les réseaux sociaux (mentions de l'élu, hashtags, adversaires) | paris | quotidienne | 2 | non | alerter, classer : alerte sur un pic, regroupement par narratif | moteur de veille/alerte |  | mixte |
| M03 | Surveiller l'e-réputation (Wikipédia, Google, autocomplétion, vidéos détournées) | paris | hebdomadaire | 2 | oui | alerter, comparer : suivi des changements dans le temps | moteur de veille/alerte |  | mixte |
| M04 | Suivre les adversaires (communiqués, votes, interventions des concurrents locaux et nationaux) | les deux | hebdomadaire | 2 | oui | comparer, visualiser : positions, votes et chronologie | tableau de bord |  | I |
| M05 | Suivre l'agenda médiatique (sujets qui montent, marronniers, calendrier parlementaire) | paris | quotidienne | 2 | oui | comparer, alerter : croise l'ordre du jour de l'AN et les tendances médiatiques | moteur de veille/alerte |  | I |
| M06 | Repérer les extraits de l'élu repris ou détournés par des tiers | paris | hebdomadaire | 2 | non | rechercher : recherche par empreinte vidéo ou transcription | moteur de veille/alerte |  | mixte |

### Relations presse

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M07 | Rédiger des communiqués de presse (réaction, annonce, dépôt d'amendement ou de PPL) | les deux | hebdomadaire | 2 | non | rédiger : premier jet depuis un amendement ou un CR, vérification des chiffres | assistant LLM | 10 | mixte |
| M08 | Tenir le fichier presse (journalistes nationaux, PQR, radios locales, LCP, agences) | les deux | mensuelle | 1 | non | classer : dédoublonner, segmenter, mettre à jour | base/CRM |  | I |
| M09 | Répondre aux sollicitations des journalistes (trier, arbitrer, fixer le délai, briefer l'élu) | paris | quotidienne | 3 | non | résumer, rédiger : fiche journaliste (articles passés, angle), brouillon de réponse (40 % selon Jean-Jaurès) | assistant LLM |  | mixte |
| M10 | Répondre à une demande d'information factuelle (nombre d'amendements, votes de l'élu) | paris | hebdomadaire | 1 | oui | rechercher, calculer : extraction automatique des votes, amendements, interventions | tableau de bord |  | mixte |
| M11 | Organiser une conférence ou un point presse en circonscription (invitation, dossier, lieu) | terrain | mensuelle | 2 | non | rédiger : modèles, liste de diffusion, dossier de presse pré-rempli | formulaire/règles |  | I |
| M12 | Relancer, suivre les retombées et archiver les articles | les deux | hebdomadaire | 1 | non | classer, calculer : tableau des retombées | tableau de bord |  | I |
| M13 | Rédiger des tribunes et des articles signés (presse nationale, PQR, revues) | paris | mensuelle | 3 | non | rechercher, rédiger : plan, recherche documentaire, contre-arguments | assistant LLM |  | I |
| M14 | Demander un droit de réponse ou un rectificatif | paris | ponctuelle | 3 | non | comparer, rédiger : confronte l'article aux faits, premier jet | assistant LLM |  | I |

### Discours, interventions, préparation média

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M15 | Rédiger les interventions en séance (discussion générale, explication de vote, défense d'amendement) | paris | hebdomadaire | 3 | oui | rédiger, rechercher : premier jet calibré au temps de parole, rappel des positions passées de l'élu | assistant LLM |  | mixte |
| M16 | Préparer les questions au gouvernement et les questions orales sans débat | paris | hebdomadaire | 3 | oui | rechercher, comparer : vérifie qu'une question n'a pas déjà été posée, historique des réponses, chiffres | comparateur |  | I |
| M17 | Rédiger les éléments de langage (fiche Q/R, messages clés, chiffres) sur un texte ou une actualité | paris | quotidienne | 3 | partiel | résumer, rédiger : synthèse, objections probables et réponses | assistant LLM | 10 | mixte |
| M18 | Préparer une interview ou un passage média (fiche journaliste et émission, questions pièges, chiffres) | les deux | hebdomadaire | 3 | partiel | simuler, rédiger : simulation d'interview hostile, fiche émission | simulateur |  | I |
| M19 | Briefer l'élu juste avant un plateau (dépêches, chiffre du jour) | paris | quotidienne | 2 | oui | résumer, alerter : brief d'une page, alertes | assistant LLM |  | I |
| M20 | Rédiger les discours de circonscription (inaugurations, cérémonies, vœux, assemblées d'associations) | terrain | hebdomadaire | 2 | non | rédiger : premier jet à partir d'une fiche locale (historique, élus présents, protocole) | assistant LLM |  | I |
| M21 | Préparer les débats contradictoires (meetings, débats télévisés de campagne) | les deux | annuelle | 3 | oui | rechercher, comparer : corpus des déclarations de l'adversaire, contradictions | comparateur |  | I |
| M22 | Rendre un texte juridique accessible (expliquer un amendement, un article, une loi) | paris | hebdomadaire | 2 | oui | résumer, comparer, visualiser : vulgarisation, schéma avant/après (lien avec la Boussole) | modèle+interface | 10 | I |

### Réseaux sociaux et contenus numériques

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M23 | Tenir la ligne éditoriale et le calendrier de publication multi-plateformes | les deux | hebdomadaire | 2 | non | classer, rédiger : planification, adaptation d'un message à chaque plateforme | formulaire/règles |  | I |
| M24 | Rédiger les posts quotidiens (activité, réactions, déplacements) | les deux | quotidienne | 2 | non | rédiger : premier jet, déclinaisons (50 % selon Jean-Jaurès) | assistant LLM | 10 | mixte |
| M25 | Repérer, découper et sous-titrer les extraits vidéo de l'élu en séance ou en commission | paris | quotidienne | 3 | oui | rechercher, rédiger : aligne transcription et vidéo, repère les passages forts, recadre en vertical, sous-titre | assistant LLM | 10 | mixte |
| M26 | Tourner et monter des vidéos face caméra (format court, live hors hémicycle) | les deux | hebdomadaire | 2 | non | rédiger : script, prompteur, montage assisté | aucun |  | mixte |
| M27 | Créer des visuels (cartes de citation, infographies chiffrées, bannières, affiches) | les deux | quotidienne | 1 | non | rédiger, visualiser : modèles, génération d'images | assistant LLM |  | mixte |
| M28 | Photographier les déplacements et gérer la photothèque (droit à l'image) | terrain | hebdomadaire | 1 | non | classer : indexer, reconnaître les lieux, légender | base/CRM |  | I |
| M29 | Gérer les abonnements payants et la sponsorisation (X Premium, posts boostés) | paris | mensuelle | 2 | non | alerter : rappel automatique de la fenêtre des six mois | formulaire/règles | 9 | mixte |
| M30 | Désactiver ou surveiller la monétisation des comptes | paris | ponctuelle | 1 | non | alerter : liste de contrôle | formulaire/règles |  | S |
| M31 | Mesurer l'audience (statistiques par plateforme, rapport mensuel à l'élu) | paris | mensuelle | 1 | non | visualiser, calculer : tableau de bord par plateforme, sans score composite | tableau de bord |  | I |

### Modération, harcèlement, sécurité

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M32 | Modérer les commentaires (masquer, bloquer, répondre) | les deux | quotidienne | 2 | non | classer : pré-tri insulte, menace, question légitime, demande d'administré (60 % selon Jean-Jaurès, hors publication) | assistant LLM | 14 | mixte |
| M33 | Repérer et documenter les menaces (captures horodatées, signalement, plainte, cellule de l'AN, 17Cyber) | paris | hebdomadaire | 3 | non | classer, rechercher : détecte les menaces, constitue un dossier de preuves, chronologie | assistant LLM | 14 | mixte |
| M34 | Gérer un raid ou une vague de harcèlement (souvent sexiste) | paris | ponctuelle | 3 | non | visualiser, classer : repère les comptes coordonnés, volumétrie | moteur de veille/alerte | 14 | I |
| M35 | Sécuriser les comptes (2FA, accès partagés, départ d'un collaborateur, hameçonnage) | paris | mensuelle | 2 | non | alerter : liste de contrôle, inventaire des accès | formulaire/règles |  | mixte |
| M36 | Répondre à une rumeur ou à un deepfake (constat, demande de retrait, démenti) | paris | ponctuelle | 3 | non | rechercher, rédiger : repère les indices de génération, chronologie de diffusion, brouillon de démenti | assistant LLM |  | mixte |
| M37 | Gérer la communication de crise (polémique, affaire, propos sortis du contexte) | paris | ponctuelle | 3 | non | visualiser, simuler : ligne de temps des faits, simulation de questions, cartographie de la propagation | assistant LLM |  | I |

### Vérification et contenus de fond

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M38 | Vérifier les chiffres et les citations avant diffusion (fact-checking interne) | paris | quotidienne | 2 | oui | rechercher, comparer : retrouve la source primaire, signale un écart | assistant LLM |  | mixte |
| M39 | Vérifier les déclarations des adversaires pour riposter | paris | hebdomadaire | 2 | oui | rechercher, comparer : idem, avec la source citée | assistant LLM |  | I |
| M40 | Tenir une base des déclarations passées de l'élu (cohérence, contradictions) | paris | continue | 2 | partiel | rechercher, comparer : recherche sémantique dans les CR, posts et communiqués | base/CRM | 7 10 | mixte |

### Supports papier, site, compte rendu de mandat

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M41 | Produire la lettre d'information (électronique et papier) et le compte rendu de mandat annuel | les deux | mensuelle | 2 | partiel | rédiger, résumer : pré-remplit l'activité de la période, mise en page | assistant LLM | 9 | mixte |
| M42 | Mettre à jour le site web (actualités, agenda, positions, mentions RGPD) | paris | hebdomadaire | 1 | non | rédiger : synchronisation automatique depuis l'open data AN | formulaire/règles |  | I |
| M43 | Gérer la base de contacts et la newsletter (abonnés, désinscriptions, segmentation par commune) | terrain | mensuelle | 2 | non | classer : segmenter, dédoublonner (60 % selon Jean-Jaurès) | base/CRM |  | mixte |
| M44 | Préparer les tracts et affiches de réunion publique | terrain | mensuelle | 1 | non | rédiger : modèles | formulaire/règles |  | mixte |
| M45 | Valoriser l'activité chiffrée (réagir aux classements Datan ou NosDéputés, infographies d'activité) | paris | annuelle | 2 | oui | visualiser, comparer : contexte (présence selon la distance, rôle de rapporteur, commissions) | tableau de bord |  | mixte |

### Coordination, conformité, campagne

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| M46 | Relayer et adapter les consignes du service presse du groupe (éléments de langage, visuels communs) | paris | quotidienne | 2 | non | rédiger : adapte au contexte local, suit ce qui a été repris | assistant LLM |  | I |
| M47 | Coordonner Paris et la circonscription (qui publie quoi, agenda commun, photos) | les deux | quotidienne | 2 | non | classer : tableau partagé | base/CRM |  | I |
| M48 | Vérifier la conformité des dépenses de communication (éligibilité AFM ou dotation, justificatifs) | paris | mensuelle | 2 | non | classer, alerter : classe les pièces, signale les cas à risque (Wikipédia, cagnottes, sponsorisation) | formulaire/règles | 9 | mixte |
| M49 | Basculer en mode électoral (séparer moyens parlementaires et de campagne, fenêtre des six mois, silence de la veille) | les deux | annuelle | 3 | non | alerter, calculer : calendrier des interdits, alertes par date, journal des dépenses | formulaire/règles | 9 | mixte |
| M50 | Utiliser l'IA de façon transparente (étiqueter, vérifier, ne pas confier de données d'administrés) | paris | continue | 2 | non | rédiger : charte d'équipe, mentions automatiques | formulaire/règles | 9 | mixte |

## Veille, documentation, parties prenantes (44 tâches) — détail et sources : `notes/05-veille-documentation.md`


### Veille législative et institutionnelle

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V01 | Suivre l'ordre du jour de la séance et l'agenda des commissions | paris | quotidienne | 1 | oui | alerter, visualiser : alerte filtrée sur commissions et thèmes du député ; calendrier unifié des deux chambres | moteur de veille/alerte | 3 | mixte |
| V02 | Suivre les dépôts de textes (projets, propositions de loi, résolutions) et de rapports sur les sujets du député | paris | quotidienne | 2 | partiel | classer, résumer, alerter : classement thématique automatique, résumé en une ligne, alerte | moteur de veille/alerte | 3 | mixte |
| V03 | Suivre les amendements déposés par les autres sur un texte suivi (tableau, regroupement, doublons) | paris | par texte | 3 | oui | classer, comparer, résumer : regroupement par article et alinéa, détection des doublons, comparaison avec la commission (cœur de Boussole) | comparateur | 3 | S |
| V04 | Faire la veille du Journal officiel (lois, décrets, arrêtés, nominations sur les sujets suivis) | paris | quotidienne | 1 | oui | alerter, résumer, rechercher : alerte par mots-clés et par code modifié ; lien vers les lois votées par le député | moteur de veille/alerte | 3 | mixte |
| V05 | Suivre l'application des lois (décrets attendus, retards, rapports du Gouvernement) | paris | mensuelle | 2 | partiel | visualiser, alerter, rédiger : tableau de bord des décrets attendus ; premier jet de question écrite | tableau de bord | 3 | mixte |
| V06 | Faire la veille européenne (propositions de la Commission, trilogues, transposition, résolutions art. 88-4) | paris | hebdomadaire | 3 | oui | rechercher, alerter, résumer : correspondance directive/textes français, alerte sur échéances de transposition, résumé en français | moteur de veille/alerte | 3 | mixte |
| V07 | Surveiller les questions écrites et leurs réponses (celles du député en retard, celles des autres sur ses thèmes) | les deux | hebdomadaire | 1 | oui | alerter, rechercher : relances au-delà du délai ; détection des questions déjà posées | tableau de bord | 3 | mixte |
| V08 | Surveiller les autres parlementaires et groupes (positions, amendements, votes, interventions) | les deux | continue | 2 | oui | visualiser, résumer : profils thématiques ; carte des positions par thème, sans score global | modèle+interface |  | mixte |
| V09 | Faire la veille gouvernementale (annonces ministérielles, consultations, avant-projets, avis du Conseil d'État, études d'impact) | paris | quotidienne | 2 | partiel | classer, résumer, comparer : agrégation et résumé ; repérage des écarts entre étude d'impact et texte | moteur de veille/alerte |  | S |

### Veille thématique, médiatique et territoriale

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V10 | Lire la revue de presse nationale et spécialisée (Contexte, Politico, AEF, presse quotidienne) | paris | quotidienne | 1 | non | résumer, classer : résumé matinal personnalisé ; dédoublonnage | assistant LLM |  | mixte |
| V11 | Faire la veille de la presse locale et des réseaux sociaux de la circonscription | terrain | quotidienne | 1 | partiel | alerter, visualiser : alerte sur mentions du député et sujets locaux ; tendances | moteur de veille/alerte |  | mixte |
| V12 | Faire la veille de l'actualité des collectivités de la circonscription (conseils, intercommunalité, département, préfecture) | terrain | hebdomadaire | 2 | partiel | classer, alerter : agrégation et alerte | moteur de veille/alerte |  | I |
| V13 | Faire la veille thématique de fond (rapports publics, études, travaux universitaires, think tanks) | paris | hebdomadaire | 2 | oui | résumer, classer : flux thématique résumé, avec source et nature (administration, groupe d'intérêt, laboratoire) | moteur de veille/alerte |  | I |
| V14 | Faire la veille des contentieux (Conseil constitutionnel, Conseil d'État, Cour de cassation, CJUE, CEDH) | paris | hebdomadaire | 3 | oui | alerter, résumer : alerte sur les articles de loi visés ; résumé | moteur de veille/alerte |  | I |

### Documentation, notes et expertise

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V15 | Préparer une fiche avant un rendez-vous (interlocuteur, intérêts, inscription HATVP, historique, demandes probables) | les deux | hebdomadaire | 2 | partiel | rédiger, rechercher : fiche générée (identité, fiches d'activité, thèmes, dépenses, rendez-vous passés) | base/CRM | 11 | mixte |
| V16 | Rédiger une note de synthèse sur un texte (contenu, enjeux, vigilance, positions en présence) | paris | par texte | 3 | oui | rédiger, comparer, résumer : premier jet structuré ; tableau article par article ; droit existant face au droit proposé | assistant LLM |  | mixte |
| V17 | Rédiger une note de fond thématique (comprendre vite un sujet technique) | paris | hebdomadaire | 3 | oui | rédiger, rechercher : premier jet avec sources citées ; glossaire ; questions aux experts | assistant LLM |  | mixte |
| V18 | Préparer une intervention (QAG, discussion générale, défense d'amendement) : éléments factuels et chiffres | paris | hebdomadaire | 2 | oui | rechercher, rédiger : fiche d'éléments chiffrés sourcés ; rappel des positions antérieures du député | assistant LLM | 7 | mixte |
| V19 | Mener une recherche juridique ponctuelle (droit en vigueur, jurisprudence, rédaction d'un article de code) | paris | quotidienne | 2 | oui | rechercher : recherche en langage naturel ; historique des versions d'un article | assistant LLM |  | mixte |
| V20 | Exploiter des données chiffrées (calculs, graphiques, impact local d'une mesure) | les deux | hebdomadaire | 3 | partiel | calculer, visualiser, simuler : extraction par circonscription, graphiques, simulateur | simulateur |  | mixte |
| V21 | Vérifier les faits (chiffres avancés par le Gouvernement, un lobby, un adversaire) | paris | hebdomadaire | 2 | oui | comparer, rechercher : rapprochement d'une affirmation avec la statistique officielle | assistant LLM |  | mixte |
| V22 | Retrouver ce que le député a dit, voté ou déposé (mémoire institutionnelle, cohérence des positions) | les deux | hebdomadaire | 2 | partiel | rechercher, visualiser : chronologie des positions par thème ; détection de contradictions apparentes | assistant LLM | 7 | mixte |
| V23 | Constituer et tenir la documentation du bureau (dossiers thématiques, archives des notes, contacts) | les deux | continue | 1 | non | classer, rechercher : base de connaissances interrogeable ; transmission au nouveau collaborateur | base/CRM | 7 | mixte |
| V24 | Solliciter les services de l'Assemblée (administrateurs de commission, bibliothèque, archives) et des groupes | paris | hebdomadaire | 1 | non | rechercher, rédiger : savoir qui détient quelle expertise ; rédiger une demande précise | base/CRM |  | I |
| V25 | Traduire et lire la documentation étrangère (droit comparé, rapports CRS, EPRS, Commons Library, Bundestag) | paris | mensuelle | 2 | oui | résumer, comparer : traduction et synthèse comparée | assistant LLM |  | I |

### Relations avec les représentants d'intérêts

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V26 | Trier les sollicitations entrantes (courriels, demandes de rendez-vous, notes de position, propositions d'amendements) | paris | quotidienne | 2 | non | classer, rédiger : classement par texte, article, émetteur (inscrit HATVP ou non), urgence ; projet de réponse | assistant LLM |  | S |
| V27 | Vérifier l'inscription et les déclarations d'un représentant d'intérêts (répertoire HATVP) | paris | hebdomadaire | 1 | oui | rechercher, comparer : fiche instantanée ; rapprochement avec les fiches d'activité citant le texte en cours | base/CRM | 11 | mixte |
| V28 | Analyser une proposition d'amendement venue d'un tiers (qui gagne, qui perd, conformité, recevabilité) | paris | par texte | 3 | oui | comparer, rechercher : proposition face à la commission et aux amendements déposés (logique Boussole) ; formulations identiques déjà déposées | comparateur | 11 | mixte |
| V29 | Tenir l'empreinte du député (personnes rencontrées et consultées, annexes de rapport) | paris | continue | 1 | partiel | classer, rédiger : journal des rencontres alimenté depuis l'agenda ; export de l'annexe ; rapprochement HATVP | base/CRM | 11 | mixte |
| V30 | Gérer les cadeaux, invitations et voyages (estimer la valeur, déclarer au déontologue au-delà de 150 €, décliner) | paris | mensuelle | 1 | partiel | alerter, rédiger : rappel des seuils ; pré-remplissage de la déclaration | formulaire/règles | 9 | S |
| V31 | Équilibrer les sources (s'assurer d'entendre entreprises, ONG, syndicats, experts indépendants) | paris | par texte | 2 | partiel | visualiser, classer : qui a été entendu, par catégorie, et qui manque | modèle+interface | 11 | I |

### Relations avec la société civile, les experts, les administrations et le groupe

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V32 | Entretenir un réseau d'experts, d'universitaires, d'associations et de syndicats | les deux | continue | 2 | non | classer : CRM léger (dernier contact, sujets) | base/CRM |  | mixte |
| V33 | Animer ou suivre des boucles de messagerie (Telegram, WhatsApp, Signal) avec experts, ONG et autres équipes | paris | quotidienne | 2 | non | résumer : résumé des fils ; extraction des documents partagés | assistant LLM |  | mixte |
| V34 | Préparer des auditions (liste des invités, questionnaires, synthèse des contributions écrites) | paris | ponctuelle | 2 | non | rédiger, comparer, résumer : premier jet de questionnaire ; synthèse comparée par thème, sans note globale ; positions convergentes et divergentes | assistant LLM | 11 | mixte |
| V35 | Gérer les invitations à des colloques, petits-déjeuners et salons (trier, accepter, préparer une intervention) | paris | hebdomadaire | 1 | non | classer, rechercher : tri selon pertinence et organisateur ; vérification du financeur | assistant LLM |  | S |
| V36 | Préparer un déplacement thématique (visite d'entreprise, d'hôpital, de chantier) | terrain | hebdomadaire | 2 | oui | rédiger, rechercher : fiche générée (contexte, interlocuteurs, chiffres locaux) | tableau de bord |  | mixte |
| V37 | Gérer les relations avec les cabinets ministériels et les administrations | paris | hebdomadaire | 2 | non | comparer, alerter : suivi des demandes en cours et des délais ; comparaison des éléments de langage reçus par différents canaux | base/CRM |  | mixte |
| V38 | Gérer les relations avec le groupe politique (réunions, notes des administrateurs, consignes de vote, répartition des textes) | paris | hebdomadaire | 2 | non | classer, comparer : centralisation des consignes ; écart entre position du député et ligne du groupe | tableau de bord |  | mixte |
| V39 | Coordonner avec les collaborateurs d'autres députés (même groupe, intergroupes, transpartisan, cosignatures) | paris | quotidienne | 2 | oui | comparer, rechercher : repérer les amendements proches pour proposer une cosignature (regroupement par proposition de Boussole) | comparateur |  | I |
| V40 | Suivre les groupes d'études et d'amitié et l'activité internationale (délégations UIP, APCE, OTAN, OSCE) | paris | mensuelle | 2 | partiel | rechercher, résumer : fiche pays ou thème avant une délégation ; suivi des résolutions | assistant LLM |  | mixte |
| V41 | Préparer une rencontre avec un ambassadeur ou une délégation étrangère | paris | ponctuelle | 2 | partiel | rédiger, rechercher : fiche pays (situation politique, relations bilatérales, positions antérieures du député) | assistant LLM |  | I |

### Tâches implicites et cognitives transversales

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| V42 | Juger la crédibilité d'une source et la nature d'un document (étude financée, sondage commandé, preprint) | paris | continue | 3 | partiel | rechercher, alerter : métadonnées de financement ; signalement des liens d'intérêt | assistant LLM |  | I |
| V43 | Hiérarchiser l'attention (que lire, quoi signaler au député, quand l'interrompre) | les deux | continue | 3 | partiel | classer, alerter : pertinence explicable par thème, sans note composite | moteur de veille/alerte |  | I |
| V44 | Traduire l'expertise en position politique (ce que le député peut défendre, compromis atteignables) | paris | par texte | 3 | partiel | comparer, résumer : synthèse « notre texte fait ceci ; en présence, telles opinions, articulables ou non » (scène 5 de Boussole) | modèle+interface |  | I |

## Organisation, agenda, gestion du bureau (50 tâches) — détail et sources : `notes/06-organisation-bureau.md`


### Agenda, présence, arbitrages

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O01 | Tenir l'agenda partagé du député (versions Paris et circonscription) | les deux | quotidienne | 2 | oui | visualiser, comparer : fusionner agenda officiel et privé, détecter les doublons | tableau de bord |  | mixte |
| O02 | Arbitrer les conflits d'horaires (séance, commissions, groupe, circonscription) | paris | quotidienne | 3 | oui | visualiser, comparer : matrice des conflits montrant côte à côte ce qu'on perd à chaque choix, sans score global | tableau de bord |  | I |
| O03 | Surveiller la présence obligatoire (commission du mercredi, scrutins solennels) et préparer les excuses | paris | hebdomadaire | 2 | oui | alerter, calculer : alerte au nombre d'absences du mois, calendrier des scrutins solennels | moteur de veille/alerte |  | mixte |
| O04 | Suivre l'activité publique du député (présences, interventions, amendements, questions) | paris | mensuelle | 2 | oui | visualiser : tableau de son image statistique, chiffres seulement là où ils ont un sens | tableau de bord |  | I |
| O05 | Prendre et filtrer les rendez-vous (associations, entreprises, élus, administrés, représentants d'intérêts) | les deux | quotidienne | 2 | non | classer, rechercher : formulaire structuré, pré-qualification, proposition de créneaux | formulaire/règles |  | I |
| O06 | Préparer la fiche d'un rendez-vous ou d'un événement | les deux | hebdomadaire | 2 | partiel | résumer, rédiger : premier jet de fiche à partir des échanges et de sources publiques | assistant LLM |  | mixte |
| O07 | Organiser la semaine type et le calendrier de session | les deux | hebdomadaire | 2 | oui | visualiser, simuler : vue par semaine type, charge par période (pics budgétaires) | tableau de bord |  | I |

### Déplacements et logistique

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O08 | Réserver les trajets Paris-circonscription du député | paris | hebdomadaire | 2 | non | calculer, alerter : compteur des quotas restants et du rythme de consommation | tableau de bord |  | mixte |
| O09 | Répartir le quota de 10 A/R par an entre collaborateurs et attribuer Fréquence/TGV Max | paris | ponctuelle | 2 | oui | simuler, calculer : simulateur d'allocation selon besoins de venue à Paris | simulateur |  | mixte |
| O10 | Organiser les déplacements en circonscription (tournées, inaugurations, réunions publiques) | terrain | hebdomadaire | 2 | oui | visualiser, calculer : optimisation de tournée, couverture du territoire dans le temps | tableau de bord |  | I |
| O11 | Organiser l'hébergement à Paris et les déplacements protocolaires | paris | ponctuelle | 1 | oui | rechercher : aide-mémoire des règles | assistant LLM |  | mixte |
| O12 | Organiser les missions et déplacements à l'étranger | paris | ponctuelle | 2 | non | classer : liste de contrôle des étapes et déclarations | formulaire/règles |  | I |

### Dotation de fonctionnement (DFP, ex-AFM) et finances du bureau

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O13 | Vérifier l'éligibilité d'une dépense avant de l'engager | les deux | hebdomadaire | 3 | partiel | rechercher, classer : assistant de pré-qualification renvoyant à l'article et signalant les cas douteux | assistant LLM | 9 | mixte |
| O14 | Collecter, classer et archiver les justificatifs (factures, relevés du compte dédié) | les deux | continue | 2 | non | classer, comparer : rapprochement facture/ligne bancaire, OCR, catégorisation par rubrique | formulaire/règles | 9 | I |
| O15 | Préparer un contrôle du déontologue (tirage au sort, fin de mandat) | paris | ponctuelle | 3 | non | visualiser, classer : dossier de contrôle toujours prêt, pièces liées, anomalies signalées | tableau de bord | 9 | mixte |
| O16 | Suivre la consommation de la DFP (rythme, solde, dépenses récurrentes) | paris | mensuelle | 2 | non | simuler, calculer : prévision du solde en fin d'exercice, scénarios | simulateur |  | I |
| O17 | Gérer la permanence en circonscription (bail, assurances, fournitures, accessibilité, ménage) | terrain | mensuelle | 2 | non | alerter : échéancier des contrats et alertes de renouvellement | base/CRM |  | I |
| O18 | Acheter le matériel et les logiciels (catalogue AN ou achat libre sur la DFP) | paris | ponctuelle | 2 | partiel | comparer : comparateur d'offres compatible avec la politique de sécurité | comparateur |  | mixte |

### Le député-employeur : crédit collaborateurs et ressources humaines

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O19 | Piloter le crédit collaborateurs (masse salariale, 13e mois, primes, ancienneté, reliquats) | paris | mensuelle | 3 | non | simuler, calculer, alerter : simulateur de masse salariale sur la législature, alerte de dépassement | simulateur | 9 | mixte |
| O20 | Recruter (fiche de poste, annonce, tri des candidatures, entretiens) | les deux | ponctuelle | 2 | oui | rédiger : générateur de fiche de poste à partir des 40 missions, grille d'entretien | assistant LLM |  | mixte |
| O21 | Établir le contrat (contrats types, CDI/CDD, temps de travail, forfait jours, statut cadre) | paris | ponctuelle | 2 | oui | classer : liste de contrôle des conditions à respecter | formulaire/règles |  | mixte |
| O22 | Vérifier les interdictions (emplois familiaux, déclaration HATVP, cumul, conflits d'intérêts) | paris | ponctuelle | 2 | oui | classer : questionnaire d'auto-vérification | formulaire/règles |  | mixte |
| O23 | Gérer les temps, congés, heures supplémentaires et forfait jours | les deux | mensuelle | 2 | non | visualiser, alerter : relevé du temps et des repos, alerte déconnexion | tableau de bord |  | mixte |
| O24 | Accueillir et former un nouveau collaborateur | les deux | ponctuelle | 2 | non | rechercher, résumer : base de connaissances interrogeable, parcours d'accueil | assistant LLM |  | mixte |
| O25 | Organiser la formation des collaborateurs (INSP, CNFPT, IHEDN, IHEMI, OPCO AKTO, IA) | les deux | annuelle | 1 | partiel | rechercher : catalogue filtré | base/CRM |  | mixte |
| O26 | Conduire les entretiens annuels ou professionnels et fixer les augmentations | paris | annuelle | 2 | oui | visualiser, comparer : repère de rémunération selon lieu, statut, ancienneté | tableau de bord | 9 | mixte |
| O27 | Gérer les ruptures (période d'essai, rupture conventionnelle, licenciement, fin de mandat) | paris | ponctuelle | 3 | partiel | simuler, calculer : calendrier et simulateur d'indemnités, liste des documents | simulateur | 9 | mixte |
| O28 | Prévenir et traiter les risques psychosociaux et le harcèlement | les deux | ponctuelle | 3 | partiel | rechercher : page d'orientation (qui appeler, démarches) ; aucune analyse automatisée | aucun |  | mixte |

### Secrétariat, courrier, téléphone, archives

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O29 | Trier la messagerie (boîte publique du député, boîtes nominatives) | les deux | quotidienne | 2 | non | classer : classement par catégorie, regroupement des campagnes de mails identiques | assistant LLM | 6 | mixte |
| O30 | Répondre aux campagnes de mails et courriers types | les deux | hebdomadaire | 1 | non | rédiger : premier jet de réponse type, publipostage | assistant LLM | 6 | mixte |
| O31 | Ouvrir, enregistrer et répartir le courrier papier | terrain | quotidienne | 1 | non | classer, rechercher : numérisation, OCR, registre unique avec les mails | base/CRM | 6 | I |
| O32 | Tenir la permanence téléphonique et l'accueil physique | terrain | quotidienne | 2 | non | classer, rechercher : fiche d'appel structurée, FAQ d'orientation | formulaire/règles | 6 | mixte |
| O33 | Tenir le fichier des contacts et le suivi des dossiers individuels | terrain | continue | 2 | non | classer, alerter : CRM simple avec historique et relances | base/CRM | 6 | mixte |
| O34 | Archiver et assurer la continuité documentaire (dossiers, mails, notes, fin de mandat) | les deux | continue | 2 | non | classer : plan de classement, export propre en fin de mandat | base/CRM |  | I |
| O35 | Gérer la bureautique et le support (comptes, accès, matériel, visioconférence, impression) | les deux | hebdomadaire | 1 | non | rechercher : guide | aucun |  | mixte |

### Coordination Paris / circonscription

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O36 | Animer la réunion d'équipe hebdomadaire (ordre du jour, répartition, relevé de décisions) | les deux | hebdomadaire | 2 | non | résumer, rédiger : compte rendu de visioconférence par transcription locale, liste d'actions | assistant LLM |  | mixte |
| O37 | Répartir les tâches et suivre la charge de l'équipe | les deux | hebdomadaire | 2 | non | visualiser : tableau de tâches avec vue de la charge par personne | tableau de bord |  | mixte |
| O38 | Faire remonter la circonscription vers Paris (sujets locaux pour question, amendement, intervention) | terrain | hebdomadaire | 2 | non | classer, visualiser : regroupement par thème et territoire, signal des sujets récurrents | tableau de bord |  | I |
| O39 | Faire descendre Paris vers la circonscription (activité de la semaine, éléments de langage, comptes rendus de mandat) | paris | hebdomadaire | 2 | oui | résumer, rédiger : synthèse hebdomadaire automatique | assistant LLM |  | I |

### Déontologie, transparence, conformité

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O40 | Préparer les déclarations HATVP (patrimoine, intérêts et activités, mises à jour) | paris | ponctuelle | 3 | partiel | alerter : liste de contrôle des modifications à déclarer, rappels de délais | formulaire/règles |  | mixte |
| O41 | Déclarer dons, invitations et voyages et tenir un registre interne | paris | ponctuelle | 2 | partiel | alerter : registre interne avec alerte au seuil, préremplissage | base/CRM | 9 | mixte |
| O42 | Gérer les déports et repérer les conflits d'intérêts sur les textes à l'ordre du jour | paris | par texte | 2 | partiel | comparer, alerter : croisement déclaration d'intérêts / textes inscrits | moteur de veille/alerte |  | I |
| O43 | Tracer les rencontres avec les représentants d'intérêts (qui vu sur quel texte) | paris | continue | 2 | oui | comparer, rechercher : rapprochement agenda, contributions reçues, amendements déposés | base/CRM | 11 | mixte |
| O44 | Consulter le déontologue (frais, cadeaux, situations ambiguës) | paris | mensuelle | 1 | partiel | rechercher : FAQ de jurisprudence déontologique | assistant LLM | 9 | mixte |

### Sécurité

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O45 | Gérer la sécurité du député et de l'équipe (menaces, signalements, permanence, itinéraires) | terrain | ponctuelle | 3 | non | classer : registre des menaces horodaté, transmission au référent sûreté/procureur/AN | base/CRM | 14 | mixte |
| O46 | Modérer les réseaux sociaux et repérer le harcèlement en ligne | paris | quotidienne | 2 | non | classer : tri des messages haineux pour signalement (Pharos) | assistant LLM |  | I |
| O47 | Assurer l'hygiène numérique (phishing, comptes, appareils, ingérences) | les deux | continue | 2 | non | alerter : rappels et auto-diagnostic | formulaire/règles |  | mixte |

### Conditions de travail du collaborateur (tâches « sur soi »)

| ID | Tâche | Qui | Fréquence | Diff. | Données ouv. | Apport possible d'un outil | Type d'outil | Pistes | Src. |
|---|---|---|---|---|---|---|---|---|---|
| O48 | Gérer sa propre charge et ses horaires | les deux | continue | 3 | non | visualiser, calculer : journal de temps personnel montrant ce qui prend le temps | tableau de bord |  | mixte |
| O49 | Préparer sa fin de contrat (législature, dissolution, défaite, entrée au Gouvernement) | les deux | ponctuelle | 3 | partiel | simuler, calculer : simulateur de droits (indemnités, préavis, date de fin) | simulateur |  | mixte |
| O50 | Faire valoir ses droits collectifs (accords collectifs, statut cadre, prime d'ancienneté portable) | les deux | ponctuelle | 2 | partiel | rechercher : vérificateur « cet accord s'applique-t-il à mon député ? » | formulaire/règles |  | mixte |

