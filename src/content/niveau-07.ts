import type { Lesson, Niveau } from "./types";

/**
 * Niveau 7 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "7-4",
    niveau: 7,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, pages 18 et 19.",
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
    id: "7-5",
    niveau: 7,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2, pages 22/23/24 et thème p.180.",
      echauffement: "Avec la page 22, découvrons les triples croches !",
      objectifs:
        "Déplacement d'accents dans un débit de doubles croches en employant des notes fantômes dans un débit Frisé et dans un débit roulé ! Lecture rythmique en 4/4.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Il est très important de mémoriser les exercices préparatoires avant de voir les marches ! Ce sont, là aussi, nos gammes !!!",
    },
  },
  {
    id: "7-6",
    niveau: 7,
    numero: 6,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, pages 20 et 21.",
      echauffement:
        "Jouons directement le 1er rythme de la page en démarrant lentement et en comptant !!!",
      objectifs:
        "Développement de la technique grosse caisse et découvrons de nouveaux rythmes !",
      tempoCible: { min: 30, max: 60 },
    },
  },
  {
    id: "7-8",
    niveau: 7,
    numero: 8,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2, pages 25, 26, 27, 28, 29.",
      echauffement:
        "4 coups de chaque main puis page 23, exercice D et p.24 ex C.",
      objectifs:
        "Déplacement d'accents dans un débit de doubles croches en employant des notes fantômes ou des « ra » dans un débit Frisé. Avec les p.28 et 29 nous récapitulons toutes ces nouveautés !",
      tempoCible: { min: 20, max: 60 },
      notes:
        "La page 28 est déjà une bonne récapitulation, la page 29 s'adresse plutôt à celles et ceux qui ont un peu plus de temps à consacrer à l'étude !",
    },
  },
  {
    id: "7-9",
    niveau: 7,
    numero: 9,
    volume: 3,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 3, pages 22 et 23.",
      echauffement:
        "Échauffement avec la page 22, sans oublier de bien marquer le Tempo avec la pédale de charleston !",
      objectifs:
        "Avec la p.22, savoir changer de sonorités pour un temps dans nos breaks. Pour le binaire 10, il s'agit de mettre en application toutes nos connaissances !",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Il est important d'apprendre par cœur le binaire 10, représentatif, en binaire, du niveau 7 !",
    },
  },
  {
    id: "7-11",
    niveau: 7,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4, page 11 — Solo 3.",
      echauffement:
        "Ne pas hésiter « à faire tourner » le chabada une ou plusieurs minutes. Revoir les exercices n.2 et 6 de la p.8.",
      objectifs:
        "Avec ce solo 3, nous récapitulons le travail de l'indépendance à la caisse claire et les breaks ternaires.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien « penser » son chabada tout en faisant chanter la caisse claire.",
    },
  },
  {
    id: "7-12",
    niveau: 7,
    numero: 12,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4, page 12.",
      echauffement:
        "Ne pas hésiter « à faire tourner » le chabada une ou plusieurs minutes.",
      objectifs: "Découverte du travail de l'indépendance à la grosse caisse.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien « penser » son chabada tout en faisant chanter la grosse caisse.",
    },
  },
  {
    id: "7-13",
    niveau: 7,
    numero: 13,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, pages 24, 25.",
      echauffement:
        "La page 24 est à proprement parler une page idéale pour bien s'échauffer à la batterie et en particulier pour la grosse caisse.",
      objectifs:
        "Développement de la technique grosse caisse et indépendance binaire. Vous allez, avec ces pages, élever votre niveau de jeu en rythmes binaires et ce, dans les styles Rock, Hard-Rock.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Nous pourrons, évidemment, avancer dans la méthode et revenir sur ces rythmes et pousser les tempo !",
    },
  },
  {
    id: "7-14",
    niveau: 7,
    numero: 14,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, pages 26, 27.",
      echauffement: "Échauffement directement avec la page 26.",
      objectifs:
        "Développement de la technique grosse caisse, coordination des 3 sons Grosse caisse/caisse claire/charleston, et indépendance binaire. Tu vas, avec ces pages, élever ton niveau de jeu en rythmes binaires et ce, dans les styles Rock, Hard-Rock, RNB, Soul Music, Jazz-Rock ! Tu vas prendre beaucoup de plaisir à les jouer !",
      tempoCible: { min: 30, max: 60 },
      notes: "Important de mémoriser 1 ou plusieurs rythmes de la page 27.",
    },
  },
  {
    id: "7-15",
    niveau: 7,
    numero: 15,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, pages 28, 29.",
      echauffement:
        "Échauffement avec la page 24, par exemple le n.3 de la page 24.",
      objectifs:
        "Développement de la technique grosse caisse, coordination des 3 sons Grosse caisse/caisse claire/charleston, et indépendance binaire.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Pour la page 28, les exercices de 1 à 7 amènent au n.8, essayons donc, d'abord, le n.8 directement et si cela ne passe pas, démarrons avec le n.1 !",
    },
  },
  {
    id: "7-16",
    niveau: 7,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4, page 16 — Solo 4.",
      echauffement: "p.14 exercices n.3 et 6.",
      objectifs:
        "Avec ce solo 4 nous mettons en application le travail de l'indépendance des 4 membres vu avec les pages 14 et 15.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien « penser » son chabada tout en faisant chanter la caisse claire et la grosse caisse.",
    },
  },
  {
    id: "7-17",
    niveau: 7,
    numero: 17,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4, page 16 — Solo 4 (suite).",
      echauffement: "p.14 exercices n.3 et 6.",
      objectifs:
        "Avec ce solo 4 nous mettons en application le travail de l'indépendance des 4 membres vu avec les pages 14 et 15.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien « penser » son chabada tout en faisant chanter la caisse claire et la grosse caisse.",
    },
  },
  {
    id: "7-18",
    niveau: 7,
    numero: 18,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4, page 16 — Solo 4 (suite).",
      echauffement: "p.14 exercices n.3 et 6.",
      objectifs:
        "Avec ce solo 4 nous mettons en application le travail de l'indépendance des 4 membres vu avec les pages 14 et 15.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Bien « penser » son chabada tout en faisant chanter la caisse claire et la grosse caisse.",
    },
  },
  {
    id: "7-19",
    niveau: 7,
    numero: 19,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3, page 30.",
      echauffement:
        "Échauffement directement en jouant chaque mesure de la page.",
      objectifs:
        "Bien faire respirer la musique en respectant les silences, et jouer des breaks plus complexes qu'habituellement.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Démarrons lentement, en comptant bien le Temps et le « et ». Marquons, avec conviction, le Temps, avec la charleston, au pied.",
    },
  },
  {
    id: "7-20",
    niveau: 7,
    numero: 20,
    volume: 3,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 3, page 31.",
      echauffement:
        "Bien s'échauffer en jouant un ou plusieurs rythmes de la page 27 et un exercice de la p.30.",
      objectifs: "Mise en application de toutes les leçons précédentes.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Petit rappel, pour ce binaire, bien s'imprégner du rythme que l'on retrouve tout au long du texte et bien déchiffrer chacun des breaks avant d'enchaîner ligne par ligne et puis le texte en entier.",
    },
  },
  {
    id: "7-21",
    niveau: 7,
    numero: 21,
    volume: 3,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 3, page 31 (suite).",
      echauffement:
        "Bien s'échauffer en jouant un ou plusieurs rythmes de la page 27 et un exercice de la p.30.",
      objectifs: "Mise en application de toutes les leçons précédentes.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Petit rappel, pour ce binaire, bien s'imprégner du rythme que l'on retrouve tout au long du texte et bien déchiffrer chacun des breaks avant d'enchaîner ligne par ligne et puis le texte en entier.",
    },
  },
  {
    id: "7-22",
    niveau: 7,
    numero: 22,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4, page 20.",
      echauffement:
        "Jouons directement les exercices de la page. Pour chacun des exercices, il convient de faire tourner en boucle avant d'alterner avec une mesure de chabada.",
      objectifs:
        "Il s'agit de jouer des breaks en variant les sons pour un même temps.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Nous pouvons reprendre le chabada avec une grosse caisse/crash, sur le 1er temps de la mesure de tempo.",
    },
  },
  {
    id: "7-23",
    niveau: 7,
    numero: 23,
    volume: 4,
    hasVideo: true,
    hasBT: true,
    consignes: {
      partitions: "Volume 4, page 21 — Solo 6.",
      echauffement:
        "Pour le solo 6, bien s'échauffer avec les exercices 3 et 6 de la p.14.",
      objectifs:
        "Avec le solo 6, difficile, nous insistons sur le travail de l'indépendance des 4 membres. Il s'adresse à celles et ceux qui peuvent consacrer beaucoup de temps à l'étude, sinon, bien insister sur le solo 4 ou 5 et revenir sur ce solo plus tard.",
      tempoCible: { min: 30, max: 60 },
      notes:
        "Petit rappel, là aussi, bien déchiffrer le break d'une ligne avant de jouer la ligne. Travaillons ligne par ligne, donc plusieurs fois la même ligne et puis, un jour, le solo 6 complet.",
    },
  },
];

export const niveau07: Niveau = {
  numero: 7,
  titre: "Doubles croches, indépendance & breaks",
  lessons,
};
