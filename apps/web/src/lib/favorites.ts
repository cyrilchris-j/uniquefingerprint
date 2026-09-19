import type { Paginated, ResourceSummary } from "@openui/types";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "./firebase.js";

export interface StoredFavorite {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  categorySlug: string;
  resourceType: string;
  savedAt: string;
}

const STORAGE_PREFIX = "openui_favorites_";

function getStorageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

export function getStoredFavorites(userId: string | null | undefined): StoredFavorite[] {
  if (!userId || typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? (JSON.parse(raw) as StoredFavorite[]) : [];
  } catch {
    return [];
  }
}

export async function syncFavoritesFromFirestore(userId: string): Promise<StoredFavorite[]> {
  if (!userId || typeof window === "undefined") return [];
  const db = getFirebaseDb();
  if (!db) return getStoredFavorites(userId);

  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "favorites"));
    const firestoreFavorites: StoredFavorite[] = [];
    querySnapshot.forEach((docSnap) => {
      firestoreFavorites.push(docSnap.data() as StoredFavorite);
    });

    if (firestoreFavorites.length > 0) {
      const local = getStoredFavorites(userId);
      const map = new Map<string, StoredFavorite>();
      for (const item of local) map.set(item.slug, item);
      for (const item of firestoreFavorites) map.set(item.slug, item);
      const merged = Array.from(map.values());
      localStorage.setItem(getStorageKey(userId), JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("openui:favorites_changed"));
      return merged;
    }
  } catch (err) {
    console.warn("Could not sync favorites from Firestore:", err);
  }
  return getStoredFavorites(userId);
}

export function isResourceFavorited(userId: string | null | undefined, slug: string): boolean {
  if (!userId || !slug) return false;
  const list = getStoredFavorites(userId);
  return list.some((item) => item.slug === slug || item.name === slug);
}

export function saveFavorite(
  userId: string,
  entry: { name: string; title: string; description: string; category?: string; type?: string },
  token?: string | null,
): boolean {
  if (!userId || typeof window === "undefined") return false;
  try {
    const list = getStoredFavorites(userId);
    const existing = list.findIndex((item) => item.slug === entry.name || item.name === entry.name);
    const favItem: StoredFavorite = {
      id: entry.name,
      slug: entry.name,
      name: entry.name,
      title: entry.title,
      description: entry.description,
      categorySlug: entry.category ?? "components",
      resourceType: (entry.type ?? "component").replace("registry:", ""),
      savedAt: new Date().toISOString(),
    };

    if (existing === -1) {
      list.unshift(favItem);
      localStorage.setItem(getStorageKey(userId), JSON.stringify(list));
      window.dispatchEvent(
        new CustomEvent("openui:favorites_changed", { detail: { slug: entry.name, favorited: true } }),
      );
    }

    // Firestore remote persistence
    const db = getFirebaseDb();
    if (db) {
      void setDoc(doc(db, "users", userId, "favorites", entry.name), favItem).catch((e) => {
        console.warn("Firestore save favorite failed:", e);
      });
    }
    return true;
  } catch {
    return false;
  }
}

export function removeFavorite(
  userId: string,
  slug: string,
  _token?: string | null,
): boolean {
  if (!userId || typeof window === "undefined") return false;
  try {
    const list = getStoredFavorites(userId);
    const filtered = list.filter((item) => item.slug !== slug && item.name !== slug);
    localStorage.setItem(getStorageKey(userId), JSON.stringify(filtered));
    window.dispatchEvent(
      new CustomEvent("openui:favorites_changed", { detail: { slug, favorited: false } }),
    );

    // Firestore remote deletion
    const db = getFirebaseDb();
    if (db) {
      void deleteDoc(doc(db, "users", userId, "favorites", slug)).catch((e) => {
        console.warn("Firestore remove favorite failed:", e);
      });
    }
    return true;
  } catch {
    return false;
  }
}

export function toggleStoredFavorite(
  userId: string,
  entry: { name: string; title: string; description: string; category?: string; type?: string },
  token?: string | null,
): boolean {
  if (isResourceFavorited(userId, entry.name)) {
    removeFavorite(userId, entry.name, token);
    return false;
  } else {
    saveFavorite(userId, entry, token);
    return true;
  }
}

export function getFavoritesAsPaginated(userId: string | null | undefined): Paginated<ResourceSummary> {
  const list = getStoredFavorites(userId);
  const items: ResourceSummary[] = list.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    title: item.title,
    description: item.description,
    resourceType: (item.resourceType as any) || "component",
    status: "published",
    categorySlug: item.categorySlug,
    categoryName: item.categorySlug,
    designSystemSlug: null,
    licenseSpdx: "MIT",
    author: null,
    latestVersion: "0.1.0",
    tags: [],
    subcategory: null,
    fingerprint: null,
    design: null,
    dependencies: [],
    registryDependencies: [],
    downloadCount: 0,
    viewCount: 0,
    favoriteCount: 1,
    difficulty: null,
    createdAt: item.savedAt,
    updatedAt: item.savedAt,
    publishedAt: item.savedAt,
  }));

  return {
    items,
    total: items.length,
    page: 1,
    perPage: 50,
    hasMore: false,
  };
}
