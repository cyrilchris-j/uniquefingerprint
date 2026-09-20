"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialColorWheelPickerProps {
  className?: string;
}

export function RadialColorWheelPicker({ className }: RadialColorWheelPickerProps) {
  const [hue, setHue] = useState(210);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>COLOR HUE</span>
        <span className="font-bold text-ink">{hue}°</span>
      </div>

      <div
        className="relative flex h-32 w-32 items-center justify-center rounded-full border border-line shadow-inner"
        style={{
          background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
        }}
      >
        <div
          className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-colors duration-150"
          style={{ backgroundColor: `hsl(${hue}, 80%, 50%)` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(parseInt(e.target.value, 10))}
        className="w-36 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default RadialColorWheelPicker;
