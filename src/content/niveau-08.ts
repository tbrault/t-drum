import type { Lesson, Niveau } from "./types";

/**
 * Niveau 8 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "8-1",
    niveau: 8,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 30 et 31.",
      echauffement: "Directement les exercices de la page 30.",
      objectifs:
        "Pour la page 30, jouer le moulin en nuances, avec un débit en doubles croches et en notes fantômes et faire ressortir les accents. Pour la page 31, nous allons récapituler notre travail en frisé, roulé et moulin dans un débit en notes fantômes.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien mémoriser les exercices A, B, C et D avant d'interpréter les marches.",
    },
  },
  {
    id: "8-2",
    niveau: 8,
    numero: 2,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 32.",
      echauffement: "Bien insister avec les exercices de la page 32.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Tu vas donc jouer des breaks, dans un débit de doubles croches, avec des notes avec les mains à la caisse claire, et des notes à la grosse caisse tout en marquant le tempo avec la pédale de charleston.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Comme pour la technique et l'indépendance, le travail de coordination est long à venir, le maître mot est de démarrer très lentement ! Tu gagneras du temps !",
    },
  },
  {
    id: "8-3",
    niveau: 8,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 33.",
      echauffement: "Bien insister avec les exercices de la page 32.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Avec ce binaire 13, tu vas combiner, dans les breaks, divers exercices travaillés avec la page 32.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "8-4",
    niveau: 8,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 22.",
      echauffement: "Bien insister avec les exercices de la page 22.",
      objectifs:
        "Tu vas découvrir le travail de l'indépendance à la caisse claire dans un débit de triolets de croches, tout en gardant ton chabada.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "A tempo lent, tu peux compter la division du temps (123 pour chaque temps) pour être sûr d'être ternaire et de jouer juste ! Par la suite tu peux compter les temps.",
    },
  },
  {
    id: "8-5",
    niveau: 8,
    numero: 5,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 23.",
      echauffement: "Revoir quelques exercices de la page 22.",
      objectifs:
        "Avec le solo 7, tu vas récapituler toutes tes connaissances en ternaire.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien déchiffrer les breaks avant de jouer par cycles de 4 mesures.",
    },
  },
  {
    id: "8-6",
    niveau: 8,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 32 et 33.",
      echauffement: "Directement les exercices.",
      objectifs:
        "Découvrir le double moulin et le triple moulin, en nuance forte et avec des notes fantômes et accents.",
      tempoCible: { min: 30, max: 60 },
      notes: "Bien mémoriser le doigté de ces 2 gestes techniques !",
    },
  },
  {
    id: "8-7",
    niveau: 8,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 34.",
      echauffement:
        "4 coups de chaque main, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs:
        "Découvrir le frisé de 4, en triolets de doubles croches, dans un débit de croches.",
      tempoCible: { min: 30, max: 80 },
      notes: "Bien mémoriser les exercices A et B !",
    },
  },
  {
    id: "8-8",
    niveau: 8,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexes",
      echauffement: "Exercices A et B de la page 34 du volume 2.",
      objectifs:
        "Utiliser le geste technique, frisé de 4, en triolets de doubles croches, en interprétant une marche célèbre de Maurice Ravel.",
      tempoCible: { min: 40, max: 72 },
      notes: "Bien mémoriser ce morceau de 2 mesures !",
    },
  },
  {
    id: "8-9",
    niveau: 8,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 34.",
      echauffement: "Voir directement les exercices de la page 34.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Tu vas donc jouer des breaks, dans un débit de doubles croches, avec des notes avec les mains à la caisse claire et toms, et des notes à la grosse caisse tout en marquant le tempo avec la pédale de charleston.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "8-10",
    niveau: 8,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 35.",
      echauffement: "Bien insister avec les exercices de la page 34.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Avec ce binaire 13, tu vas combiner, dans les breaks, divers exercices travaillés avec la page 34.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "8-11",
    niveau: 8,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 26.",
      echauffement: "Bien insister avec les exercices de la page 26.",
      objectifs:
        "Cours très important, tu vas découvrir le travail de l'indépendance des 4 membres dans un débit de triolets de croches, tout en gardant ton chabada.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "A tempo lent, tu peux compter la division du temps (123 pour chaque temps) pour être sûr d'être ternaire et de jouer juste ! Par la suite tu peux compter les temps.",
    },
  },
  {
    id: "8-12",
    niveau: 8,
    numero: 12,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 27.",
      echauffement: "Revoir surtout les exercices 2, 5 et 10 de la page 26.",
      objectifs:
        "Avec le solo 9, tu vas mettre en application toutes tes connaissances en ternaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "8-13",
    niveau: 8,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 40.",
      echauffement:
        "Revoir le frisé, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs:
        "Découvrir le jeu en nuances dans un débit de croches en doigté frisé.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien faire tourner en boucle chaque exercice avant de jouer la dernière ligne.",
    },
  },
  {
    id: "8-14",
    niveau: 8,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 41.",
      echauffement:
        "Le papa/maman, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs:
        "Découvrir le jeu en nuances dans un débit de croches en doigté roulé.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien faire tourner en boucle chaque exercice avant de jouer la dernière ligne.",
    },
  },
  {
    id: "8-15",
    niveau: 8,
    numero: 15,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 183.",
      echauffement:
        "4 frappes de chaque main, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs: "Savoir jouer en mesure 5/4.",
      tempoCible: { min: 40, max: 80 },
      notes: "Bien compter à haute voix !",
    },
  },
  {
    id: "8-16",
    niveau: 8,
    numero: 16,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 36.",
      echauffement: "Voir directement les exercices de la page 36.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Tu vas donc jouer des breaks, dans un débit de doubles croches, avec des notes avec les mains à la caisse claire et toms, et des notes à la grosse caisse tout en marquant le tempo avec la pédale de charleston mais en respectant les espaces (silences).",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "8-17",
    niveau: 8,
    numero: 17,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 37.",
      echauffement: "Revoir quelques exercices de la page 36.",
      objectifs:
        "Savoir combiner mains et pieds dans les breaks. Avec ce binaire 15, tu vas combiner, dans les breaks, divers exercices travaillés avec la page 36.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "8-18",
    niveau: 8,
    numero: 18,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 28.",
      echauffement: "Voir directement les exercices de la page 28.",
      objectifs:
        "Cours très important, tu vas découvrir le travail de l'indépendance des 4 membres dans un débit de triolets de croches, tout en gardant ton chabada mais en jouant aussi avec les toms par rapport à la page 26.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Pense à bien contrôler ta gestuelle, bras à la cymbale et poignets sur les fûts !",
    },
  },
  {
    id: "8-19",
    niveau: 8,
    numero: 19,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4 page 29.",
      echauffement: "Revoir surtout les exercices 2, 4, 6 et 8 de la page 28.",
      objectifs:
        "Avec le solo 10, tu vas mettre en application toutes tes connaissances en ternaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
];

export const niveau08: Niveau = {
  numero: 8,
  titre: "Moulins, coordination & indépendance ternaire",
  lessons,
};
