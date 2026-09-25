// src/componentes/layout/BotaoWhatsappFlutuante.tsx

import { useState } from "react";
import { Icone } from "@/componentes/ui/Icone";
import { usePosicaoDaRolagem } from "@/ganchos/usePosicaoDaRolagem";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";
import { configuracoesDoSite } from "@/configuracoes/site";
import { juntarClasses } from "@/utilitarios/formatadores";

/**
 * BOTÃO FLUTUANTE DO WHATSAPP
 * -------------------------------------------------------------
 * Aparece após rolar um pouco a página, com anel pulsante e
 * um balão de mensagem que abre ao passar o mouse.
 */
export function BotaoWhatsappFlutuante() {
  const { passouDoLimite } = usePosicaoDaRolagem(300);
  const [balaoAberto, definirBalaoAberto] = useState(false);

  return (
    <div
      className={juntarClasses(
        "fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 transition-all duration-500",
        passouDoLimite
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0",
      )}
    >
      {/* Balão de mensagem */}
      <div
        className={juntarClasses(
          "max-w-[16rem] origin-bottom-right rounded-2xl rounded-br-sm border border-white/10 bg-escuro-800 p-4 shadow-2xl transition-all duration-300",
          balaoAberto
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0",
        )}
      >
        <p className="text-sm font-semibold text-white">
          Olá! Precisa de um orçamento?
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          Fale agora com a nossa equipe pelo WhatsApp. Atendimento{" "}
          {configuracoesDoSite.horarioDeAtendimento.toLowerCase()}.
        </p>
      </div>

      {/* Botão */}
      <a
        href={montarLinkDoWhatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onMouseEnter={() => definirBalaoAberto(true)}
        onMouseLeave={() => definirBalaoAberto(false)}
        onFocus={() => definirBalaoAberto(true)}
        onBlur={() => definirBalaoAberto(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-zap text-white shadow-xl shadow-zap/40 transition-transform duration-300 hover:scale-110"
      >
        {/* anéis pulsantes */}
        <span className="absolute inset-0 animate-pulsar-anel rounded-full bg-zap/60" />
        <span
          className="absolute inset-0 animate-pulsar-anel rounded-full bg-zap/40"
          style={{ animationDelay: "1s" }}
        />
        <Icone nome="whatsapp" className="relative h-7 w-7" />
      </a>
    </div>
  );
}
