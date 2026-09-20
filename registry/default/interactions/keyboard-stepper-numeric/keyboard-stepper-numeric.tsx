"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardStepperNumericProps {
  initial?: number;
  className?: string;
}

export function KeyboardStepperNumeric({ initial = 60, className }: KeyboardStepperNumericProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-rose-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>FPS TARGET:</span><span className="opacity-50 ml-auto">[AVIONICS]</span></div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(1, v - 1))}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-base font-bold text-ink w-12 text-center">{val}</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 1)}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default KeyboardStepperNumeric;
