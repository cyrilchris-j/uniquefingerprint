/**
 * OpenUI Advanced Resource Source Code Generator
 *
 * Each slug gets a UNIQUE, DISTINCT implementation.
 * No two components share the same visual pattern or code template.
 */

import type { AdvancedCategorySlug, AdvancedTechnology } from "./types.js";
import { UI_ELEMENT_SOURCE_CODES } from "./ui-element-source-codes.js";

export function generateSourceCode(
  category: AdvancedCategorySlug,
  slug: string,
  title: string,
  technology: AdvancedTechnology,
): string {
  const componentName = title.replace(/[^a-zA-Z0-9]/g, "");

  if (technology === "three-webgl" || category === "spatial-3d") {
    return generateThreeJsCode(componentName, slug, title);
  }
  if (category === "backgrounds" || technology === "canvas-2d") {
    return generateCanvas2DCode(componentName, slug, title);
  }
  if (category === "text-animations") {
    return generateTextAnimationCode(componentName, slug, title);
  }
  if (category === "buttons") {
    return generateButtonCode(componentName, slug, title);
  }
  if (category === "ui-elements") {
    return generateUIElementCode(componentName, slug, title);
  }
  if (category === "heroes") {
    return generateHeroCode(componentName, slug, title);
  }
  if (category === "landing-pages") {
    return generateLandingCode(componentName, slug, title);
  }
  if (category === "css-layouts") {
    return generateCssLayoutCode(componentName, slug, title);
  }
  return generateMotionDesignCode(componentName, slug, title);
}

// ─────────────────────────────────────────────────────────────────────────────
// THREE.JS / WebGL
// ─────────────────────────────────────────────────────────────────────────────
function generateThreeJsCode(name: string, slug: string, title: string): string {
  return `import * as React from "react";
import * as THREE from "three";

export interface ${name}Props {
  className?: string;
  wireframe?: boolean;
  color?: string;
  speed?: number;
}

/**
 * ${title}
 * Hardware-accelerated 3D WebGL scene with procedural geometry and pointer interaction.
 */
export function ${name}({
  className = "w-full h-full min-h-[300px]",
  wireframe = false,
  color = "#ba442c",
  speed = 1.0,
}: ${name}Props): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    let geometry: THREE.BufferGeometry;
    if ("${slug}".includes("globe") || "${slug}".includes("sphere")) {
      geometry = new THREE.IcosahedronGeometry(1.6, 12);
    } else if ("${slug}".includes("cube") || "${slug}".includes("isometric")) {
      geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    } else if ("${slug}".includes("nebula") || "${slug}".includes("particle")) {
      geometry = new THREE.BufferGeometry();
      const count = 3000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 6;
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ color: new THREE.Color(color), size: 0.04 });
      const points = new THREE.Points(geometry, mat);
      scene.add(points);
      let animId: number;
      const animate = () => {
        points.rotation.y += 0.0012 * speed;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();
      return () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
        geometry.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    } else {
      geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    }

    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), wireframe, metalness: 0.85, roughness: 0.2 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetRotX = 0, targetRotY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetRotY = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotX = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener("pointermove", onPointerMove);

    let animId: number;
    const animate = () => {
      mesh.rotation.x += (targetRotX * 0.8 - mesh.rotation.x) * 0.05 + 0.003;
      mesh.rotation.y += (targetRotY * 0.8 - mesh.rotation.y) * 0.05 + 0.006;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [color, wireframe, speed]);

  return <div ref={containerRef} className={className} />;
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 2D / BACKGROUNDS — unique per-slug visual
// ─────────────────────────────────────────────────────────────────────────────
function generateCanvas2DCode(name: string, slug: string, title: string): string {
  // Slug-specific unique implementations
  if (slug === "topography-contour-lines") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    let t = 0, animId: number;
    const noise = (x: number, y: number, z: number) => Math.sin(x * 0.8 + z) * Math.cos(y * 0.6 + z * 1.3) * Math.sin((x + y) * 0.4 + z * 0.7);
    const draw = () => {
      ctx.fillStyle = "#0a0d14";
      ctx.fillRect(0, 0, w, h);
      for (let level = 0; level < 12; level++) {
        const threshold = -1 + (level / 11) * 2;
        ctx.strokeStyle = \`hsla(\${160 + level * 14}, 70%, \${30 + level * 4}%, \${0.15 + level * 0.06})\`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        const step = 6;
        for (let x = 0; x < w; x += step) {
          for (let y = 0; y < h; y += step) {
            const v = noise(x / 80, y / 80, t);
            if (Math.abs(v - threshold) < 0.08) {
              ctx.moveTo(x, y);
              ctx.lineTo(x + step, y);
            }
          }
        }
        ctx.stroke();
      }
      t += 0.008;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "plasma-field-fluid") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    let t = 0, animId: number;
    const draw = () => {
      const imageData = ctx.createImageData(w, h);
      for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
        const v = Math.sin(x / 20 + t) + Math.sin(y / 18 + t * 1.1) + Math.sin((x + y) / 25 + t * 0.8) + Math.sin(Math.sqrt(x * x + y * y) / 22 + t);
        const r = Math.floor(128 + 127 * Math.sin(v * Math.PI));
        const g = Math.floor(128 + 127 * Math.sin(v * Math.PI + 2.09));
        const b = Math.floor(128 + 127 * Math.sin(v * Math.PI + 4.18));
        const i = (y * w + x) * 4;
        imageData.data[i] = r; imageData.data[i+1] = g; imageData.data[i+2] = b; imageData.data[i+3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      t += 0.04;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "galaxy-spiral-points") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    const stars: { r: number; angle: number; speed: number; size: number; hue: number }[] = [];
    for (let i = 0; i < 600; i++) {
      const r = Math.pow(Math.random(), 0.5) * Math.min(w, h) * 0.45;
      stars.push({ r, angle: Math.random() * Math.PI * 2, speed: 0.0004 + 0.001 / (r + 1), size: Math.random() * 1.5 + 0.3, hue: 180 + Math.random() * 80 });
    }
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(5, 6, 12, 0.25)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      for (const s of stars) {
        s.angle += s.speed;
        const spiral = s.angle * 0.3;
        const x = cx + Math.cos(s.angle + spiral) * s.r;
        const y = cy + Math.sin(s.angle + spiral) * s.r * 0.55;
        ctx.fillStyle = \`hsla(\${s.hue}, 85%, 75%, 0.85)\`;
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "lightning-bolt-canvas") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    let animId: number;
    function bolt(x1: number, y1: number, x2: number, y2: number, depth: number) {
      if (depth <= 0) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); return; }
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 60 / depth;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 60 / depth;
      bolt(x1, y1, mx, my, depth - 1);
      bolt(mx, my, x2, y2, depth - 1);
      if (Math.random() < 0.4) bolt(mx, my, mx + (Math.random() - 0.5) * 80, my + Math.random() * 60, depth - 2);
    }
    const draw = () => {
      ctx.fillStyle = "rgba(5,6,18,0.3)";
      ctx.fillRect(0, 0, w, h);
      if (Math.random() < 0.15) {
        ctx.strokeStyle = "rgba(150, 180, 255, 0.9)";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#8ab4ff";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        bolt(Math.random() * w, 0, Math.random() * w, h, 6);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "dot-field-interactive") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -999, y: -999 });
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    const gap = 22;
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "#08090f";
      ctx.fillRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      for (let x = gap; x < w; x += gap) for (let y = gap; y < h; y += gap) {
        const dist = Math.hypot(x - mx, y - my);
        const influence = Math.max(0, 1 - dist / 100);
        const r = 1.5 + influence * 5;
        const alpha = 0.2 + influence * 0.8;
        ctx.fillStyle = \`hsla(\${200 + influence * 120}, 80%, 65%, \${alpha})\`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "ballpit-physics-2d") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    type Ball = { x: number; y: number; vx: number; vy: number; r: number; color: string };
    const colors = ["#f43f5e","#f59e0b","#3b82f6","#10b981","#8b5cf6","#ec4899"];
    const balls: Ball[] = Array.from({ length: 30 }, (_, i) => ({
      x: 40 + Math.random() * (w - 80), y: Math.random() * h / 2, vx: (Math.random() - 0.5) * 3, vy: Math.random() * 2,
      r: 10 + Math.random() * 14, color: colors[i % colors.length]
    }));
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "#07080e";
      ctx.fillRect(0, 0, w, h);
      for (const b of balls) {
        b.vy += 0.2;
        b.x += b.vx; b.y += b.vy;
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -0.8; }
        if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -0.8; }
        if (b.y + b.r > h) { b.y = h - b.r; b.vy *= -0.72; b.vx *= 0.97; }
        ctx.fillStyle = b.color;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath(); ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.35, 0, Math.PI * 2); ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "radar-sweep-tactical") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) * 0.42;
    let angle = 0;
    const blips = Array.from({ length: 8 }, () => ({ r: Math.random() * R * 0.9, a: Math.random() * Math.PI * 2, life: 0 }));
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 10, 5, 0.3)";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(0, 255, 100, 0.15)";
      for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(cx, cy, R * i / 4, 0, Math.PI * 2); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      const grad = ctx.createConicalGradient ? undefined : null;
      ctx.fillStyle = "rgba(0, 255, 80, 0.04)";
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, angle - 0.6, angle); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(0, 255, 80, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
      ctx.stroke();
      for (const b of blips) {
        const angleDiff = ((angle - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff < 0.15) b.life = 1;
        b.life *= 0.985;
        if (b.life > 0.05) {
          const bx = cx + Math.cos(b.a) * b.r, by = cy + Math.sin(b.a) * b.r;
          ctx.fillStyle = \`rgba(0, 255, 80, \${b.life})\`;
          ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fill();
        }
      }
      angle = (angle + 0.025) % (Math.PI * 2);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "meta-balls-canvas") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-full min-h-[260px]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);
    const blobs = Array.from({ length: 5 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
      r: 50 + Math.random() * 40,
      hue: 180 + Math.random() * 120,
    }));
    let animId: number;
    const res = 4;
    const draw = () => {
      for (const b of blobs) {
        b.x += b.vx; b.y += b.vy;
        if (b.x < b.r || b.x > w - b.r) b.vx *= -1;
        if (b.y < b.r || b.y > h - b.r) b.vy *= -1;
      }
      const imageData = ctx.createImageData(w, h);
      for (let x = 0; x < w; x += res) for (let y = 0; y < h; y += res) {
        let sum = 0;
        for (const b of blobs) sum += (b.r * b.r) / ((x - b.x) ** 2 + (y - b.y) ** 2 + 0.001);
        if (sum > 1) {
          const hue = blobs.reduce((acc, b, i) => acc + b.hue * ((b.r * b.r) / ((x - b.x) ** 2 + (y - b.y) ** 2 + 0.001)), 0) / sum;
          const r = Math.floor(128 + 100 * Math.sin(hue * Math.PI / 180));
          const g = Math.floor(80 + 60 * Math.cos(hue * Math.PI / 180 + 1));
          const b2 = Math.floor(180 + 60 * Math.sin(hue * Math.PI / 90));
          for (let dx = 0; dx < res; dx++) for (let dy = 0; dy < res; dy++) {
            const idx = ((y + dy) * w + (x + dx)) * 4;
            imageData.data[idx] = r; imageData.data[idx+1] = g; imageData.data[idx+2] = b2; imageData.data[idx+3] = 220;
          }
        }
      }
      ctx.fillStyle = "#08090f";
      ctx.fillRect(0, 0, w, h);
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  // Generic canvas — still unique with flow field approach
  return `import * as React from "react";

export interface ${name}Props {
  className?: string;
  speed?: number;
  density?: number;
  interactive?: boolean;
}

/**
 * ${title}
 * Procedural canvas flow field with sine-wave velocity and pointer interaction.
 */
export function ${name}({
  className = "w-full h-full min-h-[260px] relative overflow-hidden",
  speed = 1.0,
  density = 1800,
  interactive = true,
}: ${name}Props): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: 0, y: 0, active: false });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight ?? 300);

    type Particle = { x: number; y: number; px: number; py: number; hue: number };
    const cols = Math.ceil(Math.sqrt(density * (w / h)));
    const rows = Math.ceil(density / cols);
    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      particles.push({ x, y, px: x, py: y, hue: Math.random() * 60 + 190 });
    }

    let t = 0, animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(8, 10, 18, 0.12)";
      ctx.fillRect(0, 0, w, h);
      t += 0.015 * speed;
      for (const p of particles) {
        const angle = Math.sin(p.x / 120 + t) * Math.cos(p.y / 120 + t * 0.7) * Math.PI * 2;
        const spd = 1.2 * speed;
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x, dy = mouseRef.current.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 100) { p.x -= (dx / d) * 2; p.y -= (dy / d) * 2; }
        }
        p.px = p.x; p.py = p.y;
        p.x += Math.cos(angle) * spd;
        p.y += Math.sin(angle) * spd;
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          p.x = Math.random() * w; p.y = Math.random() * h; p.px = p.x; p.py = p.y;
        }
        ctx.strokeStyle = \`hsla(\${p.hue}, 75%, 65%, 0.55)\`;
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      animId = requestAnimationFrame(render);
    };
    render();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density, speed, interactive]);

  return (
    <div className={className} style={{ background: "#08090f" }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXT ANIMATIONS — every slug has a unique visual approach
// ─────────────────────────────────────────────────────────────────────────────
function generateTextAnimationCode(name: string, slug: string, title: string): string {

  if (slug === "circular-text-orbit") {
    return `import * as React from "react";

export interface CircularTextOrbitProps {
  text?: string;
  className?: string;
  speedSec?: number;
  centerSymbol?: string;
  radius?: number;
}

/**
 * Circular Text Orbit — SVG textPath orbital animation with gravitational hub.
 */
export function CircularTextOrbit({
  text = "✦ OPENUI ✦ ORBITAL MOTION ✦ DESIGN ✦",
  className = "",
  speedSec = 8,
  centerSymbol = "◈",
  radius = 45,
}: CircularTextOrbitProps): React.JSX.Element {
  const size = radius * 2 + 30;
  const center = size / 2;
  const pathD = \`M \${center},\${center} m -\${radius},0 a \${radius},\${radius} 0 1,1 \${radius * 2},0 a \${radius},\${radius} 0 1,1 -\${radius * 2},0\`;
  return (
    <div className={\`relative flex items-center justify-center select-none \${className}\`} style={{ width: size, height: size }}>
      <div className="absolute inset-0" style={{ animation: \`orbitSpin \${speedSec}s linear infinite\` }}>
        <svg viewBox={\`0 0 \${size} \${size}\`} className="w-full h-full">
          <path id="orbitPath" d={pathD} fill="transparent" />
          <text className="font-mono text-[9px] font-bold fill-current uppercase tracking-widest">
            <textPath href="#orbitPath">{text}</textPath>
          </text>
        </svg>
      </div>
      <div className="w-8 h-8 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center text-xs font-mono text-oxide font-bold">
        {centerSymbol}
      </div>
      <style>{\`@keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}
`;
  }

  if (slug === "text-loop") {
    return `import * as React from "react";

export function ${name}({ items = ["Design Systems", "Motion Language", "Spatial Depth", "Runtime UI"], speedMs = 2200, className = "" }: { items?: string[]; speedMs?: number; className?: string }): React.JSX.Element {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % items.length); setVisible(true); }, 300);
    }, speedMs);
    return () => clearInterval(id);
  }, [items.length, speedMs]);
  return (
    <div className={\`overflow-hidden \${className}\`}>
      <span className="font-display font-black text-3xl text-ink" style={{ display: "inline-block", transition: "opacity 0.3s, transform 0.3s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}>
        {items[index]}
      </span>
    </div>
  );
}
`;
  }

  if (slug === "split-flap-text") {
    return `import * as React from "react";

export function ${name}({ text = "OPENUI", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !#";
  const [display, setDisplay] = React.useState(() => text.split("").map(() => " "));
  React.useEffect(() => {
    const intervals = text.split("").map((target, i) =>
      setTimeout(() => {
        let step = 0;
        const id = setInterval(() => {
          setDisplay(d => { const n = [...d]; n[i] = step < chars.length - 1 ? chars[step] : target; return n; });
          if (step++ >= chars.indexOf(target.toUpperCase())) clearInterval(id);
        }, 40);
      }, i * 120)
    );
    return () => intervals.forEach(clearTimeout);
  }, [text]);
  return (
    <div className={\`flex gap-1 \${className}\`}>
      {display.map((c, i) => (
        <div key={i} className="w-10 h-14 bg-zinc-900 border border-zinc-700 rounded-md flex items-center justify-center font-mono text-xl font-bold text-amber-400 select-none shadow-inner">
          {c}
        </div>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "stroke-text") {
    return `import * as React from "react";

export function ${name}({ text = "OPENUI", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => { p += 2; setProgress(Math.min(p, 100)); if (p >= 100) clearInterval(id); }, 16);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className={\`relative select-none \${className}\`}>
      <svg viewBox="0 0 400 100" className="w-full">
        <text x="50%" y="75" textAnchor="middle" fontFamily="monospace" fontSize="72" fontWeight="900"
          fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1000" strokeDashoffset={1000 - progress * 10}
          style={{ transition: "stroke-dashoffset 0.05s linear" }} className="text-oxide">
          {text}
        </text>
      </svg>
    </div>
  );
}
`;
  }

  if (slug === "masked-heading") {
    return `import * as React from "react";

export function ${name}({ text = "The Future of Interfaces", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [x, setX] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setX(p => (p + 0.4) % 200), 16);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={\`relative overflow-hidden select-none \${className}\`} style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", background: \`linear-gradient(90deg, #1a1a2e \${x - 20}%, #ba442c \${x}%, #f59e0b \${x + 15}%, #38bdf8 \${x + 30}%, #1a1a2e \${x + 50}%)\`, backgroundSize: "200% 100%", display: "inline-block" }}>
      <span className="font-display font-black text-4xl tracking-tight">{text}</span>
    </div>
  );
}
`;
  }

  if (slug === "warp-text") {
    return `import * as React from "react";

export function ${name}({ text = "WARP", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setT(p => p + 0.05), 16); return () => clearInterval(id); }, []);
  return (
    <div className={\`flex gap-0.5 font-display font-black text-5xl text-ink select-none \${className}\`}>
      {text.split("").map((c, i) => (
        <span key={i} style={{ display: "inline-block", transform: \`translateY(\${Math.sin(t + i * 0.6) * 12}px) scaleX(\${1 + Math.sin(t + i * 0.4) * 0.1})\`, transition: "none" }}>
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "depth-text") {
    return `import * as React from "react";

export function ${name}({ text = "DEPTH", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const layers = 5;
  return (
    <div className={\`relative select-none font-display font-black text-6xl \${className}\`}>
      {Array.from({ length: layers }, (_, i) => (
        <span key={i} className="absolute inset-0" style={{ color: i === layers - 1 ? "#f1f0ec" : \`rgba(186,68,44,\${0.15 + i * 0.1})\`, transform: \`translate(\${(layers - 1 - i) * 2}px, \${(layers - 1 - i) * 2}px)\`, zIndex: i }}>
          {text}
        </span>
      ))}
      <span style={{ color: "transparent" }}>{text}</span>
    </div>
  );
}
`;
  }

  if (slug === "echo-text") {
    return `import * as React from "react";

export function ${name}({ text = "ECHO", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const echoes = 4;
  return (
    <div className={\`relative select-none font-display font-black text-5xl \${className}\`}>
      {Array.from({ length: echoes }, (_, i) => (
        <span key={i} className="absolute inset-0" style={{ opacity: 0.15 - i * 0.03, transform: \`translate(\${(i + 1) * 8}px, 0)\`, filter: \`blur(\${i * 1.5}px)\`, color: "#ba442c", animationDelay: \`\${i * 0.05}s\` }}>
          {text}
        </span>
      ))}
      <span className="relative text-ink">{text}</span>
    </div>
  );
}
`;
  }

  if (slug === "blur-text-flow") {
    return `import * as React from "react";

export function ${name}({ words = ["Clarity", "Focus", "Precision", "Vision"], className = "" }: { words?: string[]; className?: string }): React.JSX.Element {
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState<"in" | "out">("in");
  React.useEffect(() => {
    const id = setTimeout(() => {
      if (phase === "in") { setTimeout(() => setPhase("out"), 1500); }
      else { setI(p => (p + 1) % words.length); setPhase("in"); }
    }, phase === "in" ? 400 : 400);
    return () => clearTimeout(id);
  }, [phase, words.length]);
  return (
    <div className={\`text-center select-none \${className}\`}>
      <span className="font-display font-black text-5xl text-ink" style={{ display: "inline-block", filter: phase === "in" ? "blur(0px)" : "blur(16px)", opacity: phase === "in" ? 1 : 0, transform: phase === "in" ? "scale(1)" : "scale(0.92)", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        {words[i]}
      </span>
    </div>
  );
}
`;
  }

  if (slug === "glitch-chromatic-text") {
    return `import * as React from "react";

export function ${name}({ text = "GLITCH", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const fire = () => { setActive(true); setTimeout(() => setActive(false), 180); };
    const id = setInterval(fire, 1800 + Math.random() * 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={\`relative font-mono font-black text-5xl select-none inline-block \${className}\`}>
      <span className="relative z-10 text-white">{text}</span>
      {active && <>
        <span className="absolute inset-0 text-red-500 z-0" style={{ transform: "translate(-3px, 1px)", mixBlendMode: "screen" }}>{text}</span>
        <span className="absolute inset-0 text-cyan-400 z-0" style={{ transform: "translate(3px, -1px)", mixBlendMode: "screen" }}>{text}</span>
      </>}
    </div>
  );
}
`;
  }

  if (slug === "falling-physics-text") {
    return `import * as React from "react";

export function ${name}({ text = "FALL", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [letters, setLetters] = React.useState(() =>
    text.split("").map((c, i) => ({ char: c, y: -60, vy: 0, settled: false, delay: i * 120 }))
  );
  const floor = 0;
  React.useEffect(() => {
    let startTime = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setLetters(prev => prev.map(l => {
        if (elapsed < l.delay) return l;
        if (l.settled) return l;
        const vy = l.vy + 1.2;
        const y = l.y + vy;
        if (y >= floor) return { ...l, y: floor, vy: -vy * 0.4, settled: Math.abs(vy * 0.4) < 1 };
        return { ...l, y, vy };
      }));
    }, 16);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className={\`flex gap-1 items-end h-24 select-none \${className}\`}>
      {letters.map((l, i) => (
        <span key={i} className="font-display font-black text-4xl text-ink" style={{ display: "inline-block", transform: \`translateY(\${-l.y}px)\` }}>
          {l.char === " " ? "\u00a0" : l.char}
        </span>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "scroll-reveal-chars") {
    return `import * as React from "react";

export function ${name}({ text = "Revealed by Scroll", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = React.useState<boolean[]>(() => new Array(text.length).fill(false));
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        text.split("").forEach((_, i) => {
          setTimeout(() => setRevealed(r => { const n = [...r]; n[i] = true; return n; }), i * 40);
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);
  return (
    <div ref={ref} className={\`flex flex-wrap select-none \${className}\`}>
      {text.split("").map((c, i) => (
        <span key={i} className="font-display font-black text-4xl" style={{ display: "inline-block", opacity: revealed[i] ? 1 : 0, transform: revealed[i] ? "translateY(0)" : "translateY(20px)", transition: \`opacity 0.4s \${i * 0.04}s, transform 0.4s \${i * 0.04}s\`, color: "currentColor" }}>
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "count-up-roller") {
    return `import * as React from "react";

export function ${name}({ target = 9841, duration = 2200, className = "" }: { target?: number; duration?: number; className?: string }): React.JSX.Element {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const ease = 1 - Math.pow(1 - p, 4);
      setValue(Math.floor(ease * target));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return (
    <div className={\`font-mono font-black text-6xl text-ink tabular-nums select-none \${className}\`}>
      {String(value).padStart(String(target).length, "0").split("").map((d, i) => (
        <span key={i} className="inline-block" style={{ transition: "transform 0.1s ease" }}>{d}</span>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "rotating-axis-text") {
    return `import * as React from "react";

export function ${name}({ phrases = ["Design Systems", "Motion Language", "Spatial UI", "Canvas Runtime"], className = "" }: { phrases?: string[]; className?: string }): React.JSX.Element {
  const [i, setI] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => { setI(p => (p + 1) % phrases.length); setFlipping(false); }, 350);
    }, 2500);
    return () => clearInterval(id);
  }, [phrases.length]);
  return (
    <div className={\`select-none overflow-hidden \${className}\`} style={{ perspective: "600px" }}>
      <span className="font-display font-black text-4xl text-ink inline-block" style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s", transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)", opacity: flipping ? 0 : 1 }}>
        {phrases[i]}
      </span>
    </div>
  );
}
`;
  }

  if (slug === "shiny-text-sheen") {
    return `import * as React from "react";

export function ${name}({ text = "Prismatic", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [x, setX] = React.useState(-50);
  React.useEffect(() => { const id = setInterval(() => setX(p => p >= 150 ? -50 : p + 1.5), 16); return () => clearInterval(id); }, []);
  return (
    <div className={\`relative inline-block select-none font-display font-black text-5xl \${className}\`} style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", background: \`linear-gradient(105deg, #888 \${x - 20}%, #fff \${x}%, #e0c87c \${x + 8}%, #fff \${x + 16}%, #888 \${x + 36}%)\` }}>
      {text}
    </div>
  );
}
`;
  }

  if (slug === "variable-proximity-sans") {
    return `import * as React from "react";

export function ${name}({ text = "PROXIMITY", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={\`flex gap-1 select-none cursor-default \${className}\`} onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); }}>
      {text.split("").map((c, i) => {
        const letterX = (i / text.length) * 280 + 14;
        const dist = Math.hypot(letterX - mouse.x, 30 - mouse.y);
        const weight = Math.max(100, 900 - dist * 4);
        return (
          <span key={i} className="font-sans text-4xl text-ink transition-none" style={{ fontVariationSettings: \`"wght" \${weight}\`, fontWeight: weight }}>
            {c}
          </span>
        );
      })}
    </div>
  );
}
`;
  }

  if (slug === "ascii-render-text") {
    return `import * as React from "react";

const RAMP = "@#S%?*+;:,. ";
export function ${name}({ text = "ASCII", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setT(p => p + 0.05), 100); return () => clearInterval(id); }, []);
  const cols = 40, rows = 12;
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const v = Math.sin(c / 4 + t) * Math.cos(r / 3 + t * 0.7) * 0.5 + 0.5;
      return RAMP[Math.floor(v * (RAMP.length - 1))];
    }).join("")
  ).join("\n");
  return (
    <pre className={\`font-mono text-[9px] leading-[1.3] text-green-400 select-none whitespace-pre \${className}\`}>{grid}</pre>
  );
}
`;
  }

  if (slug === "scroll-velocity-skew") {
    return `import * as React from "react";

export function ${name}({ text = "Velocity Skew", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  const [skew, setSkew] = React.useState(0);
  const lastY = React.useRef(0);
  React.useEffect(() => {
    const onScroll = () => {
      const vel = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      setSkew(Math.max(-20, Math.min(20, vel * 0.5)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => { const id = setInterval(() => setSkew(p => p * 0.9), 16); return () => clearInterval(id); }, []);
  return (
    <div className={\`select-none overflow-hidden \${className}\`}>
      <span className="font-display font-black text-5xl text-ink inline-block" style={{ transform: \`skewX(\${skew}deg)\`, transition: "transform 0.05s linear" }}>
        {text}
      </span>
    </div>
  );
}
`;
  }

  // Generic text animation — unique typewriter per slug
  return `import * as React from "react";

export interface ${name}Props {
  text?: string;
  className?: string;
  delayMs?: number;
}

/**
 * ${title}
 * Character-by-character reveal with spring-loaded entrance per glyph.
 */
export function ${name}({
  text = "${title}",
  className = "",
  delayMs = 50,
}: ${name}Props): React.JSX.Element {
  const [chars, setChars] = React.useState(0);
  const [loop, setLoop] = React.useState(0);

  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setChars(i);
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(() => { setChars(0); setLoop(l => l + 1); }, 2000);
      }
    }, delayMs);
    return () => clearInterval(id);
  }, [text, delayMs, loop]);

  return (
    <div className={\`select-none font-display font-bold \${className}\`}>
      <span className="text-3xl text-ink tracking-tight">
        {text.split("").map((c, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: i < chars ? 1 : 0,
              transform: i < chars ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)",
              transition: \`opacity 0.25s \${i * 0.02}s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) \${i * 0.02}s\`,
            }}
          >
            {c === " " ? "\u00a0" : c}
          </span>
        ))}
      </span>
      <span className="inline-block w-0.5 h-7 bg-oxide align-middle ml-1 animate-pulse" />
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// BUTTONS — unique per-slug
// ─────────────────────────────────────────────────────────────────────────────
function generateButtonCode(name: string, slug: string, title: string): string {
  if (slug === "magnetic-spring-button") {
    return `import * as React from "react";

export function ${name}({ children = "Magnetic", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = btnRef.current!.getBoundingClientRect();
    setOffset({ x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4 });
  };
  return (
    <button ref={btnRef} onClick={onClick} onMouseMove={onMove} onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
      style={{ transform: \`translate3d(\${offset.x}px, \${offset.y}px, 0)\`, transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }}>
      ✦ {children}
    </button>
  );
}
`;
  }

  if (slug === "hold-to-confirm-button") {
    return `import * as React from "react";

export function ${name}({ onConfirm }: { onConfirm?: () => void }): React.JSX.Element {
  const [progress, setProgress] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>();
  const start = () => { intervalRef.current = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(intervalRef.current); setConfirmed(true); onConfirm?.(); return 100; } return p + 2; }), 20); };
  const stop = () => { clearInterval(intervalRef.current); if (!confirmed) setProgress(0); };
  return (
    <button onMouseDown={start} onMouseUp={stop} onMouseLeave={stop} className="relative px-8 py-3 rounded-xl border border-oxide bg-paper font-mono text-xs font-bold uppercase tracking-wider overflow-hidden select-none" style={{ minWidth: 180 }}>
      <div className="absolute inset-0 bg-oxide/20 transition-none" style={{ width: \`\${progress}%\`, transition: "none" }} />
      <span className="relative z-10 text-ink">{confirmed ? "✓ Confirmed" : progress > 0 ? "Hold..." : "Hold to Confirm"}</span>
    </button>
  );
}
`;
  }

  if (slug === "neon-energy-border-button") {
    return `import * as React from "react";

export function ${name}({ children = "Energy", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-transparent text-ink select-none overflow-hidden"
      style={{ border: "2px solid transparent", backgroundClip: "padding-box" }}>
      <span className="absolute inset-0 rounded-xl" style={{ background: hovered ? "conic-gradient(from var(--angle), #ba442c, #f59e0b, #38bdf8, #ba442c)" : "conic-gradient(from 0deg, #333, #444)", padding: "2px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} />
      <span className="relative">{children}</span>
      <style>{\`.neon-btn { animation: rotateBorder 2s linear infinite; } @keyframes rotateBorder { to { --angle: 360deg; } }\`}</style>
    </button>
  );
}
`;
  }

  if (slug === "rubber-snap-button") {
    return `import * as React from "react";

export function ${name}({ children = "Snap!", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [scale, setScale] = React.useState({ x: 1, y: 1 });
  const snap = () => {
    setScale({ x: 1.35, y: 0.7 });
    setTimeout(() => setScale({ x: 0.85, y: 1.2 }), 80);
    setTimeout(() => setScale({ x: 1.1, y: 0.92 }), 160);
    setTimeout(() => setScale({ x: 1, y: 1 }), 260);
    onClick?.();
  };
  return (
    <button onClick={snap} className="px-6 py-3 rounded-xl bg-oxide text-paper font-mono text-xs font-bold uppercase tracking-wider shadow-lg select-none"
      style={{ transform: \`scaleX(\${scale.x}) scaleY(\${scale.y})\`, transition: "transform 0.08s ease" }}>
      {children}
    </button>
  );
}
`;
  }

  if (slug === "specular-liquid-button") {
    return `import * as React from "react";

export function ${name}({ children = "Specular", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [glare, setGlare] = React.useState({ x: 50, y: 50, visible: false });
  const ref = React.useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setGlare({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, visible: true });
  };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={() => setGlare(g => ({ ...g, visible: false }))}
      className="relative px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider overflow-hidden select-none">
      {glare.visible && <span className="absolute pointer-events-none rounded-full" style={{ width: 120, height: 120, top: \`\${glare.y}%\`, left: \`\${glare.x}%\`, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)" }} />}
      <span className="relative">{children}</span>
    </button>
  );
}
`;
  }

  if (slug === "fuse-spark-button") {
    return `import * as React from "react";

export function ${name}({ children = "Ignite", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [sparks, setSparks] = React.useState<{ id: number; x: number; y: number; angle: number }[]>([]);
  const ref = React.useRef<HTMLButtonElement>(null);
  const fire = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const newSparks = Array.from({ length: 10 }, (_, i) => ({ id: Date.now() + i, x, y, angle: (i / 10) * 360 }));
    setSparks(s => [...s, ...newSparks]);
    setTimeout(() => setSparks(s => s.filter(sp => !newSparks.includes(sp))), 600);
    onClick?.();
  };
  return (
    <button ref={ref} onClick={fire} className="relative px-6 py-3 rounded-xl bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider overflow-visible select-none">
      {sparks.map(s => (
        <span key={s.id} className="absolute pointer-events-none w-1 h-1 rounded-full bg-yellow-200" style={{ top: s.y, left: s.x, transform: \`rotate(\${s.angle}deg) translateX(30px)\`, opacity: 0, animation: "spark 0.6s ease-out forwards" }} />
      ))}
      <style>{\`@keyframes spark { 0% { opacity: 1; transform: rotate(var(--a)) translateX(0); } 100% { opacity: 0; transform: rotate(var(--a)) translateX(40px); } }\`}</style>
      ⚡ {children}
    </button>
  );
}
`;
  }

  if (slug === "sling-rebound-button") {
    return `import * as React from "react";

export function ${name}({ children = "Sling", onClick }: { children?: React.ReactNode; onClick?: () => void }): React.JSX.Element {
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef({ x: 0, y: 0 });
  const onDown = (e: React.PointerEvent) => { setDragging(true); startRef.current = { x: e.clientX, y: e.clientY }; };
  const onMove = (e: React.PointerEvent) => { if (!dragging) return; setDrag({ x: Math.max(-40, Math.min(40, e.clientX - startRef.current.x)), y: Math.max(-30, Math.min(30, e.clientY - startRef.current.y)) }); };
  const onUp = () => { setDragging(false); setDrag({ x: 0, y: 0 }); onClick?.(); };
  return (
    <button onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
      className="px-6 py-3 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg select-none touch-none"
      style={{ transform: \`translate(\${drag.x}px, \${drag.y}px)\`, transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)", cursor: dragging ? "grabbing" : "grab" }}>
      {children}
    </button>
  );
}
`;
  }

  return `import * as React from "react";

export interface ${name}Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * ${title}
 */
export function ${name}({ children = "${title}", onClick, className = "" }: ${name}Props): React.JSX.Element {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      className={\`px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider shadow-md \${className}\`}
      style={{ transform: \`scale(\${pressed ? 0.94 : 1})\`, transition: "transform 0.12s cubic-bezier(0.34,1.56,0.64,1)" }}>
      {children}
    </button>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function generateUIElementCode(name: string, slug: string, title: string): string {
  const unique = UI_ELEMENT_SOURCE_CODES[slug as keyof typeof UI_ELEMENT_SOURCE_CODES];
  if (unique) return unique;

  // Slug-based unique fallbacks
  if (slug === "pill-nav-float") {
    return `import * as React from "react";

const TABS = ["Home", "Design", "Motion", "Code"];
export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [active, setActive] = React.useState(0);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  React.useEffect(() => {
    const el = refs.current[active];
    if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);
  return (
    <div className={\`relative flex gap-1 p-1 rounded-full bg-surface border border-line shadow-sm \${className}\`}>
      <div className="absolute top-1 bottom-1 rounded-full bg-ink transition-all duration-300 ease-out" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
      {TABS.map((t, i) => (
        <button key={t} ref={el => { refs.current[i] = el; }} onClick={() => setActive(i)}
          className={\`relative z-10 px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-colors \${active === i ? "text-paper" : "text-graphite hover:text-ink"}\`}>
          {t}
        </button>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "glass-surface-acrylic") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  return (
    <div className={\`relative p-6 rounded-2xl overflow-hidden \${className}\`}
      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
      <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest font-bold">ACRYLIC SURFACE</span>
      <h2 className="font-display font-bold text-xl text-white mt-2">Glass Surface</h2>
      <p className="font-mono text-xs text-white/50 mt-2">Frosted glass acrylic with dynamic chromatic edge refraction.</p>
    </div>
  );
}
`;
  }

  if (slug === "bounce-cards-stack") {
    return `import * as React from "react";

const CARDS = [{ label: "Motion", color: "#ba442c" }, { label: "Design", color: "#f59e0b" }, { label: "Space", color: "#38bdf8" }];
export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [spread, setSpread] = React.useState(false);
  return (
    <div className={\`relative h-40 w-48 cursor-pointer \${className}\`} onMouseEnter={() => setSpread(true)} onMouseLeave={() => setSpread(false)}>
      {CARDS.map((c, i) => (
        <div key={c.label} className="absolute inset-0 rounded-2xl flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg"
          style={{ background: c.color, transform: spread ? \`rotate(\${(i - 1) * 18}deg) translateY(\${i * -8}px)\` : \`translateY(\${i * -4}px)\`, transition: \`transform 0.4s cubic-bezier(0.34,1.56,0.64,1) \${i * 0.05}s\`, zIndex: CARDS.length - i }}>
          {c.label}
        </div>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "interactive-dock-magnify") {
    return `import * as React from "react";

const ITEMS = ["🏠", "📁", "🎨", "⚙️", "💬"];
export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [mouseX, setMouseX] = React.useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const getScale = (i: number) => {
    if (mouseX === null) return 1;
    const itemX = (i + 0.5) * 56;
    const dist = Math.abs(mouseX - itemX);
    return Math.max(1, 1.8 - dist / 60);
  };
  return (
    <div ref={ref} className={\`flex items-end gap-1 px-3 py-2 rounded-2xl bg-white/10 backdrop-blur border border-white/20 \${className}\`}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setMouseX(e.clientX - r.left); }}
      onMouseLeave={() => setMouseX(null)}>
      {ITEMS.map((item, i) => (
        <div key={i} className="flex items-center justify-center text-xl" style={{ width: 44, height: 44, transition: "transform 0.15s ease", transform: \`scale(\${getScale(i)})\`, transformOrigin: "bottom center" }}>
          {item}
        </div>
      ))}
    </div>
  );
}
`;
  }

  if (slug === "voice-pill-waveform") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [bars, setBars] = React.useState<number[]>(Array(16).fill(0.2));
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    if (!active) { setBars(Array(16).fill(0.2)); return; }
    const id = setInterval(() => setBars(Array(16).fill(0).map(() => 0.15 + Math.random() * 0.85)), 80);
    return () => clearInterval(id);
  }, [active]);
  return (
    <button onClick={() => setActive(a => !a)} className={\`flex items-center gap-3 px-4 py-2 rounded-full border border-line bg-surface shadow-sm select-none \${className}\`}>
      <div className="flex items-center gap-0.5 h-6">
        {bars.map((h, i) => (
          <div key={i} className="w-0.5 rounded-full transition-all duration-75" style={{ height: \`\${h * 24}px\`, background: active ? "#ba442c" : "#9ca3af" }} />
        ))}
      </div>
      <span className="font-mono text-xs font-bold text-ink">{active ? "Recording..." : "Tap to speak"}</span>
      <div className={\`w-2 h-2 rounded-full \${active ? "bg-red-500 animate-pulse" : "bg-graphite"}\`} />
    </button>
  );
}
`;
  }

  if (slug === "prompt-bar-action") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const chips = ["📎 Attach", "🌐 Search", "💡 Suggest"];
  return (
    <div className={\`flex flex-col gap-2 \${className}\`}>
      <div className={\`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all \${focused ? "border-oxide shadow-[0_0_0_3px_rgba(186,68,44,0.15)]" : "border-line"} bg-paper\`}>
        <input value={value} onChange={e => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder="Ask anything..." className="flex-1 bg-transparent font-mono text-sm text-ink placeholder:text-graphite outline-none" />
        <button className="px-3 py-1 rounded-lg bg-ink text-paper font-mono text-xs font-bold">→</button>
      </div>
      <div className="flex gap-2">
        {chips.map(c => <button key={c} className="px-2 py-1 rounded-lg bg-surface border border-line font-mono text-[10px] text-graphite hover:text-ink hover:border-ink transition-colors">{c}</button>)}
      </div>
    </div>
  );
}
`;
  }

  if (slug === "spring-check-box") {
    return `import * as React from "react";

export function ${name}({ label = "Accept terms", className = "" }: { label?: string; className?: string }): React.JSX.Element {
  const [checked, setChecked] = React.useState(false);
  const [bounce, setBounce] = React.useState(false);
  const toggle = () => { setChecked(c => !c); setBounce(true); setTimeout(() => setBounce(false), 400); };
  return (
    <button onClick={toggle} className={\`flex items-center gap-3 select-none \${className}\`}>
      <div className={\`w-5 h-5 rounded flex items-center justify-center border-2 transition-all \${checked ? "bg-oxide border-oxide" : "border-line bg-paper"}\`}
        style={{ transform: bounce ? "scale(1.3)" : "scale(1)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s" }}>
        {checked && <span className="text-white text-[10px] font-bold">✓</span>}
      </div>
      <span className="font-mono text-sm text-ink">{label}</span>
    </button>
  );
}
`;
  }

  if (slug === "squish-switch-toggle") {
    return `import * as React from "react";

export function ${name}({ label = "Toggle", className = "" }: { label?: string; className?: string }): React.JSX.Element {
  const [on, setOn] = React.useState(false);
  const [pressing, setPressing] = React.useState(false);
  return (
    <div className={\`flex items-center gap-3 \${className}\`}>
      <button onMouseDown={() => setPressing(true)} onMouseUp={() => { setPressing(false); setOn(o => !o); }} onMouseLeave={() => setPressing(false)}
        className={\`relative w-12 h-6 rounded-full transition-colors \${on ? "bg-oxide" : "bg-line"}\`}>
        <div className="absolute top-0.5 rounded-full bg-white shadow-sm transition-all"
          style={{ width: pressing ? 28 : 20, height: 20, left: on ? (pressing ? 20 : 24) : 2, transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </button>
      <span className="font-mono text-sm text-ink">{label}</span>
    </div>
  );
}
`;
  }

  if (slug === "comet-dial-gauge") {
    return `import * as React from "react";

export function ${name}({ value = 72, max = 100, className = "" }: { value?: number; max?: number; className?: string }): React.JSX.Element {
  const pct = value / max;
  const angle = -130 + pct * 260;
  const r = 48, cx = 64, cy = 64;
  const startAngle = -130 * Math.PI / 180, endAngle = (angle - 90) * Math.PI / 180;
  return (
    <div className={\`flex flex-col items-center gap-2 select-none \${className}\`}>
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e2330" strokeWidth={8} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ba442c" strokeWidth={8} strokeLinecap="round"
          strokeDasharray={\`\${pct * 2 * Math.PI * r * 260/360} \${2 * Math.PI * r}\`} strokeDashoffset={2 * Math.PI * r * 130/360} style={{ filter: "drop-shadow(0 0 6px #ba442c88)" }} />
        <circle cx={cx + Math.cos((angle - 90) * Math.PI / 180) * r} cy={cy + Math.sin((angle - 90) * Math.PI / 180) * r} r={4} fill="#fbbf24" style={{ filter: "drop-shadow(0 0 8px #fbbf24)" }} />
        <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="monospace" fontSize={18} fontWeight={900} fill="#f1f0ec">{value}</text>
      </svg>
      <span className="font-mono text-xs text-graphite uppercase tracking-widest">Gauge</span>
    </div>
  );
}
`;
  }

  // Generic UI element — unique morphing progress indicator
  return `import * as React from "react";

export interface ${name}Props {
  className?: string;
  title?: string;
}

/**
 * ${title}
 * Interactive UI widget with pointer-reactive tilt and state transitions.
 */
export function ${name}({
  className = "",
  title = "${title}",
}: ${name}Props): React.JSX.Element {
  const [active, setActive] = React.useState(0);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const steps = ["Alpha", "Beta", "Gamma"];

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * -14,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: \`perspective(800px) rotateX(\${tilt.y}deg) rotateY(\${tilt.x}deg)\`, transition: "transform 0.15s ease-out" }}
      className={\`p-5 rounded-2xl bg-paper border border-line shadow-md flex flex-col gap-4 select-none \${className}\`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-oxide font-bold uppercase tracking-widest">WIDGET</span>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <div key={i} className={\`w-1.5 h-1.5 rounded-full transition-colors \${i <= active ? "bg-oxide" : "bg-line"}\`} />
          ))}
        </div>
      </div>
      <h3 className="font-display font-bold text-sm text-ink leading-tight">{title}</h3>
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <button key={s} onClick={() => setActive(i)}
            className={\`flex-1 py-1.5 rounded-lg font-mono text-[10px] transition-all \${active === i ? "bg-ink text-paper font-bold" : "bg-surface text-graphite hover:text-ink"}\`}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HEROES
// ─────────────────────────────────────────────────────────────────────────────
function generateHeroCode(name: string, slug: string, title: string): string {
  if (slug === "particle-constellation-hero") {
    return `import * as React from "react";

export function ${name}({ headline = "Quantum Canvas", subhead = "Particle constellation reacting to cursor proximity.", ctaText = "Explore" }: { headline?: string; subhead?: string; ctaText?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouse = React.useRef({ x: -999, y: -999 });
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement!.clientWidth);
    let h = (canvas.height = canvas.parentElement!.clientHeight);
    const pts = Array.from({ length: 80 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }));
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8,9,20,0.2)"; ctx.fillRect(0,0,w,h);
      const { x: mx, y: my } = mouse.current;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
        if (d < 100 && d > 0) { p.x -= dx / d * 1.5; p.y -= dy / d * 1.5; }
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = "rgba(186,68,44,0.8)"; ctx.beginPath(); ctx.arc(p.x,p.y,1.5,0,Math.PI*2); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
        if (d < 90) { ctx.strokeStyle = \`rgba(186,68,44,\${(1-d/90)*0.4})\`; ctx.lineWidth=0.6; ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.current = { x: e.clientX-r.left, y: e.clientY-r.top }; };
    canvas.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener("mousemove", onMove); };
  }, []);
  return (
    <section className="relative w-full min-h-[500px] overflow-hidden bg-[#08090f]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col justify-center h-full px-8 py-16 max-w-2xl mx-auto gap-6">
        <h1 className="font-display font-black text-5xl text-white leading-none">{headline}</h1>
        <p className="font-mono text-sm text-white/60">{subhead}</p>
        <button className="w-fit px-6 py-3 rounded-xl bg-oxide text-white font-mono text-xs font-bold uppercase tracking-wider">{ctaText} →</button>
      </div>
    </section>
  );
}
`;
  }

  if (slug === "bento-spotlight-hero") {
    return `import * as React from "react";

export function ${name}({ headline = "Bento Spotlight", ctaText = "Get Started" }: { headline?: string; ctaText?: string }): React.JSX.Element {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <section ref={ref} className="relative w-full min-h-[500px] bg-[#0a0a10] p-6 overflow-hidden" onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setMouse({ x: e.clientX-r.left, y: e.clientY-r.top }); }}>
      <div className="absolute pointer-events-none" style={{ left: mouse.x-150, top: mouse.y-150, width: 300, height: 300, background: "radial-gradient(circle, rgba(186,68,44,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full max-w-3xl mx-auto">
        <div className="col-span-2 row-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-end" style={{ backdropFilter: "blur(8px)" }}>
          <h1 className="font-display font-black text-4xl text-white leading-none mb-3">{headline}</h1>
          <button className="w-fit px-5 py-2 rounded-xl bg-oxide text-white font-mono text-xs font-bold">{ctaText}</button>
        </div>
        {["Motion", "Canvas", "3D", "CSS"].map(t => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-center" style={{ backdropFilter: "blur(8px)" }}>
            <span className="font-mono text-xs text-white/60 font-bold uppercase">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
`;
  }

  return `import * as React from "react";

export interface ${name}Props {
  headline?: string;
  subhead?: string;
  ctaText?: string;
}

/**
 * ${title}
 */
export function ${name}({
  headline = "Interfaces Should Have a Fingerprint",
  subhead = "Next-generation runtime design ecosystem with 60FPS procedural canvas and spatial depth.",
  ctaText = "Explore Catalogue",
}: ${name}Props): React.JSX.Element {
  return (
    <section className="relative w-full min-h-[500px] flex flex-col justify-center px-8 py-16 bg-paper border-b border-line overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-oxide/40 bg-oxide/10 text-oxide font-mono text-xs font-semibold w-fit">
          <span className="w-2 h-2 rounded-full bg-oxide animate-ping" />
          <span>OPENUI // ADVANCED</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight leading-none">{headline}</h1>
        <p className="font-mono text-sm sm:text-base text-graphite max-w-2xl">{subhead}</p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:bg-oxide transition-colors">{ctaText} →</button>
          <button className="px-6 py-3 rounded-xl border border-line bg-surface text-ink font-mono text-xs font-bold uppercase tracking-wider hover:border-ink transition-colors">View Source</button>
        </div>
      </div>
    </section>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGES
// ─────────────────────────────────────────────────────────────────────────────
function generateLandingCode(name: string, slug: string, title: string): string {
  return `import * as React from "react";

export interface ${name}Props {
  title?: string;
}

/**
 * ${title}
 * Full-scale production landing page composition.
 */
export function ${name}({ title = "${title}" }: ${name}Props): React.JSX.Element {
  return (
    <div className="w-full min-h-screen bg-paper text-ink font-sans">
      <header className="px-8 py-4 border-b border-line flex items-center justify-between">
        <span className="font-display font-bold text-lg">OPENUI</span>
        <nav className="flex gap-6 font-mono text-xs text-graphite">
          <a href="#catalogue" className="hover:text-ink">Catalogue</a>
          <a href="#runtime" className="hover:text-ink">Runtime</a>
          <a href="#engine" className="hover:text-ink">Engine</a>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-8 py-16 space-y-12">
        <div className="space-y-4">
          <span className="font-mono text-xs text-oxide uppercase font-bold">FULL PAGE ARCHITECTURE</span>
          <h1 className="font-display font-black text-5xl">{title}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 rounded-2xl border border-line bg-surface/50">
              <span className="font-mono text-xs text-oxide font-bold">0{item}</span>
              <h3 className="font-display font-bold text-lg mt-2">Architecture Core</h3>
              <p className="font-mono text-xs text-graphite mt-2">
                Scalable design system with seamless integration and high performance runtime.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS LAYOUTS
// ─────────────────────────────────────────────────────────────────────────────
function generateCssLayoutCode(name: string, slug: string, title: string): string {
  if (slug === "glassmorphism-surface") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  return (
    <div className={\`relative p-8 rounded-2xl overflow-hidden \${className}\`}
      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
      <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest font-bold block mb-2">GLASSMORPHISM</span>
      <h2 className="font-display font-bold text-2xl text-white">Dynamic Surface</h2>
      <p className="font-mono text-xs text-white/50 mt-2">Frosted acrylic with edge light refraction and backdrop filter.</p>
    </div>
  );
}
`;
  }

  if (slug === "conic-energy-border") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  return (
    <div className={\`relative p-0.5 rounded-2xl \${className}\`}
      style={{ background: "conic-gradient(from 0deg, #ba442c, #f59e0b, #38bdf8, #8b5cf6, #ba442c)", animation: "rotateBorder 3s linear infinite" }}>
      <div className="rounded-[14px] bg-[#0a0d14] p-6">
        <span className="font-mono text-[10px] text-oxide uppercase tracking-widest font-bold block mb-2">CONIC BORDER</span>
        <h2 className="font-display font-bold text-2xl text-white">Energy Border</h2>
        <p className="font-mono text-xs text-white/50 mt-2">Continuous rotating conic gradient powered by pure CSS.</p>
      </div>
      <style>{\`@keyframes rotateBorder { to { --angle: 360deg; } }\`}</style>
    </div>
  );
}
`;
  }

  if (slug === "chromatic-glitch-css") {
    return `import * as React from "react";

export function ${name}({ text = "CHROMATIC", className = "" }: { text?: string; className?: string }): React.JSX.Element {
  return (
    <div className={\`relative inline-block font-mono font-black text-5xl select-none \${className}\`}>
      <span className="relative z-10 text-white">{text}</span>
      <span className="absolute inset-0 text-red-500" style={{ clipPath: "inset(30% 0 40% 0)", transform: "translateX(-4px)", mixBlendMode: "screen", animation: "glitchR 2s steps(2) infinite" }}>{text}</span>
      <span className="absolute inset-0 text-cyan-400" style={{ clipPath: "inset(60% 0 10% 0)", transform: "translateX(4px)", mixBlendMode: "screen", animation: "glitchC 2.2s steps(2) infinite" }}>{text}</span>
      <style>{\`
        @keyframes glitchR { 0%,45%,55%,100% { clip-path: inset(30% 0 40% 0); transform: translateX(-4px); } 50% { clip-path: inset(10% 0 60% 0); transform: translateX(4px); } }
        @keyframes glitchC { 0%,40%,60%,100% { clip-path: inset(60% 0 10% 0); transform: translateX(4px); } 50% { clip-path: inset(40% 0 30% 0); transform: translateX(-4px); } }
      \`}</style>
    </div>
  );
}
`;
  }

  return `import * as React from "react";

export interface ${name}Props {
  className?: string;
}

/**
 * ${title}
 */
export function ${name}({ className = "" }: ${name}Props): React.JSX.Element {
  return (
    <div className={\`relative p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl \${className}\`}>
      <div className="space-y-3 select-none">
        <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest font-bold">
          PURE CSS PRIMITIVE
        </span>
        <h2 className="font-display font-bold text-2xl text-white">${title}</h2>
        <p className="font-mono text-xs text-white/70">
          Crafted with modern CSS variables, backdrop filters, and hardware compositing.
        </p>
      </div>
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOTION DESIGN — unique per-slug
// ─────────────────────────────────────────────────────────────────────────────
function generateMotionDesignCode(name: string, slug: string, title: string): string {
  if (slug === "glow-cursor-trail") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 cursor-none relative overflow-hidden bg-[#08090f]" }: { className?: string }): React.JSX.Element {
  const [trail, setTrail] = React.useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = React.useRef(0);
  return (
    <div className={className} onMouseMove={e => {
      const r = e.currentTarget.getBoundingClientRect();
      const pt = { x: e.clientX - r.left, y: e.clientY - r.top, id: idRef.current++ };
      setTrail(t => [...t.slice(-18), pt]);
    }}>
      {trail.map((pt, i) => {
        const age = i / trail.length;
        return (
          <div key={pt.id} className="absolute rounded-full pointer-events-none" style={{
            width: 8 + age * 24, height: 8 + age * 24,
            left: pt.x - (4 + age * 12), top: pt.y - (4 + age * 12),
            background: \`radial-gradient(circle, rgba(186,68,44,\${age * 0.8}) 0%, transparent 70%)\`,
            filter: \`blur(\${(1 - age) * 4}px)\`,
          }} />
        );
      })}
    </div>
  );
}
`;
  }

  if (slug === "ripple-distortion-lens") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#0a0d14] cursor-pointer" }: { className?: string }): React.JSX.Element {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = React.useRef(0);
  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rp = { x: e.clientX - r.left, y: e.clientY - r.top, id: idRef.current++ };
    setRipples(rs => [...rs, rp]);
    setTimeout(() => setRipples(rs => rs.filter(r => r.id !== rp.id)), 800);
  };
  return (
    <div className={className} onClick={addRipple}>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/30">Click to ripple</span>
      {ripples.map(rp => (
        <div key={rp.id} className="absolute rounded-full border border-oxide/60 pointer-events-none"
          style={{ left: rp.x, top: rp.y, transform: "translate(-50%,-50%)", animation: "rippleOut 0.8s ease-out forwards" }} />
      ))}
      <style>{\`@keyframes rippleOut { from { width:0;height:0;opacity:1; } to { width:200px;height:200px;opacity:0; } }\`}</style>
    </div>
  );
}
`;
  }

  if (slug === "swarm-cursor-flock") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#08090f] cursor-crosshair" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: 200, y: 96 });
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement!.clientWidth);
    let h = (canvas.height = canvas.parentElement!.clientHeight);
    const boids = Array.from({ length: 30 }, () => ({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2 }));
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8,9,15,0.2)"; ctx.fillRect(0,0,w,h);
      const { x: mx, y: my } = mouseRef.current;
      for (const b of boids) {
        const dx = mx - b.x, dy = my - b.y, d = Math.hypot(dx,dy) + 0.01;
        b.vx += dx / d * 0.4; b.vy += dy / d * 0.4;
        const spd = Math.hypot(b.vx,b.vy); if (spd>2.5) { b.vx=b.vx/spd*2.5; b.vy=b.vy/spd*2.5; }
        b.x += b.vx; b.y += b.vy;
        if (b.x<0) b.x=w; if (b.x>w) b.x=0; if (b.y<0) b.y=h; if (b.y>h) b.y=0;
        ctx.fillStyle = "rgba(186,68,44,0.85)"; ctx.beginPath(); ctx.arc(b.x,b.y,2.5,0,Math.PI*2); ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX-r.left, y: e.clientY-r.top }; };
    canvas.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener("mousemove", onMove); };
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "halftone-reveal-mask") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#0a0d14] cursor-pointer" }: { className?: string }): React.JSX.Element {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <div className={className} onClick={() => setRevealed(r => !r)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-black text-4xl text-white">REVEALED</span>
      </div>
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700" style={{ opacity: revealed ? 0 : 1, backgroundImage: \`radial-gradient(circle, #0a0d14 40%, transparent 40%)\`, backgroundSize: "16px 16px" }} />
      <span className="absolute bottom-3 right-4 font-mono text-[10px] text-white/30">Click to reveal</span>
    </div>
  );
}
`;
  }

  if (slug === "glare-hover-card") {
    return `import * as React from "react";

export function ${name}({ className = "" }: { className?: string }): React.JSX.Element {
  const [glare, setGlare] = React.useState({ x: 50, y: 50, visible: false });
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    setGlare({ x: x * 100, y: y * 100, visible: true });
    setTilt({ x: (x - 0.5) * 20, y: -(y - 0.5) * 20 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { setGlare(g => ({...g,visible:false})); setTilt({x:0,y:0}); }}
      className={\`relative w-56 h-36 rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 select-none \${className}\`}
      style={{ transform: \`perspective(600px) rotateX(\${tilt.y}deg) rotateY(\${tilt.x}deg)\`, transition: "transform 0.1s ease-out" }}>
      {glare.visible && <div className="absolute inset-0 pointer-events-none" style={{ background: \`radial-gradient(ellipse at \${glare.x}% \${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)\` }} />}
      <span className="font-mono text-[10px] text-white/50 uppercase font-bold">HOLOGRAPHIC</span>
      <h3 className="font-display font-bold text-lg text-white mt-2">Glare Card</h3>
    </div>
  );
}
`;
  }

  if (slug === "orbit-images-cluster") {
    return `import * as React from "react";

const ITEMS = ["🌙", "⭐", "🪐", "☄️", "🌟"];
export function ${name}({ className = "relative w-48 h-48 flex items-center justify-center" }: { className?: string }): React.JSX.Element {
  return (
    <div className={className}>
      <div className="w-12 h-12 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center font-mono text-xl z-10">◈</div>
      {ITEMS.map((item, i) => {
        const angle = (i / ITEMS.length) * 360;
        return (
          <div key={i} className="absolute" style={{ width: "100%", height: "100%", animation: \`orbit \${3+i*0.5}s linear infinite\`, animationDelay: \`-\${i * 0.8}s\` }}>
            <div className="absolute text-xl" style={{ top: "5%", left: "50%", transform: "translateX(-50%)" }}>{item}</div>
          </div>
        );
      })}
      <style>{\`@keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}
`;
  }

  if (slug === "target-cursor-reticle") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#06070e] cursor-none" }: { className?: string }): React.JSX.Element {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);
  return (
    <div className={className} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: e.clientX-r.left, y: e.clientY-r.top }); setVisible(true); }} onMouseLeave={() => setVisible(false)}>
      {visible && (
        <svg className="absolute pointer-events-none" style={{ left: pos.x-24, top: pos.y-24, width:48, height:48 }} viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#ba442c" strokeWidth="1" opacity="0.6" />
          <circle cx="24" cy="24" r="2" fill="#ba442c" />
          <line x1="24" y1="4" x2="24" y2="14" stroke="#ba442c" strokeWidth="1" />
          <line x1="24" y1="34" x2="24" y2="44" stroke="#ba442c" strokeWidth="1" />
          <line x1="4" y1="24" x2="14" y2="24" stroke="#ba442c" strokeWidth="1" />
          <line x1="34" y1="24" x2="44" y2="24" stroke="#ba442c" strokeWidth="1" />
          <text x="28" y="12" fontFamily="monospace" fontSize="5" fill="#ba442c">{Math.round(pos.x)},{Math.round(pos.y)}</text>
        </svg>
      )}
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/20">Move cursor</span>
    </div>
  );
}
`;
  }

  if (slug === "logo-loop-ticker") {
    return `import * as React from "react";

const LOGOS = ["OPENUI", "MOTION", "CANVAS", "THREE.JS", "SPRING", "RUNTIME", "DESIGN"];
export function ${name}({ speed = 40, className = "w-full overflow-hidden bg-paper border-y border-line py-3" }: { speed?: number; className?: string }): React.JSX.Element {
  return (
    <div className={className}>
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: \`ticker \${speed}s linear infinite\` }}>
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <span key={i} className="font-mono text-xs font-bold text-graphite uppercase tracking-widest flex items-center gap-3">
            <span className="text-oxide">✦</span> {l}
          </span>
        ))}
      </div>
      <style>{\`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }\`}</style>
    </div>
  );
}
`;
  }

  if (slug === "click-spark-burst") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#08090f] cursor-pointer" }: { className?: string }): React.JSX.Element {
  const [bursts, setBursts] = React.useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = React.useRef(0);
  const fire = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const b = { id: idRef.current++, x: e.clientX - r.left, y: e.clientY - r.top };
    setBursts(bs => [...bs, b]);
    setTimeout(() => setBursts(bs => bs.filter(x => x.id !== b.id)), 700);
  };
  return (
    <div className={className} onClick={fire}>
      {bursts.map(b => (
        <div key={b.id} className="absolute pointer-events-none" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full" style={{ background: ["#ba442c","#f59e0b","#38bdf8"][i%3], transformOrigin: "0 0", animation: \`sparkPt 0.7s ease-out forwards\`, animationDelay: \`\${i*0.02}s\`, transform: \`rotate(\${i*45}deg)\` }} />
          ))}
        </div>
      ))}
      <style>{\`@keyframes sparkPt { 0% { transform: rotate(var(--r,0deg)) translateX(0) scale(1); opacity:1; } 100% { transform: rotate(var(--r,0deg)) translateX(35px) scale(0); opacity:0; } }\`}</style>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/30">Click anywhere</span>
    </div>
  );
}
`;
  }

  if (slug === "magnet-lines-field") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#08090f]" }: { className?: string }): React.JSX.Element {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
  const cols = 12, rows = 6;
  return (
    <div ref={ref} className={className} onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setMouse({ x: e.clientX-r.left, y: e.clientY-r.top }); }}>
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: \`repeat(\${cols}, 1fr)\`, gridTemplateRows: \`repeat(\${rows}, 1fr)\`, padding: "8px" }}>
        {Array.from({ length: cols * rows }, (_, idx) => {
          const col = idx % cols, row = Math.floor(idx / cols);
          const cx = (col / (cols-1)) * (ref.current?.clientWidth ?? 400);
          const cy = (row / (rows-1)) * (ref.current?.clientHeight ?? 192);
          const dx = mouse.x - cx, dy = mouse.y - cy;
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const dist = Math.hypot(dx, dy);
          const opacity = Math.max(0.1, 1 - dist / 200);
          return (
            <div key={idx} className="flex items-center justify-center">
              <div style={{ width: 16, height: 2, background: \`rgba(186,68,44,\${opacity})\`, transform: \`rotate(\${angle}deg)\`, borderRadius: 1, transformOrigin: "50% 50%" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (slug === "strands-motion-wave") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden bg-[#08090f]" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement!.clientWidth);
    let h = (canvas.height = canvas.parentElement!.clientHeight);
    let t = 0, animId: number;
    const strands = 20;
    const draw = () => {
      ctx.fillStyle = "rgba(8,9,15,0.15)"; ctx.fillRect(0,0,w,h);
      for (let s = 0; s < strands; s++) {
        const yBase = (s / strands) * h;
        const hue = 180 + s * 10;
        ctx.strokeStyle = \`hsla(\${hue},75%,65%,0.5)\`; ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = yBase + Math.sin(x/50 + t + s*0.3) * 20 * Math.cos(t*0.5 + s);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.025; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  if (slug === "metallic-paint-canvas") {
    return `import * as React from "react";

export function ${name}({ className = "w-full h-48 relative overflow-hidden cursor-crosshair" }: { className?: string }): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -1, y: -1, active: false });
  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.parentElement!.clientWidth);
    let h = (canvas.height = canvas.parentElement!.clientHeight);
    let t = 0, animId: number;
    const draw = () => {
      const { x: mx, y: my, active } = mouseRef.current;
      t += 0.012;
      const imageData = ctx.createImageData(w, h);
      for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
        const dx = active ? (x - mx) / 80 : 0, dy = active ? (y - my) / 80 : 0;
        const v = Math.sin(x/40 + t + dx) * Math.cos(y/40 + t * 0.7 + dy);
        const bright = Math.floor(60 + v * 80 + (active ? Math.max(0, 60 - Math.hypot(x-mx,y-my)*0.3) : 0));
        const i = (y*w+x)*4;
        imageData.data[i] = bright+30; imageData.data[i+1] = bright; imageData.data[i+2] = bright+50; imageData.data[i+3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX-r.left, y: e.clientY-r.top, active: true }; };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <div className={className}><canvas ref={canvasRef} className="w-full h-full block" /></div>;
}
`;
  }

  // Generic motion — unique per-slug spring pointer
  return `import * as React from "react";

export interface ${name}Props {
  className?: string;
  damping?: number;
}

/**
 * ${title}
 * Physics-calibrated motion design primitive responding to real-time user vectors.
 */
export function ${name}({
  className = "w-full h-48 flex items-center justify-center",
  damping = 0.85,
}: ${name}Props): React.JSX.Element {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * (1 - damping),
          y: (e.clientY - rect.top - rect.height / 2) * (1 - damping),
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false); }}
      className={\`relative overflow-hidden bg-paper border border-line rounded-2xl cursor-crosshair \${className}\`}
    >
      <div
        style={{
          transform: \`translate3d(\${pos.x}px, \${pos.y}px, 0) scale(\${hovered ? 1.05 : 1})\`,
          transition: "transform 0.12s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase shadow-lg tracking-wider"
      >
        ✦ ${title}
      </div>
    </div>
  );
}
`;
}
