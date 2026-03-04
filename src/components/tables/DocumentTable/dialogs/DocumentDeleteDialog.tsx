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

  if (!isOpen) return null;

  return (
    <CustomModal
      title="Excluir documento"
      backdrop="blur"
      size="md"
      hideSecondaryButton={false}
      primaryButtonText="Confirmar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleDelete}
      hidePrimaryButton={!isChecked || isPending}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="w-full max-w-md p-6 text-gray-800">
        <div className="flex items-center mb-4 text-red-600">
          <SiRenren className="mr-2 w-6 h-6" />
          <h2 className="text-2xl font-bold">Excluir Documento</h2>
        </div>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          Tem certeza de que deseja excluir o documento
          <span className="font-bold ml-1">{document?.titulo || 'este documento'}</span>?
        </p>
        <div className="mb-4">
          <label className="flex items-center text-sm mb-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2 cursor-pointer rounded-md size-5"
            />
            <p className="dark:text-white/70 text-lg">
              Confirmo que desejo excluir o documento
              <strong className="ml-1">{document?.titulo}</strong>.
            </p>
          </label>
        </div>
      </div>
    </CustomModal>
  );
}