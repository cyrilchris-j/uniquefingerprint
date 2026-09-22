import { describe, expect, it } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

import {
  OPENUI_MOTION_TOKENS,
  OPENUI_SPRING_PRESETS,
  OPENUI_EASINGS,
  VISUAL_CATEGORIES,
  lerp,
  clamp,
  damp,
  mapRange,
  stepSpring,
  Fade,
  Slide,
  BlurReveal,
  ScrambleDecryption,
  SpringButton,
  InteractiveDock,
  BentoGrid,
  BentoCard,
  ScrollReveal,
} from "./index.js";

describe("OpenUI Visual Engine Motion Tokens & Physics", () => {
  it("exports valid spring presets with positive physical parameters", () => {
    const presets = ["gentle", "natural", "snappy", "bouncy", "stiff", "wobbly"] as const;
    for (const preset of presets) {
      const config = OPENUI_SPRING_PRESETS[preset];
      expect(config).toBeDefined();
      expect(config.stiffness).toBeGreaterThan(0);
      expect(config.damping).toBeGreaterThan(0);
      expect(config.mass).toBeGreaterThan(0);
    }
  });

  it("exports valid cubic bezier easings", () => {
    const easingNames = ["editorial", "snappy", "smooth", "organic"] as const;
    for (const name of easingNames) {
      const curve = OPENUI_EASINGS[name];
      expect(curve).toBeDefined();
      expect(curve).toHaveLength(4);
      expect(curve[0]).toBeGreaterThanOrEqual(0);
      expect(curve[2]).toBeLessThanOrEqual(1);
    }
  });

  it("provides accurate interpolation and math utilities", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0.25)).toBe(12.5);

    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(-50, 0, 100)).toBe(0);
    expect(clamp(42, 0, 100)).toBe(42);

    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(2, 0, 4, 10, 20)).toBe(15);

    const smoothed = damp(0, 100, 10, 0.016);
    expect(smoothed).toBeGreaterThan(0);
    expect(smoothed).toBeLessThan(100);
  });

  it("converges toward target with stepSpring", () => {
    let state = { current: 0, velocity: 0, target: 100 };

    for (let i = 0; i < 120; i++) {
      state = stepSpring(state, OPENUI_SPRING_PRESETS.snappy, 1 / 60);
    }

    expect(Math.abs(state.current - 100)).toBeLessThan(1);
  });

  it("defines all visual taxonomy categories", () => {
    expect(VISUAL_CATEGORIES.length).toBe(8);
    const ids = VISUAL_CATEGORIES.map((c) => c.id);
    expect(ids).toContain("kinetic-typography");
    expect(ids).toContain("micro-interactions");
    expect(ids).toContain("webgl-3d");
    expect(ids).toContain("procedural-backgrounds");
    expect(ids).toContain("cursor-effects");
    expect(ids).toContain("hover-craft");
    expect(ids).toContain("scroll-driven");
    expect(ids).toContain("creative-components");
  });
});

describe("OpenUI Visual Engine Component Mounting", () => {
  async function mountComponent(element: React.ReactElement) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(element);
    });
    return {
      container,
      unmount: async () => {
        await act(async () => {
          root.unmount();
        });
        container.remove();
      },
    };
  }

  it("renders Fade primitive without throwing", async () => {
    const { container, unmount } = await mountComponent(
      <Fade show>
        <span data-testid="child">Hello Visual Engine</span>
      </Fade>,
    );
    expect(container.textContent).toContain("Hello Visual Engine");
    await unmount();
  });

  it("renders Slide primitive without throwing", async () => {
    const { container, unmount } = await mountComponent(
      <Slide direction="up" show>
        <span>Sliding Content</span>
      </Slide>,
    );
    expect(container.textContent).toContain("Sliding Content");
    await unmount();
  });

  it("renders BlurReveal primitive without throwing", async () => {
    const { container, unmount } = await mountComponent(
      <BlurReveal show>
        <span>Revealed Content</span>
      </BlurReveal>,
    );
    expect(container.textContent).toContain("Revealed Content");
    await unmount();
  });

  it("renders ScrambleDecryption component", async () => {
    const { container, unmount } = await mountComponent(
      <ScrambleDecryption text="OPENUI" autoPlay speedMs={20} />,
    );
    expect(container).toBeDefined();
    await unmount();
  });

  it("renders SpringButton micro-interaction component", async () => {
    const { container, unmount } = await mountComponent(
      <SpringButton>Action Button</SpringButton>,
    );
    expect(container.textContent).toContain("Action Button");
    await unmount();
  });

  it("renders InteractiveDock component", async () => {
    const items = [
      { id: "1", label: "App 1", icon: <span>A</span> },
      { id: "2", label: "App 2", icon: <span>B</span> },
    ];
    const { container, unmount } = await mountComponent(<InteractiveDock items={items} />);
    expect(container).toBeDefined();
    await unmount();
  });

  it("renders BentoGrid and BentoCard", async () => {
    const { container, unmount } = await mountComponent(
      <BentoGrid>
        <BentoCard title="Feature One" description="Description One" badge="New">
          <div>Card Content</div>
        </BentoCard>
      </BentoGrid>,
    );
    expect(container.textContent).toContain("Feature One");
    expect(container.textContent).toContain("Description One");
    expect(container.textContent).toContain("New");
    await unmount();
  });

  it("renders ScrollReveal component safely", async () => {
    const { container, unmount } = await mountComponent(
      <ScrollReveal>
        <span>Scroll Content</span>
      </ScrollReveal>,
    );
    expect(container.textContent).toContain("Scroll Content");
    await unmount();
  });
});
