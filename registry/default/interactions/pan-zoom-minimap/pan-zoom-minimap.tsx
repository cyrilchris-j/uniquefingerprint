"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PanZoomMinimapProps {
  className?: string;
}

export function PanZoomMinimap({ className }: PanZoomMinimapProps) {
  const [viewPos, setViewPos] = useState({ x: 20, y: 20 });

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 p-4", className)}>
      <div className="h-full w-full rounded-lg bg-line/10 flex items-center justify-center font-mono text-xs text-ink/40">
        CANVAS WORKSPACE
      </div>

      {/* Floating Minimap */}
      <div className="absolute bottom-4 right-4 h-24 w-32 rounded-lg border-2 border-white/10 bg-zinc-900/70 p-2 shadow-lg">
        <span className="font-mono text-[8px] text-ink/50 uppercase">RADAR MAP</span>
        <div className="relative mt-1 h-14 w-full rounded bg-line/20">
          <div
            className="absolute h-5 w-8 rounded border border-ink bg-ink/20 transition-all duration-75 cursor-move"
            style={{ left: viewPos.x, top: viewPos.y }}
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <button
          type="button"
          onClick={() => setViewPos((p) => ({ x: Math.max(0, p.x - 10), y: p.y }))}
          className="rounded border px-2 py-0.5 font-mono text-[10px]"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setViewPos((p) => ({ x: Math.min(50, p.x + 10), y: p.y }))}
          className="rounded border px-2 py-0.5 font-mono text-[10px]"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default PanZoomMinimap;
