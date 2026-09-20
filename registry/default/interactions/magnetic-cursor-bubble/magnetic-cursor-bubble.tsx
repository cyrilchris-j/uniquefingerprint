"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorBubbleProps {
  className?: string;
}

export function MagneticCursorBubble({ className }: MagneticCursorBubbleProps) {
  const [pos, setPos] = useState({ x: 80, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 p-6 cursor-none select-none", className)}
    >
      <div
        className="pointer-events-none absolute -ml-4 -mt-4 h-8 w-8 rounded-full bg-ink transition-transform duration-100 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="flex h-full items-center justify-center font-mono text-xs text-ink/40">
        Viscoelastic Bubble Follower
      </div>
    </div>
  );
}

export default MagneticCursorBubble;
