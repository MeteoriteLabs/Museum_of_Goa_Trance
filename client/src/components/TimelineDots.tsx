import { motion } from "framer-motion";
import { TIMELINE_ERAS } from "@/lib/constants";

export default function TimelineDots() {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap px-4">
      {TIMELINE_ERAS.map((era, i) => (
        <motion.a
          key={era.id}
          href={`#${era.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.08, duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-1.5 rounded-md px-1 py-0.5"
          data-testid={`dot-${era.id}`}
        >
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="text-[11px] text-white/70 whitespace-nowrap">
            {era.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
