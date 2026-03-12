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

export type ProductPreviewMetric = {
  label: string;
  value: string;
};

export type ProductPreviewPanel = {
  id: string;
  title: string;
  description: string;
};

export type ProductPreviewCallout = {
  id: string;
  label: string;
  detail: string;
};

export type ProductPreviewContent = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  ctaLabel: string;
  metrics: ProductPreviewMetric[];
  panels: ProductPreviewPanel[];
  callouts: ProductPreviewCallout[];
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
  description: string;
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
    eyebrow: "Preview do produto",
    title: "A secao mais importante depois do hero ja nasce com espaco, hierarquia e placeholder visual.",
    description:
      "Aqui entra a demo real no futuro. Por enquanto, a estrutura comunica a proposta do produto com um mock interativo de alta prioridade.",
    note: "Placeholder visual para substituir por demo ou gravacao real do produto.",
    ctaLabel: "Agendar demo",
    metrics: [
      { label: "Contexto visual", value: "Mais clareza" },
      { label: "Publicacao", value: "Embed simples" },
      { label: "Operacao", value: "Sem captura 3D" },
    ],
    panels: [
      {
        id: "navegacao",
        title: "Navegacao guiada",
        description: "Bloco para mostrar rotas, hotspots e sequencia visual do imovel.",
      },
      {
        id: "destaques",
        title: "Destaques do imovel",
        description: "Espaco para callouts de acabamentos, plantas e areas-chave.",
      },
      {
        id: "embed",
        title: "Embed no site",
        description: "Placeholder para reforcar a integracao com WordPress e stacks customizadas.",
      },
    ],
    callouts: [
      {
        id: "callout-listagem",
        label: "Listagem mais diferenciada",
        detail: "Callout de valor principal",
      },
      {
        id: "callout-3d",
        label: "Sem captura 3D",
        detail: "Mensagem operacional",
      },
      {
        id: "callout-embed",
        label: "Embed em minutos",
        detail: "Publicacao simplificada",
      },
      {
        id: "callout-engajamento",
        label: "Melhor engajamento",
        detail: "Mais permanencia na pagina",
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
    title: "Funciona no stack que sua operação já usa",
    description:
      "Publique o viewer da imersa em CMSs, frameworks e páginas customizadas com um embed simples.",
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
        id: "html",
        label: "HTML",
        logoSrc: "/compatibility/html.svg",
      },
      {
        id: "webflow",
        label: "Webflow",
        logoSrc: "/compatibility/webflow.svg",
      },
      {
        id: "shopify",
        label: "Shopify",
        logoSrc: "/compatibility/shopify.svg",
      },
      {
        id: "angular",
        label: "Angular",
        logoSrc: "/compatibility/angular.svg",
      },
      {
        id: "vue",
        label: "Vue",
        logoSrc: "/compatibility/vue.svg",
      },
      {
        id: "javascript",
        label: "JavaScript",
        logoSrc: "/compatibility/javascript.svg",
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
    title: "Perguntas frequentes para remover objecoes antes do contato.",
    description:
      "As respostas abaixo sao placeholders em PT-BR e podem ser refinadas depois com linguagem comercial final.",
  } satisfies FaqContent,
  faqs: [
    {
      id: "setup",
      question: "Como funciona o setup inicial?",
      answer:
        "Placeholder: o setup parte do material ja existente e da definicao do fluxo visual que a experiencia deve comunicar.",
    },
    {
      id: "hosting",
      question: "Preciso mudar minha hospedagem atual?",
      answer:
        "Placeholder: nao necessariamente. A proposta e publicar a experiencia via embed, mantendo o site atual como base.",
    },
    {
      id: "prazo",
      question: "Qual e o prazo de entrega?",
      answer:
        "Placeholder: o prazo depende do volume de material e do nivel de customizacao, mas a secao deve transmitir um processo enxuto.",
    },
    {
      id: "wordpress",
      question: "Funciona em WordPress?",
      answer:
        "Placeholder: sim, o embed foi pensado para entrar em WordPress com implementacao simples.",
    },
    {
      id: "customizado",
      question: "E se o site for customizado?",
      answer:
        "Placeholder: a mesma logica de embed se aplica a sites customizados, desde que exista acesso ao bloco ou template da pagina.",
    },
  ] satisfies FaqItem[],
};

export type LandingContent = typeof landingContent;
