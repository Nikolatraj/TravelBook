'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'sr', flag: '/serbiaFlag.png', label: 'SR' },
        { code: 'en', flag: '/ukFlag.png', label: 'EN' },
    ];

    const current = languages.find(l => l.code === i18n.language) || languages[0];
    const others = languages.filter(l => l.code !== i18n.language);

    return (
        <div className="relative">
            {/* Current language - always visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 w-30 border border-gray-300 bg-white text-sm font-medium"
            >
                <Image src={current.flag} width={50} height={20} alt={current.label} />
                {current.label}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-24 border border-t-0 border-gray-300 bg-white z-50">
                    {others.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                i18n.changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-50 text-sm border-t border-gray-300"
                        >
                            <Image src={lang.flag} width={24} height={16} alt={lang.label} />
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;