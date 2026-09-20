"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverExpandAccordionRowProps {
  className?: string;
}

export function HoverExpandAccordionRow({ className }: HoverExpandAccordionRowProps) {
  const [hovered, setHovered] = useState<number | null>(0);
  const rows = [
    { title: "Deterministic Build Graph", body: "Every package resolves immutable content addresses." },
    { title: "Zero-Overhead Bundler", body: "Shared ES module trees deduplicated at boundary." },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none divide-y divide-line", className)}>
      {rows.map((row, i) => (
        <div
          key={row.title}
          onPointerEnter={() => setHovered(i)}
          className="py-3 cursor-pointer"
        >
          <h5 className="font-display font-bold text-sm text-ink">{row.title}</h5>
          {hovered === i && (
            <p className="mt-1 font-mono text-xs text-ink/70">{row.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoverExpandAccordionRow;
