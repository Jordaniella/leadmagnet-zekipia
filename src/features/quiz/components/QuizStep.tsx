"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { responseOptions, quizBlocks } from "@/features/quiz/data/quizData";
import { isBlockComplete } from "@/features/quiz/lib/scoring";
import { useAppDispatch, useAppSelector } from "@/features/quiz/store/hooks";
import { nextStep, previousStep, setAnswer } from "@/features/quiz/store/quizSlice";
import { cn } from "@/lib/utils";

export function QuizStep() {
  const dispatch = useAppDispatch();
  const { currentStep, answers } = useAppSelector((state) => state.quiz);
  const block = quizBlocks[currentStep];
  const blockAnswers = answers[block.id] ?? [];
  const complete = isBlockComplete(answers, block.id);
  const progress = ((currentStep + 1) / quizBlocks.length) * 100;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-full border border-white/10 bg-white/[0.045] p-2 backdrop-blur-xl">
        <div className="relative h-3 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-limefit-600 via-limefit-400 to-limefit-100 shadow-glow-sm"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center py-6">
        <AnimatePresence mode="wait">
          <motion.section
            key={block.id}
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="glass-card w-full rounded-[2rem] p-5 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-limefit-300/25 bg-limefit-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-limefit-100">
                  Étape {currentStep + 1} / {quizBlocks.length}
                </div>
                <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">{block.title}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">{block.description}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-ink-900/75 p-4 text-center shadow-card sm:min-w-36">
                <div className="text-4xl font-black text-limefit-300">{blockAnswers.filter((a) => typeof a === "number").length}/3</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">réponses</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {block.questions.map((question, questionIndex) => (
                <article key={question} className="rounded-[1.55rem] border border-white/10 bg-ink-900/70 p-4 sm:p-5">
                  <div className="flex gap-3">
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/8 text-xs font-black text-white/70">{questionIndex + 1}</div>
                    <h2 className="text-base font-semibold leading-7 text-white/90">{question}</h2>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {responseOptions.map((option) => {
                      const selected = blockAnswers[questionIndex] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => dispatch(setAnswer({ blockId: block.id, questionIndex, value: option.value }))}
                          className={cn(
                            "focus-ring group rounded-2xl border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5",
                            selected
                              ? "border-limefit-300/70 bg-limefit-300 text-ink-950 shadow-[0_14px_40px_rgba(183,249,50,.22)]"
                              : "border-white/10 bg-white/[0.045] text-white/68 hover:border-limefit-300/30 hover:bg-white/[0.075] hover:text-white",
                          )}
                          aria-pressed={selected}
                        >
                          <span className="mb-1 flex items-center justify-between gap-2 text-lg font-black">
                            {option.value}
                            {selected && <CheckCircle2 className="h-5 w-5" />}
                          </span>
                          <span className="text-sm font-semibold">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            {!complete && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-amber-300/15 bg-amber-300/8 px-4 py-3 text-sm text-amber-100/80">
                <AlertCircle className="h-4 w-4" /> Sélectionnez une réponse pour chaque affirmation avant de continuer.
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="secondary" onClick={() => dispatch(previousStep())}>
                <ArrowLeft className="mr-2 h-5 w-5" /> Retour
              </Button>
              <Button disabled={!complete} onClick={() => dispatch(nextStep())} className="h-14 px-8">
                {currentStep === quizBlocks.length - 1 ? "Voir la suite" : "Suivant"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
