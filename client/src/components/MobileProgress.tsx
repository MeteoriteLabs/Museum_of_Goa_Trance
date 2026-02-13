import { TIMELINE_ERAS } from "@/lib/constants";

interface MobileProgressProps {
  activeIndex: number;
}

export default function MobileProgress({ activeIndex }: MobileProgressProps) {
  const progress = ((activeIndex + 1) / TIMELINE_ERAS.length) * 100;
  const label = TIMELINE_ERAS[activeIndex]?.label || "";

  return (
    <div className="lg:hidden fixed top-[57px] left-0 right-0 z-[90] bg-background/90 backdrop-blur-sm border-b" data-testid="mobile-progress">
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] text-muted-foreground whitespace-nowrap font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}
