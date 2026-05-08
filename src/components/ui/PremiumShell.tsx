import type { ReactNode } from "react";

export function PremiumShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-radial-lime" />
      <div className="pointer-events-none absolute inset-0 bg-soft-grid bg-[size:48px_48px] opacity-[0.18] [mask-image:radial-gradient(circle_at_top,black,transparent_68%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-limefit-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-16rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-limefit-600/10 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
