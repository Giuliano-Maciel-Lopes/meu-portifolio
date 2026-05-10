# CLAUDE.md

Instruções para Claude Code neste repositório. Leia antes de qualquer tarefa.

---

## Visão Geral

Portfólio pessoal de Giuliano Maciel — Desenvolvedor Full Stack. Single-page application com múltiplas seções empilhadas verticalmente. Sem rotas dinâmicas, sem API routes, sem autenticação.

**Stack completa:**
| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (Pages Router) | 15.5.9 |
| UI | React | 19.1.0 |
| Linguagem | TypeScript (strict) | ^5 |
| Estilo | Tailwind CSS | ^3.4.1 |
| Animações | Framer Motion | ^12.23.24 |
| 3D | @react-three/fiber + @react-three/drei | ^9.4.0 / ^10.7.7 |
| Modelo 3D | three + three-stdlib | ^0.181.2 / ^2.36.1 |
| Componentes UI | shadcn/ui (new-york style) + Radix UI | — |
| Variantes CSS | class-variance-authority (CVA) | ^0.7.1 |
| Merge de classes | clsx + tailwind-merge via `cn()` | — |
| Ícones | react-icons + lucide-react | ^5.5.0 / ^0.552.0 |
| Markdown | react-markdown + rehype-raw | ^10.1.0 / ^7.0.0 |
| Formulário | formsubmit.co (HTML nativo, sem JS) | — |
| Deploy | Vercel (https://giulianomaciel.vercel.app) | — |

---

## Estrutura do Projeto

```
meu-portifolio/
├── public/                        # Assets estáticos servidos na raiz
│   ├── Logo Giuliano.png          # Logo (nome com espaço — usar next/image)
│   ├── giulianoo.pdf              # Currículo para download
│   ├── certificado.png            # Imagem de certificado padrão
│   ├── pratique.png / padaria.png # Fotos de projetos
│   └── models/                    # Modelo 3D do planeta Venus
│       ├── jupiter.obj
│       ├── jupiter.mtl
│       └── textures/venmap.jpg
├── src/
│   ├── pages/
│   │   ├── _app.tsx               # Wrap global com <Layout>
│   │   ├── _document.tsx          # HTML shell, lang="pt-BR"
│   │   └── index.tsx              # Única página — renderiza <Sections>
│   ├── templates/
│   │   └── sections/
│   │       ├── index.tsx          # <Sections>: empilha todas as seções
│   │       ├── sectionhero/       # Hero (nome em lowercase)
│   │       │   ├── sectionHero.tsx
│   │       │   ├── components/    # LeftContent, RigthContet, StarField, venus3d
│   │       │   └── utils/networking.ts  # Links de redes sociais
│   │       ├── sectionAbout/
│   │       │   ├── sectionAbout.tsx
│   │       │   └── components/    # TextAbout, MediaContentAbout
│   │       ├── sectionSkills/
│   │       │   ├── SectionSkills.tsx   # (S maiúsculo)
│   │       │   ├── components/boxSkills.tsx
│   │       │   └── utils/skills.ts     # Array de skills e categorias
│   │       ├── sectionExperience/
│   │       │   ├── sectionExprerience.tsx  # (typo: Exprerience)
│   │       │   ├── components/    # boxExp, boxCerificate
│   │       │   └── utils/expert.ts     # Arrays experienci e certificates
│   │       ├── sectionProjects/
│   │       │   ├── sectionProjects.tsx
│   │       │   ├── Components/    # BannerProjects, ProjectModal (C maiúsculo)
│   │       │   └── utils/projects.ts   # Array de projetos
│   │       └── sectionContact/
│   │           └── sectionContact.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.tsx          # export function Layout
│   │   │   └── header/
│   │   │       ├── header.tsx     # export function Header
│   │   │       ├── nav/navheader.tsx
│   │   │       └── menu/menu.tsx  # Mobile menu
│   │   ├── ActiveLink/
│   │   │   ├── activelink.tsx     # ActiveLinkContent
│   │   │   ├── activelink-border.tsx
│   │   │   └── index.ts           # Barrel: Activelink.conatiner / Activelink.content
│   │   ├── arrow/arrow.tsx
│   │   ├── logo/logo.tsx          # Usa next/image
│   │   ├── whatsapp/WhatsAppButton.tsx
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx         # CVA com variantes: default, fancy, icon, outline...
│   │       ├── input.tsx
│   │       └── sheet.tsx
│   ├── hooks/
│   │   ├── useAnimationDesktop.tsx  # useAnimationEnabled() — gating de animações
│   │   └── usettogle.tsx            # useToggle() — open/closed/toggle/isOpen
│   ├── lib/
│   │   └── utils.ts               # cn() = twMerge(clsx(...))
│   ├── styles/
│   │   ├── globals.css            # Tailwind directives + typography base + scrollbar
│   │   └── animaçoes/
│   │       └── animaçoes.ts       # Variants compartilhados do Framer Motion
│   └── .claude/
│       └── settings.local.json
├── tailwind.config.ts
├── tsconfig.json                  # paths: "@/*" → "./src/*"
├── next.config.ts                 # reactStrictMode: true (mínimo)
├── components.json                # shadcn config (style: new-york, rsc: false)
├── eslint.config.mjs
└── postcss.config.mjs
```

---

## Padrões de Código (extraídos do projeto real)

### Componentes

**Named export com `function` keyword** — nunca default export, nunca arrow function para componentes:

```tsx
// CERTO
export function SectionSkills() { ... }
export function BoxSkills({ items, category }: BoxProps) { ... }

// ERRADO
export default function SectionSkills() { ... }
const SectionSkills = () => { ... }
```

**Props tipadas com `type` inline** acima do componente:

```tsx
type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props) { ... }
```

```tsx
type BoxProps = {
  items: SkillItem[];
  category: string | null;
};
```

### Importações

Sempre usar o alias `@/` para imports internos. Nunca caminhos relativos com `../`:

```tsx
// CERTO
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { cn } from "@/lib/utils";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";

// ERRADO
import { useAnimationEnabled } from "../../hooks/useAnimationDesktop";
```

### Estilo (Tailwind)

Toda estilização é inline via classes Tailwind. Nunca CSS Modules, nunca `style.module.css`, nunca Styled Components.

Usar `cn()` sempre que houver classes condicionais:

```tsx
className={cn(
  "base-class",
  isActive && "active-class",
  className
)}
```

Strings de template com ternário são aceitáveis para casos simples (padrão do projeto):

```tsx
className={`px-4 py-1.5 rounded-full ${categorySelected === category ? "bg-amber/90 text-black" : "text-white/40"}`}
```

### Design Tokens (tailwind.config.ts)

Usar sempre os tokens do projeto, nunca cores hardcoded do Tailwind como `yellow-500` ou `orange-400`:

| Token | Valor | Uso |
|---|---|---|
| `background` | `#0B0B0B` | Fundo de seções escuras |
| `card` | `#1F1F1F` | Fundo de cards |
| `gold` | `#D4A373` | Cor de destaque principal |
| `goldDark` | `#A67C52` | Variante escura do gold |
| `amber` | `#FFC857` | Amarelo vibrante, filtros ativos, CTAs |
| `textPrimary` | `#E0E0E0` | Texto padrão |
| `textSecondary` | `#A0A0A0` | Texto secundário / labels |
| `textMuted` | `#666666` | Texto desabilitado |
| `border` | `#333333` | Bordas padrão |

**Fonte de headings:** `font-inter` (Inter)
**Fonte de corpo:** `font-sans` (PT Sans Caption — padrão)

### Tipografia Global (`globals.css`)

h1–h4 e p já têm estilos globais definidos via `@layer base`. Usar as tags semânticas diretamente — elas já vêm estilizadas:

- `h1`: 5xl/6xl, bold, `text-gold`
- `h2`: 4xl/5xl, semibold, `text-goldDark`
- `h3`: 3xl/4xl, semibold, `text-amber`
- `h4`: 2xl/3xl, medium, `text-textPrimary`
- `p`: base/lg, `text-textPrimary`, leading-relaxed

### Animações com Framer Motion

**Regra obrigatória:** toda animação deve ser gateada pelo hook `useAnimationEnabled()`. Isso desativa animações em mobile (<768px) e respeita `prefers-reduced-motion`:

```tsx
const { isAnimationEnabled } = useAnimationEnabled();

<motion.div
  initial={isAnimationEnabled ? "hidden" : undefined}
  whileInView={isAnimationEnabled ? "visible" : undefined}
  viewport={isAnimationEnabled ? { once: false, amount: 0.4 } : undefined}
  variants={isAnimationEnabled ? fadeInFromBottom : undefined}
>
```

**Variants disponíveis em `src/styles/animaçoes/animaçoes.ts`:**
- `containerVariants` — stagger de filhos (delay 0.15s entre cada um)
- `itemVariants` — fade + slide up (opacity 0→1, y 20→0)
- `fadeInFromLeft` / `fadeInFromRight` — slide horizontal ±150px
- `fadeInFromTop` / `fadeInFromBottom` — slide vertical ±50px

### Imagens

`next/image` para imagens em `public/` — sempre com `width`, `height` e `alt`:

```tsx
import Image from "next/image";
<Image src="/Logo Giuliano.png" alt="logo" width={100} height={100} className="object-cover" />
```

Para fotos de projetos e thumbnails, usar `<img>` tag diretamente é aceitável no projeto (padrão já visto nos banners de projetos).

### Dados de Conteúdo

Todo conteúdo do portfólio fica em arquivos `utils/` dentro de cada seção. Nunca editar o componente para mudar dados:

| Dado | Arquivo |
|---|---|
| Skills e categorias | `src/templates/sections/sectionSkills/utils/skills.ts` |
| Experiências e certificados | `src/templates/sections/sectionExperience/utils/expert.ts` |
| Projetos | `src/templates/sections/sectionProjects/utils/projects.ts` |
| Redes sociais | `src/templates/sections/sectionhero/utils/networking.ts` |

### Seções e IDs de Navegação

Cada seção tem `id` para o scroll e `scroll-mt-24` para compensar o header fixo:

```tsx
<section id="home" className="... scroll-mt-24">
<section id="about" className="scroll-mt-24 ...">
<section id="skills" className="... scroll-mt-24">
<section id="experienci" className="... scroll-mt-24">  // typo proposital
<section id="projects" className="scroll-mt-24">
<section id="contact" className="scroll-mt-24 ...">
```

### Cena 3D (Hero)

O Canvas Three.js fica inteiro em `hidden md:block` — nunca renderiza em mobile:

```tsx
<div className="hidden md:block absolute inset-0 z-0 opacity-80 pointer-events-none">
  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
    <Suspense fallback={null}>
      <Venus3d />
    </Suspense>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
  </Canvas>
</div>
```

Qualquer loader de modelo 3D deve ser envolvido em `<Suspense fallback={null}>`.

### Componente Button (shadcn/CVA)

O Button em `src/components/ui/button.tsx` tem variantes configuradas com CVA. Usar sempre `variant` e `size` existentes:

- `variant`: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `icon`, `fancy`
- `size`: `default`, `sm`, `lg`, `icon`
- `asChild`: usa `Slot` do Radix para polimorfismo (ex: `<Button asChild><a href="...">`)

---

## Comandos Essenciais

```bash
npm install       # Instalar dependências
npm run dev       # Servidor de desenvolvimento (porta 3000)
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # ESLint
```

**Sem suite de testes configurada.**

---

## Regras de Ouro — O que NUNCA Fazer

1. **Nunca misturar App Router com Pages Router.** Este projeto usa exclusivamente Pages Router (`src/pages/`). Não criar arquivos em `app/`, não usar `"use client"`, não usar `server actions`, não usar `metadata` export do App Router.

2. **Nunca animar em mobile sem o gate `useAnimationEnabled()`.** Sempre checar `isAnimationEnabled` antes de passar `initial`/`whileInView`/`variants` para qualquer `motion.*`.

3. **Nunca criar componentes com `export default`.** Todos os componentes usam named exports (`export function`). O único `export default` permitido é nas páginas em `src/pages/` (exigência do Next.js).

4. **Nunca renderizar o Canvas Three.js em mobile.** O wrapper `<div className="hidden md:block">` é obrigatório. Three.js em mobile causa crashes e má performance.

5. **Nunca criar API routes** (`src/pages/api/`). O portfólio não tem backend. O formulário de contato usa `formsubmit.co` diretamente via `action` HTML.

6. **Nunca usar `getServerSideProps` ou `getStaticProps`.** Todas as páginas são estáticas e não buscam dados externos em build time. Todo conteúdo vem dos arrays em `utils/`.

7. **Nunca instalar novas bibliotecas de ícones.** O projeto já tem `react-icons` (FaXxx, SiXxx, BsXxx) e `lucide-react`. Verificar se o ícone existe nessas libs antes de instalar qualquer coisa.

8. **Nunca usar cores Tailwind nativas para a paleta principal** (ex: `yellow-500`, `orange-300`). Usar sempre os tokens `gold`, `goldDark`, `amber`, `textPrimary`, `textSecondary`, `background`, `card`.

---

## O que Fazer Antes de Qualquer Tarefa

1. **Ler os arquivos existentes da área afetada** antes de criar qualquer componente ou arquivo novo. O padrão visual e estrutural deve ser copiado de uma seção próxima.

2. **Verificar o `package.json`** antes de sugerir instalar qualquer biblioteca — provavelmente já existe algo equivalente.

3. **Editar dados de conteúdo nos arquivos `utils/`**, nunca diretamente nos componentes.

4. **Testar visualmente em mobile e desktop** — o layout usa `md:` como principal breakpoint. Muitas coisas são `hidden md:block` ou `flex-col md:flex-row`.

5. **Usar TypeScript estrito** — `tsconfig.json` tem `"strict": true`. Nunca usar `any`. Tipar props com `type` explícito.

6. **Checar se a animação será mostrada em mobile** — se sim, ela precisa passar pelo hook `useAnimationEnabled()`.

---

## MODIFICAÇOES 
todo modificaçoes novas add aqui para contexto 

## Contexto de Portfólio

Este é o portfólio profissional de Giuliano Maciel. Cada componente é uma vitrine de qualidade de código. Prioridades:

- **Código limpo e legível acima de tudo** — sem gambiarras, sem TODO inacabado
- **Performance** — imagens otimizadas com `next/image`, animações apenas em desktop, Canvas 3D só em md+
- **Acessibilidade** — respeitar `prefers-reduced-motion`, usar tags semânticas (`<section>`, `<nav>`, `<header>`)
- **SEO** — meta tags completas estão em `src/pages/index.tsx` via `<Head>`, incluindo OG, Twitter Card e JSON-LD Schema.org
- **Responsividade** — breakpoint principal é `md` (768px). Mobile-first nos estilos
