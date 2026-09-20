"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltParallaxSceneProps {
  className?: string;
}

export function TiltParallaxScene({ className }: TiltParallaxSceneProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 800 }}
      className={cn("inline-block", className)}
    >
      <div
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="relative h-64 w-80 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181512] via-[#100d0a] to-[#080605] shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-100 p-6 shadow-xl transition-transform duration-100 ease-out flex flex-col justify-between"
      >
        <div style={{ transform: "translateZ(20px)" }}>
          <span className="font-mono text-[10px] uppercase text-ink/50">PARALLAX STAGE</span>
          <h4 className="mt-1 font-display text-lg font-bold text-ink">Multi-Plane Diorama</h4>
        </div>
        <div
          style={{ transform: "translateZ(40px)" }}
          className="rounded-lg bg-ink p-3 text-paper font-mono text-xs shadow-md"
        >
          Foreground Depth Plane (+40px Z)
        </div>
      </div>
    </div>
  );
}

export default TiltParallaxScene;
