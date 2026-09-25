// src/tipos/index.ts

/**
 * TIPOS COMPARTILHADOS DO PROJETO
 * Centraliza os formatos de dados usados pelas seções.
 */

/** Nomes dos ícones disponíveis em `src/componentes/ui/Icone.tsx` */
export type NomeDoIcone =
  | "parede"
  | "moldura"
  | "rolo"
  | "forro"
  | "luz"
  | "ferramenta"
  | "escudo"
  | "moeda"
  | "raio"
  | "estrela"
  | "telefone"
  | "email"
  | "local"
  | "relogio"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "youtube"
  | "menu"
  | "fechar"
  | "seta-cima"
  | "seta-baixa"
  | "seta-esquerda"
  | "seta-direita"
  | "check";

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icone: NomeDoIcone;
  imagem: string;
}

export interface Diferencial {
  id: string;
  titulo: string;
  descricao: string;
  icone: NomeDoIcone;
}

export interface ItemDaGaleria {
  id: string;
  titulo: string;
  categoria: string;
  imagem: string;
}

export interface Depoimento {
  id: string;
  nome: string;
  cidade: string;
  texto: string;
  nota: number;
  avatar: string;
}

export interface Numero {
  id: string;
  valor: number;
  sufixo: string;
  rotulo: string;
}

export interface ItemDeNavegacao {
  rotulo: string;
  ancora: string;
}

/** Direções possíveis do efeito "revelar ao rolar" */
export type DirecaoDaRevelacao = "baixo" | "esquerda" | "direita" | "zoom";
