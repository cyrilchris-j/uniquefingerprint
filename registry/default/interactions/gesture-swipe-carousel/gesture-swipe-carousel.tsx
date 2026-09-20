"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeCarouselProps {
  className?: string;
}

export function GestureSwipeCarousel({ className }: GestureSwipeCarouselProps) {
  const [index, setIndex] = useState(0);
  const slides = ["Slide Alpha", "Slide Beta", "Slide Gamma"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 select-none", className)}>
      <div className="relative h-36 w-64 overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div className="text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-violet-400 flex items-center gap-1.5">INDEX {index + 1} OF {slides.length}</span>
          <h4 className="font-display text-lg font-bold text-ink">{slides[index]}</h4>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          disabled={index === slides.length - 1}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default GestureSwipeCarousel;
