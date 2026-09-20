"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SteppedTimelineMilestonesProps {
  className?: string;
}

export function SteppedTimelineMilestones({ className }: SteppedTimelineMilestonesProps) {
  const [station, setStation] = useState(1);
  const years = ["2024", "2025", "2026", "2027"];

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>ROADMAP YEAR</span>
        <span className="font-bold text-ink">{years[station]}</span>
      </div>

      <input
        type="range"
        min="0"
        max={years.length - 1}
        value={station}
        onChange={(e) => setStation(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />

      <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-2">
        {years.map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
}

export default SteppedTimelineMilestones;
