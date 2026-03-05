'use client';
import { useQuery } from "@tanstack/react-query";
import { DocumentIndexResponse } from "@/services/interfaces/Document/DocumentInterface";
import { getDocuments } from "@/services/api/documents/documents";

export const useDocuments = (page: number = 1, per_page?: number, search?: string) => {
  return useQuery<DocumentIndexResponse>({
    queryKey: ["documents", page, per_page, search],
    queryFn: () => getDocuments(page, per_page, search),
    staleTime: 5 * 60 * 1000,
  });
};