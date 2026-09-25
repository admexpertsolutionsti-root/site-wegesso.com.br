// src/componentes/layout/Logotipo.tsx

import { configuracoesDoSite } from "@/configuracoes/site";
import { juntarClasses } from "@/utilitarios/formatadores";

interface PropriedadesDoLogotipo {
  className?: string;
}

/**
 * Logotipo em SVG + texto.
 * Para usar a logo real da empresa, coloque o arquivo em
 * `public/imagens/logo.svg` e troque o bloco <svg> por:
 *   <img src="/imagens/logo.svg" alt="Logo" className="h-11 w-auto" />
 */
export function Logotipo({ className }: PropriedadesDoLogotipo) {
  return (
    <a
      href="#inicio"
      className={juntarClasses("group flex items-center gap-3", className)}
      aria-label={`${configuracoesDoSite.nomeDaEmpresa} — ir para o início`}
    >
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl transition-transform duration-500 group-hover:rotate-6">
        <img
          src="/imagens/logo-simbolo.png"
          alt="Logo do símbolo da empresa"
          className="h-full w-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-white">
          W <span className="text-marca-400"></span> Gesso
        </span>
        <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-400">
          {configuracoesDoSite.cidade}/{configuracoesDoSite.estado}
        </span>
      </span>
    </a>
  );
}
