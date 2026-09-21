import * as React from "react";
import { Outlet } from "react-router";

import { FloatingScrollControls } from "../components/FloatingScrollControls.js";
import { Footer } from "../components/Footer.js";
import { Masthead } from "../components/Masthead.js";
import { PWAProvider } from "../components/PWAInstall.js";
import { SmartScrollRestoration } from "../components/SmartScrollRestoration.js";

/**
 * The root layout.
 *
 * Three accessibility details that are cheap here and expensive to retrofit:
 *
 *  - a **skip link** as the first focusable element, so a keyboard user does not
 *    traverse the entire index on every page,
 *  - `SmartScrollRestoration`, so a browser Back or Return returns to the exact
 *    card / position the user was rather than to the top of the previous page,
 *  - a single `<main>` landmark with `tabIndex={-1}`, which is what the skip link
 *    targets and what makes route changes announceable.
 *  - `FloatingScrollControls`, unobtrusive vertical navigation on the right side.
 *
 * The page background is set on `<body>` rather than here, so the area outside
 * the shell is the same colour as the content — otherwise overscroll on macOS
 * flashes white at a dark-mode user.
 */
export function RootLayout(): React.JSX.Element {
  return (
    <PWAProvider>
      <div className="min-h-[100dvh] flex flex-col pt-14 sm:pt-16">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-ink"
        >
          Skip to content
        </a>

        <Masthead />

        <main id="main" tabIndex={-1} className="flex-1 min-w-0 max-w-full focus-visible:outline-none">
          <Outlet />
        </main>

        <Footer />
        <FloatingScrollControls />
        <SmartScrollRestoration />
      </div>
    </PWAProvider>
  );
}
