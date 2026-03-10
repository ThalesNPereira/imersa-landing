import type { FaqContent, FaqItem } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type FaqSectionProps = {
  faqs: FaqItem[];
  intro: FaqContent;
};

export function FaqSection({ faqs, intro }: FaqSectionProps) {
  return (
    <section id="faq" data-section="faq" className="pb-24 pt-20 sm:pb-28 sm:pt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionIntro
              eyebrow={intro.eyebrow}
              title={intro.title}
              description={intro.description}
            />
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.id} delay={0.06 + index * 0.04}>
                <details className="group rounded-[1.6rem] border border-black/8 bg-white/72 p-5 shadow-[0_16px_40px_rgba(17,20,24,0.05)] backdrop-blur">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-display text-2xl tracking-[-0.04em] text-[#111418]">
                      {faq.question}
                    </span>
                    <span className="relative h-8 w-8 shrink-0 rounded-full border border-black/8 bg-[#f5f3ee]">
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-[#111418]" />
                      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-[#111418] transition group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="pr-12 pt-4 text-base leading-8 text-[#5b6470]">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
