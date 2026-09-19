"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface LiquidChromeFluidProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  interactive?: boolean;
  reducedMotion?: boolean;
}

export function LiquidChromeFluid({
  className,
  speed = 1,
  interactive = true,
  reducedMotion = false,
  children,
  ...props
}: LiquidChromeFluidProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const pointerRef = React.useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, isDown: false });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
      const clientY = "touches" in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;
      pointerRef.current.targetX = (clientX - rect.left) / rect.width;
      pointerRef.current.targetY = (clientY - rect.top) / rect.height;
    };

    if (interactive) {
      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("touchmove", onPointerMove);
    }

    const render = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      if (!reducedMotion) {
        time += 0.015 * speed;
      }

      // Smooth pointer lag
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.06;

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, w, h);

      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;

      const layers = 6;
      for (let i = 0; i < layers; i++) {
        const angle = time * 0.8 + (i * Math.PI) / 3;
        const radiusOffset = Math.sin(time * 1.5 + i) * (w * 0.08);
        const cx = px * 0.3 + w * 0.5 + Math.cos(angle) * (w * 0.18 + radiusOffset);
        const cy = py * 0.3 + h * 0.5 + Math.sin(angle * 1.2) * (h * 0.16 + radiusOffset);

        const r = Math.min(w, h) * (0.28 + Math.sin(time * 0.7 + i) * 0.08);
        const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);

        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.18, "#e2e8f0");
        grad.addColorStop(0.42, "#64748b");
        grad.addColorStop(0.68, "#1e293b");
        grad.addColorStop(0.9, "#0f172a");
        grad.addColorStop(1, "rgba(9, 9, 11, 0)");

        ctx.save();
        ctx.globalCompositeOperation = i % 2 === 0 ? "screen" : "lighter";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
    };
  }, [speed, interactive, reducedMotion]);

  return (
    <div
      className={cn("relative isolate w-full min-h-full overflow-hidden bg-[#09090b]", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover filter contrast-150 saturate-50 pointer-events-none"
      />
      {children}
    </div>
  );
}
