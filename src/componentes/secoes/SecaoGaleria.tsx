// src/componentes/secoes/SecaoGaleria.tsx

import { useEffect, useState } from "react";
import { Container } from "@/componentes/ui/Container";
import { TituloSecao } from "@/componentes/ui/TituloSecao";
import { Revelar } from "@/componentes/ui/Revelar";
import { Icone } from "@/componentes/ui/Icone";
import { categoriasDaGaleria, itensDaGaleria } from "@/dados/galeria";
import { useTravarRolagem } from "@/ganchos/useTravarRolagem";
import { juntarClasses } from "@/utilitarios/formatadores";

/**
 * SEÇÃO: GALERIA DE TRABALHOS
 * Efeitos:
 *  - filtro por categoria com transição suave;
 *  - zoom e legenda deslizante no hover;
 *  - lightbox (imagem ampliada) com navegação por teclado.
 */
export function SecaoGaleria() {
  const [categoriaAtiva, definirCategoriaAtiva] = useState("Todos");
  const [indiceAmpliado, definirIndiceAmpliado] = useState<number | null>(null);

  const categorias = ["Todos", ...categoriasDaGaleria];

  const itensFiltrados =
    categoriaAtiva === "Todos"
      ? itensDaGaleria
      : itensDaGaleria.filter((item) => item.categoria === categoriaAtiva);

  useTravarRolagem(indiceAmpliado !== null);

  // Navegação da lightbox pelo teclado
  useEffect(() => {
    if (indiceAmpliado === null) return;

    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") definirIndiceAmpliado(null);
      if (evento.key === "ArrowRight")
        definirIndiceAmpliado((atual) =>
          atual === null ? null : (atual + 1) % itensFiltrados.length,
        );
      if (evento.key === "ArrowLeft")
        definirIndiceAmpliado((atual) =>
          atual === null
            ? null
            : (atual - 1 + itensFiltrados.length) % itensFiltrados.length,
        );
    };

    window.addEventListener("keydown", aoPressionar);
    return () => window.removeEventListener("keydown", aoPressionar);
  }, [indiceAmpliado, itensFiltrados.length]);

  const itemAmpliado =
    indiceAmpliado !== null ? itensFiltrados[indiceAmpliado] : null;

  return (
    <section id="galeria" className="relative bg-escuro-950 py-24 lg:py-32">
      <Container>
        <TituloSecao
          sobretitulo="Portfólio"
          titulo="Alguns dos nossos"
          destaque="trabalhos"
          descricao="Cada projeto é executado com atenção aos detalhes. Veja alguns resultados entregues aos nossos clientes."
        />

        {/* Filtros */}
        <Revelar atraso={150}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => {
                  definirCategoriaAtiva(categoria);
                  definirIndiceAmpliado(null);
                }}
                className={juntarClasses(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                  categoriaAtiva === categoria
                    ? "border-marca-500 bg-marca-500 text-escuro-900 shadow-lg shadow-marca-500/25"
                    : "border-white/12 text-slate-400 hover:border-marca-400 hover:text-marca-300",
                )}
              >
                {categoria}
              </button>
            ))}
          </div>
        </Revelar>

        {/* Grade de fotos */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {itensFiltrados.map((item, indice) => (
            <Revelar
              key={item.id}
              direcao="zoom"
              atraso={indice * 70}
              className={juntarClasses(
                // dá destaque à primeira e à sexta foto
                indice === 0 || indice === 5
                  ? "lg:col-span-2 lg:row-span-2"
                  : "",
              )}
            >
              <button
                type="button"
                onClick={() => definirIndiceAmpliado(indice)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  loading="lazy"
                  className={juntarClasses(
                    "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
                    indice === 0 || indice === 5
                      ? "h-64 lg:h-full"
                      : "h-44 sm:h-56",
                  )}
                />

                {/* camada escura + legenda */}
                <span className="absolute inset-0 bg-linear-to-t from-escuro-950 via-escuro-950/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-marca-400">
                    {item.categoria}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-snug text-white">
                    {item.titulo}
                  </span>
                </span>

                {/* ícone de lupa */}
                <span className="absolute right-4 top-4 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-marca-500 text-escuro-900 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                  </svg>
                </span>
              </button>
            </Revelar>
          ))}
        </div>
      </Container>

      {/* LIGHTBOX */}
      {itemAmpliado && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          onClick={() => definirIndiceAmpliado(null)}
          role="dialog"
          aria-modal="true"
          aria-label={itemAmpliado.titulo}
        >
          <button
            type="button"
            onClick={() => definirIndiceAmpliado(null)}
            aria-label="Fechar imagem"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-marca-400 hover:text-marca-400"
          >
            <Icone nome="fechar" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation();
              definirIndiceAmpliado((atual) =>
                atual === null
                  ? null
                  : (atual - 1 + itensFiltrados.length) % itensFiltrados.length,
              );
            }}
            aria-label="Imagem anterior"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-marca-400 hover:text-marca-400 sm:left-8"
          >
            <Icone nome="seta-esquerda" className="h-5 w-5" />
          </button>

          <figure
            onClick={(evento) => evento.stopPropagation()}
            className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
          >
            <img
              src={itemAmpliado.imagem}
              alt={itemAmpliado.titulo}
              className="max-h-[75vh] w-full object-contain"
            />
            <figcaption className="bg-escuro-900 px-5 py-4 text-center">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-marca-400">
                {itemAmpliado.categoria}
              </p>
              <p className="mt-1 text-sm text-white">{itemAmpliado.titulo}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation();
              definirIndiceAmpliado((atual) =>
                atual === null ? null : (atual + 1) % itensFiltrados.length,
              );
            }}
            aria-label="Próxima imagem"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-marca-400 hover:text-marca-400 sm:right-8"
          >
            <Icone nome="seta-direita" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
