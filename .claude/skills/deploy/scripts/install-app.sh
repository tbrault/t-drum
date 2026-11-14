#!/bin/bash
# Compile T-Drum en release et remplace l'app installée dans /Applications.
# L'app installée n'est touchée qu'une fois la compilation réussie et vérifiée.
set -euo pipefail

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
APP_NAME="T-Drum.app"
BIN_REL="Contents/MacOS/t-drum"
INSTALLED="/Applications/$APP_NAME"
BUNDLE="$ROOT/src-tauri/target/release/bundle/macos/$APP_NAME"
DATA="$HOME/Library/Application Support/com.teddy.tdrum/progress.json"
TMP_BASE="${TMPDIR:-/tmp}"
BACKUP="${TMP_BASE%/}/t-drum-deploy"

step() { printf '\n==> %s\n' "$1"; }
fail() { printf '\nERREUR : %s\n' "$1" >&2; exit 1; }
plist_version() {
  /usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$1/Contents/Info.plist"
}

cd "$ROOT"

# Node du .nvmrc (nvm ne supporte ni `set -e` ni `set -u`).
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  set +eu
  . "$HOME/.nvm/nvm.sh"
  nvm use >/dev/null
  set -eu
fi

VERSION="$(node -p "require('./package.json').version")"
step "Compilation de T-Drum $VERSION (node $(node --version), pnpm $(pnpm --version))"
pnpm tauri build --bundles app

[ -d "$BUNDLE" ] || fail "bundle introuvable : $BUNDLE"
BUILT="$(plist_version "$BUNDLE")"
[ "$BUILT" = "$VERSION" ] ||
  fail "le bundle est en $BUILT alors que package.json est en $VERSION (versions désynchronisées ?)"

step "Fermeture de l'app installée"
pkill -TERM -f "$INSTALLED/$BIN_REL" 2>/dev/null || true
n=0
while pgrep -f "$INSTALLED/$BIN_REL" >/dev/null; do
  [ "$n" -lt 15 ] || fail "l'app installée ne se ferme pas ; ferme-la à la main puis relance"
  sleep 1
  n=$((n + 1))
done

# Après la fermeture : l'app n'écrit plus dans progress.json.
step "Sauvegarde dans $BACKUP"
mkdir -p "$BACKUP"
if [ -f "$DATA" ]; then
  cp -p "$DATA" "$BACKUP/progress.json"
fi

step "Remplacement de $INSTALLED"
rm -rf "${BACKUP:?}/$APP_NAME"
if [ -d "$INSTALLED" ]; then
  mv "$INSTALLED" "$BACKUP/$APP_NAME"
fi
ditto "$BUNDLE" "$INSTALLED"

NOW="$(plist_version "$INSTALLED")"
[ "$NOW" = "$VERSION" ] || fail "l'app installée est en $NOW au lieu de $VERSION"
if [ -f "$BACKUP/progress.json" ]; then
  cmp -s "$BACKUP/progress.json" "$DATA" || fail "progress.json a changé pendant l'installation"
fi

step "Réouverture"
open "$INSTALLED"
n=0
until pgrep -f "$INSTALLED/$BIN_REL" >/dev/null; do
  [ "$n" -lt 15 ] || fail "l'app installée ne démarre pas"
  sleep 1
  n=$((n + 1))
done

printf '\nOK : T-Drum %s est installée dans /Applications et rouverte.\n' "$VERSION"
printf 'Ancienne app et copie de la progression : %s\n' "$BACKUP"
