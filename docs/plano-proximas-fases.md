# Plano — próximas fases do portfólio

> Continuação da branch `feat/space-journey`, que já tem o fundo 3D, o Vênus na home, o capacete 3D no "Sobre mim", a Lua e a Terra da NASA e os cards chegando do espaço.
>
> Este documento é só planejamento. Nada aqui foi implementado ainda.

---

## Fase A — Capacete que revela o rosto (efeito "site de piloto de F1")

**Ideia:** você aparece de capacete de astronauta. Ao passar o mouse (ou tocar, no celular), o rosto aparece, igual aos sites de pilotos de F1 em que o capacete "some" e mostra o piloto.

### Opção A1 — Foto 2D com máscara (mais fiel ao efeito da F1)

Duas fotos **com o mesmo enquadramento**, alinhadas pixel a pixel:

1. Você **com** capacete de astronauta
2. Você **sem** capacete (o rosto)

O cursor vira um círculo que "abre um buraco" na foto 1 e mostra a foto 2 por baixo, com borda suave e movimento de mola.

**Como conseguir a foto de capacete:**
- Foto real com um capacete cenográfico, usando tripé para manter o mesmo enquadramento da foto sem capacete; ou
- Gerar a versão de astronauta por IA a partir da sua foto, pedindo exatamente o mesmo enquadramento, e depois alinhar as duas.

**Implementação:**
- Componente `HelmetReveal` em `sectionAbout/components/`
- `mask-image: radial-gradient(...)` posicionado com `useMotionValue` + `useSpring` (Framer Motion)
- Raio do círculo cresce no hover e encolhe ao sair
- Mobile: tocar alterna capacete ↔ rosto (sem seguir o dedo)
- Respeitar `useAnimationEnabled()`: sem animação, mostra só o rosto
- Imagens com `next/image`, em WebP, ~800px

### Opção A2 — Usar o capacete 3D que já existe (não precisa de foto nova)

- O visor vira **dourado espelhado e opaco**, como o de um astronauta de verdade
- No hover, o **visor sobe** com animação de mola e mostra seu rosto
- Alternativa: uma "lente" circular no visor, que segue o mouse e deixa ver o rosto através dele

### Recomendação

Fazer a **A2 primeiro** (dá pra fazer já, sem depender de foto). Partir para a **A1** quando tiver as duas fotos alinhadas.

### Checklist
- [ ] Decidir A1 ou A2
- [ ] (A1) Tirar ou gerar a foto de capacete com o mesmo enquadramento
- [ ] (A1) Alinhar e exportar as duas fotos em WebP
- [ ] Implementar o componente e testar com mouse e toque
- [ ] Testar com `prefers-reduced-motion`

---

## Fase B — Viagem de mundo em mundo

**Ideia:** o site conta uma viagem. Você sai do espaço, "cai na Terra" e vai passando de mundo em mundo. Cada seção é um destino. O foco passa a ser os **planetas**, com **menos estrelas** para não poluir.

### Roteiro

| Seção | Mundo | Sensação |
|---|---|---|
| Home | Espaço + Vênus (já existe) | Partida |
| Sobre mim | **Terra** | "Pousei": quem sou eu |
| Skills | **Lua** | Ferramentas e base de lançamento |
| Projetos | **Marte** | Exploração: o que construí |
| Experiência | **Júpiter** | A jornada maior |
| Contato | De volta à **Terra** / sinal de rádio | "Chama no rádio" |

### Como fica na tela

- Em cada seção, o planeta dela aparece **grande, no horizonte ou na lateral**, sem cobrir o texto
- Ao cruzar de uma seção para outra: **salto curto de velocidade** (os riscos de luz que já existem) e o próximo planeta cresce
- Um **HUD discreto** no canto, por exemplo "Destino: Marte · 225 mi km", com texto traduzido nos 4 idiomas
- **Menos estrelas:** cair de ~4.200 para ~1.500 e reduzir os objetos dourados, deixando os planetas como protagonistas

### Uma página ou várias?

- **B1 — Uma página com "capítulos" (recomendado):** mantém o site como está hoje (single page), SEO simples e transição contínua entre os mundos.
- **B2 — Uma página por mundo** (`/sobre`, `/projetos`…): cada mundo vira uma rota com animação de viagem entre elas. Exige `getStaticProps` em cada página e mudanças na navegação e no SEO.

### Imagens necessárias (domínio público, NASA)

- [x] Vênus: já está no projeto
- [x] Terra (Blue Marble): `public/models/planets/earth.jpg`
- [x] Lua (LRO / CGI Moon Kit): `public/models/planets/moon.jpg`
- [ ] Marte: mapa colorido Viking / MOLA
- [ ] Júpiter: mapa global da Cassini (PIA07782)

Antes de usar cada nova imagem, confirmar na fonte que é da NASA e de domínio público. Exportar em 2048×1024 JPG (~300 KB).

### Implementação
- Trocar o array `PLANETS` em `SpaceScene.tsx` pelo roteiro acima (um planeta por seção)
- Planeta da seção atual em primeiro plano; o próximo aparece pequeno ao fundo
- Detectar a troca de seção (já existe a medição por `id`) e disparar o salto de velocidade
- Componente `TravelHud` para o "Destino: …"
- Manter o Canvas só no desktop, com o fallback leve no mobile

### Checklist
- [ ] Decidir B1 ou B2
- [ ] Baixar e otimizar Marte e Júpiter
- [ ] Reescrever `PLANETS` com o roteiro
- [ ] Salto de velocidade na troca de seção
- [ ] HUD com textos traduzidos
- [ ] Reduzir estrelas e objetos
- [ ] Testar desempenho (Lighthouse) e no celular

---

## Ordem sugerida

1. **Fase A2:** visor que sobe e mostra o rosto (rápido, sem assets novos)
2. **Fase B1:** roteiro de mundos com Marte e Júpiter, menos estrelas e HUD
3. **Fase A1:** trocar pelo efeito com foto, quando as fotos estiverem prontas
