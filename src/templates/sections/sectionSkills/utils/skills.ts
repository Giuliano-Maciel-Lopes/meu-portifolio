import { BsHeart, BsRobot, BsChatDots } from "react-icons/bs";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiEslint,
  SiPrettier,
  SiTestinglibrary,
  SiVitest,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPrisma,
  SiInsomnia,
  SiPhp,
  SiMongodb,
  SiSupabase,
  SiN8N,
  SiWhatsapp,
  SiOpenai,
  SiHearth
} from "react-icons/si";



export const categorys = [
  "Back-end",
  "Front-end",
  "DevOps",
  "Bancos de Dados",
  "Princípios e Linguagens",
  "Automações e IA"
];

export const skills = [
  //  BACK-END
  { category: "Back-end", name: "NestJS", img: SiNestjs, color: "#E0234E", description: "Framework Node.js para aplicações escaláveis e modulares." },
  { category: "Back-end", name: "DDD", img: SiNodedotjs, color: "#3C873A", description: "Arquitetura orientada a domínios." },
  { category: "Back-end", name: "Docker", img: SiDocker, color: "#2496ED", description: "Containerização de aplicações." },
  { category: "Back-end", name: "Clean Architecture", img: SiNodedotjs, color: "#3C873A", description: "Separação de responsabilidades e independência de frameworks." },
  { category: "Back-end", name: "Testes", img: SiTestinglibrary, color: "#E34C26", description: "Testes unitários e E2E." },
  { category: "Back-end", name: "SOLID", img: SiJavascript, color: "#F7DF1E", description: "Princípios de código limpo e modular." },
  { category: "Back-end", name: "Node.js", img: SiNodedotjs, color: "#3C873A", description: "Ambiente backend JavaScript." },
  { category: "Back-end", name: "Express", img: SiExpress, color: "#000000", description: "Framework rápido para APIs REST." },
  { category: "Back-end", name: "Fastify", img: SiFastify, color: "#20232A", description: "APIs de alta performance." },
  { category: "Back-end", name: "JWT Auth", img: SiNodedotjs, color: "#3C873A", description: "Autenticação segura com tokens HTTP-only." },
  { category: "Back-end", name: "TDD", img: SiVitest, color: "#3B82F6", description: "Desenvolvimento guiado por testes." },

  //  FRONT-END
  { category: "Front-end", name: "React", img: SiReact, color: "#61DAFB", description: "Componentização, hooks e SPA." },
  { category: "Front-end", name: "Next.js", img: SiNextdotjs, color: "#000000", description: "SSR, SSG, ISR e otimizações automáticas." },
  { category: "Front-end", name: "Redux", img: SiRedux, color: "#764ABC", description: "Gerenciamento de estado global." },
  { category: "Front-end", name: "TailwindCSS", img: SiTailwindcss, color: "#38B2AC", description: "Estilização produtiva com utility-first." },
  { category: "Front-end", name: "HTML5", img: SiHtml5, color: "#E34F26", description: "Estrutura semântica para web." },
  { category: "Front-end", name: "CSS3", img: SiCss3, color: "#1572B6", description: "Layouts responsivos e animações." },
  { category: "Front-end", name: "Framer Motion", img: SiReact, color: "#FF2C55", description: "Animações declarativas em React." },
  { category: "Front-end", name: "React Query", img: SiReact, color: "#FF4154", description: "Gerenciamento de dados assíncronos." },
  { category: "Front-end", name: "React Hook Form", img: SiReact, color: "#FF8C00", description: "Formulários com validação simplificada." },

  //  PRINCÍPIOS E LINGUAGENS
  { category: "Princípios e Linguagens", name: "JavaScript", img: SiJavascript, color: "#F7DF1E", description: "Linguagem base moderna." },
  { category: "Princípios e Linguagens", name: "TypeScript", img: SiTypescript, color: "#3178C6", description: "Tipagem estática e segurança." },
  { category: "Princípios e Linguagens", name: "SOLID", img: SiJavascript, color: "#F7DF1E", description: "Código modular e sustentável." },
  { category: "Princípios e Linguagens", name: "TDD e DDD", img: SiVitest, color: "#3B82F6", description: "Desenvolvimento guiado por testes." },
  { category: "Princípios e Linguagens", name: "Testes", img: SiTestinglibrary, color: "#E34C26", description: "Testes unitários e E2E." },
  { category: "Princípios e Linguagens", name: "Clean Code", img: SiJavascript, color: "#F7DF1E", description: "Legibilidade, simplicidade e boas práticas." },
  { category: "Princípios e Linguagens", name: "Clean Architecture", img: SiJavascript, color: "#F7DF1E", description: "Separação de responsabilidades e independência de frameworks." },
  { category: "Princípios e Linguagens", name: "PHP Básico", img: SiPhp, color: "#8892BE", description: "Introdução a PHP." },

  //  BANCO DE DADOS
  { category: "Bancos de Dados", name: "PostgreSQL", img: SiPostgresql, color: "#336791", description: "Banco relacional poderoso e performático." },
  { category: "Bancos de Dados", name: "MySQL", img: SiMysql, color: "#4479A1", description: "Banco relacional amplamente utilizado." },
  { category: "Bancos de Dados", name: "SQLite", img: SiSqlite, color: "#003B57", description: "Banco leve para pequenos projetos." },
  { category: "Bancos de Dados", name: "Prisma", img: SiPrisma, color: "#0C344B", description: "ORM moderno com migrações e tipagem forte." },
  { category: "Bancos de Dados", name: "BigQuery", img: SiPostgresql, color: "#4285F4", description: "Banco de dados analítico cloud." }, // ADICIONADO
 { category: "Bancos de Dados", name: "NoSQL", img:SiMongodb, color: "#47A248", description: "Banco não-relacional para dados semiestruturados." }, // ADICIONADO
  { category: "Bancos de Dados", name: "Supabase", img: SiSupabase, color: "#3ECF8E", description: "Backend-as-a-Service com PostgreSQL, autenticação e storage." },
  //  DEVOPS
  { category: "DevOps", name: "Git", img: SiGit, color: "#F05032", description: "Controle de versão." },
  { category: "DevOps", name: "GitHub", img: SiGithub, color: "#181717", description: "Hospedagem e colaboração de código." },
  { category: "DevOps", name: "Figma", img: SiFigma, color: "#F24E1E", description: "Design e prototipação." },
  { category: "DevOps", name: "ESLint", img: SiEslint, color: "#4B32C3", description: "Padronização e análise de código." },
  { category: "DevOps", name: "Prettier", img: SiPrettier, color: "#F7B93E", description: "Formatação consistente de código." },
  { category: "DevOps", name: "Vitest", img: SiVitest, color: "#3B82F6", description: "Testes unitários e E2E." },
  { category: "DevOps", name: "Docker", img: SiDocker, color: "#2496ED", description: "Containerização de aplicações." },
  { category: "DevOps", name: "Insomnia", img: SiInsomnia, color: "#4000BF", description: "Testes de API com eficiência." },

 
   // 🤖 AUTOMAÇÕES E IA
  { category: "Automações e IA", name: "n8n", img: SiN8N, color: "#EA4B71", description: "Automação de workflows low-code... + Criação de Ia de atendimento" },
  { category: "Automações e IA", name: "OpenAI API", img: SiOpenai, color: "#10A37F", description: "Integração com IA generativa." },
  { category: "Automações e IA", name: "Prompts Engineering", img: SiOpenai, color: "#0EA5E9", description: "Criação de prompts estratégicos para IA." },
  { category: "Automações e IA", name: "WhatsApp API", img: SiWhatsapp, color: "#25D366", description: "Integração com automações via WhatsApp. Waha , Unichat..." },
  { category: "Automações e IA", name: "Lovable", img: BsHeart, color: "#EA4B71", description: "Desenvolvimento acelerado com IA para produtos digitais." },
  { category: "Automações e IA", name: "Claude Code", img: BsRobot, color: "#D97757", description: "Assistente de IA da Anthropic para desenvolvimento de software." },
  { category: "Automações e IA", name: "Chatwoot", img: BsChatDots, color: "#1F93FF", description: "Plataforma open-source de suporte ao cliente via múltiplos canais." },
  { category: "Automações e IA", name: "IA Atendente", img: BsRobot, color: "#10A37F", description: "Criação de assistentes de IA para atendimento automático via WhatsApp." },

];
