'use client';

import React from "react";
import { Input, Textarea } from "@heroui/react";
import Label from "@/components/form/Label";
import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";

interface PersonalInfoSectionProps {
  formData: DocumentCreateData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function PersonalInfoSection({
  formData,
  handleInputChange,
}: PersonalInfoSectionProps) {
  
  const inputStyles = {
    input: "text-zinc-100 placeholder:text-zinc-500",
    inputWrapper: [
      "bg-white/[0.03]",
      "border",
      "border-gray-800",
      "hover:border-gray-700",
      "focus-within:!border-indigo-800",
      "transition-all",
      "shadow-none",
      "rounded-xl",
      "h-11"
    ].join(" "),
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="col-span-full">
          <Label htmlFor="titulo" className="text-zinc-400 mb-2 block text-sm">Título</Label>
          <Input
            type="text"
            id="titulo"
            variant="bordered"
            placeholder="Digite o título do documento"
            value={formData.titulo}
            onChange={handleInputChange}
            classNames={inputStyles}
          />
        </div>

        <div className="col-span-full">
          <Label htmlFor="descricao" className="text-zinc-400 mb-2 block text-sm">Descrição</Label>
          <Textarea
            id="descricao"
            variant="bordered"
            placeholder="Digite a descrição do documento"
            value={formData.descricao}
            onChange={handleInputChange}
            minRows={4}
            classNames={{
              ...inputStyles,
              inputWrapper: inputStyles.inputWrapper.replace("h-11", "h-auto py-3")
            }}
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-zinc-400 mb-2 block text-sm">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full h-11 px-3 bg-white/3 border border-gray-800 rounded-xl text-zinc-100 focus:border-indigo-800 outline-none transition-all appearance-none cursor-pointer"
          >
            <option className="bg-gray-800" value="pendente">Pendente</option>
            <option className="bg-gray-800" value="aprovado">Aprovado</option>
            <option className="bg-gray-800" value="rejeitado">Rejeitado</option>
          </select>
        </div>

        <div>
          <Label htmlFor="criado_em" className="text-zinc-400 mb-2 block text-sm">Criado em</Label>
          <Input
            type="datetime-local"
            id="criado_em"
            variant="bordered"
            value={formData.criado_em?.slice(0, 16)}
            onChange={handleInputChange}
            classNames={inputStyles}
          />
        </div>

      </div>
    </div>
  );
}