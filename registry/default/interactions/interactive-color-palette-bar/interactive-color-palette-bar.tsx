"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveColorPaletteBarProps {
  className?: string;
}

export function InteractiveColorPaletteBar({ className }: InteractiveColorPaletteBarProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const swatches = ["#000000", "#333333", "#666666", "#999999", "#E5E5E5"];

  const copy = (hex: string) => {
    setCopied(hex);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>
        {copied ? `Copied ${copied}!` : "CLICK SWATCH TO COPY HEX"}
      </span><span className="opacity-50 ml-auto">[TACTILE]</span></div>

      <div className="flex overflow-hidden rounded-lg border border-line">
        {swatches.map((hex) => (
          <div
            key={hex}
            onClick={() => copy(hex)}
            className="h-14 w-14 cursor-pointer transition-transform hover:scale-110 flex items-end justify-center pb-1"
            style={{ backgroundColor: hex }}
          >
            <span className="font-mono text-[8px] text-white/70">{hex.slice(1, 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveColorPaletteBar;
