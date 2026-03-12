const fallbackSiteUrl = "https://imersa.io";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return fallbackSiteUrl;
  }

  try {
    return new URL(value).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteConfig = {
  name: "imersa",
  domain: "imersa.io",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "A imersa transforma fotos de imoveis em experiencias interativas prontas para publicar no site da sua imobiliaria.",
  locale: "pt_BR",
  language: "pt-BR",
  themeColor: "#111418",
  backgroundColor: "#f6f1e8",
  ogImage: {
    url: "/og-image.png",
    width: 1376,
    height: 768,
    alt: "Ambiente imersivo apresentado pela imersa",
  },
  keywords: [
    "experiencia imersiva para imoveis",
    "viewer imobiliario",
    "marketing imobiliario",
    "tour virtual para imoveis",
    "proptech brasil",
    "demo imobiliaria",
  ],
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
