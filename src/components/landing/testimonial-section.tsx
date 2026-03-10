import type { TestimonialContent } from "@/content/landing";
import { Reveal } from "./reveal";
import { Container } from "./shared";

type TestimonialSectionProps = {
  content: TestimonialContent;
};

export function TestimonialSection({
  content,
}: TestimonialSectionProps) {
  return (
    <section data-section="testimonial" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="rounded-[2.4rem] bg-[#111821] px-6 py-8 text-white shadow-[0_28px_80px_rgba(17,20,24,0.18)] sm:px-8 sm:py-10 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#8ea6bb]">
                  {content.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.05em] sm:text-4xl">
                  {content.title}
                </h2>
                <p className="mt-5 rounded-[1.2rem] border border-dashed border-white/14 bg-white/5 p-4 text-sm leading-7 text-[#c4d1db]">
                  {content.note}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-7">
                <blockquote className="font-display text-3xl leading-tight tracking-[-0.04em] text-white sm:text-[2.5rem]">
                  “{content.quote}”
                </blockquote>

                <div className="mt-8 flex flex-wrap gap-3">
                  {content.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-[#d0dbe4]">
                  <p className="font-semibold text-white">{content.author}</p>
                  <p>{content.role}</p>
                  <p>{content.company}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
