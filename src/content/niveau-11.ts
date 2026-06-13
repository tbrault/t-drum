import type { Lesson, Niveau } from "./types";

/**
 * Niveau 11 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "11-1",
    niveau: 11,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 185.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer en mesure 6/4.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "A tempo lento, tu peux compter le temps et le « et » puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "11-2",
    niveau: 11,
    numero: 2,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 40.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir jouer dans un débit de triolets de croches, doigté frisé, dans des breaks en jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-3",
    niveau: 11,
    numero: 3,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 41.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir jouer dans un débit de triolets de croches, doigté roulé, dans des breaks en jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-4",
    niveau: 11,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 42.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir jouer dans un débit de triolets de croches, doigté frisé, et coordonner des cymbales crash avec la grosse caisse, dans des breaks en jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-5",
    niveau: 11,
    numero: 5,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 43.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir jouer dans un débit de triolets de croches, doigté roulé, et coordonner des cymbales crash avec la grosse caisse, dans des breaks en jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-6",
    niveau: 11,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 187.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les 1ers tempo !",
      objectifs: "Savoir lire et jouer en mesure 7/4.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "A tempo lento, tu peux compter le temps et le « et » puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "11-7",
    niveau: 11,
    numero: 7,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 54.",
      echauffement: "Déchiffre directement les rythmes de la p.54.",
      objectifs: "Savoir jouer des rythmes avec un battement à la noire.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter les temps et les « et », pour être tout de suite en place, on mémorise et on peut accélérer !",
    },
  },
  {
    id: "11-8",
    niveau: 11,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 55.",
      echauffement: "Revoir quelques rythmes de la p.54.",
      objectifs: "Inclure des breaks dans les grooves abordés dans la page 54.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures.",
    },
  },
  {
    id: "11-9",
    niveau: 11,
    numero: 9,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 44.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir coordonner, dans un débit de triolets de croches, les mains et les pieds pour donner de très beaux breaks en jazz. Ici, la grosse sera jouée sur les temps.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Ici, il faut absolument faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-10",
    niveau: 11,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 45.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir coordonner, dans un débit de triolets de croches, les mains et les pieds pour donner de très beaux breaks en jazz. Ici, la grosse caisse sera jouée en l'air, sur les 3ème croches de chaque temps.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Ici, il faut absolument faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "11-11",
    niveau: 11,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 54, 55.",
      echauffement: "Voir directement la leçon de la page 54.",
      objectifs: "Savoir interpréter ternaire, un thème écrit en binaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème A, de la p.55.",
    },
  },
  {
    id: "11-12",
    niveau: 11,
    numero: 12,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 56.",
      echauffement:
        "Déchiffre directement les rythmes de la p.56 en comptant bien à haute voix.",
      objectifs:
        "Savoir jouer des rythmes avec un battement, à la charleston, sur les « et ».",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter les temps et les « et », pour être tout de suite en place, on mémorise et on peut accélérer !",
    },
  },
  {
    id: "11-13",
    niveau: 11,
    numero: 13,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 57.",
      echauffement: "Revoir quelques rythmes de la p.56.",
      objectifs: "Inclure des breaks dans les grooves abordés dans la page 56.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures. Ce binaire 25, représentatif du niveau, est à apprendre par coeur !",
    },
  },
  {
    id: "11-14",
    niveau: 11,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 46.",
      echauffement:
        "Voir directement les exercices de la page, en comptant les temps !",
      objectifs: "Savoir quitter le chabada traditionnel !",
      tempoCible: { min: 40, max: 120 },
      notes: "Bien compter les temps.",
    },
  },
  {
    id: "11-15",
    niveau: 11,
    numero: 15,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 47.",
      echauffement:
        "Voir directement les exercices de la page, en comptant les temps !",
      objectifs:
        "Savoir quitter le chabada traditionnel, avec des découpes de triolets de noires.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Avant de bien compter les temps, tu peux compter la division du temps en 3 parties égales (triolets de croches) 1/2/3 pour chaque temps.",
    },
  },
  {
    id: "11-16",
    niveau: 11,
    numero: 16,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 56, 57.",
      echauffement: "Voir directement la leçon de la page 56.",
      objectifs:
        "Savoir interpréter ternaire, un thème écrit en binaire, avec un remplissage en croches ternaires, soit en shuffle.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème A, de la p.57.",
    },
  },
  {
    id: "11-17",
    niveau: 11,
    numero: 17,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 58, 59.",
      echauffement: "Voir directement la leçon de la page 58.",
      objectifs:
        "Savoir interpréter ternaire, un thème écrit en binaire, avec un remplissage en bâtons mêlés.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème A, de la p.59.",
    },
  },
  {
    id: "11-18",
    niveau: 11,
    numero: 18,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 58.",
      echauffement:
        "Déchiffre directement les rythmes de la p.58 en démarrant lentement.",
      objectifs:
        "Savoir jouer des rythmes avec un battement en croche/ 2 doubles.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter les temps et les « et », pour être tout de suite en place, on mémorise et on peut accélérer !",
    },
  },
  {
    id: "11-19",
    niveau: 11,
    numero: 19,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 59.",
      echauffement: "Revoir quelques rythmes de la p.58.",
      objectifs: "Inclure des breaks dans les grooves abordés dans la page 58.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures.",
    },
  },
  {
    id: "11-20",
    niveau: 11,
    numero: 20,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 48.",
      echauffement:
        "Voir directement les exercices de la page, en comptant les temps !",
      objectifs: "Savoir quitter le chabada traditionnel !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien compter les temps. Pense à jouer franchement la ride avec une belle amplitude de la gestuelle et tu peux jouer, en 2ème étude, des notes fantômes, à la caisse claire.",
    },
  },
  {
    id: "11-21",
    niveau: 11,
    numero: 21,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 49.",
      echauffement:
        "Voir directement les exercices de la page, en comptant les temps !",
      objectifs:
        "Savoir quitter le chabada traditionnel, en voyant 3 nouvelles façons de faire sonner la cymbale ride.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Tu peux, bien sûr, alterner une mesure de tempo avec chacun des exercices.",
    },
  },
  {
    id: "11-22",
    niveau: 11,
    numero: 22,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 60, 61.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Interpréter, binaire, un thème en le jouant d'une seule main.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Pense à bien nuancer ton jeu, le chant fort et le remplissage en nuance piano.",
    },
  },
  {
    id: "11-23",
    niveau: 11,
    numero: 23,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 62, 63.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Interpréter, ternaire, un thème en le jouant d'une seule main.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Pense à bien nuancer ton jeu, le chant fort et le remplissage en nuance piano.",
    },
  },
  {
    id: "11-24",
    niveau: 11,
    numero: 24,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 60.",
      echauffement:
        "Déchiffre directement les rythmes de la p.60 en démarrant lentement.",
      objectifs:
        "Savoir jouer des rythmes avec un battement en 2 doubles croches/croche.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter les temps et les « et », pour être tout de suite en place, on mémorise et on peut accélérer !",
    },
  },
  {
    id: "11-25",
    niveau: 11,
    numero: 25,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 61.",
      echauffement: "Revoir quelques rythmes de la p.60.",
      objectifs: "Inclure des breaks dans les grooves abordés dans la page 60.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 27 en entier.",
    },
  },
  {
    id: "11-26",
    niveau: 11,
    numero: 26,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 50.",
      echauffement:
        "Déchiffre directement ce solo 14, représentatif du niveau, que nous te conseillons d' apprendre par cœur pour, notamment, jouer plus libéré, et bien contrôler le jeu à la cymbale ride !",
      objectifs:
        "Avec le solo 14, solo de 2 pages, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance et te rapprocher du jeu des plus grands !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "11-27",
    niveau: 11,
    numero: 27,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 51.",
      echauffement:
        "Déchiffre directement la 2ème page de ce solo 14, représentatif du niveau, que nous te conseillons d' apprendre par cœur pour, notamment, jouer plus libéré, et bien contrôler le jeu à la cymbale ride !",
      objectifs:
        "Avec le solo 14, solo de 2 pages, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance et te rapprocher du jeu des plus grands ! A apprendre par cœur, au moins l'une des 2 pages.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !!",
    },
  },
];

export const niveau11: Niveau = {
  numero: 11,
  titre: "Mesures impaires, ternaire & jeu jazz",
  lessons,
};
