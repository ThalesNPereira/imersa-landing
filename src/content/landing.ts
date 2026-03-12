export type HeaderLink = {
  href: string;
  label: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type SocialProofContent = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
};

export type LogoItem = {
  id: string;
  label: string;
};

export type StepItem = {
  id: string;
  number: string;
  title: string;
  support: string;
};

export type ProductPreviewItem = {
  id: string;
  title: string;
  imageSrc: string;
  viewerLabel: string;
};

export type ProductPreviewContent = {
  items: ProductPreviewItem[];
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  outcome?: string;
};

export type BenefitsContent = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type CompatibilityItem = {
  id: string;
  label: string;
  logoSrc: string;
};

export type CompatibilityContent = {
  eyebrow: string;
  title: string;
  supportLine: string;
  footerNote: string;
  items: CompatibilityItem[];
};

export type BookDemoContent = {
  eyebrow: string;
  title: string;
  description: string;
  proofPoints: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export const landingContent = {
  headerLinks: [
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#preview-produto", label: "Demonstra\u00e7\u00e3o" },
    { href: "#beneficios", label: "Vantagens" },
    { href: "#faq", label: "FAQ" },
  ] satisfies HeaderLink[],
  hero: {
    title: "Transforme fotos de im\u00f3veis em experi\u00eancias imersivas",
    description:
      "A imersa ajuda imobili\u00e1rias a publicar experi\u00eancias interativas a partir das fotos do an\u00fancio, direto no pr\u00f3prio site.",
    primaryCtaLabel: "Agendar demonstra\u00e7\u00e3o",
    secondaryCtaLabel: "Ver demonstra\u00e7\u00e3o",
    secondaryCtaHref: "#preview-produto",
  } satisfies HeroContent,
  socialProof: {
    eyebrow: "Prova social",
    title: "Espaco reservado para logos de clientes e parceiros.",
    description:
      "A faixa entra cedo na pagina para reforcar confianca assim que os primeiros nomes estiverem aprovados.",
    note: "Placeholder visual. Substituir por logos reais assim que houver aprovacao de marca.",
  } satisfies SocialProofContent,
  logos: [
    { id: "01", label: "Marca 01" },
    { id: "02", label: "Marca 02" },
    { id: "03", label: "Marca 03" },
    { id: "04", label: "Marca 04" },
    { id: "05", label: "Marca 05" },
    { id: "06", label: "Marca 06" },
  ] satisfies LogoItem[],
  howItWorks: {
    eyebrow: "Em 3 passos",
    title: "Como funciona",
    description:
      "Transformamos as fotos do imóvel em uma experiência imersiva pronta para publicar no seu site.",
  },
  steps: [
    {
      id: "fotos",
      number: "01",
      title: "Envie as fotos do imóvel",
      support:
        "Use as imagens que você já tem no anúncio, sem captura 3D ou equipamentos especiais.",
    },
    {
      id: "geracao",
      number: "02",
      title: "A imersa gera a experiência",
      support:
        "Processamos as imagens, montamos o ambiente imersivo e fazemos ajustes manuais quando necessário para garantir qualidade.",
    },
    {
      id: "publicacao",
      number: "03",
      title: "Publique no seu site",
      support:
        "Hospedamos a experiência e entregamos um viewer pronto para incorporar no WordPress ou em sites customizados.",
    },
  ] satisfies StepItem[],
  productPreview: {
    items: [
      {
        id: "quarto",
        title: "Quarto",
        imageSrc: "/empreendimento/Quarto.avif",
        viewerLabel: "Viewer_Quarto",
      },
      {
        id: "cozinha",
        title: "Cozinha",
        imageSrc: "/empreendimento/Cozinha.avif",
        viewerLabel: "Viewer_Cozinha",
      },
      {
        id: "sala",
        title: "Sala",
        imageSrc: "/empreendimento/Sala.avif",
        viewerLabel: "Viewer_Sala",
      },
    ],
  } satisfies ProductPreviewContent,
  benefitsIntro: {
    title: "Por que usar a imersa",
    description:
      "Uma nova forma de apresentar im\u00f3veis com mais impacto, sem mudar sua opera\u00e7\u00e3o.",
  } satisfies BenefitsContent,
  benefits: [
    {
      id: "diferenciacao",
      title: "Destaque seus an\u00fancios",
      description:
        "Ofere\u00e7a uma experi\u00eancia mais moderna e diferenciada do que galerias de fotos est\u00e1ticas.",
    },
    {
      id: "sem-3d",
      title: "Sem captura 3D",
      description:
        "Use as fotos que voc\u00ea j\u00e1 tem, sem equipamentos, visitas t\u00e9cnicas ou produ\u00e7\u00e3o adicional.",
    },
    {
      id: "embed",
      title: "Publique no seu pr\u00f3prio site",
      description:
        "A experi\u00eancia fica pronta para incorporar no WordPress ou em sites customizados.",
    },
    {
      id: "marca",
      title: "Mais valor para a marca da imobili\u00e1ria",
      description:
        "Apresente im\u00f3veis de forma mais sofisticada, aumente percep\u00e7\u00e3o de inova\u00e7\u00e3o e fortale\u00e7a sua presen\u00e7a digital.",
    },
  ] satisfies BenefitItem[],
  compatibility: {
    eyebrow: "Compatibilidade",
    title: "Compatível com a estrutura do seu site",
    supportLine:
      "Publique o viewer da imersa em WordPress, sites customizados e frameworks modernos de frontend.",
    footerNote:
      "Precisa de uma implementação personalizada? Nossa equipe pode ajudar com a integração.",
    items: [
      {
        id: "wordpress",
        label: "WordPress",
        logoSrc: "/compatibility/wordpress.svg",
      },
      {
        id: "react",
        label: "React",
        logoSrc: "/compatibility/react.svg",
      },
      {
        id: "nextjs",
        label: "Next.js",
        logoSrc: "/compatibility/nextjs.svg",
      },
      {
        id: "webflow",
        label: "Webflow",
        logoSrc: "/compatibility/webflow.svg",
      },
      {
        id: "html",
        label: "HTML",
        logoSrc: "/compatibility/html.svg",
      },
      {
        id: "javascript",
        label: "JavaScript",
        logoSrc: "/compatibility/javascript.svg",
      },
      {
        id: "vue",
        label: "Vue",
        logoSrc: "/compatibility/vue.svg",
      },
      {
        id: "angular",
        label: "Angular",
        logoSrc: "/compatibility/angular.svg",
      },
    ],
  } satisfies CompatibilityContent,
  bookDemo: {
    eyebrow: "Agendar demo",
    title: "Veja a imersa aplicada ao seu portfolio em uma conversa objetiva.",
    description:
      "Escolha um horario e entenda como transformar fotos de imoveis em uma experiencia interativa publicada no seu proprio site.",
    proofPoints: [
      "Demo guiada com foco no seu processo comercial.",
      "Sem preparo tecnico da sua equipe antes da conversa.",
      "Fluxo pensado para imobiliarias, incorporadoras e paginas proprietarias.",
    ],
  } satisfies BookDemoContent,
  faqIntro: {
    eyebrow: "FAQ",
    title: "Duvidas comuns antes de colocar a imersa no seu site.",
    description:
      "Respondemos as perguntas mais frequentes sobre integracao, prazo e operacao para voce avaliar a imersa com clareza.",
  } satisfies FaqContent,
  faqs: [
    {
      id: "setup",
      question: "Como funciona o setup inicial?",
      answer:
        "O setup comeca com as fotos do imovel e um alinhamento rapido sobre o objetivo comercial da pagina. A equipe da imersa organiza o material, monta a experiencia interativa e valida a entrega antes da publicacao.",
    },
    {
      id: "hosting",
      question: "Preciso mudar minha hospedagem atual?",
      answer:
        "Nao. A imersa foi pensada para funcionar via embed, entao voce pode manter a hospedagem e o CMS atuais enquanto adiciona a experiencia nas paginas que fizerem sentido.",
    },
    {
      id: "prazo",
      question: "Qual e o prazo de entrega?",
      answer:
        "O prazo varia conforme o volume de ambientes e o nivel de personalizacao, mas o processo foi desenhado para ser rapido e sem exigir producao 3D tradicional.",
    },
    {
      id: "wordpress",
      question: "Funciona em WordPress?",
      answer:
        "Sim. O viewer pode ser incorporado em paginas WordPress com implementacao simples, preservando a estrutura atual do site.",
    },
    {
      id: "customizado",
      question: "E se o site for customizado?",
      answer:
        "Sim. Se o seu site for customizado, entregamos a experiencia pronta para embed e apoiamos a equipe responsavel na integracao.",
    },
  ] satisfies FaqItem[],
};

export type LandingContent = typeof landingContent;
