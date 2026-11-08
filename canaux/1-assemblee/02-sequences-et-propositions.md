# Canal 1 — séquences, découpages, fonctionnalités (proposition large, non triée)

Tout ce qui suit s'appuie sur `01-observations.md`. Chaque séquence est décrite par : **ce qui se passe**, **comment elle se découpe**, **ce que les données en donnent**, **ce que le logiciel pourrait en faire**. Je n'ai pas trié : certaines se recouvrent, certaines contredisent la maquette. Repère : ★ = la donnée est directement là ; ◐ = reconstruction nécessaire (heuristique) ; ○ = absent des données, à saisir ou à supposer.

Une remarque d'ensemble d'abord. La maquette met en scène **un moment statique** (j'écris ; je regarde les autres). Les données montrent surtout des **enchaînements** : une adoption fait tomber vingt amendements, une priorité renvoie un article à plus tard, une CMP efface un ajout de séance. Le geste « haut / bas = parcourir » de la maquette pourrait devenir, dans bien des volets, « haut / bas = avancer dans le temps ».

---

## A. Séquences de l'écriture (avant le vote)

### A1. La liasse se forme (dépôt)
- **Ce qui se passe** : des centaines d'amendements arrivent sur un texte, en rafale juste avant le délai (623 en un jour sur le narcotrafic).
- **Découpage** : par jour / heure de dépôt ; par article visé ; par groupe.
- **Données** : ★ `dateDepot`, `numeroOrdreDepot`, `triAmendement`, position.
- **Logiciel** : une **carte de chaleur du texte** (chaque alinéa coloré par le nombre d'amendements qui le visent, ou par le nombre de groupes) ; une animation du remplissage jour par jour ; le moment où « mon » alinéa devient disputé.

### A2. La famille de replis
- **Ce qui se passe** : un auteur dépose une position maximale puis des positions de repli sur le même passage (treize amendements CP sur un même alinéa ; sept SOL).
- **Découpage** : même auteur (ou groupe), même article/alinéa, exposé contenant « repli », ou dispositifs emboîtés (supprimer A B C → supprimer B → supprimer C).
- **Données** : ◐ regroupement par auteur + position + mot-clé.
- **Logiciel** : « mon amendement » devient **une échelle de positions** : la feuille du dessus est la version maximale, la pile en dessous ses replis. Le tambour existe déjà : il suffit que la pile du « mien » soit une famille, pas une liste d'alinéas. Prévoir de déposer un repli directement depuis une version (« dupliquer en repli »).

### A3. L'écriture à plusieurs mains (identiques, cosignatures, sources externes)
- **Ce qui se passe** : un même texte est déposé par plusieurs groupes ; un amendement porte jusqu'à 123 cosignataires ; l'exposé cite l'organisation qui l'a « travaillé ».
- **Découpage** : grappe d'identiques ; réseau de cosignatures ; source citée.
- **Données** : ★ `discussionIdentique`, `cosignataires` ; ◐ sources (regex sur l'exposé : « travaillé avec », « proposé par »).
- **Logiciel** : sur une rédaction, afficher **qui d'autre la porte mot pour mot** (le regroupement par proposition de la maquette existe déjà dans les données, sous ce nom) ; un volet « d'où vient ce texte » ; un graphe des coalitions qui ne se voient que par les identiques (CP + rapporteure sur une suppression d'alinéa).

### A4. Le filtre d'irrecevabilité
- **Ce qui se passe** : avant tout débat, une part importante disparaît : cavaliers (art. 45), charge (art. 40), gage, habilitation (art. 38), doublon. 142 cavaliers d'un coup sur le logement.
- **Découpage** : par motif ; par moment (avant / après publication).
- **Données** : ★ `etat`, `sousEtat`, `cartoucheInformatif` ; ○ le dispositif lui-même n'est pas publié.
- **Logiciel** : des **feuilles fantômes** (papier grisé, texte absent, cartouche seul) dans la pile des autres : on voit que quelque chose a été tenté là. Pour mon propre brouillon : un **contrôle préalable** « risque de cavalier / de charge » (le canal 2 a sûrement les critères).

### A5. Viser le texte : position déclarée et portée réelle
- **Ce qui se passe** : un amendement déclare un alinéa mais modifie aussi d'autres alinéas, souvent « en conséquence ».
- **Découpage** : le dispositif en opérations I., II., III. ; chaque opération → un passage.
- **Données** : ◐ regex sur le dispositif (≈ 30 % d'écart).
- **Logiciel** : en vue face à la commission, **éclairer tous les passages touchés** par un amendement, pas seulement l'alinéa déclaré ; un fil reliant les opérations d'un même amendement. Côté rédaction : le logiciel génère lui-même les « en conséquence ».

### A6. Écrire sur un texte qui modifie un code
- **Ce qui se passe** : l'alinéa est un ordre de modification (« Le j est ainsi modifié »), l'amendement modifie cet ordre.
- **Découpage** : trois couches : le code en vigueur ; le texte de loi (instructions) ; l'amendement.
- **Données** : ★ texte de loi ; ○ le code consolidé (Légifrance) ; ◐ l'application des instructions.
- **Logiciel** : une **échelle de plus** au-dessus de « l'origine » : « le droit tel qu'il deviendrait » (le code après application du texte, après application de mon amendement). La règle « corrections apparentes » de la maquette s'applique alors au code, ce qui est ce que le lecteur comprend.

---

## B. Séquences de l'examen (commission puis séance)

### B1. L'itinéraire de la séance dans le texte
- **Ce qui se passe** : les articles ne sont pas examinés dans l'ordre : priorités, réserves, seconde délibération, retour au titre.
- **Découpage** : suite des `point` du compte rendu ; « (appelé par priorité) », « (seconde délibération) ».
- **Données** : ★ compte rendu ; ★ ordre du jour (agenda).
- **Logiciel** : un **plan du texte avec le parcours tracé** (comme un trajet sur une carte) ; une tête de lecture « où en est la séance » pour un dossier vivant comme le logement ; avertir « l'article qui vous intéresse a été appelé par priorité ce soir ».

### B2. L'épisode d'amendement (le rite)
- **Ce qui se passe** : appel → présentation par l'auteur → avis de la commission → avis du Gouvernement → prises de parole → (scrutin public annoncé) → mise aux voix → décision. Avec des variantes : identiques présentés à la suite, discussion commune, sous-amendement, retrait après « demande de retrait ».
- **Découpage** : de décision à décision dans le compte rendu (466 épisodes sur le narcotrafic).
- **Données** : ★ codes `code_grammaire` ; ◐ rattachement aux uid d'amendement (par numéro cité).
- **Logiciel** : une **feuille d'épisode** : l'amendement en haut, les avis en pastilles (« défavorable / défavorable »), les interventions en dessous, la décision en bas. Zoomer = lire le verbatim ; dézoomer = la rafale (vingt rejets en trois minutes). La durée réelle (mots, minutes via `dateSort`) comme épaisseur de la feuille.

### B3. La discussion commune et sa cascade
- **Ce qui se passe** : plusieurs rédactions concurrentes d'un même passage sont discutées ensemble, votées dans l'ordre ; l'adoption de l'une fait **tomber** les suivantes.
- **Découpage** : `discussionCommune.idDiscussion`, ordre par `typePosition` et `tri`.
- **Données** : ★.
- **Logiciel** : c'est le **regroupement par proposition** de la maquette, mais **ordonné et dynamique** : les feuilles sont empilées dans l'ordre de mise aux voix ; quand l'une passe, les suivantes se barrent (« tombé »). Simuler « et si le n° X passait ? » pour voir ce qui tombe.

### B4. La guillotine de la réécriture globale
- **Ce qui se passe** : un amendement « Rédiger ainsi cet article » ou « Supprimer cet article » adopté fait tomber tout ce qui visait l'article (53 tombés d'un coup sur l'article 2 du logement).
- **Données** : ★ (dispositif + sort) ; ◐ le lien de cause n'est pas un champ, il se déduit.
- **Logiciel** : un **événement visible** : la pile de l'article s'effondre, les feuilles concernées passent en « tombé » avec un renvoi vers l'amendement qui les a fait tomber. Pour l'auteur : alerte « un amendement de réécriture globale est déposé sur votre article ».

### B5. L'avis (commission, Gouvernement)
- **Ce qui se passe** : deux avis, souvent en deux mots, qui prédisent l'issue ; « sagesse » et « demande de retrait » sont les signaux de négociation.
- **Données** : ★ en séance (compte rendu, et inscrits dans la phrase de décision : « accepté par la commission », « repoussé par le Gouvernement ») ; ★ en commission (rapport : « Suivant l'avis de la rapporteure, elle rejette… »).
- **Logiciel** : deux pastilles sur chaque feuille ; filtrer « ce qui a eu un avis favorable » ; repérer les écarts (avis défavorable mais adopté = défaite du banc).

### B6. Le scrutin public (se compter)
- **Ce qui se passe** : un groupe demande un scrutin nominatif sur un amendement ; le résultat se lit groupe par groupe, avec les dissidents.
- **Données** : ★ scrutin (décompte nominatif par groupe, séance) ; ★ demandeur dans le compte rendu ; ◐ lien à l'amendement par le titre.
- **Logiciel** : une **feuille de vote** sous l'amendement : chaque groupe une barre pour / contre / abstention ; les dissidents nommés. Comparer deux amendements voisins : qui a basculé ?

### B7. Le temps de la séance
- **Ce qui se passe** : rafales et enlisements, suspensions, rappels au règlement, interruptions, changements de présidence ; fin de séance à minuit qui coupe un article.
- **Données** : ★ horodatage `dateSort` à la seconde ; ★ codes de suspension, rappel au règlement ; ★ interruptions.
- **Logiciel** : une **frise de séance** (une ligne par séance, les amendements en points selon l'heure du sort ; les suspensions en blancs) ; la « tension » d'un épisode (interruptions par minute) en grain du papier.

### B8. Commission ≠ séance
- **Ce qui se passe** : en commission, majorités différentes (l'article 3 du logement supprimé par UT + SOL), avis pour avis d'une autre commission (finances), texte de la commission qui devient la base de la séance.
- **Données** : ★ amendements (préfixes CE, CF…) ; ★ rapport (débats de commission, en prose) ; ★ texte de commission.
- **Logiciel** : un volet par lieu d'examen ; montrer un même passage « en commission » puis « en séance », avec ce qui a changé entre les deux.

---

## C. Séquences du texte (navette)

### C1. Le texte change d'une étape à l'autre
- **Ce qui se passe** : texte déposé → texte de commission → texte adopté → texte de l'autre assemblée → CMP → loi. Des articles naissent (« nouveau », bis, ter), meurent (« Supprimé »), restent (« Non modifié »).
- **Données** : ★ chaque texte en HTML ; ★ la liste des textes dans le dossier ; ◐ l'alignement article par article (les intitulés le permettent) puis alinéa par alinéa.
- **Logiciel** : la **vue « face à la commission » généralisée en frise** : n'importe quelle étape face à n'importe quelle autre, mêmes corrections apparentes. Le geste gauche / droite pourrait aussi faire passer d'une étape à la suivante.

### C2. La survie d'un amendement
- **Ce qui se passe** : adopté en commission, effacé en séance ; adopté en séance, effacé en CMP (près d'un tiers dans l'échantillon).
- **Données** : ◐ traçabilité naïve par sous-chaînes (`scripts/survie.py`) ; ★ côté Sénat, un champ relierait certains alinéas aux amendements (non vérifié ici).
- **Logiciel** : sur chaque feuille adoptée, un **fil de vie** : commission ✔ → séance ✔ → CMP ✘ ; pour la loi finale, « d'où vient chaque phrase » (filiation inverse).

### C3. La CMP et la lecture des conclusions
- **Ce qui se passe** : sept députés et sept sénateurs écrivent un texte commun ; en séance, seuls les amendements du Gouvernement (ou acceptés par lui) sont possibles (9 amendements, tous adoptés, sur le narcotrafic).
- **Logiciel** : une scène distincte, à deux piles face à face (texte AN / texte Sénat) et le texte de CMP au centre : la mécanique « une rédaction | la commission | l'autre » de l'éclatement s'y applique telle quelle.

### C4. Le contrôle (Conseil constitutionnel) et la promulgation
- **Données** : ★ dates de saisine, de décision, de promulgation dans le dossier ; ○ la décision elle-même (site du Conseil).
- **Logiciel** : les articles censurés barrés dans la loi finale ; la saisine comme dernier acte des groupes.

---

## D. Séquences des acteurs

### D1. Le rapporteur et le Gouvernement
- 124 adoptés sur 142 pour le rapporteur en commission narcotrafic. Leurs amendements sont d'une autre nature (rédactionnels, réécritures globales, coordinations).
- **Logiciel** : une couleur ou une matière propre pour les amendements « du banc » ; les séparer des amendements de groupe dans les comptages ; filtrer les rédactionnels.

### D2. Le groupe et ses députés
- Dépôts massifs sans adoption (CP : 134 → 0 sur le logement), non soutenus (auteur absent), dissidences au scrutin.
- **Logiciel** : une **fiche de groupe sur un dossier** (ce qu'il a déposé, ce qui est passé, sur quoi il s'est allié par identiques, ce qu'il a demandé au scrutin). Pas de score : une liste lisible.

### D3. Les tiers (organisations)
- Visibles seulement par les exposés (« travaillé avec le Conseil national des barreaux », « la Fondation pour le logement des défavorisés »…).
- **Logiciel** : un volet « sources » pour un passage : qui, à l'extérieur, a poussé quelle rédaction, et par quels groupes.

### D4. La présidence de séance
- Appelle, annonce, met aux voix, suspend ; change de titulaire en cours de séance.
- **Logiciel** : probablement un simple bandeau (« présidence : … »), mais les rappels au règlement et suspensions marquent des ruptures utiles dans la frise.

---

## E. Séquences transversales

### E1. Un sujet réparti sur plusieurs articles
- Un même groupe porte la même idée sur plusieurs articles (exposés réutilisés : 14 familles sur le narcotrafic) ; les demandes de rapport (54) ; les « Supprimer cet article » en série.
- **Logiciel** : la **scène thème** du flux cible (scène 5 de CLAUDE.md) a une base réelle : regrouper par exposé, par mots du dispositif, par code visé (`loiReference.codeLoi` / `divisionCodeLoi` : l'article de code touché, présent dans les données).

### E2. Un dossier en touche un autre
- Le logement renvoie au PLF 2026 (dispositif Jeanbrun) ; un article de code est modifié par plusieurs lois en cours.
- **Logiciel** : depuis un article de code, la liste des dossiers en cours qui le modifient.

### E3. Le dossier vivant
- Le logement sera en séance du 16 au 20 novembre 2026 ; l'open data AN est régénéré chaque jour (dates de fichier du jour même).
- **Logiciel** : un **mode « en direct »** : rechargement quotidien (ou plus) ; la pile des autres qui se remplit pendant que j'écris ; le compteur avant le délai de dépôt. C'est peut-être la réponse à la question ouverte du « en direct » de CLAUDE.md : le direct n'est pas seulement « je retouche mon texte », c'est aussi « les autres déposent pendant ce temps ».

---

## F. Fonctionnalités en vrac (dérivées, sans tri)

1. Remplacer les données fictives de la maquette par l'**article 4 réel du logement** (`extraits/logement-art4-commission.json`) : 25 alinéas, 143 amendements, identiques, discussions communes, sorts.
2. Feuilles « tombé », « irrecevable », « non soutenu », « retiré » : chacune une matière visuelle (barré, grisé, fantôme, pli).
3. Pastilles d'avis (commission / Gouvernement) et de sort sur chaque feuille.
4. Cascade de discussion commune animée (ordre de vote, chute des suivants).
5. Simulation « si celui-ci passe » : ce qui tombe, ce que devient le texte.
6. Famille de replis comme pile du « mien ».
7. Portée réelle : surligner tous les passages touchés, pas seulement l'alinéa déclaré.
8. Couche « code consolidé » au-dessus du texte de loi.
9. Carte de chaleur des alinéas (nombre d'amendements, nombre de groupes, nombre d'identiques).
10. Itinéraire de séance (ordre d'examen réel, priorités, seconde délibération).
11. Frise temporelle d'une séance (horodatage des sorts, suspensions).
12. Feuille d'épisode (verbatim d'un amendement en séance, réduit aux avis ou déplié).
13. Feuille de vote (scrutin public par groupe, dissidents).
14. Fil de vie d'un amendement à travers la navette.
15. Filiation inverse : d'où vient chaque phrase de la loi.
16. Comparaison de deux étapes quelconques de la navette, corrections apparentes.
17. Graphe des coalitions par identiques et cosignatures.
18. Volet « sources externes » tiré des exposés.
19. Fiche d'un groupe sur un dossier (liste, pas score).
20. Contrôle préalable d'un brouillon (risque de cavalier / charge / gage).
21. Génération automatique des « en conséquence » et du gage dans mon brouillon.
22. Mode en direct sur un dossier en cours (logement, novembre 2026).
23. Filtre « sans les rédactionnels ».
24. Recherche par article de code touché (`loiReference`).
25. Vue « lieu » : commission au fond / commission pour avis / séance / CMP, même passage.

---

## G. Questions ouvertes (pour la fusion et la refonte)

1. **Groupes réels ou fictifs ?** CLAUDE.md impose des groupes fictifs. Les données réelles portent des groupes réels et des noms de députés. Reprendre les données réelles telles quelles, ou les « fictionnaliser » (renommer les groupes) en gardant la structure ?
2. **Quelle unité porte la pile des autres ?** L'amendement (comme aujourd'hui), la grappe d'identiques (un seul vote), ou la discussion commune (l'unité de concurrence réelle) ?
3. **Où commence l'interface ?** Avant le dépôt (écrire), pendant la séance (suivre), après (comprendre ce qui est arrivé) ? Les données sont les plus riches pour l'après ; la maquette est centrée sur l'avant.
4. **Faut-il reconstruire le code consolidé ?** C'est le seul niveau où le sens est lisible, et le plus coûteux à obtenir (Légifrance + application des instructions).
5. **Le temps est-il un axe ?** Les données sont horodatées à la seconde ; la maquette n'a pas de temps.
6. **Les irrecevables** : les montrer (fantômes) ou les ignorer ? Ils représentent jusqu'à un tiers des dépôts.
