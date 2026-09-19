/**
 * UniqueFingerprint – Unique source-code implementations for all 70
 * UI Elements (Interactions) advanced components.
 * Each entry maps slug → complete React component source string.
 */

export const UI_ELEMENT_SOURCE_CODES: Record<string, string> = {
  "infinite-spiral-canvas": `"use client";
import { useEffect, useRef } from "react";
export interface InfiniteSpiralCanvasProps { className?: string; speed?: number; color?: string; }
export function InfiniteSpiralCanvas({ className = "w-full h-full min-h-[320px] bg-[#080a0f] overflow-hidden", speed = 0.4, color = "#ba442c" }: InfiniteSpiralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext("2d")!; let animId: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    function draw() {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "rgba(8,10,15,0.12)"; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, turns = 8, maxR = Math.min(w, h) * 0.48;
      for (let i = 0; i < 360; i++) {
        const angle = (i / 360) * Math.PI * 2 * turns + t;
        const r = (i / 360) * maxR;
        ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 1 + 3 * (i / 360), 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor((0.3 + 0.7 * (i / 360)) * 255).toString(16).padStart(2, "0"); ctx.fill();
      }
      t += 0.008 * speed; animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [speed, color]);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}`,

  "accordion-gallery-split": `"use client";
import { useState } from "react";
const PANELS = [{ id: 0, label: "Editorial", bg: "#ba442c20" }, { id: 1, label: "Spatial", bg: "#2a3a5020" }, { id: 2, label: "Systems", bg: "#1a3a2a20" }, { id: 3, label: "Motion", bg: "#3a2a4020" }];
export interface AccordionGallerySplitProps { className?: string; }
export function AccordionGallerySplit({ className = "" }: AccordionGallerySplitProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className={\`flex h-48 w-full overflow-hidden rounded-2xl border border-[#2a2a2a] \${className}\`}>
      {PANELS.map((panel) => (
        <div key={panel.id} onMouseEnter={() => setHovered(panel.id)} onMouseLeave={() => setHovered(null)}
          style={{ flex: hovered === panel.id ? "3 0 0" : "1 0 0", background: panel.bg, borderRight: "1px solid #2a2a2a", transition: "flex 0.5s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden" }}
          className="flex items-end pb-4 px-3 cursor-pointer">
          <span className="font-mono text-xs font-bold whitespace-nowrap" style={{ color: hovered === panel.id ? "#ba442c" : "#444", transition: "color 0.3s" }}>{panel.label}</span>
        </div>
      ))}
    </div>
  );
}`,

  "pill-nav-float": `"use client";
import { useState } from "react";
const TABS = ["Home", "Motion", "Canvas", "Systems"];
export interface PillNavFloatProps { className?: string; onTab?: (t: string) => void; }
export function PillNavFloat({ className = "", onTab }: PillNavFloatProps) {
  const [active, setActive] = useState(0);
  return (
    <div className={\`flex items-center gap-1 p-1.5 rounded-full relative \${className}\`}
      style={{ backdropFilter: "blur(16px)", background: "rgba(13,15,20,0.85)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <div className="absolute rounded-full bg-[#ba442c] transition-all duration-300"
        style={{ height: "calc(100% - 12px)", width: \`calc(\${100 / TABS.length}% - 6px)\`, left: \`calc(\${active * (100 / TABS.length)}% + 6px)\`, top: 6 }} />
      {TABS.map((tab, i) => (
        <button key={tab} onClick={() => { setActive(i); onTab?.(tab); }}
          className="relative z-10 px-4 py-1.5 rounded-full font-mono text-xs transition-colors"
          style={{ color: active === i ? "white" : "#666" }}>{tab}</button>
      ))}
    </div>
  );
}`,

  "magic-bento-spotlight": `"use client";
import { useRef, useState } from "react";
const CELLS = [{ id: 0, label: "Components", size: "col-span-2 row-span-2" }, { id: 1, label: "Motion", size: "" }, { id: 2, label: "Canvas", size: "" }, { id: 3, label: "Tokens", size: "" }, { id: 4, label: "Systems", size: "" }, { id: 5, label: "Registry", size: "col-span-2" }];
export interface MagicBentoSpotlightProps { className?: string; }
export function MagicBentoSpotlight({ className = "" }: MagicBentoSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });
  return (
    <div ref={containerRef} onMouseMove={(e) => { const r = containerRef.current!.getBoundingClientRect(); setSpotlight({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, visible: false }))}
      className={\`relative grid grid-cols-4 gap-2 p-2 rounded-2xl bg-[#080a0f] overflow-hidden \${className}\`}>
      {spotlight.visible && <div className="pointer-events-none absolute" style={{ left: spotlight.x, top: spotlight.y, width: 200, height: 200, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(186,68,44,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />}
      {CELLS.map((cell) => (<div key={cell.id} className={\`\${cell.size} rounded-xl border border-[#1e1e1e] bg-[#0d0f14] h-24 flex items-end p-3\`}><span className="font-mono text-[9px] text-[#444] uppercase font-bold">{cell.label}</span></div>))}
    </div>
  );
}`,

  "tilted-card-perspective": `"use client";
import { useRef, useState } from "react";
export interface TiltedCardPerspectiveProps { className?: string; title?: string; badge?: string; }
export function TiltedCardPerspective({ className = "", title = "Editorial Future", badge = "ADV" }: TiltedCardPerspectiveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, sx: 0, sy: 0 });
  const move = (e: React.MouseEvent) => { const r = ref.current!.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; setT({ rx: y * -18, ry: x * 18, sx: x * 8, sy: y * 8 }); };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setT({ rx: 0, ry: 0, sx: 0, sy: 0 })}
      style={{ transform: \`perspective(900px) rotateX(\${t.rx}deg) rotateY(\${t.ry}deg)\`, transition: t.rx === 0 ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)" : "transform 0.12s ease" }}
      className={\`relative w-64 h-80 rounded-3xl overflow-hidden cursor-pointer select-none bg-[#0d0f14] border border-[#1e1e1e] \${className}\`}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#ba442c12,transparent)" }} />
      <div className="absolute inset-0 flex flex-col justify-between p-6" style={{ transform: \`translate(\${t.sx}px, \${t.sy}px)\`, transition: "transform 0.15s ease" }}>
        <span className="font-mono text-[9px] text-[#ba442c] uppercase font-bold tracking-widest bg-[#ba442c18] px-2 py-0.5 rounded-full w-fit">{badge}</span>
        <div><h3 className="font-bold text-white text-xl leading-tight">{title}</h3><p className="font-mono text-[10px] text-[#555] mt-1">Pointer-reactive parallax depth layers</p></div>
      </div>
    </div>
  );
}`,

  "bubble-menu-radial": `"use client";
import { useState } from "react";
const ACTIONS = [{ icon: "✦", label: "Add", angle: 270 }, { icon: "◈", label: "Edit", angle: 330 }, { icon: "▦", label: "Grid", angle: 30 }, { icon: "⌘", label: "Cmd", angle: 90 }, { icon: "〰", label: "Anim", angle: 150 }, { icon: "⨀", label: "More", angle: 210 }];
export interface BubbleMenuRadialProps { className?: string; }
export function BubbleMenuRadial({ className = "" }: BubbleMenuRadialProps) {
  const [open, setOpen] = useState(false);
  const R = 80;
  return (
    <div className={\`relative flex items-center justify-center h-64 \${className}\`}>
      {ACTIONS.map((action) => {
        const rad = (action.angle * Math.PI) / 180;
        return (
          <button key={action.label}
            style={{ position: "absolute", transform: \`translate(\${open ? Math.cos(rad) * R : 0}px, \${open ? Math.sin(rad) * R : 0}px)\`, opacity: open ? 1 : 0, scale: open ? "1" : "0.5", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            className="w-10 h-10 rounded-full bg-[#12141a] border border-[#2a2a2a] flex items-center justify-center font-mono text-sm text-[#888] hover:border-[#ba442c] hover:text-[#ba442c] transition-colors">
            {action.icon}
          </button>
        );
      })}
      <button onClick={() => setOpen((o) => !o)} className="relative z-10 w-12 h-12 rounded-full bg-[#ba442c] text-white font-mono text-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform">{open ? "✕" : "+"}</button>
    </div>
  );
}`,

  "reflective-card-foil": `"use client";
import { useRef, useState } from "react";
export interface ReflectiveCardFoilProps { className?: string; title?: string; subtitle?: string; }
export function ReflectiveCardFoil({ className = "", title = "UniqueFingerprint", subtitle = "Advanced Registry" }: ReflectiveCardFoilProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });
  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 20, y: ((e.clientX - r.left) / r.width - 0.5) * -20, mx: ((e.clientX - r.left) / r.width) * 100, my: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div ref={cardRef} onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0, mx: 50, my: 50 })}
      style={{ transform: \`perspective(800px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`, transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s ease" }}
      className={\`relative w-56 h-80 rounded-3xl overflow-hidden cursor-pointer select-none \${className}\`}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1a1025,#0d1a20,#1a0d1a)" }} />
      <div className="absolute inset-0 opacity-60" style={{ background: \`radial-gradient(circle at \${tilt.mx}% \${tilt.my}%, rgba(186,68,44,0.4),rgba(100,50,150,0.3),transparent 60%)\`, mixBlendMode: "screen" }} />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="font-mono text-[9px] uppercase text-[#ba442c] font-bold tracking-widest mb-2">HOLOGRAPHIC FOIL</p>
        <h3 className="font-bold text-white text-lg leading-tight">{title}</h3>
        <p className="font-mono text-[10px] text-[#888] mt-1">{subtitle}</p>
      </div>
    </div>
  );
}`,

  "stack-cards-drag": `"use client";
import { useState } from "react";
const INIT_CARDS = [{ id: 0, text: "Design review at 3pm", color: "#ba442c" }, { id: 1, text: "Canvas engine merged", color: "#2a6040" }, { id: 2, text: "Registry deployed", color: "#2a4060" }];
export interface StackCardsDragProps { className?: string; }
export function StackCardsDrag({ className = "" }: StackCardsDragProps) {
  const [cards, setCards] = useState(INIT_CARDS);
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div className="relative w-72 h-40">
        {cards.map((card, i) => (
          <div key={card.id} style={{ position: "absolute", inset: 0, transform: \`translateY(\${i * -6}px) scale(\${1 - i * 0.03})\`, zIndex: cards.length - i, background: card.color + "18", border: \`1px solid \${card.color}44\`, transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }} className="rounded-2xl p-5 flex items-end">
            <p className="font-mono text-xs text-[#aaa]">{card.text}</p>
          </div>
        ))}
        {cards.length === 0 && <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-[#2a2a2a]"><span className="font-mono text-xs text-[#333]">Stack empty</span></div>}
      </div>
      <div className="flex gap-3">
        {cards.length > 0 && <button onClick={() => setCards((c) => c.slice(1))} className="px-4 py-1.5 rounded-lg bg-[#ba442c] text-white font-mono text-xs">Dismiss →</button>}
        {cards.length === 0 && <button onClick={() => setCards(INIT_CARDS)} className="px-4 py-1.5 rounded-lg border border-[#2a2a2a] text-[#888] font-mono text-xs hover:border-[#ba442c] hover:text-[#ba442c] transition-colors">Reset</button>}
      </div>
    </div>
  );
}`,

  "animated-list-stagger": `"use client";
import { useEffect, useState } from "react";
const TASKS = ["Design tokens finalized", "Motion spec approved", "Canvas engine v2 shipped", "Registry deployed", "CLI published"];
export interface AnimatedListStaggerProps { className?: string; }
export function AnimatedListStagger({ className = "" }: AnimatedListStaggerProps) {
  const [visible, setVisible] = useState<number[]>([]);
  useEffect(() => { TASKS.forEach((_, i) => setTimeout(() => setVisible((v) => [...v, i]), i * 120)); }, []);
  return (
    <ul className={\`flex flex-col gap-2 \${className}\`}>
      {TASKS.map((task, i) => (
        <li key={i} style={{ opacity: visible.includes(i) ? 1 : 0, transform: visible.includes(i) ? "translateY(0)" : "translateY(16px)", transition: \`opacity 0.4s \${i * 0.05}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) \${i * 0.05}s\` }}
          className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#1e1e1e] bg-[#0d0f14]">
          <span className="font-mono text-xs text-[#aaa]">{task}</span>
          <button onClick={() => setVisible((v) => v.filter((x) => x !== i))} className="text-[#333] hover:text-[#ba442c] font-mono text-xs transition-colors">✕</button>
        </li>
      ))}
    </ul>
  );
}`,

  "interactive-dock-magnify": `"use client";
import { useState } from "react";
const DOCK = ["⌘", "◈", "▦", "⨀", "〰", "✦", "T"];
export interface InteractiveDockMagnifyProps { className?: string; }
export function InteractiveDockMagnify({ className = "" }: InteractiveDockMagnifyProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const getScale = (i: number) => hovered === null ? 1 : Math.max(1, 1.8 - Math.abs(i - hovered) * 0.4);
  return (
    <div className={\`flex items-end justify-center gap-2 px-4 py-3 rounded-2xl \${className}\`}
      style={{ background: "rgba(13,15,20,0.8)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)" }}>
      {DOCK.map((icon, i) => (
        <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          style={{ transform: \`scale(\${getScale(i)})\`, transformOrigin: "bottom center", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)" }}
          className="w-10 h-10 rounded-xl bg-[#1a1a2a] border border-[#2a2a2a] flex items-center justify-center font-mono text-sm text-[#888] hover:text-[#ba442c] hover:border-[#ba442c] transition-colors">
          {icon}
        </button>
      ))}
    </div>
  );
}`,

  "kinetic-carousel-swipe": `"use client";
import { useRef, useState } from "react";
const SLIDES = [{ label: "Editorial", desc: "Typography-first layouts" }, { label: "Spatial", desc: "Three.js 3D scenes" }, { label: "Canvas", desc: "Procedural 2D engines" }, { label: "Systems", desc: "Design token architecture" }];
export interface KineticCarouselSwipeProps { className?: string; }
export function KineticCarouselSwipe({ className = "" }: KineticCarouselSwipeProps) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  return (
    <div className={\`flex flex-col gap-4 \${className}\`}>
      <div className="overflow-hidden rounded-2xl cursor-grab"
        onPointerDown={(e) => { startX.current = e.clientX; dragging.current = true; }}
        onPointerUp={(e) => { if (!dragging.current) return; dragging.current = false; const dx = e.clientX - startX.current; if (dx < -40) setIdx((i) => Math.min(i + 1, SLIDES.length - 1)); if (dx > 40) setIdx((i) => Math.max(i - 1, 0)); }}>
        <div style={{ display: "flex", transform: \`translateX(-\${idx * 100}%)\`, transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
          {SLIDES.map((slide, i) => (
            <div key={i} className="min-w-full h-40 bg-[#0d0f14] border border-[#1e1e1e] flex flex-col justify-end p-6">
              <p className="font-mono text-[9px] text-[#ba442c] uppercase font-bold">{slide.label}</p>
              <p className="font-bold text-white text-lg mt-1">{slide.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {SLIDES.map((_, i) => <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === idx ? "#ba442c" : "#2a2a2a", transform: i === idx ? "scale(1.3)" : "none" }} />)}
      </div>
    </div>
  );
}`,

  "spotlight-card-interactive": `"use client";
import { useRef, useState } from "react";
export interface SpotlightCardInteractiveProps { className?: string; title?: string; description?: string; }
export function SpotlightCardInteractive({ className = "", title = "Spotlight Card", description = "Move cursor over card to reveal the internal gradient border." }: SpotlightCardInteractiveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });
  return (
    <div ref={ref} onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
      onMouseLeave={() => setSpot((s) => ({ ...s, visible: false }))}
      className={\`relative overflow-hidden w-72 rounded-2xl p-6 bg-[#0d0f14] \${className}\`} style={{ border: "1px solid #1e1e1e" }}>
      {spot.visible && <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: \`radial-gradient(200px at \${spot.x}px \${spot.y}px, rgba(186,68,44,0.1), transparent)\` }} />}
      <h3 className="font-bold text-white text-base">{title}</h3>
      <p className="font-mono text-[10px] text-[#555] mt-2 leading-relaxed">{description}</p>
    </div>
  );
}`,

  "border-glow-card-pulse": `"use client";
import { useEffect, useState } from "react";
export interface BorderGlowCardPulseProps { className?: string; title?: string; }
export function BorderGlowCardPulse({ className = "", title = "Design System" }: BorderGlowCardPulseProps) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => { let t = 0; const id = setInterval(() => { t += 0.05; setPulse(Math.sin(t) * 0.5 + 0.5); }, 16); return () => clearInterval(id); }, []);
  return (
    <div className={\`relative w-64 rounded-2xl p-6 bg-[#0d0f14] overflow-hidden \${className}\`}
      style={{ border: \`1px solid rgba(186,68,44,\${0.2 + pulse * 0.6})\`, boxShadow: \`0 0 \${20 + pulse * 20}px rgba(186,68,44,\${0.2 + pulse * 0.3})\` }}>
      <p className="font-mono text-[9px] text-[#ba442c] uppercase font-bold tracking-widest mb-3">AMBIENT GLOW</p>
      <h3 className="font-bold text-white text-base">{title}</h3>
      <div className="mt-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ba442c] animate-pulse" /><span className="font-mono text-[10px] text-[#555]">Breathing pulse active</span></div>
    </div>
  );
}`,

  "decay-card-friction": `"use client";
import { useEffect, useRef, useState } from "react";
export interface DecayCardFrictionProps { className?: string; }
export function DecayCardFriction({ className = "" }: DecayCardFrictionProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 }); const lastPos = useRef({ x: 0, y: 0 }); const dragging = useRef(false); const animRef = useRef<number>();
  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);
  return (
    <div className={\`relative h-48 w-full overflow-hidden rounded-2xl bg-[#080a0f] border border-[#1e1e1e] \${className}\`}>
      <div
        onPointerDown={(e) => { dragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY }; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!dragging.current) return; vel.current = { x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y }; lastPos.current = { x: e.clientX, y: e.clientY }; setPos((p) => ({ x: p.x + vel.current.x, y: p.y + vel.current.y })); }}
        onPointerUp={() => { dragging.current = false; const decay = () => { vel.current = { x: vel.current.x * 0.88, y: vel.current.y * 0.88 }; if (Math.abs(vel.current.x) < 0.1 && Math.abs(vel.current.y) < 0.1) return; setPos((p) => ({ x: p.x + vel.current.x, y: p.y + vel.current.y })); animRef.current = requestAnimationFrame(decay); }; animRef.current = requestAnimationFrame(decay); }}
        style={{ transform: \`translate(\${pos.x}px, \${pos.y}px)\`, cursor: "grab", position: "absolute", top: 32, left: 32 }}
        className="w-36 h-24 bg-[#0d0f14] border border-[#ba442c44] rounded-xl select-none flex items-center justify-center">
        <div className="text-center"><span className="font-mono text-[9px] text-[#ba442c] font-bold">DRAG ME</span><p className="font-mono text-[8px] text-[#333] mt-1">friction decay</p></div>
      </div>
    </div>
  );
}`,

  "rolling-counter-digits": `"use client";
import { useState } from "react";
function Digit({ value }: { value: number }) {
  return (
    <div className="relative h-10 w-7 overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="absolute w-full h-10 flex items-center justify-center font-mono font-bold text-xl text-white"
          style={{ top: \`\${(i - value) * 40}px\`, transition: "top 0.4s cubic-bezier(0.16,1,0.3,1)" }}>{i}</div>
      ))}
    </div>
  );
}
export interface RollingCounterDigitsProps { className?: string; initialValue?: number; }
export function RollingCounterDigits({ className = "", initialValue = 0 }: RollingCounterDigitsProps) {
  const [count, setCount] = useState(initialValue);
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div className="flex items-center gap-0.5 bg-[#0d0f14] border border-[#1e1e1e] rounded-xl px-4 py-2 overflow-hidden">
        {String(count).padStart(5, "0").split("").map((d, i) => <Digit key={i} value={parseInt(d)} />)}
      </div>
      <div className="flex gap-3">
        <button onClick={() => setCount((c) => Math.max(0, c - 1))} className="w-10 h-10 rounded-xl bg-[#0d0f14] border border-[#1e1e1e] font-mono text-white hover:border-[#ba442c] hover:text-[#ba442c] transition-colors">−</button>
        <button onClick={() => setCount((c) => c + 1)} className="w-10 h-10 rounded-xl bg-[#ba442c] text-white font-mono font-bold hover:bg-[#c84830] transition-colors">+</button>
      </div>
    </div>
  );
}`,

  "refine-frame-slider": `"use client";
import { useRef, useState } from "react";
export interface RefineFrameSliderProps { className?: string; beforeLabel?: string; afterLabel?: string; }
export function RefineFrameSlider({ className = "", beforeLabel = "Before", afterLabel = "After" }: RefineFrameSliderProps) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => { const r = ref.current!.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))); };
  return (
    <div ref={ref} onMouseMove={move} className={\`relative overflow-hidden rounded-2xl cursor-ew-resize \${className}\`} style={{ height: 200 }}>
      <div className="absolute inset-0 bg-[#1a0d0d] flex items-center justify-center"><div className="w-full h-full" style={{ background: "radial-gradient(circle at 30% 50%, #ba442c33, transparent)" }} /><span className="absolute font-mono text-[10px] text-[#ba442c44] font-bold">{beforeLabel}</span></div>
      <div className="absolute inset-0 bg-[#0d1a0d] flex items-center justify-center" style={{ clipPath: \`inset(0 \${100 - pos}% 0 0)\` }}><div className="w-full h-full" style={{ background: "radial-gradient(circle at 70% 50%, #2a604033, transparent)" }} /><span className="absolute font-mono text-[10px] text-[#2a604044] font-bold">{afterLabel}</span></div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80 pointer-events-none" style={{ left: \`\${pos}%\` }}><div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"><span className="font-mono text-[8px] text-black">⇆</span></div></div>
    </div>
  );
}`,

  "voice-pill-waveform": `"use client";
import { useEffect, useState } from "react";
export interface VoicePillWaveformProps { className?: string; active?: boolean; }
export function VoicePillWaveform({ className = "", active: initialActive = false }: VoicePillWaveformProps) {
  const [active, setActive] = useState(initialActive);
  const [bars, setBars] = useState(Array.from({ length: 20 }, () => 0.2));
  useEffect(() => { if (!active) { setBars(Array.from({ length: 20 }, () => 0.2)); return; } const id = setInterval(() => setBars(Array.from({ length: 20 }, () => 0.2 + Math.random() * 0.8)), 80); return () => clearInterval(id); }, [active]);
  return (
    <div onClick={() => setActive((a) => !a)} className={\`flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer select-none \${className}\`}
      style={{ background: active ? "#ba442c18" : "#0d0f14", border: \`1px solid \${active ? "#ba442c44" : "#1e1e1e"}\`, transition: "all 0.3s ease" }}>
      <div className="w-2 h-2 rounded-full" style={{ background: active ? "#ba442c" : "#333" }} />
      <div className="flex items-center gap-0.5 h-6">
        {bars.map((h, i) => <div key={i} className="w-0.5 rounded-full" style={{ height: \`\${h * 100}%\`, background: active ? "#ba442c" : "#2a2a2a", transition: active ? "height 0.08s ease" : "height 0.3s ease" }} />)}
      </div>
      <span className="font-mono text-[9px] font-bold" style={{ color: active ? "#ba442c" : "#444" }}>{active ? "LIVE" : "TAP"}</span>
    </div>
  );
}`,

  "swipe-toast-dismiss": `"use client";
import { useState } from "react";
type Toast = { id: number; message: string; type: "info" | "success" | "error" };
export interface SwipeToastDismissProps { className?: string; }
export function SwipeToastDismiss({ className = "" }: SwipeToastDismissProps) {
  const [toasts, setToasts] = useState<Toast[]>([]); const [dismissing, setDismissing] = useState<number[]>([]); let nextId = 0;
  const addToast = (type: Toast["type"]) => { const msgs = { info: "Registry synced", success: "Component published ✓", error: "Build failed — check logs" }; setToasts((t) => [...t, { id: ++nextId, message: msgs[type], type }]); };
  const dismiss = (id: number) => { setDismissing((d) => [...d, id]); setTimeout(() => { setToasts((t) => t.filter((x) => x.id !== id)); setDismissing((d) => d.filter((x) => x !== id)); }, 300); };
  const colors = { info: "#2a4060", success: "#1a3020", error: "#3a1010" };
  return (
    <div className={\`flex flex-col gap-4 \${className}\`}>
      <div className="flex gap-2">{(["info", "success", "error"] as const).map((t) => <button key={t} onClick={() => addToast(t)} className="px-3 py-1.5 rounded-xl font-mono text-[9px] border border-[#1e1e1e] text-[#666] hover:text-white hover:border-[#ba442c] transition-colors capitalize">{t}</button>)}</div>
      <div className="flex flex-col gap-2 min-h-[80px]">
        {toasts.map((toast) => (
          <div key={toast.id} style={{ background: colors[toast.type], border: \`1px solid \${colors[toast.type]}44\`, transform: dismissing.includes(toast.id) ? "translateX(120%)" : "translateX(0)", opacity: dismissing.includes(toast.id) ? 0 : 1, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }} className="flex items-center justify-between px-4 py-3 rounded-xl">
            <span className="font-mono text-xs text-[#aaa]">{toast.message}</span>
            <button onClick={() => dismiss(toast.id)} className="font-mono text-[10px] text-[#555] hover:text-white ml-4 transition-colors">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  "code-slots-reveal": `"use client";
import { useRef, useState } from "react";
export interface CodeSlotsRevealProps { className?: string; length?: number; onComplete?: (code: string) => void; }
export function CodeSlotsReveal({ className = "", length = 6, onComplete }: CodeSlotsRevealProps) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") { if (!values[i] && i > 0) inputRefs.current[i - 1]?.focus(); setValues((v) => { const n = [...v]; n[i] = ""; return n; }); return; }
    if (!/\d/.test(e.key)) return;
    const n = [...values]; n[i] = e.key; setValues(n);
    if (i < length - 1) inputRefs.current[i + 1]?.focus();
    if (i === length - 1) onComplete?.(n.join(""));
  };
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <p className="font-mono text-[9px] text-[#555] uppercase font-bold">Enter verification code</p>
      <div className="flex gap-2">
        {values.map((val, i) => (
          <input key={i} ref={(el) => { if (el) inputRefs.current[i] = el; }} value={val} onKeyDown={(e) => handleKey(i, e)} readOnly maxLength={1}
            className="w-10 h-12 rounded-xl text-center font-mono font-bold text-base bg-[#0d0f14] outline-none caret-transparent cursor-default transition-all"
            style={{ border: \`1.5px solid \${val ? "#ba442c" : "#1e1e1e"}\`, color: "white", transform: val ? "scale(1.05)" : "none", boxShadow: val ? "0 0 8px rgba(186,68,44,0.3)" : "none" }} />
        ))}
      </div>
      <button onClick={() => { setValues(Array(length).fill("")); inputRefs.current[0]?.focus(); }} className="font-mono text-[9px] text-[#333] hover:text-[#ba442c] transition-colors">Clear</button>
    </div>
  );
}`,

  "lattice-loader-orbit": `"use client";
export interface LatticeLoaderOrbitProps { className?: string; size?: number; }
export function LatticeLoaderOrbit({ className = "", size = 80 }: LatticeLoaderOrbitProps) {
  return (
    <div className={\`flex items-center justify-center \${className}\`}>
      <div style={{ width: size, height: size, position: "relative" }}>
        <style>{\`@keyframes orbitA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes orbitB{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}} @keyframes pulsate{0%,100%{opacity:0.4;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}\`}</style>
        <div style={{ position: "absolute", inset: 0, border: "1.5px solid #ba442c44", borderRadius: "50%", animation: "orbitA 3s linear infinite" }}><div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#ba442c" }} /></div>
        <div style={{ position: "absolute", inset: "15%", border: "1.5px solid #ba442c66", borderRadius: "50%", animation: "orbitB 2s linear infinite" }}><div style={{ position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#ba442c" }} /></div>
        <div style={{ position: "absolute", inset: "35%", borderRadius: "50%", background: "#ba442c", animation: "pulsate 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}`,

  "comet-dial-gauge": `"use client";
import { useEffect, useRef, useState } from "react";
export interface CometDialGaugeProps { className?: string; value?: number; label?: string; }
export function CometDialGauge({ className = "", value = 72, label = "Performance" }: CometDialGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext("2d")!; let animId: number;
    let angle = -Math.PI * 0.8; const targetAngle = -Math.PI * 0.8 + (current / 100) * Math.PI * 1.6;
    const draw = () => {
      const s = canvas.width; ctx.clearRect(0, 0, s, s); const cx = s / 2, cy = s / 2, r = s * 0.38;
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 10; ctx.lineCap = "round"; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI * 0.8, Math.PI * 0.8); ctx.stroke();
      ctx.strokeStyle = "#ba442c"; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI * 0.8, angle); ctx.stroke();
      const tx = cx + Math.cos(angle) * r, ty = cy + Math.sin(angle) * r;
      const grd = ctx.createRadialGradient(tx, ty, 0, tx, ty, 20); grd.addColorStop(0, "rgba(186,68,44,0.8)"); grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(tx, ty, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffffff"; ctx.font = \`bold \${s * 0.18}px monospace\`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(\`\${current}\`, cx, cy);
      if (Math.abs(angle - targetAngle) > 0.01) { angle += (targetAngle - angle) * 0.06; animId = requestAnimationFrame(draw); }
    };
    draw(); return () => cancelAnimationFrame(animId);
  }, [current]);
  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <canvas ref={canvasRef} width={160} height={160} className="w-40 h-40" />
      <div className="flex flex-col items-center gap-1"><span className="font-mono text-[9px] text-[#555] uppercase">{label}</span><input type="range" min={0} max={100} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="w-32 accent-[#ba442c]" /></div>
    </div>
  );
}`,

  "scrub-field-timeline": `"use client";
import { useRef, useState } from "react";
const BARS = Array.from({ length: 40 }, () => 0.2 + Math.random() * 0.8);
export interface ScrubFieldTimelineProps { className?: string; duration?: number; }
export function ScrubFieldTimeline({ className = "", duration = 180 }: ScrubFieldTimelineProps) {
  const [progress, setProgress] = useState(0.3);
  const trackRef = useRef<HTMLDivElement>(null);
  const fmt = (s: number) => \`\${String(Math.floor(s / 60)).padStart(2, "0")}:\${String(Math.floor(s % 60)).padStart(2, "0")}\`;
  const move = (e: React.PointerEvent) => { const r = trackRef.current!.getBoundingClientRect(); setProgress(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))); };
  return (
    <div className={\`flex flex-col gap-3 \${className}\`}>
      <div ref={trackRef} onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); move(e); }} onPointerMove={(e) => { if (e.buttons) move(e); }} className="relative h-12 flex items-center cursor-ew-resize gap-0.5">
        {BARS.map((h, i) => <div key={i} style={{ flex: 1, height: \`\${h * 100}%\`, borderRadius: 2, background: i / BARS.length < progress ? "#ba442c" : "#1e1e1e", transition: "background 0.1s" }} />)}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: \`\${progress * 100}%\` }}><div className="absolute -top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow" /></div>
      </div>
      <div className="flex justify-between font-mono text-[9px] text-[#555]"><span>{fmt(progress * duration)}</span><span>{fmt(duration)}</span></div>
    </div>
  );
}`,

  "warm-tooltip-float": `"use client";
import { useState } from "react";
export interface WarmTooltipFloatProps { className?: string; label?: string; tip?: string; }
export function WarmTooltipFloat({ className = "", label = "Hover me", tip = "This is a warm tooltip with spring entrance animation." }: WarmTooltipFloatProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={\`relative inline-flex flex-col items-center gap-2 \${className}\`}>
      <div className="absolute bottom-full mb-3 w-52 rounded-xl px-4 py-3 pointer-events-none"
        style={{ background: "#12141a", border: "1px solid #2a2a2a", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(4px) scale(0.95)", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <p className="font-mono text-[10px] text-[#aaa] leading-relaxed">{tip}</p>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#12141a] border-r border-b border-[#2a2a2a]" />
      </div>
      <button onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className="px-6 py-2.5 rounded-xl bg-[#0d0f14] border border-[#1e1e1e] font-mono text-xs text-[#888] hover:border-[#ba442c] hover:text-[#ba442c] transition-colors">{label}</button>
    </div>
  );
}`,

  "slide-commit-slider": `"use client";
import { useRef, useState } from "react";
export interface SlideCommitSliderProps { className?: string; label?: string; onCommit?: () => void; }
export function SlideCommitSlider({ className = "", label = "Slide to Publish", onCommit }: SlideCommitSliderProps) {
  const [progress, setProgress] = useState(0); const [committed, setCommitted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const handlePointerMove = (e: React.PointerEvent) => { if (!(e.buttons & 1)) return; const r = trackRef.current!.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (e.clientX - r.left - 24) / (r.width - 48))); setProgress(p); if (p >= 0.95) { setCommitted(true); onCommit?.(); } };
  return (
    <div className={\`flex flex-col gap-3 \${className}\`}>
      <div ref={trackRef} onPointerMove={handlePointerMove} onPointerDown={(e) => (e.target as HTMLElement).setPointerCapture(e.pointerId)} onPointerUp={() => { if (!committed) setProgress(0); }}
        className="relative h-12 rounded-xl overflow-hidden cursor-ew-resize select-none"
        style={{ background: committed ? "#1a302066" : "#0d0f14", border: \`1px solid \${committed ? "#2a604066" : "#1e1e1e"}\`, transition: "all 0.4s ease" }}>
        <div className="absolute inset-0 flex items-center justify-center"><span className="font-mono text-xs font-bold" style={{ color: committed ? "#2a6040" : "#2a2a2a" }}>{committed ? "Published ✓" : label}</span></div>
        <div className="absolute inset-y-0 left-0 rounded-xl bg-[#ba442c18]" style={{ width: \`\${progress * 100}%\` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#ba442c] flex items-center justify-center shadow-md" style={{ left: \`\${progress * (100 - 20)}%\`, transition: progress === 0 ? "left 0.3s ease" : "none" }}>
          <span className="font-mono text-white text-sm">{committed ? "✓" : "→"}</span>
        </div>
      </div>
      {committed && <button onClick={() => { setProgress(0); setCommitted(false); }} className="font-mono text-[9px] text-[#333] hover:text-[#ba442c] transition-colors">Reset</button>}
    </div>
  );
}`,

  "squish-switch-toggle": `"use client";
import { useState } from "react";
export interface SquishSwitchToggleProps { className?: string; label?: string; defaultOn?: boolean; onChange?: (on: boolean) => void; }
export function SquishSwitchToggle({ className = "", label = "Dark Mode", defaultOn = false, onChange }: SquishSwitchToggleProps) {
  const [on, setOn] = useState(defaultOn); const [pressed, setPressed] = useState(false);
  const toggle = () => { setPressed(true); setTimeout(() => { setOn((o) => { const next = !o; onChange?.(next); return next; }); setPressed(false); }, 150); };
  return (
    <div className={\`flex items-center gap-4 \${className}\`}>
      <button onClick={toggle} className="relative focus:outline-none"
        style={{ width: 52, height: 28, borderRadius: 14, background: on ? "#ba442c" : "#1e1e1e", border: \`1.5px solid \${on ? "#ba442c" : "#2a2a2a"}\`, transform: pressed ? "scaleX(1.08) scaleY(0.9)" : "scale(1)", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="absolute top-1 rounded-full bg-white shadow" style={{ left: on ? "calc(100% - 22px)" : 4, width: 18, height: 18, transition: "left 0.35s cubic-bezier(0.16,1,0.3,1)" }} />
      </button>
      <span className="font-mono text-xs" style={{ color: on ? "#ba442c" : "#555", transition: "color 0.3s" }}>{label}</span>
    </div>
  );
}`,

  "spring-check-box": `"use client";
import { useState } from "react";
export interface SpringCheckBoxProps { className?: string; label?: string; defaultChecked?: boolean; onChange?: (checked: boolean) => void; }
export function SpringCheckBox({ className = "", label = "Accept terms and conditions", defaultChecked = false, onChange }: SpringCheckBoxProps) {
  const [checked, setChecked] = useState(defaultChecked); const [spring, setSpring] = useState(false);
  const toggle = () => { const next = !checked; setChecked(next); onChange?.(next); if (next) { setSpring(true); setTimeout(() => setSpring(false), 400); } };
  return (
    <label className={\`flex items-center gap-3 cursor-pointer select-none group \${className}\`} onClick={toggle}>
      <div className="relative w-5 h-5 rounded-md flex items-center justify-center" style={{ border: \`1.5px solid \${checked ? "#ba442c" : "#2a2a2a"}\`, background: checked ? "#ba442c18" : "#0d0f14", transition: "all 0.3s ease" }}>
        {checked && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5 L4 8 L11 1" stroke="#ba442c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 18, strokeDashoffset: spring ? 18 : 0, transition: "stroke-dashoffset 0.3s cubic-bezier(0.16,1,0.3,1)" }} /></svg>}
      </div>
      <span className="font-mono text-xs transition-colors group-hover:text-white" style={{ color: checked ? "#aaa" : "#555" }}>{label}</span>
    </label>
  );
}`,

  "peek-rating-stars": `"use client";
import { useState } from "react";
export interface PeekRatingStarsProps { className?: string; max?: number; defaultValue?: number; onChange?: (val: number) => void; }
export function PeekRatingStars({ className = "", max = 5, defaultValue = 0, onChange }: PeekRatingStarsProps) {
  const [value, setValue] = useState(defaultValue); const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? value;
  return (
    <div className={\`flex flex-col items-center gap-3 \${className}\`}>
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, i) => (
          <button key={i} onMouseEnter={() => setHovered(i + 1)} onMouseLeave={() => setHovered(null)} onClick={() => { setValue(i + 1); onChange?.(i + 1); }}
            style={{ transform: active > i ? "scale(1.2) translateY(-3px)" : "scale(1)", transition: \`transform 0.3s cubic-bezier(0.16,1,0.3,1) \${i * 0.04}s\`, filter: active > i ? "drop-shadow(0 0 4px #ba442c)" : "none" }}
            className="text-2xl">{active > i ? "★" : "☆"}</button>
        ))}
      </div>
      <span className="font-mono text-[9px] text-[#555]">{value > 0 ? \`\${value}/\${max} · Thanks!\` : "Rate this component"}</span>
    </div>
  );
}`,

  "gooey-nav-liquid": `"use client";
import { useState } from "react";
const NAV = ["Home", "Work", "Lab", "About"];
export interface GooeyNavLiquidProps { className?: string; onSelect?: (label: string) => void; }
export function GooeyNavLiquid({ className = "", onSelect }: GooeyNavLiquidProps) {
  const [active, setActive] = useState(0);
  return (
    <div className={\`relative flex flex-col items-center gap-4 \${className}\`}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}><defs><filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" /></filter></defs></svg>
      <div className="flex gap-1 p-2 rounded-full bg-[#0d0f14] border border-[#1e1e1e]" style={{ filter: "url(#gooey)" }}>
        {NAV.map((item, i) => (
          <button key={item} onClick={() => { setActive(i); onSelect?.(item); }}
            style={{ background: active === i ? "#ba442c" : "transparent", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", color: active === i ? "white" : "#555" }}
            className="px-5 py-2 rounded-full font-mono text-xs">{item}</button>
        ))}
      </div>
    </div>
  );
}`,

  "folder-tree-interactive": `"use client";
import { useState } from "react";
type TreeNode = { id: string; label: string; children?: TreeNode[] };
const TREE: TreeNode[] = [{ id: "src", label: "src/", children: [{ id: "components", label: "components/", children: [{ id: "button", label: "Button.tsx" }, { id: "card", label: "Card.tsx" }] }, { id: "lib", label: "lib/", children: [{ id: "cn", label: "cn.ts" }] }] }, { id: "public", label: "public/" }];
function TreeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(true); const hasChildren = !!node.children?.length;
  return (<div><div onClick={() => hasChildren && setOpen((o) => !o)} className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-[#1a1a1a] cursor-pointer" style={{ paddingLeft: depth * 16 + 4 }}>{hasChildren && <span className="font-mono text-[10px] text-[#444] w-3">{open ? "▾" : "▸"}</span>}{!hasChildren && <span className="w-3" />}<span className="font-mono text-[11px]" style={{ color: hasChildren ? "#ba442c" : "#666" }}>{node.label}</span></div>{hasChildren && open && node.children?.map((child) => <TreeRow key={child.id} node={child} depth={depth + 1} />)}</div>);
}
export interface FolderTreeInteractiveProps { className?: string; }
export function FolderTreeInteractive({ className = "" }: FolderTreeInteractiveProps) {
  return (<div className={\`py-3 px-2 rounded-xl bg-[#0d0f14] border border-[#1e1e1e] min-w-[200px] \${className}\`}>{TREE.map((node) => <TreeRow key={node.id} node={node} />)}</div>);
}`,

  "staggered-menu-cascade": `"use client";
import { useState } from "react";
const LINKS = ["Components", "Motion", "Canvas", "Systems", "Registry", "About"];
export interface StaggeredMenuCascadeProps { className?: string; }
export function StaggeredMenuCascade({ className = "" }: StaggeredMenuCascadeProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={\`relative \${className}\`}>
      <button onClick={() => setOpen((o) => !o)} className="px-5 py-2.5 rounded-xl bg-[#0d0f14] border border-[#1e1e1e] font-mono text-xs text-[#888] hover:text-white hover:border-[#ba442c] transition-colors">{open ? "Close ✕" : "Menu ≡"}</button>
      <div className={\`absolute top-12 left-0 bg-[#080a0f] border border-[#1e1e1e] rounded-2xl overflow-hidden \${open ? "w-56 py-4" : "w-0 py-0"}\`} style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        {LINKS.map((link, i) => (<div key={link} className="px-6 py-2.5 hover:bg-[#1a1a1a] cursor-pointer" style={{ opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-20px)", transition: \`all 0.4s cubic-bezier(0.16,1,0.3,1) \${i * 0.05}s\`, whiteSpace: "nowrap" }}><span className="font-mono text-xs text-[#888] hover:text-white transition-colors">{link}</span></div>))}
      </div>
    </div>
  );
}`,

  "swipe-row-actions": `"use client";
import { useRef, useState } from "react";
const ROWS = ["Design Token Review", "Motion Spec Draft", "Canvas Engine v3", "Registry Deploy"];
export interface SwipeRowActionsProps { className?: string; }
export function SwipeRowActions({ className = "" }: SwipeRowActionsProps) {
  const [offsets, setOffsets] = useState<Record<number, number>>({});
  const starts = useRef<Record<number, number>>({});
  const setOffset = (i: number, v: number) => setOffsets((o) => ({ ...o, [i]: v }));
  return (
    <div className={\`flex flex-col \${className}\`}>
      {ROWS.map((row, i) => (
        <div key={row} className="relative overflow-hidden border-b border-[#1e1e1e]">
          <div className="absolute right-0 top-0 bottom-0 flex items-center"><button className="h-full px-4 bg-[#1a3020] font-mono text-[9px] text-[#2a6040]">Archive</button><button className="h-full px-4 bg-[#3a1010] font-mono text-[9px] text-[#ba442c]">Delete</button></div>
          <div className="relative bg-[#0d0f14] px-4 py-3 flex items-center justify-between"
            style={{ transform: \`translateX(\${offsets[i] ?? 0}px)\`, transition: Math.abs(offsets[i] ?? 0) < 2 ? "transform 0.3s ease" : "none", cursor: "grab" }}
            onPointerDown={(e) => { starts.current[i] = e.clientX; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
            onPointerMove={(e) => { if (starts.current[i] !== undefined) setOffset(i, Math.min(0, e.clientX - starts.current[i])); }}
            onPointerUp={() => { setOffset(i, (offsets[i] ?? 0) < -40 ? -80 : 0); starts.current[i] = undefined as any; }}>
            <span className="font-mono text-xs text-[#888]">{row}</span>
            <span className="font-mono text-[9px] text-[#333]">← swipe</span>
          </div>
        </div>
      ))}
    </div>
  );
}`,

  "glide-select-slider": `"use client";
import { useState } from "react";
const SEGMENTS = ["XS", "SM", "MD", "LG", "XL"];
export interface GlideSelectSliderProps { className?: string; onChange?: (val: string) => void; }
export function GlideSelectSlider({ className = "", onChange }: GlideSelectSliderProps) {
  const [active, setActive] = useState(2);
  return (
    <div className={\`relative flex items-center bg-[#0d0f14] border border-[#1e1e1e] rounded-xl p-1 \${className}\`}>
      <div className="absolute rounded-lg bg-[#ba442c]" style={{ left: \`calc(\${(active / SEGMENTS.length) * 100}% + 4px)\`, width: \`calc(\${100 / SEGMENTS.length}% - 8px)\`, top: 4, bottom: 4, transition: "left 0.35s cubic-bezier(0.16,1,0.3,1)" }} />
      {SEGMENTS.map((seg, i) => (<button key={seg} onClick={() => { setActive(i); onChange?.(seg); }} className="relative z-10 flex-1 py-2 text-center font-mono text-xs font-bold transition-colors" style={{ color: active === i ? "white" : "#444" }}>{seg}</button>))}
    </div>
  );
}`,

  "jelly-radio-switch": `"use client";
import { useState } from "react";
const OPTIONS = ["Option A", "Option B", "Option C"];
export interface JellyRadioSwitchProps { className?: string; onChange?: (val: string) => void; }
export function JellyRadioSwitch({ className = "", onChange }: JellyRadioSwitchProps) {
  const [selected, setSelected] = useState(0); const [squish, setSquish] = useState<number | null>(null);
  const select = (i: number) => { setSelected(i); setSquish(i); onChange?.(OPTIONS[i]); setTimeout(() => setSquish(null), 400); };
  return (
    <div className={\`flex flex-col gap-3 \${className}\`}>
      {OPTIONS.map((opt, i) => (
        <button key={opt} onClick={() => select(i)} className="flex items-center gap-3 text-left">
          <div className="relative w-5 h-5 flex items-center justify-center"><div className="absolute inset-0 rounded-full border-2 transition-colors" style={{ borderColor: selected === i ? "#ba442c" : "#2a2a2a" }} />{selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#ba442c]" style={{ transform: squish === i ? "scaleX(1.4) scaleY(0.7)" : "scale(1)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} />}</div>
          <span className="font-mono text-xs transition-colors" style={{ color: selected === i ? "white" : "#555" }}>{opt}</span>
        </button>
      ))}
    </div>
  );
}`,

  "call-chip-pulse": `"use client";
import { useEffect, useState } from "react";
export interface CallChipPulseProps { className?: string; name?: string; }
export function CallChipPulse({ className = "", name = "Design Review" }: CallChipPulseProps) {
  const [duration, setDuration] = useState(0); const [muted, setMuted] = useState(false);
  useEffect(() => { const id = setInterval(() => setDuration((d) => d + 1), 1000); return () => clearInterval(id); }, []);
  const fmt = (s: number) => \`\${String(Math.floor(s / 60)).padStart(2, "0")}:\${String(s % 60).padStart(2, "0")}\`;
  return (
    <div className={\`flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0d0f14] border border-[#1e1e1e] \${className}\`}>
      <div className="relative w-8 h-8"><div className="absolute inset-0 rounded-full bg-[#ba442c] opacity-20 animate-ping" /><div className="absolute inset-1 rounded-full bg-[#ba442c]" /></div>
      <div className="flex flex-col"><span className="font-bold text-white text-xs">{name}</span><span className="font-mono text-[9px] text-[#ba442c]">{fmt(duration)} — LIVE</span></div>
      <div className="ml-auto flex gap-2">
        <button onClick={() => setMuted((m) => !m)} className="w-7 h-7 rounded-full border border-[#2a2a2a] flex items-center justify-center font-mono text-[10px] hover:border-[#ba442c] transition-colors" style={{ color: muted ? "#ba442c" : "#555" }}>{muted ? "🔇" : "🎤"}</button>
        <button className="w-7 h-7 rounded-full bg-[#ba442c22] border border-[#ba442c44] flex items-center justify-center font-mono text-[10px] text-[#ba442c]">✕</button>
      </div>
    </div>
  );
}`,

  "bounce-cards-stack": `"use client";
import { useState } from "react";
const CARDS = [{ label: "Token", rotate: -6 }, { label: "Motion", rotate: -2 }, { label: "Canvas", rotate: 3 }, { label: "System", rotate: 7 }];
export interface BounceCardsStackProps { className?: string; }
export function BounceCardsStack({ className = "" }: BounceCardsStackProps) {
  const [fanned, setFanned] = useState(false);
  return (
    <div className={\`relative flex items-center justify-center h-48 w-48 cursor-pointer \${className}\`} onMouseEnter={() => setFanned(true)} onMouseLeave={() => setFanned(false)}>
      {CARDS.map((card, i) => (
        <div key={card.label} style={{ position: "absolute", transform: fanned ? \`translateX(\${(i - 1.5) * 44}px) rotate(\${card.rotate}deg) translateY(-8px)\` : \`translateX(\${i * 3}px) rotate(\${i * 1.5}deg)\`, transition: \`transform 0.5s cubic-bezier(0.16,1,0.3,1) \${i * 0.04}s\`, zIndex: i + 1 }} className="w-28 h-40 rounded-2xl bg-[#0d0f14] border border-[#1e1e1e] flex items-end p-3">
          <span className="font-mono text-[9px] text-[#ba442c] font-bold">{card.label}</span>
        </div>
      ))}
    </div>
  );
}`,

  "prompt-bar-action": `"use client";
import { useState } from "react";
const TOOLS = ["◈ Design", "〰 Motion", "▦ Grid", "✦ More"];
export interface PromptBarActionProps { className?: string; placeholder?: string; onSubmit?: (value: string) => void; }
export function PromptBarAction({ className = "", placeholder = "Describe your component…", onSubmit }: PromptBarActionProps) {
  const [value, setValue] = useState(""); const [focused, setFocused] = useState(false);
  const submit = () => { if (value.trim()) { onSubmit?.(value); setValue(""); } };
  return (
    <div className={\`flex flex-col gap-2 \${className}\`}>
      <div className="relative rounded-2xl overflow-hidden" style={{ border: \`1.5px solid \${focused ? "#ba442c" : "#1e1e1e"}\`, boxShadow: focused ? "0 0 24px rgba(186,68,44,0.2)" : "none", transition: "all 0.3s ease", background: "#0d0f14" }}>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} placeholder={placeholder} rows={2} className="w-full bg-transparent px-4 pt-4 pb-2 font-mono text-sm text-white outline-none placeholder:text-[#2a2a2a] resize-none" />
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex gap-1">{TOOLS.map((tool) => <button key={tool} className="px-2 py-0.5 rounded-full border border-[#1e1e1e] font-mono text-[8px] text-[#444] hover:border-[#ba442c] hover:text-[#ba442c] transition-colors">{tool}</button>)}</div>
          <button onClick={submit} disabled={!value.trim()} className="px-4 py-1.5 rounded-xl bg-[#ba442c] text-white font-mono text-[9px] font-bold disabled:opacity-30 hover:bg-[#c84830] transition-colors">Generate ↑</button>
        </div>
      </div>
    </div>
  );
}`,

  "bell-toggle-ring": `"use client";
import { useState } from "react";
export interface BellToggleRingProps { className?: string; }
export function BellToggleRing({ className = "" }: BellToggleRingProps) {
  const [on, setOn] = useState(false); const [ringing, setRinging] = useState(false);
  const toggle = () => { setOn((prev) => !prev); setRinging(true); setTimeout(() => setRinging(false), 600); };
  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <button onClick={toggle} className="relative w-20 h-20 flex items-center justify-center">
        <span className="text-4xl select-none" style={{ display: "block", animation: ringing ? "ring 0.5s cubic-bezier(0.16,1,0.3,1)" : "none", filter: on ? "drop-shadow(0 0 8px #ba442c)" : "none", color: on ? "#ba442c" : "#333", transition: "color 0.3s, filter 0.3s" }}>🔔</span>
        {on && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ba442c] rounded-full flex items-center justify-center font-mono text-[8px] text-white font-bold animate-pulse">3</span>}
      </button>
      <style>{\`@keyframes ring { 0%{transform:rotate(0)} 20%{transform:rotate(20deg)} 40%{transform:rotate(-15deg)} 60%{transform:rotate(10deg)} 80%{transform:rotate(-5deg)} 100%{transform:rotate(0)} }\`}</style>
      <span className="font-mono text-[10px]" style={{ color: on ? "#ba442c" : "#444" }}>{on ? "Notifications ON" : "Notifications OFF"}</span>
    </div>
  );
}`,
  "depth-carousel-3d": `import { useState } from "react";
export default function DepthCarousel3d({ className = "" }: { className?: string }) {
  const items = ["Ocean Depths", "Mountain Peak", "City Lights", "Desert Dunes", "Arctic Glow"];
  const [active, setActive] = useState(2);
  return (
    <div className={\`relative flex items-center justify-center h-72 overflow-hidden \${className}\`} style={{ perspective: "800px" }}>
      <div className="relative w-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, i) => {
          const offset = i - active;
          const z = offset === 0 ? 0 : -120;
          const x = offset * 160;
          const opacity = Math.abs(offset) <= 2 ? 1 - Math.abs(offset) * 0.35 : 0;
          const scale = offset === 0 ? 1 : 0.78 - Math.abs(offset) * 0.08;
          return (
            <button key={i} onClick={() => setActive(i)}
              style={{ position: "absolute", transform: \`translateX(\${x}px) translateZ(\${z}px) scale(\${scale})\`, opacity, transition: "all 0.5s cubic-bezier(0.25,1,0.5,1)", zIndex: offset === 0 ? 10 : 5 - Math.abs(offset), cursor: "pointer" }}>
              <div style={{ width: 180, height: 110, borderRadius: 16, background: \`hsl(\${i * 60}, 60%, \${offset === 0 ? 55 : 35}%)\`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: offset === 0 ? "0 20px 60px rgba(0,0,0,0.4)" : "0 5px 20px rgba(0,0,0,0.2)", border: offset === 0 ? "2px solid rgba(255,255,255,0.3)" : "none" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{item}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ position: "absolute", bottom: 12, display: "flex", gap: 8 }}>
        {items.map((_, i) => <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 20 : 8, height: 8, borderRadius: 4, background: i === active ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.3s", border: "none", cursor: "pointer" }} />)}
      </div>
    </div>
  );
}`,

  "morph-slider-path": `import { useState, useRef } from "react";
export default function MorphSliderPath({ className = "" }: { className?: string }) {
  const [value, setValue] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const d = \`M 0 40 Q \${value * 3} \${value < 50 ? 80 : value < 75 ? 60 : 20} 300 40\`;
  return (
    <div className={\`flex flex-col gap-6 items-center \${className}\`}>
      <svg width="300" height="80" viewBox="0 0 300 80">
        <path d={d} fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
        <path d={\`M 0 40 L 300 40\`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
        <circle cx={value * 3} cy={value < 50 ? 80 : value < 75 ? 60 : 20} r={8} fill="#8b5cf6" style={{ filter: "drop-shadow(0 0 8px #8b5cf6)" }} />
      </svg>
      <div ref={trackRef} style={{ position: "relative", width: 300, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", cursor: "pointer" }}
        onClick={(e) => { const r = trackRef.current!.getBoundingClientRect(); setValue(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: \`\${value}%\`, borderRadius: 3, background: "linear-gradient(90deg,#7c3aed,#8b5cf6)", transition: "width 0.1s" }} />
        <div style={{ position: "absolute", top: -7, left: \`\${value}%\`, transform: "translateX(-50%)", width: 20, height: 20, borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px #8b5cf6", border: "2px solid #fff", transition: "left 0.1s" }} />
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 14, color: "#8b5cf6", fontWeight: 700 }}>{value}%</span>
    </div>
  );
}`,

  "drift-wall-parallax": `import { useState } from "react";
export default function DriftWallParallax({ className = "" }: { className?: string }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const layers = [
    { depth: 0.05, items: ["⬛","⬛","⬛"], color: "rgba(255,255,255,0.03)", size: 80 },
    { depth: 0.12, items: ["◆","◆"], color: "rgba(139,92,246,0.15)", size: 40 },
    { depth: 0.22, items: ["●","●","●"], color: "rgba(59,130,246,0.2)", size: 24 },
    { depth: 0.38, items: ["✦","✦"], color: "rgba(236,72,153,0.3)", size: 14 },
  ];
  return (
    <div className={\`relative w-full h-64 overflow-hidden rounded-xl \${className}\`}
      style={{ background: "linear-gradient(135deg,#0f0f1a,#1a0f2e)", cursor: "crosshair" }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }); }}>
      {layers.map((l, li) =>
        l.items.map((item, ii) => (
          <div key={\`\${li}-\${ii}\`} style={{
            position: "absolute",
            left: \`\${20 + ii * 30 + li * 10}%\`,
            top: \`\${15 + li * 20 + ii * 15}%\`,
            transform: \`translate(\${(mouse.x - 0.5) * l.depth * -200}px, \${(mouse.y - 0.5) * l.depth * -200}px)\`,
            transition: "transform 0.1s ease-out",
            fontSize: l.size,
            color: l.color,
            userSelect: "none",
            lineHeight: 1,
          }}>{item}</div>
        ))
      )}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace" }}>Move cursor to drift layers</div>
    </div>
  );
}`,

  "specular-button-lens": `import { useState, useRef } from "react";
export default function SpecularButtonLens({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLButtonElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div className={\`flex gap-6 flex-wrap justify-center \${className}\`}>
      {["Primary", "Secondary", "Danger"].map((label, i) => {
        const hues = [240, 280, 0];
        return (
          <button key={i} ref={i === 0 ? ref : undefined} onMouseMove={i === 0 ? move : undefined}
            style={{ position: "relative", padding: "14px 32px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: \`hsl(\${hues[i]},70%,20%)\`, color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer", overflow: "hidden", transition: "transform 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            <div style={{ position: "absolute", inset: 0, background: \`radial-gradient(circle at \${i === 0 ? pos.x : 50}% \${i === 0 ? pos.y : 30}%, rgba(255,255,255,0.35) 0%, transparent 60%)\`, pointerEvents: "none" }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}`,

  "option-wheel-3d": `import { useState } from "react";
export default function OptionWheel3d({ className = "" }: { className?: string }) {
  const options = ["Design", "Code", "Deploy", "Monitor", "Scale", "Iterate", "Ship", "Review"];
  const [selected, setSelected] = useState(0);
  const count = options.length;
  const angle = 360 / count;
  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <div style={{ position: "relative", width: 220, height: 220, perspective: 600 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: \`rotateX(20deg) rotateY(\${-selected * angle}deg)\`, transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
          {options.map((opt, i) => (
            <div key={i} style={{
              position: "absolute", width: 80, height: 36, top: "50%", left: "50%",
              marginTop: -18, marginLeft: -40,
              transform: \`rotateY(\${i * angle}deg) translateZ(90px)\`,
              background: i === selected ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.08)",
              border: \`1px solid \${i === selected ? "#8b5cf6" : "rgba(255,255,255,0.15)"}\`,
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              color: i === selected ? "#fff" : "rgba(255,255,255,0.5)",
              fontWeight: 600, fontSize: 12, cursor: "pointer",
              transition: "all 0.3s",
            }} onClick={() => setSelected(i)}>{opt}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setSelected((selected - 1 + count) % count)} style={{ padding: "8px 20px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer" }}>◀</button>
        <button onClick={() => setSelected((selected + 1) % count)} style={{ padding: "8px 20px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer" }}>▶</button>
      </div>
    </div>
  );
}`,

  "curved-input-field": `import { useState } from "react";
export default function CurvedInputField({ className = "" }: { className?: string }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <div className={\`flex flex-col gap-6 items-center \${className}\`}>
      {["Search components...", "Enter email address", "Your message here"].map((ph, i) => {
        const active = i === 0 ? focused : false;
        return (
          <div key={i} style={{ position: "relative", width: 280 }}>
            <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", zIndex: 1 }} width="280" height="48">
              <rect x="1" y="1" width="278" height="46" rx="24" fill="none"
                stroke={active ? "#8b5cf6" : "rgba(255,255,255,0.15)"} strokeWidth={active ? 2 : 1} />
              {active && <rect x="1" y="1" width="278" height="46" rx="24" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="8" style={{ filter: "blur(4px)" }} />}
            </svg>
            <input placeholder={ph} value={i === 0 ? value : ""} onChange={e => i === 0 && setValue(e.target.value)}
              onFocus={() => i === 0 && setFocused(true)} onBlur={() => setFocused(false)}
              style={{ width: "100%", height: 48, borderRadius: 24, border: "none", background: "rgba(255,255,255,0.05)", color: "#fff", padding: "0 20px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        );
      })}
    </div>
  );
}`,

  "line-sidebar-rail": `import { useState } from "react";
export default function LineSidebarRail({ className = "" }: { className?: string }) {
  const items = [
    { icon: "🏠", label: "Home" }, { icon: "📊", label: "Analytics" }, { icon: "🛒", label: "Store" },
    { icon: "💬", label: "Messages" }, { icon: "⚙️", label: "Settings" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className={\`flex gap-4 \${className}\`}>
      <nav style={{ width: 56, display: "flex", flexDirection: "column", gap: 4, padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: \`\${active * 52 + 8 + 8}px\`, width: 3, height: 36, background: "#8b5cf6", borderRadius: "0 3px 3px 0", transition: "top 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
        {items.map((item, i) => (
          <button key={i} onClick={() => setActive(i)}
            title={item.label}
            style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: i === active ? "rgba(139,92,246,0.2)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "background 0.2s" }}>
            {item.icon}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{items[active].label} Panel</span>
      </div>
    </div>
  );
}`,

  "scroll-stack-deck": `import { useRef } from "react";
export default function ScrollStackDeck({ className = "" }: { className?: string }) {
  const cards = [
    { title: "Foundation", color: "#1e1b4b", accent: "#818cf8" },
    { title: "Structure", color: "#1a1f36", accent: "#60a5fa" },
    { title: "Style", color: "#0f1d2e", accent: "#34d399" },
    { title: "Launch", color: "#1a0f20", accent: "#f472b6" },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className={\`relative \${className}\`} style={{ height: 220, overflow: "hidden" }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: 0,
          transform: \`translateX(-50%) translateY(\${i * 14}px) scale(\${1 - i * 0.04})\`,
          width: \`\${100 - i * 4}%\`, height: 140,
          background: card.color, borderRadius: 16, border: \`1px solid \${card.accent}33\`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: cards.length - i,
          boxShadow: \`0 \${i * 4}px \${i * 16}px rgba(0,0,0,0.3)\`,
          transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
          cursor: "pointer",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 32, height: 3, background: card.accent, borderRadius: 2, margin: "0 auto 8px" }} />
            <span style={{ color: card.accent, fontWeight: 700, fontSize: 16 }}>{card.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}`,

  "circular-gallery-carousel": `import { useState } from "react";
export default function CircularGalleryCarousel({ className = "" }: { className?: string }) {
  const items = ["🌊 Ocean", "🏔️ Mountain", "🌲 Forest", "🏜️ Desert", "❄️ Arctic", "🌋 Volcano"];
  const [angle, setAngle] = useState(0);
  const count = items.length;
  const step = 360 / count;
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div style={{ position: "relative", width: 240, height: 240, perspective: 600 }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: \`rotateY(\${angle}deg)\`, transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
          {items.map((item, i) => (
            <div key={i} style={{
              position: "absolute", width: 90, height: 60, top: "50%", left: "50%",
              marginTop: -30, marginLeft: -45,
              transform: \`rotateY(\${i * step}deg) translateZ(110px)\`,
              background: \`hsl(\${i * 60},60%,20%)\`,
              border: \`1px solid hsl(\${i * 60},60%,40%)\`,
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 600,
            }}>{item}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setAngle(a => a + step)} style={{ padding: "8px 20px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer" }}>◀</button>
        <button onClick={() => setAngle(a => a - step)} style={{ padding: "8px 20px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer" }}>▶</button>
      </div>
    </div>
  );
}`,

  "card-nav-expand": `import { useState } from "react";
export default function CardNavExpand({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const sections = [
    { icon: "📦", title: "Products", items: ["Browse Catalog", "New Arrivals", "Best Sellers"] },
    { icon: "🎨", title: "Design", items: ["Templates", "Assets", "Colors"] },
    { icon: "📈", title: "Growth", items: ["Analytics", "Reports", "Goals"] },
  ];
  return (
    <div className={\`flex flex-col gap-2 w-full max-w-xs \${className}\`}>
      {sections.map((sec, i) => (
        <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "transparent", border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            <span>{sec.icon}</span>
            <span style={{ flex: 1, textAlign: "left" }}>{sec.title}</span>
            <span style={{ transform: open === i ? "rotate(90deg)" : "none", transition: "transform 0.3s", display: "inline-block", color: "rgba(255,255,255,0.4)" }}>›</span>
          </button>
          <div style={{ maxHeight: open === i ? 120 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.25,1,0.5,1)" }}>
            {sec.items.map((item, j) => (
              <div key={j} style={{ padding: "8px 16px 8px 44px", color: "rgba(255,255,255,0.6)", fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`,

  "fluid-glass-surface": `import { useState } from "react";
export default function FluidGlassSurface({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div className={\`relative flex items-center justify-center \${className}\`}
      style={{ width: "100%", height: 260, background: "linear-gradient(135deg,#0d1117,#161b22)", borderRadius: 20, overflow: "hidden", cursor: "none" }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}>
      <div style={{ position: "absolute", inset: 0, background: \`radial-gradient(circle at \${pos.x}% \${pos.y}%, rgba(139,92,246,0.15) 0%, transparent 50%)\`, pointerEvents: "none", transition: "background 0.1s" }} />
      <div style={{ position: "relative", padding: "28px 40px", borderRadius: 20, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.3)", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,rgba(139,92,246,0.6),rgba(59,130,246,0.6))", margin: "0 auto 12px", backdropFilter: "blur(8px)" }} />
        <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 16, margin: 0 }}>Glass Surface</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "6px 0 0" }}>Fluid refraction with pointer glow</p>
      </div>
      <div style={{ position: "absolute", width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.8)", top: \`\${pos.y}%\`, left: \`\${pos.x}%\`, transform: "translate(-50%,-50%)", pointerEvents: "none", boxShadow: "0 0 20px rgba(139,92,246,0.6)", transition: "top 0.05s, left 0.05s" }} />
    </div>
  );
}`,

  "masonry-grid-fluid": `export default function MasonryGridFluid({ className = "" }: { className?: string }) {
  const items = [
    { h: 140, color: "#1e1b4b", label: "Tall A" },
    { h: 90, color: "#1a2035", label: "Short B" },
    { h: 110, color: "#0f1d2e", label: "Mid C" },
    { h: 80, color: "#1a0f20", label: "Short D" },
    { h: 160, color: "#14161f", label: "Tall E" },
    { h: 100, color: "#1a1a2e", label: "Mid F" },
  ];
  return (
    <div className={\`\${className}\`} style={{ columns: 3, gap: 10, width: "100%" }}>
      {items.map((item, i) => (
        <div key={i} style={{ breakInside: "avoid", marginBottom: 10, height: item.h, background: item.color, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}`,

  "glass-surface-acrylic": `import { useState } from "react";
export default function GlassSurfaceAcrylic({ className = "" }: { className?: string }) {
  const [blur, setBlur] = useState(20);
  const [opacity, setOpacity] = useState(0.08);
  return (
    <div className={\`relative flex flex-col items-center justify-center gap-6 \${className}\`}
      style={{ width: "100%", height: 300, background: "linear-gradient(135deg,#667eea,#764ba2,#f093fb)", borderRadius: 20, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\\")" }} />
      <div style={{ position: "relative", padding: "24px 36px", borderRadius: 20, background: \`rgba(255,255,255,\${opacity})\`, backdropFilter: \`blur(\${blur}px)\`, border: "1px solid rgba(255,255,255,0.3)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 20px 60px rgba(0,0,0,0.2)", textAlign: "center", minWidth: 200 }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: "0 0 4px" }}>Acrylic Glass</p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>backdrop-filter blur demo</p>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "10px 16px", borderRadius: 12 }}>
        <span style={{ color: "#fff", fontSize: 11, opacity: 0.7 }}>Blur</span>
        <input type="range" min={0} max={40} value={blur} onChange={e => setBlur(+e.target.value)} style={{ width: 80 }} />
        <span style={{ color: "#fff", fontSize: 11 }}>{blur}px</span>
      </div>
    </div>
  );
}`,

  "chroma-grid-fresnel": `import { useState } from "react";
export default function ChromaGridFresnel({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cells = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className={\`\${className}\`} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4, padding: 4, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
      {cells.map(i => {
        const hue = (i * 22 + 180) % 360;
        const isHov = hovered === i;
        return (
          <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ height: 56, borderRadius: 10, background: isHov ? \`hsl(\${hue},80%,50%)\` : \`hsl(\${hue},40%,15%)\`, border: \`1px solid hsl(\${hue},60%,\${isHov ? 60 : 25}%)\`, cursor: "pointer", transition: "all 0.25s cubic-bezier(0.25,1,0.5,1)", transform: isHov ? "scale(1.08)" : "scale(1)", boxShadow: isHov ? \`0 0 20px hsl(\${hue},80%,50%)\` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isHov && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", boxShadow: "0 0 12px #fff" }} />}
          </div>
        );
      })}
    </div>
  );
}`,

  "lanyard-card-spring": `import { useState, useRef } from "react";
export default function LanyardCardSpring({ className = "" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * 20;
    const y = -((e.clientX - r.left) / r.width - 0.5) * 20;
    setTilt({ x, y });
  };
  return (
    <div className={\`flex flex-col items-center gap-2 \${className}\`}>
      <div style={{ width: 2, height: 48, background: "linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.1))", borderRadius: 1 }} />
      <div ref={ref} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ width: 160, padding: "20px 16px", borderRadius: 16, background: "linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.2))", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", transform: \`perspective(500px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`, transition: "transform 0.15s cubic-bezier(0.25,1,0.5,1)", cursor: "grab", textAlign: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", margin: "0 auto 10px" }} />
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Alex Johnson</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>Senior Designer</div>
        <div style={{ marginTop: 12, padding: "4px 10px", background: "rgba(139,92,246,0.3)", borderRadius: 20, color: "#a78bfa", fontSize: 10, display: "inline-block" }}>CONFERENCE 2025</div>
      </div>
    </div>
  );
}`,

  "profile-card-holo": `import { useState, useRef } from "react";
export default function ProfileCardHolo({ className = "" }: { className?: string }) {
  const [shine, setShine] = useState({ x: 50, y: 50, show: false });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={\`\${className}\`}
      style={{ position: "relative", width: 240, padding: "28px 20px 20px", borderRadius: 24, background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", border: "1px solid rgba(255,255,255,0.15)", overflow: "hidden", cursor: "pointer" }}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setShine({ x: ((e.clientX-r.left)/r.width)*100, y: ((e.clientY-r.top)/r.height)*100, show: true }); }}
      onMouseLeave={() => setShine(s => ({ ...s, show: false }))}>
      {shine.show && <div style={{ position: "absolute", inset: 0, background: \`radial-gradient(circle at \${shine.x}% \${shine.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)\`, pointerEvents: "none", zIndex: 1 }} />}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#ec4899,#f59e0b)", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👤</div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Morgan Ellis</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>Full-Stack Engineer</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
          {["142", "38k", "99"].map((v, i) => <div key={i} style={{ textAlign: "center" }}><div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{v}</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{["Posts","Likes","Rank"][i]}</div></div>)}
        </div>
        <button style={{ marginTop: 16, padding: "8px 28px", borderRadius: 20, background: "linear-gradient(90deg,#8b5cf6,#ec4899)", border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Follow</button>
      </div>
    </div>
  );
}`,

  "pixel-card-retro": `import { useState } from "react";
export default function PixelCardRetro({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const pixelBorder = "4px solid #0ff";
  return (
    <div className={\`flex gap-4 flex-wrap justify-center \${className}\`}>
      {[
        { label: "HERO", pts: 9850, icon: "🗡️", color: "#0ff" },
        { label: "MAGE", pts: 7320, icon: "🔮", color: "#f0f" },
        { label: "ROGUE", pts: 6100, icon: "🗄️", color: "#ff0" },
      ].map((card, i) => (
        <div key={i} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{ width: 100, padding: "12px 8px", background: "#000", border: \`3px solid \${card.color}\`, imageRendering: "pixelated", fontFamily: "monospace", textAlign: "center", cursor: "pointer", transition: "transform 0.1s, box-shadow 0.1s", transform: hovered && i === 0 ? "scale(1.05)" : "scale(1)", boxShadow: \`0 0 \${hovered && i === 0 ? 20 : 8}px \${card.color}\`, position: "relative" }}>
          <div style={{ fontSize: 28 }}>{card.icon}</div>
          <div style={{ color: card.color, fontSize: 10, fontWeight: 700, marginTop: 6, letterSpacing: 1 }}>{card.label}</div>
          <div style={{ width: "100%", height: 2, background: card.color, margin: "6px 0", opacity: 0.5 }} />
          <div style={{ color: card.color, fontSize: 11 }}>PTS</div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{card.pts.toLocaleString()}</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 4, height: 4, background: card.color }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 4, height: 4, background: card.color }} />
        </div>
      ))}
    </div>
  );
}`,

  "flying-posters-gallery": `import { useState, useEffect } from "react";
export default function FlyingPostersGallery({ className = "" }: { className?: string }) {
  const posters = [
    { title: "Neon Nights", color: "#1a0033", accent: "#f0f" },
    { title: "Deep Ocean", color: "#001a33", accent: "#0ff" },
    { title: "Ember Rise", color: "#330d00", accent: "#f80" },
    { title: "Forest Fog", color: "#002b1a", accent: "#0f9" },
  ];
  const [offset, setOffset] = useState(0);
  useEffect(() => { const id = setInterval(() => setOffset(o => o + 0.4), 30); return () => clearInterval(id); }, []);
  return (
    <div className={\`relative overflow-hidden rounded-xl \${className}\`} style={{ height: 180, background: "#000" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", height: "100%", padding: "0 20px", transform: \`translateX(\${-(offset % 320)}px)\`, transition: "none" }}>
        {[...posters, ...posters, ...posters].map((p, i) => (
          <div key={i} style={{ flexShrink: 0, width: 120, height: 140, borderRadius: 12, background: p.color, border: \`1px solid \${p.accent}55\`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: \`0 0 20px \${p.accent}33\` }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: p.accent, opacity: 0.7, boxShadow: \`0 0 16px \${p.accent}\` }} />
            <span style={{ color: p.accent, fontSize: 11, fontWeight: 700, textAlign: "center" }}>{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  "card-swap-deck": `import { useState } from "react";
export default function CardSwapDeck({ className = "" }: { className?: string }) {
  const [deck, setDeck] = useState([0, 1, 2, 3]);
  const colors = ["#4f46e5", "#059669", "#dc2626", "#d97706"];
  const labels = ["Design", "Build", "Test", "Ship"];
  const swap = () => setDeck(d => [...d.slice(1), d[0]]);
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div style={{ position: "relative", width: 180, height: 120 }}>
        {[...deck].reverse().map((idx, ri) => {
          const stackPos = deck.length - 1 - ri;
          return (
            <div key={idx} style={{ position: "absolute", left: "50%", top: 0, transform: \`translateX(-50%) translateY(\${stackPos * -8}px) rotate(\${(stackPos - deck.length + 1) * 3}deg)\`, width: 180, height: 110, borderRadius: 16, background: colors[idx], display: "flex", alignItems: "center", justifyContent: "center", zIndex: stackPos, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", cursor: stackPos === deck.length - 1 ? "pointer" : "default" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{labels[idx]}</span>
            </div>
          );
        })}
      </div>
      <button onClick={swap} style={{ padding: "10px 28px", borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontWeight: 600, transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}>
        Swap Card
      </button>
    </div>
  );
}`,

  "glass-icons-iridescent": `import { useState } from "react";
export default function GlassIconsIridescent({ className = "" }: { className?: string }) {
  const [hov, setHov] = useState<number | null>(null);
  const icons = [
    { emoji: "⚡", label: "Speed", hue: 45 }, { emoji: "🔒", label: "Secure", hue: 220 },
    { emoji: "🌐", label: "Global", hue: 160 }, { emoji: "✨", label: "AI", hue: 280 },
    { emoji: "📊", label: "Data", hue: 190 }, { emoji: "🎯", label: "Focus", hue: 0 },
  ];
  return (
    <div className={\`flex flex-wrap gap-4 justify-center \${className}\`}>
      {icons.map((ic, i) => (
        <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ width: 72, height: 72, borderRadius: 20, background: hov === i ? \`hsl(\${ic.hue},70%,25%)\` : "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: \`1px solid hsl(\${ic.hue},60%,\${hov === i ? 50 : 25}%)\`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", transform: hov === i ? "scale(1.12) translateY(-4px)" : "scale(1)", boxShadow: hov === i ? \`0 12px 30px hsl(\${ic.hue},70%,30%)\` : "none" }}>
          <span style={{ fontSize: 24 }}>{ic.emoji}</span>
          <span style={{ color: hov === i ? \`hsl(\${ic.hue},90%,80%)\` : "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{ic.label}</span>
        </div>
      ))}
    </div>
  );
}`,

  "flowing-menu-hover": `import { useState } from "react";
export default function FlowingMenuHover({ className = "" }: { className?: string }) {
  const [hov, setHov] = useState<number | null>(null);
  const items = ["Home", "Work", "About", "Blog", "Contact"];
  return (
    <nav className={\`\${className}\`} style={{ width: "100%", maxWidth: 280 }}>
      {items.map((item, i) => (
        <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ position: "relative", padding: "12px 20px", cursor: "pointer", overflow: "hidden", borderRadius: 10, transition: "padding-left 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.1)", transform: hov === i ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1)", borderRadius: 10 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
            <div style={{ width: 20, height: 2, background: "#8b5cf6", transform: hov === i ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
            <span style={{ color: hov === i ? "#e9d5ff" : "rgba(255,255,255,0.6)", fontWeight: hov === i ? 700 : 400, fontSize: 15, transition: "color 0.3s, font-weight 0.2s", transform: hov === i ? "translateX(4px)" : "none", display: "inline-block", transition2: "transform 0.3s" }}>{item}</span>
          </div>
        </div>
      ))}
    </nav>
  );
}`,

  "elastic-slider-rebound": `import { useState, useRef } from "react";
export default function ElasticSliderRebound({ className = "" }: { className?: string }) {
  const [values, setValues] = useState([30, 65, 80]);
  const labels = ["Volume", "Brightness", "Speed"];
  const colors = ["#8b5cf6", "#3b82f6", "#10b981"];
  return (
    <div className={\`flex flex-col gap-6 \${className}\`}>
      {labels.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, width: 70, flexShrink: 0 }}>{label}</span>
          <div style={{ flex: 1, position: "relative", height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, cursor: "pointer" }}
            onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const v = Math.round(((e.clientX - r.left) / r.width) * 100); setValues(vals => vals.map((vl, j) => j === i ? v : vl)); }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: \`\${values[i]}%\`, background: colors[i], borderRadius: 3, transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1)" }} />
            <div style={{ position: "absolute", top: "50%", left: \`\${values[i]}%\`, transform: "translate(-50%,-50%)", width: 18, height: 18, borderRadius: "50%", background: colors[i], border: "2px solid #fff", boxShadow: \`0 0 12px \${colors[i]}\`, transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)" }} />
          </div>
          <span style={{ color: colors[i], fontSize: 12, fontFamily: "monospace", width: 32, textAlign: "right" }}>{values[i]}</span>
        </div>
      ))}
    </div>
  );
}`,

  "infinite-menu-marquee": `import { useState } from "react";
export default function InfiniteMenuMarquee({ className = "" }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  const items = ["Design Systems", "Motion Design", "3D Interfaces", "AI Components", "Spring Physics", "Glass Morphism", "Type Kinetics", "Spatial UI"];
  const doubled = [...items, ...items];
  return (
    <div className={\`flex flex-col gap-4 \${className}\`}>
      {[1, -1].map((dir, row) => (
        <div key={row} style={{ overflow: "hidden", borderRadius: 10 }}>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            style={{ display: "flex", gap: 12, animation: \`marquee\${dir > 0 ? "Fwd" : "Rev"} 20s linear infinite\`, animationPlayState: paused ? "paused" : "running" }}>
            {doubled.map((item, i) => (
              <div key={i} style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 13, whiteSpace: "nowrap", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.2)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
      <style>{\`@keyframes marqueeFwd { from { transform: translateX(0) } to { transform: translateX(-50%) } } @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }\`}</style>
    </div>
  );
}`,

  "stepper-control-tactile": `import { useState } from "react";
export default function StepperControlTactile({ className = "" }: { className?: string }) {
  const [steps, setSteps] = useState([1, 3, 2]);
  const labels = ["Quantity", "Size (cm)", "Copies"];
  const maxes = [10, 20, 5];
  return (
    <div className={\`flex flex-col gap-4 \${className}\`}>
      {labels.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ flex: 1, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button onClick={() => setSteps(s => s.map((v, j) => j === i ? Math.max(0, v - 1) : v))}
              style={{ width: 32, height: 32, borderRadius: 8, background: steps[i] > 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", transform: "scale(1)" }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.88)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>−</button>
            <span style={{ width: 36, textAlign: "center", color: "#fff", fontWeight: 700, fontFamily: "monospace", fontSize: 16 }}>{steps[i]}</span>
            <button onClick={() => setSteps(s => s.map((v, j) => j === i ? Math.min(maxes[i], v + 1) : v))}
              style={{ width: 32, height: 32, borderRadius: 8, background: steps[i] < maxes[i] ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.4)", color: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.88)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}`,

  "branched-menu-tree": `import { useState } from "react";
export default function BranchedMenuTree({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<Set<string>>(new Set(["root"]));
  const tree = { id: "root", label: "📁 Project Root", children: [
    { id: "src", label: "📂 src", children: [
      { id: "comp", label: "📂 components", children: [{ id: "btn", label: "🔵 Button.tsx" }, { id: "nav", label: "🔵 Nav.tsx" }] },
      { id: "pages", label: "📂 pages", children: [{ id: "home", label: "📄 Home.tsx" }] },
    ]},
    { id: "public", label: "📂 public", children: [{ id: "favicon", label: "🖼 favicon.ico" }] },
  ]};
  const toggle = (id: string) => setOpen(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const render = (node: any, depth = 0): React.ReactNode => (
    <div key={node.id} style={{ marginLeft: depth * 16 }}>
      <div onClick={() => toggle(node.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,0.8)", fontSize: 13, transition: "background 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        onMouseLeave={e => (e.currentTarget.style.background = "")}>
        {node.children && <span style={{ transition: "transform 0.2s", display: "inline-block", transform: open.has(node.id) ? "rotate(90deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.3)", fontSize: 10 }}>▶</span>}
        {!node.children && <span style={{ width: 14 }} />}
        {node.label}
      </div>
      {node.children && open.has(node.id) && node.children.map((c: any) => render(c, depth + 1))}
    </div>
  );
  return <div className={\`\${className}\`} style={{ padding: 8, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>{render(tree)}</div>;
}`,

  "folder-float-hover": `import { useState } from "react";
export default function FolderFloatHover({ className = "" }: { className?: string }) {
  const [hov, setHov] = useState<number | null>(null);
  const folders = [
    { name: "Assets", count: 48, color: "#f59e0b" },
    { name: "Components", count: 127, color: "#8b5cf6" },
    { name: "Designs", count: 23, color: "#3b82f6" },
    { name: "Exports", count: 9, color: "#10b981" },
  ];
  return (
    <div className={\`flex flex-wrap gap-4 justify-center \${className}\`}>
      {folders.map((f, i) => (
        <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ width: 100, cursor: "pointer", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: hov === i ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)" }}>
          <div style={{ position: "relative", height: 72 }}>
            <div style={{ position: "absolute", top: 0, left: 8, right: 0, height: 12, background: f.color, borderRadius: "8px 8px 0 0", opacity: 0.8 }} />
            <div style={{ position: "absolute", top: 8, left: 0, right: 0, bottom: 0, background: f.color, borderRadius: "0 8px 8px 8px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hov === i ? \`0 12px 30px \${f.color}44\` : "0 4px 12px rgba(0,0,0,0.2)", transition: "box-shadow 0.3s" }}>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700 }}>{f.count} files</span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 6, color: hov === i ? "#fff" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, transition: "color 0.2s" }}>{f.name}</div>
        </div>
      ))}
    </div>
  );
}`,

  "thought-line-canvas": `import { useEffect, useRef, useState } from "react";
export default function ThoughtLineCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes] = useState(() => Array.from({ length: 8 }, (_, i) => ({ x: 50 + Math.random() * 300, y: 40 + Math.random() * 160, label: ["Idea","Flow","Design","Build","Test","Deploy","Learn","Iterate"][i], active: i === 0 })));
  const [active, setActive] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (j > i && Math.hypot(n.x - m.x, n.y - m.y) < 120) {
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = i === active || j === active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)";
          ctx.lineWidth = i === active || j === active ? 1.5 : 0.5;
          ctx.stroke();
        }
      });
      const isActive = i === active;
      ctx.beginPath(); ctx.arc(n.x, n.y, isActive ? 10 : 6, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? "#8b5cf6" : "rgba(255,255,255,0.2)";
      ctx.fill();
      if (isActive) { ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.strokeStyle = "rgba(139,92,246,0.3)"; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.fillStyle = "#fff"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(n.label, n.x, n.y + 22);
    });
  }, [active, nodes]);
  return (
    <div className={\`\${className}\`}>
      <canvas ref={canvasRef} width={400} height={220} style={{ width: "100%", height: 220, cursor: "pointer", borderRadius: 12, background: "rgba(0,0,0,0.3)" }}
        onClick={e => { const r = canvasRef.current!.getBoundingClientRect(); const mx = (e.clientX - r.left) * (400/r.width); const my = (e.clientY - r.top) * (220/r.height); let closest = 0, dist = Infinity; nodes.forEach((n, i) => { const d = Math.hypot(n.x - mx, n.y - my); if (d < dist) { dist = d; closest = i; } }); setActive(closest); }} />
    </div>
  );
}`,

  "slosh-gauge-fluid": `import { useState, useEffect, useRef } from "react";
export default function SloshGaugeFluid({ className = "" }: { className?: string }) {
  const [level, setLevel] = useState(65);
  const [slosh, setSlosh] = useState(0);
  const rafRef = useRef<number>();
  const velRef = useRef(0);
  const sloshRef = useRef(0);
  useEffect(() => {
    const animate = () => {
      velRef.current *= 0.92;
      sloshRef.current += velRef.current;
      sloshRef.current *= 0.88;
      setSlosh(sloshRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);
  const handleClick = (e: React.MouseEvent) => {
    velRef.current += (e.nativeEvent.offsetX - 80) * 0.1;
  };
  const fillY = 160 - (level / 100) * 140;
  const wave = \`M 0 \${fillY + slosh} Q 40 \${fillY - slosh * 2} 80 \${fillY + slosh} Q 120 \${fillY - slosh * 2} 160 \${fillY + slosh} L 160 160 L 0 160 Z\`;
  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <svg width="160" height="170" onClick={handleClick} style={{ cursor: "pointer", filter: "drop-shadow(0 0 20px rgba(59,130,246,0.4))" }}>
        <rect x="10" y="10" width="140" height="150" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <clipPath id="gauge-clip"><rect x="10" y="10" width="140" height="150" rx="12" /></clipPath>
        <path d={wave} fill="rgba(59,130,246,0.7)" clipPath="url(#gauge-clip)" />
        <text x="80" y="92" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700">{level}%</text>
        <text x="80" y="112" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">Click to slosh</text>
      </svg>
      <input type="range" min={0} max={100} value={level} onChange={e => setLevel(+e.target.value)} style={{ width: 140 }} />
    </div>
  );
}`,

  "status-mark-badge": `import { useState } from "react";
export default function StatusMarkBadge({ className = "" }: { className?: string }) {
  const statuses = [
    { label: "Active", color: "#10b981", shape: "circle", icon: "●" },
    { label: "Pending", color: "#f59e0b", shape: "square", icon: "◼" },
    { label: "Offline", color: "#6b7280", shape: "line", icon: "—" },
    { label: "Error", color: "#ef4444", shape: "x", icon: "✕" },
    { label: "Draft", color: "#8b5cf6", shape: "diamond", icon: "◆" },
  ];
  const [current, setCurrent] = useState(0);
  const s = statuses[current];
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: \`1px solid \${s.color}44\` }}>
        <span style={{ fontSize: 14, color: s.color, transition: "color 0.4s", fontWeight: 700 }}>{s.icon}</span>
        <span style={{ color: "#fff", fontSize: 14 }}>System Status</span>
        <span style={{ padding: "2px 10px", borderRadius: 20, background: \`\${s.color}22\`, color: s.color, fontSize: 11, fontWeight: 700, border: \`1px solid \${s.color}44\`, transition: "all 0.4s" }}>{s.label}</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {statuses.map((st, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: 32, height: 32, borderRadius: 8, background: i === current ? \`\${st.color}33\` : "rgba(255,255,255,0.05)", border: \`1px solid \${i === current ? st.color : "rgba(255,255,255,0.1)"}\`, color: st.color, cursor: "pointer", fontSize: 12, transition: "all 0.25s" }}>{st.icon}</button>
        ))}
      </div>
    </div>
  );
}`,

  "wake-slider-drag": `import { useState, useRef } from "react";
export default function WakeSliderDrag({ className = "" }: { className?: string }) {
  const [value, setValue] = useState(50);
  const [wakes, setWakes] = useState<number[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const r = trackRef.current!.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const v = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setValue(Math.round(v));
    setWakes(w => [...w.slice(-6), v]);
    setTimeout(() => setWakes(w => w.slice(1)), 600);
  };
  return (
    <div className={\`flex flex-col items-center gap-8 \${className}\`}>
      <div ref={trackRef} style={{ position: "relative", width: 280, height: 60, cursor: "ew-resize" }}
        onMouseMove={e => e.buttons === 1 && drag(e)} onMouseDown={drag}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, height: 4, width: \`\${value}%\`, borderRadius: 2, background: "#8b5cf6", transform: "translateY(-50%)" }} />
        {wakes.map((w, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: \`\${w}%\`, transform: "translate(-50%,-50%)", width: 8 + (wakes.length - i) * 4, height: 8 + (wakes.length - i) * 4, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.4)", opacity: i / wakes.length * 0.5, pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", top: "50%", left: \`\${value}%\`, transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 16px #8b5cf6", border: "2px solid #fff" }} />
      </div>
      <span style={{ fontFamily: "monospace", color: "#8b5cf6", fontSize: 18, fontWeight: 700 }}>{value}</span>
    </div>
  );
}`,

  "dodge-field-pointer": `import { useState, useRef } from "react";
export default function DodgeFieldPointer({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [caught, setCaught] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (caught) return;
    const r = containerRef.current!.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    const dx = pos.x - mx; const dy = pos.y - my;
    const dist = Math.hypot(dx, dy);
    if (dist < 25) {
      const angle = Math.atan2(dy, dx);
      const flee = 30;
      setPos(p => ({
        x: Math.max(10, Math.min(90, p.x + Math.cos(angle) * flee)),
        y: Math.max(10, Math.min(90, p.y + Math.sin(angle) * flee)),
      }));
    }
  };
  return (
    <div ref={containerRef} className={\`relative \${className}\`}
      style={{ width: "100%", height: 220, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", cursor: "crosshair" }}
      onMouseMove={handleMouseMove} onClick={() => { if (Math.hypot(pos.x - 50, pos.y - 50) < 20) setCaught(true); }}>
      <button style={{
        position: "absolute", left: \`\${pos.x}%\`, top: \`\${pos.y}%\`, transform: "translate(-50%,-50%)",
        padding: "8px 16px", borderRadius: 20, background: caught ? "#10b981" : "#8b5cf6",
        border: "none", color: "#fff", fontWeight: 700, fontSize: 12,
        transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1), top 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
        cursor: "pointer", pointerEvents: "none", boxShadow: caught ? "0 0 20px #10b981" : "0 0 16px #8b5cf6",
      }}>{caught ? "✓ Caught!" : "Catch me!"}</button>
      {caught && <button onClick={() => { setCaught(false); setPos({ x: 50, y: 50 }); }} style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", padding: "6px 16px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: 12 }}>Reset</button>}
    </div>
  );
}`,

  "rubber-segment-switch": `import { useState } from "react";
export default function RubberSegmentSwitch({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(1);
  const [pressed, setPressed] = useState(false);
  const segments = [["☀️", "Light"], ["⚡", "Auto"], ["🌙", "Dark"]];
  return (
    <div className={\`flex flex-col items-center gap-6 \${className}\`}>
      <div style={{ position: "relative", display: "inline-flex", background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ position: "absolute", top: 4, left: \`\${active * 33.33 + 0.5}%\`, width: "32%", height: "calc(100% - 8px)", background: "rgba(139,92,246,0.8)", borderRadius: 10, transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)", backdropFilter: "blur(8px)", boxShadow: "0 4px 16px rgba(139,92,246,0.3)", transform: pressed ? "scaleY(0.9)" : "scaleY(1)", transitionDuration: "0.3s" }} />
        {segments.map(([icon, label], i) => (
          <button key={i} onClick={() => { setActive(i); setPressed(true); setTimeout(() => setPressed(false), 200); }}
            style={{ position: "relative", zIndex: 1, padding: "8px 18px", borderRadius: 10, border: "none", background: "transparent", color: i === active ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: i === active ? 700 : 400, cursor: "pointer", transition: "color 0.3s", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            {icon} {label}
          </button>
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Mode: {segments[active][1]}</div>
    </div>
  );
}`,

  "pulse-heart-micro": `import { useState, useEffect } from "react";
export default function PulseHeartMicro({ className = "" }: { className?: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(142);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const toggle = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setCount(c => newLiked ? c + 1 : c - 1);
    if (newLiked) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i, x: Math.cos((i / 8) * Math.PI * 2) * 30, y: Math.sin((i / 8) * Math.PI * 2) * 30,
        color: ["#f43f5e","#fb7185","#fda4af","#ff6b6b","#ff4757"][i % 5],
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }
  };
  return (
    <div className={\`flex items-center justify-center \${className}\`}>
      <div style={{ position: "relative" }}>
        {particles.map(p => (
          <div key={p.id} style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, borderRadius: "50%", background: p.color, transform: \`translate(calc(-50% + \${p.x}px), calc(-50% + \${p.y}px))\`, opacity: 0, animation: "particleBurst 0.6s ease-out forwards", zIndex: 10, pointerEvents: "none" }} />
        ))}
        <button onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 24, background: liked ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.06)", border: \`1px solid \${liked ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.12)"}\`, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <span style={{ fontSize: 22, transform: liked ? "scale(1.2)" : "scale(1)", display: "inline-block", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", filter: liked ? "drop-shadow(0 0 8px #f43f5e)" : "none" }}>❤️</span>
          <span style={{ color: liked ? "#f43f5e" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 15, fontFamily: "monospace", minWidth: 28 }}>{count}</span>
        </button>
      </div>
      <style>{\`@keyframes particleBurst { 0% { opacity: 1; transform: translate(-50%, -50%); } 100% { opacity: 0; transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))); } }\`}</style>
    </div>
  );
}`,

};
