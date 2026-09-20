import * as React from "react";
import type { AdvancedResourceItem } from "../types.js";
import {
  // 3D / WebGL
  InteractiveSphere,
  ParticleUniverse,
  IsometricCubes,
  ModelViewer,
  DomeGallery,
  SpatialDevice,
  ParticleNebula,
  WebGLErrorBoundary,

  // Backgrounds & Canvas
  ProceduralCanvas,
  AuroraField,
  ParticleField,
  TopographicWaves,
  HyperspeedTunnel,
  BalatroShader,
  MatrixTerminal,
  TacticalRadar,
  LightningCanvas,
  BallpitCanvas,
  QuantumLattice,
  MagnetNeedles,
  LaserFlow,
  ClickSpark,
  SwarmFlock,
  HalftoneMask,
  ElasticMesh,
  RippleDistortion,

  // Text Animations
  SplitFlap,
  ParticleText,
  CountRoller,
  TrueFocus,
  ScrambleDecryption,
  WordReveal,
  GlitchType,
  TextWave,

  // Micro-interactions & Buttons
  SpringButton,
  HoldActionButton,
  BorderEnergy,
  RubberButton,
  SpecularLiquidButton,
  TactileJellyToggle,
  SlideCommit,
  SloshGauge,
  VoiceWaveform,

  // Live Hero & Landing Previews
  KineticEditorialPreview,
  AsymmetricSplitPreview,
  BentoSpotlightPreview,
  ParticleConstellationHeroPreview,
  StudioMinimalLandingPreview,
  SpatialHardwareLandingPreview,
  DeveloperInfraLandingPreview,

  // UI Components
  InteractiveDock,
  SpotlightCard,
  useReducedMotion,

  // Text Previews
  TextLoopPreview,
  MaskedHeadingPreview,
  WarpTextPreview,
  StrokeTextPreview,
  DepthTextPreview,
  FoldTextPreview,
  EchoTextPreview,
  SplitTextFlowPreview,
  BlurTextFlowPreview,
  CircularTextOrbitPreview,
  TextTypeStackPreview,
  ShinyTextSheenPreview,
  TextPressureGeoPreview,
  CurvedLoopRibbonPreview,
  FuzzyNoiseTextPreview,
  GradientContourTextPreview,
  FallingPhysicsTextPreview,
  TextCursorFollowPreview,
  DecryptedGlyphTextPreview,
  ScrollFloatTypePreview,
  ScrollRevealCharsPreview,
  AsciiRenderTextPreview,
  ScrambledKineticTextPreview,
  RotatingAxisTextPreview,
  ScrollVelocitySkewPreview,
  VariableProximitySansPreview,
  LensMagnifyTextPreview,

  // UI Previews
  InfiniteSpiralPreview,
  DepthCarousel3DPreview,
  MorphSliderPathPreview,
  DriftWallParallaxPreview,
  AccordionGallerySplitPreview,
  SpecularButtonLensPreview,
  OptionWheel3DPreview,
  CurvedInputFieldPreview,
  LineSidebarRailPreview,
  AnimatedListStaggerPreview,
  ScrollStackDeckPreview,
  BubbleMenuRadialPreview,
  ReflectiveCardFoilPreview,
  PillNavFloatPreview,
  TiltedCardPerspectivePreview,
  BellToggleRingPreview,
  CallChipPulsePreview,
  StatusMarkBadgePreview,
  GlideSelectSliderPreview,
  PulseHeartMicroPreview,
  SpringCheckBoxPreview,
  PeekRatingStarsPreview,
  MagicBentoSpotlightPreview,
  CircularGalleryCarouselPreview,
  CardNavExpandPreview,
  StackCardsDragPreview,
  FluidGlassSurfacePreview,
  MasonryGridFluidPreview,
  GlassSurfaceAcrylicPreview,
  ChromaGridFresnelPreview,
  FolderTreeInteractivePreview,
  StaggeredMenuCascadePreview,
  LanyardCardSpringPreview,
  ProfileCardHoloPreview,
  GooeyNavLiquidPreview,
  PixelCardRetroPreview,
  KineticCarouselSwipePreview,
  SpotlightCardInteractivePreview,
  BorderGlowCardPulsePreview,
  FlyingPostersGalleryPreview,
  CardSwapDeckPreview,
  GlassIconsIridescentPreview,
  DecayCardFrictionPreview,
  FlowingMenuHoverPreview,
  ElasticSliderReboundPreview,
  InfiniteMenuMarqueePreview,
  StepperControlTactilePreview,
  BounceCardsStackPreview,
  BranchedMenuTreePreview,
  FolderFloatHoverPreview,
  RefineFrameSliderPreview,
  ThoughtLineCanvasPreview,
  PromptBarActionPreview,
  SwipeToastDismissPreview,
  SwipeRowActionsPreview,
  CometDialGaugePreview,
  WakeSliderDragPreview,
  CodeSlotsRevealPreview,
  DodgeFieldPointerPreview,
  LatticeLoaderOrbitPreview,
  ScrubFieldTimelinePreview,
  WarmTooltipFloatPreview,

  // Motion Previews
  GlowCursorTrailPreview,
  ScrollExpandCardPreview,
  RippleDistortionLensPreview,
  ElasticMeshGridPreview,
  SwarmCursorFlockPreview,
  HalftoneRevealMaskPreview,
  PixelSwapGridPreview,
  CursorGridMeshPreview,
  AnimatedContentFadePreview,
  FadeContentBlurPreview,
  ElectricBorderTracePreview,
  OrbitImagesClusterPreview,
  PixelTransitionCurtainPreview,
  GlareHoverCardPreview,
  AntigravityFloatMeshPreview,
  LogoLoopTickerPreview,
  TargetCursorReticlePreview,
  MagicRingsPulsarPreview,
  LaserFlowFieldPreview,
  MagnetLinesFieldPreview,
  GhostCursorLagPreview,
  GradualBlurBackdropPreview,
  ClickSparkBurstPreview,
  MagnetFieldPullPreview,
  StrandsMotionWavePreview,
  StickerPeelCornerPreview,
  PixelTrailEmitterPreview,
  CubesMatrixSpinPreview,
  MetallicPaintCanvasPreview,
  NoiseSurfaceDriftPreview,
  ShapeBlurLensPreview,
  CrosshairReticleAimPreview,
  ImageTrailCursorPreview,
  RibbonsFlowFieldPreview,
  SplashCursorLiquidPreview,
  MetaBallsCanvasPreview,
  BlobCursorPhysicsPreview,
  StarBorderShimmerPreview,

  // Background Previews
  ShapeWavesCanvasPreview,
  AeroShardsSvgPreview,
  GhostFibersStreamPreview,
  MoltenMetalFlowPreview,
  GradientWavesSinePreview,
  SlicedWavesDepthPreview,
  LightfallStreamPreview,
  LiquidEtherCanvasPreview,
  LightPillarAmbientPreview,
  SilkFlowHarmonicPreview,
  FloatingLinesVectorPreview,
  SideRaysAmbientPreview,
  LightRaysShimmerPreview,
  ColorBendsFlowPreview,
  EvilEyeGeometryPreview,
  LineWavesProceduralPreview,
  GradientBlindsSlatsPreview,
  GalaxySpiralPointsPreview,
  IridescenceSheenFresnelPreview,
  SineWavesSmoothPreview,
  GridDistortionPointerPreview,
  GridMotionPanPreview,
  ShapeGridCellsPreview,
  LiquidChromeFluidPreview,
} from "../../visual-engine/index.js";

export interface AdvancedPreviewProps {
  item: AdvancedResourceItem;
  className?: string;
  interactive?: boolean;
  reducedMotion?: boolean;
}

export function AdvancedPreview({
  item,
  className = "",
  interactive = true,
  reducedMotion: propReducedMotion,
}: AdvancedPreviewProps): React.JSX.Element {
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = propReducedMotion ?? systemReducedMotion;

  return (
    <div
      className={`relative w-full h-full min-h-[190px] flex items-center justify-center overflow-hidden select-none bg-paper/50 ${className}`}
      data-preview-family={item.previewFamily}
      data-technology={item.technology}
      data-slug={item.slug}
    >
      {renderItemPreview(item, interactive, reducedMotion)}
    </div>
  );
}

function renderItemPreview(
  item: AdvancedResourceItem,
  interactive: boolean,
  reducedMotion: boolean,
): React.JSX.Element {
  const slug = item.slug;
  const category = item.category;

  // -------------------------------------------------------------
  // 1. HEROES (5) — All 100% Unique Dedicated Dynamic Previews
  // -------------------------------------------------------------
  if (category === "heroes") {
    switch (slug) {
      case "kinetic-editorial-hero":
        return <KineticEditorialPreview />;
      case "spatial-device-hero":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <SpatialDevice className="w-full h-full min-h-[190px]" />
          </WebGLErrorBoundary>
        );
      case "particle-constellation-hero":
        return <ParticleConstellationHeroPreview />;
      case "asymmetric-split-hero":
        return <AsymmetricSplitPreview />;
      case "bento-spotlight-hero":
        return <BentoSpotlightPreview />;
    }
  }

  // -------------------------------------------------------------
  // 2. 3D / SPATIAL (6) — All 100% Unique 3D Scenes
  // -------------------------------------------------------------
  if (category === "spatial-3d") {
    switch (slug) {
      case "interactive-wireframe-globe":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <InteractiveSphere radius={1.4} wireframe={true} color="#ba442c" />
          </WebGLErrorBoundary>
        );
      case "floating-3d-card-stack":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <DomeGallery itemCount={6} radius={2.8} />
          </WebGLErrorBoundary>
        );
      case "spatial-particle-nebula":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <ParticleNebula particleCount={700} />
          </WebGLErrorBoundary>
        );
      case "isometric-cubes-scene":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <IsometricCubes gridSize={4} />
          </WebGLErrorBoundary>
        );
      case "model-viewer-webgl":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <ModelViewer geometryType="torusKnot" color="#ba442c" metalness={0.88} roughness={0.16} />
          </WebGLErrorBoundary>
        );
      case "dome-gallery-3d":
        return (
          <WebGLErrorBoundary fallback={<StaticFallback item={item} />}>
            <DomeGallery itemCount={8} radius={3.2} />
          </WebGLErrorBoundary>
        );
    }
  }

  // -------------------------------------------------------------
  // 3. BUTTONS (7) — Unique Tactile & Physics Mechanics
  // -------------------------------------------------------------
  if (category === "buttons") {
    switch (slug) {
      case "magnetic-spring-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <SpringButton className="px-6 py-3 bg-ink text-paper text-xs font-mono tracking-wider uppercase rounded-xl shadow-md">
              {item.title}
            </SpringButton>
            <span className="text-[9px] font-mono text-graphite">Magnetic attraction to cursor</span>
          </div>
        );
      case "specular-liquid-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <SpecularLiquidButton label={item.title} />
            <span className="text-[9px] font-mono text-graphite">Pointer angle highlight</span>
          </div>
        );
      case "neon-energy-border-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="p-1">
              <BorderEnergy className="rounded-xl">
                <button className="px-6 py-3 bg-surface text-ink text-xs font-mono tracking-wider uppercase font-semibold rounded-xl">
                  {item.title}
                </button>
              </BorderEnergy>
            </div>
            <span className="text-[9px] font-mono text-graphite">Active conic laser trace</span>
          </div>
        );
      case "hold-to-confirm-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <HoldActionButton
              holdDurationMs={1500}
              actionLabel={item.title}
              onHoldComplete={() => console.log("Confirmed")}
              className="px-6 py-3 bg-ink text-paper text-xs font-mono tracking-wider uppercase rounded-xl shadow-md"
            />
            <span className="text-[9px] font-mono text-graphite">Press & hold for 1.5s</span>
          </div>
        );
      case "rubber-snap-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <RubberButton label={item.title} />
            <span className="text-[9px] font-mono text-graphite">Click for elastic jelly snap</span>
          </div>
        );
      case "fuse-spark-button":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <ClickSpark sparkColor="#f59e0b" className="absolute inset-0 z-0" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <button className="px-6 py-3 bg-ink text-paper text-xs font-mono tracking-wider uppercase font-semibold rounded-xl shadow-md">
                🔥 {item.title}
              </button>
              <span className="text-[9px] font-mono text-graphite">Click to emit sparks</span>
            </div>
          </div>
        );
      case "sling-rebound-button":
        return (
          <div className="flex flex-col items-center gap-2">
            <SlideCommit label={item.title} />
            <span className="text-[9px] font-mono text-graphite">Drag thumb to release</span>
          </div>
        );
    }
  }

  // -------------------------------------------------------------
  // 4. LANDING PAGES (3) — Complete Mini-Landing Experiences
  // -------------------------------------------------------------
  if (category === "landing-pages") {
    switch (slug) {
      case "studio-minimal-landing":
        return <StudioMinimalLandingPreview />;
      case "spatial-hardware-landing":
        return <SpatialHardwareLandingPreview />;
      case "developer-infra-landing":
        return <DeveloperInfraLandingPreview />;
    }
  }

  // -------------------------------------------------------------
  // 5. CSS & LAYOUTS (5) — Pure CSS Dynamic Visualizers
  // -------------------------------------------------------------
  if (category === "css-layouts") {
    switch (slug) {
      case "glassmorphism-surface":
        return (
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-oxide/30 via-slate-900 to-indigo-950 p-4">
            <div className="w-48 p-4 rounded-xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-lg text-center select-none">
              <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">Frosted Acrylic</span>
              <p className="mt-1 font-display font-bold text-sm text-white">Glassmorphism</p>
            </div>
          </div>
        );
      case "conic-energy-border":
        return (
          <div className="relative p-[2px] rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#ba442c,#38bdf8,#ba442c)] animate-spin" />
            <div className="relative px-6 py-3 rounded-[10px] bg-paper text-ink font-mono text-xs font-bold uppercase tracking-wider">
              Conic Energy Border
            </div>
          </div>
        );
      case "grid-pattern-mask":
        return (
          <div className="w-full h-full relative flex items-center justify-center bg-[#090b10]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            <span className="relative z-10 font-mono text-xs text-sky-400 uppercase font-bold tracking-widest">
              GRID PATTERN MASK
            </span>
          </div>
        );
      case "squircle-container":
        return (
          <div className="w-32 h-32 bg-ink text-paper flex flex-col items-center justify-center [clip-path:inset(0_round_26px)] shadow-md select-none">
            <span className="font-display font-bold text-sm">Squircle</span>
            <span className="font-mono text-[9px] text-graphite uppercase mt-1">Superellipse</span>
          </div>
        );
      case "chromatic-glitch-css":
        return (
          <div className="text-center font-display font-black text-2xl text-ink tracking-tight select-none">
            <span className="text-red-500 drop-shadow-[2px_0_0_rgba(0,255,255,0.8)]">CHROMATIC</span>
            <br />
            <span className="text-cyan-400 drop-shadow-[-2px_0_0_rgba(255,0,0,0.8)]">GLITCH</span>
          </div>
        );
    }
  }

  // -------------------------------------------------------------
  // 6. TEXT ANIMATIONS (32) — Specialized Typographic Engines
  // -------------------------------------------------------------
  if (category === "text-animations") {
    switch (slug) {
      case "text-loop":
        return <TextLoopPreview title={item.title} />;
      case "masked-heading":
        return <MaskedHeadingPreview />;
      case "particle-text":
        return <ParticleText text="UNIQUE" />;
      case "split-flap-text":
        return <SplitFlap words={["OPENUI", "MOTION", "DESIGN", "FUTURE"]} />;
      case "warp-text":
        return <WarpTextPreview />;
      case "stroke-text":
        return <StrokeTextPreview />;
      case "depth-text":
        return <DepthTextPreview />;
      case "fold-text":
        return <FoldTextPreview />;
      case "echo-text":
        return <EchoTextPreview />;
      case "split-text-flow":
        return <SplitTextFlowPreview />;
      case "blur-text-flow":
        return <BlurTextFlowPreview />;
      case "circular-text-orbit":
        return <CircularTextOrbitPreview />;
      case "text-type-stack":
        return <TextTypeStackPreview />;
      case "shuffle-decrypt":
        return <ScrambleDecryption text="CYBERNETIC_TELEMETRY" speedMs={30} />;
      case "shiny-text-sheen":
        return <ShinyTextSheenPreview />;
      case "text-pressure-geo":
        return <TextPressureGeoPreview />;
      case "curved-loop-ribbon":
        return <CurvedLoopRibbonPreview />;
      case "fuzzy-noise-text":
        return <FuzzyNoiseTextPreview />;
      case "gradient-contour-text":
        return <GradientContourTextPreview />;
      case "falling-physics-text":
        return <FallingPhysicsTextPreview />;
      case "text-cursor-follow":
        return <TextCursorFollowPreview />;
      case "decrypted-glyph-text":
        return <DecryptedGlyphTextPreview />;
      case "true-focus-lens":
        return <TrueFocus sentence="DYNAMIC MOTION WITH OPTICAL FOCUS" />;
      case "lens-magnify-text":
        return <LensMagnifyTextPreview />;
      case "scroll-float-type":
        return <ScrollFloatTypePreview />;
      case "scroll-reveal-chars":
        return <ScrollRevealCharsPreview />;
      case "ascii-render-text":
        return <AsciiRenderTextPreview />;
      case "scrambled-kinetic-text":
        return <ScrambledKineticTextPreview />;
      case "rotating-axis-text":
        return <RotatingAxisTextPreview />;
      case "glitch-chromatic-text":
        return <GlitchType text="CHROMATIC GLITCH" className="text-2xl font-display font-bold text-ink" />;
      case "scroll-velocity-skew":
        return <ScrollVelocitySkewPreview />;
      case "variable-proximity-sans":
        return <VariableProximitySansPreview />;
      case "count-up-roller":
        return <CountRoller targetNumber={9824} />;
      default:
        return <WordReveal text={item.title} className="text-xl font-display font-semibold text-ink tracking-tight" />;
    }
  }

  // -------------------------------------------------------------
  // 7. MOTION DESIGN (38) — Live Canvas & Physics Simulations
  // -------------------------------------------------------------
  if (category === "motion-design") {
    switch (slug) {
      case "glow-cursor-trail":
        return <GlowCursorTrailPreview />;
      case "scroll-expand-card":
        return <ScrollExpandCardPreview />;
      case "ripple-distortion-lens":
        return <RippleDistortionLensPreview />;
      case "elastic-mesh-grid":
        return <ElasticMeshGridPreview />;
      case "swarm-cursor-flock":
        return <SwarmCursorFlockPreview />;
      case "halftone-reveal-mask":
        return <HalftoneRevealMaskPreview />;
      case "pixel-swap-grid":
        return <PixelSwapGridPreview />;
      case "cursor-grid-mesh":
        return <CursorGridMeshPreview />;
      case "animated-content-fade":
        return <AnimatedContentFadePreview />;
      case "fade-content-blur":
        return <FadeContentBlurPreview />;
      case "electric-border-trace":
        return <ElectricBorderTracePreview />;
      case "orbit-images-cluster":
        return <OrbitImagesClusterPreview />;
      case "pixel-transition-curtain":
        return <PixelTransitionCurtainPreview />;
      case "glare-hover-card":
        return <GlareHoverCardPreview />;
      case "antigravity-float-mesh":
        return <AntigravityFloatMeshPreview />;
      case "logo-loop-ticker":
        return <LogoLoopTickerPreview />;
      case "target-cursor-reticle":
        return <TargetCursorReticlePreview />;
      case "magic-rings-pulsar":
        return <MagicRingsPulsarPreview />;
      case "laser-flow-field":
        return <LaserFlowFieldPreview />;
      case "magnet-lines-field":
        return <MagnetLinesFieldPreview />;
      case "ghost-cursor-lag":
        return <GhostCursorLagPreview />;
      case "gradual-blur-backdrop":
        return <GradualBlurBackdropPreview />;
      case "click-spark-burst":
        return <ClickSparkBurstPreview />;
      case "magnet-field-pull":
        return <MagnetFieldPullPreview />;
      case "strands-motion-wave":
        return <StrandsMotionWavePreview />;
      case "sticker-peel-corner":
        return <StickerPeelCornerPreview />;
      case "pixel-trail-emitter":
        return <PixelTrailEmitterPreview />;
      case "cubes-matrix-spin":
        return <CubesMatrixSpinPreview />;
      case "metallic-paint-canvas":
        return <MetallicPaintCanvasPreview />;
      case "noise-surface-drift":
        return <NoiseSurfaceDriftPreview />;
      case "shape-blur-lens":
        return <ShapeBlurLensPreview />;
      case "crosshair-reticle-aim":
        return <CrosshairReticleAimPreview />;
      case "image-trail-cursor":
        return <ImageTrailCursorPreview />;
      case "ribbons-flow-field":
        return <RibbonsFlowFieldPreview />;
      case "splash-cursor-liquid":
        return <SplashCursorLiquidPreview />;
      case "meta-balls-canvas":
        return <MetaBallsCanvasPreview />;
      case "blob-cursor-physics":
        return <BlobCursorPhysicsPreview />;
      case "star-border-shimmer":
        return <StarBorderShimmerPreview />;
      default:
        return <SwarmFlock />;
    }
  }

  // -------------------------------------------------------------
  // 8. BACKGROUNDS (57) — Diverse Mathematical Canvas Engines
  // -------------------------------------------------------------
  if (category === "backgrounds") {
    let canvasNode: React.ReactNode;
    switch (slug) {
      case "shape-waves-canvas":
        canvasNode = <ShapeWavesCanvasPreview />;
        break;
      case "aero-shards-svg":
        canvasNode = <AeroShardsSvgPreview />;
        break;
      case "ghost-fibers-stream":
        canvasNode = <GhostFibersStreamPreview />;
        break;
      case "crt-warp-scanline":
        canvasNode = <MatrixTerminal />;
        break;
      case "molten-metal-flow":
        canvasNode = <MoltenMetalFlowPreview />;
        break;
      case "gradient-waves-sine":
        canvasNode = <GradientWavesSinePreview />;
        break;
      case "web-threads-mesh":
        canvasNode = <ElasticMesh />;
        break;
      case "topography-contour-lines":
        canvasNode = <TopographicWaves linesCount={reducedMotion ? 8 : 16} />;
        break;
      case "light-tunnel-3d":
        canvasNode = <HyperspeedTunnel />;
        break;
      case "sliced-waves-depth":
        canvasNode = <SlicedWavesDepthPreview />;
        break;
      case "acid-squares-grid":
        canvasNode = <PixelSwapGridPreview />;
        break;
      case "beam-scanner-laser":
        canvasNode = <LaserFlow />;
        break;
      case "ferrofluid-pool-liquid":
        canvasNode = <MagnetNeedles />;
        break;
      case "lightfall-stream":
        canvasNode = <LightfallStreamPreview />;
        break;
      case "liquid-ether-canvas":
        canvasNode = <LiquidEtherCanvasPreview />;
        break;
      case "prism-refract-color":
        canvasNode = <AuroraField opacity={0.8} speed={reducedMotion ? 0 : 0.002} />;
        break;
      case "dark-veil-mesh":
        canvasNode = <ElasticMesh />;
        break;
      case "light-pillar-ambient":
        canvasNode = <LightPillarAmbientPreview />;
        break;
      case "silk-flow-harmonic":
        canvasNode = <SilkFlowHarmonicPreview />;
        break;
      case "floating-lines-vector":
        canvasNode = <FloatingLinesVectorPreview />;
        break;
      case "side-rays-ambient":
        canvasNode = <SideRaysAmbientPreview />;
        break;
      case "light-rays-shimmer":
        canvasNode = <LightRaysShimmerPreview />;
        break;
      case "pixel-blast-canvas":
        canvasNode = <PixelTrailEmitterPreview />;
        break;
      case "color-bends-flow":
        canvasNode = <ColorBendsFlowPreview />;
        break;
      case "evil-eye-geometry":
        canvasNode = <EvilEyeGeometryPreview />;
        break;
      case "line-waves-procedural":
        canvasNode = <LineWavesProceduralPreview />;
        break;
      case "radar-sweep-tactical":
        canvasNode = <TacticalRadar />;
        break;
      case "soft-aurora-glow":
        canvasNode = <AuroraField opacity={0.6} speed={reducedMotion ? 0 : 0.001} />;
        break;
      case "aurora-sky-harmonic":
        canvasNode = <AuroraField opacity={0.85} speed={reducedMotion ? 0 : 0.0015} />;
        break;
      case "plasma-field-fluid":
        canvasNode = <BalatroShader />;
        break;
      case "plasma-wave-energy":
        canvasNode = <LightningCanvas />;
        break;
      case "particles-lattice-quantum":
        canvasNode = <QuantumLattice />;
        break;
      case "gradient-blinds-slats":
        canvasNode = <GradientBlindsSlatsPreview />;
        break;
      case "grainient-mesh-noise":
        canvasNode = <BalatroShader />;
        break;
      case "grid-scan-matrix":
        canvasNode = <TacticalRadar />;
        break;
      case "energy-beams-glow":
        canvasNode = <LaserFlow />;
        break;
      case "pixel-snow-ambient":
        canvasNode = <PixelTrailEmitterPreview />;
        break;
      case "lightning-bolt-canvas":
        canvasNode = <LightningCanvas />;
        break;
      case "prismatic-burst-radial":
        canvasNode = <AuroraField opacity={0.9} speed={reducedMotion ? 0 : 0.003} />;
        break;
      case "galaxy-spiral-points":
        canvasNode = <GalaxySpiralPointsPreview />;
        break;
      case "dither-matrix-retro":
        canvasNode = <PixelSwapGridPreview />;
        break;
      case "faulty-terminal-flicker":
        canvasNode = <MatrixTerminal />;
        break;
      case "ripple-grid-impulse":
        canvasNode = <RippleDistortion />;
        break;
      case "dot-field-interactive":
        canvasNode = <QuantumLattice />;
        break;
      case "dot-grid-canvas-rhythm":
        canvasNode = <QuantumLattice />;
        break;
      case "harmonic-threads-flow":
        canvasNode = <ElasticMesh />;
        break;
      case "hyperspeed-tunnel-warp":
        canvasNode = <HyperspeedTunnel />;
        break;
      case "iridescence-sheen-fresnel":
        canvasNode = <IridescenceSheenFresnelPreview />;
        break;
      case "sine-waves-smooth":
        canvasNode = <SineWavesSmoothPreview />;
        break;
      case "grid-distortion-pointer":
        canvasNode = <GridDistortionPointerPreview />;
        break;
      case "ballpit-physics-2d":
        canvasNode = <BallpitCanvas />;
        break;
      case "energy-orb-glow":
        canvasNode = <LightningCanvas />;
        break;
      case "letter-glitch-stream":
        canvasNode = <MatrixTerminal />;
        break;
      case "grid-motion-pan":
        canvasNode = <GridMotionPanPreview />;
        break;
      case "shape-grid-cells":
        canvasNode = <ShapeGridCellsPreview />;
        break;
      case "liquid-chrome-fluid":
        canvasNode = <LiquidChromeFluidPreview />;
        break;
      case "balatro-shader-moire":
        canvasNode = <BalatroShader />;
        break;
      default:
        canvasNode = <TopographicWaves linesCount={reducedMotion ? 8 : 16} />;
    }

    return (
      <div className="w-full h-full relative overflow-hidden bg-[#070a10]">
        {canvasNode}
        <span className="sr-only">{item.title}</span>
      </div>
    );
  }


  // -------------------------------------------------------------
  // 9. UI ELEMENTS & MICRO (70) — Real Interactive Widgets
  // -------------------------------------------------------------
  if (category === "ui-elements") {
    switch (slug) {
      case "infinite-spiral-canvas":
        return <InfiniteSpiralPreview />;
      case "depth-carousel-3d":
        return <DepthCarousel3DPreview />;
      case "morph-slider-path":
        return <MorphSliderPathPreview />;
      case "drift-wall-parallax":
        return <DriftWallParallaxPreview />;
      case "accordion-gallery-split":
        return <AccordionGallerySplitPreview />;
      case "specular-button-lens":
        return <SpecularButtonLensPreview />;
      case "option-wheel-3d":
        return <OptionWheel3DPreview />;
      case "curved-input-field":
        return <CurvedInputFieldPreview />;
      case "line-sidebar-rail":
        return <LineSidebarRailPreview />;
      case "animated-list-stagger":
        return <AnimatedListStaggerPreview />;
      case "scroll-stack-deck":
        return <ScrollStackDeckPreview />;
      case "bubble-menu-radial":
        return <BubbleMenuRadialPreview />;
      case "magic-bento-spotlight":
        return <MagicBentoSpotlightPreview />;
      case "circular-gallery-carousel":
        return <CircularGalleryCarouselPreview />;
      case "reflective-card-foil":
        return <ReflectiveCardFoilPreview />;
      case "card-nav-expand":
        return <CardNavExpandPreview />;
      case "stack-cards-drag":
        return <StackCardsDragPreview />;
      case "fluid-glass-surface":
        return <FluidGlassSurfacePreview />;
      case "pill-nav-float":
        return <PillNavFloatPreview />;
      case "tilted-card-perspective":
        return <TiltedCardPerspectivePreview />;
      case "masonry-grid-fluid":
        return <MasonryGridFluidPreview />;
      case "glass-surface-acrylic":
        return <GlassSurfaceAcrylicPreview />;
      case "chroma-grid-fresnel":
        return <ChromaGridFresnelPreview />;
      case "folder-tree-interactive":
        return <FolderTreeInteractivePreview />;
      case "staggered-menu-cascade":
        return <StaggeredMenuCascadePreview />;
      case "lanyard-card-spring":
        return <LanyardCardSpringPreview />;
      case "profile-card-holo":
        return <ProfileCardHoloPreview />;
      case "interactive-dock-magnify":
        return (
          <div className="p-4 flex items-center justify-center">
            <InteractiveDock
              items={[
                { id: "1", label: "Finder", icon: <span className="font-mono text-xs">⌘</span> },
                { id: "2", label: "Motion", icon: <span className="font-mono text-xs">⚡</span>, active: true },
                { id: "3", label: "Spatial", icon: <span className="font-mono text-xs">◈</span> },
                { id: "4", label: "Code", icon: <span className="font-mono text-xs">&lt;&gt;</span> },
              ]}
            />
          </div>
        );
      case "gooey-nav-liquid":
        return <GooeyNavLiquidPreview />;
      case "pixel-card-retro":
        return <PixelCardRetroPreview />;
      case "kinetic-carousel-swipe":
        return <KineticCarouselSwipePreview />;
      case "spotlight-card-interactive":
        return <SpotlightCardInteractivePreview />;
      case "border-glow-card-pulse":
        return <BorderGlowCardPulsePreview />;
      case "flying-posters-gallery":
        return <FlyingPostersGalleryPreview />;
      case "card-swap-deck":
        return <CardSwapDeckPreview />;
      case "glass-icons-iridescent":
        return <GlassIconsIridescentPreview />;
      case "decay-card-friction":
        return <DecayCardFrictionPreview />;
      case "flowing-menu-hover":
        return <FlowingMenuHoverPreview />;
      case "elastic-slider-rebound":
        return <ElasticSliderReboundPreview />;
      case "rolling-counter-digits":
        return <CountRoller targetNumber={8492} />;
      case "infinite-menu-marquee":
        return <InfiniteMenuMarqueePreview />;
      case "stepper-control-tactile":
        return <StepperControlTactilePreview />;
      case "bounce-cards-stack":
        return <BounceCardsStackPreview />;
      case "branched-menu-tree":
        return <BranchedMenuTreePreview />;
      case "folder-float-hover":
        return <FolderFloatHoverPreview />;
      case "refine-frame-slider":
        return <RefineFrameSliderPreview />;
      case "thought-line-canvas":
        return <ThoughtLineCanvasPreview />;
      case "voice-pill-waveform":
        return <VoiceWaveform />;
      case "slosh-gauge-fluid":
        return <SloshGauge levelPercent={72} />;
      case "prompt-bar-action":
        return <PromptBarActionPreview />;
      case "swipe-toast-dismiss":
        return <SwipeToastDismissPreview />;
      case "bell-toggle-ring":
        return <BellToggleRingPreview />;
      case "call-chip-pulse":
        return <CallChipPulsePreview />;
      case "status-mark-badge":
        return <StatusMarkBadgePreview />;
      case "glide-select-slider":
        return <GlideSelectSliderPreview />;
      case "swipe-row-actions":
        return <SwipeRowActionsPreview />;
      case "jelly-radio-switch":
        return <TactileJellyToggle label="Jelly Switch" />;
      case "comet-dial-gauge":
        return <CometDialGaugePreview />;
      case "wake-slider-drag":
        return <WakeSliderDragPreview />;
      case "code-slots-reveal":
        return <CodeSlotsRevealPreview />;
      case "dodge-field-pointer":
        return <DodgeFieldPointerPreview />;
      case "lattice-loader-orbit":
        return <LatticeLoaderOrbitPreview />;
      case "scrub-field-timeline":
        return <ScrubFieldTimelinePreview />;
      case "warm-tooltip-float":
        return <WarmTooltipFloatPreview />;
      case "slide-commit-slider":
        return <SlideCommit label="Slide To Unlock" />;
      case "rubber-segment-switch":
        return <RubberButton label="Segmented" />;
      case "pulse-heart-micro":
        return <PulseHeartMicroPreview />;
      case "spring-check-box":
        return <SpringCheckBoxPreview />;
      case "peek-rating-stars":
        return <PeekRatingStarsPreview />;
      case "squish-switch-toggle":
        return <TactileJellyToggle label="Squish Toggle" />;
      default:
        return <StatusMarkBadgePreview />;
    }
  }

  return (
    <div className="p-4 text-center">
      <span className="font-mono text-xs text-ink">{item.title}</span>
    </div>
  );
}

function StaticFallback({ item }: { item: AdvancedResourceItem }) {
  return (
    <div className="p-4 text-center flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-full border border-line/60 bg-surface flex items-center justify-center font-mono text-xs text-graphite">
        ◈
      </div>
      <span className="font-display text-xs text-ink font-medium">{item.title}</span>
      <span className="font-mono text-[9px] text-graphite">3D WebGL (Fallback)</span>
    </div>
  );
}
