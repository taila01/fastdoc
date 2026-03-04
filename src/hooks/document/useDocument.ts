import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/services/api/documents/documents";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

export const useDocument = (id?: string) => {
  return useQuery<Document>({
    queryKey: ["document", id],
    queryFn: async () => {
      if (!id) throw new Error("ID do Documento não fornecido");
      const res = await getDocument(id);
      if (!res) throw new Error("Erro ao buscar documento");
      return res;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
