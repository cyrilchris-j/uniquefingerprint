"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DirectionalHoverCardProps {
  className?: string;
}

export function DirectionalHoverCard({ className }: DirectionalHoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 p-6 select-none", className)}
    >
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono text-xs text-ink/50">DIRECTIONAL SENSING</span>
        <h4 className="font-display text-lg font-bold text-ink">Hover Entry Vector</h4>
        <p className="font-mono text-[10px] text-ink/40">Hover card to slide overlay</p>
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-ink text-paper p-6 flex flex-col justify-between transition-transform duration-300 ease-out",
          hovered ? "translate-y-0" : "translate-y-full"
        )}
      >
        <span className="font-mono text-xs uppercase opacity-70">OVERLAY ACTIVE</span>
        <p className="text-xs leading-relaxed">
          Directional detection captures the entry vector and aligns the transition axis with user intent.
        </p>
        <span className="font-mono text-[10px] opacity-50">LEAVE TO DISMISS</span>
      </div>
    </div>
  );
}

export default DirectionalHoverCard;
