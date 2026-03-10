import type { ReactNode } from "react";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

type LinkProps = {
  children: ReactNode;
  className?: string;
  dataCta: string;
  href: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
}: SectionIntroProps) {
  const isDark = tone === "dark";
  const isCentered = align === "center";

  return (
    <div className={cx("max-w-3xl", isCentered && "mx-auto text-center")}>
      <p
        className={cx(
          "text-xs font-medium uppercase tracking-[0.32em]",
          isDark ? "text-[#9fb6c9]" : "text-[#6b7280]",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cx(
          "mt-4 font-display text-3xl leading-tight tracking-[-0.05em] sm:text-4xl lg:text-[3.25rem]",
          isDark ? "text-white" : "text-[#111418]",
        )}
      >
        {title}
      </h2>
      <p
        className={cx(
          "mt-5 max-w-2xl text-base leading-8 sm:text-lg",
          isCentered && "mx-auto",
          isDark ? "text-[#d2dae2]" : "text-[#5b6470]",
        )}
      >
        {description}
      </p>
    </div>
  );
}

export function PrimaryLink({ children, className, dataCta, href }: LinkProps) {
  return (
    <a
      href={href}
      data-cta={dataCta}
      className={cx(
        "inline-flex items-center justify-center rounded-full bg-[#111418] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2630]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryLink({ children, className, dataCta, href }: LinkProps) {
  return (
    <a
      href={href}
      data-cta={dataCta}
      className={cx(
        "inline-flex items-center justify-center rounded-full border border-black/10 bg-white/65 px-6 py-3 text-sm font-semibold text-[#21303d] backdrop-blur transition hover:border-black/20 hover:bg-white",
        className,
      )}
    >
      {children}
    </a>
  );
}
