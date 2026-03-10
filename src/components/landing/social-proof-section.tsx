import type { LogoItem, SocialProofContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type SocialProofSectionProps = {
  content: SocialProofContent;
  logos: LogoItem[];
};

export function SocialProofSection({
  content,
  logos,
}: SocialProofSectionProps) {
  return (
    <section data-section="social-proof" className="pb-8 pt-4 sm:pb-12">
      <Container>
        <div className="rounded-[2rem] border border-black/8 bg-white/72 p-7 shadow-[0_18px_50px_rgba(17,20,24,0.06)] backdrop-blur sm:p-8">
          <Reveal>
            <SectionIntro
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-6">
            <p className="max-w-2xl text-sm leading-7 text-[#66707c]">
              {content.note}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {logos.map((logo, index) => (
              <Reveal key={logo.id} delay={0.12 + index * 0.04}>
                <div className="flex h-24 items-center justify-center rounded-[1.4rem] border border-dashed border-[#cfd4da] bg-[#f7f5f0] text-sm font-semibold uppercase tracking-[0.3em] text-[#788391]">
                  {logo.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
