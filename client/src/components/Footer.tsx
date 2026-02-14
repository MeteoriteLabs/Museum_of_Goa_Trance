import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PETITION_LINK, CONTACT_EMAIL, SOCIAL_IG, SOCIAL_X, NAV_LINKS } from "@/lib/constants";
import { ExternalLink, Mail, Copy, ArrowUpRight } from "lucide-react";
import { SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";
import logoImg from "@assets/IMG-20260215-WA0000_1771098793262.jpg";

export default function Footer() {
  const { toast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({ title: "Link copied", description: "Share it with others." });
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        "Protect the Birthplace \u2014 Goa's Trance Heritage. Learn more: " + window.location.origin
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
    <footer className="mt-20" data-testid="footer">
      <ScrollReveal>
        <div className="bg-foreground/[0.03] border-t">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <img
                src={logoImg}
                alt="Museum of Goa Trance"
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                data-testid="img-footer-logo"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/70 font-semibold mb-3" data-testid="text-footer-tagline">
                A Cultural Preservation Initiative
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-3 leading-tight" data-testid="text-footer-heading">
                Protect the Birthplace
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Add your voice to safeguard Goa's trance heritage for future generations.
                Every signature strengthens the case for official recognition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" data-testid="button-petition-footer">
                  Sign the Petition
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Button variant="outline" size="lg" data-testid="button-contact-footer">
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  Get in Touch
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="text-xs text-muted-foreground/60 mr-1" data-testid="text-share-label">Share:</span>
              <Button variant="ghost" size="icon" onClick={copyLink} data-testid="button-copy-link">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={shareWhatsApp} data-testid="button-share-whatsapp">
                <SiWhatsapp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={shareX} data-testid="button-share-x">
                <SiX className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="border-t pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4">
                    Explore
                  </p>
                  <nav className="flex flex-col gap-2.5">
                    {NAV_LINKS.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span
                          className="text-sm text-muted-foreground cursor-pointer inline-flex items-center gap-1"
                          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4">
                    Connect
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm text-muted-foreground inline-flex items-center gap-1.5"
                      data-testid="link-contact-email"
                    >
                      <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                      {CONTACT_EMAIL}
                    </a>
                    <a
                      href={SOCIAL_IG}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground inline-flex items-center gap-1.5"
                      data-testid="link-instagram"
                    >
                      <SiInstagram className="h-3.5 w-3.5 flex-shrink-0" />
                      Instagram
                      <ArrowUpRight className="h-3 w-3 opacity-40" />
                    </a>
                    <a
                      href={SOCIAL_X}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground inline-flex items-center gap-1.5"
                      data-testid="link-x"
                    >
                      <SiX className="h-3.5 w-3.5 flex-shrink-0" />
                      X / Twitter
                      <ArrowUpRight className="h-3 w-3 opacity-40" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4">
                    About
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    An independent research and advocacy effort documenting Goa's role as the
                    birthplace of a global music culture. All data sourced from official
                    government publications and peer-reviewed research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="border-t bg-foreground/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/50" data-testid="text-footer-copyright">
            Museum of Goa Trance Initiative, 2026
          </p>
          <p className="text-xs text-muted-foreground/50" data-testid="text-footer-tagline-bottom">
            Made with love, from Goa to the world
          </p>
        </div>
      </div>

      <div className="sm:hidden h-20" />
    </footer>
  );
}
