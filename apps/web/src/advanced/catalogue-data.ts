import type {
  AdvancedCategoryMeta,
  AdvancedCategorySlug,
  AdvancedResourceItem,
  AdvancedTechnology,
  PerformanceTier,
} from "./types.js";
import { generateSourceCode } from "./source-code-generator.js";

export const ADVANCED_CATEGORIES: readonly AdvancedCategoryMeta[] = [
  {
    slug: "heroes",
    title: "Heroes",
    description: "High-impact opening sections featuring kinetic typography, spatial depth, and interactive CTAs.",
    icon: "⚡",
    itemCount: 5,
  },
  {
    slug: "spatial-3d",
    title: "3D / Spatial",
    description: "Three.js and WebGL spatial geometry, wireframe meshes, and particle nebulae with 2D fallbacks.",
    icon: "◈",
    itemCount: 6,
  },
  {
    slug: "backgrounds",
    title: "Backgrounds",
    description: "Algorithmic canvases, harmonic auroras, quantum particles, and topographic contours.",
    icon: "▦",
    itemCount: 57,
  },
  {
    slug: "buttons",
    title: "Buttons",
    description: "Haptic spring buttons, hold-to-confirm triggers, specular liquid shaders, and magnetic fields.",
    icon: "⨀",
    itemCount: 7,
  },
  {
    slug: "text-animations",
    title: "Text Animations",
    description: "Glyph decryption, variable font proximity, sine wave type, and chromatic aberration.",
    icon: "T",
    itemCount: 32,
  },
  {
    slug: "ui-elements",
    title: "UI Elements",
    description: "Parabolic docks, interactive bento grids, tactile sliders, and micro-interface controls.",
    icon: "⌘",
    itemCount: 70,
  },
  {
    slug: "css-layouts",
    title: "CSS & Layouts",
    description: "Glassmorphism acrylic surfaces, conic gradient energy borders, and masked grid patterns.",
    icon: "✧",
    itemCount: 5,
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    description: "Full-scale editorial, spatial hardware, and developer infrastructure page compositions.",
    icon: "▤",
    itemCount: 3,
  },
  {
    slug: "motion-design",
    title: "Motion Design",
    description: "Hardware-pointer trailing, target reticles, elastic meshes, and physics-driven transitions.",
    icon: "〰",
    itemCount: 38,
  },
] as const;

function createItem(
  category: AdvancedCategorySlug,
  slug: string,
  title: string,
  description: string,
  subcategory: string,
  technology: AdvancedTechnology,
  tags: string[],
  previewFamily: string,
  performanceTier: PerformanceTier = "moderate",
): AdvancedResourceItem {
  return {
    id: `adv-${slug}`,
    slug,
    title,
    description,
    category,
    subcategory,
    technology,
    tags,
    dependencies: technology === "three-webgl" ? ["three", "react"] : ["react"],
    fingerprint: {
      visualFamily: "editorial-future",
      motionProfile: technology === "three-webgl" ? "spatial-orbital" : "spring-natural",
      interactionProfile: "pointer-reactive",
      performanceTier,
      accessibilityProfile: "wcag-aa-compliant",
      responsiveProfile: "fluid-viewport-adaptive",
    },
    props: [
      { name: "className", type: "string", description: "Optional Tailwind or custom CSS class" },
      { name: "reducedMotion", type: "boolean", default: "false", description: "Enforces static accessible resting state" },
    ],
    sourceCode: generateSourceCode(category, slug, title, technology),
    previewFamily,
  };
}

// 1. Heroes (5)
const heroes: AdvancedResourceItem[] = [
  createItem("heroes", "kinetic-editorial-hero", "Kinetic Editorial Hero", "High-impact editorial hero with staggered character reveals, kinetic ticker, and magnetic CTA.", "hero", "dom-motion", ["hero", "typography", "editorial"], "hero"),
  createItem("heroes", "spatial-device-hero", "Spatial Device 3D Hero", "Interactive 3D hardware perspective canvas with pointer-driven parallax and lighting.", "hero", "three-webgl", ["hero", "3d", "spatial"], "hero-3d", "high"),
  createItem("heroes", "particle-constellation-hero", "Particle Constellation Hero", "Quantum particle constellation canvas reacting to cursor proximity with title masking.", "hero", "canvas-2d", ["hero", "particles", "canvas"], "hero-particles"),
  createItem("heroes", "asymmetric-split-hero", "Asymmetric Split Interactive Hero", "Swiss grid asymmetric layout with smooth spring image reveal and typographic contrast.", "hero", "css-transforms", ["hero", "asymmetric", "layout"], "hero"),
  createItem("heroes", "bento-spotlight-hero", "Bento Spotlight Hero", "Multi-cell bento showcase hero with radial cursor spotlight tracking and live metrics.", "hero", "spring-physics", ["hero", "bento", "spotlight"], "hero-bento"),
];

// 2. Spatial & 3D (6)
const spatial3D: AdvancedResourceItem[] = [
  createItem("spatial-3d", "interactive-wireframe-globe", "Interactive Wireframe Globe", "Procedural 3D geodesic wireframe globe reacting to drag and cursor velocity.", "3d-scene", "three-webgl", ["3d", "globe", "webgl"], "three-sphere", "high"),
  createItem("spatial-3d", "floating-3d-card-stack", "Floating 3D Card Stack", "Perspective 3D transform card deck with spatial depth layering and fluid spring tilt.", "3d-cards", "css-transforms", ["3d", "cards", "tilt"], "cards-stack"),
  createItem("spatial-3d", "spatial-particle-nebula", "Spatial Particle Nebula", "BufferGeometry 3D point cloud nebula with organic orbital drift and depth falloff.", "particles", "three-webgl", ["3d", "particles", "nebula"], "three-particles", "high"),
  createItem("spatial-3d", "isometric-cubes-scene", "Isometric Cubes Scene", "Interactive isometric matrix of floating volumetric prisms with spring hover oscillation.", "isometric", "three-webgl", ["3d", "isometric", "geometry"], "three-cubes", "high"),
  createItem("spatial-3d", "model-viewer-webgl", "3D Model Viewer WebGL", "Hardware-accelerated viewport with orbit controls, lighting presets, and canvas fallback.", "viewer", "three-webgl", ["3d", "viewer", "orbit"], "three-sphere", "high"),
  createItem("spatial-3d", "dome-gallery-3d", "Dome Gallery 3D", "Spherical dome gallery wrapping items in 3D panoramic space with inertial panning.", "gallery", "three-webgl", ["3d", "gallery", "dome"], "three-sphere", "high"),
];

// 3. Buttons (7)
const buttons: AdvancedResourceItem[] = [
  createItem("buttons", "magnetic-spring-button", "Magnetic Spring Button", "Tactile button drawn towards the pointer within a bounded spring attraction field.", "magnetic", "spring-physics", ["button", "magnetic", "physics"], "button-spring"),
  createItem("buttons", "specular-liquid-button", "Specular Liquid Button", "Reflective specular highlight tracking pointer coordinates across a glossy button face.", "specular", "css-transforms", ["button", "specular", "liquid"], "button-specular"),
  createItem("buttons", "neon-energy-border-button", "Neon Energy Border Button", "Conic gradient light beam tracing the perimeter on hover with haptic scale response.", "energy", "css-transforms", ["button", "border", "energy"], "button-energy"),
  createItem("buttons", "hold-to-confirm-button", "Hold To Confirm Button", "Safety action button requiring continuous hold with circular countdown indicator.", "hold", "dom-motion", ["button", "hold", "confirmation"], "button-hold"),
  createItem("buttons", "rubber-snap-button", "Rubber Snap Button", "Elastic button with exaggerated rubber-band recoil physics on release.", "rubber", "spring-physics", ["button", "rubber", "rebound"], "button-spring"),
  createItem("buttons", "fuse-spark-button", "Fuse Spark Button", "Micro-spark particle emission tracing the button contour upon activation.", "particles", "canvas-2d", ["button", "spark", "fuse"], "button-spring"),
  createItem("buttons", "sling-rebound-button", "Sling Rebound Button", "Directional slingshot drag and spring-loaded return button with velocity transfer.", "gesture", "spring-physics", ["button", "drag", "sling"], "button-spring"),
];

// 4. Text Animations (32)
const textNames = [
  ["text-loop", "Text Loop", "Infinite continuous marquee with variable velocity and hover pause."],
  ["masked-heading", "Masked Heading", "Dynamic gradient and image mask traveling across typographic glyphs."],
  ["particle-text", "Particle Text", "Letters assembled from thousands of magnetic particles that scatter on pointer approach."],
  ["split-flap-text", "Split Flap Text", "Mechanical airport departure board alphanumeric flip animation."],
  ["warp-text", "Warp Text", "Nonlinear spatial wave deformation across letterforms."],
  ["stroke-text", "Stroke Text", "Animated SVG path outline stroke drawing with variable line width."],
  ["depth-text", "Depth Text", "Extruded faux-3D typographic layers with perspective shadow tracking."],
  ["fold-text", "Fold Text", "Origami accordion paper fold reveal for headings and callouts."],
  ["echo-text", "Echo Text", "Cascading ghost trails lagging behind typography during transitions."],
  ["split-text-flow", "Split Text Flow", "Fluid word-by-word staggered reveal with directional velocity."],
  ["blur-text-flow", "Blur Text Flow", "Gaussian blur to razor-sharp typography transition with optical scaling."],
  ["circular-text-orbit", "Circular Text Orbit", "Rotational text orbit along circular and elliptical vector paths."],
  ["text-type-stack", "Text Type Stack", "Typewriter cursor stack with realistic human cadence and deletion."],
  ["shuffle-decrypt", "Shuffle Decrypt", "Cryptographic matrix glyph scrambling settling into plain text."],
  ["shiny-text-sheen", "Shiny Text Sheen", "Prismatic metallic specular sheen passing across typography."],
  ["text-pressure-geo", "Text Pressure Geo", "Proximity-driven variable font weight and optical size scaling."],
  ["curved-loop-ribbon", "Curved Loop Ribbon", "Bezier curve ribbon text scrolling infinitely across 3D coordinates."],
  ["fuzzy-noise-text", "Fuzzy Noise Text", "Perlin noise film grain displacement on typographic silhouettes."],
  ["gradient-contour-text", "Gradient Contour Text", "Multi-stop harmonic gradient contour tracing letter edges."],
  ["falling-physics-text", "Falling Physics Text", "Gravity-bound glyphs tumbling down and resting on floor boundaries."],
  ["text-cursor-follow", "Text Cursor Follow", "Floating label trailing pointer movement with spring latency."],
  ["decrypted-glyph-text", "Decrypted Glyph Text", "Cybernetic glyph reveal decoding character-by-character."],
  ["true-focus-lens", "True Focus Lens", "Variable optical depth-of-field focusing on hovered words."],
  ["lens-magnify-text", "Lens Magnify Text", "Interactive floating magnification lens zooming into high-precision typography."],
  ["scroll-float-type", "Scroll Float Type", "Scroll-velocity driven floating letters with inertia damping."],
  ["scroll-reveal-chars", "Scroll Reveal Chars", "Intersection-triggered individual character fade and slide."],
  ["ascii-render-text", "ASCII Render Text", "Real-time rasterization of imagery and text into ASCII monospace glyphs."],
  ["scrambled-kinetic-text", "Scrambled Kinetic Text", "Fast randomized glyph replacement for high-tech telemetry."],
  ["rotating-axis-text", "Rotating Axis Text", "3D axis rotational flip between multiple text phrases."],
  ["glitch-chromatic-text", "Glitch Chromatic Text", "RGB split chromatic aberration with periodic digital glitch impulses."],
  ["scroll-velocity-skew", "Scroll Velocity Skew", "Kinetic text skewing and stretching proportionally to page scroll velocity."],
  ["variable-proximity-sans", "Variable Proximity Sans", "Font weight and width expanding towards pointer proximity coordinates."],
  ["count-up-roller", "Count Up Roller", "High-precision mechanical digit odometer roller with spring deceleration."],
] as const;

const textAnimations: AdvancedResourceItem[] = textNames.map(([slug, title, desc]) =>
  createItem("text-animations", slug, title, desc, "typography", "dom-motion", ["typography", "text", "kinetic"], "text-anim"),
);

// 5. Motion Design (38)
const motionNames = [
  ["glow-cursor-trail", "Glow Cursor Trail", "Soft radial glow orb smoothly interpolating behind pointer position."],
  ["scroll-expand-card", "Scroll Expand Card", "Container scaling smoothly from card to full-bleed hero on scroll progress."],
  ["ripple-distortion-lens", "Ripple Distortion Lens", "Procedural wave ripple distortion emitting outward from click coordinates."],
  ["elastic-mesh-grid", "Elastic Mesh Grid", "Interactive cloth mesh lattice deforming under pointer drag."],
  ["swarm-cursor-flock", "Swarm Cursor Flock", "Boids flocking algorithm following pointer velocity with spatial cohesion."],
  ["halftone-reveal-mask", "Halftone Reveal Mask", "Dot matrix halftone pattern expanding to reveal masked content."],
  ["pixel-swap-grid", "Pixel Swap Grid", "Retro digital pixel mosaic rearranging between image states."],
  ["cursor-grid-mesh", "Cursor Grid Mesh", "Ambient background grid illuminating cells beneath cursor movement."],
  ["animated-content-fade", "Animated Content Fade", "Orchestrated multi-element cascade with spring transitions."],
  ["fade-content-blur", "Fade Content Blur", "Progressive blur and opacity fade for modal and drawer surfaces."],
  ["electric-border-trace", "Electric Border Trace", "High-frequency plasma spark racing around element borders."],
  ["orbit-images-cluster", "Orbit Images Cluster", "Gravitational planetary orbit of cards around a central focal hub."],
  ["pixel-transition-curtain", "Pixel Transition Curtain", "Dithering pixel curtain wipe between route and view transitions."],
  ["glare-hover-card", "Glare Hover Card", "Holographic foil glare shifting dynamically with device tilt and mouse."],
  ["antigravity-float-mesh", "Antigravity Float Mesh", "Floating cards suspended in zero-gravity space with micro-gyrations."],
  ["logo-loop-ticker", "Logo Loop Ticker", "Infinite dual-direction ticker with velocity control and mask fades."],
  ["target-cursor-reticle", "Target Cursor Reticle", "Minimal tactical crosshair snapping onto interactive hit targets."],
  ["magic-rings-pulsar", "Magic Rings Pulsar", "Expanding concentric shockwave rings radiating from interaction points."],
  ["laser-flow-field", "Laser Flow Field", "Collimated laser beam trajectories refracting through virtual lenses."],
  ["magnet-lines-field", "Magnet Lines Field", "Vector field compass needles aligning with pointer magnetic poles."],
  ["ghost-cursor-lag", "Ghost Cursor Lag", "Delayed ghost silhouette creating ethereal motion blur trails."],
  ["gradual-blur-backdrop", "Gradual Blur Backdrop", "Layered gradient blur backdrop for glassmorphism headers."],
  ["click-spark-burst", "Click Spark Burst", "Physics particle spark burst dissipating on user click."],
  ["magnet-field-pull", "Magnet Field Pull", "Gravitational pull affecting nearby floating UI chips and buttons."],
  ["strands-motion-wave", "Strands Motion Wave", "Harmonic sine strands oscillating with dynamic wind physics."],
  ["sticker-peel-corner", "Sticker Peel Corner", "Realistic 3D paper peel effect curling up from card corners."],
  ["pixel-trail-emitter", "Pixel Trail Emitter", "Decaying 8-bit pixel dust emitting behind moving cursor."],
  ["cubes-matrix-spin", "Cubes Matrix Spin", "3D cube voxel lattice reacting to pointer hover with wave ripple."],
  ["metallic-paint-canvas", "Metallic Paint Canvas", "Liquid mercury metallic surface swirling with mouse turbulence."],
  ["noise-surface-drift", "Noise Surface Drift", "Organic simplex noise displacement simulating topographic flow."],
  ["shape-blur-lens", "Shape Blur Lens", "Variable focal shape masking with backdrop filter refraction."],
  ["crosshair-reticle-aim", "Crosshair Reticle Aim", "Precision coordinate overlay with real-time X/Y telemetry."],
  ["image-trail-cursor", "Image Trail Cursor", "Sequential image burst trail rendered along pointer motion vectors."],
  ["ribbons-flow-field", "Ribbons Flow Field", "Curvilinear 3D ribbons weaving through 3D spatial boundaries."],
  ["splash-cursor-liquid", "Splash Cursor Liquid", "Navier-Stokes fluid dynamics simulation reacting to touch impulses."],
  ["meta-balls-canvas", "Meta Balls Canvas", "Organic liquid metaball blobs coalescing and separating dynamically."],
  ["blob-cursor-physics", "Blob Cursor Physics", "Elastic liquid blob trailing cursor with jelly inertia damping."],
  ["star-border-shimmer", "Star Border Shimmer", "Subtle starlight scintillation traveling along container borders."],
] as const;

const motionDesign: AdvancedResourceItem[] = motionNames.map(([slug, title, desc]) =>
  createItem("motion-design", slug, title, desc, "motion", "dom-motion", ["motion", "animation", "interaction"], "motion-anim"),
);

// 6. UI Elements & Micro (69)
const uiNames = [
  ["infinite-spiral-canvas", "Infinite Spiral Canvas", "Logarithmic spiral gallery zooming infinitely into sub-items."],
  ["depth-carousel-3d", "Depth Carousel 3D", "Cylindrical carousel arranging items with 3D Z-depth perspective."],
  ["morph-slider-path", "Morph Slider Path", "SVG path morphing seamlessly between different state shapes."],
  ["drift-wall-parallax", "Drift Wall Parallax", "Multi-layer infinite masonry wall with inertial pointer drift."],
  ["accordion-gallery-split", "Accordion Gallery Split", "Horizontal split curtain accordion expanding on hover."],
  ["specular-button-lens", "Specular Button Lens", "Fresnel lens reflection button with physical light falloff."],
  ["option-wheel-3d", "Option Wheel 3D", "Tactile mechanical selection wheel with inertia snapping."],
  ["curved-input-field", "Curved Input Field", "Organic input box contouring dynamically to focus state."],
  ["line-sidebar-rail", "Line Sidebar Rail", "Ultralight minimal rail navigation with magnetic hover indicators."],
  ["animated-list-stagger", "Animated List Stagger", "List items entering with staggered spring physics and reorder animation."],
  ["scroll-stack-deck", "Scroll Stack Deck", "Cards pinning and stacking over preceding layers during page scroll."],
  ["bubble-menu-radial", "Bubble Menu Radial", "Radial menu blooming into floating action bubbles on trigger."],
  ["magic-bento-spotlight", "Magic Bento Spotlight", "Bento grid cells illuminated by pointer spotlight with border energy."],
  ["circular-gallery-carousel", "Circular Gallery Carousel", "Rotational 3D circular carousel with focal depth blurring."],
  ["reflective-card-foil", "Reflective Card Foil", "Holographic trading card foil shader reflecting device tilt."],
  ["card-nav-expand", "Card Nav Expand", "Compact navigation card expanding into full modal interface."],
  ["stack-cards-drag", "Stack Cards Drag", "Swipeable stack of notification cards with physics throw and dismiss."],
  ["fluid-glass-surface", "Fluid Glass Surface", "Liquid refraction glass surface distorting underlying background elements."],
  ["pill-nav-float", "Pill Nav Float", "Floating glass pill navigation dock with active sliding pill indicator."],
  ["tilted-card-perspective", "Tilted Card Perspective", "Card tilting toward pointer with multi-layer parallax depth."],
  ["masonry-grid-fluid", "Masonry Grid Fluid", "Pinterest-style fluid responsive column layout with smooth layout transitions."],
  ["glass-surface-acrylic", "Glass Surface Acrylic", "Frosted glass acrylic panel with dynamic chromatic border."],
  ["chroma-grid-fresnel", "Chroma Grid Fresnel", "Color-shifting iridescent grid cells reacting to viewing angle."],
  ["folder-tree-interactive", "Folder Tree Interactive", "Accordion folder tree with spring toggle and file preview badges."],
  ["staggered-menu-cascade", "Staggered Menu Cascade", "Full-screen menu reveal with cascading typographic links."],
  ["lanyard-card-spring", "Lanyard Card Spring", "ID badge card suspended from physics lanyard oscillating on drag."],
  ["profile-card-holo", "Profile Card Holo", "Interactive identity badge with holographic sheen and live stats."],
  ["interactive-dock-magnify", "Interactive Dock Magnify", "macOS-style parabolic magnification dock with Gaussian curve physics."],
  ["gooey-nav-liquid", "Gooey Nav Liquid", "Liquid SVG filter navigation blobs stretching and merging on select."],
  ["pixel-card-retro", "Pixel Card Retro", "Retro aesthetic card with dithered borders and pixel-art hover states."],
  ["kinetic-carousel-swipe", "Kinetic Carousel Swipe", "High-velocity swipeable card carousel with spring snap settling."],
  ["spotlight-card-interactive", "Spotlight Card Interactive", "Cursor spotlight revealing subtle internal border gradients."],
  ["border-glow-card-pulse", "Border Glow Card Pulse", "Ambient luminous halo breathing smoothly around card edges."],
  ["flying-posters-gallery", "Flying Posters Gallery", "Posters flying forward in 3D camera space on scroll."],
  ["card-swap-deck", "Card Swap Deck", "Two cards smoothly swapping Z-order with parabolic trajectory."],
  ["glass-icons-iridescent", "Glass Icons Iridescent", "Translucent 3D glass icon set with internal light refraction."],
  ["decay-card-friction", "Decay Card Friction", "Draggable card with calibrated friction and inertia decay."],
  ["flowing-menu-hover", "Flowing Menu Hover", "Menu items revealing flowing image preview ribbons on hover."],
  ["elastic-slider-rebound", "Elastic Slider Rebound", "Range slider knob with rubber stretch physics when pulled beyond bounds."],
  ["rolling-counter-digits", "Rolling Counter Digits", "Tabular mechanical digit drum rolling to new values."],
  ["infinite-menu-marquee", "Infinite Menu Marquee", "Endless cyclical marquee menu with interactive scrub control."],
  ["stepper-control-tactile", "Stepper Control Tactile", "Numeric incrementer with spring feedback and haptic pulse."],
  ["bounce-cards-stack", "Bounce Cards Stack", "Card stack fanning out in a bouncy spread on cursor entrance."],
  ["branched-menu-tree", "Branched Menu Tree", "Hierarchical tree menu branching with spring line connections."],
  ["folder-float-hover", "Folder Float Hover", "Folder tab elevating with subtle 3D shadow depth on hover."],
  ["refine-frame-slider", "Refine Frame Slider", "Before/after image comparison slider with hairline cursor line."],
  ["thought-line-canvas", "Thought Line Canvas", "Organic generative pencil stroke connecting active thought nodes."],
  ["voice-pill-waveform", "Voice Pill Waveform", "Audio reactive frequency bars pulsating inside a compact pill."],
  ["slosh-gauge-fluid", "Slosh Gauge Fluid", "Liquid battery/volume gauge sloshing with device acceleration."],
  ["prompt-bar-action", "Prompt Bar Action", "Expansible AI prompt input with integrated tool chips and glow."],
  ["swipe-toast-dismiss", "Swipe Toast Dismiss", "Notification toast with natural directional swipe-to-dismiss."],
  ["bell-toggle-ring", "Bell Toggle Ring", "Notification bell swinging on spring hinge when activated."],
  ["call-chip-pulse", "Call Chip Pulse", "Live audio session chip with pulsating status radar aura."],
  ["status-mark-badge", "Status Mark Badge", "Micro status badge transitioning through morphing geometry states."],
  ["glide-select-slider", "Glide Select Slider", "Segmented selection indicator gliding smoothly along tracks."],
  ["swipe-row-actions", "Swipe Row Actions", "Mobile list item sliding left/right to reveal actionable buttons."],
  ["jelly-radio-switch", "Jelly Radio Switch", "Radio button dot morphing through jelly squish on check."],
  ["comet-dial-gauge", "Comet Dial Gauge", "Rotary gauge with luminous comet tail tracing the perimeter."],
  ["wake-slider-drag", "Wake Slider Drag", "Vertical slider displacing fluid wakes as the thumb moves."],
  ["code-slots-reveal", "Code Slots Reveal", "Two-factor authorization slot boxes auto-advancing with bounce."],
  ["dodge-field-pointer", "Dodge Field Pointer", "Interactive button playfully dodging cursor until captured."],
  ["lattice-loader-orbit", "Lattice Loader Orbit", "Geometric orbital rings rotating around a pulsating core."],
  ["scrub-field-timeline", "Scrub Field Timeline", "Audio/video scrubber with micro-waveform preview spikes."],
  ["warm-tooltip-float", "Warm Tooltip Float", "Tooltip blooming smoothly with spring entrance and arrow trace."],
  ["slide-commit-slider", "Slide Commit Slider", "Slide-to-unlock safety slider with particle burst on completion."],
  ["rubber-segment-switch", "Rubber Segment Switch", "Toggle control with rubbery rebound between segmented states."],
  ["pulse-heart-micro", "Pulse Heart Micro", "Like button bursting with micro-particles and spring scale."],
  ["spring-check-box", "Spring Check Box", "Checkbox checkmark drawn with spring recoil dynamics."],
  ["peek-rating-stars", "Peek Rating Stars", "Rating stars reacting with anticipatory bounce on hover."],
  ["squish-switch-toggle", "Squish Switch Toggle", "Tactile toggle switch squishing down during click state."],
] as const;

const uiElements: AdvancedResourceItem[] = uiNames.map(([slug, title, desc]) =>
  createItem("ui-elements", slug, title, desc, "interface", "spring-physics", ["ui", "component", "interactive"], "ui-component"),
);

// 7. Backgrounds (58)
const bgNames = [
  ["shape-waves-canvas", "Shape Waves Canvas", "Harmonic geometric wave contours rolling smoothly across viewport."],
  ["aero-shards-svg", "Aero Shards SVG", "Angular translucent aerodynamic shards drifting in parallax layers."],
  ["ghost-fibers-stream", "Ghost Fibers Stream", "Fiber-optic filament lines undulating in subtle ambient winds."],
  ["crt-warp-scanline", "CRT Warp Scanline", "Retro cathode-ray tube phosphor curve with faint scanline hum."],
  ["molten-metal-flow", "Molten Metal Flow", "Liquid chrome metallic currents rippling with pointer friction."],
  ["gradient-waves-sine", "Gradient Waves Sine", "Superimposed sine waves blending smooth gradient color bands."],
  ["web-threads-mesh", "Web Threads Mesh", "Triangulated network lattice connecting nodes within proximity."],
  ["topography-contour-lines", "Topography Contour Lines", "Topographic elevation map lines breathing with Perlin noise."],
  ["light-tunnel-3d", "Light Tunnel 3D", "Infinite perspective light speed tunnel warping toward center."],
  ["sliced-waves-depth", "Sliced Waves Depth", "Offset strata of undulating waves creating holographic depth."],
  ["acid-squares-grid", "Acid Squares Grid", "Fluorescent grid blocks pulsating with rhythmic phase shifts."],
  ["beam-scanner-laser", "Beam Scanner Laser", "Horizontal laser telemetry scanner sweeping across a dark grid."],
  ["ferrofluid-pool-liquid", "Ferrofluid Pool Liquid", "Magnetic ferrofluid spikes dancing to virtual magnetic impulses."],
  ["lightfall-stream", "Lightfall Stream", "Luminous digital rain droplets falling with varied depth velocities."],
  ["liquid-ether-canvas", "Liquid Ether Canvas", "Ethereal smoke diffusion blending soft ambient color clouds."],
  ["prism-refract-color", "Prism Refract Color", "Rainbow optical refraction splitting light rays across dark paper."],
  ["dark-veil-mesh", "Dark Veil Mesh", "Translucent dark fabric undulating with slow wind simulation."],
  ["light-pillar-ambient", "Light Pillar Ambient", "Volumetric light columns ascending gently from the bottom horizon."],
  ["silk-flow-harmonic", "Silk Flow Harmonic", "Liquid silk textile folds shifting in low-gravity waves."],
  ["floating-lines-vector", "Floating Lines Vector", "Mathematical bezier curves drifting with Brownian motion."],
  ["side-rays-ambient", "Side Rays Ambient", "Atmospheric sunbeams piercing through the left edge of the screen."],
  ["light-rays-shimmer", "Light Rays Shimmer", "Crepuscular rays shimmering through virtual fog layers."],
  ["pixel-blast-canvas", "Pixel Blast Canvas", "Chaotic digital pixel particle dispersion bursting across view."],
  ["color-bends-flow", "Color Bends Flow", "Chromatic ribbon currents bending and folding around cursor position."],
  ["evil-eye-geometry", "Evil Eye Geometry", "Concentric hypnotic sacred geometry rings rotating in counter-phase."],
  ["line-waves-procedural", "Line Waves Procedural", "Mathematical wireframe landscape oscillating with frequency modulation."],
  ["radar-sweep-tactical", "Radar Sweep Tactical", "Aviation radar sweep beam highlighting coordinate blips."],
  ["soft-aurora-glow", "Soft Aurora Glow", "Gentle Northern lights ribbons floating across dark night sky."],
  ["aurora-sky-harmonic", "Aurora Sky Harmonic", "Multi-octave atmospheric curtains undulating with dynamic hues."],
  ["plasma-field-fluid", "Plasma Field Fluid", "Classic demoscene plasma field calculated in high-speed 2D canvas."],
  ["plasma-wave-energy", "Plasma Wave Energy", "High-energy electrical waves pulsing through luminous conduits."],
  ["particles-lattice-quantum", "Particles Lattice Quantum", "Grid of interactive quantum particles reacting to pointer repulsion."],
  ["gradient-blinds-slats", "Gradient Blinds Slats", "Venetian blind slats rotating to reveal alternating gradient angles."],
  ["grainient-mesh-noise", "Grainient Mesh Noise", "Micro-textured color gradient mesh with analog film grain."],
  ["grid-scan-matrix", "Grid Scan Matrix", "Orthogonal matrix scanning lines with illuminated intersection nodes."],
  ["energy-beams-glow", "Energy Beams Glow", "Radiant neon energy beams intersecting at dynamic angles."],
  ["pixel-snow-ambient", "Pixel Snow Ambient", "Stylized retro square snowflake particles drifting downward."],
  ["lightning-bolt-canvas", "Lightning Bolt Canvas", "Procedural electrical branch discharge illuminating the canvas."],
  ["prismatic-burst-radial", "Prismatic Burst Radial", "Kaleidoscopic radial prism burst refracting brilliant spectral hues."],
  ["galaxy-spiral-points", "Galaxy Spiral Points", "Logarithmic spiral galaxy with thousands of orbiting star nodes."],
  ["dither-matrix-retro", "Dither Matrix Retro", "Ordered Bayer dithering shader reproducing 1-bit vintage display aesthetics."],
  ["faulty-terminal-flicker", "Faulty Terminal Flicker", "Glitching phosphor display with occasional horizontal sync loss."],
  ["ripple-grid-impulse", "Ripple Grid Impulse", "Grid vertices bouncing in harmonic ripples from cursor interaction."],
  ["dot-field-interactive", "Dot Field Interactive", "Matrix of micro-dots scaling and repelling from pointer coordinates."],
  ["dot-grid-canvas-rhythm", "Dot Grid Canvas Rhythm", "Precision dotted grid undulating in rhythmic spatial waves."],
  ["harmonic-threads-flow", "Harmonic Threads Flow", "Tensile thread lines vibrating at natural harmonic frequencies."],
  ["hyperspeed-tunnel-warp", "Hyperspeed Tunnel Warp", "Starfield streaks stretching into warp speed trails."],
  ["iridescence-sheen-fresnel", "Iridescence Sheen Fresnel", "Soap-bubble thin-film interference sheen shifting on movement."],
  ["sine-waves-smooth", "Sine Waves Smooth", "Clean trigonometric sine curves crossing in calm mathematical harmony."],
  ["grid-distortion-pointer", "Grid Distortion Pointer", "Rubber-sheet spatial grid warping around cursor mass."],
  ["ballpit-physics-2d", "Ballpit Physics 2D", "Rigid body physics simulation of colored balls bouncing in container."],
  ["energy-orb-glow", "Energy Orb Glow", "Pulsating plasma orb emitting luminous corona filaments."],
  ["letter-glitch-stream", "Letter Glitch Stream", "Matrix-style vertical stream of cryptographic characters."],
  ["grid-motion-pan", "Grid Motion Pan", "Isometric infinite grid panning smoothly across infinite space."],
  ["shape-grid-cells", "Shape Grid Cells", "Modular grid cells cycling through geometric shape transformations."],
  ["liquid-chrome-fluid", "Liquid Chrome Fluid", "Viscous metallic fluid reacting to mouse drag turbulence."],
  ["balatro-shader-moire", "Balatro Shader Moire", "Psychedelic swirling hypnotic moire wave pattern."],
] as const;

const backgrounds: AdvancedResourceItem[] = bgNames.map(([slug, title, desc]) =>
  createItem("backgrounds", slug, title, desc, "background", "canvas-2d", ["background", "procedural", "canvas"], "bg-canvas"),
);

// 8. CSS & Layouts (5)
const cssLayouts: AdvancedResourceItem[] = [
  createItem("css-layouts", "glassmorphism-surface", "Glassmorphism Dynamic Surface", "Layered frosted glass acrylic with edge light refraction and backdrop filter.", "surface", "css-transforms", ["css", "glassmorphism", "surface"], "css-glass"),
  createItem("css-layouts", "conic-energy-border", "Conic Gradient Energy Border", "Continuous rotating conic gradient border highlight powered by pure CSS.", "border", "css-transforms", ["css", "border", "gradient"], "css-border"),
  createItem("css-layouts", "grid-pattern-mask", "Masked Radial Grid Background", "Radial vignette gradient mask over micro-grid pattern for focused content areas.", "mask", "css-transforms", ["css", "grid", "mask"], "css-grid"),
  createItem("css-layouts", "squircle-container", "Squircle Geometric Container", "Apple-style superellipse continuous curvature border radius with CSS houdini fallback.", "geometry", "css-transforms", ["css", "squircle", "geometry"], "css-squircle"),
  createItem("css-layouts", "chromatic-glitch-css", "CSS Chromatic Glitch", "Pure CSS pseudo-element color split aberration with animated keyframe shifts.", "glitch", "css-transforms", ["css", "glitch", "animation"], "css-glitch"),
];

// 9. Landing Pages (3)
const landingPages: AdvancedResourceItem[] = [
  createItem("landing-pages", "studio-minimal-landing", "Studio Minimal Kinetic Landing", "Complete editorial portfolio landing page with kinetic typography and bento showcase.", "page", "dom-motion", ["landing", "template", "editorial"], "landing-page"),
  createItem("landing-pages", "spatial-hardware-landing", "Spatial Hardware 3D Landing", "Hardware launch page with 3D product turntable and interactive feature hotspots.", "page", "three-webgl", ["landing", "3d", "hardware"], "landing-3d", "high"),
  createItem("landing-pages", "developer-infra-landing", "Developer Platform Landing", "High-density technical infrastructure landing page with live terminal and telemetry.", "page", "dom-motion", ["landing", "developer", "infra"], "landing-page"),
];

export const ADVANCED_RESOURCES: readonly AdvancedResourceItem[] = [
  ...heroes,
  ...spatial3D,
  ...buttons,
  ...textAnimations,
  ...motionDesign,
  ...uiElements,
  ...backgrounds,
  ...cssLayouts,
  ...landingPages,
];

export function getAdvancedItemBySlug(slug: string): AdvancedResourceItem | undefined {
  return ADVANCED_RESOURCES.find((item) => item.slug === slug);
}

export function getAdvancedItemsByCategory(category: AdvancedCategorySlug): AdvancedResourceItem[] {
  return ADVANCED_RESOURCES.filter((item) => item.category === category);
}
