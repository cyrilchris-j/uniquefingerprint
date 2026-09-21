import * as React from "react";

import { PlaygroundWorkspace } from "../features/playground/PlaygroundWorkspace.js";

/**
 * The playground.
 *
 * Runs resources in an isolated sandbox with full catalogue search, ecosystem filters,
 * DNA inspection, direct CLI installation commands, and deep links to full documentation pages.
 */
export default function PlaygroundPage(): React.JSX.Element {
  return (
    <main className="shell py-12">
      <PlaygroundWorkspace />
    </main>
  );
}
