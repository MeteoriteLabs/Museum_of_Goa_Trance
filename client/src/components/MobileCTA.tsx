import { Button } from "@/components/ui/button";
import { PETITION_LINK } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] sm:hidden bg-background/95 backdrop-blur-md border-t p-3" data-testid="mobile-cta">
      <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full" data-testid="button-petition-mobile">
          Sign the Petition
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </a>
    </div>
  );
}
