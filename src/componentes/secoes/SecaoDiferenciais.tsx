// src/componentes/secoes/SecaoDiferenciais.tsx

import { Container } from "@/componentes/ui/Container";
import { TituloSecao } from "@/componentes/ui/TituloSecao";
import { Revelar } from "@/componentes/ui/Revelar";
import { Icone } from "@/componentes/ui/Icone";
import { diferenciais } from "@/dados/diferenciais";

/**
 * SEÇÃO: PRINCIPAIS DIFERENCIAIS
 * Cartões com ícone que giram levemente e ganham borda dourada no hover.
 */
export function SecaoDiferenciais() {
  return (
    <section id="diferenciais" className="relative py-24 lg:py-32">
      <Container>
        <TituloSecao
          sobretitulo="Por que nos escolher"
          titulo="Principais"
          destaque="diferenciais"
          descricao="Mais do que executar um serviço, entregamos tranquilidade do orçamento até a limpeza final da obra."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {diferenciais.map((diferencial, indice) => (
            <Revelar key={diferencial.id} direcao="zoom" atraso={indice * 140}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-escuro-800/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-marca-500/40 hover:bg-escuro-800">
                {/* halo que aparece no hover */}
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-marca-500/0 blur-3xl transition-all duration-700 group-hover:bg-marca-500/20" />

                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-marca-500/25 bg-marca-500/10 text-marca-400 transition-all duration-500 group-hover:rotate-6 group-hover:bg-marca-500 group-hover:text-escuro-900">
                  <Icone nome={diferencial.icone} className="h-8 w-8" />
                </span>

                <h3 className="relative mt-7 text-xl font-bold text-white">
                  {diferencial.titulo}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
                  {diferencial.descricao}
                </p>

                {/* número decorativo */}
                <span className="pointer-events-none absolute bottom-4 right-6 text-6xl font-extrabold text-white/5 transition-colors duration-500 group-hover:text-marca-500/10">
                  0{indice + 1}
                </span>
              </div>
            </Revelar>
          ))}
        </div>
      </Container>
    </section>
  );
}
