import React, { Fragment, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { FaCheck } from "react-icons/fa6";
import { BiChevronsDown } from "react-icons/bi";
export interface ComboboxOption {
  id: string | number;
  value: string;
  label: string;
}

interface ComboboxProps {
  id?: string;
  name?: string;
  options: ComboboxOption[];
  placeholder?: string;
  defaultValue?: ComboboxOption;
  value?: ComboboxOption;
  onChange?: (value: ComboboxOption) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  required?: boolean;
  displayValue?: (option: ComboboxOption) => string;
  filterFunction?: (query: string, option: ComboboxOption) => boolean;
}

const HeadlessCombobox = ({
  id,
  name,
  options,
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  disabled = false,
  success = false,
  error = false,
  hint,
  required = false,
  displayValue = (option) => option.label,
  filterFunction = (query, option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
}: ComboboxProps) => {
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | undefined>(
    value || defaultValue
  );
  const [query, setQuery] = useState('');

  const handleChange = (option: ComboboxOption | null) => {
    if (option) {
      setSelectedOption(option);
      if (onChange) {
        onChange(option);
      }
    }
  };

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => filterFunction(query, option));

  let comboboxClasses = `h-11 w-full rounded-lg border appearance-none pl-4 pr-10 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring ${className}`;

  if (disabled) {
    comboboxClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    comboboxClasses += ` text-error-800 border-error-500 focus:ring focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    comboboxClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
  } else {
    comboboxClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <Combobox value={selectedOption} onChange={handleChange} disabled={disabled}>
        <div className="relative">
          <ComboboxInput
            id={id}
            name={name}
            className={comboboxClasses}
            displayValue={(option: ComboboxOption) =>
              option ? displayValue(option) : ''
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            required={required}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BiChevronsDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-white/90 sm:text-sm">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                Nenhum resultado encontrado.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                      ? 'bg-brand-500 text-white dark:bg-brand-800'
                      : 'text-gray-900 dark:text-white/90'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-brand-500 dark:text-brand-400'
                            }`}
                        >
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </Combobox>

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

export default HeadlessCombobox;