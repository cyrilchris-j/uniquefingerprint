"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidGestureDrawerPullProps {
  className?: string;
}

export function FluidGestureDrawerPull({ className }: FluidGestureDrawerPullProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white flex select-none", className)}>
      <div className="flex-1 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          Open Drawer
        </button>
      </div>

      <div
        className={cn(
          "absolute inset-y-0 right-0 w-64 border-l border-white/10 bg-zinc-900/70 p-5 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="font-display font-bold text-ink">Drawer Panel</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Close
          </button>
        </div>
        <p className="mt-3 font-mono text-xs text-ink/70">Edge pulled with fluid resistance.</p>
      </div>
    </div>
  );
}

export default FluidGestureDrawerPull;
