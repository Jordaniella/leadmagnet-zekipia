import type { QuizBlock, ScoreBand } from "@/features/quiz/lib/types";

export const responseOptions = [
  { value: 0, label: "Pas du tout vrai" },
  { value: 1, label: "Partiellement vrai" },
  { value: 2, label: "Globalement vrai" },
  { value: 3, label: "Totalement vrai" },
] as const;

export const quizBlocks: QuizBlock[] = [
  {
    id: "pilotage",
    number: 1,
    title: "L’IA est utilisée, mais pas pilotée",
    description: "L’IA est peut-être déjà présente chez vous, mais sans cadre commun ni pilotage réel.",
    questions: [
      "Nous savons précisément quels services utilisent déjà l’IA.",
      "Nous avons défini les cas d’usage IA prioritaires pour les 90 prochains jours.",
      "Une personne ou une équipe est responsable de la coordination IA.",
    ],
    shortDiagnosis: "Si votre score est faible, l’IA existe chez vous mais reste invisible, dispersée et peu pilotée.",
    immediateAction: "Cartographier les usages IA existants et identifier les risques ou doublons.",
    priority: "Cartographier les usages IA existants",
  },
  {
    id: "process",
    number: 2,
    title: "Les équipes testent des outils, mais les process ne changent pas",
    description: "Tester des outils ne suffit pas. La vraie valeur arrive quand les méthodes de travail changent.",
    questions: [
      "Nos usages IA sont intégrés dans des process concrets, pas seulement dans des tests individuels.",
      "Nous avons identifié les tâches répétitives à automatiser en priorité.",
      "Les managers savent où l’IA peut réduire les délais ou améliorer la qualité.",
    ],
    shortDiagnosis: "Si votre score est faible, l’enthousiasme existe, mais les gains restent peu visibles.",
    immediateAction: "Choisir un process à fort volume et créer une version assistée par IA.",
    priority: "Transformer un process concret",
  },
  {
    id: "priorisation",
    number: 3,
    title: "La direction veut avancer, mais ne sait pas quoi prioriser",
    description: "Le vrai risque n’est pas de manquer d’idées, mais de lancer trop d’initiatives mal choisies.",
    questions: [
      "Nous savons quels cas d’usage IA auront le plus d’impact business.",
      "Nous avons une matrice simple pour arbitrer entre impact, effort et risque.",
      "Nous évitons de lancer des projets IA sans propriétaire clair.",
    ],
    shortDiagnosis: "Si votre score est faible, vous risquez de disperser vos efforts.",
    immediateAction: "Prioriser 2 à 3 cas d’usage business à impact mesurable.",
    priority: "Prioriser 3 cas d’usage business",
  },
  {
    id: "donnees",
    number: 4,
    title: "Les données existent, mais elles sont dispersées",
    description: "L’IA n’efface pas le désordre informationnel. Elle le révèle.",
    questions: [
      "Nos documents, procédures et informations clés sont faciles à retrouver.",
      "Nous savons quelles données peuvent être utilisées avec des outils IA.",
      "Les équipes utilisent une source de vérité claire pour les informations importantes.",
    ],
    shortDiagnosis: "Si votre score est faible, le problème principal est peut-être la structuration de l’information.",
    immediateAction: "Centraliser les documents et données clés avant d’automatiser.",
    priority: "Centraliser les données et documents clés",
  },
  {
    id: "humain",
    number: 5,
    title: "Les collaborateurs ont peur d’être remplacés ou jugés",
    description: "Le frein n’est pas seulement technique. Il est aussi humain.",
    questions: [
      "Les équipes comprennent que l’IA doit augmenter leur travail, pas simplement les contrôler.",
      "Nous avons expliqué clairement les règles d’usage de l’IA.",
      "Les collaborateurs savent sur quelles tâches l’IA est encouragée ou interdite.",
    ],
    shortDiagnosis: "Si votre score est faible, la transformation peut se heurter à la résistance ou à la méfiance.",
    immediateAction: "Créer une charte IA simple, claire et rassurante.",
    priority: "Créer une charte IA simple",
  },
  {
    id: "roi",
    number: 6,
    title: "Il n’y a pas de mesure du ROI IA",
    description: "Sans mesure, impossible de distinguer un vrai levier d’un simple effet de mode.",
    questions: [
      "Nous mesurons le temps gagné grâce aux usages IA.",
      "Nous suivons au moins un indicateur business lié à nos projets IA.",
      "Nous savons arrêter les usages IA qui n’apportent pas de valeur.",
    ],
    shortDiagnosis: "Si votre score est faible, vous avez des usages mais pas encore de preuve de valeur.",
    immediateAction: "Définir un indicateur simple pour chaque cas d’usage IA.",
    priority: "Mettre en place des indicateurs ROI",
  },
  {
    id: "attentisme",
    number: 7,
    title: "L’entreprise attend le bon moment",
    description: "Le plus grand risque est souvent l’attentisme.",
    questions: [
      "Nous avons lancé au moins un cas d’usage IA concret dans les 30 derniers jours.",
      "Nous acceptons de commencer petit avant de généraliser.",
      "Nous avons défini une prochaine étape IA claire pour ce mois-ci.",
    ],
    shortDiagnosis: "Si votre score est faible, l’entreprise est probablement dans une attente coûteuse.",
    immediateAction: "Lancer un pilote IA de 14 jours sur un périmètre simple.",
    priority: "Lancer un pilote IA de 14 jours",
  },
];

export const scoreBands: ScoreBand[] = [
  {
    id: "red",
    range: [0, 21],
    label: "Zone rouge",
    tone: "À cadrer immédiatement",
    color: "#fb7185",
    description:
      "Votre entreprise risque de subir l’IA plus que de la piloter. La priorité est de cadrer les usages, sécuriser les pratiques et choisir un premier cas d’usage mesurable.",
  },
  {
    id: "orange",
    range: [22, 42],
    label: "Zone orange",
    tone: "Potentiel à structurer",
    color: "#f59e0b",
    description:
      "Vous avez un vrai potentiel, mais vous manquez encore de méthode, de priorisation ou de pilotage clair.",
  },
  {
    id: "green",
    range: [43, 63],
    label: "Zone verte",
    tone: "Base solide",
    color: "#b7f932",
    description:
      "Votre base est solide. L’enjeu est maintenant d’accélérer, structurer et industrialiser ce qui fonctionne.",
  },
];
