"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DockableSheetDrawerProps {
  className?: string;
}

export function DockableSheetDrawer({ className }: DockableSheetDrawerProps) {
  const [state, setState] = useState<"peek" | "half" | "full">("peek");

  const heightMap = {
    peek: "h-20",
    half: "h-44",
    full: "h-64",
  };

  return (
    <div className={cn("relative h-72 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl text-zinc-900 dark:text-zinc-100 flex flex-col justify-end p-4", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-auto">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>SHEET STATE: {state.toUpperCase()}</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>
        <div className="flex gap-1">
          {(["peek", "half", "full"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setState(s)}
              className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "w-full rounded-t-xl border border-line bg-line/10 p-4 transition-all duration-300 ease-out flex flex-col justify-between",
          heightMap[state]
        )}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-ink/30 mb-2" />
        <p className="font-mono text-xs text-ink/70">Tactile docked surface for controls & inspect panels.</p>
        <div className="font-mono text-[10px] text-ink/40">Swipe or click buttons to adjust</div>
      </div>
    </div>
  );
}

export default DockableSheetDrawer;
