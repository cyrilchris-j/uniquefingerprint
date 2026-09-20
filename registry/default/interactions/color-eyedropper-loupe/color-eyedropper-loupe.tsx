"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ColorEyedropperLoupeProps {
  className?: string;
}

export function ColorEyedropperLoupe({ className }: ColorEyedropperLoupeProps) {
  const [pos, setPos] = useState({ x: 80, y: 80 });

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 p-6 select-none cursor-crosshair", className)}
    >
      <div className="h-full w-full rounded-lg bg-gradient-to-tr from-rose-400 via-emerald-400 to-indigo-500 opacity-60" />

      <div
        className="pointer-events-none absolute -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-xl backdrop-blur-sm"
        style={{ left: pos.x, top: pos.y }}
      >
        <span className="font-mono text-[8px] font-bold text-black bg-white/80 px-1 rounded">#A4C</span>
      </div>
    </div>
  );
}

export default ColorEyedropperLoupe;
