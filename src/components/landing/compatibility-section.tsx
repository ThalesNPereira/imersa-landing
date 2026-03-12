import Image from "next/image";
import type { CompatibilityContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container } from "./shared";

type CompatibilitySectionProps = {
  content: CompatibilityContent;
};

export function CompatibilitySection({ content }: CompatibilitySectionProps) {
  return (
    <section
      id="compatibilidade"
      data-section="compatibility"
      className="py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#6b7280]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.05em] text-[#111418] sm:text-4xl lg:text-[3.2rem]">
              {content.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#5b6470] sm:text-lg">
              {content.supportLine}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto mt-14 max-w-xl sm:mt-16 lg:max-w-2xl">
            <div className="pointer-events-none absolute -inset-x-12 inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(146,182,210,0.05),transparent_70%)]" />

            <div className="pointer-events-none mx-auto h-px w-full max-w-xs bg-[linear-gradient(90deg,transparent,rgba(17,20,24,0.08),transparent)]" />

            <div className="grid grid-cols-3 gap-y-8 py-10 sm:py-12 lg:gap-y-10">
              {content.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={item.logoSrc}
                    alt={item.label}
                    width={112}
                    height={56}
                    className="h-8 w-auto opacity-[0.38] grayscale transition-opacity duration-300 hover:opacity-60 sm:h-9"
                  />
                </div>
              ))}
            </div>

            <div className="pointer-events-none mx-auto h-px w-full max-w-xs bg-[linear-gradient(90deg,transparent,rgba(17,20,24,0.08),transparent)]" />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-10 max-w-lg text-center text-sm leading-7 text-[#5c6975] sm:text-base">
            {content.footerNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
