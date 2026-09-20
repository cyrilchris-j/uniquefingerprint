"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticItemGridProps {
  className?: string;
}

export function MagneticItemGrid({ className }: MagneticItemGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-3 gap-3 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          className={cn(
            "flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-150",
            hovered === i
              ? "border-ink bg-ink text-paper scale-110 shadow-lg"
              : "border-line bg-line/10 text-ink/60 hover:border-ink"
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default MagneticItemGrid;
