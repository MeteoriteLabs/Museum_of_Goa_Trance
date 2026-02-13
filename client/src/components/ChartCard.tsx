import { Card } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";

interface ChartCardProps {
  src: string;
  title: string;
  caption?: string;
  onClick?: () => void;
  delay?: number;
}

export default function ChartCard({ src, title, caption, onClick, delay = 0 }: ChartCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <Card
        className="overflow-visible cursor-pointer hover-elevate"
        onClick={onClick}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} chart in detail`}
        data-testid={`chart-card-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <div className="p-4">
          <div className="rounded-md overflow-hidden bg-muted">
            <img
              src={src}
              alt={title}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <h4 className="font-medium text-sm mt-3" data-testid={`text-chart-title-${title.toLowerCase().replace(/\s/g, "-")}`}>{title}</h4>
          {caption && (
            <p className="text-xs text-muted-foreground mt-1" data-testid={`text-chart-caption-${title.toLowerCase().replace(/\s/g, "-")}`}>{caption}</p>
          )}
        </div>
      </Card>
    </ScrollReveal>
  );
}
