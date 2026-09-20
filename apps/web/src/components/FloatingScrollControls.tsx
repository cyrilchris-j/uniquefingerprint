import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * Floating Top & Bottom Scroll Controls.
 *
 * Provides quick vertical navigation buttons on the right edge of the screen:
 * - Top button: Smoothly scrolls to the top of the page.
 * - Bottom button: Smoothly scrolls to the bottom of the page.
 *
 * Designed to be completely unobtrusive:
 * - Placed at fixed right-3/sm:right-6, bottom-6/sm:bottom-8 (z-40).
 * - Only reveals itself when the page has scrollable vertical overflow.
 * - Sleek frosted-glass capsule pill with theme-adaptive styling.
 * - Zero conflict with page layout, headers, modals, or footers.
 */
export function FloatingScrollControls(): React.JSX.Element | null {
  const [canScroll, setCanScroll] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const [atBottom, setAtBottom] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const isScrollable = scrollHeight > clientHeight + 150;
      setCanScroll(isScrollable);
      setAtTop(scrollY < 100);
      setAtBottom(scrollY + clientHeight >= scrollHeight - 100);

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    // Initial measurement
    checkScroll();

    // Re-check periodically in case async content expands the page
    const intervalId = window.setInterval(checkScroll, 800);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!canScroll) {
    return null;
  }

  return (
    <aside
      aria-label="Page scroll navigation"
      className="fixed right-3.5 sm:right-6 bottom-6 sm:bottom-8 z-40 pointer-events-auto select-none transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      <div className="flex flex-col items-center gap-1 p-1 rounded-full bg-paper/85 dark:bg-[#181816]/90 backdrop-blur-md border border-line/40 dark:border-line/30 shadow-md hover:shadow-xl transition-all duration-200">
        {/* Scroll to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top of page"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            atTop
              ? "text-graphite/40 hover:text-ink hover:bg-surface/80 dark:hover:bg-zinc-800/80"
              : "text-ink hover:bg-surface dark:hover:bg-zinc-800 hover:scale-110 active:scale-95"
          }`}
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* Divider hairline */}
        <div className="h-px w-3 bg-line/30 dark:bg-line/20 my-0.5" />

        {/* Scroll to Bottom */}
        <button
          type="button"
          onClick={scrollToBottom}
          title="Scroll to bottom"
          aria-label="Scroll to bottom of page"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            atBottom
              ? "text-graphite/40 hover:text-ink hover:bg-surface/80 dark:hover:bg-zinc-800/80"
              : "text-ink hover:bg-surface dark:hover:bg-zinc-800 hover:scale-110 active:scale-95"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
