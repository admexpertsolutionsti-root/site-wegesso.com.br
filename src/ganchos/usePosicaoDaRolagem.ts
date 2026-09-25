// src/ganchos/usePosicaoDaRolagem.ts

import { useEffect, useState } from "react";

/**
 * GANCHO: posição da rolagem
 * -------------------------------------------------------------
 * Devolve quantos pixels a página já foi rolada e se passou do
 * limite informado (usado para o cabeçalho ficar sólido e para
 * exibir o botão "voltar ao topo").
 */
export function usePosicaoDaRolagem(limite = 60) {
  const [posicao, definirPosicao] = useState(0);
  const [passouDoLimite, definirPassouDoLimite] = useState(false);

  useEffect(() => {
    let aguardandoQuadro = false;

    const aoRolar = () => {
      if (aguardandoQuadro) return;
      aguardandoQuadro = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        definirPosicao(y);
        definirPassouDoLimite(y > limite);
        aguardandoQuadro = false;
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [limite]);

  return { posicao, passouDoLimite };
}
