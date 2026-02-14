import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Mail, ExternalLink } from "lucide-react";
import { SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
import logoImg from "@assets/IMG-20260215-WA0000_1771098793262.jpg";
import {
  PRESS_SUMMARY,
  KEY_FACTS_BULLETS,
  SOCIAL_TEMPLATES,
  CONTACT_EMAIL,
  PETITION_LINK,
} from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function MediaPage() {
  const { toast } = useToast();

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: `${label} copied to clipboard.` });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="py-12 sm:py-16">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Media Kit
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4" data-testid="text-media-title">
              Press & Share Resources
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Everything you need to share this initiative with your network, press contacts, or community.
            </p>
          </div>
        </ScrollReveal>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-press-summary">
              Press Summary
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {PRESS_SUMMARY}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => copyText(PRESS_SUMMARY, "Press summary")}
                data-testid="button-copy-press"
              >
                <Copy className="mr-1 h-3 w-3" />
                Copy Summary
              </Button>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-key-facts">
              Key Facts
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-5">
              <ul className="space-y-2">
                {KEY_FACTS_BULLETS.map((fact) => (
                  <li key={fact} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => copyText(KEY_FACTS_BULLETS.join("\n"), "Key facts")}
                data-testid="button-copy-facts"
              >
                <Copy className="mr-1 h-3 w-3" />
                Copy All Facts
              </Button>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-download-assets">
              Download Assets
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Hero Image", file: "/images/hero.png" },
                { name: "Logo", file: logoImg },
                { name: "Tourism Chart", file: "/charts/graph1.png" },
                { name: "Foreign Arrivals Chart", file: "/charts/graph2.png" },
                { name: "Charter Flights Chart", file: "/charts/graph3.png" },
                { name: "Annual Revenue Pie", file: "/charts/pie_annual.png" },
                { name: "Lifetime Impact Pie", file: "/charts/pie_lifetime.png" },
              ].map((asset) => (
                <Card key={asset.file} className="p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap min-w-0">
                    <span className="text-sm font-medium">{asset.name}</span>
                    <a href={asset.file} download>
                      <Button variant="outline" size="sm" data-testid={`button-download-${asset.name.toLowerCase().replace(/\s/g, "-")}`}>
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-social-templates">
              Social Share Templates
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal delay={0.05}>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SiX className="h-4 w-4" />
                  <h3 className="font-medium text-sm">X / Twitter Post</h3>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md leading-relaxed">
                  {SOCIAL_TEMPLATES.x}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => copyText(SOCIAL_TEMPLATES.x, "X post")}
                  data-testid="button-copy-x"
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SiInstagram className="h-4 w-4" />
                  <h3 className="font-medium text-sm">Instagram Caption</h3>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md leading-relaxed whitespace-pre-line">
                  {SOCIAL_TEMPLATES.ig}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => copyText(SOCIAL_TEMPLATES.ig, "Instagram caption")}
                  data-testid="button-copy-ig"
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SiWhatsapp className="h-4 w-4" />
                  <h3 className="font-medium text-sm">WhatsApp Broadcast</h3>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md leading-relaxed">
                  {SOCIAL_TEMPLATES.whatsapp}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => copyText(SOCIAL_TEMPLATES.whatsapp, "WhatsApp message")}
                  data-testid="button-copy-whatsapp"
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For press inquiries, partnership proposals, or additional information.
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Button variant="outline" data-testid="button-contact-email">
                  <Mail className="mr-1.5 h-4 w-4" />
                  {CONTACT_EMAIL}
                </Button>
              </a>
            </Card>
          </ScrollReveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
