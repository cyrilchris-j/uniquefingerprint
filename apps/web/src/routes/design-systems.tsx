import { Link, useParams } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { Badge, Button, EmptyState, Skeleton } from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
import { DnaStrip } from "../components/DnaStrip.js";
import { Section, SectionHeader } from "../components/SectionHeader.js";
import { ResourceTile } from "../components/ResourceTile.js";
import { useRegistryIndex, useRegistryItem } from "../features/resources/use-catalogue.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as React from "react";

/**
 * Design systems.
 *
 * A design system is the registry's heaviest resource: not a component but a
 * *complete visual identity*, expressed as design tokens, a `design.md`, and a
 * fingerprint that resources can be linked to.
 *
 * The index view lists what the registry publishes; the detail view renders the
 * system's tokens as they are actually written — because a theme is the one
 * resource where seeing the CSS matters more than reading a description of it.
 */

export function DesignSystemsPage(): React.JSX.Element {
  const index = useRegistryIndex();
  useDocumentTitle("Design systems — UniqueFingerprint Design Registry");

  const systems = React.useMemo(
    () =>
      (index.data?.items ?? []).filter(
        (item) => item.type === "registry:theme" || item.category === "design-systems",
      ),
    [index.data],
  );

  const linked = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of index.data?.items ?? []) {
      if (!item.designSystem) continue;
      counts.set(item.designSystem, (counts.get(item.designSystem) ?? 0) + 1);
    }
    return counts;
  }, [index.data]);

  return (
    <div className="shell py-8 sm:py-16">
      <SectionHeader
        as="h1"
        eyebrow="Catalogue · system"
        title="Design systems."
        description="A design system is a fingerprint you can apply: tokens for colour, type, spacing, shape and motion, plus the rules that explain when to break them. Resources can declare a system, which is how a catalogue stays visually coherent instead of becoming a pile of parts."
      />

      {index.isLoading ? (
        <Skeleton lines={8} className="mt-12" />
      ) : systems.length === 0 ? (
        <EmptyState
          className="mt-12"
          eyebrow="Nothing published"
          title="No design systems have been published yet."
          description="A design system ships as a theme with tokens and a design.md. Run pnpm build:registry to publish the first-party systems."
        />
      ) : (
        <ul className="mt-12">
          {systems.map((system, position) => (
            <li key={system.name} className="border-t border-line">
              <Link
                to={`/design-systems/${system.name}`}
                className="grid gap-4 py-8 transition-colors duration-fast ease-editorial hover:bg-ink/[0.02] lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-12"
              >
                <div>
                  <p className="eyebrow">
                    {String(position + 1).padStart(2, "0")} · {system.license ?? "no licence"}
                  </p>
                  <h2 className="mt-3 font-display text-step-3 leading-tight tracking-tight text-ink">
                    {system.title}
                  </h2>
                  <p className="mt-3 max-w-[46ch] text-[0.9rem] leading-relaxed text-graphite">
                    {system.description}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                    {linked.get(system.name) ?? 0} linked resources
                  </p>
                </div>
                <div>
                  <DnaStrip dna={system.dna} variant="labelled" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Section label="Why a system, not a theme" className="mt-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="prose-measure text-[0.92rem] leading-relaxed text-graphite">
            <p>
              A theme changes colours. A design system changes <em>decisions</em> — how much air a
              layout gets, whether shapes are sharp or soft, which typeface states the hierarchy,
              and how long motion should take. Those decisions are what make two interfaces built
              from the same components look like different products.
            </p>
            <p className="mt-4">
              In this registry a system is a resource like any other: it ships source you own, a
              demo, a licence and a <code className="font-mono">design.md</code>. It can be
              installed with the CLI, linked from a component, and read by an AI tool before it
              composes a page.
            </p>
          </div>
          <CodeBlock
            caption="Apply a system's tokens"
            language="bash"
            code={`# Install the tokens and the rules
pnpm dlx uniquefingerprint theme add swiss-editorial

# Link a resource to a system when you install it
pnpm dlx uniquefingerprint add asymmetric-hero --system swiss-editorial`}
          />
        </div>
      </Section>
    </div>
  );
}

/** A single design system: tokens, rules and linked resources. */
export function DesignSystemPage(): React.JSX.Element {
  const { slug = "" } = useParams<{ slug: string }>();
  const index = useRegistryIndex();
  const item = useRegistryItem(slug);

  const entry: RegistryIndexEntry | undefined = React.useMemo(
    () => index.data?.items.find((candidate) => candidate.name === slug),
    [index.data, slug],
  );

  useDocumentTitle(entry ? `${entry.title} — Design system — UniqueFingerprint` : "Design system — UniqueFingerprint");

  const linked = React.useMemo(
    () =>
      (index.data?.items ?? []).filter(
        (candidate) => candidate.designSystem === slug && candidate.name !== slug,
      ),
    [index.data, slug],
  );

  const cssFile = item.data?.files.find((file) => file.path.endsWith(".css"));
  const designFile = item.data?.files.find((file) => file.path.endsWith("design.md"));

  if (item.error) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Not in the registry"
          title={`No design system named “${slug}”.`}
          description="Every published system is listed in the catalogue index."
          action={
            <Button asChild>
              <Link to="/design-systems">Browse design systems</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Design system"
        title={entry?.title ?? slug}
        description={entry?.description ?? "Loading the system's metadata…"}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/design-systems">All systems</Link>
          </Button>
        }
      />

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {entry?.license ? <Badge tone="moss">{entry.license}</Badge> : null}
        {entry?.type ? <Badge tone="ink">{entry.type.replace("registry:", "")}</Badge> : null}
        <Badge>{linked.length} linked resources</Badge>
      </div>

      <Section label="Fingerprint" className="mt-12">
        <DnaStrip dna={entry?.dna} variant="labelled" />
      </Section>

      {designFile ? (
        <Section label="Rules" className="mt-16">
          <CodeBlock
            tone="light"
            caption={designFile.path}
            language="markdown"
            code={designFile.content}
            maxLines={32}
          />
        </Section>
      ) : null}

      {cssFile ? (
        <Section label="Tokens" className="mt-16">
          <p className="mb-4 max-w-[60ch] text-[0.9rem] leading-relaxed text-graphite">
            The compiled form of the rules above. Apply this before any resource stylesheet so a
            resource can override individual tokens without forking the system.
          </p>
          <CodeBlock
            caption={cssFile.path}
            language="css"
            code={cssFile.content}
            showLineNumbers
            maxLines={40}
          />
        </Section>
      ) : null}

      <Section label="Install" className="mt-16">
        <CodeBlock
          caption="terminal"
          language="bash"
          code={`pnpm dlx uniquefingerprint theme add ${slug}`}
        />
      </Section>

      <Section label={`Linked resources (${linked.length})`} className="mt-16">
        {linked.length === 0 ? (
          <p className="text-[0.9rem] text-graphite">
            No published resource links to this system yet. A resource links to a system by naming
            it in its registry.json.
          </p>
        ) : (
          <div className="catalogue-grid">
            {linked.map((resource, position) => (
              <ResourceTile key={resource.name} item={resource} index={position + 1} withPreview />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
