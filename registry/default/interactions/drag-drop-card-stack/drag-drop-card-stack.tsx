"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropCardStackProps {
  className?: string;
}

export function DragDropCardStack({ className }: DragDropCardStackProps) {
  const [cards, setCards] = useState(["Draft Spec #1", "Draft Spec #2"]);

  const pop = () => {
    setCards((c) => c.slice(1));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">CARD TRIAGE STAGE</span>

      <div className="relative h-32 w-56">
        {cards.map((card, i) => (
          <div
            key={card}
            className="absolute inset-0 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white p-4 shadow flex flex-col justify-between"
            style={{ transform: `translateY(${i * 6}px) scale(${1 - i * 0.05})` }}
          >
            <span className="font-mono text-[9px] text-ink/40">CARD {i + 1}</span>
            <h5 className="font-display font-bold text-xs text-ink">{card}</h5>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={pop}
        disabled={cards.length === 0}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
      >
        Triage Next Card
      </button>
    </div>
  );
}

export default DragDropCardStack;
