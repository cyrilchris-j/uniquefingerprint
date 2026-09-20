"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveDiffSliderProps {
  className?: string;
}

export function InteractiveDiffSlider({ className }: InteractiveDiffSliderProps) {
  const [split, setSplit] = useState(50);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      {/* Before Face */}
      <div className="absolute inset-0 flex items-center justify-start p-6 bg-line/10">
        <span className="font-mono text-sm font-bold text-ink">ORIGINAL SPEC_V1</span>
      </div>

      {/* After Face (Clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-end p-6 bg-ink text-paper"
        style={{ clipPath: `inset(0 0 0 ${split}%)` }}
      >
        <span className="font-mono text-sm font-bold">REFINED SPEC_V2</span>
      </div>

      {/* Scrubber Line */}
      <div
        className="absolute inset-y-0 w-[2px] bg-red-500 z-10"
        style={{ left: `${split}%` }}
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(parseInt(e.target.value, 10))}
          className="w-36 cursor-pointer accent-red-500"
        />
      </div>
    </div>
  );
}

export default InteractiveDiffSlider;
