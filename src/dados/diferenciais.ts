// src/dados/diferenciais.ts

import type { Diferencial, Numero } from "@/tipos";

/** Blocos da seção "Principais Diferenciais" */
export const diferenciais: Diferencial[] = [
  {
    id: "seguranca",
    titulo: "Segurança",
    descricao:
      "Todos os projetos são realizados com a proteção e a segurança necessárias, garantindo que a obra flua de forma eficaz e assertiva.",
    icone: "escudo",
  },
  {
    id: "custo-beneficio",
    titulo: "Custo-Benefício",
    descricao:
      "Nossos serviços têm o melhor custo-benefício da região. Realizamos seu projeto com um investimento que cabe no seu bolso.",
    icone: "moeda",
  },
  {
    id: "rapido-e-eficaz",
    titulo: "Rápido e Eficaz",
    descricao:
      "Busca profissionais para executar o projeto com agilidade? Conte conosco: garantimos prazo, qualidade e acabamento.",
    icone: "raio",
  },
];

/** Lista de qualidades exibida na seção "Sobre" */
export const qualidades: string[] = [
  "Atualização constante do nosso trabalho",
  "Profissionais especialistas em gesso e drywall",
  "Melhor custo-benefício da região",
  "Clientes satisfeitos e obras entregues no prazo",
];

/** Contadores animados */
export const numeros: Numero[] = [
  { id: "servicos", valor: 1200, sufixo: "+", rotulo: "Serviços realizados" },
  { id: "clientes", valor: 850, sufixo: "+", rotulo: "Clientes atendidos" },
  { id: "anos", valor: 12, sufixo: "", rotulo: "Anos de atuação" },
  { id: "avaliacao", valor: 5, sufixo: "★", rotulo: "Avaliação média" },
];
