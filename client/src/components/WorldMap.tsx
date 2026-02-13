import { useEffect, useRef, useState } from "react";
import { GOA_COORDS, WORLD_MAP_ROUTES } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollReveal>
      <div className="relative w-full max-w-lg mx-auto" data-testid="world-map">
        <svg
          ref={svgRef}
          viewBox="0 0 600 420"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="420" fill="none" />

          <ellipse cx="230" cy="210" rx="160" ry="120" fill="hsl(var(--muted))" opacity="0.4" />
          <ellipse cx="420" cy="250" rx="120" ry="100" fill="hsl(var(--muted))" opacity="0.3" />
          <ellipse cx="140" cy="300" rx="80" ry="70" fill="hsl(var(--muted))" opacity="0.25" />
          <ellipse cx="500" cy="340" rx="70" ry="50" fill="hsl(var(--muted))" opacity="0.2" />

          <text x="200" y="180" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5">Europe</text>
          <text x="70" y="300" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5">S. America</text>
          <text x="430" y="230" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5">Asia</text>
          <text x="460" y="360" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5">Australia</text>

          {WORLD_MAP_ROUTES.map((route, i) => {
            const dx = route.coords.x - GOA_COORDS.x;
            const dy = route.coords.y - GOA_COORDS.y;
            const cx = GOA_COORDS.x + dx * 0.5;
            const cy = GOA_COORDS.y + dy * 0.5 - 30;
            const path = `M${GOA_COORDS.x},${GOA_COORDS.y} Q${cx},${cy} ${route.coords.x},${route.coords.y}`;

            return (
              <g key={route.to}>
                <path
                  d={path}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeDasharray="200"
                  strokeDashoffset={visible ? 0 : 200}
                  opacity="0.5"
                  style={{
                    transition: `stroke-dashoffset 1.2s ease-out ${0.3 + i * 0.15}s`,
                  }}
                />
                <circle
                  cx={route.coords.x}
                  cy={route.coords.y}
                  r="4"
                  fill="hsl(var(--primary))"
                  opacity={visible ? 0.7 : 0}
                  style={{
                    transition: `opacity 0.4s ease-out ${0.8 + i * 0.15}s`,
                  }}
                />
                <text
                  x={route.coords.x}
                  y={route.coords.y - 8}
                  fontSize="9"
                  fill="hsl(var(--foreground))"
                  textAnchor="middle"
                  opacity={visible ? 0.8 : 0}
                  style={{
                    transition: `opacity 0.4s ease-out ${0.9 + i * 0.15}s`,
                  }}
                >
                  {route.to}
                </text>
              </g>
            );
          })}

          <circle
            cx={GOA_COORDS.x}
            cy={GOA_COORDS.y}
            r="6"
            fill="hsl(var(--primary))"
          />
          <circle
            cx={GOA_COORDS.x}
            cy={GOA_COORDS.y}
            r="10"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            opacity="0.4"
          />
          <text
            x={GOA_COORDS.x}
            y={GOA_COORDS.y - 14}
            fontSize="11"
            fontWeight="600"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            Goa
          </text>
        </svg>
      </div>
    </ScrollReveal>
  );
}
