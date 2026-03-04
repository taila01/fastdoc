"use client";

import { useState } from "react";
import { FaWhatsapp, FaSearch } from "react-icons/fa";
import { useTemplates } from "@/hooks/useTemplates";
import { TemplateMessage } from "@/services/interfaces/SzChat/TemplateMessageInterface";
import { CustomModal } from "@/components/ui/HeroUI/Dialog";

interface TemplateSelectorProps {
    onSelectTemplate: (template: TemplateMessage) => void;
    onClose: () => void;
    isOpen: boolean;
    isDisabled?: boolean;
}

export default function TemplateSelector({
    onSelectTemplate,
    onClose,
    isOpen,
    isDisabled = false
}: TemplateSelectorProps) {
    const { templates, isLoading, error } = useTemplates();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTemplates = (templates || []).filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.body_text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTemplateSelect = (template: TemplateMessage) => {
        onSelectTemplate(template);
        onClose();
        setSearchTerm("");
    };

    const handleClose = () => {
        setSearchTerm("");
        onClose();
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={handleClose}
            title="Selecionar Template"
            size="lg"
            hideSecondaryButton={true}
            hidePrimaryButton={true}
            backdrop="blur"
            primaryButtonIcon={<FaWhatsapp className="w-4 h-4" />}
            isDismissable={true}
            isKeyboardDismissDisabled={false}
        >
            <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar template por nome ou texto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto">
                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-2"></div>
                            <p className="text-gray-500 dark:text-gray-400">Carregando templates...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-8">
                            <p className="text-red-500 mb-2">Erro ao carregar templates</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Tente novamente mais tarde
                            </p>
                        </div>
                    )}

                    {!isLoading && !error && filteredTemplates.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                                {searchTerm ? 'Nenhum template encontrado' : 'Nenhum template disponível'}
                            </p>
                            {searchTerm && (
                                <p className="text-sm text-gray-400">
                                    Tente ajustar o termo de busca
                                </p>
                            )}
                        </div>
                    )}

                    {!isLoading && !error && filteredTemplates.length > 0 && (
                        <div className="space-y-3">
                            {filteredTemplates.map((template) => (
                                <button
                                    key={template.template_id}
                                    onClick={() => handleTemplateSelect(template)}
                                    disabled={isDisabled || template.status !== 'APPROVED'}
                                    className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <div className="w-full">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                                            {template.name}
                                        </h4>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            <p className="break-words">
                                                {template.body_text}
                                            </p>
                                        </div>

                                        {/* Buttons se existirem */}
                                        {template.buttons && (
                                            <div className="mb-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Botões:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(template.buttons) 
                                                        ? template.buttons.map((button, index) => (
                                                            <span 
                                                                key={index}
                                                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded border"
                                                            >
                                                                {button}
                                                            </span>
                                                        ))
                                                        : typeof template.buttons === 'string'
                                                        ? (
                                                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded border">
                                                                {template.buttons}
                                                            </span>
                                                        )
                                                        : (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {JSON.stringify(template.buttons)}
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Apenas templates aprovados podem ser utilizados
                    </p>
                </div>
            </div>
        </CustomModal>
    );
}
