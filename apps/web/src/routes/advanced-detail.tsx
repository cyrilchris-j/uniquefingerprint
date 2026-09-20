import * as React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { Button, EmptyState, Tabs, TabsContent, TabsList, TabsTrigger } from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
import { DnaStrip } from "../components/DnaStrip.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { getAdvancedItemBySlug, getAdvancedItemsByCategory } from "../advanced/index.js";
import { AdvancedPreview } from "../advanced/renderers/AdvancedPreview.js";

export default function AdvancedDetailPage(): React.JSX.Element {
  const { slug, category } = useParams<{ slug: string; category: string }>();
  const item = slug ? getAdvancedItemBySlug(slug) : undefined;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState<"preview" | "code" | "install">("preview");
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const related = React.useMemo(() => {
    if (!item) return [];
    return getAdvancedItemsByCategory(item.category)
      .filter((other) => other.slug !== item.slug)
      .slice(0, 3);
  }, [item]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveTab("preview");
  }, [slug]);

  if (!item) {
    return (
      <div className="shell py-16">
        <EmptyState
          eyebrow="Resource Not Found"
          title={`No advanced resource found for "${slug}".`}
          description="The requested resource may have moved or does not exist in the Advanced Ecosystem."
          action={
            <Button variant="outline" asChild>
              <Link to="/advanced">Browse Advanced Ecosystem</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const installCommand = `pnpm dlx uniquefingerprint add ${item.slug}`;

  const copyInstall = () => {
    navigator.clipboard?.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReturn = () => {
    try {
      sessionStorage.setItem("openui_returning", "true");
      if (item) {
        sessionStorage.setItem("openui_last_clicked_item", item.slug);
        sessionStorage.setItem(`openui_target_item_/${item.category}`, item.slug);
        sessionStorage.setItem("openui_target_item_/advanced", item.slug);
      }
    } catch {
      // Ignore
    }

    const lastOrigin = sessionStorage.getItem("openui_last_origin_path");
    if (lastOrigin && lastOrigin !== window.location.pathname) {
      navigate(lastOrigin);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/advanced?category=${item.category}`);
    }
  };

  return (
    <div className="shell pt-8 sm:pt-12 pb-0">
      {/* Return to Previous View Action */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleReturn}
          className="group inline-flex items-center gap-2 px-3 py-1.5 -ml-3 rounded-lg text-xs font-mono tracking-wider uppercase text-graphite hover:text-ink hover:bg-surface/80 dark:hover:bg-zinc-800/60 border border-transparent hover:border-line/30 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-graphite group-hover:text-ink" />
          <span>Return to {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 font-mono text-[11px] text-graphite">
          <li>
            <Link to="/" className="hover:text-ink">UniqueFingerprint</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/advanced" className="hover:text-ink">Advanced</Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/advanced?category=${item.category}`} className="hover:text-ink capitalize">
              {item.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-ink font-medium">{item.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <SectionHeader
        as="h1"
        eyebrow={`Advanced · ${item.category} · ${item.technology}`}
        title={item.title}
        description={item.description}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyInstall}>
              {copied ? "Copied Command!" : "Copy Install Command"}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/playground?advanced=${item.slug}`}>Open in Playground</Link>
            </Button>
          </div>
        }
      />

      {/* Main Stage & Tabs */}
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-3">
            <TabsList>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">Source Code</TabsTrigger>
              <TabsTrigger value="install">Install & Spec</TabsTrigger>
            </TabsList>

            {/* Viewport & Accessibility Toggles */}
            {activeTab === "preview" && (
              <div className="flex items-center gap-3">
                {/* Viewport Width */}
                <div className="flex items-center border border-line rounded-md p-0.5 bg-surface/30">
                  <button
                    type="button"
                    onClick={() => setViewport("desktop")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "desktop" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Desktop (100%)"
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("tablet")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "tablet" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Tablet (768px)"
                  >
                    Tablet
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("mobile")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "mobile" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Mobile (375px)"
                  >
                    Mobile
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <button
                  type="button"
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`px-2.5 py-1 text-[10px] font-mono border rounded-md transition-colors ${
                    reducedMotion
                      ? "bg-moss/20 border-moss text-moss font-semibold"
                      : "border-line text-graphite hover:text-ink"
                  }`}
                >
                  {reducedMotion ? "Reduced Motion: On" : "Reduced Motion: Off"}
                </button>
              </div>
            )}
          </div>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-6">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-full transition-all duration-normal rounded-xl border border-line/30 dark:border-line/20 overflow-hidden shadow-xs bg-paper ${
                  viewport === "tablet" ? "max-w-[768px]" : viewport === "mobile" ? "max-w-[375px]" : "max-w-full"
                }`}
              >
                {/* macOS Chrome Toolbar */}
                <div className="flex h-10 items-center justify-between border-b border-line/25 bg-surface/50 px-3.5 sm:px-4">
                  {/* macOS window dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
                  </div>

                  {/* Center component address pill */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-paper border border-line/25 font-mono text-[11px] text-graphite shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                    <span className="text-ink font-medium tracking-tight">{item.slug}</span>
                    <span className="text-graphite/50 hidden sm:inline">·</span>
                    <span className="hidden sm:inline">preview</span>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRefreshKey((k) => k + 1)}
                      title="Reset preview"
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-graphite hover:text-ink transition-colors rounded border border-line/20 hover:bg-surface/70 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Stage */}
                <div
                  className="relative overflow-hidden bg-[#f8f6f1] dark:bg-[#0c0c0b] flex items-center justify-center p-6 sm:p-10 min-h-[360px] sm:min-h-[480px]"
                  style={{
                    backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <div
                    key={`${item.slug}-${viewport}-${refreshKey}`}
                    className="w-full flex items-center justify-center"
                  >
                    <AdvancedPreview item={item} reducedMotion={reducedMotion} />
                  </div>
                </div>

                {/* Tech and performance status bar */}
                <div className="border-t border-line/25 bg-surface/40 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-graphite">
                  <span>Technology: {item.technology}</span>
                  <span>Performance: {item.fingerprint.performanceTier}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Source Code Tab */}
          <TabsContent value="code" className="mt-6">
            <CodeBlock
              caption={`openui/${item.category}/${item.slug}.tsx`}
              language="tsx"
              code={item.sourceCode}
            />
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="install" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-semibold text-base text-ink">Installation</h3>
                <CodeBlock
                  caption="terminal"
                  language="bash"
                  code={`# Install with UniqueFingerprint CLI\n${installCommand}\n\n# Peer dependencies\npnpm add ${item.dependencies.join(" ")}`}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-display font-semibold text-base text-ink">Declared Properties</h3>
                <div className="border border-line rounded-lg overflow-hidden bg-paper">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface/50 border-b border-line text-[10px] text-graphite uppercase">
                      <tr>
                        <th className="p-3">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/30">
                      {item.props?.map((prop) => (
                        <tr key={prop.name}>
                          <td className="p-3 font-semibold text-ink">{prop.name}</td>
                          <td className="p-3 text-graphite">{prop.type}</td>
                          <td className="p-3 text-ink/80">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Composes With / Companion Resources */}
      {related.length > 0 && (
        <section className="mt-16 sm:mt-20 -mb-6 sm:-mb-14">
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
            <p className="eyebrow">COMPOSES WITH</p>
            <p className="eyebrow">SHARED TAGS AND CATEGORY</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {related.map((other, index) => (
              <article
                key={other.slug}
                className="group relative flex flex-col bg-white dark:bg-[#141413] border border-line/30 dark:border-line/20 rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-ink/40 dark:hover:border-ink/50 transition-all duration-normal ease-editorial hover:-translate-y-0.5"
              >
                {/* Index Badge */}
                <span
                  aria-hidden
                  className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-10 font-mono text-[10px] tracking-[0.2em] text-graphite bg-white/90 dark:bg-black/80 px-2 py-0.5 rounded border border-line/20 backdrop-blur-xs shadow-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Live Preview Stage */}
                <div
                  className="h-44 sm:h-52 w-full border-b border-line/25 overflow-hidden relative flex items-center justify-center bg-[#f8f6f1] dark:bg-[#0c0c0b] p-4"
                  style={{
                    backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center pointer-events-none transform scale-90">
                    <AdvancedPreview item={other} />
                  </div>
                </div>

                {/* Category & License */}
                <div className="flex items-center gap-2 px-5 pt-5 sm:px-6 sm:pt-6">
                  <span className="eyebrow text-[10px] sm:text-[11px] uppercase tracking-wider">
                    {other.category}
                  </span>
                  <span aria-hidden className="text-graphite/50">·</span>
                  <span className="eyebrow text-[10px] sm:text-[11px]">MIT</span>
                </div>

                {/* Title */}
                <h3 className="max-w-[24ch] font-display text-xl sm:text-step-2 leading-tight sm:leading-[1.1] tracking-tight text-ink mt-3 px-5 sm:px-6">
                  <Link
                    to={`/advanced/${other.category}/${other.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-oxide transition-colors"
                  >
                    {other.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="max-w-[44ch] text-[0.82rem] sm:text-[0.88rem] leading-relaxed text-graphite line-clamp-2 mt-2.5 px-5 sm:px-6">
                  {other.description}
                </p>

                {/* DNA Strip & Dependencies */}
                <div className="mt-auto px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <DnaStrip
                    dna={{
                      genre: (other.fingerprint.visualFamily as any) || "minimal",
                      macrostructure: (other.fingerprint.responsiveProfile as any) || "stack",
                      density: "compact",
                      shapeLanguage: "rounded",
                      motionLanguage: (other.fingerprint.motionProfile as any) || "mechanical",
                      typographyStyle: "grotesk",
                    }}
                  />
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/10 pt-3">
                    <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite truncate">
                      {other.dependencies.length === 0
                        ? "zero dependencies"
                        : other.dependencies.length === 1
                        ? other.dependencies[0]
                        : `${other.dependencies.length} deps`}
                    </p>
                    <span className="flex items-center gap-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite transition-colors duration-fast group-hover:text-oxide shrink-0">
                      Open
                      <ArrowUpRight aria-hidden className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
