import type { Lesson, Niveau } from "./types";

/**
 * Niveau 16 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "16-1",
    niveau: 16,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 112.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement de la précision rythmique, en frisé, en roulé et en coups en répétition.",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Après avoir étudié cette nouvelle leçon, tu peux tout aussi bien démarrer ta séance quotidienne par cette page, en commençant par les coups en répétition ou le roulé… Le tempo le plus important, pour le travail de l'assise est 60 BPM et bien sûr, pour le développement de ta technique, les tempos rapides !",
    },
  },
  {
    id: "16-2",
    niveau: 16,
    numero: 2,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 94.",
      echauffement: "Découvre directement cette leçon.",
      objectifs:
        "Développer son sens rythmique pour des breaks en mélangeant le débit binaire/ternaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Recherche, aussi, un jeu bien régulier dans la qualité de frappe !",
    },
  },
  {
    id: "16-3",
    niveau: 16,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 113.",
      echauffement: "Voir directement la leçon.",
      objectifs:
        "Développement de la précision rythmique, et de la technique, en frisé, et en roulé, en rajoutant, par rapport à la leçon précédente, des sextolets et des triples croches.",
      tempoCible: { min: 60, max: 100 },
      notes:
        "Ici encore, le tempo le plus important, pour le travail de l'assise est 60 BPM et bien sûr, pour le développement de ta technique, les tempos rapides !",
    },
  },
  {
    id: "16-4",
    niveau: 16,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 pages 18 et 19.",
      echauffement:
        "Jouons directement le 1er rythme de la page en démarrant lentement et en comptant !!!",
      objectifs:
        "Jouer de nouveaux rythmes dans un débit de doubles croches à la charleston, et notamment, ici, synchroniser une note jouée à la grosse caisse avec une note jouée par la main faible et savoir placer des breaks avec cette nouvelle rythmique !",
      tempoCible: { min: 20, max: 60 },
      notes:
        "Pour ces 2 pages, soyons patient et bien régulier dans le débit et en recherchant un son égal dans les 2 mains ! Pour la page 19, travaillons ligne par ligne !",
    },
  },
  {
    id: "16-5",
    niveau: 16,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 Thème de la page 182.",
      echauffement:
        "Déchiffrer directement ce thème, mesure par mesure puis ligne par ligne, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer en 9/8, binaire.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Petit rappel, la mesure 9/8 peut être une mesure composée (3 temps ternaires) mais aussi une mesure à temps binaire, soit 4 temps ½.",
    },
  },
  {
    id: "16-6",
    niveau: 16,
    numero: 6,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 76.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 70, rythme utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz, en faisant « chanter » la cymbale ride.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Chaque exercice est à jouer en boucle puis à alterner avec le rythme n.1 de la page 70.",
    },
  },
  {
    id: "16-7",
    niveau: 16,
    numero: 7,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 96 et 97.",
      echauffement:
        "Voir directement la leçon de la page 96, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développement de la technique en mélangeant un débit, en frisé et en notes fantômes, des accents en coups simples et le frisé en sextolets de doubles croches !",
      tempoCible: { min: 40, max: 100 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit en nuance « piano » et jouer un frisé en sextolets bien en place tout en prenant de la vitesse !",
    },
  },
  {
    id: "16-8",
    niveau: 16,
    numero: 8,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 96.",
      echauffement:
        "Déchiffrage de chaque break avant d'enchaîner un cycle de 4 mesures.",
      objectifs:
        "Appliquer les leçons précédentes, c'est-à-dire, savoir, dans tes breaks, mélanger des doubles croches et des sextolets de doubles croches !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks, puis amène les, progressivement à 40 BPM, avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 39 en entier.",
    },
  },
  {
    id: "16-9",
    niveau: 16,
    numero: 9,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 77.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 70, rythme utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz, en faisant « chanter » la cymbale ride.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Chaque exercice est à jouer en boucle puis à alterner avec le rythme n.1 de la page 70.",
    },
  },
  {
    id: "16-10",
    niveau: 16,
    numero: 10,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 pages 98 et 99.",
      echauffement:
        "Voir directement la leçon de la page 98, en insistant bien sur ces exercices préparatoires.",
      objectifs:
        "Développement de la technique en mélangeant un débit, en frisé et en notes fantômes, des accents en coups simples et le frisé en triples croches !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien démarrer lentement en cherchant à contrôler un beau débit en nuance « piano » et jouer un frisé en triples croches bien régulier.",
    },
  },
  {
    id: "16-11",
    niveau: 16,
    numero: 11,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 Thème de la page 184.",
      echauffement:
        "Déchiffrer directement ce thème, mesure par mesure puis ligne par ligne, en comptant franchement à haute voix, au moins dans les premiers tempo !",
      objectifs: "Savoir lire et jouer en 11/8.",
      tempoCible: { min: 40, max: 80 },
      notes: "On peut aussi écrire cette mesure 5 ½ /4",
    },
  },
  {
    id: "16-12",
    niveau: 16,
    numero: 12,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 104.",
      echauffement:
        "Découvrir directement ces nouveaux rythmes, à tempo lento.",
      objectifs:
        "Développer son sens du groove, et surtout l'indépendance avec ces rythmes d'une grande modernité !",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Faire suffisamment « tourner » ces rythmes, pour les mémoriser et ainsi jouer, avec maîtrise, de jolis sons, notamment avec le dôme cymbale, la charleston etc…",
    },
  },
  {
    id: "16-13",
    niveau: 16,
    numero: 13,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 78.",
      echauffement:
        "Déchiffre directement ce solo 18, représentatif du niveau, que nous te conseillons d'apprendre par cœur pour, notamment, jouer plus libéré, d'être plus dans la musique et bien contrôler ce jeu en 3 temps !",
      objectifs:
        "Avec le solo 18, solo de 2 pages, tu vas mettre en application toutes tes connaissances en 3 temps ternaires !",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "16-14",
    niveau: 16,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 79.",
      echauffement:
        "Déchiffre directement ce solo 18, représentatif du niveau, que nous te conseillons d'apprendre par cœur pour, notamment, jouer plus libéré, d'être plus dans la musique et bien contrôler ce jeu en 3 temps !",
      objectifs:
        "Avec le solo 18, solo de 2 pages, tu vas mettre en application toutes tes connaissances en 3 temps ternaires ! Il s'agit du solo ternaire représentatif du niveau à apprendre par cœur.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "16-15",
    niveau: 16,
    numero: 15,
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
    id: "16-16",
    niveau: 16,
    numero: 16,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 105.",
      echauffement:
        "Déchiffrage de chaque break avant d'enchaîner un cycle de 4 mesures.",
      objectifs:
        "Appliquer les leçons précédentes, en termes d'indépendance, de groove, de coordination, et de précision rythmique.",
      tempoCible: { min: 40, max: 80 },
      notes:
        "Déchiffre bien chacun des breaks, puis amène les, progressivement à 40 BPM, avant de voir chaque cycle de 4 mesures et jouer ensuite le binaire 42 en entier, représentatif du niveau à apprendre par cœur.",
    },
  },
];

export const niveau16: Niveau = {
  numero: 16,
  titre: "Technique avancée, indépendance ternaire & mesures composées",
  lessons,
};
