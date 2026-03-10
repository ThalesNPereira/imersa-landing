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

const mockupScenes = [
  { id: "fachada", label: "Fachada" },
  { id: "living", label: "Living" },
  { id: "varanda", label: "Varanda" },
];

const immersiveHotspots = [
  { id: "vista", label: "Vista", className: "left-[18%] top-[30%]", delay: 0.2 },
  { id: "cozinha", label: "Cozinha", className: "left-[47%] top-[42%]", delay: 0.34 },
  { id: "suite", label: "Suite master", className: "right-[15%] top-[24%]", delay: 0.48 },
];

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section data-section="hero" className="relative pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-3xl"
          >
            {content.eyebrow ? (
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-xs font-semibold uppercase tracking-[0.34em] text-[#718092]"
              >
                {content.eyebrow}
              </motion.p>
            ) : null}

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`${content.eyebrow ? "mt-6 " : ""}font-display text-5xl leading-[0.94] tracking-[-0.065em] text-[#111418] sm:text-6xl lg:text-[5.2rem]`}
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-7 max-w-xl text-lg leading-8 text-[#4f5c68]"
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
              {content.secondaryCtaLabel && content.secondaryCtaHref ? (
                <SecondaryLink
                  href={content.secondaryCtaHref}
                  dataCta="hero-ver-preview"
                  className="px-7 py-3.5"
                >
                  {content.secondaryCtaLabel}
                </SecondaryLink>
              ) : null}
            </motion.div>

            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 grid gap-3 text-sm font-medium text-[#30404d] sm:max-w-xl"
            >
              {content.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/72 px-4 py-3 shadow-[0_12px_28px_rgba(17,20,24,0.06)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/8 bg-[#f4efe6]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#111418]" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-x-10 top-12 h-72 rounded-full bg-[#8eb7d2]/30 blur-3xl" />
            <div className="absolute bottom-4 left-8 h-40 w-40 rounded-full bg-[#dfc59b]/35 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-[#10171f] p-3 text-white shadow-[0_30px_80px_rgba(17,20,24,0.2)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#f49b90]" />
                  <span className="h-3 w-3 rounded-full bg-[#e7cd7d]" />
                  <span className="h-3 w-3 rounded-full bg-[#8dc6a8]" />
                  <span className="ml-4 text-xs uppercase tracking-[0.28em] text-[#8ca3b8]">
                    Experiencia imersiva
                  </span>
                </div>
                <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#dbe6ef]">
                  Embed ao vivo
                </div>
              </div>

              <div className="mt-3 grid gap-3 xl:grid-cols-[0.4fr_0.6fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#8ca3b8]">
                    No seu proprio site
                  </p>
                  <p className="mt-4 max-w-xs font-display text-3xl leading-tight tracking-[-0.05em] text-white">
                    {content.previewTitle}
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#d2dde7]">
                    {content.previewDescription}
                  </p>

                  <div className="mt-5 space-y-2.5">
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
                        className="rounded-[1.25rem] border border-white/10 bg-[#0d141b]/85 p-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#8ca3b8]">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {metric.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,#13212c_0%,#1b3544_56%,#d7bf9e_132%)] p-3 min-h-[24rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%)]" />
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#d8e4ef]">
                      Tour ao vivo
                    </div>
                    <div className="rounded-full border border-white/16 bg-[#10171f]/36 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#e7eef4] backdrop-blur">
                      3 ambientes
                    </div>
                  </div>

                  <div className="relative mt-3 min-h-[15.75rem] overflow-hidden rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(245,238,228,0.96)_0%,rgba(235,226,213,0.92)_38%,rgba(181,154,121,0.58)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
                    <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_70%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent_0%,rgba(103,76,52,0.3)_100%)]" />

                    <div className="relative grid gap-3 sm:grid-cols-[0.28fr_0.44fr_0.28fr]">
                      <div className="mt-8 h-24 rounded-[1.05rem] border border-white/55 bg-[linear-gradient(180deg,#d8ccbf_0%,#b59672_100%)] shadow-[0_18px_30px_rgba(81,61,44,0.12)]" />
                      <div className="h-32 rounded-[1.2rem] border border-white/60 bg-[linear-gradient(180deg,#f7f0e5_0%,#ddcab0_52%,#b28f6b_100%)] shadow-[0_18px_34px_rgba(81,61,44,0.16)]" />
                      <div className="mt-6 h-28 rounded-[1.05rem] border border-white/55 bg-[linear-gradient(180deg,#d0c4b6_0%,#ad8d69_100%)] shadow-[0_18px_30px_rgba(81,61,44,0.12)]" />
                    </div>

                    {immersiveHotspots.map((hotspot) => (
                      <motion.div
                        key={hotspot.id}
                        className={`absolute ${hotspot.className}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: hotspot.delay, ease: "easeOut" }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.22, 1], opacity: [0.38, 0, 0.38] }}
                          transition={{
                            duration: 2.4,
                            delay: hotspot.delay,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full bg-[#0f2030]/35"
                        />
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/75 bg-[#10171f]/76 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(16,23,31,0.18)] backdrop-blur">
                          +
                        </div>
                        <div className="mt-2 rounded-full border border-[#0f2030]/12 bg-white/78 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#243340] shadow-[0_12px_24px_rgba(16,23,31,0.12)] backdrop-blur">
                          {hotspot.label}
                        </div>
                      </motion.div>
                    ))}

                    <div className="absolute bottom-3 left-3 right-3 rounded-[1.1rem] border border-white/65 bg-white/72 p-3 text-[#1f2d3a] shadow-[0_20px_35px_rgba(16,23,31,0.14)] backdrop-blur">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.26em] text-[#617384]">
                            Imovel em destaque
                          </p>
                          <p className="mt-2 font-display text-xl leading-tight tracking-[-0.04em]">
                            Apartamento decorado com tour guiado
                          </p>
                        </div>
                        <div className="rounded-full bg-[#111418] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                          Hotspots ativos
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-3 grid gap-2.5 sm:grid-cols-3">
                    {mockupScenes.map((scene, index) => (
                      <motion.div
                        key={scene.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.42 + index * 0.08,
                          ease: "easeOut",
                        }}
                        className="rounded-[1rem] border border-white/12 bg-[#10171f]/28 p-2.5 backdrop-blur"
                      >
                        <div className="h-12 rounded-[0.85rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_100%)]" />
                        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#e3edf5]">
                          {scene.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
