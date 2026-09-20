"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverRevealMatrixProps {
  className?: string;
}

export function HoverRevealMatrix({ className }: HoverRevealMatrixProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-4 gap-2 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          onPointerEnter={() => setHoveredIdx(i)}
          onPointerLeave={() => setHoveredIdx(null)}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-mono text-[10px] font-bold transition-colors duration-150",
            hoveredIdx === i ? "border-ink bg-ink text-paper" : "border-line bg-line/10 text-ink/40"
          )}
        >
          {i.toString(16).toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default HoverRevealMatrix;
