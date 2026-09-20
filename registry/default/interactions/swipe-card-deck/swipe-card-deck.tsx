"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeCardDeckProps {
  className?: string;
}

export function SwipeCardDeck({ className }: SwipeCardDeckProps) {
  const [cards, setCards] = useState(["Proposal A: Zero-Config", "Proposal B: Rust Core", "Proposal C: WASM Runtime"]);

  const dismiss = () => {
    setCards((c) => c.slice(1));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <div className="relative h-48 w-72">
        {cards.map((c, idx) => (
          <div
            key={c}
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 p-5 shadow-lg transition-all"
            style={{
              transform: `translateY(${idx * 6}px) scale(${1 - idx * 0.05})`,
              zIndex: 10 - idx,
            }}
          >
            <span className="font-mono text-[10px] text-ink/50">OPENUI CANDIDATE</span>
            <h4 className="font-display font-bold text-ink">{c}</h4>
            <div className="flex justify-between font-mono text-[10px] text-ink/40">
              <span>← REJECT</span>
              <span>APPROVE →</span>
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <div className="flex h-full items-center justify-center font-mono text-xs text-ink/50">
            Deck Empty
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={dismiss}
          disabled={cards.length === 0}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default SwipeCardDeck;
