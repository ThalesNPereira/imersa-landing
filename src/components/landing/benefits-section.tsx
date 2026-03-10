import type { BenefitItem, BenefitsContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type BenefitsSectionProps = {
  benefits: BenefitItem[];
  intro: BenefitsContent;
};

export function BenefitsSection({ benefits, intro }: BenefitsSectionProps) {
  return (
    <section id="beneficios" data-section="benefits" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionIntro
              eyebrow={intro.eyebrow}
              title={intro.title}
              description={intro.description}
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.id} delay={0.06 + index * 0.06}>
                <article className="h-full rounded-[1.8rem] border border-black/8 bg-white/72 p-6 shadow-[0_18px_50px_rgba(17,20,24,0.06)] backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    {benefit.outcome ? (
                      <span className="rounded-full border border-black/8 bg-[#f2ede4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#697786]">
                        {benefit.outcome}
                      </span>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-[#f2ede4] text-xs font-semibold uppercase tracking-[0.24em] text-[#697786]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#d8c2a6,#c3d7e6)]" />
                  </div>

                  <h3 className="mt-6 font-display text-2xl tracking-[-0.04em] text-[#111418]">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#5b6470]">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
