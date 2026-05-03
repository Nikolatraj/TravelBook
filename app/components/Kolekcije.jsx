'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

const kolekcije = [
    {
        image: '/elementor-placeholder-image.png',
        titleKey: 'kolekcije.k1.naslov',
        textKey: 'kolekcije.k1.tekst',
        link: '/albumi?kategorija=ljubav',
    },
    {
        image: '/elementor-placeholder-image.png',
        titleKey: 'kolekcije.k2.naslov',
        textKey: 'kolekcije.k2.tekst',
        link: '/albumi?kategorija=porodica',
    },
    {
        image: '/elementor-placeholder-image.png',
        titleKey: 'kolekcije.k3.naslov',
        textKey: 'kolekcije.k3.tekst',
        link: '/albumi?kategorija=prijatelji',
    },
];

const Kolekcije = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-white py-24 px-8 sm:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center">

                {/* left text */}
                <div className="lg:w-64 flex-shrink-0">
                    <h2 className="text-4xl font-semibold mb-5 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        {t('kolekcije.heading')}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        {t('kolekcije.paragraf')}
                    </p>
                    <Link href="/albumi">
                        <button className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition-colors flex items-center gap-2">
                            {t('kolekcije.btn')} →
                        </button>
                    </Link>
                </div>

                {/* cards */}
                <div className="flex-1 flex flex-col sm:flex-row gap-5">
                    {kolekcije.map((k, i) => (
                        <Link key={i} href={k.link} className="flex-1">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group">

                                {/* image */}
                                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={k.image}
                                        alt={t(k.titleKey)}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* text */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                        {t(k.titleKey)}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                        {t(k.textKey)}
                                    </p>
                                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm group-hover:bg-gray-800 transition-colors">
                                        →
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Kolekcije;