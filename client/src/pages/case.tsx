import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, DollarSign, Music, Globe, Shield, Users } from "lucide-react";
import { Link } from "wouter";
import { PETITION_LINK, ASK_PILLARS, QUICK_FACTS } from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerReveal";
import Footer from "@/components/Footer";

export default function CasePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[50vh] sm:min-h-[40vh] flex items-end pb-10 px-4" data-testid="case-hero">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Goa coastline"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            data-testid="img-case-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <span className="text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-md" data-testid="text-case-badge">
            The Case for Preservation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 text-white" data-testid="text-case-title">
            Why Goa's Trance Heritage Must Be Protected
          </h1>
          <p className="text-white/70 mt-3 max-w-2xl leading-relaxed text-base sm:text-lg" data-testid="text-case-description">
            A structured, responsible initiative to preserve one of the most significant cultural exports in modern music history — before it's too late.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <section className="py-12 sm:py-16" data-testid="quick-facts-section">
          <StaggerContainer>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUICK_FACTS.map((fact, i) => (
                <StaggerItem key={i}>
                  <div className="text-center p-4 rounded-md bg-muted/50" data-testid={`stat-card-${i}`}>
                    <p className="text-xl sm:text-2xl font-bold text-primary" data-testid={`text-stat-value-${i}`}>{fact.stat}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug" data-testid={`text-stat-label-${i}`}>{fact.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-what-preserved">
              What Is Being Preserved
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Goa's trance heritage is a living cultural tradition that emerged in the 1960s and evolved into a globally significant musical movement. It encompasses musical innovation, artistic expression, community gathering traditions, and a distinct cultural identity tied to Goa's landscape and people. This heritage has directly influenced global festival culture and continues to shape communities worldwide.
            </p>
          </ScrollReveal>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-why-matters">
              Why It Matters
            </h2>
          </ScrollReveal>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StaggerItem>
                <Card className="p-5">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-2" data-testid="text-economic-value">Economic Value</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tourism contributes approximately 16.43% to Goa's GSDP, supporting an estimated 2.5 lakh livelihoods. Preserving the heritage that attracts high-value international tourists sustains premium tourism revenue.
                  </p>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="p-5">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-2" data-testid="text-cultural-identity">Cultural Identity</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Goa's trance heritage represents one of the most significant cultural exports in modern music history. Without preservation, this identity risks being erased or permanently claimed by other regions.
                  </p>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="p-5">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-2" data-testid="text-global-precedent">Global Precedent</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Berlin's techno culture — which originated in Detroit — earned Germany's national heritage recognition in March 2024. Goa's trance, born in Goa itself, has an even stronger claim as the original birthplace.
                  </p>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <Card className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <div className="text-center p-4 rounded-md bg-muted/50" data-testid="card-detroit-comparison">
                  <p className="text-xs text-muted-foreground mb-1.5">Origin</p>
                  <p className="text-lg font-bold" data-testid="text-detroit">Detroit</p>
                  <p className="text-xs text-muted-foreground mt-1">Birthplace of Techno</p>
                  <div className="mt-3 w-full h-px bg-border" />
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Cultural capital migrated to Berlin without structured preservation
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-primary/5 border border-primary/10" data-testid="card-berlin-comparison">
                  <p className="text-xs text-muted-foreground mb-1.5">Recognised</p>
                  <p className="text-lg font-bold" data-testid="text-berlin">Berlin</p>
                  <p className="text-xs text-muted-foreground mt-1">National ICH — March 2024</p>
                  <div className="mt-3 w-full h-px bg-border" />
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    13-year campaign led to national cultural heritage recognition
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-muted/30 text-center">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Goa</strong> faces the same risk as Detroit — without structured preservation, its cultural capital will shift permanently to other regions.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-3" data-testid="text-preservation-model">
              The Preservation Model
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              This initiative advocates for a balanced approach that draws on international best practices. The model is not about unregulated activity — it is about creating a structured framework that protects heritage while respecting community needs and environmental sustainability.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <Card className="p-6 mb-8">
              <h3 className="font-semibold text-sm mb-4" data-testid="text-pathway-heading">A Credible Pathway Exists</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                India is a signatory to UNESCO's 2003 Convention for the Safeguarding of the Intangible Cultural Heritage. The pathway to formal recognition follows an established process:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-md bg-muted/50" data-testid="pathway-step-1">
                  <p className="text-xs font-medium text-primary">Step 1</p>
                  <p className="text-xs text-muted-foreground mt-1">Document & Archive</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1.5 leading-snug">Oral histories, music, community records</p>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/50" data-testid="pathway-step-2">
                  <p className="text-xs font-medium text-primary">Step 2</p>
                  <p className="text-xs text-muted-foreground mt-1">Community Consensus</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1.5 leading-snug">Stakeholder engagement & support</p>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/50" data-testid="pathway-step-3">
                  <p className="text-xs font-medium text-primary">Step 3</p>
                  <p className="text-xs text-muted-foreground mt-1">National ICH Listing</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1.5 leading-snug">State & national recognition</p>
                </div>
                <div className="text-center p-3 rounded-md bg-primary/5 border border-primary/10" data-testid="pathway-step-4">
                  <p className="text-xs font-medium text-primary">Step 4</p>
                  <p className="text-xs text-muted-foreground mt-1">UNESCO Nomination</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1.5 leading-snug">Global Representative List</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-five-pillars">
              Five Pillars of Preservation
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {ASK_PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.05}>
                <Card className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {pillar.summary}
                      </p>
                      <div className="mt-3 p-3 rounded-md bg-muted/50">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          In practice:
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {pillar.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <ScrollReveal>
            <Card className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm" data-testid="text-sustainability">Sustainability & Community Balance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All proposed cultural zones would be non-residential, licensed, and managed with clear operational standards. Environmental impact assessments and community consultation processes would be built into every stage.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm" data-testid="text-working-group">Multi-Stakeholder Working Group</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A formal working group comprising government officials, community leaders, cultural practitioners, tourism operators, and environmental experts. Measurable sustainability benchmarks and regular review cycles ensure accountability.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-3" data-testid="text-support-heading">
                Support This Initiative
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6" data-testid="text-support-description">
                Add your voice to the movement for responsible cultural preservation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" data-testid="button-petition-case">
                    Sign the Petition
                    <ExternalLink className="ml-1.5 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/evidence">
                  <Button variant="outline" size="lg" data-testid="link-view-evidence-case">
                    View Sources & Methodology
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
