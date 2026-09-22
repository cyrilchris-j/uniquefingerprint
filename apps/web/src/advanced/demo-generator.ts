import type { AdvancedResourceItem } from "./types.js";

export const CN_HELPER_CODE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind CSS conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

/**
 * Generates an end-to-end, copy-pasteable demo file (demo.tsx) for any Advanced resource.
 * Demonstrates proper props, realistic styling wrappers, and dark mode containers.
 */
export function generateAdvancedDemoCode(item: AdvancedResourceItem): string {
  const componentName = item.title.replace(/[^a-zA-Z0-9]/g, "");

  switch (item.category) {
    case "text-animations": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center rounded-2xl bg-neutral-950 p-8 border border-neutral-800">
      <${componentName}
        text="Next Generation Web Interfaces"
        className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white text-center"
      />
    </div>
  );
}
`;
    }

    case "buttons": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  const handleClick = () => {
    console.log("${item.title} triggered!");
  };

  return (
    <div className="flex min-h-[280px] w-full items-center justify-center rounded-2xl bg-neutral-950 p-8 border border-neutral-800">
      <${componentName} onClick={handleClick}>
        ${item.title}
      </${componentName}>
    </div>
  );
}
`;
    }

    case "backgrounds": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="relative flex min-h-[480px] w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800">
      {/* Background canvas layer */}
      <${componentName} className="absolute inset-0 h-full w-full" />

      {/* Foreground content layer */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center my-auto">
        <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-mono font-medium text-neutral-300 backdrop-blur-md">
          Ambient Canvas Engine
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
          ${item.title}
        </h2>
        <p className="mt-3 max-w-md text-sm sm:text-base text-neutral-400">
          Hardware-accelerated ambient visuals that react seamlessly to viewport and pointer interactions.
        </p>
      </div>
    </div>
  );
}
`;
    }

    case "spatial-3d": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 p-6 border border-neutral-800">
      <div className="relative h-[380px] w-full max-w-xl">
        <${componentName} className="h-full w-full" />
      </div>
    </div>
  );
}
`;
    }

    case "heroes":
    case "landing-pages": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800">
      <${componentName} />
    </div>
  );
}
`;
    }

    case "css-layouts": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center rounded-2xl bg-neutral-950 p-8 border border-neutral-800">
      <div className="w-full max-w-2xl">
        <${componentName} className="w-full" />
      </div>
    </div>
  );
}
`;
    }

    case "ui-elements": {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl bg-neutral-950 p-8 border border-neutral-800">
      <div className="w-full max-w-md">
        <${componentName} />
      </div>
    </div>
  );
}
`;
    }

    case "motion-design":
    default: {
      return `import * as React from "react";
import { ${componentName} } from "./${item.slug}";

export default function ${componentName}Demo(): React.JSX.Element {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl bg-neutral-950 p-8 border border-neutral-800">
      <${componentName} />
    </div>
  );
}
`;
    }
  }
}
