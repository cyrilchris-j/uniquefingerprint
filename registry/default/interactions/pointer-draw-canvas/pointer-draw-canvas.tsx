"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PointerDrawCanvasProps {
  className?: string;
}

export function PointerDrawCanvas({ className }: PointerDrawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    lastPoint.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();

    lastPoint.current = { x: currentX, y: currentY };
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={cn("relative h-72 w-full max-w-md rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a120e] via-[#060a08] to-black p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-100 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line">
        <span className="font-mono text-xs text-ink/50">FREEHAND CANVAS</span>
        <button
          type="button"
          onClick={clear}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={380}
        height={210}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
        className="h-[210px] w-full cursor-crosshair touch-none"
      />
    </div>
  );
}

export default PointerDrawCanvas;
