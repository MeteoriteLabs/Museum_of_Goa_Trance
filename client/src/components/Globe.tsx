import { useEffect, useRef, useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

const GOA_LAT = 15.4;
const GOA_LON = 73.8;

const DESTINATIONS: { name: string; lat: number; lon: number }[] = [
  { name: "Portugal", lat: 39.4, lon: -8.2 },
  { name: "Hungary", lat: 47.5, lon: 19.0 },
  { name: "Brazil", lat: -14.2, lon: -51.9 },
  { name: "Germany", lat: 52.5, lon: 13.4 },
  { name: "Thailand", lat: 15.9, lon: 100.9 },
  { name: "Australia", lat: -25.3, lon: 133.8 },
];

function latLonToSphere(lat: number, lon: number, radius: number, rotation: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + rotation) * (Math.PI / 180);
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number) {
  const scale = fov / (fov + z);
  return { px: cx + x * scale, py: cy - y * scale, scale, visible: z < fov * 0.9 };
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rotation: number,
  arcProgress: number,
  dpr: number,
  isDark: boolean
) {
  ctx.clearRect(0, 0, w * dpr, h * dpr);
  ctx.save();
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.38;
  const fov = 600;

  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.3);
  if (isDark) {
    bgGrad.addColorStop(0, "rgba(30,60,80,0.08)");
    bgGrad.addColorStop(1, "rgba(0,0,0,0)");
  } else {
    bgGrad.addColorStop(0, "rgba(40,90,120,0.05)");
    bgGrad.addColorStop(1, "rgba(0,0,0,0)");
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const globeGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
  if (isDark) {
    globeGrad.addColorStop(0, "rgba(50,90,110,0.25)");
    globeGrad.addColorStop(0.7, "rgba(30,60,80,0.15)");
    globeGrad.addColorStop(1, "rgba(20,40,60,0.08)");
  } else {
    globeGrad.addColorStop(0, "rgba(40,110,140,0.12)");
    globeGrad.addColorStop(0.7, "rgba(40,100,130,0.06)");
    globeGrad.addColorStop(1, "rgba(40,80,110,0.03)");
  }
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = globeGrad;
  ctx.fill();

  ctx.strokeStyle = isDark ? "rgba(100,170,200,0.12)" : "rgba(40,100,140,0.1)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = isDark ? "rgba(100,170,200,0.07)" : "rgba(40,100,140,0.06)";
  ctx.lineWidth = 0.4;

  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let started = false;
    for (let lon = 0; lon <= 360; lon += 3) {
      const p = latLonToSphere(lat, lon, radius, rotation);
      const { px, py, visible } = project(p.x, p.y, p.z, cx, cy, fov);
      if (visible) {
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      } else {
        started = false;
      }
    }
    ctx.stroke();
  }

  for (let lon = -180; lon < 180; lon += 30) {
    ctx.beginPath();
    let started = false;
    for (let lat = -90; lat <= 90; lat += 3) {
      const p = latLonToSphere(lat, lon, radius, rotation);
      const { px, py, visible } = project(p.x, p.y, p.z, cx, cy, fov);
      if (visible) {
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      } else {
        started = false;
      }
    }
    ctx.stroke();
  }

  const landAreas: { lat: number; lon: number; r: number }[] = [
    { lat: 48, lon: 10, r: 18 }, { lat: 55, lon: 35, r: 15 },
    { lat: 35, lon: -5, r: 10 }, { lat: 50, lon: -3, r: 8 },
    { lat: 25, lon: 78, r: 20 }, { lat: 35, lon: 105, r: 22 },
    { lat: 40, lon: -100, r: 25 }, { lat: -5, lon: 20, r: 20 },
    { lat: -15, lon: -50, r: 18 }, { lat: -25, lon: 135, r: 16 },
    { lat: 10, lon: 105, r: 12 }, { lat: 60, lon: 90, r: 20 },
    { lat: 5, lon: 35, r: 10 }, { lat: 30, lon: 50, r: 8 },
    { lat: 36, lon: 140, r: 6 },
  ];

  for (const area of landAreas) {
    const p = latLonToSphere(area.lat, area.lon, radius, rotation);
    const proj = project(p.x, p.y, p.z, cx, cy, fov);
    if (proj.visible) {
      ctx.beginPath();
      ctx.arc(proj.px, proj.py, area.r * proj.scale, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(80,150,180,0.1)" : "rgba(40,100,140,0.07)";
      ctx.fill();
    }
  }

  const goaP = latLonToSphere(GOA_LAT, GOA_LON, radius, rotation);
  const goaProj = project(goaP.x, goaP.y, goaP.z, cx, cy, fov);

  DESTINATIONS.forEach((dest, i) => {
    const destP = latLonToSphere(dest.lat, dest.lon, radius, rotation);
    const destProj = project(destP.x, destP.y, destP.z, cx, cy, fov);

    if (goaProj.visible && destProj.visible) {
      const segProgress = Math.min(1, Math.max(0, arcProgress * DESTINATIONS.length - i));

      if (segProgress > 0) {
        const steps = 40;
        ctx.beginPath();
        let started = false;
        const drawSteps = Math.floor(steps * segProgress);

        for (let s = 0; s <= drawSteps; s++) {
          const t = s / steps;
          const lat = GOA_LAT + (dest.lat - GOA_LAT) * t;
          const lon = GOA_LON + (dest.lon - GOA_LON) * t;
          const alt = 1 + Math.sin(t * Math.PI) * 0.15;
          const p = latLonToSphere(lat, lon, radius * alt, rotation);
          const proj = project(p.x, p.y, p.z, cx, cy, fov);
          if (proj.visible) {
            if (!started) { ctx.moveTo(proj.px, proj.py); started = true; }
            else ctx.lineTo(proj.px, proj.py);
          }
        }
        ctx.strokeStyle = isDark ? "rgba(100,200,230,0.5)" : "rgba(30,120,160,0.45)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (segProgress >= 1) {
        ctx.beginPath();
        ctx.arc(destProj.px, destProj.py, 3.5 * destProj.scale, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(100,200,230,0.7)" : "rgba(30,120,160,0.6)";
        ctx.fill();

        ctx.font = `${10 * destProj.scale}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = isDark ? "rgba(200,220,230,0.85)" : "rgba(30,50,60,0.8)";
        ctx.textAlign = "center";
        ctx.fillText(dest.name, destProj.px, destProj.py - 8 * destProj.scale);
      }
    }
  });

  if (goaProj.visible) {
    ctx.beginPath();
    ctx.arc(goaProj.px, goaProj.py, 14 * goaProj.scale, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(100,200,230,0.08)" : "rgba(30,120,160,0.06)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(goaProj.px, goaProj.py, 5 * goaProj.scale, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(100,200,230,0.9)" : "rgba(30,120,160,0.8)";
    ctx.fill();

    ctx.font = `bold ${12 * goaProj.scale}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = isDark ? "rgba(230,240,245,0.95)" : "rgba(20,40,50,0.9)";
    ctx.textAlign = "center";
    ctx.fillText("Goa", goaProj.px, goaProj.py - 12 * goaProj.scale);
  }

  ctx.restore();
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(-70);
  const arcProgressRef = useRef(0);
  const startTimeRef = useRef(0);

  const isDark = useCallback(() => {
    return document.documentElement.classList.contains("dark");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          startTimeRef.current = performance.now();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = Math.min(rect.width * 0.85, 500);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      return { w, h, dpr };
    };

    let dims = resize();

    const animate = () => {
      if (!dims) dims = resize();
      if (!dims) return;

      if (visible) {
        const elapsed = performance.now() - startTimeRef.current;
        rotationRef.current = -70 + Math.min(elapsed / 80, 20);
        arcProgressRef.current = Math.min(1, elapsed / 3000);
      }

      drawGlobe(ctx, dims.w, dims.h, rotationRef.current, arcProgressRef.current, window.devicePixelRatio || 1, isDark());
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      dims = resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [visible, isDark]);

  return (
    <ScrollReveal>
      <div ref={containerRef} className="relative w-full" data-testid="globe-visualization">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </ScrollReveal>
  );
}
