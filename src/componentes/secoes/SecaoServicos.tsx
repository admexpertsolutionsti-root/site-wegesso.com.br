// src/componentes/secoes/SecaoServicos.tsx

import { Container } from "@/componentes/ui/Container";
import { TituloSecao } from "@/componentes/ui/TituloSecao";
import { CartaoServico } from "@/componentes/ui/CartaoServico";
import { Botao } from "@/componentes/ui/Botao";
import { Revelar } from "@/componentes/ui/Revelar";
import { servicos } from "@/dados/servicos";
import { montarLinkDoWhatsapp } from "@/utilitarios/whatsapp";

/**
 * SEÇÃO: NOSSOS SERVIÇOS
 * Grade de cartões que sobem em cascata conforme entram na tela.
 */
export function SecaoServicos() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32">
      {/* brilho decorativo */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-marca-600/5 blur-3xl" />

      <Container className="relative">
        <TituloSecao
          sobretitulo="O que fazemos"
          titulo="Nossos"
          destaque="serviços"
          descricao="Trabalhamos com todas as soluções em gesso e drywall para deixar o seu ambiente mais bonito, confortável e valorizado."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico, indice) => (
            <CartaoServico
              key={servico.id}
              servico={servico}
              atraso={indice * 110}
            />
          ))}
        </div>

        <Revelar atraso={200} className="mt-16 text-center">
          <p className="text-sm text-slate-400">
            Não encontrou o serviço que precisa? Fale com a gente, atendemos
            projetos sob medida.
          </p>
          <Botao
            href={montarLinkDoWhatsapp(
              "Olá! Gostaria de falar sobre um projeto sob medida em gesso.",
            )}
            novaAba
            variante="primario"
            tamanho="grande"
            icone="whatsapp"
            className="mt-6"
          >
            Solicitar orçamento gratuito
          </Botao>
        </Revelar>
      </Container>
    </section>
  );
}
