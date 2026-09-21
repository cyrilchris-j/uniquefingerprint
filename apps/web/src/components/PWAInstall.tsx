import {
  Apple,
  CheckCircle2,
  Download,
  Laptop,
  Share2,
  Smartphone,
  X,
} from "lucide-react";
import * as React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@openui/ui";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAContextType {
  isInstalled: boolean;
  canPromptDirectly: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  triggerInstall: () => Promise<void>;
}

const PWAContext = React.createContext<PWAContextType>({
  isInstalled: false,
  canPromptDirectly: false,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  triggerInstall: async () => {},
});

export function usePWA(): PWAContextType {
  return React.useContext(PWAContext);
}

export function PWAProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((navigator as unknown as { standalone?: boolean }).standalone);
      setIsInstalled(isStandalone);
      return isStandalone;
    };

    if (checkStandalone()) return;

    // Listen for beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);

      // Check if dismissed recently
      const dismissed = localStorage.getItem("openui-pwa-dismissed");
      if (!dismissed) {
        setBannerVisible(true);
      }
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setBannerVisible(false);
      setIsModalOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // If on iOS Safari, show prompt banner after a slight delay if not dismissed
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isSafari = /safari/.test(ua) && !/chrome|crios|fxios|edgios/.test(ua);

    if (isIOSDevice && isSafari && !localStorage.getItem("openui-pwa-dismissed")) {
      const timer = setTimeout(() => setBannerVisible(true), 2500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
          setBannerVisible(false);
        }
        setInstallPrompt(null);
      } catch (err) {
        console.warn("PWA install prompt error:", err);
        setIsModalOpen(true);
      }
    } else {
      // Browser didn't support native prompt event or user is on iOS/Safari
      setIsModalOpen(true);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PWAContext.Provider
      value={{
        isInstalled,
        canPromptDirectly: Boolean(installPrompt),
        isModalOpen,
        openModal,
        closeModal,
        triggerInstall,
      }}
    >
      {children}
      {bannerVisible && !isInstalled && (
        <PWAInstallBanner
          canPromptDirectly={Boolean(installPrompt)}
          onInstall={triggerInstall}
          onDismiss={() => {
            setBannerVisible(false);
            localStorage.setItem("openui-pwa-dismissed", Date.now().toString());
          }}
        />
      )}
      <PWAInstallModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        canPromptDirectly={Boolean(installPrompt)}
        onDirectInstall={triggerInstall}
      />
    </PWAContext.Provider>
  );
}

function PWAInstallBanner({
  canPromptDirectly,
  onInstall,
  onDismiss,
}: {
  canPromptDirectly: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}): React.JSX.Element {
  return (
    <aside
      aria-label="Download OpenUI App"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300 sm:bottom-6 sm:left-auto sm:right-6"
    >
      <div className="relative flex flex-col gap-3 rounded-2xl border border-line bg-paper/95 p-4 shadow-2xl backdrop-blur-md dark:border-line/70 dark:bg-paper/90">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md text-graphite transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3.5 pr-6">
          <img
            src="/logo.png"
            alt="UniqueFingerprint"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-xl object-contain shadow-md ring-1 ring-line/50"
          />
          <div className="min-w-0">
            <h2 className="font-display text-step-0 font-medium tracking-tight text-ink">
              Download UniqueFingerprint App
            </h2>
            <p className="text-xs text-graphite leading-relaxed">
              Install for instant offline access and native app feel.
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onDismiss} className="text-xs">
            Later
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onInstall}
            className="gap-1.5 text-xs font-mono"
          >
            <Download className="h-3.5 w-3.5" />
            {canPromptDirectly ? "Install Now" : "How to Download"}
          </Button>
        </div>
      </div>
    </aside>
  );
}

function PWAInstallModal({
  open,
  onOpenChange,
  canPromptDirectly,
  onDirectInstall,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canPromptDirectly: boolean;
  onDirectInstall: () => void;
}): React.JSX.Element {
  const [platform, setPlatform] = React.useState<"ios" | "android" | "desktop">("desktop");

  React.useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform("ios");
    } else if (/android/.test(ua)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/logo.png"
              alt="UniqueFingerprint"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-contain shadow-sm ring-1 ring-line/50"
            />
            <div>
              <DialogTitle>Download & Install UniqueFingerprint</DialogTitle>
              <DialogDescription>
                Experience UniqueFingerprint as a standalone native app on your device.
              </DialogDescription>
            </div>
          </div>
        </div>

        {canPromptDirectly && (
          <div className="mb-4 rounded-xl border border-line bg-surface/50 p-4 text-center">
            <p className="text-xs text-graphite mb-3">
              Your browser supports direct one-click installation:
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={onDirectInstall}
              className="gap-2 mx-auto font-mono text-xs"
            >
              <Download className="h-4 w-4" />
              Download & Install App
            </Button>
          </div>
        )}

        {/* Platform Selector Tabs */}
        <div className="flex items-center border-b border-line gap-4 text-xs font-mono mb-4">
          <button
            type="button"
            onClick={() => setPlatform("ios")}
            className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
              platform === "ios"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-graphite hover:text-ink"
            }`}
          >
            <Apple className="h-3.5 w-3.5" />
            iOS / iPhone
          </button>
          <button
            type="button"
            onClick={() => setPlatform("android")}
            className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
              platform === "android"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-graphite hover:text-ink"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Android
          </button>
          <button
            type="button"
            onClick={() => setPlatform("desktop")}
            className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
              platform === "desktop"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-graphite hover:text-ink"
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            Mac / Desktop
          </button>
        </div>

        {/* Instructions based on platform */}
        {platform === "ios" && (
          <div className="space-y-3 text-xs text-graphite">
            <p className="text-ink font-medium">To install on iPhone or iPad:</p>
            <ol className="space-y-2.5 list-decimal pl-4">
              <li>
                Open <strong className="text-ink">Safari</strong> and visit this website.
              </li>
              <li className="flex items-center gap-2">
                <span>Tap the</span>
                <span className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-ink font-medium">
                  <Share2 className="h-3.5 w-3.5 inline" /> Share
                </span>
                <span>button in Safari&apos;s bottom bar.</span>
              </li>
              <li>
                Scroll down in the share sheet and tap{" "}
                <strong className="text-ink font-medium">Add to Home Screen</strong>.
              </li>
              <li>
                Tap <strong className="text-ink font-medium">Add</strong> in the top-right corner.
              </li>
            </ol>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface p-3 text-[11px]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>OpenUI will now open in full-screen standalone mode from your home screen.</span>
            </div>
          </div>
        )}

        {platform === "android" && (
          <div className="space-y-3 text-xs text-graphite">
            <p className="text-ink font-medium">To install on Android:</p>
            <ol className="space-y-2.5 list-decimal pl-4">
              <li>
                Open <strong className="text-ink">Chrome</strong> or your preferred browser.
              </li>
              <li>
                Tap the three-dots menu <strong className="text-ink">⋮</strong> in the top right.
              </li>
              <li>
                Tap <strong className="text-ink font-medium">Install app</strong> or{" "}
                <strong className="text-ink font-medium">Add to Home screen</strong>.
              </li>
              <li>Confirm the prompt to install OpenUI.</li>
            </ol>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface p-3 text-[11px]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>The app will be installed to your home screen and app drawer.</span>
            </div>
          </div>
        )}

        {platform === "desktop" && (
          <div className="space-y-3 text-xs text-graphite">
            <p className="text-ink font-medium">To install on Mac, Windows, or Linux:</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-line p-3">
                <p className="text-ink font-semibold mb-1">Google Chrome / Microsoft Edge / Brave:</p>
                <p className="text-[11px] leading-relaxed">
                  Look at the right side of the address/URL bar for the{" "}
                  <strong className="text-ink">Install</strong> icon (a computer with a down arrow or &ldquo;+&rdquo;).
                  Click it and select <strong className="text-ink">Install</strong>.
                </p>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-ink font-semibold mb-1">macOS Safari (Sonoma or newer):</p>
                <p className="text-[11px] leading-relaxed">
                  Click <strong className="text-ink">File</strong> in the macOS menu bar, then choose{" "}
                  <strong className="text-ink">&ldquo;Add to Dock...&rdquo;</strong> to run OpenUI as a native Mac app.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
