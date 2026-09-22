/**
 * OpenUI Visual Engine
 *
 * Centralized export for motion, text, cursor, hover, scroll, micro-interactions,
 * procedural backgrounds, 3D/WebGL scenes, and performance utilities.
 */

// Core
export * from "./core/types.js";
export * from "./core/tokens.js";
export * from "./core/device.js";
export * from "./core/error-boundary.js";

// Motion
export * from "./motion/spring-physics.js";
export * from "./motion/use-motion.js";
export * from "./motion/motion-primitives.js";

// Text
export * from "./text/text-reveals.js";
export * from "./text/scramble-decrypt.js";
export * from "./text/kinetic-type.js";
export * from "./text/variable-font.js";
export * from "./text/split-flap.js";
export * from "./text/particle-text.js";
export * from "./text/count-roller.js";
export * from "./text/true-focus.js";

// Cursor
export * from "./cursor/cursor-provider.js";
export * from "./cursor/glow-cursor.js";

// Hover
export * from "./hover/magnetic-hover.js";
export * from "./hover/surface-hover.js";

// Scroll
export * from "./scroll/scroll-observer.js";
export * from "./scroll/scroll-primitives.js";

// Micro-interactions
export * from "./micro/buttons.js";
export * from "./micro/toggles.js";
export * from "./micro/slosh-gauge.js";
export * from "./micro/voice-waveform.js";
export * from "./micro/rubber-button.js";
export * from "./micro/specular-liquid-button.js";
export * from "./micro/tactile-jelly-toggle.js";
export * from "./micro/slide-commit.js";

// Backgrounds
export * from "./backgrounds/procedural-canvas.js";
export * from "./backgrounds/aurora-field.js";
export * from "./backgrounds/particle-field.js";
export * from "./backgrounds/noise-waves.js";
export * from "./backgrounds/hyperspeed-tunnel.js";
export * from "./backgrounds/balatro-shader.js";
export * from "./backgrounds/matrix-terminal.js";
export * from "./backgrounds/tactical-radar.js";
export * from "./backgrounds/lightning-canvas.js";
export * from "./backgrounds/ballpit-canvas.js";
export * from "./backgrounds/quantum-lattice.js";
export * from "./backgrounds/magnet-needles.js";
export * from "./backgrounds/laser-flow.js";
export * from "./backgrounds/click-spark.js";
export * from "./backgrounds/swarm-flock.js";
export * from "./backgrounds/halftone-mask.js";
export * from "./backgrounds/elastic-mesh.js";
export * from "./backgrounds/ripple-distortion.js";

// Three.js / WebGL
export * from "./three/three-canvas.js";
export * from "./three/interactive-sphere.js";
export * from "./three/particle-universe.js";
export * from "./three/isometric-cubes.js";
export * from "./three/model-viewer.js";
export * from "./three/dome-gallery.js";
export * from "./three/spatial-device.js";
export * from "./three/particle-nebula.js";

// Advanced Components & Live Previews
export * from "./components/interactive-dock.js";
export * from "./components/bento-grid.js";
export * from "./components/animated-counter.js";
export * from "./components/kinetic-editorial-preview.js";
export * from "./components/asymmetric-split-preview.js";
export * from "./components/bento-spotlight-preview.js";
export * from "./components/particle-constellation-hero-preview.js";
export * from "./components/landing-previews.js";
export * from "./text/all-text-previews.js";
export * from "./micro/all-ui-previews.js";
export * from "./motion/all-motion-previews.js";
export * from "./backgrounds/all-background-previews.js";
export { LensMagnifyTextPreview } from "./catalogue-previews.js";

