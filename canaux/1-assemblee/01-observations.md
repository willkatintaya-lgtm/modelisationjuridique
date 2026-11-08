# Canal 1 — ce que montrent les données (premier passage)

Échantillon : deux dossiers de la 17e législature, choisis pour être complémentaires.

| | **Narcotrafic** (DLR5L17N50169) | **Logement** (DLR5L17N54608) |
|---|---|---|
| Nature | PPL sénatoriale, procédure accélérée | Projet de loi, adopté d'abord par le Sénat |
| Parcours | Sénat → AN (commission des lois, séance 17 mars–1er avril 2025) → CMP → Conseil constitutionnel → promulgation (13 juin 2025) | Sénat (juillet 2026) → AN commission des affaires économiques + finances pour avis (16–22 sept. 2026) → **séance AN prévue du 16 au 20 novembre 2026** |
| Amendements AN | 1 676 (665 commission, 1 002 séance, 9 sur le texte de CMP) | 790 (744 commission au fond, 46 commission des finances) |
| Intérêt | une navette complète, du dépôt à la loi | un dossier **vivant** : la séance n'a pas encore eu lieu, les amendements de séance arrivent dans les jours qui viennent |

Le dossier logement est aussi un écho direct de la maquette (« article 4 d'un projet de loi logement ») : son article 4 réel a reçu **143 amendements en commission**, sur 25 alinéas. Il est extrait tel quel dans `extraits/logement-art4-commission.json`.

Les chiffres ci-dessous viennent de `scripts/explorer.py` (sortie complète : `resultats/explorer-sortie.txt`). Ils valent pour cet échantillon, pas pour l'AN en général.

---

## 1. Ce qui contredit ou corrige les signaux reçus

**Discussions communes et identiques : pas vides du tout.** Sur le narcotrafic en séance, 89 grappes d'amendements identiques et 39 discussions communes (jusqu'à 20 amendements dans une même discussion). Sur le logement en commission, 45 grappes d'identiques, 51 discussions communes. Le champ donne un identifiant de grappe et une position (`Premier` / `Milieu` / `Dernier`). Les exemples vides observés auparavant étaient probablement des amendements isolés : c'est le cas de la majorité, pas de tous.

**Les identiques sont presque toujours transpartisans.** 81 grappes sur 89 (narcotrafic, séance), 44 sur 45 (logement) réunissent au moins deux groupes. Exemples : « Supprimer cet article » porté à l'identique par huit groupes, du CP à UT ; « Supprimer l'alinéa 8 » porté par NV, LL, PR, DC, CP et la rapporteure. Deux mécanismes se mélangent : (a) l'identité triviale (une suppression est forcément identique à une autre) ; (b) la **rédaction externe** : un même texte fourni par une organisation à plusieurs groupes. Les exposés sommaires le disent parfois en clair : « travaillé avec le Conseil national des barreaux » (≈ 50 occurrences sur le narcotrafic), la Fondation pour le logement des défavorisés, l'Union sociale pour l'habitat, France Urbaine, la Fédération française des télécoms, la Fédération des promoteurs immobiliers… L'identique est une **trace de coalition ou de source commune**, pas seulement de doublon.

**Position déclarée ≠ portée réelle : fréquent, pas anecdotique.** Sur 1 328 amendements qui déclarent un alinéa et en citent dans leur dispositif : 930 ne touchent que l'alinéa déclaré, **344 en touchent d'autres en plus**, 54 n'en touchent pas du tout la valeur déclarée. Soit ≈ 30 % d'écart. Forme typique : « I. – Supprimer les alinéas 4 et 5. II. – En conséquence, supprimer l'alinéa 17. III. – … l'alinéa 20 ». L'alinéa déclaré est celui de **la première opération**, rien de plus. Les dispositifs à plusieurs opérations (« I. – … II. – … ») sont nombreux : 135 sur 1 001 en séance narcotrafic (presque tous « en conséquence »), 105 sur 744 en commission logement, dont 37 portent un **gage** (« La perte de recettes pour l'État est compensée… par une taxe additionnelle à l'accise sur les tabacs ») : une clause rituelle, sans contenu politique, ajoutée pour échapper à l'article 40.

**Rectification : confirmé.** Un seul fichier par amendement, `numeroRect` = 0, 1 ou 2 ; l'historique des versions n'est pas publié.

**Les textes sont accessibles sans Tricoteuses.** `https://www.assemblee-nationale.fr/dyn/opendata/<uid>.html` renvoie le texte (déposé, commission, adopté, CMP) en HTML structuré par des classes (`assnat9ArticleNum`, `assnatLoiTexte`…), découpable en articles et alinéas en quelques lignes (`scripts/decouper_texte.py`). Les rapports s'obtiennent de la même façon et **contiennent le compte rendu des débats de commission**, que l'open data « comptes rendus » ne couvre pas (il ne couvre que la séance). Tricoteuses reste utile pour l'historique et le Sénat ; je ne l'ai pas encore exploré.

---

## 2. Ce qu'aucune des pistes n'anticipait vraiment

**L'alinéa réel est une instruction, pas une norme.** La maquette montre un alinéa qui énonce une règle (« Les communes de plus de 3 500 habitants doivent… »). L'article 4 réel du projet logement est une suite d'**ordres de modification** d'un code : « 2° Le j est ainsi modifié : a) Le premier alinéa est remplacé par trois alinéas ainsi rédigés : « j) Pour les logements… » ». Un amendement modifie donc une instruction qui modifie un code : **deux niveaux d'indirection**. Le texte qui compte pour le lecteur (le CGI après modification) n'est écrit nulle part. Une bonne partie des amendements sont lisibles seulement si l'on reconstruit ce texte consolidé. (À croiser avec le canal 2.)

**Le texte porte les cicatrices de la navette.** Le texte de commission garde des places vides : « a et c) (Supprimés) », « III et IV. – (Supprimés) », « Article 3 (Supprimé) », « Article 4 bis (Non modifié) », « Article 2 bis (nouveau) », « V (nouveau). – ». La numérotation n'est pas refaite : elle est **stratifiée** (bis, ter, quinquies, A, B, C…). Un article comme « 23 quinquies » ou « 4 bis C » dit d'où il vient.

**Plus de la moitié des amendements n'arrivent jamais au vote.**

| | arrivés au vote (adopté ou rejeté) | adoptés |
|---|---|---|
| Narcotrafic, commission | 56 % | 190 / 665 |
| Narcotrafic, séance | 55 % | 183 / 1 001 |
| Logement, commission | **35 %** | 70 / 744 |

Le reste se répartit entre des issues très différentes, qui ne racontent pas la même chose :
- **Irrecevables avant toute discussion** : cavaliers (art. 45 : 142 d'un coup sur le logement, 111 sur le narcotrafic en séance), charge publique (art. 40), « gage », hors champ d'une habilitation (art. 38), injonction, doublon, « entonnoir ». Pour eux, **le dispositif n'est pas publié** : seul reste le cartouche « Cet amendement a été déclaré irrecevable… ». On sait qu'ils ont existé, où ils visaient, qui les portait ; pas ce qu'ils disaient.
- **Tombés** (169 sur le logement en commission !) : un autre amendement adopté les a privés d'objet. Sur le logement, 90 tombés viennent de **deux réécritures globales** d'article (CE670 « Rédiger ainsi cet article » sur l'article 2 → 53 tombés ; CE738 de la rapporteure sur l'article 6 bis → 35 tombés), 50 d'une discussion commune où un concurrent est passé.
- **Non soutenus** (auteur absent), **retirés** (avant ou après publication, ou en séance après « demande de retrait »).

**Le pouvoir d'adoption est très concentré.** Commission narcotrafic : rapporteur 124 adoptés sur 142 déposés, députés 65 sur 520. Logement : rapporteure 34/65, députés 36/679 ; un groupe (CP) dépose le plus (134) et n'obtient aucune adoption. Mais la concentration n'est pas totale : sur le logement, l'article 3 est **supprimé en commission** par des amendements UT et SOL identiques, contre le texte du Gouvernement.

**Les amendements « rédactionnels » sont une catégorie à part.** 74 amendements « rédactionnels » ou « de coordination » sur le narcotrafic, déposés par le rapporteur ou sous l'étiquette de son groupe, souvent répartis sur de nombreux articles. Ils gonflent les « adoptés » et n'ont pas de contenu politique. Les traiter comme les autres fausse tout.

**Les « replis » : une intention se décline en éventail.** « Amendement de repli » apparaît dans 146 exposés (narcotrafic), 62 (logement). Exemple : treize amendements CP sur le même alinéa 9 de l'article 6 (logement), chacun supprimant un morceau différent (« de renouvellement ou », « ou de reconduction tacite »…) ; sept amendements SOL sur le même article. Le dépôt réel n'est pas « mon amendement », c'est **une famille graduée** : la position maximale, puis des positions de repli. C'est la trace la plus directe d'une stratégie de négociation dans les données.

**L'ordre de discussion n'est pas l'ordre du texte.** En séance, le narcotrafic est examiné ainsi : articles 1er, 2, puis **appelés par priorité** 23 quinquies, 23, 23 bis A, 14, 8, 8 bis, 8 ter, 16, 24, puis retour à 3, 4, 5… jusqu'au bout, puis **seconde délibération** sur l'article 4 bis A, puis vote sur le titre. Le texte est parcouru comme un itinéraire, avec des détours décidés par le Gouvernement ou la commission. Trois ordres coexistent bien : numéro de dépôt (≈ chronologique), clé de tri `triAmendement` (place dans la liasse : préfixe = article, suffixe = position, encodé en lettres), ordre d'appel en séance.

**Le temps est très ramassé.** Narcotrafic, séance : 623 amendements déposés le même jour (14 mars 2025, veille du délai). Les sorts sont horodatés à la seconde (`dateSort`) : on peut reconstruire le rythme de la séance (des rafales de rejets à quelques secondes d'intervalle, des heures sur un seul article).

**La séance a une grammaire codée.** Les comptes rendus (Syceron, XML) étiquettent chaque paragraphe : présentation d'un amendement (`DISC_ARTICLES_3_1` « pour soutenir l'amendement no… »), avis de la commission et du Gouvernement (« Quel est l'avis du gouvernement ? » / « Défavorable »), annonce de scrutin public et **groupe qui le demande** (`ANN_SCR_AUTRE`), mise aux voix, résultat, rejet ou adoption (`REJET_ADT`, `ADOP_ADT`, `AM8ENDSORT_REJET_IDENTIQUES`), retrait (`RETRAIT_ADT`), rappel au règlement, suspension de séance, changement de présidence, interruptions (`INTERRUPTION_1_10` : **un quart des paragraphes**). Les décisions sont des phrases figées et riches : « (L'amendement no 5, accepté par la commission, modifiant l'article 3, est adopté.) », « (L'amendement no X est adopté ; en conséquence, les amendements nos Y et Z tombent.) ».

Découpée par décisions, la séance narcotrafic donne 466 épisodes : médiane ≈ 400 mots, 10 % au-delà de 1 500 mots, quelques-uns énormes (un débat de 23 000 mots et 125 interruptions sur cinq amendements identiques à l'article 23 quinquies). 63 épisodes de un ou deux paragraphes : des rafales où l'amendement est appelé, rejeté, sans un mot. Les avis tiennent en deux mots : « Même avis » (108 fois), « Défavorable » (94), « Favorable » (34), « Sagesse » (5), « Demande de retrait » (4).

**Le scrutin public est un acte stratégique, et le lien avec l'amendement est textuel.** Une centaine de scrutins publics sur les deux textes narcotrafic (loi ordinaire et loi organique), soit de l'ordre de 10 % des amendements de séance. Le fichier scrutin donne le décompte nominatif par groupe et la séance, mais **pas l'uid de l'amendement** : seulement son titre (« l'amendement n° 365 de M. Peyrol-Rouvier de suppression de l'article 2… »). Le compte rendu dit **qui a demandé** le scrutin (PR 19 fois, UT 15, CP 8…). Demander un scrutin, c'est obliger chacun à se compter.

**La CMP est une deuxième guillotine.** Traçabilité naïve (`scripts/survie.py` : les passages longs insérés par un amendement adopté se retrouvent-ils mot pour mot dans les textes suivants ?) : sur les amendements de séance adoptés dont l'insertion est repérable, près d'un tiers (18 sur 59) disparaissent du texte de CMP. Méthode grossière (une insertion reformulée compte comme disparue) mais le signal est net : **adopté ne veut pas dire « dans la loi »**.

**Un dossier en touche d'autres.** Les débats de commission sur l'article 4 du logement renvoient au « dispositif Jeanbrun » et au PLF 2026 adopté par 49.3 : ce qui se joue sur un article dépend d'un autre texte. Les identiques « Supprimer cet article » et les demandes de rapport (54 amendements « le Gouvernement remet au Parlement un rapport… » sur le narcotrafic) sont d'autres familles transversales.

---

## 3. Unités candidates, au vu des données

Aucune ne s'impose seule ; chacune éclaire autre chose.

| Unité | Existe dans les données comme | Ce qu'elle rend visible |
|---|---|---|
| Amendement | un fichier, un uid | l'acte individuel, ses signataires, son sort |
| Grappe d'identiques | `discussionIdentique.idDiscussion` | coalitions, rédactions externes ; un seul vote pour tous |
| Discussion commune | `discussionCommune.idDiscussion` + position | concurrence explicite sur un même passage ; c'est l'unité de vote réelle (l'adoption de l'un fait tomber les autres) |
| Famille de replis | même auteur, même passage, exposé « de repli » | une stratégie, du maximal au minimal |
| Épisode de séance | entre deux décisions dans le compte rendu | le temps réel passé, qui parle, avis, interruptions, scrutin |
| Article (en séance) | `point` du compte rendu, « (L'article 2, amendé, est adopté.) » | l'itinéraire de la séance, les priorités, les réserves |
| Opération de modification | une ligne « I. – … II. – … » du dispositif | la portée réelle, au-delà de l'alinéa déclaré |
| Passage (« unité de sens ») | à reconstruire : l'endroit du texte que plusieurs amendements touchent | où ça se dispute vraiment |
| Étape de navette | `actesLegislatifs` du dossier | le texte qui change, les cicatrices (Supprimé, nouveau, bis) |
| Scrutin | un fichier par scrutin, décompte nominatif | qui s'est compté, groupes divisés |
