import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts (last wins).
 *
 * Every resource in the registry uses this so a consumer can override any part
 * of a component's styling from the outside:
 *
 * ```tsx
 * <MagneticButton className="bg-ink text-paper" />
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
