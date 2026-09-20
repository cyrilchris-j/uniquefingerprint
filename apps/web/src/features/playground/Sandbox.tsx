import { SandpackCodeEditor, SandpackProvider } from "@codesandbox/sandpack-react";
import { Code2, RotateCcw } from "lucide-react";
import * as React from "react";

import type { BuiltRegistryItem } from "@openui/types";
import { EmptyState, Skeleton } from "@openui/ui";

import { useTheme } from "../../hooks/use-theme.js";
import { getCatalogueVisualPreview } from "../../visual-engine/catalogue-previews.js";
import { getAdvancedItemBySlug } from "../../advanced/catalogue-data.js";
import { AdvancedPreview } from "../../advanced/renderers/AdvancedPreview.js";
import { BlobPreview } from "./BlobPreview.js";
import { buildSandboxFiles } from "./files.js";

export interface SandboxProps {
  item: BuiltRegistryItem;
  view?: "preview" | "code" | "split";
  files?: Record<string, string>;
  className?: string;
}

export function Sandbox({ item, view = "split", files: provided, className }: SandboxProps): React.JSX.Element {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const [refreshKey, setRefreshKey] = React.useState(0);

  const computed = React.useMemo(() => buildSandboxFiles(item), [item]);
  const files = provided ?? computed;

  const advItem = React.useMemo(() => getAdvancedItemBySlug(item.name), [item.name]);
  const bespoke = React.useMemo(
    () => getCatalogueVisualPreview(item.name, item.category),
    [item.name, item.category],
  );

  if (!files["/App.tsx"] && !advItem && !bespoke) {
    return (
      <EmptyState
        eyebrow="No demo"
        title="This resource ships no runnable demo."
        description="A preview needs an entry file. The source is still available in the Code tab, and can be installed with the CLI."
        className={className}
      />
    );
  }

  // Sandpack code editor files (with hidden HTML/CSS overrides)
  const sandpackFiles = {
    ...files,
    "/public/index.html": { code: getSandboxHtml(isDark), hidden: true },
    "/styles.css": { code: SANDBOX_CSS, hidden: true },
  };

  const previewHeight = view === "split" ? "22rem" : "32rem";
  const editorHeight = view === "split" ? "24rem" : "34rem";

  return (
    <div className={className}>
      <div className="rounded-xl border border-line/30 dark:border-line/20 overflow-hidden shadow-xs bg-paper">
        {/* Sleek Window Chrome Toolbar */}
        <div className="flex h-10 items-center justify-between border-b border-line/25 bg-surface/50 px-3.5 sm:px-4">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/40" />
          </div>

          {/* Center component address pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-paper border border-line/25 font-mono text-[11px] text-graphite shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            <span className="text-ink font-medium tracking-tight">{item.name}</span>
            <span className="text-graphite/50 hidden sm:inline">· preview</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              title="Reset sandbox preview"
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-graphite hover:text-ink transition-colors rounded border border-line/20 hover:bg-surface/70"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Visual Preview / BlobPreview Canvas Stage */}
        {view !== "code" ? (
          <div
            className="relative overflow-hidden bg-[#f8f6f1] dark:bg-[#0c0c0b] flex items-center justify-center p-4 sm:p-8"
            style={{
              minHeight: previewHeight,
              backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {advItem ? (
              <div
                key={refreshKey}
                className="w-full h-full min-h-[22rem] sm:min-h-[28rem] flex items-center justify-center p-2 sm:p-4"
              >
                <div className="w-full max-w-4xl min-h-[20rem] sm:min-h-[26rem] rounded-xl overflow-hidden border border-line/25 bg-paper shadow-md flex items-center justify-center relative">
                  <AdvancedPreview item={advItem} interactive className="w-full h-full min-h-[20rem] sm:min-h-[26rem]" />
                </div>
              </div>
            ) : bespoke ? (
              <div
                key={refreshKey}
                className="w-full max-w-xl min-h-[16rem] sm:min-h-[20rem] p-6 sm:p-10 rounded-2xl bg-paper/95 border border-line/35 shadow-lg flex items-center justify-center relative backdrop-blur-xs mx-auto"
              >
                <div className="w-full flex items-center justify-center">
                  {bespoke}
                </div>
              </div>
            ) : (
              <BlobPreview key={refreshKey} files={files} height={previewHeight} scrollable />
            )}
          </div>
        ) : null}

        {/* Live Code Editor Bar */}
        {view === "split" ? (
          <div className="flex items-center justify-between border-t border-line/25 bg-surface/50 px-3.5 sm:px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-graphite">
            <div className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-graphite" />
              <span>Live Editable Source</span>
            </div>
            <span>TypeScript · Tailwind CSS</span>
          </div>
        ) : null}

        {/* Code editor */}
        {view !== "preview" ? (
          <div className={view === "code" ? "" : "border-t border-line/25"}>
            <SandpackProvider
              template="react-ts"
              theme={isDark ? sandpackDarkTheme : sandpackLightTheme}
              files={sandpackFiles}
              customSetup={{
                dependencies: {
                  clsx: "latest",
                  "tailwind-merge": "latest",
                  "lucide-react": "latest",
                  "class-variance-authority": "latest",
                  motion: "latest",
                },
              }}
              options={{ autorun: false }}
            >
              <SandpackCodeEditor
                showLineNumbers
                showTabs
                style={{ height: editorHeight }}
              />
            </SandpackProvider>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SandboxSkeleton(): React.JSX.Element {
  return (
    <div className="rounded-xl border border-line/30 bg-paper p-6 shadow-xs">
      <Skeleton lines={6} />
      <p className="eyebrow mt-6">Loading the isolated sandbox…</p>
    </div>
  );
}

const sandpackDarkTheme = {
  colors: {
    surface1: "#0e0e0d",
    surface2: "#181817",
    surface3: "#242423",
    clickable: "#a5a19a",
    base: "#f5f2ec",
    disabled: "#55534f",
    hover: "#f5f2ec",
    accent: "#e2624a",
    error: "#e2624a",
    errorSurface: "#2a1512",
  },
  syntax: {
    plain: "#f5f2ec",
    comment: { color: "#7a7772", fontStyle: "italic" as const },
    keyword: "#e2624a",
    tag: "#85a78e",
    punctuation: "#a5a19a",
    definition: "#9db4d0",
    property: "#e0c98a",
    static: "#e0c98a",
    string: "#85a78e",
  },
  font: {
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    size: "13px",
    lineHeight: "1.6",
  },
} as const;

const sandpackLightTheme = {
  colors: {
    surface1: "#ffffff",
    surface2: "#f8f6f2",
    surface3: "#ebe7df",
    clickable: "#5c5852",
    base: "#1a1918",
    disabled: "#a5a19a",
    hover: "#1a1918",
    accent: "#c84b31",
    error: "#c84b31",
    errorSurface: "#fdeee9",
  },
  syntax: {
    plain: "#1a1918",
    comment: { color: "#8c877d", fontStyle: "italic" as const },
    keyword: "#c84b31",
    tag: "#2d6a4f",
    punctuation: "#6b665c",
    definition: "#1d4ed8",
    property: "#854d0e",
    static: "#854d0e",
    string: "#2d6a4f",
  },
  font: {
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    size: "13px",
    lineHeight: "1.6",
  },
} as const;const SANDBOX_CSS = `*, *::before, *::after { box-sizing: border-box; }

:root {
  /* Colour */
  --paper:    42 33% 96%;
  --ink:      60 4%  5%;
  --graphite: 40 4%  33%;
  --line:     60 4%  5%;
  --oxide:    13 76% 37%;
  --moss:     137 22% 24%;
  --azure:    214 45% 34%;
  --line-alpha: 0.20;

  /* Typography */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* Modular scale */
  --step--1: clamp(0.8rem,  0.78rem + 0.10vw, 0.85rem);
  --step-0:  clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem);
  --step-1:  clamp(1.15rem, 1.10rem + 0.25vw, 1.30rem);
  --step-2:  clamp(1.40rem, 1.30rem + 0.50vw, 1.70rem);
  --step-3:  clamp(1.75rem, 1.55rem + 1.00vw, 2.35rem);
  --step-4:  clamp(2.20rem, 1.80rem + 2.00vw, 3.40rem);
  --step-5:  clamp(2.80rem, 2.00rem + 4.00vw, 5.20rem);

  /* Shape */
  --radius-sm:   0px;
  --radius-md:   2px;
  --radius-lg:   3px;
  --radius-pill: 999px;

  /* Motion */
  --motion-fast:   140ms;
  --motion-normal: 280ms;
  --motion-slow:   520ms;
  --motion-ease:   cubic-bezier(0.2, 0, 0, 1);

  /* Composition */
  --measure:    68ch;
  --shell-max:  1440px;
  --gutter:     clamp(1rem, 4vw, 4rem);
}

.dark {
  --paper:    60 5%  5%;
  --ink:      40 20% 93%;
  --graphite: 40 5%  64%;
  --line:     40 20% 93%;
  --oxide:    13 72% 58%;
  --moss:     137 20% 58%;
  --azure:    214 55% 68%;
  --line-alpha: 0.22;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--step-0);
  line-height: 1.6;
  background-color: hsl(var(--paper));
  color: hsl(var(--ink));
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 2px solid hsl(var(--oxide));
  outline-offset: 2px;
}
`;

/**
 * The full HTML shell for the Sandpack preview iframe with dynamic theme support.
 */
function getSandboxHtml(isDark: boolean): string {
  return `<!DOCTYPE html>
<html lang="en" class="${isDark ? "dark" : ""}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>

  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />

  <style>
${SANDBOX_CSS}
  </style>

  <script>
    window.tailwind = {
      darkMode: "class",
      config: {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              paper:    "hsl(var(--paper)   / <alpha-value>)",
              ink:      "hsl(var(--ink)     / <alpha-value>)",
              graphite: "hsl(var(--graphite)/ <alpha-value>)",
              line:     "hsl(var(--line)    / <alpha-value>)",
              oxide:    "hsl(var(--oxide)   / <alpha-value>)",
              moss:     "hsl(var(--moss)    / <alpha-value>)",
              azure:    "hsl(var(--azure)   / <alpha-value>)",
            },
            fontFamily: {
              display: ["Instrument Serif", "Georgia", "serif"],
              sans:    ["Inter", "system-ui", "sans-serif"],
              mono:    ["JetBrains Mono", "ui-monospace", "monospace"],
            },
            fontSize: {
              "step--1": "var(--step--1)",
              "step-0":  "var(--step-0)",
              "step-1":  "var(--step-1)",
              "step-2":  "var(--step-2)",
              "step-3":  "var(--step-3)",
              "step-4":  "var(--step-4)",
              "step-5":  "var(--step-5)",
            },
            borderRadius: {
              sm:   "var(--radius-sm)",
              md:   "var(--radius-md)",
              lg:   "var(--radius-lg)",
              pill: "var(--radius-pill)",
            },
            transitionDuration: {
              fast:   "var(--motion-fast)",
              normal: "var(--motion-normal)",
              slow:   "var(--motion-slow)",
            },
            maxWidth: {
              measure: "var(--measure)",
              shell:   "var(--shell-max)",
            },
          },
        },
      }
    };
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;
}
