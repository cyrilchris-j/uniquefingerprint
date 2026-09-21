import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileCode,
  Terminal,
} from "lucide-react";
import * as React from "react";

import { cn } from "@openui/ui";

/**
 * Modern syntax token highlighter for TypeScript / JSX / CSS / JSON / Bash.
 * Zero-dependency, lightweight, and executes in linear time per line.
 */
function highlightLine(line: string): React.ReactNode {
  if (!line || line.trim().length === 0) return " ";

  const trimmed = line.trim();
  // Multi-line JSDoc or block comments
  if (
    trimmed.startsWith("/**") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("/*") ||
    trimmed.endsWith("*/")
  ) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }

  // Tokens: comments, strings, keywords, react hooks, booleans/null, numbers, JSX tags
  const regex =
    /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|export|from|default|function|const|let|var|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|void|delete|in|of|as|async|await|class|extends|interface|type|implements|public|private|protected|static|readonly)\b)|(\b(?:useState|useEffect|useRef|useMemo|useCallback|useContext|useId|useReducer)\b)|(\b(?:true|false|null|undefined)\b)|(\b\d+(?:\.\d+)?\b)|(<\/?(?:[A-Za-z][A-Za-z0-9_.-]*)|\/?>)/g;

  const tokens: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }
    const [full, comment, str, keyword, hook, boolNull, num, jsxTag] = match;
    const key = `${match.index}-${full}`;

    if (comment) {
      tokens.push(
        <span key={key} className="text-zinc-500 italic">
          {comment}
        </span>,
      );
    } else if (str) {
      tokens.push(
        <span key={key} className="text-emerald-300">
          {str}
        </span>,
      );
    } else if (keyword) {
      tokens.push(
        <span key={key} className="text-purple-400 font-medium">
          {keyword}
        </span>,
      );
    } else if (hook) {
      tokens.push(
        <span key={key} className="text-sky-400 font-medium">
          {hook}
        </span>,
      );
    } else if (boolNull) {
      tokens.push(
        <span key={key} className="text-amber-300">
          {boolNull}
        </span>,
      );
    } else if (num) {
      tokens.push(
        <span key={key} className="text-orange-300">
          {num}
        </span>,
      );
    } else if (jsxTag) {
      tokens.push(
        <span key={key} className="text-cyan-400 font-medium">
          {jsxTag}
        </span>,
      );
    } else {
      tokens.push(full);
    }

    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }

  return tokens.length > 0 ? tokens : line;
}

/**
 * Modern rounded copy button with animated check state and live announcement.
 */
function CopyCodeButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onCopy = React.useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silent
    }
  }, [value]);

  return (
    <>
      <button
        type="button"
        onClick={() => void onCopy()}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer active:scale-95 shrink-0",
          copied
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium"
            : "text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/5",
        )}
        title={label}
        aria-label={label}
      >
        {copied ? (
          <>
            <Check aria-hidden className="h-3.5 w-3.5 text-emerald-400" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy aria-hidden className="h-3.5 w-3.5 text-zinc-400" />
            <span>Copy</span>
          </>
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
}

export interface CodeBlockProps {
  code: string;
  /** Shown above the block — usually the file path or the command name. */
  caption?: string;
  language?: string;
  /** Preserved for API compatibility. */
  tone?: "ink" | "light";
  showLineNumbers?: boolean;
  /** Collapse to this many lines initially. Omit to show the whole block. */
  maxLines?: number;
  className?: string;
}

/**
 * Modern Developer CodeBlock Container.
 * Features:
 *  - macOS traffic-light window dots & file pill
 *  - High-contrast dark editor background (#0e0e12)
 *  - Clean monospace typography with line numbers
 *  - Lightweight syntax highlighting
 *  - Smooth gradient collapsible expander
 *  - Interactive one-click copy button
 */
export function CodeBlock({
  code,
  caption,
  language,
  showLineNumbers = false,
  maxLines,
  className,
}: CodeBlockProps): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(false);
  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);
  const collapsible = maxLines !== undefined && lines.length > maxLines;
  const visible = collapsible && !expanded ? lines.slice(0, maxLines) : lines;

  return (
    <figure
      className={cn(
        "rounded-xl border border-line/30 dark:border-white/10 bg-[#0e0e12] text-[#f4f4f5] shadow-lg shadow-black/20 overflow-hidden min-w-0 max-w-full my-4",
        className,
      )}
    >
      {/* Title Bar / Header */}
      <figcaption className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3 min-w-0">
          {/* macOS window traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/85 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/85 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/85 inline-block" />
          </div>

          {/* Caption & Language */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <FileCode className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span className="font-mono text-xs text-zinc-300 font-medium truncate">
              {caption ?? language ?? "source"}
            </span>
            {language && (
              <span className="shrink-0 font-mono text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-400 border border-white/5">
                {language}
              </span>
            )}
          </div>
        </div>

        <CopyCodeButton value={code} label={`Copy ${caption ?? "code"}`} />
      </figcaption>

      {/* Code plate */}
      <div className="relative max-w-full overflow-hidden">
        <div className="max-w-full overflow-x-auto p-4 sm:p-5 font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-zinc-200">
          <pre className="m-0 min-w-0 font-mono">
            <code>
              {visible.map((line, index) => (
                <div
                  key={index}
                  className="flex items-baseline min-w-0 hover:bg-white/[0.03] rounded px-1 -mx-1 transition-colors"
                >
                  {showLineNumbers ? (
                    <span
                      aria-hidden="true"
                      className="select-none text-right text-zinc-600 font-mono text-[12px] pr-4 pl-1 w-9 sm:w-10 shrink-0 border-r border-white/[0.06]"
                    >
                      {index + 1}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "break-words sm:break-normal whitespace-pre min-w-0",
                      showLineNumbers && "pl-4",
                    )}
                  >
                    {highlightLine(line)}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Collapsible gradient overlay and toggle button */}
        {collapsible && !expanded && (
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/90 to-transparent flex items-end justify-center pb-4 pointer-events-auto">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#181a24] hover:bg-[#222533] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white shadow-xl backdrop-blur transition-all active:scale-95 cursor-pointer"
            >
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              <span>Show all {lines.length} lines</span>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Collapse Bar */}
      {collapsible && expanded && (
        <div className="border-t border-white/10 px-4 py-2 bg-white/[0.02] flex items-center justify-center">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-expanded={true}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronUp className="h-3.5 w-3.5" />
            <span>Show less</span>
          </button>
        </div>
      )}
    </figure>
  );
}

/**
 * An install command presented as a modern macOS terminal pill/box.
 */
export function CommandLine({ command }: { command: string }): React.JSX.Element {
  const formatted = command.replace(/\bopenui\b/g, "uniquefingerprint");
  return (
    <div className="flex items-center justify-between rounded-xl border border-line/30 dark:border-white/10 bg-[#0e0e12] text-[#f4f4f5] shadow-sm max-w-full min-w-0 px-3.5 py-2.5 gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-x-auto no-scrollbar font-mono text-[13px] sm:text-[14px]">
        <Terminal className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
        <span className="text-emerald-400 select-none font-bold shrink-0">$</span>
        <code className="text-zinc-200 whitespace-nowrap">{formatted}</code>
      </div>
      <CopyCodeButton value={formatted} label="Copy command" />
    </div>
  );
}
