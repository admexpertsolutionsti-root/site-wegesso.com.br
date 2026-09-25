// src/componentes/ui/Botao.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { juntarClasses } from "@/utilitarios/formatadores";
import { Icone } from "./Icone";
import type { NomeDoIcone } from "@/tipos";

type Variante = "primario" | "secundario" | "contorno" | "whatsapp";
type Tamanho = "pequeno" | "medio" | "grande";

interface PropriedadesBase {
  children: ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  icone?: NomeDoIcone;
  className?: string;
}

interface PropriedadesDoBotao
  extends
    PropriedadesBase,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  /** Se informado, o botão vira um link <a> */
  href?: string;
  /** Abre o link em nova aba */
  novaAba?: boolean;
}

const classesPorVariante: Record<Variante, string> = {
  primario:
    "bg-marca-500 text-escuro-900 hover:bg-marca-400 shadow-lg shadow-marca-500/25 hover:shadow-marca-400/40",
  secundario: "bg-white text-escuro-900 hover:bg-slate-100",
  contorno:
    "border border-white/25 text-white hover:border-marca-400 hover:text-marca-300 hover:bg-white/5",
  whatsapp:
    "bg-zap text-white hover:bg-zap-escuro shadow-lg shadow-zap/25 hover:shadow-zap/40",
};

const classesPorTamanho: Record<Tamanho, string> = {
  pequeno: "px-4 py-2 text-sm",
  medio: "px-6 py-3 text-sm",
  grande: "px-8 py-4 text-base",
};

/**
 * Botão do site. Vira um link automaticamente quando recebe `href`.
 * Traz um efeito de brilho que atravessa o botão ao passar o mouse.
 */
export function Botao({
  children,
  variante = "primario",
  tamanho = "medio",
  icone,
  className,
  href,
  novaAba,
  ...resto
}: PropriedadesDoBotao) {
  const classes = juntarClasses(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold",
    "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca-400 focus-visible:ring-offset-2 focus-visible:ring-offset-escuro-900",
    classesPorVariante[variante],
    classesPorTamanho[tamanho],
    className,
  );

  const conteudo = (
    <>
      {/* brilho que atravessa o botão no hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {icone && <Icone nome={icone} className="relative h-5 w-5" />}
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(novaAba ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...resto}>
      {conteudo}
    </button>
  );
}
