// src/componentes/ui/Container.tsx

import type { ReactNode } from "react";
import { juntarClasses } from "@/utilitarios/formatadores";

interface PropriedadesDoContainer {
  children: ReactNode;
  className?: string;
}

/**
 * Centraliza o conteúdo e aplica a largura máxima padrão do site.
 */
export function Container({ children, className }: PropriedadesDoContainer) {
  return (
    <div
      className={juntarClasses(
        "mx-auto w-full max-w-7xl px-5 sm:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
