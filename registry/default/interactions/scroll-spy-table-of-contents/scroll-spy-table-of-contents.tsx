"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollSpyTableOfContentsProps {
  className?: string;
}

export function ScrollSpyTableOfContents({ className }: ScrollSpyTableOfContentsProps) {
  const [active, setActive] = useState("overview");
  const items = [
    { id: "overview", label: "System Overview" },
    { id: "architecture", label: "Registry Architecture" },
    { id: "validation", label: "Catalog Validation" },
    { id: "deployment", label: "Deployment Pipeline" },
  ];

  return (
    <div className={cn("w-full max-w-xs rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <span className="font-mono text-xs text-ink/50 uppercase mb-3 block">DOCUMENT INDEX</span>
      <div className="space-y-1 border-l-2 border-line">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "-ml-[2px] block border-l-2 py-1 pl-3 text-left font-mono text-xs transition-colors",
              active === item.id ? "border-ink font-bold text-ink" : "border-transparent text-ink/60 hover:text-ink"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollSpyTableOfContents;
