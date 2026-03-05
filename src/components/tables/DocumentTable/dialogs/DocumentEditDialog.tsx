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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(documentData);
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
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar documento");
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Documento"
      backdrop="blur"
      size="lg"
      onPrimaryAction={handleUpdateDocument}
      primaryButtonText="Salvar"
      secondaryButtonText="Cancelar"
      classNames={{
        base: "bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden",
        header: "border-b border-gray-800 text-white py-6 px-8 font-semibold",
        closeButton: "top-6 right-6 p-2 hover:bg-white/[0.05] text-gray-400 transition-all rounded-full scale-110",
        footer: "border-t border-gray-800 p-6",
        body: "p-0"
      }}
    >
      <div className="p-8 bg-zinc-900 space-y-6">
        <div className="w-full rounded-2xl border border-gray-800 bg-white/3 p-6 space-y-4">
          <div>
            <Label className="text-zinc-400 mb-2 block text-sm">Título</Label>
            <Input 
              id="titulo" 
              value={formData.titulo} 
              onChange={handleInputChange} 
              className="bg-white/3 border-gray-800 text-white rounded-xl h-11 focus:border-indigo-800 transition-all"
            />
          </div>

          <div>
            <Label className="text-zinc-400 mb-2 block text-sm">Descrição</Label>
            <Input 
              id="descricao" 
              value={formData.descricao} 
              onChange={handleInputChange} 
              className="bg-white/3 border-gray-800 text-white rounded-xl h-11 focus:border-indigo-800 transition-all"
            />
          </div>

          <div>
            <Label className="text-zinc-400 mb-2 block text-sm">Status</Label>
            <select 
              id="status" 
              value={formData.status} 
              onChange={handleInputChange} 
              className="w-full h-11 px-3 bg-white/3 border border-gray-800 rounded-xl text-zinc-100 focus:border-indigo-800 outline-none transition-all appearance-none cursor-pointer"
            >
              <option className="bg-zinc-900" value="pendente">Pendente</option>
              <option className="bg-zinc-900" value="assinado">Assinado</option>
            </select>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}