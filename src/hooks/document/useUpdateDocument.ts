import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDocument } from "@/services/api/documents/documents";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

export const useEditDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<Document, Error, Document>({
    mutationFn: async (data) => {
      console.log("Data recebido na mutation:", data);
      if (!data.id) throw new Error("ID do documento não fornecido");

      const response = await editDocument(data);
      if (!response) throw new Error("Erro ao editar Documento");

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.removeQueries({ queryKey: ['document', data.id] });
    },
    onError: (error) => {
      console.error("Erro ao editar Documento:", error.message);
    }
  });
};