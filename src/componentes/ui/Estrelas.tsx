// src/componentes/ui/Estrelas.tsx

import { Icone } from "./Icone";
import { juntarClasses } from "@/utilitarios/formatadores";

interface PropriedadesDasEstrelas {
  nota: number;
  className?: string;
}

/** Exibe de 1 a 5 estrelas conforme a nota informada. */
export function Estrelas({ nota, className }: PropriedadesDasEstrelas) {
  return (
    <div
      className={juntarClasses("flex items-center gap-1", className)}
      aria-label={`Nota ${nota} de 5`}
    >
      {Array.from({ length: 5 }).map((_, indice) => (
        <Icone
          key={indice}
          nome="estrela"
          className={juntarClasses(
            "h-4 w-4",
            indice < nota ? "text-marca-400" : "text-slate-600",
          )}
        />
      ))}
    </div>
  );
}
