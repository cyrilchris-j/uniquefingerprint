"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropUploadZoneProps {
  className?: string;
}

export function DragDropUploadZone({ className }: DragDropUploadZoneProps) {
  const [active, setActive] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        setFiles(["manifest.json", "schema.ts"]);
      }}
      className={cn(
        "flex h-56 w-full max-w-sm flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all",
        active ? "border-ink bg-line/20 scale-98" : "border-white/10 bg-zinc-900/70",
        className
      )}
    >
      <div className="h-10 w-10 rounded-full bg-line/20 flex items-center justify-center mb-3">
        ↑
      </div>
      <h4 className="font-display text-sm font-bold text-ink">Drop Files to Upload</h4>
      <p className="mt-1 font-mono text-[10px] text-ink/50">Supports JSON, CSS, TSX registry specs</p>

      {files.length > 0 && (
        <div className="mt-4 font-mono text-[10px] text-emerald-600 font-bold">
          ✓ Received {files.length} payload files
        </div>
      )}
    </div>
  );
}

export default DragDropUploadZone;
