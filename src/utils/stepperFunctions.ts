// utils.js

/**
 * Remove caracteres especiais de uma string.
 * @param {string} str - A string para a qual os caracteres especiais serão removidos.
 * @returns {string} A string limpa.
 */
export const removeSpecialCharacters = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove tudo que não for letras, números ou espaço
};
