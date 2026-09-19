import { Heart, UserCog } from "lucide-react";
import * as React from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { Button, EmptyState, Skeleton } from "@openui/ui";

import { SignInPanel } from "../components/SignInPanel.js";
import { useAuth } from "../lib/auth.js";

/**
 * The account layout.
 *
 * The guard is on the *layout*, not on each page, so a new account route cannot
 * be added without one. It is a UI guard only — the API re-checks every write
 * against a verified token — but presenting an account screen to a signed-out
 * visitor is still wrong, so the check happens here.
 *
 * While the session is being read, a skeleton is shown rather than a redirect:
 * redirecting an authenticated user to sign-in during the first 200ms of a page
 * load is the classic auth-flash bug.
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
      <div className="shell grid gap-12 py-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <Skeleton lines={4} />
        <Skeleton lines={8} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell py-20">
        <SignInPanel
          title="Sign in to continue"
          description={`${location.pathname} is part of your account. Everything in the catalogue stays readable without one.`}
        />
      </div>
    );
  }

  return (
    <div className="shell py-6 sm:py-8">
      <p className="eyebrow text-[10px] sm:text-[11px]">Account</p>
      <h1 className="mt-1.5 font-display text-2xl sm:text-step-3 tracking-tight">Your library</h1>
      <p className="mt-1 max-w-[52ch] text-xs sm:text-sm text-graphite">
        Signed in as {user.email ?? "an unknown address"}
        {user.username ? ` · @${user.username}` : ""}.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
        <nav aria-label="Account">
          <ul className="flex flex-row gap-3 overflow-x-auto border-b border-line pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:border-b-0 lg:pb-0">
            {NAV.map((item) => (
              <li key={item.to} className="lg:border-b lg:border-line/60">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2 whitespace-nowrap py-2 px-2 rounded-sm transition-colors duration-fast ease-editorial",
                      isActive
                        ? "text-ink font-semibold bg-line/10 lg:bg-transparent lg:border-l-2 lg:border-oxide lg:rounded-none"
                        : "text-graphite hover:text-ink hover:bg-line/5 lg:border-l-2 lg:border-transparent lg:rounded-none",
                    ].join(" ")
                  }
                >
                  <item.icon aria-hidden className="h-3.5 w-3.5" />
                  <span className="eyebrow text-[10px] sm:text-[11px]">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>

      <div className="mt-10">
        <Button variant="ghost" size="sm" onClick={() => void window.scrollTo({ top: 0 })}>
          Back to top
        </Button>
      </div>
    </div>
  );
}
