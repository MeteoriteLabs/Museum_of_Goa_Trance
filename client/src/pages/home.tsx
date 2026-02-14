import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ExternalLink, ChevronDown, ArrowRight } from "lucide-react";
import { PETITION_LINK, TIMELINE_ERAS, CHAPTER_MILESTONES, NOTABLE_PEOPLE } from "@/lib/constants";
import TimelineDots from "@/components/TimelineDots";
import TimelineRail from "@/components/TimelineRail";
import MobileProgress from "@/components/MobileProgress";
import AskAccordion from "@/components/AskAccordion";
import Globe from "@/components/Globe";
import SubTimeline from "@/components/SubTimeline";
import {
  TranceRiseChart,
  ForeignArrivalsChart,
  AnnualEconomyPieChart,
  LifetimeFootprintPieChart,
  TourismGrowthChart,
} from "@/components/Charts";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

function ChapterFigures({ chapterId }: { chapterId: string }) {
  const people = NOTABLE_PEOPLE.filter((p) => p.chapter === chapterId);
  if (people.length === 0) return null;

  const handleClick = () => {
    window.location.href = "/culture#notable-people";
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3" data-testid={`figures-${chapterId}`}>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold" data-testid={`text-key-figures-label-${chapterId}`}>Key Figures</span>
      <div className="flex flex-wrap items-center gap-2">
        {people.map((person) => (
          <button
            key={person.name}
            onClick={handleClick}
            className="flex items-center gap-1.5 rounded-full bg-muted/50 pl-1 pr-2.5 py-1 hover-elevate cursor-pointer"
            data-testid={`button-figure-${person.name.replace(/\s/g, "-").toLowerCase()}`}
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-semibold text-primary">
                {person.name.charAt(0)}
              </span>
            </div>
            <span className="text-[11px] font-medium text-foreground/80 whitespace-nowrap">
              {person.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRail, setShowRail] = useState(false);
  const [bounceCount, setBounceCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
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

      <div className="max-w-4xl mx-auto px-4 lg:pl-28 xl:pl-36">
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
              In the 1960s and 70s, Goa became a meeting point for global travellers and experimental music gatherings. Pioneers like Eight Finger Eddie and Goa Gil planted the seeds of what would become one of the most influential musical movements in modern history — from campfire jam sessions to the first electronic sounds on the beach.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: This era established Goa as the birthplace of a globally significant cultural phenomenon.
            </p>
            <ChapterFigures chapterId="chapter-1" />
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
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-1"]} />
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
              The 1980s saw a pivotal transformation. Goa Gil, DJ Laurent, and Fred Disko switched from rock to electronic music, introducing EBM, acid house, and industrial sounds. Goa Gil framed the all-night DJ set as spiritual practice — "trance dance as active meditation" — and established venues like the Music House in Vagator.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: A unique cultural art form was born — one that would go on to define an entire genre.
            </p>
            <ChapterFigures chapterId="chapter-2" />
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
                    The Goa sound represented more than music — it was a cultural expression combining technology, tradition, and communal gathering into something entirely new. DJs created custom mixes by looping melodies, removing vocals, and extending tracks into hypnotic journeys.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-2"]} />
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
              The 1990s transformed Goa trance from a local phenomenon into a global movement. Dedicated labels like Dragonfly and TIP Records gave the sound a commercial platform. Paul Oakenfold's 1994 BBC Radio 1 "Goa Mix" brought it to millions. By 1997, Boom Festival launched in Portugal — directly inspired by Goa's beaches — and the genre had reached its zenith before evolving into psytrance.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: Goa's cultural export created thriving ecosystems across continents, spawning labels, festivals, and an entire genre.
            </p>
            <ChapterFigures chapterId="chapter-3" />
          </ScrollReveal>
          <div className="mt-6">
            <Globe />
          </div>
          <div className="mt-6">
            <TranceRiseChart />
          </div>
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-3"]} />
        </section>

        <section id="chapter-4" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 4
              </span>
              <span className="text-xs text-muted-foreground">2000s–10s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-4-title">
              Global Value Creation
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              The 2000s and 2010s saw the Goa-origin festival ecosystem mature into a global industry. Sunburn Festival launched in Goa in 2007 and became Asia's largest EDM festival. Boom Festival in Portugal grew to 40,000+ attendees from 150+ countries. Artists like Vini Vici and Astrix brought psytrance to mainstream festivals worldwide.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: While value was created globally, the birthplace must preserve its legacy.
            </p>
            <ChapterFigures chapterId="chapter-4" />
          </ScrollReveal>
          <div className="mt-6">
            <AnnualEconomyPieChart />
          </div>
          <div className="mt-4">
            <LifetimeFootprintPieChart />
          </div>
          <ScrollReveal delay={0.1}>
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Boom Festival (Portugal) generates approximately $50–56 million in local economic impact during a single edition
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  While Goa pioneered this culture, other countries now capture a growing share of the economic value
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
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-4"]} />
        </section>

        <section id="chapter-5" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 5
              </span>
              <span className="text-xs text-muted-foreground">2010s–20s</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-5-title">
              Regulatory Pressure Builds
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              After peaking at 8.9 lakh foreign arrivals in 2017, Goa's cultural tourism infrastructure came under increasing pressure. Noise pollution enforcement intensified, venue crackdowns targeted prominent establishments, and charter flights declined significantly — eroding the primary channels through which high-value international cultural tourists reached Goa.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: The regulatory environment began constraining the cultural ecosystem that sustained Goa's global identity.
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <ForeignArrivalsChart />
          </div>
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-5"]} />
        </section>

        <section id="chapter-6" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 6
              </span>
              <span className="text-xs text-muted-foreground">2020–2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-6-title">
              Crisis & Response
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              The pressures building through the 2010s culminated in a turning point. Sunburn Festival — Asia's largest EDM festival — left Goa for Mumbai. Foreign arrivals continued to decline. Yet amid these losses, signs of cultural resilience emerged: Hilltop endured as a cultural anchor with over 50 years of heritage, and the Initiative for Museum of Goa Trance launched in February 2026 to document, archive, and preserve the birthplace's legacy.
            </p>
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Why it matters: As the cultural ecosystem faces its greatest threat, new preservation efforts signal a path forward.
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <TourismGrowthChart />
          </div>
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-6"]} />
        </section>

        <section id="chapter-7" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 7
              </span>
              <span className="text-xs text-muted-foreground">Global Precedent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-7-title">
              Detroit to Berlin — A Cautionary Parallel
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              History offers a clear precedent. Detroit originated techno in the 1980s — but it was Berlin that built the supported ecosystem after the Wall fell in 1989. In March 2024, Germany's UNESCO Commission officially inscribed "Techno Culture in Berlin" on its National Inventory of Intangible Cultural Heritage — the culmination of a 13-year campaign led by Rave The Planet and Dr. Motte, founder of the Love Parade.
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
                  <p className="text-xs text-muted-foreground mt-1">National ICH — March 2024</p>
                  <div className="mt-3 w-full h-px bg-border" />
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Structured framework preserved heritage and earned national cultural recognition
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
            <Card className="mt-4 p-6">
              <h4 className="font-semibold text-sm mb-4">UNESCO & Intangible Cultural Heritage</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">National ICH Inventory — March 2024</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Berlin's techno culture was officially inscribed on Germany's National Inventory of Intangible Cultural Heritage, recognising its role in shaping social cohesion, creative expression, and urban identity. It became the 150th entry in Germany's national inventory.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Application Process — 2022–2023</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Rave The Planet submitted the formal application in November 2022 and revised it in May 2023, building on over a decade of documentation and community engagement since Hans Cousto's original 2011 proposal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">13-Year Community Campaign</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      The recognition was driven by Rave The Planet (led by Dr. Motte and Ellen Dosch-Roeingh), who submitted their application in November 2022 and revised it in May 2023. The campaign originated with Hans Cousto's proposal in 2011 and took over a decade of documentation and stakeholder engagement.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Card className="mt-4 p-6">
              <h4 className="font-semibold text-sm mb-3">How This Applies to Goa</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                India is a signatory to UNESCO's 2003 Convention for the Safeguarding of the Intangible Cultural Heritage. The pathway exists: document the heritage, build community consensus, secure state-level recognition, apply for national ICH inventory inclusion, and pursue UNESCO inscription.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-md bg-muted/50">
                  <p className="text-xs font-medium text-primary">Step 1</p>
                  <p className="text-xs text-muted-foreground mt-1">Document & Archive</p>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/50">
                  <p className="text-xs font-medium text-primary">Step 2</p>
                  <p className="text-xs text-muted-foreground mt-1">Community Consensus</p>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/50">
                  <p className="text-xs font-medium text-primary">Step 3</p>
                  <p className="text-xs text-muted-foreground mt-1">National ICH Listing</p>
                </div>
                <div className="text-center p-3 rounded-md bg-primary/5 border border-primary/10">
                  <p className="text-xs font-medium text-primary">Step 4</p>
                  <p className="text-xs text-muted-foreground mt-1">UNESCO Nomination</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-md bg-muted/30 text-center">
                <p className="text-sm text-muted-foreground">
                  If Berlin's techno — which originated in <strong className="text-foreground">Detroit</strong> — earned national cultural heritage recognition, Goa's trance heritage — born <strong className="text-foreground">in Goa itself</strong> — has an even stronger claim as the original birthplace.
                </p>
              </div>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <Link href="/evidence">
              <Button variant="ghost" size="sm" className="mt-4" data-testid="link-view-sources-ch7">
                See sources
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </ScrollReveal>
          <SubTimeline milestones={CHAPTER_MILESTONES["chapter-7"]} />
        </section>

        <section id="chapter-8" className="py-16 sm:py-20 scroll-mt-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Chapter 8
              </span>
              <span className="text-xs text-muted-foreground">The Ask</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-chapter-8-title">
              A Responsible Path Forward
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              With the passing of Goa Gil in October 2023, one of the founding figures of this movement is gone. The living memory of this heritage is fading. This initiative is not about unregulated activity — it is about structured, responsible cultural preservation that balances heritage value with community wellbeing and environmental sustainability, before it is too late.
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

    </div>
  );
}
