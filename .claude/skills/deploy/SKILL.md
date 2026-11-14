---
name: deploy
description: Déploie T-Drum de bout en bout — vérifie, met à jour la version et le changelog, commite sur main, pousse sur GitHub, compile l'app en release et remplace celle installée dans /Applications. À utiliser dès que l'utilisateur dit « déploie », « deploy », « livre », « mets l'app à jour », « installe la nouvelle version », « commit + push + réinstalle », ou veut voir ses changements dans la vraie app installée, même sans prononcer le mot « deploy ».
---

# Déployer T-Drum

T-Drum est une app perso mono-utilisateur : « déployer » veut dire amener le
code de `main` jusqu'à l'app installée dans `/Applications`, en passant par
GitHub.

Lancer cette skill vaut accord de l'utilisateur pour **toute** la chaîne
(commit, push, compilation, remplacement de l'app installée). Il l'a créée
précisément pour ne plus valider chaque étape : enchaîner sans demander de
confirmation intermédiaire, et ne s'arrêter que si une étape échoue.

## Étapes

Travailler depuis la racine du dépôt, avec la version de Node du `.nvmrc`
(`source ~/.nvm/nvm.sh && nvm use` dans chaque commande shell, l'état du shell
ne persiste pas d'un appel à l'autre).

### 1. État des lieux

- `git branch --show-current` doit répondre `main`. Le projet vit uniquement
  sur `main`, sans branche parallèle : sur une autre branche, s'arrêter et le
  signaler plutôt que de déployer un code inattendu.
- `git status -sb` pour savoir s'il y a des changements à commiter et des
  commits à pousser. S'il n'y a ni l'un ni l'autre, passer directement à
  l'étape 6 : l'app installée peut quand même être en retard sur `main`.

### 2. Vérification

Lancer `pnpm check` puis `pnpm build`. Si l'un des deux échoue, s'arrêter et
montrer l'erreur : on ne commite pas un code qui ne passe pas (il n'y a pas de
tests automatisés sur ce projet, ces deux commandes sont le seul filet).

### 3. Version et changelog

S'il y a des changements non commités qui touchent l'app (`src/`,
`src-tauri/`, dépendances), la version doit monter selon le type du commit :

| Type de commit | Incrément | Exemple |
|---|---|---|
| `feat` | mineur | 1.1.0 → 1.2.0 |
| `fix` | correctif | 1.1.0 → 1.1.1 |
| `chore`, `docs`, `refactor`… | aucun | 1.1.0 |

Comparer la version de `package.json` à celle de `HEAD`
(`git show HEAD:package.json`). Si elle est déjà montée, ne pas la remonter.
Sinon la mettre à jour aux **quatre** endroits, qui doivent rester identiques :

- `package.json` (c'est elle qu'affiche le pied de page de l'accueil)
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `src-tauri/Cargo.lock` (entrée `name = "t-drum"`)

Ajouter ensuite en tête de `CHANGELOG.md` une entrée `## X.Y.Z — AAAA-MM-JJ`
décrivant le changement en français, du point de vue de l'utilisateur
(rubriques `### Ajouté`, `### Corrigé`, `### Modifié`). Relancer `pnpm build`
après un changement de version.

### 4. Commit

- Indexer les fichiers du changement par leur nom (pas de `git add -A`
  aveugle). `.claude/skills/` et `.claude/launch.json` font partie du projet
  et se commitent ; ne jamais indexer de fichier `*.local.json`, `.env` ou
  contenant un secret.
- Message au format Conventional Commits, en français, comme l'historique :
  `feat: …`, `fix: …`, `chore: …`. Un corps de quelques lignes explique le
  pourquoi. Terminer par la ligne d'attribution demandée par la session.
- Un seul commit par déploiement, version et changelog inclus.

### 5. Push

`git push origin main`. Si le push est refusé parce que le distant a avancé,
s'arrêter et l'expliquer : ne jamais forcer (`--force`) ni réécrire
l'historique pour passer.

### 6. Compilation et réinstallation

Sauter cette étape seulement si les deux conditions sont réunies : rien de ce
qui est déployé ne touche l'app (aucun changement dans `src/`, `src-tauri/`,
`index.html`, `package.json`, `pnpm-lock.yaml` ou la config Vite depuis la
dernière installation) **et** l'app installée est déjà à la version de
`package.json`. Recompiler dans ce cas ne changerait rien et fermerait l'app
sous les doigts de l'utilisateur ; le dire dans le compte rendu.

Sinon, lancer le script fourni, en arrière-plan ou avec un délai long (la
compilation release prend d'une à plusieurs minutes) :

```bash
.claude/skills/deploy/scripts/install-app.sh
```

Il compile le bundle `.app`, vérifie que sa version correspond à
`package.json`, ferme l'app si elle tourne, sauvegarde la progression,
remplace `/Applications/T-Drum.app`, puis la rouvre. Il s'arrête à la première
erreur sans toucher à l'app installée tant que la compilation n'a pas réussi.

Ne pas lancer `pnpm tauri dev` pour « montrer » le résultat : cela ouvre une
seconde fenêtre T-Drum à côté de l'app installée, ce que l'utilisateur prend
pour un doublon.

### 7. Compte rendu

Terminer par un résumé court, en français, sans jargon :

- la version déployée et le titre du commit ;
- la confirmation que GitHub et le local sont au même commit ;
- la confirmation que l'app installée est à la bonne version et rouverte ;
- ce qui a échoué ou a été sauté, le cas échéant.

## Données de l'utilisateur

La progression vit hors de l'app, dans
`~/Library/Application Support/com.teddy.tdrum/progress.json` : remplacer
l'app ne la touche pas. Le script en fait quand même une copie avant chaque
remplacement, et garde l'ancienne app, dans le dossier temporaire qu'il
affiche à la fin. Ne jamais modifier ni supprimer `progress.json`.
