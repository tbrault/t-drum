import type { Lesson, Niveau } from "./types";

/**
 * Niveau 14 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "14-1",
    niveau: 14,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 74 et 75A.",
      echauffement: "Suivre directement la leçon de la page 74.",
      objectifs:
        "Développement de la technique en frisé. Remplissage de triolets de doubles croches, avec le geste technique frisé de 4, dans un débit de croches.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien détailler le frisé de 4, surtout dans les 1ers tempos ! C'est-à- dire jouer les 4 notes avec conviction, fort et avec un son égal !",
    },
  },
  {
    id: "14-2",
    niveau: 14,
    numero: 2,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 76.",
      echauffement: "Voir directement la leçon, à tempo lento.",
      objectifs:
        "Application du geste technique « le moulin » à la batterie. Utilisation de ce geste pour des grooves de toute beauté !",
      tempoCible: { min: 40, max: 60 },
      notes:
        "Bien insister sur les tempo lents afin de nuancer le jeu des mains et de bien synchroniser mains et pieds !",
    },
  },
  {
    id: "14-3",
    niveau: 14,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 77.",
      echauffement: "Déchiffrage directement des breaks à environ 30 BPM",
      objectifs:
        "Appliquer la leçon précédente en utilisant le moulin dans les rythmes et les breaks !",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 33 en entier.",
    },
  },
  {
    id: "14-4",
    niveau: 14,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 64/65.",
      echauffement:
        "Voir directement la leçon de la page 64, en insistant bien sur les exercices préparatoires.",
      objectifs:
        "Développer le sens du jeu ternaire, Jazz et plus particulièrement, le jeu en Big Band, en découvrant le jeu en valeur de notes avec un remplissage en triolets frisés.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Démarrer avec un débit à la caisse claire, le plus « piano » possible.",
    },
  },
  {
    id: "14-5",
    niveau: 14,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 76 et 77A.",
      echauffement: "Suivre directement la leçon de la page 76.",
      objectifs:
        "Développement de la technique en frisé. Remplissage de triolets de doubles croches, avec le geste technique frisé de 4, dans un débit de triolets de croches.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien détailler les frisé de 4, surtout dans les 1ers tempos ! C'est-à- dire jouer les 4 notes avec conviction, fort et avec un son égal !",
    },
  },
  {
    id: "14-6",
    niveau: 14,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 78.",
      echauffement: "Voir directement la leçon, à tempo lento.",
      objectifs:
        "Application du geste technique « le moulin » à la batterie. Utilisation du moulin II découvert dans le niveau 12 vidéo n.18, tirée du Volume III p.68.",
      tempoCible: { min: 40, max: 60 },
      notes:
        "Bien insister sur les tempo lents afin de nuancer le jeu des mains et de bien synchroniser mains et pieds !",
    },
  },
  {
    id: "14-7",
    niveau: 14,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 64, 65.",
      echauffement:
        "Voir directement la leçon de la page 64, en insistant bien sur les exercices préparatoires.",
      objectifs:
        "Développer le sens du jeu ternaire, Jazz et plus particulièrement, le jeu en Big Band, en découvrant le jeu en valeur de notes avec un remplissage en triolets roulés.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Démarrer avec un débit roulé bien détaillé à la caisse claire, c'est-à- dire, fort et régulier.",
    },
  },
  {
    id: "14-8",
    niveau: 14,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 78 et 79A.",
      echauffement: "Bien revoir le fla classique !",
      objectifs:
        "Développement de la technique en fla. Remplissage dans un débit de croches, doigté frisé, nuance piano, accents fla.",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Bien démarrer lentement en recherchant un beau débit régulier en notes fantômes et bien accentuer le coup fort du fla.",
    },
  },
  {
    id: "14-9",
    niveau: 14,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 Thème de la page 176.",
      echauffement:
        "Déchiffrer directement ce thème, mesure par mesure puis ligne par ligne, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer en ⅝.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Il est très important de s'ouvrir sur des mesures peu habituelles, mais utilisées en musique classique, en Rock progressif et Jazz Fusion !",
    },
  },
  {
    id: "14-10",
    niveau: 14,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 80 et 81.",
      echauffement:
        "Découvrir directement ces nouvelles interprétations, à tempo lento.",
      objectifs:
        "Développer l'indépendance en binaire, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant différents battements pour n'importe quel rythme.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Déchiffre bien chaque version et applique celle-ci sur n'importe quel rythme de la page 81.",
    },
  },
  {
    id: "14-11",
    niveau: 14,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 66/67.",
      echauffement:
        "Voir directement la leçon de la page 66, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développer le sens du jeu ternaire, Jazz et plus particulièrement, le jeu en Big Band, en découvrant le jeu le jeu des « annonces », c'est-à-dire, faire précéder les mises en place de l'orchestre, d'une ou plusieurs notes.",
      tempoCible: { min: 60, max: 120 },
      notes: "Bien compter les temps !",
    },
  },
  {
    id: "14-12",
    niveau: 14,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 80 et 81A.",
      echauffement: "Voir directement la leçon de la page 80.",
      objectifs:
        "Développement de la technique en fla. Remplissage dans un débit de triolets de croches, doigté frisé, nuance piano, accents fla.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en recherchant un beau débit régulier en notes fantômes et bien accentuer le coup fort du fla.",
    },
  },
  {
    id: "14-13",
    niveau: 14,
    numero: 13,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 82 et 83.",
      echauffement:
        "Découvrir, une à une, ces nouvelles interprétations, à tempo lento.",
      objectifs:
        "C'est le prolongement de la leçon précédente, en binaire : Développer l'indépendance, mais surtout, savoir varier et ainsi enrichir son jeu, en jouant différents battements tout en enchaînant des rythmes différents.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Déchiffre bien chaque version et travaille mesure par mesure et ligne par ligne, la page 83.",
    },
  },
  {
    id: "14-14",
    niveau: 14,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 70.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 70, c'est le rythme très utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz.",
      tempoCible: { min: 40, max: 120 },
      notes: "Pense à bien alterner chaque rythme avec le rythme n.1.",
    },
  },
  {
    id: "14-15",
    niveau: 14,
    numero: 15,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 84.",
      echauffement: "Quelques coups en répétition.",
      objectifs:
        "Développement de la technique du frisé, tout en changeant de débit. Savoir contrôler le passage de binaire au ternaire, tout en gardant le tempo !",
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit bien régulier, dans l'intensité, et surtout, un tempo bien maîtrisé !",
    },
  },
  {
    id: "14-16",
    niveau: 14,
    numero: 16,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 84 et 85.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Pour tes prochains breaks, savoir coordonner la grosse caisse avec des cymbales crash avec et sans remplissage.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur le compte du temps et du « et » pour une rigoureuse mise en place ! Et bien insister aussi, sur les tempo lents afin de bien synchroniser mains et pieds ! Dernier conseil, pense à être bien agressif avec la main faible qui frappe une crash synchro avec la grosse caisse.",
    },
  },
  {
    id: "14-17",
    niveau: 14,
    numero: 17,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 86.",
      echauffement:
        "Déchiffrage des 2 premières mesures de rythmes en boucle, puis, déchiffrage des breaks à environ 30 BPM.",
      objectifs: "Appliquer les leçons précédentes !",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks, puis amène les, progressivement à 40 BPM, avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 36 en entier.",
    },
  },
  {
    id: "14-18",
    niveau: 14,
    numero: 18,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 85.",
      echauffement: "Faire tourner les exercices du volume II page 12.",
      objectifs:
        "Développement de la technique du frisé, tout en changeant de débit. Savoir contrôler le passage de binaire au ternaire, savoir nuancer, tout en gardant le tempo !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit bien régulier, dans l'intensité, et surtout, un tempo bien maîtrisé ! Mémoriser au moins les 2 premières lignes et accélérer !",
    },
  },
];

export const niveau14: Niveau = {
  numero: 14,
  titre: "Frisé, moulin, fla & indépendance",
  lessons,
};
