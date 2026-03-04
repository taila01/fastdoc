import React from 'react';
import { Spinner } from "@heroui/react";
import { FaDatabase } from "react-icons/fa";

const TableLoading: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner size="lg" color="primary" className="z-10" />
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                    <FaDatabase className="w-8 h-8 text-primary-400 dark:text-primary-500 opacity-50" />
                </div>
            </div>
            <div className="mt-4 space-y-2 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Carregando dados...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Por favor, aguarde enquanto processamos as informações
                </p>
            </div>
        </div>
    );
};

export default TableLoading; 