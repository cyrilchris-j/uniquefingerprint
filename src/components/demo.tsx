import { LiquidChromeFluid } from "./liquid-chrome-fluid";

export default function Demo() {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden border border-line/30 flex items-center justify-center">
      <LiquidChromeFluid className="absolute inset-0" />
      <div className="relative z-10 text-center select-none pointer-events-none p-6">
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-zinc-400 font-bold block mb-2">
          Viscous Metallic Surface
        </span>
        <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight">
          Liquid Chrome
        </h3>
      </div>
    </div>
  );
}
