"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderKnobProps {
  className?: string;
}

export function ElasticSliderKnob({ className }: ElasticSliderKnobProps) {
  const [angle, setAngle] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>SPRING RECOIL JOG: {angle}°</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-line bg-line/20">
        <div
          className="h-16 w-16 rounded-full border border-line bg-ink shadow-md transition-transform duration-200 ease-out flex items-start justify-center pt-1"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="h-3 w-1 bg-paper rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setAngle(-60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Left
        </button>
        <button
          type="button"
          onClick={() => {
            setAngle(60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Right
        </button>
      </div>
    </div>
  );
}

export default ElasticSliderKnob;
