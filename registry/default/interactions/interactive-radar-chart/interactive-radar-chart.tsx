"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRadarChartProps {
  className?: string;
}

export function InteractiveRadarChart({ className }: InteractiveRadarChartProps) {
  const [val, setVal] = useState(80);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>RADAR METRIC BIAS: {val}%</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>

      <div className="relative flex h-32 w-32 items-center justify-center border border-line rounded-full bg-line/10">
        <div
          className="h-24 w-24 border border-ink/40 rotate-45 transition-transform duration-150"
          style={{ transform: `scale(${val / 100}) rotate(45deg)` }}
        />
      </div>

      <input
        type="range"
        min="20"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRadarChart;
