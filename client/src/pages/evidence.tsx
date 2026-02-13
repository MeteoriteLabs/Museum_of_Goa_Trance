import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { BIBLIOGRAPHY, METHODOLOGY_ASSUMPTIONS } from "@/lib/constants";
import ChartCard from "@/components/ChartCard";
import ChartModal from "@/components/ChartModal";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

const CHARTS = [
  { src: "/charts/graph1.png", title: "Tourism Statistics Overview", caption: "Key tourism metrics for Goa" },
  { src: "/charts/graph2.png", title: "Foreign Tourist Arrivals", caption: "Declining foreign arrivals trend" },
  { src: "/charts/graph3.png", title: "Charter Flights to Goa", caption: "Charter flight decline 2024\u20132025" },
  { src: "/charts/pie_annual.png", title: "Annual Festival Revenue", caption: "Global annual revenue distribution" },
  { src: "/charts/pie_lifetime.png", title: "Lifetime Economic Impact", caption: "Cumulative economic contribution" },
];

export default function Evidence() {
  const [modalChart, setModalChart] = useState<{
    src: string;
    title: string;
    caption?: string;
  } | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="py-12 sm:py-16">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Evidence & Sources
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4" data-testid="text-evidence-title">
              Charts, Sources & Methodology
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              All claims are backed by verifiable data. This page presents the charts, source material, and methodology used throughout this initiative.
            </p>
          </div>
        </ScrollReveal>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-charts-gallery">
              Charts Gallery
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARTS.map((chart, i) => (
              <ChartCard
                key={chart.src}
                src={chart.src}
                title={chart.title}
                caption={chart.caption}
                onClick={() => setModalChart(chart)}
                delay={i * 0.05}
              />
            ))}
          </div>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-hard-data-title">
              Hard Data vs Modeled Estimates
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5">
                <h3 className="font-medium text-sm text-primary mb-3">Hard Data (Verified)</h3>
                <ul className="space-y-2">
                  {[
                    "Goa Tourism Dept official arrival statistics",
                    "Government of India PIB factsheets",
                    "Charter flight data from aviation authorities",
                    "Boom Festival municipal impact report",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <h3 className="font-medium text-sm text-primary mb-3">Modeled Estimates</h3>
                <ul className="space-y-2">
                  {[
                    "Global festival ecosystem revenue projections",
                    "Economic multiplier calculations",
                    "Tourism-linked livelihood estimates",
                    "Value capture distribution models",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-methodology-title">
              Methodology
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                All modeled estimates follow conservative assumptions. The methodology is designed to understate rather than overstate impact, ensuring credibility.
              </p>
              <ul className="space-y-2">
                {METHODOLOGY_ASSUMPTIONS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-bibliography-title">
              Bibliography
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-5">
              <ul className="space-y-3">
                {BIBLIOGRAPHY.map((source, i) => (
                  <li key={source.label}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      data-testid={`link-source-${i}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        </section>
      </div>

      <Footer />

      <ChartModal
        open={!!modalChart}
        onOpenChange={(open) => !open && setModalChart(null)}
        src={modalChart?.src || ""}
        title={modalChart?.title || ""}
        caption={modalChart?.caption}
        sourceLinks={[
          { label: "Goa Tourism Dept", url: "#" },
          { label: "PIB India", url: "#" },
        ]}
      />
    </div>
  );
}
