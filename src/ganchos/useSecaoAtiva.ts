// src/ganchos/useSecaoAtiva.ts

import { useEffect, useState } from "react";

/**
 * GANCHO: seção ativa no menu
 * -------------------------------------------------------------
 * Descobre qual seção está visível na tela para destacar o item
 * correspondente no menu do cabeçalho.
 */
export function useSecaoAtiva(
  idsDasSecoes: string[],
  deslocamento = 120,
): string {
  const [secaoAtiva, definirSecaoAtiva] = useState(idsDasSecoes[0] ?? "");

  useEffect(() => {
    let aguardandoQuadro = false;

    const verificar = () => {
      if (aguardandoQuadro) return;
      aguardandoQuadro = true;

      requestAnimationFrame(() => {
        const posicao = window.scrollY + deslocamento;
        let atual = idsDasSecoes[0] ?? "";

        for (const id of idsDasSecoes) {
          const elemento = document.getElementById(id);
          if (elemento && elemento.offsetTop <= posicao) {
            atual = id;
          }
        }

        // Se chegou ao fim da página, marca a última seção.
        const chegouAoFim =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
        if (chegouAoFim && idsDasSecoes.length > 0) {
          atual = idsDasSecoes[idsDasSecoes.length - 1];
        }

        definirSecaoAtiva(atual);
        aguardandoQuadro = false;
      });
    };

    verificar();
    window.addEventListener("scroll", verificar, { passive: true });
    window.addEventListener("resize", verificar);

    return () => {
      window.removeEventListener("scroll", verificar);
      window.removeEventListener("resize", verificar);
    };
  }, [idsDasSecoes, deslocamento]);

  return secaoAtiva;
}
