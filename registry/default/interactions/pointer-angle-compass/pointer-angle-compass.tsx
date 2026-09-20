"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PointerAngleCompassProps {
  className?: string;
}

export function PointerAngleCompass({ className }: PointerAngleCompassProps) {
  const [angle, setAngle] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    setAngle(Math.round((rad * 180) / Math.PI) + 90);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-6 select-none", className)}
    >
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/10 bg-zinc-900/70 shadow-sm">
        <span className="absolute top-1 font-mono text-[9px] font-bold text-ink">N</span>
        <span className="absolute bottom-1 font-mono text-[9px] font-bold text-ink/40">S</span>
        <div
          className="h-24 w-1.5 rounded-full bg-ink transition-transform duration-75 flex flex-col justify-between"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="h-4 w-1.5 rounded-full bg-red-500" />
          <div className="h-4 w-1.5 rounded-full bg-ink" />
        </div>
      </div>
      <span className="mt-3 font-mono text-xs text-ink/60">BEARING: {angle}°</span>
    </div>
  );
}

export default PointerAngleCompass;
