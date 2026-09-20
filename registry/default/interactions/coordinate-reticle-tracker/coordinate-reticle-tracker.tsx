"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinateReticleTrackerProps {
  className?: string;
}

export function CoordinateReticleTracker({ className }: CoordinateReticleTrackerProps) {
  const [coords, setCoords] = useState({ dx: 0, dy: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setCoords({ dx: Math.round(e.clientX - cx), dy: Math.round(e.clientY - cy) });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white p-4 select-none cursor-crosshair", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <span className="font-mono text-[10px] text-ink/60">HUD TARGETING</span>
        <span className="font-mono text-[10px] font-bold text-ink">ΔX:{coords.dx} ΔY:{coords.dy}</span>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border border-ink/40 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
}

export default CoordinateReticleTracker;
