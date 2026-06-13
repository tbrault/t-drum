import type { Lesson, Niveau } from "./types";

/**
 * Niveau 15 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "15-1",
    niveau: 15,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 82 et 83A.",
      echauffement: "Voir directement la leçon de la page 82.",
      objectifs:
        "Développement de la technique en fla. Remplissage dans un débit de doubles croches, doigté frisé, nuance piano, accents en fla.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant un beau débit régulier en notes fantômes et bien accentuer le coup fort du ou des fla.",
    },
  },
  {
    id: "15-2",
    niveau: 15,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 179.",
      echauffement:
        "Déchiffrer directement ce thème, mesure par mesure puis ligne par ligne, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer en 7/8.",
      tempoCible: { min: 40, max: 80 },
    },
  },
  {
    id: "15-3",
    niveau: 15,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 87.",
      echauffement:
        "Découvrir directement ces nouveaux rythmes, à tempo lento.",
      objectifs:
        "Développer son sens du groove, en jouant des doubles croches de la même main et pour varier et ainsi enrichir son jeu.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Déchiffre bien chacun des rythmes en gardant cette accentuation bien particulière.",
    },
  },
  {
    id: "15-4",
    niveau: 15,
    numero: 4,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 94.",
      echauffement:
        "4 coups de chaque main, en démarrant lentement et en accélérant.",
      objectifs:
        "Développement de la technique du frisé de 3, mais dans un débit de doubles croches.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit bien régulier, dans l'intensité, et surtout, un tempo bien maîtrisé !",
    },
  },
  {
    id: "15-5",
    niveau: 15,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 95.",
      echauffement:
        "4 coups de chaque main, en démarrant lentement et en accélérant.",
      objectifs:
        "Développement de la technique du frisé de 4, mais dans un débit de doubles croches.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit bien régulier, dans l'intensité, et surtout, un tempo bien maîtrisé !",
    },
  },
  {
    id: "15-6",
    niveau: 15,
    numero: 6,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 71.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 71, c'est, aussi, un rythme très utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz.",
      tempoCible: { min: 40, max: 120 },
      notes: "Pense à bien alterner chaque rythme avec le rythme n.1.",
    },
  },
  {
    id: "15-7",
    niveau: 15,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 86 et 87.",
      echauffement:
        "Voir directement la leçon de la page 86, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développement de la technique en mélangeant un débit, en frisé et en notes fantômes, des accents en coups simples et le roulé !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit en nuance « piano » et jouer un roulé bien détaillé, bien fort !",
    },
  },
  {
    id: "15-8",
    niveau: 15,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 88.",
      echauffement: "Faire tourner quelques rythmes de la page 87.",
      objectifs:
        "Développer son sens du jeu binaire, en interprétant un solo du grand Steve Gadd, en appliquant, notamment, la rythmique étudiée page 87, des doubles croches de la même main.",
      tempoCible: { min: 40, max: 70 },
      notes: "Cette étude est à mémoriser !",
    },
  },
  {
    id: "15-9",
    niveau: 15,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 89.",
      echauffement: "Faire tourner quelques rythmes de la page 87.",
      objectifs:
        "Développer son sens du jeu binaire, en interprétant un solo du grand Steve Gadd, en appliquant, notamment, la rythmique étudiée page 87, des doubles croches de la même main.",
      tempoCible: { min: 40, max: 70 },
      notes: "Cette étude est à mémoriser !",
    },
  },
  {
    id: "15-10",
    niveau: 15,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 72.",
      echauffement:
        "Bien faire tourner chaque exercice en boucle avant d'alterner avec une mesure de chabada en 3 temps, par exemple le n.1 de la page 70.",
      objectifs:
        "Développer la coordination ternaire en 3 temps pour des breaks (des fills) dans le style valse Jazz.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "En 2ème étude, tu peux aussi alterner 2 mesures de tempo et 2 fois l'exercice.",
    },
  },
  {
    id: "15-11",
    niveau: 15,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 73.",
      echauffement:
        "Bien faire tourner chaque exercice en boucle avant d'alterner avec une mesure de chabada en 3 temps, par exemple le n.1 de la page 70.",
      objectifs:
        "Développer la coordination ternaire en 3 temps pour des breaks (des fills) dans le style valse Jazz.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "En 2ème étude, tu peux aussi alterner 2 mesures de tempo et 2 fois l'exercice.",
    },
  },
  {
    id: "15-12",
    niveau: 15,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 88 et 89.",
      echauffement:
        "Voir directement la leçon de la page 88, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développement de la technique en mélangeant un débit, en frisé et en notes fantômes, des accents en coups simples et le roulé ternaire !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit en nuance « piano » et jouer un roulé ternaire bien détaillé, bien fort, et en souplesse en accélérant !",
    },
  },
  {
    id: "15-13",
    niveau: 15,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 90 et 91.",
      echauffement:
        "Voir directement la leçon de la page 90, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développement de la technique en mélangeant un débit, en frisé et en notes fantômes, des accents en coups simples et le roulé binaire !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit en nuance « piano » et jouer un roulement binaire bien détaillé, bien fort, et en souplesse en prenant de la vitesse !",
    },
  },
  {
    id: "15-14",
    niveau: 15,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 74.",
      echauffement:
        "Déchiffre directement ce solo 17, représentatif du niveau, que nous te conseillons d'apprendre par cœur pour, notamment, jouer plus libéré, d'être plus dans ta musique et bien contrôler ce jeu en 3 temps !",
      objectifs:
        "Avec le solo 17, solo de 2 pages, tu vas mettre en application toutes tes connaissances en 3 temps ternaires !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "15-15",
    niveau: 15,
    numero: 15,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 75.",
      echauffement:
        "Déchiffre directement cette 2ème page du solo 17, représentatif du niveau, que nous te conseillons d'apprendre par cœur pour, notamment, jouer plus libéré, d'être plus dans ta musique et bien contrôler ce jeu en 3 temps.",
      objectifs:
        "Avec le solo 17, solo de 2 pages, tu vas mettre en application toutes tes connaissances en 3 temps ternaires, indépendance, coordination et avec swing !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "15-16",
    niveau: 15,
    numero: 16,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 92.",
      echauffement:
        "Voir directement les exercices préparatoires de cette page 92.",
      objectifs:
        "Bien se préparer au déchiffrage d'une marche du grand batteur Steve Gadd, que nous aborderons dans la prochaine leçon. Nous verrons, notamment, un mélange de débit en frisé et en moulin, le roulement en nuances, avec retombée en note fantôme…",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Conseil très important, bien démarrer lentement, afin de contrôler, de main de maître, sa technique !",
    },
  },
  {
    id: "15-17",
    niveau: 15,
    numero: 17,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 93.",
      echauffement: "Voir directement la marche.",
      objectifs: "Développement et affirmation de sa technique de caisse.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Conseil toujours très important, bien démarrer lentement, avant d'accélérer progressivement.",
    },
  },
];

export const niveau15: Niveau = {
  numero: 15,
  titre: "Technique de caisse, indépendance ternaire & valse Jazz",
  lessons,
};
