"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRangeGaugeProps {
  className?: string;
}

export function InteractiveRangeGauge({ className }: InteractiveRangeGaugeProps) {
  const [val, setVal] = useState(64);
  const angle = (val / 100) * 180 - 90;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>CAPACITY GAUGE: {val}%</span><span className="opacity-50 ml-auto">[CYBER HUD]</span></div>

      <div className="relative flex h-28 w-48 items-end justify-center overflow-hidden border-b-2 border-line">
        <div
          className="h-20 w-1 bg-ink rounded-full origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div className="absolute bottom-0 h-4 w-4 rounded-full bg-ink" />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-40 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRangeGauge;
