// Bespoke high-craft visual previews for all 104 OpenUI components
import * as React from "react";

export function AccordionChevronListPreview() {
  const [openIdx, setOpenIdx] = React.useState(0);
  const items = [
    { title: "Design System Tokens", desc: "Atomic CSS variables & dark mode palette." },
    { title: "Kinetic Motion Engine", desc: "60fps spring physics & velocity damping." },
    { title: "Accessible Primitives", desc: "WCAG AAA contrast & keyboard navigation." }
  ];
  return (
    <div className="w-full max-w-[280px] space-y-1.5 font-mono text-[11px] select-none">
      {items.map((it, i) => (
        <div key={i} className="border border-line/40 rounded-lg overflow-hidden bg-paper/60 shadow-2xs">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-line/10 transition-colors"
          >
            <span className={`font-semibold ${openIdx === i ? "text-oxide" : "text-ink"}`}>{it.title}</span>
            <span className={`text-[10px] text-graphite transition-transform duration-200 ${openIdx === i ? "rotate-180 text-oxide" : ""}`}>▼</span>
          </button>
          {openIdx === i && (
            <div className="px-3 pb-2 text-[10px] text-graphite leading-relaxed border-t border-line/20 pt-1.5 bg-line/5">
              {it.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function AccordionIndexPreview() {
  const [active, setActive] = React.useState(1);
  const sections = ["PHILOSOPHY", "METHODOLOGY", "ENGINEERING"];
  return (
    <div className="w-full max-w-[260px] border border-line/40 rounded-xl overflow-hidden bg-paper shadow-2xs font-mono select-none">
      {sections.map((title, i) => (
        <div key={i} className="border-b border-line/30 last:border-b-0">
          <button
            type="button"
            onClick={() => setActive(active === i ? -1 : i)}
            className={`w-full px-3.5 py-2.5 flex items-center justify-between transition-colors ${active === i ? "bg-oxide/10 text-oxide font-bold" : "hover:bg-line/10 text-ink"}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] opacity-50">0{i + 1}</span>
              <span className="text-[11px] tracking-wider">{title}</span>
            </div>
            <span className="text-xs">{active === i ? "−" : "+"}</span>
          </button>
          {active === i && (
            <div className="px-3.5 py-2 text-[10px] text-graphite bg-surface/30">
              Systematic primitives designed for high-density modern interfaces.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ActionSheetDialogPreview() {
  return (
    <div className="w-full max-w-[240px] flex flex-col gap-1.5 font-mono text-[11px] select-none">
      <div className="p-3 rounded-2xl bg-paper/95 border border-line/40 shadow-md backdrop-blur-xs flex flex-col gap-1">
        <div className="text-[8.5px] text-graphite font-bold uppercase tracking-widest text-center border-b border-line/30 pb-1">
          Action Sheet
        </div>
        <button type="button" className="w-full py-1 px-2.5 rounded-lg text-left hover:bg-line/15 text-ink flex items-center justify-between">
          <span>Share Spec</span>
          <span className="text-[10px] text-oxide">↗</span>
        </button>
        <button type="button" className="w-full py-1 px-2.5 rounded-lg text-left hover:bg-line/15 text-ink flex items-center justify-between">
          <span>Duplicate</span>
          <span className="text-[10px] text-graphite">⌘D</span>
        </button>
        <button type="button" className="w-full py-1 px-2.5 rounded-lg text-left hover:bg-red-500/10 text-red-600 font-semibold flex items-center justify-between">
          <span>Archive</span>
          <span className="text-[10px]">✕</span>
        </button>
      </div>
      <div className="py-1.5 text-center text-[10px] font-bold rounded-xl bg-line/20 text-graphite hover:text-ink cursor-pointer">
        Cancel
      </div>
    </div>
  );
}

export function ActionSheetPopoverPreview() {
  return (
    <div className="relative font-mono select-none flex flex-col items-center">
      <div className="px-3 py-1.5 rounded-lg border border-line/40 bg-paper text-ink text-[11px] flex items-center gap-2 shadow-xs cursor-pointer">
        <span className="w-2 h-2 rounded-full bg-oxide animate-pulse" />
        <span>Menu Popover</span>
        <span className="text-[9px] text-graphite">▾</span>
      </div>
      <div className="mt-2 w-44 p-2 rounded-xl bg-paper border border-line/50 shadow-xl flex flex-col gap-1 text-[10px]">
        <div className="px-2 py-0.5 text-graphite uppercase text-[8px] font-bold tracking-wider">Quick Actions</div>
        <div className="px-2 py-1 rounded hover:bg-line/15 cursor-pointer text-ink flex items-center justify-between">
          <span>Export SVG</span>
          <span className="text-graphite text-[9px]">.svg</span>
        </div>
        <div className="px-2 py-1 rounded hover:bg-line/15 cursor-pointer text-ink flex items-center justify-between">
          <span>Copy Token</span>
          <span className="text-oxide text-[9px]">var()</span>
        </div>
      </div>
    </div>
  );
}

export function AspectRatioSelectorPreview() {
  const [ratio, setRatio] = React.useState("16:9");
  const dimensions: Record<string, string> = { "16:9": "w-32 h-[4.5rem]", "4:3": "w-28 h-[5.25rem]", "1:1": "w-24 h-24" };
  return (
    <div className="flex flex-col items-center gap-2.5 font-mono select-none">
      <div className={`${dimensions[ratio]} border-2 border-dashed border-oxide/60 rounded-lg bg-oxide/5 flex flex-col items-center justify-center transition-all duration-300 shadow-inner`}>
        <span className="text-xs font-bold text-oxide">{ratio}</span>
        <span className="text-[8px] text-graphite">FRAME</span>
      </div>
      <div className="flex gap-1 bg-surface/50 p-1 rounded-lg border border-line/30 text-[10px]">
        {["16:9", "4:3", "1:1"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRatio(r)}
            className={`px-2 py-0.5 rounded transition-colors ${ratio === r ? "bg-oxide text-white font-bold" : "text-graphite hover:text-ink"}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AudioTrackScrubberPreview() {
  const [progress, setProgress] = React.useState(35);
  React.useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 95 ? 10 : p + 2)), 300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-paper/80 shadow-xs font-mono select-none space-y-2">
      <div className="flex items-center justify-between text-[10px] text-graphite">
        <span className="text-ink font-bold">Track_Master.wav</span>
        <span className="text-oxide">01:42 / 03:15</span>
      </div>
      <div className="h-6 flex items-center gap-[2px] cursor-pointer">
        {Array.from({ length: 32 }).map((_, i) => {
          const height = Math.sin(i * 0.4) * 10 + 14;
          const isPlayed = (i / 32) * 100 <= progress;
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-150 ${isPlayed ? "bg-oxide" : "bg-line/40"}`}
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AvatarBadgeGroupPreview() {
  const avatars = [
    { name: "Alex Chen", role: "Lead", color: "bg-oxide" },
    { name: "Devin Ross", role: "Architect", color: "bg-indigo-600" },
    { name: "Sia Lin", role: "Design", color: "bg-emerald-600" }
  ];
  return (
    <div className="flex items-center gap-3 font-mono select-none">
      {avatars.map((av, i) => (
        <div key={i} className="relative group cursor-pointer">
          <div className={`w-10 h-10 rounded-full ${av.color} text-white font-bold text-xs flex items-center justify-center border-2 border-paper shadow-md transition-transform group-hover:scale-110`}>
            {av.name.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-paper" />
        </div>
      ))}
    </div>
  );
}

export function AvatarCollaboratorStackPreview() {
  const users = ["AC", "JD", "MK", "SL", "+4"];
  const colors = ["bg-oxide", "bg-sky-600", "bg-amber-600", "bg-indigo-600", "bg-line/60 text-ink"];
  return (
    <div className="flex items-center -space-x-2 font-mono select-none">
      {users.map((u, i) => (
        <div
          key={i}
          className={`w-9 h-9 rounded-full ${colors[i]} text-white text-[11px] font-bold flex items-center justify-center border-2 border-paper shadow-xs hover:z-10 hover:scale-110 transition-transform cursor-pointer`}
        >
          {u}
        </div>
      ))}
    </div>
  );
}

export function AvatarProfileCardPreview() {
  return (
    <div className="w-full max-w-[240px] p-3.5 rounded-2xl border border-line/40 bg-paper/95 shadow-md font-mono select-none flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-oxide to-amber-500 text-white font-bold text-sm flex items-center justify-center border-2 border-white shadow-sm mb-2">
        EC
      </div>
      <div className="font-display font-bold text-sm text-ink leading-tight">Elena Cruz</div>
      <div className="text-[10px] text-oxide font-semibold uppercase tracking-wider mb-2">Principal Engineer</div>
      <div className="w-full flex items-center justify-around border-t border-line/20 pt-2 text-[10px] text-graphite">
        <div><span className="font-bold text-ink">48</span> repos</div>
        <div><span className="font-bold text-ink">1.2k</span> stars</div>
      </div>
    </div>
  );
}

export function BadgeNotificationCounterPreview() {
  return (
    <div className="flex items-center gap-4 font-mono select-none">
      <div className="relative p-2.5 rounded-xl border border-line/40 bg-paper shadow-xs">
        <span className="text-base">🔔</span>
        <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1.5 rounded-full bg-oxide text-white font-bold text-[10px] flex items-center justify-center shadow-xs animate-bounce">
          12
        </span>
      </div>
      <div className="relative p-2.5 rounded-xl border border-line/40 bg-paper shadow-xs">
        <span className="text-base">💬</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 h-5 rounded-full bg-ink text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
          99+
        </span>
      </div>
    </div>
  );
}

export function BadgePillStatusPreview() {
  return (
    <div className="flex flex-wrap gap-2 justify-center font-mono text-[10px] select-none">
      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        LIVE
      </span>
      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        SYNCING
      </span>
      <span className="px-2.5 py-1 rounded-full bg-oxide/15 border border-oxide/30 text-oxide font-bold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-oxide" />
        ERROR
      </span>
    </div>
  );
}

export function BadgeTagCloudPreview() {
  const tags = ["TypeScript", "Next.js", "Vite", "Tailwind", "Canvas", "GLSL"];
  return (
    <div className="flex flex-wrap gap-1.5 justify-center max-w-[260px] font-mono text-[10.5px] select-none">
      {tags.map((t, i) => (
        <span
          key={i}
          className="px-2.5 py-1 rounded-md border border-line/40 bg-paper hover:border-oxide hover:text-oxide cursor-pointer transition-colors shadow-2xs text-graphite"
        >
          #{t}
        </span>
      ))}
    </div>
  );
}

export function BadgeTagStripPreview() {
  return (
    <div className="w-full max-w-[260px] flex items-center gap-1.5 overflow-hidden py-2 font-mono text-[10px] select-none">
      <span className="px-2 py-0.5 rounded bg-ink text-paper font-bold shrink-0">TAGS</span>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        <span className="px-2 py-0.5 rounded bg-line/20 text-ink shrink-0">v2.4.0</span>
        <span className="px-2 py-0.5 rounded bg-line/20 text-ink shrink-0">core</span>
        <span className="px-2 py-0.5 rounded bg-oxide/15 text-oxide font-bold shrink-0">experimental</span>
        <span className="px-2 py-0.5 rounded bg-line/20 text-ink shrink-0">esm</span>
      </div>
    </div>
  );
}

export function BannerAlertBoxPreview() {
  return (
    <div className="w-full max-w-[270px] p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 shadow-xs font-mono text-[11px] select-none flex items-start gap-2.5">
      <span className="text-amber-600 text-sm">⚠</span>
      <div className="flex-1">
        <div className="font-bold text-amber-800 dark:text-amber-300 leading-tight">Registry Synchronized</div>
        <div className="text-[9.5px] text-amber-700/80 dark:text-amber-400/80 mt-0.5">All 815 components are validated.</div>
      </div>
      <button type="button" className="text-amber-600 hover:text-amber-900 text-xs">✕</button>
    </div>
  );
}

export function BannerNoticeStripPreview() {
  return (
    <div className="w-full max-w-[280px] px-3 py-1.5 rounded-full border border-oxide/30 bg-oxide/10 text-ink font-mono text-[10.5px] flex items-center justify-between select-none shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded-full bg-oxide text-white text-[8.5px] font-bold">NEW</span>
        <span className="truncate text-ink font-semibold">Visual Engine v2.0 Live</span>
      </div>
      <span className="text-oxide font-bold ml-1">→</span>
    </div>
  );
}

export function BreadcrumbsSlashTrailPreview() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] select-none text-graphite">
      <span className="hover:text-ink cursor-pointer">openui</span>
      <span className="text-line/60">/</span>
      <span className="hover:text-ink cursor-pointer">components</span>
      <span className="text-line/60">/</span>
      <span className="text-oxide font-bold">navigation</span>
    </div>
  );
}

export function CascadingMenuTreePreview() {
  return (
    <div className="w-48 p-2 rounded-xl border border-line/40 bg-paper shadow-lg font-mono text-[10.5px] select-none space-y-1">
      <div className="px-2 py-1 rounded hover:bg-line/15 flex items-center justify-between text-ink cursor-pointer">
        <span>Components</span>
        <span className="text-[8.5px] text-graphite">▶</span>
      </div>
      <div className="px-2 py-1 rounded bg-oxide/10 text-oxide font-bold flex items-center justify-between cursor-pointer">
        <span>Motion Engines</span>
        <span className="text-[8.5px]">▶</span>
      </div>
      <div className="px-2 py-1 rounded hover:bg-line/15 flex items-center justify-between text-ink cursor-pointer">
        <span>Color Palettes</span>
        <span className="text-[8.5px] text-graphite">▶</span>
      </div>
    </div>
  );
}

export function ChipToggleClusterPreview() {
  const [selected, setSelected] = React.useState(["React", "Motion"]);
  const toggle = (t: string) => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  const chips = ["React", "Motion", "Tailwind", "WebGL"];
  return (
    <div className="flex flex-wrap gap-1.5 justify-center font-mono text-[10.5px] select-none">
      {chips.map((c) => {
        const isSel = selected.includes(c);
        return (
          <button
            key={c}
            type="button"
            onClick={() => toggle(c)}
            className={`px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isSel ? "border-oxide bg-oxide text-white font-bold shadow-xs" : "border-line/40 bg-paper text-graphite hover:text-ink"}`}
          >
            {isSel && <span className="text-[9px]">✓</span>}
            <span>{c}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CnPreview() {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-[#0d1117] text-white font-mono text-[10px] select-none shadow-md">
      <div className="text-graphite text-[8.5px] font-bold uppercase tracking-widest mb-1.5">cn utility merge</div>
      <div className="text-sky-400">cn(</div>
      <div className="pl-3 text-emerald-400">"px-4 py-2 font-mono",</div>
      <div className="pl-3 text-amber-300">isActive && "bg-oxide text-white"</div>
      <div className="text-sky-400">)</div>
      <div className="mt-2 pt-1.5 border-t border-white/10 text-oxide font-bold">
        → "px-4 py-2 font-mono bg-oxide text-white"
      </div>
    </div>
  );
}

export function CodeDiffViewerPreview() {
  return (
    <div className="w-full max-w-[260px] rounded-xl border border-line/40 bg-[#0d1117] text-white font-mono text-[10px] select-none overflow-hidden shadow-md">
      <div className="px-3 py-1.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-[8.5px] text-graphite">
        <span>Button.tsx</span>
        <span className="text-emerald-400">+3 -1</span>
      </div>
      <div className="p-2.5 space-y-1">
        <div className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">- const speed = 100;</div>
        <div className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">+ const speed = 60; // 60fps</div>
        <div className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">+ const damping = 0.85;</div>
      </div>
    </div>
  );
}

export function CodeSnippetBoxPreview() {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-[#12161f] text-white font-mono text-[10px] select-none shadow-md relative">
      <div className="flex items-center justify-between text-graphite text-[8.5px] mb-2 border-b border-white/10 pb-1">
        <span>terminal</span>
        <span className="text-oxide font-bold cursor-pointer hover:underline">COPY</span>
      </div>
      <div className="text-emerald-400 font-bold">$ npx @openui/cli add button</div>
      <div className="text-graphite text-[9px] mt-1">✔ Resolving package dependencies...</div>
    </div>
  );
}

export function CodeTerminalBlockPreview() {
  return (
    <div className="w-full max-w-[270px] rounded-xl border border-line/40 bg-[#0a0d14] text-white font-mono text-[10px] select-none overflow-hidden shadow-lg">
      <div className="px-3 py-1.5 bg-white/5 border-b border-white/10 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="text-[8.5px] text-graphite ml-2 font-bold">zsh — 80x24</span>
      </div>
      <div className="p-3 space-y-1">
        <div className="text-graphite">~/projects/openui <span className="text-oxide">(main)</span></div>
        <div className="text-emerald-400">$ pnpm test:all</div>
        <div className="text-white/80">✔ 815 catalogue resources passing <span className="animate-pulse text-oxide">_</span></div>
      </div>
    </div>
  );
}

export function CollapsibleDetailsCardPreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[11px] select-none">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between font-bold text-ink"
      >
        <span>Hardware Acceleration</span>
        <span className={`text-oxide text-xs transition-transform ${open ? "rotate-90" : ""}`}>›</span>
      </button>
      {open && (
        <div className="mt-2 pt-2 border-t border-line/20 text-[10px] text-graphite space-y-1">
          <div className="flex justify-between"><span>GPU Layer:</span> <span className="text-ink font-bold">Active</span></div>
          <div className="flex justify-between"><span>Frame Rate:</span> <span className="text-emerald-600 font-bold">60.0 FPS</span></div>
        </div>
      )}
    </div>
  );
}

export function CollapsibleSectionCardPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full max-w-[260px] rounded-xl border border-line/40 bg-paper overflow-hidden shadow-xs font-mono select-none">
      <div className="p-3 flex items-center justify-between bg-surface/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-oxide" />
          <span className="font-bold text-[11px] text-ink">Architecture DNA</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-[10px] px-2 py-0.5 rounded bg-line/30 text-ink font-bold hover:bg-oxide hover:text-white transition-colors"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>
      {open && (
        <div className="p-3 text-[10px] text-graphite border-t border-line/30 bg-paper">
          Modular registry primitives compiled to strict TypeScript schemas.
        </div>
      )}
    </div>
  );
}

export function ColorGradientSliderPreview() {
  const [val, setVal] = React.useState(60);
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px]">
        <span className="text-ink font-bold">Gradient Spectrum</span>
        <span className="text-oxide font-bold">{val}%</span>
      </div>
      <div className="relative h-4 rounded-full bg-gradient-to-r from-oxide via-amber-400 to-sky-500 shadow-inner">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-ink shadow-md -translate-x-1/2"
          style={{ left: `${val}%` }}
        />
      </div>
    </div>
  );
}

export function ColorPaletteStripPreview() {
  const colors = [
    { name: "Oxide", hex: "#ba442c", bg: "bg-[#ba442c]" },
    { name: "Sky", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
    { name: "Emerald", hex: "#10b981", bg: "bg-[#10b981]" },
    { name: "Amber", hex: "#f59e0b", bg: "bg-[#f59e0b]" },
    { name: "Ink", hex: "#1e293b", bg: "bg-[#1e293b]" }
  ];
  return (
    <div className="flex items-center gap-2 font-mono select-none">
      {colors.map((c) => (
        <div key={c.name} className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className={`w-8 h-8 rounded-lg ${c.bg} border border-white shadow-xs group-hover:scale-110 transition-transform`} />
          <span className="text-[8px] text-graphite font-bold">{c.name}</span>
        </div>
      ))}
    </div>
  );
}

export function ColorSwatchPickerPreview() {
  const [selected, setSelected] = React.useState("#ba442c");
  const swatches = ["#ba442c", "#38bdf8", "#10b981", "#f59e0b", "#8b5cf6", "#141413"];
  return (
    <div className="p-3 rounded-2xl border border-line/40 bg-paper shadow-xs font-mono select-none flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selected }} />
        <span className="text-[11px] font-bold text-ink uppercase">{selected}</span>
      </div>
      <div className="flex gap-2">
        {swatches.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelected(color)}
            className={`w-6 h-6 rounded-full transition-transform ${selected === color ? "ring-2 ring-offset-2 ring-oxide scale-110" : "hover:scale-105"}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export function ComboboxAutocompletePreview() {
  return (
    <div className="w-full max-w-[240px] font-mono select-none space-y-1">
      <div className="px-3 py-1.5 rounded-lg border border-oxide bg-paper shadow-xs flex items-center justify-between text-[11px]">
        <span className="text-ink font-semibold">Butt|</span>
        <span className="text-[9px] text-graphite">3 matches</span>
      </div>
      <div className="p-1 rounded-lg border border-line/40 bg-paper shadow-md text-[10px] space-y-0.5">
        <div className="px-2 py-1 rounded bg-oxide text-white font-bold">Button Primary</div>
        <div className="px-2 py-1 rounded text-ink hover:bg-line/10">Button Outline</div>
        <div className="px-2 py-1 rounded text-ink hover:bg-line/10">Button Ghost</div>
      </div>
    </div>
  );
}

export function CommandMenuBarPreview() {
  return (
    <div className="w-full max-w-[270px] px-3 py-2 rounded-xl border border-line/40 bg-paper shadow-md font-mono text-[11px] select-none flex items-center justify-between">
      <div className="flex items-center gap-2 text-graphite">
        <span>🔍</span>
        <span>Type a command...</span>
      </div>
      <span className="px-1.5 py-0.5 rounded border border-line/40 bg-surface/50 text-[9px] text-graphite font-bold">
        ⌘K
      </span>
    </div>
  );
}

export function CommandPaletteModalPreview() {
  return (
    <div className="w-full max-w-[260px] p-2.5 rounded-2xl border border-line/50 bg-[#0f121a] text-white font-mono text-[10px] select-none shadow-2xl space-y-2">
      <div className="flex items-center gap-2 px-2 py-1 border-b border-white/10 text-graphite">
        <span>⚡</span>
        <span className="text-white font-bold">Search actions &amp; files</span>
      </div>
      <div className="space-y-1">
        <div className="px-2 py-1 rounded bg-oxide text-white font-semibold flex items-center justify-between">
          <span>Run test suite</span>
          <span className="text-[8.5px] opacity-75">↵</span>
        </div>
        <div className="px-2 py-1 rounded hover:bg-white/5 text-white/80 flex items-center justify-between">
          <span>Switch to dark mode</span>
          <span className="text-[8.5px] opacity-75">⌘D</span>
        </div>
      </div>
    </div>
  );
}

export function CommandSearchPillPreview() {
  return (
    <div className="px-4 py-2 rounded-full border border-line/40 bg-paper shadow-sm font-mono text-[11px] text-graphite flex items-center gap-3 select-none hover:border-oxide cursor-pointer transition-colors">
      <span>Search registry...</span>
      <span className="px-2 py-0.5 rounded-full bg-line/30 text-ink text-[9px] font-bold">
        ⌘K
      </span>
    </div>
  );
}

export function CopyButtonPreview() {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`px-4 py-2 rounded-xl font-mono text-[11px] font-bold transition-all shadow-xs flex items-center gap-2 ${copied ? "bg-emerald-600 text-white" : "border border-line/40 bg-paper text-ink hover:border-ink"}`}
    >
      <span>{copied ? "✓" : "📋"}</span>
      <span>{copied ? "COPIED TO CLIPBOARD" : "COPY IMPORT SPEC"}</span>
    </button>
  );
}

export function CountdownTimerUnitPreview() {
  const [sec, setSec] = React.useState(42);
  React.useEffect(() => {
    const id = setInterval(() => setSec(s => s <= 0 ? 59 : s - 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-2 font-mono select-none">
      {[
        { val: "04", label: "DAYS" },
        { val: "18", label: "HOURS" },
        { val: "32", label: "MINS" },
        { val: String(sec).padStart(2, "0"), label: "SECS" }
      ].map((u, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-11 h-12 rounded-lg border border-line/40 bg-paper shadow-sm flex items-center justify-center font-bold text-lg text-oxide">
            {u.val}
          </div>
          <span className="text-[7.5px] text-graphite uppercase font-bold mt-1">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CreditCardInputPreview() {
  return (
    <div className="w-full max-w-[240px] p-3.5 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white font-mono select-none shadow-xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <span className="w-6 h-4 rounded bg-amber-400/80" />
        <span className="text-xs font-bold tracking-widest text-oxide">OPENUI</span>
      </div>
      <div className="text-sm font-bold tracking-widest">•••• 4829 1920 8824</div>
      <div className="flex justify-between text-[8px] text-graphite">
        <div>CARDHOLDER<br /><span className="text-white font-bold">ALEX R.</span></div>
        <div>EXPIRES<br /><span className="text-white font-bold">12/28</span></div>
      </div>
    </div>
  );
}

export function DiffInlineBadgePreview() {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] select-none">
      <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold">
        +248 lines
      </span>
      <span className="px-2.5 py-1 rounded-md bg-oxide/15 border border-oxide/30 text-oxide font-bold">
        -32 lines
      </span>
    </div>
  );
}

export function DockNavigationPreview() {
  const icons = ["⌘", "⚡", "◈", "⚙", "⌕"];
  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-line/40 bg-paper/90 shadow-xl backdrop-blur-md select-none">
      {icons.map((ic, i) => (
        <button
          key={i}
          type="button"
          className="w-9 h-9 rounded-xl border border-line/30 bg-surface/60 text-ink font-mono font-bold text-sm flex items-center justify-center hover:scale-125 hover:bg-oxide hover:text-white transition-all shadow-2xs"
        >
          {ic}
        </button>
      ))}
    </div>
  );
}

export function DockedActionToolbarPreview() {
  return (
    <div className="flex items-center gap-1 p-1.5 rounded-xl border border-line/50 bg-[#14171f] text-white shadow-2xl font-mono text-[11px] select-none">
      <button type="button" className="px-2.5 py-1 rounded-lg bg-oxide text-white font-bold">Edit</button>
      <button type="button" className="px-2.5 py-1 rounded-lg hover:bg-white/10 text-white/80">Preview</button>
      <div className="w-[1px] h-4 bg-white/20 mx-1" />
      <button type="button" className="px-2 py-1 rounded-lg hover:bg-white/10 text-graphite">⤺</button>
      <button type="button" className="px-2 py-1 rounded-lg hover:bg-white/10 text-graphite">⤻</button>
    </div>
  );
}

export function DropdownActionMenuPreview() {
  return (
    <div className="w-44 p-1.5 rounded-xl border border-line/40 bg-paper shadow-xl font-mono text-[10.5px] select-none space-y-0.5">
      <div className="px-2.5 py-1 rounded hover:bg-line/15 text-ink flex items-center justify-between cursor-pointer">
        <span>Edit Node</span>
        <span className="text-graphite">⌘E</span>
      </div>
      <div className="px-2.5 py-1 rounded hover:bg-line/15 text-ink flex items-center justify-between cursor-pointer">
        <span>Clone Tree</span>
        <span className="text-graphite">⌘C</span>
      </div>
      <div className="border-t border-line/20 my-1" />
      <div className="px-2.5 py-1 rounded hover:bg-red-500/15 text-red-600 font-bold flex items-center justify-between cursor-pointer">
        <span>Delete</span>
        <span>⌫</span>
      </div>
    </div>
  );
}

export function DropdownFilterMenuPreview() {
  return (
    <div className="w-48 p-2 rounded-xl border border-line/40 bg-paper shadow-xl font-mono text-[10px] select-none space-y-1">
      <div className="font-bold text-graphite text-[8.5px] uppercase tracking-wider px-1">Filter by Platform</div>
      <label className="flex items-center gap-2 px-1.5 py-1 rounded hover:bg-line/15 cursor-pointer text-ink font-semibold">
        <input type="checkbox" defaultChecked className="accent-oxide" />
        <span>Web Application</span>
      </label>
      <label className="flex items-center gap-2 px-1.5 py-1 rounded hover:bg-line/15 cursor-pointer text-ink">
        <input type="checkbox" defaultChecked className="accent-oxide" />
        <span>Mobile iOS / Android</span>
      </label>
      <label className="flex items-center gap-2 px-1.5 py-1 rounded hover:bg-line/15 cursor-pointer text-ink">
        <input type="checkbox" className="accent-oxide" />
        <span>Desktop Engine</span>
      </label>
    </div>
  );
}

export function ExpandableDataRowPreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="w-full max-w-[270px] rounded-xl border border-line/40 bg-paper overflow-hidden shadow-xs font-mono text-[10px] select-none">
      <div
        onClick={() => setOpen(!open)}
        className="p-2.5 flex items-center justify-between bg-surface/40 hover:bg-surface/80 cursor-pointer"
      >
        <span className="font-bold text-ink">user_auth_token_772</span>
        <span className="text-emerald-600 font-bold">200 OK</span>
      </div>
      {open && (
        <div className="p-2.5 border-t border-line/20 bg-line/5 text-graphite space-y-1">
          <div>method: <span className="text-ink font-bold">POST</span></div>
          <div>latency: <span className="text-oxide font-bold">14.2ms</span></div>
          <div>payload: <span className="text-ink">AES_GCM_256</span></div>
        </div>
      )}
    </div>
  );
}

export function ExpandableLogTilePreview() {
  return (
    <div className="w-full max-w-[270px] p-2.5 rounded-xl border border-line/40 bg-[#0c1017] text-white font-mono text-[9.5px] select-none shadow-md space-y-1.5">
      <div className="flex items-center justify-between text-graphite text-[8.5px]">
        <span>14:24:08.192</span>
        <span className="text-amber-400 font-bold">[WARN]</span>
      </div>
      <div className="text-white/90 font-bold leading-tight">MeshBuffer: high vertex load detected</div>
      <div className="text-graphite border-l-2 border-amber-500 pl-2 text-[8.5px]">
        at VisualEngine.render (mesh.ts:88:14)
      </div>
    </div>
  );
}

export function FileTreeViewPreview() {
  return (
    <div className="w-48 p-2.5 rounded-xl border border-line/40 bg-paper shadow-md font-mono text-[10.5px] select-none space-y-1 text-ink">
      <div className="flex items-center gap-1.5 font-bold text-oxide">
        <span>▼</span> <span>📁 src</span>
      </div>
      <div className="pl-4 space-y-1 text-graphite">
        <div className="flex items-center gap-1.5 text-ink hover:text-oxide cursor-pointer"><span>📄</span> Button.tsx</div>
        <div className="flex items-center gap-1.5 text-ink hover:text-oxide cursor-pointer"><span>📄</span> theme.css</div>
        <div className="flex items-center gap-1.5 text-ink hover:text-oxide cursor-pointer"><span>📄</span> tokens.ts</div>
      </div>
    </div>
  );
}

export function FloatingDockBarPreview() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const items = ["🔥", "⚡", "💎", "🚀", "⚙"];
  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-line/40 bg-paper/90 shadow-2xl backdrop-blur-md select-none">
      {items.map((icon, i) => {
        const isHovered = hovered === i;
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`w-9 h-9 rounded-xl border border-line/30 bg-surface/60 flex items-center justify-center text-sm transition-all duration-200 ${isHovered ? "scale-125 -translate-y-1 bg-oxide text-white shadow-md" : "text-ink"}`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}

export function GaugeSpeedometerPreview() {
  const [speed, setSpeed] = React.useState(74);
  React.useEffect(() => {
    const id = setInterval(() => setSpeed(s => (s >= 95 ? 40 : s + 4)), 400);
    return () => clearInterval(id);
  }, []);
  const angle = (speed / 100) * 180 - 90;
  return (
    <div className="flex flex-col items-center font-mono select-none">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-[10px] border-line/30" />
        <div className="absolute inset-0 rounded-t-full border-[10px] border-oxide border-b-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
        <div
          className="absolute bottom-0 left-1/2 w-1 h-14 bg-ink origin-bottom transition-transform duration-300"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ink" />
      </div>
      <span className="text-xs font-bold text-ink mt-1">{speed} <span className="text-[9px] text-graphite">KM/H</span></span>
    </div>
  );
}

export function IconActionStripPreview() {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border border-line/40 bg-paper shadow-xs select-none">
      {["✂", "📋", "✏", "🔍", "⚙"].map((ic, i) => (
        <button
          key={i}
          type="button"
          className="w-8 h-8 rounded-lg hover:bg-oxide hover:text-white text-ink transition-colors flex items-center justify-center font-bold text-xs"
        >
          {ic}
        </button>
      ))}
    </div>
  );
}

export function InlineEditableHeadingPreview() {
  return (
    <div className="p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none flex items-center gap-2">
      <div className="font-display font-bold text-base text-ink underline decoration-dashed decoration-oxide underline-offset-4">
        Design Architecture
      </div>
      <span className="text-[10px] text-oxide font-bold">✎</span>
    </div>
  );
}

export function InputOtpPinPreview() {
  const digits = ["4", "8", "2", "9", "1", ""];
  return (
    <div className="flex items-center gap-2 font-mono select-none">
      {digits.map((d, i) => (
        <div
          key={i}
          className={`w-9 h-11 rounded-lg border-2 flex items-center justify-center text-base font-bold shadow-xs ${i === 5 ? "border-oxide bg-oxide/5 animate-pulse text-oxide" : "border-line/50 bg-paper text-ink"}`}
        >
          {d || <span className="w-2 h-0.5 bg-oxide animate-pulse" />}
        </div>
      ))}
    </div>
  );
}

export function KanbanMiniColumnPreview() {
  return (
    <div className="w-48 p-2.5 rounded-xl border border-line/40 bg-surface/40 font-mono text-[10px] select-none space-y-2">
      <div className="flex items-center justify-between font-bold text-ink">
        <span>In Progress</span>
        <span className="w-4 h-4 rounded-full bg-oxide text-white text-[8.5px] flex items-center justify-center">2</span>
      </div>
      <div className="p-2 rounded-lg border border-line/40 bg-paper shadow-xs text-ink space-y-1">
        <div className="font-bold">WebGL Shaders</div>
        <div className="text-[8px] text-oxide uppercase font-bold">High Priority</div>
      </div>
      <div className="p-2 rounded-lg border border-line/40 bg-paper shadow-xs text-ink space-y-1">
        <div className="font-bold">Catalog Tests</div>
        <div className="text-[8px] text-emerald-600 uppercase font-bold">Ready</div>
      </div>
    </div>
  );
}

export function KeycapBadgePreview() {
  return (
    <div className="flex items-center gap-2 font-mono select-none">
      {["⌘", "⇧", "⌥", "K"].map((k) => (
        <div
          key={k}
          className="w-8 h-8 rounded-lg border border-line/40 border-b-4 border-b-line/70 bg-paper shadow-md flex items-center justify-center font-bold text-xs text-ink hover:translate-y-0.5 transition-transform"
        >
          {k}
        </div>
      ))}
    </div>
  );
}

export function KeycapShortcutRowPreview() {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[11px] select-none">
      <span className="text-graphite">Commit changes:</span>
      <span className="px-2 py-0.5 rounded border-b-2 border-line/60 bg-surface/80 border text-ink font-bold text-[10px]">⌘</span>
      <span className="text-graphite">+</span>
      <span className="px-2 py-0.5 rounded border-b-2 border-line/60 bg-surface/80 border text-ink font-bold text-[10px]">Enter</span>
    </div>
  );
}

export function LedgerTablePreview() {
  return (
    <div className="w-full max-w-[260px] rounded-xl border border-line/40 bg-paper overflow-hidden shadow-xs font-mono text-[10px] select-none">
      <div className="p-2 bg-surface/50 border-b border-line/30 flex justify-between font-bold text-graphite text-[8.5px]">
        <span>ITEM</span>
        <span>AMOUNT</span>
      </div>
      <div className="p-2 space-y-1 text-ink">
        <div className="flex justify-between"><span>Compute Credits</span> <span className="font-bold text-oxide">-$240.00</span></div>
        <div className="flex justify-between"><span>Registry Sub</span> <span className="font-bold text-emerald-600">+$120.00</span></div>
      </div>
    </div>
  );
}

export function MagneticButtonPreview() {
  return (
    <button
      type="button"
      className="px-5 py-2.5 rounded-xl bg-ink text-paper font-mono text-xs font-bold shadow-md hover:bg-oxide transition-all hover:scale-105 select-none flex items-center gap-2"
    >
      <span className="w-2 h-2 rounded-full bg-oxide animate-ping" />
      <span>Magnetic Pull</span>
    </button>
  );
}

export function MarqueeIndexPreview() {
  return (
    <div className="w-full max-w-[280px] overflow-hidden whitespace-nowrap p-2 font-mono text-[11px] font-bold select-none border-y border-line/40">
      <div className="inline-flex gap-4 animate-marquee text-ink uppercase">
        <span>✦ OPENUI REGISTRY</span>
        <span className="text-oxide">⚡ 60FPS RUNTIME</span>
        <span>◈ TAILWIND PRIMITIVES</span>
        <span>✦ OPENUI REGISTRY</span>
      </div>
    </div>
  );
}

export function MatrixPermissionTablePreview() {
  return (
    <div className="w-full max-w-[260px] p-2 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10px] select-none space-y-1">
      <div className="flex justify-between text-graphite text-[8.5px] font-bold border-b border-line/30 pb-1">
        <span>ROLE</span> <span>READ</span> <span>WRITE</span> <span>DEPLOY</span>
      </div>
      <div className="flex justify-between items-center text-ink py-0.5">
        <span className="font-bold">Admin</span> <span className="text-emerald-600">✓</span> <span className="text-emerald-600">✓</span> <span className="text-emerald-600">✓</span>
      </div>
      <div className="flex justify-between items-center text-ink py-0.5">
        <span className="font-bold">Viewer</span> <span className="text-emerald-600">✓</span> <span className="text-graphite opacity-30">✕</span> <span className="text-graphite opacity-30">✕</span>
      </div>
    </div>
  );
}

export function MentionTextareaPreview() {
  return (
    <div className="w-full max-w-[250px] p-2.5 rounded-xl border border-line/40 bg-paper shadow-sm font-mono text-[10.5px] select-none relative space-y-2">
      <div className="text-ink">
        Reviewed the component with <span className="text-oxide font-bold bg-oxide/10 px-1 rounded">@alex</span> and team.
      </div>
      <div className="p-1 rounded-lg border border-line/40 bg-surface/90 shadow-md text-[9.5px]">
        <div className="px-2 py-0.5 rounded bg-oxide text-white font-bold">@alex (Tech Lead)</div>
      </div>
    </div>
  );
}

export function MetricStatCardPreview() {
  return (
    <div className="w-full max-w-[240px] p-3.5 rounded-2xl border border-line/40 bg-paper/95 shadow-md font-mono select-none space-y-2">
      <div className="flex items-center justify-between text-[10px] text-graphite">
        <span>TOTAL DOWNLOADS</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 font-bold text-[9px]">+24.8%</span>
      </div>
      <div className="text-2xl font-display font-bold text-ink">142,890</div>
      <div className="w-full bg-line/20 h-1.5 rounded-full overflow-hidden">
        <div className="bg-oxide h-full w-[78%]" />
      </div>
    </div>
  );
}

export function MultiRangeHistogramPreview() {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] text-graphite font-bold">
        <span>PRICE RANGE</span>
        <span className="text-oxide">$24 – $85</span>
      </div>
      <div className="h-10 flex items-end gap-1">
        {[20, 35, 60, 85, 100, 75, 45, 30, 15].map((h, i) => (
          <div key={i} className="flex-1 bg-oxide/70 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="relative h-1.5 bg-line/30 rounded-full">
        <div className="absolute left-[20%] right-[25%] h-full bg-oxide" />
      </div>
    </div>
  );
}

export function NumericCounterStepperPreview() {
  const [count, setCount] = React.useState(8);
  return (
    <div className="flex items-center gap-3 p-1.5 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none">
      <button
        type="button"
        onClick={() => setCount(c => Math.max(0, c - 1))}
        className="w-8 h-8 rounded-lg bg-surface/60 hover:bg-line/20 text-ink font-bold text-sm flex items-center justify-center"
      >
        −
      </button>
      <span className="text-base font-bold text-ink w-8 text-center">{count}</span>
      <button
        type="button"
        onClick={() => setCount(c => c + 1)}
        className="w-8 h-8 rounded-lg bg-oxide text-white font-bold text-sm flex items-center justify-center shadow-xs"
      >
        +
      </button>
    </div>
  );
}

export function NumericSpinnerInputPreview() {
  return (
    <div className="flex items-center border border-line/40 rounded-xl overflow-hidden bg-paper shadow-xs font-mono text-[11px] select-none">
      <span className="px-3 py-1.5 text-ink font-bold">120px</span>
      <div className="flex flex-col border-l border-line/40">
        <button type="button" className="px-2 py-0.5 hover:bg-line/15 text-graphite text-[9px]">▲</button>
        <button type="button" className="px-2 py-0.5 hover:bg-line/15 text-graphite text-[9px] border-t border-line/20">▼</button>
      </div>
    </div>
  );
}

export function PaginationDotBarPreview() {
  const [active, setActive] = React.useState(1);
  return (
    <div className="flex items-center gap-2 p-2 rounded-full border border-line/40 bg-paper shadow-xs select-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-oxide shadow-xs" : "w-2.5 bg-line/50 hover:bg-line/80"}`}
        />
      ))}
    </div>
  );
}

export function PaginationStepperPreview() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] select-none">
      <button type="button" className="px-2.5 py-1 rounded border border-line/40 bg-paper text-graphite hover:text-ink">‹ Prev</button>
      <span className="px-2.5 py-1 rounded bg-oxide text-white font-bold">1</span>
      <span className="px-2.5 py-1 rounded border border-line/40 bg-paper text-ink hover:border-ink cursor-pointer">2</span>
      <span className="px-2.5 py-1 rounded border border-line/40 bg-paper text-ink hover:border-ink cursor-pointer">3</span>
      <button type="button" className="px-2.5 py-1 rounded border border-line/40 bg-paper text-graphite hover:text-ink">Next ›</button>
    </div>
  );
}

export function PopoverInfoTooltipPreview() {
  return (
    <div className="relative font-mono select-none flex flex-col items-center">
      <div className="w-7 h-7 rounded-full border border-line/40 bg-paper flex items-center justify-center text-xs font-bold text-ink shadow-xs cursor-pointer">
        ℹ
      </div>
      <div className="mt-2 px-3 py-1.5 rounded-xl bg-ink text-paper text-[10px] shadow-xl text-center">
        Zero external runtime dependencies.
      </div>
    </div>
  );
}

export function ProgressCircleRingPreview() {
  const [pct, setPct] = React.useState(68);
  const r = 24;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (pct / 100) * circ;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center font-mono select-none">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={r} className="stroke-line/30" strokeWidth="5" fill="transparent" />
        <circle
          cx="30"
          cy="30"
          r={r}
          className="stroke-oxide transition-all duration-500"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span className="absolute text-xs font-bold text-ink">{pct}%</span>
    </div>
  );
}

export function QrCodeDisplayPreview() {
  return (
    <div className="p-3 rounded-2xl border border-line/40 bg-white shadow-md font-mono select-none flex flex-col items-center gap-1.5">
      <div className="grid grid-cols-4 gap-1 w-16 h-16 p-1 bg-ink rounded-lg">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`rounded-xs ${i % 3 === 0 ? "bg-white" : i % 2 === 0 ? "bg-oxide" : "bg-white/40"}`} />
        ))}
      </div>
      <span className="text-[9px] font-bold text-graphite tracking-wider uppercase">SCAN SPEC</span>
    </div>
  );
}

export function RadioGroupCardPreview() {
  const [selected, setSelected] = React.useState("pro");
  return (
    <div className="w-full max-w-[260px] space-y-1.5 font-mono select-none">
      {[
        { id: "free", title: "Standard Node", price: "$0" },
        { id: "pro", title: "Dedicated GPU", price: "$49" }
      ].map((plan) => {
        const isSel = selected === plan.id;
        return (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSel ? "border-oxide bg-oxide/5 shadow-xs" : "border-line/40 bg-paper"}`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${isSel ? "border-oxide" : "border-line/60"}`}>
                {isSel && <span className="w-1.5 h-1.5 rounded-full bg-oxide" />}
              </span>
              <span className="text-[11px] font-bold text-ink">{plan.title}</span>
            </div>
            <span className="text-[11px] text-oxide font-bold">{plan.price}</span>
          </div>
        );
      })}
    </div>
  );
}

export function RatingFeedbackScalePreview() {
  const [rating, setRating] = React.useState(4);
  const emojis = ["😡", "🙁", "😐", "😊", "🤩"];
  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-line/40 bg-paper shadow-xs select-none">
      {emojis.map((em, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setRating(i + 1)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-transform ${rating === i + 1 ? "scale-125 bg-oxide/15 shadow-2xs" : "hover:scale-110 opacity-60"}`}
        >
          {em}
        </button>
      ))}
    </div>
  );
}

export function RatingGaugeBarPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px]">
        <span className="text-ink font-bold">PERFORMANCE SCORE</span>
        <span className="text-emerald-600 font-bold">98 / 100</span>
      </div>
      <div className="flex gap-1 h-3">
        <div className="flex-1 bg-emerald-500 rounded-l" />
        <div className="flex-1 bg-emerald-500" />
        <div className="flex-1 bg-emerald-500" />
        <div className="flex-1 bg-emerald-500/30 rounded-r" />
      </div>
    </div>
  );
}

export function RatingStarGroupPreview() {
  const [stars, setStars] = React.useState(5);
  return (
    <div className="flex items-center gap-1 select-none">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setStars(s)}
          className={`text-xl transition-transform hover:scale-125 ${s <= stars ? "text-amber-400 drop-shadow-xs" : "text-line/40"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function SearchFilterInputPreview() {
  return (
    <div className="w-full max-w-[260px] px-3 py-2 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[11px] select-none flex items-center gap-2">
      <span className="text-graphite">🔍</span>
      <span className="text-ink font-semibold">filter: "spring"|</span>
      <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-line/20 text-graphite">esc</span>
    </div>
  );
}

export function SegmentedControlPreview() {
  const [active, setActive] = React.useState("code");
  return (
    <div className="flex items-center p-1 rounded-xl border border-line/40 bg-surface/50 font-mono text-[10.5px] select-none">
      {["preview", "code", "inspect"].map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(tab)}
          className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-all ${active === tab ? "bg-paper text-oxide shadow-xs" : "text-graphite hover:text-ink"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function SegmentedFilterBarPreview() {
  const [filter, setFilter] = React.useState("all");
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none">
      {[
        { id: "all", label: "ALL", count: "104" },
        { id: "active", label: "ACTIVE", count: "82" },
        { id: "staged", label: "STAGED", count: "22" }
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setFilter(tab.id)}
          className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${filter === tab.id ? "bg-oxide text-white font-bold shadow-xs" : "text-graphite hover:text-ink"}`}
        >
          <span>{tab.label}</span>
          <span className="opacity-70 text-[9px]">({tab.count})</span>
        </button>
      ))}
    </div>
  );
}

export function SegmentedPillTogglePreview() {
  const [annual, setAnnual] = React.useState(true);
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-full border border-line/40 bg-surface/40 font-mono text-[11px] select-none">
      <button
        type="button"
        onClick={() => setAnnual(false)}
        className={`px-3 py-1 rounded-full font-bold transition-all ${!annual ? "bg-paper text-ink shadow-xs" : "text-graphite"}`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => setAnnual(true)}
        className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 ${annual ? "bg-oxide text-white shadow-xs" : "text-graphite"}`}
      >
        <span>Annual</span>
        <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[8.5px] font-bold">-20%</span>
      </button>
    </div>
  );
}

export function SegmentedTabsCardPreview() {
  const [tab, setTab] = React.useState("metrics");
  return (
    <div className="w-full max-w-[260px] p-3 rounded-2xl border border-line/40 bg-paper shadow-md font-mono select-none space-y-2.5">
      <div className="flex border-b border-line/30 pb-2 gap-3 text-[10.5px]">
        {["metrics", "logs", "config"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`capitalize font-bold pb-1 border-b-2 transition-all ${tab === t ? "border-oxide text-oxide" : "border-transparent text-graphite hover:text-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="text-[10px] text-graphite">
        {tab === "metrics" && <div className="text-emerald-600 font-bold">✔ 99.98% uptime SLA verified</div>}
        {tab === "logs" && <div className="text-ink font-mono">[INFO] 24 nodes synced</div>}
        {tab === "config" && <div className="text-ink font-mono">region: ap-south-1</div>}
      </div>
    </div>
  );
}

export function SegmentedViewSwitcherPreview() {
  const [view, setView] = React.useState("grid");
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none">
      <button
        type="button"
        onClick={() => setView("grid")}
        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold transition-all ${view === "grid" ? "bg-oxide text-white shadow-xs" : "text-graphite hover:text-ink"}`}
      >
        <span>▦</span> <span>GRID</span>
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold transition-all ${view === "list" ? "bg-oxide text-white shadow-xs" : "text-graphite hover:text-ink"}`}
      >
        <span>☰</span> <span>LIST</span>
      </button>
    </div>
  );
}

export function SliderGainControlPreview() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-line/40 bg-paper shadow-sm font-mono select-none">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-graphite font-bold">+6dB</span>
        <div className="w-2 h-16 rounded-full bg-line/30 relative flex items-end">
          <div className="w-full bg-oxide rounded-full h-[65%]" />
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-4 h-2 rounded bg-ink shadow-xs" />
        </div>
        <span className="text-[9px] text-graphite font-bold">-∞</span>
      </div>
      <div className="space-y-1 text-[10px]">
        <div className="text-ink font-bold">MASTER GAIN</div>
        <div className="text-oxide font-bold">+2.4 dB</div>
      </div>
    </div>
  );
}

export function SliderNumericInputPreview() {
  const [val, setVal] = React.useState(75);
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-graphite font-bold">OPACITY</span>
        <span className="px-2 py-0.5 rounded bg-surface border border-line/30 font-bold text-ink">{val}%</span>
      </div>
      <div className="relative h-2 bg-line/30 rounded-full">
        <div className="h-full bg-oxide rounded-full" style={{ width: `${val}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-oxide shadow-sm" style={{ left: `${val}%` }} />
      </div>
    </div>
  );
}

export function SliderStepperControlPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] text-graphite font-bold">
        <span>STEP 3 OF 4</span>
        <span className="text-oxide">75%</span>
      </div>
      <div className="flex items-center justify-between relative">
        <div className="absolute inset-x-0 h-1 bg-line/30 -z-0" />
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center text-[8px] font-bold ${s <= 2 ? "border-oxide bg-oxide text-white shadow-xs" : "border-line bg-paper text-graphite"}`}
          >
            {s + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SmartBreadcrumbPreview() {
  return (
    <div className="flex items-center gap-1.5 p-2 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none text-graphite">
      <span className="hover:text-ink cursor-pointer">Root</span>
      <span>›</span>
      <span className="px-1.5 py-0.5 rounded bg-line/20 text-ink">...</span>
      <span>›</span>
      <span className="text-oxide font-bold">DetailView</span>
    </div>
  );
}

export function SplitButtonDropdownPreview() {
  return (
    <div className="inline-flex rounded-xl overflow-hidden border border-oxide shadow-sm font-mono text-xs select-none">
      <button type="button" className="px-3.5 py-2 bg-oxide text-white font-bold hover:bg-oxide/90 transition-colors">
        Deploy To Production
      </button>
      <button type="button" className="px-2.5 py-2 bg-oxide text-white font-bold border-l border-white/20 hover:bg-oxide/90 transition-colors">
        ▾
      </button>
    </div>
  );
}

export function StatComparisonCardPreview() {
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="text-[10px] text-graphite font-bold uppercase tracking-wider">THROUGHPUT RATIO</div>
      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between items-center">
          <span className="text-ink">Current Sprint</span>
          <span className="text-emerald-600 font-bold">94.2%</span>
        </div>
        <div className="h-1.5 w-full bg-line/30 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-[94%]" />
        </div>
        <div className="flex justify-between items-center text-graphite pt-1">
          <span>Baseline</span>
          <span>72.0%</span>
        </div>
      </div>
    </div>
  );
}

export function StatCounterBadgePreview() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-line/40 bg-paper shadow-sm font-mono select-none">
      <div className="w-10 h-10 rounded-xl bg-oxide/10 text-oxide flex items-center justify-center font-bold text-lg">
        ⚡
      </div>
      <div>
        <div className="text-xs font-bold text-ink">99.8ms Latency</div>
        <div className="text-[9px] text-graphite">GLOBAL EDGE P50</div>
      </div>
    </div>
  );
}

export function StatSparklineTilePreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-1.5">
      <div className="flex justify-between text-[10px] text-graphite">
        <span>ACTIVE USERS</span>
        <span className="text-emerald-600 font-bold">+18%</span>
      </div>
      <div className="text-xl font-display font-bold text-ink">84,210</div>
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25">
        <path d="M0,20 Q15,5 30,15 T60,8 T80,18 T100,4" fill="none" stroke="#ba442c" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function StatusBeaconBadgePreview() {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-xs font-mono select-none">
      <div className="relative flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="absolute w-5 h-5 rounded-full bg-emerald-500/40 animate-ping" />
      </div>
      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">ALL NODES HEALTHY</span>
    </div>
  );
}

export function StatusPillPreview() {
  return (
    <div className="flex gap-2 font-mono text-[10.5px] select-none">
      <span className="px-3 py-1 rounded-full border border-oxide/40 bg-oxide/10 text-oxide font-bold flex items-center gap-1.5 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-oxide" />
        Degraded
      </span>
      <span className="px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-bold flex items-center gap-1.5 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        Normal
      </span>
    </div>
  );
}

export function StatusTelemetryDotPreview() {
  return (
    <div className="p-3 rounded-xl border border-line/40 bg-[#0b0e14] text-white font-mono text-[10px] select-none shadow-md flex items-center gap-3">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
      <div className="space-y-0.5">
        <div className="text-white font-bold">Telemetry Stream: OK</div>
        <div className="text-graphite text-[8.5px]">Packet loss: 0.00% · 12ms</div>
      </div>
    </div>
  );
}

export function SteppedProgressRailPreview() {
  return (
    <div className="w-full max-w-[260px] flex items-center justify-between relative font-mono text-[10px] select-none">
      <div className="absolute inset-x-0 h-1 bg-line/30 -z-0" />
      <div className="flex flex-col items-center z-10">
        <div className="w-6 h-6 rounded-full bg-oxide text-white font-bold flex items-center justify-center">✓</div>
        <span className="text-[8.5px] font-bold text-ink mt-1">PLAN</span>
      </div>
      <div className="flex flex-col items-center z-10">
        <div className="w-6 h-6 rounded-full bg-oxide text-white font-bold flex items-center justify-center">2</div>
        <span className="text-[8.5px] font-bold text-oxide mt-1">BUILD</span>
      </div>
      <div className="flex flex-col items-center z-10">
        <div className="w-6 h-6 rounded-full bg-line/40 text-graphite font-bold flex items-center justify-center">3</div>
        <span className="text-[8.5px] text-graphite mt-1">DEPLOY</span>
      </div>
    </div>
  );
}

export function SteppedTimelineRailPreview() {
  return (
    <div className="font-mono text-[10.5px] select-none space-y-2 border-l-2 border-oxide pl-3 ml-2">
      <div className="relative">
        <span className="absolute -left-[1.15rem] top-1 w-2.5 h-2.5 rounded-full bg-oxide border-2 border-paper" />
        <div className="font-bold text-ink">Commit tagged v2.1.0</div>
        <div className="text-[9px] text-graphite">2 hours ago by @elena</div>
      </div>
      <div className="relative">
        <span className="absolute -left-[1.15rem] top-1 w-2.5 h-2.5 rounded-full bg-line border-2 border-paper" />
        <div className="font-bold text-graphite">Integration tests passed</div>
        <div className="text-[9px] text-graphite">3 hours ago in CI</div>
      </div>
    </div>
  );
}

export function StepperFormWizardPreview() {
  return (
    <div className="w-full max-w-[250px] p-3 rounded-2xl border border-line/40 bg-paper shadow-md font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px]">
        <span className="font-bold text-ink">Step 2: API Keys</span>
        <span className="text-oxide font-bold">2/3</span>
      </div>
      <div className="p-2 rounded-lg bg-surface/50 border border-line/20 text-[10.5px] text-graphite">
        sk_live_9948293810...
      </div>
      <div className="flex justify-between pt-1">
        <button type="button" className="text-[10px] text-graphite font-bold">Back</button>
        <button type="button" className="px-3 py-1 rounded bg-oxide text-white text-[10px] font-bold shadow-xs">Next →</button>
      </div>
    </div>
  );
}

export function TabPillStripPreview() {
  const [active, setActive] = React.useState("Tokens");
  const tabs = ["Tokens", "CSS", "Schema", "Test"];
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(t)}
          className={`px-3 py-1 rounded-full font-bold transition-all ${active === t ? "bg-oxide text-white shadow-xs" : "text-graphite hover:text-ink"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function TabUnderlineStripPreview() {
  const [tab, setTab] = React.useState("Overview");
  return (
    <div className="flex items-center gap-4 border-b border-line/40 pb-1 font-mono text-[11px] select-none">
      {["Overview", "Telemetry", "Audit"].map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={`pb-1.5 font-bold transition-colors relative ${tab === t ? "text-oxide" : "text-graphite hover:text-ink"}`}
        >
          <span>{t}</span>
          {tab === t && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-oxide rounded-full" />}
        </button>
      ))}
    </div>
  );
}

export function TagFilterGroupPreview() {
  return (
    <div className="flex flex-wrap gap-1.5 max-w-[250px] font-mono text-[10px] select-none">
      <span className="px-2.5 py-1 rounded-md bg-ink text-paper font-bold shadow-2xs">All Categories</span>
      <span className="px-2.5 py-1 rounded-md border border-line/40 bg-paper text-graphite hover:text-ink cursor-pointer">Animation</span>
      <span className="px-2.5 py-1 rounded-md border border-line/40 bg-paper text-graphite hover:text-ink cursor-pointer">Physics</span>
      <span className="px-2.5 py-1 rounded-md border border-line/40 bg-paper text-graphite hover:text-ink cursor-pointer">WebGL</span>
    </div>
  );
}

export function TagInputFieldPreview() {
  return (
    <div className="w-full max-w-[260px] p-2 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none flex flex-wrap gap-1.5 items-center">
      <span className="px-2 py-0.5 rounded bg-oxide/15 text-oxide font-bold flex items-center gap-1">
        motion <span className="cursor-pointer">✕</span>
      </span>
      <span className="px-2 py-0.5 rounded bg-line/20 text-ink flex items-center gap-1">
        spring <span className="cursor-pointer">✕</span>
      </span>
      <span className="text-graphite text-[9.5px]">type tag...</span>
    </div>
  );
}

export function TimeRangePickerPreview() {
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] text-graphite font-bold">
        <span>WINDOW</span>
        <span className="text-oxide">09:00 — 17:30</span>
      </div>
      <div className="relative h-2 bg-line/30 rounded-full">
        <div className="absolute left-[30%] right-[25%] h-full bg-oxide" />
        <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-3.5 h-3.5 rounded-full bg-white border-2 border-oxide shadow-xs" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[25%] w-3.5 h-3.5 rounded-full bg-white border-2 border-oxide shadow-xs" />
      </div>
    </div>
  );
}

export function TimelineEventCardPreview() {
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none space-y-1">
      <div className="flex items-center justify-between text-[9px] text-graphite">
        <span className="text-oxide font-bold">MILESTONE REACHED</span>
        <span>Just now</span>
      </div>
      <div className="text-ink font-bold leading-tight">Visual Engine v2.0 Rollout</div>
      <div className="text-graphite text-[9.5px]">815 resources live with 60fps animations.</div>
    </div>
  );
}

export function ToastNotificationCardPreview() {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-2xl border border-line/50 bg-[#121620] text-white shadow-2xl font-mono text-[10.5px] select-none flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">✔</span>
        <div>
          <div className="font-bold">Component Installed</div>
          <div className="text-[8.5px] text-graphite">Added to design registry</div>
        </div>
      </div>
      <button type="button" className="text-xs text-graphite hover:text-white">✕</button>
    </div>
  );
}

export function ToastRegionPreview() {
  return (
    <div className="w-full max-w-[240px] space-y-1.5 font-mono select-none">
      <div className="p-2.5 rounded-xl border border-line/40 bg-paper shadow-md text-[10px] text-ink font-bold flex items-center justify-between">
        <span>⚡ Deploy finished</span>
        <span className="text-emerald-600">2s ago</span>
      </div>
      <div className="p-2 rounded-xl border border-line/30 bg-paper/70 shadow-xs text-[9px] text-graphite opacity-80">
        Syncing 4 CDN regions...
      </div>
    </div>
  );
}

export function ToggleSwitchCardPreview() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="w-full max-w-[250px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none flex items-center justify-between">
      <div>
        <div className="text-[11px] font-bold text-ink">Haptic Feedback</div>
        <div className="text-[9px] text-graphite">Subtle click vibration</div>
      </div>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center ${on ? "bg-oxide" : "bg-line/40"}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export function TransferListBoxPreview() {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] select-none">
      <div className="w-24 p-2 rounded-lg border border-line/40 bg-paper shadow-2xs space-y-1 text-ink">
        <div className="font-bold text-[8.5px] text-graphite">AVAILABLE</div>
        <div className="px-1 py-0.5 rounded bg-line/15">Button</div>
        <div className="px-1 py-0.5 rounded hover:bg-line/15">Slider</div>
      </div>
      <div className="flex flex-col gap-1 text-[10px] font-bold text-oxide">
        <span>→</span>
        <span>←</span>
      </div>
      <div className="w-24 p-2 rounded-lg border border-line/40 bg-paper shadow-2xs space-y-1 text-ink">
        <div className="font-bold text-[8.5px] text-graphite">CHOSEN</div>
        <div className="px-1 py-0.5 rounded bg-oxide/15 text-oxide font-bold">Dock</div>
      </div>
    </div>
  );
}

export function TreeCheckboxSelectorPreview() {
  return (
    <div className="w-48 p-2.5 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] select-none space-y-1.5">
      <label className="flex items-center gap-2 cursor-pointer font-bold text-ink">
        <input type="checkbox" defaultChecked className="accent-oxide" />
        <span>Packages</span>
      </label>
      <div className="pl-4 space-y-1 text-graphite">
        <label className="flex items-center gap-2 cursor-pointer hover:text-ink">
          <input type="checkbox" defaultChecked className="accent-oxide" />
          <span>@openui/ui</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-ink">
          <input type="checkbox" className="accent-oxide" />
          <span>@openui/cli</span>
        </label>
      </div>
    </div>
  );
}

export function UseCanvasLoopPreview() {
  const [frame, setFrame] = React.useState(0);
  React.useEffect(() => {
    let id: number;
    const loop = () => {
      setFrame((f) => f + 1);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className="p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none flex flex-col items-center gap-1.5">
      <span className="text-[9px] text-graphite font-bold uppercase tracking-widest">useCanvasLoop()</span>
      <div className="text-xl font-bold text-oxide">{frame}</div>
      <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold">60.0 FPS</span>
    </div>
  );
}

export function UseInViewPreview() {
  return (
    <div className="p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-bold text-xs text-ink">inView: true</span>
      </div>
      <div className="text-[9px] text-graphite">Intersection threshold: 0.5</div>
    </div>
  );
}

export function UseReducedMotionPreview() {
  const [reduced, setReduced] = React.useState(false);
  return (
    <div className="p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => setReduced(!reduced)}
        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${reduced ? "bg-moss/20 border-moss text-moss" : "bg-line/20 border-line/50 text-graphite"}`}
      >
        {reduced ? "Reduced Motion: ON" : "Reduced Motion: OFF"}
      </button>
      <div className={`w-8 h-8 rounded-lg bg-oxide ${reduced ? "" : "animate-spin"}`} />
    </div>
  );
}

export function VirtualKeyboardNumpadPreview() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "↵"];
  return (
    <div className="grid grid-cols-3 gap-1 p-2 rounded-2xl border border-line/40 bg-paper shadow-md font-mono select-none w-36">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          className="h-7 rounded-lg border border-line/30 bg-surface/50 hover:bg-oxide hover:text-white text-ink text-xs font-bold transition-all shadow-2xs flex items-center justify-center"
        >
          {k}
        </button>
      ))}
    </div>
  );
}

export function WaterfallProgressBarPreview() {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-ink">RESOURCE BREAKDOWN</span>
        <span className="text-oxide">100%</span>
      </div>
      <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner">
        <div className="bg-oxide w-[45%]" title="TypeScript 45%" />
        <div className="bg-sky-500 w-[30%]" title="Tailwind 30%" />
        <div className="bg-amber-400 w-[15%]" title="Canvas 15%" />
        <div className="bg-emerald-500 w-[10%]" title="Docs 10%" />
      </div>
      <div className="flex justify-between text-[8px] text-graphite">
        <span>TypeScript 45%</span>
        <span>Tailwind 30%</span>
        <span>Other 25%</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS PREVIEW REGISTRY MAP                                           */
/* -------------------------------------------------------------------------- */
export const COMPONENTS_PREVIEWS_MAP: Record<string, () => React.JSX.Element> = {
  "accordion-chevron-list": AccordionChevronListPreview,
  "accordion-index": AccordionIndexPreview,
  "action-sheet-dialog": ActionSheetDialogPreview,
  "action-sheet-popover": ActionSheetPopoverPreview,
  "aspect-ratio-selector": AspectRatioSelectorPreview,
  "audio-track-scrubber": AudioTrackScrubberPreview,
  "avatar-badge-group": AvatarBadgeGroupPreview,
  "avatar-collaborator-stack": AvatarCollaboratorStackPreview,
  "avatar-profile-card": AvatarProfileCardPreview,
  "badge-notification-counter": BadgeNotificationCounterPreview,
  "badge-pill-status": BadgePillStatusPreview,
  "badge-tag-cloud": BadgeTagCloudPreview,
  "badge-tag-strip": BadgeTagStripPreview,
  "banner-alert-box": BannerAlertBoxPreview,
  "banner-notice-strip": BannerNoticeStripPreview,
  "breadcrumbs-slash-trail": BreadcrumbsSlashTrailPreview,
  "cascading-menu-tree": CascadingMenuTreePreview,
  "chip-toggle-cluster": ChipToggleClusterPreview,
  "cn": CnPreview,
  "code-diff-viewer": CodeDiffViewerPreview,
  "code-snippet-box": CodeSnippetBoxPreview,
  "code-terminal-block": CodeTerminalBlockPreview,
  "collapsible-details-card": CollapsibleDetailsCardPreview,
  "collapsible-section-card": CollapsibleSectionCardPreview,
  "color-gradient-slider": ColorGradientSliderPreview,
  "color-palette-strip": ColorPaletteStripPreview,
  "color-swatch-picker": ColorSwatchPickerPreview,
  "combobox-autocomplete": ComboboxAutocompletePreview,
  "command-menu-bar": CommandMenuBarPreview,
  "command-palette-modal": CommandPaletteModalPreview,
  "command-search-pill": CommandSearchPillPreview,
  "copy-button": CopyButtonPreview,
  "countdown-timer-unit": CountdownTimerUnitPreview,
  "credit-card-input": CreditCardInputPreview,
  "diff-inline-badge": DiffInlineBadgePreview,
  "dock-navigation": DockNavigationPreview,
  "docked-action-toolbar": DockedActionToolbarPreview,
  "dropdown-action-menu": DropdownActionMenuPreview,
  "dropdown-filter-menu": DropdownFilterMenuPreview,
  "expandable-data-row": ExpandableDataRowPreview,
  "expandable-log-tile": ExpandableLogTilePreview,
  "file-tree-view": FileTreeViewPreview,
  "floating-dock-bar": FloatingDockBarPreview,
  "gauge-speedometer": GaugeSpeedometerPreview,
  "icon-action-strip": IconActionStripPreview,
  "inline-editable-heading": InlineEditableHeadingPreview,
  "input-otp-pin": InputOtpPinPreview,
  "kanban-mini-column": KanbanMiniColumnPreview,
  "keycap-badge": KeycapBadgePreview,
  "keycap-shortcut-row": KeycapShortcutRowPreview,
  "ledger-table": LedgerTablePreview,
  "magnetic-button": MagneticButtonPreview,
  "marquee-index": MarqueeIndexPreview,
  "matrix-permission-table": MatrixPermissionTablePreview,
  "mention-textarea": MentionTextareaPreview,
  "metric-stat-card": MetricStatCardPreview,
  "multi-range-histogram": MultiRangeHistogramPreview,
  "numeric-counter-stepper": NumericCounterStepperPreview,
  "numeric-spinner-input": NumericSpinnerInputPreview,
  "pagination-dot-bar": PaginationDotBarPreview,
  "pagination-stepper": PaginationStepperPreview,
  "popover-info-tooltip": PopoverInfoTooltipPreview,
  "progress-circle-ring": ProgressCircleRingPreview,
  "qr-code-display": QrCodeDisplayPreview,
  "radio-group-card": RadioGroupCardPreview,
  "rating-feedback-scale": RatingFeedbackScalePreview,
  "rating-gauge-bar": RatingGaugeBarPreview,
  "rating-star-group": RatingStarGroupPreview,
  "search-filter-input": SearchFilterInputPreview,
  "segmented-control": SegmentedControlPreview,
  "segmented-filter-bar": SegmentedFilterBarPreview,
  "segmented-pill-toggle": SegmentedPillTogglePreview,
  "segmented-tabs-card": SegmentedTabsCardPreview,
  "segmented-view-switcher": SegmentedViewSwitcherPreview,
  "slider-gain-control": SliderGainControlPreview,
  "slider-numeric-input": SliderNumericInputPreview,
  "slider-stepper-control": SliderStepperControlPreview,
  "smart-breadcrumb": SmartBreadcrumbPreview,
  "split-button-dropdown": SplitButtonDropdownPreview,
  "stat-comparison-card": StatComparisonCardPreview,
  "stat-counter-badge": StatCounterBadgePreview,
  "stat-sparkline-tile": StatSparklineTilePreview,
  "status-beacon-badge": StatusBeaconBadgePreview,
  "status-pill": StatusPillPreview,
  "status-telemetry-dot": StatusTelemetryDotPreview,
  "stepped-progress-rail": SteppedProgressRailPreview,
  "stepped-timeline-rail": SteppedTimelineRailPreview,
  "stepper-form-wizard": StepperFormWizardPreview,
  "tab-pill-strip": TabPillStripPreview,
  "tab-underline-strip": TabUnderlineStripPreview,
  "tag-filter-group": TagFilterGroupPreview,
  "tag-input-field": TagInputFieldPreview,
  "time-range-picker": TimeRangePickerPreview,
  "timeline-event-card": TimelineEventCardPreview,
  "toast-notification-card": ToastNotificationCardPreview,
  "toast-region": ToastRegionPreview,
  "toggle-switch-card": ToggleSwitchCardPreview,
  "transfer-list-box": TransferListBoxPreview,
  "tree-checkbox-selector": TreeCheckboxSelectorPreview,
  "use-canvas-loop": UseCanvasLoopPreview,
  "use-in-view": UseInViewPreview,
  "use-reduced-motion": UseReducedMotionPreview,
  "virtual-keyboard-numpad": VirtualKeyboardNumpadPreview,
  "waterfall-progress-bar": WaterfallProgressBarPreview,
};
