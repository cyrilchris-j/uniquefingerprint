import * as React from "react";

import { cn } from "@openui/ui";

/**
 * Section headers.
 *
 * The site's rhythm comes from these rather than from cards: a tracked monospace
 * index, a display-serif statement, and a hairline. `SectionHeader` is
 * asymmetric on wide screens — the title column is deliberately narrower than
 * the remaining space, and the supporting copy sits to the side rather than
 * centred beneath. Centred hero text is the single most template-like pattern
 * on the web, and this product exists to demonstrate the alternative.
 */
export interface SectionHeaderProps {
  /** Short index label, e.g. "02 — Registry". */
  eyebrow?: string;
  title: React.ReactNode;
  /** Supporting copy, placed in the right-hand column on wide screens. */
  description?: React.ReactNode;
  /** Renders as an `<h1>` on a page's primary section. */
  as?: "h1" | "h2";
  /** Actions (a link, a filter toggle) pinned to the end of the rule. */
  actions?: React.ReactNode;
  className?: string;
  /** Toggle whether the top border hairline is shown. Defaults to false for h1 and true for h2. */
  showBorder?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  actions,
  className,
  showBorder = Heading !== "h1",
}: SectionHeaderProps): React.JSX.Element {
  return (
    <header className={cn(showBorder ? "border-t border-line pt-4 sm:pt-5" : "", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2.5 sm:gap-3">
        {eyebrow ? <p className="eyebrow text-[10px] sm:text-[11px]">{eyebrow}</p> : <span />}
        {actions ? <div className="flex items-center gap-2 sm:gap-3">{actions}</div> : null}
      </div>

      <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-12">
        <Heading className="optically-align text-2xl sm:text-3xl lg:text-step-4 max-w-[24ch] text-balance leading-[1.08]">
          {title}
        </Heading>
        {description ? (
          <div className="prose-measure text-[0.88rem] sm:text-[0.95rem] leading-relaxed text-graphite lg:pt-2">
            {description}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/**
 * A two-column content section: a narrow rail for a label and index, and the
 * content itself. Used on docs and long-form pages where a section needs a
 * persistent anchor without a sticky table of contents.
 */
export function Section({
  label,
  children,
  className,
  id,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}): React.JSX.Element {
  return (
    <section id={id} className={cn("border-t border-line pt-8", className)}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-12">
        {label ? <p className="eyebrow lg:sticky lg:top-24 lg:self-start">{label}</p> : <span />}
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/**
 * The metadata rail on a resource page: a stack of label/value pairs with
 * hairlines between. Numerals and identifiers are monospace so they align
 * column-wise across rows.
 */
export function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="eyebrow w-[8rem] shrink-0">{label}</dt>
      <dd className="text-[0.85rem] text-ink">{children}</dd>
    </div>
  );
}
