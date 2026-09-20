"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleSwitchMorphProps {
  className?: string;
}

export function ToggleSwitchMorph({ className }: ToggleSwitchMorphProps) {
  const [on, setOn] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>LIVE TRACING</span><span className="opacity-50 ml-auto">[RADAR V2]</span></div>
      <div
        onClick={() => setOn((o) => !o)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          on ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 rounded-full bg-paper shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            on ? "w-6 translate-x-8" : "w-6 translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitchMorph;
