"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverParallaxTypographyProps {
  text?: string;
  className?: string;
}

export function HoverParallaxTypography({ text = "OPENUI SPEC", className }: HoverParallaxTypographyProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 16, y: y * 16 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn("relative flex h-56 w-full max-w-md items-center justify-center rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 p-6 select-none", className)}
    >
      {/* Background shadow layer */}
      <h2
        className="absolute font-display text-4xl font-black text-ink/10 transition-transform duration-150"
        style={{ transform: `translate(${-offset.x * 1.5}px, ${-offset.y * 1.5}px)` }}
      >
        {text}
      </h2>

      {/* Foreground primary layer */}
      <h2
        className="relative font-display text-4xl font-black text-ink transition-transform duration-100"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {text}
      </h2>
    </div>
  );
}

export default HoverParallaxTypography;
