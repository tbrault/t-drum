#!/usr/bin/env bash
# Télécharge les échantillons d'instruments de l'accompagnement dans public/sons/.
#
#   bash scripts/telecharger-sons.sh
#
# Source : banque Musyng Kite convertie en MP3 par midi-js-soundfonts
# (https://github.com/gleitz/midi-js-soundfonts), licence CC BY-SA 3.0.
# Une note sur trois seulement dans la tessiture utile : l'app transpose les
# notes intermédiaires.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
BASE=https://gleitz.github.io/midi-js-soundfonts/MusyngKite

CLAVIER="C3 Eb3 Gb3 A3 C4 Eb4 Gb4 A4 C5 Eb5 Gb5 A5 C6"
BASSE="E1 G1 Bb1 Db2 E2 G2 Bb2 Db3 E3 G3"
TROMPETTE="E3 G3 Bb3 Db4 E4 G4 Bb4 Db5 E5 G5 Bb5"
GUITARE="E2 G2 Bb2 Db3 E3 G3 Bb3 Db4 E4 G4 Bb4 Db5 E5"

telecharger() {
  local instrument=$1
  shift
  mkdir -p "public/sons/$instrument"
  for note in "$@"; do
    curl -sSf -o "public/sons/$instrument/$note.mp3" "$BASE/$instrument-mp3/$note.mp3"
  done
  echo "$instrument : $# notes"
}

telecharger acoustic_grand_piano $CLAVIER
telecharger electric_piano_1 $CLAVIER
telecharger acoustic_bass $BASSE
telecharger electric_bass_finger $BASSE
telecharger trumpet $TROMPETTE
telecharger overdriven_guitar $GUITARE
telecharger electric_guitar_clean $GUITARE
