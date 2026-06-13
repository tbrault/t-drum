# T-Drum (Tauri) Implementation Plan

> **For agentic workers:** ce plan est exécuté en inline dans la session courante.
> Contraintes utilisateur : **pas de tests automatisés**, **aucun `git commit`
> avant validation explicite**. Les étapes de commit du gabarit standard sont
> donc remplacées par des points de contrôle visuels.

**Goal:** Reconstruire T-Drum en app desktop macOS (Tauri) affichant le contenu
de la formation batterie et permettant de suivre sa progression localement.

**Architecture:** Coque Tauri 2 (Rust minimal) + frontend React 19/TS/Tailwind
4/shadcn. Contenu cours statique en TS, progression en JSON local via commandes
Tauri. Trois écrans (tableau de bord, niveau→leçons, détail leçon).

**Tech Stack:** Tauri 2, Rust (rustup), Node 22, pnpm, React 19, TypeScript 5.9,
Vite, Tailwind 4, shadcn/ui, Biome.

---

## File Structure

```
src-tauri/                     # backend Rust (généré + édité)
  tauri.conf.json              # config app (titre, icône Dock, fenêtre)
  src/main.rs                  # commandes load_progress / save_progress
  icons/                       # icônes Dock/app
src/
  content/
    types.ts                   # Volume, Consignes, Lesson, Niveau
    niveau-07.ts               # Chapitre 7 transcrit (vrai contenu)
    index.ts                   # agrège niveaux 7-23 (7 réel, 8-23 placeholder)
  progress/
    types.ts                   # Statut, LessonProgress, ProgressFile
    store.ts                   # état + load/save via commandes Tauri
  components/
    ui/                        # shadcn (button, card, progress, etc.)
    StatutBadge.tsx
    MaitriseStars.tsx
    LessonRow.tsx
    NiveauProgress.tsx
  routes/
    Dashboard.tsx              # écran 1
    NiveauView.tsx             # écran 2
    LessonView.tsx             # écran 3
  App.tsx                      # routing + layout
  main.tsx                     # entrée React
  index.css                    # Tailwind + thème sombre
```

---

## Task 1: Réinitialiser le dossier

**Files:**
- Supprimer : tout le contenu app web sauf `.git/`, `.claude/`, `docs/`,
  `CLAUDE.md`, `.gitignore`, `.nvmrc`

- [ ] **Step 1 :** Lister précisément ce qui sera supprimé (dry-run).
- [ ] **Step 2 :** Supprimer `src/`, `e2e/`, `public/`, `dist/`, `node_modules/`,
  `index.html`, `package.json`, `pnpm-lock.yaml`, `vite.config.ts`,
  `vitest.config.ts`, `playwright.config.ts`, `tsconfig*.json`, `biome.json`,
  `components.json`, `.mcp.json`, `README.md`.
- [ ] **Step 3 :** Point de contrôle — montrer le dossier nettoyé.

## Task 2: Toolchain Rust + scaffold Tauri

**Files:** `src-tauri/`, `package.json`, `vite.config.ts`, `index.html`

- [ ] **Step 1 :** Vérifier/installer Rust via `rustup` (si absent).
- [ ] **Step 2 :** Scaffolder Tauri 2 + template React-TS
  (`pnpm create tauri-app`) dans le dossier courant.
- [ ] **Step 3 :** `pnpm install` puis vérifier que `pnpm tauri dev` compile
  (point de contrôle : fenêtre vide qui s'ouvre).

## Task 3: Frontend — Tailwind 4 + shadcn + thème sombre

**Files:** `src/index.css`, `components.json`, `src/components/ui/`, `biome.json`

- [ ] **Step 1 :** Installer/configurer Tailwind 4 + Biome.
- [ ] **Step 2 :** Init shadcn/ui (thème sombre « musique »), ajouter les
  primitives utilisées : `button`, `card`, `progress`, `badge`, `textarea`,
  `input`, `slider`.
- [ ] **Step 3 :** Point de contrôle visuel (un composant de test stylé).

## Task 4: Couche contenu

**Files:** `src/content/types.ts`, `src/content/niveau-07.ts`,
`src/content/index.ts`

- [ ] **Step 1 :** Écrire `types.ts` (Volume, Consignes, Lesson, Niveau) — voir
  modèle dans la spec.
- [ ] **Step 2 :** Lire les `.png` de consignes du Chapitre 7 (disque externe)
  et les transcrire en objets `Lesson` dans `niveau-07.ts`, avec `volume`,
  `consignes` (partitions, échauffement, objectifs, tempoCible, notes),
  `hasVideo`, `hasBT`.
- [ ] **Step 3 :** `index.ts` agrège les 17 niveaux : niveau 7 réel, niveaux
  8-23 générés en placeholder (titre + nombre de leçons vides) à partir du compte
  de fichiers sur le disque.
- [ ] **Step 4 :** Point de contrôle (log du contenu chargé).

## Task 5: Couche progression (JSON local via Tauri)

**Files:** `src/progress/types.ts`, `src/progress/store.ts`,
`src-tauri/src/main.rs`

- [ ] **Step 1 :** `types.ts` (Statut, LessonProgress, ProgressFile) — voir spec.
- [ ] **Step 2 :** Commandes Rust `load_progress` / `save_progress` lisant/écrivant
  `progress.json` dans `app_data_dir`.
- [ ] **Step 3 :** `store.ts` : charge au démarrage, expose
  `getProgress(lessonId)` / `setProgress(lessonId, patch)` (défaut « à faire » /
  maîtrise 0), persiste à chaque modification.
- [ ] **Step 4 :** Point de contrôle (écrire/relire une progression).

## Task 6: Écrans + routing

**Files:** `src/App.tsx`, `src/routes/Dashboard.tsx`,
`src/routes/NiveauView.tsx`, `src/routes/LessonView.tsx`, composants partagés

- [ ] **Step 1 :** Composants partagés : `StatutBadge`, `MaitriseStars`,
  `LessonRow`, `NiveauProgress`.
- [ ] **Step 2 :** `Dashboard` : progression globale + liste des niveaux avec
  barre de progression, navigation vers un niveau.
- [ ] **Step 3 :** `NiveauView` : leçons **regroupées par volume**, statut +
  maîtrise visibles, navigation vers une leçon.
- [ ] **Step 4 :** `LessonView` : consignes structurées, placeholder vidéo,
  contrôles (statut, étoiles, dates, notes, BPM + rappel tempo cible).
- [ ] **Step 5 :** Routing dans `App.tsx` (état de navigation simple, pas de
  routeur lourd nécessaire).
- [ ] **Step 6 :** Point de contrôle visuel des 3 écrans.

## Task 7: Identité app (icône Dock, fenêtre)

**Files:** `src-tauri/tauri.conf.json`, `src-tauri/icons/`

- [ ] **Step 1 :** Définir nom « T-Drum », titre de fenêtre, dimensions.
- [ ] **Step 2 :** Générer un jeu d'icônes (placeholder propre) via
  `pnpm tauri icon` → icône visible dans le Dock.
- [ ] **Step 3 :** Point de contrôle : `pnpm tauri dev` montre l'icône Dock.

## Task 8: Doc & hook

**Files:** `CLAUDE.md`, `.claude/settings.local.json`, `README.md`

- [ ] **Step 1 :** Mettre à jour `CLAUDE.md` (stack Tauri, suppression tests,
  commandes `pnpm tauri dev` / `pnpm tauri build`).
- [ ] **Step 2 :** Alléger le hook de commit : retirer `pnpm test`, garder
  `pnpm check` + `pnpm build` (ou `pnpm tauri build` si pertinent).
- [ ] **Step 3 :** README minimal.

## Validation finale

- [ ] `pnpm tauri dev` lance l'app, icône Dock visible.
- [ ] Chapitre 7 affiche le vrai contenu ; niveaux 8-23 en placeholder.
- [ ] Modifier une progression la persiste après redémarrage.
- [ ] **Demander validation utilisateur avant tout commit.**
