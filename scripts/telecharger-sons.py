#!/usr/bin/env python3
"""Télécharge et prépare les échantillons d'instruments de l'accompagnement.

    python3 -I scripts/telecharger-sons.py

Chaque note est un vrai enregistrement, pris dans une banque libre (voir
public/sons/CREDITS.md). Le script la ramène en mono 44,1 kHz, coupe le
silence du début (toutes les notes partent pile sur le temps), raccourcit les
notes très longues avec un fondu, puis l'écrit en FLAC dans public/sons/.

Besoin : macOS (afconvert) et Python 3, rien d'autre.
"""

import array
import pathlib
import struct
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request
import wave

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = RACINE / "public" / "sons"
FREQ = 44100

NB = "https://nbrosowsky.github.io/tonejs-instruments/samples/"
SFZ = "https://raw.githubusercontent.com/sfzinstruments/"
RHODES = SFZ + "jlearman.jRhodes3d/master/jRhodes3d-mono/"
MEATBASS = SFZ + "karoryfer.meatbass/master/Samples/pizz/"


def diese(note):
    """Nom de fichier d'une note : « D#3 » → « Ds3 »."""
    return note.replace("#", "s")


def serie(base, notes, fichier):
    return [(diese(n), base + fichier(n)) for n in notes.split()]


# instrument → (durée maximale en secondes, [(note, adresse)])
INSTRUMENTS = {
    # Piano à queue Yamaha C5 (Salamander Grand Piano).
    "piano": (
        6,
        serie(
            "https://tonejs.github.io/audio/salamander/",
            "C3 D#3 F#3 A3 C4 D#4 F#4 A4 C5 D#5 F#5 A5 C6",
            lambda n: diese(n) + ".mp3",
        ),
    ),
    # Rhodes Mark I de 1977 (jRhodes3d), nuance moyenne.
    "rhodes": (
        6,
        [
            ("A2", RHODES + "A_045__A2_3.flac"),
            ("D3", RHODES + "A_050__D3_3.flac"),
            ("G3", RHODES + "A_055__G3_3.flac"),
            ("B3", RHODES + "A_059__B3_3.flac"),
            ("D4", RHODES + "A_062__D4_3.flac"),
            ("F4", RHODES + "A_065__F4_3.flac"),
            ("B4", RHODES + "A_071__B4_2.flac"),
        ],
    ),
    # Contrebasse jouée aux doigts (Karoryfer Meatbass).
    "contrebasse": (
        4,
        serie(
            MEATBASS,
            "Eb1 Gb1 A1 C2 Eb2 Gb2 A2 C3 Eb3 Gb3",
            lambda n: n.lower() + "_vl3_rr1.wav",
        ),
    ),
    "basse": (
        5,
        serie(
            NB + "bass-electric/",
            "E1 G1 A#1 C#2 E2 G2 A#2 C#3 E3 G3",
            lambda n: diese(n) + ".mp3",
        ),
    ),
    "guitare": (
        4.5,
        serie(
            NB + "guitar-electric/",
            "C#2 E2 F#2 A2 C3 D#3 F#3 A3 C4 D#4 F#4 A4 C5 D#5 F#5 A5",
            lambda n: diese(n) + ".mp3",
        ),
    ),
    "trompette": (
        5,
        serie(
            NB + "trumpet/",
            "F3 A3 C4 D#4 F4 G4 A#4 D5 F5 A5 C6",
            lambda n: diese(n) + ".mp3",
        ),
    ),
}


def afconvert(*arguments):
    subprocess.run(["afconvert", *arguments], check=True, capture_output=True)


def lire_wav(octets):
    """Canaux et échantillons d'un WAV 16 bits (y compris « extensible »)."""
    canaux, donnees, i = 1, b"", 12
    while i + 8 <= len(octets):
        nom = octets[i : i + 4]
        taille = struct.unpack("<I", octets[i + 4 : i + 8])[0]
        if nom == b"fmt ":
            canaux = struct.unpack("<H", octets[i + 10 : i + 12])[0]
        elif nom == b"data":
            donnees = octets[i + 8 : i + 8 + taille]
        i += 8 + taille + taille % 2
    return canaux, donnees[: len(donnees) // 2 * 2]


def lire_mono(source, travail):
    """Décode un fichier audio en échantillons mono 16 bits à 44,1 kHz."""
    brut = travail / "brut.wav"
    afconvert("-f", "WAVE", "-d", f"LEI16@{FREQ}", str(source), str(brut))
    canaux, donnees = lire_wav(brut.read_bytes())
    sons = array.array("h", donnees)
    if sys.byteorder == "big":
        sons.byteswap()
    if canaux == 1:
        return sons
    voies = [sons[c::canaux] for c in range(canaux)]
    return array.array("h", (sum(v) // canaux for v in zip(*voies)))


def preparer(sons, duree_max):
    """Coupe le silence du début, limite la durée, adoucit les deux bouts."""
    pic = max(max(sons), -min(sons))
    seuil = pic * 0.01
    debut = next(i for i, x in enumerate(sons) if abs(x) > seuil)
    debut = max(0, debut - FREQ * 2 // 1000)  # 2 ms de marge avant l'attaque
    fin = min(len(sons), debut + int(duree_max * FREQ))
    coupe = fin < len(sons)
    sons = sons[debut:fin]
    entree = FREQ // 1000  # fondu d'entrée d'1 ms : pas de « clic »
    for i in range(min(entree, len(sons))):
        sons[i] = sons[i] * i // entree
    sortie = int((0.4 if coupe else 0.02) * FREQ)
    n = len(sons)
    for i in range(min(sortie, n)):
        sons[n - 1 - i] = sons[n - 1 - i] * i // sortie
    return sons


def ecrire_flac(sons, destination, travail):
    propre = travail / "propre.wav"
    with wave.open(str(propre), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(FREQ)
        if sys.byteorder == "big":
            sons = array.array("h", sons)
            sons.byteswap()
        w.writeframes(sons.tobytes())
    afconvert("-f", "flac", "-d", "flac", str(propre), str(destination))


def main():
    with tempfile.TemporaryDirectory() as tmp:
        travail = pathlib.Path(tmp)
        for instrument, (duree_max, notes) in INSTRUMENTS.items():
            dossier = SORTIE / instrument
            dossier.mkdir(parents=True, exist_ok=True)
            for ancien in dossier.glob("*.flac"):
                ancien.unlink()
            total = 0
            for note, adresse in notes:
                extension = pathlib.PurePosixPath(
                    urllib.parse.urlparse(adresse).path
                ).suffix
                source = travail / f"source{extension}"
                urllib.request.urlretrieve(adresse, source)
                sons = preparer(lire_mono(source, travail), duree_max)
                destination = dossier / f"{note}.flac"
                ecrire_flac(sons, destination, travail)
                total += destination.stat().st_size
            print(f"{instrument} : {len(notes)} notes, {total // 1024} Ko")


if __name__ == "__main__":
    main()
