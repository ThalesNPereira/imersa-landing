import type { BookDemoContent } from "@/content/landing";
import { CalEmbedPanel } from "./cal-embed-panel";
import { Reveal } from "./reveal";
import { Container, SectionIntro } from "./shared";

type BookDemoSectionProps = {
  content: BookDemoContent;
};

const proofPointAccents = [
  "from-[#dfc49f]/38 via-[#dfc49f]/12 to-transparent",
  "from-[#8fb7d1]/34 via-[#8fb7d1]/12 to-transparent",
  "from-white/28 via-white/10 to-transparent",
] as const;

export function BookDemoSection({ content }: BookDemoSectionProps) {
  return (
    <section id="agendar-demo" data-section="book-demo" className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.7rem] bg-[#111821] px-6 py-6 text-white shadow-[0_32px_90px_rgba(17,20,24,0.16)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(159,182,201,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(223,196,159,0.24),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />

          <div className="relative">
            <Reveal>
              <div className="max-w-3xl">
                <SectionIntro
                  eyebrow={content.eyebrow}
                  title={content.title}
                  description={content.description}
                  tone="dark"
                />
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-stretch">
              <Reveal delay={0.04}>
                <div className="flex h-full flex-col gap-4">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur sm:p-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9fb6c9]">
                      O que voce ve na demo
                    </p>

                    <div className="mt-5 space-y-3">
                      {content.proofPoints.map((item, index) => (
                        <div
                          key={item}
                          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-4 py-4"
                        >
                          <div
                            className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] ${proofPointAccents[index % proofPointAccents.length]}`}
                          />
                          <div className="relative flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[#0d141c]/72 shadow-[0_10px_22px_rgba(15,23,32,0.22)]">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#f3ede2]" />
                            </span>
                            <p className="text-sm leading-7 text-[#dce6ee]">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-white/10 bg-[#0f1821]/82 px-5 py-4 text-sm leading-7 text-[#c7d4df]">
                    A disponibilidade aparece na propria landing, sem quebrar a narrativa da pagina.
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <CalEmbedPanel />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
