"use client";

import { motion } from "framer-motion";
import type { HeroContent } from "@/content/landing";
import { Container, PrimaryLink, SecondaryLink } from "./shared";

type HeroSectionProps = {
  content: HeroContent;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section data-section="hero" className="relative pb-20 pt-14 sm:pb-24 lg:pb-28 lg:pt-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-xs font-semibold uppercase tracking-[0.34em] text-[#718092]"
            >
              {content.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.065em] text-[#111418] sm:text-6xl lg:text-[5.6rem]"
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-7 max-w-2xl text-lg leading-8 text-[#4f5c68]"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <PrimaryLink
                href="#agendar-demo"
                dataCta="hero-agendar-demo"
                className="px-7 py-3.5"
              >
                {content.primaryCtaLabel}
              </PrimaryLink>
              <SecondaryLink
                href={content.secondaryCtaHref}
                dataCta="hero-ver-preview"
                className="px-7 py-3.5"
              >
                {content.secondaryCtaLabel}
              </SecondaryLink>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {content.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-medium text-[#30404d] shadow-[0_8px_24px_rgba(17,20,24,0.06)]"
                >
                  {highlight}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-x-10 top-12 h-72 rounded-full bg-[#8eb7d2]/30 blur-3xl" />
            <div className="absolute bottom-4 left-8 h-40 w-40 rounded-full bg-[#dfc59b]/35 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/40 bg-[#10171f] p-4 text-white shadow-[0_30px_80px_rgba(17,20,24,0.2)]">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-3 w-3 rounded-full bg-[#f49b90]" />
                <span className="h-3 w-3 rounded-full bg-[#e7cd7d]" />
                <span className="h-3 w-3 rounded-full bg-[#8dc6a8]" />
                <span className="ml-4 text-xs uppercase tracking-[0.28em] text-[#8ca3b8]">
                  Preview do produto
                </span>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.42fr_0.58fr]">
                <div className="space-y-3">
                  {content.previewMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.28 + index * 0.08,
                        ease: "easeOut",
                      }}
                      className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8ca3b8]">
                        {metric.label}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {metric.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#1d2b37_0%,#1c3948_45%,#d9c1a6_100%)] p-6 min-h-[24rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_45%)]" />
                  <div className="relative">
                    <div className="inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#d8e4ef]">
                      Placeholder visual
                    </div>
                    <h2 className="mt-6 max-w-sm font-display text-3xl leading-tight tracking-[-0.05em]">
                      {content.previewTitle}
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-[#e0e8ef]">
                      {content.previewDescription}
                    </p>
                  </div>

                  <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-white/18 bg-[#111418]/40 p-4 backdrop-blur">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#bfd0df]">
                        Bloco A
                      </p>
                      <div className="mt-4 h-24 rounded-[1rem] border border-white/12 bg-white/8" />
                    </div>
                    <div className="rounded-[1.35rem] border border-white/18 bg-[#111418]/40 p-4 backdrop-blur">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#bfd0df]">
                        Bloco B
                      </p>
                      <div className="mt-4 flex h-24 items-end gap-2 rounded-[1rem] border border-white/12 bg-white/8 p-3">
                        <div className="h-7 w-1/4 rounded-full bg-white/20" />
                        <div className="h-12 w-1/4 rounded-full bg-white/35" />
                        <div className="h-16 w-1/4 rounded-full bg-white/55" />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.52, ease: "easeOut" }}
                    className="absolute bottom-6 right-6 rounded-full border border-white/18 bg-[#10171f]/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-[#dbe6ef] backdrop-blur"
                  >
                    Demo futura
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
