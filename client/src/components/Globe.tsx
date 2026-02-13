import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode, ErrorInfo } from "react";
import GlobeGL from "react-globe.gl";
import ScrollReveal from "./ScrollReveal";

const GOA_LAT = 15.4;
const GOA_LNG = 73.8;

const DESTINATIONS = [
  { name: "Portugal", festival: "Boom Festival", lat: 39.4, lng: -8.2 },
  { name: "Hungary", festival: "Ozora Festival", lat: 47.5, lng: 19.0 },
  { name: "Brazil", festival: "Universo Paralello", lat: -14.2, lng: -51.9 },
  { name: "Germany", festival: "Antaris Project", lat: 52.5, lng: 13.4 },
  { name: "Thailand", festival: "The Experience", lat: 15.9, lng: 100.9 },
  { name: "Australia", festival: "Rainbow Serpent", lat: -25.3, lng: 133.8 },
];

const arcsData = DESTINATIONS.map((dest) => ({
  startLat: GOA_LAT,
  startLng: GOA_LNG,
  endLat: dest.lat,
  endLng: dest.lng,
  name: dest.name,
}));

const labelsData = [
  { lat: GOA_LAT, lng: GOA_LNG, text: "Goa (Origin)", size: 1.6, color: "rgba(255,255,255,0.95)" },
  ...DESTINATIONS.map((d) => ({
    lat: d.lat,
    lng: d.lng,
    text: `${d.name}\n${d.festival}`,
    size: 1.0,
    color: "rgba(220,240,255,0.9)",
  })),
];

const pointsData = [
  { lat: GOA_LAT, lng: GOA_LNG, size: 0.8, color: "#4dd8e0" },
  ...DESTINATIONS.map((d) => ({
    lat: d.lat,
    lng: d.lng,
    size: 0.4,
    color: "#4dd8e0",
  })),
];

const ringsData = [{ lat: GOA_LAT, lng: GOA_LNG, maxR: 5, propagationSpeed: 2, repeatPeriod: 1200 }];

class GlobeErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.warn("Globe rendering error:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GlobeFallback({ height }: { height: number }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-md bg-muted/30 border border-border"
      style={{ height }}
      data-testid="globe-fallback"
    >
      <p className="text-sm text-muted-foreground text-center px-4">
        Interactive 3D globe — showing the spread of Goa's trance heritage worldwide.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">Goa (Origin)</span>
        {DESTINATIONS.map((d) => (
          <span key={d.name} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            {d.name} — {d.festival}
          </span>
        ))}
      </div>
    </div>
  );
}

function GlobeRenderer() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 450 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const w = containerRef.current.getBoundingClientRect().width;
        const h = Math.min(w * 0.75, 500);
        setDimensions({ width: w, height: h });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      globe.pointOfView({ lat: 25, lng: 40, altitude: 2.2 }, 0);
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.4;
      globe.controls().enableZoom = false;
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#4dd8e0"
        atmosphereAltitude={0.18}
        arcsData={arcsData}
        arcColor={() => ["rgba(77,216,224,0.7)", "rgba(120,230,240,0.7)"]}
        arcStroke={1.2}
        arcDashLength={0.5}
        arcDashGap={0.15}
        arcDashAnimateTime={1800}
        arcAltitudeAutoScale={0.45}
        labelsData={labelsData}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.text}
        labelSize={(d: any) => d.size}
        labelColor={(d: any) => d.color}
        labelResolution={3}
        labelAltitude={0.015}
        labelDotRadius={0.5}
        pointsData={pointsData}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointRadius={(d: any) => d.size}
        pointAltitude={0.01}
        ringsData={ringsData}
        ringColor={() => (t: number) => `rgba(77,216,224,${1 - t})`}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        enablePointerInteraction={false}
      />
    </div>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(450);
  const webglSupported = useRef(hasWebGL());

  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.getBoundingClientRect().width;
      setHeight(Math.min(w * 0.75, 500));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [visible]);

  if (!webglSupported.current) {
    return (
      <ScrollReveal>
        <div ref={containerRef} data-testid="globe-visualization">
          <GlobeFallback height={height} />
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div ref={containerRef} data-testid="globe-visualization" style={{ minHeight: height }}>
        {visible ? (
          <GlobeErrorBoundary fallback={<GlobeFallback height={height} />}>
            <GlobeRenderer />
          </GlobeErrorBoundary>
        ) : (
          <div className="w-full flex items-center justify-center" style={{ height }}>
            <p className="text-sm text-muted-foreground">Loading globe...</p>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
