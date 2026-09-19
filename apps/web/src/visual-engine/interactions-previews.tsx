// Bespoke high-craft visual previews for OpenUI interaction components
import * as React from "react";

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

// Dynamic Intelligent Specimen for any interaction
export function GenericInteractionPreview({ title, subcategory }: { title: string; subcategory?: string }) {
  const lower = title.toLowerCase();
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

  // Slider / scrubber / range
  if (lower.includes("slider") || lower.includes("range") || lower.includes("scrub") || lower.includes("timeline")) {
    const pct = 50 + Math.sin(tick) * 35;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div className="w-full max-w-[210px] space-y-2">
          <div className="flex justify-between font-mono text-[9px]">
            <span className="text-graphite uppercase font-bold">{title.replace(/-/g, " ")}</span>
            <span className="text-oxide font-bold">{Math.round(pct)}%</span>
          </div>
          <div className="relative w-full h-2 rounded-full bg-line/30 overflow-hidden">
            <div className="h-full bg-oxide" style={{ width: `${pct}%` }} />
          </div>
          <div
            className="w-3.5 h-3.5 -mt-3 rounded-full bg-paper border-2 border-oxide shadow-xs"
            style={{ marginLeft: `calc(${pct}% - 7px)` }}
          />
        </div>
      </div>
    );
  }

  // Drag / Drop / Reorder
  if (lower.includes("drag") || lower.includes("drop") || lower.includes("sortable") || lower.includes("shelf")) {
    const offset = Math.sin(tick) * 12;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div className="w-full max-w-[200px] flex items-center justify-center gap-2">
          <div
            className="w-16 h-16 rounded-xl border-2 border-dashed border-oxide/80 bg-oxide/5 flex flex-col items-center justify-center text-xs font-mono text-oxide font-bold shadow-md transition-transform"
            style={{ transform: `translateY(${offset}px) rotate(${offset * 0.5}deg)` }}
          >
            <span>⠿</span>
            <span className="text-[8px] uppercase">DRAG</span>
          </div>
          <div className="w-16 h-16 rounded-xl border border-line/50 bg-surface/40 flex flex-col items-center justify-center text-xs font-mono text-graphite">
            <span>📥</span>
            <span className="text-[8px] uppercase">TARGET</span>
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-oxide font-bold mt-3">
          {title.replace(/-/g, " ")}
        </span>
      </div>
    );
  }

  // Swipe / Carousel / Card Stack
  if (lower.includes("swipe") || lower.includes("carousel") || lower.includes("deck") || lower.includes("stack")) {
    const shift = Math.sin(tick) * 15;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div className="relative w-36 h-20 flex items-center justify-center">
          <div className="absolute w-28 h-16 rounded-lg border border-line/30 bg-surface/30 transform -rotate-6 scale-90" />
          <div className="absolute w-28 h-16 rounded-lg border border-line/50 bg-surface/60 transform rotate-3 scale-95" />
          <div
            className="absolute w-28 h-16 rounded-lg border-2 border-oxide bg-paper shadow-md flex flex-col items-center justify-center"
            style={{ transform: `translateX(${shift}px)` }}
          >
            <span className="font-mono text-[8px] text-oxide font-bold uppercase">SWIPE CELL</span>
            <span className="text-[10px] text-ink font-semibold">Active Layer</span>
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-graphite mt-2">
          {title.replace(/-/g, " ")}
        </span>
      </div>
    );
  }

  // Toggle / Switch
  if (lower.includes("toggle") || lower.includes("switch") || lower.includes("button") || lower.includes("press")) {
    const on = Math.sin(tick) > 0;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div
          className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${
            on ? "bg-oxide justify-end shadow-md" : "bg-line/40 justify-start"
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center font-bold text-[9px] text-ink">
            {on ? "✓" : "○"}
          </div>
        </div>
        <span className="font-mono text-[9px] font-bold text-oxide uppercase tracking-widest mt-2.5">
          {title.replace(/-/g, " ")}
        </span>
      </div>
    );
  }

  // Keyboard / Shortcut / Menu
  if (lower.includes("keyboard") || lower.includes("shortcut") || lower.includes("key") || lower.includes("hotkey")) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
        <div className="flex items-center gap-1.5">
          <kbd className="px-2.5 py-1.5 rounded-lg border border-line bg-surface shadow-xs font-mono text-xs font-bold text-ink">
            ⌘
          </kbd>
          <span className="text-graphite font-bold">+</span>
          <kbd className="px-2.5 py-1.5 rounded-lg border border-oxide bg-oxide/10 text-oxide shadow-xs font-mono text-xs font-bold animate-pulse">
            K
          </kbd>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-graphite mt-3">
          {title.replace(/-/g, " ")}
        </span>
      </div>
    );
  }

  // Zoom / Lens / Viewport
  if (lower.includes("zoom") || lower.includes("lens") || lower.includes("magnif") || lower.includes("pan")) {
    const scale = 1 + Math.sin(tick) * 0.25;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
        <div
          className="w-18 h-18 rounded-full border-2 border-oxide bg-surface/50 flex items-center justify-center shadow-md"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="text-2xl">🔍</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-oxide font-bold mt-2">
          {title.replace(/-/g, " ")}
        </span>
      </div>
    );
  }

  // Default illuminated specimen
  const icon =
    subcategory === "gestures" ? "✋" :
    subcategory === "keyboard" ? "⌨️" :
    subcategory === "drag" ? "⇄" :
    subcategory === "selection" ? "☑" :
    subcategory === "hover" ? "✧" :
    subcategory === "scroll" ? "↕" : "⌖";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative flex items-center justify-center mb-2">
        <div className="w-12 h-12 rounded-2xl bg-oxide/10 border border-oxide/40 flex items-center justify-center text-xl shadow-xs">
          {icon}
        </div>
        <div className="absolute -inset-1 rounded-2xl border border-oxide/20 animate-ping opacity-75 pointer-events-none" />
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-oxide">
        {subcategory ?? "INTERACTION SPECIMEN"}
      </span>
      <span className="font-display text-xs text-ink mt-0.5 text-center max-w-[22ch] truncate">
        {title.replace(/-/g, " ")}
      </span>
    </div>
  );
}

export const INTERACTIONS_PREVIEWS_MAP: Record<string, React.ComponentType> = {
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
};

