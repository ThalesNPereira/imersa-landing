import Image from "next/image";
import type { CompatibilityContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type CompatibilitySectionProps = {
  content: CompatibilityContent;
};

export function CompatibilitySection({ content }: CompatibilitySectionProps) {
  return (
    <section
      id="compatibilidade"
      data-section="compatibility"
      className="py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.supportLine}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-[2rem] border border-black/8 bg-white/72 p-6 shadow-[0_18px_50px_rgba(17,20,24,0.06)] backdrop-blur sm:p-8">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
              {content.items.map((item) => (
                <div
                  key={item.id}
                  className="group flex h-20 items-center justify-center rounded-[1.4rem] border border-transparent bg-[#f7f5f0]/60 transition-all duration-300 hover:border-black/6 hover:bg-[#f7f5f0] hover:shadow-[0_8px_24px_rgba(17,20,24,0.04)] sm:h-24"
                >
                  <Image
                    src={item.logoSrc}
                    alt={item.label}
                    width={112}
                    height={56}
                    className="h-7 w-auto opacity-[0.38] grayscale transition-all duration-300 group-hover:opacity-70 group-hover:grayscale-[0.3] sm:h-8"
                  />
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#66707c] sm:text-base">
              {content.footerNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
