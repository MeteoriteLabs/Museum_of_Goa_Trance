import { type SubMilestone } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface SubTimelineProps {
  milestones: SubMilestone[];
}

export default function SubTimeline({ milestones }: SubTimelineProps) {
  return (
    <div className="mt-6 relative" data-testid="sub-timeline">
      <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />
      <div className="space-y-0">
        {milestones.map((m, i) => (
          <ScrollReveal key={i} delay={i * 0.04}>
            <div className="relative flex gap-4 py-3 pl-0" data-testid={`milestone-${i}`}>
              <div className="flex flex-col items-center flex-shrink-0 z-10 mt-1.5">
                <div
                  className={cn(
                    "w-[15px] h-[15px] rounded-full border-2",
                    m.highlight
                      ? "bg-primary border-primary"
                      : "bg-background border-muted-foreground/30"
                  )}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      m.highlight ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {m.year}
                  </span>
                  <span className="text-sm font-semibold">{m.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {m.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
