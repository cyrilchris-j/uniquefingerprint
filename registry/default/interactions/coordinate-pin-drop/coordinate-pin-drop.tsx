"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinatePinDropProps {
  className?: string;
}

export function CoordinatePinDrop({ className }: CoordinatePinDropProps) {
  const [pins, setPins] = useState<{ id: number; x: number; y: number }[]>([
    { id: 1, x: 120, y: 80 },
  ]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPins((p) => [...p.slice(-4), { id: Date.now(), x, y }]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl text-zinc-900 dark:text-zinc-100 p-4 select-none", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>CLICK TO DROP BEACON ({pins.length})</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute -ml-2 -mt-4 flex flex-col items-center"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className="h-4 w-4 rounded-full bg-red-500 shadow-md animate-bounce" />
            <div className="h-1.5 w-1.5 rounded-full bg-ink mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoordinatePinDrop;
