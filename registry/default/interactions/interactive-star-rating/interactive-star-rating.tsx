"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStarRatingProps {
  className?: string;
}

export function InteractiveStarRating({ className }: InteractiveStarRatingProps) {
  const [rating, setRating] = useState(4);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>RATING: {hovered ?? rating} / 5</span><span className="opacity-50 ml-auto">[RADAR V2]</span></div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onPointerEnter={() => setHovered(star)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setRating(star)}
            className="text-2xl transition-transform hover:scale-125"
          >
            {star <= (hovered ?? rating) ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractiveStarRating;
