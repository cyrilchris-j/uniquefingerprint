"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticPullCardProps {
  className?: string;
}

export function ElasticPullCard({ className }: ElasticPullCardProps) {
  const [pull, setPull] = useState(0);

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 p-8", className)}>
      <div
        className="rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 p-6 shadow-md transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${pull}px)` }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-violet-400 flex items-center gap-1.5">TETHERED ANCHOR</span>
        <h4 className="mt-1 font-display font-bold text-ink">Hookean Tension Pull</h4>
      </div>

      <input
        type="range"
        min="-40"
        max="40"
        value={pull}
        onChange={(e) => setPull(parseInt(e.target.value, 10))}
        onPointerUp={() => setPull(0)}
        className="w-36 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default ElasticPullCard;
