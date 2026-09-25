// src/componentes/secoes/SecaoSobre.tsx

import { Container } from "@/componentes/ui/Container";
import { Revelar } from "@/componentes/ui/Revelar";
import { Botao } from "@/componentes/ui/Botao";
import { Icone } from "@/componentes/ui/Icone";
import { qualidades } from "@/dados/diferenciais";
import { configuracoesDoSite } from "@/configuracoes/site";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";

/**
 * SEÇÃO: SOBRE / QUALIDADE E CONFIANÇA
 * Duas colunas: imagens sobrepostas (com selo de anos) + texto e lista.
 */
export function SecaoSobre() {
  const anosDeAtuacao =
    new Date().getFullYear() - configuracoesDoSite.anoDeFundacao;

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-escuro-950 py-24 lg:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Coluna das imagens */}
          <Revelar direcao="esquerda">
            <div className="relative">
              <div className="fundo-gesso-imagem overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="/imagens/photo-reformaEmGesso.jpg"
                  alt="Ambiente com forro de gesso finalizado"
                  loading="lazy"
                  className="h-[26rem] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </div>

              {/* Imagem menor sobreposta */}
              <div className="fundo-gesso-imagem absolute -bottom-10 -right-4 hidden w-56 overflow-hidden rounded-2xl border-4 border-escuro-950 shadow-2xl sm:block lg:-right-10">
                <img
                  src="/imagens/photo-reformaEmGesso1.jpg"
                  alt="Profissional trabalhando com gesso"
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
              </div>

              {/* Selo de anos */}
              <div className="absolute -left-4 -top-6 flex h-28 w-28 animate-flutuar flex-col items-center justify-center rounded-2xl bg-marca-500 text-escuro-900 shadow-xl lg:-left-8">
                <span className="text-3xl font-extrabold leading-none">
                  {anosDeAtuacao}
                </span>
                <span className="mt-1 px-2 text-center text-[0.6rem] font-bold uppercase leading-tight tracking-wider">
                  Anos de experiência
                </span>
              </div>
            </div>
          </Revelar>

          {/* Coluna do texto */}
          <div>
            <Revelar direcao="direita">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-marca-400">
                <span className="h-px w-8 bg-marca-500" />
                Qualidade e confiança
              </span>
            </Revelar>

            <Revelar direcao="direita" atraso={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Renove a sua casa com quem{" "}
                <span className="texto-gradiente">entende de gesso</span>
              </h2>
            </Revelar>

            <Revelar direcao="direita" atraso={180}>
              <p className="mt-6 leading-relaxed text-slate-400">
                Somos uma equipe qualificada para realizar o seu projeto do
                início ao fim: reparos, reformas, drywall, forros, sancas e
                molduras. Encontramos a melhor maneira de tirar a sua ideia do
                papel, com organização, prazo cumprido e obra limpa.
              </p>
            </Revelar>

            <Revelar direcao="direita" atraso={240}>
              <p className="mt-4 leading-relaxed text-slate-400">
                Devido à praticidade e ao custo-benefício, o drywall se tornou
                tendência nos últimos anos, possibilitando uma ampla variedade
                de estilos de decoração. Para garantir o melhor resultado, é
                essencial contar com um profissional experiente.
              </p>
            </Revelar>

            {/* Lista de qualidades */}
            <ul className="mt-9 space-y-4">
              {qualidades.map((qualidade, indice) => (
                <Revelar
                  key={qualidade}
                  direcao="direita"
                  atraso={300 + indice * 90}
                  como="li"
                >
                  <div className="group flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marca-500/15 text-marca-400 transition-all duration-300 group-hover:bg-marca-500 group-hover:text-escuro-900">
                      <Icone nome="check" className="h-4 w-4" />
                    </span>
                    <span className="text-slate-300 transition-colors group-hover:text-white">
                      {qualidade}
                    </span>
                  </div>
                </Revelar>
              ))}
            </ul>

            <Revelar direcao="direita" atraso={700}>
              <Botao
                href={montarLinkDoWhatsapp()}
                novaAba
                variante="whatsapp"
                tamanho="grande"
                icone="whatsapp"
                className="mt-10"
              >
                Falar com um especialista
              </Botao>
            </Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
