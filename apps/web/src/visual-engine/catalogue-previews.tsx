import * as React from "react";
import { COMPONENTS_PREVIEWS_MAP } from "./components-previews.js";
import { MOTION_PREVIEWS_MAP } from "./motion-previews.js";
import { INTERACTIONS_PREVIEWS_MAP, GenericInteractionPreview } from "./interactions-previews.js";
import { BACKGROUNDS_PREVIEWS_MAP, GenericBackgroundPreview } from "./backgrounds/all-background-previews.js";

/* -------------------------------------------------------------------------- */
/* CATALOGUE BESPOKE VISUAL PREVIEWS                                         */
/* High-performance, 60fps, illuminated, unique visual specimens for         */
/* catalogue tiles — eliminating empty/plain iframe tiles.                    */
/* -------------------------------------------------------------------------- */

// 1. Acrostic Column
function AcrosticColumnPreview() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % 6), 1400);
    return () => clearInterval(t);
  }, []);

  const lines = [
    { root: "D", rest: "ynamic kinetic motion" },
    { root: "E", rest: "xpressive typography" },
    { root: "S", rest: "patial layer depth" },
    { root: "I", rest: "nteractive feedback" },
    { root: "G", rest: "enerative visual form" },
    { root: "N", rest: "uanced craft precision" },
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center font-mono text-[11px] leading-tight select-none">
      <div className="w-fit max-w-full">
        <div className="text-[9px] uppercase tracking-widest text-graphite mb-2 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-oxide" />
          <span>Acrostic Stanza</span>
        </div>
        <div className="space-y-1.5">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                i === activeIdx ? "text-oxide font-bold" : "text-ink/80"
              }`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                  i === activeIdx
                    ? "bg-oxide text-white shadow-xs"
                    : "bg-line/25 text-ink"
                }`}
              >
                {l.root}
              </span>
              <span className="text-[11px] tracking-tight">{l.rest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Balance Subhead
function BalanceSubheadPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.03;
      setAngle(Math.sin(t) * 8);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-3 font-semibold">
        ⚖ Balancer Engine · {angle.toFixed(1)}°
      </div>
      <div
        className="w-full max-w-[240px] p-3 rounded-lg border border-line bg-surface/80 shadow-xs transition-transform duration-75"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <h4 className="font-display text-base font-bold text-ink leading-snug">
          The art of typographic equilibrium in reactive layouts
        </h4>
      </div>
      <div className="w-12 h-1 bg-line mt-2 rounded-full" />
      <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-oxide mt-0.5" />
    </div>
  );
}

// 3. Baseline Grid Overlay
function BaselineGridOverlayPreview() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 4) % 24), 200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-center select-none overflow-hidden">
      {/* Cyan & magenta drafting grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "100% 16px",
          backgroundPosition: `0 ${offset}px`,
        }}
      />
      <div className="relative z-10 font-display text-2xl font-black text-ink leading-[32px] tracking-tight">
        Precision Drafting<br />
        <span className="text-oxide text-xs tracking-widest uppercase font-mono block mt-1">
          Y: {(24 + offset)}px · 8pt Grid Lock
        </span>
      </div>
    </div>
  );
}

// 4. Baseline Slide Lines
function BaselineSlideLinesPreview() {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const phrases = [
    ["INTERFACES SHOULD", "HAVE A FINGERPRINT."],
    ["KINETIC ARCHITECTURE", "FOR MODERN BROWSERS."],
    ["EXPRESSIVE MOTION", "ZERO COMPROMISES."],
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-display">
      <div className="space-y-1">
        {(phrases[step] ?? phrases[0]!).map((line, i) => (
          <div key={i} className="overflow-hidden border-b border-line/40 pb-0.5">
            <span
              key={`${step}-${i}`}
              className="block text-xl font-bold text-ink animate-[slideUp_600ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest text-oxide mt-2 font-semibold">
        ✦ Keyframe Rail Animation
      </span>
    </div>
  );
}

// 5. Bidi Mirror Type
function BidiMirrorTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center select-none text-center">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2">Bidirectional Type</div>
      <div className="w-full grid grid-cols-2 gap-3 items-center border border-line p-3 rounded-lg bg-surface/50">
        <div className="text-left border-r border-line/60 pr-2">
          <span className="text-[10px] font-mono text-oxide font-bold block">LTR (Latin)</span>
          <span className="font-display text-sm font-bold text-ink">Open Interfaces</span>
        </div>
        <div className="text-right pl-2" dir="rtl">
          <span className="text-[10px] font-mono text-cyan-600 font-bold block">RTL (Arabic)</span>
          <span className="text-sm font-bold text-ink font-serif">واجهات مفتوحة</span>
        </div>
      </div>
    </div>
  );
}

// 6. Bionic Emphasis Text
function BionicEmphasisTextPreview() {
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % 6), 600);
    return () => clearInterval(t);
  }, []);

  const words = ["Bionic", "reading", "enhances", "cognitive", "velocity", "exponentially"];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2 font-bold flex items-center justify-between">
        <span>Bionic Focus Engine</span>
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
      </div>
      <p className="text-sm font-sans leading-relaxed text-ink/80">
        {words.map((w, i) => {
          const split = Math.ceil(w.length * 0.45);
          const head = w.slice(0, split);
          const tail = w.slice(split);
          const active = i === pulse;
          return (
            <span key={i} className={`inline-block mr-1.5 transition-transform ${active ? "scale-105" : ""}`}>
              <strong className={`font-black ${active ? "text-oxide underline" : "text-ink"}`}>{head}</strong>
              <span className="text-graphite">{tail}</span>
            </span>
          );
        })}
      </p>
    </div>
  );
}

// 7. Blind Deboss Toggle
function BlindDebossTogglePreview() {
  const [pressed, setPressed] = React.useState(true);
  React.useEffect(() => {
    const t = setInterval(() => setPressed((p) => !p), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-[#f3f1ec] dark:bg-[#121211]">
      <div
        className={`px-6 py-3 rounded-xl transition-all duration-300 ${
          pressed
            ? "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.25),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] text-ink/70"
            : "shadow-[4px_4px_10px_rgba(0,0,0,0.15),-4px_-4px_10px_rgba(255,255,255,0.9)] text-ink font-bold"
        }`}
      >
        <span className="font-display text-xl tracking-wider">
          {pressed ? "DEBOSSED RELIEF" : "EMBOSSED RELIEF"}
        </span>
      </div>
      <span className="text-[9px] font-mono uppercase tracking-widest text-graphite mt-2">
        {pressed ? "✦ Depth: -2.5mm" : "✦ Depth: +2.5mm"}
      </span>
    </div>
  );
}

// 8. Blur Reveal Text
function BlurRevealTextPreview() {
  const [blurred, setBlurred] = React.useState(true);
  React.useEffect(() => {
    const t = setInterval(() => setBlurred((b) => !b), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h3
        className={`font-display text-2xl font-black transition-all duration-700 ${
          blurred ? "filter blur-[6px] opacity-40 text-graphite" : "filter blur-0 opacity-100 text-ink"
        }`}
      >
        OPTICAL REVELATION
      </h3>
      <div className="mt-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-graphite">
          {blurred ? "Aperture f/1.2 (Defocussed)" : "Aperture f/8 (Sharp Focus)"}
        </span>
      </div>
    </div>
  );
}

// 9. Braille Dual Render
function BrailleDualRenderPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center select-none">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2 font-bold">Tactile Dual Render</div>
      <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-line">
        <div className="text-2xl font-bold font-display text-ink border-r border-line pr-3">
          OPENUI
        </div>
        <div className="text-xl font-mono text-oxide tracking-widest animate-pulse">
          ⠕⠏⠑⠝⠥⠊
        </div>
      </div>
      <span className="text-[9px] font-mono text-graphite mt-2">Standard Unicode Braille Matrix</span>
    </div>
  );
}

// 10. Census Bar Heading
function CensusBarHeadingPreview() {
  const [val, setVal] = React.useState(78);
  React.useEffect(() => {
    const t = setInterval(() => setVal(60 + Math.floor(Math.random() * 35)), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-display text-xl font-bold text-ink">Global Adoption</span>
        <span className="font-mono text-base font-black text-oxide">{val}%</span>
      </div>
      <div className="w-full h-3 bg-line/20 rounded-full overflow-hidden p-0.5 border border-line">
        <div
          className="h-full bg-gradient-to-r from-oxide to-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${val}%` }}
        />
      </div>
      <span className="text-[9px] font-mono text-graphite mt-2 uppercase tracking-widest">
        ✦ Demographic Census Scale
      </span>
    </div>
  );
}

// 11. Chapter Numeral Roman
function ChapterNumeralRomanPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="text-[9px] font-mono uppercase tracking-widest text-oxide font-bold mb-1">PROLOGUS I</div>
      <div className="font-display text-4xl font-black text-ink tracking-widest relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600">
          [ XIV ]
        </span>
      </div>
      <p className="font-sans text-[10px] text-graphite italic mt-1">In principio erat verbum</p>
    </div>
  );
}

// 12. Character Wheel Picker
function CharacterWheelPickerPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 700);
    return () => clearInterval(t);
  }, []);

  const chars = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2">Rotary Tumbler Dial</div>
      <div className="flex gap-2 bg-surface p-2 rounded-lg border border-line shadow-xs">
        {[0, 2, 4].map((offset, col) => {
          const char = chars[(tick + offset) % chars.length];
          return (
            <div key={col} className="w-8 h-10 bg-ink text-paper rounded flex items-center justify-center font-mono text-lg font-bold shadow-inner">
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 13. Chisel Carve Type
function ChiselCarveTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#252524] text-white">
      <h2
        className="font-display text-3xl font-black tracking-widest"
        style={{
          textShadow: "1px 1px 0 #fff, -1px -1px 0 #000, 2px 2px 4px rgba(0,0,0,0.8)",
          color: "#8a8884",
        }}
      >
        MONUMENTA
      </h2>
      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 mt-2">
        ✦ Inscriptional Stone Chisel
      </span>
    </div>
  );
}

// 14. Chord Lyric Sheet
function ChordLyricSheetPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-xs">
      <div className="flex gap-8 text-oxide font-bold text-[11px] mb-0.5">
        <span>[Em7]</span>
        <span>[A7sus4]</span>
        <span>[Cadd9]</span>
      </div>
      <div className="text-sm font-sans font-medium text-ink">
        Midnight chords drifting through the ether
      </div>
      <div className="w-full h-0.5 bg-line/40 my-2" />
      <div className="flex gap-8 text-cyan-600 font-bold text-[11px] mb-0.5">
        <span>[Gmaj7]</span>
        <span>[D/F#]</span>
      </div>
      <div className="text-xs font-sans text-graphite">
        Harmonic progression notation
      </div>
    </div>
  );
}

// 15. Circular Type
function CircularTypePreview() {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="relative w-32 h-32 flex items-center justify-center animate-[spin_12s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path id="circlePathRef" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text className="font-mono text-[8px] font-bold fill-ink uppercase tracking-widest">
            <textPath href="#circlePathRef">✦ OPENUI DESIGN ✦ KINETIC ORBIT ✦</textPath>
          </text>
        </svg>
      </div>
      <div className="absolute w-8 h-8 rounded-full bg-oxide text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
        ◈
      </div>
    </div>
  );
}

// 16. Code Token Typeset
function CodeTokenTypesetPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-[11px] leading-relaxed bg-[#0b0f14] text-[#d1d5db] rounded-lg">
      <div className="flex items-center gap-1.5 mb-2 text-[#6b7280] text-[9px]">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2">tokenizer.ts</span>
      </div>
      <div>
        <span className="text-purple-400">const</span>{" "}
        <span className="text-cyan-400">interface</span> ={" "}
        <span className="text-amber-300">"openui"</span>;
      </div>
      <div>
        <span className="text-emerald-400">motion</span>.
        <span className="text-blue-400">animate</span>(
        <span className="text-orange-400">60</span>);
        <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse" />
      </div>
    </div>
  );
}

// 17. Counter Typography
function CounterTypographyPreview() {
  const [val, setVal] = React.useState(1048);
  React.useEffect(() => {
    const t = setInterval(() => setVal((v) => v + Math.floor(Math.random() * 24) + 1), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <span className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-1 font-bold">
        Rolling Odometer Metric
      </span>
      <div className="px-5 py-2 rounded-lg bg-surface border border-line shadow-xs font-mono text-3xl font-black text-ink tracking-wider">
        {val.toLocaleString()}
      </div>
      <span className="text-[10px] font-mono text-emerald-600 mt-1 font-bold">▲ +14.8% ACCELERATION</span>
    </div>
  );
}

// 18. Decrypt Text
function DecryptTextPreview() {
  const [msg, setMsg] = React.useState("ENCRYPTED_STREAM");
  const target = "SECURITY_CLEARANCE";
  React.useEffect(() => {
    let count = 0;
    const t = setInterval(() => {
      count++;
      setMsg(
        target
          .split("")
          .map((c, i) => (i < count ? c : String.fromCharCode(65 + Math.floor(Math.random() * 26))))
          .join("")
      );
      if (count > target.length) count = 0;
    }, 120);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#090d10] text-emerald-400 rounded-lg">
      <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 mb-1">
        [ 0x7F · CIPHER DECRYPTOR ]
      </span>
      <div className="font-mono text-sm font-black tracking-widest border border-emerald-950 px-3 py-1.5 rounded bg-emerald-950/40">
        {msg}
      </div>
    </div>
  );
}

// 19. Dictionary Headword
function DictionaryHeadwordPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-2xl font-bold text-ink">fin·ger·print</h3>
        <span className="font-mono text-xs text-oxide">/ˈfɪŋ.ɡə.prɪnt/</span>
      </div>
      <span className="text-[10px] font-mono text-graphite italic mt-0.5">noun · typography</span>
      <p className="font-sans text-xs text-ink/80 mt-1 leading-snug">
        A distinctive visual mark or kinetic characteristic that identifies a unique interface design.
      </p>
    </div>
  );
}

// 20. Editorial Drop Cap
function EditorialDropCapPreview() {
  return (
    <div className="w-full h-full p-4 flex items-start gap-3 select-none">
      <div className="w-14 h-14 rounded-lg bg-oxide text-paper font-display text-4xl font-bold flex items-center justify-center shadow-xs shrink-0">
        T
      </div>
      <div className="font-sans text-[11px] leading-relaxed text-ink/80">
        <strong className="text-ink">he architecture</strong> of typography transcends mere legibility; it commands spatial presence, orchestrating emotional resonance across surfaces.
      </div>
    </div>
  );
}

// 21. Editorial Heading
function EditorialHeadingPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <span className="font-mono text-[9px] text-oxide tracking-[0.2em] uppercase font-bold mb-1">
        ISSUE № 48 · HAUTE COUTURE
      </span>
      <h2 className="font-display text-3xl font-black italic text-ink leading-none tracking-tight">
        The Aesthetics of Motion
      </h2>
      <p className="font-sans text-xs text-graphite mt-2 max-w-[28ch]">
        Where mathematical precision meets haute visual typography.
      </p>
    </div>
  );
}

// 22. Elastic Stretch Text
function ElasticStretchTextPreview() {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    let t = 0;
    let frame: number;
    const loop = () => {
      t += 0.04;
      setScale(1 + Math.sin(t) * 0.4);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <span className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2">
        Spring Tension Physics
      </span>
      <div
        className="font-display text-3xl font-black text-oxide transition-transform"
        style={{ transform: `scaleX(${scale})` }}
      >
        ELASTICITY
      </div>
      <span className="text-[10px] font-mono text-graphite mt-2">Scale: {scale.toFixed(2)}x</span>
    </div>
  );
}

// 23. Emboss Paint Type
function EmbossPaintTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#1c1d1f]">
      <h2
        className="font-display text-3xl font-black tracking-wider text-white"
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 -1px 1px rgba(255,255,255,0.4), 0 0 10px rgba(186,68,44,0.6)",
        }}
      >
        OIL IMPASTO
      </h2>
      <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase mt-2">
        ✦ Heavy Specular Relief
      </span>
    </div>
  );
}

// 24. Firework Pop Glyphs
function FireworkPopGlyphsPreview() {
  const [bang, setBang] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setBang((b) => !b), 1200);
    return () => clearInterval(t);
  }, []);

  const glyphs = ["✦", "◈", "★", "✷", "✸"];

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="flex gap-2">
        {glyphs.map((g, i) => (
          <span
            key={i}
            className={`text-2xl font-bold transition-all duration-300 ${
              bang ? "scale-150 text-oxide rotate-12 -translate-y-2" : "scale-100 text-amber-500 rotate-0"
            }`}
          >
            {g}
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase tracking-widest mt-3">
        Celebratory Pop Emitter
      </span>
    </div>
  );
}

// 25. Flip Clock Digits
function FlipClockDigitsPreview() {
  const [sec, setSec] = React.useState(42);
  React.useEffect(() => {
    const t = setInterval(() => setSec((s) => (s + 1) % 60), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-2">Solari Split Flap</div>
      <div className="flex gap-1.5 font-mono text-2xl font-bold">
        <div className="w-10 h-12 bg-[#1c1d1f] text-white rounded flex items-center justify-center border-b-2 border-black shadow">
          12
        </div>
        <span className="text-ink font-bold self-center">:</span>
        <div className="w-10 h-12 bg-[#1c1d1f] text-white rounded flex items-center justify-center border-b-2 border-black shadow">
          58
        </div>
        <span className="text-ink font-bold self-center">:</span>
        <div className="w-10 h-12 bg-[#ba442c] text-white rounded flex items-center justify-center border-b-2 border-black shadow animate-pulse">
          {String(sec).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

// 26. Foundry Specimen Sheet
function FoundrySpecimenSheetPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-sans">
      <div className="flex justify-between items-baseline mb-1 border-b border-line pb-1">
        <span className="font-mono text-[9px] text-oxide font-bold uppercase">Specimen № 904</span>
        <span className="font-mono text-[9px] text-graphite">840 Glyphs · Variable</span>
      </div>
      <div className="text-xl font-light text-ink leading-tight">Light 300 · Typography</div>
      <div className="text-xl font-bold text-ink leading-tight">Bold 700 · Architecture</div>
      <div className="text-xl font-black text-oxide leading-tight">Black 900 · Kinetic</div>
    </div>
  );
}

// 27. Fountain Pen Signature
function FountainPenSignaturePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <span className="text-[9px] font-mono uppercase tracking-widest text-graphite mb-1">
        Cursive Calligraphy Path
      </span>
      <svg viewBox="0 0 200 60" className="w-48 h-14">
        <path
          d="M 10,40 C 40,10 70,50 100,20 C 130,-10 150,55 190,30"
          fill="none"
          stroke="#ba442c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="240"
          strokeDashoffset="0"
          className="animate-[dash_3s_ease-in-out_infinite_alternate]"
        />
      </svg>
      <span className="font-serif italic text-xs text-ink/70">Signature specimen</span>
    </div>
  );
}

// 28. Gerund Loading Label
function GerundLoadingLabelPreview() {
  const [step, setStep] = React.useState(0);
  const verbs = ["Synthesizing shaders", "Calibrating springs", "Aligning baselines", "Rendering glyphs"];
  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % verbs.length), 1400);
    return () => clearInterval(t);
  }, [verbs.length]);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-line shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-oxide animate-ping" />
        <span className="font-mono text-xs font-bold text-ink">{verbs[step]}...</span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2 tracking-widest">
        Active Cadence State
      </span>
    </div>
  );
}

// 29. Glitch Type
function GlitchTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#0d0f12]">
      <div className="relative font-mono text-2xl font-black tracking-widest text-white">
        <span className="relative z-10">CYBER_GLITCH</span>
        <span className="absolute inset-0 text-red-500 translate-x-[2px] opacity-70 animate-pulse pointer-events-none">
          CYBER_GLITCH
        </span>
        <span className="absolute inset-0 text-cyan-400 -translate-x-[2px] opacity-70 pointer-events-none">
          CYBER_GLITCH
        </span>
      </div>
      <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest mt-2">
        RGB Chromatic Aberration
      </span>
    </div>
  );
}

// 30. Glyph Flock Text
function GlyphFlockTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="flex gap-2 text-xl font-mono text-oxide font-bold">
        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>✦</span>
        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>◈</span>
        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>★</span>
        <span className="animate-bounce" style={{ animationDelay: "450ms" }}>▲</span>
        <span className="animate-bounce" style={{ animationDelay: "600ms" }}>●</span>
      </div>
      <h4 className="font-display text-lg font-bold text-ink mt-2">Glyph Flocking Swarm</h4>
    </div>
  );
}

// 31. Gradient Outline Type
function GradientOutlineTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-oxide via-amber-400 to-cyan-500 tracking-tight">
        SPECTRUM
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Animated Aurora Gradient
      </span>
    </div>
  );
}

// 32. Gravity Letters
function GravityLettersPreview() {
  const letters = ["G", "R", "A", "V", "I", "T", "Y"];
  return (
    <div className="w-full h-full p-4 flex flex-col justify-end items-center select-none pb-6">
      <div className="flex gap-1.5 items-end border-b-2 border-line pb-1 w-full max-w-[200px] justify-center">
        {letters.map((l, i) => (
          <span
            key={i}
            className="w-6 h-8 rounded bg-ink text-paper font-mono text-xs font-bold flex items-center justify-center shadow-xs"
            style={{
              transform: `translateY(${Math.sin(i * 1.5) * 6}px) rotate(${(i - 3) * 4}deg)`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <span className="text-[9px] font-mono text-oxide uppercase tracking-widest mt-2">
        Newtonian Physics Settle
      </span>
    </div>
  );
}

// 33. Hatch Fill Type
function HatchFillTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="border border-line p-4 rounded-xl bg-surface/60">
        <h3 className="font-display text-3xl font-black text-ink tracking-widest [background:repeating-linear-gradient(45deg,#ba442c,#ba442c_2px,transparent_2px,transparent_6px)] bg-clip-text text-transparent">
          HATCHING
        </h3>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Architectural Vector Engraving
      </span>
    </div>
  );
}

// 34. Hover Replace Text
function HoverReplaceTextPreview() {
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setHover((h) => !h), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="w-48 py-2.5 rounded-lg border border-line bg-surface text-center shadow-xs">
        <span className="font-display text-xl font-bold transition-all duration-300 block">
          {hover ? (
            <span className="text-oxide">REVEALED STATE</span>
          ) : (
            <span className="text-ink">INITIAL STATE</span>
          )}
        </span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Dual Axis Transform
      </span>
    </div>
  );
}

// 35. Idle Fade Whisper
function IdleFadeWhisperPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h3 className="font-display text-2xl font-light italic text-ink animate-[pulse_3s_ease-in-out_infinite]">
        Ethereal breathing whisper...
      </h3>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Biological Opacity Cadence
      </span>
    </div>
  );
}

// 36. Ink Underline Draw
function InkUnderlineDrawPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center select-none">
      <div className="relative inline-block text-center">
        <span className="font-display text-2xl font-bold text-ink">Authentic Craft</span>
        <svg viewBox="0 0 160 12" className="w-40 h-3 mt-0.5">
          <path
            d="M 5,6 Q 80,1 155,7"
            fill="none"
            stroke="#ba442c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Calligraphic Ink Flourish
      </span>
    </div>
  );
}

// 37. Inline Diff Markup
function InlineDiffMarkupPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-xs space-y-1">
      <div className="bg-red-500/15 text-red-600 dark:text-red-400 p-1.5 rounded border border-red-500/30 flex items-center gap-2">
        <span className="font-bold">-</span>
        <del>deprecated_static_typography();</del>
      </div>
      <div className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 p-1.5 rounded border border-emerald-500/30 flex items-center gap-2">
        <span className="font-bold">+</span>
        <ins className="no-underline font-bold">active_kinetic_engine_v2();</ins>
      </div>
    </div>
  );
}

// 38. Inline Swap Sentence
function InlineSwapSentencePreview() {
  const [swapped, setSwapped] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setSwapped((s) => !s), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="text-base font-display font-bold text-ink">
        {swapped ? (
          <span>Function follows <span className="text-oxide underline font-black">Form</span></span>
        ) : (
          <span>Form follows <span className="text-cyan-600 underline font-black">Function</span></span>
        )}
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        Grammatical Position Swap
      </span>
    </div>
  );
}

// 39. Jitter Type
function JitterTypePreview() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setPos({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h3
        className="font-mono text-2xl font-black text-oxide"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        SEISMIC_JITTER
      </h3>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-2">
        High-Frequency Tremor
      </span>
    </div>
  );
}

// 40. Justify Hyphen Proof
function JustifyHyphenProofPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-serif text-[11px] leading-relaxed text-justify border-l-2 border-oxide pl-3">
      The com·po·si·tion of book ty·pog·ra·phy re·quires rig·or·ous hy·phen·ation con·trols, en·sur·ing har·mon·ious col·umn den·si·ty with zero rivers.
    </div>
  );
}

// 41. Karaoke Read Along
function KaraokeReadAlongPreview() {
  const [prog, setProg] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setProg((p) => (p + 20) % 120), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#111827] text-white rounded-lg">
      <div className="relative font-display text-2xl font-bold tracking-wide">
        <span className="text-gray-500">KARAOKE CADENCE</span>
        <span
          className="absolute inset-0 text-amber-400 overflow-hidden whitespace-nowrap"
          style={{ width: `${Math.min(prog, 100)}%` }}
        >
          KARAOKE CADENCE
        </span>
      </div>
      <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2 animate-bounce" />
    </div>
  );
}

// 42. Kicker Overline Pair
function KickerOverlinePairPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-oxide font-bold">
        ✦ ARCHITECTURAL FOUNDATION
      </span>
      <h2 className="font-display text-2xl font-black text-ink tracking-tight mt-1 leading-tight">
        Structural Integrity
      </h2>
      <p className="text-xs text-graphite mt-1">High-contrast editorial hierarchy</p>
    </div>
  );
}

// 43. Kinetic Marquee
function KineticMarqueePreview() {
  return (
    <div className="w-full h-full p-4 flex items-center select-none overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-6 animate-marquee font-mono text-sm font-bold text-ink uppercase tracking-wider">
        <span>⚡ RUNTIME MOTION</span>
        <span className="text-oxide">◈ KINETIC ENGINE</span>
        <span>⚡ RUNTIME MOTION</span>
        <span className="text-oxide">◈ KINETIC ENGINE</span>
      </div>
    </div>
  );
}

// 44. Kinetic Ticker
function KineticTickerPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-center select-none font-mono text-xs bg-[#0b0f14] text-white p-3 rounded-lg">
      <div className="flex justify-between items-center py-1 border-b border-gray-800">
        <span>OPUI</span>
        <span className="text-emerald-400 font-bold">▲ $148.20 (+12.4%)</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span>GLYPH</span>
        <span className="text-red-400 font-bold">▼ $42.10 (-1.8%)</span>
      </div>
    </div>
  );
}

// 45. Led Dot Matrix Text
function LedDotMatrixTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-[#090b0e] text-amber-500 rounded-lg">
      <div className="font-mono text-xl font-bold tracking-[0.25em] drop-shadow-[0_0_8px_#f59e0b]">
        OPENUI 2.0
      </div>
      <span className="text-[9px] font-mono text-amber-700 tracking-widest mt-1">
        PIN MATRIX DIODE
      </span>
    </div>
  );
}

// 46. Lens Magnify Text
function LensMagnifyTextPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 180, y: 90 });
  const [isHovered, setIsHovered] = React.useState(false);
  const text = "Typography Precision In Motion";

  React.useEffect(() => {
    if (isHovered) return;
    let t = 0;
    const interval = setInterval(() => {
      t += 0.04;
      if (containerRef.current) {
        const w = containerRef.current.clientWidth || 360;
        const h = containerRef.current.clientHeight || 180;
        setPos({
          x: w / 2 + Math.sin(t) * (w * 0.26),
          y: h / 2 + Math.cos(t * 1.5) * 10,
        });
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const lensSize = 96;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsHovered(false)}
      className="w-full h-full min-h-[12rem] p-6 flex flex-col items-center justify-center select-none relative overflow-hidden cursor-crosshair"
    >
      {/* Base text */}
      <span className="font-display text-xl sm:text-2xl text-graphite/60 tracking-wider">
        {text}
      </span>

      {/* Floating Magnifier Lens */}
      <div
        className="pointer-events-none absolute rounded-full border-2 border-oxide shadow-2xl overflow-hidden backdrop-blur-[2px]"
        style={{
          width: lensSize,
          height: lensSize,
          left: pos.x - lensSize / 2,
          top: pos.y - lensSize / 2,
          boxShadow:
            "0 12px 35px -4px rgba(194, 65, 12, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.4)",
          backgroundColor: "hsl(var(--paper) / 0.92)",
        }}
      >
        {/* Reflection ring */}
        <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none z-10" />

        {/* Magnified Text */}
        <div
          className="absolute flex items-center justify-center whitespace-nowrap font-display text-xl sm:text-2xl font-black text-ink tracking-wider"
          style={{
            transform: "scale(1.75)",
            transformOrigin: `${pos.x}px ${pos.y}px`,
            left: -(pos.x - lensSize / 2),
            top: -(pos.y - lensSize / 2),
            width: containerRef.current ? containerRef.current.clientWidth : "100%",
            height: containerRef.current ? containerRef.current.clientHeight : "100%",
          }}
        >
          {text}
        </div>
      </div>

      <span className="absolute bottom-2 text-[9px] font-mono text-graphite/60 uppercase tracking-widest">
        Hover to explore magnification
      </span>
    </div>
  );
}

// 47. Letter Slot Machine
function LetterSlotMachinePreview() {
  const [col, setCol] = React.useState(["7", "7", "7"]);
  React.useEffect(() => {
    const t = setInterval(() => {
      const items = ["A", "7", "K", "Q", "★", "◈"];
      setCol([
        items[Math.floor(Math.random() * items.length)] ?? "7",
        items[Math.floor(Math.random() * items.length)] ?? "★",
        items[Math.floor(Math.random() * items.length)] ?? "◈",
      ]);
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="flex gap-2 p-2 rounded-xl bg-surface border-2 border-line shadow-xs">
        {col.map((c, i) => (
          <div key={i} className="w-10 h-14 rounded bg-ink text-amber-400 font-mono text-2xl font-black flex items-center justify-center shadow-inner">
            {c}
          </div>
        ))}
      </div>
      <span className="text-[9px] font-mono text-oxide uppercase font-bold mt-2">Jackpot Slot Reel</span>
    </div>
  );
}

// 48. Letterpress Card Flip
function LetterpressCardFlipPreview() {
  const [flipped, setFlipped] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setFlipped((f) => !f), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none [perspective:800px]">
      <div
        className={`w-48 h-24 rounded-xl border border-line bg-paper p-3 shadow-md flex flex-col justify-center items-center transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="font-display text-lg font-bold text-ink">COTTON 600 GSM</span>
        <span className="font-mono text-[9px] text-oxide mt-1">FOIL DEBOSSED</span>
      </div>
    </div>
  );
}

// 49. Liquid Merge Heading
function LiquidMergeHeadingPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-4xl font-black text-oxide tracking-tight animate-pulse">
        LIQUID
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase tracking-widest mt-1">
        SVG Metaball Gooey Fusion
      </span>
    </div>
  );
}

// 50. Margin Note Annotations
function MarginNoteAnnotationsPreview() {
  return (
    <div className="w-full h-full p-4 flex justify-between items-center select-none">
      <div className="w-2/3 pr-3 text-xs font-sans text-ink leading-relaxed">
        The layout follows grid conventions <sup className="text-oxide font-bold">[1]</sup> across all breakpoints.
      </div>
      <div className="w-1/3 border-l border-oxide pl-2 text-[9px] font-mono text-oxide italic">
        [1] Swiss 12-column modular rhythm
      </div>
    </div>
  );
}

// 51. Measuring Tape Hover
function MeasuringTapeHoverPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="border border-line rounded-lg p-3 bg-surface w-full max-w-[240px]">
        <div className="flex justify-between font-mono text-[9px] text-cyan-600 mb-1">
          <span>ASCENDER: +12px</span>
          <span>CAP: 24px</span>
        </div>
        <div className="font-display text-2xl font-bold text-ink border-t border-b border-cyan-500/40 py-1">
          Typography
        </div>
        <div className="font-mono text-[9px] text-oxide mt-1">DESCENDER: -8px</div>
      </div>
    </div>
  );
}

// 52. Millimetre Ruler Scale
function MillimetreRulerScalePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <div className="font-display text-2xl font-bold text-ink mb-1">120 mm Metric</div>
      <div className="w-full h-4 bg-line/20 border-t border-line flex justify-between items-end px-1 font-mono text-[8px] text-graphite">
        {[0, 20, 40, 60, 80, 100].map((m) => (
          <span key={m} className="border-l border-ink h-2 pl-0.5">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

// 53. Mirror Input Text
function MirrorInputTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="font-display text-2xl font-bold text-ink">Bilateral Reflection</div>
      <div className="font-display text-2xl font-bold text-ink/25 [transform:scaleY(-1)] blur-[0.5px]">
        Bilateral Reflection
      </div>
    </div>
  );
}

// 54. Mirror Reflect Text
function MirrorReflectTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#111111] text-white rounded-lg">
      <div className="font-display text-2xl font-black tracking-wider text-white">
        SPECULAR GLOW
      </div>
      <div className="font-display text-2xl font-black tracking-wider text-white/20 [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),transparent)]">
        SPECULAR GLOW
      </div>
    </div>
  );
}

// 55. Neon Flicker Sign
function NeonFlickerSignPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center bg-[#07090c] rounded-lg">
      <h2 className="font-display text-3xl font-black text-[#ff3366] drop-shadow-[0_0_12px_#ff3366] animate-[pulse_1.2s_infinite]">
        NEON OPEN
      </h2>
      <span className="text-[9px] font-mono text-cyan-400 mt-1 drop-shadow-[0_0_6px_#22d3ee]">
        ✦ Gas Discharge Tube
      </span>
    </div>
  );
}

// 56. Outline Fill Hover
function OutlineFillHoverPreview() {
  const [fill, setFill] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setFill((f) => !f), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2
        className={`font-display text-4xl font-black transition-all duration-500 ${
          fill ? "text-oxide" : "text-transparent [-webkit-text-stroke:2px_#ba442c]"
        }`}
      >
        WIRE-FRAME
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Liquid Fill Sweep</span>
    </div>
  );
}

// 57. Overprint Misregister
function OverprintMisregisterPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="relative font-display text-3xl font-black">
        <span className="absolute inset-0 text-cyan-500 translate-x-1 translate-y-0.5 mix-blend-multiply opacity-80">
          CMYK OFFSET
        </span>
        <span className="absolute inset-0 text-fuchsia-500 -translate-x-1 -translate-y-0.5 mix-blend-multiply opacity-80">
          CMYK OFFSET
        </span>
        <span className="relative text-yellow-500 mix-blend-multiply opacity-90">
          CMYK OFFSET
        </span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2">
        1960s Screen Misregister
      </span>
    </div>
  );
}

// 58. Password Strength Mark
function PasswordStrengthMarkPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none">
      <span className="font-mono text-[9px] text-graphite uppercase mb-1">Entropy Score</span>
      <div className="font-mono text-lg tracking-widest text-ink mb-2">•••••••••••••</div>
      <div className="w-full h-2 rounded-full bg-line/20 overflow-hidden flex">
        <div className="h-full w-full bg-emerald-500" />
      </div>
      <span className="font-mono text-[10px] text-emerald-600 font-bold mt-1">
        ✓ CRYPTOGRAPHICALLY SECURE
      </span>
    </div>
  );
}

// 59. Perspective Tilt Text
function PerspectiveTiltTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none [perspective:300px]">
      <div className="font-display text-2xl font-black text-amber-500 [transform:rotateX(40deg)] text-center tracking-widest">
        EPISODE IV<br />THE HORIZON
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Perspective Recede</span>
    </div>
  );
}

// 60. Pull Quote Rule
function PullQuoteRulePreview() {
  return (
    <div className="w-full h-full p-4 flex items-center select-none border-l-4 border-oxide pl-4">
      <div>
        <p className="font-display text-base font-bold italic text-ink leading-snug">
          “Design is intelligence made visible across every tactile surface.”
        </p>
        <span className="font-mono text-[9px] text-graphite uppercase mt-1 block">
          — Principal Architect
        </span>
      </div>
    </div>
  );
}

// 61. Ransom Collage Note
function RansomCollageNotePreview() {
  const letters = [
    { c: "R", bg: "bg-red-500 text-white font-serif rotate-3" },
    { c: "A", bg: "bg-yellow-400 text-black font-sans -rotate-6" },
    { c: "N", bg: "bg-emerald-500 text-white font-mono rotate-2" },
    { c: "S", bg: "bg-blue-600 text-white font-display -rotate-3" },
    { c: "O", bg: "bg-purple-500 text-white font-sans rotate-6" },
    { c: "M", bg: "bg-black text-white font-serif -rotate-2" },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="flex gap-1.5">
        {letters.map((l, i) => (
          <span key={i} className={`px-2 py-1 text-base font-black shadow-xs ${l.bg}`}>
            {l.c}
          </span>
        ))}
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2">Newspaper Cutout Stacks</span>
    </div>
  );
}

// 62. Reading Level Tinter
function ReadingLevelTinterPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none text-xs leading-relaxed">
      <span className="text-[9px] font-mono text-graphite uppercase mb-1 font-bold">Flesch-Kincaid Grade Heatmap</span>
      <p>
        <span className="bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-1 rounded">Simple</span>{" "}
        lexical phrases{" "}
        <span className="bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1 rounded">synthesize</span>{" "}
        <span className="bg-red-500/20 text-red-800 dark:text-red-300 px-1 rounded">polysyllabic</span>{" "}
        readability metrics.
      </p>
    </div>
  );
}

// 63. Redaction Declassifier
function RedactionDeclassifierPreview() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-xs">
      <div className="text-[9px] text-oxide uppercase font-bold mb-1">TOP SECRET // CLASSIFIED</div>
      <div className="text-ink">
        Agent identity is{" "}
        <span className={`px-1 rounded transition-all duration-300 ${open ? "bg-emerald-500 text-white font-bold" : "bg-ink text-ink"}`}>
          CYRIL_CHRIS
        </span>{" "}
        verified.
      </div>
      <span className="text-[9px] text-graphite mt-2">
        {open ? "✦ DECLASSIFIED (Level 5)" : "✦ ENCRYPTED REDACTION"}
      </span>
    </div>
  );
}

// 64. Reply Tree Thread
function ReplyTreeThreadPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-sans text-xs space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-oxide text-white text-[9px] flex items-center justify-center font-bold">A</span>
        <span className="font-bold text-ink">Root Architectural RFC</span>
      </div>
      <div className="flex items-center gap-2 pl-4 border-l-2 border-line ml-2">
        <span className="w-4 h-4 rounded-full bg-cyan-600 text-white text-[9px] flex items-center justify-center font-bold">B</span>
        <span className="text-graphite">Nested reply discussion</span>
      </div>
    </div>
  );
}

// 65. RSVP Speed Reader
function RsvpSpeedReaderPreview() {
  const [idx, setIdx] = React.useState(0);
  const words = ["RAPID", "SERIAL", "VISUAL", "PRESENTATION", "450_WPM"];
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 280);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-surface border border-line rounded-lg">
      <div className="text-2xl font-mono font-black text-ink">
        <span className="text-oxide font-bold">|</span>
        {words[idx]}
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2">RSVP Speed Anchor</span>
    </div>
  );
}

// 66. Scatter Rain Text
function ScatterRainTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-[#0a0f12] text-emerald-400 font-mono rounded-lg">
      <div className="flex gap-4 text-sm animate-pulse">
        <span>0 1 0 1</span>
        <span className="text-white font-bold">M A T R I X</span>
        <span>1 0 1 0</span>
      </div>
      <span className="text-[9px] text-emerald-600 mt-2 uppercase">Digital Glyph Shower</span>
    </div>
  );
}

// 67. Scramble Text
function ScrambleTextPreview() {
  const [str, setStr] = React.useState("KINETIC_SPELL");
  React.useEffect(() => {
    const chars = "!@#$%^&*()_+~|}{[]";
    const t = setInterval(() => {
      setStr((s) => s.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
    }, 150);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="font-mono text-xl font-bold text-oxide bg-surface px-3 py-1.5 rounded border border-line">
        {str}
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2">Realtime Cipher Shuffle</span>
    </div>
  );
}

// 68. Scroll Lit Paragraph
function ScrollLitParagraphPreview() {
  const [lit, setLit] = React.useState(1);
  React.useEffect(() => {
    const t = setInterval(() => setLit((l) => (l % 3) + 1), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-serif text-sm space-y-1">
      <p className={lit === 1 ? "text-oxide font-bold bg-oxide/10 px-1 rounded" : "text-graphite/60"}>
        First line illuminated by the reading laser.
      </p>
      <p className={lit === 2 ? "text-oxide font-bold bg-oxide/10 px-1 rounded" : "text-graphite/60"}>
        Second line transitions into active focus.
      </p>
      <p className={lit === 3 ? "text-oxide font-bold bg-oxide/10 px-1 rounded" : "text-graphite/60"}>
        Third line maintains typographic continuity.
      </p>
    </div>
  );
}

// 69. Scroll Mask Wipe
function ScrollMaskWipePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-3xl font-black text-ink relative overflow-hidden">
        LASER WIPE
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-oxide to-transparent animate-[shimmer_2s_infinite] opacity-60" />
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Dynamic Diagonal Wipe</span>
    </div>
  );
}

// 70. Scroll Shear Type
function ScrollShearTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-3xl font-black text-ink [transform:skewX(-15deg)]">
        VELOCITY SHEAR
      </h2>
      <span className="text-[9px] font-mono text-oxide uppercase mt-2">Parallax Kinetic Shear</span>
    </div>
  );
}

// 71. Sentiment Color Words
function SentimentColorWordsPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-wrap gap-2 items-center justify-center select-none">
      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
        ✦ Joyful (+0.9)
      </span>
      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-xs">
        ◈ Calm (0.0)
      </span>
      <span className="px-2 py-1 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-bold text-xs">
        ▲ Dynamic (+0.8)
      </span>
    </div>
  );
}

// 72. Sight Size Ruler
function SightSizeRulerPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-[220px] border-2 border-dashed border-oxide p-2 rounded text-center">
        <span className="font-display text-xl font-bold text-ink">1:1 Sight Size</span>
      </div>
      <span className="text-[9px] font-mono text-graphite mt-1">Classical Atelier Proportion</span>
    </div>
  );
}

// 73. Silver Screen Subtitles
function SilverScreenSubtitlesPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-end select-none bg-black text-center pb-4 rounded-lg">
      <div className="font-sans text-sm font-semibold text-[#fef08a] drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide">
        [Anamorphic 2.39:1 Cinematic Cadence]
      </div>
    </div>
  );
}

// 74. Spectral Split Text
function SpectralSplitTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-blue-500">
        PRISM DISPERSION
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Chromatic Caustics</span>
    </div>
  );
}

// 75. Spiral Arc Type
function SpiralArcTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="w-24 h-24 rounded-full border-4 border-oxide/40 border-t-oxide animate-spin flex items-center justify-center">
        <span className="font-mono text-[9px] text-ink font-bold">SPIRAL</span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-2">Archimedean Arc</span>
    </div>
  );
}

// 76. Split Flap Board
function SplitFlapBoardPreview() {
  const [city, setCity] = React.useState("BERLIN");
  React.useEffect(() => {
    const cities = ["TOKYO", "BERLIN", "LONDON", "PARIS", "NEW YORK"];
    const t = setInterval(() => setCity(cities[Math.floor(Math.random() * cities.length)] ?? "BERLIN"), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-[#111] text-white rounded-lg">
      <div className="text-[9px] font-mono text-amber-500 uppercase mb-1">DEPARTURES // GATE 04</div>
      <div className="flex gap-1">
        {city.split("").map((c, i) => (
          <div key={i} className="w-7 h-10 bg-[#222] border-b-2 border-black flex items-center justify-center font-mono text-lg font-bold text-amber-400">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

// 77. Split Text
function SplitTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="relative font-display text-4xl font-black">
        <span className="block text-ink translate-x-1">BISECTED</span>
        <span className="block text-oxide -translate-x-1 -mt-5 opacity-80">BISECTED</span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-3">Razor Slice Divide</span>
    </div>
  );
}

// 78. Spotlight Knockout
function SpotlightKnockoutPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-[#0e0e0d] text-white rounded-lg text-center">
      <div className="w-32 h-16 rounded-full bg-radial from-white to-transparent flex items-center justify-center">
        <span className="font-display text-xl font-bold text-black">SPOTLIGHT</span>
      </div>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Theatrical Knockout</span>
    </div>
  );
}

// 79. Stroke Draw Text
function StrokeDrawTextPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <svg viewBox="0 0 240 50" className="w-48">
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          className="font-display text-2xl font-black fill-none stroke-oxide stroke-[2px] [stroke-dasharray:140] animate-[dash_2.5s_infinite_alternate]"
        >
          STROKE DRAW
        </text>
      </svg>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Vector Pen Draw</span>
    </div>
  );
}

// 80. Swatch Words
function SwatchWordsPreview() {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center gap-2 select-none">
      <div className="w-14 h-20 rounded border border-line bg-[#ba442c] p-1 flex flex-col justify-end text-white text-[8px] font-mono font-bold">
        <span>PANTONE</span>
        <span>OXIDE</span>
      </div>
      <div className="w-14 h-20 rounded border border-line bg-[#0284c7] p-1 flex flex-col justify-end text-white text-[8px] font-mono font-bold">
        <span>PANTONE</span>
        <span>AZURE</span>
      </div>
      <div className="w-14 h-20 rounded border border-line bg-[#16a34a] p-1 flex flex-col justify-end text-white text-[8px] font-mono font-bold">
        <span>PANTONE</span>
        <span>MOSS</span>
      </div>
    </div>
  );
}

// 81. Tabular Mass Edit
function TabularMassEditPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-[10px] space-y-1">
      <div className="flex justify-between border-b border-line pb-0.5 text-graphite">
        <span>ASSET</span>
        <span>BALANCE</span>
        <span>DELTA</span>
      </div>
      <div className="flex justify-between font-bold text-ink">
        <span>RESERVE_A</span>
        <span>$48,920.00</span>
        <span className="text-emerald-600">+4.2%</span>
      </div>
      <div className="flex justify-between text-graphite">
        <span>RESERVE_B</span>
        <span>$12,410.50</span>
        <span className="text-red-500">-1.1%</span>
      </div>
    </div>
  );
}

// 82. Tally Glyph Counter
function TallyGlyphCounterPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="font-mono text-2xl font-black text-oxide tracking-widest">
        卌 卌 卌 II
      </div>
      <span className="text-[10px] font-mono text-ink font-bold mt-1">COUNT: 17</span>
    </div>
  );
}

// 83. Tf Auto Emphasis
function TfAutoEmphasisPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none text-xs leading-relaxed">
      <span className="text-[9px] font-mono text-graphite uppercase mb-1 font-bold">TF-IDF Scaled Weights</span>
      <p>
        Statistical <strong className="text-base text-oxide font-black">relevance</strong> scores emphasize <strong className="text-sm font-bold text-ink">critical</strong> contextual entities.
      </p>
    </div>
  );
}

// 84. Theatre Marquee Bulbs
function TheatreMarqueeBulbsPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none bg-[#1a0f0f] border-2 border-yellow-500 p-2 rounded-xl text-center shadow-lg">
      <div className="flex gap-1.5 text-yellow-400 text-xs mb-1">
        {"● ● ● ● ● ● ● ●".split(" ").map((b, i) => (
          <span key={i} className="animate-ping" style={{ animationDuration: `${0.8 + i * 0.1}s` }}>
            {b}
          </span>
        ))}
      </div>
      <h2 className="font-display text-2xl font-black text-yellow-400 tracking-wider">
        NOW SHOWING
      </h2>
    </div>
  );
}

// 85. Thermal Print Type
function ThermalPrintTypePreview() {
  return (
    <div className="w-full h-full flex flex-col justify-center select-none font-mono text-[10px] bg-[#faf8f0] text-black p-3 border-dashed border border-gray-400 rounded">
      <div className="text-center font-bold pb-1 border-b border-dashed border-gray-400">
        OPENUI THERMAL LAB
      </div>
      <div className="flex justify-between mt-1">
        <span>ITEM_01</span>
        <span>$12.50</span>
      </div>
      <div className="flex justify-between font-bold border-t border-dashed border-gray-400 pt-1 mt-1">
        <span>TOTAL</span>
        <span>$12.50</span>
      </div>
    </div>
  );
}

// 86. Thermal Receipt Total
function ThermalReceiptTotalPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none font-mono">
      <div className="text-xs text-graphite">SUM TOTAL DUE</div>
      <div className="text-2xl font-black text-ink tracking-tight">$1,489.99</div>
      <div className="w-24 h-1 bg-ink mt-1" />
      <div className="text-[8px] text-graphite mt-1">BARCODE_99048201</div>
    </div>
  );
}

// 87. Ticker Tape Deltas
function TickerTapeDeltasPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-center select-none font-mono text-xs bg-[#f4ebd0] text-[#1c1917] p-2 border border-amber-900/30 rounded">
      <div className="flex justify-between font-bold">
        <span>TAPE № 408</span>
        <span className="text-emerald-700">▲ +3.4pt</span>
      </div>
      <div className="tracking-widest text-[10px] mt-1">..-.- -... .-.-. --- .--. ..- ..</div>
    </div>
  );
}

// 88. Time Of Day Greeting
function TimeOfDayGreetingPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
        ☀
      </div>
      <h3 className="font-display text-lg font-bold text-ink mt-1">Good Afternoon</h3>
      <span className="font-mono text-[9px] text-graphite">Solar Chronometer</span>
    </div>
  );
}

// 89. Tracked Changes Accept
function TrackedChangesAcceptPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none text-xs leading-relaxed font-sans">
      <p>
        The interface uses <del className="text-red-500 bg-red-500/10 px-0.5">static layouts</del>{" "}
        <ins className="no-underline text-emerald-600 bg-emerald-500/10 px-0.5 font-bold">
          kinetic spatial engines
        </ins>{" "}
        for feedback.
      </p>
      <span className="font-mono text-[9px] text-emerald-600 font-bold mt-1">✓ Change Accepted</span>
    </div>
  );
}

// 90. Type Stack
function TypeStackPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-display text-2xl font-black leading-[0.9] text-ink uppercase tracking-tighter">
      <span>SWISS</span>
      <span className="text-oxide">DESIGN</span>
      <span>SYSTEM</span>
    </div>
  );
}

// 91. Typewriter Stack
function TypewriterStackPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-mono text-sm">
      <div className="flex items-center text-ink font-bold">
        <span>CLACK_CLACK_TYPE</span>
        <span className="w-2 h-4 bg-oxide ml-1 animate-pulse" />
      </div>
      <span className="text-[9px] text-graphite uppercase mt-2">Mechanical Carriage</span>
    </div>
  );
}

// 92. Variable Weight Text
function VariableWeightTextPreview() {
  const [wt, setWt] = React.useState(300);
  React.useEffect(() => {
    let forward = true;
    const t = setInterval(() => {
      setWt((w) => {
        if (w >= 900) forward = false;
        if (w <= 200) forward = true;
        return forward ? w + 100 : w - 100;
      });
    }, 200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-sans text-3xl text-ink transition-all duration-150" style={{ fontWeight: wt }}>
        VARIABLE
      </h2>
      <span className="font-mono text-[10px] text-oxide font-bold mt-1">WEIGHT: {wt}</span>
    </div>
  );
}

// 93. Verse Line Numbers
function VerseLineNumbersPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none font-serif text-xs leading-relaxed">
      <div className="flex gap-3">
        <span className="font-mono text-[10px] text-graphite">01</span>
        <span className="text-ink">Of Mans First Disobedience, and the Fruit</span>
      </div>
      <div className="flex gap-3">
        <span className="font-mono text-[10px] text-graphite">02</span>
        <span className="text-ink">Of that Forbidden Tree, whose mortal tast</span>
      </div>
      <div className="flex gap-3 font-bold text-oxide">
        <span className="font-mono text-[10px]">05</span>
        <span>Brought Death into the World, and all our woe</span>
      </div>
    </div>
  );
}

// 94. Vertical Kern Text
function VerticalKernTextPreview() {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center select-none">
      <div className="flex gap-4 [writing-mode:vertical-rl] font-display text-xl font-bold text-ink">
        <span>縦書タイポグラフィ</span>
        <span className="text-oxide">VERTICAL KERN</span>
      </div>
    </div>
  );
}

// 95. Vertical Phrase Ticker
function VerticalPhraseTickerPreview() {
  const [idx, setIdx] = React.useState(0);
  const words = ["BEAUTIFUL", "REACTIVE", "DYNAMIC", "SCALABLE"];
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1400);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <span className="text-xs text-graphite font-mono">INTERFACES ARE</span>
      <h3 className="font-display text-2xl font-black text-oxide mt-0.5 animate-[slideUp_400ms_ease-out]">
        {words[idx]}
      </h3>
    </div>
  );
}

// 96. Wandering Gradient Type
function WanderingGradientTypePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none text-center">
      <h2 className="font-display text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
        AURORA
      </h2>
      <span className="text-[9px] font-mono text-graphite uppercase mt-1">Mesh Gradient Flow</span>
    </div>
  );
}

// 97. Wave Text
function WaveTextPreview() {
  const chars = ["H", "A", "R", "M", "O", "N", "I", "C"];
  return (
    <div className="w-full h-full p-4 flex items-center justify-center select-none">
      <div className="flex gap-1 font-display text-3xl font-black text-ink">
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block animate-bounce"
            style={{ animationDuration: "1.4s", animationDelay: `${i * 120}ms` }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// 98. Wax Seal Stamp
function WaxSealStampPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none">
      <div className="w-16 h-16 rounded-full bg-[#831843] border-4 border-[#9d174d] text-amber-200 flex flex-col items-center justify-center shadow-lg font-serif text-lg font-bold">
        <span>UI</span>
      </div>
      <span className="text-[9px] font-mono text-oxide uppercase font-bold mt-2">Imperial Wax Stamp</span>
    </div>
  );
}

// 99. Whisper Stage Direction
function WhisperStageDirectionPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center select-none text-center">
      <span className="font-serif italic text-base text-graphite">
        [whispering softly into the wings, as the lights fade]
      </span>
      <span className="font-mono text-[9px] text-oxide uppercase tracking-widest mt-2 font-bold">
        Theatrical Stage Script
      </span>
    </div>
  );
}

// 100. Word Help Balloons
function WordHelpBalloonsPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none relative">
      <div className="bg-ink text-paper px-3 py-1.5 rounded-lg text-xs font-mono shadow-md mb-2">
        <span>Affine Matrix Transform</span>
        <div className="w-2 h-2 bg-ink rotate-45 mx-auto -mb-1" />
      </div>
      <span className="font-display text-lg font-bold text-ink underline decoration-oxide decoration-2">
        Mathematical Vector
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* THE 4 USER-REQUESTED TILES (Morphing Hamburger, Pulley, Drawer, Diff)       */
/* -------------------------------------------------------------------------- */

// Card 53: Morphing Hamburger
function MorphingHamburgerPreview() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1800);
    return () => clearInterval(t);
  }, []);

  const bar = "absolute left-0 h-0.5 w-7 rounded-full bg-ink transition-all duration-300";

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center select-none bg-surface/50">
      <div className="p-4 rounded-xl border border-line bg-surface shadow-xs flex items-center justify-center">
        <button
          type="button"
          aria-label="Toggle morph"
          onClick={() => setOpen(!open)}
          className="relative h-9 w-9 cursor-pointer border-0 bg-transparent p-0"
        >
          <span
            className={bar}
            style={{
              top: open ? "calc(50% - 1px)" : "8px",
              transform: open ? "rotate(45deg)" : "rotate(0)",
              backgroundColor: open ? "#ba442c" : "currentColor",
            }}
          />
          <span
            className={bar}
            style={{
              top: "calc(50% - 1px)",
              opacity: open ? 0 : 1,
              transform: open ? "scaleX(0.2)" : "scaleX(1)",
            }}
          />
          <span
            className={bar}
            style={{
              bottom: open ? "calc(50% - 1px)" : "8px",
              transform: open ? "rotate(-45deg)" : "rotate(0)",
              backgroundColor: open ? "#ba442c" : "currentColor",
            }}
          />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-oxide animate-ping" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-graphite font-bold">
          {open ? "State: Active (X)" : "State: Menu (Burger)"}
        </span>
      </div>
    </div>
  );
}

// Card 66: Physics Rope Pulley
function PhysicsRopePulleyPreview() {
  const [leftY, setLeftY] = React.useState(50);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setLeftY(50 + Math.sin(t) * 35);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const totalLength = 100;
  const rightY = totalLength - leftY;

  return (
    <div className="w-full h-full p-3 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top pulley wheel */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 border-ink bg-line/20 flex items-center justify-center shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-oxide" />
        </div>
      </div>

      {/* Ropes and Weights */}
      <div className="relative h-24 flex justify-between px-8">
        {/* Left Mass */}
        <div
          className="flex flex-col items-center transition-all duration-75"
          style={{ transform: `translateY(${leftY * 0.45}px)` }}
        >
          <div className="w-[1.5px] bg-ink" style={{ height: Math.max(leftY * 0.45, 4) }} />
          <div className="w-9 h-9 rounded-lg bg-ink text-paper flex items-center justify-center font-mono text-[10px] font-bold shadow-md">
            5kg
          </div>
        </div>

        {/* Right Mass */}
        <div
          className="flex flex-col items-center transition-all duration-75"
          style={{ transform: `translateY(${rightY * 0.45}px)` }}
        >
          <div className="w-[1.5px] bg-ink" style={{ height: Math.max(rightY * 0.45, 4) }} />
          <div className="w-9 h-9 rounded-lg border border-line bg-surface text-ink flex items-center justify-center font-mono text-[10px] font-bold shadow-md">
            5kg
          </div>
        </div>
      </div>

      <div className="text-center font-mono text-[9px] uppercase tracking-widest text-graphite">
        Newtonian Gravity Exchange
      </div>
    </div>
  );
}

// Card 84: Spring Drawer
function SpringDrawerPreview() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center select-none relative overflow-hidden bg-line/10">
      <div className="relative w-full max-w-[260px] h-28 rounded-xl border border-line bg-surface overflow-hidden shadow-xs">
        <p className="absolute inset-0 flex items-center justify-end pr-4 font-mono text-[10px] text-graphite">
          Velocity Spring →
        </p>
        <div
          className="absolute top-0 bottom-0 left-0 w-36 bg-paper/95 border-r border-line p-3 shadow-xl backdrop-blur-xs flex flex-col justify-center transition-transform duration-500"
          style={{
            transform: open ? "translateX(0)" : "translateX(-80%)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="w-5 h-1 bg-oxide rounded-full mb-1" />
          <div className="font-display text-sm font-bold text-ink">Spring Sheet</div>
          <div className="text-[9px] font-mono text-graphite mt-0.5">Velocity flick</div>
        </div>
      </div>
      <span className="text-[9px] font-mono text-oxide uppercase font-bold mt-2">
        {open ? "✦ Gesture: Released (Open)" : "✦ Gesture: Retracted"}
      </span>
    </div>
  );
}

// Card 45: Interactive Diff Slider
function InteractiveDiffSliderPreview() {
  const [split, setSplit] = React.useState(50);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.03;
      setSplit(50 + Math.sin(t) * 38);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden rounded-xl border border-line bg-paper">
      {/* Before Face */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-5 bg-line/10">
        <span className="font-mono text-[10px] text-graphite font-bold uppercase tracking-widest">
          BEFORE SPEC
        </span>
        <span className="font-display text-lg font-bold text-ink">V1: Wireframe</span>
      </div>

      {/* After Face (Clipped) */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center p-5 bg-ink text-paper"
        style={{ clipPath: `inset(0 0 0 ${split}%)` }}
      >
        <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
          AFTER SPEC
        </span>
        <span className="font-display text-lg font-bold text-white">V2: High-Fi</span>
      </div>

      {/* Scrubber Line */}
      <div
        className="absolute inset-y-0 w-[2.5px] bg-red-500 z-10 drop-shadow-[0_0_6px_#ef4444]"
        style={{ left: `${split}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center text-[7px] text-white font-bold">
          ↔
        </div>
      </div>

      <div className="absolute bottom-2 left-2 z-20 font-mono text-[9px] text-graphite">
        Diff: {Math.round(split)}%
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PREVIEW REGISTRY MAPPING                                                   */
/* -------------------------------------------------------------------------- */

const PREVIEWS_MAP: Record<string, () => React.JSX.Element> = {
  // 100 Text items
  "acrostic-column": AcrosticColumnPreview,
  "balance-subhead": BalanceSubheadPreview,
  "baseline-grid-overlay": BaselineGridOverlayPreview,
  "baseline-slide-lines": BaselineSlideLinesPreview,
  "bidi-mirror-type": BidiMirrorTypePreview,
  "bionic-emphasis-text": BionicEmphasisTextPreview,
  "blind-deboss-toggle": BlindDebossTogglePreview,
  "blur-reveal-text": BlurRevealTextPreview,
  "braille-dual-render": BrailleDualRenderPreview,
  "census-bar-heading": CensusBarHeadingPreview,
  "chapter-numeral-roman": ChapterNumeralRomanPreview,
  "character-wheel-picker": CharacterWheelPickerPreview,
  "chisel-carve-type": ChiselCarveTypePreview,
  "chord-lyric-sheet": ChordLyricSheetPreview,
  "circular-type": CircularTypePreview,
  "code-token-typeset": CodeTokenTypesetPreview,
  "counter-typography": CounterTypographyPreview,
  "decrypt-text": DecryptTextPreview,
  "dictionary-headword": DictionaryHeadwordPreview,
  "editorial-drop-cap": EditorialDropCapPreview,
  "editorial-heading": EditorialHeadingPreview,
  "elastic-stretch-text": ElasticStretchTextPreview,
  "emboss-paint-type": EmbossPaintTypePreview,
  "firework-pop-glyphs": FireworkPopGlyphsPreview,
  "flip-clock-digits": FlipClockDigitsPreview,
  "foundry-specimen-sheet": FoundrySpecimenSheetPreview,
  "fountain-pen-signature": FountainPenSignaturePreview,
  "gerund-loading-label": GerundLoadingLabelPreview,
  "glitch-type": GlitchTypePreview,
  "glyph-flock-text": GlyphFlockTextPreview,
  "gradient-outline-type": GradientOutlineTypePreview,
  "gravity-letters": GravityLettersPreview,
  "hatch-fill-type": HatchFillTypePreview,
  "hover-replace-text": HoverReplaceTextPreview,
  "idle-fade-whisper": IdleFadeWhisperPreview,
  "ink-underline-draw": InkUnderlineDrawPreview,
  "inline-diff-markup": InlineDiffMarkupPreview,
  "inline-swap-sentence": InlineSwapSentencePreview,
  "jitter-type": JitterTypePreview,
  "justify-hyphen-proof": JustifyHyphenProofPreview,
  "karaoke-read-along": KaraokeReadAlongPreview,
  "kicker-overline-pair": KickerOverlinePairPreview,
  "kinetic-marquee": KineticMarqueePreview,
  "kinetic-ticker": KineticTickerPreview,
  "led-dot-matrix-text": LedDotMatrixTextPreview,
  "lens-magnify-text": LensMagnifyTextPreview,
  "letter-slot-machine": LetterSlotMachinePreview,
  "letterpress-card-flip": LetterpressCardFlipPreview,
  "liquid-merge-heading": LiquidMergeHeadingPreview,
  "margin-note-annotations": MarginNoteAnnotationsPreview,
  "measuring-tape-hover": MeasuringTapeHoverPreview,
  "millimetre-ruler-scale": MillimetreRulerScalePreview,
  "mirror-input-text": MirrorInputTextPreview,
  "mirror-reflect-text": MirrorReflectTextPreview,
  "neon-flicker-sign": NeonFlickerSignPreview,
  "outline-fill-hover": OutlineFillHoverPreview,
  "overprint-misregister": OverprintMisregisterPreview,
  "password-strength-mark": PasswordStrengthMarkPreview,
  "perspective-tilt-text": PerspectiveTiltTextPreview,
  "pull-quote-rule": PullQuoteRulePreview,
  "ransom-collage-note": RansomCollageNotePreview,
  "reading-level-tinter": ReadingLevelTinterPreview,
  "redaction-declassifier": RedactionDeclassifierPreview,
  "reply-tree-thread": ReplyTreeThreadPreview,
  "rsvp-speed-reader": RsvpSpeedReaderPreview,
  "scatter-rain-text": ScatterRainTextPreview,
  "scramble-text": ScrambleTextPreview,
  "scroll-lit-paragraph": ScrollLitParagraphPreview,
  "scroll-mask-wipe": ScrollMaskWipePreview,
  "scroll-shear-type": ScrollShearTypePreview,
  "sentiment-color-words": SentimentColorWordsPreview,
  "sight-size-ruler": SightSizeRulerPreview,
  "silver-screen-subtitles": SilverScreenSubtitlesPreview,
  "spectral-split-text": SpectralSplitTextPreview,
  "spiral-arc-type": SpiralArcTypePreview,
  "split-flap-board": SplitFlapBoardPreview,
  "split-text": SplitTextPreview,
  "spotlight-knockout": SpotlightKnockoutPreview,
  "stroke-draw-text": StrokeDrawTextPreview,
  "swatch-words": SwatchWordsPreview,
  "tabular-mass-edit": TabularMassEditPreview,
  "tally-glyph-counter": TallyGlyphCounterPreview,
  "tf-auto-emphasis": TfAutoEmphasisPreview,
  "theatre-marquee-bulbs": TheatreMarqueeBulbsPreview,
  "thermal-print-type": ThermalPrintTypePreview,
  "thermal-receipt-total": ThermalReceiptTotalPreview,
  "ticker-tape-deltas": TickerTapeDeltasPreview,
  "time-of-day-greeting": TimeOfDayGreetingPreview,
  "tracked-changes-accept": TrackedChangesAcceptPreview,
  "type-stack": TypeStackPreview,
  "typewriter-stack": TypewriterStackPreview,
  "variable-weight-text": VariableWeightTextPreview,
  "verse-line-numbers": VerseLineNumbersPreview,
  "vertical-kern-text": VerticalKernTextPreview,
  "vertical-phrase-ticker": VerticalPhraseTickerPreview,
  "wandering-gradient-type": WanderingGradientTypePreview,
  "wave-text": WaveTextPreview,
  "wax-seal-stamp": WaxSealStampPreview,
  "whisper-stage-direction": WhisperStageDirectionPreview,
  "word-help-balloons": WordHelpBalloonsPreview,

  // User-requested motion / interaction items
  "morphing-hamburger": MorphingHamburgerPreview,
  "physics-rope-pulley": PhysicsRopePulleyPreview,
  "spring-drawer": SpringDrawerPreview,
  "interactive-diff-slider": InteractiveDiffSliderPreview,
  "interactive-map-split": InteractiveMapSplitPreview,
};

/**
 * Returns a bespoke, ultra-fast, 60fps native visual preview for catalogue items
 * if available, otherwise returns category specimen so empty black iframes never occur.
 */
export function getCatalogueVisualPreview(name: string, category?: string): React.JSX.Element | null {
  const Component =
    PREVIEWS_MAP[name] ??
    COMPONENTS_PREVIEWS_MAP[name] ??
    MOTION_PREVIEWS_MAP[name] ??
    INTERACTIONS_PREVIEWS_MAP[name] ??
    BACKGROUNDS_PREVIEWS_MAP[name];

  if (Component) return <Component />;

  // Guaranteed, instantaneous 60fps native specimen for all interactions
  if (category === "interactions" || category === "ui-elements") {
    return <GenericInteractionPreview title={name} subcategory={category} />;
  }

  return null;
}

// ─── InteractiveMapSplitPreview ──────────────────────────────────────────────
export function InteractiveMapSplitPreview() {
  const [activeNode, setActiveNode] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActiveNode((n) => (n + 1) % 2), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-12 bg-paper border border-line/30 rounded-xl overflow-hidden select-none font-sans text-xs">
      <div className="col-span-5 p-3 border-r border-line/40 bg-paper flex flex-col justify-center gap-1.5">
        <div className="font-mono text-[8px] uppercase tracking-wider text-graphite font-bold mb-0.5">
          REGIONS
        </div>
        <div
          className={`p-2 rounded-lg border transition-all duration-200 ${
            activeNode === 0
              ? "border-oxide bg-oxide/5 shadow-2xs"
              : "border-line/40 bg-surface/30 opacity-70"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
            <span className="font-bold text-[10px] text-ink">US-East</span>
          </div>
          <div className="font-mono text-[8px] text-graphite mt-0.5">Virginia · 14ms</div>
        </div>
        <div
          className={`p-2 rounded-lg border transition-all duration-200 ${
            activeNode === 1
              ? "border-oxide bg-oxide/5 shadow-2xs"
              : "border-line/40 bg-surface/30 opacity-70"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-moss" />
            <span className="font-bold text-[10px] text-ink">EU-Central</span>
          </div>
          <div className="font-mono text-[8px] text-graphite mt-0.5">Frankfurt · 28ms</div>
        </div>
      </div>

      <div className="col-span-7 bg-[#0b0c10] p-3 flex flex-col items-center justify-center relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2430_1px,transparent_1px),linear-gradient(to_bottom,#1f2430_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
        <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20" />
        <div className="absolute w-16 h-16 rounded-full border border-cyan-500/30" />

        <div className="absolute top-6 left-6 flex items-center gap-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="font-mono text-[7px] text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded">US-E</span>
        </div>

        <div className="absolute bottom-6 right-8 flex items-center gap-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[7px] text-emerald-300 font-bold bg-black/60 px-1 py-0.5 rounded">EU-C</span>
        </div>

        <div className="relative z-10 font-mono text-[8px] text-slate-400 bg-black/70 px-2 py-1 rounded-md border border-slate-700/60">
          CARTOGRAPHIC SPLIT
        </div>
      </div>
    </div>
  );
}



