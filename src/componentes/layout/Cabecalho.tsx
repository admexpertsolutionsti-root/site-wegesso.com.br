// src/componentes/layout/Cabecalho.tsx

import { useMemo, useState } from "react";
import { Container } from "@/componentes/ui/Container";
import { Botao } from "@/componentes/ui/Botao";
import { Icone } from "@/componentes/ui/Icone";
import { Logotipo } from "./Logotipo";
import { itensDeNavegacao } from "@/dados/navegacao";
import { configuracoesDoSite } from "@/configuracoes/site";
import { usePosicaoDaRolagem } from "@/ganchos/usePosicaoDaRolagem";
import { useSecaoAtiva } from "@/ganchos/useSecaoAtiva";
import { useTravarRolagem } from "@/ganchos/useTravarRolagem";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";
import { juntarClasses, rolarAteSecao } from "@/utilitarios/formatadores";

/**
 * CABEÇALHO FIXO
 * -------------------------------------------------------------
 * Efeitos:
 *  - fundo transparente que vira "vidro" escuro ao rolar;
 *  - barra dourada de progresso da leitura;
 *  - item do menu destacado conforme a seção visível;
 *  - menu lateral animado no celular.
 */
export function Cabecalho() {
  const [menuAberto, definirMenuAberto] = useState(false);
  const { posicao, passouDoLimite } = usePosicaoDaRolagem(40);

  const idsDasSecoes = useMemo(
    () => itensDeNavegacao.map((item) => item.ancora),
    [],
  );
  const secaoAtiva = useSecaoAtiva(idsDasSecoes);

  useTravarRolagem(menuAberto);

  // Progresso da leitura (0 a 100)
  const progresso = (() => {
    if (typeof document === "undefined") return 0;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    return total > 0 ? Math.min((posicao / total) * 100, 100) : 0;
  })();

  const navegarPara = (ancora: string) => {
    definirMenuAberto(false);
    // pequeno atraso para o menu fechar antes de rolar
    window.setTimeout(() => rolarAteSecao(ancora), 120);
  };

  return (
    <>
      <header
        className={juntarClasses(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          passouDoLimite
            ? "vidro py-3 shadow-lg shadow-black/30"
            : "bg-transparent py-5",
        )}
      >
        <Container className="flex items-center justify-between">
          <Logotipo />

          {/* Menu no computador */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Menu principal"
          >
            {itensDeNavegacao.map((item) => (
              <button
                key={item.ancora}
                type="button"
                onClick={() => navegarPara(item.ancora)}
                className={juntarClasses(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  secaoAtiva === item.ancora
                    ? "text-marca-400"
                    : "text-slate-300 hover:text-white",
                )}
              >
                {item.rotulo}
                <span
                  className={juntarClasses(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-marca-400 transition-all duration-300",
                    secaoAtiva === item.ancora ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${configuracoesDoSite.telefone.replace(/\D/g, "")}`}
              className="hidden items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-marca-400 xl:flex"
            >
              <Icone nome="telefone" className="h-4 w-4 text-marca-400" />
              {configuracoesDoSite.telefone}
            </a>

            <Botao
              href={montarLinkDoWhatsapp()}
              novaAba
              variante="whatsapp"
              tamanho="pequeno"
              icone="whatsapp"
              className="hidden sm:inline-flex"
            >
              Orçamento
            </Botao>

            {/* Botão do menu no celular */}
            <button
              type="button"
              onClick={() => definirMenuAberto((aberto) => !aberto)}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuAberto}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:border-marca-400 hover:text-marca-400 lg:hidden"
            >
              <Icone
                nome={menuAberto ? "fechar" : "menu"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </Container>

        {/* Barra de progresso da leitura */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
          <div
            className="h-full bg-linear-to-r from-marca-600 via-marca-400 to-marca-200 transition-[width] duration-150"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </header>

      {/* Fundo escurecido do menu mobile */}
      <div
        onClick={() => definirMenuAberto(false)}
        className={juntarClasses(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuAberto ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Painel lateral do menu mobile */}
      <aside
        className={juntarClasses(
          "fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col border-l border-white/10 bg-escuro-950 px-7 py-8 transition-transform duration-500 ease-out lg:hidden",
          menuAberto ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <Logotipo />
          <button
            type="button"
            onClick={() => definirMenuAberto(false)}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white"
          >
            <Icone nome="fechar" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Menu do celular">
          {itensDeNavegacao.map((item, indice) => (
            <button
              key={item.ancora}
              type="button"
              onClick={() => navegarPara(item.ancora)}
              style={{
                transitionDelay: menuAberto ? `${indice * 60}ms` : "0ms",
              }}
              className={juntarClasses(
                "rounded-xl px-4 py-3 text-left text-base font-medium transition-all duration-500",
                menuAberto
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0",
                secaoAtiva === item.ancora
                  ? "bg-marca-500/10 text-marca-400"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              )}
            >
              {item.rotulo}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
          <a
            href={`tel:${configuracoesDoSite.telefone.replace(/\D/g, "")}`}
            className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-marca-400"
          >
            <Icone nome="telefone" className="h-4 w-4 text-marca-400" />
            {configuracoesDoSite.telefone}
          </a>

          <Botao
            href={montarLinkDoWhatsapp()}
            novaAba
            variante="whatsapp"
            icone="whatsapp"
            className="w-full"
          >
            Falar no WhatsApp
          </Botao>
        </div>
      </aside>
    </>
  );
}
