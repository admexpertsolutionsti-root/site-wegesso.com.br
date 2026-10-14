// src/componentes/secoes/SecaoContato.tsx

import { useState } from "react";
import type { FormEvent } from "react";
import { Container } from "@/componentes/ui/Container";
import { TituloSecao } from "@/componentes/ui/TituloSecao";
import { Revelar } from "@/componentes/ui/Revelar";
import { Icone } from "@/componentes/ui/Icone";
import { Botao } from "@/componentes/ui/Botao";
import { servicos } from "@/dados/servicos";
import { configuracoesDoSite } from "@/configuracoes/site";
import {
  montarLinkDoWhatsapp,
  montarMensagemDoFormulario,
} from "@/utilitarios/whatsapp";
import {
  aplicarMascaraDeTelefone,
  juntarClasses,
} from "@/utilitarios/formatadores";

/** Estado inicial do formulário */
const formularioVazio = {
  nome: "",
  telefone: "",
  servico: "",
  mensagem: "",
};

type Formulario = typeof formularioVazio;
type Erros = Partial<Record<keyof Formulario, string>>;

/**
 * SEÇÃO: CONTATO
 * -------------------------------------------------------------
 * O formulário NÃO envia e-mail: ele valida os campos, monta a
 * mensagem formatada e abre o WhatsApp já com tudo preenchido.
 * É a forma mais simples e com maior taxa de resposta.
 */
export function SecaoContato() {
  const [formulario, definirFormulario] = useState<Formulario>(formularioVazio);
  const [erros, definirErros] = useState<Erros>({});
  const [enviado, definirEnviado] = useState(false);

  const atualizarCampo = (campo: keyof Formulario, valor: string) => {
    definirFormulario((atual) => ({
      ...atual,
      [campo]: campo === "telefone" ? aplicarMascaraDeTelefone(valor) : valor,
    }));
    definirErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const validar = (): boolean => {
    const novosErros: Erros = {};

    if (formulario.nome.trim().length < 3) {
      novosErros.nome = "Informe o seu nome completo.";
    }
    if (formulario.telefone.replace(/\D/g, "").length < 10) {
      novosErros.telefone = "Informe um telefone válido com DDD.";
    }
    if (!formulario.servico) {
      novosErros.servico = "Escolha o serviço desejado.";
    }

    definirErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const aoEnviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (!validar()) return;

    const mensagem = montarMensagemDoFormulario(formulario);
    window.open(
      montarLinkDoWhatsapp(mensagem),
      "_blank",
      "noopener,noreferrer",
    );

    definirEnviado(true);
    definirFormulario(formularioVazio);
    window.setTimeout(() => definirEnviado(false), 6000);
  };

  /** Classe base dos campos */
  const classeDoCampo = (temErro?: string) =>
    juntarClasses(
      "w-full rounded-xl border bg-escuro-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500",
      "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-marca-500/40",
      temErro
        ? "border-red-500/70 focus:border-red-500"
        : "border-white/10 focus:border-marca-500",
    );

  const dadosDeContato = [
    {
      icone: "telefone" as const,
      rotulo: "Telefone / WhatsApp",
      valor: configuracoesDoSite.telefone,
      link: `tel:${configuracoesDoSite.telefone.replace(/\D/g, "")}`,
    },
    {
      icone: "email" as const,
      rotulo: "E-mail",
      valor: configuracoesDoSite.email,
      link: `mailto:${configuracoesDoSite.email}`,
    },
    {
      icone: "local" as const,
      rotulo: "Endereço",
      valor: configuracoesDoSite.endereco,
      link: configuracoesDoSite.linkDoMapa,
    },
    {
      icone: "relogio" as const,
      rotulo: "Atendimento",
      valor: configuracoesDoSite.horarioDeAtendimento,
      link: "",
    },
  ];

  return (
    <section id="contato" className="relative bg-escuro-950 py-24 lg:py-32">
      <Container>
        <TituloSecao
          sobretitulo="Fale conosco"
          titulo="Peça agora o seu"
          destaque="orçamento"
          descricao="Preencha os campos abaixo e nós abriremos o WhatsApp com a sua mensagem pronta. Rápido, direto e sem compromisso."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Coluna de informações */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {dadosDeContato.map((item, indice) => {
                const conteudo = (
                  <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-escuro-800/50 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-marca-500/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marca-500/10 text-marca-400 transition-all duration-400 group-hover:bg-marca-500 group-hover:text-escuro-900">
                      <Icone nome={item.icone} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.rotulo}
                      </p>
                      <p className="mt-1 break-words text-sm text-white">
                        {item.valor}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <Revelar
                    key={item.rotulo}
                    direcao="esquerda"
                    atraso={indice * 100}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target={
                          item.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block"
                      >
                        {conteudo}
                      </a>
                    ) : (
                      conteudo
                    )}
                  </Revelar>
                );
              })}
            </div>

            <Revelar direcao="esquerda" atraso={450}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Localização no mapa"
                  src="https://www.google.com/maps?q=-22.9728095%2C-47.1171554&output=embed"
                  className="h-56 w-full grayscale transition-all duration-700 hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Revelar>
          </div>

          {/* Formulário */}
          <Revelar direcao="direita" atraso={150} className="lg:col-span-3">
            <form
              onSubmit={aoEnviar}
              noValidate
              className="rounded-3xl border border-white/10 bg-escuro-800/60 p-7 sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Nome */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="campo-nome"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Nome *
                  </label>
                  <input
                    id="campo-nome"
                    type="text"
                    value={formulario.nome}
                    onChange={(evento) =>
                      atualizarCampo("nome", evento.target.value)
                    }
                    placeholder="Seu nome completo"
                    className={classeDoCampo(erros.nome)}
                  />
                  {erros.nome && (
                    <p className="mt-1.5 text-xs text-red-400">{erros.nome}</p>
                  )}
                </div>

                {/* Telefone */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="campo-telefone"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Telefone *
                  </label>
                  <input
                    id="campo-telefone"
                    type="tel"
                    inputMode="numeric"
                    value={formulario.telefone}
                    onChange={(evento) =>
                      atualizarCampo("telefone", evento.target.value)
                    }
                    placeholder="(19) 99999-9999"
                    className={classeDoCampo(erros.telefone)}
                  />
                  {erros.telefone && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {erros.telefone}
                    </p>
                  )}
                </div>

                {/* Serviço */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="campo-servico"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Serviço desejado *
                  </label>
                  <select
                    id="campo-servico"
                    value={formulario.servico}
                    onChange={(evento) =>
                      atualizarCampo("servico", evento.target.value)
                    }
                    className={classeDoCampo(erros.servico)}
                  >
                    <option value="">Selecione uma opção</option>
                    {servicos.map((servico) => (
                      <option key={servico.id} value={servico.titulo}>
                        {servico.titulo}
                      </option>
                    ))}
                    <option value="Outro serviço">Outro serviço</option>
                  </select>
                  {erros.servico && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {erros.servico}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="campo-mensagem"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="campo-mensagem"
                    rows={5}
                    value={formulario.mensagem}
                    onChange={(evento) =>
                      atualizarCampo("mensagem", evento.target.value)
                    }
                    placeholder="Conte um pouco sobre o seu projeto: metragem, ambiente, prazo..."
                    className={juntarClasses(classeDoCampo(), "resize-none")}
                  />
                </div>
              </div>

              <Botao
                type="submit"
                variante="whatsapp"
                tamanho="grande"
                icone="whatsapp"
                className="mt-7 w-full"
              >
                Enviar pelo WhatsApp
              </Botao>

              {/* Confirmação */}
              <div
                className={juntarClasses(
                  "mt-4 flex items-center gap-3 rounded-xl border border-zap/30 bg-zap/10 px-4 py-3 text-sm text-zap transition-all duration-500",
                  enviado
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <Icone nome="check" className="h-5 w-5 shrink-0" />
                WhatsApp aberto em outra aba. Se não abriu, verifique o
                bloqueador de pop-ups do navegador.
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Seus dados são usados apenas para montar a mensagem do WhatsApp.
                Nada é armazenado.
              </p>
            </form>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}
