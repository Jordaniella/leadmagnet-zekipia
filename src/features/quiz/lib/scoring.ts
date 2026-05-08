import { quizBlocks, scoreBands } from "@/features/quiz/data/quizData";

export type AnswersState = Record<string, number[]>;

export function getBlockScore(answers: AnswersState, blockId: string) {
  return (answers[blockId] ?? []).reduce((sum, answer) => sum + answer, 0);
}

export function getTotalScore(answers: AnswersState) {
  return quizBlocks.reduce((sum, block) => sum + getBlockScore(answers, block.id), 0);
}

export function getScoreBand(totalScore: number) {
  return scoreBands.find((band) => totalScore >= band.range[0] && totalScore <= band.range[1]) ?? scoreBands[0];
}

export function getWeakestBlocks(answers: AnswersState, limit = 2) {
  return [...quizBlocks]
    .map((block) => ({ block, score: getBlockScore(answers, block.id) }))
    .sort((a, b) => a.score - b.score || a.block.number - b.block.number)
    .slice(0, limit);
}

export function isBlockComplete(answers: AnswersState, blockId: string) {
  return (answers[blockId] ?? []).filter((answer) => typeof answer === "number").length === 3;
}

export function areAllBlocksComplete(answers: AnswersState) {
  return quizBlocks.every((block) => isBlockComplete(answers, block.id));
}
