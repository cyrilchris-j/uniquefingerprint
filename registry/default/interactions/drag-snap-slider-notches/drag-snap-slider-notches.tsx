"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragSnapSliderNotchesProps {
  className?: string;
}

export function DragSnapSliderNotches({ className }: DragSnapSliderNotchesProps) {
  const [val, setVal] = useState(2);
  const labels = ["1x", "2x", "4x", "8x", "16x"];

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>MAGNIFICATION</span>
        <span className="font-bold text-ink">{labels[val]}</span>
      </div>

      <input
        type="range"
        min="0"
        max={labels.length - 1}
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />

      <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-2">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default DragSnapSliderNotches;
