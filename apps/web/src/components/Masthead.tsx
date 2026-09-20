import {
  Box,
  ChevronDown,
  Download,
  Layers,
  Layout,
  LayoutGrid,
  Menu,
  Palette,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import * as React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@openui/ui";

import { CATALOGUE_CATEGORIES } from "../lib/registry.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { ADVANCED_RESOURCES } from "../advanced/index.js";
import { categorySegmentFor } from "./ResourceTile.js";
import { useAuth } from "../lib/auth.js";
import { AccountMenu } from "./AccountMenu.js";
import { ThemeToggle } from "./ThemeToggle.js";
import { usePWA } from "./PWAInstall.js";

/**
 * The masthead.
 *
 * A sticky rule with the wordmark on the left and an index of the catalogue
 * immediately beside it — the navigation is the taxonomy, visible rather than
 * hidden behind a "Products" dropdown. That is the archival device the whole
 * site is built on: you can always see what this registry contains.
 *
 * Small screens do not get the desktop navigation narrowed; they get a
 * full-height index panel, because a horizontal scroller of links is unusable
 * with a thumb.
 */
export function Masthead(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [term, setTerm] = React.useState("");
  const { isInstalled, triggerInstall } = usePWA();
  const registryIndex = useRegistryIndex();
  const [searchFocused, setSearchFocused] = React.useState(false);
  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const quickMatches = React.useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    const matches: Array<{
      title: string;
      slug: string;
      category: string;
      href: string;
      badge: string;
      isAdvanced?: boolean;
    }> = [];

    const advancedSlugs = new Set(ADVANCED_RESOURCES.map((r) => r.slug.toLowerCase()));

    // 1. First check Advanced resources (e.g. falling-physics-text, circular-text-orbit)
    for (const item of ADVANCED_RESOURCES) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        matches.push({
          title: item.title,
          slug: item.slug,
          category: item.category,
          href: `/advanced/${item.category}/${item.slug}`,
          badge: "Advanced",
          isAdvanced: true,
        });
        if (matches.length >= 6) break;
      }
    }

    // 2. Check Core Registry items (skip any item that is already in Advanced to prevent duplicate results)
    if (registryIndex.data?.items && matches.length < 6) {
      for (const item of registryIndex.data.items) {
        const itemSlug = item.name.toLowerCase();
        if (advancedSlugs.has(itemSlug)) {
          continue;
        }

        if (
          item.title.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          matches.push({
            title: item.title,
            slug: item.name,
            category: item.category,
            href: `/${categorySegmentFor(item.category)}/${item.name}`,
            badge: item.category,
            isAdvanced: false,
          });
          if (matches.length >= 6) break;
        }
      }
    }

    return matches;
  }, [term, registryIndex.data]);

  React.useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  React.useEffect(() => {
    setSearchFocused(false);
    setTerm("");
  }, [location.pathname]);

  const isSystemsActive = [
    "/backgrounds",
    "/layouts",
    "/sections",
    "/blocks",
    "/themes",
  ].some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  // Any navigation closes the panel; leaving it open over a new page is the
  // single most common mobile-navigation bug.
  React.useEffect(() => setMenuOpen(false), [location.pathname]);

  // Escape closes the panel, and the body is locked while it is open so the
  // page behind does not scroll under a fixed overlay.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="masthead">
      <div className="shell flex h-14 sm:h-16 items-center justify-between gap-4 max-w-full min-w-0">
        <div className="flex items-center gap-5 xl:gap-7 2xl:gap-9 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus-visible:outline-none"
          >
            <img
              src="/logo.png"
              alt="UniqueFingerprint"
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain shadow-xs ring-1 ring-line/30 transition-transform duration-fast ease-editorial group-hover:scale-105"
            />
            <span className="font-display text-xl sm:text-step-2 leading-none tracking-tight text-ink">
              UniqueFingerprint
            </span>
          </Link>

          <nav aria-label="Catalogue" className="hidden xl:block min-w-0">
            <ul className="flex items-center gap-3.5 2xl:gap-5 min-w-0">
              {CATALOGUE_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <NavLink
                    to={`/${category.slug}`}
                    className={({ isActive }) =>
                      cn(
                        "eyebrow whitespace-nowrap text-[11px] 2xl:text-[11.5px] tracking-[0.14em] 2xl:tracking-[0.18em] transition-colors duration-fast ease-editorial hover:text-ink py-1",
                        isActive ? "text-ink font-semibold" : "text-graphite",
                      )
                    }
                  >
                    {category.title}
                  </NavLink>
                </li>
              ))}

              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "eyebrow whitespace-nowrap text-[11px] 2xl:text-[11.5px] tracking-[0.14em] 2xl:tracking-[0.18em] transition-colors duration-fast ease-editorial hover:text-ink flex items-center gap-1 focus-visible:outline-none cursor-pointer py-1",
                        isSystemsActive ? "text-ink font-semibold" : "text-graphite",
                      )}
                      aria-label="Systems menu"
                    >
                      <span>Systems</span>
                      <ChevronDown aria-hidden="true" className="h-3 w-3 text-graphite/70" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="w-96 p-2 bg-paper/98 dark:bg-[#141413]/98 backdrop-blur-md border border-line shadow-2xl z-50 rounded-xl animate-in fade-in zoom-in-95 duration-100 text-left"
                  >
                    <div className="px-3 py-1.5 mb-1.5 border-b border-line/40 flex items-center justify-between">
                      <span className="font-mono text-[9.5px] uppercase tracking-widest text-graphite font-bold">
                        Systems & Architecture
                      </span>
                      <span className="font-mono text-[9px] text-oxide font-bold uppercase tracking-wider bg-oxide/10 px-1.5 py-0.5 rounded border border-oxide/20">
                        5 Categories
                      </span>
                    </div>

                    <DropdownMenuItem asChild className="p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                      <Link
                        to="/backgrounds"
                        className={cn(
                          "group flex items-start gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-fast",
                          "hover:bg-line/10 data-[highlighted]:bg-line/10",
                          location.pathname.startsWith("/backgrounds")
                            ? "bg-line/15 border-l-2 border-oxide"
                            : "border-l-2 border-transparent",
                        )}
                      >
                        <div className="mt-0.5 p-1.5 rounded-md bg-line/10 text-graphite group-hover:text-oxide group-hover:bg-oxide/10 transition-colors shrink-0">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-oxide transition-colors">
                              Backgrounds
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium text-oxide bg-oxide/10 border border-oxide/20">
                              Canvas & Shader
                            </span>
                          </div>
                          <p className="text-[10px] text-graphite leading-tight mt-0.5 group-hover:text-ink/80 transition-colors">
                            Surfaces, generative shaders, canvas loops & ambient fields
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                      <Link
                        to="/layouts"
                        className={cn(
                          "group flex items-start gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-fast",
                          "hover:bg-line/10 data-[highlighted]:bg-line/10",
                          location.pathname.startsWith("/layouts")
                            ? "bg-line/15 border-l-2 border-oxide"
                            : "border-l-2 border-transparent",
                        )}
                      >
                        <div className="mt-0.5 p-1.5 rounded-md bg-line/10 text-graphite group-hover:text-oxide group-hover:bg-oxide/10 transition-colors shrink-0">
                          <Layout className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-oxide transition-colors">
                              Layouts
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium text-graphite bg-surface border border-line/50">
                              Structure
                            </span>
                          </div>
                          <p className="text-[10px] text-graphite leading-tight mt-0.5 group-hover:text-ink/80 transition-colors">
                            Asymmetric composition primitives, bento grids & page shells
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                      <Link
                        to="/sections"
                        className={cn(
                          "group flex items-start gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-fast",
                          "hover:bg-line/10 data-[highlighted]:bg-line/10",
                          location.pathname.startsWith("/sections")
                            ? "bg-line/15 border-l-2 border-oxide"
                            : "border-l-2 border-transparent",
                        )}
                      >
                        <div className="mt-0.5 p-1.5 rounded-md bg-line/10 text-graphite group-hover:text-oxide group-hover:bg-oxide/10 transition-colors shrink-0">
                          <LayoutGrid className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-oxide transition-colors">
                              Sections
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium text-graphite bg-surface border border-line/50">
                              Hero & Nav
                            </span>
                          </div>
                          <p className="text-[10px] text-graphite leading-tight mt-0.5 group-hover:text-ink/80 transition-colors">
                            Whole page regions, headers, heroes, footers
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                      <Link
                        to="/blocks"
                        className={cn(
                          "group flex items-start gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-fast",
                          "hover:bg-line/10 data-[highlighted]:bg-line/10",
                          location.pathname.startsWith("/blocks")
                            ? "bg-line/15 border-l-2 border-oxide"
                            : "border-l-2 border-transparent",
                        )}
                      >
                        <div className="mt-0.5 p-1.5 rounded-md bg-line/10 text-graphite group-hover:text-oxide group-hover:bg-oxide/10 transition-colors shrink-0">
                          <Box className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-oxide transition-colors">
                              Blocks
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium text-graphite bg-surface border border-line/50">
                              Composite
                            </span>
                          </div>
                          <p className="text-[10px] text-graphite leading-tight mt-0.5 group-hover:text-ink/80 transition-colors">
                            Multi-part application surfaces & working blocks
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                      <Link
                        to="/themes"
                        className={cn(
                          "group flex items-start gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-fast",
                          "hover:bg-line/10 data-[highlighted]:bg-line/10",
                          location.pathname.startsWith("/themes")
                            ? "bg-line/15 border-l-2 border-oxide"
                            : "border-l-2 border-transparent",
                        )}
                      >
                        <div className="mt-0.5 p-1.5 rounded-md bg-line/10 text-graphite group-hover:text-oxide group-hover:bg-oxide/10 transition-colors shrink-0">
                          <Palette className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-oxide transition-colors">
                              Themes
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium text-graphite bg-surface border border-line/50">
                              Tokens
                            </span>
                          </div>
                          <p className="text-[10px] text-graphite leading-tight mt-0.5 group-hover:text-ink/80 transition-colors">
                            Visual token sets, palette voices & themes
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <NavLink
                  to="/advanced"
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.14em] font-semibold transition-all duration-300 group",
                      "border border-oxide/60 bg-gradient-to-r from-oxide/[0.12] via-amber-500/[0.14] to-oxide/[0.12] text-oxide shadow-xs hover:shadow-md hover:border-oxide hover:from-oxide hover:to-oxide hover:text-paper",
                      "dark:border-amber-400/50 dark:bg-gradient-to-r dark:from-amber-500/[0.16] dark:via-orange-500/[0.14] dark:to-amber-500/[0.16] dark:text-amber-300 dark:hover:border-amber-300 dark:hover:from-amber-500 dark:hover:to-amber-600 dark:hover:text-black",
                      isActive && "bg-gradient-to-r from-oxide to-amber-600 text-paper border-transparent font-bold shadow-md shadow-oxide/20 dark:text-black dark:from-amber-400 dark:to-orange-400",
                    )
                  }
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oxide dark:bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-oxide dark:bg-amber-400 group-hover:bg-paper dark:group-hover:bg-black" />
                  </span>
                  <span className="font-bold tracking-wider">Advanced</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold leading-none transition-colors",
                      "bg-oxide text-paper group-hover:bg-paper group-hover:text-oxide",
                      "dark:bg-amber-400 dark:text-black dark:group-hover:bg-black dark:group-hover:text-amber-300",
                    )}
                  >
                    220+
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div ref={searchBoxRef} className="relative hidden xl:flex items-center">
            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                const trimmed = term.trim();
                setSearchFocused(false);
                navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
              }}
              className="flex items-center gap-2 border-b border-line/80 focus-within:border-ink dark:focus-within:border-white transition-colors duration-fast px-1 py-0.5"
            >
              <Search aria-hidden className="h-3.5 w-3.5 text-graphite shrink-0" />
              <label htmlFor="masthead-search" className="sr-only">
                Search the registry
              </label>
              <input
                id="masthead-search"
                type="search"
                value={term}
                onFocus={() => setSearchFocused(true)}
                onChange={(event) => {
                  setTerm(event.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search resources..."
                className="h-8 sm:h-9 w-36 lg:w-48 xl:w-56 2xl:w-64 bg-transparent font-mono text-[11px] tracking-[0.12em] text-ink placeholder:text-graphite/60 focus:w-48 lg:focus:w-60 xl:focus:w-68 2xl:focus:w-76 focus:outline-none"
                style={{ transition: "width var(--motion-normal) var(--motion-ease)" }}
              />
            </form>

            {searchFocused && term.trim().length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] z-50 rounded-xl border border-line bg-paper/95 dark:bg-[#151514]/95 backdrop-blur-md shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-graphite/80 border-b border-line/40 flex items-center justify-between">
                  <span>Matching Resources</span>
                  <span>{quickMatches.length} {quickMatches.length === 1 ? "match" : "matches"}</span>
                </div>
                {quickMatches.length === 0 ? (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs text-graphite">No direct matches found</p>
                    <Link
                      to={`/search?q=${encodeURIComponent(term.trim())}`}
                      onClick={() => {
                        setSearchFocused(false);
                        setTerm("");
                      }}
                      className="mt-1.5 inline-block text-[11px] font-mono text-oxide hover:underline"
                    >
                      Search across full registry &rarr;
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-line/30 max-h-72 overflow-y-auto">
                    {quickMatches.map((m) => (
                      <li key={m.href}>
                        <Link
                          to={m.href}
                          onClick={() => {
                            setSearchFocused(false);
                            setTerm("");
                          }}
                          className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-ink/[0.04] dark:hover:bg-white/[0.06] transition-colors group"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-xs text-ink group-hover:text-oxide transition-colors truncate font-medium">
                              {m.title}
                            </p>
                            <p className="font-mono text-[9.5px] text-graphite truncate">
                              {m.slug}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider border",
                              m.isAdvanced
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                : "bg-surface text-graphite border-line/40",
                            )}
                          >
                            {m.badge}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t border-line/40 pt-1.5 mt-1 px-2 pb-0.5 text-right">
                  <Link
                    to={`/search?q=${encodeURIComponent(term.trim())}`}
                    onClick={() => {
                      setSearchFocused(false);
                      setTerm("");
                    }}
                    className="font-mono text-[10px] text-graphite hover:text-ink transition-colors"
                  >
                    All results for &ldquo;{term.trim()}&rdquo; &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="hidden xl:block">
            <ThemeToggle />
          </div>

          <Link
            to="/search"
            aria-label="Search the registry"
            title="Search"
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border border-line text-graphite transition-colors duration-fast hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide xl:hidden"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
          </Link>

          <AccountMenu />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-index"
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border border-line text-graphite transition-colors duration-fast hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide xl:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
            <span className="sr-only">{menuOpen ? "Close index" : "Open index"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-index"
          className="fixed inset-x-0 bottom-0 top-14 sm:top-16 z-30 overflow-y-auto border-t border-line bg-paper xl:hidden"
          style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom, 0px))" }}
        >
          <nav aria-label="Catalogue" className="shell py-6">
            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                const trimmed = term.trim();
                setMenuOpen(false);
                navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
              }}
              className="mb-6 flex items-center gap-2.5 border-b border-line pb-2.5"
            >
              <Search aria-hidden className="h-4 w-4 text-graphite shrink-0" />
              <input
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search components, text, motion..."
                className="w-full bg-transparent font-mono text-xs tracking-wider text-ink placeholder:text-graphite/70 focus:outline-none"
              />
            </form>

            {term.trim().length > 0 && quickMatches.length > 0 && (
              <div className="mb-6 rounded-xl border border-line bg-surface/60 p-2">
                <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-graphite border-b border-line/30 mb-1">
                  Suggested Matches ({quickMatches.length})
                </p>
                <ul className="divide-y divide-line/30">
                  {quickMatches.map((m) => (
                    <li key={m.href}>
                      <Link
                        to={m.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setTerm("");
                        }}
                        className="flex items-center justify-between py-2 px-2 hover:bg-ink/[0.04] rounded transition-colors"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="font-display text-xs text-ink font-medium truncate">
                            {m.title}
                          </p>
                          <p className="font-mono text-[9px] text-graphite truncate">
                            {m.slug}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider border",
                            m.isAdvanced
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                              : "bg-surface text-graphite border-line/40",
                          )}
                        >
                          {m.badge}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!isInstalled && (
              <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/60 p-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="UniqueFingerprint"
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-lg object-contain shadow-xs ring-1 ring-line/30"
                  />
                  <div>
                    <p className="font-display text-base font-medium leading-tight text-ink">Download App</p>
                    <p className="text-[11px] text-graphite">Install UniqueFingerprint on your home screen</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    triggerInstall();
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-ink text-paper hover:bg-oxide transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Install
                </button>
              </div>
            )}

            <p className="eyebrow mb-4">Index</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {CATALOGUE_CATEGORIES.map((category) => (
                <li key={category.slug} className="border-b border-line">
                  <NavLink
                    to={`/${category.slug}`}
                    className="flex items-baseline justify-between py-3"
                  >
                    <span className="font-display text-step-2 tracking-tight text-ink">
                      {category.title}
                    </span>
                    <span className="eyebrow">{category.resourceType ?? "system"}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-8">More</p>
            <div className="mb-4">
              <Link
                to="/advanced"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-oxide/50 bg-oxide/10 text-oxide font-mono text-xs uppercase tracking-wider"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oxide opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-oxide" />
                </span>
                <span className="font-bold">Advanced Collection</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-oxide text-paper leading-none">
                  220+
                </span>
              </Link>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                ["/explore", "Explore"],
                ["/playground", "Playground"],
                ["/builder", "Builder"],
                ["/collections", "Collections"],
                ["/contributors", "Contributors"],
                ["/docs", "Docs"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to!} className="eyebrow">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
              <span className="eyebrow">Colour theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export { useAuth };
