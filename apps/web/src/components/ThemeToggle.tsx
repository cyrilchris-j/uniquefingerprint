import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";

import { SegmentedControl, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@openui/ui";

import { useTheme, type Theme } from "../hooks/use-theme.js";

/**
 * Theme control.
 *
 * A three-way segmented control rather than a two-state switch, because
 * "follow the system" is a real preference that a binary toggle silently
 * destroys the first time it is used.
 *
 * The options carry icons *and* labels at larger sizes: an icon-only control
 * for a three-state setting is a guessing game.
 */
export interface ThemeToggleProps {
  showLabels?: boolean;
}

export function ThemeToggle({ showLabels = false }: ThemeToggleProps): React.JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <SegmentedControl
              label="Colour theme"
              hideLabel
              size="sm"
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
              options={[
                {
                  value: "light",
                  label: showLabels ? "Light" : undefined,
                  icon: <Sun aria-hidden className="h-3.5 w-3.5" />,
                },
                {
                  value: "dark",
                  label: showLabels ? "Dark" : undefined,
                  icon: <Moon aria-hidden className="h-3.5 w-3.5" />,
                },
                {
                  value: "system",
                  label: showLabels ? "System" : undefined,
                  icon: <Monitor aria-hidden className="h-3.5 w-3.5" />,
                },
              ]}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Theme — light, dark, or follow the system
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
