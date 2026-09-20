"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SortableKanbanColumnProps {
  className?: string;
}

export function SortableKanbanColumn({ className }: SortableKanbanColumnProps) {
  const [tasks, setTasks] = useState([
    "Audit telemetry headers",
    "Bundle registry metadata",
    "Sync package manifests",
  ]);

  const removeTask = (idx: number) => {
    setTasks((t) => t.filter((_, i) => i !== idx));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-3 font-mono text-xs font-bold text-ink">
        <span>IN PROGRESS ({tasks.length})</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div
            key={task}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink shadow-sm"
          >
            <span>{task}</span>
            <button
              type="button"
              onClick={() => removeTask(i)}
              className="text-ink/40 hover:text-ink font-mono text-xs"
            >
              ✓
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-4 font-mono text-xs text-ink/40">All tasks completed</div>
        )}
      </div>
    </div>
  );
}

export default SortableKanbanColumn;
