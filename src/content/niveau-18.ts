import type { Lesson, Niveau } from "./types";

/**
 * Niveau 18 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "18-1",
    niveau: 18,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 170.",
      echauffement:
        "Faire tourner en boucle et accélérer progressivement le quintolet de doubles croches puis le septolet de doubles croches.",
      objectifs:
        "Développement et affirmation de ta technique de caisse en frisé tout en changeant de débit, de la noire à la triple croche.",
      tempoCible: { min: 60, max: 80 },
      notes:
        "Nous ferons régulièrement référence à ce travail pour pousser à 90, 100 BPM.",
    },
  },
  {
    id: "18-2",
    niveau: 18,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 186.",
      echauffement: "Voir directement la leçon.",
      objectifs: "Découverte de la mesure 13/8, avec 2 façons de la jouer.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Le tempo lent et le compte sont particulièrement recommandés pour cette étude !",
    },
  },
  {
    id: "18-3",
    niveau: 18,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 114, 115.",
      echauffement:
        "Voir directement chaque interprétation de la page 114, à tempo lento.",
      objectifs:
        "Développer sa technique grosse caisse, en interprétant une lecture rythmique à la grosse caisse. Savoir placer, pour varier le jeu, des breaks rythmiques. Développer la synchronisation et la coordination des sons.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter les temps et les « et », et accélérer progressivement.",
    },
  },
  {
    id: "18-4",
    niveau: 18,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 88.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Revoir et découvrir des phrases clés en ternaire, tout en gardant le chabada, c'est le vocabulaire essentiel, du jeu Jazz, dans un débit de triolets.",
      tempoCible: { min: 60, max: 120 },
      notes: "Chaque exercice est à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "18-5",
    niveau: 18,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 114, 115.",
      echauffement: "Voir directement, à tempo lento, la leçon.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, tout en mélangeant le débit frisé puis roulé.",
      tempoCible: { min: 50, max: 160 },
      notes:
        "Il est important de savoir varier son jeu, passer du frisé au roulé et inversement.",
    },
  },
  {
    id: "18-6",
    niveau: 18,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 116.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement du travail de coordination et de synchronisation, grosse caisse/cymbales crash, dans un débit de doubles croches roulées.",
      tempoCible: { min: 40, max: 100 },
      notes: "On peut aussi alterner une mesure de rythme et un exercice.",
    },
  },
  {
    id: "18-7",
    niveau: 18,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 89.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Il s'agit, ici, de développer ton sens de la musicalité, dans le jeu Jazz. De jouer les mêmes motifs rythmiques que la page 88, mais en quittant le chabada traditionnel, et en synchronisant grosse caisse et ride, dans un débit de triolets, joués main inverse à la caisse claire !",
      tempoCible: { min: 60, max: 120 },
      notes: "Chaque exercice est à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "18-8",
    niveau: 18,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 117.",
      echauffement: "Voir directement le déchiffrage, mesure par mesure.",
      objectifs:
        "Nous allons, ici, rendre hommage à tous les grands batteurs Rock des années 1970, comme John Bonham de Led Zeppelin, Ian Paice de Deep Purple, Bill Bruford de Yes, King Crimson, Bobby Colomby de Blood Sweat & Tears, etc… Et appliquer les leçons précédentes de maîtrise de groove et d'interventions.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Déchiffrer bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Pièce représentative du niveau à apprendre par cœur !",
    },
  },
  {
    id: "18-9",
    niveau: 18,
    numero: 9,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 90.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Il s'agit, ici, là aussi, de développer ton sens de la musicalité, dans le jeu Jazz. Et même de développer ton sens de la créativité, de l'inventivité ! Tu vas jouer les mêmes motifs rythmiques que la page 88, mais en quittant le chabada et jouer ces motifs en combinant mains et pieds, puis en distribuant les notes jouées par les mains aux toms, en choisissant toi-même les fûts à faire sonner ! Ces motifs seront, bien sûr, utilisés sous forme d'interventions pour des breaks, des 4/4, des solos etc…",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Chaque exercice est à tourner en boucle et à accélérer, puis à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "18-10",
    niveau: 18,
    numero: 10,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexes.",
      echauffement: "Voir directement, à tempo lento, la leçon.",
      objectifs: "Ouverture vers des rythmes typiques. Découverte de la clave.",
      tempoCible: { min: 40, max: 140 },
      notes:
        "Il est important de bien entendre chaque élément, joué, à l'origine par plusieurs percussionnistes.",
    },
  },
  {
    id: "18-11",
    niveau: 18,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 116, 117.",
      echauffement: "Voir directement, à tempo lento, la leçon.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, en frisé, mais en changeant de débit.",
      tempoCible: { min: 60, max: 140 },
      notes: "Il est important de savoir changer de débit en frisé.",
    },
  },
  {
    id: "18-12",
    niveau: 18,
    numero: 12,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 118, 119.",
      echauffement:
        "Voir directement chaque interprétation de la page 118, à tempo lento.",
      objectifs:
        "Développer sa technique grosse caisse, en interprétant une lecture rythmique à la grosse caisse en 12/8. Travail de l'indépendance des 4 membres. Développer la synchronisation et la coordination des sons.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Bien compter la division du temps à tempo lento et compter seulement les temps à tempo plus rapide.",
    },
  },
  {
    id: "18-13",
    niveau: 18,
    numero: 13,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 91.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Il s'agit, ici, là aussi, de développer ton sens de la musicalité, dans le jeu Jazz. Tu vas jouer les mêmes motifs rythmiques que la page 88, mais en quittant le chabada et jouer ces motifs dans un débit de triolets de croches, en frisé, à la caisse claire et faire ressortir des accents en synchronisant grosse caisse + cymbales crash ! Ces motifs seront, bien sûr, utilisés sous forme d'interventions pour des breaks, des 4/4, des solos etc…",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Chaque exercice est à tourner en boucle et à accélérer, puis à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "18-14",
    niveau: 18,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 118, 119.",
      echauffement: "Voir directement, à tempo lento, la leçon.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire, en roulé, mais en changeant de débit.",
      tempoCible: { min: 50, max: 120 },
      notes: "Il est important de savoir changer de débit en roulé.",
    },
  },
  {
    id: "18-15",
    niveau: 18,
    numero: 15,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 172.",
      echauffement:
        "Voir directement, à tempo lento, 1ère ligne, la 1ère mesure puis 2ème ligne, la 2ème mesure puis 2ème ligne la 3ème mesure.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Cette marche, avec le rigodon 4, constitue l'étude représentative du niveau, à apprendre par cœur et à développer au maximum de tes capacités.",
    },
  },
  {
    id: "18-16",
    niveau: 18,
    numero: 16,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 172.",
      echauffement:
        "Voir directement, à tempo lento, 1ère ligne, la 1ère mesure puis 2ème ligne, la 2ème mesure puis 2ème ligne la 3ème mesure.",
      objectifs:
        "Développement et affirmation de ta technique de caisse claire.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Cette marche, avec le rigodon 3, constitue l'étude représentative du niveau, à apprendre par cœur et à développer au maximum de tes capacités.",
    },
  },
];

export const niveau18: Niveau = {
  numero: 18,
  titre: "Techniques avancées, indépendance & jeu Jazz",
  lessons,
};
