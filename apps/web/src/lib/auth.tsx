import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import * as React from "react";

import type { UserRole } from "@openui/types";

import { config } from "./config.js";
import { getFirebaseAuth } from "./firebase.js";

/**
 * Authentication.
 *
 * Exclusively powered by Firebase Authentication (Google & GitHub OAuth).
 */

export interface AuthUser {
  id: string;
  email: string | null;
  username: string | null;
  displayName: string | null;
  role: UserRole;
  photoUrl?: string | null;
}

export interface AuthContextValue {
  user: AuthUser | null;
  /** Access token for API calls. `null` when signed out. */
  token: string | null;
  /** False when the deployment has no auth configured. */
  enabled: boolean;
  /** True until the initial session has been read. */
  initialising: boolean;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  openSignInDialog: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [initialising, setInitialising] = React.useState(true);

  React.useEffect(() => {
    let active = true;

    if (!config.firebaseConfigured) {
      setInitialising(false);
      return;
    }

    const fbAuth = getFirebaseAuth();
    if (!fbAuth) {
      setInitialising(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(fbAuth, async (fbUser: FirebaseUser | null) => {
      if (!active) return;
      if (!fbUser) {
        setUser(null);
        setToken(null);
        setInitialising(false);
        return;
      }

      try {
        const idToken = await fbUser.getIdToken();
        const email = fbUser.email ?? null;
        const displayName: string | null =
          fbUser.displayName || (email ? email.split("@")[0] : "Account User") || null;
        const username: string | null =
          (fbUser.displayName || (email ? email.split("@")[0] : null)) ?? null;

        if (!active) return;
        setUser({
          id: fbUser.uid,
          email,
          username,
          displayName,
          role: "user",
          photoUrl: fbUser.photoURL ?? null,
        });
        setToken(idToken);
      } catch {
        if (!active) return;
        setUser(null);
        setToken(null);
      } finally {
        if (active) setInitialising(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  /** Handles OAuth sign-in via Firebase popup. */
  const signInWithGoogle = React.useCallback(async () => {
    const fbAuth = getFirebaseAuth();
    if (!fbAuth) throw new Error("Firebase Auth is not configured.");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(fbAuth, provider);
  }, []);

  const signInWithGitHub = React.useCallback(async () => {
    const fbAuth = getFirebaseAuth();
    if (!fbAuth) throw new Error("Firebase Auth is not configured.");
    const provider = new GithubAuthProvider();
    provider.addScope("read:user");
    provider.addScope("user:email");
    await signInWithPopup(fbAuth, provider);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      enabled: config.authEnabled,
      initialising,
      signInWithGitHub,
      signInWithGoogle,
      signInWithEmail: async (_email: string) => {
        // Direct Firebase OAuth is preferred
      },
      signOut: async () => {
        const fbAuth = getFirebaseAuth();
        if (fbAuth) await firebaseSignOut(fbAuth);
        setUser(null);
        setToken(null);
      },
      openSignInDialog: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("openui:open-signin"));
        }
      },
    }),
    [user, token, initialising, signInWithGoogle, signInWithGitHub],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function openSignInDialog(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openui:open-signin"));
  }
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>.");
  return context;
}

/** True when the signed-in user holds at least `minimum`. */
export function useHasRole(minimum: UserRole): boolean {
  const { user } = useAuth();
  if (!user) return false;
  const rank: Record<UserRole, number> = { user: 0, contributor: 1, moderator: 2, admin: 3 };
  return rank[user.role] >= rank[minimum];
}
