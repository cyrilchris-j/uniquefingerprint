"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScratchToRevealCardProps {
  className?: string;
  code?: string;
}

export function ScratchToRevealCard({ className, code = "OPENUI-800-ALPHA" }: ScratchToRevealCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#8e8e93";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL KEY", canvas.width / 2, canvas.height / 2 + 4);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className={cn("relative h-44 w-72 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1218] via-[#090b0e] to-black shadow-[0_0_25px_rgba(6,182,212,0.15)] text-white shadow-md", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-cyan-400 flex items-center gap-1.5">ACCESS VOUCHER</span>
        <span className="mt-1 font-mono text-base font-bold text-ink">{code}</span>
        <span className="mt-1 font-mono text-[9px] text-emerald-600">✓ AUTHORIZED</span>
      </div>

      <canvas
        ref={canvasRef}
        width={288}
        height={176}
        onPointerMove={handlePointerMove}
        className="absolute inset-0 h-full w-full cursor-pointer touch-none"
      />
    </div>
  );
}

export default ScratchToRevealCard;
