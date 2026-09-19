import * as React from "react";

// Helper hook for high-performance canvas loop with auto resize
function useCanvasLoop(
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number, frame: number) => void,
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let frame = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) * 0.001;
      const width = canvas.width;
      const height = canvas.height;
      draw(ctx, width, height, time, frame++);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [draw]);

  return canvasRef;
}

// 1. shape-waves-canvas
export function ShapeWavesCanvasPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#060912";
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1.8;

    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = j % 2 === 0 ? "#ba442c" : "#38bdf8";
      ctx.beginPath();
      const cy = h * 0.2 + j * (h * 0.12);
      for (let x = 0; x <= w; x += 6) {
        const y = cy + Math.sin(x * 0.025 + time * 2 + j * 0.8) * 14 * Math.cos(x * 0.01 + time);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#060912] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-3 font-mono text-[9px] text-sky-400 font-bold tracking-widest uppercase">
        SHAPE WAVES
      </div>
    </div>
  );
}

// 2. aero-shards-svg
export function AeroShardsSvgPreview() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    let id: number;
    const loop = () => {
      setOffset((o) => (o + 0.5) % 360);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#080d1a] overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="shard-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ba442c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="shard-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Floating aerodynamic polygon shards */}
        <polygon
          points="40,20 120,60 80,140 20,90"
          fill="url(#shard-grad-1)"
          transform={`translate(${Math.sin(offset * 0.02) * 15}, ${Math.cos(offset * 0.02) * 10})`}
        />
        <polygon
          points="180,40 280,20 260,130 190,100"
          fill="url(#shard-grad-2)"
          transform={`translate(${Math.cos(offset * 0.015) * 12}, ${Math.sin(offset * 0.025) * 12})`}
        />
        <polygon
          points="110,100 210,120 170,180 90,160"
          fill="url(#shard-grad-1)"
          opacity="0.6"
          transform={`translate(${Math.sin(offset * 0.03) * 10}, ${Math.cos(offset * 0.015) * 14})`}
        />
      </svg>
      <div className="absolute bottom-2 left-3 font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">
        AERO SHARDS
      </div>
    </div>
  );
}

// 3. ghost-fibers-stream
export function GhostFibersStreamPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#05070e";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      const xStart = (w / 18) * i + Math.sin(time + i) * 10;
      ctx.moveTo(xStart, 0);

      const cp1x = xStart + Math.sin(time * 1.5 + i * 0.4) * 35;
      const cp1y = h * 0.4;
      const cp2x = xStart - Math.cos(time * 1.2 + i * 0.5) * 35;
      const cp2y = h * 0.7;
      const xEnd = xStart + Math.sin(time + i * 0.3) * 20;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, xEnd, h);
      ctx.strokeStyle = i % 3 === 0 ? "rgba(186,68,44,0.6)" : i % 3 === 1 ? "rgba(56,189,248,0.6)" : "rgba(168,85,247,0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Glowing fiber pulse node
      const pulseY = ((time * 40 + i * 25) % h);
      const pulseX = xStart + Math.sin(pulseY * 0.02 + time) * 15;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#05070e] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-cyan-300 font-bold uppercase tracking-wider">
        GHOST FIBERS
      </div>
    </div>
  );
}

// 4. molten-metal-flow
export function MoltenMetalFlowPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    // Fast sinusoidal fluid pattern
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const v = Math.sin(x * 0.03 + time) + Math.cos(y * 0.03 - time) + Math.sin((x + y) * 0.02 + time * 1.5);
        const col = Math.floor(((v + 3) / 6) * 255);

        // Mercury metallic chrome shading
        const r = Math.min(255, col + 40);
        const g = Math.min(255, col + 45);
        const b = Math.min(255, col + 60);

        const idx = (y * w + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;

        // Fill neighbor for 2x speed
        if (x + 1 < w) {
          const idx2 = (y * w + x + 1) * 4;
          data[idx2] = r; data[idx2 + 1] = g; data[idx2 + 2] = b; data[idx2 + 3] = 255;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Specular highlight line
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5 + Math.sin(time) * 30);
    ctx.bezierCurveTo(w * 0.3, h * 0.2, w * 0.7, h * 0.8, w, h * 0.4 + Math.cos(time) * 20);
    ctx.stroke();
  });

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
      <canvas ref={canvasRef} width={160} height={100} className="w-full h-full object-cover filter contrast-125" />
      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
        MOLTEN CHROME
      </div>
    </div>
  );
}

// 5. gradient-waves-sine
export function GradientWavesSinePreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#0a0c16";
    ctx.fillRect(0, 0, w, h);

    const gradients: [string, string][] = [
      ["rgba(186,68,44,0.7)", "rgba(245,158,11,0)"],
      ["rgba(56,189,248,0.7)", "rgba(129,140,248,0)"],
      ["rgba(236,72,153,0.6)", "rgba(168,85,247,0)"],
    ];

    gradients.forEach(([col1, col2], idx) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      const baseH = h * 0.45 + idx * 25;

      for (let x = 0; x <= w; x += 8) {
        const y = baseH + Math.sin(x * 0.02 + time * 1.5 + idx * 1.2) * 25 + Math.cos(x * 0.01 - time) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseH - 30, 0, h);
      grad.addColorStop(0, col1);
      grad.addColorStop(1, col2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  });

  return (
    <div className="relative w-full h-full bg-[#0a0c16] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-pink-400 font-bold uppercase tracking-wider">
        GRADIENT SINE
      </div>
    </div>
  );
}

// 6. sliced-waves-depth
export function SlicedWavesDepthPreview() {
  return (
    <div className="relative w-full h-full bg-[#070b14] overflow-hidden flex flex-col justify-center gap-2 p-3 select-none">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="relative h-6 rounded-lg bg-gradient-to-r from-oxide/80 via-amber-500/60 to-cyan-500/80 shadow-lg transform -skew-x-12 animate-pulse"
          style={{
            animationDuration: `${1.8 + i * 0.4}s`,
            marginLeft: `${(i % 3) * 16}px`,
            marginRight: `${((5 - i) % 3) * 16}px`,
          }}
        >
          <div className="absolute inset-0 bg-black/30 rounded-lg backdrop-blur-xs" />
          <span className="absolute right-3 top-1 font-mono text-[8px] text-white/90 font-bold">
            STRATA 0{i}
          </span>
        </div>
      ))}
    </div>
  );
}

// 7. lightfall-stream
export function LightfallStreamPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "rgba(6, 8, 14, 0.25)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 30; i++) {
      const x = (w / 30) * i + 5;
      const speed = 60 + (i % 5) * 30;
      const y = (time * speed + i * 40) % (h + 40) - 20;
      const len = 15 + (i % 4) * 8;

      const grad = ctx.createLinearGradient(x, y - len, x, y);
      grad.addColorStop(0, "rgba(56, 189, 248, 0)");
      grad.addColorStop(1, i % 2 === 0 ? "#38bdf8" : "#ba442c");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Droplet head
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#06080e] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider">
        LIGHTFALL
      </div>
    </div>
  );
}

// 8. liquid-ether-canvas
export function LiquidEtherCanvasPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#070810";
    ctx.fillRect(0, 0, w, h);

    const blobs = [
      { x: w * 0.35 + Math.sin(time) * 40, y: h * 0.4 + Math.cos(time * 0.8) * 30, r: 65, color: "rgba(186,68,44,0.6)" },
      { x: w * 0.65 + Math.cos(time * 0.9) * 45, y: h * 0.6 + Math.sin(time * 1.1) * 25, r: 75, color: "rgba(56,189,248,0.5)" },
      { x: w * 0.5 + Math.sin(time * 1.3) * 35, y: h * 0.3 + Math.cos(time) * 35, r: 55, color: "rgba(168,85,247,0.5)" },
    ];

    blobs.forEach((b) => {
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, "rgba(7,8,16,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <div className="relative w-full h-full bg-[#070810] overflow-hidden filter blur-[2px]">
      <canvas ref={canvasRef} width={240} height={160} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-purple-300 font-bold uppercase tracking-wider">
        LIQUID ETHER
      </div>
    </div>
  );
}

// 9. light-pillar-ambient
export function LightPillarAmbientPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#05060b";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 5; i++) {
      const x = w * (0.2 + i * 0.15) + Math.sin(time + i) * 12;
      const width = 18 + Math.sin(time * 2 + i) * 6;

      const grad = ctx.createLinearGradient(x, h, x, 0);
      grad.addColorStop(0, i % 2 === 0 ? "rgba(186,68,44,0.8)" : "rgba(245,158,11,0.8)");
      grad.addColorStop(0.7, "rgba(56,189,248,0.3)");
      grad.addColorStop(1, "rgba(5,6,11,0)");

      ctx.fillStyle = grad;
      ctx.fillRect(x - width / 2, 0, width, h);
    }
  });

  return (
    <div className="relative w-full h-full bg-[#05060b] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">
        LIGHT PILLARS
      </div>
    </div>
  );
}

// 10. silk-flow-harmonic
export function SilkFlowHarmonicPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#080914";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      const base = h * 0.2 + i * 20;
      ctx.moveTo(0, base);

      for (let x = 0; x <= w; x += 10) {
        const y = base + Math.sin(x * 0.015 + time * 1.2 + i * 0.5) * 30 + Math.cos(x * 0.03 - time * 0.8) * 12;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `hsla(${200 + i * 25}, 85%, 65%, 0.55)`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#080914] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-3 font-mono text-[9px] text-sky-300 font-bold uppercase tracking-wider">
        SILK FLOW
      </div>
    </div>
  );
}

// 11. floating-lines-vector
export function FloatingLinesVectorPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#090a12";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const p1 = { x: 20, y: h * 0.3 + Math.sin(time + i) * 30 };
      const cp1 = { x: w * 0.4, y: h * 0.1 + Math.cos(time * 1.3 + i) * 45 };
      const cp2 = { x: w * 0.6, y: h * 0.9 + Math.sin(time * 1.1 + i) * 40 };
      const p2 = { x: w - 20, y: h * 0.6 + Math.cos(time + i) * 30 };

      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
      ctx.strokeStyle = i % 2 === 0 ? "rgba(186,68,44,0.7)" : "rgba(56,189,248,0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#090a12] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-3 font-mono text-[9px] text-oxide font-bold uppercase tracking-wider">
        VECTOR LINES
      </div>
    </div>
  );
}

// 12. side-rays-ambient
export function SideRaysAmbientPreview() {
  return (
    <div className="relative w-full h-full bg-[#080a14] overflow-hidden select-none">
      <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl" />
      {[0, 15, 30, 45, 60].map((deg) => (
        <div
          key={deg}
          className="absolute top-0 left-0 w-[400px] h-12 origin-top-left bg-gradient-to-r from-amber-400/40 via-amber-200/10 to-transparent blur-md"
          style={{ transform: `rotate(${deg}deg)` }}
        />
      ))}
      <span className="absolute bottom-2 left-3 font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider">
        SIDE SUNBEAMS
      </span>
    </div>
  );
}

// 13. light-rays-shimmer
export function LightRaysShimmerPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#070b16";
    ctx.fillRect(0, 0, w, h);

    // Radial light rays from top center
    const cx = w * 0.5;
    const cy = 0;
    const numRays = 12;

    for (let i = 0; i < numRays; i++) {
      const angle = (Math.PI / (numRays + 1)) * (i + 1) + Math.sin(time + i) * 0.05;
      const xEnd = cx + Math.cos(angle) * w;
      const yEnd = cy + Math.sin(angle) * h * 1.5;

      const grad = ctx.createLinearGradient(cx, cy, xEnd, yEnd);
      grad.addColorStop(0, "rgba(255, 230, 180, 0.5)");
      grad.addColorStop(1, "rgba(7, 11, 22, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.lineTo(xEnd + 20, yEnd);
      ctx.lineTo(xEnd - 20, yEnd);
      ctx.closePath();
      ctx.fill();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#070b16] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-amber-200 font-bold uppercase tracking-wider">
        CREPUSCULAR SHIMMER
      </div>
    </div>
  );
}

// 14. color-bends-flow
export function ColorBendsFlowPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#060914";
    ctx.fillRect(0, 0, w, h);

    const colors = ["#ba442c", "#f59e0b", "#38bdf8", "#818cf8", "#10b981"];
    colors.forEach((col, idx) => {
      ctx.beginPath();
      const cy = h * 0.3 + idx * 16;
      ctx.moveTo(0, cy);

      for (let x = 0; x <= w; x += 10) {
        const y = cy + Math.sin(x * 0.02 + time * 2 + idx * 0.6) * 35;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = col;
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  });

  return (
    <div className="relative w-full h-full bg-[#060914] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-3 font-mono text-[9px] text-white font-bold uppercase tracking-wider">
        COLOR BENDS
      </div>
    </div>
  );
}

// 15. evil-eye-geometry
export function EvilEyeGeometryPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let id: number;
    const loop = () => {
      setAngle((a) => (a + 1) % 360);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#090710] flex items-center justify-center overflow-hidden select-none">
      <div
        className="w-36 h-36 rounded-full border-2 border-oxide/80 flex items-center justify-center relative transition-transform duration-75"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div className="w-28 h-28 rounded-full border border-amber-400/80 border-dashed flex items-center justify-center" />
        <div className="absolute w-20 h-20 border-2 border-cyan-400 rotate-45" />
        <div className="absolute w-12 h-12 rounded-full bg-oxide/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white shadow-md shadow-amber-400" />
        </div>
      </div>
      <span className="absolute bottom-2 font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">
        SACRED GEOMETRY
      </span>
    </div>
  );
}

// 16. line-waves-procedural
export function LineWavesProceduralPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#080b12";
    ctx.fillRect(0, 0, w, h);

    // Audio synthesizer style oscilloscope landscape
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.6;

    for (let row = 0; row < 8; row++) {
      ctx.beginPath();
      const cy = h * 0.25 + row * (h * 0.09);
      for (let x = 0; x <= w; x += 4) {
        const distFromCenter = Math.abs(x - w / 2) / (w / 2);
        const amp = Math.max(0, 1 - distFromCenter) * 35;
        const y = cy - Math.abs(Math.sin(x * 0.08 + time * 3 + row)) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#080b12] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider">
        PROCEDURAL OSCILLATOR
      </div>
    </div>
  );
}

// 17. gradient-blinds-slats
export function GradientBlindsSlatsPreview() {
  return (
    <div className="relative w-full h-full bg-[#070b14] flex flex-col justify-between p-2 select-none overflow-hidden">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="h-5 rounded bg-gradient-to-r from-oxide via-amber-400 to-sky-500 shadow-md transition-transform duration-500 hover:rotate-3"
          style={{
            transform: `perspective(400px) rotateX(${Math.sin(i * 0.8) * 25}deg)`,
          }}
        />
      ))}
      <span className="absolute bottom-1 right-2 font-mono text-[8px] text-white/90 font-bold uppercase">
        VENETIAN BLINDS
      </span>
    </div>
  );
}

// 18. galaxy-spiral-points
export function GalaxySpiralPointsPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#04050a";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Glowing core
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.3, "rgba(245,158,11,0.8)");
    coreGrad.addColorStop(1, "rgba(4,5,10,0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, Math.PI * 2);
    ctx.fill();

    // Spiral arms
    const numStars = 240;
    for (let i = 0; i < numStars; i++) {
      const arm = i % 3;
      const armOffset = (arm * Math.PI * 2) / 3;
      const r = 5 + Math.pow(i / numStars, 0.7) * (w * 0.45);
      const angle = armOffset + r * 0.05 + time * 0.8;

      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * (r * 0.6);

      ctx.fillStyle = arm === 0 ? "#ba442c" : arm === 1 ? "#38bdf8" : "#f59e0b";
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#04050a] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-3 font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider">
        SPIRAL GALAXY
      </div>
    </div>
  );
}

// 19. iridescence-sheen-fresnel
export function IridescenceSheenFresnelPreview() {
  const [deg, setDeg] = React.useState(0);
  React.useEffect(() => {
    let id: number;
    const loop = () => {
      setDeg((d) => (d + 0.8) % 360);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
      style={{
        background: `conic-gradient(from ${deg}deg at 50% 50%, #ba442c, #38bdf8, #a855f7, #f59e0b, #ba442c)`,
      }}
    >
      <div className="w-48 h-28 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/30 p-3 flex flex-col justify-between text-white shadow-2xl">
        <span className="font-mono text-[9px] text-cyan-300 font-bold uppercase">FRESNEL INTERFERENCE</span>
        <h4 className="font-display font-black text-sm">Soap Bubble Sheen</h4>
      </div>
    </div>
  );
}

// 20. sine-waves-smooth
export function SineWavesSmoothPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#080c16";
    ctx.fillRect(0, 0, w, h);

    const waves = [
      { freq: 0.02, amp: 20, speed: 2, color: "#ba442c" },
      { freq: 0.035, amp: 14, speed: -1.5, color: "#38bdf8" },
      { freq: 0.015, amp: 28, speed: 1.2, color: "#10b981" },
    ];

    waves.forEach((wv) => {
      ctx.beginPath();
      ctx.strokeStyle = wv.color;
      ctx.lineWidth = 2.2;
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.5 + Math.sin(x * wv.freq + time * wv.speed) * wv.amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  });

  return (
    <div className="relative w-full h-full bg-[#080c16] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
        SMOOTH SINE HARMONICS
      </div>
    </div>
  );
}

// 21. grid-distortion-pointer
export function GridDistortionPointerPreview() {
  const [pointer, setPointer] = React.useState({ x: 160, y: 100 });
  const canvasRef = useCanvasLoop((ctx, w, h) => {
    ctx.fillStyle = "#080b12";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1;

    const cols = 16;
    const rows = 10;
    const cellW = w / cols;
    const cellH = h / rows;

    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        let x = c * cellW;
        let y = r * cellH;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const factor = (1 - dist / 80) * 18;
          x += (dx / dist) * factor;
          y += (dy / dist) * factor;
        }

        if (c === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({ x: ((e.clientX - r.left) / r.width) * 320, y: ((e.clientY - r.top) / r.height) * 200 });
      }}
      className="relative w-full h-full bg-[#080b12] overflow-hidden cursor-crosshair"
    >
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2 left-3 font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider">
        SPACETIME WARP GRID
      </div>
    </div>
  );
}

// 22. grid-motion-pan
export function GridMotionPanPreview() {
  return (
    <div className="relative w-full h-full bg-[#07090f] overflow-hidden flex items-center justify-center select-none [perspective:400px]">
      <div
        className="w-[600px] h-[600px] absolute bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] origin-center animate-pulse"
        style={{ transform: "rotateX(65deg) translateY(-20%)" }}
      />
      <div className="relative z-10 px-4 py-2 rounded-xl bg-black/60 border border-oxide/60 font-mono text-xs text-white font-bold tracking-widest shadow-xl">
        INFINITE 3D GRID
      </div>
    </div>
  );
}

// 23. shape-grid-cells
export function ShapeGridCellsPreview() {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 4), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#090d16] p-4 grid grid-cols-6 gap-2 items-center justify-center select-none">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 border border-line flex items-center justify-center transition-all duration-500 ${
            (i + phase) % 3 === 0
              ? "rounded-full bg-oxide text-white"
              : (i + phase) % 3 === 1
              ? "rounded-md bg-sky-500 text-white rotate-45"
              : "rounded-none bg-surface text-ink"
          }`}
        >
          <span className="font-mono text-[7px] font-bold">◈</span>
        </div>
      ))}
    </div>
  );
}

// 24. liquid-chrome-fluid
export function LiquidChromeFluidPreview() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#0c0d12";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 5; i++) {
      const grad = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time + i) * 60,
        h * 0.5 + Math.cos(time * 1.2 + i) * 35,
        5,
        w * 0.5,
        h * 0.5,
        90
      );
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#94a3b8");
      grad.addColorStop(0.7, "#334155");
      grad.addColorStop(1, "rgba(12, 13, 18, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, 90, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#0c0d12] overflow-hidden">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover filter contrast-150" />
      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
        LIQUID CHROME
      </div>
    </div>
  );
}

export function GenericBackgroundPreview({ title }: { title: string }) {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, w, h);

    // Subtle atmospheric grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const step = 24;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Undulating sine waves
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = i === 0 ? "rgba(186, 68, 44, 0.45)" : i === 1 ? "rgba(56, 189, 248, 0.35)" : "rgba(168, 85, 247, 0.25)";
      ctx.lineWidth = 1.5;
      const cy = h * (0.35 + i * 0.15);
      for (let x = 0; x <= w; x += 4) {
        const y = cy + Math.sin(x * 0.02 + time * 1.5 + i * 1.2) * 16 * Math.cos(x * 0.008 + time * 0.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} width={320} height={200} className="w-full h-full object-cover" />
      <div className="absolute top-2.5 right-3 font-mono text-[9px] text-oxide font-bold tracking-widest uppercase">
        PROCEDURAL BG
      </div>
      <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-zinc-400 font-medium truncate max-w-[200px]">
        {title.replace(/-/g, " ")}
      </div>
    </div>
  );
}

export const BACKGROUNDS_PREVIEWS_MAP: Record<string, React.ComponentType> = {
  "shape-waves-canvas": ShapeWavesCanvasPreview,
  "shape-waves": ShapeWavesCanvasPreview,
  "aero-shards-svg": AeroShardsSvgPreview,
  "aero-shards": AeroShardsSvgPreview,
  "ghost-fibers-stream": GhostFibersStreamPreview,
  "molten-metal-flow": MoltenMetalFlowPreview,
  "gradient-waves-sine": GradientWavesSinePreview,
  "sliced-waves-depth": SlicedWavesDepthPreview,
  "lightfall-stream": LightfallStreamPreview,
  "liquid-ether-canvas": LiquidEtherCanvasPreview,
  "light-pillar-ambient": LightPillarAmbientPreview,
  "silk-flow-harmonic": SilkFlowHarmonicPreview,
  "floating-lines-vector": FloatingLinesVectorPreview,
  "side-rays-ambient": SideRaysAmbientPreview,
  "light-rays-shimmer": LightRaysShimmerPreview,
  "color-bends-flow": ColorBendsFlowPreview,
  "evil-eye-geometry": EvilEyeGeometryPreview,
  "line-waves-procedural": LineWavesProceduralPreview,
  "gradient-blinds-slats": GradientBlindsSlatsPreview,
  "galaxy-spiral-points": GalaxySpiralPointsPreview,
  "iridescence-sheen-fresnel": IridescenceSheenFresnelPreview,
  "sine-waves-smooth": SineWavesSmoothPreview,
  "grid-distortion-pointer": GridDistortionPointerPreview,
  "grid-motion-pan": GridMotionPanPreview,
  "shape-grid-cells": ShapeGridCellsPreview,
  "liquid-chrome-fluid": LiquidChromeFluidPreview,
};

