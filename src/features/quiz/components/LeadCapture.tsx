"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/features/quiz/store/hooks";
import { submitLead } from "@/features/quiz/store/quizSlice";

async function persistLeadLocally(lead: { firstName: string; email: string }) {
  localStorage.setItem("zekipia-ai-audit-lead", JSON.stringify({ ...lead, createdAt: new Date().toISOString() }));
  // Futur branchement API / webhook / CRM : await fetch('/api/leads', { method: 'POST', body: JSON.stringify(lead) })
}

export function LeadCapture() {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanFirstName = firstName.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanFirstName.length < 2 || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("Indiquez un prénom et un email valide pour afficher le résultat.");
      return;
    }
    const lead = { firstName: cleanFirstName, email: cleanEmail };
    await persistLeadLocally(lead);
    dispatch(submitLead(lead));
  };

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-4xl place-items-center px-4 py-10 sm:px-6">
      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass-card w-full overflow-hidden rounded-[2rem]"
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 bg-limefit-300 p-8 text-ink-950 lg:border-b-0 lg:border-r">
            <MailCheck className="h-12 w-12" />
            <h1 className="mt-8 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">Votre diagnostic est prêt</h1>
            <p className="mt-5 text-base font-medium leading-7 text-ink-950/72">
              Une dernière étape pour recevoir votre résultat complet et votre plan d’action IA 30 jours.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
            <p className="text-lg leading-8 text-white/70">
              Entrez votre prénom et votre email pour afficher immédiatement votre analyse personnalisée.
            </p>
            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/70">Prénom</span>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="focus-ring h-14 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white placeholder:text-white/28"
                  placeholder="Votre prénom"
                  autoComplete="given-name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/70">Email professionnel</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="focus-ring h-14 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-white placeholder:text-white/28"
                  placeholder="vous@entreprise.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
            </div>
            {error && <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p>}
            <Button type="submit" className="mt-7 h-14 w-full text-base">
              Voir mon résultat <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/42">
              <LockKeyhole className="h-3.5 w-3.5" /> Données stockées localement pour cette version de test.
            </p>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
