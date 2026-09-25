// src/componentes/ui/Icone.tsx

import type { NomeDoIcone } from "@/tipos";

interface PropriedadesDoIcone {
  nome: NomeDoIcone;
  className?: string;
}

/**
 * BIBLIOTECA DE ÍCONES (SVG embutido)
 * -------------------------------------------------------------
 * Evita instalar bibliotecas externas. Para adicionar um ícone:
 * 1. Acrescente o nome em `NomeDoIcone` (src/tipos/index.ts);
 * 2. Adicione o caminho SVG no objeto `caminhos` abaixo.
 */
const caminhos: Record<NomeDoIcone, React.ReactNode> = {
  parede: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 12h18M8 5v7M16 5v7M12 12v7" />
    </>
  ),
  moldura: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </>
  ),
  rolo: (
    <>
      <rect x="3" y="4" width="13" height="6" rx="1" />
      <path d="M16 7h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7v3" />
      <rect x="10" y="16" width="4" height="5" rx="1" />
    </>
  ),
  forro: (
    <>
      <path d="M2 9l10-6 10 6" />
      <path d="M4 9v11h16V9" />
      <path d="M8 13h8" />
    </>
  ),
  luz: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.6l.1.6h5.2l.1-.6c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z" />
    </>
  ),
  ferramenta: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5.3 5.3l-8 8a2.8 2.8 0 1 1-4-4l8-8z" />
      <path d="M6 6l3 3" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  moeda: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5a3 3 0 0 0-2.5-1.2c-1.4 0-2.5.8-2.5 1.9 0 2.6 5 1.4 5 4 0 1.2-1.1 2-2.5 2a3 3 0 0 1-2.5-1.2" />
      <path d="M12 6.5v11" />
    </>
  ),
  raio: <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />,
  estrela: (
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
  ),
  telefone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 6 10-6" />
    </>
  ),
  local: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  whatsapp: (
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2zm0 1.9a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.13l-.3-.18-3.06.88.87-3-.2-.31a8 8 0 0 1 6.79-12.26zM8.6 7.3c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.8 4.32 3.82 2.13.84 2.56.67 3.02.63.46-.04 1.5-.61 1.71-1.2.21-.6.21-1.1.15-1.2-.06-.11-.23-.17-.48-.3-.25-.12-1.5-.73-1.73-.82-.23-.08-.4-.12-.57.13-.17.25-.65.82-.8.99-.14.16-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.5.11-.12.25-.3.38-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.4-.42-.56-.42h-.5z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  facebook: (
    <path d="M14 8.5V7c0-.8.4-1.2 1.3-1.2H17V3h-2.5C11.9 3 11 4.5 11 6.7v1.8H9V12h2v9h3v-9h2.3l.4-3.5H14z" />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5.5 3-5.5 3V9z" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  fechar: <path d="M18 6L6 18M6 6l12 12" />,
  "seta-cima": <path d="M12 19V5M5 12l7-7 7 7" />,
  "seta-baixa": <path d="M12 5v14M19 12l-7 7-7-7" />,
  "seta-esquerda": <path d="M19 12H5M12 19l-7-7 7-7" />,
  "seta-direita": <path d="M5 12h14M12 5l7 7-7 7" />,
  check: <path d="M20 6L9 17l-5-5" />,
};

/** Ícones que devem ser desenhados preenchidos em vez de contornados */
const iconesPreenchidos: NomeDoIcone[] = [
  "whatsapp",
  "facebook",
  "estrela",
  "raio",
  "telefone",
];

export function Icone({ nome, className = "w-6 h-6" }: PropriedadesDoIcone) {
  const preenchido = iconesPreenchidos.includes(nome);

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={preenchido ? "currentColor" : "none"}
      stroke={preenchido ? "none" : "currentColor"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {caminhos[nome]}
    </svg>
  );
}
