"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FollowPathCursorProps {
  className?: string;
}

export function FollowPathCursor({ className }: FollowPathCursorProps) {
  const [t, setT] = useState(0.5);

  const x = t * 240 + 20;
  const y = 50 + Math.sin(t * Math.PI * 2) * 30;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>PARAMETRIC RAIL TRACKER</span><span className="opacity-50 ml-auto">[TACTILE]</span></div>
      <div className="relative h-28 w-72">
        <svg className="h-full w-full overflow-visible">
          <path
            d="M 20 50 Q 80 10 140 50 T 260 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-line"
          />
        </svg>
        <div
          className="absolute -ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-paper bg-ink shadow-md transition-all duration-75"
          style={{ left: x, top: y }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={t}
        onChange={(e) => setT(parseFloat(e.target.value))}
        className="w-48 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default FollowPathCursor;
