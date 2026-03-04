'use client';

import React, { useState, useEffect } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useBanks } from '@/hooks/bank/useBank';
import { useBankAssociations } from '@/hooks/bank/useBankAssociations';
import { BiChevronDown } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa6';

interface BankSelectProps {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: string } }) => void;
    disabled?: boolean;
    bankCode?: string | number | null;
}

const BankCombobox: React.FC<BankSelectProps> = ({ value, onChange, disabled = false, bankCode }) => {
    const { useNewBanks } = useBankAssociations();
    const { data: banksFromNew = [], isLoading: isLoadingNew } = useNewBanks(bankCode?.toString() ?? '149');
    const { data: banksFromOld = [], isLoading: isLoadingOld } = useBanks(false);

    const banks = bankCode ? banksFromNew : banksFromOld;
    const isLoading = bankCode ? isLoadingNew : isLoadingOld;

    const [query, setQuery] = useState('');
    const [selectedBank, setSelectedBank] = useState<string | number>('');

    // Filter valid banks (those with bankCode)
    const validBanks = React.useMemo(() => {
        return banks.filter((bank) => bank && bank.bankCode != null);
    }, [banks]);

    // Sync external value with internal state
    useEffect(() => {
        setSelectedBank(value || '');
    }, [value]);

    // Filter banks based on search query
    const filteredBanks = React.useMemo(() => {
        if (query === '') return validBanks;

        return validBanks.filter((bank) => {
            if (!bank || !bank.bankCode) return false;
            const bankName = bank.shortname || bank.longname || '';
            const searchText = `${bank.bankCode} - ${bankName}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
    }, [validBanks, query]);

    // Handle selection change while maintaining compatibility with previous interface
    const handleChange = (bankCode: string | null) => {
        if (bankCode) {
            setSelectedBank(bankCode);
            onChange({
                target: {
                    value: bankCode
                }
            });
        }
    };

    // Find selected bank to display full text
    const getSelectedBankDisplay = () => {
        if (!selectedBank) return '';
        const bank = validBanks.find(b => b && b.bankCode?.toString() === selectedBank.toString());
        return bank ? `${bank.bankCode} - ${bank.longname || bank.shortname}` : '';
    };

    return (
        <div className="relative flex flex-col gap-0.5">
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                Código do Banco*
            </label>
            <Combobox value={selectedBank?.toString() || ''} onChange={handleChange} disabled={disabled || isLoading}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500 py-0.5">
                        <ComboboxInput
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 dark:text-gray-200 bg-transparent focus:ring-0"
                            displayValue={() => getSelectedBankDisplay()}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Selecione ou pesquise um banco"
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BiChevronDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </ComboboxButton>
                    </div>
                    <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredBanks.length === 0 ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                                Nenhum banco encontrado.
                            </div>
                        ) : (
                            <>
                                <ComboboxOption
                                    value=""
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                            ? 'bg-brand-100 dark:bg-brand-800 text-brand-900 dark:text-brand-100'
                                            : 'text-gray-900 dark:text-gray-100'
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                Selecione um banco
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-600 dark:text-brand-400">
                                                    <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </ComboboxOption>
                                {filteredBanks.map((bank) => {
                                    if (!bank || !bank.bankCode) return null;

                                    return (
                                        <ComboboxOption
                                            key={bank.bankCode}
                                            value={bank.bankCode.toString()}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                                    ? 'bg-brand-100 dark:bg-brand-800 text-brand-900 dark:text-brand-100'
                                                    : 'text-gray-900 dark:text-gray-100'
                                                }`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {bank.bankCode} - {bank.longname || bank.shortname}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-600 dark:text-brand-400">
                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ComboboxOption>
                                    );
                                })}
                            </>
                        )}
                    </ComboboxOptions>
                </div>
            </Combobox>
        </div>
    );
};

export default BankCombobox;