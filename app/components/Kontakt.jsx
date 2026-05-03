'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

const Kontakt = () => {
    const { t } = useTranslation();

    return (
        <section className="relative bg-white py-16 px-8 sm:px-16 lg:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-0">

                {/* left - contact card */}
                <div className="lg:w-[480px] flex-shrink-0 z-10">
                    <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col gap-8 h-full">

                        {/* email */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                                    <Mail size={18} className="text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {t('kontakt.email.naslov')}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed pl-1">
                                {t('kontakt.email.tekst')}
                            </p>
                            <a href="mailto:info@travelbook.com">
                                <button className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition-colors rounded-sm w-fit">
                                    info@travelbook.com
                                </button>
                            </a>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* phone */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                                    <Phone size={18} className="text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {t('kontakt.telefon.naslov')}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed pl-1">
                                {t('kontakt.telefon.tekst')}
                            </p>
                            <a href="tel:+18005255458">
                                <button className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition-colors rounded-sm w-fit">
                                    +1 800-525-54-589
                                </button>
                            </a>
                        </div>

                    </div>
                </div>

                {/* right - image */}
                <div className="flex-1 relative min-h-[560px] overflow-hidden lg:-ml-8">
                    <Image
                        src="/CoversOnBedMockUp-Travel.webp"
                        alt="Travelbook albums"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Kontakt;