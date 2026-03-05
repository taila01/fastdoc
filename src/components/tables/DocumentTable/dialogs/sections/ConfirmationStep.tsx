import React from "react";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

interface ConfirmationStepProps {
  formData: Document;
}

export default function ConfirmationStep({ formData }: ConfirmationStepProps) {
  return (
    <div className="grid gap-4 px-1">
      <div className="col-span-full">
        <h4 className="pb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Confirme os dados do documento
        </h4>
      </div>

      <div>
        <strong>ID:</strong> {formData.id || "Será gerado automaticamente"}
      </div>

      <div>
        <strong>Título:</strong> {formData.titulo}
      </div>

      <div>
        <strong>Descrição:</strong> {formData.descricao}
      </div>

      <div>
        <strong>Status:</strong> {formData.status}
      </div>

      <div>
        <strong>Criado em:</strong>{" "}
        {formData.criado_em
          ? new Date(formData.criado_em).toLocaleString()
          : "N/A"}
      </div>
    </div>
  );
}