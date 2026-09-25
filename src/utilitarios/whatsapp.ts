// src/utilitarios/whatsapp.ts

import { configuracoesDoSite } from "@/configuracoes/site";

/**
 * Monta o link do WhatsApp já com a mensagem preenchida.
 *
 * @param mensagem Texto opcional. Se não for informado, usa a mensagem padrão.
 */
export function montarLinkDoWhatsapp(mensagem?: string): string {
  const texto = mensagem?.trim() || configuracoesDoSite.mensagemPadraoWhatsapp;
  return `https://wa.me/${configuracoesDoSite.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/**
 * Mensagem específica para pedir orçamento de um serviço.
 */
export function montarMensagemDeServico(nomeDoServico: string): string {
  return `Olá! Vim pelo site e gostaria de um orçamento para *${nomeDoServico}*.`;
}

/**
 * Abre o WhatsApp em uma nova aba.
 */
export function abrirWhatsapp(mensagem?: string): void {
  window.open(montarLinkDoWhatsapp(mensagem), "_blank", "noopener,noreferrer");
}

/**
 * Monta a mensagem do formulário de contato.
 */
export function montarMensagemDoFormulario(dados: {
  nome: string;
  telefone: string;
  servico: string;
  mensagem: string;
}): string {
  return [
    "Olá! Vim pelo site e gostaria de solicitar um orçamento.",
    "",
    `*Nome:* ${dados.nome}`,
    `*Telefone:* ${dados.telefone}`,
    `*Serviço:* ${dados.servico}`,
    `*Mensagem:* ${dados.mensagem || "—"}`,
  ].join("\n");
}
