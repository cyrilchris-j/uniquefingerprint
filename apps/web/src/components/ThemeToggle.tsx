import * as React from "react";

export interface ThemeToggleProps {
  showLabels?: boolean;
}

/**
 * ThemeToggle component is disabled because dark theme is permanently enforced across the application.
 */
export function ThemeToggle(_props?: ThemeToggleProps): React.JSX.Element | null {
  return null;
}
