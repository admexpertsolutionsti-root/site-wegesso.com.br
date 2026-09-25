// src/configuracoes/site.ts

/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO
 * -------------------------------------------------------------
 * Este é o único arquivo que você precisa editar para adaptar
 * o site a outro cliente/empresa (nome, telefone, WhatsApp,
 * endereço, redes sociais e textos principais).
 */

export const configuracoesDoSite = {
  /** Identidade */
  nomeDaEmpresa: "WGessos",
  slogan: "A solução ideal em gesso para você",
  cidade: "Campinas",
  estado: "SP",

  /** Contato */
  telefone: "(19) 99540-5021",
  /** Somente números, com DDI 55 — usado nos links do WhatsApp */
  whatsapp: "5519995405021",
  email: "contato@gessogesseiro.com.br",
  endereco: "Rua Doutora Kazzue Panetta, nº 7 — Jardim Santa Rosa, Campinas/SP",
  linkDoMapa:
    "https://www.google.com/maps/place/R.+Dra+Kazzue+Panetta,+7+-+Jardim+Santa+Rosa,+Campinas+-+SP",
  horarioDeAtendimento: "Segunda a sábado, das 8h às 18h",

  /** Mensagem padrão já preenchida ao abrir o WhatsApp */
  mensagemPadraoWhatsapp:
    "Olá! Vim pelo site e gostaria de solicitar um orçamento para serviços em gesso.",

  /** Redes sociais (deixe string vazia para ocultar o ícone) */
  redesSociais: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "",
  },

  /** Rodapé */
  anoDeFundacao: 2013,
} as const;

export type ConfiguracoesDoSite = typeof configuracoesDoSite;
