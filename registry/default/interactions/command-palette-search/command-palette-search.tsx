"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CommandPaletteSearchProps {
  className?: string;
}

export function CommandPaletteSearch({ className }: CommandPaletteSearchProps) {
  const [query, setQuery] = useState("");
  const items = [
    "Navigate to Components",
    "Open Design System Tokens",
    "Run Typecheck Registry",
    "Clear Build Artifacts",
    "Switch Color Theme",
  ];

  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-4 shadow-xl", className)}>
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="font-mono text-sm text-ink/40">⌘</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type command..."
          className="w-full bg-transparent font-mono text-xs text-ink outline-none"
        />
      </div>

      <div className="mt-3 space-y-1">
        {filtered.map((item, idx) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg px-3 py-2 font-mono text-xs text-ink hover:bg-line/20 cursor-pointer"
          >
            <span>{item}</span>
            <span className="text-[10px] text-ink/40">ENTER</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-4 text-center font-mono text-xs text-ink/40">No matching commands</div>
        )}
      </div>
    </div>
  );
}

export default CommandPaletteSearch;
