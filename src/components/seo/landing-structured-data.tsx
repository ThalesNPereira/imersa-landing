import { landingContent } from "@/content/landing";
import { absoluteUrl, siteConfig } from "@/lib/site";

function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo/Logo.svg"),
        },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service`,
        name: "Experiencias interativas para imoveis",
        serviceType: "Experiencias interativas para imoveis",
        description: siteConfig.description,
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        availableLanguage: [siteConfig.language],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: landingContent.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function LandingStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}
