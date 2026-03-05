'use client';

import ComponentCard from '@/components/common/ComponentCard';
import DocumentAddDialog from '@/components/tables/DocumentTable/dialogs/DocumentAddDialog';
import DocumentTableProps from '@/components/tables/DocumentTable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function DocumentContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ComponentCard
        title="Gerenciamento de Documentos"
        desc="Painel de gerenciamento de documentos"
        headerButton={{
          className:
            'px-4 py-2 rounded-lg bg-indigo-800 text-white hover:bg-indigo-800 transition',
          text: 'Criar Documento',
          onClick: () => setIsOpen(true),
          color: 'secondary',
        }}
      >
        <div className="h-auto overflow-hidden" title="Gerenciamento de documentos">
          <AnimatePresence mode="wait">
            <motion.div
              key="table"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12, duration: 0.01 }}
            >
              <DocumentTableProps />
            </motion.div>
          </AnimatePresence>

          <DocumentAddDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            document={null}
          />
        </div>
      </ComponentCard>
    </>
  );
}