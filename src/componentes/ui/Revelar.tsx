// src/componentes/ui/Revelar.tsx

import type { ReactNode } from "react";
import { juntarClasses } from "@/utilitarios/formatadores";
import { useRevelarAoRolar } from "@/ganchos/useRevelarAoRolar";
import type { DirecaoDaRevelacao } from "@/tipos";

interface PropriedadesDaRevelacao {
  children: ReactNode;
  /** Direção da entrada do elemento */
  direcao?: DirecaoDaRevelacao;
  /** Atraso em milissegundos (efeito cascata em listas) */
  atraso?: number;
  className?: string;
  /** Tag HTML gerada. Padrão: div */
  como?: "div" | "li" | "section" | "article" | "span";
}

const classesPorDirecao: Record<DirecaoDaRevelacao, string> = {
  baixo: "revelar",
  esquerda: "revelar-esquerda",
  direita: "revelar-direita",
  zoom: "revelar-zoom",
};

/**
 * COMPONENTE: Revelar
 * -------------------------------------------------------------
 * Envolve qualquer conteúdo e o anima quando entra na tela.
 *
 * Exemplo:
 *   <Revelar direcao="esquerda" atraso={150}>
 *     <h2>Meu título</h2>
 *   </Revelar>
 */
export function Revelar({
  children,
  direcao = "baixo",
  atraso = 0,
  className,
  como: Tag = "div",
}: PropriedadesDaRevelacao) {
  const { referencia, estaVisivel } = useRevelarAoRolar<HTMLDivElement>();

  return (
    <Tag
      ref={referencia as never}
      className={juntarClasses(
        classesPorDirecao[direcao],
        estaVisivel && "esta-visivel",
        className,
      )}
      style={{ transitionDelay: `${atraso}ms` }}
    >
      {children}
    </Tag>
  );
}
