'use client';

import React, { useState, useEffect } from 'react';
import { useCities } from '@/hooks/cities/useCities';

interface CitySelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: string } }) => void;
    disabled?: boolean;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange, disabled = false }) => {
    const { cities = [], loading } = useCities();
    const [selectedCity, setSelectedCity] = useState<string>('');

    // Sync external value with internal state
    useEffect(() => {
        setSelectedCity(value || '');
    }, [value]);

    // Handle selection change while maintaining compatibility with previous interface
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityName = e.target.value;
        setSelectedCity(cityName);
        onChange(e);
    };

    return (
        <div className="relative flex flex-col gap-0.5">
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                Cidade*
            </label>
            <select
                value={selectedCity}
                onChange={handleChange}
                disabled={disabled || loading}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 py-2 px-3 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
                <option value="">Selecione uma cidade</option>
                {Array.from(new Set(cities.map(city => city.name)))
                    .sort((a, b) => a.localeCompare(b))
                    .map((cityName) => (
                        <option key={cityName} value={cityName}>
                            {cityName}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default CitySelect;