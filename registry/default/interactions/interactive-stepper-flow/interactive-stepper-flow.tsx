"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStepperFlowProps {
  className?: string;
}

export function InteractiveStepperFlow({ className }: InteractiveStepperFlowProps) {
  const [step, setStep] = useState(1);
  const steps = ["Config", "Build", "Deploy", "Verify"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 select-none", className)}>
      <div className="flex items-center gap-3">
        {steps.map((label, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          return (
            <div key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(idx)}
                className={cn(
                  "h-8 w-8 rounded-full font-mono text-xs font-bold transition-all",
                  isDone || isCurrent ? "bg-ink text-paper" : "bg-line/20 text-ink/50"
                )}
              >
                {idx + 1}
              </button>
              {idx < steps.length - 1 && <div className="h-[2px] w-6 bg-line" />}
            </div>
          );
        })}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-violet-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>ACTIVE STEP: {steps[step]}</span><span className="opacity-50 ml-auto">[QUANTUM]</span></div>
    </div>
  );
}

export default InteractiveStepperFlow;
