// src/componentes/secoes/SecaoChamada.tsx

import { Container } from "@/componentes/ui/Container";
import { Revelar } from "@/componentes/ui/Revelar";
import { Botao } from "@/componentes/ui/Botao";
import { configuracoesDoSite } from "@/configuracoes/site";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";

/**
 * SEÇÃO: CHAMADA PARA AÇÃO (faixa dourada antes do rodapé)
 */
export function SecaoChamada() {
  return (
    <section className="relative overflow-hidden py-20">
      <Container>
        <Revelar direcao="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-marca-500 via-marca-500 to-marca-600 px-8 py-14 text-center sm:px-14">
            {/* formas decorativas */}
            <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <span className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-escuro-900/10" />

            <h2 className="relative text-3xl font-extrabold leading-tight text-escuro-900 sm:text-4xl">
              Procurando gesso ou gesseiro em {configuracoesDoSite.cidade}?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-escuro-900/80">
              Chame a nossa equipe pelo WhatsApp, descreva o que você precisa e
              receba um orçamento rápido, transparente e sem compromisso.
            </p>

            <div className="relative mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Botao
                href={montarLinkDoWhatsapp()}
                novaAba
                variante="secundario"
                tamanho="grande"
                icone="whatsapp"
              >
                Chamar no WhatsApp
              </Botao>

              <Botao
                href={`tel:${configuracoesDoSite.telefone.replace(/\D/g, "")}`}
                variante="contorno"
                tamanho="grande"
                icone="telefone"
                className="border-escuro-900/30 text-escuro-900 hover:border-escuro-900 hover:bg-escuro-900/5 hover:text-escuro-900"
              >
                {configuracoesDoSite.telefone}
              </Botao>
            </div>
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
