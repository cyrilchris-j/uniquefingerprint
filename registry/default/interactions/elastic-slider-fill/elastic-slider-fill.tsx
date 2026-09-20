"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderFillProps {
  className?: string;
}

export function ElasticSliderFill({ className }: ElasticSliderFillProps) {
  const [level, setLevel] = useState(65);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-rose-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>TANK FILL: {level}%</span><span className="opacity-50 ml-auto">[AVIONICS]</span></div>

      <div className="relative h-44 w-14 overflow-hidden rounded-lg border border-line bg-line/20 flex items-end">
        <div
          className="w-full bg-ink transition-all duration-150 ease-out"
          style={{ height: `${level}%` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={level}
        onChange={(e) => setLevel(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default ElasticSliderFill;
