import { Document as DocumentInterface } from '@/services/interfaces/Document/DocumentInterface';

interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'assinado';
  criado_em: string;
}

interface DocumentInfoSectionProps {
  document: Document | undefined;
}

export default function DocumentInfoSection({ document }: DocumentInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Título</p>
            <p className="text-sm font-medium">{document?.titulo}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Descrição</p>
            <p className="text-sm font-medium">{document?.descricao}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Status</p>
            <p className="text-sm font-medium">{document?.status}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Criado em</p>
            <p className="text-sm font-medium">
              {document?.criado_em && new Date(document.criado_em).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}