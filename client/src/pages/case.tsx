import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { PETITION_LINK, ASK_PILLARS } from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function CasePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="py-12 sm:py-16">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              The Case
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4" data-testid="text-case-title">
              A Preservation Plan for Goa's Heritage
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              A structured, responsible approach to cultural preservation that balances heritage value with community wellbeing and sustainable development.
            </p>
          </div>
        </ScrollReveal>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-what-preserved">
              What Is Being Preserved
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Goa's trance heritage is a living cultural tradition that emerged in the 1960s and evolved into a globally significant musical movement. It encompasses musical innovation, artistic expression, community gathering traditions, and a distinct cultural identity tied to Goa's landscape and people. This heritage has directly influenced global festival culture and continues to shape communities worldwide.
            </p>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-why-matters">
              Why It Matters
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5">
                <h3 className="font-medium text-sm text-primary mb-2">Economic Value</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tourism contributes approximately 16.43% to Goa's GSDP, supporting an estimated 2.5 lakh livelihoods. Preserving the heritage that attracts high-value international tourists is essential for sustaining premium tourism revenue.
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="font-medium text-sm text-primary mb-2">Cultural Identity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Goa's trance heritage represents one of the most significant cultural exports in modern music history. Without preservation, this unique cultural identity risks being erased or permanently claimed by other regions.
                </p>
              </Card>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-preservation-model">
              The Preservation Model
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              This initiative advocates for a balanced approach that draws on international best practices. The model is not about unregulated activity — it is about creating a structured framework that protects heritage while respecting community needs.
            </p>
          </ScrollReveal>
        </section>

        <section className="pb-16">
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

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-sustainability">
              Sustainability & Community Balance
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              The preservation framework prioritizes environmental sustainability and community balance. All proposed cultural zones would be non-residential, licensed, and managed with clear operational standards. Environmental impact assessments and community consultation processes would be built into every stage of implementation.
            </p>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-4" data-testid="text-working-group">
              Working Group Proposal
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              A formal multi-stakeholder working group is proposed, comprising government officials, community leaders, cultural practitioners, tourism operators, and environmental experts. This group would develop measurable sustainability benchmarks, oversee implementation of cultural zones, and conduct regular reviews to ensure the framework serves all stakeholders.
            </p>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-3">
                Support This Initiative
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                Add your voice to the movement for responsible cultural preservation.
              </p>
              <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" data-testid="button-petition-case">
                  Sign the Petition
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
