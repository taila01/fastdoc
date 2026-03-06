import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/services/api/documents/documents";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

interface CreateDocumentPayload {
  titulo: string;
  conteudoTexto: string;
}

export const useCreateDocument = (onSuccessCallback?: (data: Document) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Document | null, Error, CreateDocumentPayload>({
    mutationFn: async (data: CreateDocumentPayload) => {
      const response = await createDocument(data);
      if (!response) {
        throw new Error("Erro ao criar documento");
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document"] });
      if (data) onSuccessCallback?.(data);
    },
    onError: (error: Error) => {
      console.error("Erro ao criar documento:", error.message);
    },
  });
};