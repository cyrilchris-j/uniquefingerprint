"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeToConfirmSliderProps {
  className?: string;
}

export function SwipeToConfirmSlider({ className }: SwipeToConfirmSliderProps) {
  const [val, setVal] = useState(0);
  const confirmed = val >= 95;

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">
        {confirmed ? "AUTHORIZATION GRANTED" : "SLIDE TO AUTHORIZE"}
      </span>

      <div className="relative h-12 w-64 rounded-full border border-line bg-line/20 p-1 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="w-full cursor-pointer accent-ink"
        />
      </div>

      {confirmed && (
        <button
          type="button"
          onClick={() => setVal(0)}
          className="font-mono text-[10px] text-ink/50 hover:underline"
        >
          Reset Authorization
        </button>
      )}
    </div>
  );
}

export default SwipeToConfirmSlider;
