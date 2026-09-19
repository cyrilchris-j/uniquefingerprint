import { BarChart3, FileWarning, Gauge, Layers, ScrollText, Inbox, Users } from "lucide-react";
import * as React from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { Button, EmptyState, Skeleton, StatusPill } from "@openui/ui";

import { useAuth, useHasRole } from "../lib/auth.js";
import { SignInPanel } from "../components/SignInPanel.js";

/**
 * The moderation layout.
 *
 * **The guard here is a courtesy, not a control.** Hiding a route does not
 * protect it: every `/api/v1/admin/*` endpoint independently verifies the token
 * and then reads the caller's role from `profiles`. This layout exists so a
 * moderator does not see a link to a page they cannot use, and so an
 * unauthorised visitor gets an explanation instead of a wall of failed requests.
 *
 * The role it checks comes from the API's `/me`, not from the token — the token's
 * `role` claim is never read anywhere in this application.
 */
const NAV = [
  { to: "/admin", label: "Overview", icon: Gauge, end: true },
  { to: "/admin/catalogue", label: "Catalogue", icon: Layers },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
  { to: "/admin/resources", label: "Resources", icon: ScrollText },
  { to: "/admin/reports", label: "Reports", icon: FileWarning },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function AdminLayout(): React.JSX.Element {
  const { user, initialising, enabled } = useAuth();
  const isModerator = useHasRole("moderator");

  // Route awareness: the catalogue dashboard reads published artifacts only, so
  // it is public by design — the layout must not gate it behind moderation.
  const location = useLocation();
  const isPublicRoute = location.pathname === "/admin/catalogue";

  if (!enabled) {
    if (isPublicRoute) return <Outlet />;
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Moderation unavailable"
          title="This deployment has no authentication configured."
          description="Moderation requires an administrator account."
        />
      </div>
    );
  }

  if (initialising) {
    return (
      <div className="shell grid gap-10 py-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <Skeleton lines={6} />
        <Skeleton lines={10} />
      </div>
    );
  }

  if (!user) {
    if (isPublicRoute) return <Outlet />;
    return (
      <div className="shell py-20">
        <SignInPanel title="Sign in to moderate" description="Moderation requires an account with the moderator or administrator role." />
      </div>
    );
  }

  if (!isModerator) {
    if (isPublicRoute) return <Outlet />;
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Not permitted"
          title="Your account does not have moderation access."
          description={
            <>
              You are signed in as <span className="font-mono text-ink">{user.role}</span>. Publishing
              and moderation are limited to moderators and administrators; the API enforces this
              independently of what this page chooses to render.
            </>
          }
          action={
            <Button variant="outline" asChild>
              <a href="/submit">Contribute a resource instead</a>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <div>
          <p className="eyebrow">{isPublicRoute ? "Registry health" : "Moderation"}</p>
          <h1 className="mt-2 font-display text-step-3 tracking-tight">Registry operations</h1>
        </div>
        <StatusPill tone={user.role === "admin" ? "critical" : "warning"}>
          role · {user.role}
        </StatusPill>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="Moderation">
          <ul className="flex flex-row gap-4 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {NAV.map((item) => (
              <li key={item.to} className="lg:border-b lg:border-line">
                <NavLink
                  to={item.to}
                  end={"end" in item ? item.end : false}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2 whitespace-nowrap py-2.5 transition-colors duration-fast ease-editorial",
                      isActive ? "text-ink" : "text-graphite hover:text-ink",
                    ].join(" ")
                  }
                >
                  <item.icon aria-hidden className="h-3.5 w-3.5" />
                  <span className="eyebrow">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
