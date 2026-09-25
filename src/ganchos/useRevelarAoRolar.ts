// src/ganchos/useRevelarAoRolar.ts

import { useEffect, useRef, useState } from "react";

interface OpcoesDaRevelacao {
  /** Percentual do elemento visível para disparar (0 a 1). Padrão: 0.15 */
  limite?: number;
  /** Se true, a animação acontece só uma vez. Padrão: true */
  apenasUmaVez?: boolean;
  /** Margem extra para antecipar o disparo. Padrão: '0px 0px -60px 0px' */
  margem?: string;
}

/**
 * GANCHO: revelar ao rolar
 * -------------------------------------------------------------
 * Observa o elemento e devolve `estaVisivel = true` quando ele
 * entra na área visível da tela. Use junto com as classes
 * `revelar` / `esta-visivel` definidas em `estilos/globais.css`.
 *
 * Exemplo:
 *   const { referencia, estaVisivel } = useRevelarAoRolar()
 *   <div ref={referencia} className={`revelar ${estaVisivel ? 'esta-visivel' : ''}`} />
 */
export function useRevelarAoRolar<T extends HTMLElement = HTMLDivElement>(
  opcoes: OpcoesDaRevelacao = {},
) {
  const {
    limite = 0.15,
    apenasUmaVez = true,
    margem = "0px 0px -60px 0px",
  } = opcoes;

  const referencia = useRef<T | null>(null);
  const [estaVisivel, definirEstaVisivel] = useState(false);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    // Navegadores muito antigos: mostra direto, sem animação.
    if (typeof IntersectionObserver === "undefined") {
      definirEstaVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          definirEstaVisivel(true);
          if (apenasUmaVez) observador.unobserve(elemento);
        } else if (!apenasUmaVez) {
          definirEstaVisivel(false);
        }
      },
      { threshold: limite, rootMargin: margem },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [limite, apenasUmaVez, margem]);

  return { referencia, estaVisivel };
}
