"use client";

import { PremiumShell } from "@/components/ui/PremiumShell";
import { LandingPage } from "@/features/quiz/components/LandingPage";
import { LeadCapture } from "@/features/quiz/components/LeadCapture";
import { QuizStep } from "@/features/quiz/components/QuizStep";
import { ResultsPage } from "@/features/quiz/components/ResultsPage";
import { useAppSelector } from "@/features/quiz/store/hooks";

export function QuizExperience() {
  const view = useAppSelector((state) => state.quiz.view);

  return (
    <PremiumShell>
      {view === "landing" && <LandingPage />}
      {view === "quiz" && <QuizStep />}
      {view === "lead" && <LeadCapture />}
      {view === "results" && <ResultsPage />}
    </PremiumShell>
  );
}
