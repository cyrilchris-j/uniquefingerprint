"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandPullRefreshProps {
  className?: string;
}

export function RubberbandPullRefresh({ className }: RubberbandPullRefreshProps) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setPull(40);
    setTimeout(() => {
      setRefreshing(false);
      setPull(0);
    }, 1000);
  };

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 shadow-xl text-zinc-900 dark:text-zinc-100 select-none", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /><span>FEED REFRESH</span><span className="opacity-50 ml-auto">[MINIMAL]</span></div>
        <button
          type="button"
          onClick={triggerRefresh}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          {refreshing ? "Syncing..." : "Simulate Pull"}
        </button>
      </div>

      <div
        className="mt-4 space-y-2 transition-transform duration-200"
        style={{ transform: `translateY(${pull}px)` }}
      >
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1092 - Realtime status verified
        </div>
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1093 - Block signature accepted
        </div>
      </div>
    </div>
  );
}

export default RubberbandPullRefresh;
