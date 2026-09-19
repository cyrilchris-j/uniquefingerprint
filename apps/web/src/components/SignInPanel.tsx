import * as React from "react";

import { Button, EmptyState } from "@openui/ui";

import { useAuth } from "../lib/auth.js";

/**
 * The signed-out explanation, used wherever a page needs a session.
 *
 * It explains what signing in enables and what it does not — an account is never
 * required to read the registry. That distinction is a product value, not a
 * caveat, so it is stated at the point of friction rather than buried in a
 * privacy page.
 */
export function SignInPanel({
  title = "Sign in to continue",
  description,
}: {
  title?: string;
  description?: string;
}): React.JSX.Element {
  const { signInWithGitHub, signInWithGoogle } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="max-w-[46rem]">
      <EmptyState
        eyebrow="Authentication required"
        title={title}
        description={
          description ??
          "An account saves favourites, collections and submissions. Reading and installing resources never requires one."
        }
        action={
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  void signInWithGitHub().catch((cause: unknown) =>
                    setError(cause instanceof Error ? cause.message : "Sign-in failed."),
                  )
                }
              >
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  void signInWithGoogle().catch((cause: unknown) =>
                    setError(cause instanceof Error ? cause.message : "Sign-in failed."),
                  )
                }
              >
                Continue with Google
              </Button>
            </div>
            <p className="text-[10px] text-graphite/70 font-mono flex items-center gap-1.5 mt-1">
              <span>🔒</span>
              <span>Encrypted OAuth sign-in · Private keys & passwords never exposed</span>
            </p>
          </div>
        }
      />
      {error ? (
        <p role="alert" className="mt-4 text-[0.8rem] text-oxide">
          {error}
        </p>
      ) : null}
    </div>
  );
}
