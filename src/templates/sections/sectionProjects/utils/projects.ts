export const projects = [
  {
    nameProject: "Campeonato Fut7",
    img: "/fut.png",
    isPrivate: false,
    shortDescription:
      "Plataforma Full Stack para gerenciar campeonatos de futebol society com times, grupos, resultados em tempo real e checkout via Stripe.",
    description:
      "Plataforma completa para gerenciar campeonatos de futebol society do início ao fim. Cada jogador pode ter seu próprio time, organizar grupos, gerenciar capitães e acompanhar toda a evolução do campeonato em tempo real.",
    features: [
      "Times e grupos organizados por campeonato",
      "Cadastro de capitães, fotos e jogadores",
      "Acompanhamento de gols e resultados em tempo real",
      "Tabela de classificação dinâmica",
      "Convites e gestão de participação",
      "Checkout e inscrições seguras via Stripe",
      "Dashboard administrativo completo",
      "Relatórios por time, jogador e campeonato",
      "API REST para integração externa",
    ],
    differential:
      "Experiência completa para jogadores, times e administradores, com backend robusto e performance máxima.",
    stack: [
      "Fullstack",
      "Next.js",
      "Node.js + Express",
      "PostgreSQL",
      "TailwindCSS",
      "TypeScript",
      "Zod",
      "Multer",
      "Stripe",
      "DnD Kit",
      "Cookies HTTP-Only",
      "Docker",
    ],
    linkdVideo:
      "https://www.linkedin.com/posts/giulianomaciel_projeto-campeonato-fut7-full-stack-nextjs-activity-7381136866584137728-Eg01",
    linkdGitHub: "https://github.com/Giuliano-Maciel-Lopes/fut7-web",
    linkSite: undefined,
  },
  {
    nameProject: "E-commerce de Padaria",
    img: "/padaria.png",
    isPrivate: false,
    shortDescription:
      "E-commerce Full Stack para padaria com gestão de estoque, pagamentos via Stripe, rastreamento de entregas e relatórios automatizados.",
    description:
      "Plataforma de vendas online completa para padaria, com produtos, fotos e estoque gerenciáveis. Sistema de entregas com rastreamento e automação de relatórios via Cron Jobs.",
    features: [
      "Catálogo de produtos com fotos e controle de estoque",
      "Pagamentos seguros via Stripe",
      "Sistema de entrega com rastreamento pelo motoboy",
      "Relatórios automatizados: diários, semanais, mensais e anuais",
      "Painel administrativo completo",
      "Gestão de destaque de produtos para aumentar conversão",
      "Histórico completo de pedidos",
    ],
    differential:
      "Experiência de compra completa com automação de relatórios e rastreamento de entregas em tempo real.",
    stack: [
      "Fullstack",
      "React",
      "Node.js + Express",
      "PostgreSQL",
      "TailwindCSS",
      "TypeScript",
      "Zod",
      "Multer",
      "Stripe",
      "Cron Jobs",
      "Docker",
    ],
    linkdVideo:
      "https://www.linkedin.com/posts/giulianomaciel_e-commerce-full-stack-de-padaria-finalizado-activity-7380449976331640832-6nM8",
    linkdGitHub: "https://github.com/Giuliano-Maciel-Lopes/web-padaria",
    linkSite: undefined,
  },
  {
    nameProject: "IA de Atendimento de Equipamentos Fitness",
    img: "/project_ia.png",
    isPrivate: true,
    shortDescription:
      "Assistente de vendas inteligente via WhatsApp com suporte multilíngue, áudio e automação de atendimento para equipamentos fitness.",
    description:
      "Assistente de vendas inteligente integrado ao WhatsApp para equipamentos fitness. Responde automaticamente em múltiplos idiomas utilizando base de dados própria para respostas contextualizadas.",
    features: [
      "Atendimento automático via WhatsApp",
      "Respostas com base em banco de dados",
      "Suporte multilíngue",
      "Envio e recebimento de áudio (speech-to-text e text-to-speech)",
      "Automação de atendimento com fallback para humano",
      "Integração com Chatwoot, WAHA e n8n via webhooks",
    ],
    differential:
      "Sistema substitui grande parte do atendimento humano, mantendo eficiência e escala operacional.",
    stack: [
      "n8n",
      "Chatwoot",
      "WAHA",
      "OpenAI",
      "Webhooks",
      "Banco de dados",
      "Speech-to-Text",
      "Text-to-Speech",
    ],
    linkdVideo: undefined,
    linkdGitHub: undefined,
    linkSite: undefined,
  },
  {
    nameProject: "Disparos de Mensagens e Dashboards de Conversão",
    img: "/project_disparo.png",
    isPrivate: true,
    shortDescription:
      "Automação de campanhas em massa via WhatsApp com segmentação por tags, API da Meta e dashboard de métricas (CAC, ROI, conversão).",
    description:
      "Sistema de automação de campanhas em massa com foco em conversão via WhatsApp. Integração com a API Oficial da Meta e dashboard completo para análise de resultados.",
    features: [
      "Disparo de mensagens em massa via WhatsApp",
      "Segmentação por tags",
      "Automação de campanhas via n8n",
      "Integração com API Oficial da Meta (WhatsApp)",
      "Dashboard com métricas de performance",
      "Análise de Conversão, CAC e ROI por campanha",
      "+20 envios"
    ],
    differential:
      "Permite análise completa do funil de campanhas e tomada de decisão baseada em dados em tempo real.",
    stack: [
      "n8n",
      "Unnichat",
      "API Meta (WhatsApp)",
      "BigQuery",
      "Banco de dados",
    
    ],
    linkdVideo: undefined,
    linkdGitHub: undefined,
    linkSite: undefined,
  },
];
