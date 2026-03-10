"use client";

import { motion } from "framer-motion";
import type { ProductPreviewContent } from "@/content/landing";
import { Container, PrimaryLink, SectionIntro } from "./shared";

type ProductPreviewSectionProps = {
  content: ProductPreviewContent;
};

const chipPositions = [
  "left-5 top-5 sm:left-8 sm:top-8",
  "right-4 top-20 sm:right-10 sm:top-24",
  "left-6 bottom-28 sm:left-10 sm:bottom-32",
  "right-4 bottom-8 sm:right-8 sm:bottom-10",
];

export function ProductPreviewSection({
  content,
}: ProductPreviewSectionProps) {
  return (
    <section
      id="preview-produto"
      data-section="product-preview"
      className="py-20 sm:py-24"
    >
      <Container>
        <div className="overflow-hidden rounded-[2.6rem] bg-[#0f1720] p-6 text-white shadow-[0_30px_90px_rgba(17,20,24,0.16)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <SectionIntro
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
                tone="dark"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {content.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#9fb6c9]">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.6rem] border border-dashed border-[#35506a] bg-[#101b25] p-5 text-sm leading-7 text-[#c7d4df]">
                {content.note}
              </div>

              <PrimaryLink
                href="#agendar-demo"
                dataCta="preview-agendar-demo"
                className="self-start bg-white px-6 py-3 text-[#111418] hover:bg-[#e7edf2]"
              >
                {content.ctaLabel}
              </PrimaryLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#101b25] p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 border-b border-white/8 pb-4">
              <span className="h-3 w-3 rounded-full bg-[#f49b90]" />
              <span className="h-3 w-3 rounded-full bg-[#e7cd7d]" />
              <span className="h-3 w-3 rounded-full bg-[#8dc6a8]" />
              <span className="ml-4 text-xs uppercase tracking-[0.28em] text-[#8ca3b8]">
                Product preview placeholder
              </span>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[280px_1fr]">
              <aside className="space-y-3">
                {content.panels.map((panel, index) => (
                  <motion.div
                    key={panel.id}
                    initial={{ opacity: 0, x: -22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.18 + index * 0.08,
                      ease: "easeOut",
                    }}
                    className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#86a2bb]">
                      Modulo {index + 1}
                    </p>
                    <h3 className="mt-3 font-display text-2xl tracking-[-0.04em] text-white">
                      {panel.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#c0cfdb]">
                      {panel.description}
                    </p>
                  </motion.div>
                ))}
              </aside>

              <div className="relative min-h-[32rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,#1f3141_0%,#214b5c_42%,#d7c0a4_100%)] p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_44%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/16 bg-[#111821]/30 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#dde7ef]">
                      Jornada do usuario
                    </span>
                    <span className="rounded-full border border-white/16 bg-[#111821]/30 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#dde7ef]">
                      Placeholder visual
                    </span>
                  </div>

                  <div className="mt-8 grid flex-1 gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-white/12 bg-[#10171f]/34 p-5 backdrop-blur">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#dbe6ef]">
                        Tela principal
                      </p>
                      <div className="mt-5 h-56 rounded-[1.3rem] border border-white/10 bg-white/10" />
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="h-20 rounded-[1rem] border border-white/10 bg-white/8" />
                        <div className="h-20 rounded-[1rem] border border-white/10 bg-white/12" />
                        <div className="h-20 rounded-[1rem] border border-white/10 bg-white/8" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[1.5rem] border border-white/12 bg-[#10171f]/30 p-5 backdrop-blur">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#dbe6ef]">
                          Pagina do imovel
                        </p>
                        <div className="mt-4 space-y-3">
                          <div className="h-5 w-1/2 rounded-full bg-white/18" />
                          <div className="h-24 rounded-[1rem] bg-white/10" />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="h-20 rounded-[1rem] bg-white/8" />
                            <div className="h-20 rounded-[1rem] bg-white/12" />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-dashed border-white/18 bg-[#10171f]/26 p-5 backdrop-blur">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#dbe6ef]">
                          Integracao
                        </p>
                        <div className="mt-4 h-12 rounded-full bg-white/10" />
                        <div className="mt-3 h-24 rounded-[1rem] bg-white/8" />
                      </div>
                    </div>
                  </div>

                  {content.callouts.map((callout, index) => (
                    <motion.div
                      key={callout.id}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.32 + index * 0.08,
                        ease: "easeOut",
                      }}
                      className={`absolute ${chipPositions[index]} max-w-[12rem] rounded-[1.1rem] border border-white/20 bg-[#0f1720]/74 px-4 py-3 shadow-[0_16px_32px_rgba(17,20,24,0.16)] backdrop-blur`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8ca3b8]">
                        {callout.detail}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white">
                        {callout.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
