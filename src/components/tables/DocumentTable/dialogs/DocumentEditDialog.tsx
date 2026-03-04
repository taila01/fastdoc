'use client';

import React, { useState, useEffect } from "react";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";
import toast from "react-hot-toast";
import { Document } from "@/services/interfaces/Document/DocumentInterface";
import { useEditDocument } from "@/hooks/document/useUpdateDocument";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentData: Document | undefined;
}

export default function EditDocumentDialog({ isOpen, onClose, documentData }: EditDocumentDialogProps) {
  const editDocumentMutation = useEditDocument();

  const [formData, setFormData] = useState<Document>({
    id: "",
    titulo: "",
    descricao: "",
    status: "pendente",
    criado_em: new Date().toISOString()
  });

  useEffect(() => {
    if (documentData && isOpen) {
      const timer = setTimeout(() => setFormData(documentData), 0);
      return () => clearTimeout(timer);
    }
  }, [documentData, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateDocument = async () => {
    if (!formData.titulo.trim() || !formData.descricao.trim()) {
      toast.error("Título e descrição são obrigatórios!");
      return;
    }

    try {
      await editDocumentMutation.mutateAsync(formData);
      toast.success("Documento atualizado com sucesso!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao atualizar documento");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Documento"
      backdrop="blur"
      size="lg"
      hideSecondaryButton={false}
      primaryButtonText="Salvar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleUpdateDocument}
    >
      <div className="px-4 py-3">
        <Label>Título</Label>
        <Input id="titulo" value={formData.titulo} onChange={handleInputChange} />

        <Label>Descrição</Label>
        <Input id="descricao" value={formData.descricao} onChange={handleInputChange} />

        <Label>Status</Label>
        <select id="status" value={formData.status} onChange={handleInputChange} className="w-full rounded-md border p-2 mt-1">
          <option value="pendente">Pendente</option>
          <option value="assinado">Assinado</option>
        </select>
      </div>
    </CustomModal>
  );
}