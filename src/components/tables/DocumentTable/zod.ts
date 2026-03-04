import { z } from "zod";
import type { ValidationErrors } from "./types";
import { DocumentCreateData } from "@/services/interfaces/Document/DocumentInterface";

const basicInfoSchema = z.object({
  firstname: z.string()
    .min(1, "Nome é obrigatório")
    .refine(val => val.trim().length > 0, {
      message: "Nome é obrigatório"
    }),
  lastname: z.string()
    .min(1, "Sobrenome é obrigatório")
    .refine(val => val.trim().length > 0, {
      message: "Sobrenome é obrigatório"
    }),
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
    emailVerifiedAt: z.string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z.string()
    .max(8, "Senha deve ter no maximo 8 caracteres"),
  password_confirmation: z.string()
    .max(8, "Confirmação de senha é obrigatória")
}).refine(data => data.password === data.password_confirmation, {
  message: "As senhas não coincidem",
  path: ["password_confirmation"]
});


export const validateStep = (step: number, data: DocumentCreateData) => {
  const errors: ValidationErrors = {};

  try {
    switch (step) {
      case 0:
        basicInfoSchema.parse(data);
        break;
      case 2:
        
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        const path = err.path[0] as string;
        errors[path] = err.message;
      });
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};