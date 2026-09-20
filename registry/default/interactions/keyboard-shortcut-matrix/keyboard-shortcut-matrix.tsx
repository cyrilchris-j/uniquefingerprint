"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardShortcutMatrixProps {
  className?: string;
}

export function KeyboardShortcutMatrix({ className }: KeyboardShortcutMatrixProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keys = ["⌘", "K", "⇧", "P", "⌥", "⏎"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>KEYBOARD SHORTCUT MATRIX</span><span className="opacity-50 ml-auto">[RADAR V2]</span></div>

      <div className="flex gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActiveKey(k)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm transition-all select-none active:scale-95",
              activeKey === k
                ? "border-ink bg-ink text-paper -translate-y-0.5 shadow-md"
                : "border-line bg-line/10 text-ink hover:border-ink"
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] text-ink/40">
        {activeKey ? `Triggered Hotkey: ${activeKey}` : "Click keycaps to trigger"}
      </p>
    </div>
  );
}

export default KeyboardShortcutMatrix;
