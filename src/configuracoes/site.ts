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
  nomeDaEmpresa: "WE Gessos",
  slogan: "A solução ideal em gesso para você",
  cidade: "Campinas",
  estado: "SP",

  /** Contato */
  telefone: "(19) 99441-4007",
  /** Somente números, com DDI 55 — usado nos links do WhatsApp */
  whatsapp: "5519994414007",
  email: "wiliam.goncalves@wegesso.com.br",
  endereco: "Rua Sete de Novembro - Vila Aeroporto, Campinas/SP",
  linkDoMapa:
    "https://maps.google.com/maps?q=-22.9728095%2C-47.1171554&z=17&hl=pt-BR",
  horarioDeAtendimento: "Segunda a Sexta, das 8h às 18h",

  /** Mensagem padrão já preenchida ao abrir o WhatsApp */
  mensagemPadraoWhatsapp:
    "Olá! Vim pelo site e gostaria de solicitar um orçamento para serviços em gesso.",

  /** Redes sociais (deixe string vazia para ocultar o ícone) */
  redesSociais: {
    instagram: "https://www.instagram.com/w_gesso7?stkn=Njk5NWptN2ltM3Vm",
    facebook: "",
    youtube: "",
  },

  /** Rodapé */
  anoDeFundacao: 2013,
} as const;

export type ConfiguracoesDoSite = typeof configuracoesDoSite;
