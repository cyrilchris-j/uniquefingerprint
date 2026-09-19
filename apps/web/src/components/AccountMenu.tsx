import { LogIn, LogOut, Shield, User } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@openui/ui";

import { useAuth } from "../lib/auth.js";
import { useHasRole } from "../lib/auth.js";

/**
 * Account menu.
 *
 * It has three states:
 *  - **Auth disabled** (no credentials in env) → a disabled button with an
 *    explanatory title.
 *  - **Signed out** → a trigger for the sign-in dialog. The dialog offers
 *    GitHub and Google OAuth.
 *  - **Signed in** → an account menu. The moderation link appears only when the
 *    *API-derived* role permits it; the navigation is a convenience, and the
 *    route itself is guarded server-side regardless.
 *
 * When the deployment has no authentication configured, the control explains
 * that rather than opening a dialog that cannot work.
 */
export function AccountMenu(): React.JSX.Element {
  const { user, enabled, signInWithGitHub, signInWithGoogle, signOut } = useAuth();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const isStaff = useHasRole("moderator");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorDesc = params.get("error_description") ?? params.get("error");
    if (errorDesc) {
      setError(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
      setDialogOpen(true);
    }
  }, []);

  React.useEffect(() => {
    const handleOpenSignIn = () => {
      setDialogOpen(true);
    };
    window.addEventListener("openui:open-signin", handleOpenSignIn);
    return () => {
      window.removeEventListener("openui:open-signin", handleOpenSignIn);
    };
  }, []);

  if (!enabled) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        title="Authentication is not configured on this deployment."
        className="h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-2.5 shrink-0"
      >
        <User aria-hidden className="h-3.5 w-3.5" />
        <span className="hidden lg:inline ml-1.5">Accounts off</span>
      </Button>
    );
  }

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
          title="Account"
          aria-label="Account"
          className="h-8 sm:h-9 px-2.5 sm:px-3 text-[11px] font-mono uppercase tracking-wider gap-1.5 border-line text-ink hover:border-ink hover:bg-surface/50 shrink-0"
        >
          <User aria-hidden className="h-3.5 w-3.5" />
          <span>Account</span>
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[28rem]">
            <div className="text-center space-y-1.5">
              <DialogTitle className="text-center">Sign in to OpenUI</DialogTitle>
              <DialogDescription className="text-center">
                Signing in lets you save favourites, build collections and submit resources to the
                registry. Everything in the catalogue is readable without an account.
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  setError(null);
                  void signInWithGitHub()
                    .then(() => setDialogOpen(false))
                    .catch((cause: unknown) =>
                      setError(cause instanceof Error ? cause.message : "GitHub sign-in failed."),
                    );
                }}
              >
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  setError(null);
                  void signInWithGoogle()
                    .then(() => setDialogOpen(false))
                    .catch((cause: unknown) =>
                      setError(cause instanceof Error ? cause.message : "Google sign-in failed."),
                    );
                }}
              >
                Continue with Google
              </Button>
            </div>

            <div className="pt-1 text-center text-[10.5px] text-graphite/75 flex items-center justify-center gap-1.5 font-mono">
              <span>🔒</span>
              <span>Encrypted OAuth · Confidential keys never exposed</span>
            </div>

            {error ? (
              <p role="alert" className="text-center text-[0.8rem] text-oxide">
                {error}
              </p>
            ) : null}
          </DialogContent>
        </Dialog>
      </>
    );
  }

    const displayName = user.displayName || user.username || user.email || "Account";
    const initial = (user.displayName || user.username || user.email || "U")
      .replace(/^@/, "")
      .trim()
      .charAt(0)
      .toUpperCase();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            title={displayName}
            aria-label={`Account: ${displayName}`}
            className="h-8 sm:h-9 px-2.5 text-[11px] font-mono uppercase tracking-wider gap-1.5 border-line text-ink hover:border-ink hover:bg-surface/50 shrink-0"
          >
            <User aria-hidden className="h-3.5 w-3.5 text-graphite" />
            <span className="font-bold">{initial}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-mono text-xs">
            <div className="font-bold text-ink">{displayName}</div>
            {user.email && user.email !== displayName ? (
              <div className="text-[10px] text-graphite font-normal truncate max-w-[200px] mt-0.5">{user.email}</div>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/account/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/favorites" className="w-full">
            Favourites
          </Link>
        </DropdownMenuItem>

        {isStaff ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="w-full">
                <Shield aria-hidden className="h-3.5 w-3.5" />
                Moderation
              </Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onSelect={() => void signOut()}>
          <LogOut aria-hidden className="h-3.5 w-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
