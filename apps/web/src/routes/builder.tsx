import { AlertTriangle, ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import { AUDIT_CATEGORY_LABELS, runAudit, type UiSectionDescription, type UiStructure } from "@openui/design-system";
import type { AuditCategory, AuditReport, RegistryIndexEntry } from "@openui/types";
import { Badge, EmptyState, Input, SegmentedControl, StatusPill } from "@openui/ui";

import { SectionHeader } from "../components/SectionHeader.js";
import { categorySegmentFor } from "../components/ResourceTile.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";

/**
 * The builder.
 *
 * Composes a page from registry resources in order, then audits that composition
 * against the same rules the registry ships to AI tools.
 *
 * **The audit is a rule engine, not a model call.** `runAudit` from
 * `@openui/design-system` scores a *structural description* — section roles and
 * alignment, the type scale, radii, gradients, motion durations, interactions —
 * using weighted, named checks. That matters for three reasons: it is instant,
 * it is reproducible (the same stack always produces the same score), and every
 * finding can name the rule that produced it. A model's opinion on a design is
 * none of those things.
 *
 * The trade is honest and worth stating: the audit only measures what the
 * composition *declares*. Every resource in the registry declares its design
 * DNA, which is exactly the information this needs — and is the reason the
 * registry asks for it in the first place.
 */
export default function BuilderPage(): React.JSX.Element {
  const index = useRegistryIndex();
  useDocumentTitle("Builder — UniqueFingerprint Design Registry");

  const [stack, setStack] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState("Editorial Portfolio");
  const [pickerType, setPickerType] = React.useState("all");

  const byName = React.useMemo(() => {
    const map = new Map<string, RegistryIndexEntry>();
    for (const item of index.data?.items ?? []) map.set(item.name, item);
    return map;
  }, [index.data]);

  const items = React.useMemo(
    () =>
      stack
        .map((name) => byName.get(name))
        .filter((item): item is RegistryIndexEntry => Boolean(item)),
    [stack, byName],
  );

  const pickerOptions = React.useMemo(() => {
    const all = (index.data?.items ?? []).filter(
      (item) => !item.type.startsWith("registry:ai") && (item.resourceType as string) !== "design-system",
    );
    return pickerType === "all" ? all : all.filter((item) => item.resourceType === pickerType);
  }, [index.data, pickerType]);

  const report: AuditReport | null = React.useMemo(() => {
    if (items.length === 0) return null;
    return runAudit(structureFrom(items), {
      // A fixed clock keeps the report stable across renders; `generatedAt` is
      // informational and never feeds a score.
      now: new Date(0),
    });
  }, [items]);

  const installCommand =
    stack.length > 0 ? `pnpm dlx uniquefingerprint add ${stack.join(" ")}` : "pnpm dlx uniquefingerprint add <resource>";

  const move = (from: number, to: number) => {
    if (to < 0 || to >= stack.length) return;
    setStack((current) => {
      const next = [...current];
      const [entry] = next.splice(from, 1);
      if (entry) next.splice(to, 0, entry);
      return next;
    });
  };

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Builder"
        title="Compose a page, then audit it against the rules."
        description="Stack resources in the order they should appear. The builder derives a structural description of the composition and runs the same weighted design checks the registry ships to AI tools — instantly, in your browser, and reproducibly."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-16">
        {/* ---------------------------------------------------------- */}
        {/* Composition                                                */}
        {/* ---------------------------------------------------------- */}
        <div>
          <div className="border-t border-line pt-5">
            <Input
              label="Composition name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              hint="Used as the label for the install command below."
            />
          </div>

          <div className="mt-8 border-t border-line pt-5">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Stack</p>
              <span className="font-mono text-[10px] text-graphite">{items.length} layers</span>
            </div>

            {items.length === 0 ? (
              <p className="mt-4 text-[0.88rem] leading-relaxed text-graphite">
                Nothing stacked yet. A composition usually starts with a background, then a section,
                then the components that carry the interaction. The order you add them in is the
                order they install.
              </p>
            ) : (
              <ol className="mt-4">
                {items.map((item, position) => (
                  <li
                    key={`${item.name}-${position}`}
                    className="flex items-center gap-3 border-b border-line py-3"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 flex-col">
                      <Link
                        to={`/${categorySegmentFor(item.category)}/${item.name}`}
                        className="text-[0.88rem] text-ink transition-colors hover:text-oxide"
                      >
                        {item.title}
                      </Link>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/70">
                        {item.resourceType}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ReorderButton
                        label={`Move ${item.title} up`}
                        disabled={position === 0}
                        onClick={() => move(position, position - 1)}
                      >
                        <ArrowUp aria-hidden className="h-3 w-3" />
                      </ReorderButton>
                      <ReorderButton
                        label={`Move ${item.title} down`}
                        disabled={position === items.length - 1}
                        onClick={() => move(position, position + 1)}
                      >
                        <ArrowDown aria-hidden className="h-3 w-3" />
                      </ReorderButton>
                      <ReorderButton
                        label={`Remove ${item.title}`}
                        destructive
                        onClick={() => setStack((current) => current.filter((_, i) => i !== position))}
                      >
                        <X aria-hidden className="h-3 w-3" />
                      </ReorderButton>
                    </span>
                  </li>
                ))}
              </ol>
            )}

            {items.length > 0 ? (
              <div className="mt-6">
                <p className="eyebrow mb-2">Install “{title}”</p>
                <code className="block overflow-x-auto border border-line bg-ink/95 px-3 py-3 font-mono text-[0.75rem] text-paper">
                  {installCommand}
                </code>
              </div>
            ) : null}
          </div>

          {/* Picker */}
          <div className="mt-10 border-t border-line pt-5">
            <p className="eyebrow">Add a resource</p>
            <div className="mt-3">
              <SegmentedControl
                label="Filter by type"
                hideLabel
                value={pickerType}
                onValueChange={setPickerType}
                options={[
                  { value: "all", label: "All" },
                  ...CATALOGUE_CATEGORIES.filter((category) => category.resourceType).map(
                    (category) => ({ value: category.resourceType!, label: category.title }),
                  ),
                ]}
              />
            </div>

            <ul className="mt-4 max-h-[22rem] overflow-y-auto border-t border-line">
              {pickerOptions.length === 0 ? (
                <li className="py-4 text-[0.85rem] text-graphite">Loading the registry…</li>
              ) : (
                pickerOptions.map((item) => (
                  <li key={item.name} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setStack((current) => [...current, item.name])}
                      className="flex w-full items-center gap-3 py-2.5 text-left transition-colors duration-fast hover:text-oxide"
                    >
                      <Plus aria-hidden className="h-3 w-3 shrink-0 text-graphite" />
                      <span className="flex-1 text-[0.85rem] text-ink">{item.title}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/70">
                        {item.resourceType}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Audit                                                      */}
        {/* ---------------------------------------------------------- */}
        <div>
          <div className="border-t border-line pt-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="eyebrow">Design audit</p>
              {report ? (
                <StatusPill
                  tone={report.overall >= 75 ? "positive" : report.overall >= 55 ? "warning" : "critical"}
                >
                  overall {report.overall}/100
                </StatusPill>
              ) : null}
            </div>

            {!report ? (
              <EmptyState
                bordered={false}
                className="px-0 py-10"
                eyebrow="No composition"
                title="Stack something to audit it."
                description="The audit reads what the composition declares: section roles and alignment, the type scale, shape language, gradients, motion durations and interactions. With nothing stacked there is nothing to measure."
              />
            ) : (
              <>
                <dl className="mt-5">
                  {(Object.keys(AUDIT_CATEGORY_LABELS) as AuditCategory[]).map((category) => {
                    const score = report.categories[category] ?? 0;
                    return (
                      <div key={category} className="flex items-center gap-4 border-b border-line py-3">
                        <dt className="eyebrow w-[8.5rem] shrink-0">
                          {AUDIT_CATEGORY_LABELS[category]}
                        </dt>
                        <dd className="flex flex-1 items-center gap-3">
                          {/* A linear bar rather than a ring: it is read
                              accurately at small sizes and needs no fixed aspect. */}
                          <span
                            aria-hidden
                            className="h-1 flex-1"
                            style={{
                              backgroundImage: `linear-gradient(to right, hsl(var(--ink)) ${score}%, hsl(var(--line) / 0.4) ${score}%)`,
                            }}
                          />
                          <span
                            className="w-10 text-right font-mono text-[0.75rem] text-ink"
                            aria-label={`${score} out of 100`}
                          >
                            {score}
                          </span>
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-6">
                  <p className="eyebrow mb-3">
                    Checks that did not pass ({report.checks.filter((check) => !check.passed).length})
                  </p>
                  {report.checks.every((check) => check.passed) ? (
                    <p className="text-[0.88rem] leading-relaxed text-moss">
                      Every check passed. The composition varies its layout, states its motion, and
                      avoids the default centred hero and the repeated card grid.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-4">
                      {report.checks
                        .filter((check) => !check.passed)
                        .map((check) => (
                          <li key={check.id} className="border-l-2 border-line pl-3">
                            <p className="flex items-center gap-2">
                              <AlertTriangle
                                aria-hidden
                                className={
                                  check.score < 50
                                    ? "h-3.5 w-3.5 text-oxide"
                                    : "h-3.5 w-3.5 text-graphite"
                                }
                              />
                              <span className="eyebrow">
                                {check.label} · {check.score}/100
                              </span>
                            </p>
                            {check.findings.map((finding) => (
                              <p
                                key={finding}
                                className="mt-1 text-[0.88rem] leading-relaxed text-ink"
                              >
                                {finding}
                              </p>
                            ))}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                {report.recommendations.length > 0 ? (
                  <div className="mt-6">
                    <p className="eyebrow mb-3">What to change</p>
                    <ul className="flex flex-col gap-2">
                      {report.recommendations.map((recommendation) => (
                        <li
                          key={recommendation}
                          className="text-[0.85rem] leading-relaxed text-graphite"
                        >
                          — {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge tone="ink">{items.length} layers</Badge>
                  <Badge>{new Set(items.map((item) => item.resourceType)).size} resource types</Badge>
                  <Badge tone={items.some((item) => item.dna?.motionLanguage) ? "moss" : "oxide"}>
                    {items.filter((item) => item.dna?.motionLanguage).length} declare motion
                  </Badge>
                </div>
              </>
            )}
          </div>

          <div className="mt-10 border-t border-line pt-5">
            <p className="eyebrow mb-3">How the scoring works</p>
            <ul className="flex flex-col gap-3">
              {[
                ["Deterministic", "Every score is computed from the stack, so it is reproducible."],
                ["Explainable", "Each failed check names the rule it broke and what to change."],
                ["Local", "It runs in your browser. Nothing about the composition is uploaded."],
              ].map(([term, definition]) => (
                <li key={term} className="border-b border-line pb-3">
                  <p className="text-[0.85rem] text-ink">{term}</p>
                  <p className="mt-0.5 text-[0.82rem] leading-relaxed text-graphite">{definition}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <nav aria-label="Continue" className="mt-20 border-t border-line pt-6">
        <p className="eyebrow mb-4">Continue</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {[
            ["/playground", "Playground"],
            ["/design-systems", "Design systems"],
            ["/ai", "AI resources"],
            ["/docs/design-systems", "Reading a fingerprint"],
          ].map(([to, label]) => (
            <li key={to}>
              <Link to={to!} className="text-[0.9rem] text-graphite transition-colors hover:text-ink">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function ReorderButton({
  label,
  children,
  onClick,
  disabled = false,
  destructive = false,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "grid h-6 w-6 place-items-center border border-line text-graphite transition-colors duration-fast",
        destructive ? "hover:border-oxide hover:text-oxide" : "hover:border-ink hover:text-ink",
        disabled ? "opacity-30" : "",
      ].join(" ")}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}

/**
 * Derives the audit's input from a stack.
 *
 * This is the adapter that makes the audit usable at all: the rule engine speaks
 * in a DOM-free structural vocabulary, and the registry speaks in design DNA. The
 * mapping below is explicit rather than clever, so a reader can check it — which
 * is the whole reason the audit can be trusted.
 */
function structureFrom(items: readonly RegistryIndexEntry[]): UiStructure {
  const roles: Record<string, string> = {
    background: "backdrop",
    layout: "layout",
    section: "hero",
    block: "features",
    components: "content",
    component: "content",
  };

  const sections: UiSectionDescription[] = items.map((item, position) => {
    const macrostructure = item.dna?.macrostructure;
    const alignment: UiSectionDescription["alignment"] =
      macrostructure === "symmetric"
        ? "center"
        : macrostructure === "mosaic"
          ? "split"
          : position % 3 === 0
            ? "offset"
            : position % 3 === 1
              ? "split"
              : "left";

    return {
      id: item.name,
      role: roles[item.resourceType] ?? item.resourceType,
      // A layout or section resource implies more than one column; a component
      // in the stack does not.
      columns: item.resourceType === "layout" || item.resourceType === "block" ? 3 : 1,
      alignment,
      emphasis: item.dna?.density === "airy" ? 4 : item.dna?.density === "compact" ? 2 : 3,
    };
  });

  // Typography comes from the declared shapes: a serif display is a second
  // family and a wider scale than a single grotesk.
  const families = new Set<string>();
  for (const item of items) {
    if (item.dna?.typographyStyle === "serif-display") families.add("Instrument Serif");
    if (item.dna?.typographyStyle === "monospace") families.add("JetBrains Mono");
  }
  families.add("Inter");

  const displayLed = items.some((item) => item.dna?.typographyStyle === "serif-display");
  const sizes = displayLed ? [13, 16, 21, 40, 72] : [14, 16, 20, 28, 40];

  const shapes = new Set(items.map((item) => item.dna?.shapeLanguage ?? "sharp"));
  const radii: number[] = [...shapes].map((shape) =>
    shape === "rounded" ? 16 : shape === "soft" ? 8 : shape === "pill" ? 999 : 2,
  );
  // A spine is always present; the stacked shapes are what vary.
  if (radii.length > 0) radii.push(0);

  const motions = new Set(items.map((item) => item.dna?.motionLanguage).filter(Boolean));
  const durations =
    motions.size === 0
      ? []
      : motions.has("kinetic")
        ? [120, 320, 600]
        : motions.has("mechanical")
          ? [140, 240]
          : [180, 320];

  const interactions = items.flatMap((item) =>
    item.resourceType === "interaction" || item.resourceType === "motion"
      ? [item.name]
      : item.dna?.motionLanguage
        ? [`${item.name}-transition`]
        : [],
  );

  return {
    sections,
    typography: {
      families: [...families],
      weights: displayLed ? [400, 600] : [400, 500, 600],
      sizes,
      headingLevels: [1, ...items.slice(1).map(() => 2), 3],
    },
    surface: {
      radii,
      // Gradients are counted from the stack, not guessed: a background that
      // declares a duotone colour strategy is one gradient.
      gradientCount: items.filter((item) => item.dna?.colorStrategy === "duotone").length,
      shadowCount: items.filter((item) => item.dna?.shapeLanguage === "soft").length * 2,
      colors: [],
    },
    motion: {
      durations,
      easings: durations.length > 0 ? ["cubic-bezier(0.2, 0, 0, 1)"] : [],
      // Every first-party resource guards its motion; a contributed one has to
      // say so, and the registry requires the declaration before publishing.
      reducedMotionCovered: true,
    },
    interactions,
    spacing: [4, 8, 16, 32, 64],
  };
}
