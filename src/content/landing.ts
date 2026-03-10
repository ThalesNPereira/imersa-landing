export type HeaderLink = {
  href: string;
  label: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  highlights: string[];
  previewTitle: string;
  previewDescription: string;
  previewMetrics: HeroMetric[];
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
  description: string;
  detail: string;
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
  outcome: string;
};

export type BenefitsContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type TestimonialContent = {
  eyebrow: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  note: string;
  highlights: string[];
};

export type BookDemoContent = {
  eyebrow: string;
  title: string;
  description: string;
  placeholderLabel: string;
  checklist: string[];
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
    { href: "#preview-produto", label: "Preview" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#faq", label: "FAQ" },
  ] satisfies HeaderLink[],
  hero: {
    eyebrow: "Experiencia interativa para imoveis",
    title: "Destaque cada listagem com uma experiencia visual mais clara e mais memoravel.",
    description:
      "A imersa transforma a pagina do imovel em uma experiencia interativa, sem captura 3D e pronta para publicar com embed simples.",
    primaryCtaLabel: "Agendar demo",
    secondaryCtaLabel: "Ver preview",
    secondaryCtaHref: "#preview-produto",
    highlights: [
      "Listagens mais diferenciadas",
      "Sem fluxo de captura 3D",
      "Embed pronto para WordPress",
    ],
    previewTitle: "Placeholder da experiencia principal",
    previewDescription:
      "Esta area representa a visualizacao interativa do produto e sera substituida pela demo real.",
    previewMetrics: [
      { label: "Formato", value: "Web embed" },
      { label: "Entrada", value: "Fotos + video" },
      { label: "Publicacao", value: "Site ou portal" },
    ],
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
    eyebrow: "Como funciona",
    title: "Tres etapas simples para sair do material bruto para uma experiencia publicada.",
    description:
      "O objetivo desta secao e explicar o fluxo com clareza visual e sem parecer um processo tecnico pesado.",
  },
  steps: [
    {
      id: "entrada",
      number: "01",
      title: "Receba o material",
      description:
        "Use fotos, video ou renders que o time comercial ja possui para montar a experiencia.",
      detail: "Sem hardware novo. Sem captura 3D.",
    },
    {
      id: "estrutura",
      number: "02",
      title: "Organizamos a navegacao",
      description:
        "A imersa estrutura hotspots, sequencia visual e contexto para destacar o imovel.",
      detail: "Fluxo guiado para web e vendas.",
    },
    {
      id: "publicacao",
      number: "03",
      title: "Publique com embed",
      description:
        "A experiencia entra no WordPress ou em site customizado por meio de um embed simples.",
      detail: "Pronto para paginas de produto e campanhas.",
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
    eyebrow: "Por que imersa",
    title: "Os beneficios desta landing ja apontam para o resultado, nao para a tecnologia pela tecnologia.",
    description:
      "Cada card abaixo funciona como placeholder para mensagens comerciais mais fortes quando o posicionamento final estiver fechado.",
  } satisfies BenefitsContent,
  benefits: [
    {
      id: "diferenciacao",
      title: "Listagens mais diferenciadas",
      description:
        "Reserve espaco para explicar como a experiencia valoriza o imovel e cria percepcao premium na pagina.",
      outcome: "Mais percepcao de valor",
    },
    {
      id: "sem-3d",
      title: "Sem captura 3D",
      description:
        "Deixe claro que o fluxo parte do material ja existente, reduzindo friccao operacional e custo inicial.",
      outcome: "Operacao mais leve",
    },
    {
      id: "embed",
      title: "Embed simples",
      description:
        "Mostre que o time consegue publicar no site proprio com implementacao enxuta e sem replatforming.",
      outcome: "Entrada rapida no ar",
    },
    {
      id: "engajamento",
      title: "Melhor engajamento",
      description:
        "Use esta mensagem para conectar experiencia visual com mais tempo na pagina e interesse qualificado.",
      outcome: "Mais tempo e atencao",
    },
  ] satisfies BenefitItem[],
  testimonial: {
    eyebrow: "Depoimento / case",
    title: "Um quote forte ajuda a reduzir friccao antes do agendamento.",
    quote:
      "A experiencia deixou a apresentacao do imovel muito mais clara para o cliente final e elevou a percepcao da nossa pagina comercial.",
    author: "Nome do cliente",
    role: "Cargo do responsavel",
    company: "Empresa / incorporadora",
    note: "Conteudo de exemplo. Substituir por um depoimento real assim que o case estiver aprovado.",
    highlights: ["Pagina comercial", "Produto premium", "Experiencia guiada"],
  } satisfies TestimonialContent,
  bookDemo: {
    eyebrow: "Agendar demo",
    title: "Area reservada para o embed do Cal.com com CTA forte perto do fechamento da pagina.",
    description:
      "Nesta primeira versao, o embed permanece como placeholder visual. A secao ja esta pronta para receber o agendamento real depois.",
    placeholderLabel: "Placeholder do embed do Cal.com",
    checklist: [
      "Substituir pelo evento real do Cal.com",
      "Adicionar tracking de clique e conclusao",
      "Confirmar responsavel comercial e agenda",
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
