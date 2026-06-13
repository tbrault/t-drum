import type { Lesson, Niveau } from "./types";

/**
 * Niveau 10 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "10-1",
    niveau: 10,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 44, 45.",
      echauffement: "Voir directement la leçon de la page 44.",
      objectifs:
        "Savoir interpréter un thème dans un débit de croches, doigté frisé, nuance piano !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème de la p.45.",
    },
  },
  {
    id: "10-2",
    niveau: 10,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 46, 47.",
      echauffement: "Voir directement la leçon de la page 46.",
      objectifs:
        "Savoir interpréter un thème dans un débit de croches roulées!",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème de la p.47.",
    },
  },
  {
    id: "10-3",
    niveau: 10,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 44.",
      echauffement:
        "Déchiffrer directement, mesure par mesure, puis par cycle de 4 mesures le binaire 19.",
      objectifs: "Savoir, en binaire, enchaîner des grooves différents.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur la précision des rythmes et rechercher un bel équilibre dans les 3 sons : charleston, caisse claire et grosse caisse.",
    },
  },
  {
    id: "10-4",
    niveau: 10,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 45.",
      echauffement: "Déchiffrer directement, le binaire 20.",
      objectifs:
        "Récapitulation des leçons précédentes, en rythmes et en breaks.",
      tempoCible: { min: 30, max: 60 },
      notes: "Déchiffrer l'introduction, puis le break avant de voir un cycle.",
    },
  },
  {
    id: "10-5",
    niveau: 10,
    numero: 5,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 36, 37.",
      echauffement: "Revoir les exercices n.2, 5, et 10 de la page 26.",
      objectifs:
        "Développer l'indépendance en 4/4, d'abord en remplissant l'espace sonore (12 croches par mesures) puis en jouant avec les silences !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Tu peux alterner une mesure de tempo avec chacun des exercices mais aussi jouer en boucle l'exercice.",
    },
  },
  {
    id: "10-6",
    niveau: 10,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 48, 49.",
      echauffement: "Voir directement la leçon de la page 48.",
      objectifs:
        "Savoir interpréter un thème dans un débit de triolets de croches, doigté frisé, nuance piano !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème de la p.49.",
    },
  },
  {
    id: "10-7",
    niveau: 10,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 50, 51.",
      echauffement: "Voir directement la leçon de la page 50.",
      objectifs:
        "Savoir interpréter un thème dans un débit de triolets de croches roulées.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur les exercices préparatoires avant de voir le thème de la p.51.",
    },
  },
  {
    id: "10-8",
    niveau: 10,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 46.",
      echauffement: "Déchiffrer directement chacun des rythmes proposés.",
      objectifs:
        "Savoir, en binaire-ternaire, c'est-à-dire jouer ternaire dans le style rock (binaire), avec 2 doigtés différents, soit les battements d'une seule main soit en frisé.",
      tempoCible: { min: 30, max: 80 },
      notes: "Bien démarrer lentement !",
    },
  },
  {
    id: "10-9",
    niveau: 10,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 47.",
      echauffement: "Revoir quelques rythmes de la p.46.",
      objectifs:
        "Savoir jouer en shuffle-rock, bien ternaire et avec l'énergie du rock.",
      tempoCible: { min: 20, max: 60 },
      notes:
        "Déchiffre le break d'introduction, puis le break avant de voir un cycle de 4 mesures.",
    },
  },
  {
    id: "10-10",
    niveau: 10,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 38.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Coordonner, à présent, mains et pieds dans nos breaks en jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "10-11",
    niveau: 10,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 39.",
      echauffement:
        "Déchiffre directement ce solo 13, représentatif du niveau, que nous te conseillons d' apprendre par cœur pour, notamment, jouer plus libéré !",
      objectifs:
        "Avec le solo 13, solo de 6 lignes, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance et te rapprocher du jeu des plus grands !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "10-12",
    niveau: 10,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 52.",
      echauffement: "Voir directement la leçon de la page 52.",
      objectifs: "Travail des nuances dans un débit de triolets roulés.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur ces exercices préparatoires avant de voir, dans le prochain cours, une marche importante !",
    },
  },
  {
    id: "10-13",
    niveau: 10,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 53.",
      echauffement:
        "Voir les exercices 1 et 3 de la page 52, en nuance forte puis piano.",
      objectifs: "Interpréter une des marches de référence, de notre école !",
      tempoCible: { min: 30, max: 100 },
      notes:
        "Marche à apprendre par cœur pour, notamment, bien gérer le changement de zones de frappe pour les nuances !",
    },
  },
  {
    id: "10-14",
    niveau: 10,
    numero: 14,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 48.",
      echauffement: "Déchiffre directement les rythmes de la p.48.",
      objectifs:
        "Pousser plus loin la coordination et surtout la synchronisation des sons dans un débit de doubles croches en doigté frisé à la charleston.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Tu peux démarrer, très, très lentement, sans métronome. Le fait de bien décomposer les gestes, te permet d'éviter de te reprendre et ainsi, gagner du temps !",
    },
  },
  {
    id: "10-15",
    niveau: 10,
    numero: 15,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 49.",
      echauffement: "Revoir quelques rythmes de la p.48.",
      objectifs: "Inclure des breaks dans tes grooves en doubles croches.",
      tempoCible: { min: 20, max: 60 },
      notes:
        "Déchiffre bien chacun des breaks avant de voir chaque cycle de 4 mesures.",
    },
  },
];

export const niveau10: Niveau = {
  numero: 10,
  titre: "Croches, triolets, breaks & indépendance jazz",
  lessons,
};
