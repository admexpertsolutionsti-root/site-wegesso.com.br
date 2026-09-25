// src/componentes/secoes/SecaoDepoimentos.tsx

import { Container } from "@/componentes/ui/Container";
import { TituloSecao } from "@/componentes/ui/TituloSecao";
import { Revelar } from "@/componentes/ui/Revelar";
import { Icone } from "@/componentes/ui/Icone";
import { Estrelas } from "@/componentes/ui/Estrelas";
import { depoimentos } from "@/dados/depoimentos";
import { useCarrossel } from "@/ganchos/useCarrossel";
import { juntarClasses } from "@/utilitarios/formatadores";

/**
 * SEÇÃO: DEPOIMENTOS
 * Carrossel com troca automática, pausa ao passar o mouse,
 * setas laterais e bolinhas de navegação.
 */
export function SecaoDepoimentos() {
  const { indiceAtual, irPara, proximo, anterior, pausar, retomar } =
    useCarrossel({
      total: depoimentos.length,
      intervaloEmMs: 6500,
    });

  return (
    <section id="depoimentos" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marca-600/5 blur-3xl" />

      <Container className="relative">
        <TituloSecao
          sobretitulo="O que os clientes acharam"
          titulo="Depoimentos de quem"
          destaque="já contratou"
          descricao="A satisfação de quem confia no nosso trabalho é o nosso melhor cartão de visitas."
        />

        <Revelar atraso={150}>
          <div
            className="relative mx-auto mt-16 max-w-3xl"
            onMouseEnter={pausar}
            onMouseLeave={retomar}
          >
            {/* Aspas decorativas */}
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[7rem] font-serif leading-none text-marca-500/15">
              &ldquo;
            </span>

            {/* Área do carrossel */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-escuro-800/60 px-6 py-12 sm:px-14">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${indiceAtual * 100}%)` }}
              >
                {depoimentos.map((depoimento) => (
                  <figure
                    key={depoimento.id}
                    className="w-full shrink-0 px-1 text-center"
                  >
                    <Estrelas
                      nota={depoimento.nota}
                      className="justify-center"
                    />

                    <blockquote className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                      {depoimento.texto}
                    </blockquote>

                    <figcaption className="mt-8 flex flex-col items-center">
                      <img
                        src={depoimento.avatar}
                        alt={depoimento.nome}
                        loading="lazy"
                        className="h-16 w-16 rounded-full border-2 border-marca-500/60 object-cover"
                      />
                      <span className="mt-3 font-semibold text-white">
                        {depoimento.nome}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-500">
                        {depoimento.cidade}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Setas */}
            <button
              type="button"
              onClick={anterior}
              aria-label="Depoimento anterior"
              className="absolute -left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-escuro-900 text-marca-400 transition-all duration-300 hover:border-marca-400 hover:bg-marca-500 hover:text-escuro-900 sm:-left-6"
            >
              <Icone nome="seta-esquerda" className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={proximo}
              aria-label="Próximo depoimento"
              className="absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-escuro-900 text-marca-400 transition-all duration-300 hover:border-marca-400 hover:bg-marca-500 hover:text-escuro-900 sm:-right-6"
            >
              <Icone nome="seta-direita" className="h-5 w-5" />
            </button>

            {/* Bolinhas */}
            <div className="mt-8 flex justify-center gap-2">
              {depoimentos.map((depoimento, indice) => (
                <button
                  key={depoimento.id}
                  type="button"
                  onClick={() => irPara(indice)}
                  aria-label={`Ver depoimento ${indice + 1}`}
                  className={juntarClasses(
                    "h-2 rounded-full transition-all duration-400",
                    indiceAtual === indice
                      ? "w-8 bg-marca-500"
                      : "w-2 bg-slate-600 hover:bg-slate-500",
                  )}
                />
              ))}
            </div>
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
