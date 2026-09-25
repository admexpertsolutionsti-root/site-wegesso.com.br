// src/ganchos/useTravarRolagem.ts

import { useEffect } from "react";

/**
 * GANCHO: travar a rolagem da página
 * -------------------------------------------------------------
 * Usado quando o menu mobile ou a lightbox da galeria estão
 * abertos, para o fundo não rolar junto.
 */
export function useTravarRolagem(estaTravado: boolean): void {
  useEffect(() => {
    if (!estaTravado) return;

    const estiloOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = estiloOriginal;
    };
  }, [estaTravado]);
}
