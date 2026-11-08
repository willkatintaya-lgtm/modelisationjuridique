# Canal 1 — pré-cadrage (écrit avant d'ouvrir les données et avant `pistes.md`)

## Ce que j'ai compris
- La maquette (`index.html`) met en scène **un** moment : je rédige un amendement sur un alinéa ; autour, l'article de la commission, les amendements concurrents, regroupés par « rédaction distincte » et par « unité de sens ». Tout y est fictif et figé : pas de temps, pas de sort, pas de vote, pas de séance, pas de navette.
- Mon rôle : donner à la refonte un matériau **réel** (AN), et en tirer quelles « séquences » de la vie parlementaire méritent d'être représentées, comment elles se découpent, quelles fonctionnalités en découlent. Proposer large, sans trier.

## Ce dont je me méfie d'emblée
- Que l'amendement soit l'unité de base. La maquette le suppose ; les données diront peut-être que l'unité vivante est la *discussion commune*, l'*article* en séance, ou l'*échange* (auteur ↔ rapporteur ↔ gouvernement).
- Que « position dans le texte » soit fiable (signal reçu : alinéa déclaré ≠ portée réelle).
- Que « texte de la commission » soit un objet unique : il y a le texte déposé, le texte de commission, le texte adopté, puis la navette. Chaque étape a sa liasse.

## Premières questions
1. Quelle proportion des amendements est en discussion commune / identique ? Les champs sont-ils vraiment vides ?
2. Combien d'amendements par article, par alinéa ? Ma maquette suppose 4 à 10 par alinéa : est-ce réaliste ou ridicule ?
3. Quelle est la distribution des sorts ? (Retirés, non soutenus, tombés, irrecevables… combien n'arrivent jamais au vote ?)
4. Les dispositifs sont-ils réductibles à des opérations (« remplacer X par Y », « supprimer », « compléter par ») ? Dans quelle proportion ?
5. Peut-on relier un amendement à son scrutin, et à la séance (compte rendu) où il est discuté ?
6. Le temps : à quelle granularité les données datent-elles les choses (dépôt, discussion, sort) ?

## Point d'entrée
L'open data officiel de l'AN (législature 17), sur un ou deux dossiers législatifs de taille moyenne, de bout en bout : dossier → textes → amendements (commission + séance) → scrutins → compte rendu. Puis Tricoteuses pour les textes eux-mêmes si l'officiel ne les a pas.
Les données brutes restent hors dépôt (scratchpad) ; ici : scripts, extraits, notes, résultats.
