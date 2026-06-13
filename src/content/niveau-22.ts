import type { Lesson, Niveau } from "./types";

/**
 * Niveau 22 — transcrit depuis les consignes de la formation (Académie Puchol).
 * Les leçons sont numérotées de façon continue ; le volume (2, 3 ou 4) est une
 * propriété de chaque leçon.
 */
const lessons: Lesson[] = [
  {
    id: "22-1",
    niveau: 22,
    numero: 1,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 168 et annexe.",
      echauffement:
        "Joue chaque interprétation, à tempo lento (40 à la blanche).",
      objectifs:
        "Tu vas développer ta technique, en frisé, en roulé et l'indépendance, mais surtout, ta capacité à jouer dans l'esprit de la musique latine, avec un phrasé simple, aux pieds, mais terriblement efficace ! Tu vas aussi, développer ta créativité en jouant des 4/4 !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Bien jouer fort les pieds, à tempo lento, pour bien synchroniser tes sons à tempo rapide.",
    },
  },
  {
    id: "22-2",
    niveau: 22,
    numero: 2,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Quelques mesures de chabada et d'indépendance.",
      objectifs:
        "Je te propose une mise en situation, le déchiffrage d'une partition de Big Band !",
      tempoCible: { min: 60, max: 160 },
      notes: "Bien voir chacune des parties avant de jouer en entier.",
    },
  },
  {
    id: "22-3",
    niveau: 22,
    numero: 3,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 168 et annexe.",
      echauffement:
        "Joue chaque interprétation, à tempo lento (40 à la blanche).",
      objectifs:
        "Tu vas développer l'indépendance, mais surtout, ta capacité à jouer dans l'esprit du style de musique particulier Latin-Jazz, c'est la combinaison de l'harmonie Jazz et le jeu des percussionnistes latins et des sons de percussions latins ramenés à la batterie avec 3 interprétations. Tu vas aussi développer ta créativité et ton inventivité en sachant interpréter des schémas rythmiques différents !",
      tempoCible: { min: 40, max: 120 },
      notes: "Libre à toi de mémoriser une même phrase et aussi d'inventer !",
    },
  },
  {
    id: "22-4",
    niveau: 22,
    numero: 4,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 142 + annexe.",
      echauffement: "Bien déchiffrer chaque exercice à tempo très lent.",
      objectifs:
        "Savoir placer des interventions (breaks) dans un débit de triples croches.",
      tempoCible: { min: 20, max: 80 },
      notes:
        "Je t'invite à alterner les exercices qui te plaisent avec des rythmes de ton choix.",
    },
  },
  {
    id: "22-5",
    niveau: 22,
    numero: 5,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 93.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Jouer dans le style de Jazz moderne comme Brian Blade, Joey Baron, Clarence Penn, Antonio Sanchez etc…",
      tempoCible: { min: 40, max: 160 },
      notes:
        "Chaque exercice est à alterner avec une mesure de chabada et suivant la vitesse 3 mesures de tempo et l'exercice.",
    },
  },
  {
    id: "22-6",
    niveau: 22,
    numero: 6,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 180.",
      echauffement: "Voir l'explication des 2 interprétations, à tempo lento.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème écrit dans un débit de doubles croches, avec un remplissage de doubles croches, doigté frisé, nuances piano, puis avec un remplissage de doubles croches roulées, en comptant à haute voix, à tempo lento, et en jouant des noires à la grosse caisse.",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer fort en roulé.",
    },
  },
  {
    id: "22-7",
    niveau: 22,
    numero: 7,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 144.",
      echauffement:
        "Voir directement le déchiffrage de la première partie de ce magnifique solo de batterie.",
      objectifs:
        "Nous allons encore, ici, rendre hommage à Steve Gadd qui a influencé un grand nombre de batteurs comme D.Weckl, V.Colaiuta, S.Smith, D.Garibaldi etc…",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Déchiffre bien chacune des mesures. Pièce représentative du niveau à apprendre par coeur !",
    },
  },
  {
    id: "22-8",
    niveau: 22,
    numero: 8,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 94.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Développer ton jeu d'interventions pour des breaks ternaires, en combinant mains et pieds et découvrir le novolets de croches !",
      tempoCible: { min: 60, max: 160 },
      notes: "Chaque exercice est à alterner avec une mesure de chabada.",
    },
  },
  {
    id: "22-9",
    niveau: 22,
    numero: 9,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 181.",
      echauffement: "Voir l'explication des 2 interprétations, à tempo lento.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème écrit en 12/8 dans un débit de croches, un remplissage de croches, doigté frisé, nuances piano, puis avec un remplissage de croches roulées, en comptant à haute voix, à tempo lento, et en jouant des noires, au pied, à la charleston.",
      tempoCible: { min: 40, max: 130 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer fort en roulé.",
    },
  },
  {
    id: "22-10",
    niveau: 22,
    numero: 10,
    volume: 3,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 3 page 144.",
      echauffement:
        "Voir directement le déchiffrage de la deuxième partie de ce magnifique solo de batterie.",
      objectifs:
        "Nous allons encore, ici, rendre hommage à Steve Gadd qui a influencé un grand nombre de batteurs comme D.Weckl, V.Colaiuta, S.Smith, D.Garibaldi etc…",
      tempoCible: { min: 30, max: 80 },
      notes:
        "Pièce représentative du niveau à apprendre par coeur ! Tu peux tout aussi bien improviser ou composer un solo avant ou entre les 2 parties de ce solo !",
    },
  },
  {
    id: "22-11",
    niveau: 22,
    numero: 11,
    volume: 4,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 4 page 95.",
      echauffement: "Voir directement les exercices de la page.",
      objectifs:
        "Savoir jouer dans un débit de triolets de croches, doigté roulé, et coordonner des cymbales crash avec la grosse caisse, dans des breaks en jazz.",
      tempoCible: { min: 40, max: 160 },
      notes:
        "Ici, il vaut mieux faire tourner en boucle l'exercice avant de l'alterner avec une mesure de tempo (chabada).",
    },
  },
  {
    id: "22-12",
    niveau: 22,
    numero: 12,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 192 Thème A.",
      echauffement:
        "Quelques frappes en mélangeant des doubles croches et des triolets de croches à 60 BPM.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème avec un mélange de mesures, 4/4 et 2/4, dans un débit de doubles croches, avec un remplissage de doubles croches, doigté frisé, nuances piano, puis avec un remplissage de doubles croches roulées, et un remplissage de croches, doigté frisé et roulé, dans les mesures en triolets.",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer fort en roulé.",
    },
  },
  {
    id: "22-13",
    niveau: 22,
    numero: 13,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Volume 2 page 192 Thème B.",
      echauffement:
        "Quelques frappes en mélangeant des doubles croches et des triolets de croches à 60 BPM.",
      objectifs:
        "Tu vas développer ta technique de caisse claire en interprétant un thème avec un mélange de mesures, 7/8 et 2/4, dans un débit de doubles croches, avec un remplissage de doubles croches, doigté frisé, nuances piano, puis avec un remplissage de doubles croches roulées, et un remplissage de croches, doigté frisé et roulé, dans les mesures en triolets.",
      tempoCible: { min: 60, max: 120 },
      notes:
        "Je t'invite, pour ce thème B, à garder un battement régulier avec la charleston, au pied, un battement « immuable », même en changeant de mesure pour un bel effet rythmique ! Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à jouer fort en roulé.",
    },
  },
  {
    id: "22-14",
    niveau: 22,
    numero: 14,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Déchiffrage à tempo lento.",
      objectifs: "Jouer ce magnifique rythme Brésilien !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à bien maîtriser le decrescendo du roulé.",
    },
  },
  {
    id: "22-15",
    niveau: 22,
    numero: 15,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Déchiffrage à tempo lento.",
      objectifs: "Maîtrise d'un solo incluant le rythme Brésilien « Frevo » !",
      tempoCible: { min: 40, max: 120 },
      notes:
        "Toujours bien insister, à tempo lento, à jouer le remplissage en frisé le plus piano possible et à bien maîtriser le decrescendo du roulé. Le déroulé de la partition est le suivant : Partie A puis B puis C jusqu'au signe « DS al coda » puis remonte au signe de renvoi (le serpent) et rejoue la partie B puis au ballon de coda placé avant C passe directement à la partie D puis E.",
    },
  },
  {
    id: "22-16",
    niveau: 22,
    numero: 16,
    volume: 2,
    hasVideo: true,
    hasBT: false,
    consignes: {
      partitions: "Annexe.",
      echauffement: "Déchiffrage à tempo lento.",
      objectifs: "Maîtrise d'un solo incluant le rythme Brésilien « Frevo » !",
      tempoCible: { min: 40, max: 120 },
      notes: "Texte à apprendre par cœur !",
    },
  },
];

export const niveau22: Niveau = {
  numero: 22,
  titre: "Latin-Jazz, brésilien & solos de batterie",
  lessons,
};
