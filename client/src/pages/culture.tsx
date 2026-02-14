import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Music,
  TreePine,
  Palette,
  Users,
  RotateCcw,
  Brain,
  Paintbrush,
  BookOpen,
} from "lucide-react";
import {
  PETITION_LINK,
  NADA_BRAHMA_PARALLELS,
  FUSION_TIMELINE,
  LIVING_TRADITION_TABS,
  CULTURE_TESTIMONIALS,
  INDIAS_CULTURAL_EXPORTS,
  CULTURE_STATS,
  SCIENCE_EVIDENCE,
} from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

const TAB_ICONS: Record<string, typeof Music> = {
  music: Music,
  spaces: TreePine,
  visual: Palette,
  community: Users,
  cycles: RotateCcw,
  flow: Brain,
  art: Paintbrush,
};

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const numericPart = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(numericPart, 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target + suffix);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current) + suffix);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div ref={ref} className="text-center p-5">
      <p
        className="text-3xl sm:text-4xl font-bold text-primary"
        data-testid={`text-stat-${label.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
      >
        {count}
      </p>
      <p className="text-xs text-muted-foreground mt-2 leading-snug">{label}</p>
    </div>
  );
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % CULTURE_TESTIMONIALS.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const prev = () => {
    goTo((current - 1 + CULTURE_TESTIMONIALS.length) % CULTURE_TESTIMONIALS.length);
  };

  const next = () => {
    goTo((current + 1) % CULTURE_TESTIMONIALS.length);
  };

  const testimonial = CULTURE_TESTIMONIALS[current];

  return (
    <div className="relative" data-testid="testimonial-carousel">
      <Card className="p-6 sm:p-8 min-h-[220px] flex flex-col justify-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <blockquote className="text-base sm:text-lg leading-relaxed italic text-foreground/90 max-w-2xl mx-auto text-center" data-testid={`text-testimonial-quote-${current}`}>
              "{testimonial.quote}"
            </blockquote>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium" data-testid={`text-testimonial-name-${current}`}>
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-testimonial-role-${current}`}>
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={prev}
          data-testid="button-testimonial-prev"
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          {CULTURE_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full ${
                i === current
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
              data-testid={`button-testimonial-dot-${i}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={next}
          data-testid="button-testimonial-next"
          aria-label="Next testimonial"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function CulturePage() {
  const [activeTab, setActiveTab] = useState("music");

  const activeTabData = LIVING_TRADITION_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-[60vh] flex flex-col items-center justify-center px-4"
        data-testid="culture-hero"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Goa cultural landscape"
            className="w-full h-full object-cover"
            data-testid="img-culture-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/75" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <motion.span
            className="text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-md inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Culture & Heritage
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            data-testid="text-culture-headline"
          >
            Rooted in Tradition,
          </motion.h1>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
            data-testid="text-culture-headline-2"
          >
            Born on the Shore
          </motion.h1>
          <motion.p
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            data-testid="text-culture-subheadline"
          >
            Goa's trance heritage is not a Western import on Indian soil. It is a living
            expression of India's ancient relationship with sound, community, and
            transcendence.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <section className="py-16 sm:py-20" data-testid="section-nada-brahma">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Ancient Roots
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-nada-brahma-title"
              >
                Nada Brahma — The World is Sound
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                In Sanatan Dharma, sound is the primordial force of creation. The Sama
                Veda — one of the four Vedas — is entirely devoted to musical melody.
                Goa's trance tradition carries this ancient thread into the modern world.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {NADA_BRAHMA_PARALLELS.map((parallel, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <Card className="p-0" data-testid={`card-parallel-${i}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="p-5 sm:border-r border-b sm:border-b-0">
                      <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-2">
                        Sanatan Tradition
                      </p>
                      <h4 className="font-medium text-sm" data-testid={`text-ancient-${i}`}>{parallel.ancient}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {parallel.ancientDetail}
                      </p>
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                        Goa Trance Tradition
                      </p>
                      <h4 className="font-medium text-sm" data-testid={`text-modern-${i}`}>{parallel.modern}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {parallel.modernDetail}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-fusion">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                The Fusion
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-fusion-title"
              >
                Where East Met West
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                Travellers didn't come to India by accident. They were drawn by its
                spiritual traditions — and on Goa's shores, something entirely new was
                born from that meeting.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {FUSION_TIMELINE.map((milestone, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div
                    className="relative pl-10 sm:pl-14"
                    data-testid={`fusion-milestone-${i}`}
                  >
                    <div className="absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary" />
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">
                        {milestone.era}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm" data-testid={`text-fusion-title-${i}`}>{milestone.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl" data-testid={`text-fusion-desc-${i}`}>
                      {milestone.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-living-tradition">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Living Heritage
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-living-tradition-title"
              >
                The Living Tradition
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                Five dimensions of a culture that is as much Indian as it is global —
                rooted in Sanatan values, expressed through modern form.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {LIVING_TRADITION_TABS.map((tab) => {
                const Icon = TAB_ICONS[tab.id];
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    data-testid={`button-tab-${tab.id}`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 mr-1.5" />}
                    {tab.title}
                  </Button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card className="p-6" data-testid={`card-tab-content-${activeTab}`}>
                <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                  {activeTabData.description}
                </p>

                <div className="space-y-3">
                  {activeTabData.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {activeTabData.verse && (
                  <div className="mt-6 p-4 rounded-md bg-muted/50 text-center">
                    <p className="text-base font-serif font-medium text-foreground/90">
                      {activeTabData.verse}
                    </p>
                    {activeTabData.verseSource && (
                      <p className="text-xs text-muted-foreground mt-1.5">
                        — {activeTabData.verseSource}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-science">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                The Evidence
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-science-title"
              >
                What the Research Says
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                Peer-reviewed research from neuroscience, musicology, anthropology, and
                psychology validates what practitioners have always known — this culture
                produces measurable effects on mind, body, and community.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {SCIENCE_EVIDENCE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <Card className="p-5" data-testid={`card-science-${i}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm" data-testid={`text-science-title-${i}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {item.finding}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-2 italic" data-testid={`text-science-source-${i}`}>
                        {item.source}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-voices">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Community
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-voices-title"
              >
                Voices of the Culture
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                The people who lived it, built it, and continue to carry it forward.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <TestimonialCarousel />
          </ScrollReveal>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-indias-gift">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Soft Power
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mt-4"
                data-testid="text-gift-title"
              >
                India's Gift to the World
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                India has given the world yoga, meditation, and Ayurveda. Goa's trance
                heritage is another globally significant cultural contribution — born on
                Indian soil, rooted in Indian philosophy.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <Card className="p-0 mb-8" data-testid="card-stats">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0">
                {CULTURE_STATS.map((stat) => (
                  <AnimatedCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </Card>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INDIAS_CULTURAL_EXPORTS.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.05}>
                <Card
                  className={`p-5 h-full ${
                    i === INDIAS_CULTURAL_EXPORTS.length - 1
                      ? "border-primary/20 bg-primary/5"
                      : ""
                  }`}
                  data-testid={`card-export-${i}`}
                >
                  <h4 className="font-medium text-sm" data-testid={`text-export-title-${i}`}>{exp.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {exp.description}
                  </p>
                  <p className="text-xs font-medium text-primary mt-3" data-testid={`text-export-reach-${i}`}>
                    {exp.globalReach}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-culture-cta">
          <ScrollReveal>
            <div className="text-center">
              <h3
                className="text-xl font-semibold mb-3"
                data-testid="text-culture-cta-heading"
              >
                Protect This Living Heritage
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                A culture rooted in India's deepest traditions deserves preservation —
                not erasure. Learn how you can support structured, responsible
                protection.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={PETITION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" data-testid="button-petition-culture">
                    Sign the Petition
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/case">
                  <Button
                    variant="outline"
                    size="lg"
                    data-testid="link-case-from-culture"
                  >
                    Read the Case
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
