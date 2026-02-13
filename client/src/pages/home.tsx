import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ExternalLink, ChevronDown, ArrowRight } from "lucide-react";
import { PETITION_LINK, TIMELINE_ERAS } from "@/lib/constants";
import TimelineDots from "@/components/TimelineDots";
import TimelineRail from "@/components/TimelineRail";
import MobileProgress from "@/components/MobileProgress";
import FactsGrid from "@/components/FactsGrid";
import ChartCard from "@/components/ChartCard";
import ChartModal from "@/components/ChartModal";
import AskAccordion from "@/components/AskAccordion";
import WorldMap from "@/components/WorldMap";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRail, setShowRail] = useState(false);
  const [modalChart, setModalChart] = useState<{
    src: string;
    title: string;
    caption?: string;
  } | null>(null);
  const [bounceCount, setBounceCount] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = TIMELINE_ERAS.map((e) => e.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const heroObs = new IntersectionObserver(
      ([entry]) => setShowRail(!entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (heroRef.current) heroObs.observe(heroRef.current);

    return () => {
      observers.forEach((o) => o.disconnect());
      heroObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (bounceCount < 2) {
      const timer = setTimeout(() => setBounceCount((c) => c + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [bounceCount]);

  return (
    <div className="min-h-screen">
      {showRail && <TimelineRail activeIndex={activeIndex} />}
      {showRail && <MobileProgress activeIndex={activeIndex} />}

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
        data-testid="hero-section"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Goa coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-testid="text-hero-headline"
          >
            Protect the Birthplace:
          </motion.h1>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
          >
            Preserve Goa's Trance Heritage
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            data-testid="text-hero-subheadline"
          >
            A living cultural legacy with global impact — supporting livelihoods, tourism, and cultural exchange.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" data-testid="button-petition-hero">
                Sign the Petition
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
            <a href="#chapter-1">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                data-testid="button-explore-story"
              >
                Explore the Story
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <TimelineDots />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={
            bounceCount < 2 ? { y: [0, 8, 0] } : { y: 0 }
          }
          transition={
            bounceCount < 2
              ? { duration: 1, ease: "easeInOut" }
              : {}
          }
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:pl-36">
        <section id="chapter-1" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 1
              </span>
              <span className="text-xs text-muted-foreground">1960s–70s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-1-title">
              Emergence
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              In the 1960s and 70s, Goa became a meeting point for global travellers and experimental music gatherings. The region's unique blend of natural beauty, cultural openness, and creative energy attracted artists, musicians, and thinkers from around the world, planting the seeds of what would become one of the most influential musical movements in modern history.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: This era established Goa as the birthplace of a globally significant cultural phenomenon.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card className="mt-6 overflow-hidden">
              <div className="p-4">
                <div className="rounded-md overflow-hidden">
                  <img
                    src="/images/hero.png"
                    alt="Archival image of Goa"
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  The Goa coastline — where a global musical legacy began.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section id="chapter-2" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 2
              </span>
              <span className="text-xs text-muted-foreground">1980s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-2-title">
              The Goa Sound
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              The distinct Goa trance sound took shape during the 1980s, blending global electronic tools with local rhythmic traditions and a deep spiritual philosophy. Pioneering artists crafted a sonic identity that was unmistakably rooted in Goa — a sound that would eventually captivate audiences worldwide.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: A unique cultural art form was born — one that would go on to define an entire genre.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card className="mt-6 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-sm">A Cultural Art Form</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    The Goa sound represented more than music — it was a cultural expression combining technology, tradition, and communal gathering into something entirely new.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section id="chapter-3" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 3
              </span>
              <span className="text-xs text-muted-foreground">1990s–2000s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-3-title">
              Global Diaspora
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Travellers carried the Goa sound worldwide. Festivals inspired by the Goa experience began appearing across Europe, South America, Asia, and Australia. What started on the beaches of Goa had become a truly global cultural phenomenon.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: Goa's cultural export created thriving ecosystems across continents.
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <WorldMap />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <ScrollReveal>
            <h3 className="text-lg font-semibold mb-6 text-center" data-testid="text-quick-facts">
              Quick Facts
            </h3>
          </ScrollReveal>
          <FactsGrid />
        </section>

        <section id="chapter-4" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 4
              </span>
              <span className="text-xs text-muted-foreground">2010s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-4-title">
              Global Value Creation
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Global festival ecosystems inspired by Goa's heritage began creating major tourism revenue across multiple countries. The cultural capital originating from Goa fuelled economies far from its shores.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: While value was created globally, the birthplace must preserve its legacy.
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <ChartCard
              src="/charts/pie_annual.png"
              title="Annual Global Festival Tourism Revenue"
              caption="Estimated annual revenue distribution across festival ecosystems worldwide."
              onClick={() =>
                setModalChart({
                  src: "/charts/pie_annual.png",
                  title: "Annual Global Festival Tourism Revenue",
                  caption: "Estimated annual revenue distribution across festival ecosystems worldwide.",
                })
              }
            />
          </div>
          <ScrollReveal delay={0.1}>
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Global value capture from Goa-inspired festivals grew significantly through the 2010s
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  The birthplace must preserve its legacy to sustain cultural and economic relevance
                </p>
              </div>
              <Link href="/evidence">
                <Button variant="ghost" size="sm" className="mt-2" data-testid="link-view-sources-ch4">
                  View Sources
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <section id="chapter-5" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 5
              </span>
              <span className="text-xs text-muted-foreground">2017–2025</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-5-title">
              Tourism Shift & Risk
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              While total tourism to Goa remains substantial, critical high-value segments have declined. Foreign arrivals and chartered flights — indicators of Goa's global cultural appeal — show a significant downward trend.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: Domestic tourism remains strong, but preserving global identity sustains premium value.
            </p>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ChartCard
              src="/charts/graph2.png"
              title="Foreign Tourist Arrivals"
              caption="Declining trend from ~8.9L (2017) to ~5.17L (2025)"
              onClick={() =>
                setModalChart({
                  src: "/charts/graph2.png",
                  title: "Foreign Tourist Arrivals",
                  caption: "Declining trend in foreign tourist arrivals to Goa",
                })
              }
            />
            <ChartCard
              src="/charts/graph3.png"
              title="Charter Flights to Goa"
              caption="Declining from 266 (2024) to 189 (2025)"
              onClick={() =>
                setModalChart({
                  src: "/charts/graph3.png",
                  title: "Charter Flights to Goa",
                  caption: "Charter flight decline indicates reduced international interest",
                })
              }
              delay={0.06}
            />
          </div>
        </section>

        <section id="chapter-6" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 6
              </span>
              <span className="text-xs text-muted-foreground">Global Precedent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-6-title">
              Detroit to Berlin — A Cautionary Parallel
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              History offers a clear precedent. Detroit originated techno — but it was Berlin that built the supported ecosystem, gaining global recognition. Germany added Berlin techno to its national Intangible Cultural Heritage inventory, demonstrating that structured heritage frameworks work.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card className="mt-6 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1.5">Origin</p>
                  <p className="text-lg font-bold">Detroit</p>
                  <p className="text-xs text-muted-foreground mt-1">Birthplace of Techno</p>
                  <div className="mt-3 w-full h-px bg-border" />
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Cultural capital migrated elsewhere without structured preservation
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-primary/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-1.5">Supported Ecosystem</p>
                  <p className="text-lg font-bold">Berlin</p>
                  <p className="text-xs text-muted-foreground mt-1">National ICH Recognition</p>
                  <div className="mt-3 w-full h-px bg-border" />
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Structured framework preserved heritage and generated economic value
                  </p>
                </div>
              </div>
              <div className="mt-5 p-3 rounded-md bg-muted/30 text-center">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Goa</strong> faces a similar risk — without action, its cultural capital may shift permanently to other regions.
                </p>
              </div>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Link href="/evidence">
              <Button variant="ghost" size="sm" className="mt-4" data-testid="link-view-sources-ch6">
                See sources
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </ScrollReveal>
        </section>

        <section id="chapter-7" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 7
              </span>
              <span className="text-xs text-muted-foreground">The Ask</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-7-title">
              A Responsible Path Forward
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              This initiative is not about unregulated activity. It is about structured, responsible cultural preservation that balances heritage value with community wellbeing and environmental sustainability.
            </p>
          </ScrollReveal>

          <div className="mt-8">
            <AskAccordion />
          </div>

          <ScrollReveal delay={0.1}>
            <div className="mt-10 text-center">
              <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" data-testid="button-petition-ask">
                  Sign the Petition
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-16 sm:py-20 border-t">
          <ScrollReveal>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Data Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hard data from Goa Tourism Dept & Govt of India PIB; global anchor from Boom Festival municipal impact report. All estimates are conservatively modeled and clearly distinguished from verified data.
              </p>
              <Link href="/evidence">
                <Button variant="outline" size="sm" className="mt-4" data-testid="link-full-sources">
                  View full Sources & Methodology
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
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
          { label: "View Sources", url: "/evidence" },
        ]}
      />
    </div>
  );
}
