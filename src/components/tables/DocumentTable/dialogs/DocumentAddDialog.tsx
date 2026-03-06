'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";
import { HotToast } from "@/components/toast/HotToast";
import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";
import { useCreateDocument } from "@/hooks/document";
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

const stepFields = [{ stepName: "Informações" }, { stepName: "Confirmação" }];

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
    if (document) setFormData(document);
  }, [document]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.descricao) {
      HotToast({ title: "Atenção", message: "Título e conteúdo são obrigatórios", type: "error" });
      return;
    }

    mutate({
      titulo: formData.titulo,
      conteudoTexto: formData.descricao
    });
  };

  useEffect(() => {
    if (isSuccess) {
      HotToast({ title: "Sucesso!", message: "Documento salvo!", type: "success" });
      handleClose();
    }
    if (isError) {
      HotToast({ title: "Erro", message: error?.message || "Erro ao salvar", type: "error" });
    }
  }, [isSuccess, isError, error, handleClose]);

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-6">
          <PersonalInfoSection formData={formData} handleInputChange={handleInputChange} />
        </div>
      );
    }
    return <ConfirmationStep formData={formData} />;
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={document ? "Editar Documento" : "Criar Documento"}
      size="3xl"
      isDismissable={true}
      showCloseButton={true} 
      hideSecondaryButton
      hidePrimaryButton
      classNames={{
        base: "bg-zinc-900 border border-gray-800 rounded-2xl max-w-[850px] overflow-hidden",
        header: "border-b border-gray-800 text-white py-6 px-8 font-semibold relative",
        closeButton: "top-6 right-6 p-2 hover:bg-white/[0.1] text-gray-400 transition-all rounded-full scale-110 active:scale-95 z-50",
        body: "p-0"
      }}
    >
      <div className="flex flex-col gap-6 p-8 bg-zinc-900">
        <Steps currentStep={currentStep} steps={stepFields} />
        
        <Form onSubmit={handleSubmit}>
          <div className="min-h-[380px] rounded-2xl border border-gray-800 bg-white/3 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Form>

        <div className="pt-6 border-t border-gray-800/50">
          <StepperButtons
            currentStep={currentStep}
            totalSteps={stepFields.length}
            isStepValid={formData.titulo.length > 0 && formData.descricao.length > 0}
            onPrev={() => setCurrentStep(prev => prev - 1)}
            onNext={() => setCurrentStep(prev => prev + 1)}
            successMessage={document ? "Salvar" : "Criar"}
            endContent={<FaPlus />}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </CustomModal>
  );
}