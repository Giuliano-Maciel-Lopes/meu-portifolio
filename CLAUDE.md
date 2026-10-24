# CLAUDE.md

Instruções para Claude Code neste repositório. Leia antes de qualquer tarefa.

> **Trabalho em andamento (redesign "viagem pelo espaço"):** antes de qualquer tarefa, leia `docs/plano-proximas-fases.md`. Ele tem o estado atual, as preferências do Giuliano, as armadilhas técnicas e as próximas fases.

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
| i18n | next-i18next + react-i18next | — |
| Bandeiras | country-flag-icons | — |
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
│   ├── locales/                   # ⚠️ GERADO — nunca editar direto (ver seção i18n abaixo)
│   │   ├── pt-BR/                 # Português Brasil (default)
│   │   │   ├── nav.json
│   │   │   ├── hero.json
│   │   │   ├── about.json
│   │   │   ├── skills.json
│   │   │   ├── experience.json
│   │   │   ├── projects.json
│   │   │   ├── contact.json
│   │   │   └── whatsapp.json
│   │   ├── en/                    # Inglês
│   │   ├── es/                    # Espanhol
│   │   └── pt-PT/                 # Português Portugal
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
│   │       │   ├── utils/expert.ts     # Arrays experienci e certificates
│   │       │   ├── utils/duration.ts   # Calcula tempo de atuação dinamicamente (sem data de fim)
│   │       │   └── i18n/               # ⭐ FONTE real do namespace "experience" (pt-BR/en/es/pt-PT.json)
│   │       ├── sectionProjects/
│   │       │   ├── sectionProjects.tsx
│   │       │   ├── Components/    # BannerProjects, ProjectModal (C maiúsculo)
│   │       │   ├── utils/projects.ts   # Array de projetos
│   │       │   └── i18n/               # ⭐ FONTE real do namespace "projects" (pt-BR/en/es/pt-PT.json)
│   │       └── sectionContact/
│   │           └── sectionContact.tsx
│   ├── i18n/
│   │   └── instance.ts            # Instância singleton do i18next (usada pelo _app.tsx)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.tsx          # export function Layout
│   │   │   └── header/
│   │   │       ├── header.tsx     # export function Header
│   │   │       ├── nav/navheader.tsx
│   │   │       └── menu/menu.tsx  # Mobile menu
│   │   ├── LanguageSwitcher/
│   │   │   └── LanguageSwitcher.tsx  # Dropdown de troca de idioma com bandeiras
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
├── next.config.ts                 # reactStrictMode + i18n routing (locales: pt-BR/en/es/pt-PT)
├── next-i18next.config.js         # Configuração do next-i18next (namespaces, localePath)
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

**Fonte de headings:** `font-display` (Space Grotesk, auto-hospedada via `@fontsource-variable`)
**Fonte de corpo:** `font-sans` / `font-inter` (Inter, auto-hospedada via `@fontsource-variable`)

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
- `warpIn` — card "chegando do espaço" (escala, inclinação e blur → posição final). Usar `custom={index}` para escalonar

**Títulos de seção:** usar `<SectionTitle index="0X" title={t("title")} highlight={t("title_highlight")} />` (`src/components/sectionTitle/SectionTitle.tsx`).

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

O Canvas da Vênus fica em `HeroVenus.tsx`, importado com `next/dynamic` (`ssr: false`) para o three.js não entrar no bundle inicial. Só é **montado** quando `isAnimationEnabled` é verdadeiro (`hidden md:block` sozinho só esconde via CSS, o Canvas continuaria rodando no celular) e pausa (`frameloop="never"`) quando o hero sai da tela:

```tsx
{isAnimationEnabled && (
  <div className="hidden md:block absolute inset-0 z-0 opacity-80 pointer-events-none">
    <HeroVenus active={inView} />
  </div>
)}
```

### Performance (regras)

- three.js / R3F sempre via `next/dynamic` com `ssr: false`, montado só quando `isAnimationEnabled`
- Animações **infinitas** decorativas em CSS (keyframes no `tailwind.config.ts`: `nebula`, `wa-pulse`, `nudge-down`) com `motion-safe:`, nunca `repeat: Infinity` do Framer Motion (roda JS a cada frame)
- Evitar `backdrop-blur` em cards por cima da cena 3D (o blur é recalculado a cada frame); usar fundo mais opaco
- Componentes que só aparecem após interação (ex.: `ProjectModal`) via `next/dynamic`
- Imagens sempre com `next/image`; texturas 3D comprimidas (JPEG progressivo, ~200 KB)

Qualquer loader de modelo 3D deve ser envolvido em `<Suspense fallback={null}>`.

### Fundo 3D global (viagem pelo espaço)

- `src/components/space/SpaceBackground.tsx` — fundo fixo renderizado no `Layout`. Desktop com animação liberada: `SpaceScene`; mobile / reduced-motion: `StarField` em CSS
- `src/components/space/SpaceScene.tsx` — estrelas guiadas pelo scroll, riscos de velocidade, nebulosas, objetos dourados e planetas da NASA (`PLANETS`, ancorados por id de seção — nunca na home)
- Texturas dos planetas em `public/models/planets/` (domínio público, NASA). Para adicionar outro planeta: colocar o `.jpg` ali e uma entrada em `PLANETS`
- `sectionAbout/components/HelmetReveal.tsx` — duas fotos sobrepostas (capacete e rosto, em `public/about/`): uma lente segue o mouse e revela o rosto; no celular só a foto do rosto, estática

### Componente Button (shadcn/CVA)

O Button em `src/components/ui/button.tsx` tem variantes configuradas com CVA. Usar sempre `variant` e `size` existentes:

- `variant`: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `icon`, `fancy`, `gold` (CTA principal), `goldOutline` (CTA secundário)
- `size`: `default`, `sm`, `lg`, `icon`
- `asChild`: usa `Slot` do Radix para polimorfismo (ex: `<Button asChild><a href="...">`)

### Internacionalização (i18n)

O projeto usa **`next-i18next`** + **`react-i18next`** com o sistema de i18n nativo do Next.js.

**4 locales:** `pt-BR` (default), `en`, `es`, `pt-PT`

**9 namespaces** (um arquivo por seção): `nav`, `hero`, `about`, `skills`, `experience`, `projects`, `contact`, `whatsapp`

**⚠️ CRÍTICO — `public/locales/{locale}/{namespace}.json` é ARQUIVO GERADO. Nunca editar direto ali.**

A fonte real das traduções fica dentro de cada seção, em `src/templates/sections/{secao}/i18n/{locale}.json` (ex: `sectionExperience/i18n/pt-BR.json`, `sectionProjects/i18n/en.json`). O script `scripts/aggregate-i18n.ts` varre `src/templates/sections/**/i18n/` e `src/components/**/i18n/`, copiando cada arquivo para `public/locales/{locale}/{namespace}.json` — o namespace é derivado do nome da pasta da seção sem o prefixo `section` (ex: `sectionProjects` → `projects`).

Esse script (`npm run i18n:build`) roda **automaticamente antes de `npm run dev` e `npm run build`** (ver `package.json`). Ou seja: qualquer edição feita direto em `public/locales/` é **silenciosamente sobrescrita** na próxima vez que o dev server for reiniciado ou o projeto for buildado. `public/locales` está inclusive no `.gitignore` (`/public/locales`) exatamente por ser artefato gerado — não é rastreado pelo git.

**Regra prática:** para mudar qualquer texto traduzido, edite sempre `src/templates/sections/{secao}/i18n/{locale}.json`. Se quiser ver o resultado refletido em `public/locales` sem subir o dev server, rode `npm run i18n:build` manualmente.

**Como usar traduções em componentes:**

```tsx
import { useTranslation } from "react-i18next";

export function LeftContent() {
  const { t } = useTranslation("hero");  // namespace = nome do arquivo JSON

  return <span>{t("developer_label")}</span>;
}
```

Para arrays de strings, usar `t("key", { returnObjects: true }) as string[]`.

**Como adicionar texto novo:**

1. Adicionar a chave em todos os 4 arquivos-fonte do namespace, em `src/templates/sections/{secao}/i18n/{pt-BR,en,es,pt-PT}.json` — **nunca em `public/locales/`**
2. Usar `t("chave")` no componente — nunca string hardcoded em português

**`getStaticProps` é obrigatório** em toda página que usa tradução — já configurado em `src/pages/index.tsx`:

```ts
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt-BR", [
      "hero", "about", "skills", "experience", "projects", "contact", "whatsapp", "nav",
    ])),
  },
});
```

**Troca de idioma:** `LanguageSwitcher` em `src/components/LanguageSwitcher/LanguageSwitcher.tsx` — usa `router.push` com `{ locale }` para navegar e `country-flag-icons` para as bandeiras. Já integrado no header.

---

## Comandos Essenciais

```bash
npm install       # Instalar dependências
npm run dev       # roda i18n:build e sobe o servidor de desenvolvimento (porta 3000)
npm run build     # roda i18n:build e gera o build de produção
npm run start     # Servidor de produção
npm run lint      # ESLint
npm run i18n:build # Regenera public/locales a partir de src/templates/sections/*/i18n/ (roda sozinho antes de dev/build)
```

**Sem suite de testes configurada.**

---

## Regras de Ouro — O que NUNCA Fazer

1. **Nunca misturar App Router com Pages Router.** Este projeto usa exclusivamente Pages Router (`src/pages/`). Não criar arquivos em `app/`, não usar `"use client"`, não usar `server actions`, não usar `metadata` export do App Router.

2. **Nunca animar em mobile sem o gate `useAnimationEnabled()`.** Sempre checar `isAnimationEnabled` antes de passar `initial`/`whileInView`/`variants` para qualquer `motion.*`.

3. **Nunca criar componentes com `export default`.** Todos os componentes usam named exports (`export function`). O único `export default` permitido é nas páginas em `src/pages/` (exigência do Next.js).

4. **Nunca renderizar o Canvas Three.js em mobile.** O wrapper `<div className="hidden md:block">` é obrigatório. Three.js em mobile causa crashes e má performance.

5. **Nunca criar API routes** (`src/pages/api/`). O portfólio não tem backend. O formulário de contato usa `formsubmit.co` diretamente via `action` HTML.

6. **Nunca usar `getServerSideProps`.** O portfólio é estático. `getStaticProps` é permitido e **obrigatório** na `index.tsx` para carregar as traduções via `serverSideTranslations`. Não adicionar `getStaticProps` em outras páginas sem necessidade real.

7. **Nunca instalar novas bibliotecas de ícones.** O projeto já tem `react-icons` (FaXxx, SiXxx, BsXxx) e `lucide-react`. Verificar se o ícone existe nessas libs antes de instalar qualquer coisa.

8. **Nunca usar cores Tailwind nativas para a paleta principal** (ex: `yellow-500`, `orange-300`). Usar sempre os tokens `gold`, `goldDark`, `amber`, `textPrimary`, `textSecondary`, `background`, `card`.

9. **Nunca editar arquivos dentro de `public/locales/` diretamente.** Esse diretório é gerado pelo script `scripts/aggregate-i18n.ts` (`npm run i18n:build`), que roda automaticamente antes de `npm run dev` e `npm run build` — qualquer edição direta ali é sobrescrita no próximo restart do servidor e nem é rastreada pelo git (está no `.gitignore`). A fonte real de cada namespace de tradução é `src/templates/sections/{secao}/i18n/{locale}.json`. Editar sempre lá.

---

## O que Fazer Antes de Qualquer Tarefa

1. **Ler os arquivos existentes da área afetada** antes de criar qualquer componente ou arquivo novo. O padrão visual e estrutural deve ser copiado de uma seção próxima.

2. **Verificar o `package.json`** antes de sugerir instalar qualquer biblioteca — provavelmente já existe algo equivalente.

3. **Editar dados de conteúdo nos arquivos `utils/`**, nunca diretamente nos componentes.

4. **Usar TypeScript estrito** — `tsconfig.json` tem `"strict": true`. Nunca usar `any`. Tipar props com `type` explícito.

5. **Checar se a animação será mostrada em mobile** — se sim, ela precisa passar pelo hook `useAnimationEnabled()`.

6. **Qualquer novo texto visível ao usuário deve ser traduzido.** Adicionar a chave nos 4 arquivos de locale (`pt-BR`, `en`, `es`, `pt-PT`) no namespace correspondente à seção, e usar `t("chave")` no componente.

---

## MODIFICAÇOES 

- **Multilanguagem (i18n):** sistema `next-i18next` + `react-i18next` com 4 locales (`pt-BR`, `en`, `es`, `pt-PT`) e 9 namespaces. Fonte real das traduções em `src/templates/sections/{secao}/i18n/{locale}.json`; `public/locales/` é apenas o resultado gerado por `npm run i18n:build` (nunca editar direto lá — ver Regra de Ouro #9). `LanguageSwitcher` com bandeiras no header. `getStaticProps` na `index.tsx` carrega todas as traduções via `serverSideTranslations`.

## Contexto de Portfólio

Este é o portfólio profissional de Giuliano Maciel. Cada componente é uma vitrine de qualidade de código. Prioridades:

- **Código limpo e legível acima de tudo** — sem gambiarras, sem TODO inacabado
- **Performance** — imagens otimizadas com `next/image`, animações apenas em desktop, Canvas 3D só em md+
- **Acessibilidade** — respeitar `prefers-reduced-motion`, usar tags semânticas (`<section>`, `<nav>`, `<header>`)
- **SEO** — meta tags completas estão em `src/pages/index.tsx` via `<Head>`, incluindo OG, Twitter Card e JSON-LD Schema.org
- **Responsividade** — breakpoint principal é `md` (768px). Mobile-first nos estilos
