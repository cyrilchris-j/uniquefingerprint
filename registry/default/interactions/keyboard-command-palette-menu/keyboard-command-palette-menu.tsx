"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardCommandPaletteMenuProps {
  className?: string;
}

export function KeyboardCommandPaletteMenu({ className }: KeyboardCommandPaletteMenuProps) {
  const [selected, setSelected] = useState(0);
  const items = ["git commit --amend", "pnpm test:e2e", "docker compose up", "cargo build --release"];

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl text-zinc-900 dark:text-zinc-100 p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">RUN RECENT RECIPE</span>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={item}
            onClick={() => setSelected(i)}
            className={cn(
              "flex items-center justify-between rounded px-3 py-2 cursor-pointer transition-colors",
              selected === i ? "bg-ink text-paper font-bold" : "hover:bg-line/20 text-ink"
            )}
          >
            <span>&gt; {item}</span>
            <span className="text-[10px] opacity-60">RUN</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardCommandPaletteMenu;
