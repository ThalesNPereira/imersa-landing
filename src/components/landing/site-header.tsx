"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeaderLink } from "@/content/landing";
import { Container, PrimaryLink } from "./shared";

type SiteHeaderProps = {
  ctaLabel: string;
  links: HeaderLink[];
};

export function SiteHeader({ ctaLabel, links }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resolvedCtaLabel =
    ctaLabel === "Agendar demo" ? "Agendar demonstração" : ctaLabel;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-6">
      <Container>
        <div className="rounded-[1.8rem] border border-white/55 bg-[#faf7f1]/52 px-4 py-3 shadow-[0_18px_40px_rgba(17,20,24,0.06)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="Voltar ao topo"
              className="inline-flex shrink-0 items-center transition hover:opacity-80"
            >
              <Image
                src="/logo/Logo.svg"
                alt="imersa"
                width={112}
                height={54}
                priority
                className="h-auto w-[96px] sm:w-[112px]"
              />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <nav className="flex items-center gap-6 text-sm font-medium text-[#4a5560] lg:gap-7">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center whitespace-nowrap transition hover:text-[#111418]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <PrimaryLink
                href="#agendar-demo"
                dataCta="header-agendar-demo"
                className="w-fit px-5 py-3 text-[11px] uppercase tracking-[0.22em] shadow-[0_14px_30px_rgba(17,20,24,0.14)] sm:px-6"
              >
                {resolvedCtaLabel}
              </PrimaryLink>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-site-menu"
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/8 bg-white/44 px-4 text-xs font-medium uppercase tracking-[0.18em] text-[#36414d] backdrop-blur transition hover:bg-white/60"
              >
                Menu
                <span className="flex flex-col gap-1">
                  <span
                    className={`h-px w-3 bg-current transition ${isMenuOpen ? "translate-y-[5px] rotate-45" : ""}`}
                  />
                  <span
                    className={`h-px w-3 bg-current transition ${isMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`h-px w-3 bg-current transition ${isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
                  />
                </span>
              </button>

              <PrimaryLink
                href="#agendar-demo"
                dataCta="header-agendar-demo"
                className="h-11 px-4 text-[10px] uppercase tracking-[0.14em] shadow-[0_14px_30px_rgba(17,20,24,0.14)]"
              >
                <span className="sm:hidden">Agendar</span>
                <span className="hidden sm:inline">{resolvedCtaLabel}</span>
              </PrimaryLink>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMenuOpen ? (
              <motion.div
                id="mobile-site-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden md:hidden"
              >
                <nav className="mt-4 flex flex-col gap-1 border-t border-black/8 pt-4">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-[#36414d] transition hover:bg-white/50 hover:text-[#111418]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}
