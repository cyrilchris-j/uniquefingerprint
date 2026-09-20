"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragRotateDialProps {
  className?: string;
}

export function DragRotateDial({ className }: DragRotateDialProps) {
  const [angle, setAngle] = useState(45);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>AZIMUTH ANGLE</span>
        <span className="font-bold text-ink">{angle}°</span>
      </div>

      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-line bg-line/20 shadow-inner">
        <div
          className="h-20 w-20 rounded-full border border-line bg-ink shadow-lg flex items-start justify-center pt-2 transition-transform duration-75"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="h-3 w-1.5 rounded-full bg-paper" />
        </div>
      </div>

      <div className="flex gap-2">
        {[0, 45, 90, 180, 270].map((deg) => (
          <button
            key={deg}
            type="button"
            onClick={() => setAngle(deg)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {deg}°
          </button>
        ))}
      </div>
    </div>
  );
}

export default DragRotateDial;
