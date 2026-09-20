"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiSliderEqualizerProps {
  className?: string;
}

export function MultiSliderEqualizer({ className }: MultiSliderEqualizerProps) {
  const [gains, setGains] = useState([60, 45, 75, 90, 55]);
  const bands = ["60Hz", "250Hz", "1kHz", "4kHz", "16kHz"];

  const setGain = (idx: number, val: number) => {
    setGains((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  return (
    <div className={cn("inline-flex flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">EQUALIZER CHANNELS</span>

      <div className="flex gap-4 items-center">
        {gains.map((gain, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={gain}
              onChange={(e) => setGain(i, parseInt(e.target.value, 10))}
              className="h-28 w-2 cursor-pointer appearance-none bg-line rounded accent-ink [writing-mode:vertical-lr] [direction:rtl]"
            />
            <span className="font-mono text-[9px] text-ink/50">{bands[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSliderEqualizer;
