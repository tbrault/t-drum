# T-Drum

App desktop macOS (Tauri) de suivi de progression pour la formation batterie
— niveaux 7 à 23, trois volumes. Le contenu pédagogique (consignes) est intégré
au code ; la progression personnelle est sauvegardée en local.

## Prérequis

- [Node](https://nodejs.org) (voir `.nvmrc`) + [pnpm](https://pnpm.io)
- [Rust](https://rustup.rs) (toolchain stable, pour Tauri)

## Démarrage

```bash
pnpm install
pnpm tauri dev      # lance l'app desktop
```

## Build

```bash
pnpm tauri build    # génère le .app et le .dmg dans src-tauri/target/release/bundle
```

## État (v1)

- ✅ App Tauri lançable, icône Dock (tambour)
- ✅ Tableau de bord, vue niveau (leçons groupées par volume), détail leçon
- ✅ Suivi : statut, maîtrise, dates, notes, BPM atteint — persisté en local
- ✅ Niveau 7 transcrit ; niveaux 8-23 en placeholder « à venir »
- ⏳ À venir : transcription des autres niveaux, import/lecture des vidéos,
  backing tracks & partitions (Annexes)

Voir `docs/superpowers/specs/` et `docs/superpowers/plans/` pour le design et le
plan d'implémentation.
