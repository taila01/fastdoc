'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaUpload } from "react-icons/fa6";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";
import { HotToast } from "@/components/toast/HotToast";
import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";
import { useCreateDocument } from "@/hooks/document";
import { cleanFormData } from "@/utils/createDocument/cleanFormData";
import Steps from "@/components/ui/steper/steps";
import StepperButtons from "@/components/ui/steper/steperbuttons";
import PersonalInfoSection from "@/components/tables/DocumentTable/dialogs/sections/PersonalInfoSection";
import ConfirmationStep from "@/components/tables/DocumentTable/dialogs/sections/ConfirmationStep";
import Form from "@/components/form/Form";

interface DocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  document?: DocumentCreateData | null;
}

const stepFields = [
  { stepName: "Informações do Documento" },
  { stepName: "Confirmação" }
];

export default function DocumentForm({ isOpen, onClose, document = null }: DocumentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<DocumentCreateData>({
    titulo: "",
    descricao: "",
    status: "pendente",
    criado_em: new Date().toISOString()
  });

  const { mutate, isError, isSuccess, error } = useCreateDocument();

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setFormData({
      titulo: "",
      descricao: "",
      status: "pendente",
      criado_em: new Date().toISOString()
    });
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (document) {
      setFormData(document);
    }
  }, [document]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      HotToast({ title: "Erro", message: "Apenas arquivos .txt são permitidos", type: "error" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        titulo: prev.titulo || file.name.replace('.txt', ''),
        descricao: content
      }));
      HotToast({ title: "Sucesso", message: "Conteúdo importado com sucesso!", type: "success" });
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    const cleanedData = cleanFormData(formData);
    mutate(cleanedData);
  };

  useEffect(() => {
    if (isSuccess) {
      HotToast({ title: "Sucesso!", message: "Documento salvo!", type: "success" });
      handleClose();
    }
    if (isError) {
      HotToast({ 
        title: "Erro", 
        message: error instanceof Error ? error.message : "Erro ao processar", 
        type: "error" 
      });
    }
  }, [isSuccess, isError, error, handleClose]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <PersonalInfoSection formData={formData} handleInputChange={handleInputChange} />
            <div className="flex justify-center pt-2">
              <label className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-800 rounded-2xl cursor-pointer hover:bg-white/10 transition-all text-sm text-zinc-300 group">
                <FaUpload className="text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Importar arquivo de texto (.txt)</span>
                <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        );
      case 1:
        return <ConfirmationStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={document ? "Editar Documento" : "Criar Documento"}
      backdrop="blur"
      size="3xl"
      hideSecondaryButton
      hidePrimaryButton
      isDismissable={false}
      classNames={{
        base: "bg-zinc-900 border border-gray-800 rounded-2xl shadow-2xl max-w-[850px] h-fit my-auto mx-4 overflow-hidden",
        header: "border-b border-gray-800 text-white py-5 px-8 font-semibold",
        closeButton: "top-5 right-6 p-2 hover:bg-white/5 text-gray-400 transition-all rounded-full scale-110",
        body: "p-0 overflow-y-auto no-scrollbar max-h-[85vh]"
      }}
    >
      <div className="flex flex-col gap-6 p-8 bg-zinc-900">
        <Steps currentStep={currentStep} steps={stepFields} />

        <Form onSubmit={handleSubmit} className="w-full">
          <div className="relative min-h-[380px] w-full rounded-2xl border border-gray-800 bg-white/3 p-6 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Form>

        <div className="w-full pt-6 border-t border-gray-800/50">
          <StepperButtons
            currentStep={currentStep}
            totalSteps={stepFields.length}
            isStepValid={true}
            onPrev={() => setCurrentStep(prev => prev - 1)}
            onNext={() => setCurrentStep(prev => prev + 1)}
            successMessage={document ? "Salvar Alterações" : "Criar Documento"}
            endContent={<FaPlus />}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </CustomModal>
  );
}