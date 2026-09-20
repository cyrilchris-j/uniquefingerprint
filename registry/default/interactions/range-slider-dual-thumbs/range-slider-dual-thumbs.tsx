"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RangeSliderDualThumbsProps {
  className?: string;
}

export function RangeSliderDualThumbs({ className }: RangeSliderDualThumbsProps) {
  const [minVal, setMinVal] = useState(25);
  const [maxVal, setMaxVal] = useState(75);

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>WINDOW BOUNDS</span>
        <span className="font-bold text-ink">[{minVal} - {maxVal}]</span>
      </div>

      <div className="space-y-3">
        <div>
          <span className="font-mono text-[10px] text-ink/40">MIN BOUND</span>
          <input
            type="range"
            min="0"
            max={maxVal - 5}
            value={minVal}
            onChange={(e) => setMinVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
        <div>
          <span className="font-mono text-[10px] text-ink/40">MAX BOUND</span>
          <input
            type="range"
            min={minVal + 5}
            max="100"
            value={maxVal}
            onChange={(e) => setMaxVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSliderDualThumbs;
