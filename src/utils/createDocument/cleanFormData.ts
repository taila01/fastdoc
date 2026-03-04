import { removeSpecialCharacters } from "../stepperFunctions";
import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";

/**
 * Limpa e formata os dados do formulário para envio.
 * @param {DocumentCreateData} formData - Os dados do formulário.
 * @returns {DocumentCreateData} - Os dados prontos para serem enviados para a API.
 */
export const cleanFormData = (formData: DocumentCreateData): DocumentCreateData => {
  return {
    firstname: removeSpecialCharacters(formData.firstname ?? ''),
    lastname: removeSpecialCharacters(formData.lastname ?? ''),
    email: formData.email ?? '',
    emailVerifiedAt: null,
    password: formData.password ?? '',
    password_confirmation: formData.password_confirmation ?? null,
    isActive: formData.isActive ?? true,
    createdAt: formData.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};