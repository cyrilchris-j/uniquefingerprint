"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialProgressScrubberProps {
  className?: string;
}

export function RadialProgressScrubber({ className }: RadialProgressScrubberProps) {
  const [val, setVal] = useState(70);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>RADIAL LEVEL: {val}%</span><span className="opacity-50 ml-auto">[CYBER HUD]</span></div>

      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]">
          <circle cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-line" />
          <circle
            cx="56"
            cy="56"
            r="44"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={276}
            strokeDashoffset={276 - (val / 100) * 276}
            className="text-ink transition-all duration-100"
          />
        </svg>
        <span className="absolute font-mono text-sm font-bold text-ink">{val}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default RadialProgressScrubber;
