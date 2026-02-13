import { Card } from "@/components/ui/card";
import { QUICK_FACTS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function FactsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {QUICK_FACTS.map((fact, i) => (
        <ScrollReveal key={fact.label} delay={i * 0.06}>
          <Card className="p-5" data-testid={`fact-card-${i}`}>
            <div className="text-2xl font-bold text-primary tracking-tight">
              {fact.stat}
            </div>
            <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
              {fact.label}
            </p>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}
