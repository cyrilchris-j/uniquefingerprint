"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverMagnifyDockProps {
  className?: string;
}

export function HoverMagnifyDock({ className }: HoverMagnifyDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const icons = ["⌘", "⌥", "⇧", "⌃", "⏎"];

  return (
    <div className={cn("inline-flex items-end gap-2 rounded-2xl border border-white/10 bg-zinc-900/70 p-3 shadow-lg", className)}>
      {icons.map((icon, idx) => {
        const isHover = hoveredIdx === idx;
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        return (
          <div
            key={idx}
            onPointerEnter={() => setHoveredIdx(idx)}
            onPointerLeave={() => setHoveredIdx(null)}
            className={cn(
              "flex items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 font-mono text-sm font-bold text-ink shadow-sm transition-all duration-100",
              isHover ? "h-14 w-14 -translate-y-2 text-base" : isNeighbor ? "h-12 w-12 -translate-y-1" : "h-10 w-10"
            )}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

export default HoverMagnifyDock;
