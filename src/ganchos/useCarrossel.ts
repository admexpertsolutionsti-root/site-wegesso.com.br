// src/ganchos/useCarrossel.ts

import { useCallback, useEffect, useRef, useState } from "react";

interface OpcoesDoCarrossel {
  /** Quantidade total de slides */
  total: number;
  /** Tempo entre trocas automáticas, em ms. Use 0 para desligar. */
  intervaloEmMs?: number;
}

/**
 * GANCHO: carrossel
 * -------------------------------------------------------------
 * Controla o índice atual, avança/volta em looping e faz a
 * troca automática (pausando quando o mouse está por cima).
 */
export function useCarrossel({
  total,
  intervaloEmMs = 6000,
}: OpcoesDoCarrossel) {
  const [indiceAtual, definirIndiceAtual] = useState(0);
  const [estaPausado, definirEstaPausado] = useState(false);
  const temporizador = useRef<number | null>(null);

  const irPara = useCallback(
    (indice: number) => {
      if (total === 0) return;
      definirIndiceAtual(((indice % total) + total) % total);
    },
    [total],
  );

  const proximo = useCallback(
    () => irPara(indiceAtual + 1),
    [indiceAtual, irPara],
  );
  const anterior = useCallback(
    () => irPara(indiceAtual - 1),
    [indiceAtual, irPara],
  );

  useEffect(() => {
    if (intervaloEmMs <= 0 || estaPausado || total <= 1) return;

    temporizador.current = window.setInterval(() => {
      definirIndiceAtual((atual) => (atual + 1) % total);
    }, intervaloEmMs);

    return () => {
      if (temporizador.current) window.clearInterval(temporizador.current);
    };
  }, [intervaloEmMs, estaPausado, total]);

  return {
    indiceAtual,
    irPara,
    proximo,
    anterior,
    pausar: () => definirEstaPausado(true),
    retomar: () => definirEstaPausado(false),
  };
}
