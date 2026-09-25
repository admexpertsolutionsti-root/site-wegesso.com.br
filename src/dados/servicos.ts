// src/dados/servicos.ts

import type { Servico } from "@/tipos";

/**
 * SERVIÇOS EXIBIDOS NA SEÇÃO "Nossos Serviços".
 * Para trocar as fotos, coloque os arquivos em `public/imagens/`
 * e use o caminho `/imagens/nome-do-arquivo.jpg`.
 */
export const servicos: Servico[] = [
  {
    id: "drywall",
    titulo: "Drywall",
    descricao:
      "Paredes e divisórias em drywall: solução de preço acessível e aplicação rápida, tanto para áreas internas quanto externas.",
    icone: "parede",
    imagem: "/imagens/photo-1581094794329.jpg",
  },
  {
    id: "moldura-de-gesso",
    titulo: "Moldura de Gesso",
    descricao:
      "Molduras de gesso para teto e parede. Aplicação em sala, quarto, banheiro e ambientes externos com acabamento impecável.",
    icone: "moldura",
    imagem: "/imagens/photo-1600607687939.jpg",
  },
  {
    id: "gesso-liso",
    titulo: "Gesso Liso",
    descricao:
      "O revestimento em gesso liso é a opção mais rápida para alcançar um ótimo acabamento com valor reduzido e boa durabilidade.",
    icone: "rolo",
    imagem: "/imagens/photo-1595428774223.jpeg",
  },
  {
    id: "forro-de-gesso",
    titulo: "Forro de Gesso",
    descricao:
      "Dê mais sofisticação ao ambiente com forro de gesso ou drywall. Além de elegante, favorece o isolamento acústico e térmico.",
    icone: "forro",
    imagem: "/imagens/photo-1600566753190.jpg",
  },
  {
    id: "sancas-e-iluminacao",
    titulo: "Sancas e Iluminação",
    descricao:
      "Transforme a iluminação da sua casa ou apartamento com sancas. Trabalhamos com sanca aberta, fechada e invertida.",
    icone: "luz",
    imagem: "/imagens/photo-1616486338812.jpg",
  },
  {
    id: "reparos-e-reformas",
    titulo: "Reparos e Reformas",
    descricao:
      "Executamos reformas e reparos diversos em gesso: fechamento de buracos, rachaduras, instalações elétricas e pintura.",
    icone: "ferramenta",
    imagem:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=70",
  },
];
