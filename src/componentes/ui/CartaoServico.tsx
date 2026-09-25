// src/componentes/ui/CartaoServico.tsx

import { Icone } from "./Icone";
import { Revelar } from "./Revelar";
import {
  montarLinkDoWhatsapp,
  montarMensagemDeServico,
} from "@/utilitarios/whatsapp";
import type { Servico } from "@/tipos";

interface PropriedadesDoCartao {
  servico: Servico;
  /** Atraso da animação de entrada (efeito cascata) */
  atraso?: number;
}

/**
 * Cartão de serviço com foto de fundo, ícone flutuante e
 * botão de orçamento que aparece ao passar o mouse.
 */
export function CartaoServico({ servico, atraso = 0 }: PropriedadesDoCartao) {
  const linkDoWhatsapp = montarLinkDoWhatsapp(
    montarMensagemDeServico(servico.titulo),
  );

  return (
    <Revelar direcao="baixo" atraso={atraso} como="article">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-escuro-800 transition-all duration-500 hover:-translate-y-2 hover:border-marca-500/50 hover:shadow-2xl hover:shadow-marca-900/30">
        {/* Foto */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={servico.imagem}
            alt={servico.titulo}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-escuro-800 via-escuro-800/40 to-transparent" />

          {/* Ícone flutuante */}
          <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-xl bg-marca-500 text-escuro-900 shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Icone nome={servico.icone} className="h-7 w-7" />
          </div>
        </div>

        {/* Texto */}
        <div className="px-6 pb-7 pt-10">
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-marca-400">
            {servico.titulo}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {servico.descricao}
          </p>

          <a
            href={linkDoWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-marca-400 transition-all duration-300 hover:gap-3 hover:text-marca-300"
          >
            Pedir orçamento
            <Icone nome="seta-direita" className="h-4 w-4" />
          </a>
        </div>

        {/* Linha dourada que cresce na base */}
        <span className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-marca-500 to-marca-300 transition-all duration-500 group-hover:w-full" />
      </div>
    </Revelar>
  );
}
