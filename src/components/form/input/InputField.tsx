import React, { ReactNode } from "react";

interface InputProps {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | "color" | string,
    id?: string,
    name?: string,
    placeholder?: string,
    defaultValue?: string | number,
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,

    className?: string,
    min?: string | number | undefined,
    max?: string | number | undefined,
    step?: number,
    disabled?: boolean,
    success?: boolean,
    error?: boolean,
    hint?: string,
    required?: boolean,
    maxLength?: number,
    startContent?: ReactNode,
}

const Input = ({
    type = "text",
    id,
    name,
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    value,
    className = "",
    min,
    max,
    step,
    disabled = false,
    success = false,
    error,
    hint,
    maxLength,
    startContent,
}: InputProps) => {

    let inputClasses = `h-11 w-full min-w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;


    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        inputClasses += ` text-error-800 border-error-500 focus:ring focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 w-full`;
    }

    return (
        <div className="relative">
            {startContent && (
                <p className="absolute w-full top-0.5 right-3 z-10 inline-flex h-10 items-center">{startContent}</p>
            )}
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={inputClasses}
                maxLength={maxLength}
            />

            {/* Optional Hint Text */}
            {hint && (
                <p
                    className={`mt-1.5 text-xs ${error
                        ? "text-error-500"
                        : success
                            ? "text-success-500"
                            : "text-gray-500"
                        }`}
                >
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Input;
