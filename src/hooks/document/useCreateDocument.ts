import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/services/api/documents/documents";
import { DocumentCreateData, Document } from "@/services/interfaces/Document/DocumentInterface";

export const useCreateDocument = (onSuccessCallback?: (data: Document) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Document, Error, DocumentCreateData>({
    mutationFn: async (data) => {
      try {
        const response = await createDocument(data);

        if (!response || (response as any)?.message) {
          const message = (response as any)?.message || "Erro ao cadastrar administrador";
          throw new Error(message);
        }

        return response;
      } catch (error: any) {
        throw new Error(error?.message || "Erro inesperado ao criar administrador");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      console.error("Erro ao criar administrador:", error.message);
    },
  });
};
