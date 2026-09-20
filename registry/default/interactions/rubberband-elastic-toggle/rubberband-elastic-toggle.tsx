"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandElasticToggleProps {
  className?: string;
}

export function RubberbandElasticToggle({ className }: RubberbandElasticToggleProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-rose-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>AUTOSCALE PODS</span><span className="opacity-50 ml-auto">[AVIONICS]</span></div>
      <div
        onClick={() => setActive((a) => !a)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          active ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded-full bg-paper shadow-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active ? "translate-x-8" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default RubberbandElasticToggle;
