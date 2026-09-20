"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveCodeFoldProps {
  className?: string;
}

export function InteractiveCodeFold({ className }: InteractiveCodeFoldProps) {
  const [folded, setFolded] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white p-4 font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFolded((f) => !f)}
          className="h-4 w-4 rounded border border-line flex items-center justify-center text-[10px]"
        >
          {folded ? "+" : "-"}
        </button>
        <span className="font-bold text-ink">function initializeKernel() &#123;</span>
      </div>

      {!folded ? (
        <div className="ml-6 my-1 space-y-1 text-ink/70">
          <div>const registry = loadRegistry();</div>
          <div>validateDnaEnums(registry);</div>
          <div>return registry.compile();</div>
        </div>
      ) : (
        <div className="ml-6 my-1 text-ink/40 font-italic">/* 3 lines folded */</div>
      )}

      <div>&#125;</div>
    </div>
  );
}

export default InteractiveCodeFold;
