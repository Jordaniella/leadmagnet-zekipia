export type QuizBlock = {
  id: string;
  number: number;
  title: string;
  description: string;
  questions: string[];
  shortDiagnosis: string;
  immediateAction: string;
  priority: string;
};

export type ScoreBand = {
  id: "red" | "orange" | "green";
  range: [number, number];
  label: string;
  tone: string;
  color: string;
  description: string;
};

export type Lead = {
  firstName: string;
  email: string;
};
