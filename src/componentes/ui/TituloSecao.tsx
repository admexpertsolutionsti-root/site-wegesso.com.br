// src/componentes/ui/TituloSecao.tsx

import { Revelar } from "./Revelar";
import { juntarClasses } from "@/utilitarios/formatadores";

interface PropriedadesDoTitulo {
  /** Texto pequeno acima do título (ex.: "Nossos serviços") */
  sobretitulo?: string;
  titulo: string;
  /** Parte do título destacada em dourado */
  destaque?: string;
  descricao?: string;
  /** Alinhamento do bloco. Padrão: centro */
  alinhamento?: "centro" | "esquerda";
  className?: string;
}

/**
 * Cabeçalho padrão das seções (sobretítulo + título + descrição).
 */
export function TituloSecao({
  sobretitulo,
  titulo,
  destaque,
  descricao,
  alinhamento = "centro",
  className,
}: PropriedadesDoTitulo) {
  const centralizado = alinhamento === "centro";

  return (
    <div
      className={juntarClasses(
        "max-w-3xl",
        centralizado ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {sobretitulo && (
        <Revelar>
          <span
            className={juntarClasses(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-marca-400",
              centralizado && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-marca-500" />
            {sobretitulo}
            {centralizado && <span className="h-px w-8 bg-marca-500" />}
          </span>
        </Revelar>
      )}

      <Revelar atraso={100}>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
          {titulo}{" "}
          {destaque && <span className="texto-gradiente">{destaque}</span>}
        </h2>
      </Revelar>

      {descricao && (
        <Revelar atraso={200}>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            {descricao}
          </p>
        </Revelar>
      )}
    </div>
  );
}
