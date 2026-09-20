"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragReorderListProps {
  className?: string;
}

export function DragReorderList({ className }: DragReorderListProps) {
  const [items, setItems] = useState([
    "P0: Zero-downtime deploy",
    "P1: Registry cache invalidation",
    "P2: Component snapshot testing",
    "P3: CLI package telemetry",
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    const prevItem = next[index - 1];
    const currItem = next[index];
    if (!prevItem || !currItem) return;
    next[index - 1] = currItem;
    next[index] = prevItem;
    setItems(next);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    const nextItem = next[index + 1];
    const currItem = next[index];
    if (!nextItem || !currItem) return;
    next[index + 1] = currItem;
    next[index] = nextItem;
    setItems(next);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none", className)}>
      <div className="mb-3 font-mono text-xs text-ink/60 uppercase">TASK QUEUE REORDER</div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-2.5 font-mono text-xs text-ink"
          >
            <span>{item}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="rounded px-1.5 py-0.5 hover:bg-line disabled:opacity-20"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                disabled={idx === items.length - 1}
                className="rounded px-1.5 py-0.5 hover:bg-line disabled:opacity-20"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragReorderList;
