import { Link } from "react-router";

import { Button, EmptyState } from "@openui/ui";

import { useDocumentTitle } from "../hooks/use-document-title.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";

/**
 * The 404 page.
 *
 * A 404 is a design surface with a job: get the visitor to the thing they were
 * actually looking for. So it offers the complete taxonomy rather than a single
 * "home" button — if we cannot serve the exact page, the next best outcome is
 * that the visitor recognises the correct category.
 *
 * It sets its own title. A 404 that announces "OpenUI" in the tab bar is
 * indistinguishable from a successful page in the history list.
 */
export default function NotFoundPage(): React.JSX.Element {
  useDocumentTitle("Not found — UniqueFingerprint Design Registry");

  return (
    <div className="shell py-24">
      <EmptyState
        bordered={false}
        className="px-0"
        eyebrow="404 — Not in the registry"
        title="That page is not here."
        description="The registry's index lists everything that is published, so the fastest way back is to pick the category you were looking for."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/explore">Browse everything</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/search">Search instead</Link>
            </Button>
          </div>
        }
      />

      <nav aria-label="Catalogue categories" className="mt-16 border-t border-line pt-8">
        <p className="eyebrow mb-6">The registry contains</p>
        <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE_CATEGORIES.map((category) => (
            <li key={category.slug} className="border-b border-line">
              <Link
                to={`/${category.slug}`}
                className="group flex items-baseline justify-between gap-4 py-3"
              >
                <span className="font-display text-step-2 tracking-tight text-ink">
                  {category.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
                  {category.resourceType ?? "system"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
