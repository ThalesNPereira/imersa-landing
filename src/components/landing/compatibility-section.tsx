import Image from "next/image";
import type { CompatibilityContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container } from "./shared";

type CompatibilitySectionProps = {
  content: CompatibilityContent;
};

export function CompatibilitySection({ content }: CompatibilitySectionProps) {
  return (
    <section id="compatibilidade" data-section="compatibility" className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.8rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,243,236,0.96))] px-6 py-10 shadow-[0_28px_72px_rgba(17,20,24,0.08)] backdrop-blur sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(146,182,210,0.24),transparent_62%)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(78%,52rem)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(17,20,24,0.12),transparent)]" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(78%,52rem)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(17,20,24,0.08),transparent)]" />

          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#6b7280]">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.05em] text-[#111418] sm:text-4xl lg:text-[3.2rem]">
                {content.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5b6470] sm:text-lg">
                {content.supportLine}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(244,240,234,0.82))] px-6 py-8 shadow-[0_24px_54px_rgba(17,20,24,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.46),transparent_42%),radial-gradient(circle_at_bottom,rgba(143,183,209,0.08),transparent_34%)]" />
              <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(17,20,24,0.06),transparent)]" />

              <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:gap-x-14 lg:gap-x-16">
                {content.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex h-12 min-w-[6rem] items-center justify-center opacity-55 grayscale transition duration-300 hover:opacity-80"
                  >
                    <Image
                      src={item.logoSrc}
                      alt={item.label}
                      width={112}
                      height={56}
                      className="h-8 w-auto sm:h-9"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-[#5c6975] sm:text-base">
              {content.footerNote}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
