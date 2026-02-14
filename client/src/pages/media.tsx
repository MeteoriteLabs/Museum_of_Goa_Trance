import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Mail, ExternalLink, Share2, FileText, Image, MessageSquare } from "lucide-react";
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
import { motion } from "framer-motion";

export default function MediaPage() {
  const { toast } = useToast();

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: `${label} copied to clipboard.` });
  };

  const downloadAssets = [
    { name: "Hero Image", file: "/images/hero.png" },
    { name: "Logo", file: logoImg },
    { name: "Tourism Chart", file: "/charts/graph1.png" },
    { name: "Foreign Arrivals Chart", file: "/charts/graph2.png" },
    { name: "Charter Flights Chart", file: "/charts/graph3.png" },
    { name: "Annual Revenue Pie", file: "/charts/pie_annual.png" },
    { name: "Lifetime Impact Pie", file: "/charts/pie_lifetime.png" },
  ];

  const socialCards = [
    {
      icon: SiX,
      label: "X / Twitter",
      text: SOCIAL_TEMPLATES.x,
      copyLabel: "X post",
      testId: "x",
    },
    {
      icon: SiInstagram,
      label: "Instagram",
      text: SOCIAL_TEMPLATES.ig,
      copyLabel: "Instagram caption",
      testId: "ig",
    },
    {
      icon: SiWhatsapp,
      label: "WhatsApp",
      text: SOCIAL_TEMPLATES.whatsapp,
      copyLabel: "WhatsApp message",
      testId: "whatsapp",
    },
  ];

  return (
    <div className="min-h-screen pt-14">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md mb-6">
              <Share2 className="h-3 w-3" />
              Media Kit
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              data-testid="text-media-title"
            >
              Press & Share Resources
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
              Everything you need to share this initiative with your network,
              press contacts, or community.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-8">
        <section className="pb-16">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-5">
              <FileText className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                data-testid="text-press-summary"
              >
                Press Summary
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {PRESS_SUMMARY}
              </p>
              <div className="mt-5 pt-4 border-t flex items-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyText(PRESS_SUMMARY, "Press summary")}
                  data-testid="button-copy-press"
                >
                  <Copy className="mr-1.5 h-3 w-3" />
                  Copy Summary
                </Button>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Button variant="ghost" size="sm" data-testid="button-email-press">
                    <Mail className="mr-1.5 h-3 w-3" />
                    Email Us for More
                  </Button>
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-5">
              <ExternalLink className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                data-testid="text-key-facts"
              >
                Key Facts at a Glance
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KEY_FACTS_BULLETS.map((fact, i) => (
                <Card key={i} className="p-4" data-testid={`card-fact-${i}`}>
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fact}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyText(KEY_FACTS_BULLETS.join("\n"), "Key facts")
                }
                data-testid="button-copy-facts"
              >
                <Copy className="mr-1.5 h-3 w-3" />
                Copy All Facts
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-5">
              <Image className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                data-testid="text-download-assets"
              >
                Download Assets
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloadAssets.map((asset) => (
                <Card key={asset.name} className="overflow-hidden" data-testid={`card-asset-${asset.name.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="h-32 bg-muted/30 flex items-center justify-center">
                    <img
                      src={asset.file}
                      alt={asset.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium truncate">
                      {asset.name}
                    </span>
                    <a href={asset.file} download>
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={`button-download-${asset.name.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Save
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
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                data-testid="text-social-templates"
              >
                Ready-to-Share Templates
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg">
              Copy and paste these templates to spread the word on your favourite platforms.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialCards.map((card, i) => (
              <ScrollReveal key={card.testId} delay={0.05 * (i + 1)}>
                <Card className="p-5 flex flex-col h-full" data-testid={`card-social-${card.testId}`}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <card.icon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm">{card.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md leading-relaxed whitespace-pre-line flex-1">
                    {card.text}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => copyText(card.text, card.copyLabel)}
                    data-testid={`button-copy-${card.testId}`}
                  >
                    <Copy className="mr-1.5 h-3 w-3" />
                    Copy {card.label} Post
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <Card className="p-8 text-center bg-primary/5 border-primary/10">
              <img
                src={logoImg}
                alt="Museum of Goa Trance"
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2" data-testid="text-contact-heading">
                Get in Touch
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                For press inquiries, partnership proposals, or additional
                information about the Museum of Goa Trance initiative.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Button data-testid="button-contact-email">
                    <Mail className="mr-1.5 h-4 w-4" />
                    {CONTACT_EMAIL}
                  </Button>
                </a>
                <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" data-testid="button-petition-media">
                    Sign the Petition
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
