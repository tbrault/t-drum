# Changelog

Suivi des évolutions de T-Drum, de la plus récente à la plus ancienne.

Numérotation : une nouvelle fonctionnalité (`feat`) fait monter le numéro du
milieu (1.**1**.0), une correction (`fix`) fait monter le dernier (1.1.**1**).

## 1.9.0 — 2026-11-15

### Modifié

- Accompagnement : les sons de synthèse sont remplacés par de vrais
  enregistrements, note par note — piano à queue, Rhodes de 1977,
  contrebasse jouée aux doigts, basse électrique, guitare électrique,
  trompette. La guitare saturée est la vraie guitare passée dans un ampli
  simulé (saturation et haut-parleur).
- Son plus propre : la sortie n'écrase plus la musique. Elle est un peu
  moins forte qu'en 1.8.0 ; le volume se rattrape sur le Mac ou le casque.
- Échantillons : environ 7 Mo embarqués dans l'app, sources et licences dans
  public/sons/CREDITS.md. Ils se régénèrent avec
  `python3 -I scripts/telecharger-sons.py`.

## 1.8.0 — 2026-11-14

### Ajouté

- Accompagnement : le casque d'un rythme ouvre un lecteur en bas de l'écran
  qui joue de vrais instruments enregistrés, sans batterie, pour travailler
  le rythme en musique. Six styles, proposés d'après la leçon et retenus
  pour chaque rythme : rock (guitare saturée, basse), pop (piano, basse),
  funk (guitare claire, piano électrique, basse), shuffle blues (guitare
  saturée, basse), jazz swing et valse jazz en 3/4 (piano, contrebasse,
  trompette qui joue la mélodie un tour sur deux).
- Un morceau propre à chaque binaire et solo : sa structure est lue sur la
  partition (mesures de groove, mesures répétées « % », breaks : les mesures
  où le charleston s'interrompt) et la musique la suit — elle se répète sur
  un « % », tient l'accord sans s'arrêter sur un break, finit sur un accord
  après la dernière mesure. Un break d'ouverture se joue seul, juste après
  les quatre clics du décompte. La tonalité, la grille d'accords de chaque
  ligne et les motifs des instruments sont tirés d'après le nom du morceau :
  le Binaire 11 et le Binaire 12 n'ont pas la même musique, et chacun sonne
  toujours pareil.
- Le lecteur affiche la structure en petits blocs et la tonalité. Un clic
  sur un bloc corrige sa mesure (groove, break, mesure répétée) ; la
  correction est gardée avec le rythme.
- Longueur calée sur le morceau : les mesures sont comptées sur la
  partition ; l'accompagnement joue ce nombre de mesures puis s'arrête. La
  longueur se corrige avec − et +, ou passe en boucle sans fin.
- Son fort, fait pour passer par-dessus la batterie : compresseur, limiteur
  et arrondi des crêtes en sortie (pas de saturation). Le clic (décompte,
  métronome) passe par la même sortie et reste audible par-dessus.
- Tempo réglable pendant la lecture, mesure de décompte, clic de métronome
  et volume. « Noter ce tempo » enregistre le tempo joué comme tempo atteint
  du rythme.
- Échantillons : banque Musyng Kite (CC BY-SA 3.0), environ 2 Mo, embarqués
  dans l'app (voir public/sons/CREDITS.md).

## 1.7.0 — 2026-11-14

### Ajouté

- Partitions : chaque leçon affiche les pages de la méthode indiquées par
  ses consignes (carte « Partition » sous la vidéo). Un clic ouvre la page
  en grand, avec les flèches pour passer d'une page à l'autre.
- Exercices repérés automatiquement sur chaque page. « Créer les rythmes de
  la page » ajoute d'un coup un rythme par exercice, rangés dans une partie
  « Page N », chacun avec sa partition.
- Partition dans la carte d'un rythme : l'exercice s'affiche sous ses
  réglages. La note de musique d'un rythme ouvre la page pour lui associer un
  exercice (clic sur un cadre, ou cadre tracé à la main si le découpage
  automatique est faux). « Masquer les partitions » replie tous les
  exercices.
- Un binaire ou un solo est un seul exercice, même sur plusieurs lignes ou
  sur deux pages : ses lignes sont réunies en un cadre (titres des pages lus
  automatiquement), et le rythme créé porte son titre (« Binaire 9 »,
  « Solo 4 »).
- La liste s'intitule « Rythmes, binaires et solos ».

### Modifié

- Supprimer une partie supprime aussi ses rythmes, après un second clic de
  confirmation qui indique combien de rythmes partent avec elle.

## 1.6.1 — 2026-11-14

### Corrigé

- Vidéo en plein écran : quitter le plein écran de la vidéo ne fait plus
  sortir l'app du plein écran si elle y était déjà.

## 1.6.0 — 2026-11-14

### Corrigé

- Vidéo en plein écran : la barre de séance ne s'affiche plus par-dessus la
  vidéo, et la page ne dépasse plus en bas de l'écran.
- Chaque page s'ouvre en haut, au lieu de garder la hauteur de défilement de
  la page précédente.

### Modifié

- Tailles de texte alignées sur une échelle fixe (12, 14, 16, 18, 20, 24,
  30, 36, 48 px) : plus aucun texte en 10 ou 11 px.
- Passe d'interface sur toute l'app, selon les principes de Refactoring UI :
  les panneaux, cartes et lignes se distinguent par leur teinte et leur
  espacement plutôt que par des bordures ; le bouton du chrono est le seul
  bouton plein de la page, les autres sont plus discrets ; deux graisses de
  texte au lieu de quatre ; les champs de saisie sont des zones en creux.
- Calendrier et « À réviser » : le titre de la leçon s'affiche à côté de son
  numéro.
- Couleurs : la palette charbon et ambre est conservée. Les statuts ont une
  pastille teintée (ambre, vert, bleu) et la corbeille rougit au survol.
- Barres de progression : le fond de la barre est visible partout, y compris
  sur la page d'un niveau.
- Le quadrillage du fond est retiré.
- Survols plus marqués sur ce qui se clique : la ligne survolée change de
  teinte et prend un trait ambre à gauche.
- Champs de nom visibles : le nom d'un rythme a un fond de champ, et une
  partie sans nom montre son emplacement vide. Après « Ajouter un rythme »
  ou « Ajouter une partie », le curseur est déjà dans le champ du nom.
- Page d'une leçon : un titre « Leçon » au-dessus de la vidéo, aligné sur le
  titre « Rythmes ».

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
