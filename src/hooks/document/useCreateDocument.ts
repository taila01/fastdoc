import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/services/api/documents/documents";
import { DocumentCreateData, Document } from "@/services/interfaces/Document/DocumentInterface";

interface ApiError {
  message?: string;
}

export const useCreateDocument = (onSuccessCallback?: (data: Document) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Document, Error, DocumentCreateData>({
    mutationFn: async (data) => {
      const response = await createDocument(data);

      if (!response || (response as ApiError).message) {
        const message = (response as ApiError).message || "Erro ao criar documento";
        throw new Error(message);
      }

      return response as Document;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document"] });
      onSuccessCallback?.(data);
    },
    onError: (error: Error) => {
      console.error("Erro ao criar documento:", error.message);
    },
  });
};