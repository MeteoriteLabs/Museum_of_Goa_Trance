import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, CheckCircle2, BarChart3, Shield, FileText } from "lucide-react";
import { BIBLIOGRAPHY, METHODOLOGY_ASSUMPTIONS, DATA_SOURCES, DEFENSIBILITY_STATEMENT, DATA_PURPOSE_POINTS } from "@/lib/constants";
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

const CHART_SOURCE_LINKS = [
  { label: "Goa Tourism Dept \u2014 2025 Arrivals", url: "https://goatourism.gov.in/blog-list/goa-records-strong-and-sustained-growth-in-tourist-arrivals-2025-figures-reflect-continued-momentum/" },
  { label: "PIB India \u2014 Tourism Factsheet", url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=150362" },
  { label: "Boom Festival \u2014 Impact Report", url: "https://www.idanha.pt/media/6404/boom-festival_relatoriofinal.pdf" },
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
              Data Sources & Methodology
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              All claims are backed by verifiable public data from official government publications, tourism reports, international festival economic reports, and publicly available industry references. Where precise global data is unavailable, conservative modeled estimates have been used and clearly labeled.
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
            <h2 className="text-xl font-semibold mb-6" data-testid="text-data-sources-title">
              Data Sources by Category
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {DATA_SOURCES.map((group, gi) => (
              <ScrollReveal key={group.category} delay={gi * 0.05}>
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="font-medium text-sm" data-testid={`text-category-${gi}`}>{group.category}</h3>
                  </div>
                  <ul className="space-y-3 mb-4">
                    {group.sources.map((source) => (
                      <li key={source.label} className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">{source.label}</span>
                        <span className="text-xs text-muted-foreground">{source.detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-col gap-1">
                      {group.urls.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                          data-testid={`link-category-source-${gi}`}
                        >
                          <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
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
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="font-medium text-sm">Hard Data (Used Directly)</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Goa Tourism Dept official arrival statistics",
                    "Foreign tourist numbers (2017 peak vs 2025)",
                    "Charter flight counts (266 in 2024, 189 in 2025)",
                    "Tourism employment data (~2.5 lakh jobs, ~40% workforce)",
                    "Tourism GSDP contribution (~16.43%)",
                    "Boom Festival municipal economic impact report",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <h3 className="font-medium text-sm">Modeled Estimates (Clearly Labeled)</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Global trance festival economy size",
                    "Ozora & similar festival economic ranges",
                    "Lifetime cumulative global impact estimates",
                    "Annualized Boom Festival contribution",
                    "Tourism multiplier projections (1.5x\u20132.5x)",
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
              Methodology & Assumptions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                All modeled estimates follow conservative assumptions. The methodology is designed to understate rather than overstate impact, ensuring credibility and policy defensibility.
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
            <h2 className="text-xl font-semibold mb-6" data-testid="text-defensibility-title">
              Defensibility & Purpose
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="font-medium text-sm">Defensibility Statement</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {DEFENSIBILITY_STATEMENT}
                </p>
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="font-medium text-sm">Purpose of This Data</h3>
                </div>
                <ul className="space-y-2">
                  {DATA_PURPOSE_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-semibold mb-6" data-testid="text-bibliography-title">
              Full Bibliography
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
        sourceLinks={CHART_SOURCE_LINKS}
      />
    </div>
  );
}
