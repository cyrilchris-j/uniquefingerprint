"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiChoiceTagCloudProps {
  className?: string;
}

export function MultiChoiceTagCloud({ className }: MultiChoiceTagCloudProps) {
  const [selected, setSelected] = useState<string[]>(["Core"]);
  const tags = ["Core", "Motion", "Interactions", "Typography", "Canvas", "3D", "Audio"];

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white select-none", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-3 font-mono text-xs text-ink/60">
        <span>TAG FILTER</span>
        <span>{selected.length} ACTIVE</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSel = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs transition-all",
                isSel
                  ? "border-ink bg-ink text-paper shadow-sm"
                  : "border-white/10 bg-zinc-900/70 text-ink hover:border-ink"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultiChoiceTagCloud;
