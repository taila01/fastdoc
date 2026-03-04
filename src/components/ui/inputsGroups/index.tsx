import * as React from 'react';
import { Input } from '@headlessui/react';
import { Tooltip } from '@heroui/react';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';

type InputGroupProps = {
  value?: number | string;
  label?: React.ReactNode | string;
  isRequired?: boolean;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // corrigido aqui
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  className?: string;
  endContent?: React.ReactNode;
  tooltip?: string;
  error?: string | boolean;
  helperText?: string;
  success?: boolean;
};


const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      value,
      label,
      isRequired,
      type = 'text',
      onChange,
      onKeyDown,
      placeholder,
      disabled,
      readOnly,
      className = '',
      endContent,
      tooltip,
      min,
      max,
      error,
      helperText,
      success,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Para campos numéricos, bloqueia entrada inválida
      if (type === 'number' && !/^\d*\.?\d*$/.test(newValue)) return;

      // Se definido min ou max, valida valor
      const numericValue = parseFloat(newValue);
      if (type === 'number' && newValue !== '') {
        if (min !== undefined && numericValue < min) return;
        if (max !== undefined && numericValue > max) return;
      }

      onChange?.({
        ...e,
        target: { ...e.target, value: newValue },
      });
    };


    return (
      <div className={`flex flex-col gap-0.5 w-full ${className}`}>
        {label && (
          <div className="flex items-center gap-2">
            <label
              htmlFor={id}
              className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200'
                }`}
            >
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
            {tooltip && (
              <Tooltip content={tooltip}>
                <AiOutlineInfoCircle className="h-4 w-4 text-gray-400 dark:text-gray-300 cursor-help" />
              </Tooltip>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          <Input
            id={id}
            min={min}
            max={max}
            ref={ref}
            type={type}
            value={value}
            onKeyDown={onKeyDown}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`
    mt-1 block w-full rounded-lg border transition-all duration-200 ease-in-out text-sm px-4 py-2.5 focus:outline-none focus:ring-2 shadow-sm
    ${error
                ? 'border-red-500 focus:ring-red-500/30 dark:border-red-400 dark:focus:ring-red-400/30'
                : success
                  ? 'border-green-500 focus:ring-green-500/30 dark:border-green-400'
                  : 'border-gray-300 hover:border-gray-400 focus:border-brand-500 focus:ring-brand-500/30 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-brand-500'
              }
${disabled
                ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600'
                : readOnly
                  ? ' focus:ring-0 focus:border-gray-200    cursor-not-allowed text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  : 'bg-white dark:bg-gray-800'
              }

pr-10
  `}

            {...props}
          />

          {success && (
            <AiOutlineCheckCircle className="h-5 w-5 text-green-500 absolute right-3" />
          )}

          {endContent && (
            <div className="absolute right-3 flex items-center gap-2">
              {endContent}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1 text-xs space-y-0.5">
            {typeof error === 'string' && (
              <p className="text-red-600 dark:text-red-400">{error}</p>
            )}
            {helperText && (
              <p className={`text-gray-500 dark:text-gray-400 ${error ? 'opacity-70' : ''}`}>
                {helperText}
              </p>
            )}
          </div>
        )}


      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export { InputGroup };
