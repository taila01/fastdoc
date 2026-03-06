import axios from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Document, DocumentIndexResponse, DocumentDeleteResponse } from "@/services/interfaces/Document/DocumentInterface";

const API_BASE_URL = "/documentos";

export const getDocument = async (id: number): Promise<Document | null> => {
  try {
    const response: AxiosResponse<Document> = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

export const createDocument = async (data: { titulo: string; conteudoTexto: string }): Promise<Document | null> => {
  const response: AxiosResponse<Document> = await axios.post(API_BASE_URL, data);
  return response.data;
};

export const editDocument = async (document: Document): Promise<Document> => {
  if (!document.id) throw new Error("ID do documento é obrigatório");
  const response: AxiosResponse<Document> = await axios.put(`${API_BASE_URL}/${document.id}`, document);
  return response.data;
};

export const signDocument = async (id: number): Promise<Document | null> => {
  const response: AxiosResponse<Document | null> = await axios.patch(`${API_BASE_URL}/${id}/assinar`);
  return response.data;
};

export const deleteDocument = async (id: number): Promise<DocumentDeleteResponse | null> => {
  const response: AxiosResponse<DocumentDeleteResponse> = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getDocuments = async (
  page: number = 1,
  per_page: number = 10,
  search?: string
): Promise<DocumentIndexResponse> => {
  const response: AxiosResponse<DocumentIndexResponse> = await axios.get(API_BASE_URL, {
    params: { page, per_page, search },
  });
  return response.data;
};