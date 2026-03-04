'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus } from "react-icons/fa6";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";
import { HotToast } from "@/components/toast/HotToast";

import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";
import { useCreateDocument } from "@/hooks/document";
import { cleanFormData } from "@/utils/createDocument/cleanFormData";

import Steps from "@/components/ui/steper/steps";
import StepperButtons from "@/components/ui/steper/steperbuttons";
import PersonalInfo from "@/components/tables/DocumentTable/dialogs/sections/PersonalInfoSection";
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
  const [prevStep, setPrevStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [formData, setFormData] = useState<DocumentCreateData>({
    titulo: "",
    descricao: "",
    status: "pendente",
    criado_em: new Date().toISOString()
  });

  const { mutate, isError, isSuccess, error } = useCreateDocument();

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setPrevStep(0);
    setIsStepValid(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const cleanedData = cleanFormData(formData);
    mutate(cleanedData);
  };

  useEffect(() => {
    if (isSuccess) {
      HotToast({ title: "Sucesso!", message: "Documento criado com sucesso!", type: "success" });
      handleClose();
    }
    if (isError) {
      HotToast({
        title: "Erro...",
        message: error instanceof Error ? error.message : "Erro ao criar documento",
        type: "error"
      });
    }
  }, [isSuccess, isError, error, handleClose]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };
  const direction = currentStep > prevStep ? 1 : -1;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo formData={formData} handleInputChange={handleInputChange} />;
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
      size="lg"
      hideSecondaryButton
      hidePrimaryButton
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <div className="flex items-center mb-4">
        <Steps currentStep={currentStep} steps={stepFields} />
      </div>
      <section className="relative">
        <Form onSubmit={handleSubmit}>
          <div className="relative overflow-hidden w-full h-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div key={currentStep} custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Form>
        <StepperButtons
          currentStep={currentStep}
          totalSteps={2}
          isStepValid={isStepValid}
          onPrev={() => setCurrentStep((prev) => prev - 1)}
          onNext={() => setCurrentStep((prev) => prev + 1)}
          successMessage={document ? "Salvar Alterações" : "Criar Documento"}
          endContent={<FaUserPlus />}
          onSubmit={handleSubmit}
        />
      </section>
    </CustomModal>
  );
}