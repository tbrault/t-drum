import type { Lesson, Niveau } from "./types";

/**
 * Niveau 17 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "17-1",
    niveau: 17,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 100 et 101.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Découverte de la mesure 2/2, utilisée principalement pour des tempos rapides.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Le tempo lent est recommandé pour le travail de l'assise en mesure 2/2 par exemple 40 BPM, tempo à la blanche et bien sûr, mesure utilisée, par la suite pour les tempos rapides !",
    },
  },
  {
    id: "17-2",
    niveau: 17,
    numero: 2,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 80 et 81.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 80, rythme utilisé pour jouer la chabada binaire, en Jazz, appelé tempo up !",
      objectifs:
        "Développer l'indépendance caisse claire et grosse caisse, en 2 temps, dans le style jazz binaire.",
      tempoCible: { min: 40, max: 100 },
      notes: "Chaque exercice est à alterner avec le rythme n.1.",
    },
  },
  {
    id: "17-3",
    niveau: 17,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 102 et 103.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement de la technique en frisé, en mesure 2/2, utilisée principalement pour des tempos rapides.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Le tempo lent est recommandé pour le travail de l'assise en mesure 2/2 par exemple 40 BPM, tempo à la blanche et bien sûr, mesure utilisée, par la suite pour les tempos rapides !",
    },
  },
  {
    id: "17-4",
    niveau: 17,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 82.",
      echauffement: "Bien faire tourner le rythme n.1 de la page 80 !",
      objectifs:
        "Développer l'indépendance caisse claire et grosse caisse, en 2 temps, dans le style jazz binaire, en mixant les 2 leçons de batterie précédentes.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ne pas hésiter, aussi, d'alterner 2 mesures de tempo et 2 fois l'exercice.",
    },
  },
  {
    id: "17-5",
    niveau: 17,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 104 et 105.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement de la technique en roulé, en mesure 2/2, utilisée principalement pour des tempos rapides.",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Le tempo lent est recommandé pour le travail de l'assise en mesure 2/2 par exemple 40 BPM, tempo à la blanche et bien sûr, mesure utilisée, par la suite pour les tempos rapides !",
    },
  },
  {
    id: "17-6",
    niveau: 17,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 106.",
      echauffement:
        "Voir directement ce texte. Déchiffrage mesure par mesure puis 2 mesures par 2 mesures, avant d'enchaîner un cycle de 4 mesures.",
      objectifs:
        "Appliquer les leçons précédentes de maîtrise de groove et d'interventions dans un style très moderne, en retrouvant du frisé, du roulé, du moulin, de l'indépendance et des coordinations, avec un seul but : Faire groover !",
      tempoCible: { min: 40, max: 70 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir chaque cycle de 4 mesures, et jouer ensuite, le binaire 43 en entier. Insiste bien sur la difficulté majeure de ce texte, qui est l'enchaînement des mesures de la 3ème ligne et de la 1ère mesure 4ème ligne.",
    },
  },
  {
    id: "17-7",
    niveau: 17,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 83.",
      echauffement:
        "Déchiffre directement, à tempo lento (40 BPM environ) ligne par ligne ce thème.",
      objectifs:
        "Savoir interpréter un thème à la caisse claire puis en valeur de notes, sans que le chabada soit écrit, dans le style Jazz, avec chabada binaire pour des tempos « up » !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Bien compter puisqu'il s'agit de souligner, avec grande précision, un motif rythmique joué par un pupitre de cuivres !",
    },
  },
  {
    id: "17-8",
    niveau: 17,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 108 et 109.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement du chant cymbale ou cloche, et remplissage croches, main inverse, en mesure 2/2, utilisée principalement pour des tempos rapides et dans les styles Jazz et Latin-Jazz, Afro-Caribéen etc...",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Le tempo lent est recommandé pour le travail de l'assise en mesure 2/2 par exemple 40 BPM, tempo à la blanche et bien sûr, mesure utilisée, par la suite pour les tempos rapides !",
    },
  },
  {
    id: "17-9",
    niveau: 17,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 107.",
      echauffement:
        "Voir directement la 2ème page de ce binaire 43, texte de haute volée ! Le déchiffrage, mesure par mesure, est particulièrement recommandé.",
      objectifs:
        "Appliquer les leçons précédentes de maîtrise de groove et d'interventions dans un style très moderne, en retrouvant du frisé, du roulé, du moulin, de l'indépendance et des coordinations, avec un seul but : Faire groover !",
      tempoCible: { min: 40, max: 70 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Il sera, bien sûr, intéressant d'apprendre par cœur ce binaire 43, représentatif du niveau. De l'apprendre en entier ou au moins une des 2 pages.",
    },
  },
  {
    id: "17-10",
    niveau: 17,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 84 et 85.",
      echauffement:
        "Bien faire tourner chaque exercice avant d'alterner chaque exercice avec une mesure de chabada binaire.",
      objectifs:
        "Développer la coordination caisse claire et grosse caisse, en C barré, dans le style jazz binaire. Nous utiliserons, bien sûr, ce jeu dans nos breaks et solos !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Ne pas hésiter, aussi, d'alterner 2 mesures de tempo et 2 fois l'exercice.",
    },
  },
  {
    id: "17-11",
    niveau: 17,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 110 et 111.",
      echauffement:
        "Voir directement, à tempo lento, les exercices préparatoires de la page 110.",
      objectifs:
        "Développement de la technique caisse claire, en frisé et en roulé, en mesure 6/8.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Le tempo lent est recommandé pour le travail de précision rythmique, de maîtrise technique, avant de faire chanter cette marche ternaire.",
    },
  },
  {
    id: "17-12",
    niveau: 17,
    numero: 12,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 108 et 109.",
      echauffement: "Voir directement les rythmes en 3/4 de la page 108.",
      objectifs:
        "Découverte de la métrique 3 temps pour des rythmes binaires et sa mise en application, avec breaks, dans le binaire 44.",
      tempoCible: { min: 40, max: 90 },
      notes:
        "Déchiffre bien chacun des rythmes de la page 108 puis n'hésite pas à enchaîner les 2 rythmes de chacune des lignes. Pour le déchiffrage du binaire 44, Prend le temps de bien déchiffrer le break d'introduction, puis de travailler par cycles de 4 mesures.",
    },
  },
  {
    id: "17-13",
    niveau: 17,
    numero: 13,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 86.",
      echauffement: "Jouer le chabada binaire.",
      objectifs:
        "Application de toutes les leçons abordées en C barré, technique, indépendance et coordination, dans le style jazz binaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Ne pas hésiter à jouer ligne par ligne avant de jouer le solo 19 en entier.",
    },
  },
  {
    id: "17-14",
    niveau: 17,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 172.",
      echauffement:
        "Voir directement, à tempo lento, 2ème ligne, la 3ème mesure en boucle et accélérer progressivement.",
      objectifs: "Développement et affirmation de sa technique de caisse.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Cette marche constitue l'étude représentative du niveau, à apprendre par cœur et à développer au maximum de tes capacités.",
    },
  },
  {
    id: "17-15",
    niveau: 17,
    numero: 15,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 110 et 111.",
      echauffement:
        "Voir directement l'explication d'une version, page 110, avant d'interpréter le binaire 45 de la page 111.",
      objectifs:
        "Développement du travail de coordination et de synchronisation, en enchaînant des rythmes différents.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Pour chacune des 3 versions, prend le temps de bien assimiler la mesure exemple, avant de jouer le binaire 45.",
    },
  },
  {
    id: "17-16",
    niveau: 17,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 87.",
      echauffement:
        "Déchiffre, directement, à tempo lento, mesure par mesure puis ligne par ligne ce solo 20.",
      objectifs:
        "Apprendre par cœur ce solo 20, représentatif du niveau 17, avec un gros travail axé sur la maîtrise technique, mais surtout un beau travail de coordination, dans le style jazz binaire.",
      tempoCible: { min: 30, max: 90 },
      notes:
        "Cette étude peut se jouer en entier sous la forme d'un chorus, mais tout aussi bien se jouer sous la forme de 4/4, en alternant 4 mesures de tempo et une ligne.",
    },
  },
  {
    id: "17-17",
    niveau: 17,
    numero: 17,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 112 et 113.",
      echauffement:
        "Voir directement l'explication d'une version, page 112, avant d'interpréter le binaire 46 de la page 113.",
      objectifs:
        "Développement du travail de l'indépendance des membres, en enchaînant des rythmes binaires différents.",
      tempoCible: { min: 40, max: 90 },
      notes:
        "Pour chacune des versions, prend le temps de bien assimiler la mesure exemple, avant de jouer le binaire 46.",
    },
  },
];

export const niveau17: Niveau = {
  numero: 17,
  titre: "Mesure 2/2, jazz binaire & coordination ternaire",
  lessons,
};
