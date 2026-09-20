"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinateCrosshairInspectProps {
  className?: string;
}

export function CoordinateCrosshairInspect({ className }: CoordinateCrosshairInspectProps) {
  const [point, setPoint] = useState({ x: 100, y: 100 });

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 p-4 cursor-crosshair select-none", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2 font-mono text-[10px] text-ink/60">
        <span>CROSSHAIR TELEMETRY</span>
        <span>X:{point.x} Y:{point.y}</span>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10">
        <div className="pointer-events-none absolute inset-x-0 h-[1px] bg-red-500/50" style={{ top: point.y }} />
        <div className="pointer-events-none absolute inset-y-0 w-[1px] bg-red-500/50" style={{ left: point.x }} />
      </div>
    </div>
  );
}

export default CoordinateCrosshairInspect;
