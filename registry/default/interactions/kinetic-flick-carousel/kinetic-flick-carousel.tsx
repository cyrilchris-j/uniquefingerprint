"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticFlickCarouselProps {
  className?: string;
}

export function KineticFlickCarousel({ className }: KineticFlickCarouselProps) {
  const [offset, setOffset] = useState(0);

  const flick = (dir: number) => {
    setOffset((o) => Math.max(-120, Math.min(120, o + dir * 60)));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">MOMENTUM FLICK STAGE</span>

      <div className="relative h-32 w-64 overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          <div className="flex gap-3">
            {["Alpha", "Bravo", "Charlie"].map((c) => (
              <div key={c} className="h-24 w-32 rounded-lg border border-white/10 bg-zinc-900/70 p-3 shadow-sm flex items-center justify-center font-bold text-xs font-mono">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => flick(1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          ← Flick Left
        </button>
        <button
          type="button"
          onClick={() => flick(-1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Flick Right →
        </button>
      </div>
    </div>
  );
}

export default KineticFlickCarousel;
