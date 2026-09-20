"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ClickWaveEmitterProps {
  className?: string;
}

export function ClickWaveEmitter({ className }: ClickWaveEmitterProps) {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setWaves((prev) => [...prev.slice(-6), { id: Date.now(), x, y }]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-6 select-none", className)}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK EMITTER FIELD</span>
        <h4 className="font-display font-bold text-ink">Expanding Shockwave</h4>
      </div>

      {waves.map((w) => (
        <span
          key={w.id}
          className="pointer-events-none absolute -ml-10 -mt-10 h-20 w-20 rounded-full border border-ink/40 animate-ping"
          style={{ left: w.x, top: w.y }}
        />
      ))}
    </div>
  );
}

export default ClickWaveEmitter;
