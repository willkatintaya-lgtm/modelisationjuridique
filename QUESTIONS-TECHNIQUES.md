# Questions techniques : où trouver les 16 maquettes

L'utilisateur passe en revue 16 maquettes (fichiers du zip « direction artistique ») et pose des questions sur leurs fonctionnalités.

| Fichier du zip | Sources dans ce dépôt | Construire |
|---|---|---|
| `avant-<nom>.html` (forme de l'inspiration) | `maquettes-avant/<nom>/source.html` + `app.js` (copie exacte du commit `61cf649`) | `python3 maquettes-avant/construire_avant.py <nom>` |
| `apres-<nom>.html` (direction « Le bordereau ») | `maquettes/<nom>/source.html` + `app.js` | `python3 maquettes/construire.py <nom>` |

`<nom>` ∈ figma, linear, vscode, raycast, affinity, phantom, jupiter, sky. Les fichiers construits sont identiques octet pour octet à ceux du zip (vérifié pour figma).

**Avant et après ont la même structure et les mêmes fonctions** : seule la forme (CSS, polices, couleurs) diffère. Une question de fonctionnalité a donc presque toujours la même réponse pour les deux ; `diff maquettes-avant/<nom>/app.js maquettes/<nom>/app.js` montre les seuls écarts (valeurs d'apparence).

## Le socle commun (identique pour les 16)
`maquettes/commun/` : `data.js` (données réelles de l'article 4, générées par `outils/construire_donnees.py`, groupes fictifs), `base.js` (comparaison mot à mot `diffOps`/`inlineDiff`, calque miroir `liveHTML`, versions d'article `verOfAmendment`/`verLines`, application au code), `modele.js` (brouillons `MINE`, référence `REF`, concurrents `concurrents(o)`, passages disputés `unitsOf(o)` et regroupement `clusters(u)`, thèmes), `noyau.js` (aides `NX.*` : historique d'un alinéa, grille des étapes, matrice thèmes × groupes…). Repris de la refonte (`app/base.js`, `app/modele.js`).

## Autres documents utiles
- `maquettes/README.md` : la structure empruntée à chaque logiciel.
- `maquettes/CONSIGNES.md` : le périmètre fonctionnel exigé des quatre espaces (Dossier, Atelier, Enjeux, Réunion).
- `maquettes/CONSIGNES-DA.md`, `direction-artistique/DA.md` : la direction artistique appliquée aux « après ».
- `veille/forme-des-inspirations.md` : relevé de forme des inspirations.
- Chaque maquette a une note « Lisez-moi » / « À propos » dans son `app.js` (ce qui est emprunté, écarts assumés).
- Vérifier en vrai : `node maquettes/verifier.js <nom>` (captures 1280 et 400 px) ; scripts d'interaction `maquettes/<nom>/interagir.js` ; Playwright est préinstallé.
