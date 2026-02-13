import { TIMELINE_ERAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimelineRailProps {
  activeIndex: number;
}

export default function TimelineRail({ activeIndex }: TimelineRailProps) {
  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[80] flex-col items-center gap-0" data-testid="timeline-rail">
      <div className="relative flex flex-col items-center">
        {TIMELINE_ERAS.map((era, i) => (
          <a
            key={era.id}
            href={`#${era.id}`}
            className="flex items-center gap-3 group py-2"
            data-testid={`rail-${era.id}`}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 transition-all duration-300",
                  i <= activeIndex
                    ? "bg-primary border-primary"
                    : "bg-transparent border-muted-foreground/30"
                )}
              />
              {i < TIMELINE_ERAS.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 h-6 transition-colors duration-300",
                    i < activeIndex ? "bg-primary/50" : "bg-muted-foreground/15"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-[11px] whitespace-nowrap transition-colors duration-300",
                i === activeIndex
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/60"
              )}
            >
              {era.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
