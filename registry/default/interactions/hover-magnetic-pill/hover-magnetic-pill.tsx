"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverMagneticPillProps {
  label?: string;
  className?: string;
}

export function HoverMagneticPill({ label = "STABLE_BUILD", className }: HoverMagneticPillProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setOffset({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn("inline-flex items-center justify-center p-8", className)}
    >
      <div
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        className="rounded-full border border-white/10 bg-zinc-900/70 px-4 py-1.5 font-mono text-xs font-bold text-ink shadow-sm transition-transform duration-75"
      >
        ● {label}
      </div>
    </div>
  );
}

export default HoverMagneticPill;
