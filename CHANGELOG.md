# Changelog

Suivi des évolutions de T-Drum, de la plus récente à la plus ancienne.

Numérotation : une nouvelle fonctionnalité (`feat`) fait monter le numéro du
milieu (1.**1**.0), une correction (`fix`) fait monter le dernier (1.1.**1**).

## 1.5.0 — 2026-11-14

### Ajouté

- Parties dans une leçon : des cartes repliables qui regroupent les rythmes
  (ex. « Page 22 », « Indépendance »). Leur nom se modifie d'un clic, les
  flèches les montent ou les descendent, et un rythme se glisse d'une partie
  à l'autre. Les ciseaux d'un rythme coupent la liste à cet endroit : lui et
  les suivants passent dans une nouvelle partie. Supprimer une partie garde
  ses rythmes.
- Statut automatique : « En cours » dès qu'un temps est enregistré,
  « Validée » quand tous les rythmes atteignent le tempo cible minimal,
  « Maîtrisée » quand ils atteignent le maximal. Sous le statut, une ligne
  indique ce qu'il manque pour le suivant. Les rares leçons sans tempo cible
  gardent un statut à choisir.

- Titres courts pour les 304 leçons et nouveaux titres pour les 17 niveaux :
  chacun dit ce que la leçon ou le niveau fait travailler (ex. « Accents
  déplacés en frisé et en roulé »), à la place du texte des objectifs. Un
  titre personnalisé garde la priorité.

### Modifié

- Page d'une leçon repensée : une barre de séance reste en haut de l'écran
  (chrono, temps cumulé, ajout de temps, historique, tempo cible), les
  rythmes prennent la grande colonne, et la vidéo, les consignes et les notes
  sont rangées sur le côté. Le mot « Pratique » disparaît.
- Rythmes sur une seule ligne, plus aérés ; le tempo prend la couleur du
  statut correspondant (ambre sous le tempo minimal, vert au minimal, bleu au
  maximal).
- Les champs de saisie n'affichent plus de texte d'aide.
- L'ancien statut « Acquise » devient « Validée » ou « Maîtrisée » selon les
  tempos saisis. Les révisions espacées démarrent à la première validation.
- Couleurs : panneaux et cartes mieux séparés, textes discrets plus lisibles,
  repère visible sur l'élément actif au clavier.
- La fenêtre s'ouvre plus large (1320 × 860).

## 1.4.0 — 2026-11-14

### Modifié

- Barème de maîtrise d'un rythme : le cran 2 devient « Enchaîné sans erreur »
  (au lieu de « Joué lentement, sans erreur ») et le cran 4 « Tenu sur la
  durée » (au lieu de « Fluide et régulier »). Le cran 5 s'appelle simplement
  « Par cœur ». La vitesse reste notée dans le BPM ; les notes déjà saisies ne
  changent pas.

## 1.3.0 — 2026-11-14

### Ajouté

- Page d'un niveau : chaque leçon affiche le tempo le plus bas et le plus haut
  atteints (tous rythmes confondus) et le temps total passé dessus.

## 1.2.0 — 2026-11-14

### Ajouté

- Titres modifiables : un clic sur le titre d'un niveau (page du niveau) ou
  d'une leçon (page de la leçon) permet de le renommer. Le nouveau titre
  apparaît aussi sur la carte du niveau à l'accueil et dans la liste des
  leçons. Effacer le titre rétablit celui d'origine.

## 1.1.0 — 2026-11-14

### Ajouté

- Réorganisation des cartes de rythmes d'une leçon par glisser-déposer : une
  poignée à gauche de chaque carte permet de la déplacer dans la liste. Le
  nouvel ordre est sauvegardé avec la progression.
- Ce changelog.

## 1.0.0 — 2026-11-14

Première version numérotée de l'app.

### Ajouté

- Numéro de version affiché en bas de l'accueil.

### Déjà présent avant la numérotation

- Tableau de bord, vues niveau et leçon pour les niveaux 7 à 23.
- Suivi par leçon : statut, notes, rythmes (BPM et maîtrise).
- Sessions de pratique, calendrier et révisions espacées.
- Lecture des vidéos de leçon, avec plein écran.
