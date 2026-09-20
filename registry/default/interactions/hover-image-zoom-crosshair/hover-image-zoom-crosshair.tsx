"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverImageZoomCrosshairProps {
  className?: string;
}

export function HoverImageZoomCrosshair({ className }: HoverImageZoomCrosshairProps) {
  const [cross, setCross] = useState({ x: 100, y: 100 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCross({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl text-zinc-900 dark:text-zinc-100 p-4 cursor-crosshair select-none", className)}
    >
      <div className="h-full w-full rounded-lg bg-line/20 flex items-center justify-center font-mono text-xs text-ink/40">
        INSPECTION TARGET (MOVE POINTER)
      </div>

      {/* Horizontal Crosshair Line */}
      <div
        className="pointer-events-none absolute inset-x-0 h-[1px] bg-red-500/60"
        style={{ top: cross.y }}
      />
      {/* Vertical Crosshair Line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[1px] bg-red-500/60"
        style={{ left: cross.x }}
      />

      <div className="absolute bottom-2 right-2 rounded bg-ink/80 px-2 py-0.5 font-mono text-[9px] text-paper">
        X:{cross.x} Y:{cross.y}
      </div>
    </div>
  );
}

export default HoverImageZoomCrosshair;
