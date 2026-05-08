"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Check, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { quizBlocks } from "@/features/quiz/data/quizData";
import { getBlockScore, getScoreBand, getTotalScore, getWeakestBlocks } from "@/features/quiz/lib/scoring";
import { useAppDispatch, useAppSelector } from "@/features/quiz/store/hooks";
import { restart } from "@/features/quiz/store/quizSlice";

function ScoreRing({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 86;
  const offset = circumference - (score / 63) * circumference;

  return (
    <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
      <div className="absolute inset-4 rounded-full blur-2xl" style={{ backgroundColor: `${color}22` }} />
      <svg viewBox="0 0 220 220" className="relative h-full w-full -rotate-90">
        <circle cx="110" cy="110" r="86" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="18" />
        <motion.circle
          cx="110"
          cy="110"
          r="86"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="18"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black tracking-[-0.06em]">
            {score}
          </motion.div>
          <div className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-white/46">sur 63</div>
        </div>
      </div>
    </div>
  );
}

export function ResultsPage() {
  const dispatch = useAppDispatch();
  const { answers, lead } = useAppSelector((state) => state.quiz);
  const totalScore = getTotalScore(answers);
  const band = getScoreBand(totalScore);
  const weakest = getWeakestBlocks(answers, 2);
  const priority = weakest[0];

  const checklist = [
    `Cadrer la priorité : ${priority.block.priority}.`,
    "Nommer un responsable et un délai de décision clair.",
    "Mesurer un indicateur simple : temps gagné, qualité, délai ou marge.",
    "Faire un point à 30 jours pour décider : arrêter, corriger ou déployer.",
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-limefit-300/25 bg-limefit-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-limefit-100">
              <Trophy className="h-4 w-4" /> Votre diagnostic IA
            </div>
            <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              {lead?.firstName ? `${lead.firstName}, voici votre score de maturité IA.` : "Votre score de maturité IA."}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/64">{band.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold" style={{ color: band.color }}>
                {band.label} • {band.tone}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/68">
                Top priorité : {priority.block.priority}
              </span>
            </div>
          </div>
          <ScoreRing score={totalScore} color={band.color} />
        </div>
      </motion.header>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.78fr]">
        <div className="space-y-5">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-limefit-300" />
              <h2 className="text-2xl font-black tracking-[-0.03em]">Vos blocages les plus faibles</h2>
            </div>
            <div className="mt-6 grid gap-4">
              {weakest.map(({ block, score }, index) => (
                <motion.article
                  key={block.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="rounded-[1.6rem] border border-white/10 bg-ink-900/78 p-5 transition hover:border-limefit-300/25"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-limefit-300">Blocage {block.number}</div>
                      <h3 className="mt-2 text-xl font-black tracking-[-0.03em]">{block.title}</h3>
                    </div>
                    <div className="rounded-2xl bg-white/[0.06] px-4 py-3 text-center">
                      <div className="text-3xl font-black text-white">{score}/9</div>
                      <div className="text-xs uppercase tracking-[0.14em] text-white/38">score</div>
                    </div>
                  </div>
                  <p className="mt-4 leading-7 text-white/60">{block.shortDiagnosis}</p>
                  <div className="mt-4 rounded-2xl border border-limefit-300/20 bg-limefit-300/8 p-4 text-sm font-semibold leading-6 text-limefit-50">
                    Action immédiate : {block.immediateAction}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 sm:p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-limefit-300 text-ink-950 shadow-glow-sm">
              <CalendarDays className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black tracking-[-0.03em]">Votre priorité des 30 prochains jours</h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-white/65">
              Traitez d’abord : <span className="font-bold text-white">{priority.block.priority}</span>. C’est le chantier le plus susceptible de créer une victoire rapide sans disperser vos équipes.
            </p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-limefit-300" />
              <h2 className="text-2xl font-black tracking-[-0.03em]">Vos prochaines actions</h2>
            </div>
            <div className="mt-6 space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm font-medium leading-6 text-white/72">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-limefit-300" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-limefit-300/25 bg-limefit-300 p-6 text-ink-950 shadow-glow sm:p-8">
            <h2 className="text-3xl font-black leading-none tracking-[-0.05em]">Passez du score au plan d’exécution.</h2>
            <p className="mt-4 font-medium leading-7 text-ink-950/72">
              Réservez un diagnostic stratégique pour transformer votre priorité en feuille de route claire.
            </p>
            <a href="mailto:contact@zekipia.com?subject=Diagnostic%20stratégique%20IA" className="focus-ring mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink-950 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-ink-850">
              Réserver mon diagnostic stratégique <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Button variant="ghost" onClick={() => dispatch(restart())} className="mt-3 w-full text-ink-950 hover:bg-ink-950/10 hover:text-ink-950">
              <RotateCcw className="mr-2 h-4 w-4" /> Recommencer le diagnostic
            </Button>
          </div>
        </aside>
      </section>

      <section className="mt-5 grid gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-7">
        {quizBlocks.map((block) => {
          const score = getBlockScore(answers, block.id);
          return (
            <div key={block.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/35">B{block.number}</span>
                <Check className="h-4 w-4 text-limefit-300" />
              </div>
              <div className="mt-4 text-2xl font-black">{score}/9</div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">{block.title}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
