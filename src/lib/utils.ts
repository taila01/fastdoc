import { Guard, SerializableError } from "@/services/interfaces/Api/ApiInterface";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BackendFormErrors {
  [key: string]: string[];
}

interface HandleBackendFormErrorsProps<T extends FieldValues> {
  setError?: UseFormSetError<T>;
  error: unknown;
  toast: (options: { variant: "default" | "destructive"; description: string }) => void;
  customMessage?: string;
}

export function handleBackendFormErrors<T extends FieldValues>({
  setError,
  error,
  toast,
  customMessage
}: HandleBackendFormErrorsProps<T>) {
  if (customMessage) {
    toast({
      variant: "destructive",
      description: customMessage
    });
    return;
  }

  if (!setError) {
    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? error.message
        : "An unexpected error occurred.";
    toast({
      variant: "destructive",
      description: message
    });
    return;
  }

  if (axios.isAxiosError(error) && error.response?.status === 422 && error.response.data.errors) {
    const errors: BackendFormErrors = error.response.data.errors;
    Object.keys(errors).forEach((field) => {
      const errorMessage = errors[field].join(" ");
      setError(field as Path<T>, {
        type: "manual",
        message: errorMessage
      });
    });
  } else {
    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.message ?? error.message
        : "An unexpected error occurred.";
    toast({
      variant: "destructive",
      description: message
    });
  }
}

export const serializeError = (error: unknown): SerializableError => {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      result: {},
      error: {
        message: error.response?.data?.message ?? error.message,
        code: error.code,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data
            }
          : undefined
      }
    };
  } else if (error instanceof Error) {
    return {
      success: false,
      result: {},
      error: {
        message: error.message
      }
    };
  } else {
    return {
      success: false,
      result: {},
      error: {
        message: "Unknown error occurred"
      }
    };
  }
};

export const isValidGuard = (guard: string): guard is Guard => {
  return guard === "admin" || guard === "manager" || guard === "user";
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  pathname: string;
  resetPagination?: boolean;
  withPagination?: boolean;
}

export const formUrlQuery = ({
  params,
  key,
  value,
  pathname,
  resetPagination = false,
  withPagination = true
}: UrlQueryParams) => {
  const searchParams = new URLSearchParams(params);

  if (value === null) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }

  if (resetPagination && withPagination) {
    searchParams.set("page", "1");
  }

  return `${pathname}?${searchParams.toString()}`;
};