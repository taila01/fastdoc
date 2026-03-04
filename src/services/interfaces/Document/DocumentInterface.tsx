export interface Document {
  id?: string;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'assinado';
  criado_em: string;
}

export type DocumentCreateData = Omit<Document, 'id'>;

export interface DocumentIndexResponse {
  data: Document[];
  meta: Meta;
}

export interface DocumentDeleteResponse {
  message: string;
}

export interface Meta {
  current_page: number;
  total_items: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ErrorResponse {
  message: string;
}