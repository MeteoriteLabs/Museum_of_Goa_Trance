import { motion } from "framer-motion";
import { TIMELINE_ERAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimelineRailProps {
  activeIndex: number;
}

export default function TimelineRail({ activeIndex }: TimelineRailProps) {
  return (
    <div
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[80]"
      data-testid="timeline-rail"
    >
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col"
      >
        <div
          className="absolute left-[4px] top-[5px] bottom-[5px] w-0.5 bg-muted-foreground/15"
          aria-hidden="true"
        />
        <div
          className="absolute left-[4px] top-[5px] w-0.5 bg-primary/50 transition-all duration-300"
          style={{
            height:
              activeIndex <= 0
                ? 0
                : `${(activeIndex / (TIMELINE_ERAS.length - 1)) * 100}%`,
          }}
          aria-hidden="true"
        />

        {TIMELINE_ERAS.map((era, i) => (
          <a
            key={era.id}
            href={`#${era.id}`}
            className="relative flex items-center gap-3 group py-[7px]"
            data-testid={`rail-${era.id}`}
          >
            <div
              className={cn(
                "relative z-10 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                i <= activeIndex
                  ? "bg-primary border-primary"
                  : "bg-background border-muted-foreground/30"
              )}
            />
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
      </motion.div>
    </div>
  );
}
