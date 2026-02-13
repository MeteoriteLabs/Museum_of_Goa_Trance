import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode, ErrorInfo } from "react";
import GlobeGL from "react-globe.gl";
import ScrollReveal from "./ScrollReveal";

const GOA_LAT = 15.4;
const GOA_LNG = 73.8;

const DESTINATIONS = [
  { name: "Portugal", lat: 39.4, lng: -8.2 },
  { name: "Hungary", lat: 47.5, lng: 19.0 },
  { name: "Brazil", lat: -14.2, lng: -51.9 },
  { name: "Germany", lat: 52.5, lng: 13.4 },
  { name: "Thailand", lat: 15.9, lng: 100.9 },
  { name: "Australia", lat: -25.3, lng: 133.8 },
];

const arcsData = DESTINATIONS.map((dest) => ({
  startLat: GOA_LAT,
  startLng: GOA_LNG,
  endLat: dest.lat,
  endLng: dest.lng,
  name: dest.name,
}));

const labelsData = [
  { lat: GOA_LAT, lng: GOA_LNG, text: "Goa", size: 1.2, color: "rgba(30,120,160,0.95)" },
  ...DESTINATIONS.map((d) => ({
    lat: d.lat,
    lng: d.lng,
    text: d.name,
    size: 0.8,
    color: "rgba(30,90,130,0.85)",
  })),
];

const pointsData = [
  { lat: GOA_LAT, lng: GOA_LNG, size: 0.6, color: "rgba(30,120,160,0.9)" },
  ...DESTINATIONS.map((d) => ({
    lat: d.lat,
    lng: d.lng,
    size: 0.3,
    color: "rgba(30,120,160,0.7)",
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
        Interactive 3D globe — showing the spread of Goa's trance heritage to Portugal, Hungary, Brazil, Germany, Thailand, and Australia.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">Goa</span>
        {DESTINATIONS.map((d) => (
          <span key={d.name} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{d.name}</span>
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
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#3c8cb4"
        atmosphereAltitude={0.2}
        arcsData={arcsData}
        arcColor={() => ["rgba(30,120,160,0.6)", "rgba(60,180,220,0.6)"]}
        arcStroke={0.8}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitudeAutoScale={0.4}
        labelsData={labelsData}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.text}
        labelSize={(d: any) => d.size}
        labelColor={(d: any) => d.color}
        labelResolution={2}
        labelAltitude={0.01}
        labelDotRadius={0.4}
        pointsData={pointsData}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointRadius={(d: any) => d.size}
        pointAltitude={0.01}
        ringsData={ringsData}
        ringColor={() => (t: number) => `rgba(30,120,160,${1 - t})`}
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
