import Image from "next/image";
import type { CompatibilityContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type CompatibilitySectionProps = {
  content: CompatibilityContent;
};

export function CompatibilitySection({
  content,
}: CompatibilitySectionProps) {
  return (
    <section id="compatibilidade" data-section="compatibility" className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2.6rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(247,244,238,0.92))] px-6 py-8 shadow-[0_24px_60px_rgba(17,20,24,0.06)] backdrop-blur sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <Reveal>
            <SectionIntro
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {content.items.map((item, index) => (
              <Reveal key={item.id} delay={0.04 + index * 0.04}>
                <article className="group flex h-full min-h-[12.5rem] flex-col items-center justify-center rounded-[1.9rem] border border-black/8 bg-white/72 p-8 text-center shadow-[0_16px_40px_rgba(17,20,24,0.045)] transition duration-300 hover:-translate-y-1 hover:border-black/12 hover:bg-white/84 hover:shadow-[0_22px_52px_rgba(17,20,24,0.08)]">
                  <div className="flex h-14 items-center justify-center">
                    <Image
                      src={item.logoSrc}
                      alt=""
                      aria-hidden="true"
                      width={80}
                      height={56}
                      className="h-12 w-auto opacity-72 grayscale transition duration-300 group-hover:opacity-95"
                    />
                  </div>

                  <p className="mt-6 font-display text-[1.45rem] tracking-[-0.04em] text-[#22303c]">
                    {item.label}
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
