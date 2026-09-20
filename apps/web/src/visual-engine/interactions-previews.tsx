// Bespoke high-craft visual previews for OpenUI interaction components
import * as React from "react";
import { CATALOGUE_INTERACTIONS_PREVIEWS } from "./interactions-catalogue-previews.js";

// 1. Click Sparkle Trail
export function ClickSparkleTrailPreview() {
  const [sparks, setSparks] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([
    { id: 1, x: 60, y: 50, size: 16 },
    { id: 2, x: 140, y: 40, size: 22 },
    { id: 3, x: 210, y: 70, size: 14 },
    { id: 4, x: 100, y: 110, size: 18 },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const rx = 30 + Math.random() * 200;
      const ry = 25 + Math.random() * 110;
      const id = Date.now() + Math.random();
      setSparks((prev) => [...prev.slice(-6), { id, x: rx, y: ry, size: 12 + Math.random() * 14 }]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden bg-gradient-to-b from-paper to-line/5 p-4">
      <div className="flex flex-col items-center gap-1 z-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-oxide font-bold">
          ✦ Interactive Burst
        </span>
        <div className="px-3 py-1.5 rounded-full border border-line/40 bg-paper/80 shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-display text-xs text-ink">Click Sparkle Trail</span>
        </div>
      </div>

      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute text-amber-500 font-bold transition-all duration-700 animate-ping"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            fontSize: `${s.size}px`,
            opacity: 0.85,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

// 2. Click Wave Emitter
export function ClickWaveEmitterPreview() {
  const [waves, setWaves] = React.useState<number[]>([0, 1, 2]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWaves((prev) => [...prev.slice(-4), Date.now()]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-paper">
      {/* Expanding Ripple Rings */}
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center z-10 shadow-xs">
          <div className="w-4 h-4 rounded-full bg-oxide animate-pulse" />
        </div>

        <div className="absolute w-20 h-20 rounded-full border border-oxide/50 animate-ping opacity-75" />
        <div className="absolute w-32 h-32 rounded-full border border-oxide/30 animate-pulse opacity-50" />
        <div className="absolute w-44 h-44 rounded-full border border-line/30" />
      </div>

      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-graphite">
          Omnidirectional Pulse
        </span>
      </div>
    </div>
  );
}

// 3. Color Eyedropper Loupe
export function ColorEyedropperLoupePreview() {
  const [pos, setPos] = React.useState({ x: 120, y: 70 });
  React.useEffect(() => {
    let t = 0;
    let frame: number;
    const loop = () => {
      t += 0.03;
      setPos({
        x: 120 + Math.sin(t) * 45,
        y: 70 + Math.cos(t * 0.8) * 20,
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-paper flex items-center justify-center p-4">
      {/* Palette strip in background */}
      <div className="w-full max-w-[240px] h-10 rounded-lg overflow-hidden flex border border-line/40 opacity-70">
        <div className="flex-1 bg-amber-500" />
        <div className="flex-1 bg-oxide" />
        <div className="flex-1 bg-rose-600" />
        <div className="flex-1 bg-violet-600" />
        <div className="flex-1 bg-cyan-600" />
        <div className="flex-1 bg-emerald-600" />
      </div>

      {/* Floating Loupe Lens */}
      <div
        className="absolute w-20 h-20 rounded-full border-2 border-ink bg-white/95 dark:bg-[#181816]/95 shadow-xl flex flex-col items-center justify-center pointer-events-none"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div className="w-6 h-6 rounded-full bg-oxide shadow-inner border border-white/40 mb-0.5" />
        <span className="font-mono text-[8.5px] font-bold text-ink">#BA442C</span>
        <span className="font-mono text-[7px] text-graphite">SAMPLING</span>
      </div>
    </div>
  );
}

// 4. Command Palette Search
export function CommandPaletteSearchPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-paper">
      <div className="w-full max-w-[250px] rounded-lg border border-line bg-surface/50 shadow-xs overflow-hidden">
        <div className="px-3 py-2 border-b border-line/60 flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-graphite flex items-center gap-1.5">
            <span className="text-oxide font-bold">›</span> Quick Search...
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-line/20 font-mono text-[8px] text-ink font-bold">
            ⌘K
          </kbd>
        </div>
        <div className="divide-y divide-line/30 p-1 font-mono text-[10px]">
          <div className="px-2 py-1.5 rounded bg-oxide/10 text-oxide font-semibold flex items-center justify-between">
            <span>Navigation.Deploy</span>
            <span className="text-[8px] opacity-70">Action</span>
          </div>
          <div className="px-2 py-1 text-ink/70 flex items-center justify-between">
            <span>Registry.Browse</span>
            <span className="text-[8px] text-graphite">Jump</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Coordinate Crosshair Inspect
export function CoordinateCrosshairInspectPreview() {
  const [coords, setCoords] = React.useState({ x: 135, y: 72 });
  React.useEffect(() => {
    let t = 0;
    let frame: number;
    const loop = () => {
      t += 0.04;
      setCoords({
        x: Math.round(135 + Math.sin(t) * 50),
        y: Math.round(72 + Math.cos(t * 1.3) * 28),
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-paper flex items-center justify-center">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--line)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--line)/0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Crosshair Lines */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-oxide/60 pointer-events-none"
        style={{ left: `${coords.x}px` }}
      />
      <div
        className="absolute left-0 right-0 h-[1px] bg-oxide/60 pointer-events-none"
        style={{ top: `${coords.y}px` }}
      />

      {/* Target Reticle */}
      <div
        className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border border-oxide flex items-center justify-center pointer-events-none shadow-xs"
        style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-oxide" />
      </div>

      {/* Readout */}
      <div className="absolute top-2.5 right-3 font-mono text-[9px] px-2 py-0.5 rounded bg-paper/90 border border-line/40 text-ink">
        X: <span className="text-oxide font-bold">{coords.x}</span> Y:{" "}
        <span className="text-oxide font-bold">{coords.y}</span>
      </div>
    </div>
  );
}

// 6. Cursor Trail
export function CursorTrailPreview() {
  const points = [
    { x: 50, y: 90, op: 0.2 },
    { x: 80, y: 75, op: 0.35 },
    { x: 115, y: 65, op: 0.5 },
    { x: 155, y: 70, op: 0.7 },
    { x: 195, y: 85, op: 0.9 },
    { x: 220, y: 65, op: 1.0 },
  ];

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-paper flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 280 150">
        <path
          d="M 50,90 Q 115,40 155,70 T 220,65"
          fill="none"
          stroke="#ba442c"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          className="animate-pulse"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 4.5 : 3} fill="#ba442c" opacity={p.op} />
        ))}
      </svg>
      <span className="absolute bottom-3 font-mono text-[9px] uppercase tracking-widest text-graphite">
        Velocity Kinetic Ribbon
      </span>
    </div>
  );
}

// 7. Directional Hover Card
export function DirectionalHoverCardPreview() {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center select-none bg-paper">
      <div className="w-full max-w-[220px] p-4 rounded-xl border border-line bg-gradient-to-br from-paper via-surface/40 to-line/10 shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
        <span className="font-mono text-[8px] uppercase tracking-wider text-oxide font-bold">
          3D SPECULAR TILT
        </span>
        <h4 className="font-display text-sm font-bold text-ink mt-1">Spatial Inertia</h4>
        <p className="text-[10px] text-graphite mt-1 leading-tight">
          Vector cursor tracking with real-time rotational transforms.
        </p>
      </div>
    </div>
  );
}

// 8. Magnetic Tilt Button
export function MagneticTiltButtonPreview() {
  const [tilt, setTilt] = React.useState(0);
  React.useEffect(() => {
    let t = 0;
    let frame: number;
    const loop = () => {
      t += 0.05;
      setTilt(Math.sin(t) * 12);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div
        className="px-5 py-2.5 rounded-full border border-oxide bg-oxide/10 text-oxide font-mono text-xs font-bold shadow-lg transition-transform duration-100 flex items-center gap-2"
        style={{ transform: `translate(${tilt * 0.8}px, ${tilt * 0.3}px) rotate(${tilt * 0.4}deg)` }}
      >
        <span className="w-2 h-2 rounded-full bg-oxide animate-ping" />
        MAGNETIC PULL
      </div>
      <span className="font-mono text-[8.5px] text-graphite mt-3 uppercase tracking-widest">
        Spring Field Force
      </span>
    </div>
  );
}

// 9. Radial Color Wheel Picker
export function RadialColorWheelPickerPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-paper p-3">
      <div className="relative w-24 h-24 rounded-full border border-line/40 flex items-center justify-center shadow-md bg-gradient-to-tr from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-indigo-500">
        <div className="w-14 h-14 rounded-full bg-paper flex flex-col items-center justify-center shadow-inner">
          <span className="font-mono text-[9px] font-bold text-ink">360°</span>
          <span className="font-mono text-[7px] text-oxide font-bold">HSL</span>
        </div>
        <div className="absolute top-1 left-10 w-3.5 h-3.5 rounded-full border-2 border-white bg-oxide shadow" />
      </div>
    </div>
  );
}

// 10. Coordinate Pin Drop
export function CoordinatePinDropPreview() {
  const [dropped, setDropped] = React.useState(true);
  React.useEffect(() => {
    const t = setInterval(() => setDropped((d) => !d), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-paper flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--line)/0.15)_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div
        className={`relative flex flex-col items-center transition-all duration-500 transform ${
          dropped ? "translate-y-0 opacity-100 scale-100" : "-translate-y-6 opacity-0 scale-75"
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-oxide text-white flex items-center justify-center shadow-lg font-bold text-xs">
          📍
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-oxide animate-ping mt-1" />
      </div>
      <div className="absolute bottom-2.5 font-mono text-[9px] text-graphite tracking-widest uppercase">
        Pin Matrix · [42.36, -71.05]
      </div>
    </div>
  );
}

// 11. Coordinate Reticle Tracker
export function CoordinateReticleTrackerPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let a = 0;
    const loop = () => {
      a += 0.03;
      setAngle(a);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#0d0e12] flex items-center justify-center">
      <div className="relative w-24 h-24 rounded-full border border-sky-500/30 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/60"
          style={{ transform: `rotate(${angle * 40}deg)` }}
        />
        <div className="w-8 h-8 rounded-full border border-oxide flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-oxide animate-pulse" />
        </div>
        <div className="absolute top-1 font-mono text-[7px] text-sky-400 font-bold">LOCK</div>
      </div>
      <span className="absolute bottom-2 font-mono text-[8px] text-sky-300 uppercase tracking-widest">
        RETICLE ACTIVE
      </span>
    </div>
  );
}

// 12. Drag Drop Upload Zone
export function DragDropUploadZonePreview() {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => !a), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex items-center justify-center select-none bg-paper">
      <div
        className={`w-full max-w-[240px] p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
          active
            ? "border-oxide bg-oxide/5 scale-[1.02] shadow-sm"
            : "border-line/60 bg-surface/40"
        }`}
      >
        <span className="text-xl">{active ? "📥" : "☁️"}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-oxide">
          {active ? "Release to Drop" : "Drag files here"}
        </span>
        <span className="font-mono text-[8px] text-graphite">SVG, PNG, TSX up to 10MB</span>
      </div>
    </div>
  );
}

// 13. Drag Reorder List
export function DragReorderListPreview() {
  const [items, setItems] = React.useState(["01 Navigation", "02 Visual Spec", "03 Motion Flow"]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => [prev[1] || "", prev[2] || "", prev[0] || ""]);
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-paper font-mono text-[10px]">
      <div className="w-full max-w-[210px] space-y-1.5">
        {items.map((it, idx) => (
          <div
            key={it}
            className={`px-3 py-1.5 rounded-md border flex items-center justify-between transition-all duration-300 ${
              idx === 0
                ? "border-oxide bg-oxide/10 text-oxide font-bold shadow-xs translate-x-1"
                : "border-line/40 bg-surface/40 text-ink"
            }`}
          >
            <span>{it}</span>
            <span className="text-graphite cursor-grab">⠿</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 14. Elastic Slider Knob
export function ElasticSliderKnobPreview() {
  const [val, setVal] = React.useState(45);
  React.useEffect(() => {
    let t = 0;
    let frame: number;
    const loop = () => {
      t += 0.04;
      setVal(50 + Math.sin(t) * 35);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-paper">
      <div className="w-full max-w-[220px]">
        <div className="flex justify-between font-mono text-[9px] text-graphite mb-1.5 font-bold">
          <span>INTENSITY</span>
          <span className="text-oxide">{Math.round(val)}%</span>
        </div>
        <div className="relative w-full h-2.5 rounded-full bg-line/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-oxide to-amber-500 transition-all duration-75"
            style={{ width: `${val}%` }}
          />
        </div>
        <div
          className="relative -mt-3.5 w-4.5 h-4.5 rounded-full bg-paper border-2 border-oxide shadow-md"
          style={{ left: `calc(${val}% - 9px)` }}
        />
      </div>
    </div>
  );
}

// 15. Hover Audio Waveform Scrub
export function HoverAudioWaveformScrubPreview() {
  const heights = [20, 45, 70, 35, 80, 95, 60, 40, 75, 90, 50, 65, 30, 85, 40];
  const [playIdx, setPlayIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPlayIdx((i) => (i + 1) % heights.length), 150);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-paper">
      <div className="w-full max-w-[230px] flex items-center justify-between h-12 gap-1 px-2 py-1 rounded-lg border border-line/40 bg-surface/30">
        {heights.map((h, idx) => (
          <div
            key={idx}
            className={`w-2 rounded-full transition-all duration-100 ${
              idx <= playIdx ? "bg-oxide" : "bg-line/40"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] text-graphite tracking-widest mt-2 uppercase">
        Audio Scrub · 00:{playIdx < 10 ? `0${playIdx}` : playIdx}
      </span>
    </div>
  );
}


// ─── BESPOKE DEDICATED INTERACTION PREVIEWS ──────────────────────────────────

export function DragDropCardStackPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const dragY = Math.sin(tick) * 12;
  const dragX = Math.cos(tick * 0.7) * 10;
  const dragRot = Math.sin(tick) * 4;
  const isNearTarget = Math.sin(tick) > 0.4;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative w-44 h-24 flex items-center justify-center">
        {/* Base Stack Cards */}
        <div className="absolute w-36 h-16 rounded-xl border border-line/40 bg-surface/30 transform -rotate-3 translate-y-2 scale-90" />
        <div className="absolute w-36 h-16 rounded-xl border border-line/60 bg-surface/60 transform rotate-2 translate-y-1 scale-95" />

        {/* Floating / Dragged Top Card */}
        <div
          className="absolute w-36 h-16 rounded-xl border-2 border-oxide bg-paper shadow-lg flex flex-col justify-between p-2.5 transition-shadow"
          style={{
            transform: `translate(${dragX}px, ${dragY - 8}px) rotate(${dragRot}deg)`,
            boxShadow: "0 12px 24px -6px rgba(184, 51, 42, 0.22)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] font-bold text-oxide flex items-center gap-1">
              <span>⠿</span> Card #04
            </span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-oxide/10 text-oxide font-mono font-semibold">
              DRAGGING
            </span>
          </div>
          <div className="text-[10px] font-medium text-ink truncate">User Flow Review</div>
        </div>
      </div>

      {/* Drop Target Indicator */}
      <div
        className={`w-44 mt-2 px-2.5 py-1 rounded-lg border border-dashed flex items-center justify-between text-[9px] font-mono transition-colors duration-200 ${
          isNearTarget
            ? "border-oxide bg-oxide/10 text-oxide font-bold"
            : "border-line/60 text-graphite/70"
        }`}
      >
        <span>📥 DROP TO DISCARD</span>
        <span>{isNearTarget ? "READY" : "SNAP"}</span>
      </div>
    </div>
  );
}

export function DragDropKanbanBoardPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.03;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const progress = (Math.sin(tick) + 1) / 2;
  const cardX = -46 + progress * 46;
  const cardY = Math.sin(progress * Math.PI) * -12;
  const cardRot = (progress - 0.5) * 8;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3 overflow-hidden">
      <div className="w-full max-w-[220px] grid grid-cols-3 gap-1.5 mb-1">
        {/* Column 1: TODO */}
        <div className="p-1.5 rounded-lg bg-surface/40 border border-line/40 flex flex-col gap-1 min-h-[95px]">
          <div className="flex items-center justify-between text-[8px] font-mono text-graphite uppercase font-bold px-0.5">
            <span>TODO</span>
            <span className="text-[7px] w-3 h-3 rounded-full bg-line/40 flex items-center justify-center">1</span>
          </div>
          <div className="p-1 rounded bg-paper border border-line/50 text-[8px] text-ink shadow-2xs font-medium">
            Audit API
          </div>
          <div className="p-1 rounded border border-dashed border-line/60 text-[7px] text-graphite/50 font-mono text-center">
            {progress < 0.2 ? "" : "empty"}
          </div>
        </div>

        {/* Column 2: IN PROGRESS */}
        <div className="p-1.5 rounded-lg bg-oxide/5 border border-oxide/30 flex flex-col gap-1 min-h-[95px] relative">
          <div className="flex items-center justify-between text-[8px] font-mono text-oxide uppercase font-bold px-0.5">
            <span>IN DEV</span>
            <span className="text-[7px] w-3 h-3 rounded-full bg-oxide/20 text-oxide flex items-center justify-center font-bold">2</span>
          </div>
          <div
            className={`p-1 rounded border-2 border-dashed flex items-center justify-center text-[7px] font-mono transition-colors ${
              progress > 0.6 ? "border-oxide bg-oxide/15 text-oxide font-bold" : "border-oxide/40 text-oxide/60"
            }`}
          >
            + DROP HERE
          </div>
        </div>

        {/* Column 3: DONE */}
        <div className="p-1.5 rounded-lg bg-surface/30 border border-line/30 flex flex-col gap-1 min-h-[95px]">
          <div className="flex items-center justify-between text-[8px] font-mono text-graphite uppercase font-bold px-0.5">
            <span>DONE</span>
            <span className="text-[7px] w-3 h-3 rounded-full bg-line/30 flex items-center justify-center">3</span>
          </div>
          <div className="p-1 rounded bg-paper border border-line/30 text-[8px] text-graphite/70 flex items-center gap-0.5">
            <span className="text-moss text-[7px]">✓</span> Tokens
          </div>
        </div>
      </div>

      {/* Dragging Active Card overlay */}
      <div
        className="absolute pointer-events-none w-16 p-1.5 rounded-md bg-paper border border-oxide shadow-md flex flex-col gap-0.5"
        style={{
          transform: `translate(${cardX}px, ${cardY - 4}px) rotate(${cardRot}deg)`,
          boxShadow: "0 8px 16px -3px rgba(184, 51, 42, 0.25)",
        }}
      >
        <div className="flex items-center justify-between font-mono text-[6px] text-oxide font-bold">
          <span>#T-29</span>
          <span>⠿</span>
        </div>
        <div className="text-[8px] font-semibold text-ink leading-tight truncate">Sync State</div>
      </div>

      <div className="flex items-center justify-between w-full max-w-[220px] mt-1 font-mono text-[8px] text-graphite">
        <span>KANBAN · TRANSITION</span>
        <span className="text-oxide font-bold">LANE 1 ➔ 2</span>
      </div>
    </div>
  );
}

export function DragDropShelfPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const snapCycle = (Math.sin(tick) + 1) / 2;
  const isSnapped = snapCycle > 0.75;
  const itemY = isSnapped ? 0 : Math.sin(tick) * -16 - 8;
  const itemX = isSnapped ? 46 : 20 + Math.cos(tick * 0.8) * 10;
  const itemRot = isSnapped ? 0 : Math.sin(tick) * 6;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="w-full max-w-[220px] flex items-center justify-between mb-2 font-mono text-[9px]">
        <span className="text-graphite font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-oxide" />
          ASSET SHELF
        </span>
        <span className="text-oxide font-bold">{isSnapped ? "LOCKED IN SLOT 3" : "DRAGGING ASSET"}</span>
      </div>

      <div className="w-full max-w-[220px] relative">
        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-surface/60 border border-line/60 shadow-inner">
          <div className="h-16 rounded-lg bg-paper border border-line/40 p-1.5 flex flex-col items-center justify-center gap-1">
            <span className="text-base">🎵</span>
            <span className="font-mono text-[7px] text-graphite font-medium">chime.wav</span>
          </div>

          <div className="h-16 rounded-lg bg-paper border border-line/40 p-1.5 flex flex-col items-center justify-center gap-1">
            <span className="text-base">🧊</span>
            <span className="font-mono text-[7px] text-graphite font-medium">cube.glb</span>
          </div>

          <div
            className={`h-16 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              isSnapped
                ? "border-oxide bg-oxide/10"
                : "border-oxide/50 bg-oxide/5 animate-pulse"
            }`}
          >
            {isSnapped ? (
              <>
                <span className="text-base">⚡</span>
                <span className="font-mono text-[7px] text-oxide font-bold">spark.svg</span>
              </>
            ) : (
              <>
                <span className="text-[10px] text-oxide font-bold font-mono">📥</span>
                <span className="font-mono text-[7px] text-oxide font-bold">SLOT 03</span>
              </>
            )}
          </div>
        </div>

        <div className="w-full h-1.5 bg-line/60 rounded-b-md mt-0.5" />

        {!isSnapped && (
          <div
            className="absolute top-2 left-0 pointer-events-none w-16 h-16 rounded-lg bg-paper border-2 border-oxide shadow-xl flex flex-col items-center justify-center gap-1"
            style={{
              transform: `translate(${itemX}px, ${itemY}px) rotate(${itemRot}deg)`,
              boxShadow: "0 14px 28px -6px rgba(184, 51, 42, 0.35)",
            }}
          >
            <span className="text-base">⚡</span>
            <span className="font-mono text-[7px] text-oxide font-bold">spark.svg</span>
          </div>
        )}
      </div>

      <span className="font-mono text-[8px] text-graphite/70 mt-2 uppercase tracking-wider">
        Magnetic Snap · 3 Slots
      </span>
    </div>
  );
}

export function DragRotateDialPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const angle = 45 + Math.sin(tick) * 110;
  const pct = Math.round(((angle + 65) / 220) * 100);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 360;
          return (
            <div
              key={i}
              className="absolute w-0.5 h-1.5 bg-line"
              style={{
                transform: `rotate(${a}deg) translateY(-44px)`,
              }}
            />
          );
        })}

        <div className="w-20 h-20 rounded-full border-2 border-line bg-surface/50 shadow-inner flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full bg-paper border-2 border-oxide shadow-md flex items-center justify-center relative"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className="absolute top-1 w-1.5 h-3 rounded-full bg-oxide" />
            <div className="w-4 h-4 rounded-full bg-surface border border-line" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 font-mono text-[9px]">
        <span className="text-graphite uppercase font-bold">ROTARY VALUE</span>
        <span className="text-oxide font-bold px-1.5 py-0.5 rounded bg-oxide/10">{pct}%</span>
      </div>
    </div>
  );
}

export function DragSnapSliderNotchesPreview() {
  const [activeNotch, setActiveNotch] = React.useState(2);
  React.useEffect(() => {
    const t = setInterval(() => {
      setActiveNotch((n) => (n + 1) % 5);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const notches = [0, 25, 50, 75, 100];
  const pct = notches[activeNotch];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[210px] space-y-3">
        <div className="flex justify-between font-mono text-[9px]">
          <span className="text-graphite uppercase font-bold">SNAP NOTCHES</span>
          <span className="text-oxide font-bold font-mono">{pct}%</span>
        </div>

        <div className="relative w-full h-2 rounded-full bg-line/40">
          <div
            className="h-full bg-oxide rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />

          {notches.map((n, i) => (
            <div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border transition-all duration-200 ${
                i <= activeNotch ? "bg-white border-oxide" : "bg-line border-line"
              }`}
              style={{ left: `calc(${n}% - 3px)` }}
            />
          ))}

          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-md bg-paper border-2 border-oxide shadow-md transition-all duration-300 ease-out flex items-center justify-center"
            style={{ left: `calc(${pct}% - 8px)` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-oxide" />
          </div>
        </div>

        <div className="flex justify-between font-mono text-[8px] text-graphite/60 px-0.5">
          {notches.map((n, i) => (
            <span key={i} className={i === activeNotch ? "text-oxide font-bold" : ""}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DraggableRangeBubblePreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const b1 = 30 + Math.sin(tick) * 15;
  const b2 = 70 + Math.cos(tick * 0.9) * 15;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[210px] space-y-3">
        <div className="flex justify-between font-mono text-[9px]">
          <span className="text-graphite uppercase font-bold">RANGE BUBBLES</span>
          <span className="text-oxide font-bold">{Math.round(b1)} – {Math.round(b2)}</span>
        </div>

        <div className="relative w-full h-3 bg-line/30 rounded-full flex items-center">
          <div
            className="absolute h-full bg-oxide/20 rounded-full"
            style={{ left: `${b1}%`, width: `${b2 - b1}%` }}
          />
          <div
            className="absolute w-6 h-6 rounded-full bg-paper border-2 border-oxide shadow-md flex items-center justify-center text-[8px] font-mono text-oxide font-bold"
            style={{ left: `calc(${b1}% - 12px)` }}
          >
            {Math.round(b1)}
          </div>
          <div
            className="absolute w-6 h-6 rounded-full bg-paper border-2 border-oxide shadow-md flex items-center justify-center text-[8px] font-mono text-oxide font-bold"
            style={{ left: `calc(${b2}% - 12px)` }}
          >
            {Math.round(b2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DraggableStickerBoardPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-surface/30 p-3 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:10px_10px] opacity-50" />
      <div className="relative w-48 h-28">
        <div className="absolute top-2 left-2 px-2.5 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 border border-amber-300 text-amber-900 dark:text-amber-200 font-mono text-[9px] font-bold shadow-md transform -rotate-6">
          ⚡ PROTOTYPE
        </div>
        <div className="absolute top-6 right-2 px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-200 font-mono text-[8px] font-bold shadow-sm transform rotate-4">
          ★ APPROVED
        </div>
        <div className="absolute bottom-2 left-10 px-3 py-1.5 rounded-full bg-oxide/10 border border-oxide text-oxide font-mono text-[9px] font-bold shadow-md transform rotate-1">
          🏷️ RELEASE v2.4
        </div>
      </div>
    </div>
  );
}

export function SortableKanbanColumnPreview() {
  const [active, setActive] = React.useState(1);
  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => (a === 1 ? 2 : 1)), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[200px] p-2 rounded-xl bg-surface/50 border border-line/50 space-y-1.5">
        <div className="flex items-center justify-between text-[8px] font-mono font-bold text-graphite uppercase px-1">
          <span>PRIORITY SPRINT</span>
          <span>3 ITEMS</span>
        </div>
        <div className="p-1.5 rounded-lg bg-paper border border-line/40 text-[9px] font-medium text-ink flex items-center justify-between">
          <span>P0 · Core Auth Gate</span>
          <span className="font-mono text-[8px] text-oxide">#1</span>
        </div>
        <div
          className={`p-1.5 rounded-lg border transition-all duration-300 text-[9px] font-medium flex items-center justify-between ${
            active === 1
              ? "border-oxide bg-oxide/5 shadow-md -translate-y-0.5 text-oxide"
              : "border-line/40 bg-paper text-ink"
          }`}
        >
          <span>P1 · Token Refresh Hook</span>
          <span className="font-mono text-[8px]">#2</span>
        </div>
        <div
          className={`p-1.5 rounded-lg border transition-all duration-300 text-[9px] font-medium flex items-center justify-between ${
            active === 2
              ? "border-oxide bg-oxide/5 shadow-md -translate-y-0.5 text-oxide"
              : "border-line/40 bg-paper text-ink"
          }`}
        >
          <span>P2 · Telemetry Stream</span>
          <span className="font-mono text-[8px]">#3</span>
        </div>
      </div>
    </div>
  );
}

export function SwipeCardDeckPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const sweep = Math.sin(tick) * 36;
  const rot = (sweep / 36) * 12;
  const isRight = sweep > 10;
  const isLeft = sweep < -10;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative w-36 h-24 flex items-center justify-center">
        <div className="absolute w-32 h-20 rounded-xl border border-line/40 bg-surface/40 scale-90 translate-y-2" />
        <div
          className="absolute w-32 h-20 rounded-xl border-2 border-line bg-paper shadow-md p-2.5 flex flex-col justify-between"
          style={{ transform: `translateX(${sweep}px) rotate(${rot}deg)` }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-ink">Design Card</span>
            {isRight && (
              <span className="px-1 rounded border border-emerald-500 text-emerald-600 font-mono text-[7px] font-bold">
                LIKE
              </span>
            )}
            {isLeft && (
              <span className="px-1 rounded border border-rose-500 text-rose-600 font-mono text-[7px] font-bold">
                PASS
              </span>
            )}
          </div>
          <span className="text-[8px] text-graphite font-mono">Swipe interactive gesture</span>
        </div>
      </div>
    </div>
  );
}

export function ReorderableTabStripPreview() {
  const [order, setOrder] = React.useState(["Overview", "Metrics", "Settings"]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setOrder((o) => [o[1] ?? "Metrics", o[0] ?? "Overview", o[2] ?? "Settings"]);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[220px]">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface/60 border border-line/60">
          {order.map((tab, i) => (
            <div
              key={tab}
              className={`flex-1 py-1 px-2 rounded-lg text-center font-mono text-[9px] font-bold transition-all duration-300 ${
                i === 0
                  ? "bg-paper text-oxide shadow-xs border border-line/40"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <span className="font-mono text-[8px] text-graphite/70 mt-2 uppercase tracking-wider">
        Drag To Reorder Tabs
      </span>
    </div>
  );
}

export function MultiSliderEqualizerPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.05;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const bands = [60, 250, 1000, 4000, 16000];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[200px] flex items-end justify-between gap-2 h-20 px-2 py-2 rounded-xl bg-surface/40 border border-line/40">
        {bands.map((freq, i) => {
          const val = 20 + Math.sin(tick + i * 1.2) * 18 + 20;
          return (
            <div key={freq} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div className="w-2.5 h-full bg-line/25 rounded-full relative flex items-end">
                <div
                  className="w-full bg-oxide rounded-full transition-all duration-75"
                  style={{ height: `${val}%` }}
                />
              </div>
              <span className="font-mono text-[6px] text-graphite font-bold">
                {freq >= 1000 ? `${freq / 1000}k` : freq}
              </span>
            </div>
          );
        })}
      </div>
      <span className="font-mono text-[8px] text-oxide font-bold mt-2 uppercase">
        5-Band EQ Scrub
      </span>
    </div>
  );
}

export function PanZoomMinimapPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const x = 15 + Math.sin(tick) * 12;
  const y = 10 + Math.cos(tick * 0.8) * 8;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-44 h-24 rounded-xl border border-line bg-surface/40 overflow-hidden">
        {/* Canvas elements */}
        <div className="absolute top-3 left-4 w-12 h-6 rounded bg-line/40" />
        <div className="absolute top-12 left-16 w-16 h-8 rounded bg-line/30" />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-line/25" />

        {/* Viewport rect overlay */}
        <div
          className="absolute w-16 h-10 rounded border-2 border-oxide bg-oxide/10 shadow-sm"
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          <span className="absolute -top-3.5 left-0 font-mono text-[7px] text-oxide font-bold uppercase bg-paper px-1 rounded border border-oxide/30">
            VIEWPORT
          </span>
        </div>
      </div>
    </div>
  );
}

export function SpotlightFollowPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const x = 50 + Math.sin(tick) * 35;
  const y = 50 + Math.cos(tick * 0.7) * 30;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0e0f14] p-4 overflow-hidden rounded-lg">
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-75"
        style={{
          background: `radial-gradient(circle 55px at ${x}% ${y}%, rgba(220, 70, 50, 0.45), transparent 80%)`,
        }}
      />
      <div className="relative z-10 text-center">
        <div className="font-display text-sm font-bold text-white/90 tracking-wide">
          SPOTLIGHT BEAM
        </div>
        <div className="font-mono text-[8px] text-oxide mt-0.5 tracking-widest uppercase">
          Cursor Coordinates: {Math.round(x)}, {Math.round(y)}
        </div>
      </div>
    </div>
  );
}


// ─── UI-ELEMENTS: Bespoke visual previews for all 70 slugs ───────────────────

export function InfiniteSpiralCanvasPreview() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let a = 0, frame: number;
    const draw = () => {
      ctx.fillStyle = "rgba(13,14,18,0.12)";
      ctx.fillRect(0, 0, 260, 150);
      for (let i = 0; i < 3; i++) {
        const r = (a + i * 2.1) * 5;
        const x = 130 + r * Math.cos(a + i * 2.1);
        const y = 75 + r * 0.5 * Math.sin(a + i * 2.1);
        ctx.beginPath();
        ctx.arc(x, y, 2.5 - i * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(a * 30 + i * 120) % 360},80%,65%)`;
        ctx.fill();
      }
      a += 0.04;
      frame = requestAnimationFrame(draw);
    };
    ctx.fillStyle = "#0d0e12";
    ctx.fillRect(0, 0, 260, 150);
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} width={260} height={150} style={{ width: "100%", height: "100%", borderRadius: 8 }} />;
}

export function DepthCarousel3dPreview() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % 4), 900); return () => clearInterval(t); }, []);
  const colors = ["#4f46e5","#059669","#dc2626","#d97706"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none" style={{ perspective: 400 }}>
      <div className="relative w-36 h-20" style={{ transformStyle: "preserve-3d" }}>
        {colors.map((c, i) => {
          const off = (i - idx + 4) % 4;
          return <div key={i} style={{ position: "absolute", inset: 0, background: c, borderRadius: 10, transform: `translateZ(${off === 0 ? 20 : -20}px) translateX(${(off - 1.5) * 40}px) scale(${off === 0 ? 1 : 0.75})`, opacity: off === 0 ? 1 : 0.45, transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>Slide {i + 1}</span></div>;
        })}
      </div>
    </div>
  );
}

export function MorphSliderPathPreview() {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.04; setVal(50 + Math.sin(t) * 42); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const cx = val * 2.6;
  const cy = 75 - Math.abs(val - 50) * 0.8;
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <svg width="260" height="120" viewBox="0 0 260 120">
        <path d={`M 0 75 Q ${cx * 0.5} ${cy} ${cx} ${cy} T 260 75`} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={8} fill="#8b5cf6" style={{ filter: "drop-shadow(0 0 8px #8b5cf6)" }} />
        <rect x="0" y="73" width="260" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="0" y="73" width={cx} height="4" rx="2" fill="#8b5cf6" opacity="0.6" />
        <text x="130" y="110" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">{Math.round(val)}%</text>
      </svg>
    </div>
  );
}

export function DriftWallParallaxPreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let fr: number; let tick = 0; const loop = () => { tick += 0.02; setT(tick); fr = requestAnimationFrame(loop); }; fr = requestAnimationFrame(loop); return () => cancelAnimationFrame(fr); }, []);
  const layers = [[0.05, "#818cf8", 60], [0.12, "#f472b6", 36], [0.22, "#34d399", 20]];
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ background: "linear-gradient(135deg,#0f0f1a,#1a0f2e)" }}>
      {layers.map(([d, c, sz], li) => [0, 1, 2].map((_, pi) => (
        <div key={`${li}-${pi}`} style={{ position: "absolute", left: `${15 + pi * 30 + li * 8}%`, top: `${20 + li * 22 + pi * 10}%`, width: sz as number, height: sz as number, borderRadius: "50%", background: c as string, opacity: 0.5 - li * 0.1, transform: `translate(${Math.sin(t * (0.6 + li * 0.2) + pi) * (d as number) * 80}px, ${Math.cos(t * 0.5 + pi) * (d as number) * 50}px)` }} />
      )))}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 8, fontFamily: "monospace", whiteSpace: "nowrap" }}>PARALLAX DRIFT</div>
    </div>
  );
}

export function AccordionGallerySplitPreview() {
  const [open, setOpen] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setOpen(i => (i + 1) % 3), 1200); return () => clearInterval(t); }, []);
  const panels = [["#4f46e5","Design"], ["#059669","Build"], ["#dc2626","Ship"]];
  return (
    <div className="w-full h-full flex select-none bg-paper p-3 gap-1.5">
      {panels.map(([color, label], i) => (
        <div key={i} style={{ flex: i === open ? 3 : 1, background: color as string, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "flex 0.5s cubic-bezier(0.34,1.56,0.64,1)", overflow: "hidden" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 10, writingMode: i === open ? "initial" : "vertical-lr", transition: "all 0.4s", opacity: i === open ? 1 : 0.6 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function SpecularButtonLensPreview() {
  const [pos, setPos] = React.useState({ x: 30, y: 40 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.04; setPos({ x: 50 + Math.sin(t) * 35, y: 40 + Math.cos(t * 0.8) * 25 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none gap-3">
      {["#4f46e5","#059669","#dc2626"].map((c, i) => (
        <div key={i} style={{ position: "relative", width: 64, height: 32, borderRadius: 10, background: c, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${i === 0 ? pos.x : 50}% ${i === 0 ? pos.y : 35}%, rgba(255,255,255,0.4) 0%, transparent 60%)`, pointerEvents: "none" }} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 9 }}>{["PRIMARY","SECOND","DANGER"][i]}</span>
        </div>
      ))}
    </div>
  );
}

export function OptionWheel3dPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setAngle(a => a + 45), 700); return () => clearInterval(t); }, []);
  const opts = ["Design","Code","Ship","Test"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none" style={{ perspective: 300 }}>
      <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg)`, transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {opts.map((o, i) => (
          <div key={i} style={{ position: "absolute", width: 60, height: 28, top: -14, left: -30, borderRadius: 6, background: i === 0 ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.08)", border: `1px solid ${i === 0 ? "#8b5cf6" : "rgba(255,255,255,0.15)"}`, transform: `rotateY(${i * 90}deg) translateZ(60px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 9, fontWeight: 600 }}>{o}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CurvedInputFieldPreview() {
  const [focused, setFocused] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setFocused(f => (f + 1) % 3), 1000); return () => clearInterval(t); }, []);
  const phs = ["Search…", "Email…", "Message…"];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-2 p-4">
      {phs.map((ph, i) => (
        <div key={i} style={{ width: "100%", maxWidth: 210, height: 34, borderRadius: 17, border: `1.5px solid ${i === focused ? "#8b5cf6" : "rgba(255,255,255,0.12)"}`, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", paddingLeft: 14, transition: "border-color 0.35s", boxShadow: i === focused ? "0 0 0 3px rgba(139,92,246,0.15)" : "none" }}>
          <span style={{ color: i === focused ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "monospace" }}>{ph}</span>
          {i === focused && <div style={{ width: 1, height: 14, background: "#8b5cf6", marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
        </div>
      ))}
    </div>
  );
}

export function LineSidebarRailPreview() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 4), 800); return () => clearInterval(t); }, []);
  const icons = ["🏠","📊","🛒","⚙️"];
  return (
    <div className="w-full h-full flex bg-paper select-none p-3 gap-2">
      <div style={{ width: 36, display: "flex", flexDirection: "column", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: `${active * 40 + 4}px`, width: 3, height: 28, background: "#8b5cf6", borderRadius: "0 3px 3px 0", transition: "top 0.4s cubic-bezier(0.34,1.56,0.64,1)" }} />
        {icons.map((ic, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i === active ? "rgba(139,92,246,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{ic}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>{["Home","Analytics","Store","Settings"][active]}</span>
      </div>
    </div>
  );
}

export function AnimatedListStaggerPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 200); return () => clearInterval(t); }, []);
  const items = ["Notification", "Message", "Update", "Alert"];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none p-3 gap-1.5">
      {items.map((item, i) => (
        <div key={i} style={{ width: "100%", maxWidth: 200, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", paddingLeft: 10, transform: `translateX(${tick % (items.length * 3) === i * 3 ? -4 : 0}px)`, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", opacity: tick % (items.length * 3) < i * 3 ? 0.3 : 1 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: `hsl(${i * 80},70%,60%)`, marginRight: 8 }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function ScrollStackDeckPreview() {
  const [top, setTop] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTop(n => (n + 1) % 4), 1000); return () => clearInterval(t); }, []);
  const colors = ["#4f46e5","#7c3aed","#9333ea","#a855f7"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 160, height: 90 }}>
        {colors.map((c, i) => {
          const dist = (i - top + 4) % 4;
          return <div key={i} style={{ position: "absolute", left: "50%", transform: `translateX(-50%) translateY(${dist * -8}px) scale(${1 - dist * 0.05})`, width: `${100 - dist * 5}%`, height: 72, background: c, borderRadius: 12, zIndex: 4 - dist, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 10, opacity: dist === 0 ? 1 : 0 }}>Card {i + 1}</span></div>;
        })}
      </div>
    </div>
  );
}

export function BubbleMenuRadialPreview() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => setOpen(o => !o), 1200); return () => clearInterval(t); }, []);
  const items = ["🏠","📊","🎨","⚙️","💬"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <div style={{ position: "absolute", inset: "50%", width: 32, height: 32, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#8b5cf6", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px #8b5cf6" }}><span style={{ color: "#fff", fontSize: 14 }}>+</span></div>
        {items.map((ic, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const r = open ? 48 : 0;
          return <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`, width: 28, height: 28, borderRadius: "50%", background: `hsl(${i * 60 + 200},70%,50%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, opacity: open ? 1 : 0, transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", transitionDelay: `${i * 40}ms` }}>{ic}</div>;
        })}
      </div>
    </div>
  );
}

export function MagicBentoSpotlightPreview() {
  const [pos, setPos] = React.useState({ x: 0.5, y: 0.5 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.025; setPos({ x: 0.5 + Math.sin(t) * 0.4, y: 0.5 + Math.cos(t * 0.7) * 0.35 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const cells = [[2,1],[1,1],[1,2]];
  const colors = ["rgba(99,102,241,0.3)","rgba(236,72,153,0.25)","rgba(16,185,129,0.25)"];
  return (
    <div className="w-full h-full p-2 bg-paper select-none" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 4 }}>
      {cells.map(([c, r], i) => (
        <div key={i} style={{ gridColumn: `span ${c}`, gridRow: `span ${r}`, borderRadius: 10, background: colors[i], border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden", minHeight: 40 }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)` }} />
        </div>
      ))}
    </div>
  );
}

export function CircularGalleryCarouselPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setAngle(a => a + 40), 800); return () => clearInterval(t); }, []);
  const items = ["Ocean","Peak","Forest","Desert","Arctic"];
  const step = 360 / items.length;
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none" style={{ perspective: 400 }}>
      <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg)`, transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {items.map((item, i) => (
          <div key={i} style={{ position: "absolute", width: 70, height: 42, top: -21, left: -35, borderRadius: 8, background: `hsl(${i * 60},60%,25%)`, border: `1px solid hsl(${i * 60},60%,45%)`, transform: `rotateY(${i * step}deg) translateZ(80px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 8, fontWeight: 600 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReflectiveCardFoilPreview() {
  const [shine, setShine] = React.useState({ x: 50, y: 50 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.03; setShine({ x: 50 + Math.sin(t) * 45, y: 50 + Math.cos(t * 0.7) * 35 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-4">
      <div style={{ width: 160, height: 100, borderRadius: 14, background: "linear-gradient(135deg,#1a1a2e,#16213e)", border: "1px solid rgba(255,255,255,0.15)", position: "relative", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${shine.x * 1.8}deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2), rgba(236,72,153,0.15))`, mixBlendMode: "overlay" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700 }}>Holographic</div>
      </div>
    </div>
  );
}

export function CardNavExpandPreview() {
  const [open, setOpen] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setOpen(i => (i + 1) % 3), 1100); return () => clearInterval(t); }, []);
  const sections = [["📦","Products"],["🎨","Design"],["📈","Growth"]];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none p-3 gap-1">
      {sections.map(([icon, label], i) => (
        <div key={i} style={{ width: "100%", maxWidth: 200, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px" }}>
            <span style={{ fontSize: 12 }}>{icon}</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 600, flex: 1 }}>{label}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, transform: i === open ? "rotate(90deg)" : "none", transition: "transform 0.3s" }}>›</span>
          </div>
          <div style={{ maxHeight: i === open ? 40 : 0, overflow: "hidden", transition: "max-height 0.35s", padding: i === open ? "4px 10px 8px 30px" : "0 10px" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>Browse › New › Best</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StackCardsDragPreview() {
  const [deck, setDeck] = React.useState([0,1,2,3]);
  React.useEffect(() => { const t = setInterval(() => setDeck(d => [...d.slice(1), d[0] ?? 0]), 1000); return () => clearInterval(t); }, []);
  const colors = ["#4f46e5","#059669","#dc2626","#d97706"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 140, height: 90 }}>
        {[...deck].reverse().map((ci, ri) => {
          const si = deck.length - 1 - ri;
          return <div key={ci} style={{ position: "absolute", left: "50%", transform: `translateX(-50%) translateY(${si * -7}px) rotate(${(si - deck.length + 1) * 3}deg)`, width: 120, height: 80, borderRadius: 12, background: colors[ci], zIndex: si, boxShadow: "0 4px 16px rgba(0,0,0,0.3)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 10, opacity: si === deck.length - 1 ? 1 : 0 }}>Drag</span></div>;
        })}
      </div>
    </div>
  );
}

export function FluidGlassSurfacePreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.025; setPos({ x: 50 + Math.sin(t) * 35, y: 50 + Math.cos(t * 0.8) * 28 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" style={{ background: "linear-gradient(135deg,#0d1117,#161b22)" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.2) 0%, transparent 50%)` }} />
      <div style={{ padding: "16px 28px", borderRadius: 16, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,rgba(139,92,246,0.6),rgba(59,130,246,0.6))", margin: "0 auto 8px" }} />
        <div style={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: 10, textAlign: "center" }}>Glass Surface</div>
      </div>
    </div>
  );
}

export function PillNavFloatPreview() {
  const [active, setActive] = React.useState(1);
  React.useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 4), 900); return () => clearInterval(t); }, []);
  const items = ["🏠","📊","🎨","⚙️"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ display: "flex", gap: 4, padding: "6px 10px", borderRadius: 28, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
        {items.map((ic, i) => (
          <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: i === active ? "#8b5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: i === active ? "0 4px 16px rgba(139,92,246,0.5)" : "none" }}>{ic}</div>
        ))}
      </div>
    </div>
  );
}

export function TiltedCardPerspectivePreview() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.035; setTilt({ x: Math.sin(t) * 12, y: Math.cos(t * 0.8) * 8 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none" style={{ perspective: 500 }}>
      <div style={{ width: 150, height: 90, borderRadius: 14, background: "linear-gradient(135deg,#1e1b4b,#312e81)", border: "1px solid rgba(255,255,255,0.15)", transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: "transform 0.1s ease-out", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#818cf8,#a5b4fc)" }} />
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700 }}>3D Tilt Card</span>
      </div>
    </div>
  );
}

export function MasonryGridFluidPreview() {
  const cells = [{h:50,c:"#1e1b4b"},{h:34,c:"#1a2035"},{h:42,c:"#0f1d2e"},{h:30,c:"#1a0f20"},{h:60,c:"#14161f"},{h:38,c:"#1a1a2e"}];
  return (
    <div className="w-full h-full p-2 bg-paper select-none" style={{ columns: 3, gap: 4 }}>
      {cells.map((cell, i) => (
        <div key={i} style={{ breakInside: "avoid", marginBottom: 4, height: cell.h, background: cell.c, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }} />
      ))}
    </div>
  );
}

export function GlassSurfaceAcrylicPreview() {
  const [blur, setBlur] = React.useState(12);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.02; setBlur(12 + Math.sin(t) * 8); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden" style={{ background: "linear-gradient(135deg,#667eea,#764ba2,#f093fb)" }}>
      <div style={{ padding: "16px 24px", borderRadius: 14, background: `rgba(255,255,255,0.12)`, backdropFilter: `blur(${blur}px)`, border: "1px solid rgba(255,255,255,0.3)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>Acrylic Glass</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, marginTop: 2 }}>blur: {Math.round(blur)}px</div>
      </div>
    </div>
  );
}

export function ChromaGridFresnelPreview() {
  const [hov, setHov] = React.useState(5);
  React.useEffect(() => { const t = setInterval(() => setHov(h => (h + 1) % 16), 300); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full p-2 bg-paper select-none" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 3 }}>
      {Array.from({ length: 16 }, (_, i) => {
        const hue = (i * 22 + 180) % 360;
        return <div key={i} style={{ height: 26, borderRadius: 6, background: i === hov ? `hsl(${hue},80%,50%)` : `hsl(${hue},40%,15%)`, border: `1px solid hsl(${hue},60%,${i === hov ? 60 : 25}%)`, transition: "all 0.2s", boxShadow: i === hov ? `0 0 12px hsl(${hue},80%,50%)` : "none" }} />;
      })}
    </div>
  );
}

export function FolderTreeInteractivePreview() {
  const [open, setOpen] = React.useState(new Set(["src"]));
  React.useEffect(() => { const t = setInterval(() => setOpen(s => { const n = new Set(s); if (n.has("comp")) n.delete("comp"); else n.add("comp"); return n; }), 1200); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-3 gap-0.5 font-mono text-[9px]">
      {[["📁","src",0,true],["📂","components",1,open.has("src")],["📄","Button.tsx",2,open.has("src") && open.has("comp")],["📄","Nav.tsx",2,open.has("src") && open.has("comp")],["📂","pages",1,open.has("src")],].map(([ic, label, depth, vis], i) => (
        <div key={i} style={{ paddingLeft: (depth as number) * 14, opacity: vis ? 1 : 0, height: vis ? 20 : 0, overflow: "hidden", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.7)" }}>{ic} {label}</div>
      ))}
    </div>
  );
}

export function StaggeredMenuCascadePreview() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { let v = false; const t = setInterval(() => { v = !v; setVis(v); }, 1400); return () => clearInterval(t); }, []);
  const items = ["Home","About","Work","Contact","Blog"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-4 gap-1">
      {items.map((item, i) => (
        <div key={i} style={{ height: 24, display: "flex", alignItems: "center", paddingLeft: 10, borderRadius: 6, background: "rgba(255,255,255,0.03)", borderLeft: "2px solid rgba(139,92,246,0.5)", transform: `translateX(${vis ? 0 : -30}px)`, opacity: vis ? 1 : 0, transition: `all 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms`, color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{item}</div>
      ))}
    </div>
  );
}

export function LanyardCardSpringPreview() {
  const [tilt, setTilt] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.04; setTilt(Math.sin(t) * 14); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none">
      <div style={{ width: 2, height: 32, background: "linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.1))" }} />
      <div style={{ width: 110, padding: "12px 10px", borderRadius: 12, background: "linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.2))", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", transform: `perspective(400px) rotateY(${tilt}deg)`, transition: "transform 0.1s", textAlign: "center" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", margin: "0 auto 6px" }} />
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 9 }}>Alex Johnson</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 8 }}>Designer</div>
      </div>
    </div>
  );
}

export function ProfileCardHoloPreview() {
  const [shine, setShine] = React.useState({ x: 50, y: 50 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.03; setShine({ x: 50 + Math.sin(t) * 40, y: 50 + Math.cos(t * 0.7) * 32 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-3">
      <div style={{ width: 140, padding: "14px 10px 10px", borderRadius: 16, background: "linear-gradient(135deg,#0f0c29,#302b63)", border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.1) 0%, transparent 55%)` }} />
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#ec4899)", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>Morgan Ellis</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, marginTop: 2 }}>Engineer</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
          {["142","38k","99"].map((v,i) => <div key={i} style={{ textAlign: "center" }}><div style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>{v}</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8 }}>{["Posts","Likes","Rank"][i]}</div></div>)}
        </div>
      </div>
    </div>
  );
}

export function InteractiveDockMagnifyPreview() {
  const [hov, setHov] = React.useState(2);
  React.useEffect(() => { const t = setInterval(() => setHov(h => (h + 1) % 5), 600); return () => clearInterval(t); }, []);
  const icons = ["🏠","📊","🎨","💬","⚙️"];
  return (
    <div className="w-full h-full flex items-end justify-center pb-4 bg-paper select-none">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, padding: "6px 10px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
        {icons.map((ic, i) => {
          const dist = Math.abs(i - hov);
          const size = dist === 0 ? 44 : dist === 1 ? 36 : 28;
          return <div key={i} style={{ width: size, height: size, borderRadius: size * 0.22, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.55, transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>{ic}</div>;
        })}
      </div>
    </div>
  );
}

export function GooeyNavLiquidPreview() {
  const [active, setActive] = React.useState(1);
  React.useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 4), 900); return () => clearInterval(t); }, []);
  const items = ["Home","Work","About","Blog"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ display: "flex", gap: 2, padding: "4px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: "6px 12px", borderRadius: 16, background: i === active ? "#8b5cf6" : "transparent", color: i === active ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 600, transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: i === active ? "0 0 12px rgba(139,92,246,0.5)" : "none" }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export function PixelCardRetroPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 500); return () => clearInterval(t); }, []);
  const cards = [["HERO","🗡️","#0ff"],[" MAGE","🔮","#f0f"],["ROGUE","🗄️","#ff0"]];
  return (
    <div className="w-full h-full flex items-center justify-center bg-black select-none gap-2 p-3">
      {cards.map(([label, icon, color], i) => (
        <div key={i} style={{ width: 58, padding: "6px 4px", background: "#000", border: `2px solid ${color}`, fontFamily: "monospace", textAlign: "center", boxShadow: `0 0 ${tick % 2 === 0 && i === 0 ? 14 : 6}px ${color}`, transition: "box-shadow 0.4s" }}>
          <div style={{ fontSize: 18 }}>{icon}</div>
          <div style={{ color: color as string, fontSize: 8, fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>{label}</div>
          <div style={{ width: "100%", height: 1, background: color, margin: "4px 0", opacity: 0.5 }} />
          <div style={{ color: "#fff", fontSize: 9 }}>{(1000 + i * 2320).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

export function KineticCarouselSwipePreview() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % 4), 900); return () => clearInterval(t); }, []);
  const colors = ["#4f46e5","#059669","#dc2626","#d97706"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none overflow-hidden">
      <div style={{ position: "relative", width: 180, height: 100, overflow: "hidden", borderRadius: 12 }}>
        <div style={{ display: "flex", transform: `translateX(${-idx * 180}px)`, transition: "transform 0.45s cubic-bezier(0.25,1,0.5,1)", width: `${4 * 180}px`, height: "100%" }}>
          {colors.map((c, i) => (
            <div key={i} style={{ width: 180, height: "100%", flexShrink: 0, background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>Slide {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpotlightCardInteractivePreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.03; setPos({ x: 50 + Math.sin(t) * 40, y: 50 + Math.cos(t * 0.8) * 35 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-4">
      <div style={{ width: 180, height: 110, borderRadius: 16, background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.35) 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", inset: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: "60%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ width: "80%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: "40%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
        </div>
      </div>
    </div>
  );
}

export function BorderGlowCardPulsePreview() {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.03; setPhase(t); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const hue = (phase * 30) % 360;
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-4">
      <div style={{ width: 160, height: 96, borderRadius: 16, background: "#0f0f18", border: `2px solid hsl(${hue},80%,60%)`, boxShadow: `0 0 20px hsl(${hue},80%,50%), inset 0 0 20px hsl(${hue},60%,20%)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: `hsl(${hue},80%,60%)`, boxShadow: `0 0 16px hsl(${hue},80%,60%)` }} />
        <span style={{ color: `hsl(${hue},80%,80%)`, fontSize: 10, fontWeight: 700 }}>Glow Border</span>
      </div>
    </div>
  );
}

export function FlyingPostersGalleryPreview() {
  const [off, setOff] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setOff(o => (o + 1) % 80), 30); return () => clearInterval(t); }, []);
  const posters = [["#1a0033","#f0f"],["#001a33","#0ff"],["#330d00","#f80"],["#002b1a","#0f9"]];
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ background: "#000" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", height: "100%", padding: "0 12px", transform: `translateX(${-off}px)` }}>
        {[...posters,...posters,...posters].map(([bg, ac], i) => (
          <div key={i} style={{ flexShrink: 0, width: 70, height: 90, borderRadius: 8, background: bg as string, border: `1px solid ${ac}44`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: `0 0 12px ${ac}22` }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: ac as string, opacity: 0.8 }} />
            <span style={{ color: ac as string, fontSize: 7, fontWeight: 700 }}>POSTER {(i % 4) + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSwapDeckPreview() {
  const [deck, setDeck] = React.useState([0,1,2,3]);
  React.useEffect(() => { const t = setInterval(() => setDeck(d => [...d.slice(1), d[0] ?? 0]), 1000); return () => clearInterval(t); }, []);
  const colors = ["#4f46e5","#059669","#dc2626","#d97706"];
  const labels = ["Design","Build","Test","Ship"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 130, height: 80 }}>
        {[...deck].reverse().map((ci, ri) => {
          const si = deck.length - 1 - ri;
          return <div key={ci} style={{ position: "absolute", left: "50%", transform: `translateX(-50%) translateY(${si * -6}px) rotate(${(si - deck.length + 1) * 2.5}deg)`, width: 110, height: 70, borderRadius: 12, background: colors[ci], zIndex: si, transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 10, opacity: si === deck.length - 1 ? 1 : 0 }}>{labels[ci]}</span></div>;
        })}
      </div>
    </div>
  );
}

export function GlassIconsIridescentPreview() {
  const [hov, setHov] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setHov(h => (h + 1) % 6), 500); return () => clearInterval(t); }, []);
  const icons = [["⚡",45],["🔒",220],["🌐",160],["✨",280],["📊",190],["🎯",0]];
  return (
    <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center bg-paper select-none p-3">
      {icons.map(([ic, hue], i) => (
        <div key={i} style={{ width: 44, height: 44, borderRadius: 12, background: i === hov ? `hsl(${hue},70%,25%)` : "rgba(255,255,255,0.05)", border: `1px solid hsl(${hue},60%,${i === hov ? 50 : 20}%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, transition: "all 0.3s", transform: i === hov ? "scale(1.1)" : "scale(1)", boxShadow: i === hov ? `0 8px 20px hsl(${hue},70%,25%)` : "none" }}>
          <span style={{ fontSize: 16 }}>{ic}</span>
          <span style={{ fontSize: 7, color: i === hov ? `hsl(${hue},90%,80%)` : "rgba(255,255,255,0.3)" }}>★</span>
        </div>
      ))}
    </div>
  );
}

export function DecayCardFrictionPreview() {
  const [vel, setVel] = React.useState({ x: 0, y: 0 });
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    let vx = 3, vy = 2, px = 0, py = 0;
    let f: number;
    const loop = () => {
      vx *= 0.95; vy *= 0.95;
      px += vx; py += vy;
      if (Math.abs(vx) < 0.1) { vx = (Math.random() - 0.5) * 6; vy = (Math.random() - 0.5) * 4; }
      setPos({ x: Math.max(-30, Math.min(30, px % 60 - 30)), y: Math.max(-20, Math.min(20, py % 40 - 20)) });
      f = requestAnimationFrame(loop);
    };
    f = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(f);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ width: 140, height: 88, borderRadius: 14, background: "linear-gradient(135deg,#1e1b4b,#312e81)", border: "1px solid rgba(255,255,255,0.15)", transform: `translate(${pos.x}px,${pos.y}px)`, boxShadow: "0 10px 40px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#818cf8" }} />
        <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>Friction Decay</span>
      </div>
    </div>
  );
}

export function FlowingMenuHoverPreview() {
  const [hov, setHov] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setHov(h => (h + 1) % 5), 700); return () => clearInterval(t); }, []);
  const items = ["Home","Work","About","Blog","Contact"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-4 gap-0.5">
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 8, background: i === hov ? "rgba(139,92,246,0.1)" : "transparent", transition: "all 0.3s" }}>
          <div style={{ width: 16, height: 2, background: "#8b5cf6", transform: i === hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
          <span style={{ color: i === hov ? "#e9d5ff" : "rgba(255,255,255,0.5)", fontWeight: i === hov ? 700 : 400, fontSize: 10, transition: "color 0.3s" }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function ElasticSliderReboundPreview() {
  const [vals, setVals] = React.useState([30,65,80]);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.02; setVals([50+Math.sin(t)*38, 50+Math.sin(t+2)*40, 50+Math.sin(t+4)*35]); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const colors = ["#8b5cf6","#3b82f6","#10b981"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-4 gap-3">
      {["Vol","Brt","Spd"].map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, width: 22 }}>{label}</span>
          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${vals[i]}%`, background: colors[i], borderRadius: 2, transition: "width 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
            <div style={{ position: "absolute", top: "50%", left: `${vals[i]}%`, transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: colors[i], border: "2px solid #fff", transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
          </div>
          <span style={{ color: colors[i], fontSize: 9, fontFamily: "monospace", width: 22 }}>{Math.round(vals[i] ?? 0)}</span>
        </div>
      ))}
    </div>
  );
}

export function RollingCounterDigitsPreview() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setCount(c => c + 1), 600); return () => clearInterval(t); }, []);
  const digits = String(count).padStart(5, "0").split("");
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ display: "flex", gap: 4 }}>
        {digits.map((d, i) => (
          <div key={i} style={{ width: 28, height: 40, borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", transform: `translateY(${(parseInt(d) - 4.5) * 12}%)`, transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
              {Array.from({ length: 10 }, (_, n) => <div key={n} style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: n === parseInt(d) ? "#8b5cf6" : "rgba(255,255,255,0.2)", fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>{n}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteMenuMarqueePreview() {
  const [off, setOff] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setOff(o => (o + 0.5) % 120), 20); return () => clearInterval(t); }, []);
  const items = ["Design","Motion","Glass","Spring","3D","AI","Canvas","Kinetic"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none gap-2 overflow-hidden">
      {[1,-1].map((dir, row) => (
        <div key={row} style={{ display: "flex", gap: 8, transform: `translateX(${dir > 0 ? -off : off - 60}px)`, whiteSpace: "nowrap" }}>
          {[...items,...items,...items].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: 9 }}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StepperControlTactilePreview() {
  const [vals, setVals] = React.useState([3,7,2]);
  React.useEffect(() => { const t = setInterval(() => setVals(v => v.map((x, i) => i === (Math.floor(Date.now()/1000) % 3) ? (x < 10 ? x + 1 : 1) : x)), 600); return () => clearInterval(t); }, []);
  const labels = ["Qty","Size","Copies"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-3 gap-2">
      {labels.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ flex: 1, color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>−</div>
            <span style={{ width: 24, textAlign: "center", color: "#8b5cf6", fontFamily: "monospace", fontWeight: 700, fontSize: 13, transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>{vals[i]}</span>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", fontSize: 14 }}>+</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BounceCardsStackPreview() {
  const [bounce, setBounce] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.06; setBounce(Math.abs(Math.sin(t)) * -12); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const cards = [["#4f46e5",0],["#7c3aed",-6],["#9333ea",-12]];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 140, height: 100 }}>
        {cards.map(([color, base], i) => (
          <div key={i} style={{ position: "absolute", left: "50%", top: 0, transform: `translateX(-50%) translateY(${(base as number) + (i === 0 ? bounce : 0)}px)`, width: `${120 - i * 12}%`, height: 72, background: color as string, borderRadius: 14, zIndex: 3 - i, transition: "transform 0.1s ease-out", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i === 0 && <span style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>Card Stack</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BranchedMenuTreePreview() {
  const [expanded, setExpanded] = React.useState(true);
  React.useEffect(() => { const t = setInterval(() => setExpanded(e => !e), 1300); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-3 font-mono text-[9px]">
      <div style={{ color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 4 }}><span style={{ color: "rgba(255,255,255,0.3)", transition: "transform 0.3s", display: "inline-block", transform: expanded ? "rotate(90deg)" : "none" }}>▶</span> 📁 src</div>
      <div style={{ maxHeight: expanded ? 80 : 0, overflow: "hidden", transition: "max-height 0.4s", paddingLeft: 16 }}>
        {[["📂 components"],["📄 Button.tsx",8],["📄 Nav.tsx",8],["📂 pages"]].map(([label, pl], i) => (
          <div key={i} style={{ paddingLeft: pl ?? 0, color: "rgba(255,255,255,0.6)", height: 18, display: "flex", alignItems: "center" }}>{label}</div>
        ))}
      </div>
    </div>
  );
}

export function FolderFloatHoverPreview() {
  const [hov, setHov] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setHov(h => (h + 1) % 4), 700); return () => clearInterval(t); }, []);
  const folders = [["Assets","#f59e0b"],["Comp","#8b5cf6"],["Design","#3b82f6"],["Export","#10b981"]];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none gap-3 p-3">
      {folders.map(([name, color], i) => (
        <div key={i} style={{ textAlign: "center", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: i === hov ? "translateY(-8px) scale(1.08)" : "none" }}>
          <div style={{ position: "relative", height: 44, width: 52 }}>
            <div style={{ position: "absolute", top: 0, left: 6, right: 0, height: 8, background: color as string, borderRadius: "6px 6px 0 0", opacity: 0.8 }} />
            <div style={{ position: "absolute", top: 6, left: 0, right: 0, bottom: 0, background: color as string, borderRadius: "0 6px 6px 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 8, fontWeight: 700 }}>files</span>
            </div>
          </div>
          <div style={{ color: i === hov ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 8, marginTop: 4, transition: "color 0.2s" }}>{name}</div>
        </div>
      ))}
    </div>
  );
}

export function RefineFrameSliderPreview() {
  const [split, setSplit] = React.useState(50);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.02; setSplit(50 + Math.sin(t) * 38); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-3">
      <div style={{ width: 200, height: 110, borderRadius: 12, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "#1a1a2e" }} />
        <div style={{ position: "absolute", inset: 0, left: `${split}%`, background: "#2d1b4e" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${split}%`, width: 2, background: "#8b5cf6", boxShadow: "0 0 12px #8b5cf6" }} />
        <div style={{ position: "absolute", top: "50%", left: `${split}%`, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: "50%", background: "#8b5cf6", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8 }}>⇄</div>
        <div style={{ position: "absolute", top: 8, left: 8, color: "rgba(255,255,255,0.5)", fontSize: 8 }}>Before</div>
        <div style={{ position: "absolute", top: 8, right: 8, color: "rgba(255,255,255,0.5)", fontSize: 8 }}>After</div>
      </div>
    </div>
  );
}

export function ThoughtLineCanvasPreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let tick = 0; let f: number; const loop = () => { tick += 0.025; setT(tick); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const nodes = [{x:50,y:70},{x:120,y:40},{x:190,y:80},{x:100,y:110},{x:160,y:50}];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <svg width="240" height="130" viewBox="0 0 240 130">
        {nodes.map((n, i) => nodes.slice(i+1).map((m, j) => Math.hypot(n.x-m.x,n.y-m.y) < 100 && (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={`rgba(139,92,246,${0.1 + Math.sin(t+i)*0.1})`} strokeWidth="1" />
        )))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={4 + Math.sin(t + i * 1.2) * 2} fill="rgba(139,92,246,0.6)" />
            <circle cx={n.x} cy={n.y} r={8 + Math.sin(t + i * 1.2) * 3} fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function VoicePillWaveformPreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let tick = 0; let f: number; const loop = () => { tick += 0.06; setT(tick); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const bars = Array.from({ length: 20 }, (_, i) => 10 + Math.abs(Math.sin(t + i * 0.4)) * 35);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 30, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444", animation: "pulse 1s infinite" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 2, height: 36 }}>
          {bars.map((h, i) => <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: `hsl(${220 + i * 4},70%,65%)`, transition: "height 0.08s" }} />)}
        </div>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, fontFamily: "monospace" }}>0:14</span>
      </div>
    </div>
  );
}

export function SloshGaugeFluidPreview() {
  const [phase, setPhase] = React.useState(0);
  const [level] = React.useState(65);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.04; setPhase(t); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const fillY = 150 - (level / 100) * 130;
  const slosh = Math.sin(phase) * 6;
  const wave = `M 10 ${fillY + slosh} Q 50 ${fillY - slosh * 2} 90 ${fillY + slosh} Q 130 ${fillY - slosh * 2} 150 ${fillY + slosh} L 150 160 L 10 160 Z`;
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <svg width="160" height="170" style={{ filter: "drop-shadow(0 0 12px rgba(59,130,246,0.4))" }}>
        <rect x="10" y="10" width="140" height="150" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <clipPath id="gc"><rect x="10" y="10" width="140" height="150" rx="12" /></clipPath>
        <path d={wave} fill="rgba(59,130,246,0.65)" clipPath="url(#gc)" />
        <text x="80" y="88" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">{level}%</text>
      </svg>
    </div>
  );
}

export function PromptBarActionPreview() {
  const [focus, setFocus] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => setFocus(f => !f), 1200); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-4">
      <div style={{ width: "100%", maxWidth: 240 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {["📎","🔍","🌐"].map((ic, i) => <div key={i} style={{ padding: "3px 8px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}><span>{ic}</span><span style={{ color: "rgba(255,255,255,0.5)", fontSize: 8 }}>{["File","Search","Web"][i]}</span></div>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${focus ? "#8b5cf6" : "rgba(255,255,255,0.1)"}`, transition: "border-color 0.3s, box-shadow 0.3s", boxShadow: focus ? "0 0 0 3px rgba(139,92,246,0.15)" : "none" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, flex: 1 }}>Ask anything…</span>
          <div style={{ width: 22, height: 22, borderRadius: 8, background: focus ? "#8b5cf6" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
            <span style={{ fontSize: 10 }}>↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SwipeToastDismissPreview() {
  const [off, setOff] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.02; setOff(Math.sin(t) * 20); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-2 p-4">
      {["Success ✓","Warning ⚠","Info ℹ"].map((msg, i) => (
        <div key={i} style={{ width: "100%", maxWidth: 220, padding: "8px 12px", borderRadius: 10, background: ["rgba(16,185,129,0.15)","rgba(245,158,11,0.15)","rgba(59,130,246,0.15)"][i], border: `1px solid ${["rgba(16,185,129,0.4)","rgba(245,158,11,0.4)","rgba(59,130,246,0.4)"][i]}`, display: "flex", justifyContent: "space-between", alignItems: "center", transform: `translateX(${i === 1 ? off : 0}px)`, transition: "transform 0.05s" }}>
          <span style={{ color: "#fff", fontSize: 9, fontWeight: 600 }}>{msg}</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>×</span>
        </div>
      ))}
    </div>
  );
}

export function BellToggleRingPreview() {
  const [on, setOn] = React.useState(false);
  const [ringing, setRinging] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => { setOn(o => !o); setRinging(true); setTimeout(() => setRinging(false), 600); }, 1400); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-3">
      <div style={{ position: "relative", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 36, display: "block", animation: ringing ? "bellRing 0.5s cubic-bezier(0.16,1,0.3,1)" : "none", filter: on ? "drop-shadow(0 0 8px #ba442c)" : "none", color: on ? "#ba442c" : "rgba(255,255,255,0.3)", transition: "color 0.3s, filter 0.3s" }}>🔔</span>
        {on && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, background: "#ba442c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>3</span>}
      </div>
      <span style={{ color: on ? "#ba442c" : "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "monospace", fontWeight: 700, transition: "color 0.3s" }}>{on ? "ON" : "OFF"}</span>
      <style>{`@keyframes bellRing { 0%{transform:rotate(0)} 20%{transform:rotate(18deg)} 40%{transform:rotate(-14deg)} 60%{transform:rotate(9deg)} 80%{transform:rotate(-5deg)} 100%{transform:rotate(0)} }`}</style>
    </div>
  );
}

export function CallChipPulsePreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let tick = 0; let f: number; const loop = () => { tick += 0.04; setT(tick); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 24, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.35)" }}>
        <div style={{ position: "relative", width: 28, height: 28 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(16,185,129,0.3)", transform: `scale(${1 + Math.abs(Math.sin(t)) * 0.6})`, opacity: 1 - Math.abs(Math.sin(t)) * 0.8 }} />
          <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10 }}>📞</span>
          </div>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>Active Call</div>
          <div style={{ color: "#10b981", fontSize: 9, fontFamily: "monospace" }}>0:4{Math.floor(t) % 60 < 10 ? "0" : ""}{Math.floor(t) % 60}</div>
        </div>
      </div>
    </div>
  );
}

export function StatusMarkBadgePreview() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % 5), 800); return () => clearInterval(t); }, []);
  const statuses = [["Active","#10b981","●"],["Pending","#f59e0b","◼"],["Offline","#6b7280","—"],["Error","#ef4444","✕"],["Draft","#8b5cf6","◆"]];
  const [label, color, icon] = statuses[idx] ?? ["Active", "#10b981", "●"];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-3">
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33` }}>
        <span style={{ color: color as string, fontSize: 12, fontWeight: 700, transition: "color 0.3s" }}>{icon}</span>
        <span style={{ color: "#fff", fontSize: 11 }}>System Status</span>
        <span style={{ padding: "2px 8px", borderRadius: 12, background: `${color}22`, color: color as string, fontSize: 9, fontWeight: 700, border: `1px solid ${color}44`, transition: "all 0.3s" }}>{label}</span>
      </div>
    </div>
  );
}

export function GlideSelectSliderPreview() {
  const [active, setActive] = React.useState(1);
  React.useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 3), 900); return () => clearInterval(t); }, []);
  const opts = ["Small","Medium","Large"];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 3, gap: 0 }}>
        <div style={{ position: "absolute", top: 3, left: `calc(${active * 33.33}% + 3px)`, width: "calc(33.33% - 3px)", height: "calc(100% - 6px)", background: "#8b5cf6", borderRadius: 9, transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 2px 12px rgba(139,92,246,0.4)" }} />
        {opts.map((o, i) => (
          <div key={i} style={{ position: "relative", zIndex: 1, padding: "6px 16px", color: i === active ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: i === active ? 700 : 400, transition: "color 0.3s" }}>{o}</div>
        ))}
      </div>
    </div>
  );
}

export function SwipeRowActionsPreview() {
  const [off, setOff] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.025; setOff(Math.sin(t) * 30 - 10); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const rows = ["Design sprint","Code review","Ship feature"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-3 gap-1.5">
      {rows.map((row, i) => (
        <div key={i} style={{ position: "relative", height: 32, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: 60, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 10 }}>🗑</span>
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 10, transform: `translateX(${i === 1 ? off : 0}px)`, transition: "transform 0.05s" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{row}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function JellyRadioSwitchPreview() {
  const [sel, setSel] = React.useState(0);
  const [squish, setSquish] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => { setSel(s => (s + 1) % 3); setSquish(true); setTimeout(() => setSquish(false), 300); }, 1000); return () => clearInterval(t); }, []);
  const opts = ["Option A","Option B","Option C"];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-4 gap-2">
      {opts.map((opt, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${i === sel ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.3s", transform: i === sel && squish ? "scale(0.8) scaleX(1.3)" : "scale(1)", transitionProperty: "transform, border-color" }}>
            {i === sel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b5cf6", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />}
          </div>
          <span style={{ color: i === sel ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: i === sel ? 600 : 400, transition: "color 0.3s" }}>{opt}</span>
        </div>
      ))}
    </div>
  );
}

export function CometDialGaugePreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.025; setAngle(t); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const cx = 80, cy = 80, r = 56;
  const x = cx + r * Math.cos(angle - Math.PI / 2);
  const y = cy + r * Math.sin(angle - Math.PI / 2);
  const trail = Array.from({ length: 12 }, (_, i) => {
    const a = angle - (i + 1) * 0.15 - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), op: 1 - i / 12 };
  });
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#8b5cf6" strokeWidth="8" strokeDasharray={`${((angle % (Math.PI * 2)) / (Math.PI * 2)) * (2 * Math.PI * r)} ${2 * Math.PI * r}`} strokeLinecap="round" style={{ transition: "none" }} />
        {trail.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4 - i * 0.2} fill="#8b5cf6" opacity={p.op * 0.6} />)}
        <circle cx={x} cy={y} r={6} fill="#c4b5fd" style={{ filter: "drop-shadow(0 0 8px #8b5cf6)" }} />
        <text x={cx} y={cy + 6} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">{Math.round((angle % (Math.PI * 2)) / (Math.PI * 2) * 100)}%</text>
      </svg>
    </div>
  );
}

export function WakeSliderDragPreview() {
  const [val, setVal] = React.useState(50);
  const [wakes, setWakes] = React.useState<number[]>([]);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.03; const v = 50 + Math.sin(t) * 42; setVal(v); setWakes(w => [...w.slice(-5), v]); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-2 p-4">
      <div style={{ width: "100%", maxWidth: 220, height: 48, position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, height: 4, width: `${val}%`, background: "#8b5cf6", borderRadius: 2, transform: "translateY(-50%)" }} />
        {wakes.map((w, i) => <div key={i} style={{ position: "absolute", top: "50%", left: `${w}%`, transform: "translate(-50%,-50%)", width: 6 + (wakes.length - i) * 5, height: 6 + (wakes.length - i) * 5, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.35)", opacity: (i / wakes.length) * 0.5 }} />)}
        <div style={{ position: "absolute", top: "50%", left: `${val}%`, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: "50%", background: "#8b5cf6", border: "2px solid #fff", boxShadow: "0 0 12px #8b5cf6" }} />
      </div>
      <span style={{ color: "#8b5cf6", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>{Math.round(val)}</span>
    </div>
  );
}

export function CodeSlotsRevealPreview() {
  const [filled, setFilled] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setFilled(f => f < 6 ? f + 1 : 0), 500); return () => clearInterval(t); }, []);
  const code = ["3","7","●","2","9","1"];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-3">
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "monospace" }}>VERIFICATION CODE</span>
      <div style={{ display: "flex", gap: 6 }}>
        {code.map((c, i) => (
          <div key={i} style={{ width: 32, height: 40, borderRadius: 8, border: `2px solid ${i < filled ? "#8b5cf6" : "rgba(255,255,255,0.12)"}`, background: i < filled ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontWeight: 700, fontSize: 16, color: i < filled ? "#fff" : "transparent", transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)", transform: i === filled - 1 ? "scale(1.08)" : "scale(1)" }}>
            {i < filled ? (i < filled - 1 ? "●" : c) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DodgeFieldPointerPreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.04; setPos({ x: 50 + Math.sin(t * 1.3) * 35, y: 50 + Math.cos(t * 0.9) * 28 }); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="relative w-full h-full bg-paper select-none overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 8, fontFamily: "monospace", whiteSpace: "nowrap" }}>cursor-fleeing button</div>
      <div style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)", padding: "7px 14px", borderRadius: 20, background: "#8b5cf6", border: "none", color: "#fff", fontWeight: 700, fontSize: 10, boxShadow: "0 0 16px #8b5cf6", transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1), top 0.4s cubic-bezier(0.34,1.56,0.64,1)", whiteSpace: "nowrap" }}>
        Catch me!
      </div>
    </div>
  );
}

export function LatticeLoaderOrbitPreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let tick = 0; let f: number; const loop = () => { tick += 0.04; setT(tick); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div style={{ position: "absolute", inset: "50%", width: 12, height: 12, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 16px #8b5cf6" }} />
        {[0,1,2].map(ri => {
          const r = 16 + ri * 14;
          const speed = 1 + ri * 0.4;
          const bx = 40 + r * Math.cos(t * speed);
          const by = 40 + r * Math.sin(t * speed);
          return (
            <React.Fragment key={ri}>
              <div style={{ position: "absolute", left: 40 - r, top: 40 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.2)" }} />
              <div style={{ position: "absolute", left: bx - 4, top: by - 4, width: 8 - ri * 1.5, height: 8 - ri * 1.5, borderRadius: "50%", background: `hsl(${260 + ri * 30},70%,70%)` }} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function ScrubFieldTimelinePreview() {
  const [pos, setPos] = React.useState(0);
  React.useEffect(() => { let t = 0; let f: number; const loop = () => { t += 0.02; setPos(50 + Math.sin(t) * 42); f = requestAnimationFrame(loop); }; f = requestAnimationFrame(loop); return () => cancelAnimationFrame(f); }, []);
  const bars = [20,45,70,35,80,95,60,40,75,90,50,65,30,85,40,55,70,38,82,48];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-3 p-4">
      <div style={{ width: "100%", maxWidth: 220, height: 44, display: "flex", alignItems: "flex-end", gap: 2, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "4px 6px", position: "relative", overflow: "hidden" }}>
        {bars.map((h, i) => <div key={i} style={{ flex: 1, borderRadius: 2, background: (i / bars.length * 100) < pos ? "#8b5cf6" : "rgba(255,255,255,0.15)", height: `${h}%`, transition: "background 0.1s" }} />)}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 9, fontFamily: "monospace" }}>
        <span>0:00</span>
        <div style={{ flex: 1, width: 120, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.1)", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pos}%`, background: "#8b5cf6", borderRadius: 2 }} />
        </div>
        <span>3:45</span>
      </div>
    </div>
  );
}

export function WarmTooltipFloatPreview() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => setVis(v => !v), 1200); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: `translateX(-50%) ${vis ? "translateY(-8px) scale(1)" : "translateY(0) scale(0.85)"}`, whiteSpace: "nowrap", background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", color: "#fff", fontSize: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", pointerEvents: "none" }}>
          Tooltip with spring entrance
          <div style={{ position: "absolute", bottom: -5, left: "50%", width: 8, height: 8, background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.15)", borderTop: "none", borderLeft: "none", transform: `translateX(-50%) rotate(45deg)` }} />
        </div>
        <div style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 11, fontWeight: 600 }}>Hover me</div>
      </div>
    </div>
  );
}

export function SlideCommitSliderPreview() {
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let p = 0, dir = 1, f: number;
    const loop = () => {
      p += dir * 0.8;
      if (p >= 100) { dir = 0; setDone(true); setTimeout(() => { dir = -2; setDone(false); }, 800); }
      if (p <= 0) { dir = 1; p = 0; }
      setProgress(Math.max(0, Math.min(100, p)));
      f = requestAnimationFrame(loop);
    };
    f = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(f);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none p-4">
      <div style={{ width: "100%", maxWidth: 220, height: 40, borderRadius: 20, background: done ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)", border: `1px solid ${done ? "#10b981" : "rgba(255,255,255,0.1)"}`, position: "relative", overflow: "hidden", transition: "all 0.4s" }}>
        <div style={{ position: "absolute", inset: 0, background: done ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.1)", width: `${progress}%`, borderRadius: 20, transition: "width 0.05s" }} />
        <div style={{ position: "absolute", top: "50%", left: `${progress}%`, transform: "translate(-50%,-50%)", width: 32, height: 32, borderRadius: 16, background: done ? "#10b981" : "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${done ? "#10b981" : "#8b5cf6"}`, transition: "left 0.05s, background 0.4s" }}>
          <span style={{ fontSize: 14 }}>{done ? "✓" : "›"}</span>
        </div>
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "rgba(255,255,255,0.4)", fontSize: 9, pointerEvents: "none" }}>{done ? "Done!" : "Slide to confirm"}</span>
      </div>
    </div>
  );
}

export function RubberSegmentSwitchPreview() {
  const [active, setActive] = React.useState(1);
  const [squish, setSquish] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => { setActive(a => (a + 1) % 3); setSquish(true); setTimeout(() => setSquish(false), 200); }, 1100); return () => clearInterval(t); }, []);
  const segs = [["☀️","Light"],["⚡","Auto"],["🌙","Dark"]];
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative", display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", top: 3, left: `${active * 33.33 + 0.5}%`, width: "32%", height: "calc(100% - 6px)", background: "rgba(139,92,246,0.8)", borderRadius: 10, transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: squish ? "scaleY(0.88)" : "scaleY(1)", boxShadow: "0 4px 16px rgba(139,92,246,0.3)" }} />
        {segs.map(([ic, label], i) => (
          <div key={i} style={{ position: "relative", zIndex: 1, padding: "6px 14px", color: i === active ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: i === active ? 700 : 400, fontSize: 10, display: "flex", alignItems: "center", gap: 4, transition: "color 0.3s" }}>{ic} {label}</div>
        ))}
      </div>
    </div>
  );
}

export function PulseHeartMicroPreview() {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(142);
  const [particles, setParticles] = React.useState<{id:number;x:number;y:number;c:string}[]>([]);
  React.useEffect(() => { const t = setInterval(() => { const nl = !liked; setLiked(nl); setCount(c => nl ? c + 1 : c - 1); if (nl) { setParticles(Array.from({length:8},(_,i)=>({id:Date.now()+i,x:Math.cos(i/8*Math.PI*2)*28,y:Math.sin(i/8*Math.PI*2)*28,c:(["#f43f5e","#fb7185","#fda4af"][i%3]) ?? "#f43f5e"})));  setTimeout(() => setParticles([]), 600); } }, 1200); return () => clearInterval(t); }, [liked]);
  return (
    <div className="w-full h-full flex items-center justify-center bg-paper select-none">
      <div style={{ position: "relative" }}>
        {particles.map(p => <div key={p.id} style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, borderRadius: "50%", background: p.c, transform: `translate(calc(-50% + ${p.x}px),calc(-50% + ${p.y}px))`, opacity: 0, animation: "pmBurst 0.6s ease-out forwards" }} />)}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 24, background: liked ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${liked ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.1)"}`, transition: "all 0.3s" }}>
          <span style={{ fontSize: 20, transform: liked ? "scale(1.2)" : "scale(1)", display: "inline-block", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", filter: liked ? "drop-shadow(0 0 6px #f43f5e)" : "none" }}>❤️</span>
          <span style={{ color: liked ? "#f43f5e" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 13, fontFamily: "monospace", transition: "color 0.3s" }}>{count}</span>
        </div>
      </div>
      <style>{`@keyframes pmBurst { 0%{opacity:1;transform:translate(-50%,-50%)} 100%{opacity:0;transform:translate(-50%,-50%) scale(2)} }`}</style>
    </div>
  );
}

export function SpringCheckBoxPreview() {
  const [checked, setChecked] = React.useState(false);
  const [spring, setSpring] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => { setChecked(c => !c); setSpring(true); setTimeout(() => setSpring(false), 400); }, 1100); return () => clearInterval(t); }, []);
  const boxes = [true, false, true];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-paper select-none p-4 gap-3">
      {["Remember me","Notify updates","Accept terms"].map((label, i) => {
        const isChecked = i === 1 ? checked : boxes[i];
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${isChecked ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`, background: isChecked ? "#8b5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transform: i === 1 && spring ? "scale(0.85)" : "scale(1)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
              {isChecked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L4 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 14, strokeDashoffset: i === 1 && spring ? 14 : 0, transition: "stroke-dashoffset 0.3s" }} /></svg>}
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function PeekRatingStarsPreview() {
  const [hover, setHover] = React.useState(0);
  React.useEffect(() => { const vals = [0,1,2,3,4,5,4,3]; let i = 0; const t = setInterval(() => { setHover(vals[i % vals.length] ?? 0); i++; }, 400); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-3">
      <div style={{ display: "flex", gap: 6 }}>
        {[1,2,3,4,5].map(star => (
          <span key={star} style={{ fontSize: 28, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s", transform: star <= hover ? "scale(1.2) translateY(-3px)" : "scale(1)", filter: star <= hover ? "drop-shadow(0 0 8px #f59e0b)" : "none", color: star <= hover ? "#f59e0b" : "rgba(255,255,255,0.15)" }}>★</span>
        ))}
      </div>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "monospace" }}>{hover > 0 ? `${hover} / 5 stars` : "Hover to rate"}</span>
    </div>
  );
}

export function SquishSwitchTogglePreview() {
  const [on, setOn] = React.useState(false);
  const [squish, setSquish] = React.useState(false);
  React.useEffect(() => { const t = setInterval(() => { setOn(o => !o); setSquish(true); setTimeout(() => setSquish(false), 250); }, 1200); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper select-none gap-4">
      <div style={{ width: 64, height: 34, borderRadius: 17, background: on ? "#8b5cf6" : "rgba(255,255,255,0.1)", border: `2px solid ${on ? "#8b5cf6" : "rgba(255,255,255,0.15)"}`, padding: 3, display: "flex", alignItems: "center", justifyContent: on ? "flex-end" : "flex-start", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: on ? "0 0 16px rgba(139,92,246,0.5)" : "none" }}>
        <div style={{ width: 24, height: 24, borderRadius: 12, background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", transform: squish ? "scaleX(1.3) scaleY(0.75)" : "scaleX(1) scaleY(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
      <span style={{ color: on ? "#a78bfa" : "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, fontFamily: "monospace", transition: "color 0.3s" }}>{on ? "ENABLED" : "DISABLED"}</span>
    </div>
  );
}


// Dynamic Intelligent Specimen for any interaction: NO TWO CARDS EVER LOOK THE SAME
function hashSlug(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function GenericInteractionPreview({ title, subcategory }: { title: string; subcategory?: string }) {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setTick(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const hash = hashSlug(title);
  const hue = (hash * 47) % 360;
  const accent = `hsl(${hue}, 75%, 48%)`;
  const bgSoft = `hsla(${hue}, 75%, 48%, 0.08)`;
  const borderSoft = `hsla(${hue}, 75%, 48%, 0.3)`;
  const archetype = hash % 6;
  const cleanTitle = title.replace(/-/g, " ");

  // Archetype 0: Rotary Angle / Dial Gauge
  if (archetype === 0) {
    const angle = ((hash % 120) + Math.sin(tick) * 75);
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3 overflow-hidden">
        <div className="relative w-20 h-20 rounded-full border border-line flex items-center justify-center bg-surface/30">
          <div
            className="w-14 h-14 rounded-full border-2 shadow-xs flex items-center justify-center relative bg-paper"
            style={{ borderColor: accent, transform: `rotate(${angle}deg)` }}
          >
            <div className="absolute top-1 w-1.5 h-3 rounded-full" style={{ backgroundColor: accent }} />
            <div className="w-2.5 h-2.5 rounded-full border border-line" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 font-mono text-[9px]">
          <span className="font-bold uppercase text-ink">{cleanTitle}</span>
          <span className="px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: bgSoft, color: accent }}>
            {Math.round(Math.abs(angle) % 360)}°
          </span>
        </div>
      </div>
    );
  }

  // Archetype 1: Interactive Range Scrubber / Dual Sliders
  if (archetype === 1) {
    const val = 30 + Math.sin(tick + (hash % 10)) * 25 + 25;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div className="w-full max-w-[210px] space-y-2.5">
          <div className="flex justify-between font-mono text-[9px]">
            <span className="font-bold text-ink uppercase truncate max-w-[140px]">{cleanTitle}</span>
            <span className="font-bold" style={{ color: accent }}>{Math.round(val)}%</span>
          </div>
          <div className="relative w-full h-2 rounded-full bg-line/40 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-75" style={{ width: `${val}%`, backgroundColor: accent }} />
          </div>
          <div className="flex justify-between text-[7px] font-mono text-graphite/60">
            <span>MIN · 0</span>
            <span>MID · 50</span>
            <span>MAX · 100</span>
          </div>
        </div>
      </div>
    );
  }

  // Archetype 2: Floating Node Matrix / Graph
  if (archetype === 2) {
    const floatY = Math.sin(tick) * 8;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3 overflow-hidden">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono text-[8px] font-bold shadow-xs transition-transform"
            style={{ borderColor: borderSoft, backgroundColor: bgSoft, color: accent, transform: `translateY(${floatY}px)` }}
          >
            <span>⌖</span>
            <span>A-01</span>
          </div>
          <div className="w-6 h-0.5 bg-line/60 relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          </div>
          <div
            className="w-12 h-12 rounded-xl border border-line bg-surface/50 flex flex-col items-center justify-center font-mono text-[8px] text-graphite font-bold shadow-xs transition-transform"
            style={{ transform: `translateY(${-floatY}px)` }}
          >
            <span>⊕</span>
            <span>B-02</span>
          </div>
        </div>
        <span className="font-mono text-[9px] font-bold uppercase mt-3" style={{ color: accent }}>
          {cleanTitle}
        </span>
      </div>
    );
  }

  // Archetype 3: Layered Stack Deck / Displace
  if (archetype === 3) {
    const shift = Math.sin(tick) * 12;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3 overflow-hidden">
        <div className="relative w-36 h-20 flex items-center justify-center">
          <div className="absolute w-28 h-14 rounded-lg border border-line/40 bg-surface/30 transform -rotate-3 scale-90" />
          <div className="absolute w-28 h-14 rounded-lg border border-line/60 bg-surface/60 transform rotate-2 scale-95" />
          <div
            className="absolute w-28 h-14 rounded-lg border-2 bg-paper shadow-md flex items-center justify-between px-2.5"
            style={{ borderColor: accent, transform: `translateX(${shift}px)` }}
          >
            <span className="font-mono text-[8px] font-bold" style={{ color: accent }}>SWIPE LAYER</span>
            <span className="text-[9px] text-ink font-semibold">0{(hash % 9) + 1}</span>
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase font-bold text-graphite mt-2 truncate max-w-[200px]">
          {cleanTitle}
        </span>
      </div>
    );
  }

  // Archetype 4: Tactical Pulse / Radar Reticle
  if (archetype === 4) {
    const scale = 1 + Math.sin(tick) * 0.15;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3 overflow-hidden">
        <div className="relative flex items-center justify-center mb-1">
          <div
            className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-lg shadow-xs"
            style={{ borderColor: accent, backgroundColor: bgSoft, color: accent, transform: `scale(${scale})` }}
          >
            ✦
          </div>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest font-bold mt-1" style={{ color: accent }}>
          {subcategory ?? "TACTILE INTERACTION"}
        </span>
        <span className="font-display text-xs text-ink mt-0.5 text-center max-w-[22ch] truncate">
          {cleanTitle}
        </span>
      </div>
    );
  }

  // Archetype 5: Segmented Stepper / Toggle Matrix
  const activeStep = Math.floor((tick * 1.5) % 3);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-3">
      <div className="w-full max-w-[190px] p-1.5 rounded-xl bg-surface/50 border border-line/50 flex gap-1">
        {["ALPHA", "BETA", "GAMMA"].map((step, i) => (
          <div
            key={step}
            className={`flex-1 py-1 text-center font-mono text-[7px] font-bold rounded-lg transition-all duration-200 ${
              i === activeStep ? "shadow-xs border" : "text-graphite"
            }`}
            style={
              i === activeStep
                ? { backgroundColor: "var(--paper, #fff)", borderColor: accent, color: accent }
                : {}
            }
          >
            {step}
          </div>
        ))}
      </div>
      <span className="font-mono text-[9px] font-bold uppercase mt-2.5" style={{ color: accent }}>
        {cleanTitle}
      </span>
    </div>
  );
}


export const INTERACTIONS_PREVIEWS_MAP: Record<string, React.ComponentType> = {
  ...CATALOGUE_INTERACTIONS_PREVIEWS,
  "click-sparkle-trail": ClickSparkleTrailPreview,
  "click-wave-emitter": ClickWaveEmitterPreview,
  "color-eyedropper-loupe": ColorEyedropperLoupePreview,
  "command-palette-search": CommandPaletteSearchPreview,
  "coordinate-crosshair-inspect": CoordinateCrosshairInspectPreview,
  "cursor-trail": CursorTrailPreview,
  "directional-hover-card": DirectionalHoverCardPreview,
  "magnetic-tilt-button": MagneticTiltButtonPreview,
  "radial-color-wheel-picker": RadialColorWheelPickerPreview,
  "coordinate-pin-drop": CoordinatePinDropPreview,
  "coordinate-reticle-tracker": CoordinateReticleTrackerPreview,
  "drag-drop-upload-zone": DragDropUploadZonePreview,
  "drag-reorder-list": DragReorderListPreview,
  "elastic-slider-knob": ElasticSliderKnobPreview,
  "elastic-slider-fill": ElasticSliderKnobPreview,
  "hover-audio-waveform-scrub": HoverAudioWaveformScrubPreview,
  "drag-drop-card-stack": DragDropCardStackPreview,
  "drag-drop-kanban-board": DragDropKanbanBoardPreview,
  "drag-drop-shelf": DragDropShelfPreview,
  "drag-rotate-dial": DragRotateDialPreview,
  "drag-snap-slider-notches": DragSnapSliderNotchesPreview,
  "draggable-range-bubble": DraggableRangeBubblePreview,
  "draggable-sticker-board": DraggableStickerBoardPreview,
  "sortable-kanban-column": SortableKanbanColumnPreview,
  "swipe-card-deck": SwipeCardDeckPreview,
  "reorderable-tab-strip": ReorderableTabStripPreview,
  "multi-slider-equalizer": MultiSliderEqualizerPreview,
  "pan-zoom-minimap": PanZoomMinimapPreview,
  "spotlight-follow": SpotlightFollowPreview,
  "infinite-spiral-canvas": InfiniteSpiralCanvasPreview,
  "depth-carousel-3d": DepthCarousel3dPreview,
  "morph-slider-path": MorphSliderPathPreview,
  "drift-wall-parallax": DriftWallParallaxPreview,
  "accordion-gallery-split": AccordionGallerySplitPreview,
  "specular-button-lens": SpecularButtonLensPreview,
  "option-wheel-3d": OptionWheel3dPreview,
  "curved-input-field": CurvedInputFieldPreview,
  "line-sidebar-rail": LineSidebarRailPreview,
  "animated-list-stagger": AnimatedListStaggerPreview,
  "scroll-stack-deck": ScrollStackDeckPreview,
  "bubble-menu-radial": BubbleMenuRadialPreview,
  "magic-bento-spotlight": MagicBentoSpotlightPreview,
  "circular-gallery-carousel": CircularGalleryCarouselPreview,
  "reflective-card-foil": ReflectiveCardFoilPreview,
  "card-nav-expand": CardNavExpandPreview,
  "stack-cards-drag": StackCardsDragPreview,
  "fluid-glass-surface": FluidGlassSurfacePreview,
  "pill-nav-float": PillNavFloatPreview,
  "tilted-card-perspective": TiltedCardPerspectivePreview,
  "masonry-grid-fluid": MasonryGridFluidPreview,
  "glass-surface-acrylic": GlassSurfaceAcrylicPreview,
  "chroma-grid-fresnel": ChromaGridFresnelPreview,
  "folder-tree-interactive": FolderTreeInteractivePreview,
  "staggered-menu-cascade": StaggeredMenuCascadePreview,
  "lanyard-card-spring": LanyardCardSpringPreview,
  "profile-card-holo": ProfileCardHoloPreview,
  "interactive-dock-magnify": InteractiveDockMagnifyPreview,
  "gooey-nav-liquid": GooeyNavLiquidPreview,
  "pixel-card-retro": PixelCardRetroPreview,
  "kinetic-carousel-swipe": KineticCarouselSwipePreview,
  "spotlight-card-interactive": SpotlightCardInteractivePreview,
  "border-glow-card-pulse": BorderGlowCardPulsePreview,
  "flying-posters-gallery": FlyingPostersGalleryPreview,
  "card-swap-deck": CardSwapDeckPreview,
  "glass-icons-iridescent": GlassIconsIridescentPreview,
  "decay-card-friction": DecayCardFrictionPreview,
  "flowing-menu-hover": FlowingMenuHoverPreview,
  "elastic-slider-rebound": ElasticSliderReboundPreview,
  "rolling-counter-digits": RollingCounterDigitsPreview,
  "infinite-menu-marquee": InfiniteMenuMarqueePreview,
  "stepper-control-tactile": StepperControlTactilePreview,
  "bounce-cards-stack": BounceCardsStackPreview,
  "branched-menu-tree": BranchedMenuTreePreview,
  "folder-float-hover": FolderFloatHoverPreview,
  "refine-frame-slider": RefineFrameSliderPreview,
  "thought-line-canvas": ThoughtLineCanvasPreview,
  "voice-pill-waveform": VoicePillWaveformPreview,
  "slosh-gauge-fluid": SloshGaugeFluidPreview,
  "prompt-bar-action": PromptBarActionPreview,
  "swipe-toast-dismiss": SwipeToastDismissPreview,
  "bell-toggle-ring": BellToggleRingPreview,
  "call-chip-pulse": CallChipPulsePreview,
  "status-mark-badge": StatusMarkBadgePreview,
  "glide-select-slider": GlideSelectSliderPreview,
  "swipe-row-actions": SwipeRowActionsPreview,
  "jelly-radio-switch": JellyRadioSwitchPreview,
  "comet-dial-gauge": CometDialGaugePreview,
  "wake-slider-drag": WakeSliderDragPreview,
  "code-slots-reveal": CodeSlotsRevealPreview,
  "dodge-field-pointer": DodgeFieldPointerPreview,
  "lattice-loader-orbit": LatticeLoaderOrbitPreview,
  "scrub-field-timeline": ScrubFieldTimelinePreview,
  "warm-tooltip-float": WarmTooltipFloatPreview,
  "slide-commit-slider": SlideCommitSliderPreview,
  "rubber-segment-switch": RubberSegmentSwitchPreview,
  "pulse-heart-micro": PulseHeartMicroPreview,
  "spring-check-box": SpringCheckBoxPreview,
  "peek-rating-stars": PeekRatingStarsPreview,
  "squish-switch-toggle": SquishSwitchTogglePreview,
};
