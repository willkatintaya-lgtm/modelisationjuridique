# 2. Pistes, situation par situation

Les pistes suivent l'ordre du corpus et sont proposées sans tri. Les codes entre crochets renvoient à `1-registres.md`.

---

## A. Le texte de référence bouge sous les amendements

### A1. On amende le texte de la commission ; réimputation, renumérotation
- **A1-1** Écart texte initial → texte de la commission, montré comme un état de départ : avant même de lire les amendements, on voit ce que la commission a changé. `[DIFF]`
- **A1-2** Glissement animé des alinéas d'une numérotation à l'autre : les alinéas supprimés disparaissent, les insérés apparaissent, les autres prennent leur nouveau numéro. `[ANIM] [ECHELLE]`
- **A1-3** Double numérotation affichée, nouveau numéro et ancien numéro estompé (« al. 4, ex-3 »). `[ETAT] [TEXTE]`
- **A1-4** Table de correspondance entre les numérotations, consultable et cliquable. `[MATRICE] [DOC]`
- **A1-5** Réimputation automatique des amendements préparés sur l'ancienne version, avec un état par amendement : reporté, renuméroté, en conflit, sans objet. `[GENERER] [ETAT] [NOTIF]`
- **A1-6** Vue à trois voies pour les conflits : ancienne version, nouvelle version, amendement. `[ALIGN] [DIFF]`
- **A1-7** Détection « satisfait » : la commission a déjà adopté l'équivalent de mon amendement. `[CTRL] [NOTIF]`
- **A1-8** Choix libre de la référence : voir un même amendement face au texte initial, face au texte de la commission, ou face aux deux. `[SELECT] [DIFF]`

### A2. Articles mouvants (bis, A, octies ; supprimés, rétablis, conformes) ; textes à trous
- **A2-1** Grille articles × étapes, chaque case portant l'état de l'article (créé, modifié, supprimé, rétabli, conforme). `[MATRICE] [ETAT]`
- **A2-2** Reconstitution des textes à trous : les articles conformes sont réinsérés depuis la version précédente et signalés comme repris. `[GENERER] [TEXTE] [ETAT]`
- **A2-3** Généalogie d'un article : de quel amendement il est né, à quelle étape, ce qu'il est devenu. `[FRISE] [FICHE]`
- **A2-4** Sommaire du texte où l'insertion d'un « 3 bis » se voit comme une insertion (décalage, marque). `[ARBRE] [ETAT]`
- **A2-5** Article supprimé maintenu à sa place, marqué comme supprimé, plutôt qu'escamoté. `[TEXTE] [ETAT]`
- **A2-6** Animation de l'évolution du plan du texte au fil des étapes. `[ANIM] [REJOUER]`
- **A2-7** Filtre « seulement les articles encore en discussion ». `[FILTRE]`

### A3. Repères page/ligne ; renumérotation des amendements (20A, 20ZA)
- **A3-1** Ancrage interne sur des identifiants stables, traduit à l'affichage dans le système de repérage local (alinéa, page/ligne). `[TEXTE]`
- **A3-2** Bascule entre repérage officiel et repérage stable. `[SELECT]`
- **A3-3** Historique des numéros d'un même amendement (alias). `[FICHE] [FRISE]`
- **A3-4** Lien persistant vers un passage, qui survit au changement de version. `[NAV]`

### A4. Réécriture globale (« Rédiger ainsi cet article », substitute, version de la commission)
- **A4-1** Calcul et affichage automatiques de l'écart réel entre l'ancienne et la nouvelle rédaction. `[DIFF]`
- **A4-2** Repli des parties identiques (« 8 alinéas inchangés »), dépliables. `[DIFF] [ECHELLE]`
- **A4-3** Résumé chiffré de l'ampleur réelle : « réécrit 10 alinéas, en modifie 2 ». `[COMPTE]`
- **A4-4** Décomposition de la réécriture en modifications élémentaires, comparables une à une avec des amendements ponctuels. `[GENERER] [LISTE]`
- **A4-5** Même mécanique au niveau du texte entier (contre-projet, substitute). `[DIFF] [ECHELLE]`
- **A4-6** Mise en regard d'une réécriture globale et des amendements ponctuels concurrents sur les mêmes unités. `[ALIGN]`

### A5. Versions de l'amendement (rect., bis, ter)
- **A5-1** Historique des versions d'un amendement, avec l'écart entre deux versions. `[FRISE] [DIFF]`
- **A5-2** Indication de la raison de la rectification si elle est connue (demande du rapporteur, avis attendu). `[FICHE]`
- **A5-3** Versions non publiques : absentes, signalées comme existantes, ou visibles par leur seul auteur. `[ETAT]`
- **A5-4** Notification aux personnes qui suivent un amendement lorsqu'il est rectifié. `[NOTIF]`

---

## B. La mécanique qui décide du sort

### O3. Le sort (retiré, non soutenu, tombé, irrecevable… environ 40 valeurs)
- **O3-1** Code visuel distinct par grande famille de sort, avec le libellé officiel exact au survol. `[ETAT] [SURVOL]`
- **O3-2** Pour un amendement tombé, un lien vers la cause (l'amendement dont l'adoption l'a fait tomber). `[GRAPHE] [NAV]`
- **O3-3** Pour un amendement retiré, un lien vers la contrepartie (engagement du ministre, rectification d'un autre). `[GRAPHE] [FICHE]`
- **O3-4** Distinction visible entre « voté » (rejeté, adopté) et « non voté » (tombé, retiré, non soutenu, irrecevable). `[ETAT]`
- **O3-5** Bilan des sorts par article, par groupe, par auteur. `[COMPTE] [MATRICE]`
- **O3-6** Filtres par sort. `[FILTRE]`
- **O3-7** Sankey ou flux : de N déposés à N recevables, N discutés, N votés, N adoptés. `[COMPTE] [GRAPHE]`

### B1. Trois ordres (dépôt, texte, appel) ; dérouleur et liste de vote
- **B1-1** Une même liste triable selon les trois ordres, avec transition animée entre les tris. `[LISTE] [TRI] [ANIM]`
- **B1-2** Le dérouleur reproduit comme document, cliquable. `[DOC]`
- **B1-3** Le parcours d'appel dessiné sur le texte de l'article (numéros d'ordre, chemin). `[CALQUE] [TEXTE]`
- **B1-4** Explication à la demande de l'ordre d'appel : « appelé avant parce que plus éloigné du texte ». `[SURVOL]`
- **B1-5** Liste de vote et dérouleur côte à côte, écarts signalés. `[ALIGN] [CTRL]`
- **B1-6** Repère « en discussion » en temps réel. `[DIRECT]`

### B2. Chutes en cascade (suppression, compromis, réputé adopté, sans objet)
- **B2-1** Prévisualisation au survol : « si adopté, fait tomber… ». `[SURVOL] [GRAPHE]`
- **B2-2** Compteur de chute (« fait tomber 153 amendements »). `[COMPTE]`
- **B2-3** Animation de la cascade au moment de l'adoption, en direct ou rejouée. `[ANIM] [DIRECT] [REJOUER]`
- **B2-4** État « réputé adopté » distinct de « adopté ». `[ETAT]`
- **B2-5** Vue de l'article avant et après la chute. `[DIFF]`

### B3. Logique conditionnelle (« Falls if CA 2 NOT adopted »)
- **B3-1** Condition affichée en clair sur l'amendement. `[ETAT] [FICHE]`
- **B3-2** Arbre des scénarios de vote, chaque feuille étant un texte résultant. `[ARBRE] [SIMU]`
- **B3-3** Simulation : on coche des issues, le reste se met à jour. `[SIMU]`
- **B3-4** Nombre de chemins possibles. `[COMPTE]`

### B4. Priorité et réserve
- **B4-1** Réordonnancement visible de la discussion, avec la raison (priorité, réserve). `[LISTE] [ANIM] [ETAT]`
- **B4-2** Mise en évidence des amendements du Gouvernement et de la commission dans une discussion commune. `[ETAT]`
- **B4-3** Simulation « et si l'on réserve X » : nouvel ordre et nouvelles chutes. `[SIMU]`

### B5. Avis (favorable, défavorable, sagesse, demande de retrait)
- **B5-1** Deux avis distincts (commission, Gouvernement) affichés côte à côte. `[ETAT]`
- **B5-2** Avis pressentis et avis rendus, distingués. `[ETAT]`
- **B5-3** Filtres par avis ; regroupement par combinaison d'avis. `[FILTRE] [MATRICE]`
- **B5-4** Statistiques historiques avis → sort, présentées comme fréquences observées et non comme prédiction. `[COMPTE]`
- **B5-5** La demande de retrait comme point d'entrée d'une négociation (voir H). `[ACTION] [FLUX]`
- **B5-6** Notification de l'avis à l'auteur. `[NOTIF]`

### B6. Vote par division, vote en bloc, packaging
- **B6-1** Sélection d'une partie d'amendement pour demander un vote par division ; l'amendement apparaît scindé. `[SELECT] [ACTION] [ETAT]`
- **B6-2** Refus motivé de la division là où elle est interdite (compromis, PE). `[CTRL]`
- **B6-3** Regroupement visuel des amendements votés en bloc, avec retrait possible d'un élément sur demande de vote séparé. `[ETAT] [ACTION]`
- **B6-4** Paquets du ping-pong (packaging) présentés comme un objet. `[FICHE]`

### B7. Seconde délibération
- **B7-1** Histoire d'un vote : adopté, puis annulé ; double état visible. `[FRISE] [ETAT]`
- **B7-2** Texte avant et après seconde délibération. `[DIFF]`
- **B7-3** Liste des points soumis à seconde délibération. `[LISTE]`

### B8. Vote bloqué (44-3)
- **B8-1** État « discuté, non voté ». `[ETAT]`
- **B8-2** Le texte retenu par le Gouvernement comme version à part entière, comparable au reste. `[ALIGN] [DIFF]`
- **B8-3** Compte des amendements traités ainsi. `[COMPTE]`

### B9. 49-3
- **B9-1** Écart entre le texte issu de la séance et le texte retenu par le Gouvernement. `[DIFF]`
- **B9-2** Liste des amendements adoptés mais non retenus. `[LISTE] [ETAT]`
- **B9-3** Alerte à l'auteur d'un amendement adopté non retenu. `[NOTIF]`

### B10. Remplir l'arbre (US)
- **B10-1** L'arbre d'amendements avec ses places, occupées ou libres, et leurs occupants. `[ARBRE] [ETAT]`
- **B10-2** Indicateur « plus aucune place disponible ». `[CTRL]`

---

## C. Les filtres de recevabilité

### C1. Irrecevabilités (40, 41, 45, LF ; gage ; périmètre ; entonnoir)
- **C1-1** Contrôle pendant la rédaction : repérage des formulations qui exposent à l'article 40 (charge publique) ou à l'article 41 (réglementaire). `[CTRL]`
- **C1-2** Génération du gage type, et suivi de son état (gagé, gage levé). `[GENERER] [ETAT]`
- **C1-3** Le périmètre (art. 45) représenté comme une zone. Les amendements se placent dedans, au bord ou dehors. `[CARTE] [CALQUE]`
- **C1-4** Liste des matières couvertes par le périmètre indicatif, confrontée au contenu de l'amendement. `[CTRL] [FICHE]`
- **C1-5** Entonnoir : seules les parties encore en discussion sont amendables ; les autres sont verrouillées. `[ETAT] [CTRL]`
- **C1-6** Lois de finances : vue missions/programmes avec les transferts de crédits sous forme de flux, et le contrôle d'équilibre. `[GRAPHE] [COMPTE] [CTRL]`
- **C1-7** Statistiques d'irrecevabilité par motif et par article. `[COMPTE]`

### C2. L'amendement fantôme (irrecevable au titre de l'article 40, non publié)
- **C2-1** Ne pas le représenter. `[—]`
- **C2-2** Le représenter pour son seul auteur. `[ETAT]`
- **C2-3** Le représenter dans son groupe. `[ETAT]`
- **C2-4** Silhouette sans contenu : « N amendements non publiés ». `[COMPTE]`
- **C2-5** Proposition de reformulation recevable pour l'auteur (lever la charge, gager). `[GENERER]`

### C3. Seconde chance (redépôt en séance)
- **C3-1** Parcours d'un amendement à travers les étapes, numéros successifs reliés. `[FRISE] [GRAPHE]`
- **C3-2** Action « redéposer » qui reprend l'amendement sur la nouvelle version. `[ACTION] [GENERER]`
- **C3-3** Repérage automatique des redépôts par similarité, présenté comme rapprochement. `[GENERER]`

### C4. Équivalents étrangers (germaneness, Byrd, made in order, règles fermées ; not called, long title, money resolution ; un amendement par disposition, seuils)
- **C4-1** Règles de recevabilité écrites comme paramètres d'un moteur de contrôle, interchangeables selon le système. `[CTRL]`
- **C4-2** État « non appelé » (UK), distinct d'« irrecevable ». `[ETAT]`
- **C4-3** Contrôle « une seule disposition par amendement » (PE). `[CTRL]`
- **C4-4** Verrouillage sous règle fermée, avec exception pour les amendements autorisés. `[ETAT] [CTRL]`
- **C4-5** Vue comparative : la même situation selon les règles de plusieurs systèmes. `[ALIGN]`

---

## D. Le temps

### D1. Délais de dépôt et forclusion ; réouverture
- **D1-1** Compte à rebours par texte et par article. `[JAUGE] [COMPTE]`
- **D1-2** Notification de réouverture du délai sur un article. `[NOTIF]`
- **D1-3** Après la forclusion, indication de ce qui reste possible (sous-amender, reprendre). `[CTRL] [ACTION]`
- **D1-4** Calendrier des délais du dossier. `[FRISE]`

### D2. Temps législatif programmé
- **D2-1** Budget de temps restant par groupe. `[JAUGE] [COMPTE]`
- **D2-2** Amendements qui seront votés sans débat une fois le temps épuisé. `[ETAT]`
- **D2-3** Planificateur : répartir son temps entre ses amendements. `[EDIT] [SIMU]`
- **D2-4** Suivi en direct de la consommation. `[DIRECT]`

### D3. Couperets et clôtures (programme motion, vote-a-rama, réduction des délais)
- **D3-1** Projection : jusqu'où ira la discussion avant le couperet, au rythme actuel. `[SIMU] [LISTE]`
- **D3-2** Amendements au-delà du couperet signalés (sauf ceux du Gouvernement, UK). `[ETAT]`
- **D3-3** Relecture accélérée d'une série de votes. `[REJOUER]`

### D4. La navette rétrécit la marge (conformes exclus, lien direct, propositions de rédaction en CMP, accord du Gouvernement, lecture définitive)
- **D4-1** Surface amendable du texte à chaque étape, visiblement décroissante. `[FRISE] [ECHELLE] [COMPTE]`
- **D4-2** Article par article : amendable ou fermé, et pourquoi. `[MATRICE] [ETAT]`
- **D4-3** Les propositions de rédaction de CMP comme objet distinct de l'amendement. `[FICHE]`
- **D4-4** Après la CMP, l'action de dépôt conditionnée à l'accord du Gouvernement. `[ACTION] [CTRL]`
- **D4-5** En lecture définitive, une liste des amendements reprenables, ceux votés par le Sénat. `[LISTE] [FILTRE]`

### D5. Procédure accélérée (disposition vue par une seule chambre)
- **D5-1** Marque « votée par une seule chambre ». `[ETAT]`
- **D5-2** Filtre de ces dispositions. `[FILTRE]`

---

## E. Des acteurs aux pouvoirs asymétriques

### E1. Le rapporteur (avis, hors délai, double signature)
- **E1-1** Un espace de travail du rapporteur : tous les amendements à aviser, triés et regroupés, avis à poser. `[LISTE] [ACTION]`
- **E1-2** Suggestion de rectification adressée à un auteur, que celui-ci accepte ou refuse. `[EDIT] [FLUX]`
- **E1-3** Marque « hors délai (rapporteur) ». `[ETAT]`
- **E1-4** Double signature visible. `[FICHE]`

### E2. Rapporteurs de groupe (fictifs, co-rapporteurs, pour avis ; Berichterstatter, Obleute)
- **E2-1** Annuaire du dossier : qui suit le texte, dans chaque groupe et chaque commission. `[LISTE] [FICHE]`
- **E2-2** Réseau des acteurs du dossier. `[GRAPHE]`

### E3. Le Gouvernement (hors délai, 44 al. 2, vote bloqué, accord post-CMP, levée du gage)
- **E3-1** Représentation du Gouvernement comme acteur à part, avec ses leviers. `[FICHE] [ETAT]`
- **E3-2** Calque « où le Gouvernement peut intervenir maintenant ». `[CALQUE]`
- **E3-3** Historique des usages de chaque levier sur le texte. `[FRISE] [COMPTE]`
- **E3-4** Espace de travail ministériel (avis, leviers). `[LISTE] [ACTION]`

### E4. Le président de séance (recevabilité, discussion commune, sélection, regroupement)
- **E4-1** Discussions communes officielles rendues visibles comme regroupements. `[ETAT] [LISTE]`
- **E4-2** Amendement de tête d'un regroupement (lead amendment) mis en avant. `[ETAT]`
- **E4-3** Outil de constitution des discussions communes (pour l'administration). `[EDIT] [SELECT]`

### E5. Député non membre de la commission (dépose, défend, ne vote pas)
- **E5-1** Droits affichés selon l'appartenance. `[CTRL] [FICHE]`
- **E5-2** Actions disponibles ajustées. `[ACTION]`

### E6. Cosignataires (premier signataire, retrait, ajout)
- **E6-1** Bloc de signataires lisible, premier signataire distinct. `[FICHE]`
- **E6-2** Circuit de cosignature : invitation, signature, compteur. `[FLUX] [COMPTE] [NOTIF]`
- **E6-3** Actions réservées au premier signataire. `[ACTION] [CTRL]`

### E7. La reprise (par un parlementaire, la commission, le Gouvernement)
- **E7-1** Action « reprendre » sur un amendement retiré. `[ACTION]`
- **E7-2** Historique de propriété de l'amendement. `[FRISE]`
- **E7-3** Notification à l'auteur initial. `[NOTIF]`

### E8. Le parlementaire isolé face aux seuils (36 signatures, 40 opposants, 5 %)
- **E8-1** Compteur vers le seuil. `[JAUGE] [COMPTE]`
- **E8-2** Suggestion de cosignataires potentiels : ceux qui ont déposé quelque chose de proche. `[GENERER] [LISTE]`
- **E8-3** Point de vue « moi » non rattaché à un groupe. `[—, point de vue]`
- **E8-4** Seuils de blocage (40 opposants à un amendement oral) affichés en direct. `[DIRECT] [COMPTE]`

---

## F. Les relations entre amendements

### O1. Plusieurs amendements d'un même groupe sur une même unité (principal/repli, alternatives exclusives, compatibles)
- **O1-1** Représentation en échelons du principal et de ses replis, avec leur ordre d'appel. `[ARBRE] [ETAT]`
- **O1-2** Aide à la rédaction d'un repli à partir du principal. `[EDIT] [GENERER]`
- **O1-3** Contrôle de cohérence : le repli doit être plus proche du texte que le principal. `[CTRL]`
- **O1-4** Alternatives exclusives montrées comme concurrentes. `[GRAPHE]`
- **O1-5** Modifications compatibles cumulables en une vue composée. `[DIFF] [SIMU]`
- **O1-6** Contraintes : orateur unique pour des identiques du même groupe ; interdiction de signer deux identiques (Sénat). `[CTRL] [ETAT]`

### O2. Amendements proches de groupes différents (identiques, convergents concurrents, complémentaires)
- **O2-1** Regroupement automatique des identiques (vote unique, plusieurs auteurs). `[GENERER] [ETAT]`
- **O2-2** Concurrents montrés ensemble, ordre d'appel et chutes visibles. `[LISTE] [GRAPHE]`
- **O2-3** Complémentaires combinables en une rédaction cumulée. `[SIMU] [DIFF]`
- **O2-4** Carte de proximité des rédactions : la distance reflète la ressemblance textuelle. `[CARTE]`
- **O2-5** Signalement des identiques transpartisans, sans conclure à une influence. `[ETAT] [COMPTE]`
- **O2-6** Rapprochement avec des sources externes connues (contributions publiques), présenté comme un rapprochement et non comme une preuve. `[GENERER]`

### O5. Sous-amendements (un niveau en FR, deux degrés aux US ; ni contredire ni dépasser ; sans délai ; voté avant)
- **O5-1** Sous-amendement affiché sur l'amendement, avec son écart par rapport à l'amendement (et non au texte). `[DIFF] [TEXTE]`
- **O5-2** Contrôle de champ : il reste dans la plage de l'amendement. `[CTRL]`
- **O5-3** Contrôle de profondeur (un niveau, deux aux US). `[CTRL]`
- **O5-4** Action « sous-amender » mise en avant après la forclusion. `[ACTION]`
- **O5-5** Sénat : sur son propre amendement, l'action devient « rectifier ». `[CTRL]`
- **O5-6** Ordre de vote sous-amendement → amendement visible. `[LISTE]`
- **O5-7** Arbre d'amendements à deux degrés (US). `[ARBRE]`

### F1. Conséquence et coordination
- **F1-1** Liens fond → conséquences, y compris entre articles éloignés. `[GRAPHE]`
- **F1-2** Mise à jour automatique : une conséquence devient sans objet si le fond tombe. `[SIMU] [NOTIF]`
- **F1-3** Exception à l'entonnoir signalée. `[CTRL]`

### F2. Compromis qui remplace N amendements (Supported by…)
- **F2-1** Le compromis et la liste des amendements qu'il remplace. `[FICHE] [LISTE]`
- **F2-2** Animation d'absorption au moment où le compromis est déposé ou adopté. `[ANIM]`
- **F2-3** Groupes qui soutiennent le compromis. `[ETAT]`
- **F2-4** Écart entre la liste des remplacés et la liste de vote. `[ALIGN] [CTRL]`

### F3. Paving, in lieu (UK)
- **F3-1** Liens « prépare » et « remplace ». `[GRAPHE]`

### F4. Contreparties non contraignantes (résolution, déclaration, engagement oral)
- **F4-1** Objet « engagement » rattaché à l'amendement retiré, avec sa source. `[FICHE]`
- **F4-2** Suivi des engagements : tenu, en attente, non tenu. `[LISTE] [ETAT]`
- **F4-3** Rappel d'un engagement à la lecture suivante. `[NOTIF]`

---

## G. Les instruments qui ne sont pas des amendements

### G1. Motions (rejet préalable, question préalable, exception d'irrecevabilité, renvoi en commission ; proposition de rejet ; motion to recommit)
- **G1-1** Les motions placées au niveau du texte entier, avant les articles. `[ECHELLE] [LISTE]`
- **G1-2** Effet d'une motion adoptée : tout le texte tombe ou repart. `[ANIM] [ETAT]`
- **G1-3** Motions comme étapes de la frise. `[FRISE]`

### G2. Interventions en séance (rappel au règlement, suspension, clôture)
- **G2-1** Événements de séance sur la frise de la séance. `[FRISE]`
- **G2-2** Ce qui a changé pendant une suspension (rectifications, retraits, nouveaux amendements). `[DIFF] [LISTE]`
- **G2-3** Relecture d'une séance. `[REJOUER]`

### G3. Votes et traces (scrutin public, délégation, explications de vote, contributions écrites)
- **G3-1** Résultat du scrutin par groupe. `[COMPTE] [MATRICE]`
- **G3-2** Votes individuels, dissidences par rapport au groupe. `[MATRICE] [ETAT]`
- **G3-3** Explications de vote et contributions écrites rattachées à l'objet voté. `[FICHE] [ANNOT]`
- **G3-4** Délégations de vote. `[FICHE]`

### G4. Auditions (de droit à la demande d'un quart, DE)
- **G4-1** Auditions sur la frise du dossier, avec renvoi au compte rendu. `[FRISE]`
- **G4-2** Compteur de demandes vers le seuil. `[COMPTE]`

### G5. Évaluation préalable d'un amendement (98-1 RAN)
- **G5-1** Demande depuis l'amendement, circuit d'accord. `[ACTION] [FLUX]`
- **G5-2** Évaluation rattachée à l'amendement. `[FICHE]`

---

## H. La négociation formalisée

### O8. La question ouvrant une discussion bilatérale (augmentation ; équivalents : amendement d'appel, demande de retrait, rectification, suspension, levée du gage)
- **O8-1** Étiquette « d'appel » déclarative sur un amendement. `[ETAT]`
- **O8-2** Fil de négociation ouvert par une demande de retrait. `[ANNOT] [FLUX]`
- **O8-3** Rectification proposée et acceptée comme mode de négociation. `[EDIT] [FLUX]`
- **O8-4** Levée du gage comme signal visible. `[ETAT] [NOTIF]`
- **O8-5** Objet « question », assumé comme augmentation : ancré à un passage ou à un amendement, adressé à un ou deux acteurs, privé, avec réponse. `[ANNOT]`
- **O8-6** Transformation d'une question en acte réel : rectification, sous-amendement, amendement commun, retrait. `[ACTION]`
- **O8-7** Carte des questions ouvertes sur le texte. `[CALQUE] [COMPTE]`

### H1. Trilogue (rapporteurs fictifs, document à 4 colonnes, accord voté en bloc)
- **H1-1** Alignement à 4 colonnes, la colonne de compromis étant éditable. `[ALIGN] [EDIT]`
- **H1-2** État de chaque ligne : accord, divergence, réservée ; repli des lignes en accord. `[ETAT] [ECHELLE]`
- **H1-3** Provenance de chaque passage du compromis : de quelle colonne il vient. `[CALQUE]`
- **H1-4** Accord provisoire non amendable, voté en une fois. `[CTRL]`
- **H1-5** Réunions successives sur une frise, chacune avec ce qu'elle a fait bouger. `[FRISE] [DIFF]`

### H2. Commission mixte paritaire (paritaire, propositions de rédaction, égalité = rejet)
- **H2-1** Composition paritaire et décompte pour chaque proposition. `[COMPTE]`
- **H2-2** Alignement texte AN, texte Sénat et proposition de rédaction. `[ALIGN]`
- **H2-3** Règle de l'égalité appliquée et expliquée. `[CTRL]`
- **H2-4** Succès ou échec de la CMP, et la suite de la frise qui bifurque. `[FRISE]`

### H3. Ping-pong (reasons, insistence, concession à chaque tour)
- **H3-1** Tours d'échange sur une frise. `[FRISE]`
- **H3-2** Concession de chaque tour par rapport au précédent. `[DIFF]`
- **H3-3** Alerte de double insistance. `[CTRL]`

### H4. Conciliation (conference committee ; Vermittlungsausschuss oui/non)
- **H4-1** Seules les parties en désaccord sont ouvertes. `[FILTRE] [ETAT]`
- **H4-2** Vote unique oui/non. `[CTRL]`

---

## I. La légistique, c'est-à-dire l'effet juridique

### O4. Motifs localisés (motifs du texte ; motifs de l'amendement)
- **O4-1** Les deux couches de motifs rattachées à leur endroit, consultables séparément ou ensemble. `[CALQUE] [TEXTE]`
- **O4-2** Rédaction de motifs attachés à chaque modification, assemblés en exposé sommaire. `[EDIT] [GENERER]`
- **O4-3** Rubriques de motif obligatoires selon le contexte (relation directe, imputation des crédits). `[CTRL]`
- **O4-4** Compteur de mots (UK, environ 50). `[CTRL] [COMPTE]`
- **O4-5** Motifs non votés distingués du dispositif voté. `[ETAT]`
- **O4-6** Lecture des motifs de tous les amendements sur un même passage. `[LISTE] [ALIGN]`

### I1. Opération sur une plage ; position déclarée et portée réelle
- **I1-1** Génération du dispositif à partir d'une édition directe du texte, et inversement. `[GENERER] [EDIT]`
- **I1-2** Plage réellement touchée, marquée sur le texte. `[CALQUE]`
- **I1-3** Alerte en cas d'écart entre position déclarée et portée réelle. `[CTRL]`
- **I1-4** Chevauchement des plages de plusieurs amendements visible. `[CALQUE]`

### I2. Granularité (division, article, I, A, 1°, a), alinéa, phrase, mots et occurrence, cellule, mission/programme)
- **I2-1** Zoom à travers la structure du texte. `[ECHELLE] [ARBRE]`
- **I2-2** Occurrences multiples des mots visés, l'occurrence ciblée étant distinguée. `[TEXTE]`
- **I2-3** Tableaux législatifs éditables cellule par cellule. `[MATRICE] [EDIT]`
- **I2-4** Missions et programmes en vue budgétaire. `[MATRICE] [COMPTE]`

### I3. Deux niveaux de texte (guillemets imbriqués, dans/hors guillemets)
- **I3-1** Distinction visuelle entre le texte du projet et le texte qu'il insère dans le code. `[TEXTE] [ETAT]`
- **I3-2** Indication du niveau auquel opère un amendement. `[ETAT]`
- **I3-3** Emboîtements plus profonds (sous-amendement → amendement → projet → code). `[ARBRE]`

### I4. Voir l'effet sur le droit en vigueur (tableau comparatif, Ramseyer/Cordon, synopse, Keeling)
- **I4-1** Tableau comparatif : droit en vigueur, projet, amendement. `[ALIGN] [DOC]`
- **I4-2** Droit en vigueur en corrections apparentes (Ramseyer/Cordon). `[DIFF]`
- **I4-3** Texte consolidé de la loi modifiée (Keeling), avec ou sans marques. `[TEXTE] [GENERER]`
- **I4-4** Vue par article de code : tout ce qui le modifie, quel que soit l'article du projet. `[LISTE] [ALIGN]`
- **I4-5** Simulation : le code tel qu'il serait si telle combinaison d'amendements passait. `[SIMU]`

### I5. Points d'attention de rédaction (renvois, entrée en vigueur, transitoires, outre-mer, gage)
- **I5-1** Renvois rendus actifs (liens) et signalés quand ils sont cassés. `[CTRL] [NAV]`
- **I5-2** Calendrier d'entrée en vigueur et d'application par disposition. `[FRISE]`
- **I5-3** Dispositions transitoires marquées, avec leur durée. `[ETAT]`
- **I5-4** Contrôle d'applicabilité outre-mer. `[CTRL]`
- **I5-5** Contrôle de la place du gage. `[CTRL]`

### I6. Considérant ou dispositif (PE)
- **I6-1** Distinction visible normatif / non normatif. `[ETAT]`
- **I6-2** Alerte : amendement politique placé en considérant. `[CTRL]`
- **I6-3** Ordre de vote (considérants après les articles). `[LISTE]`

### I7. Fin de parcours (omnibus, cavaliers, renumérotation finale, juriste-linguiste, rectificatifs, correction par résolution)
- **I7-1** Table de concordance entre numérotations provisoire et définitive. `[MATRICE] [DOC]`
- **I7-2** Écart entre texte voté et texte finalisé. `[DIFF]`
- **I7-3** Inventaire des matières et codes touchés par une loi omnibus. `[LISTE] [COMPTE]`

---

## Partie II. Vues transversales

### O6. Vue par thème (diagonale ; compromis thématiques, lead amendment, contre-projet, conséquences groupées, horizontaux)
- **O6-1** Vue diagonale : les passages d'un même thème à travers le texte, rassemblés et lus d'un trait. `[LISTE] [TEXTE]`
- **O6-2** Le thème comme fil sur une vue d'ensemble du texte. `[CALQUE] [CARTE]`
- **O6-3** Thèmes de sources diverses : institutionnels (compromis, regroupements, discussions communes), sémantiques (taux, seuil, échéance), contre-projets d'un groupe, horizontaux, découpés automatiquement, déclarés par l'utilisateur. `[GENERER] [EDIT]`
- **O6-4** Matrice thèmes × groupes : en texte court, ce que chacun propose. `[MATRICE]`
- **O6-5** Synthèse rédigée d'un thème : qui porte quoi, identique, concurrent, complémentaire, état des avis et des sorts. `[GENERER]`
- **O6-6** Amendement horizontal montré une fois, avec toutes ses occurrences. `[LISTE] [CALQUE]`

### O7. Modules et échelles (mots → texte → dossier → code → droit en vigueur) ; axes position, temps, acteurs ; calque graphe
- **O7-1** Zoom continu ou par crans sur les cinq niveaux. `[ECHELLE]`
- **O7-2** Deux échelles séparées : l'une textuelle (mots → texte), l'autre juridique (projet → code → droit en vigueur). `[ECHELLE]`
- **O7-3** Vue d'ensemble du texte avec, pour chaque partie, le nombre d'amendements. `[CARTE] [COMPTE]`
- **O7-4** Vues coordonnées : position × temps (grille articles × étapes), position × acteurs (matrice unités × groupes), temps × acteurs (frise par groupe). `[MATRICE] [FRISE]`
- **O7-5** Le calque du graphe superposable à toutes les vues. `[CALQUE] [GRAPHE]`
- **O7-6** Espace 2D libre où l'on dispose soi-même les objets (table de travail). `[CARTE] [EDIT]`

---

## Partie II. Ce que le modèle doit porter (M1 à M10), vu comme possibilités d'interface

- **M1. Version visée** : afficher et choisir la version de référence de chaque comparaison. `[SELECT] [ETAT]`
- **M2. Identifiant stable** : liens, notes et comparaisons qui survivent aux renumérotations ; suivi d'une unité à travers les versions. `[NAV] [FRISE]`
- **M3. Opération + plage + auteur + motif** : fiche d'amendement en quatre parties, dont chacune est un point d'entrée de navigation. `[FICHE]`
- **M4. Statut à plusieurs dimensions** : traitement, recevabilité, avis, sort et mode de vote affichés séparément et filtrables séparément. `[ETAT] [FILTRE] [MATRICE]`
- **M5. Graphe de dépendances** : réseau visible et moteur de simulation. `[GRAPHE] [SIMU]`
- **M6. Trois ordres** : tri. `[TRI]`
- **M7. Acteurs et pouvoirs par étape** : droits affichés, actions conditionnées. `[FICHE] [ACTION] [CTRL]`
- **M8. Temps** : frises, comptes à rebours, budgets, états par étape. `[FRISE] [JAUGE] [MATRICE]`
- **M9. Alignement de N versions et compromis en construction** : synopse éditable. `[ALIGN] [EDIT]`
- **M10. Attribution inverse** : provenance de chaque passage du texte adopté, par amendement, auteur et étape ; bilan par auteur. `[CALQUE] [NAV] [COMPTE]`
