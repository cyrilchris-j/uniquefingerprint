import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import { Link, Navigate, useParams } from "react-router";

import { Button, EmptyState, Skeleton } from "@openui/ui";

import { CodeBlock, CommandLine } from "../components/CodeBlock.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";

/**
 * Documentation.
 *
 * Content is authored in **MDX** — Markdown that can use the platform's own
 * components — and rendered through a component map so a doc page writes
 * `<CodeBlock>` rather than a second, parallel set of doc-only components.
 *
 * The security posture matters as much as the authoring format. Docs are
 * compiled at *build* time by `@mdx-js/rollup`, never at runtime, so a doc page
 * cannot execute anything a contributor sends us after the fact. And the
 * component map below is a **whitelist**: only elements listed here are
 * available inside content. That is what keeps "MDX" from meaning "arbitrary
 * JavaScript in the content directory".
 *
 * The pages are eagerly globbed so the docs are part of the main bundle rather
 * than a waterfall of dynamic imports — the whole set is a few kilobytes of text.
 */

const PAGES = import.meta.glob<{ default: React.ComponentType }>("../content/docs/*.mdx", {
  eager: true,
});

/** Route slug → page metadata. Order here is the order in the sidebar. */
const NAV: Array<{ slug: string; title: string; group: string }> = [
  { slug: "installation", title: "Installation", group: "Getting started" },
  { slug: "cli", title: "CLI", group: "Getting started" },
  { slug: "registry", title: "Registry", group: "Concepts" },
  { slug: "components", title: "Component authoring", group: "Concepts" },
  { slug: "design-systems", title: "Design systems", group: "Concepts" },
  { slug: "ai-rules", title: "AI resources", group: "Concepts" },
  { slug: "contributing", title: "Contributing", group: "Project" },
  { slug: "security", title: "Security model", group: "Project" },
];

function pageFor(slug: string): React.ComponentType | undefined {
  const entry = Object.entries(PAGES).find(([path]) => path.endsWith(`/${slug}.mdx`));
  return entry?.[1].default;
}

export default function DocsPage(): React.JSX.Element {
  const { slug = "installation" } = useParams<{ slug?: string }>();
  const meta = NAV.find((page) => page.slug === slug);
  const Page = pageFor(slug);

  useDocumentTitle(meta ? `${meta.title} — UniqueFingerprint Docs` : "Documentation — UniqueFingerprint");

  if (!Page) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="No such page"
          title={`There is no “${slug}” page in the documentation.`}
          description="The guide is small and indexed. Pick a page from the list below."
          action={
            <Button asChild>
              <Link to="/docs/installation">Start with installation</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const groups = [...new Set(NAV.map((page) => page.group))];

  return (
    <div className="shell py-16">
      <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        {/* Sidebar: a real index with the project's typographic device. */}
        <nav aria-label="Documentation">
          {groups.map((group) => (
            <div key={group} className="mb-8">
              <p className="eyebrow mb-3">{group}</p>
              <ul className="flex flex-col">
                {NAV.filter((page) => page.group === group).map((page) => (
                  <li key={page.slug} className="border-b border-line">
                    <Link
                      to={`/docs/${page.slug}`}
                      aria-current={page.slug === slug ? "page" : undefined}
                      className={[
                        "block py-2 text-[0.85rem] transition-colors duration-fast",
                        page.slug === slug ? "text-ink" : "text-graphite hover:text-ink",
                      ].join(" ")}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="flex flex-col">
            {[
              ["/explore", "Catalogue"],
              ["/playground", "Playground"],
              ["/builder", "Builder"],
            ].map(([to, label]) => (
              <li key={to} className="border-b border-line">
                <Link
                  to={to!}
                  className="block py-2 text-[0.85rem] text-graphite transition-colors hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <article className="min-w-0">
          <SectionHeader
            as="h1"
            eyebrow={`Docs · ${meta?.group ?? "Guide"}`}
            title={meta?.title ?? slug}
          />

          <div className="reading-column mt-10">
            <React.Suspense fallback={<Skeleton lines={10} />}>
              <MDXProvider components={mdxComponents}>
                <Page />
              </MDXProvider>
            </React.Suspense>
          </div>

          <nav aria-label="Page navigation" className="mt-16 border-t border-line pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {previousOf(slug) ? (
                <Button variant="ghost" asChild>
                  <Link to={`/docs/${previousOf(slug)}`}>
                    ← {NAV.find((page) => page.slug === previousOf(slug))?.title}
                  </Link>
                </Button>
              ) : (
                <span />
              )}
              {nextOf(slug) ? (
                <Button variant="ghost" asChild>
                  <Link to={`/docs/${nextOf(slug)}`}>
                    {NAV.find((page) => page.slug === nextOf(slug))?.title} →
                  </Link>
                </Button>
              ) : (
                <span />
              )}
            </div>
          </nav>
        </article>
      </div>
    </div>
  );
}

function previousOf(slug: string): string | undefined {
  const index = NAV.findIndex((page) => page.slug === slug);
  return index > 0 ? NAV[index - 1]?.slug : undefined;
}

function nextOf(slug: string): string | undefined {
  const index = NAV.findIndex((page) => page.slug === slug);
  return index >= 0 && index < NAV.length - 1 ? NAV[index + 1]?.slug : undefined;
}

/**
 * The component whitelist.
 *
 * Only the elements listed here are available inside MDX content. Anything not
 * listed renders as plain text, which is the safe direction to fail in: a doc
 * page cannot reach a component that has not been reviewed for it.
 */
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="optically-align border-t border-line pt-5" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? (
      <Link to={href} className="text-oxide underline decoration-line underline-offset-4" {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-oxide underline decoration-line underline-offset-4"
        {...props}
      />
    ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.88rem]" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-line py-2 pr-4 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-graphite"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border-b border-line py-2 pr-4 align-top text-graphite" />
  ),
  CodeBlock,
  CommandLine,
};

export { Navigate };
