import { BenefitsSection } from "@/components/landing/benefits-section";
import { BookDemoSection } from "@/components/landing/book-demo-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProductPreviewSection } from "@/components/landing/product-preview-section";
import { SiteHeader } from "@/components/landing/site-header";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { landingContent } from "@/content/landing";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_top,rgba(146,182,210,0.3),transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-32 h-80 w-80 rounded-full bg-[#dec49f]/22 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-56 h-[24rem] w-[24rem] rounded-full bg-[#b0cada]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(17,20,24,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,20,24,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative">
        <SiteHeader
          links={landingContent.headerLinks}
          ctaLabel={landingContent.hero.primaryCtaLabel}
        />
        <HeroSection content={landingContent.hero} />
        <SocialProofSection
          content={landingContent.socialProof}
          logos={landingContent.logos}
        />
        <HowItWorksSection
          eyebrow={landingContent.howItWorks.eyebrow}
          title={landingContent.howItWorks.title}
          description={landingContent.howItWorks.description}
          steps={landingContent.steps}
        />
        <ProductPreviewSection content={landingContent.productPreview} />
        <BenefitsSection
          intro={landingContent.benefitsIntro}
          benefits={landingContent.benefits}
        />
        <TestimonialSection content={landingContent.testimonial} />
        <BookDemoSection content={landingContent.bookDemo} />
        <FaqSection intro={landingContent.faqIntro} faqs={landingContent.faqs} />
      </div>
    </main>
  );
}
