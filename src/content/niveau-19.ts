import type { Lesson, Niveau } from "./types";

/**
 * Niveau 19 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "19-1",
    niveau: 19,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 120, 121.",
      echauffement: "Faire tourner en boucle chaque exercice préparatoire.",
      objectifs:
        "Interprétation en remplissage de doubles croches, doigté moulin, nuance piano, avec triolets de croches de la même main sur les noires.",
      tempoCible: { min: 60, max: 100 },
      notes:
        "En 2ème étude, à la batterie, nous pourrons distribuer les triolets sur les toms !",
    },
  },
  {
    id: "19-2",
    niveau: 19,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 190.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Mélange de mesures 2/4 et ⅝ puis 4/4 et 5/8, avec 2 façons de jouer aux pieds.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Le tempo lent et le compte sont particulièrement recommandés pour cette étude !",
    },
  },
  {
    id: "19-3",
    niveau: 19,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 120, 121.",
      echauffement:
        "Voir directement chaque application des exercices préparatoires de la page 120, à tempo lento.",
      objectifs:
        "Développer sa technique de chant cymbale, en interprétant une lecture rythmique à la cymbale tout en jouant un rythme avec les autres éléments de la batterie et ce, en 12/8. Travail de l'indépendance des 4 membres. Développer la synchronisation et la coordination des sons. Découverte de la polyrythmie !",
      tempoCible: { min: 30, max: 70 },
      notes:
        "Bien compter la division du temps à tempo lento et compter seulement les temps à tempo plus rapide.",
    },
  },
  {
    id: "19-4",
    niveau: 19,
    numero: 4,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 122, 123.",
      echauffement: "Faire tourner en boucle chaque exercice préparatoire.",
      objectifs:
        "Interprétation en remplissage de doubles croches, doigté moulin, nuance piano, avec triolets de croches en doigté frisé sur les noires.",
      tempoCible: { min: 60, max: 120 },
      notes:
        "En 2ème étude, à la batterie, nous pourrons distribuer les triolets sur les toms !",
    },
  },
  {
    id: "19-5",
    niveau: 19,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 154, 155.",
      echauffement:
        "Faire tourner en boucle chaque exercice préparatoire à 60 BPM.",
      objectifs:
        "Développement de la technique du frisé tout en jouant avec un changement de débit. Interprétation en remplissage de triolets de croches, doigté frisé, nuance piano, avec des quintolets de doubles croches sur les noires en nuance forte.",
      tempoCible: { min: 60, max: 130 },
      notes:
        "En 2ème étude, à la batterie, nous pouvons alterner une mesure de chabada et une mesure d'exercice pour sortir des stéréotypes, jouer des 4/4 (4 mesures de chabada/4 mesures d'interprétation de la p.155) à l'instar des Christian Vander, Peter Erskine et plus avant, Buddy Rich…",
    },
  },
  {
    id: "19-6",
    niveau: 19,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 154, 155.",
      echauffement:
        "Faire tourner en boucle chaque exercice préparatoire à 60 BPM.",
      objectifs:
        "Développement de la technique du frisé tout en jouant avec un changement de débit. Interprétation en remplissage de triolets de croches, doigté frisé, nuance piano, avec des quintolets de doubles croches sur les noires en nuance forte.",
      tempoCible: { min: 60, max: 130 },
      notes:
        "En 2ème étude, à la batterie, nous pouvons alterner une mesure de chabada et une mesure d'exercice pour sortir des stéréotypes, jouer des 4/4 (4 mesures de chabada/4 mesures d'interprétation de la p.155) à l'instar des Christian Vander, Peter Erskine et plus avant, Buddy Rich…",
    },
  },
  {
    id: "19-7",
    niveau: 19,
    numero: 7,
    volume: 3,
    hasVideo: false,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 122.",
      echauffement:
        "Découvrir directement ces nouveaux rythmes, à tempo lento.",
      objectifs:
        "Développer son sens du groove, dans l'esprit Blues, blues-rock, soul music, r&b, jazz-fusion etc…",
      tempoCible: { min: 30, max: 70 },
      notes:
        "Faire suffisamment « tourner » ces rythmes, pour les mémoriser et ainsi jouer, avec maîtrise, et à placer sous forme de breaks rythmiques, en alternant avec un groove plus conventionnel.",
    },
  },
  {
    id: "19-8",
    niveau: 19,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 168.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs:
        "Savoir lire et jouer le solfège syncopé, en binaire et en ternaire.",
      tempoCible: { min: 40, max: 160 },
      notes:
        "Pour la lecture binaire, à tempo lento, tu peux compter le temps et le « et » puis à partir de 60, environ, tu peux compter seulement les temps. Nous pouvons passer en C barré pour des tempos plus rapides et monter à 80 à la blanche (soit 160 à la noire). En ternaire tu peux à tempo lento, compter la division du temps (1/2/3 pour chacun des temps) et à tempo rapide, ne compter plus que les temps !",
    },
  },
  {
    id: "19-9",
    niveau: 19,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 124.",
      echauffement:
        "Découvrir directement ces nouveaux rythmes, à tempo lento.",
      objectifs:
        "Développer son sens du groove, en binaire/ternaire (binaire dans le sens Rock, ternaire car tourne ternaire) et déchiffrage du célèbre rythme joué par Jeff Porcaro de Toto : « rosanna » !",
      tempoCible: { min: 30, max: 70 },
      notes:
        "Faire suffisamment « tourner » ces rythmes, pour les mémoriser et ainsi jouer, avec maîtrise pour les faire « sonner ».",
    },
  },
  {
    id: "19-10",
    niveau: 19,
    numero: 10,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 173.",
      echauffement:
        "Voir directement, à tempo lento, 1ère ligne, la 1ère mesure puis 2ème ligne, la 2ème mesure puis 2ème ligne la 3ème mesure.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, avec notamment la recherche de la maîtrise des fla !",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Cette marche, avec le rigodon 6, constitue l'étude représentative du niveau, pour ton évolution en technique de caisse claire et donc est à apprendre par cœur.",
    },
  },
  {
    id: "19-11",
    niveau: 19,
    numero: 11,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 125.",
      echauffement:
        "Découvrir directement ces nouveaux rythmes, à tempo lento.",
      objectifs:
        "Développer son sens du groove en binaire/ternaire et utilisation du geste technique double-moulin (« volant » dans la terminologie de l'étude du tambour).",
      tempoCible: { min: 30, max: 70 },
      notes:
        "Faire suffisamment « tourner » ces rythmes, pour les mémoriser et ainsi jouer, avec maîtrise pour les faire « sonner ».",
    },
  },
  {
    id: "19-12",
    niveau: 19,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 173.",
      echauffement:
        "Voir directement, à tempo lento, 1ère ligne, la 1ère mesure puis 2ème ligne, la 2ème mesure puis 2ème ligne la 3ème mesure.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, avec notamment le changement de débit sextolets/septolets.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Cette marche, avec le rigodon 5, constitue l'étude représentative du niveau, et donc est à apprendre par cœur.",
    },
  },
  {
    id: "19-13",
    niveau: 19,
    numero: 13,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Voir directement, à tempo lento, la leçon.",
      objectifs:
        "Ouverture vers des rythmes typiques. 2 versions plus recherchées que précédemment.",
      tempoCible: { min: 40, max: 140 },
      notes:
        "Il est important de bien entendre chaque élément, joué, à l'origine par plusieurs percussionnistes.",
    },
  },
  {
    id: "19-14",
    niveau: 19,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Déchiffrage de chaque breaks à 40 bpm",
      objectifs:
        "T'aider à placer des breaks pour des tournes Afro-Cubaines comme le rythme Bembe.",
      tempoCible: { min: 40, max: 140 },
      notes:
        "Bien déchiffrer chaque break avant d'alterner 3 mesures de rythmes et un break ou à tempo rapide comme 130 BPM, 7 mesures de rythmes et 1 break.",
    },
  },
];

export const niveau19: Niveau = {
  numero: 19,
  titre: "Remplissage, groove & lecture syncopée",
  lessons,
};
