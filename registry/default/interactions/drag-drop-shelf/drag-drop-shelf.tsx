"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropShelfProps {
  className?: string;
}

export function DragDropShelf({ className }: DragDropShelfProps) {
  const [items, setItems] = useState(["Artifact A", "Shader B", "Geometry C", "Texture D"]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...items];
    const dragged = next[dragIdx];
    if (!dragged) return;
    next.splice(dragIdx, 1);
    next.splice(idx, 0, dragged);
    setDragIdx(idx);
    setItems(next);
  };

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>INVENTORY SLOTS (DRAG TO REORDER)</span><span className="opacity-50 ml-auto">[RADAR V2]</span></div>
      <div className="flex gap-2.5">
        {items.map((item, idx) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={() => setDragIdx(null)}
            className={cn(
              "flex h-20 w-24 cursor-grab items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-center font-mono text-xs font-bold text-ink shadow-sm transition-all select-none active:cursor-grabbing",
              dragIdx === idx ? "opacity-40 border-dashed border-ink scale-95" : "hover:border-ink hover:shadow"
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropShelf;
