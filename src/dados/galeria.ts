// src/dados/galeria.ts

import type { ItemDaGaleria } from "@/tipos";

/**
 * FOTOS DOS TRABALHOS.
 * Substitua pelas fotos reais da empresa colocando os arquivos em
 * `public/imagens/galeria/` e usando `/imagens/galeria/arquivo.jpg`.
 */
export const itensDaGaleria: ItemDaGaleria[] = [
  {
    id: "g1",
    titulo: "Forro de gesso em sala de estar",
    categoria: "Forro",
    imagem:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g2",
    titulo: "Sanca aberta com iluminação em LED",
    categoria: "Sanca",
    imagem:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g3",
    titulo: "Divisória em drywall para escritório",
    categoria: "Drywall",
    imagem:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g4",
    titulo: "Painel ripado com gesso e iluminação",
    categoria: "Sanca",
    imagem:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g5",
    titulo: "Moldura de gesso em dormitório",
    categoria: "Moldura",
    imagem:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g6",
    titulo: "Acabamento em gesso liso",
    categoria: "Gesso liso",
    imagem:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g7",
    titulo: "Forro de gesso em cozinha planejada",
    categoria: "Forro",
    imagem:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1000&q=70",
  },
  {
    id: "g8",
    titulo: "Reforma completa com drywall",
    categoria: "Drywall",
    imagem:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=70",
  },
];

/** Categorias usadas no filtro da galeria ("Todos" é adicionado automaticamente) */
export const categoriasDaGaleria: string[] = Array.from(
  new Set(itensDaGaleria.map((item) => item.categoria)),
);
