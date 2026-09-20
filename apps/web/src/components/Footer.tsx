import { Link } from "react-router";

import { CATALOGUE_CATEGORIES } from "../lib/registry.js";
import { usePWA } from "./PWAInstall.js";

/**
 * The footer.
 *
 * Not a row of social icons — a final, complete index of the registry, doubled
 * as the sitemap. On a long catalogue page this is how someone who has scrolled
 * to the bottom navigates rather than scrolling back up, so it is required to be
 * genuinely complete.
 *
 * The licence line is not boilerplate. A registry's credibility depends on every
 * resource stating its licence, so the site states its own in the same place it
 * asks contributors to state theirs.
 */
export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  const { isInstalled, triggerInstall } = usePWA();

  return (
    <footer className="mt-8 sm:mt-12 border-t border-line">
      <div className="shell grid gap-8 sm:gap-10 py-10 sm:py-16 grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="UniqueFingerprint"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-contain shadow-xs ring-1 ring-line/30"
            />
            <p className="font-display text-step-2 leading-none tracking-tight text-ink">UniqueFingerprint</p>
          </div>
          <p className="mt-4 max-w-[34ch] text-[0.9rem] leading-relaxed text-graphite">
            An open registry of UI resources that carry a design fingerprint — with the design
            rules written down, so a model or a teammate can follow them.
          </p>
          <p className="eyebrow mt-6">Interfaces should have a fingerprint.</p>
        </div>

        <nav aria-label="Registry">
          <p className="eyebrow mb-4">Registry</p>
          <ul className="flex flex-col gap-2">
            {CATALOGUE_CATEGORIES.slice(0, 4).map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/${category.slug}`}
                  className="text-[0.85rem] text-graphite transition-colors duration-fast hover:text-ink"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Systems">
          <p className="eyebrow mb-4">Systems</p>
          <ul className="flex flex-col gap-2">
            {CATALOGUE_CATEGORIES.slice(4).map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/${category.slug}`}
                  className="text-[0.85rem] text-graphite transition-colors duration-fast hover:text-ink"
                >
                  {category.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/playground"
                className="text-[0.85rem] text-graphite transition-colors duration-fast hover:text-ink"
              >
                Playground
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Project">
          <p className="eyebrow mb-4">Project</p>
          <ul className="flex flex-col gap-2">
            {[
              ["/docs", "Documentation"],
              ["/docs/installation", "Installation"],
              ["/docs/cli", "CLI"],
              ["/docs/registry", "Registry"],
              ["/docs/design-systems", "Design systems"],
              ["/contributors", "Contributors"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to!}
                  className="text-[0.85rem] text-graphite transition-colors duration-fast hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
            {!isInstalled && (
              <li>
                <button
                  type="button"
                  onClick={triggerInstall}
                  className="text-[0.85rem] text-graphite transition-colors duration-fast hover:text-ink text-left inline-flex items-center gap-1.5"
                >
                  Download App (PWA)
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
            © {year} UniqueFingerprint · MIT licensed · every resource states its own licence
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
            Open code · Distinctive design · Composable systems
          </p>
        </div>
      </div>
    </footer>
  );
}
