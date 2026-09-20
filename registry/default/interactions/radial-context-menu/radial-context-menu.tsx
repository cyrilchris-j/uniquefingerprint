"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialContextMenuProps {
  className?: string;
}

export function RadialContextMenu({ className }: RadialContextMenuProps) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const actions = ["Inspect", "Duplicate", "Export", "Delete"];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => setMenu(null)}
      className={cn(
        "relative h-72 w-full max-w-md select-none rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl text-zinc-900 dark:text-zinc-100 p-6",
        className
      )}
    >
      <div className="flex h-full items-center justify-center text-center font-mono text-xs text-ink/50">
        Right-click anywhere to summon radial dial
      </div>

      {menu && (
        <div
          className="absolute z-20 flex h-32 w-32 -ml-16 -mt-16 items-center justify-center"
          style={{ left: menu.x, top: menu.y }}
        >
          {actions.map((act, idx) => {
            const angle = (idx * 360) / actions.length;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 44;
            const y = Math.sin(rad) * 44;

            return (
              <button
                key={act}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(null);
                }}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute flex h-9 w-18 items-center justify-center rounded-full border border-line bg-ink px-2 font-mono text-[10px] font-bold text-paper shadow-lg hover:scale-110 transition-transform"
              >
                {act}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RadialContextMenu;
