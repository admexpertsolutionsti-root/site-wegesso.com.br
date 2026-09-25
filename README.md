# Gesso & Gesseiro — Site institucional

Site de página única (one page) para empresa de gesso e drywall, construído com
**React 19 + TypeScript + Vite + Tailwind CSS 4**, com toda a nomenclatura em português
e integração de orçamentos via **WhatsApp**.

Serve como base reaproveitável: trocando o arquivo `src/configuracoes/site.ts` e os
arquivos de `src/dados/`, você monta um site novo para outro cliente sem tocar nos
componentes.

---

## 1. Como rodar

```bash
npm install     # instala as dependências (só na primeira vez)
npm run dev     # sobe o servidor em http://localhost:5173
```

Outros comandos:

| Comando                   | O que faz                                        |
| ------------------------- | ------------------------------------------------ |
| `npm run dev`             | Servidor de desenvolvimento com recarga instantânea |
| `npm run build`           | Verifica os tipos e gera a pasta `dist/` para publicar |
| `npm run preview`         | Testa localmente o resultado do `build`          |
| `npm run verificar-tipos` | Só a checagem de TypeScript                      |

---

## 2. Estrutura de pastas

```
.
├── index.html                  # HTML base: título, SEO, fontes
├── public/
│   ├── favicon.svg             # ícone da aba do navegador
│   └── imagens/                # (crie) fotos próprias da empresa
├── src/
│   ├── main.tsx                # ponto de entrada do React
│   ├── App.tsx                 # ORDEM DAS SEÇÕES DA PÁGINA
│   │
│   ├── configuracoes/
│   │   └── site.ts             # ⭐ telefone, WhatsApp, e-mail, endereço, redes
│   │
│   ├── dados/                  # ⭐ conteúdo editável (texto e imagens)
│   │   ├── navegacao.ts        # itens do menu
│   │   ├── servicos.ts         # cards de serviços
│   │   ├── diferenciais.ts     # diferenciais, qualidades e contadores
│   │   ├── galeria.ts          # fotos do portfólio
│   │   └── depoimentos.ts      # avaliações dos clientes
│   │
│   ├── tipos/
│   │   └── index.ts            # interfaces TypeScript compartilhadas
│   │
│   ├── utilitarios/
│   │   ├── whatsapp.ts         # monta os links wa.me com mensagem pronta
│   │   └── formatadores.ts     # juntarClasses, máscara de telefone, rolagem
│   │
│   ├── ganchos/                # hooks com os efeitos
│   │   ├── useRevelarAoRolar.ts    # anima elementos ao entrar na tela
│   │   ├── useContadorAnimado.ts   # números que sobem de 0 até o valor
│   │   ├── usePosicaoDaRolagem.ts  # header sólido, botões flutuantes
│   │   ├── useSecaoAtiva.ts        # destaca o item do menu da seção visível
│   │   ├── useCarrossel.ts         # carrossel de depoimentos
│   │   └── useTravarRolagem.ts     # trava o fundo com menu/lightbox aberto
│   │
│   ├── componentes/
│   │   ├── ui/                 # peças reutilizáveis
│   │   │   ├── Icone.tsx           # todos os ícones SVG do site
│   │   │   ├── Botao.tsx           # botão/link com efeito de brilho
│   │   │   ├── Container.tsx       # largura máxima e respiro lateral
│   │   │   ├── Revelar.tsx         # wrapper da animação de entrada
│   │   │   ├── TituloSecao.tsx     # cabeçalho padrão das seções
│   │   │   ├── Estrelas.tsx        # nota de 1 a 5
│   │   │   └── CartaoServico.tsx   # card de serviço
│   │   │
│   │   ├── layout/
│   │   │   ├── Logotipo.tsx
│   │   │   ├── Cabecalho.tsx            # menu fixo + barra de progresso
│   │   │   ├── Rodape.tsx
│   │   │   ├── BotaoWhatsappFlutuante.tsx
│   │   │   └── BotaoVoltarAoTopo.tsx
│   │   │
│   │   └── secoes/             # as seções da página, na ordem
│   │       ├── SecaoInicio.tsx      # hero com parallax
│   │       ├── SecaoServicos.tsx
│   │       ├── SecaoSobre.tsx
│   │       ├── SecaoNumeros.tsx     # contadores animados
│   │       ├── SecaoDiferenciais.tsx
│   │       ├── SecaoGaleria.tsx     # filtro + lightbox
│   │       ├── SecaoDepoimentos.tsx # carrossel
│   │       ├── SecaoChamada.tsx     # faixa dourada de CTA
│   │       └── SecaoContato.tsx     # formulário → WhatsApp + mapa
│   │
│   └── estilos/
│       └── globais.css         # ⭐ cores, fonte, keyframes das animações
├── tsconfig.json
└── vite.config.ts
```

> O atalho `@/` aponta para `src/`. Ex.: `import { Botao } from '@/componentes/ui/Botao'`.

---

## 3. Como personalizar (ordem recomendada)

### 3.1 Dados da empresa

Abra `src/configuracoes/site.ts` e troque nome, telefone, número do WhatsApp
(**apenas números, com o 55 na frente**), e-mail, endereço e redes sociais.

```ts
whatsapp: '5519992420905',   // 55 + DDD + número
```

### 3.2 Cores e fonte

Abra `src/estilos/globais.css`, bloco `@theme`. Trocar `--color-marca-*` muda o dourado
do site inteiro. A fonte é carregada no `index.html` (Google Fonts).

### 3.3 Textos e imagens

Edite os arquivos de `src/dados/`. Para usar fotos próprias:

1. crie a pasta `public/imagens/`;
2. copie as fotos para lá;
3. em `src/dados/servicos.ts` (e `galeria.ts`), troque a URL por `/imagens/foto.jpg`.

### 3.4 Ordem / remoção de seções

Tudo é controlado em `src/App.tsx` — mova ou apague uma linha `<SecaoX />` e ajuste o
menu em `src/dados/navegacao.ts`.

---

## 4. Como funciona a integração com o WhatsApp

Não há back-end. Tudo usa o link oficial `https://wa.me/<numero>?text=<mensagem>`,
montado em `src/utilitarios/whatsapp.ts`:

- **Botão flutuante e do menu** → mensagem padrão de `configuracoesDoSite`.
- **Botão "Pedir orçamento" do card** → mensagem com o nome daquele serviço.
- **Formulário de contato** → valida os campos, monta a mensagem formatada
  (nome, telefone, serviço e observações) e abre o WhatsApp em nova aba.

Para trocar o número, mexa **somente** em `src/configuracoes/site.ts`.

---

## 5. Efeitos implementados

| Efeito                          | Onde está                                       |
| ------------------------------- | ----------------------------------------------- |
| Entrada dos elementos ao rolar  | `useRevelarAoRolar` + `<Revelar>` + classes `.revelar` |
| Parallax no topo e nos números  | `SecaoInicio` / `SecaoNumeros`                  |
| Palavra que troca no título     | `SecaoInicio` + keyframe `trocarPalavra`        |
| Header transparente → vidro     | `Cabecalho` + `usePosicaoDaRolagem`             |
| Barra de progresso da leitura   | `Cabecalho`                                     |
| Item ativo do menu              | `useSecaoAtiva`                                 |
| Menu lateral animado (celular)  | `Cabecalho` + `useTravarRolagem`                |
| Zoom, brilho e linha nos cards  | `CartaoServico`, `SecaoDiferenciais`            |
| Contadores animados             | `useContadorAnimado`                            |
| Filtro + lightbox da galeria    | `SecaoGaleria` (setas e `Esc` pelo teclado)     |
| Carrossel automático            | `useCarrossel`                                  |
| WhatsApp pulsante com balão     | `BotaoWhatsappFlutuante`                        |
| Voltar ao topo                  | `BotaoVoltarAoTopo`                             |

Todos respeitam `prefers-reduced-motion` (acessibilidade).

---

## 6. Publicar

```bash
npm run build
```

A pasta `dist/` gerada é estática — pode ser enviada para Vercel, Netlify, GitHub Pages
ou qualquer hospedagem comum.
