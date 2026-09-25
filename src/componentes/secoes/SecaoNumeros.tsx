// src/componentes/secoes/SecaoNumeros.tsx

import { Container } from "@/componentes/ui/Container";
import { numeros } from "@/dados/diferenciais";
import { useRevelarAoRolar } from "@/ganchos/useRevelarAoRolar";
import { useContadorAnimado } from "@/ganchos/useContadorAnimado";
import { juntarClasses } from "@/utilitarios/formatadores";
import type { Numero } from "@/tipos";

/** Um contador individual */
function Contador({
  numero,
  deveIniciar,
  atraso,
}: {
  numero: Numero;
  deveIniciar: boolean;
  atraso: number;
}) {
  const valor = useContadorAnimado(numero.valor, deveIniciar, 2200);

  return (
    <div
      className={juntarClasses(
        "group text-center transition-all duration-700",
        deveIniciar ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${atraso}ms` }}
    >
      <p className="text-4xl font-extrabold text-marca-400 transition-transform duration-500 group-hover:scale-110 sm:text-5xl">
        {valor}
        <span className="text-marca-300">{numero.sufixo}</span>
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {numero.rotulo}
      </p>
    </div>
  );
}

/**
 * SEÇÃO: NÚMEROS
 * Faixa com foto de fundo fixa (parallax) e contadores animados.
 */
export function SecaoNumeros() {
  const { referencia, estaVisivel } = useRevelarAoRolar<HTMLDivElement>({
    limite: 0.35,
  });

  return (
    <section className="relative overflow-hidden py-20">
      {/* Fundo fixo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=70')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-escuro-950/90" />

      <Container>
        <div
          ref={referencia}
          className="grid grid-cols-2 gap-10 lg:grid-cols-4"
        >
          {numeros.map((numero, indice) => (
            <Contador
              key={numero.id}
              numero={numero}
              deveIniciar={estaVisivel}
              atraso={indice * 130}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
