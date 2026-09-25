// src/App.tsx

import { Cabecalho } from "@/componentes/layout/Cabecalho";
import { Rodape } from "@/componentes/layout/Rodape";
import { BotaoWhatsappFlutuante } from "@/componentes/layout/BotaoWhatsappFlutuante";
import { BotaoVoltarAoTopo } from "@/componentes/layout/BotaoVoltarAoTopo";

import { SecaoInicio } from "@/componentes/secoes/SecaoInicio";
import { SecaoServicos } from "@/componentes/secoes/SecaoServicos";
import { SecaoSobre } from "@/componentes/secoes/SecaoSobre";
import { SecaoNumeros } from "@/componentes/secoes/SecaoNumeros";
import { SecaoDiferenciais } from "@/componentes/secoes/SecaoDiferenciais";
import { SecaoGaleria } from "@/componentes/secoes/SecaoGaleria";
import { SecaoDepoimentos } from "@/componentes/secoes/SecaoDepoimentos";
import { SecaoChamada } from "@/componentes/secoes/SecaoChamada";
import { SecaoContato } from "@/componentes/secoes/SecaoContato";

/**
 * COMPONENTE RAIZ
 * -------------------------------------------------------------
 * A ordem das seções abaixo é a ordem que aparece na página.
 * Para reorganizar o site, basta mover as linhas de lugar.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-escuro-900">
      <Cabecalho />

      <main>
        <SecaoInicio />
        <SecaoServicos />
        <SecaoSobre />
        <SecaoNumeros />
        <SecaoDiferenciais />
        <SecaoGaleria />
        <SecaoDepoimentos />
        <SecaoChamada />
        <SecaoContato />
      </main>

      <Rodape />

      {/* Botões flutuantes */}
      <BotaoWhatsappFlutuante />
      <BotaoVoltarAoTopo />
    </div>
  );
}
