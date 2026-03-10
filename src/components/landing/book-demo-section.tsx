import type { BookDemoContent } from "@/content/landing";
import { CalEmbedPanel } from "./cal-embed-panel";
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
              <CalEmbedPanel placeholderLabel={content.placeholderLabel} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
