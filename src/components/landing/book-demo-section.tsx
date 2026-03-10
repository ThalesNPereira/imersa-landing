import type { BookDemoContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type BookDemoSectionProps = {
  content: BookDemoContent;
};

export function BookDemoSection({ content }: BookDemoSectionProps) {
  return (
    <section id="agendar-demo" data-section="book-demo" className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2.4rem] border border-black/8 bg-[linear-gradient(135deg,#ede5d7_0%,#f7f4ee_48%,#dbe7ef_100%)] p-6 shadow-[0_24px_70px_rgba(17,20,24,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <Reveal>
              <div className="max-w-2xl">
                <SectionIntro
                  eyebrow={content.eyebrow}
                  title={content.title}
                  description={content.description}
                />

                <div className="mt-8 space-y-3">
                  {content.checklist.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-black/8 bg-white/60 px-4 py-3 text-sm leading-7 text-[#43515d]"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#111418] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-dashed border-[#9bb1c2] bg-white/65 p-5 shadow-[0_16px_40px_rgba(17,20,24,0.06)]">
                <div className="flex items-center justify-between gap-4 border-b border-black/8 pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#6a7684]">
                      {content.placeholderLabel}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#56626f]">
                      Reservado para o embed real do calendario comercial.
                    </p>
                  </div>
                  <span className="rounded-full border border-black/8 bg-[#111418] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    Cal.com
                  </span>
                </div>

                <div className="mt-5 rounded-[1.6rem] border border-dashed border-[#bfd0dd] bg-[#f9fafb] p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-[0.34fr_0.66fr]">
                    <div className="rounded-[1.3rem] border border-black/6 bg-white p-4">
                      <div className="h-4 w-24 rounded-full bg-[#d7e5ef]" />
                      <div className="mt-4 space-y-3">
                        <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
                        <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
                        <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
                      </div>
                    </div>

                    <div className="rounded-[1.3rem] border border-black/6 bg-white p-4">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
                        <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
                        <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
                      </div>
                      <div className="mt-4 h-44 rounded-[1.2rem] bg-[linear-gradient(135deg,#f2ede4,#d8e4ee)]" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
