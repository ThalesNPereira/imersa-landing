import type { StepItem } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type HowItWorksSectionProps = {
  description: string;
  eyebrow: string;
  steps: StepItem[];
  title: string;
};

type StepVisualProps = {
  stepId: string;
};

function StepVisual({ stepId }: StepVisualProps) {
  if (stepId === "entrada") {
    return (
      <div className="relative h-48 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#eadfcf_0%,#f7f2ea_55%,#d7e5ef_100%)] p-4">
        <div className="absolute right-4 top-4 h-16 w-16 rounded-[1.25rem] border border-white/60 bg-white/60" />
        <div className="relative flex h-full items-end gap-3">
          <div className="h-28 w-1/3 rounded-[1.25rem] border border-white/60 bg-white/75" />
          <div className="h-36 w-1/3 rounded-[1.25rem] border border-white/60 bg-white/85" />
          <div className="h-24 w-1/3 rounded-[1.25rem] border border-white/60 bg-white/60" />
        </div>
      </div>
    );
  }

  if (stepId === "estrutura") {
    return (
      <div className="relative h-48 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#d7e5ef_0%,#f4f7f9_50%,#d7cfbf_100%)] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),transparent_52%)]" />
        <div className="relative flex h-full items-center justify-center">
          <div className="relative h-28 w-28 rounded-full border border-[#9bb1c2] bg-white/85">
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b8194]" />
            <span className="absolute -left-5 top-5 h-4 w-4 rounded-full border border-[#9bb1c2] bg-[#f4f1ea]" />
            <span className="absolute -right-4 bottom-10 h-4 w-4 rounded-full border border-[#9bb1c2] bg-[#f4f1ea]" />
            <span className="absolute left-8 -bottom-5 h-4 w-4 rounded-full border border-[#9bb1c2] bg-[#f4f1ea]" />
            <div className="absolute left-2 top-7 h-px w-12 rotate-[25deg] bg-[#8fa3b4]" />
            <div className="absolute right-3 top-16 h-px w-11 -rotate-[18deg] bg-[#8fa3b4]" />
            <div className="absolute bottom-3 left-7 h-px w-10 rotate-[70deg] bg-[#8fa3b4]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-48 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#111821_0%,#223242_52%,#d8c2a6_100%)] p-4">
      <div className="absolute inset-x-4 top-4 h-10 rounded-[1rem] border border-white/12 bg-white/10" />
      <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-[0.55fr_0.45fr]">
        <div className="h-24 rounded-[1.2rem] border border-white/12 bg-white/8" />
        <div className="rounded-[1.2rem] border border-dashed border-white/18 bg-white/6 p-3">
          <div className="h-3 w-16 rounded-full bg-white/25" />
          <div className="mt-3 h-12 rounded-[0.9rem] bg-white/10" />
        </div>
      </div>
    </div>
  );
}

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
          <SectionIntro eyebrow={eyebrow} title={title} description={description} />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={0.08 + index * 0.08}>
              <article className="h-full rounded-[2rem] border border-black/8 bg-white/72 p-5 shadow-[0_18px_50px_rgba(17,20,24,0.06)] backdrop-blur sm:p-6">
                <StepVisual stepId={step.id} />

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-black/8 bg-[#f7f5f0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#6a7684]">
                    Etapa {step.number}
                  </span>
                  <span className="text-sm font-medium text-[#61707d]">{step.detail}</span>
                </div>

                <h3 className="mt-5 font-display text-2xl tracking-[-0.04em] text-[#111418]">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#5b6470]">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
