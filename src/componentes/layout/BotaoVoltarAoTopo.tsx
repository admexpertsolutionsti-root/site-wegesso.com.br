// src/componentes/layout/BotaoVoltarAoTopo.tsx

import { Icone } from "@/componentes/ui/Icone";
import { usePosicaoDaRolagem } from "@/ganchos/usePosicaoDaRolagem";
import { juntarClasses } from "@/utilitarios/formatadores";

/**
 * Botão "voltar ao topo" que surge depois de rolar a página.
 */
export function BotaoVoltarAoTopo() {
  const { passouDoLimite } = usePosicaoDaRolagem(600);

  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo da página"
      className={juntarClasses(
        "fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-escuro-800/80 text-marca-400 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-marca-400 hover:text-marca-300",
        passouDoLimite
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0",
      )}
    >
      <Icone nome="seta-cima" className="h-5 w-5" />
    </button>
  );
}
