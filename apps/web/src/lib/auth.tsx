import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
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

import * as api from "./api.js";
import { config } from "./config.js";
import { getFirebaseAuth } from "./firebase.js";

/**
 * Authentication.
 *
 * Supports Firebase Authentication (primary when configured) and Supabase Auth (fallback).
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

let client: SupabaseClient | null = null;

/** The Supabase client, or null when auth is not configured. */
export function supabase(): SupabaseClient | null {
  if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
  client ??= createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });
  return client;
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [initialising, setInitialising] = React.useState(true);

  React.useEffect(() => {
    let active = true;

    // --- Firebase Auth (Primary when configured) ---
    if (config.firebaseConfigured) {
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
    }

    // --- Supabase Auth (Fallback) ---
    const auth = supabase();
    if (!auth) {
      setInitialising(false);
      return;
    }

    const resolve = async (session: Session | null) => {
      if (!active) return;

      if (!session) {
        setUser(null);
        setToken(null);
        setInitialising(false);
        return;
      }

      setToken(session.access_token);
      const email = session.user.email ?? null;
      const userMeta = session.user.user_metadata as Record<string, unknown> | undefined;
      const oauthDisplayName: string | null =
        (typeof userMeta?.full_name === "string" && userMeta.full_name) ||
        (typeof userMeta?.name === "string" && userMeta.name) ||
        (typeof userMeta?.user_name === "string" && userMeta.user_name) ||
        (typeof userMeta?.preferred_username === "string" && userMeta.preferred_username) ||
        (email ? email.split("@")[0] : null) ||
        null;

      try {
        const me = await api.getMe(session.access_token);
        if (!active) return;
        setUser({
          id: me.userId,
          email: me.email ?? email,
          username: me.username,
          displayName: me.displayName || oauthDisplayName,
          role: me.role as UserRole,
        });
      } catch {
        if (!active) return;
        setUser({
          id: session.user.id,
          email,
          username: null,
          displayName: oauthDisplayName,
          role: "user",
        });
      } finally {
        if (active) setInitialising(false);
      }
    };

    void auth.auth.getSession().then(({ data }) => resolve(data.session));

    const { data: subscription } = auth.auth.onAuthStateChange((_event, session) => {
      void resolve(session);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  /** Handles OAuth sign-in via Firebase popup (primary) or Supabase (fallback). */
  const signInWithGoogle = React.useCallback(async () => {
    if (config.firebaseConfigured) {
      const fbAuth = getFirebaseAuth();
      if (!fbAuth) throw new Error("Firebase Auth is not configured.");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(fbAuth, provider);
      return;
    }
    const auth = supabase();
    if (!auth) throw new Error("Authentication is not configured on this deployment.");
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await auth.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
    if (data?.url) window.location.href = data.url;
  }, []);

  const signInWithGitHub = React.useCallback(async () => {
    if (config.firebaseConfigured) {
      const fbAuth = getFirebaseAuth();
      if (!fbAuth) throw new Error("Firebase Auth is not configured.");
      const provider = new GithubAuthProvider();
      provider.addScope("read:user");
      provider.addScope("user:email");
      await signInWithPopup(fbAuth, provider);
      return;
    }
    const auth = supabase();
    if (!auth) throw new Error("Authentication is not configured on this deployment.");
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await auth.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
    if (data?.url) window.location.href = data.url;
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      enabled: config.authEnabled,
      initialising,
      signInWithGitHub,
      signInWithGoogle,
      signInWithEmail: async (email: string) => {
        const auth = supabase();
        if (!auth) throw new Error("Authentication is not configured on this deployment.");
        const { error } = await auth.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.href },
        });
        if (error) throw error;
      },
      signOut: async () => {
        if (config.firebaseConfigured) {
          const fbAuth = getFirebaseAuth();
          if (fbAuth) await firebaseSignOut(fbAuth);
        }
        if (supabase()) {
          await supabase()?.auth.signOut();
        }
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
