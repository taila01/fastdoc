export type ValidationErrors = Record<string, string>;

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export const DocumentFormField = {
  firstname: "",
  lastname: "",
  email: "",
  emailVerifiedAt: "",
  password: "",
  confirmPassword: "",
}