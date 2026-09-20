"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface JoystickControlPadProps {
  className?: string;
}

export function JoystickControlPad({ className }: JoystickControlPadProps) {
  const [stick, setStick] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(x * x + y * y);
    const maxRadius = 36;
    if (dist > maxRadius) {
      setStick({ x: (x / dist) * maxRadius, y: (y / dist) * maxRadius });
    } else {
      setStick({ x, y });
    }
  };

  const handleRelease = () => {
    setStick({ x: 0, y: 0 });
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#180d11] via-[#10080b] to-black p-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-100 select-none select-none", className)}>
      <div className="flex justify-between w-full font-mono text-[10px] text-ink/60">
        <span>JOYSTICK 2D</span>
        <span>X:{Math.round(stick.x)} Y:{Math.round(stick.y)}</span>
      </div>

      <div
        onPointerMove={handlePointerMove}
        onPointerUp={handleRelease}
        onPointerLeave={handleRelease}
        className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-line bg-line/20 cursor-grab active:cursor-grabbing"
      >
        <div
          className="h-12 w-12 rounded-full border border-line bg-ink shadow-lg transition-transform duration-75"
          style={{ transform: `translate(${stick.x}px, ${stick.y}px)` }}
        />
      </div>
    </div>
  );
}

export default JoystickControlPad;
