"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lead } from "@/features/quiz/lib/types";
import type { AnswersState } from "@/features/quiz/lib/scoring";

type QuizView = "landing" | "quiz" | "lead" | "results";

type QuizState = {
  view: QuizView;
  currentStep: number;
  answers: AnswersState;
  lead?: Lead;
};

const initialState: QuizState = {
  view: "landing",
  currentStep: 0,
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz(state) {
      state.view = "quiz";
      state.currentStep = 0;
    },
    setAnswer(
      state,
      action: PayloadAction<{ blockId: string; questionIndex: number; value: number }>,
    ) {
      const { blockId, questionIndex, value } = action.payload;
      const currentAnswers = state.answers[blockId] ?? [];
      currentAnswers[questionIndex] = value;
      state.answers[blockId] = currentAnswers;
    },
    nextStep(state) {
      if (state.currentStep < 6) {
        state.currentStep += 1;
      } else {
        state.view = "lead";
      }
    },
    previousStep(state) {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      } else {
        state.view = "landing";
      }
    },
    submitLead(state, action: PayloadAction<Lead>) {
      state.lead = action.payload;
      state.view = "results";
    },
    restart(state) {
      state.view = "landing";
      state.currentStep = 0;
      state.answers = {};
      state.lead = undefined;
    },
  },
});

export const { startQuiz, setAnswer, nextStep, previousStep, submitLead, restart } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
