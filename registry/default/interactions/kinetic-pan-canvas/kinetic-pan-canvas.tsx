"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticPanCanvasProps {
  className?: string;
}

export function KineticPanCanvas({ className }: KineticPanCanvasProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-4 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>PAN STAGE</span><span className="opacity-50 ml-auto">[TACTILE]</span></div>
        <span className="font-mono text-xs font-bold text-ink">X:{pos.x} Y:{pos.y}</span>
      </div>

      <div className="relative h-52 w-full overflow-hidden rounded-lg bg-line/10 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div
          className="transition-transform duration-75"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <div className="h-28 w-44 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-4 shadow flex flex-col justify-between">
            <span className="font-mono text-xs font-bold text-ink">Target Node</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x - 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x + 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => setPos({ x: 0, y: 0 })}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KineticPanCanvas;
