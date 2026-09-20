"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveMatrixToggleProps {
  className?: string;
}

export function InteractiveMatrixToggle({ className }: InteractiveMatrixToggleProps) {
  const [cells, setCells] = useState<boolean[]>(Array(16).fill(false));

  const toggle = (idx: number) => {
    setCells((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-rose-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>4x4 BITBOARD MATRIX</span><span className="opacity-50 ml-auto">[AVIONICS]</span></div>

      <div className="grid grid-cols-4 gap-1.5">
        {cells.map((active, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "h-8 w-8 cursor-pointer rounded border font-mono text-[9px] flex items-center justify-center transition-colors",
              active ? "border-ink bg-ink text-paper" : "border-line bg-line/20 text-ink/40"
            )}
          >
            {active ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMatrixToggle;
