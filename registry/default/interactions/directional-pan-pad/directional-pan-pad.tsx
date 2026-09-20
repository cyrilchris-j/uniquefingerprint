"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DirectionalPanPadProps {
  className?: string;
}

export function DirectionalPanPad({ className }: DirectionalPanPadProps) {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-violet-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>DIRECTIONAL D-PAD</span><span className="opacity-50 ml-auto">[QUANTUM]</span></div>

      <div className="grid grid-cols-3 gap-1 w-32">
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("UP")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("LEFT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ◀
        </button>
        <div className="h-10 rounded border border-line bg-line/20" />
        <button
          type="button"
          onClick={() => setActiveDir("RIGHT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▶
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("DOWN")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▼
        </button>
        <div />
      </div>

      <span className="font-mono text-[10px] text-ink/40">{activeDir ?? "IDLE"}</span>
    </div>
  );
}

export default DirectionalPanPad;
