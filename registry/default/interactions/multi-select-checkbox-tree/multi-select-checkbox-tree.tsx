"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiSelectCheckboxTreeProps {
  className?: string;
}

export function MultiSelectCheckboxTree({ className }: MultiSelectCheckboxTreeProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "components": true,
    "text": true,
  });

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">RESOURCE SELECTION</span>

      <div className="space-y-2">
        {["components", "text", "motion", "interactions"].map((id) => (
          <label key={id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!checked[id]}
              onChange={() => toggle(id)}
              className="accent-ink"
            />
            <span className="text-ink font-bold">{id}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default MultiSelectCheckboxTree;
