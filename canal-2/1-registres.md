# 1. Registres — le vocabulaire des réponses possibles

Une interface 2D interactive et dynamique dispose d'un nombre fini de façons de montrer et de faire agir. Les voici, nommées par un code, pour qu'on puisse dire de chaque piste par quel moyen elle passe. La liste est large à dessein ; elle ne présume d'aucune esthétique.

## Registres de représentation (ce qu'on voit)

| Code | Registre | Ce qu'il sait faire |
|---|---|---|
| `TEXTE` | Texte annoté | Afficher un texte juridique avec des marques en place : surlignage, soulignement, barré, couleur, exposant, marge, glose. |
| `DIFF` | Écart entre deux textes | Montrer ce qui change d'un texte à l'autre : en ligne (ajouts et suppressions entremêlés), en côte à côte, ou par repli des parties identiques. |
| `ALIGN` | Alignement de N textes | Mettre N versions en colonnes, alignées unité par unité (synopse, tableau comparatif, document à 4 colonnes). |
| `FRISE` | Ligne de temps | Disposer des événements, des étapes ou des versions le long d'un axe temporel ; y placer un curseur. |
| `GRAPHE` | Réseau | Des nœuds (amendements, acteurs, articles) reliés par des liens typés. |
| `ARBRE` | Hiérarchie | La structure du texte (titre > chapitre > article > I > 1° > a)), l'arbre d'amendements, l'arbre des scénarios. |
| `MATRICE` | Tableau croisé | Deux dimensions croisées : articles × étapes, unités × groupes, amendements × dimensions de statut. |
| `LISTE` | Liste ordonnée, triable, filtrable | Le dérouleur, la liasse, la liste de vote ; tri selon plusieurs ordres. |
| `CARTE` | Plan spatial libre | Un espace 2D où la position a un sens : par exemple distance au texte, proximité entre rédactions, regroupements. Zoomable. |
| `ECHELLE` | Changement d'échelle | Passer d'un niveau de granularité à un autre (mots → texte → dossier → droit en vigueur), par zoom continu ou par crans. |
| `CALQUE` | Superposition | Allumer ou éteindre des couches d'information sur une même vue. |
| `ETAT` | Marques d'état | Pastilles, étiquettes, icônes, couleurs, textures, opacité : tout ce qui code le statut d'un objet. |
| `COMPTE` | Dénombrement | Des chiffres qui ont un sens : nombre d'amendements, minutes, signatures, voix. |
| `JAUGE` | Mesure d'une grandeur unique | Barre, cercle, sablier : un temps restant, un seuil, un budget. |
| `DOC` | Document fidèle | Reproduire un document réel (dérouleur, feuilleton, tableau comparatif, document à 4 colonnes), rendu cliquable. |
| `FICHE` | Fiche d'objet | Le détail d'un amendement, d'un acteur ou d'un article, avec toutes ses dimensions. |

## Registres d'interaction (ce qu'on fait)

| Code | Registre | Ce qu'il permet |
|---|---|---|
| `NAV` | Navigation | Parcourir, sauter, suivre un lien, revenir. |
| `FILTRE` | Filtrage et facettes | Restreindre ce qu'on voit selon un ou plusieurs critères. |
| `TRI` | Réordonnancement | Changer l'ordre d'une liste. |
| `SURVOL` | Survol ou prévisualisation | Montrer, sans s'engager, ce qu'une action produirait. |
| `SELECT` | Sélection et comparaison | Choisir des objets pour les confronter. |
| `EDIT` | Édition | Rédiger ou modifier un texte, en place ou dans un formulaire. |
| `SIMU` | Simulation | Poser des hypothèses (« si X est adopté ») et voir l'état résultant. |
| `CTRL` | Contrôle à la saisie | Vérifier une règle pendant qu'on agit : alerte, blocage, suggestion. |
| `ACTION` | Action contextuelle | Un acte disponible seulement pour certains, à certains moments : déposer, retirer, signer, reprendre. |
| `FLUX` | Circuit ou processus | Faire passer un objet par des étapes et des personnes : circulation pour signature, validation, avis. |
| `ANNOT` | Annotation et discussion | Poser une note, une question, un fil de discussion, ancrés à un endroit précis. |
| `NOTIF` | Notification | Prévenir d'un changement : délai rouvert, avis rendu, amendement tombé. |
| `DIRECT` | Temps réel | Suivre un processus en cours : séance, vote, dérouleur qui avance. |
| `REJOUER` | Relecture animée | Rejouer une séquence passée : une séance, une navette, l'histoire d'un article. |
| `ANIM` | Transition animée | Faire voir un changement d'état : un texte qui se réorganise, des amendements qui tombent, un article qui se déplace. |
| `GENERER` | Génération assistée | Produire automatiquement un contenu : dispositif légistique, gage, synthèse, découpage en thèmes. |

## Dimensions de variation

Une même piste peut se décliner selon plusieurs dimensions ; on les rappelle quand c'est utile.

- **Granularité** : mots, phrase, alinéa, subdivision, article, division, texte, dossier, code modifié, droit en vigueur.
- **Point de vue** : député de groupe, parlementaire isolé, non-membre de la commission, rapporteur, Gouvernement, président de séance, administration, collaborateur, observateur (citoyen, journaliste, chercheur).
- **Moment** : préparation, dépôt, examen (en direct), après coup (rétrospectif), lecture suivante.
- **Lieu de l'information** : intégrée dans la vue principale, vue dédiée, fenêtre annexe, écran séparé, interface distincte.
- **Visibilité** : privée, partagée dans un groupe, publique.
- **Fidélité** : reflet exact de la procédure, ou **augmentation** assumée (un objet que la procédure ne connaît pas, au sens du corpus en H0).
