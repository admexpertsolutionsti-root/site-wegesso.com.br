// src/utilitarios/formatadores.ts

/**
 * Junta classes CSS ignorando valores falsos.
 * Ex.: juntarClasses('base', ativo && 'ativo') => "base ativo"
 */
export function juntarClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Rola suavemente até uma seção pelo id (âncora).
 */
export function rolarAteSecao(idDaSecao: string): void {
  const elemento = document.getElementById(idDaSecao);
  if (!elemento) return;
  elemento.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Aplica máscara de telefone brasileiro: (00) 00000-0000
 */
export function aplicarMascaraDeTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}
