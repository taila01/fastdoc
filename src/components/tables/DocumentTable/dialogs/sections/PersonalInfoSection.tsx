import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { AdminCreateData } from "@/services/interfaces/Admin/AdminInterface";

interface PersonalInfoSectionProps {
  formData: AdminCreateData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
  errors: Record<string, string>;
}

export default function PersonalInfoSection({
  formData,
  handleInputChange,
  errors
}: PersonalInfoSectionProps) {
  return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstname">Nome</Label>
            <Input
            type="text"
            placeholder="Digite o Nome"
            id="firstname"
            value={formData.firstname ?? ""}
            onChange={handleInputChange}
            error={!!errors.firstname}
            />
        {errors.firstname && <p className="mt-1 text-sm text-danger-500">{errors.firstname}</p>}
          </div>
         <div>
            <Label htmlFor="lastname">Sobrenome</Label>
            <Input
            type="text"
            placeholder="Sobrenome "
            id="lastname"
            value={formData.lastname ?? ""}
            onChange={handleInputChange}
            error={!!errors.lastname}
            />
        {errors.lastname && <p className="mt-1 text-sm text-danger-500">{errors.lastname}</p>}
          </div>
          <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          placeholder="Digite o email do administrador"
          id="email"
          value={formData.email ?? ""}
          onChange={handleInputChange}
          error={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-danger-500">{errors.email}</p>}
      </div>
          <div>
            <Label htmlFor="emailVerifiedAt"> Confirmar Email</Label>
            <Input
              type="text"
              id="emailVerifiedAt"
              placeholder="Confirme o email do administrador"
              value={formData.emailVerifiedAt || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.confirmEmail && <p className="mt-1 text-sm text-danger-500">{errors.confirmEmail}</p>}
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Digite a senha do administrador"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.password && <p className="mt-1 text-sm text-danger-500">{errors.password}</p>}
          </div>
          <div>
            <Label htmlFor="password_confirmation">Confirmar Senha</Label>
            <Input
              type="password"
              id="password_confirmation" 
              placeholder="Digite a senha do administrador"
              name="password_confirmation"
              value={formData.password_confirmation || ''}
              onChange={handleInputChange}
              />
            {errors.password_confirmation && <p className="mt-1 text-sm text-danger-500">{errors.password_confirmation}</p>}
          </div>

        </div>
      </div>
  );
}
