import React from "react";
import { AdminCreateData } from "@/services/interfaces/Admin/AdminInterface";

interface ConfirmationStepProps {
  formData: AdminCreateData;
}
export default function ConfirmationStep({ formData }: ConfirmationStepProps) {
  return (
      <div className="grid gap-4 px-1">
            <div className="col-span-full">
                <h4 className="pb-4 text-base font-medium text-gray-800 dark:text-white/90">
                    Confirme os dados do usuário
                </h4>
            </div>
      <div>
        <strong>Nome:</strong> {formData.firstname} {formData.lastname}
      </div>

      <div>
        <strong>Email:</strong> {formData.email}
      </div>

      <div>
        <strong>Email verificado:</strong>{" "}
        {formData.emailVerifiedAt ? "Sim" : "Não"}
      </div>

      <div>
        <strong>Ativo:</strong> {formData.isActive ? "Sim" : "Não"}
      </div>

     <div>
    <strong>Criado em:</strong>{" "}
      {formData.createdAt ? new Date(formData.createdAt).toLocaleString() : "N/A"}
    </div>

    <div>
      <strong>Atualizado em:</strong>{" "}
      {formData.updatedAt ? new Date(formData.updatedAt).toLocaleString() : "N/A"}
    </div>

    </div>
  );
}
