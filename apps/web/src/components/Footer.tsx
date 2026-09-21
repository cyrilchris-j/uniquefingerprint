import { Link } from "react-router";
import { usePWA } from "./PWAInstall.js";

/**
 * Minimal, classical, premium footer.
 *
 * Clean editorial aesthetic with concise navigation, quiet typography,
 * and zero unnecessary vertical weight.
 */
export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  const { isInstalled, triggerInstall } = usePWA();

  return (
    <footer className="border-t border-line/35 bg-paper/60 backdrop-blur-xs">
      <div className="shell py-8 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
        {/* Brand identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="UniqueFingerprint"
              width={26}
              height={26}
              className="h-6.5 w-6.5 object-contain mix-blend-screen transition-transform group-hover:scale-105"
            />
            <span className="font-display text-lg tracking-tight text-ink font-medium">
              UniqueFingerprint
            </span>
          </Link>

          <span className="hidden sm:inline text-line/60 font-mono text-xs select-none">/</span>

          <p className="text-xs text-graphite font-serif italic max-w-md">
            An open registry of UI resources crafted with distinctive design fingerprints.
          </p>
        </div>

        {/* Curated Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 text-xs font-mono">
          <Link
            to="/components"
            className="text-graphite transition-colors duration-fast hover:text-ink"
          >
            Components
          </Link>
          <Link
            to="/advanced"
            className="text-graphite transition-colors duration-fast hover:text-ink inline-flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-moss inline-block" />
            <span>Advanced</span>
          </Link>
          <Link
            to="/playground"
            className="text-graphite transition-colors duration-fast hover:text-ink"
          >
            Playground
          </Link>
          <Link
            to="/docs"
            className="text-graphite transition-colors duration-fast hover:text-ink"
          >
            Docs
          </Link>
          <a
            href="https://github.com/cyrilchris-j/uniquefingerprint"
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite transition-colors duration-fast hover:text-ink"
          >
            GitHub
          </a>
          {!isInstalled && (
            <button
              type="button"
              onClick={triggerInstall}
              className="text-graphite transition-colors duration-fast hover:text-ink cursor-pointer"
            >
              App (PWA)
            </button>
          )}
        </nav>
      </div>

      {/* Sub-bar hairline */}
      <div className="border-t border-line/20">
        <div className="shell py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-mono text-graphite/70">
          <span>© {year} UniqueFingerprint · MIT License</span>
          <span className="uppercase tracking-[0.16em] text-[9.5px]">Crafted for modern interfaces</span>
        </div>
      </div>
    </footer>
  );
}
