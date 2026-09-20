"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverAudioWaveformScrubProps {
  className?: string;
}

export function HoverAudioWaveformScrub({ className }: HoverAudioWaveformScrubProps) {
  const [scrub, setScrub] = useState(40);
  const bars = [30, 45, 80, 95, 60, 40, 75, 90, 50, 65, 85, 40, 30, 70, 85, 60];

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>AUDIO TRACK</span>
        <span className="font-bold text-ink">{scrub}%</span>
      </div>

      <div className="flex h-16 items-end gap-1.5 py-2">
        {bars.map((h, idx) => {
          const isPlayed = (idx / bars.length) * 100 <= scrub;
          return (
            <div
              key={idx}
              className={cn("w-full rounded-t transition-colors", isPlayed ? "bg-ink" : "bg-line/40")}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={scrub}
        onChange={(e) => setScrub(parseInt(e.target.value, 10))}
        className="w-full mt-2 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default HoverAudioWaveformScrub;
