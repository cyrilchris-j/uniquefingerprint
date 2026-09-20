"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverSpotlightCardProps {
  className?: string;
}

export function HoverSpotlightCard({ className }: HoverSpotlightCardProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOpacity(0)}
      className={cn(
        "relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(0, 0, 0, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-ink/50">INTERACTION LAB</span>
          <h4 className="mt-2 font-display text-xl font-bold text-ink">Radial Spotlight</h4>
          <p className="mt-2 text-xs leading-relaxed text-ink/70">
            Soft radial light washes over the card surface reacting in real time to mouse tracking coordinates.
          </p>
        </div>
        <div className="font-mono text-[10px] text-ink/40">OpenUI Interaction Primitive</div>
      </div>
    </div>
  );
}

export default HoverSpotlightCard;
