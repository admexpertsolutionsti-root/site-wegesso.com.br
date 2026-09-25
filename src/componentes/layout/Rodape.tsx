// src/componentes/layout/Rodape.tsx

import { Container } from "@/componentes/ui/Container";
import { Icone } from "@/componentes/ui/Icone";
import { Logotipo } from "./Logotipo";
import { itensDeNavegacao } from "@/dados/navegacao";
import { servicos } from "@/dados/servicos";
import { configuracoesDoSite } from "@/configuracoes/site";
import {
  montarLinkDoWhatsapp,
  montarMensagemDeServico,
} from "@/utilitarios/whatsapp";
import { rolarAteSecao } from "@/utilitarios/formatadores";
import type { NomeDoIcone } from "@/tipos";

/** Redes sociais configuradas (ignora as que estiverem vazias) */
const redes: Array<{ nome: NomeDoIcone; url: string; rotulo: string }> = [
  {
    nome: "instagram",
    url: configuracoesDoSite.redesSociais.instagram,
    rotulo: "Instagram",
  },
  {
    nome: "facebook",
    url: configuracoesDoSite.redesSociais.facebook,
    rotulo: "Facebook",
  },
  {
    nome: "youtube",
    url: configuracoesDoSite.redesSociais.youtube,
    rotulo: "YouTube",
  },
];

export function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-escuro-950 pt-16">
      {/* brilho decorativo */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-marca-600/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Coluna 1 — marca */}
          <div className="lg:col-span-1">
            <Logotipo />
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {configuracoesDoSite.slogan}. Serviços de gesso e drywall em{" "}
              {configuracoesDoSite.cidade} e região, com acabamento de qualidade
              e preço justo.
            </p>

            <div className="mt-6 flex gap-3">
              {redes
                .filter((rede) => rede.url)
                .map((rede) => (
                  <a
                    key={rede.nome}
                    href={rede.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={rede.rotulo}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-marca-400 hover:text-marca-400"
                  >
                    <Icone nome={rede.nome} className="h-5 w-5" />
                  </a>
                ))}
            </div>
          </div>

          {/* Coluna 2 — navegação */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-marca-400">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3">
              {itensDeNavegacao.map((item) => (
                <li key={item.ancora}>
                  <button
                    type="button"
                    onClick={() => rolarAteSecao(item.ancora)}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-3 bg-marca-500 transition-all duration-300 group-hover:w-5" />
                    {item.rotulo}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — serviços */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-marca-400">
              Serviços
            </h3>
            <ul className="mt-5 space-y-3">
              {servicos.map((servico) => (
                <li key={servico.id}>
                  <a
                    href={montarLinkDoWhatsapp(
                      montarMensagemDeServico(servico.titulo),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-3 bg-marca-500 transition-all duration-300 group-hover:w-5" />
                    {servico.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — contato */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-marca-400">
              Contato
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li>
                <a
                  href={`tel:${configuracoesDoSite.telefone.replace(/\D/g, "")}`}
                  className="flex items-start gap-3 transition-colors hover:text-white"
                >
                  <Icone
                    nome="telefone"
                    className="mt-0.5 h-4 w-4 shrink-0 text-marca-400"
                  />
                  {configuracoesDoSite.telefone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${configuracoesDoSite.email}`}
                  className="flex items-start gap-3 break-all transition-colors hover:text-white"
                >
                  <Icone
                    nome="email"
                    className="mt-0.5 h-4 w-4 shrink-0 text-marca-400"
                  />
                  {configuracoesDoSite.email}
                </a>
              </li>
              <li>
                <a
                  href={configuracoesDoSite.linkDoMapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-white"
                >
                  <Icone
                    nome="local"
                    className="mt-0.5 h-4 w-4 shrink-0 text-marca-400"
                  />
                  {configuracoesDoSite.endereco}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icone
                  nome="relogio"
                  className="mt-0.5 h-4 w-4 shrink-0 text-marca-400"
                />
                {configuracoesDoSite.horarioDeAtendimento}
              </li>
            </ul>
          </div>
        </div>

        {/* Linha final */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-slate-500 sm:flex-row">
          <p>
            © {anoAtual} {configuracoesDoSite.nomeDaEmpresa} —{" "}
            {configuracoesDoSite.cidade}/{configuracoesDoSite.estado}. Todos os
            direitos reservados.
          </p>
          <p>Desenvolvido com React, TypeScript e Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
