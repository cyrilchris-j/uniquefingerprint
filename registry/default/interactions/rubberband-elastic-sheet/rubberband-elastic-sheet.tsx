"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandElasticSheetProps {
  className?: string;
}

export function RubberbandElasticSheet({ className }: RubberbandElasticSheetProps) {
  const [pull, setPull] = useState(0);

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 flex flex-col justify-end p-4", className)}>
      <div
        className="w-full rounded-t-xl border border-line bg-line/10 p-5 shadow-lg transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${pull}px)` }}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-ink/30 mb-3" />
        <h5 className="font-display font-bold text-sm text-ink">Rubberband Sheet</h5>
        <p className="mt-1 font-mono text-xs text-ink/70">Tension increases with drag amplitude.</p>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="-30"
          max="30"
          value={pull}
          onChange={(e) => setPull(parseInt(e.target.value, 10))}
          onPointerUp={() => setPull(0)}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default RubberbandElasticSheet;
