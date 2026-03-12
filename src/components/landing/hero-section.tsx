"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent } from "@/content/landing";
import { Container, PrimaryLink, SecondaryLink } from "./shared";

type HeroSectionProps = {
  content: HeroContent;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const ambientLoopDuration = 5.2;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type PropertySceneProps = {
  reducedMotion: boolean;
  variant: "photo" | "immersive";
};

function PropertyScene({ reducedMotion, variant }: PropertySceneProps) {
  const isImmersive = variant === "immersive";
  const panelTransition = reducedMotion
    ? undefined
    : {
        duration: ambientLoopDuration,
        ease: "easeInOut" as const,
        repeat: Number.POSITIVE_INFINITY,
      };

  return (
    <div
      className={cx(
        "absolute inset-0 overflow-hidden",
        isImmersive
          ? "bg-[linear-gradient(180deg,#fbf7ef_0%,#eadbc7_44%,#aa805c_100%)]"
          : "bg-[linear-gradient(180deg,#f2ede5_0%,#e6dbce_48%,#b69877_100%)]",
      )}
      style={
        isImmersive ? undefined : { filter: "saturate(0.84) contrast(0.92) brightness(1.02)" }
      }
    >
      <motion.div
        className="absolute inset-0"
        animate={
          isImmersive && !reducedMotion
            ? { x: [0, -8, 0], y: [0, -4, 0] }
            : undefined
        }
        transition={panelTransition}
      >
        <div
          className={cx(
            "absolute inset-0",
            isImmersive
              ? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_35%),radial-gradient(circle_at_bottom,rgba(79,101,120,0.14),transparent_42%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_35%),radial-gradient(circle_at_bottom,rgba(120,99,76,0.12),transparent_42%)]",
          )}
        />
        <div
          className={cx(
            "absolute inset-x-0 bottom-0 h-[40%]",
            isImmersive
              ? "bg-[linear-gradient(180deg,rgba(124,93,66,0)_0%,rgba(124,93,66,0.28)_100%)]"
              : "bg-[linear-gradient(180deg,rgba(124,93,66,0)_0%,rgba(124,93,66,0.18)_100%)]",
          )}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={isImmersive && !reducedMotion ? { y: [0, -3, 0] } : undefined}
        transition={panelTransition}
      >
        <div
          className={cx(
            "absolute left-[11%] top-[23%] h-[30%] w-[19%] rounded-[1.35rem] border",
            isImmersive
              ? "border-white/60 bg-[linear-gradient(180deg,rgba(217,204,191,0.95),rgba(181,151,118,0.98))] shadow-[0_18px_30px_rgba(82,61,44,0.12)]"
              : "border-white/48 bg-[linear-gradient(180deg,rgba(212,200,186,0.98),rgba(185,162,135,0.96))] shadow-[0_12px_22px_rgba(82,61,44,0.08)]",
          )}
        />
        <div
          className={cx(
            "absolute left-[33%] right-[22%] top-[15%] h-[40%] rounded-[1.7rem] border",
            isImmersive
              ? "border-white/65 bg-[linear-gradient(180deg,rgba(248,240,229,0.98),rgba(225,204,177,0.96)_56%,rgba(178,143,107,0.98))] shadow-[0_20px_34px_rgba(82,61,44,0.14)]"
              : "border-white/52 bg-[linear-gradient(180deg,rgba(241,233,221,0.98),rgba(220,201,176,0.94)_54%,rgba(183,153,122,0.94))] shadow-[0_14px_26px_rgba(82,61,44,0.1)]",
          )}
        />
        <div
          className={cx(
            "absolute right-[9%] top-[20%] h-[34%] w-[18%] rounded-[1.35rem] border",
            isImmersive
              ? "border-white/58 bg-[linear-gradient(180deg,rgba(208,196,182,0.96),rgba(174,142,108,0.98))] shadow-[0_18px_28px_rgba(82,61,44,0.12)]"
              : "border-white/44 bg-[linear-gradient(180deg,rgba(205,194,180,0.96),rgba(177,149,118,0.95))] shadow-[0_12px_20px_rgba(82,61,44,0.08)]",
          )}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={isImmersive && !reducedMotion ? { x: [0, 6, 0], y: [0, -2, 0] } : undefined}
        transition={panelTransition}
      >
        <div
          className={cx(
            "absolute left-[15%] right-[13%] bottom-0 h-[32%]",
            isImmersive
              ? "bg-[linear-gradient(180deg,rgba(245,239,231,0.02),rgba(133,103,78,0.24))]"
              : "bg-[linear-gradient(180deg,rgba(245,239,231,0.02),rgba(133,103,78,0.18))]",
          )}
          style={{ clipPath: "polygon(0 28%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className={cx(
            "absolute left-[18%] right-[16%] bottom-[18%] h-[17%] rounded-[1.45rem] border",
            isImmersive
              ? "border-white/70 bg-[linear-gradient(180deg,rgba(247,241,232,0.98),rgba(221,204,184,0.98)_52%,rgba(167,139,111,0.98))] shadow-[0_22px_34px_rgba(73,53,36,0.14)]"
              : "border-white/54 bg-[linear-gradient(180deg,rgba(243,237,228,0.98),rgba(221,207,190,0.96)_52%,rgba(176,151,124,0.94))] shadow-[0_16px_24px_rgba(73,53,36,0.09)]",
          )}
        />
        <div
          className={cx(
            "absolute left-[39%] right-[34%] bottom-[13%] h-[8%] rounded-[1rem] border",
            isImmersive
              ? "border-white/64 bg-[linear-gradient(180deg,rgba(240,233,222,0.98),rgba(197,176,149,0.98))] shadow-[0_14px_24px_rgba(73,53,36,0.12)]"
              : "border-white/50 bg-[linear-gradient(180deg,rgba(238,230,220,0.96),rgba(202,183,158,0.96))] shadow-[0_10px_20px_rgba(73,53,36,0.08)]",
          )}
        />
      </motion.div>

      <div className="absolute inset-y-[18%] left-[31%] w-px bg-white/30" />
      <div className="absolute inset-y-[16%] right-[31%] w-px bg-white/18" />
      <div className="absolute left-[33%] right-[22%] top-[28%] h-px bg-white/20" />
      <div className="absolute left-[18%] right-[15%] bottom-[27%] h-px bg-white/12" />

      {isImmersive ? (
        <>
          <motion.div
            className="absolute inset-[13%] opacity-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(67,82,95,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(67,82,95,0.12) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.86) 80%, transparent 100%)",
              maskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.86) 80%, transparent 100%)",
            }}
            animate={
              reducedMotion
                ? { opacity: 0.08 }
                : { opacity: [0.02, 0.14, 0.05, 0.12, 0.02] }
            }
            transition={panelTransition}
          />
          {reducedMotion ? (
            <div className="absolute right-[18%] top-[12%] h-[72%] w-[22%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] blur-2xl opacity-10" />
          ) : (
            <motion.div
              className="absolute inset-y-[10%] -left-[34%] w-[42%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] blur-2xl"
              animate={{ x: ["0%", "205%"], opacity: [0, 0.22, 0] }}
              transition={{
                duration: ambientLoopDuration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_24%,transparent_74%,rgba(255,255,255,0.08))]" />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_22%,transparent_72%,rgba(17,20,24,0.08))]" />
    </div>
  );
}

function AmbientComparisonPanel({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="pointer-events-none absolute inset-x-10 top-5 h-36 rounded-full bg-[#8eb7d2]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 left-6 h-24 w-24 rounded-full bg-[#dfc59b]/22 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2.1rem] border border-white/70 bg-[linear-gradient(145deg,rgba(249,246,240,0.94),rgba(241,236,228,0.88))] p-3 shadow-[0_28px_72px_rgba(17,20,24,0.14)] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(143,183,209,0.16),transparent_24%)]" />

        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.7rem] border border-black/8 bg-[#ebe2d5] shadow-[inset_0_1px_0_rgba(255,255,255,0.46)] sm:aspect-[16/11]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-[linear-gradient(180deg,rgba(247,243,236,0.94)_0%,rgba(247,243,236,0)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-[linear-gradient(180deg,rgba(247,243,236,0)_0%,rgba(247,243,236,0.94)_100%)]" />

          <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between text-[10px] font-medium tracking-[0.12em] text-[#66717c] sm:left-5 sm:right-5 sm:top-5">
            <span>Foto original</span>
            <span>{"Experi\u00eancia imersiva"}</span>
          </div>

          <PropertyScene reducedMotion={reducedMotion} variant="photo" />

          <motion.div
            className="absolute inset-y-0 right-0 z-10 overflow-hidden"
            initial={false}
            animate={
              reducedMotion
                ? { width: "50%" }
                : { width: ["50%", "47.5%", "51.5%", "49%", "50%"] }
            }
            transition={{
              duration: ambientLoopDuration,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.74) 16%, rgba(0,0,0,1) 28%, rgba(0,0,0,1) 100%)",
                maskImage:
                  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.74) 16%, rgba(0,0,0,1) 28%, rgba(0,0,0,1) 100%)",
              }}
              animate={
                reducedMotion
                  ? { opacity: 0.98 }
                  : { opacity: [0.94, 1, 0.96, 0.98, 0.94] }
              }
              transition={{
                duration: ambientLoopDuration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <PropertyScene reducedMotion={reducedMotion} variant="immersive" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_58%,transparent_100%)]" />
            </motion.div>

            <div className="pointer-events-none absolute inset-y-5 left-0 z-20 w-px bg-white/88 shadow-[0_0_0_1px_rgba(17,20,24,0.04),0_0_24px_rgba(255,255,255,0.4)]" />
          </motion.div>

          <p className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-[10px] font-medium tracking-[0.12em] text-[#6e7882] sm:bottom-5">
            de {"\u2192"} para
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section data-section="hero" className="relative pb-14 pt-6 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-8">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
            className="max-w-2xl"
          >
            {content.eyebrow ? (
              <motion.p
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                className="text-xs font-semibold uppercase tracking-[0.34em] text-[#718092]"
              >
                {content.eyebrow}
              </motion.p>
            ) : null}

            <motion.h1
              variants={fadeUp}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
              className={`${content.eyebrow ? "mt-5 " : ""}font-display text-[2.95rem] leading-[0.95] tracking-[-0.065em] text-[#111418] sm:text-[4.1rem] lg:text-[4.85rem]`}
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
              className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#4f5c68]"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
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
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
            className="relative w-full"
          >
            <AmbientComparisonPanel reducedMotion={reduceMotion} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
