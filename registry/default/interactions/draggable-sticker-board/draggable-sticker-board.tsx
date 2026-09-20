"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DraggableStickerBoardProps {
  className?: string;
}

export function DraggableStickerBoard({ className }: DraggableStickerBoardProps) {
  const [stickers, setStickers] = useState([
    { id: 1, label: "★ OPENUI", x: 30, y: 30 },
    { id: 2, label: "✦ V1 KERNEL", x: 140, y: 70 },
  ]);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 p-4 select-none", className)}>
      <span className="font-mono text-xs text-ink/50 uppercase">COLLAGE PINBOARD</span>

      <div className="relative h-48 w-full rounded bg-line/10 mt-2">
        {stickers.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full border border-line bg-ink px-4 py-1.5 font-mono text-xs font-bold text-paper shadow-md cursor-grab active:cursor-grabbing"
            style={{ left: s.x, top: s.y }}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraggableStickerBoard;
