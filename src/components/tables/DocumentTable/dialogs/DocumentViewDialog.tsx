'use client';

import React, { useCallback } from "react";
import { FaFileLines, FaXmark } from 'react-icons/fa6';
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

export default function DocumentViewDialog({ isOpen, onClose, documentData }: DocumentViewDialogProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={documentData?.titulo || 'Detalhes do documento'}
      size="3xl"
      isDismissable={true}
      hideSecondaryButton
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
            {!documentData ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-zinc-500">Carregando informações...</div>
              </div>
            ) : (
              <Tabs 
                aria-label="Informações do Documento" 
                variant="underlined"
                classNames={{
                  base: "w-full",
                  tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/5",
                  cursor: "w-full bg-indigo-500",
                  tab: "max-w-fit px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-indigo-500 text-zinc-400 font-medium"
                }}
              >
                <Tab
                  key="personal"
                  title={
                    <div className="flex items-center space-x-2">
                      <FaFileLines size={14} className="text-indigo-500" />
                      <span>Dados do Documento</span>
                    </div>
                  }
                >
                  <div className="pt-6">
                    <PersonalInfo document={{ ...documentData, id: documentData.id ?? '' }} />
                  </div>
                </Tab>
              </Tabs>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 border-t border-gray-800/50 flex justify-end">
          <button
            onClick={handleClose}
            className="px-8 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-all text-sm font-bold shadow-lg active:scale-95"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </CustomModal>
  );
}