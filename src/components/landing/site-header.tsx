import Image from "next/image";
import type { HeaderLink } from "@/content/landing";
import { Container, PrimaryLink } from "./shared";

type SiteHeaderProps = {
  ctaLabel: string;
  links: HeaderLink[];
};

export function SiteHeader({ ctaLabel, links }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 pt-6">
      <Container>
        <div className="flex items-center justify-between gap-4 rounded-full border border-black/8 bg-[#f4f1ea]/80 px-3 py-3 shadow-[0_12px_40px_rgba(17,20,24,0.08)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-[1.15rem] bg-[#111418] px-4 py-3 shadow-[0_10px_30px_rgba(17,20,24,0.18)]">
              <Image
                src="/logo/Logo.svg"
                alt="imersa"
                width={112}
                height={54}
                priority
                className="h-auto w-[96px] sm:w-[112px]"
              />
            </div>
            <p className="hidden max-w-[14rem] text-xs uppercase tracking-[0.24em] text-[#58626f] lg:block">
              Proptech visual para paginas de imoveis mais claras e premium.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#36414d] transition hover:text-[#111418]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <PrimaryLink
              href="#agendar-demo"
              dataCta="header-agendar-demo"
              className="px-4 py-2.5 text-xs uppercase tracking-[0.2em] sm:px-5"
            >
              {ctaLabel}
            </PrimaryLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
