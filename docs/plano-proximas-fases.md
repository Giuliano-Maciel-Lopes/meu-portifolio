# Portfólio Giuliano — Handoff completo e plano das próximas fases

> **Para quem vai continuar (outro chat ou agente):** leia este arquivo INTEIRO antes de qualquer tarefa, depois o `CLAUDE.md` da raiz. Ele resume tudo o que foi decidido com o Giuliano: o que já está pronto, as preferências dele, as armadilhas técnicas e o que falta fazer, com especificação.
>
> Última atualização: 20/10/2026.

---

## 0. Prompt sugerido para abrir o próximo chat

```
Estou continuando o redesign do meu portfólio (repo Giuliano-Maciel-Lopes/meu-portifolio,
branch feat/space-journey, PR #2). Leia docs/plano-proximas-fases.md inteiro e o CLAUDE.md.
Quero começar pela Fase A2 (visor que sobe e mostra o rosto). Trabalhe na mesma branch,
rode build/tsc antes de commitar e me mande o link da prévia da Vercel no final.
```

---

## 1. Situação atual (onde as coisas estão)

| Item | Valor |
|---|---|
| Repositório | `Giuliano-Maciel-Lopes/meu-portifolio` |
| Branch de trabalho | `feat/space-journey` (todas as mudanças estão aqui) |
| Branch padrão / produção | `master` (**ainda NÃO recebeu nada**; o site no ar está igual a antes) |
| Pull request | #2: https://github.com/Giuliano-Maciel-Lopes/meu-portifolio/pull/2 (aberto, **não mergeado**) |
| Prévia da branch (Vercel) | https://giulianomaciel-git-feat-spac-1644fe-giulianos-projects-97053e43.vercel.app |
| Site em produção | https://giulianomaciel.vercel.app |
| Vercel | 4 projetos ligados ao mesmo repo (`giuliano.maciel`, `giuliano`, `meu-portifolio`, `meu-portifolio-db1v`). Todo push gera 4 prévias; a principal é a de cima |
| Acesso do Claude ao GitHub | App do Claude instalado; push e PR funcionam |
| Visibilidade do repo | O Giuliano deixou **público** para o primeiro clone. Agora que o app tem acesso, ele pode voltar para privado se quiser |

### Commits já feitos na branch (do mais antigo ao mais novo)

1. `feat: viagem 3D pelo espaço, tipografia nova e títulos animados`
2. `feat: capacete de astronauta 3D, planetas da NASA e cards chegando do espaço`
3. `docs: plano das próximas fases`
4. `feat: nova ordem das seções (skills antes dos projetos, sobre perto do contato)`
5. (este commit) `docs: handoff completo` + correção do e-mail do hero

---

## 2. O que já está pronto (e onde mexer)

### 2.1 Fundo 3D global — "viagem pelo espaço"
- **Arquivo principal:** `src/components/space/SpaceScene.tsx` (R3F, um único `<Canvas>` fixo atrás do site)
- **Wrapper:** `src/components/space/SpaceBackground.tsx`
  - Renderizado no `Layout` (`src/components/layout/index.tsx`), em `fixed inset-0 z-0`
  - Desktop com `isAnimationEnabled` → `SpaceScene` (dentro de `hidden md:block`)
  - Mobile ou reduced motion → `StarField` em CSS, **só depois do mount** (evita erro de hidratação, porque as estrelas são aleatórias)
  - Carrega via `next/dynamic` com `ssr: false`
  - Máquinas com ≤ 4 núcleos → `lite` (menos partículas, sem riscos de velocidade)
- **O que tem na cena:**

| Elemento | Componente | Ajustes principais |
|---|---|---|
| Estrelas em túnel que vêm na direção da câmera | `Stars` (shader próprio) | `count={lite ? 1400 : 4200}`, `DEPTH = 220`, cores em `GOLD` |
| Estrelas mais fracas atrás do conteúdo | no shader (`side = mix(0.45, 1.0, …)`) | aumentar 0.45 = mais estrelas no centro |
| Riscos de velocidade quando rola rápido | `WarpLines` | `uStretch`, `uOpacity` no `useFrame` |
| Entrada em "hiperespaço" ao abrir o site | `useTravel` (`intro`) | `t / 2.6` = duração; `* 70` = força |
| Scroll → viagem | `useTravel` | `SCROLL_TO_TRAVEL = 0.045` |
| Nebulosas douradas | `Nebulas` + `NEBULAS` | posições, cor e opacidade |
| Objetos dourados nas laterais (cristais, anéis, nó) | `GoldObject` + `OBJECTS` | `x` alto = lateral; `appear = smoothstep(z, -55, -28)` faz eles se "materializarem" perto da câmera |
| Planetas da NASA ancorados nas seções | `NasaPlanet` + `PLANETS` | `anchor` = id da seção; `PLANET_FAR = -60`, `PLANET_NEAR = 6`; `scale` cresce com `smoothstep(p, 0.05, 0.3)` |
| Paralaxe da câmera com o mouse | `CameraRig` | `* 1.6` e `* 1.0` |

- **Planetas hoje:** Lua em `skills` (x −22) e Terra em `projects` (x +24). Texturas em `public/models/planets/` (`moon.jpg`, `earth.jpg`), ambas da NASA e de domínio público.
- **Barra de progresso dourada:** `src/components/space/ScrollProgress.tsx`

### 2.2 Vênus no topo (o planeta da NASA que o Giuliano escolheu)
- `src/templates/sections/sectionhero/sectionHero.tsx` (tem um `<Canvas>` **próprio**) + `components/venus3d.tsx`
- Textura: `public/models/Venusnasa.jpg`
- **É o ÚNICO planeta da home. Não adicionar outro planeta no topo.**

### 2.3 Capacete de astronauta 3D com a foto (seção "Sobre mim")
- `src/templates/sections/sectionAbout/components/AstronautHelmet.tsx`: capacete procedural (casco, visor de vidro levemente dourado, aro dourado, anel do pescoço, módulos com luz e antena). Flutua com `Float` do drei e inclina na direção do mouse.
- Foto: `/linkdingiu.png`, aplicada num `circleGeometry` dentro do visor
- Usado em `MediaContentAbout.tsx` (carregado via `next/dynamic`, `ssr: false`) dentro de `hidden md:block`. Sem animação, aparece a foto estática com aro dourado.
- Constantes: `R = 1.25` (raio), `OPENING = 0.78` (abertura do visor), `RIM_Z` e `RIM_R` derivados
- Os ícones de tecnologia continuam orbitando em volta (`ORBIT_RADIUS = 200`)

### 2.4 Tipografia
- Fontes auto-hospedadas via `@fontsource-variable/space-grotesk` e `@fontsource-variable/inter`, importadas em `src/pages/_app.tsx`. **Google Fonts não carrega no sandbox, por isso não usar `<link>`.**
- Tailwind: `font-display` (Space Grotesk, títulos) e `font-sans` / `font-inter` (Inter, texto)
- `globals.css`: h1–h4 com `font-display`; o `text-shadow` dos h3 foi removido para melhorar a leitura
- `::selection` em âmbar

### 2.5 Títulos de seção animados
- `src/components/sectionTitle/SectionTitle.tsx`: número da seção, linha dourada que cresce e palavras que sobem de dentro de uma máscara (gated por `useAnimationEnabled`)
- Numeração atual: Skills `01`, Projetos `02`, Experiência `03`, Sobre `04`, Contato `05`

### 2.6 Cards "chegando do espaço"
- Variant `warpIn` em `src/styles/animaçoes/animaçoes.ts`: scale 0.4, `rotateX` 28°, blur 14px → mola até a posição final; `custom={index}` escalona a entrada
- Aplicado em: skills (`boxSkills.tsx`), projetos (destaque + grid em `sectionProjects.tsx`), experiências e certificados (`sectionExprerience.tsx`). Tudo gated.

### 2.7 Botões
- Novas variantes em `src/components/ui/button.tsx`: `gold` (CTA principal, gradiente + brilho passando, keyframe `shine` no `tailwind.config.ts`) e `goldOutline` (CTA secundário)
- Hero: "Entre em Contato" = `gold`, "Baixar CV" = `goldOutline`. No mobile o "Baixar CV" agora baixa de verdade (`asChild` + `<a download>`)

### 2.8 Ordem das seções e navegação
- `src/templates/sections/index.tsx`: **Hero → Skills → Projetos → Experiência → Sobre mim → Contato**
- Menu (`navheader.tsx`) na mesma ordem
- Seta do hero: "Iniciar a viagem" → `#skills` (chave `journey_link` nos 4 idiomas; a chave `about_link` foi removida)
- Menu PT-BR: "Início" e "Sobre", sem palavras em inglês

### 2.9 Correções de conteúdo
- Título "Sobre mim" traduzido (chave `title` no namespace `about`, 4 idiomas)
- **E-mail do hero corrigido:** o link era `giulianomaciellopes@` (um "s"); agora é `giulianomaciellopess@gmail.com`, igual ao da seção de contato e ao formsubmit

---

## 3. Preferências e decisões do Giuliano (RESPEITAR)

- **Identidade:** preto + dourado (`gold`, `amber`, `goldDark`). Manter tudo no dourado.
- **Home limpa:** só o Vênus como planeta. Ele **não gostou** do planeta dourado com anel que existia (foi removido). Muita informação no topo incomoda.
- **Gostou de:** fundo 3D, riscos de velocidade, objetos dourados ("os itens"), títulos animados, botões, cards chegando do espaço, capacete com a foto.
- **Planetas:** só imagens da NASA de domínio público, sem crédito obrigatório. Os planetas ficam nas outras seções, não no topo.
- **Leitura:** ele se preocupa com as cores das letras e com a legibilidade. Manter a fonte nova, mas nunca poluir atrás do texto. Na dúvida, menos brilho e mais contraste.
- **Menos estrelas:** quer que o foco passe a ser os planetas (Fase B).
- **Ordem das seções:** Skills antes de Projetos de propósito ("sou júnior, sei muita coisa; as skills criam expectativa antes dos projetos"). O Sobre fica perto do Contato.
- **Fluxo de trabalho:**
  - Tudo na branch `feat/space-journey`. **Nunca** commitar ou mergear em `master` sem ele pedir.
  - Ele revisa pela prévia da Vercel. Mandar o link no fim de cada entrega.
  - Português informal, respostas diretas e curtas, com prints quando der.
- **Sugestão feita e ainda não aceita:** enxugar o texto do "Sobre mim" (2 linhas + os 3 números, sem a lista de 4 itens). Perguntar antes de fazer.

---

## 4. Regras técnicas e armadilhas (leia antes de codar)

### Regras do projeto (resumo do `CLAUDE.md`)
- Pages Router; **sem** `"use client"`, sem App Router
- Componentes com `export function` (nunca `export default`, exceto em `pages/`)
- Imports sempre com `@/`
- Toda animação passa por `useAnimationEnabled()`
- Canvas Three.js só dentro de `hidden md:block`
- Texto novo: chave nos 4 arquivos de `src/templates/sections/{secao}/i18n/` (ou `src/components/**/i18n/`), **nunca** em `public/locales/`
- Cores: só os tokens do Tailwind

### Armadilhas já encontradas
- **Hidratação:** nada aleatório (`Math.random`) no primeiro render SSR. Renderizar só depois do mount.
- **three.js:** sempre via `next/dynamic(..., { ssr: false })`
- **3 contextos WebGL no desktop:** `SpaceScene` + o Canvas do Vênus no hero + o capacete. Funciona, mas na Fase B vale mover o Vênus para dentro do `SpaceScene` (um Canvas a menos).
- **GitHub:** o GraphQL é bloqueado nas sessões do Claude. Usar a REST (`gh api repos/.../pulls`), não `gh pr create`.
- **Rede do sandbox:** `raw.githubusercontent.com` funciona para baixar assets; sites da NASA, Google Fonts, unpkg e jsdelivr **não**
- **Prints no sandbox:** Playwright com `--use-angle=swiftshader`. O 3D aparece mais apagado e travado do que no navegador real.
- **Branch padrão é `master`** (não `main`)
- **Lint:** 3 warnings antigos (`<img>` em `boxCerificate`, `SiHearth` sem uso, `motion` sem uso em `sectionHero`). Não são deste trabalho.

### Como validar antes de cada commit
```bash
npx tsc --noEmit -p .
npm run build            # tem que passar
npx eslint src           # só os 3 warnings antigos
```
Depois do push, conferir o status da Vercel:
```bash
gh api repos/Giuliano-Maciel-Lopes/meu-portifolio/commits/$(git rev-parse HEAD)/status -q .state
```

---

## 5. Pendências conhecidas (fora das fases)

- [ ] "+20 projetos" no Sobre e nos Projetos, mas só 9 aparecem. Decidir com ele: mostrar o número real ou explicar que o resto é privado.
- [ ] Aba "Certificados": conferir se tem conteúdo de verdade
- [ ] Repo público: lembrar que ele pode voltar para privado
- [ ] Mergear o PR #2 quando ele aprovar (ele mesmo clica em Merge)

---

## 6. Fase A — Capacete que revela o rosto (efeito "site de piloto de F1")

**Ideia (palavras dele):** "vai com capacete, passa o mouse, mostra meu rosto", igual aos sites de pilotos de F1 em que o capacete some e aparece o piloto.

### Opção A2 — com o capacete 3D que já existe (FAZER PRIMEIRO, não precisa de foto)

**Comportamento:**
1. Estado normal: o visor fica **dourado espelhado e opaco** (como o de um astronauta de verdade) e a foto não aparece
2. Mouse em cima do capacete: o **visor sobe** (gira para cima em volta do eixo X, como uma viseira) com mola, e o rosto aparece
3. Mouse sai: o visor desce de novo
4. Sem animação ou no mobile: foto estática (como hoje)

**Implementação sugerida em `AstronautHelmet.tsx`:**
- Separar o visor num `<group>` com o pivô na borda de cima da abertura (posição ≈ `[0, RIM_R, RIM_Z]`) para girar como uma dobradiça
- Material do visor fechado: `meshPhysicalMaterial` com `color="#D4A373"`, `metalness={1}`, `roughness={0.08}`, `envMapIntensity={2.5}`, opaco
- Estado `open` (0 a 1) num `useRef`, interpolado no `useFrame` (nunca `setState` no `useFrame`): `rotation.x = -open * 1.6`
- Hover: o Canvas está com `pointerEvents: none`. Ou liga `pointerEvents: auto` só nesse Canvas e usa `onPointerOver`/`onPointerOut` no grupo do capacete, ou detecta o hover pelo `div` em volta (`onMouseEnter`/`onMouseLeave`) e passa por ref
- Detalhe extra: um brilho dourado passando no visor (Lightformer já reflete) e um som? **Não**: sem som.
- Variação opcional: em vez de subir, uma "lente" circular no visor segue o mouse (shader com `uMouse` e `discard` dentro do raio)

**Checklist A2:**
- [ ] Pivô do visor + material espelhado
- [ ] Animação abrir/fechar com mola (lerp por `delta`)
- [ ] Hover funcionando sem bloquear a rolagem da página
- [ ] Fallback estático (mobile / reduced motion)
- [ ] Build, prints e link da prévia

### Opção A1 — Foto 2D com máscara (mais fiel à F1, depende de foto nova)

Duas fotos **com o mesmo enquadramento**, alinhadas pixel a pixel:
1. Ele **com** capacete de astronauta
2. Ele **sem** capacete (o rosto)

O cursor vira um círculo que "abre um buraco" na foto 1 e mostra a foto 2 por baixo, com borda suave e mola.

**Como conseguir a foto de capacete:** foto real com capacete cenográfico (tripé, mesmo enquadramento) ou versão gerada por IA a partir da foto dele, com o mesmo enquadramento, alinhada depois. **O Claude não gera imagem**: o Giuliano precisa trazer o arquivo.

**Implementação:**
- Componente `HelmetReveal` em `sectionAbout/components/`
- Duas `<Image>` sobrepostas; a de cima com `mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), transparent 98%, #000 100%)`
- `--x`/`--y` vindos de `useMotionValue` + `useSpring`; `--r` de 0 → ~120px no hover
- Mobile: tocar alterna capacete ↔ rosto
- Imagens em WebP, ~800px

---

## 7. Fase B — Viagem de mundo em mundo

**Ideia (palavras dele):** "viajou, caiu na Terra e vai passando de mundo em mundo". Cada seção é um destino. O foco passa a ser os planetas, com menos estrelas.

### Roteiro (alinhado com a ordem atual das seções)

| Seção (id) | Mundo | Sensação | Textura |
|---|---|---|---|
| Home (`home`) | Espaço + Vênus | Partida | ✅ `Venusnasa.jpg` |
| Skills (`skills`) | **Lua** | Base de lançamento: o que eu domino | ✅ `planets/moon.jpg` |
| Projetos (`projects`) | **Marte** | Exploração: o que construí | ❌ falta |
| Experiência (`experienci`) | **Júpiter** | A jornada maior | ❌ falta |
| Sobre mim (`about`) | **Terra** | "Pousei": quem está por trás | ✅ `planets/earth.jpg` |
| Contato (`contact`) | Estação / sinal de rádio | "Chama no rádio" | (sem planeta, ou a Terra bem perto) |

> ⚠️ Hoje o `PLANETS` está com a **Terra em `projects`**. Na Fase B a Terra vai para `about` e Marte entra em `projects`.

### Como deve ficar na tela
- O planeta da seção aparece **grande, na lateral ou no horizonte (metade para fora da tela)**, sem nunca ficar atrás do texto
- Ao cruzar de uma seção para outra: **salto curto de velocidade** (pico nos `WarpLines` + `intro` curto) e o planeta seguinte cresce
- **HUD discreto** fixo num canto: "Destino: Marte · 225 mi km". Chaves novas num namespace (ex.: `components/space/i18n/{4 locales}.json` → namespace `space`). **Lembrar de adicionar o namespace no `serverSideTranslations` do `index.tsx`.** Distâncias da Terra aproximadas: Lua 384 mil km, Marte ~225 mi km, Júpiter ~778 mi km (do Sol), Vênus ~41 mi km. Conferir antes de publicar.
- **Menos estrelas:** `4200 → ~1500` (lite `1400 → ~700`), e os objetos dourados de 7 para ~4. Manter os que ele gostou.

### Uma página ou várias?
- **B1 — uma página com "capítulos" (recomendado, ele ainda não confirmou):** o site continua single page, a transição entre mundos é contínua e o SEO não muda
- **B2 — uma página por mundo** (`/skills`, `/projetos`…): exige `getStaticProps` em cada página, menu com links de rota, animação de transição de página e mudanças no SEO e no sitemap. Mais trabalho.

### Imagens (domínio público, NASA)
- Baixar via `raw.githubusercontent.com` (o único host que funciona no sandbox), de repositórios que espelham os arquivos originais da NASA
- **Confirmar a origem NASA** antes de usar. Fontes originais: Marte = mosaico Viking (MDIM) ou MOLA colorido; Júpiter = mapa global da Cassini **PIA07782**
- Exportar em 2048×1024 JPG, qualidade ~82 (~300 KB), em `public/models/planets/`

### Implementação
1. Atualizar `PLANETS` com o roteiro (um planeta por seção, `x` alternando lados)
2. Detectar a seção atual (já existe a medição por `id` em `NasaPlanet`; extrair para um hook `useSectionProgress` compartilhado)
3. Disparar o salto de velocidade na troca de seção: somar um impulso no `drift` dentro de `useTravel` (ref, sem `setState`)
4. Mover o Vênus para dentro do `SpaceScene` (anchor `home`, sempre visível no topo) e remover o Canvas do `sectionHero` → um contexto WebGL a menos. **Manter a mesma aparência e posição de hoje.**
5. Componente `TravelHud` (DOM, fixo, `font-display`, dourado, só desktop, gated)
6. Reduzir estrelas e objetos

**Checklist B:**
- [ ] Ele confirmar B1 ou B2
- [ ] Marte e Júpiter baixados, verificados e otimizados
- [ ] `PLANETS` com o roteiro novo
- [ ] Salto de velocidade na troca de seção
- [ ] Vênus migrado para o `SpaceScene` (sem mudar o visual)
- [ ] HUD traduzido nos 4 idiomas
- [ ] Menos estrelas e objetos
- [ ] Planetas nunca atrás do texto (conferir com prints em 1440×900 e 1280×720)
- [ ] Build OK e link da prévia

---

## 8. Ordem sugerida

1. **Fase A2:** visor que sobe e mostra o rosto (rápido, sem assets novos)
2. **Fase B1:** mundos com Marte e Júpiter, menos estrelas, HUD e Vênus migrado
3. **Fase A1:** trocar pelo efeito com foto, quando as fotos estiverem prontas
4. Pendências da seção 5 e merge do PR #2 (quem decide é o Giuliano)
