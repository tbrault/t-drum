# T-Drum — Conventions projet

## Stack

- **App desktop** : Tauri 2 (coque native macOS, icône Dock) — backend Rust minimal
- **Runtime** : Node (voir `.nvmrc`), pnpm — Rust via `rustup`
- **Framework** : React 19 + TypeScript 5.9 + Vite
- **Styles** : Tailwind CSS 4 + thème custom « console de studio » (sombre, accent ambre)
- **Lint/Format** : Biome (`pnpm check` / `pnpm format`)
- **Tests** : aucun (app perso mono-utilisateur, choix assumé — YAGNI)

## Commandes

```bash
nvm use            # activer la bonne version Node
pnpm tauri dev     # lancer l'app desktop (dev)
pnpm tauri build   # bundler l'app macOS (.app + .dmg)
pnpm dev           # dev server front seul (preview navigateur)
pnpm build         # build front (tsc + vite)
pnpm check         # lint Biome
pnpm format        # lint + format Biome (--write)
```

## Vérification

Un hook Claude Code PreToolUse (config `.claude/settings.local.json`) lance avant commit :
1. `pnpm check` — lint Biome
2. `pnpm build` — compilation TypeScript + Vite

Le commit est bloqué si une étape échoue. (Pas de tests : volontairement retirés.)

## Langue

Code identifiers en anglais quand c'est l'usage ; commentaires, libellés UI et
contenu pédagogique en français.

## Style de code

<!-- Conventions au-delà de ce que Biome impose -->

## Structure du projet

```
src/
  content/      données statiques du cours (types + niveaux transcrits)
  progress/     types + store de progression (JSON local via Tauri)
  components/   composants UI partagés (LessonRow, MaitriseStars, …)
  routes/       écrans (Dashboard, NiveauView, LessonView)
  lib/          helpers (cn, meta couleurs/statuts, stats)
src-tauri/      backend Rust (commandes load/save_progress), config, icônes
docs/superpowers/  specs & plans
```

Trois couches séparées : **contenu** (statique), **progression** (état + I/O),
**UI** (consomme les deux, ne touche jamais au filesystem directement).

## Architecture

Approche pragmatique des principes clean code :

- **SOLID** : appliquer quand ça clarifie, pas pour une seule implémentation. Un composant avec une seule responsabilité oui, une interface pour un seul consommateur non.
- **DRY** : extraire à partir de 3 occurrences. 2 duplications similaires c'est OK — une abstraction prématurée coûte plus cher qu'un copier-coller.
- **KISS** : la solution la plus simple qui fonctionne. Pas d'abstraction "au cas où".
- **YAGNI** : ne pas coder pour des besoins hypothétiques.

## Composants

<!-- Conventions React : function/arrow, props, exports -->

## Tests

Pas de tests automatisés sur ce projet (app personnelle, un seul utilisateur).
Choix assumé : ne pas réintroduire Vitest/Playwright sans demande explicite.

## Git

<!-- Commits, branches, PR -->

## Design tokens

<!-- Utilisation des couleurs/spacing du thème -->

## Zones protégées

<!-- Fichiers/dossiers à ne pas modifier sans demande explicite -->

## Gotchas

<!-- Pièges non évidents du projet -->

## Planification

<!-- Comment aborder le travail avant de coder -->

## Outils disponibles

<!-- CLI et outils accessibles dans l'environnement -->

## Références

<!-- Pointeurs vers docs et ressources -->

## À ne pas faire

<!-- Anti-patterns et erreurs à éviter -->

## Amélioration continue

<!-- Auto-suggestion de mise à jour du CLAUDE.md -->

## Compaction

<!-- Ce que Claude doit préserver quand le contexte est compressé -->
