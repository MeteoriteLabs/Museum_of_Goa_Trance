import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ASK_PILLARS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function AskAccordion() {
  return (
    <ScrollReveal>
      <Accordion type="single" collapsible className="w-full" data-testid="ask-accordion">
        {ASK_PILLARS.map((pillar, i) => (
          <AccordionItem key={pillar.title} value={`pillar-${i}`}>
            <AccordionTrigger className="text-left">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="font-medium">{pillar.title}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-0.5">
                    {pillar.summary}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                {pillar.detail}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollReveal>
  );
}
