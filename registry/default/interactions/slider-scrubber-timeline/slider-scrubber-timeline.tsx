"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderScrubberTimelineProps {
  className?: string;
}

export function SliderScrubberTimeline({ className }: SliderScrubberTimelineProps) {
  const [frame, setFrame] = useState(142);
  const totalFrames = 300;

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>TIMECODE</span>
        <span className="font-bold text-ink">00:0{Math.floor(frame / 60)}:{(frame % 60).toString().padStart(2, "0")}</span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max={totalFrames}
          value={frame}
          onChange={(e) => setFrame(parseInt(e.target.value, 10))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-ink"
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] text-ink/40 mt-2">
        <span>00:00:00</span>
        <span>FRAME {frame}/{totalFrames}</span>
        <span>00:05:00</span>
      </div>
    </div>
  );
}

export default SliderScrubberTimeline;
