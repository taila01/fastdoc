'use client';

import { useDocument, useDeleteDocument } from '@/hooks/document';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import { SiRenren } from 'react-icons/si';
import React, { useState } from 'react';
import { HotToast } from "@/components/toast/HotToast";
import { toast } from 'react-hot-toast';

interface DocumentDeleteProps {
  documentId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentDeleteDialog({ documentId, isOpen, onClose }: DocumentDeleteProps) {
  const { data: document } = useDocument(documentId || '');
  const { mutate: deleteDocument, isPending } = useDeleteDocument();
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = () => {
    if (!documentId) return;

    const toastId = HotToast({
      type: 'loading',
      message: 'Excluindo documento...'
    });

    deleteDocument(documentId, {
      onSuccess: () => {
        toast.dismiss(toastId);
        HotToast({
          type: 'success',
          title: 'Sucesso',
          message: 'Documento excluído com sucesso!'
        });
        setIsChecked(false);
        onClose();
      },
      onError: (error: unknown) => {
        toast.dismiss(toastId);
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
            ? error
            : 'Erro desconhecido';
        HotToast({
          type: 'error',
          title: 'Erro',
          message: `Erro ao excluir documento: ${message}`
        });
        setIsChecked(false);
      }
    });
  };

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Excluir documento"
      backdrop="blur"
      size="lg"
      onPrimaryAction={handleDelete}
      primaryButtonText="Confirmar Exclusão"
      secondaryButtonText="Cancelar"
      hidePrimaryButton={!isChecked || isPending}
      classNames={{
        base: "bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl",
        header: "border-b border-gray-800 text-white py-6 px-8 font-semibold",
        closeButton: "top-6 right-6 p-2 hover:bg-white/5 text-gray-400 transition-all rounded-full scale-110",
        footer: "border-t border-gray-800 p-6",
        body: "p-0"
      }}
    >
      <div className="p-8 bg-zinc-900 space-y-6">
        <div className="w-full rounded-2xl border border-red-900/30 bg-white/3 p-6">
          <div className="flex items-center mb-4 text-red-500">
            <SiRenren className="mr-3 w-8 h-8" />
            <h2 className="text-xl font-bold">Atenção!</h2>
          </div>
          
          <p className="mb-6 text-zinc-300 leading-relaxed">
            Tem certeza de que deseja excluir o documento 
            <span className="font-bold text-white ml-1 underline decoration-red-500/50">
              {document?.titulo || 'este documento'}
            </span>? Esta ação não poderá ser desfeita.
          </p>

          <div className="bg-red-500/5 rounded-xl border border-red-500/10 p-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1 cursor-pointer rounded border-gray-700 bg-zinc-800 text-red-600 focus:ring-red-600 size-5 transition-all"
              />
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm">
                Confirmo que desejo excluir permanentemente o documento 
                <strong className="text-zinc-200 ml-1">{document?.titulo}</strong>.
              </span>
            </label>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}