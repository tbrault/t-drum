import type { Lesson, Niveau } from "./types";

/**
 * Niveau 23 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "23-1",
    niveau: 23,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "annexe 1ère page, lignes 1 à 6.",
      echauffement:
        "- 3 coups de chaque main.\n- sextolets/sextolets roulés en forte et en nuance piano.",
      objectifs:
        "Tu vas conclure, au niveau technique de caisse claire, ce cycle d'études, par la plus belle pièce de caisse claire au monde !",
      notes:
        "Tous les « coups » de tambour sont répertoriés, des changements de débit, des mélanges binaires/ternaires, les nuances de triple piano à triple forte, une accélération et un ralenti en entendant le train à vapeur qui démarre, prend de la vitesse, change de rails, passe sous les tunnels, et ralenti pour entrer en gare et l'arrêt des machines, en un seul mot : bluffant ! Nous déchiffrons les 6 premières lignes, à tempo lento, 30 BPM (60 à la croche), puis enchaînons pour atteindre 60 BPM.",
    },
  },
  {
    id: "23-2",
    niveau: 23,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement: "Bien faire tourner l'ostinato aux pieds !",
      objectifs:
        "Développer ton vocabulaire ternaire, en 3 temps, tout en lisant des figures syncopées. Études de 4/4 et 8/8 en 3 temps.",
      tempoCible: { min: 60, max: 210 },
      notes:
        "Bien prendre appui avec les pieds en jouant fort la grosse caisse et la charleston.",
    },
  },
  {
    id: "23-3",
    niveau: 23,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 70 du volume 4, rythme basique, utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz, en lisant des phrases syncopées et en faisant « chanter » la caisse claire.",
      tempoCible: { min: 60, max: 160 },
      notes:
        "Tu peux jouer ligne par ligne ou des demi pages ou la page complète.",
    },
  },
  {
    id: "23-4",
    niveau: 23,
    numero: 4,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement:
        "Bien faire tourner l'ostinato aux pieds et jouer un débit de croches ternaires en nuance piano, à tempo lento !",
      objectifs:
        "Développer ton vocabulaire ternaire, en 3 temps tout en lisant des figures syncopées. Études de 4/4 et 8/8 en 3 temps.",
      tempoCible: { min: 60, max: 210 },
      notes:
        "Bien prendre appui avec les pieds en jouant fort la grosse caisse et la charleston.\nEn 2ème étude, faire chanter tes toms !",
    },
  },
  {
    id: "23-5",
    niveau: 23,
    numero: 5,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement:
        "Bien faire tourner l'ostinato aux pieds et jouer les exercices préparatoires proposés dans la vidéo !",
      objectifs:
        "Développer ton vocabulaire ternaire, en 3 temps tout en lisant des figures syncopées. Études de 4/4 et 8/8 en 3 temps.",
      tempoCible: { min: 60, max: 160 },
      notes:
        "Bien prendre appui avec les pieds en jouant fort la grosse caisse et la charleston.\nSois bien attentif à garder le remplissage le plus piano possible. En 2ème étude, faire chanter tes toms !",
    },
  },
  {
    id: "23-6",
    niveau: 23,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 165.",
      echauffement: "Déchiffrer lentement, ligne par ligne !",
      objectifs:
        "Donner une dimension orchestrale à ton jeu, en respectant les durées de notes d'un tutti de cuivres, en lisant des figures syncopées.",
      tempoCible: { min: 60, max: 160 },
      notes: "Bien faire tourner le chabada sans la grosse caisse.",
    },
  },
  {
    id: "23-7",
    niveau: 23,
    numero: 7,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 143.",
      echauffement:
        "Je te conseille une mise en équilibre à tempo lento afin de déchiffrer ce magnifique solo d'un des plus grands batteurs de l'histoire !\n\nUn temps doubles croches / un temps en triples croches à 20 BPM soit 40 à la croche pour aborder au mieux la 1ère mesure.",
      objectifs:
        "Nous allons encore, ici, rendre hommage à Dave Weckl, qui dans ce solo va alterner des motifs complexes en sextolets, en triples croches et aussi des coups simples et des espaces (silences). Tu vas encore progresser en maîtrise technique, coordination etc...",
      tempoCible: { min: 20, max: 30 },
      notes: "Pièce représentative du niveau à apprendre par coeur !",
    },
  },
  {
    id: "23-8",
    niveau: 23,
    numero: 8,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 96.",
      echauffement:
        "Je te conseille, là aussi, une bonne mise en équilibre pour déchiffrer ce très difficile solo ternaire. 4 phrases d'indépendance avec chabada à 40 BPM.",
      objectifs:
        "Avec le solo 21, solo de 2 pages, tu vas mettre en application toutes tes connaissances en ternaire, technique, indépendance, indépendance absolue, coordination, en recherchant à tout instant, la musicalité (nuances, qualité de son, etc...)",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "23-9",
    niveau: 23,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "annexe 1ère page ligne 7 à 12.",
      echauffement:
        "- 4 coups de chaque main.\n- revoir la gamme moulin dans un débit de doubles croches et avec des notes fantômes.",
      objectifs:
        "Tu vas conclure ce cycle d'études par la plus belle pièce de caisse claire au monde !",
      notes:
        "Nous déchiffrons les 6 dernières lignes, à tempo lento, 30 BPM (60 à la croche) puis en enchaînons les lignes jusqu'à 60 BPM et même 64 ou 66 à la fin de la ligne 12.",
    },
  },
  {
    id: "23-10",
    niveau: 23,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 143.",
      echauffement: "Voir directement la 4ème ligne à 30 BPM (60 à la croche).",
      objectifs:
        "Nous allons encore, ici, rendre hommage à Dave Weckl, qui dans ce solo va alterner des motifs complexes en sextolets, en triples croches et aussi des coups simples et des espaces (silences). Tu vas encore progresser en maîtrise technique, coordination etc...",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Pièce représentative du niveau à apprendre par coeur !\n\nTu peux tout aussi bien improviser ou composer un solo avant ou après ce solo !",
    },
  },
  {
    id: "23-11",
    niveau: 23,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 97.",
      echauffement:
        "Je te conseille, là aussi, une bonne mise en équilibre pour déchiffrer ce très difficile solo ternaire. 4 phrases d'indépendance avec chabada à 40 BPM.",
      objectifs:
        "Avec le solo 21, solo de 2 pages, tu vas mettre en application toutes tes connaissances en ternaire, technique, indépendance, indépendance absolue, coordination, en recherchant à tout instant, la musicalité (nuances, qualité de son, etc...)",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "23-12",
    niveau: 23,
    numero: 12,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 99.",
      echauffement: "Bien faire tourner l'ostinato aux pieds !",
      objectifs:
        "Développer ton vocabulaire ternaire, en 3 temps, tout en lisant des figures syncopées complexes et bien contrôler les espaces (silences). Études de 4/4 et 8/8 en 3 temps.",
      tempoCible: { min: 60, max: 210 },
      notes:
        "Bien prendre appui avec les pieds en jouant fort la grosse caisse et la charleston.",
    },
  },
  {
    id: "23-13",
    niveau: 23,
    numero: 13,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 99.",
      echauffement:
        "Bien faire tourner le rythme n.1 de la page 70 du volume 4, rythme basique, utilisé pour jouer une « valse Jazz » !",
      objectifs:
        "Développer l'indépendance ternaire en 3 temps, dans le style valse Jazz, en lisant des phrases syncopées plus complexes que la leçon 3 et en faisant « chanter » la caisse claire.",
      tempoCible: { min: 60, max: 160 },
      notes:
        "Tu peux jouer ligne par ligne ou des demi pages ou la page complète.",
    },
  },
  {
    id: "23-14",
    niveau: 23,
    numero: 14,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 99.",
      echauffement: "Déchiffrer lentement, ligne par ligne !",
      objectifs:
        "Donner une dimension orchestrale à ton jeu, en respectant les durées de notes d'un tutti de cuivres, en lisant des figures syncopées plus complexes que la leçon 6.",
      tempoCible: { min: 60, max: 160 },
      notes: "Bien faire tourner le chabada sans la grosse caisse.",
    },
  },
  {
    id: "23-15",
    niveau: 23,
    numero: 15,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 115.",
      echauffement:
        "Frisé mains simultanées (tom basse/caisse claire) et grosse caisse, puis le roulé mains/pieds. Déchiffrage à 40 BPM (80 à la noire).",
      objectifs: "Coordination mains/pieds dans le style hard bop !",
      tempoCible: { min: 40, max: 152 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, puis 2 lignes par 2 lignes avant de le jouer en entier !",
    },
  },
  {
    id: "23-16",
    niveau: 23,
    numero: 16,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 116/117.",
      echauffement:
        "2 phrases en roulé main faible/grosse caisse puis main forte/grosse caisse et alterner une mesure de chaque. Déchiffrage à 40 BPM (80 à la noire).",
      objectifs:
        "Le roulé mains/pieds, coordination absolue mains/pieds dans le style hard bop !",
      tempoCible: { min: 40, max: 152 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, avant de le jouer en entier !",
    },
  },
  {
    id: "23-17",
    niveau: 23,
    numero: 17,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "annexe 2ème page, lignes 13 à 18.",
      echauffement:
        "- 3 coups de chaque main.\n- sextolets/sextolets roulés en forte et en nuance piano.",
      objectifs:
        "Tu vas conclure ce cycle d'études par la plus belle pièce de caisse claire au monde !",
      notes:
        "Nous déchiffrons les 6 premières lignes, à tempo lento, 30 BPM (60 à la croche) puis enchaînons les lignes en atteignant 70 BPM ou plus.",
    },
  },
  {
    id: "23-18",
    niveau: 23,
    numero: 18,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 118/119.",
      echauffement: "Directement le déchiffrage à 40 BPM (80 à la noire).",
      objectifs:
        "Jeu avec chabada binaire et étude des 4/4 en C barré, dans le style hard bop !",
      tempoCible: { min: 40, max: 152 },
      notes:
        "Bien déchiffrer ligne par ligne et lentement, puis 2 lignes par 2 lignes avant de le jouer en entier !",
    },
  },
  {
    id: "23-19",
    niveau: 23,
    numero: 19,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 pages 115/116/117/118/119.",
      echauffement: "Directement le déchiffrage à 40 BPM (80 à la noire).",
      objectifs: "Jeu en C barré, dans le style hard bop !",
      tempoCible: { min: 40, max: 152 },
      notes:
        "Ce triptyque est un beau morceau de bravoure et d'endurance, dans l'esprit des grands jazzmen de be bop et de hard bop !",
    },
  },
  {
    id: "23-20",
    niveau: 23,
    numero: 20,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "annexe 2ème page, lignes 19 à 24.",
      echauffement:
        "- 3 coups de chaque main.\n- sextolets/sextolets roulés en forte et en nuance piano.",
      objectifs:
        "Tu vas conclure ce cycle d'études par la plus belle pièce de caisse claire au monde !",
      notes:
        "Nous déchiffrons les 6 dernières lignes, à tempo lento, 30 BPM (60 à la croche) puis enchainons les lignes pour jouer à 70 BPM ou plus, et commençons à ralentir à la ligne 20 et ralentir franchement de 60 à 30 BPM les 8 premières mesures de la ligne. Le dernier motif se déchiffre de 20 à 30 BPM.",
    },
  },
];

export const niveau23: Niveau = {
  numero: 23,
  titre: "Solos ternaires, hard bop & caisse claire",
  lessons,
};
