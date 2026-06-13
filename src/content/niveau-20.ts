import type { Lesson, Niveau } from "./types";

/**
 * Niveau 20 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "20-1",
    niveau: 20,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 158, 159.",
      echauffement: "Bien voir chaque exercice préparatoire.",
      objectifs:
        "Assouplissement des poignets, et synchronisation des coups, avec une interprétation en remplissage de croches roulées, mains simultanées.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Tu peux jouer les deux mains sur un pad ou une caisse claire, ou, une main au tom basse et l'autre à la caisse claire.",
    },
  },
  {
    id: "20-2",
    niveau: 20,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 191.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Mélange de mesures 4/4 et 7/8 avec 2 façons de jouer aux pieds.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Le tempo lent et le compte sont particulièrement recommandés pour cette étude !",
    },
  },
  {
    id: "20-3",
    niveau: 20,
    numero: 3,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 128.",
      echauffement: "Bien déchiffrer chaque exercice à tempo lento.",
      objectifs:
        "Savoir placer des interventions (breaks) dans un débit de sextolets de doubles croches.",
      tempoCible: { min: 30, max: 120 },
      notes:
        "Bien compter la division du temps à tempo lento et compter seulement les temps à tempo plus rapide.",
    },
  },
  {
    id: "20-4",
    niveau: 20,
    numero: 4,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Jouer la clave.",
      objectifs:
        "Découvrir la clé (clave) des rythmes Afro-Cubains, et savoir jouer plusieurs versions de la « rumba ».",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours mémoriser des phrases courtes pour les placer facilement en contexte musical.",
    },
  },
  {
    id: "20-5",
    niveau: 20,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 160, 161.",
      echauffement: "Bien voir chaque exercice préparatoire.",
      objectifs:
        "Assouplissement des poignets, et synchronisation des coups, avec une interprétation en remplissage de triolets de croches roulées, mains simultanées.",
      tempoCible: { min: 40, max: 52 },
      notes:
        "Tu peux jouer les deux mains sur un pad ou une caisse claire, ou, une main au tom basse et l'autre à la caisse claire.",
    },
  },
  {
    id: "20-6",
    niveau: 20,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Jouer les 2 clave.",
      objectifs:
        "Découvrir la clé (clave) des rythmes Afro-Cubains, et savoir jouer plusieurs versions de « cascara ».",
      tempoCible: { min: 30, max: 110 },
      notes:
        "Toujours mémoriser des phrases courtes pour les placer facilement en contexte musical.",
    },
  },
  {
    id: "20-7",
    niveau: 20,
    numero: 7,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Jouer les 2 clave.",
      objectifs:
        "Découvrir la clé (clave) des rythmes Afro-Cubains, et savoir jouer plusieurs versions de « cascara ».",
      tempoCible: { min: 30, max: 110 },
      notes:
        "Toujours mémoriser des phrases courtes pour les placer facilement en contexte musical.",
    },
  },
  {
    id: "20-8",
    niveau: 20,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 129.",
      echauffement:
        "Voir directement le déchiffrage du 1er break d'introduction, puis le 2ème break puis le rythme et le 1er cycle de 4 mesures, précédé du 1er break.",
      objectifs:
        "Nous allons, ici, rendre hommage à tous les grands batteurs modernes comme Steve Gadd, Dave Weckl, Vinnie Colaiuta, Simon Phillips, Gavin Harrison etc... Et appliquer les leçons précédentes de maîtrise de groove et d'interventions, notamment en sextolets de doubles croches.",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Déchiffre bien chacune des mesures, avant de voir des cycles de plusieurs mesures. Pièce représentative du niveau à apprendre par cœur !",
    },
  },
  {
    id: "20-9",
    niveau: 20,
    numero: 9,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Jouer les 2 clave.",
      objectifs:
        "Découvrir la clé (clave) des rythmes Afro-Cubains, et savoir jouer 2 nouvelles versions de « cascara ».",
      tempoCible: { min: 30, max: 100 },
      notes:
        "Toujours mémoriser des phrases courtes pour les placer facilement en contexte musical.",
    },
  },
  {
    id: "20-10",
    niveau: 20,
    numero: 10,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 89.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Il s'agit, ici, de développer ton sens de la musicalité, dans le jeu Jazz, en marquant des noires avec la pédale charleston. De jouer les mêmes motifs rythmiques que la page 88, mais en quittant le chabada traditionnel, et en synchronisant grosse caisse et ride, dans un débit de triolets, joués main inverse à la caisse claire !",
      tempoCible: { min: 80, max: 160 },
      notes: "Chaque exercice est à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "20-11",
    niveau: 20,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement:
        "Déchiffre directement chaque mesure puis ligne par ligne puis le 4/4 en entier.",
      objectifs:
        "Jouer des interventions dans le style Afro-Cubain, et sous la forme de 4/4, c'est-à-dire 4 mesures du rythme cascara et 4 mesures de breaks. Texte vivement conseillé à apprendre par cœur !",
      tempoCible: { min: 30, max: 100 },
      notes:
        "Tu peux tout aussi bien extraire une seule mesure qui te plait et la placer avec un groove de ton choix !",
    },
  },
  {
    id: "20-12",
    niveau: 20,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 164.",
      echauffement:
        "Lire directement en coup simple, sans remplissage en comptant à haute voix.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème avec des syncopes.",
      tempoCible: { min: 60, max: 240 },
      notes: "C'est un travail quotidien qui va payer !!!",
    },
  },
  {
    id: "20-13",
    niveau: 20,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 192.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Mélange de mesures 4/4 et 2/4 et mélange binaire/ternaire avec 2 façons de jouer aux pieds.",
      tempoCible: { min: 50, max: 120 },
      notes:
        "Le tempo lent et le compte sont particulièrement recommandés pour cette étude !",
    },
  },
  {
    id: "20-14",
    niveau: 20,
    numero: 14,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 130.",
      echauffement: "Bien déchiffrer chaque exercice à 40 BPM.",
      objectifs:
        "Savoir placer des interventions (breaks) avec un mélange de débit doubles croches/ sextolets de doubles croches.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien compter la division du temps à tempo lento et compter seulement les temps à tempo plus rapide.",
    },
  },
  {
    id: "20-15",
    niveau: 20,
    numero: 15,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 90.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Il s'agit, ici, là aussi, de développer ton sens de la musicalité, dans le jeu Jazz, mais en marquant les 4 temps de la mesure avec la pédale de charleston ! Et même de développer ton sens de la créativité, de l'inventivité ! Tu vas jouer les mêmes motifs rythmiques que la page 88, mais en quittant le chabada et jouer ces motifs en combinant mains et pieds, puis en distribuant les notes jouées par les mains aux toms, en choisissant toi-même les fûts à faire sonner ! Ces motifs seront, bien sûr, utilisés sous forme d'interventions pour des breaks, des 4/4, des solos etc...",
      tempoCible: { min: 40, max: 160 },
      notes:
        "Chaque exercice est à tourner en boucle et à accélérer, puis à alterner avec une mesure de chabada et même faire tourner 2 mesures de chabada et jouer 2 fois l'exercice.",
    },
  },
  {
    id: "20-16",
    niveau: 20,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement:
        "Déchiffre directement chaque mesure puis ligne par ligne puis le 4/4 en entier.",
      objectifs:
        "Jouer des interventions dans le style Afro-Cubain, et sous la forme de 4/4, c'est-à-dire 4 mesures du rythme cascara et 4 mesures de breaks. Texte vivement conseillé à apprendre par cœur !",
      tempoCible: { min: 30, max: 100 },
      notes:
        "Tu peux tout aussi bien extraire une seule mesure qui te plait et la placer avec un groove de ton choix !",
    },
  },
];

export const niveau20: Niveau = {
  numero: 20,
  titre: "Sextolets, breaks modernes & rythmes Afro-Cubains",
  lessons,
};
