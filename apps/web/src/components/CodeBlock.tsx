import * as React from "react";

import { CopyButton, cn } from "@openui/ui";

/**
 * CodeBlock.
 *
 * A `<pre>` with a copy control, not a syntax-highlighted editor. The website
 * shows *source you are about to install*, and the thing that matters there is
 * that the text is exact and easy to copy — highlighting is available in the
 * playground instead, where editing is the point.
 *
 * The block is scrollable horizontally rather than wrapped: wrapped code looks
 * like prose and hides indentation, which is exactly the information a reader is
 * scanning for.
 *
 * `maxLines` collapses long files behind a disclosure, which keeps the install
 * step visible on a page that also ships 400 lines of component source.
 */
export interface CodeBlockProps {
  code: string;
  /** Shown above the block — usually the file path or the command name. */
  caption?: string;
  language?: string;
  /** Renders on the paper background instead of the inverse ink plate. */
  tone?: "ink" | "light";
  showLineNumbers?: boolean;
  /** Collapse to this many lines initially. Omit to show the whole block. */
  maxLines?: number;
  className?: string;
}

export function CodeBlock({
  code,
  caption,
  language,
  tone = "ink",
  showLineNumbers = false,
  maxLines,
  className,
}: CodeBlockProps): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(false);
  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);
  const collapsible = maxLines !== undefined && lines.length > maxLines;
  const visible = collapsible && !expanded ? lines.slice(0, maxLines) : lines;

  return (
    <figure className={cn("border border-line min-w-0 max-w-full", className)}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 min-w-0">
        <span className="flex items-baseline gap-2 truncate min-w-0">
          <span className="eyebrow truncate">{caption ?? language ?? "Source"}</span>
          {language && caption ? (
            <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-graphite/70">
              {language}
            </span>
          ) : null}
        </span>
        <CopyButton value={code} label={`Copy ${caption ?? "code"}`} className="shrink-0" />
      </figcaption>

      <div className={cn("code-plate max-w-full overflow-x-auto", tone === "light" && "code-plate--light")}>
        <pre className="m-0 min-w-0">
          <code>
            {visible.map((line, index) => (
              <span key={index} className="grid grid-cols-[auto_1fr] gap-4 min-w-0">
                {showLineNumbers ? (
                  <span aria-hidden className="select-none text-right opacity-40">
                    {index + 1}
                  </span>
                ) : null}
                <span className="break-words sm:break-normal">{line.length > 0 ? line : " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      {collapsible ? (
        <div className="border-t border-line px-3 py-2">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="eyebrow transition-colors duration-fast hover:text-ink"
          >
            {expanded ? "Show less" : `Show all ${lines.length} lines`}
          </button>
        </div>
      ) : null}
    </figure>
  );
}

/**
 * An install command presented as the primary action of a resource page: the
 * command with a copy control on the same line, so copying is one click and no
 * selection is required.
 */
export function CommandLine({ command }: { command: string }): React.JSX.Element {
  const formatted = command.replace(/\bopenui\b/g, "uniquefingerprint");
  return (
    <div className="flex items-stretch border border-line max-w-full min-w-0">
      <code className="flex-1 min-w-0 overflow-x-auto whitespace-nowrap no-scrollbar bg-ink/95 px-3.5 sm:px-4 py-2.5 sm:py-3 font-mono text-[0.75rem] sm:text-[0.8rem] text-paper">
        {formatted}
      </code>
      <CopyButton value={formatted} label="Copy install command" className="border-y-0 border-r-0 shrink-0" />
    </div>
  );
}
