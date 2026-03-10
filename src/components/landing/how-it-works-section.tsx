import type { StepItem } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container } from "./shared";

type HowItWorksSectionProps = {
  description: string;
  eyebrow: string;
  steps: StepItem[];
  title: string;
};

export function HowItWorksSection({
  description,
  eyebrow,
  steps,
  title,
}: HowItWorksSectionProps) {
  return (
    <section id="como-funciona" data-section="how-it-works" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-5xl">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#6b7280]">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.05em] text-[#111418] sm:text-4xl lg:text-[3.25rem]">
              {title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#5b6470] sm:text-lg lg:whitespace-nowrap">
              {description}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={0.08 + index * 0.08}>
              <article className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-white/72 p-6 shadow-[0_18px_50px_rgba(17,20,24,0.06)] backdrop-blur sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#72808d]">
                  Passo
                </p>

                <p className="mt-4 font-display text-[4.25rem] leading-none tracking-[-0.08em] text-[#111418] sm:text-[4.75rem]">
                  {step.number}
                </p>

                <h3 className="mt-6 max-w-[14ch] font-display text-[1.75rem] leading-[1.05] tracking-[-0.05em] text-[#111418]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[30ch] text-base leading-7 text-[#5b6470]">
                  {step.support}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
