# Relevé de forme des huit inspirations (8 novembre 2026)

Relevé fait pour construire les maquettes : valeurs tirées des captures officielles, des feuilles de style publiques et des systèmes de design des éditeurs. [doc] = documentation officielle, [CSS] = propriété extraite d'une feuille de style publique, [mesuré] = pixels mesurés sur capture officielle. Aucune image de marque n'est versionnée ici.

Deux rapports de veille plus larges (sources, captures, citations) ont été remis à l'utilisateur en fichiers : « Logiciels complexes et fluides » (14 enseignements, critères de reconnaissance) et « Trente-quatre logiciels qui rendent le technique abordable ». Leur constat principal : presque toutes les justifications viennent des éditeurs eux-mêmes ; peu de prix de jury indépendant (DaVinci Resolve : Red Dot 2017 ; Affinity : Apple Design Award 2015 ; Things 3, Bear 2017 ; Procreate 2022, 2024 ; Craft Webby 2025 ; GOV.UK Design of the Year 2013 ; Wikipédia : refonte documentée par tests).

## Figma (UI3)
- Squelette : panneau gauche ancré ≈ 240 px (fichier, onglets File | Assets, Pages, Calques) ; canevas sans barre du haut ; barre d'outils flottante en bas (≈ 48 px, coins arrondis, ombre) ; panneau droit ≈ 240 px (avatars, Présenter, Share bleu, onglets Design | Prototype, zoom). Panneaux ancrés, pas flottants : « they slowed people down » [doc]. Minimize UI ⌘⇧\, Hide UI ⌘\.
- Couleurs FPL v2 [CSS] clair | sombre : bg #fff | #212121 ; secondaire #f1f1f1 | #292929 ; tertiaire #fafafa | #1b1b1b ; bordure #e4e4e4 | #353535 ; texte #161616 | #f5f5f5 ; texte secondaire #00000096 | #ffffff78 ; brand #0090f3 | #4579ab ; sélection #eaf4ff | #2c3c4d ; composant #a064fd | #7c68a6 ; menus/infobulles #1b1b1b | #353535.
- Typo : Inter 450/550/600 ; body 12/16 ; libellés de section en casse normale ; mono Roboto Mono. Rayons 4/8/12/16 ; champs 24 px sans bordure, pas de 32, filets pleine largeur.
- Principes : « Center your ideas, not Figma's UI » ; « simplifying Figma, without simplifying what you can do with Figma » [doc, figma.com/blog/behind-our-redesign-ui3].

## Linear
- « L inversé » ; refonte 2026 : 4 couches emboîtées (App / Location bar / View bar / Content) ; barre latérale ≈ 232 px atténuée ; contenu incrusté plus clair.
- Couleurs [CSS] clair | sombre : bg #fff | #08090a ; niveaux #f8f8f8 #f4f4f4 #f0f0f0 | #0f1011 #141516 #191a1b ; bordures #e9e8ea | #23252a ; texte #282a30 | #f7f8f8, tertiaire #6f6e77 | #8a8f98 ; accent #7170ff, indigo #5e6ad2. Thèmes générés en LCH (base, accent, contraste).
- Typo : Inter (cv01, ss03), graisses 400/510/590 ; texte courant 13 px. Rayons 4–32 ; puce kbd rayon 5.
- Principes : « Don't compete for attention you haven't earned » ; « Structure should be felt not seen » [doc, linear.app/now/behind-the-latest-design-refresh].

## Visual Studio Code
- Barre de titre 35, barre d'activité 48, onglets 35, fil d'Ariane 22, lignes 22, barre d'état 22 [code source microsoft/vscode].
- Dark Modern | Light Modern : éditeur #1F1F1F | #FFFFFF ; chrome #181818 | #F8F8F8 ; bordures #2B2B2B | #E5E5E5 ; texte #CCCCCC | #3B3B3B ; accent #0078D4 | #005FB8 ; diff ajout #9CCC2C33, suppression #FF000033.
- UI en police système 13 px ; éditeur Menlo/Consolas/Droid Sans Mono. Rayons 2/4/6/8/12.

## Raycast
- Fenêtre 750 × 475, rayon 18, verre (blur 72 px, contour intérieur 20 %) ; recherche 56, lignes 40, sélection en pastille rayon 10, barre d'actions 40.
- Site sombre [CSS] : bg #07080A, surfaces #101111 #18191A ; texte #F4F4F6, #C2C7CA, #78787C ; bleu #57C1FF, vert #59D499, jaune #FFC533, rouge #FF6161 (tags = couleur à 15 %). Touches-pastilles rayon 6.
- Principes : « built to be driven entirely from the keyboard » ; « press ⌘ K whenever you're unsure » [doc].

## Affinity
- v2 : Personas en haut à gauche (icône active saturée), toolbar #303030, barre contextuelle, outils à gauche, Studio en groupes à onglets, pasteboard #222222, barre d'état explicative (verbe en gras). Couleur réservée aux icônes de Persona (dégradés bleu→cyan, violet→rose, rouge→orange). Rayons 2–4 ; densité forte.
- v3 (par Canva) : sélecteur de studios en pilules, panneaux flottants arrondis à onglets pilules.

## Phantom
- Palette officielle : #1C1C1C, violet #AB9FF2, blanc chaud #FFFDF8. App 2026 : fond #000/#111, violet #ACA1F2, hausse #21E56F, bannière d'attention #E54D2E. Police maison « Phantom » (grotesque arrondie). Rayons 16/24/32, pilules. Grand chiffre en tête, boutons d'action carrés, feuilles du bas avec poignée.
- Principes : « friendly, trustworthy, and approachable » ; « everything is spelled out in simple language » [doc].

## Jupiter
- [CSS mesuré] fond #090d10, carte #0d151e, champ #151e28, bordure #19242e ; texte #e2e8f0 / #90a1b9 ; accent unique vert citron #acf47d. Inter ; montants 32 px. Rayons pilule, 16 (cartes), 32 (cadre du swap). Aucune ombre : hiérarchie par niveaux de surface. Fond à grille de points.

## Sky
- [CSS mesuré] clair lavande : fond #dcdffc → ciel ; texte #2f2d40 ; accent #4836f5 ; cartes en verre blanc 60 % + blur 20 px ; bordures lavande 30 % ; bouton en dégradé #2a197d → #6a6cfb ; jauge 3 traits. Circular (titres, chiffres) et Graphik (corps 12/18). Pilules partout ; cartes rayon 28 ; aucune ombre.
- Principes (agence Clay) : « Swiss-style clean typography » ; « gradients symbolizing the journey from the sun to the stars ».
