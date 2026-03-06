'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";
import { HotToast } from "@/components/toast/HotToast";
import { Document } from "@/services/interfaces/Document/DocumentInterface";
import { useEditDocument } from "@/hooks/document/useUpdateDocument";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { FaSave } from "react-icons/fa"; // Ícone para o botão

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

  // Sincroniza os dados quando o modal abre
  useEffect(() => {
    if (documentData && isOpen) {
      setFormData(documentData);
    }
  }, [documentData, isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateDocument = async () => {
    if (!formData.titulo.trim() || !formData.descricao.trim()) {
      HotToast({ title: "Atenção", message: "Título e descrição são obrigatórios!", type: "error" });
      return;
    }

    try {
      await editDocumentMutation.mutateAsync(formData);
      HotToast({ title: "Sucesso!", message: "Documento atualizado!", type: "success" });
      handleClose();
    } catch (error: any) {
      HotToast({ 
        title: "Erro", 
        message: error?.message || "Erro ao atualizar documento", 
        type: "error" 
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Editar Documento"
      size="3xl"
      isDismissable={false}
      hideSecondaryButton // Ocultamos os botões padrão para usar o layout customizado
      hidePrimaryButton
      classNames={{
        base: "bg-zinc-900 border border-gray-800 rounded-2xl max-w-[850px]",
        header: "border-b border-gray-800 text-white p-6",
        body: "p-0",
        closeButton: "top-6 right-6 p-2 hover:bg-white/[0.05] text-gray-400 transition-all rounded-full"
      }}
    >
      <div className="flex flex-col gap-6 p-8 bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[300px] rounded-2xl border border-gray-800 bg-white/3 p-8 space-y-6"
          >
            {/* Campo Título */}
            <div className="space-y-2">
              <Label className="text-zinc-400 text-sm ml-1">Título do Documento</Label>
              <Input 
                id="titulo" 
                value={formData.titulo} 
                onChange={handleInputChange} 
                placeholder="Ex: Contrato de Prestação de Serviços"
                className="bg-white/5 border-gray-700 text-white rounded-xl h-12 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Campo Descrição */}
            <div className="space-y-2">
              <Label className="text-zinc-400 text-sm ml-1">Descrição</Label>
              <Input 
                id="descricao" 
                value={formData.descricao} 
                onChange={handleInputChange} 
                placeholder="Breve descrição do conteúdo"
                className="bg-white/5 border-gray-700 text-white rounded-xl h-12 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Campo Status */}
            <div className="space-y-2">
              <Label className="text-zinc-400 text-sm ml-1">Status Atual</Label>
              <select 
                id="status" 
                value={formData.status} 
                onChange={handleInputChange} 
                className="w-full h-12 px-4 bg-white/5 border border-gray-700 rounded-xl text-zinc-100 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option className="bg-zinc-900" value="pendente">Pendente</option>
                <option className="bg-zinc-900" value="assinado">Assinado</option>
              </select>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 border-t border-gray-800/50 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full border border-gray-700 text-gray-400 hover:bg-white/5 transition-all text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdateDocument}
            disabled={editDocumentMutation.isPending}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-sm font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {editDocumentMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            <FaSave className="text-xs" />
          </button>
        </div>
      </div>
    </CustomModal>
  );
}