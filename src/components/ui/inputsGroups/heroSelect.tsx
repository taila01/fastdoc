import * as React from 'react';
import { Tooltip } from '@heroui/react';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';

type Option = {
    label: string;
    value: string;
};

type SelectGroupProps = {
    label?: string;
    value?: string | number | null;
    onChange?: (value: string) => void;
    options: Option[];
    isRequired?: boolean;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    tooltip?: string;
    error?: string | boolean;
    helperText?: string;
    success?: boolean;
};

const HeroSelect = React.forwardRef<HTMLSelectElement, SelectGroupProps>(
    (
        {
            label,
            value,
            onChange,
            options,
            isRequired,
            placeholder = 'Selecione',
            disabled,
            readOnly,
            className = '',
            tooltip,
            error,
            helperText,
            success,
            ...props
        },
        ref
    ) => {
        const id = React.useId();

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

                <div className="relative">
                    <select
                        id={id}
                        ref={ref}
                        disabled={disabled || readOnly}
                        value={value ?? ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        className={`
              mt-1 block w-full rounded-lg border transition-all duration-200 ease-in-out text-sm px-4 py-2.5 shadow-sm pr-10
              ${error
                                ? 'border-red-500 focus:ring-red-500/30 dark:border-red-400 dark:focus:ring-red-400/30'
                                : success
                                    ? 'border-green-500 focus:ring-green-500/30 dark:border-green-400'
                                    : 'border-gray-300 hover:border-gray-400 focus:border-brand-500 focus:ring-brand-500/30 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-brand-500'}
              ${disabled
                                ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600'
                                : readOnly
                                    ? 'bg-gray-100 cursor-not-allowed text-gray-500 dark:text-gray-400 dark:bg-gray-700'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100'}
            `}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {success && (
                        <AiOutlineCheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    )}
                </div>

                {(error || helperText) && (
                    <div className="flex items-center gap-1.5 text-xs">
                        {error && typeof error === 'string' && (
                            <span className="text-red-600 dark:text-red-400">{error}</span>
                        )}
                        {helperText && !error && (
                            <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

HeroSelect.displayName = 'HeroSelect';

export { HeroSelect };
