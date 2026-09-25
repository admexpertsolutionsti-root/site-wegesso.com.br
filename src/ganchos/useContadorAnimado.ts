// src/ganchos/useContadorAnimado.ts

import { useEffect, useRef, useState } from "react";

/**
 * GANCHO: contador animado
 * -------------------------------------------------------------
 * Conta de 0 até `valorFinal` usando requestAnimationFrame,
 * começando somente quando `deveIniciar` for verdadeiro
 * (normalmente quando a seção entra na tela).
 */
export function useContadorAnimado(
  valorFinal: number,
  deveIniciar: boolean,
  duracaoEmMs = 2000,
): number {
  const [valorAtual, definirValorAtual] = useState(0);
  const jaAnimou = useRef(false);

  useEffect(() => {
    if (!deveIniciar || jaAnimou.current) return;
    jaAnimou.current = true;

    let quadro = 0;
    let inicio: number | null = null;

    // Suavização: rápido no começo, lento no fim.
    const suavizar = (t: number) => 1 - Math.pow(1 - t, 3);

    const passo = (agora: number) => {
      if (inicio === null) inicio = agora;
      const progresso = Math.min((agora - inicio) / duracaoEmMs, 1);

      definirValorAtual(Math.floor(suavizar(progresso) * valorFinal));

      if (progresso < 1) {
        quadro = requestAnimationFrame(passo);
      } else {
        definirValorAtual(valorFinal);
      }
    };

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [deveIniciar, valorFinal, duracaoEmMs]);

  return valorAtual;
}
