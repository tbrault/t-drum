import type { Lesson, Niveau } from "./types";

/**
 * Niveau 13 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "13-1",
    niveau: 13,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 68.",
      echauffement: "Le 1er exercice constitue un échauffement de 1er ordre !",
      objectifs:
        "Développement de la technique en coups en répétition (coups de la même main), en frisé et en roulé et travail du roulement en nuances.",
      tempoCible: { min: 60, max: 180 },
      notes:
        "- 3 paliers de vitesse pour les coups en répétition : 60/100/140 BPM puis 60/120/180 BPM\n- Pour le frisé et le roulé : de 40 à 80 BPM\n- Pour le roulement en nuances de 30 à 60 BPM puis de 40 à 80 BPM\n\nPage de référence pour bien s'échauffer et développer puis entretenir sa technique de caisse claire.",
    },
  },
  {
    id: "13-2",
    niveau: 13,
    numero: 2,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 72.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Pour tes prochains breaks, savoir coordonner la grosse caisse avec des cymbales crash dans un débit de doubles croches à la caisse claire.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur les tempo lents afin de bien synchroniser mains et pieds !",
    },
  },
  {
    id: "13-3",
    niveau: 13,
    numero: 3,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 58.",
      echauffement:
        "Déchiffrer directement mesure par mesure puis 2 mesures par 2 mesures puis ligne complète, chaque intervention de 4 mesures (les 4/4 !)",
      objectifs:
        "Développer le sens du jeu ternaire (Jazz) en découvrant des 4/4 plus difficiles.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "A tempo lento, tu peux compter le temps puis tu peux compter les mesures.",
    },
  },
  {
    id: "13-4",
    niveau: 13,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 59.",
      echauffement:
        "Déchiffrer directement mesure par mesure puis 2 mesures par 2 mesures puis ligne complète, chaque intervention de 4 mesures (les 4/4 !)",
      objectifs:
        "Développer et approfondir le sens du jeu ternaire (Jazz) en découvrant des 4/4 plus difficiles.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "A tempo lento, tu peux compter le temps puis tu peux compter les mesures.",
    },
  },
  {
    id: "13-5",
    niveau: 13,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 Thème A de la page 189.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer avec des changements de mesures.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "A tempo lento, tu peux compter le temps et le “et” puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "13-6",
    niveau: 13,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 73.",
      echauffement: "Déchiffrage directement des breaks à environ 30 BPM",
      objectifs: "Progresser en rythmes et breaks dans l'esprit Pop/Rock !",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 31 en entier.",
    },
  },
  {
    id: "13-7",
    niveau: 13,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 60 et 61.",
      echauffement:
        "Faire “tourner” le chabada en comptant aisément les temps à haute voix !",
      objectifs: "Découvrir le jeu spécifique du batteur de Big Band !",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Bien insister sur les exercices préparatoires, et surtout bien compter les temps car il s'agit, avant tout, d'un travail de lecture !",
    },
  },
  {
    id: "13-8",
    niveau: 13,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 Thème B de la page 189.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer avec des changements de mesures.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "A tempo lento, tu peux compter le temps et le “et” puis à partir de 60, environ, tu peux compter seulement les temps.",
    },
  },
  {
    id: "13-9",
    niveau: 13,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 164.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer le solfège syncopé.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "- En binaire : de 40 à 120 BPM\n- En ternaire : de 60 à 120 BPM\n\nPour la lecture binaire, à tempo lento, tu peux compter le temps et le “et” puis à partir de 60, environ, tu peux compter seulement les temps.\nEn ternaire tu peux à tempo lento, compter la division du temps (1/2/3 pour chacun des temps) et plus vite ne compter que le temps !",
    },
  },
  {
    id: "13-10",
    niveau: 13,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 74.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Pour tes prochains breaks, savoir coordonner la grosse caisse avec des cymbales crash sans remplissage.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur le compte du temps et du “et” pour une rigoureuse mise en place !\nEt bien insister aussi, sur les tempo lents afin de bien synchroniser mains et pieds !",
    },
  },
  {
    id: "13-11",
    niveau: 13,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 60 et 61.",
      echauffement:
        "Faire “tourner” le chabada en comptant aisément les temps à haute voix !",
      objectifs: "Découvrir le jeu spécifique du batteur de Big Band !",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Bien insister sur les exercices préparatoires, et surtout bien compter les temps car il s'agit, avant tout, d'un travail de lecture !",
    },
  },
  {
    id: "13-12",
    niveau: 13,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 166.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs:
        "Savoir lire et jouer le solfège syncopé, en binaire et en ternaire.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "- En binaire : de 40 à 120 BPM\n- En ternaire : de 60 à 120 BPM\n\nPour la lecture binaire, à tempo lento, tu peux compter le temps et le “et” puis à partir de 60, environ, tu peux compter seulement les temps.\nEn ternaire tu peux à tempo lento, compter la division du temps (1/2/3 pour chacun des temps) et au plus vite ne compter plus que le temps !",
    },
  },
  {
    id: "13-13",
    niveau: 13,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 167.",
      echauffement:
        "Déchiffrer directement ce thème, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs:
        "Savoir lire et jouer le solfège syncopé, en binaire et en ternaire.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "- En binaire : de 40 à 120 BPM\n- En ternaire : de 60 à 120 BPM\n\nPour la lecture binaire, à tempo lento, tu peux compter le temps et le “et” puis à partir de 60, environ, tu peux compter seulement les temps.\nEn ternaire tu peux à tempo lento, compter la division du temps (1/2/3 pour chacun des temps) et au plus vite ne compter plus que le temps !",
    },
  },
  {
    id: "13-14",
    niveau: 13,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 72, 73A.",
      echauffement:
        "Voir directement les exercices préparatoires de la page 72.",
      objectifs:
        "Savoir interpréter un thème rythmique en appliquant la leçon p.72, remplissage en doubles-croches doigté moulin, nuance piano.",
      tempoCible: { min: 40, max: 100 },
      notes: "Bien déchiffrer lentement, et accélérer progressivement.",
    },
  },
  {
    id: "13-15",
    niveau: 13,
    numero: 15,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 75.",
      echauffement: "Déchiffrage directement des breaks à environ 30 BPM.",
      objectifs:
        "Progresser en rythmes et breaks dans l'esprit Pop/Rock ! C'est le binaire représentatif du niveau, donc bien redoubler d'effort pour pousser ses limites, se l'approprier, en quelque sorte !",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 32 en entier.",
    },
  },
  {
    id: "13-16",
    niveau: 13,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 63.",
      echauffement:
        "Faire “tourner” le chabada en comptant aisément les temps à haute voix !",
      objectifs:
        "Découvrir le jeu spécifique du batteur de Big Band, ici en jouant ternaire du solfège syncopé !",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Bien insister sur les exercices préparatoires, et surtout bien compter les temps car il s'agit, avant tout, d'un travail de lecture syncopée !",
    },
  },
  {
    id: "13-17",
    niveau: 13,
    numero: 17,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Pages Annexe.",
      echauffement: "4 coups de chaque main.",
      objectifs:
        "Développement de la technique caisse claire en interprétant une marche dans le style Brésilien !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Bien déchiffrer lentement, mémoriser et accélérer progressivement.",
    },
  },
  {
    id: "13-18",
    niveau: 13,
    numero: 18,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 62 et 63.",
      echauffement:
        "Faire “tourner” le chabada en comptant aisément les temps à haute voix et bien insister sur les exercices préparatoires de la page 62 !",
      objectifs:
        "Découvrir le jeu spécifique du batteur de Big Band, ici en jouant ternaire le solfège syncopé et surtout en respectant les durées de notes !",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Bien insister sur les exercices préparatoires, et surtout bien compter les temps car il s'agit, avant tout, d'un travail de lecture syncopée !",
    },
  },
];

export const niveau13: Niveau = {
  numero: 13,
  titre: "Big Band, solfège syncopé & breaks Pop/Rock",
  lessons,
};
