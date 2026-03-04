import axios from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Document, DocumentCreateData, DocumentIndexResponse, DocumentDeleteResponse } from "@/services/interfaces/Document/DocumentInterface";

const API_BASE_URL = "/documents";

export const getDocument = async (id: string): Promise<Document | null> => {
  try {
    const response: AxiosResponse<Document> = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Documento:", error);
    return null;
  }
};

export const createDocument = async (data: DocumentCreateData): Promise<Document | null> => {
  try {
    const response: AxiosResponse<Document> = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error: unknown) {
    const message = error?.response?.data?.message || "Erro desconhecido ao criar Documento";
    throw new Error(message);
  }
};

export const editDocument = async (data: Document): Promise<Document | null> => {
  if (!data.id) throw new Error("ID do Documento é obrigatório para edição");
  try {
    const response: AxiosResponse<Document> = await axios.put(`${API_BASE_URL}/${data.id}`, data);
    return response.data;
  } catch (error: unknown) {
    const message = error?.response?.data?.message || "Erro desconhecido ao atualizar Documento";
    throw new Error(message);
  }
};

export const deleteDocument = async (id: string): Promise<DocumentDeleteResponse | null> => {
  try {
    const response: AxiosResponse<DocumentDeleteResponse> = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    const message = error?.response?.data?.message || "Erro desconhecido ao deletar Documento";
    throw new Error(message);
  }
};

export const getDocuments = async (
  page: number = 1,
  per_page: number = 10,
  search: string = ""
): Promise<DocumentIndexResponse | null> => {
  try {
    const response: AxiosResponse<DocumentIndexResponse> = await axios.get(
      `${API_BASE_URL}?page=${page}&per_page=${per_page}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Documentos:", error);
    return null;
  }
};