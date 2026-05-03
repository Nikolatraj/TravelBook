'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import AboveHeader from '../components/AboveHeader';
import Footer from '../components/Footer';
import Kontakt from '../components/Kontakt';
import Instagram from '../components/Instagram';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <main>
            <AboveHeader />
            <Header />

            {/* hero section */}
            <section className="bg-white px-8 sm:px-16 lg:px-32 py-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">

                    {/* left - big heading */}
                    <div className="flex-1">
                        <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            {t('about.hero.heading')}
                        </h1>
                    </div>

                    {/* right - text + stats */}
                    <div className="flex-1 flex flex-col gap-10">
                        <p className="text-gray-500 text-base leading-relaxed">
                            {t('about.hero.paragraf')}
                        </p>

                        {/* stats */}
                        <div className="flex flex-row gap-0 border-t border-gray-200 pt-8">
                            <div className="flex-1 pr-6 border-r border-gray-200">
                                <p className="text-2xl font-bold text-gray-900 mb-1">500+</p>
                                <p className="text-sm text-gray-400">{t('about.hero.stat1')}</p>
                            </div>
                            <div className="flex-1 px-6 border-r border-gray-200">
                                <p className="text-2xl font-bold text-gray-900 mb-1">48h</p>
                                <p className="text-sm text-gray-400">{t('about.hero.stat2')}</p>
                            </div>
                            <div className="flex-1 pl-6">
                                <p className="text-2xl font-bold text-gray-900 mb-1">98%</p>
                                <p className="text-sm text-gray-400">{t('about.hero.stat3')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* image + text section */}
            <section className="bg-white">
                <div className="flex flex-col lg:flex-row">

                    {/* left - image */}
                    <div className="flex-1 relative min-h-[500px] lg:min-h-[600px]">
                        <Image
                            src="/CoversOnBedMockUp-Travel.webp"
                            alt="Travelbook albums"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* right - text */}
                    <div className="flex-1 flex items-center px-8 sm:px-16 lg:px-20 py-16 bg-[#f9f6f2]">
                        <div className="max-w-lg">
                            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                {t('about.section2.heading')}
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                {t('about.section2.p1')}
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10">
                                {t('about.section2.p2')}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/create-your-design">
                                    <button className="bg-black text-white px-8 py-4 text-sm hover:bg-gray-800 transition-colors">
                                        {t('about.section2.btn1')} →
                                    </button>
                                </Link>
                                <Link href="/recenzije">
                                    <button className="border border-black text-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-colors">
                                        {t('about.section2.btn2')} →
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Kontakt />
            <Instagram />
            <Footer />
        </main>
    );
};

export default AboutPage;