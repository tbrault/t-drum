# T-Drum — Design v1 (app desktop Tauri)

**Date :** 2026-06-13
**Statut :** validé (brainstorming)

## Contexte

T-Drum est une app **personnelle** de suivi de progression pour une formation
batterie (Académie Puchol). L'utilisateur (Teddy, batteur débutant) est le seul
utilisateur. L'app remplace un suivi informel et rassemble en un seul endroit :
le **contenu pédagogique** (consignes de chaque leçon) et la **progression
personnelle**.

Changement d'architecture par rapport au plan initial : on passe d'une app web
React à une **app desktop macOS via Tauri**, avec icône dans le Dock.

### Source du contenu

Le contenu source est sur un disque dur externe
(`/Volumes/Disc Teddy /Académi puchol`), organisé ainsi :

```
Chapitre N/                 (= niveau N, N de 7 à 23)
├── Recap.png               récap du niveau
└── vol 2/  vol 3/  vol 4/  (un dossier par volume)
    ├── N-X.png             consignes de la leçon X (texte à transcrire)
    ├── N-X.mp4             vidéo de la leçon X
    └── N-X-BT.png          backing track éventuel
```

- ~**305 leçons** au total (15-25 par niveau).
- Numérotation des leçons **continue dans le niveau** ; le **volume (2, 3, 4)
  est une propriété de la leçon**, pas un parent.
- Les consignes suivent un **gabarit régulier** :
  `Partitions` · `Échauffement` · `Objectif(s)` · `Tempo pour les exercices` ·
  `Note(s)`.

## Périmètre v1

Inclus :

- App Tauri lançable sur macOS, icône dans le Dock.
- Modèle de données complet (contenu + progression).
- Sauvegarde de la progression en **JSON local** (dossier app data macOS).
- Trois écrans fonctionnels (voir ci-dessous).
- **Chapitre 7 réellement transcrit** comme preuve de bout en bout ; les autres
  niveaux affichés en placeholder.

Exclus (phases ultérieures) :

- Transcription des ~305 consignes (batch).
- Import et lecture des vidéos dans l'app.
- Backing tracks (`-BT.png`) et `Annexes.pdf` (partitions référencées).
- **Tests** automatisés : abandonnés (app mono-utilisateur, YAGNI).

## Architecture

- **Tauri 2** — enveloppe desktop macOS native. Nécessite l'installation de la
  toolchain **Rust** (`rustup`).
- **Frontend** : React 19 + TypeScript 5.9 + Tailwind 4 + shadcn/ui, thème
  sombre « musique ».
- **Backend Rust minimal** : commandes Tauri strictement nécessaires
  (lecture/écriture du fichier de progression ; plus tard, import des vidéos).
  Pas de logique métier côté Rust en v1.
- **Stockage progression** : un fichier JSON unique dans le répertoire app data
  fourni par Tauri (`app_data_dir`). Lisible et exportable.
- **Contenu cours** : écrit en dur en **TypeScript structuré**, transcrit depuis
  les `.png` de consignes. Statique, livré avec l'app.

### Séparation des responsabilités

- **Couche contenu** (`src/content/`) : données statiques des niveaux/leçons.
  Une seule source de vérité, importée par l'UI. Aucun état.
- **Couche progression** (`src/progress/`) : lecture/écriture du JSON via les
  commandes Tauri + état applicatif (store léger). Interface claire
  `getProgress(lessonId)` / `setProgress(lessonId, patch)`.
- **Couche UI** (`src/components/`, `src/routes/`) : consomme contenu +
  progression via des props/hooks, ne touche jamais au filesystem directement.

## Modèle de données

### Contenu (statique)

```ts
type Volume = 2 | 3 | 4

interface Consignes {
  partitions?: string        // ex. "Volume 3, pages 22-23"
  echauffement?: string
  objectifs?: string
  tempoCible?: { min: number; max: number }  // BPM, depuis "Tempo pour les exercices"
  notes?: string
}

interface Lesson {
  id: string                 // ex. "7-9"
  niveau: number             // 7..23
  numero: number             // numéro continu dans le niveau
  volume: Volume
  consignes: Consignes
  hasVideo: boolean
  hasBT: boolean
}

interface Niveau {
  numero: number             // 7..23
  recap?: string             // texte récap éventuel
  lessons: Lesson[]
}
```

### Progression (dynamique, JSON local)

```ts
type Statut = 'a-faire' | 'en-cours' | 'acquise'

interface LessonProgress {
  lessonId: string
  statut: Statut             // défaut: 'a-faire'
  maitrise: number           // 0..5 (étoiles)
  dateTravail?: string       // ISO date
  dateRevision?: string      // ISO date
  notes?: string             // remarques perso
  bpmActuel?: number         // tempo atteint au métronome
}

interface ProgressFile {
  version: 1
  lessons: Record<string, LessonProgress>  // clé = lessonId
}
```

Une leçon sans entrée dans `ProgressFile` est considérée « à faire » avec
maîtrise 0.

## Écrans

1. **Tableau de bord** — progression globale et par niveau (barres de
   progression, compteurs leçons acquises/total, ambiance « tracker »). Point
   d'entrée de l'app.
2. **Niveau → leçons** — pour un niveau, les leçons **regroupées par volume**
   (logique : enchaîner les leçons d'un même volume). Chaque leçon montre son
   statut et sa maîtrise d'un coup d'œil.
3. **Détail leçon** — consignes structurées (Partitions / Échauffement /
   Objectifs / Tempo cible / Notes), **placeholder vidéo**, et contrôles de
   progression : statut, étoiles de maîtrise (0-5), dates (travail / révision),
   notes perso, et BPM actuel avec rappel du tempo cible de la leçon.

## Impacts sur l'existant

- Le dossier `t-drum` est **réinitialisé** : suppression des fichiers de l'app
  web actuelle, conservation du dépôt git (`.git`), de `.claude/`, et du contenu
  source externe (hors dépôt).
- Le **hook de commit** (`.claude/settings.local.json`) est allégé : on retire
  `pnpm test`, on conserve `pnpm check` (Biome) + `pnpm build`.
- `CLAUDE.md` est mis à jour (stack Tauri, suppression des tests).

## Décisions clés

- JSON local plutôt que SQLite : volume modeste, fichier lisible/exportable,
  KISS. On migrera seulement si le besoin apparaît.
- Volume comme propriété de la leçon (pas comme niveau hiérarchique), conforme à
  la réalité des données.
- Transcription d'un seul chapitre en v1 pour valider le pipeline contenu → UI
  avant d'industrialiser les ~305 leçons.
