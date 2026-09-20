import * as React from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Smart Scroll Restoration.
 *
 * Solves the critical SPA scroll restoration problem when returning from
 * a component detail page back to a catalogue / listing page:
 *
 * 1. Tracks scroll position continuously per pathname in sessionStorage.
 * 2. Remembers the exact item/card that was clicked.
 * 3. On Return (or browser Back / POP navigation), polls until the asynchronous
 *    DOM elements render (which React Router's built-in ScrollRestoration fails to
 *    do because it synchronously clamps scrollY against the initial empty skeleton).
 * 4. Smoothly positions the view directly onto the card the user came from.
 * 5. Highlights the returned card with a brief, subtle focus ring for 1.5s so
 *    the user immediately sees where they left off.
 * 6. On fresh forward PUSH navigation (e.g. clicking a category in the masthead),
 *    smoothly resets to top (0).
 */
export function SmartScrollRestoration(): null {
  const location = useLocation();
  const navigationType = useNavigationType();

  // 1. Keep track of current scroll position for the current route
  React.useEffect(() => {
    let ticking = false;

    const recordPosition = () => {
      if (typeof window === "undefined") return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      try {
        sessionStorage.setItem(`openui_scroll_${location.pathname}`, String(scrollY));
      } catch {
        // Ignore storage quotas / disabled storage
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(recordPosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", recordPosition);

    return () => {
      recordPosition();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", recordPosition);
    };
  }, [location.pathname]);

  // 2. Handle scroll restoration or reset on route changes
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const isReturning = sessionStorage.getItem("openui_returning") === "true";
    const isPop = navigationType === "POP";

    if (isReturning || isPop) {
      // User is returning back to this page
      sessionStorage.removeItem("openui_returning");

      let targetItem: string | null = null;
      let savedY = 0;

      try {
        targetItem =
          sessionStorage.getItem(`openui_target_item_${location.pathname}`) ||
          sessionStorage.getItem("openui_last_clicked_item");
        savedY = parseInt(sessionStorage.getItem(`openui_scroll_${location.pathname}`) || "0", 10);
      } catch {
        // Ignore
      }

      if (!targetItem && (!savedY || savedY <= 0)) {
        return;
      }

      let attempts = 0;
      const maxAttempts = 65; // ~2 seconds max at 30ms interval
      let timerId: number | null = null;

      const tryRestore = () => {
        attempts++;
        let restored = false;

        // Try restoring by exact target item element ID or data attribute
        if (targetItem) {
          const el =
            document.getElementById(`item-${targetItem}`) ||
            document.querySelector(`[data-item-slug="${targetItem}"]`);

          if (el) {
            const rect = el.getBoundingClientRect();
            const headerOffset = 100; // Account for masthead
            const targetTop = rect.top + window.scrollY - headerOffset;
            window.scrollTo({ top: Math.max(0, targetTop), behavior: "instant" });

            // Visual feedback ring on the card
            el.classList.add("ring-2", "ring-ink/40", "dark:ring-white/40", "transition-all", "duration-700");
            window.setTimeout(() => {
              el.classList.remove("ring-2", "ring-ink/40", "dark:ring-white/40");
            }, 1800);

            restored = true;
          }
        }

        // Fallback: try restoring by saved scroll Y height
        if (!restored && savedY > 0) {
          const scrollHeight = document.documentElement.scrollHeight;
          if (scrollHeight >= savedY + 150) {
            window.scrollTo({ top: savedY, behavior: "instant" });
            restored = true;
          }
        }

        if (!restored && attempts < maxAttempts) {
          timerId = window.setTimeout(tryRestore, 30);
        }
      };

      const onContentReady = () => {
        tryRestore();
      };
      window.addEventListener("openui:content_ready", onContentReady);

      // Run immediately and schedule polling if needed
      tryRestore();

      return () => {
        if (timerId !== null) {
          window.clearTimeout(timerId);
        }
        window.removeEventListener("openui:content_ready", onContentReady);
      };
    } else {
      // Fresh navigation (e.g. user clicked a category link in masthead)
      sessionStorage.removeItem("openui_returning");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, navigationType]);

  return null;
}
