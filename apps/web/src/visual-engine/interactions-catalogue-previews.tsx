// Bespoke high-craft visual previews for the remaining 71 OpenUI interaction components
// Guaranteed 60fps, visually distinct aesthetics, tactile micro-animations and zero bloat.
import * as React from "react";

// ─── Group 1: Navigation & Directional ───────────────────────────────────────

// 1. Directional Pan Pad (Retro gaming D-pad)
export function DirectionalPanPadPreview() {
  const [activeDir, setActiveDir] = React.useState<"up" | "down" | "left" | "right" | null>(null);

  React.useEffect(() => {
    const dirs: Array<"up" | "right" | "down" | "left"> = ["up", "right", "down", "left"];
    let i = 0;
    const t = setInterval(() => {
      setActiveDir(dirs[i % 4]!);
      i++;
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-gradient-to-b from-[#14151a] to-[#0c0d10] p-4 text-white overflow-hidden">
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-cyan-400">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        DPAD · TACTILE
      </div>

      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* D-Pad Cross Background */}
        <div className="absolute w-9 h-28 bg-[#1f2128] rounded-md border border-white/10 shadow-lg" />
        <div className="absolute w-28 h-9 bg-[#1f2128] rounded-md border border-white/10 shadow-lg" />

        {/* Center Pivot */}
        <div className="absolute w-7 h-7 rounded-full bg-[#121316] border border-white/15 z-10 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>

        {/* Up Button */}
        <button
          type="button"
          onPointerEnter={() => setActiveDir("up")}
          className={`absolute top-0 w-8 h-9 flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
            activeDir === "up" ? "text-cyan-400 scale-95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" : "text-white/60"
          }`}
        >
          ▲
        </button>

        {/* Down Button */}
        <button
          type="button"
          onPointerEnter={() => setActiveDir("down")}
          className={`absolute bottom-0 w-8 h-9 flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
            activeDir === "down" ? "text-cyan-400 scale-95 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]" : "text-white/60"
          }`}
        >
          ▼
        </button>

        {/* Left Button */}
        <button
          type="button"
          onPointerEnter={() => setActiveDir("left")}
          className={`absolute left-0 w-9 h-8 flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
            activeDir === "left" ? "text-cyan-400 scale-95 shadow-[inset_2px_0_4px_rgba(0,0,0,0.6)]" : "text-white/60"
          }`}
        >
          ◀
        </button>

        {/* Right Button */}
        <button
          type="button"
          onPointerEnter={() => setActiveDir("right")}
          className={`absolute right-0 w-9 h-8 flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
            activeDir === "right" ? "text-cyan-400 scale-95 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.6)]" : "text-white/60"
          }`}
        >
          ▶
        </button>
      </div>

      <div className="mt-2 font-mono text-[9px] text-white/50 flex items-center gap-2">
        <span>ACTIVE:</span>
        <span className="text-cyan-400 font-bold uppercase">{activeDir ?? "READY"}</span>
      </div>
    </div>
  );
}

// 2. Directional Scroll Indicator
export function DirectionalScrollIndicatorPreview() {
  const [scrollPct, setScrollPct] = React.useState(35);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setScrollPct(Math.round(40 + Math.sin(t) * 35));
    }, 60);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-graphite font-bold">
          SCROLL DEPTH
        </span>

        {/* Floating Capsule */}
        <div className="relative flex flex-col items-center w-10 h-24 rounded-full border-2 border-oxide/40 bg-surface/40 p-1.5 shadow-inner">
          <div
            className="w-7 h-7 rounded-full bg-oxide text-paper font-bold flex items-center justify-center shadow-md transition-all duration-75"
            style={{ transform: `translateY(${(scrollPct / 100) * 44}px)` }}
          >
            <span className="text-xs animate-bounce">↓</span>
          </div>

          <div className="absolute inset-y-3 right-1.5 w-0.5 bg-line/50 rounded-full" />
        </div>

        <span className="font-mono text-[10px] font-bold text-oxide">{scrollPct}% DOWN</span>
      </div>
    </div>
  );
}

// 3. Dockable Sheet Drawer
export function DockableSheetDrawerPreview() {
  const [dockState, setDockState] = React.useState<"peek" | "half" | "full">("half");

  React.useEffect(() => {
    const states: Array<"peek" | "half" | "full"> = ["peek", "half", "full", "half"];
    let i = 0;
    const t = setInterval(() => {
      setDockState(states[i % 4]!);
      i++;
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const heights = { peek: "h-8", half: "h-20", full: "h-32" };

  return (
    <div className="relative w-full h-full flex flex-col justify-end select-none bg-gradient-to-t from-line/10 to-transparent p-4 overflow-hidden">
      <div className="absolute top-3 left-4 font-mono text-[8px] uppercase tracking-wider text-graphite font-bold">
        SHEET STAGE: <span className="text-moss font-bold">{dockState}</span>
      </div>

      <div
        className={`w-full max-w-[220px] mx-auto rounded-t-2xl border-t-2 border-x-2 border-line/60 bg-paper shadow-2xl p-2.5 transition-all duration-300 ${heights[dockState]} flex flex-col items-center`}
      >
        <div className="w-8 h-1 rounded-full bg-line/70 mb-2 cursor-grab" />
        <div className="w-full flex justify-between items-center px-2 text-[9px] font-mono text-ink">
          <span className="font-bold">MODAL DRAWER</span>
          <span className="text-graphite">SNAPPED</span>
        </div>
        {dockState !== "peek" && (
          <div className="mt-2 w-full space-y-1.5 px-2">
            <div className="w-full h-2 rounded-full bg-surface" />
            <div className="w-3/4 h-2 rounded-full bg-surface/70" />
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Elastic Pull Card
export function ElasticPullCardPreview() {
  const [pull, setPull] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setPull(Math.max(0, Math.sin(t) * 26));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      {/* Elastic String */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M 140,40 Q 140,${80 + pull * 1.5} 140,${90 + pull}`}
          stroke="hsl(var(--oxide, 15 80% 50%))"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="4 2"
        />
      </svg>

      <div
        className="relative z-10 w-48 rounded-xl border-2 border-oxide/50 bg-paper p-3 shadow-lg transition-transform duration-75 text-center"
        style={{ transform: `translateY(${pull}px)` }}
      >
        <span className="font-mono text-[8px] uppercase tracking-widest text-oxide font-bold block mb-1">
          ELASTIC RECOIL
        </span>
        <div className="font-display text-xs text-ink font-semibold">Tension: {Math.round(pull * 3.8)}N</div>
      </div>
    </div>
  );
}

// 5. Fluid Gesture Drawer Pull
export function FluidGestureDrawerPullPreview() {
  const [wave, setWave] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.08;
      setWave(Math.sin(t) * 16);
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative w-48 h-24 border border-line/40 rounded-xl bg-surface/20 flex items-center overflow-hidden">
        {/* Fluid Pull Edge */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-cyan-500/20 border-r-2 border-cyan-500 transition-all duration-75 flex items-center justify-center"
          style={{ width: `${32 + wave}px` }}
        >
          <span className="text-cyan-600 font-bold text-xs">»</span>
        </div>
        <div className="ml-16 font-mono text-[9px] text-graphite font-bold">
          SWIPE FOR MENU
        </div>
      </div>
    </div>
  );
}

// 6. Follow Path Cursor
export function FollowPathCursorPreview() {
  const [pos, setPos] = React.useState({ x: 120, y: 70 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      // Lissajous 8 figure
      setPos({
        x: 120 + Math.sin(t) * 45,
        y: 75 + Math.sin(t * 2) * 22,
      });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0d0e12] overflow-hidden p-4">
      {/* Path outline */}
      <div className="absolute w-36 h-20 rounded-full border border-white/10 opacity-30 rotate-12" />

      {/* Orbiting Particle */}
      <div
        className="absolute w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] flex items-center justify-center transition-all duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      </div>

      <div className="absolute bottom-2 font-mono text-[8px] uppercase tracking-widest text-amber-400/80">
        Kinetic Path Tracer
      </div>
    </div>
  );
}

// 7. Gesture Swipe Action List
export function GestureSwipeActionListPreview() {
  const [swiped, setSwiped] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setSwiped((s) => !s), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[210px] relative rounded-xl overflow-hidden border border-line/50 bg-paper shadow-sm">
        {/* Hidden Reveal Actions */}
        <div className="absolute inset-y-0 right-0 flex">
          <div className="w-12 bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">
            PIN
          </div>
          <div className="w-12 bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">
            DEL
          </div>
        </div>

        {/* Swiping List Item */}
        <div
          className={`relative z-10 bg-paper p-3 border-r border-line/30 transition-transform duration-300 ${
            swiped ? "-translate-x-24" : "translate-x-0"
          }`}
        >
          <div className="font-display text-xs text-ink font-semibold">Incoming Order #842</div>
          <div className="font-mono text-[8px] text-graphite">Swipe left to reveal actions</div>
        </div>
      </div>
    </div>
  );
}

// 8. Gesture Swipe Carousel
export function GestureSwipeCarouselPreview() {
  const [activeCard, setActiveCard] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActiveCard((c) => (c + 1) % 3), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex gap-2 items-center justify-center h-24 overflow-hidden">
        {[0, 1, 2].map((i) => {
          const isActive = i === activeCard;
          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 flex flex-col justify-between p-2.5 ${
                isActive
                  ? "w-28 h-20 bg-ink text-paper border-ink scale-105 shadow-md"
                  : "w-20 h-16 bg-surface/50 text-graphite border-line scale-95 opacity-60"
              }`}
            >
              <span className="font-mono text-[8px] uppercase">SLIDE 0{i + 1}</span>
              <span className="font-display text-[10px] font-bold">Card Aspect</span>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex gap-1 mt-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === activeCard ? "w-4 bg-ink" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 9. Gesture Swipe Dismiss Banner
export function GestureSwipeDismissBannerPreview() {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setDismissed((d) => !d), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div
        className={`w-full max-w-[210px] p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 shadow-sm flex items-center justify-between transition-all duration-500 ${
          dismissed ? "opacity-0 -translate-x-12 scale-90" : "opacity-100 translate-x-0 scale-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs">✓</span>
          <span className="font-mono text-[9px] font-bold">Sync Completed</span>
        </div>
        <span className="text-[10px] opacity-60 font-bold">✕</span>
      </div>
    </div>
  );
}

// ─── Group 2: Cards & Hover FX ──────────────────────────────────────────────

// 10. Hover Card Preview Stack
export function HoverCardPreviewStackPreview() {
  const [fan, setFan] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setFan((f) => !f), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-28 h-20">
        {/* Card 1 */}
        <div
          className={`absolute inset-0 rounded-xl border border-line bg-surface shadow-xs transition-all duration-300 ${
            fan ? "-rotate-12 -translate-x-3 -translate-y-1" : "rotate-0 translate-x-0"
          }`}
        />
        {/* Card 2 */}
        <div
          className={`absolute inset-0 rounded-xl border border-line bg-paper/90 shadow-sm transition-all duration-300 ${
            fan ? "rotate-12 translate-x-3 -translate-y-1" : "rotate-0 translate-x-0"
          }`}
        />
        {/* Card 3 (Top) */}
        <div className="absolute inset-0 rounded-xl border-2 border-ink bg-paper shadow-md flex flex-col justify-between p-2.5">
          <span className="font-mono text-[8px] font-bold text-ink">STACK DECK</span>
          <span className="font-display text-[10px] text-graphite">Fan on Hover</span>
        </div>
      </div>
    </div>
  );
}

// 11. Hover Expand Accordion Row
export function HoverExpandAccordionRowPreview() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[210px] rounded-xl border border-line bg-paper shadow-xs overflow-hidden transition-all duration-300">
        <div className="p-2.5 flex items-center justify-between border-b border-line/30 bg-surface/20">
          <span className="font-mono text-[9px] font-bold text-ink">Security Protocol</span>
          <span className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180 text-oxide" : ""}`}>
            ▼
          </span>
        </div>
        <div
          className={`px-2.5 transition-all duration-300 overflow-hidden font-mono text-[8px] text-graphite ${
            open ? "max-h-14 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          AES-256 GCM encrypted handshake active on TLS v1.3.
        </div>
      </div>
    </div>
  );
}

// 12. Hover Glare Card
export function HoverGlareCardPreview() {
  const [glarePos, setGlarePos] = React.useState(30);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setGlarePos(50 + Math.sin(t) * 45);
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0f1015] p-4">
      <div className="relative w-36 h-24 rounded-xl border border-white/20 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black p-3 overflow-hidden shadow-xl">
        {/* Glare Beam */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none transform -skew-x-25 transition-all duration-75"
          style={{ transform: `translateX(${(glarePos - 50) * 2}px) skewX(-25deg)` }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-300 font-bold">
            HOLO SPECIMEN
          </span>
          <span className="font-display text-xs text-white font-bold">Specular Sheen</span>
        </div>
      </div>
    </div>
  );
}

// 13. Hover Glitch Displacement
export function HoverGlitchDisplacementPreview() {
  const [glitch, setGlitch] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0c0c0e] p-4 text-white">
      <div className="relative p-3 rounded-xl border border-white/10 bg-[#141418]">
        <div
          className={`font-mono text-sm font-black tracking-widest transition-transform ${
            glitch ? "text-cyan-400 translate-x-1 skew-x-6" : "text-white"
          }`}
        >
          GLITCH_CORE
        </div>
        {glitch && (
          <div className="absolute inset-0 p-3 font-mono text-sm font-black tracking-widest text-red-500 -translate-x-1 -translate-y-0.5 opacity-80 mix-blend-screen pointer-events-none">
            GLITCH_CORE
          </div>
        )}
      </div>
    </div>
  );
}

// 14. Hover Glitch Text Reveal
export function HoverGlitchTextRevealPreview() {
  const [text, setText] = React.useState("ENCRYPTED");

  React.useEffect(() => {
    const phrases = ["ENCRYPTED", "0x89F1A4", "DECODED!"];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setText(phrases[i % phrases.length]!);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <span className="font-mono text-[8px] uppercase text-graphite tracking-widest mb-1">
        CIPHER REVEAL
      </span>
      <div className="px-3 py-1.5 rounded-lg border border-moss/40 bg-moss/10 font-mono text-xs font-bold text-moss">
        {text}
      </div>
    </div>
  );
}

// 15. Hover Image Zoom Crosshair
export function HoverImageZoomCrosshairPreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.04;
      setPos({
        x: 50 + Math.sin(t) * 25,
        y: 50 + Math.cos(t * 0.7) * 20,
      });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#111216] p-4 text-white overflow-hidden">
      <div className="relative w-44 h-24 rounded-xl border border-white/20 bg-gradient-to-br from-zinc-800 to-zinc-950 overflow-hidden flex items-center justify-center">
        {/* Crosshair Target */}
        <div
          className="absolute w-8 h-8 rounded-full border border-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.5)] flex items-center justify-center pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="w-1 h-1 rounded-full bg-cyan-400" />
          <div className="absolute w-full h-0.5 bg-cyan-400/40" />
          <div className="absolute h-full w-0.5 bg-cyan-400/40" />
        </div>

        <span className="font-mono text-[8px] text-white/40 tracking-wider">
          TARGET RETICLE: {Math.round(pos.x)},{Math.round(pos.y)}
        </span>
      </div>
    </div>
  );
}

// 16. Hover Lens Magnifier
export function HoverLensMagnifierPreview() {
  const [lensX, setLensX] = React.useState(30);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setLensX(40 + Math.sin(t) * 30);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative w-44 h-20 rounded-xl border border-line bg-surface/40 flex items-center px-4 overflow-hidden">
        <span className="font-mono text-[10px] text-graphite tracking-widest">
          MICRO-TEXT-SCHEMATIC-DATA
        </span>

        {/* Magnifying Glass */}
        <div
          className="absolute w-12 h-12 rounded-full border-2 border-oxide bg-paper/90 shadow-xl flex items-center justify-center backdrop-blur-xs transition-all duration-75"
          style={{ left: `${lensX}%`, transform: "translateX(-50%)" }}
        >
          <span className="font-mono text-sm font-bold text-oxide">DATA</span>
        </div>
      </div>
    </div>
  );
}

// 17. Hover Magnetic Pill
export function HoverMagneticPillPreview() {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setOffset({
        x: Math.sin(t) * 16,
        y: Math.cos(t * 1.2) * 8,
      });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div
        className="px-5 py-2.5 rounded-full border-2 border-ink bg-paper shadow-md font-mono text-xs font-bold text-ink transition-transform duration-75 flex items-center gap-2"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <span className="w-2 h-2 rounded-full bg-oxide animate-ping" />
        MAGNETIC PILL
      </div>
    </div>
  );
}

// 18. Hover Magnify Dock
export function HoverMagnifyDockPreview() {
  const [hoverIndex, setHoverIndex] = React.useState(2);

  React.useEffect(() => {
    let i = 0;
    const loop = setInterval(() => {
      i = (i + 1) % 5;
      setHoverIndex(i);
    }, 800);
    return () => clearInterval(loop);
  }, []);

  const icons = ["✦", "⌖", "⌘", "❖", "⚡"];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="p-2 rounded-2xl border border-line/60 bg-surface/60 backdrop-blur-md shadow-md flex items-end gap-2">
        {icons.map((icon, i) => {
          const dist = Math.abs(hoverIndex - i);
          const scale = dist === 0 ? "w-10 h-10 text-base" : dist === 1 ? "w-8 h-8 text-xs" : "w-7 h-7 text-[10px]";
          return (
            <div
              key={icon}
              className={`rounded-xl border border-line bg-paper flex items-center justify-center font-bold text-ink shadow-xs transition-all duration-200 ${scale}`}
            >
              {icon}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-2">
        Sinusoidal Dock
      </span>
    </div>
  );
}

// 19. Hover Parallax Typography
export function HoverParallaxTypographyPreview() {
  const [shift, setShift] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setShift(Math.sin(t) * 12);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative font-black tracking-tighter text-center">
        {/* Layer 1 */}
        <div
          className="font-display text-2xl text-line/80 transition-transform duration-75"
          style={{ transform: `translateX(${shift * 1.5}px)` }}
        >
          KINETIC
        </div>
        {/* Layer 2 */}
        <div
          className="font-display text-2xl text-ink transition-transform duration-75 -mt-3"
          style={{ transform: `translateX(${-shift}px)` }}
        >
          DEPTH
        </div>
      </div>
    </div>
  );
}

// 20. Hover Reveal Matrix
export function HoverRevealMatrixPreview() {
  const [spot, setSpot] = React.useState(4);

  React.useEffect(() => {
    const t = setInterval(() => setSpot((s) => (s + 1) % 9), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0e1014] p-4">
      <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl border border-white/10 bg-[#16181f]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-md flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-200 ${
              i === spot
                ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.8)] scale-105"
                : "bg-white/5 text-white/30"
            }`}
          >
            0{i}
          </div>
        ))}
      </div>
    </div>
  );
}

// 21. Hover Spotlight Card
export function HoverSpotlightCardPreview() {
  const [mouse, setMouse] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.04;
      setMouse({
        x: 50 + Math.sin(t) * 35,
        y: 50 + Math.cos(t * 0.8) * 30,
      });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#090a0d] p-4">
      <div
        className="relative w-44 h-24 rounded-xl border border-white/15 bg-zinc-950 p-3 overflow-hidden shadow-2xl flex flex-col justify-between"
        style={{
          background: `radial-gradient(circle 70px at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.15), transparent 70%), #0c0d12`,
        }}
      >
        <span className="font-mono text-[8px] uppercase tracking-widest text-amber-400 font-bold">
          SPOTLIGHT BEAM
        </span>
        <span className="font-display text-xs text-white font-semibold">Radial Flashlight</span>
      </div>
    </div>
  );
}

// ─── Group 3: Interactive Controls & Inputs ─────────────────────────────────

// 22. Interactive Code Fold
export function InteractiveCodeFoldPreview() {
  const [folded, setFolded] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setFolded((f) => !f), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#111217] p-4 text-white">
      <div className="w-full max-w-[220px] rounded-xl border border-white/10 bg-[#181920] p-3 font-mono text-[9px] shadow-lg">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="cursor-pointer">{folded ? "▶" : "▼"}</span>
          <span>function compute() {"{"}</span>
        </div>
        {!folded ? (
          <div className="pl-4 py-1 text-white/60 space-y-0.5">
            <div>const alpha = 42;</div>
            <div className="text-amber-300">return alpha * 2;</div>
          </div>
        ) : (
          <div className="pl-4 py-0.5 text-white/30 text-[8px] font-bold">... 2 lines hidden</div>
        )}
        <div className="text-cyan-400">{"}"}</div>
      </div>
    </div>
  );
}

// 23. Interactive Color Palette Bar
export function InteractiveColorPaletteBarPreview() {
  const [selected, setSelected] = React.useState("#6366f1");

  const colors = ["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#6366f1"];

  React.useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % colors.length;
      setSelected(colors[i]!);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex gap-1.5 p-1.5 rounded-xl border border-line bg-surface/50 shadow-xs">
        {colors.map((c) => (
          <div
            key={c}
            className={`w-7 h-7 rounded-lg transition-transform duration-200 cursor-pointer ${
              selected === c ? "scale-110 shadow-md ring-2 ring-ink" : "opacity-80"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] font-bold uppercase mt-2.5" style={{ color: selected }}>
        {selected}
      </span>
    </div>
  );
}

// 24. Interactive Diff Slider
export function InteractiveDiffSliderPreview() {
  const [split, setSplit] = React.useState(50);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setSplit(Math.round(50 + Math.sin(t) * 35));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="relative w-48 h-24 rounded-xl border border-line overflow-hidden shadow-sm flex">
        {/* Left Side (Before) */}
        <div
          className="absolute inset-y-0 left-0 bg-amber-500/20 border-r-2 border-ink flex items-center justify-start pl-3"
          style={{ width: `${split}%` }}
        >
          <span className="font-mono text-[9px] font-bold text-amber-700">BEFORE</span>
        </div>

        {/* Right Side (After) */}
        <div className="w-full bg-emerald-500/20 flex items-center justify-end pr-3">
          <span className="font-mono text-[9px] font-bold text-emerald-700">AFTER</span>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-6 rounded-md bg-ink text-paper text-[8px] flex items-center justify-center font-bold shadow-md pointer-events-none"
          style={{ left: `calc(${split}% - 8px)` }}
        >
          ⇔
        </div>
      </div>
    </div>
  );
}

// 25. Interactive Matrix Keypad
export function InteractiveMatrixKeypadPreview() {
  const [pressedKey, setPressedKey] = React.useState<number | null>(null);

  React.useEffect(() => {
    const keys = [1, 4, 7, 9, 5, 2];
    let i = 0;
    const t = setInterval(() => {
      setPressedKey(keys[i % keys.length]!);
      i++;
    }, 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#101216] p-4 text-white">
      <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-xl border border-white/10 bg-[#191b22] shadow-xl">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
          <div
            key={k}
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
              pressedKey === k
                ? "bg-amber-400 text-black scale-95 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                : "bg-white/5 text-white/70"
            }`}
          >
            {k}
          </div>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-amber-400 mt-2">
        KEYPAD PIN TRIGGER
      </span>
    </div>
  );
}

// 26. Interactive Matrix Toggle
export function InteractiveMatrixTogglePreview() {
  const [grid, setGrid] = React.useState<boolean[]>([
    true, false, true, false,
    false, true, false, true,
    true, true, false, false,
    false, false, true, true,
  ]);

  React.useEffect(() => {
    const t = setInterval(() => {
      setGrid((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = !next[idx];
        return next;
      });
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="grid grid-cols-4 gap-1 p-2 rounded-xl border border-line bg-surface shadow-xs">
        {grid.map((active, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-md transition-colors duration-150 ${
              active ? "bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]" : "bg-line/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 27. Interactive Radar Chart
export function InteractiveRadarChartPreview() {
  const [pulse, setPulse] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setPulse(Math.sin(t) * 10);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#0a0c10] p-4 text-white overflow-hidden">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Radar Rings */}
        <div className="absolute w-28 h-28 rounded-full border border-emerald-500/20" />
        <div className="absolute w-18 h-18 rounded-full border border-emerald-500/30" />
        <div className="absolute w-8 h-8 rounded-full border border-emerald-500/50" />

        {/* Sweeping Polygon */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <polygon
            points={`50,${20 - pulse} ${80 + pulse},40 ${70},85 ${30},85 ${20 - pulse},40`}
            fill="rgba(16,185,129,0.25)"
            stroke="#10b981"
            strokeWidth="1.5"
          />
        </svg>

        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>

      <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400 mt-1">
        TACTICAL RADAR
      </span>
    </div>
  );
}

// 28. Interactive Range Gauge
export function InteractiveRangeGaugePreview() {
  const [val, setVal] = React.useState(68);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setVal(Math.round(55 + Math.sin(t) * 35));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-32 h-18 flex flex-col items-center justify-end overflow-hidden">
        {/* Arc Background */}
        <div className="w-32 h-32 rounded-full border-[10px] border-line/30 border-b-transparent border-l-transparent -rotate-45" />

        {/* Needle */}
        <div
          className="absolute bottom-0 w-1 h-14 bg-oxide origin-bottom transition-transform duration-75"
          style={{ transform: `rotate(${(val / 100) * 180 - 90}deg)` }}
        />

        <div className="absolute bottom-0 w-4 h-4 rounded-full bg-ink" />
      </div>
      <div className="font-mono text-sm font-bold text-ink mt-2">{val} PSI</div>
    </div>
  );
}

// 29. Interactive Segment Tabs
export function InteractiveSegmentTabsPreview() {
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setTab((c) => (c + 1) % 3), 1200);
    return () => clearInterval(t);
  }, []);

  const labels = ["DAY", "WEEK", "YEAR"];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="p-1 rounded-xl bg-surface/70 border border-line/50 flex gap-1 shadow-inner">
        {labels.map((l, i) => (
          <div
            key={l}
            className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold transition-all duration-200 cursor-pointer ${
              tab === i ? "bg-paper text-ink shadow-xs border border-line/40 scale-105" : "text-graphite"
            }`}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// 30. Interactive Star Rating
export function InteractiveStarRatingPreview() {
  const [rating, setRating] = React.useState(4);

  React.useEffect(() => {
    const t = setInterval(() => setRating((r) => (r % 5) + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex gap-1.5 text-lg">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`transition-all duration-200 ${
              star <= rating ? "text-amber-500 scale-110" : "text-line/60"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] font-bold text-graphite mt-2">
        {rating}.0 / 5.0 STARS
      </span>
    </div>
  );
}

// 31. Interactive Stepper Flow
export function InteractiveStepperFlowPreview() {
  const [step, setStep] = React.useState(2);

  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s % 4) + 1), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((s, idx) => (
          <React.Fragment key={s}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-200 ${
                s <= step
                  ? "bg-ink text-paper shadow-xs scale-105"
                  : "bg-surface text-graphite border border-line"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
            {idx < 3 && (
              <div
                className={`w-4 h-0.5 transition-colors duration-200 ${
                  s < step ? "bg-ink" : "bg-line"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-3">
        CHECKOUT PIPELINE
      </span>
    </div>
  );
}

// 32. Joystick Control Pad
export function JoystickControlPadPreview() {
  const [stick, setStick] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setStick({
        x: Math.cos(t) * 22,
        y: Math.sin(t * 1.5) * 20,
      });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#121318] p-4 text-white">
      <div className="relative w-24 h-24 rounded-full border-2 border-white/20 bg-zinc-900 shadow-inner flex items-center justify-center">
        {/* Crosshair guidelines */}
        <div className="absolute w-full h-px bg-white/10" />
        <div className="absolute h-full w-px bg-white/10" />

        {/* Thumbstick Knob */}
        <div
          className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-950 shadow-[0_0_12px_rgba(6,182,212,0.8)] flex items-center justify-center transition-transform duration-75"
          style={{ transform: `translate(${stick.x}px, ${stick.y}px)` }}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
        </div>
      </div>

      <div className="mt-2 font-mono text-[8px] tracking-widest text-cyan-400">
        X:{Math.round(stick.x)} Y:{Math.round(stick.y)}
      </div>
    </div>
  );
}

// ─── Group 4: Keyboard & Spatial ────────────────────────────────────────────

// 33. Keyboard Command Palette Menu
export function KeyboardCommandPaletteMenuPreview() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActiveIndex((a) => (a + 1) % 3), 1200);
    return () => clearInterval(t);
  }, []);

  const items = ["Deploy to Production", "Clear System Cache", "Generate API Token"];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#111216] p-4 text-white">
      <div className="w-full max-w-[210px] rounded-xl border border-white/15 bg-[#17181f] p-2 shadow-xl">
        <div className="pb-1.5 mb-1.5 border-b border-white/10 flex items-center gap-1.5 font-mono text-[8px] text-white/50">
          <span>⌘K</span>
          <span>COMMAND ACTIONS</span>
        </div>
        <div className="space-y-1">
          {items.map((it, idx) => (
            <div
              key={it}
              className={`p-1.5 rounded-lg font-mono text-[9px] flex justify-between items-center transition-all ${
                idx === activeIndex
                  ? "bg-cyan-500 text-black font-bold shadow-xs"
                  : "text-white/70"
              }`}
            >
              <span>{it}</span>
              {idx === activeIndex && <span>↵</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 34. Keyboard Focus Trap Modal
export function KeyboardFocusTrapModalPreview() {
  const [focusedBtn, setFocusedBtn] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setFocusedBtn((f) => (f + 1) % 2), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[200px] p-3 rounded-2xl border-2 border-line bg-paper shadow-xl text-center">
        <span className="font-mono text-[8px] font-bold text-oxide uppercase">FOCUS TRAP DIALOG</span>
        <p className="font-display text-[11px] text-ink my-2 font-semibold">Discard pending drafts?</p>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            className={`px-3 py-1 rounded-lg font-mono text-[9px] font-bold transition-all ${
              focusedBtn === 0 ? "bg-surface border-2 border-oxide text-oxide shadow-xs" : "border border-line text-graphite"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-lg font-mono text-[9px] font-bold transition-all ${
              focusedBtn === 1 ? "bg-oxide text-paper ring-2 ring-oxide/50 shadow-xs" : "bg-line text-graphite"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// 35. Keyboard List Navigation
export function KeyboardListNavigationPreview() {
  const [curr, setCurr] = React.useState(1);

  React.useEffect(() => {
    const t = setInterval(() => setCurr((c) => (c + 1) % 4), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[200px] space-y-1">
        {["Overview", "Telemetry", "Audit Logs", "Settings"].map((row, i) => (
          <div
            key={row}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[9px] transition-all flex justify-between items-center ${
              i === curr
                ? "bg-ink text-paper font-bold shadow-xs translate-x-1"
                : "text-graphite bg-surface/30"
            }`}
          >
            <span>{row}</span>
            {i === curr && <span>[ACTIVE]</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// 36. Keyboard Shortcut Matrix
export function KeyboardShortcutMatrixPreview() {
  const [pressed, setPressed] = React.useState("⌘");

  React.useEffect(() => {
    const keys = ["⌘", "K", "⇧", "P", "↵"];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setPressed(keys[i % keys.length]!);
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#0f1015] p-4 text-white">
      <div className="flex gap-2">
        {["⌘", "⇧", "⌥", "K", "↵"].map((k) => (
          <div
            key={k}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
              pressed === k
                ? "bg-cyan-500 border-cyan-300 text-black scale-110 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                : "bg-white/5 border-white/10 text-white/60"
            }`}
          >
            {k}
          </div>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-400 mt-3">
        HOTKEY MATRIX
      </span>
    </div>
  );
}

// 37. Keyboard Spatial Grid
export function KeyboardSpatialGridPreview() {
  const [cell, setCell] = React.useState({ r: 1, c: 1 });

  React.useEffect(() => {
    const coords = [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 1, c: 1 },
      { r: 2, c: 1 },
      { r: 2, c: 2 },
    ];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCell(coords[i % coords.length]!);
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const isTarget = cell.r === r && cell.c === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`w-7 h-7 rounded-lg border font-mono text-[8px] font-bold flex items-center justify-center transition-all ${
                  isTarget
                    ? "bg-oxide text-paper border-oxide scale-110 shadow-md"
                    : "bg-surface/50 text-graphite border-line"
                }`}
              >
                {r},{c}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

// 38. Keyboard Stepper Numeric
export function KeyboardStepperNumericPreview() {
  const [val, setVal] = React.useState(42);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVal((v) => (v > 50 ? 40 : v + 1));
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="flex items-center rounded-xl border-2 border-line bg-paper shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setVal((v) => v - 1)}
          className="px-3 py-2 bg-surface hover:bg-line/30 font-bold text-xs"
        >
          -
        </button>
        <div className="px-5 py-2 font-mono text-sm font-bold text-ink min-w-[5ch] text-center">
          {val}
        </div>
        <button
          type="button"
          onClick={() => setVal((v) => v + 1)}
          className="px-3 py-2 bg-surface hover:bg-line/30 font-bold text-xs"
        >
          +
        </button>
      </div>
    </div>
  );
}

// 39. Keyboard Tab Navigator
export function KeyboardTabNavigatorPreview() {
  const [focal, setFocal] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setFocal((f) => (f + 1) % 3), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex gap-2">
        {["Profile", "Security", "Billing"].map((tab, i) => (
          <div
            key={tab}
            className={`px-3 py-1.5 rounded-lg font-mono text-[9px] transition-all ${
              focal === i
                ? "bg-paper text-ink ring-2 ring-offset-2 ring-oxide font-bold shadow-xs"
                : "bg-surface text-graphite"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-3">
        TAB LOOP RETICLE
      </span>
    </div>
  );
}

// ─── Group 5: Kinetic, Pan & Selection ──────────────────────────────────────

// 40. Kinetic Flick Carousel
export function KineticFlickCarouselPreview() {
  const [xOffset, setXOffset] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setXOffset(Math.sin(t) * 36);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div
        className="flex gap-3 transition-transform duration-75"
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="w-24 h-20 rounded-xl border border-line bg-paper shadow-sm flex flex-col justify-between p-2.5 shrink-0"
          >
            <span className="font-mono text-[8px] text-graphite">FLICK CARD</span>
            <span className="font-display text-xs font-bold text-ink">#0{n} Velocity</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 41. Kinetic Pan Canvas
export function KineticPanCanvasPreview() {
  const [pan, setPan] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.04;
      setPan({ x: Math.sin(t) * 20, y: Math.cos(t * 0.7) * 15 });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0e1014] p-4 text-white overflow-hidden">
      {/* Infinite Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      <div className="relative z-10 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-black/60 backdrop-blur-xs font-mono text-[9px] text-cyan-400">
        PAN: {Math.round(pan.x)}, {Math.round(pan.y)}
      </div>
    </div>
  );
}

// 42. Lasso Select Box
export function LassoSelectBoxPreview() {
  const [size, setSize] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setSize(Math.abs(Math.sin(t)) * 50);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-44 h-28 border border-line/50 rounded-xl bg-surface/20 flex items-center justify-center">
        {/* Nodes */}
        <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-line" />
        <div className="absolute bottom-6 left-12 w-2 h-2 rounded-full bg-cyan-500 shadow-sm" />
        <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-cyan-500 shadow-sm" />

        {/* Marquee Selection */}
        <div
          className="absolute border-2 border-dashed border-cyan-500 bg-cyan-500/15 rounded-md pointer-events-none"
          style={{ width: `${size + 30}px`, height: `${size + 20}px` }}
        />
      </div>
    </div>
  );
}

// 43. Magnetic Cursor Bubble
export function MagneticCursorBubblePreview() {
  const [bubble, setBubble] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setBubble({ x: Math.sin(t) * 25, y: Math.cos(t * 1.3) * 15 });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      {/* Target Anchor */}
      <div className="w-3 h-3 rounded-full bg-line" />

      {/* Floating Blob */}
      <div
        className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-80 blur-[1px] shadow-lg transition-transform duration-75 flex items-center justify-center text-white text-[9px] font-bold"
        style={{ transform: `translate(${bubble.x}px, ${bubble.y}px)` }}
      >
        ✦
      </div>
    </div>
  );
}

// 44. Magnetic Item Grid
export function MagneticItemGridPreview() {
  const [active, setActive] = React.useState(4);

  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 9), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs transition-all duration-200 ${
              active === i
                ? "bg-ink text-paper border-ink scale-125 shadow-md -translate-y-1"
                : "bg-surface/50 text-graphite border-line"
            }`}
          >
            ✦
          </div>
        ))}
      </div>
    </div>
  );
}

// 45. Multi Choice Tag Cloud
export function MultiChoiceTagCloudPreview() {
  const [selected, setSelected] = React.useState<string[]>(["React", "Motion"]);

  const tags = ["React", "Motion", "Tailwind", "Canvas", "3D"];

  React.useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setSelected(tags.slice(0, (i % 4) + 1));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
        {tags.map((tag) => {
          const isSel = selected.includes(tag);
          return (
            <div
              key={tag}
              className={`px-2.5 py-1 rounded-full font-mono text-[9px] font-bold transition-all ${
                isSel
                  ? "bg-oxide text-paper shadow-xs scale-105"
                  : "bg-surface text-graphite border border-line"
              }`}
            >
              {isSel ? `✓ ${tag}` : tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 46. Multi Select Checkbox Tree
export function MultiSelectCheckboxTreePreview() {
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => setChecked((c) => !c), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4 font-mono text-[9px]">
      <div className="w-full max-w-[190px] space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-ink">
          <div className="w-3.5 h-3.5 rounded border border-ink flex items-center justify-center bg-ink text-paper text-[8px]">
            {checked ? "✓" : "-"}
          </div>
          <span>Root Architecture</span>
        </div>
        <div className="pl-5 space-y-1 text-graphite border-l border-line ml-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-line bg-surface flex items-center justify-center text-[8px]">
              {checked ? "✓" : ""}
            </div>
            <span>components/</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-line bg-surface flex items-center justify-center text-[8px]">
              {checked ? "✓" : ""}
            </div>
            <span>visual-engine/</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 47. Multi Target Focus Ring
export function MultiTargetFocusRingPreview() {
  const [target, setTarget] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setTarget((t) => (t + 1) % 3), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex gap-2">
        {["Search", "Filter", "Export"].map((item, i) => (
          <div
            key={item}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold transition-all ${
              target === i
                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-500/50 scale-105 shadow-sm"
                : "border-line bg-paper text-graphite"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-600 mt-3">
        ROVING TARGET RETICLE
      </span>
    </div>
  );
}

// ─── Group 6: Zoom, Compass & Canvas ────────────────────────────────────────

// 48. Pinch Zoom Card
export function PinchZoomCardPreview() {
  const [zoom, setZoom] = React.useState(120);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setZoom(Math.round(120 + Math.sin(t) * 40));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-44 h-24 rounded-xl border border-line bg-surface/30 overflow-hidden flex items-center justify-center shadow-xs">
        <div
          className="w-16 h-16 rounded-xl border-2 border-oxide bg-paper shadow-md flex items-center justify-center font-bold text-oxide transition-transform duration-75"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          ⌖
        </div>
      </div>
      <span className="font-mono text-[9px] font-bold text-ink mt-2">ZOOM: {zoom}%</span>
    </div>
  );
}

// 49. Pinch Zoom Viewport
export function PinchZoomViewportPreview() {
  const [scale, setScale] = React.useState(1.4);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setScale(1.2 + Math.sin(t) * 0.4);
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#111317] p-4 text-white overflow-hidden">
      <div
        className="w-36 h-20 rounded-xl border border-cyan-500/40 bg-zinc-900 flex items-center justify-center shadow-lg transition-transform duration-75"
        style={{ transform: `scale(${scale})` }}
      >
        <span className="font-mono text-[9px] text-cyan-400 font-bold">2D VIEWPORT HUD</span>
      </div>
      <div className="absolute bottom-2 font-mono text-[8px] text-white/50 tracking-widest">
        SCALE: {scale.toFixed(2)}x
      </div>
    </div>
  );
}

// 50. Pointer Angle Compass
export function PointerAngleCompassPreview() {
  const [deg, setDeg] = React.useState(45);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setDeg(Math.round((t * 50) % 360));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-24 h-24 rounded-full border-2 border-line/60 bg-paper shadow-md flex items-center justify-center">
        <span className="absolute top-1 font-mono text-[8px] font-bold text-oxide">N</span>
        <span className="absolute bottom-1 font-mono text-[8px] font-bold text-graphite">S</span>
        <span className="absolute right-1 font-mono text-[8px] font-bold text-graphite">E</span>
        <span className="absolute left-1 font-mono text-[8px] font-bold text-graphite">W</span>

        {/* Needle */}
        <div
          className="w-1.5 h-16 bg-gradient-to-t from-graphite via-line to-oxide rounded-full transition-transform duration-75 shadow-sm"
          style={{ transform: `rotate(${deg}deg)` }}
        />

        <div className="absolute w-3 h-3 rounded-full bg-ink" />
      </div>
      <span className="font-mono text-[9px] font-bold text-ink mt-2">{deg}° BEARING</span>
    </div>
  );
}

// 51. Pointer Draw Canvas
export function PointerDrawCanvasPreview() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <svg className="w-44 h-24 border border-line rounded-xl bg-surface/20" viewBox="0 0 176 96">
        <path
          d="M 20,70 Q 50,10 90,50 T 160,30"
          fill="none"
          stroke="hsl(var(--oxide, 15 80% 50%))"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="30" r="4" fill="hsl(var(--oxide, 15 80% 50%))" className="animate-ping" />
      </svg>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-1.5">
        Pressure Ink Trace
      </span>
    </div>
  );
}

// 52. Press and Hold Button
export function PressAndHoldButtonPreview() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let p = 0;
    const loop = setInterval(() => {
      p = (p + 3) % 100;
      setProgress(p);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-28 h-10 rounded-xl border-2 border-red-500/50 bg-paper shadow-sm overflow-hidden flex items-center justify-center">
        {/* Fill Progress Bar */}
        <div
          className="absolute inset-y-0 left-0 bg-red-500/20 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
        <span className="relative z-10 font-mono text-[9px] font-bold text-red-600">
          HOLD TO ERASE {progress}%
        </span>
      </div>
    </div>
  );
}

// 53. Radial Context Menu
export function RadialContextMenuPreview() {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1500);
    return () => clearInterval(t);
  }, []);

  const items = ["✂", "❐", "★", "✎"];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Center Trigger */}
        <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-xs shadow-md z-10">
          ✦
        </div>

        {/* Radial Buttons */}
        {items.map((it, idx) => {
          const angle = (idx * Math.PI) / 2;
          const radius = open ? 36 : 0;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={it}
              className={`absolute w-7 h-7 rounded-full border border-line bg-paper shadow-md flex items-center justify-center text-xs font-bold text-ink transition-all duration-300 ${
                open ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {it}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 54. Radial Progress Scrubber
export function RadialProgressScrubberPreview() {
  const [val, setVal] = React.useState(75);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setVal(Math.round(50 + Math.sin(t) * 45));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-line/40"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-oxide transition-all duration-75"
            strokeDasharray={`${val}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute font-mono text-xs font-bold text-ink">{val}%</div>
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-1">
        RADIAL SCRUB
      </span>
    </div>
  );
}

// 55. Range Slider Dual Thumbs
export function RangeSliderDualThumbsPreview() {
  const [low, setLow] = React.useState(25);
  const [high, setHigh] = React.useState(75);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setLow(Math.round(20 + Math.sin(t) * 10));
      setHigh(Math.round(80 + Math.cos(t) * 10));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[190px] relative h-2 rounded-full bg-line/50">
        {/* Interval Bar */}
        <div
          className="absolute top-0 bottom-0 bg-ink rounded-full"
          style={{ left: `${low}%`, width: `${high - low}%` }}
        />
        {/* Left Thumb */}
        <div
          className="absolute -top-1.5 w-5 h-5 rounded-full border-2 border-ink bg-paper shadow-md -translate-x-1/2"
          style={{ left: `${low}%` }}
        />
        {/* Right Thumb */}
        <div
          className="absolute -top-1.5 w-5 h-5 rounded-full border-2 border-ink bg-paper shadow-md -translate-x-1/2"
          style={{ left: `${high}%` }}
        />
      </div>
      <div className="flex justify-between w-full max-w-[190px] font-mono text-[9px] text-ink font-bold mt-3">
        <span>${low}k</span>
        <span>${high}k</span>
      </div>
    </div>
  );
}

// ─── Group 7: Elastic, Rubberband & Reveal ───────────────────────────────────

// 56. Rubberband Elastic Sheet
export function RubberbandElasticSheetPreview() {
  const [tension, setTension] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.07;
      setTension(Math.abs(Math.sin(t)) * 28);
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-end select-none bg-paper p-4 overflow-hidden">
      <div
        className="w-full max-w-[200px] mx-auto rounded-t-2xl border-t-2 border-x-2 border-ink bg-paper shadow-xl p-3 flex flex-col items-center transition-transform duration-75"
        style={{ transform: `translateY(${tension}px)` }}
      >
        <div className="w-8 h-1 rounded-full bg-line mb-2" />
        <span className="font-mono text-[9px] font-bold text-ink">SPRING RESISTANCE</span>
        <span className="font-mono text-[8px] text-oxide mt-1">{Math.round(tension * 3)}% STRETCH</span>
      </div>
    </div>
  );
}

// 57. Rubberband Elastic Toggle
export function RubberbandElasticTogglePreview() {
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setToggle((x) => !x), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div
        className={`relative w-16 h-8 rounded-full border-2 border-ink transition-colors duration-300 p-1 flex items-center ${
          toggle ? "bg-ink" : "bg-surface"
        }`}
      >
        <div
          className={`h-6 rounded-full bg-paper shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            toggle ? "w-8 translate-x-6" : "w-6 translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

// 58. Rubberband Pull Refresh
export function RubberbandPullRefreshPreview() {
  const [spin, setSpin] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setSpin((s) => (s + 45) % 360), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div
        className="w-8 h-8 rounded-full border-2 border-oxide/40 border-t-oxide flex items-center justify-center shadow-md transition-transform"
        style={{ transform: `rotate(${spin}deg)` }}
      />
      <span className="font-mono text-[8px] uppercase tracking-widest text-oxide font-bold mt-2.5">
        PULL TO REFRESH
      </span>
    </div>
  );
}

// 59. Scratch to Reveal Card
export function ScratchToRevealCardPreview() {
  const [scratched, setScratched] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setScratched((s) => !s), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-44 h-22 rounded-xl border border-line bg-paper shadow-md overflow-hidden flex items-center justify-center text-center p-2">
        {/* Hidden prize code */}
        <div>
          <span className="font-mono text-[8px] text-graphite uppercase block">SECRET ACCESS CODE</span>
          <span className="font-mono text-sm font-black text-ink">VIP-ALPHA-99</span>
        </div>

        {/* Metallic Foil Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500 flex items-center justify-center text-[9px] font-mono font-bold text-zinc-800 transition-opacity duration-500 ${
            scratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          SCRATCH TO REVEAL
        </div>
      </div>
    </div>
  );
}

// 60. Scroll Spy Table of Contents
export function ScrollSpyTableOfContentsPreview() {
  const [activeItem, setActiveItem] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActiveItem((a) => (a + 1) % 3), 1100);
    return () => clearInterval(t);
  }, []);

  const items = ["Introduction", "Architecture", "API Reference"];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[190px] border-l-2 border-line/60 pl-3 space-y-2">
        {items.map((it, idx) => (
          <div
            key={it}
            className={`font-mono text-[9px] transition-all duration-200 ${
              idx === activeItem
                ? "font-bold text-oxide -translate-x-3.5 flex items-center gap-1.5"
                : "text-graphite/70"
            }`}
          >
            {idx === activeItem && <span className="w-2 h-2 rounded-full bg-oxide" />}
            <span>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 61. Slider Scrubber Timeline
export function SliderScrubberTimelinePreview() {
  const [time, setTime] = React.useState(45);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setTime(Math.round(50 + Math.sin(t) * 45));
    }, 50);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="w-full max-w-[200px] space-y-2">
        <div className="flex justify-between font-mono text-[9px] text-graphite">
          <span>00:{time < 10 ? `0${time}` : time}</span>
          <span>01:45</span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-line/40 overflow-hidden">
          <div className="h-full bg-oxide rounded-full transition-all duration-75" style={{ width: `${time}%` }} />
        </div>
      </div>
    </div>
  );
}

// 62. Split Pane Resizer
export function SplitPaneResizerPreview() {
  const [split, setSplit] = React.useState(50);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.04;
      setSplit(Math.round(50 + Math.sin(t) * 25));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 overflow-hidden">
      <div className="w-full max-w-[210px] h-20 rounded-xl border border-line overflow-hidden flex shadow-xs">
        <div className="bg-surface/50 flex items-center justify-center font-mono text-[9px] text-ink font-bold" style={{ width: `${split}%` }}>
          P1 · {split}%
        </div>
        <div className="w-1.5 bg-ink cursor-col-resize flex items-center justify-center">
          <div className="w-0.5 h-4 bg-paper rounded-full" />
        </div>
        <div className="bg-paper flex-1 flex items-center justify-center font-mono text-[9px] text-graphite">
          P2 · {100 - split}%
        </div>
      </div>
    </div>
  );
}

// 63. Stepped Number Scrubber
export function SteppedNumberScrubberPreview() {
  const [num, setNum] = React.useState(1250);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setNum(Math.round(1250 + Math.sin(t) * 400));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-paper p-4">
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-line bg-paper shadow-xs font-mono">
        <span className="text-graphite text-xs">◀</span>
        <span className="font-bold text-sm text-ink">{num.toLocaleString()}</span>
        <span className="text-graphite text-xs">▶</span>
      </div>
      <span className="font-mono text-[8px] uppercase tracking-widest text-graphite mt-2">
        DRAG TO SCRUB
      </span>
    </div>
  );
}

// 64. Stepped Timeline Milestones
export function SteppedTimelineMilestonesPreview() {
  const [activeNode, setActiveNode] = React.useState(1);

  React.useEffect(() => {
    const t = setInterval(() => setActiveNode((n) => (n + 1) % 4), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="flex items-center">
        {[0, 1, 2, 3].map((node, idx) => (
          <React.Fragment key={node}>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[8px] font-bold transition-all ${
                node <= activeNode
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-xs scale-105"
                  : "border-line bg-paper text-graphite"
              }`}
            >
              M{node + 1}
            </div>
            {idx < 3 && (
              <div
                className={`w-6 h-0.5 transition-colors ${
                  node < activeNode ? "bg-emerald-500" : "bg-line"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// 65. Swipe Action Cell
export function SwipeActionCellPreview() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-full max-w-[200px] h-12 rounded-xl border border-line bg-paper shadow-xs overflow-hidden">
        <div className="absolute inset-y-0 right-0 flex">
          <div className="w-12 bg-red-500 text-white flex items-center justify-center text-[9px] font-bold">
            TRASH
          </div>
        </div>
        <div
          className={`absolute inset-0 bg-paper p-2.5 flex items-center justify-between transition-transform duration-300 ${
            open ? "-translate-x-12" : "translate-x-0"
          }`}
        >
          <span className="font-mono text-[9px] font-bold text-ink">Notification Alert</span>
          <span className="text-[10px] text-graphite">‹ swipe</span>
        </div>
      </div>
    </div>
  );
}

// 66. Swipe to Confirm Slider
export function SwipeToConfirmSliderPreview() {
  const [slide, setSlide] = React.useState(0);

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setSlide(Math.max(0, Math.sin(t) * 110));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div className="relative w-44 h-10 rounded-full border border-line/60 bg-surface/50 p-1 flex items-center">
        <div
          className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-xs font-bold shadow-md transition-transform duration-75"
          style={{ transform: `translateX(${slide}px)` }}
        >
          »
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-widest text-graphite pointer-events-none">
          SLIDE TO COMMIT
        </span>
      </div>
    </div>
  );
}

// 67. Tilt Depth Badge
export function TiltDepthBadgePreview() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setTilt({ x: Math.sin(t) * 18, y: Math.cos(t) * 15 });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 [perspective:500px]">
      <div
        className="px-5 py-2 rounded-2xl border-2 border-ink bg-ink text-paper font-mono text-xs font-bold shadow-xl transition-transform duration-75"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        ✦ VERIFIED 3D CHIP
      </div>
    </div>
  );
}

// 68. Tilt Parallax Button
export function TiltParallaxButtonPreview() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.06;
      setTilt({ x: Math.cos(t) * 14, y: Math.sin(t) * 14 });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4 [perspective:400px]">
      <div
        className="px-6 py-2.5 rounded-xl border-2 border-oxide bg-gradient-to-r from-oxide to-amber-600 text-paper font-mono text-xs font-bold shadow-lg transition-transform duration-75"
        style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        TILT PERSPECTIVE
      </div>
    </div>
  );
}

// 69. Tilt Parallax Scene
export function TiltParallaxScenePreview() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let t = 0;
    const loop = setInterval(() => {
      t += 0.05;
      setPos({ x: Math.sin(t) * 12, y: Math.cos(t) * 8 });
    }, 40);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-[#0b0c10] p-4 overflow-hidden">
      <div className="relative w-40 h-24 rounded-xl border border-white/10 bg-[#12141c] overflow-hidden flex items-center justify-center">
        {/* Layer 1 (Stars/Back) */}
        <div
          className="absolute text-white/20 text-xs transition-transform duration-75"
          style={{ transform: `translate(${pos.x * 0.5}px, ${pos.y * 0.5}px)` }}
        >
          ✦ · ✦ · ✦
        </div>
        {/* Layer 2 (Middle Shape) */}
        <div
          className="absolute w-12 h-12 rounded-xl border-2 border-cyan-500/50 bg-cyan-950/30 transition-transform duration-75"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        />
        {/* Layer 3 (Foreground Pill) */}
        <div
          className="relative z-10 px-3 py-1 rounded-full bg-cyan-400 text-black font-mono text-[8px] font-bold shadow-lg transition-transform duration-75"
          style={{ transform: `translate(${pos.x * 1.5}px, ${pos.y * 1.5}px)` }}
        >
          3D DIORAMA
        </div>
      </div>
    </div>
  );
}

// 70. Toggle Switch Morph
export function ToggleSwitchMorphPreview() {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => !a), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div
        className={`relative w-16 h-8 rounded-full border border-line p-1 transition-colors duration-200 ${
          active ? "bg-ink border-ink" : "bg-line/30"
        }`}
      >
        <div
          className={`h-6 rounded-full bg-paper shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            active ? "w-8 translate-x-6" : "w-6 translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

// 71. Zoomable Image Lightbox
export function ZoomableImageLightboxPreview() {
  const [zoomed, setZoomed] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setZoomed((z) => !z), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-paper p-4">
      <div
        className={`rounded-xl border border-line bg-paper shadow-md overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${
          zoomed ? "w-44 h-24 scale-105 z-20 ring-2 ring-ink" : "w-32 h-18 scale-95"
        }`}
      >
        <span className="text-sm">🔍</span>
        <span className="font-mono text-[8px] font-bold text-ink mt-1">
          {zoomed ? "LIGHTBOX ACTIVE" : "CLICK TO EXPAND"}
        </span>
      </div>
    </div>
  );
}

export const CATALOGUE_INTERACTIONS_PREVIEWS: Record<string, React.ComponentType> = {
  "directional-pan-pad": DirectionalPanPadPreview,
  "directional-scroll-indicator": DirectionalScrollIndicatorPreview,
  "dockable-sheet-drawer": DockableSheetDrawerPreview,
  "elastic-pull-card": ElasticPullCardPreview,
  "fluid-gesture-drawer-pull": FluidGestureDrawerPullPreview,
  "follow-path-cursor": FollowPathCursorPreview,
  "gesture-swipe-action-list": GestureSwipeActionListPreview,
  "gesture-swipe-carousel": GestureSwipeCarouselPreview,
  "gesture-swipe-dismiss-banner": GestureSwipeDismissBannerPreview,
  "hover-card-preview-stack": HoverCardPreviewStackPreview,
  "hover-expand-accordion-row": HoverExpandAccordionRowPreview,
  "hover-glare-card": HoverGlareCardPreview,
  "hover-glitch-displacement": HoverGlitchDisplacementPreview,
  "hover-glitch-text-reveal": HoverGlitchTextRevealPreview,
  "hover-image-zoom-crosshair": HoverImageZoomCrosshairPreview,
  "hover-lens-magnifier": HoverLensMagnifierPreview,
  "hover-magnetic-pill": HoverMagneticPillPreview,
  "hover-magnify-dock": HoverMagnifyDockPreview,
  "hover-parallax-typography": HoverParallaxTypographyPreview,
  "hover-reveal-matrix": HoverRevealMatrixPreview,
  "hover-spotlight-card": HoverSpotlightCardPreview,
  "interactive-code-fold": InteractiveCodeFoldPreview,
  "interactive-color-palette-bar": InteractiveColorPaletteBarPreview,
  "interactive-diff-slider": InteractiveDiffSliderPreview,
  "interactive-matrix-keypad": InteractiveMatrixKeypadPreview,
  "interactive-matrix-toggle": InteractiveMatrixTogglePreview,
  "interactive-radar-chart": InteractiveRadarChartPreview,
  "interactive-range-gauge": InteractiveRangeGaugePreview,
  "interactive-segment-tabs": InteractiveSegmentTabsPreview,
  "interactive-star-rating": InteractiveStarRatingPreview,
  "interactive-stepper-flow": InteractiveStepperFlowPreview,
  "joystick-control-pad": JoystickControlPadPreview,
  "keyboard-command-palette-menu": KeyboardCommandPaletteMenuPreview,
  "keyboard-focus-trap-modal": KeyboardFocusTrapModalPreview,
  "keyboard-list-navigation": KeyboardListNavigationPreview,
  "keyboard-shortcut-matrix": KeyboardShortcutMatrixPreview,
  "keyboard-spatial-grid": KeyboardSpatialGridPreview,
  "keyboard-stepper-numeric": KeyboardStepperNumericPreview,
  "keyboard-tab-navigator": KeyboardTabNavigatorPreview,
  "kinetic-flick-carousel": KineticFlickCarouselPreview,
  "kinetic-pan-canvas": KineticPanCanvasPreview,
  "lasso-select-box": LassoSelectBoxPreview,
  "magnetic-cursor-bubble": MagneticCursorBubblePreview,
  "magnetic-item-grid": MagneticItemGridPreview,
  "multi-choice-tag-cloud": MultiChoiceTagCloudPreview,
  "multi-select-checkbox-tree": MultiSelectCheckboxTreePreview,
  "multi-target-focus-ring": MultiTargetFocusRingPreview,
  "pinch-zoom-card": PinchZoomCardPreview,
  "pinch-zoom-viewport": PinchZoomViewportPreview,
  "pointer-angle-compass": PointerAngleCompassPreview,
  "pointer-draw-canvas": PointerDrawCanvasPreview,
  "press-and-hold-button": PressAndHoldButtonPreview,
  "radial-context-menu": RadialContextMenuPreview,
  "radial-progress-scrubber": RadialProgressScrubberPreview,
  "range-slider-dual-thumbs": RangeSliderDualThumbsPreview,
  "rubberband-elastic-sheet": RubberbandElasticSheetPreview,
  "rubberband-elastic-toggle": RubberbandElasticTogglePreview,
  "rubberband-pull-refresh": RubberbandPullRefreshPreview,
  "scratch-to-reveal-card": ScratchToRevealCardPreview,
  "scroll-spy-table-of-contents": ScrollSpyTableOfContentsPreview,
  "slider-scrubber-timeline": SliderScrubberTimelinePreview,
  "split-pane-resizer": SplitPaneResizerPreview,
  "stepped-number-scrubber": SteppedNumberScrubberPreview,
  "stepped-timeline-milestones": SteppedTimelineMilestonesPreview,
  "swipe-action-cell": SwipeActionCellPreview,
  "swipe-to-confirm-slider": SwipeToConfirmSliderPreview,
  "tilt-depth-badge": TiltDepthBadgePreview,
  "tilt-parallax-button": TiltParallaxButtonPreview,
  "tilt-parallax-scene": TiltParallaxScenePreview,
  "toggle-switch-morph": ToggleSwitchMorphPreview,
  "zoomable-image-lightbox": ZoomableImageLightboxPreview,
};
