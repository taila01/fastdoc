"use client";
import { BiCheck, BiInfoCircle } from 'react-icons/bi';
import { FaX } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoWarningOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { motion, PanInfo } from 'framer-motion';

interface ToastProps {
  title?: string;
  message: string;
  error?: unknown;
  type?: 'success' | 'error' | 'info' | 'loading' | 'warning';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  className?: string;
}

interface PromiseToastOptions {
  loading: string;
  success: string;
  error: string;
  loadingTitle?: string;
  successTitle?: string;
  errorTitle?: string;
  position?: ToastProps['position'];
  duration?: number;
}

// Função para tratar erros e extrair a mensagem apropriada
const getErrorMessage = (error: unknown): string => {
  if (!error) return "Ocorreu um erro inesperado.";

  // Se for um objeto e tiver uma mensagem, usamos ela
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }

  // Se for um objeto e tiver um status, tentamos mapear a mensagem
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = Number(error.status);
    switch (status) {
      case 400:
        return "Requisição inválida. Verifique os dados enviados.";
      case 401:
        return "Não autorizado. Faça login para continuar.";
      case 403:
        return "Acesso negado. Você não tem permissão para isso.";
      case 404:
        return "Recurso não encontrado.";
      case 422:
        return "Erro de validação. Verifique os campos e tente novamente.";
      case 500:
        return "Erro interno do servidor. Tente novamente mais tarde.";
      default:
        return `Erro desconhecido (código ${status}).`;
    }
  }

  // Se o erro for uma string, retornamos diretamente
  if (typeof error === "string") return error;

  return "Ocorreu um erro inesperado.";
};

export const HotToast = ({
  title,
  message,
  error,
  position,
  className,
  type = 'info',
  duration = 3000
}: ToastProps) => {
  // Para erros, priorizamos a mensagem vinda do backend
  const finalMessage = type === 'error' ? getErrorMessage(error) || message : message;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, toastId: string) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x) + Math.abs(info.velocity.y);
    const distance = Math.abs(info.offset.x) + Math.abs(info.offset.y);

    if (distance > threshold || velocity > 500) {
      toast.dismiss(toastId);
    }
  };

  return toast.custom(
    (t) => (
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => handleDragEnd(event, info, t.id)}
        whileDrag={{ scale: 1.05, rotate: 5 }}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{
          opacity: t.visible ? 1 : 0,
          y: t.visible ? 0 : -50,
          scale: t.visible ? 1 : 0.9
        }}
        exit={{ opacity: 0, scale: 0.9, y: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          max-w-sm w-full cursor-grab active:cursor-grabbing
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
          shadow-lg rounded-lg pointer-events-auto
          border border-gray-200 dark:border-gray-700
          ${className || ''}
        `}
      >
        {/* Linha colorida no topo */}
        <div className={`h-1 w-full rounded-t-lg ${type === 'success' ? 'bg-green-500' :
          type === 'error' ? 'bg-red-500' :
            type === 'warning' ? 'bg-orange-500' :
              type === 'loading' ? 'bg-blue-500' :
                'bg-blue-500'
          }`} />

        <div className="p-3">
          <div className="flex items-start gap-3">
            {/* Ícone menor */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-green-100 dark:bg-green-900/50' :
              type === 'error' ? 'bg-red-100 dark:bg-red-900/50' :
                type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/50' :
                  type === 'loading' ? 'bg-blue-100 dark:bg-blue-900/50' :
                    'bg-blue-100 dark:bg-blue-900/50'
              }`}>
              {type === 'success' ? (
                <BiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : type === 'error' ? (
                <FaX className="w-3 h-3 text-red-600 dark:text-red-400" />
              ) : type === 'warning' ? (
                <IoWarningOutline className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              ) : type === 'loading' ? (
                <AiOutlineLoading3Quarters className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
              ) : (
                <BiInfoCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              {title && (
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {title}
                </p>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {finalMessage}
              </p>
            </div>

            {/* Botão X compacto */}
            {type !== 'loading' && (
              <button
                onClick={() => toast.dismiss(t.id)}
                className="shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaX className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    ),
    {
      duration: type === 'loading' ? Infinity : duration,
      position: position ?? 'top-right'
    }
  );
};

// Extensão do HotToast para aceitar promises
HotToast.promise = function <T>(
  promise: Promise<T> | (() => Promise<T>),
  options: PromiseToastOptions
): Promise<T> {
  const loadingToastId = HotToast({
    title: options.loadingTitle,
    message: options.loading,
    type: 'loading',
    position: options.position
  });

  const promiseToHandle = typeof promise === 'function' ? promise() : promise;

  promiseToHandle
    .then((data) => {
      toast.dismiss(loadingToastId);
      HotToast({
        title: options.successTitle,
        message: options.success,
        type: 'success',
        duration: options.duration,
        position: options.position
      });
      return data;
    })
    .catch((error) => {
      toast.dismiss(loadingToastId);
      HotToast({
        title: options.errorTitle || 'Erro',
        message: options.error,
        type: 'error',
        error,
        duration: options.duration,
        position: options.position
      });
      return error;
    });

  return promiseToHandle;
};