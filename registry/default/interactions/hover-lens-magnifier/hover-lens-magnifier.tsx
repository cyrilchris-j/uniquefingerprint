"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverLensMagnifierProps {
  className?: string;
}

export function HoverLensMagnifier({ className }: HoverLensMagnifierProps) {
  const [lens, setLens] = useState({ x: 80, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white p-6 select-none", className)}
    >
      <div className="font-mono text-[11px] leading-5 text-ink/70">
        <p>0x0001: 4F 50 45 4E 55 49</p>
        <p>0x0008: 72 65 67 69 73 74</p>
        <p>0x0010: 72 79 2D 38 30 30</p>
        <p>0x0018: 6B 65 72 6E 65 6C</p>
      </div>

      <div
        className="pointer-events-none absolute -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-ink bg-paper/40 shadow-xl backdrop-blur-[1px]"
        style={{ left: lens.x, top: lens.y }}
      >
        <span className="font-mono text-[9px] font-bold text-ink">LOUPE</span>
      </div>
    </div>
  );
}

export default HoverLensMagnifier;
