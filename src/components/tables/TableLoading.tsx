'use client';

import React from 'react';
import { Spinner } from "@heroui/react";
import { FaDatabase } from "react-icons/fa";

const TableLoading: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 bg-zinc-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner size="lg" color="secondary" className="scale-125" />
                </div>
                <div className="p-6 bg-white/3 border border-gray-800 rounded-full backdrop-blur-md">
                    <FaDatabase className="w-8 h-8 text-indigo-500 opacity-60" />
                </div>
            </div>
            
            <div className="mt-8 space-y-2 text-center">
                <h3 className="text-xl font-semibold text-zinc-100 tracking-tight">
                    Carregando dados
                </h3>
                <p className="text-sm text-zinc-400 max-w-62.5">
                    Por favor, aguarde enquanto sincronizamos as informações.
                </p>
            </div>

            <div className="mt-6 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-800 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-800 animate-pulse delay-150" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-800 animate-pulse delay-300" />
            </div>
        </div>
    );
};

export default TableLoading;