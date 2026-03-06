'use client';

import React from "react";
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
      <div className="bg-white/3 border border-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Título</p>
            <p className="text-sm font-medium text-zinc-100">{document?.titulo || "—"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Descrição</p>
            <p className="text-sm font-medium text-zinc-100">{document?.descricao || "—"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Status</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${
              document?.status === 'assinado' 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
            }`}>
              {document?.status || "pendente"}
            </span>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Criado em</p>
            <p className="text-sm font-medium text-zinc-100">
              {document?.criado_em 
                ? new Date(document.criado_em).toLocaleDateString('pt-BR') 
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}