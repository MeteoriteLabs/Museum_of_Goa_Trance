import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  title: string;
  caption?: string;
  sourceLinks?: { label: string; url: string }[];
}

export default function ChartModal({
  open,
  onOpenChange,
  src,
  title,
  caption,
  sourceLinks,
}: ChartModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="chart-modal">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {caption && <DialogDescription>{caption}</DialogDescription>}
        </DialogHeader>
        <div className="rounded-md overflow-hidden bg-muted">
          <img src={src} alt={title} className="w-full h-auto object-contain" />
        </div>
        {sourceLinks && sourceLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {sourceLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" data-testid={`button-modal-source-${i}`}>
                  {link.label}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </a>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
