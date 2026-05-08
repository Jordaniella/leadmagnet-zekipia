import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "focus-ring group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-45",
          variant === "primary" &&
            "bg-limefit-400 text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,.12)_inset,0_18px_50px_rgba(183,249,50,.28)] hover:-translate-y-0.5 hover:bg-limefit-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,.18)_inset,0_24px_70px_rgba(183,249,50,.38)]",
          variant === "secondary" &&
            "border border-white/12 bg-white/[0.07] text-white hover:-translate-y-0.5 hover:border-limefit-300/35 hover:bg-white/[0.1]",
          variant === "ghost" &&
            "text-white/70 hover:bg-white/[0.07] hover:text-white",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
