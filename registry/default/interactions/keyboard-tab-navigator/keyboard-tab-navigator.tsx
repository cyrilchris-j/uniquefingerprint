"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardTabNavigatorProps {
  className?: string;
}

export function KeyboardTabNavigator({ className }: KeyboardTabNavigatorProps) {
  const [focused, setFocused] = useState(0);
  const items = ["First Tab", "Second Tab", "Third Tab"];

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>KEYBOARD ACCESSIBILITY FOCUS</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>

      <div className="flex gap-2">
        {items.map((item, idx) => (
          <button
            key={item}
            type="button"
            onFocus={() => setFocused(idx)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs transition-all",
              focused === idx ? "border-ink bg-ink text-paper shadow-sm" : "border-white/10 bg-zinc-900/70 text-ink"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KeyboardTabNavigator;
