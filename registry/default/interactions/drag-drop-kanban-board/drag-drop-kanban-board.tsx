"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropKanbanBoardProps {
  className?: string;
}

export function DragDropKanbanBoard({ className }: DragDropKanbanBoardProps) {
  const [todo, setTodo] = useState(["Verify DNA", "Typecheck Registry"]);
  const [done, setDone] = useState(["Draft Batch Specs"]);

  const advance = (item: string) => {
    setTodo((t) => t.filter((i) => i !== item));
    setDone((d) => [...d, item]);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-3 w-full max-w-md rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 select-none", className)}>
      <div className="space-y-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-amber-500 flex items-center gap-1.5">BACKLOG</span>
        {todo.map((item) => (
          <div
            key={item}
            onClick={() => advance(item)}
            className="rounded border border-line bg-line/10 p-2 font-mono text-xs cursor-pointer hover:border-ink"
          >
            {item} →
          </div>
        ))}
      </div>

      <div className="space-y-2 border-l border-line pl-3">
        <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">COMPLETED</span>
        {done.map((item) => (
          <div key={item} className="rounded border border-white/10 bg-zinc-900/70 p-2 font-mono text-xs text-ink/60">
            ✓ {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropKanbanBoard;
