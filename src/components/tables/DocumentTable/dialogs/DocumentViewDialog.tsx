'use client';

import { FaFileAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import { Tabs, Tab } from "@heroui/react";
import { Document } from '@/services/interfaces/Document/DocumentInterface';
import PersonalInfo from '@/components/form/document-form/PersonalInfo';

interface DocumentViewDialogProps {
  documentId?: string;
  isOpen: boolean;
  onClose: () => void;
  documentData: Document | undefined;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function DocumentViewDialog({ isOpen, onClose, documentData }: DocumentViewDialogProps) {
  const document = documentData;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={document?.titulo || 'Detalhes do documento'}
      backdrop="blur"
      size="lg"
      hideSecondaryButton
      primaryButtonText="Fechar"
    >
      {!document ? (
        <div className="flex items-center justify-center h-32 z-999">
          <div className="animate-pulse text-neutral-500">Carregando informações...</div>
        </div>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <Tabs aria-label="Informações do Documento" color="primary" variant="bordered">
            <Tab
              key="personal"
              title={
                <div className="flex items-center space-x-2">
                  <FaFileAlt className="text-blue-500" />
                  <span>Dados do Documento</span>
                </div>
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="personal"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                <PersonalInfo document={{ ...document, id: document.id ?? '' }} />                </motion.div>
              </AnimatePresence>
            </Tab>
          </Tabs>
        </div>
      )}
    </CustomModal>
  );
}