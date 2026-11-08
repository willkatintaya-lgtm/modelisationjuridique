# Situations de la discussion législative — synthèse comparative

Nov 8, 2026 · @Willka

## Objet et définitions

Ce document recense les situations réelles que vit un parlementaire pendant la procédure législative, de l'examen en commission jusqu'à l'adoption, pour les refléter dans le logiciel. Il repose sur environ 280 situations sourcées dans cinq systèmes, plus un état des lieux des outils et formats de données existants.

**Périmètre.** De la commission à l'adoption définitive, navette et conciliation comprises. Sont exclues les étapes préalables de nature politique ou partisane et l'aval (contrôle de constitutionnalité, promulgation).

**Deux notions à distinguer.**

- **Légistique** : l'art de rédiger la norme (structure, découpage, formulation, renvois, coordination, entrée en vigueur, codification). Question : *qu'est-ce que ce texte change au droit, et est-ce bien écrit ?*
- **Législatif** : le processus par lequel la norme est discutée et adoptée (acteurs, étapes, délais, votes, recevabilité, négociation). Question : *comment et par qui ce texte devient-il loi ?*

Un amendement relève des deux : c'est une opération légistique sur le texte et un objet législatif doté d'un auteur, d'un délai, d'un avis, d'un ordre d'appel et d'un sort.

**Légende.** \[FR\] Assemblée nationale et Sénat · \[PE\] Parlement européen · \[DE\] Bundestag · \[UK\] Westminster (Communes et Lords) · \[US\] Congrès. La mention **Exemple d'origine n° X** signale les huit situations formulées au départ par l'équipe.

## La catégorie implicite des exemples d'origine

Les huit exemples de départ décrivent **des amendements vus comme des objets textuels localisés, observés à un instant donné, du point de vue de leurs auteurs et des groupes, dans une seule lecture et une seule chambre, avec une négociation horizontale entre groupes.**

Ce prisme laisse dans l'ombre huit dimensions, que la partie I couvre :

1. **Le temps** : le texte de référence bouge, les délais tombent, la navette avance.
2. **La mécanique qui décide du sort** : recevabilité, ordre d'appel, amendements qui tombent, avis, modes de vote.
3. **Les acteurs aux pouvoirs asymétriques** : Gouvernement, rapporteur, président de séance.
4. **Les instruments qui ne sont pas des amendements** : motions, vote par division, seconde délibération, vote bloqué, 49-3.
5. **Les documents de pilotage** : dérouleur, liste de vote, tableau comparatif, document à 4 colonnes.
6. **L'effet juridique** : l'amendement modifie souvent un texte qui modifie lui-même un code.
7. **La dimension bicamérale ou interinstitutionnelle** : CMP, trilogues, ping-pong.
8. **La voie du parlementaire isolé**, par opposition au groupe.

**Où se placent les exemples d'origine.** Six décrivent des situations réelles et rejoignent la partie I. Deux décrivent des façons de voir dans le logiciel et rejoignent la partie II.

| Exemple d'origine | Place dans ce document |
| --- | --- |
| 1. Plusieurs amendements d'un même groupe sur une même unité | F. Relations entre amendements |
| 2. Amendements proches venant de groupes différents | F. Relations entre amendements (renvoi vers B) |
| 3. Sort des amendements | B. Mécanique qui décide du sort |
| 4. Motifs localisés à l'unité | I. Légistique (renvoi vers C) |
| 5. Sous-amendements | F. Relations entre amendements |
| 6. Vue par thème transversal | Partie II. Vues transversales |
| 7. Modules au-delà de l'unité de base | Partie II. Vues transversales |
| 8. Question ouvrant une discussion bilatérale | H. Négociation formalisée |

Les familles A (texte qui bouge), D (temps), E (acteurs) et G (instruments hors amendement) ne contiennent aucun exemple d'origine : ce sont les apports principaux de la recherche.

# Partie I — Les situations

## A. Le texte de référence bouge sous les amendements

Un amendement vise toujours une version précise du texte, et cette version change au fil de la procédure.

1. **Texte de la commission.** En séance, on amende le texte adopté par la commission, pas le texte initial \[FR, DE\]. Les amendements doivent être réimputés, et les alinéas sont renumérotés.
2. **Articles mouvants.** Des articles apparaissent (« 3 bis », « 1er A », « 12 octies »), disparaissent, sont rétablis ou deviennent « (Conforme) ». Les textes publiés sont à trous et doivent être reconstitués à partir des versions précédentes \[FR\].
3. **Repères page et ligne.** « Page X, ligne Y » ne vaut que pour une version imprimée \[UK, US\] : changer de version casse les références. Aux Lords, les numéros d'amendements changent d'une liste à l'autre (20A, 20ZA).
4. **Réécriture globale.** « Rédiger ainsi cet article » \[FR\], *amendment in the nature of a substitute* \[US\], version de la commission \[DE\] : ce sont les noms du même procédé selon les systèmes. Au lieu de changer quelques mots, l'amendement réécrit l'article entier, voire tout le texte. Exemple : un article de 10 alinéas est remplacé par une nouvelle rédaction de 10 alinéas qui n'en modifie que 2. Le lecteur reçoit 10 alinéas « nouveaux » et doit chercher lui-même les 2 vraies différences. Pour le logiciel : recalculer et afficher automatiquement l'écart entre l'ancienne et la nouvelle rédaction.
5. **Versions de l'amendement.** L'amendement lui-même est rectifié (« rect. », « bis », « ter »). Souvent, seule la dernière version est publique \[FR\]

## B. La mécanique qui décide du sort

Le sort d'un amendement dépend moins de son contenu que de sa place dans une mécanique de règles, d'avis et de votes enchaînés.

**Exemple d'origine n° 3 — Le sort des amendements au fil de la discussion.** « Abandonné » recouvre au moins quatre réalités distinctes : **retiré** (souvent contre un engagement du ministre), **non soutenu** (auteur absent), **tombé** (conséquence d'un autre vote, et non vote lui-même), **irrecevable** (parfois jamais publié). L'open data de l'Assemblée compte près de 40 valeurs de sort.

1. **Trois ordres distincts.** Ordre de dépôt (le numéro), ordre du texte, ordre d'appel, c'est-à-dire l'ordre dans lequel le président de séance appelle les amendements pour les discuter et les voter (du plus éloigné du texte au plus proche) \[FR, PE, US\]. Le dérouleur et la liste de vote sont des données à part entière.
2. **Chutes en cascade.** Une suppression adoptée fait tomber tout le reste de l'article \[FR\]. Un compromis peut faire tomber plus de 150 amendements, et un considérant peut être « réputé adopté » sans vote \[PE\]. Une *motion to strike* devient sans objet \[US\].
3. **Logique conditionnelle.** « Falls if CA 2 NOT adopted – as addition to CA 2 » \[PE\] : le sort d'un amendement dépend de plusieurs votes antérieurs.
4. **Priorité et réserve.** Les amendements du Gouvernement et de la commission passent avant ceux de même objet \[FR\]. La réserve et la priorité réordonnent la discussion, par exemple pour voter d'abord un compromis qui fera tomber les autres.
5. **Avis.** Favorable, défavorable, sagesse, demande de retrait : c'est le principal prédicteur du sort \[FR\].
6. **Découper ou grouper le vote.** Vote par division pour isoler une phrase \[FR, PE, US\], interdit sur un compromis \[PE\]. Vote en bloc des amendements de la commission, sauf demande de vote séparé \[PE\]. *Packaging* pendant le ping-pong \[UK\].
7. **Seconde délibération.** Un vote acquis peut être annulé en fin de texte \[FR\].
8. **Vote bloqué (art. 44-3).** L'amendement est discuté mais jamais voté. Au Sénat en 2023, environ un millier d'amendements ont été traités ainsi \[FR\].
9. **49-3.** Un amendement adopté en séance peut ne pas être repris dans le texte retenu par le Gouvernement \[FR\].
10. **Remplir l'arbre.** Au Sénat, le leader de la majorité peut occuper toutes les places de l'arbre d'amendements, ce qui empêche tout autre dépôt \[US\].

## C. Les filtres de recevabilité, avant tout débat

Une partie des amendements est écartée avant même d'être discutée, par une autorité qui varie selon le moment et le système.

1. **Irrecevabilités françaises.** Article 40 (charge publique), avec le système du gage et de sa levée. Article 41 (domaine réglementaire). Article 45 (cavalier), avec au Sénat un « périmètre indicatif » publié. Entonnoir en navette. Irrecevabilités propres aux lois de finances \[FR\].
2. **L'amendement fantôme.** Un amendement irrecevable au titre de l'article 40 n'est pas publié du tout \[FR\]. Question de conception : faut-il le représenter ?
3. **Seconde chance.** Un amendement rejeté ou irrecevable en commission peut être redéposé en séance, où une autre autorité contrôle sa recevabilité \[FR\].
4. **Équivalents étrangers.**
   - &#91;US\] Exigence de lien avec le texte (*germaneness*), règle Byrd, amendements « made in order » par la commission du Règlement, règles fermées.
   - &#91;UK\] Sélection par le président de séance (amendements *not called*), limite de l'intitulé complet du texte (*long title*), résolution financière (*money resolution*).
   - &#91;PE\] Un amendement par disposition, refonte limitée aux parties modifiées, recevabilité restreinte en 2e lecture, filtre de la commission au-delà de 50 amendements en plénière.

## D. Le temps

Le temps est une ressource rare et réglementée : délais, budgets de parole et étapes de navette réduisent la marge d'action à mesure que la procédure avance.

1. **Délais de dépôt et forclusion.** Un amendement gouvernemental déposé hors délai rouvre le délai sur l'article qu'il vise \[FR\].
2. **Temps législatif programmé.** Chaque groupe dispose d'un budget de temps. Une fois épuisé, ses amendements sont votés sans débat \[FR\].
3. **Couperets et clôtures.** Les amendements non atteints au couperet d'une *programme motion* tombent sans vote, sauf ceux du Gouvernement \[UK\]. Clôture et votes en série (*vote-a-rama*) \[US\]. Réduction des délais à la majorité des deux tiers \[DE\].
4. **La navette rétrécit la marge.** En 2e lecture, les articles conformes sont exclus et un lien direct est exigé. En CMP, on travaille sur des propositions de rédaction et non sur des amendements. Après la CMP, aucun amendement sans l'accord du Gouvernement. En lecture définitive, on ne peut reprendre que des amendements déjà votés par le Sénat \[FR\].
5. **Procédure accélérée.** Une disposition votée par une seule chambre peut être tranchée en CMP sans que l'autre l'ait jamais votée \[FR\].

## E. Des acteurs aux pouvoirs asymétriques

Tous les participants n'ont pas les mêmes droits : le Gouvernement, le rapporteur et le président de séance disposent de leviers que les autres n'ont pas.

1. **Le rapporteur.** Il donne l'avis de la commission, ses amendements échappent au délai de dépôt, et un amendement de commission porte sa double signature avec celle de l'auteur \[FR\].
2. **Rapporteurs de groupe.** Rapporteurs fictifs, co-rapporteurs, rapporteurs pour avis, rapporteur de la commission des budgets \[PE\]. *Berichterstatter* par groupe et *Obleute* (responsables de groupe en commission) \[DE\].
3. **Le Gouvernement.** Dépôt hors délai ; opposition à l'examen d'un amendement non soumis à la commission (art. 44 al. 2) ; vote bloqué ; accord requis pour amender après la CMP ; levée du gage \[FR\].
4. **Le président de séance.** Recevabilité et discussion commune \[FR\] ; sélection et regroupement des amendements \[UK\].
5. **Le député non membre de la commission.** Il peut déposer et défendre ses amendements, mais pas voter \[FR, DE\].
6. **Les cosignataires.** Le premier signataire contrôle l'amendement. Au Sénat, s'il le retire, l'amendement est retiré, et lui seul peut ajouter des signataires \[FR\].
7. **La reprise.** Un amendement retiré peut être repris par un autre parlementaire, par la commission ou par le Gouvernement \[FR, PE\].
8. **Le parlementaire isolé face aux seuils.** 36 signatures pour déposer en plénière, et 40 députés suffisent à bloquer un amendement oral \[PE\]. Une seule signature suffit en 2e lecture, mais il faut un groupe ou 5 % des députés en 3e lecture \[DE\].

## F. Les relations entre amendements

Les amendements forment un réseau : identiques, concurrents, gradués, emboités ou absorbés, et ces relations décident souvent de leur sort.

**Exemple d'origine n° 1 — Plusieurs amendements d'un même groupe sur une même unité** (un alinéa ou une partie d'alinéa). Trois relations possibles :

- **Gradation principal / repli** : le repli est appelé après le principal et tombe si celui-ci est adopté.
- **Alternatives exclusives** : elles passent en discussion commune.
- **Modifications compatibles** sur des segments distincts de la même unité.

Contraintes réelles : pour des amendements identiques d'un même groupe, un seul orateur s'exprime depuis 2019 \[FR\] ; un sénateur ne peut pas signer deux amendements identiques \[FR\].

**Exemple d'origine n° 2 — Amendements proches venant de groupes différents.** Trois relations distinctes :

- **Identiques** : texte strictement le même, vote unique \[FR, PE\].
- **Convergents mais concurrents** : discussion commune, et l'adoption du premier fait tomber les autres.
- **Complémentaires.**

Des amendements identiques transpartisans sont aussi un indice de source commune, souvent un lobby. Une similarité textuelle n'établit pourtant pas une influence.

**Exemple d'origine n° 5 — Les sous-amendements** (amendements d'amendement), venant d'un autre groupe ou du même groupe. Ils sont très encadrés :

- &#91;FR\] Un seul niveau. Le sous-amendement ne peut ni contredire l'amendement ni dépasser son champ. Il n'est soumis à aucun délai, ce qui en fait le seul outil de réaction tardive. Il est voté avant l'amendement.
- &#91;FR, Sénat\] L'auteur ne peut pas sous-amender son propre amendement, il doit le rectifier.
- &#91;US\] Deux degrés, organisés en arbre.
- &#91;PE\] Le compromis remplace en pratique le sous-amendement.

**Autres relations à représenter.**

1. **Conséquence et coordination.** Un amendement de conséquence ou de coordination est lié à un amendement de fond ; la coordination est aussi une exception à l'entonnoir \[FR\].
2. **Compromis qui remplace N amendements.** Il porte la mention « Supported by: EPP, Renew… » \[PE\]. La liste des amendements remplacés et la liste de vote ne coïncident pas toujours.
3. **Amendements préparatoires et de remplacement.** Le *paving amendment* prépare un amendement de fond ; l'*amendment in lieu* remplace un amendement de l'autre chambre \[UK\].
4. **Contreparties non contraignantes.** Résolution votée après le texte (*Entschließungsantrag*) \[DE\], déclarations annexées \[PE\], engagement oral du ministre \[UK\] servent de monnaie d'échange à un compromis.

## G. Les instruments qui ne sont pas des amendements

Une bonne partie de la discussion passe par des instruments de procédure qui ne modifient pas le texte mais en conditionnent l'examen.

1. **Motions.** Rejet préalable à l'Assemblée ; question préalable, exception d'irrecevabilité et renvoi en commission au Sénat \[FR\]. Proposition de rejet \[PE\]. Renvoi en commission (*motion to recommit*) \[US\].
2. **Interventions en séance.** Rappel au règlement, suspension de séance (un vrai moment de négociation), clôture des débats \[FR\].
3. **Votes et traces écrites.** Scrutin public ou vote nominatif, délégation de vote, explications de vote, contributions écrites annexées au compte rendu (art. 49-1 A RAN) \[FR, DE, PE\].
4. **Auditions.** Une audition publique est de droit si un quart des membres de la commission la demande \[DE\].
5. **Évaluation préalable d'un amendement.** L'auteur peut la demander avec l'accord du président de commission (art. 98-1 RAN) \[FR\].

## H. La négociation formalisée, à l'intérieur de la procédure

La procédure contient ses propres lieux et outils de négociation, du simple échange en séance jusqu'aux instances de conciliation entre chambres ou institutions.

**Exemple d'origine n° 8 — Une question posée sur un amendement** par un parlementaire ou un groupe, pour ouvrir une discussion à deux ou à trois. Elle n'existe pas comme objet formel. Ses équivalents réels :

- l'**amendement d'appel** \[FR\] ou le **probing amendment** \[UK\] : déposé pour obtenir une explication, puis retiré ;
- la **demande de retrait** de la commission ou du Gouvernement, qui est une invitation à négocier \[FR\] ;
- la **rectification** de l'amendement pour obtenir un avis favorable \[FR\] ;
- la **suspension de séance** \[FR\] ;
- la **levée du gage** par le Gouvernement, signal d'accord \[FR\].

Créer un objet « question » dans le logiciel serait donc une **augmentation** de la réalité, pas son reflet. C'est légitime, à condition de l'assumer comme tel.

**Instances et documents de négociation.**

1. **Trilogue.** Réunions des rapporteurs fictifs, puis trilogue sur un document à 4 colonnes (Commission, Parlement, Conseil, compromis). L'accord provisoire est voté en une seule fois, sans amendement \[PE\].
2. **Commission mixte paritaire.** Composition paritaire, travail sur des propositions de rédaction des rapporteurs. En cas d'égalité des voix, la proposition n'est pas adoptée \[FR\].
3. **Ping-pong.** Motifs du refus (*reasons*), maintien de sa position (*insistence*), et une règle de fait : chaque tour exige une concession, sinon la double insistance fait tomber le texte \[UK\].
4. **Conciliation entre chambres.** *Conference committee* limitée à la portée du désaccord, ou échange d'amendements \[US\]. Commission de conciliation (*Vermittlungsausschuss*) : le Bundestag vote oui ou non, sans amendement \[DE\].

## I. La légistique, c'est-à-dire l'effet juridique

Un amendement est une opération précise sur le droit, souvent à deux niveaux : il modifie un projet qui modifie lui-même un code ou une loi en vigueur.

**Exemple d'origine n° 4 — Les motifs localisés.** Il existe deux couches de justification qui ne se recouvrent pas :

- **les motifs du texte** : exposé des motifs, en général article par article, complété par le commentaire du rapport de commission ;
- **les motifs de l'amendement** : exposé sommaire \[FR, Assemblée\], objet \[FR, Sénat\], *justification* \[PE\], *explanatory statement* \[UK\], *purpose* \[US\]. Rattaché à l'amendement, il est donc localisé à l'endroit précis qu'il modifie (alinéa, mots).

Trois précisions. Le motif sert aussi à la **recevabilité** : en navette il doit invoquer la relation directe ou une exception à l'entonnoir, en loi de finances il précise l'imputation des crédits \[FR\] (voir C). La justification n'est pas votée et disparaît du texte adopté \[PE\]. L'*explanatory statement* doit être neutre, environ 50 mots \[UK\].

**Autres situations légistiques.**

1. **Opération sur une plage.** Supprimer, rédiger, substituer, insérer, compléter, rétablir. La position déclarée et la portée réelle peuvent diverger : un cas réel de l'open data de l'Assemblée déclare « Alinéa 2 » alors que le dispositif dit « Supprimer les alinéas 1 à 4 ».
2. **Granularité.** Division, article, I/II, A, 1°, a), alinéa numéroté, phrase, mots (avec leur occurrence s'ils sont répétés), cellule de tableau, mission ou programme en loi de finances.
3. **Deux niveaux de texte.** D'où les guillemets imbriqués et la distinction entre ce qui est dans les guillemets et ce qui est hors guillemets \[DE, US\].
4. **Voir l'effet sur le droit en vigueur.** Tableau comparatif \[FR\], textes modifiés en barré et italique selon les règles Ramseyer et Cordon \[US\], synopse \[DE\], texte consolidé de la loi modifiée (*Keeling schedule*) \[UK\].
5. **Points d'attention de rédaction.** Coordination et renvois cassés, entrée en vigueur différée (qui n'est pas la même chose que l'application), dispositions transitoires, outre-mer soumis à la spécialité législative, place du gage en fin de texte \[FR\].
6. **Considérant ou dispositif.** Un amendement politique placé dans un considérant n'a pas de force normative, et les considérants sont votés après les articles \[PE\].
7. **Fin de parcours.** Lois omnibus et cavaliers ; numérotation provisoire puis renumérotation finale avec table de concordance ; finalisation juriste-linguiste et rectificatifs \[PE\] ; correction du texte final par résolution des deux chambres \[US\].

# Partie II — Les vues et le modèle

## Vues transversales

Deux exemples d'origine ne décrivent pas une situation mais une façon de voir : ils répondent à des besoins que la lecture linéaire du texte ne couvre pas.

**Exemple d'origine n° 6 — Une vue par thème.** Elle suit un sujet porté par un ou plusieurs groupes à travers plusieurs articles et alinéas, en diagonale du texte. Plusieurs systèmes ont déjà institutionnalisé le thème :

- les **amendements de compromis** sont thématiques (« CA 1 – Scope ») et peuvent porter sur plusieurs articles et considérants à la fois \[PE\] ;
- le président de séance **regroupe** les amendements par sujet, autour d'un amendement de tête (*lead amendment*) \[UK\] ;
- un **contre-projet** se décline en dizaines d'amendements coordonnés \[FR\] ;
- les modifications de conséquence sont regroupées dans un même amendement, en parties I et II \[FR\] ;
- les amendements **horizontaux** répètent la même modification dans tout le texte \[PE\].

**Exemple d'origine n° 7 — Des modules pour sortir de l'unité de base.** Ils se reformulent en navigation à plusieurs échelles :

1. mots, phrase, alinéa ;
2. article, division, texte entier ;
3. dossier législatif et ses étapes ;
4. loi ou code modifié ;
5. droit en vigueur après adoption.

Trois axes se dégagent pour une représentation 2D ou 3D : **la position dans le texte**, **le temps et les étapes**, **les acteurs ou groupes**. Les dépendances entre amendements forment un quatrième calque, sous forme de graphe.

## Ce que le modèle de données doit porter

Dix éléments ressortent des situations recensées ; les standards existants n'en couvrent qu'une partie.

1. **La version précise du texte visée** par chaque amendement, pas seulement « le texte ».
2. **Un identifiant stable de chaque unité**, qui survit aux renumérotations. Akoma Ntoso le prévoit (le `wId`), mais il est quasi absent en pratique : le Sénat ne le produit pas encore.
3. **L'amendement comme opération + plage + auteur + motif**, et non comme simple étiquette.
4. **Un statut à plusieurs dimensions** : traitement, recevabilité, avis, sort, mode de vote.
5. **Un graphe de dépendances entre amendements** (identiques, concurrents, sous-amendements, compromis, conséquences), qui permet de calculer des scénarios du type « si X est adopté, alors Y et Z tombent ».
6. **Les trois ordres** : dépôt, texte, appel.
7. **Les acteurs et leurs pouvoirs**, qui varient selon l'étape.
8. **Le temps** : délais, budget de parole, étapes de la navette, état de chaque article à chaque étape.
9. **L'alignement de N versions** avec une version de compromis en construction : document à 4 colonnes, CMP, synopse. Aucun standard ne le modélise nativement, c'est un vrai espace d'innovation.
10. **L'attribution inverse** : de quel amendement vient chaque passage du texte adopté. Seul le Sénat l'expose partiellement.

## Points de vigilance

- **Documentation périmée.** Le règlement du Bundestag a été refondu fin 2025 (fin du vote article par article en 2e lecture) \[DE\]. Le règlement du Parlement européen a été renuméroté en 2024 et les commissions associées supprimées \[PE\]. Beaucoup de documentation en ligne date d'avant.
- **Étiquettes d'usage.** « D'appel », « de repli », « rédactionnel », « de cohérence » n'ont pas de définition réglementaire \[FR\].
- **Données pour un prototype français.** La meilleure source semble être Tricoteuses/Canutes : données nettoyées de l'Assemblée et du Sénat, textes de l'Assemblée inclus (absents de l'open data officiel), accès par API. La Fabrique de la Loi rappelle que le nettoyage a pris les deux tiers à trois quarts de son temps de développement.

## Sources

- [Règlement de l'Assemblée nationale](https://www.assemblee-nationale.fr/dyn/15/divers/texte_reference/02_reglement_assemblee_nationale.pdf)
- [Règlement du Sénat](https://www.senat.fr/reglement/reglement.pdf)
- [Fiche AN n° 51 – Droit d'amendement](https://www.assemblee-nationale.fr/dyn/contenu/telechargement/629128/file/Fiche%2051%20-%20Droit%20d%27amendement.pdf)
- [Guide eLoi de rédaction des amendements](https://ressources-ext.assemblee-nationale.fr/web/eLoi/pdf/eLoi-guide.amendements.pdf)
- [Sénat – Rédaction des amendements et sous-amendements](https://www.senat.fr/fileadmin/Seance/Documents/Guides_pratiques/La_redaction_amendements_ss-amendements_motions-de-procedure.pdf)
- [Sénat – Règle de l'entonnoir](https://www.senat.fr/fileadmin/Seance/Documents/Vademecum/Vademecum_regle_entonnoir.pdf)
- [EPRS – Le nouveau règlement du PE (2024)](<https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/762396/EPRS_BRI(2024)762396_EN.pdf>)
- [EPRS – Understanding trilogue](<https://www.europarl.europa.eu/RegData/etudes/BRIE/2021/690614/EPRS_BRI(2021)690614_EN.pdf>)
- [Liste de vote réelle TRAN/ETS avec compromis (AskTheEU)](https://www.asktheeu.org/request/revision_of_the_eu_emissions_tra_2)
- [Règlement du Bundestag (version 2025)](https://www.gesetze-im-internet.de/btgo_2025/)
- [Cabinet Office – Guide to Making Legislation (2025)](https://assets.publishing.service.gov.uk/media/68c14f2b7596dbfa052bfde2/2025_Guide_to_Making_Legislation_-_September.pdf)
- [OPC – Style manual for amendments to bills](https://www.gov.uk/government/publications/amending-bills-style-manual/style-manual-for-amendments-to-bills)
- [CRS – Senate amendment process (98-853)](https://www.everycrsreport.com/reports/98-853.html)
- [CRS – Amendment trees (RS22854)](https://www.everycrsreport.com/reports/RS22854.html)
- [Akoma Ntoso – Vocabulaire](https://docs.oasis-open.org/legaldocml/akn-core/v1.0/csd01/part1-vocabulary/akn-core-v1.0-csd01-part1-vocabulary.html)
- [Format Akoma Ntoso du Sénat](https://data.senat.fr/wp-content/uploads/2021/03/akomantoso.pdf)
- [Lawmaker – Logique de liste des amendements (Communes)](https://help.lawmaker.legislation.gov.uk/help/live/house-of-commons-amendment-list-logic)
- [Schéma des amendements AN (Tricoteuses)](https://app.unpkg.com/@tricoteuses/assemblee@3.1.3/files/lib/schemas/clean/amendements.d.ts)
- [La Fabrique de la Loi – parser](https://github.com/regardscitoyens/the-law-factory-parser)
- [DocuToads (diff de textes législatifs)](https://arxiv.org/pdf/1608.06459)
