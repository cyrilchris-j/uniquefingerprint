import { Heart, UserCog } from "lucide-react";
import * as React from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { Button, EmptyState, Skeleton, cn } from "@openui/ui";

import { SignInPanel } from "../components/SignInPanel.js";
import { useAuth } from "../lib/auth.js";

/**
 * The account layout.
 *
 * The guard is on the *layout*, not on each page, so a new account route cannot
 * be added without one.
 */
const NAV = [
  { to: "/account/profile", label: "Profile", icon: UserCog },
  { to: "/account/favorites", label: "Favourites", icon: Heart },
] as const;

export function AccountLayout(): React.JSX.Element {
  const { user, initialising, enabled } = useAuth();
  const location = useLocation();

  if (!enabled) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Accounts unavailable"
          title="This deployment has no authentication configured."
          description="Sign in with your Google or GitHub account to enable favourites, collections and submissions. The catalogue, resource pages and playground all work without it."
        />
      </div>
    );
  }

  if (initialising) {
    return (
      <div className="shell max-w-2xl mx-auto py-16 flex flex-col items-center gap-6">
        <Skeleton lines={3} />
        <Skeleton lines={8} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell py-20 flex justify-center">
        <SignInPanel
          title="Sign in to continue"
          description={`${location.pathname} is part of your account. Everything in the catalogue stays readable without one.`}
        />
      </div>
    );
  }

  return (
    <div className="shell py-8 sm:py-12 max-w-4xl mx-auto flex flex-col items-center min-h-[calc(100vh-10rem)]">
      {/* Centered Top Heading */}
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow text-[10px] sm:text-[11px] text-oxide font-bold uppercase tracking-widest">
          Personal Workspace
        </p>
        <h1 className="mt-1 font-display text-2xl sm:text-step-3 font-normal tracking-tight text-ink">
          Account & Library
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-graphite">
          Signed in as <span className="text-ink font-medium">{user.email ?? "verified user"}</span>
          {user.username ? ` · @${user.username}` : ""}.
        </p>
      </div>

      {/* Centered Nav Pill Tabs */}
      <nav aria-label="Account" className="mt-6">
        <div className="inline-flex items-center p-1 rounded-xl bg-surface/80 border border-line/40 backdrop-blur-md shadow-xs">
          {NAV.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/account/profile" &&
                (location.pathname === "/account" || location.pathname === "/account/"));
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200",
                  isActive
                    ? "bg-ink text-paper dark:bg-white dark:text-black font-semibold shadow-xs"
                    : "text-graphite hover:text-ink hover:bg-line/10",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Centered Content Stage */}
      <div className="w-full mt-8 flex flex-col items-center">
        <Outlet />
      </div>

      <div className="mt-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs text-graphite hover:text-ink"
        >
          Back to top
        </Button>
      </div>
    </div>
  );
}
