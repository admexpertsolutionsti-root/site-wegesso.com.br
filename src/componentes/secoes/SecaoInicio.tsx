// src/componentes/secoes/SecaoInicio.tsx

import { useEffect, useState } from "react";
import { Container } from "@/componentes/ui/Container";
import { Botao } from "@/componentes/ui/Botao";
import { Icone } from "@/componentes/ui/Icone";
import { configuracoesDoSite } from "@/configuracoes/site";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";
import { rolarAteSecao } from "@/utilitarios/formatadores";

/** Palavras que se alternam no título principal */
const palavrasAlternadas = [
  "Forro de gesso",
  "Drywall",
  "Sancas",
  "Gesso liso",
];

/**
 * SEÇÃO PRINCIPAL (HERO)
 * -------------------------------------------------------------
 * Efeitos:
 *  - foto de fundo com leve zoom e parallax na rolagem;
 *  - texto que troca de palavra automaticamente;
 *  - entrada em cascata dos elementos;
 *  - seta animada indicando rolagem.
 */
export function SecaoInicio() {
  const [indiceDaPalavra, definirIndiceDaPalavra] = useState(0);
  const [deslocamento, definirDeslocamento] = useState(0);
  const [carregou, definirCarregou] = useState(false);

  // Troca de palavra a cada 2,6 segundos
  useEffect(() => {
    const temporizador = window.setInterval(() => {
      definirIndiceDaPalavra(
        (atual) => (atual + 1) % palavrasAlternadas.length,
      );
    }, 2600);
    return () => window.clearInterval(temporizador);
  }, []);

  // Efeito parallax do fundo
  useEffect(() => {
    const aoRolar = () => definirDeslocamento(window.scrollY * 0.35);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Dispara a animação de entrada logo após montar
  useEffect(() => {
    const t = window.setTimeout(() => definirCarregou(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  /** Classe de entrada em cascata (o atraso vai no `style`, não na classe) */
  const classeDeEntrada = `transition-all duration-1000 ease-out ${
    carregou ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#0f172a]"
    >
      <div
        className="hero-fundo absolute inset-0 z-0 scale-110"
        style={{ transform: `translateY(${deslocamento}px) scale(1.15)` }}
      />

      <div className="absolute inset-0 z-10 bg-[#0f172a]/25" />
      <div className="absolute inset-0 z-10 bg-linear-to-r from-[#0f172a]/60 via-[#0f172a]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#0f172a]/55 to-transparent" />

      {/* Formas decorativas flutuantes */}
      <div className="pointer-events-none absolute right-[8%] top-[18%] z-10 h-72 w-72 animate-flutuar rounded-full bg-marca-500/10 blur-3xl" />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[10%] z-10 h-56 w-56 animate-flutuar rounded-full bg-marca-300/5 blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      <Container className="relative z-20 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Selo */}
          <div className={classeDeEntrada} style={{ transitionDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-marca-500/30 bg-marca-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-marca-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marca-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-marca-400" />
              </span>
              Atendemos {configuracoesDoSite.cidade} e região
            </span>
          </div>

          {/* Título */}
          <h1
            className={`mt-7 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl ${classeDeEntrada}`}
            style={{ transitionDelay: "150ms" }}
          >
            A solução ideal em <span className="texto-gradiente">gesso</span>{" "}
            para você
            <span className="mt-4 block text-2xl font-semibold text-slate-300 sm:text-3xl">
              <span className="text-slate-500">Especialistas em</span>{" "}
              <span
                key={indiceDaPalavra}
                className="inline-block animate-trocar-palavra text-marca-400"
              >
                {palavrasAlternadas[indiceDaPalavra]}
              </span>
            </span>
          </h1>

          {/* Descrição */}
          <p
            className={`mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg ${classeDeEntrada}`}
            style={{ transitionDelay: "300ms" }}
          >
            Forro, sanca, moldura, drywall, gesso liso, reparos e reformas.
            Equipe qualificada, obra limpa e acabamento impecável. Entre em
            contato e peça já o seu orçamento sem compromisso.
          </p>

          {/* Botões */}
          <div
            className={`mt-10 flex flex-col gap-4 sm:flex-row ${classeDeEntrada}`}
            style={{ transitionDelay: "450ms" }}
          >
            <Botao
              href={montarLinkDoWhatsapp()}
              novaAba
              variante="whatsapp"
              tamanho="grande"
              icone="whatsapp"
            >
              Orçamento pelo WhatsApp
            </Botao>

            <Botao
              variante="contorno"
              tamanho="grande"
              onClick={() => rolarAteSecao("servicos")}
            >
              Ver nossos serviços
            </Botao>
          </div>

          {/* Mini indicadores */}
          <div
            className={`mt-14 flex flex-wrap gap-x-10 gap-y-5 ${classeDeEntrada}`}
            style={{ transitionDelay: "600ms" }}
          >
            {[
              { valor: "12+", rotulo: "Anos de experiência" },
              { valor: "850+", rotulo: "Clientes atendidos" },
              { valor: "100%", rotulo: "Obra limpa e no prazo" },
            ].map((item) => (
              <div key={item.rotulo} className="flex items-center gap-3">
                <Icone nome="check" className="h-5 w-5 text-marca-400" />
                <div>
                  <p className="text-xl font-bold text-white">{item.valor}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {item.rotulo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Seta de rolagem */}
      <button
        type="button"
        onClick={() => rolarAteSecao("servicos")}
        aria-label="Rolar para os serviços"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-marca-400 md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Role</span>
        <Icone nome="seta-baixa" className="h-5 w-5 animate-descer-seta" />
      </button>
    </section>
  );
}
