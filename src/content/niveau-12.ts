import type { Lesson, Niveau } from "./types";

/**
 * Niveau 12 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "12-1",
    niveau: 12,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 45 thème B.",
      echauffement: "Voir ou revoir la leçon de la page 44.",
      objectifs:
        "Savoir interpréter un thème dans un débit de croches, doigté frisé, nuance piano, mais avec plus d'accents et plus d'espaces qu'avec le thème A.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème B de la p.45.",
    },
  },
  {
    id: "12-2",
    niveau: 12,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 47 thème B",
      echauffement: "Voir ou revoir la leçon de la page 46.",
      objectifs:
        "Savoir interpréter un thème dans un débit de croches roulées, mais avec plus d'accents, à la suite et plus d'espaces, donc plus de roulés, qu'avec le thème A.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème B de la p.47.",
    },
  },
  {
    id: "12-3",
    niveau: 12,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 188 thème A",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer avec des changements de mesures.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "A tempo lento, tu peux compter le temps et le « et » puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "12-4",
    niveau: 12,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 62 et 63.",
      echauffement: "Voir directement cette leçon de la page 62.",
      objectifs:
        "Développer sa technique grosse caisse, en interprétant une lecture rythmique à la grosse caisse.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien compter les temps et les « et », et accélérer progressivement.",
    },
  },
  {
    id: "12-5",
    niveau: 12,
    numero: 5,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 52 et 53.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Revoir des phrases clés en ternaire et découvrir un nouvel exercice de coordination.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Pour la page 53 tempo, très très lent, bien décomposer les gestes pour intégrer plus facilement et plus durablement le motif ! Bien compter les temps. Pense à jouer franchement la ride avec une belle amplitude de la gestuelle et ne jouer les toms, qu'avec les poignets.",
    },
  },
  {
    id: "12-6",
    niveau: 12,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 49 thème B",
      echauffement: "Voir ou revoir directement la leçon de la page 48.",
      objectifs:
        "Savoir interpréter un thème dans un débit de triolets de croches, doigté frisé, nuance piano, mais avec plus d'accents à la suite et plus d'espace à gérer que dans le thème A.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème B de la p.49",
    },
  },
  {
    id: "12-7",
    niveau: 12,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 51 thème B.",
      echauffement: "Voir ou revoir les explications de la page 50.",
      objectifs:
        "Savoir interpréter un thème dans un débit de triolets de croches roulées avec plus d'accents à la suite et plus d'espaces à gérer, donc plus de roulés, que dans le thème A.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème B de la p.51.",
    },
  },
  {
    id: "12-8",
    niveau: 12,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 64 et 65.",
      echauffement: "Voir directement cette leçon.",
      objectifs: "Développer sa faculté à faire chanter sa cymbale ride.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien compter les temps et les « et », et accélérer progressivement.",
    },
  },
  {
    id: "12-9",
    niveau: 12,
    numero: 9,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 54",
      echauffement:
        "Déchiffre directement ce solo 15, représentatif du niveau, que nous te conseillons d'apprendre par cœur pour, notamment, jouer plus libéré, d'être plus dans la musique et bien contrôler le jeu à la cymbale ride !",
      objectifs:
        "Avec le solo 15, solo de 2 pages, en hommage au grand Elvin Jones, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance et te rapprocher du jeu des plus grands justement !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "12-10",
    niveau: 12,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 55",
      echauffement: "Déchiffre directement cette deuxième page.",
      objectifs:
        "Avec le solo 15, solo de 2 pages, en hommage au grand Elvin Jones, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance et te rapprocher du jeu des plus grands justement !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier ! Essaye d'apprendre par cœur au moins l'une des 2 pages, sinon en entier, bien sûr.",
    },
  },
  {
    id: "12-11",
    niveau: 12,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 64 et 65.",
      echauffement: "Voir directement la leçon de la page 64.",
      objectifs:
        "Savoir interpréter un thème dans un débit de doubles croches, doigté frisé, nuance piano.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir les thèmes de la p.65.",
    },
  },
  {
    id: "12-12",
    niveau: 12,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 66 et 67.",
      echauffement: "Voir directement la leçon de la page 66.",
      objectifs:
        "Savoir interpréter un thème dans un débit de doubles croches roulées.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir les thèmes de la p.67.",
    },
  },
  {
    id: "12-13",
    niveau: 12,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 188 thème B",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer avec des changements de mesures.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "A tempo lento, tu peux compter le temps et le « et » puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "12-14",
    niveau: 12,
    numero: 14,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 66.",
      echauffement: "Voir directement cette leçon.",
      objectifs: "Nuancer ton jeu, à la caisse claire, dans tes grooves.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien compter les temps et les « et », mémoriser et accélérer progressivement.",
    },
  },
  {
    id: "12-15",
    niveau: 12,
    numero: 15,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 67",
      echauffement: "Revoir quelques rythmes de la p.66.",
      objectifs: "Inclure des breaks dans les grooves abordés dans la page 66.",
      tempoCible: { min: 20, max: 40 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 28 en entier. Attention à bien nuancer ta caisse claire avec des belles notes fantômes et de beaux accents.",
    },
  },
  {
    id: "12-16",
    niveau: 12,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 56",
      echauffement:
        "Déchiffre directement, mesure par mesure puis ligne par ligne cet enchaînements de 4 mesures de breaks qui représentent, en jazz, un solo de 4 mesures appelé un 4/4 !",
      objectifs:
        "Avoir du vocabulaire et te donner des idées, pour qu'en contexte musical, tu es matière à jouer et ainsi, t'aider à improviser.",
      tempoCible: { min: 40, max: 80 },
    },
  },
  {
    id: "12-17",
    niveau: 12,
    numero: 17,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 57",
      echauffement:
        "Déchiffre directement, mesure par mesure puis ligne par ligne cet enchaînements de 4 mesures de breaks qui représentent, en jazz, un solo de 4 mesures appelé un 4/4 !",
      objectifs:
        "Avoir du vocabulaire et te donner des idées, pour qu'en contexte musical, tu es matière à jouer et ainsi, t'aider à improviser.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "12-18",
    niveau: 12,
    numero: 18,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 68, 69.",
      echauffement: "Voir directement cette leçon.",
      objectifs:
        "Varier ton jeu, dans tes grooves, en utilisant le doigté du moulin.",
      tempoCible: { min: 40, max: 90 },
      notes:
        "Bien compter les temps et les « et », mémoriser et accélérer progressivement. Pour le Binaire 29, déchiffre, d'abord à tempo lento, les breaks, bien sûr.",
    },
  },
  {
    id: "12-19",
    niveau: 12,
    numero: 19,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 69 et 70.",
      echauffement:
        "Échauffement en frisé roulé, par exemple : 2 temps doubles croches en frisé et 2 temps doubles croches roulées, lentement et en accélérant progressivement.",
      objectifs:
        "Savoir interpréter un thème, avec déplacement d'accents, dans un débit de doubles croches doigté frisé et en doubles croches croulées.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Démarre bien lentement et compte bien pour bien garder ta grosse caisse sur le temps !",
    },
  },
  {
    id: "12-20",
    niveau: 12,
    numero: 20,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 71.",
      echauffement:
        "Échauffement en frisé roulé, par exemple : 2 temps doubles croches en frisé et 2 temps doubles croches roulées, lentement et en accélérant progressivement.",
      objectifs:
        "Mettre en application le travail effectué avec les pages 68 et 69. Apprendre par cœur cette marche, représentative du niveau.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Démarre bien lentement et compte bien pour bien garder ta grosse caisse sur le temps !",
    },
  },
  {
    id: "12-21",
    niveau: 12,
    numero: 21,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 70.",
      echauffement: "Voir directement cette leçon.",
      objectifs:
        "Varier ton jeu, en binaire, avec de beaux grooves, en quittant un battement fixe à la charleston.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien compter les temps et les « et », mémoriser avant d'accélérer progressivement.",
    },
  },
  {
    id: "12-22",
    niveau: 12,
    numero: 22,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 71.",
      echauffement: "Revoir quelques rythmes de la p.70.",
      objectifs:
        "Inclure des breaks dans les grooves abordés dans la page 70. Apprendre par cœur ce texte représentatif du niveau et qui récapitule tout le travail effectué à ce jour !",
      tempoCible: { min: 20, max: 40 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 30 en entier.",
    },
  },
];

export const niveau12: Niveau = {
  numero: 12,
  titre: "Thèmes, breaks & indépendance ternaire-binaire",
  lessons,
};
