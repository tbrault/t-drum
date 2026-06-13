import type { Lesson, Niveau } from "./types";

/**
 * Niveau 9 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "9-1",
    niveau: 9,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 42.",
      echauffement: "Quelques frappes en frisé ou en roulé.",
      objectifs:
        "Développer ta technique caisse claire en travaillant les rudiments du tambour.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien mémoriser ces rudiments avant d'interpréter les marches des prochains cours.",
    },
  },
  {
    id: "9-2",
    niveau: 9,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 43.",
      echauffement: "Quelques rudiments appris dans la précédente vidéo.",
      objectifs:
        "Développer ta technique caisse claire en travaillant une marche de référence en tambour militaire !",
      tempoCible: { min: 30, max: 80 },
      notes: "Bien travailler posément avant d'accélérer.",
    },
  },
  {
    id: "9-3",
    niveau: 9,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 43.",
      echauffement: "Quelques rudiments appris dans la précédente vidéo.",
      objectifs:
        "Développer, là aussi, ta technique caisse claire en travaillant une marche de référence en tambour militaire !",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Nous t'invitons à apprendre par cœur cette marche ou la marche de la leçon précédente, représentative du niveau.",
    },
  },
  {
    id: "9-4",
    niveau: 9,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 38.",
      echauffement: "Voir directement les rythmes de la page 38.",
      objectifs:
        "Savoir maîtriser l'ouverture ET la fermeture de la pédale charleston.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "9-5",
    niveau: 9,
    numero: 5,
    volume: 3,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 3 page 39.",
      echauffement: "Revoir quelques rythmes de la page 38.",
      objectifs:
        "Savoir maîtriser l'ouverture ET la fermeture de la pédale charleston dans un groove et avant un break.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Nous t'invitons à apprendre par cœur ce beau binaire, représentatif du niveau.",
    },
  },
  {
    id: "9-6",
    niveau: 9,
    numero: 6,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 30.",
      echauffement: "Faire tourner quelques mesures de chabada.",
      objectifs:
        "Tu vas poursuivre le travail de l'indépendance à la caisse claire, toms, grosse caisse dans un débit de triolets de croches, tout en gardant ton chabada.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien insister sur les exercices chiffres impairs qui préparent bien avant la venue aux toms.",
    },
  },
  {
    id: "9-7",
    niveau: 9,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4 page 31.",
      echauffement: "Revoir les exercices 2, 4, 6 et 8 de la page 30.",
      objectifs:
        "Avec le solo 11, solo de 6 lignes, tu vas mettre en application toutes tes connaissances en ternaire et travailler l'endurance.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier.",
    },
  },
  {
    id: "9-8",
    niveau: 9,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 le thème de la page 178.",
      echauffement:
        "3 frappes de chaque main, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs: "Savoir jouer en mesure 9/8.",
      tempoCible: { min: 30, max: 60 },
      notes: "A tempo lento, tu peux compter 1,2,3 pour chaque temps.",
    },
  },
  {
    id: "9-9",
    niveau: 9,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 le thème de la page 181.",
      echauffement:
        "3 frappes de chaque main, en démarrant lentement et en accélérant progressivement (durée 2 ou 3 minutes).",
      objectifs: "Savoir lire et jouer en mesure 12/8.",
      tempoCible: { min: 30, max: 60 },
      notes: "A tempo lento, tu peux compter 123 pour chaque temps !",
    },
  },
  {
    id: "9-10",
    niveau: 9,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 40.",
      echauffement: "Voir directement les rythmes de la page 40.",
      objectifs:
        "Savoir synchroniser la caisse et la grosse caisse simultanément.",
      tempoCible: { min: 30, max: 80 },
    },
  },
  {
    id: "9-11",
    niveau: 9,
    numero: 11,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 41.",
      echauffement: "Revoir quelques rythmes de la page 40.",
      objectifs:
        "Savoir maîtriser l'ouverture et la fermeture de la charleston et prendre un peu de vitesse !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Voir d'abord les breaks avant de jouer, chaque ligne plusieurs fois, et en entier pour terminer.",
    },
  },
  {
    id: "9-12",
    niveau: 9,
    numero: 12,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 42.",
      echauffement: "Voir directement les rythmes de la page 42.",
      objectifs:
        "Savoir maîtriser l'ouverture ET la fermeture de la pédale charleston dans des rythmes Funk, joués dans un débit, aux mains, doigté frisé, de doubles croches à la charleston.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Au déchiffrage, détaille bien ton jeu pour ne pas te reprendre. Attention le n.10 est difficile, fait le bien tourner lentement !",
    },
  },
  {
    id: "9-13",
    niveau: 9,
    numero: 13,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 43.",
      echauffement: "Revoir quelques rythmes de la page 42.",
      objectifs: "Mettre en application tes connaissances en binaire.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Voir d'abord les breaks avant de jouer, chaque cycle de 4 mesures.",
    },
  },
  {
    id: "9-14",
    niveau: 9,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4 pages 32 et 33.",
      echauffement: "Voir directement la page 32.",
      objectifs: "Découvrir le chabada en 3 temps.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien compter, à tempo lento, la division du temps (123) pour chacun des temps et ensuite compter les temps de la mesure.",
    },
  },
  {
    id: "9-15",
    niveau: 9,
    numero: 15,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4 pages 34.",
      echauffement:
        "Faire tourner le rythme n.4 de la page 32, le rythme de base pour la valse jazz !",
      objectifs: "Savoir jouer, en ternaire, des breaks en 3 temps.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien compter, à tempo lento, la division du temps (123) pour chacun des temps et ensuite compter les temps de la mesure. Bien faire tourner en boucle, chaque exercice, avant d'alterner avec le chabada en 3/4.",
    },
  },
  {
    id: "9-16",
    niveau: 9,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4 page 35.",
      echauffement: "Faire tourner le rythme n.4 de la page 32.",
      objectifs: "Interpréter un solo, rythmes et breaks, en 3/4 jazz.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer le break d'une ligne avant de voir plusieurs fois la ligne, travailler, ainsi, ligne par ligne et lentement, avant de le jouer en entier et d'accélérer !",
    },
  },
];

export const niveau09: Niveau = {
  numero: 9,
  titre: "Charleston, mesures composées & ternaire",
  lessons,
};
