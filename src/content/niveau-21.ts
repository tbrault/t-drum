import type { Lesson, Niveau } from "./types";

/**
 * Niveau 21 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "21-1",
    niveau: 21,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement:
        "Lire directement en coup simple, sans remplissage en comptant à haute voix et en jouant l'ostinato aux pieds.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème syncopé en 3 temps, tout en développant la coordination avec les pieds.",
      tempoCible: { min: 40, max: 180 },
      notes:
        "Bien jouer fort les pieds, à tempo lento, pour bien synchroniser tes sons à tempo rapide.",
    },
  },
  {
    id: "21-2",
    niveau: 21,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement:
        "Bien suivre les exercices préparatoires afin de bien synchroniser mains et pieds.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant, ternaire, un thème syncopé en 3 temps, tout en développant la coordination et la synchronisation mains et pieds.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien jouer fort les pieds, à tempo lento, pour bien synchroniser tes sons à tempo rapide.",
    },
  },
  {
    id: "21-3",
    niveau: 21,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 132 et 133.",
      echauffement:
        "Découvrir l'exemple détaillé de chaque version de la page 132 avant de l'appliquer p.133, et à tempo lento.",
      objectifs:
        "Développer l'indépendance, ici en ⅞, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant des battements différents.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Déchiffre impérativement en comptant pour bien maîtriser la mesure.",
    },
  },
  {
    id: "21-4",
    niveau: 21,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 92.",
      echauffement:
        "Voir directement les exercices de la page, en alternant une mesure de chabada et l'exercice.",
      objectifs:
        "Voir des phrases clés en indépendance ternaire, avec la pédale de charleston tout en gardant le chabada. Il s'agit, ici, de tendre vers l'étude du Jazz moderne où les éléments de l'instrument n'ont plus forcément une fonction propre.",
      tempoCible: { min: 60, max: 160 },
      notes: "Chaque exercice est à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "21-5",
    niveau: 21,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 167.",
      echauffement:
        "Lire directement ce thème, remplissage de croches, doigté frisé, nuances piano, en comptant à haute voix et en jouant l'ostinato aux pieds.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème syncopé en 4 temps, tout en développant la coordination avec les pieds.",
      tempoCible: { min: 60, max: 240 },
      notes:
        "Bien jouer fort les pieds, à tempo lento, pour bien synchroniser tes sons à tempo rapide.",
    },
  },
  {
    id: "21-6",
    niveau: 21,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 132 et 133.",
      echauffement:
        "Découvrir l'exemple détaillé de chaque version de la page 132 avant de l'appliquer p.133, et à tempo lento.",
      objectifs:
        "Développer l'indépendance, ici en ⅞, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant des battements différents.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Déchiffre impérativement en comptant pour bien maîtriser la mesure.",
    },
  },
  {
    id: "21-7",
    niveau: 21,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 167.",
      echauffement:
        "Lire directement ce thème, remplissage de triolets de croches, doigté frisé, nuances piano, en comptant à haute voix et en jouant la charleston au pied sur les 2ème et 4ème temps, puis en remplissage de triolets roulés.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème syncopé en ternaire et en 4 temps, tout en développant la coordination avec les pieds.",
      tempoCible: { min: 60, max: 140 },
      notes:
        "Toujours bien insister à jouer le remplissage en frisé le plus piano possible et insister à jouer forte en roulé, à tempo lento.",
    },
  },
  {
    id: "21-8",
    niveau: 21,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Page annexe.",
      echauffement: "Bien suivre les exercices préparatoires.",
      objectifs:
        "Interprétation d'un thème rythmique dans le style Afro-Ternaire tout en finesse. Lecture cymbale main forte et remplissage notes fantômes à la caisse claire avec la main inverse, sans oublier un ostinato aux pieds.",
      tempoCible: { min: 40, max: 120 },
      notes: "Bien voir mesure par mesure puis ligne par ligne.",
    },
  },
  {
    id: "21-9",
    niveau: 21,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Page annexe.",
      echauffement: "Bien suivre les exercices préparatoires.",
      objectifs:
        "Interprétation d'un thème rythmique dans le style Afro-Ternaire tout en puissance. Lecture dôme de la cymbale main forte et remplissage aux toms avec la main inverse, sans oublier un ostinato aux pieds.",
      tempoCible: { min: 40, max: 120 },
      notes: "Bien voir mesure par mesure puis ligne par ligne.",
    },
  },
  {
    id: "21-10",
    niveau: 21,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 136.",
      echauffement: "Déchiffre à tempo lento chacun des rythmes de la page.",
      objectifs:
        "Développer l'indépendance, ici en 9/8 binaire, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant des battements différents comme proposé dans la page 132.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Déchiffre impérativement en comptant pour bien maîtriser la mesure.",
    },
  },
  {
    id: "21-11",
    niveau: 21,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Page annexe.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Mélange de débit binaire ternaire avec l'emploi des triolets de noires",
      tempoCible: { min: 60, max: 120 },
      notes: "Bien voir mesure par mesure puis ligne par ligne.",
    },
  },
  {
    id: "21-12",
    niveau: 21,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 174.",
      echauffement: "Voir l'explication des 2 interprétations, à tempo lento.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème écrit dans un débit de doubles croches, avec un remplissage de doubles croches, doigté frisé, nuances piano, puis avec un remplissage de doubles croches roulées, en comptant à haute voix, à tempo lento, et en jouant des noires à la grosse caisse.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer forte en roulé.",
    },
  },
  {
    id: "21-13",
    niveau: 21,
    numero: 13,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 138.",
      echauffement: "Déchiffre à tempo lento chacun des rythmes de la page.",
      objectifs:
        "Développer l'indépendance, ici en 11/8 binaire, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant des battements différents comme proposé dans la page 132.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Déchiffre impérativement en comptant pour bien maîtriser la mesure.",
    },
  },
  {
    id: "21-14",
    niveau: 21,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 175.",
      echauffement: "Voir l'explication des 2 interprétations, à tempo lento.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème écrit en 6/8 dans un débit de croches, avec un remplissage de croches, doigté frisé, nuances piano, puis avec un remplissage de croches roulées, en comptant à haute voix, à tempo lento, et en jouant des noires, au pied, à la charleston.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer forte en roulé.",
    },
  },
  {
    id: "21-15",
    niveau: 21,
    numero: 15,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 171.",
      echauffement:
        "Jouer, à tempo lento, le mélange de débit frisé/roulé en quintolets de doubles croches, et quintolets de doubles croches roulées.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, avec notamment le changement de débit triolets/quintolets et un beau travail de nuances.",
      tempoCible: { min: 40, max: 76 },
      notes:
        "Cette marche, avec le final des rigodon, constitue l'étude représentative du niveau, et donc, est à apprendre par cœur.",
    },
  },
  {
    id: "21-16",
    niveau: 21,
    numero: 16,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 140.",
      echauffement:
        "Voir directement le déchiffrage de la première page de ce magnifique solo de batterie.",
      objectifs:
        "Nous allons, ici, rendre hommage à Tony Williams qui incarne les racines de la modernité.",
      tempoCible: { min: 30, max: 110 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Pièce représentative du niveau à apprendre par coeur !",
    },
  },
  {
    id: "21-17",
    niveau: 21,
    numero: 17,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 173.",
      echauffement:
        "Voir directement, à tempo lento, le mélange de débit frisé/roulé en septolets. puis le mélange sextolets/septolets, puis la 1ère mesure en boucle, en démarrant lentement avant d'accélérer et d'entendre le débit en sept.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, avec notamment le changement de débit sextolets/septolets.",
      tempoCible: { min: 40, max: 60 },
      notes:
        "Cette marche, avec les 3 dianes, constitue l'étude représentative du niveau, et donc, est à apprendre par cœur.",
    },
  },
  {
    id: "21-18",
    niveau: 21,
    numero: 18,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 141.",
      echauffement:
        "Voir directement le déchiffrage de la deuxième page de ce magnifique solo de batterie.",
      objectifs:
        "Nous allons, ici, rendre hommage à Tony Williams qui incarne les racines de la modernité.",
      tempoCible: { min: 30, max: 110 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Pièce représentative du niveau à apprendre par coeur !",
    },
  },
  {
    id: "21-19",
    niveau: 21,
    numero: 19,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 141.",
      echauffement:
        "Voir directement le déchiffrage de la deuxième page de ce magnifique solo de batterie.",
      objectifs:
        "Nous allons, ici, rendre hommage à Tony Williams qui incarne les racines de la modernité.",
      tempoCible: { min: 30, max: 110 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Pièce représentative du niveau à apprendre par coeur !",
    },
  },
];

export const niveau21: Niveau = {
  numero: 21,
  titre: "Mesures composées, indépendance & solos modernes",
  lessons,
};
