"use client";

import { cn } from "@/lib/cn";

export interface DirectionalScrollIndicatorProps {
  className?: string;
}

export function DirectionalScrollIndicator({ className }: DirectionalScrollIndicatorProps) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <span className="font-mono text-[10px] text-ink/50 uppercase">SCROLL FOR DETAILS</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-900/70 shadow-sm animate-bounce">
        ↓
      </div>
    </div>
  );
}

export default DirectionalScrollIndicator;
