# 2. Situations — propositions famille par famille

Ce fichier suit l'ordre du corpus. Pour chaque situation, la réalité est rappelée en une ligne, puis viennent les propositions d'interface. Elles réutilisent les primitives `P1` à `P10` de `1-primitives.md`.

---

## A. Le texte de référence bouge sous les amendements

### A1. Texte de la commission (réimputation, renumérotation)
- **A1.a — Réimputation assistée.** Quand une nouvelle version de référence arrive (le texte de la commission remplace le texte initial), mes brouillons sont reportés automatiquement sur elle. Chaque feuille porte alors l'un de quatre états :
  - *reporté tel quel* ;
  - *renuméroté* (al. 3 → al. 4) ;
  - *en conflit* (la commission a touché le même passage) ;
  - *orphelin* (le passage visé n'existe plus).
  — *contrôle, neuf*
- **A1.b — Vue à trois voies.** Pour un conflit, trois feuilles alignées : texte initial (vierge), texte de la commission, mon amendement. C'est l'analogue d'une fusion de versions : je vois ce que la commission a fait et ce que mon amendement voulait faire. — *vue, prolonge l'éclatement*
- **A1.c — « Satisfait par la commission ».** Si la commission a adopté une rédaction identique ou équivalente à la mienne sur une unité, ma feuille l'indique et propose de retirer l'amendement ou de le reformuler. — *contrôle, neuf*
- **A1.d — Ancien numéro estompé** sur chaque alinéa (P2.a). — *marque*
- **A1.e — Animation de transition.** Au passage d'une version à l'autre, les alinéas glissent à leur nouvelle place, ceux qui sont supprimés se plient, ceux qui sont insérés se déplient. On voit le texte bouger sous les amendements, littéralement. — *geste, neuf*

### A2. Articles mouvants (bis, A, octies ; supprimés, rétablis, conformes ; textes à trous)
- **A2.a — États d'article dans la liste des articles.** Chaque article affiche son état en tampon :
  - *nouveau* : créé par l'amendement n° X en commission, avec un lien vers cet amendement ;
  - *supprimé* : la feuille reste visible, entièrement barrée, conformément à la règle de suppression ;
  - *rétabli* ;
  - *conforme*.
  — *marque, neuf*
- **A2.b — Papier « déjà adopté ».** Un article conforme, reconstitué à partir de la version précédente, est imprimé sur un papier plus ancien (légèrement plus jaune, cadre plus fin) et scellé : il n'est plus amendable en 2e lecture. Le trou du texte publié est donc comblé, mais on voit que la pièce est rapportée. — *marque, neuf*
- **A2.c — Insertion visible.** Un article « 3 bis » s'insère entre 3 et 4 comme une feuille glissée dans une liasse, avec un léger décalage. Un article « 1er A » se place avant le 1er. — *marque, neuf*
- **A2.d — Table des articles par étape.** Une grille articles × étapes (P8.c), où chaque case porte un état. C'est la carte de la mobilité du texte. — *vue, neuf*

### A3. Repères page / ligne, renumérotation des amendements
- **A3.a — Ancres universelles.** L'interface n'utilise que des ancres stables (P2). Elle affiche à la demande la traduction dans le système de repérage local : alinéa en France, page/ligne au Royaume-Uni et aux États-Unis. Si l'on change de version, les références ne cassent pas. — *donnée, neuf*
- **A3.b — Alias d'amendement.** Un amendement qui change de numéro d'une liste à l'autre (20A → 20ZA) ou d'une étape à l'autre (commission → séance) garde une identité unique. Ses numéros successifs sont listés au verso. — *marque, neuf*

### A4. Réécriture globale (« Rédiger ainsi cet article »)
- **A4.a — Écart réel automatique.** C'est déjà le principe de la maquette (le diff face à la commission) ; il faut l'étendre à l'article entier et au texte entier. Un amendement qui réécrit 10 alinéas pour en changer 2 montre les 2 changements en corrections apparentes. Les 8 autres sont **pliés** (accordéon de papier : « 8 alinéas inchangés »), dépliables. — *vue, prolonge*
- **A4.b — Étiquette d'écart.** Le titre de la feuille dit l'ampleur réelle de l'amendement : « réécrit l'article ; modifie réellement les alinéas 3 et 7 ». C'est un dénombrement, pas un score. — *marque, neuf*
- **A4.c — Décomposition.** Une réécriture globale se décompose en ses modifications élémentaires, comme si elle était N petits amendements. Elle peut alors être comparée unité par unité avec des amendements ponctuels concurrents, dans le regroupement par proposition. — *vue, prolonge*
- **A4.d — Contre-projet (texte entier).** Même principe à l'échelle du texte : un *amendment in the nature of a substitute* montre le texte entier, plié sauf aux endroits qui diffèrent. — *vue, prolonge*

### A5. Versions de l'amendement (rect., bis, ter)
- **A5.a — Liasse de versions.** Derrière la feuille d'un amendement rectifié, ses versions antérieures dépassent légèrement, décalées, comme des feuilles agrafées. Un clic montre la rectification en corrections apparentes, version contre version. — *marque, prolonge*
- **A5.b — Motif de la rectification.** Si la rectification répond à une demande (du rapporteur, pour obtenir un avis favorable : voir H0), le lien est affiché : « rectifié à la demande du rapporteur ». — *marque, neuf*
- **A5.c — Versions non publiques.** Quand seule la dernière version est publique, les versions antérieures connues de moi (mes propres brouillons) restent visibles pour moi seul. Celles des autres sont absentes, ou montrées comme une silhouette (« rect. — version antérieure non publiée »). — *marque, neuf*

---

## B. La mécanique qui décide du sort

### B0. Exemple d'origine n° 3 — Les sorts (retiré, non soutenu, tombé, irrecevable…)
Chaque sort a une matière différente sur la feuille, au lieu d'une simple étiquette :

| Sort | Traitement de la feuille |
|---|---|
| Adopté | La feuille se fond dans le texte : ses corrections entrent dans la version suivante, avec un filet de provenance (P10). La feuille reste consultable, tamponnée. |
| Rejeté | Tampon « rejeté », la feuille reste à plat dans la pile. |
| Tombé | Feuille ombrée, inclinée vers l'arrière ; un fil relie le tampon « tombé » à la cause (l'amendement dont l'adoption l'a fait tomber). Ce n'est pas un vote : pas de chiffres de scrutin. |
| Retiré | Feuille pliée en deux. Si le retrait s'est fait contre un engagement, la mention de l'engagement est épinglée (F4) ; bouton « reprendre » (E7). |
| Non soutenu | Le pied de feuille n'a pas de signature présente : signature en pointillé, « auteur absent ». |
| Irrecevable | Feuille découpée (bord dentelé), motif tamponné (art. 40, 41, 45…). Pour un amendement non publié, voir C2. |

- **B0.a — Familles visuelles** : environ 40 valeurs officielles sont ramenées à ces 6 à 8 matières, avec le libellé exact au survol (P4.d). — *marque, neuf*
- **B0.b — Bilan de sort** : pour un groupe ou pour moi, combien d'amendements de chaque sort, par article. Ce sont des chiffres qui ont un sens ; ils s'affichent en texte, pas en jauge. — *vue, neuf*

### B1. Trois ordres (dépôt, texte, appel ; dérouleur, liste de vote)
- **B1.a — Tri du tambour** selon les trois ordres (P6.a). — *geste, prolonge*
- **B1.b — Volet « dérouleur ».** Le dérouleur de séance est un document papier qui défile : chaque ligne porte un amendement ou une discussion commune, les avis attendus, et le repère « nous sommes ici » (P6.c). Un clic sur une ligne ouvre la feuille. — *volet ou objet, neuf*
- **B1.c — Parcours d'appel visualisé.** Sur le texte de l'article, l'ordre d'appel (du plus éloigné au plus proche) est tracé comme un chemin numéroté de feuille en feuille. On comprend pourquoi la suppression est appelée en premier. — *calque, neuf*
- **B1.d — Liste de vote (PE)** : un document distinct du dérouleur, avec les votes groupés et les votes par division. On peut le comparer au dérouleur, car le corpus note que les deux ne coïncident pas toujours (F2). — *objet, neuf*

### B2. Chutes en cascade
- **B2.a — Survol prédictif** : « si adopté, fait tomber… » (P5.b). — *geste*
- **B2.b — Effondrement animé.** Quand une suppression est adoptée en séance (en direct ou en revoyant la séance), toutes les feuilles de l'article basculent d'un coup en arrière, à la manière du tambour, et prennent le tampon « tombé ». — *geste, prolonge*
- **B2.c — « Réputé adopté »** (PE) : le tampon a une forme distincte (sans chiffres de scrutin), avec la mention « sans vote ». — *marque, neuf*
- **B2.d — Compteur de cascade** sur chaque compromis ou suppression : « fait tomber 153 amendements » (P5.d). — *marque*

### B3. Logique conditionnelle (« Falls if CA 2 NOT adopted »)
- **B3.a — Condition écrite sur la case « sort »** : avant le vote, la case porte au crayon « tombe si CA 2 rejeté ». — *marque, neuf*
- **B3.b — Arbre de scénarios** : pour un article, l'arbre des chemins possibles selon les votes successifs. Chaque feuille terminale de l'arbre est un texte résultant, consultable en corrections apparentes. Le nombre de chemins est montré. — *vue, neuf*

### B4. Priorité et réserve
- **B4.a — Réordonnancement visible.** Une réserve ou une priorité déplace la feuille dans l'ordre d'appel. Le déplacement est animé, et la feuille porte « réservé jusqu'après l'article 12 » ou « en priorité ». — *marque, neuf*
- **B4.b — Priorité des amendements du Gouvernement et de la commission** : dans une discussion commune, leurs feuilles sont posées au-dessus, avec la mention « appelé en priorité ». — *marque, neuf*

### B5. Avis (favorable, défavorable, sagesse, demande de retrait)
- **B5.a — Deux tampons d'avis, commission et Gouvernement**, dans la bande P4.a. Les avis divergents se voient tout de suite. — *marque, neuf*
- **B5.b — Filtrer par avis** : « montrer seulement les amendements avec avis favorable sur cet article », pour savoir ce qui va probablement passer. ⚠ Le corpus dit que l'avis est le principal prédicteur. Il serait tentant d'afficher une probabilité d'adoption, mais ce serait un score : je ne le propose pas. L'avis s'affiche en tant qu'avis, en mots. — *geste, neuf*
- **B5.c — « Demande de retrait » = invitation.** Ce tampon est actif : il ouvre la négociation (H0.b). — *geste, neuf*
- **B5.d — Avis attendus.** Avant la séance, le rapporteur et le Gouvernement ont souvent un avis pressenti. Il se marque au crayon (provisoire), puis à l'encre une fois rendu. — *marque, neuf*

### B6. Vote par division, vote en bloc, packaging
- **B6.a — Découpage d'une feuille.** On sélectionne une phrase de l'amendement et on demande le vote par division : la feuille se scinde en parties pointillées, chacune avec sa propre case de sort. — *geste, neuf*
- **B6.b — Interdit sur un compromis** (PE) : sur une feuille de compromis, le geste de division est refusé avec la raison écrite. — *contrôle, neuf*
- **B6.c — Agrafe.** Un vote en bloc ou un *packaging* rassemble des feuilles sous une agrafe dorée : un seul tampon de sort pour le paquet. Une demande de vote séparé retire une feuille de l'agrafe. — *objet, neuf*

### B7. Seconde délibération
- **B7.a — Tampons superposés.** La feuille porte « adopté », puis par-dessus « annulé en seconde délibération ». Le texte revient à l'état précédent, visible dans la frise du temps (P8). — *marque, neuf*
- **B7.b — Liste des points soumis à seconde délibération**, comme un dérouleur en fin de texte. — *objet, neuf*

### B8. Vote bloqué (art. 44-3)
- **B8.a — « Discuté, non voté ».** Les amendements traités en vote bloqué ont la case « sort » remplie par une mention spéciale qui renvoie au vote unique. — *marque, neuf*
- **B8.b — Le texte retenu par le Gouvernement** devient une version à part (P1). On le compare à ce qu'aurait donné un vote amendement par amendement, ou aux amendements discutés. — *vue, neuf*

### B9. 49-3
- **B9.a — Texte du 49-3 contre texte issu de la séance.** On aligne les deux versions avec le même éclatement que la maquette. Les amendements adoptés en séance mais non repris dans le texte du 49-3 sont marqués « adopté, non retenu ». — *vue, prolonge*
- **B9.b — Pour mes amendements adoptés** : un avertissement « votre amendement n° X adopté en séance n'est pas dans le texte retenu ». — *contrôle, neuf*

### B10. Remplir l'arbre (US)
- **B10.a — Visualiser les places disponibles.** L'arbre d'amendements américain a un nombre fini de places. On montre les places et qui les occupe : une place occupée par le leader de la majorité est vue comme une place prise. C'est une idée transposable à toute règle qui limite le nombre d'amendements simultanés. — *vue, neuf*

---

## C. Les filtres de recevabilité

### C1. Irrecevabilités françaises (40, 41, 45, LF ; gage ; périmètre ; entonnoir)
- **C1.a — Contrôle de recevabilité à la rédaction.** Pendant que je rédige, des règles d'extraction (la même brique que celle de l'archive : taux, seuil, sanction…) signalent les risques. Une création de charge (« crée un fonds », « une aide de », « est pris en charge par ») fait craindre l'article 40 ; une mesure d'application (« fixe le modèle de formulaire ») fait craindre l'article 41. Le signal est un trait de marge rouge pâle avec le motif, pas un score. — *contrôle, neuf*
- **C1.b — Gage proposé.** Pour une perte de recettes, le logiciel propose le paragraphe de gage type, ajouté en fin d'amendement. Sa place en fin de texte est respectée (I5). Le gage est un alinéa visuellement distinct, en italique, car on sait qu'il a vocation à disparaître. — *contrôle, neuf*
- **C1.c — Gage levé.** Quand le Gouvernement lève le gage, l'alinéa de gage est barré proprement et la feuille porte « gage levé ». C'est un signal d'accord, relié à H0. — *marque, neuf*
- **C1.d — Périmètre (art. 45).** Le « périmètre indicatif » publié au Sénat se représente comme une zone autour du texte, un halo papier plus clair. Les amendements hors périmètre sont posés à l'extérieur de la zone. Pendant que je rédige, ma feuille glisse vers le bord si le contrôle détecte un risque de cavalier. — *calque, neuf*
- **C1.e — Entonnoir.** En navette, les articles conformes sont scellés (A2.b). Les passages encore « en discussion » sont seuls amendables. Un amendement qui vise une zone scellée reçoit l'alerte « relation directe à justifier » et le champ « motif » s'ouvre (I0). — *contrôle, neuf*
- **C1.f — Lois de finances.** Une vue spécifique pour les missions et programmes : les amendements de crédits sont des transferts entre programmes, représentés comme des flux d'un programme à l'autre. La contrainte de solde (on retire ici ce qu'on ajoute là) est vérifiée. Ici les chiffres ont un sens plein. — *vue, neuf*

### C2. L'amendement fantôme (non publié)
Le corpus pose explicitement la question de conception. Les options possibles :
- **C2.a — Ne pas le représenter** : fidèle à l'open data.
- **C2.b — Fantôme à soi.** Mes propres amendements irrecevables restent dans ma pile, découpés, avec le motif. Je les ai écrits, ils existent pour moi. — *marque, neuf*
- **C2.c — Silhouettes comptées.** Pour les autres, une silhouette sans contenu : « 3 amendements déclarés irrecevables (art. 40), non publiés ». Seulement si la donnée de comptage existe. — *marque, neuf*
- **C2.d — Fantôme partagé dans le groupe** : un amendement irrecevable de mon groupe est visible par les membres du groupe. — *mode, neuf*
- Ma recommandation, si on veut une base : C2.b par défaut, C2.c si les données le permettent.

### C3. Seconde chance (redépôt en séance)
- **C3.a — Carrière d'un amendement.** Une même idée suit un parcours : déposée en commission sous le n° 87, rejetée, redéposée en séance sous le n° 1203, déclarée irrecevable par une autre autorité, redéposée au Sénat… Une frise relie les numéros (identité par similarité textuelle et par auteur). — *vue, neuf*
- **C3.b — Bouton « redéposer en séance »** sur mes amendements rejetés en commission : il crée un brouillon réimputé sur le texte de la commission (A1.a). — *geste, neuf*

### C4. Équivalents étrangers
- **C4.a — Règles du jeu comme paramètre.** Les contrôles de C1 sont des règles déclaratives propres à chaque système : germaneness et règle Byrd (US) ; long title et money resolution (UK) ; « un amendement par disposition » et seuils (PE). Le logiciel pourrait changer de « règle du jeu » sans changer d'interface. C'est utile si l'outil doit dépasser le cas français. — *donnée, neuf*
- **C4.b — Sélection par le président (UK)** : les amendements *not called* sont tamponnés comme tels, ce qui est distinct de l'irrecevabilité. — *marque, neuf*
- **C4.c — Contrôle « une disposition par amendement » (PE)** dans l'éditeur : un amendement qui touche deux dispositions est signalé. — *contrôle, neuf*
- **C4.d — Règles fermées (US)** : un article ou un texte sous règle fermée est scellé pour tous sauf pour les amendements *made in order*, qui ont un tampon propre. — *marque, neuf*

---

## D. Le temps

### D1. Délais de dépôt et forclusion
- **D1.a — Horloge de dépôt.** Sur le texte et sur chaque article : le temps restant avant la forclusion. Le format est textuel (« clôture dans 3 h 20 »), un chiffre qui a un sens. — *marque, neuf*
- **D1.b — Délai rouvert.** Quand un amendement gouvernemental hors délai rouvre le délai sur l'article visé, l'article s'allume (filet doré), une notification arrive et l'horloge repart sur cet article seulement. — *marque, neuf*
- **D1.c — « Ce qui reste ouvert ».** Après la forclusion, l'interface indique ce que je peux encore faire : sous-amender (aucun délai, F5), reprendre un amendement retiré, demander une suspension. — *contrôle, neuf*

### D2. Temps législatif programmé
- **D2.a — Budget de temps du groupe.** Une jauge linéaire, en minutes, pour mon groupe et, plus discrètement, pour les autres. ⚠ CLAUDE.md a rejeté les jauges, mais pour noter. Ici la jauge mesure une seule grandeur physique, du temps : c'est un chiffre qui a un sens. On peut aussi l'écrire en texte seul. — *marque, neuf*
- **D2.b — Feuilles muettes.** Une fois le temps épuisé, les amendements du groupe sont votés sans débat : leurs feuilles perdent leur zone de défense orale et portent « voté sans débat (TLP épuisé) ». — *marque, neuf*
- **D2.c — Planification.** Le groupe répartit son budget entre ses amendements, par glisser des minutes d'une feuille à l'autre. On voit lesquels risquent de ne pas être défendus. — *mode, neuf*

### D3. Couperets et clôtures
- **D3.a — Ligne de couperet.** Sur le dérouleur, une ligne horizontale indique jusqu'où, au rythme actuel, la discussion ira avant le couperet. Les amendements au-delà sont estompés, sauf ceux du Gouvernement qui restent nets (UK). — *marque, neuf*
- **D3.b — Vote en série (vote-a-rama, US)** : le dérouleur défile en accéléré et les tampons tombent en rafale. C'est un mode de lecture rétrospective. — *mode, neuf*

### D4. La navette rétrécit la marge
- **D4.a — Marge qui se resserre.** À chaque lecture, la part amendable du texte diminue visiblement : les articles conformes sont scellés (cachet de cire), et le reste se resserre. La frise des étapes (P1.d) montre cette réduction de surface. — *vue, neuf*
- **D4.b — Propositions de rédaction (CMP).** C'est un objet distinct de l'amendement : une feuille au papier différent (de forme plus administrative), signée par les rapporteurs des deux chambres, sans numéro d'amendement. — *objet, neuf*
- **D4.c — Après la CMP** : le dépôt n'est possible qu'avec l'accord du Gouvernement. Mon bouton « déposer » devient « demander l'accord du Gouvernement ». — *contrôle, neuf*
- **D4.d — Lecture définitive** : seuls les amendements déjà votés par le Sénat peuvent être repris. La bibliothèque de dépôt est remplacée par une bibliothèque des amendements reprenables, issus de la dernière lecture du Sénat. — *vue, neuf*

### D5. Procédure accélérée
- **D5.a — « Vu par une seule chambre ».** En CMP, une disposition votée par une seule chambre porte une marque explicite : « n'a jamais été votée par l'Assemblée ». — *marque, neuf*

---

## E. Des acteurs aux pouvoirs asymétriques

### E1. Le rapporteur
- **E1.a — Mode rapporteur.** Je suis le rapporteur. Mon espace n'est pas « mon amendement » mais **le banc** : toutes les feuilles déposées, que je trie en quatre tas (favorable, défavorable, sagesse, demande de retrait), plus « à rectifier ». Chaque tri pose le tampon d'avis au crayon. — *mode, neuf*
- **E1.b — Rectification suggérée.** Le rapporteur propose une rectification sur l'amendement d'un autre. Elle apparaît sur la feuille de l'auteur comme une correction suggérée, dans une encre distincte : ni bleu, ni barré rouge, plutôt un graphite. L'auteur accepte ou refuse, et l'acceptation déclenche « rect. ». ⚠ C'est une troisième encre, qui demande une règle nouvelle. — *geste, neuf*
- **E1.c — Double signature** des amendements de commission (P3.e). — *marque*
- **E1.d — Hors délai.** Les amendements du rapporteur peuvent arriver après la forclusion ; ils apparaissent dans la pile avec la mention « hors délai (rapporteur) ». — *marque*

### E2. Rapporteurs de groupe (PE, DE)
- **E2.a — Table des rapporteurs fictifs** : pour un texte, qui suit le dossier pour chaque groupe (shadow, Berichterstatter, Obleute). C'est une feuille de contacts, avec un lien direct vers la question bilatérale (H0.f). — *objet, neuf*

### E3. Le Gouvernement
- **E3.a — Le Gouvernement hors des groupes.** Dans la maquette, `GOUV` est un groupe parmi d'autres. C'est faux selon le corpus : ses amendements passent en priorité, échappent au délai, et il dispose de leviers (44 al. 2, vote bloqué, levée du gage, accord après CMP). Il prend une place à part, à côté de la commission plutôt que parmi les groupes. — *vue, remet en cause*
- **E3.b — Leviers en attente.** Pour chaque levier dont dispose le Gouvernement à l'étape courante, une petite marque « possible » sur les objets concernés. Par exemple, l'opposition 44 al. 2 sur les amendements non soumis à la commission, ou la levée du gage sur les amendements gagés. Je vois où le Gouvernement *peut* intervenir. — *calque, neuf*
- **E3.c — Mode Gouvernement** (cabinet ministériel) : même logique que le banc du rapporteur, avec en plus les leviers. — *mode, neuf*

### E4. Le président de séance
- **E4.a — Discussion commune officielle et regroupement calculé.** La maquette regroupe par proposition (rédactions identiques). Le président fixe, lui, les discussions communes. On montre les deux : le regroupement calculé (fond de couleur) et la discussion commune officielle (cadre doré autour des feuilles concernées). — *calque, prolonge*
- **E4.b — Lead amendment (UK)** : dans un regroupement, la feuille de tête est posée en avant, les autres derrière elle. — *marque, neuf*

### E5. Le député non membre de la commission
- **E5.a — Droits contextuels.** Mon profil connaît mes appartenances. En commission dont je ne suis pas membre, je vois « vous pouvez déposer et défendre, pas voter », et les actions de vote n'apparaissent pas. — *contrôle, neuf*

### E6. Les cosignataires
- **E6.a — Bloc de signatures** en pied de feuille (P3.e) : le premier signataire en grand, les cosignataires en dessous, avec un nombre si la liste est longue. — *marque, neuf*
- **E6.b — Circulation pour cosignature.** J'envoie mon brouillon en circulation. Les collègues signent, et les signatures s'ajoutent sur la feuille une à une. Seul le premier signataire peut ajouter des signataires (règle du Sénat, appliquée comme contrôle). — *geste, neuf*
- **E6.c — Retrait par le premier signataire** : l'action « retirer » n'existe que pour lui. Un cosignataire voit « seul le premier signataire peut retirer ». — *contrôle, neuf*

### E7. La reprise
- **E7.a — Bouton « reprendre »** sur une feuille retirée (pliée, B0). La feuille se déplie sous mon nom, avec la mention « repris par … » et l'historique. Elle peut aussi être reprise par la commission ou le Gouvernement. — *geste, neuf*

### E8. Le parlementaire isolé face aux seuils
- **E8.a — Compteur de signatures vers un seuil** (36 au PE, 5 % au Bundestag en 3e lecture) : « 22 / 36 », un chiffre qui a un sens. — *marque, neuf*
- **E8.b — Moi n'est pas forcément un groupe.** La maquette pose `ME = "PR"`. Le parlementaire isolé, non-inscrit ou en désaccord avec son groupe, doit pouvoir être « moi ». Les autres amendements de son groupe sont alors des « autres » comme les autres, ou des « proches ». — *mode, remet en cause*
- **E8.c — Alliances ad hoc.** Pour atteindre un seuil, l'isolé cherche des cosignataires dans d'autres groupes : la vue « qui a déposé quelque chose de proche sur cette unité » (le regroupement par proposition) devient une liste de cosignataires potentiels. — *vue, prolonge*

---

## F. Les relations entre amendements

### F0-1. Exemple d'origine n° 1 — Plusieurs amendements d'un même groupe sur une unité
- **F0-1.a — Escalier principal / repli.** Le repli est posé sous le principal, décalé d'un cran, comme une marche. Si le principal est adopté, l'escalier entier bascule (tombé). Si le principal est rejeté, le repli remonte au premier plan. — *marque, neuf*
- **F0-1.b — Rédiger un repli.** Depuis ma feuille, une action « préparer un repli » crée une copie liée que j'adoucis. Le lien principal/repli est déclaré, et le logiciel vérifie que le repli est bien plus proche du texte que le principal : sinon, l'ordre d'appel serait inversé. — *geste, neuf*
- **F0-1.c — Alternatives exclusives** : côte à côte, reliées par un trait plein, dans la même discussion commune. — *marque*
- **F0-1.d — Compatibles** : sur la même unité mais des segments distincts. Les corrections de chacune ont la même couleur de groupe ; on peut afficher la feuille « cumulée » des deux. — *vue, neuf*
- **F0-1.e — Contraintes** : un seul orateur pour des identiques du même groupe (marque « orateur unique : … ») ; un sénateur ne peut pas signer deux amendements identiques (contrôle à la cosignature). — *contrôle, neuf*

### F0-2. Exemple d'origine n° 2 — Amendements proches venant de groupes différents
- **F0-2.a — Identiques = une seule feuille, plusieurs signatures.** Le regroupement par proposition de la maquette fait déjà cela pour les rédactions identiques. Il faut le doter d'un vote unique : un seul tampon de sort pour toutes les signatures. — *marque, prolonge*
- **F0-2.b — Convergents mais concurrents** : dans la même discussion commune, avec l'ordre d'appel visible. Le survol du premier montre que les autres tombent s'il est adopté. — *calque, prolonge*
- **F0-2.c — Complémentaires** : marqués comme « articulables ». C'est la réponse partielle à la question ouverte de CLAUDE.md (la synthèse dit-elle où un compromis est atteignable ?) : deux amendements complémentaires peuvent se cumuler dans une feuille composée. — *vue, prolonge*
- **F0-2.d — Identiques transpartisans.** Un texte identique déposé par plusieurs groupes est signalé : « texte identique déposé par 4 groupes ». ⚠ Le corpus est clair : la similarité n'établit pas l'influence. L'interface montre l'identité textuelle et n'en tire aucune conclusion ; jamais d'étiquette « lobby ». Option : rapprocher d'une contribution publique connue si la donnée existe, en le disant comme un rapprochement. — *marque, neuf*

### F0-5. Exemple d'origine n° 5 — Sous-amendements
- **F0-5.a — Papier épinglé.** Un sous-amendement est une petite feuille épinglée sur l'amendement, à l'endroit qu'elle modifie. Ses corrections apparentes s'appliquent sur l'amendement, et non sur le texte : la référence vierge est alors l'amendement. C'est P1.b appliqué récursivement. — *objet, neuf*
- **F0-5.b — Un seul niveau** (FR) : on ne peut pas épingler sur une épingle ; deux niveaux au Congrès (US). — *contrôle*
- **F0-5.c — Champ de l'amendement.** Le sous-amendement ne peut ni contredire l'amendement ni dépasser son champ. Le contrôle vérifie que la plage modifiée reste dans la plage de l'amendement. — *contrôle, neuf*
- **F0-5.d — Seul outil de réaction tardive.** Après la forclusion, l'action « sous-amender » reste active sur les feuilles des autres et est mise en avant (D1.c). — *geste, neuf*
- **F0-5.e — Sénat : pas sur son propre amendement.** Sur ma propre feuille, l'action devient « rectifier ». — *contrôle*
- **F0-5.f — Ordre de vote** : le sous-amendement est voté avant l'amendement ; son sort s'affiche avant celui de l'amendement dans la bande de tampons. — *marque*

### F1. Conséquence et coordination
- **F1.a — Fils de conséquence** entre articles (pointillé). Quand l'amendement de fond est adopté, les coordinations s'allument comme « à adopter en conséquence ». Quand il tombe, elles deviennent « sans objet ». — *calque, neuf*
- **F1.b — Exception à l'entonnoir.** Une coordination peut viser un article scellé (C1.e) : la marque « coordination » lève l'alerte. — *contrôle*

### F2. Compromis qui remplace N amendements
- **F2.a — Absorption.** Une feuille de compromis attire sous elle les N amendements qu'elle remplace : ils glissent derrière et se rangent en liasse. Elle porte « Supported by: … » sous la forme d'une rangée de signatures de groupes. — *objet, neuf*
- **F2.b — Écart entre la liste des remplacés et la liste de vote.** Le corpus signale que les deux ne coïncident pas toujours. On aligne les deux listes, et les écarts sont marqués. — *contrôle, neuf*

### F3. Amendements préparatoires et de remplacement (paving, in lieu)
- **F3.a — Lien « prépare »** : fil pointillé du paving vers l'amendement de fond. — *calque*
- **F3.b — In lieu** : la feuille de l'autre chambre est posée sous celle qui la remplace. — *marque*

### F4. Contreparties non contraignantes
- **F4.a — Objet « engagement ».** Un engagement oral du ministre, une résolution (Entschließungsantrag) ou une déclaration annexée est une petite fiche, avec la source (compte rendu, page). Elle est épinglée sur l'amendement retiré en échange. — *objet, neuf*
- **F4.b — Suivi des engagements.** Une liste des engagements obtenus par moi ou mon groupe, avec leur état : tenu, en attente, oublié. Elle permet de revenir les invoquer à la lecture suivante. — *vue, neuf*

---

## G. Les instruments qui ne sont pas des amendements

### G1. Motions
- **G1.a — Échelle du texte entier.** Les motions visent le texte entier (rejet préalable, question préalable, exception d'irrecevabilité, renvoi en commission). Elles se placent sur la couverture du texte, le cran au-dessus de l'article (voir 3). Une motion adoptée tamponne la couverture en grand, et tout ce qui est dessous tombe. — *objet, neuf*
- **G1.b — Motion en attente** : avant la discussion des articles, les motions sont posées en travers de la couverture, comme des barrages à franchir. — *marque, neuf*

### G2. Interventions en séance (rappel au règlement, suspension, clôture)
- **G2.a — Événements sur la frise de séance.** Suspension, rappel au règlement et clôture sont des marques sur la ligne de temps de la séance, entre deux amendements du dérouleur. — *marque, neuf*
- **G2.b — Suspension = moment de négociation.** Une suspension liée à un amendement ouvre une fenêtre : ce qui s'est passé de part et d'autre (rectification, retrait, nouvel amendement du Gouvernement) est rattaché à la suspension. — *vue, neuf*

### G3. Votes et traces écrites
- **G3.a — Scrutin public : répartition par groupe.** Sous le tampon de sort, la répartition pour / contre / abstention par groupe, en petite table textuelle. Les chiffres ont un sens ici. — *marque, neuf*
- **G3.b — Explications de vote et contributions écrites** (art. 49-1 A RAN) : des feuillets annexés au verso de l'amendement ou du texte, par groupe. — *objet, neuf*
- **G3.c — Dissidences.** Les votes individuels contraires à la majorité du groupe sont signalés, car c'est utile au parlementaire isolé (E8). ⚠ Ce sont des données réelles et nominatives ; à manier avec les groupes fictifs. — *marque, neuf*
- **G3.d — Délégation de vote** : indiquée dans le détail du scrutin. — *marque*

### G4. Auditions
- **G4.a — Événement sur la frise du dossier**, avec lien vers le compte rendu. Une audition de droit (DE, un quart des membres) porte le compteur de demandes. — *marque, neuf*

### G5. Évaluation préalable (art. 98-1 RAN)
- **G5.a — Demande depuis ma feuille.** L'action « demander une évaluation » est soumise à l'accord du président de commission. Le résultat est annexé au verso comme une fiche d'impact. — *geste, neuf*

---

## H. La négociation formalisée

### H0. Exemple d'origine n° 8 — La question ouvrant une discussion bilatérale
Le corpus est explicite : un objet « question » n'existe pas dans la réalité. Le créer serait une **augmentation** assumée. Propositions, de la plus fidèle à la plus augmentée :
- **H0.a — Amendement d'appel / probing.** Une étiquette sur ma feuille, « d'appel ». C'est un usage sans définition réglementaire : l'étiquette est déclarative, et l'interface m'aide à préparer le retrait (« quelle réponse attendez-vous du ministre ? »). — *marque, neuf*
- **H0.b — Demande de retrait = fil de négociation.** Le tampon « demande de retrait » ouvre un fil entre l'auteur et le rapporteur (ou le Gouvernement). Ce qui est demandé, proposé et obtenu y est consigné, et l'issue (retiré contre engagement, maintenu) est rattachée (F4). — *objet, neuf*
- **H0.c — Rectification négociée** : la correction suggérée en graphite (E1.b) est l'outil de cette négociation. — *geste*
- **H0.d — Suspension** : la fenêtre G2.b. — *vue*
- **H0.e — Levée du gage** : un signal d'accord (C1.c), qui peut se lire sur la pile entière comme un calque « signaux d'accord du Gouvernement ». — *calque, neuf*
- **H0.f — Question (augmentation assumée).** Une note ancrée à une unité stable (P2.d) ou à un amendement, adressée à un ou deux autres acteurs, privée par défaut. Matériellement, c'est un petit papier plié glissé entre les feuilles, visible seulement par les destinataires, avec réponse en dessous. Un indicateur discret « augmentation » rappelle que ce n'est pas un acte de procédure. — *objet, neuf (augmentation)*
- **H0.g — Question transformable.** Une question peut devenir une rectification, un sous-amendement, un amendement commun ou un retrait : c'est la passerelle vers les actes réels. — *geste, neuf*

### H1. Trilogue (document à 4 colonnes)
- **H1.a — Éclatement à 4 colonnes** : Commission | Parlement | Conseil | compromis (P9.a), avec la colonne compromis éditable (P9.b) et les lignes résolues pliées (P9.c). — *vue, prolonge*
- **H1.b — Accord provisoire = vote unique.** La feuille de l'accord n'a qu'une case de sort, sans possibilité d'amender : le bouton « amender » est absent. — *contrôle*
- **H1.c — Réunions des rapporteurs fictifs** : événements sur la frise, chacun relié aux lignes du document qu'il a fait bouger. — *marque, neuf*

### H2. Commission mixte paritaire
- **H2.a — Hémicycle paritaire.** Une petite figure de la composition (7 + 7, par groupe) fait voir l'arithmétique : chaque proposition de rédaction montre son décompte. En cas d'égalité, la proposition n'est pas adoptée, et la règle est écrite. — *objet, neuf*
- **H2.b — Propositions de rédaction** (D4.b) sur l'alignement texte AN | texte Sénat. — *vue, prolonge*
- **H2.c — Échec de la CMP** : la frise bifurque (nouvelle lecture, lecture définitive). — *vue, neuf*

### H3. Ping-pong (UK)
- **H3.a — Tours.** Une frise d'échanges entre les deux chambres. Chaque tour porte ses *reasons* et ses *insistences*. La concession de chaque tour est affichée en corrections apparentes face au tour précédent : c'est la symétrie de la maquette appliquée au temps. — *vue, prolonge*
- **H3.b — Alerte double insistance** : si les deux chambres insistent sans concession, le texte tombe. On affiche « aucun pas depuis le tour précédent » avant que ça arrive. — *contrôle, neuf*

### H4. Conciliation (conference committee, Vermittlungsausschuss)
- **H4.a — Portée du désaccord.** Seules les lignes en divergence sont ouvertes, les autres scellées (US : limitée à la portée du désaccord). — *vue, prolonge*
- **H4.b — Vote oui/non sans amendement (DE)** : comme H1.b. — *contrôle*

---

## I. La légistique, c'est-à-dire l'effet juridique

### I0. Exemple d'origine n° 4 — Motifs localisés
- **I0.a — Deux couches de gloses en marge.** Les motifs du texte (exposé des motifs, commentaire du rapport) sont dans la marge gauche, à hauteur de l'article ou de l'alinéa qu'ils expliquent. Les motifs de l'amendement (exposé sommaire, objet, justification) sont dans la marge droite, à hauteur exacte des mots modifiés. Les deux couches ne se recouvrent pas : c'est la réalité décrite par le corpus. — *calque, neuf*
- **I0.b — Motif localisé dans l'éditeur.** En rédigeant, je peux attacher une phrase de justification à chaque modification. L'exposé sommaire se construit alors comme l'assemblage de ces gloses. — *geste, neuf*
- **I0.c — Motif de recevabilité** : en navette, le champ « relation directe » ; en loi de finances, l'imputation des crédits. Ce sont des sections obligatoires du motif, déclenchées par le contexte (C1.e). — *contrôle, neuf*
- **I0.d — Motif non voté.** La justification n'est pas votée et disparaît du texte adopté (PE). Visuellement, la glose est au crayon, l'amendement à l'encre ; à l'adoption, seule l'encre passe dans le texte. — *marque, neuf*
- **I0.e — Compteur de mots (UK, environ 50 mots, neutre).** — *contrôle*
- **I0.f — Motifs comme matière de la synthèse.** La synthèse thématique (scène 5 de CLAUDE.md) peut s'appuyer sur les motifs des amendements plutôt que sur leur seul texte, car c'est là que les groupes disent ce qu'ils veulent. — *donnée, prolonge*

### I1. Opération sur une plage ; position déclarée et portée réelle
- **I1.a — Dispositif ↔ effet** (P3.b). — *contrôle*
- **I1.b — Écart déclaré / réel.** Une feuille qui déclare « Alinéa 2 » mais dont le dispositif dit « Supprimer les alinéas 1 à 4 » montre deux traits de marge, celui de la position déclarée et celui de la portée réelle. Une alerte s'affiche : « porte en réalité sur les alinéas 1 à 4 ». — *contrôle, neuf*
- **I1.c — Plages chevauchantes.** Deux amendements dont les plages se chevauchent se voient par leurs traits de marge superposés : c'est un indice de concurrence (F0-2.b) qui ne dépend pas d'un regroupement préalable. — *calque, neuf*

### I2. Granularité (division, article, I/II, A, 1°, a), alinéa, phrase, mots, cellule de tableau, mission/programme)
- **I2.a — Crans d'échelle plus nombreux** (voir 3) : mots ⇄ phrase ⇄ alinéa ⇄ subdivision (1°, a)) ⇄ article ⇄ division (chapitre, titre) ⇄ texte. — *vue, prolonge*
- **I2.b — Occurrence des mots.** « Les mots : « le préfet » (deuxième occurrence) ». Quand une modification vise des mots répétés, toutes les occurrences sont soulignées en pâle et la visée en net. — *marque, neuf*
- **I2.c — Cellules de tableau.** Les tableaux législatifs (barèmes, listes) sont des grilles de papier ; une correction porte sur une cellule. — *vue, neuf*
- **I2.d — Missions et programmes** : voir C1.f. — *vue*

### I3. Deux niveaux de texte (guillemets imbriqués)
- **I3.a — Deux papiers.** Ce qui est hors guillemets (le projet : « L'article L. 302-5 du code est ainsi modifié ») est sur la feuille du projet. Ce qui est entre guillemets (la rédaction qui entrera dans le code) est sur une feuille d'un autre grain, insérée dans la première comme un papier dans une enveloppe ouverte. — *marque, neuf*
- **I3.b — Amender l'un ou l'autre.** Un amendement peut toucher le niveau projet (« Supprimer le 2° ») ou le niveau code (« À la deuxième phrase du texte proposé pour l'article L. 302-5… »). L'interface indique clairement à quel niveau il opère. — *marque, neuf*
- **I3.c — Trois niveaux dans les cas extrêmes** : un sous-amendement à un amendement à un projet qui modifie un code. On garde la même grammaire par emboîtement. — *vue*

### I4. Voir l'effet sur le droit en vigueur (tableau comparatif, Ramseyer/Cordon, synopse, Keeling)
- **I4.a — Cran « droit en vigueur ».** Au-dessus de « face à la commission », un cran de dézoom de plus : le **code**. L'article du code tel qu'il est en vigueur est vierge ; il porte en corrections apparentes l'effet du projet, puis, en second calque, l'effet de mon amendement. C'est le tableau comparatif et le Keeling schedule, dans la même règle visuelle. — *vue, prolonge*
- **I4.b — Trois colonnes du tableau comparatif** : droit en vigueur | texte du projet | texte de la commission (ou mon amendement), dans l'éclatement. — *vue, prolonge*
- **I4.c — Texte consolidé.** L'article du code tel qu'il serait si tout ce que je vois était adopté, propre, sans marques, avec une bascule « montrer les marques ». — *vue, neuf*
- **I4.d — Autres articles touchés.** Un même article de code peut être modifié par plusieurs articles du projet. Une vue « par article de code », et non par article du projet, rassemble tout ce qui touche L. 302-5, quel que soit l'article du projet qui le fait. — *vue, neuf*

### I5. Points d'attention de rédaction
- **I5.a — Renvois actifs.** Les renvois (« l'alinéa précédent », « au 2° du I ») sont des liens. Si un amendement supprime ou déplace la cible, le renvoi devient rouge : renvoi cassé. Exemple direct dans les données fictives : l'alinéa 3 renvoie à « l'alinéa précédent », et un amendement qui supprime l'alinéa 2 le casse. — *contrôle, neuf*
- **I5.b — Entrée en vigueur et application.** Ce sont deux dates différentes. Un calque montre, pour chaque disposition, quand elle entre en vigueur et quand elle s'applique (aux contrats en cours, aux exercices ouverts après…). Le contrôle signale les dispositions sans date. — *calque, neuf*
- **I5.c — Dispositions transitoires** : marquées comme telles, avec leur période. — *marque, neuf*
- **I5.d — Outre-mer.** Un contrôle « applicabilité outre-mer » rappelle la spécialité législative et demande une mention expresse si le texte touche les collectivités concernées. — *contrôle, neuf*
- **I5.e — Place du gage** en fin de texte (C1.b). — *contrôle*

### I6. Considérant ou dispositif (PE)
- **I6.a — Force normative visible.** Un considérant est imprimé dans un gris plus doux, sans la pleine encre du dispositif, pour signifier qu'il n'a pas de force normative. Un amendement politique placé en considérant le montre par sa matière. — *marque, neuf*
- **I6.b — Ordre de vote** : les considérants sont votés après les articles ; le dérouleur les place à la fin. — *marque*
- **I6.c — Équivalents français** : rapport annexé, intitulé, titre. Le même traitement s'applique : visible, amendable, mais non normatif. — *marque*

### I7. Fin de parcours (omnibus, cavaliers, renumérotation finale, juriste-linguiste, rectificatifs)
- **I7.a — Table de concordance.** À la renumérotation finale, une feuille aligne numéro provisoire et numéro définitif, avec un clic vers les deux. — *objet, neuf*
- **I7.b — Finalisation et rectificatifs.** Les retouches postérieures au vote (juriste-linguiste, corrections par résolution) sont une dernière version de la frise, en corrections apparentes face au texte voté. On voit ce qui a changé après le vote. — *vue, prolonge*
- **I7.c — Lois omnibus** : la couverture du texte montre la dispersion thématique (combien de codes, combien de matières touchées), sous forme de liste et non de score. — *vue, neuf*
