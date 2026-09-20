"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitPaneResizerProps {
  className?: string;
}

export function SplitPaneResizer({ className }: SplitPaneResizerProps) {
  const [split, setSplit] = useState(50);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 flex select-none", className)}>
      {/* Left Panel */}
      <div
        style={{ width: `${split}%` }}
        className="h-full border-r border-line bg-line/10 p-4 font-mono text-xs overflow-hidden"
      >
        <span className="font-bold text-ink">PRIMARY PANE</span>
        <p className="mt-2 text-ink/70">Left panel width: {Math.round(split)}%</p>
      </div>

      {/* Sash Handle */}
      <div className="absolute inset-y-0 flex items-center z-10" style={{ left: `${split}%` }}>
        <div className="relative -ml-2 h-8 w-4 rounded border border-line bg-ink shadow-md flex items-center justify-center cursor-ew-resize">
          <div className="h-4 w-0.5 bg-paper" />
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{ width: `${100 - split}%` }}
        className="h-full p-4 font-mono text-xs overflow-hidden"
      >
        <span className="font-bold text-ink">SECONDARY PANE</span>
        <p className="mt-2 text-ink/70">Right panel width: {Math.round(100 - split)}%</p>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="20"
          max="80"
          value={split}
          onChange={(e) => setSplit(parseInt(e.target.value, 10))}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default SplitPaneResizer;
