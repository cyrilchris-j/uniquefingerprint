"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ZoomableImageLightboxProps {
  className?: string;
}

export function ZoomableImageLightbox({ className }: ZoomableImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        onClick={() => setIsOpen(true)}
        className="h-40 w-64 cursor-pointer rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#140e1f] via-[#0d0914] to-black p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] text-violet-100 select-none hover:shadow-md transition-shadow flex flex-col justify-between"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-violet-400 flex items-center gap-1.5">SPECIMEN THUMBNAIL</span>
        <h4 className="font-display font-bold text-ink">Inspect Asset</h4>
        <span className="font-mono text-[10px] text-ink/40">Click to zoom</span>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900/70 p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center pb-4 border-b border-line">
              <h3 className="font-display text-lg font-bold text-ink">Asset Detailed View</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs text-ink/60 hover:text-ink"
              >
                ✕ Close
              </button>
            </div>
            <div className="my-6 h-48 rounded-lg bg-line/20 flex items-center justify-center font-mono text-xs text-ink/50">
              HIGH RES RENDERING
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZoomableImageLightbox;
