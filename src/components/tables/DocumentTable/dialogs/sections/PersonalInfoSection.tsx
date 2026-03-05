import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

interface PersonalInfoSectionProps {
  formData: Document;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function PersonalInfoSection({
  formData,
  handleInputChange,
}: PersonalInfoSectionProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="col-span-full">
          <Label htmlFor="titulo">Título</Label>
          <Input
            type="text"
            id="titulo"
            placeholder="Digite o título do documento"
            value={formData.titulo}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-span-full">
          <Label htmlFor="descricao">Descrição</Label>
          <textarea
            id="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Digite a descrição do documento"
            className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-900"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-900"
          >
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
          </select>
        </div>

        <div>
          <Label htmlFor="criado_em">Criado em</Label>
          <Input
            type="datetime-local"
            id="criado_em"
            value={formData.criado_em?.slice(0, 16)}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}