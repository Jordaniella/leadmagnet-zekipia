"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Gauge, Sparkles, Target, Timer, UsersRound, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/features/quiz/store/hooks";
import { startQuiz } from "@/features/quiz/store/quizSlice";

const benefits = [
  { title: "Votre score de maturité IA", icon: Gauge, text: "Un score lisible sur 63 pour situer votre niveau en quelques secondes." },
  { title: "Les blocages qui vous ralentissent", icon: Target, text: "Les 1 à 2 freins prioritaires qui empêchent l’IA de produire de vrais gains." },
  { title: "Votre plan d’action 30 jours", icon: Zap, text: "Une priorité claire, une action immédiate et une checklist concrète." },
];

const audiences = ["CEO / dirigeant de PME", "COO / direction opérations", "Direction commerciale", "Responsable transformation / innovation"];
const reasons = ["Identifier ce qui bloque", "Prioriser le bon chantier", "Passer à l’action rapidement"];

export function LandingPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-limefit-400 text-ink-950">IA</span>
          Audit des 7 blocages IA
        </div>
        <div className="hidden items-center gap-2 text-sm text-white/60 sm:flex">
          <Timer className="h-4 w-4 text-limefit-300" /> 3 minutes
        </div>
      </header>

      <section className="grid flex-1 place-items-center py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-limefit-300/25 bg-limefit-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-limefit-100 shadow-glow-sm">
            <Sparkles className="h-4 w-4" /> +200 PME accompagnées • Diagnostic en 3 minutes
          </div>

          <h1 className="lime-gradient-text text-balance text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Découvrez le niveau de maturité IA de votre PME.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
            En 3 minutes, identifiez les 7 blocages qui freinent vos gains de temps, votre structuration et votre performance. Repartez avec votre score, votre priorité n°1 et votre plan d’action.
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-sm font-medium text-white/72">
            Pour les PME de 50 à 250 employés : <span className="text-white">trop grandes pour improviser, trop petites pour perdre 12 mois.</span>
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => dispatch(startQuiz())} className="h-14 w-full px-8 text-base sm:w-auto">
              Lancer mon diagnostic <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="text-sm text-white/50">21 questions • 3 minutes • Gratuit</div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white/72">
            {["Vous savez où agir en premier", "Vous évitez les projets IA dispersés", "Vous repartez avec une action concrète"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
                <Check className="h-4 w-4 text-limefit-300" /> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4 pb-10 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <motion.article
            key={benefit.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index, duration: 0.45 }}
            className="glass-card group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-limefit-300/25 hover:bg-white/[0.075]"
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-limefit-300/12 text-limefit-300 ring-1 ring-limefit-300/20 transition group-hover:shadow-glow-sm">
              <benefit.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold tracking-[-0.02em]">{benefit.title}</h3>
            <p className="mt-3 leading-7 text-white/58">{benefit.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-4 pb-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-card rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-[-0.03em]">Pourquoi ce diagnostic ?</h2>
          <div className="mt-6 grid gap-3">
            {reasons.map((reason, index) => (
              <div key={reason} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-sm font-black text-limefit-300">0{index + 1}</span>
                <span className="font-semibold text-white/88">{reason}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <UsersRound className="h-6 w-6 text-limefit-300" />
            <h2 className="text-2xl font-black tracking-[-0.03em]">À qui s’adresse ce diagnostic ?</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div key={audience} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 font-semibold text-white/78 transition hover:border-limefit-300/25 hover:text-white">
                {audience}
              </div>
            ))}
          </div>
          <Button onClick={() => dispatch(startQuiz())} className="mt-7 w-full">
            Obtenir mon score IA maintenant <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
