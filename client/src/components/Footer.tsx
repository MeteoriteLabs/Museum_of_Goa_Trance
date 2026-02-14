import { Button } from "@/components/ui/button";
import { PETITION_LINK, CONTACT_EMAIL, SOCIAL_IG, SOCIAL_X } from "@/lib/constants";
import { ExternalLink, Mail, Copy, Share2 } from "lucide-react";
import { SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({ title: "Link copied", description: "Share it with others." });
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        "Protect the Birthplace — Goa's Trance Heritage. Learn more: " + window.location.origin
      )}`,
      "_blank"
    );
  };

  const shareX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(
        "Goa gave the world a musical movement. Now it\u2019s time to protect the birthplace. #ProtectTheBirthplace"
      )}&url=${encodeURIComponent(window.location.origin)}`,
      "_blank"
    );
  };

  return (
    <footer className="border-t bg-card/50 mt-20" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Support Cultural Preservation
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Add your voice to protect Goa's trance heritage for future generations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
            <Button data-testid="button-petition-footer">
              Sign the Petition
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </a>
          <Button variant="outline" size="sm" onClick={copyLink} data-testid="button-copy-link">
            <Copy className="mr-1 h-3 w-3" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm" onClick={shareWhatsApp} data-testid="button-share-whatsapp">
            <SiWhatsapp className="mr-1 h-3 w-3" />
            WhatsApp
          </Button>
          <Button variant="outline" size="sm" onClick={shareX} data-testid="button-share-x">
            <SiX className="mr-1 h-3 w-3" />
            Share
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            data-testid="link-contact-email"
          >
            <Mail className="h-3.5 w-3.5" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={SOCIAL_IG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            data-testid="link-instagram"
          >
            <SiInstagram className="h-3.5 w-3.5" />
            Instagram
          </a>
          <a
            href={SOCIAL_X}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            data-testid="link-x"
          >
            <SiX className="h-3.5 w-3.5" />
            X / Twitter
          </a>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground/60">
          A cultural preservation initiative. All data sourced from official government publications.
        </div>
      </div>
      <div className="sm:hidden h-20" />
    </footer>
  );
}
