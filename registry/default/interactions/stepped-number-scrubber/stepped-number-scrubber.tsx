"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SteppedNumberScrubberProps {
  initial?: number;
  className?: string;
}

export function SteppedNumberScrubber({ initial = 120, className }: SteppedNumberScrubberProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>KERNEL TIMEOUT:</span><span className="opacity-50 ml-auto">[CYBER HUD]</span></div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 10))}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-sm font-bold text-ink w-14 text-center">{val}ms</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 10)}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SteppedNumberScrubber;
