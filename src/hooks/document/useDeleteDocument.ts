import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentDeleteResponse } from "@/services/interfaces/Document/DocumentInterface";
import { deleteDocument} from "@/services/api/documents/documents";

export const useDeleteDocument = () => {
    const queryUser = useQueryClient();

    return useMutation<DocumentDeleteResponse, Error, string>({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID do Documento não fornecido");

      const response = await deleteDocument(id);
      if (!response) throw new Error("Erro ao excluir Documento");

      return response;
    },
    onSuccess: (_, id) => {
      queryUser.invalidateQueries({ queryKey: ['documents'] });
      queryUser.removeQueries({ queryKey: ['document', id] });
    },
    onError: (error) => {
      console.error("Erro ao excluir Documento:", error);
    }
  });
};
  