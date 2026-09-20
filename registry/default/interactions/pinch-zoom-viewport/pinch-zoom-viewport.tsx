"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PinchZoomViewportProps {
  className?: string;
}

export function PinchZoomViewport({ className }: PinchZoomViewportProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white p-4 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>ZOOM: {Math.round(scale * 100)}%</span><span className="opacity-50 ml-auto">[CYBER HUD]</span></div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              setScale(1);
              setPan({ x: 0, y: 0 });
            }}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div
          className="transition-transform duration-150 ease-out"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
        >
          <div className="h-24 w-36 rounded-lg border-2 border-ink bg-paper p-3 shadow-md flex flex-col justify-between">
            <span className="font-mono text-[9px] text-ink/50">TARGET VECTOR</span>
            <div className="h-2 w-full bg-ink rounded-full" />
            <div className="font-mono text-[9px] text-ink/40">1920 x 1080 MATRIX</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinchZoomViewport;
