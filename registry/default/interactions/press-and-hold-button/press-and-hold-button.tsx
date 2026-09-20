"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PressAndHoldButtonProps {
  className?: string;
}

export function PressAndHoldButton({ className }: PressAndHoldButtonProps) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);

  const startHold = () => {
    setHolding(true);
    setTimeout(() => {
      setDone(true);
      setHolding(false);
    }, 1200);
  };

  const cancelHold = () => {
    if (!done) setHolding(false);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        className={cn(
          "relative overflow-hidden rounded-full border border-white/10 bg-zinc-900/70 px-6 py-3 font-mono text-xs font-bold text-ink shadow-md transition-all active:scale-95",
          done && "bg-emerald-600 text-white border-emerald-600"
        )}
      >
        <span className="relative z-10">{done ? "ACTION CONFIRMED" : holding ? "HOLDING..." : "PRESS & HOLD"}</span>
        {holding && !done && (
          <div className="absolute inset-0 bg-ink/20 animate-[pulse_1s_infinite]" />
        )}
      </button>

      {done && (
        <button
          type="button"
          onClick={() => setDone(false)}
          className="font-mono text-[10px] text-ink/50 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default PressAndHoldButton;
