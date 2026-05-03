'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            {/* top section */}
            <div className="bg-[#f5f5f5] px-8 sm:px-16 lg:px-32 py-20">
                <div className="max-w-[80%] mx-auto flex flex-col lg:flex-row gap-16">

                    {/* left - CTA */}
                    <div className="flex-1 flex flex-col items-start justify-center gap-8 max-w-[40%]">
                        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight text-center" style={{ fontFamily: 'Georgia, serif' }}>
                            {t('footer.heading')}
                        </h2>
                        <Link href="/create-your-design" className="w-full ">
                            <button className="w-full bg-black text-white py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors">
                                {t('footer.btn')}
                            </button>
                        </Link>
                    </div>

                    {/* right - links */}
                    <div className="flex flex-row gap-16 lg:gap-24">

                        {/* Services */}
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold text-gray-900 mb-2">{t('footer.services.heading')}</p>
                            <Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.services.about')}</Link>
                            <Link href="/cena" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.services.pricing')}</Link>
                            <Link href="/blog" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.services.blog')}</Link>
                            <Link href="/karijere" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.services.careers')}</Link>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold text-gray-900 mb-2">{t('footer.company.heading')}</p>
                            <Link href="/podrska" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.company.support')}</Link>
                            <Link href="/privatnost" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.company.privacy')}</Link>
                            <Link href="/uslovi" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.company.terms')}</Link>
                            <Link href="/vodic" className="text-sm text-gray-500 hover:text-black transition-colors">{t('footer.company.guide')}</Link>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold text-gray-900 mb-2">{t('footer.contact.heading')}</p>
                            <a href="mailto:info@travelbook.com" className="text-sm text-gray-500 hover:text-black transition-colors">
                                info@travelbook.com
                            </a>
                            <div className="flex gap-3 mt-1">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-colors text-sm font-bold">
                                    f
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer"
                                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-colors text-xs">
                                    ig
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* bottom bar */}
            <div className="bg-black px-8 sm:px-16 lg:px-32 py-5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
                    <div className="flex gap-8">
                        <Link href="/podrska" className="text-gray-400 text-sm hover:text-white transition-colors">{t('footer.bottomLinks.support')}</Link>
                        <Link href="/uslovi" className="text-gray-400 text-sm hover:text-white transition-colors">{t('footer.bottomLinks.terms')}</Link>
                        <Link href="/privatnost" className="text-gray-400 text-sm hover:text-white transition-colors">{t('footer.bottomLinks.privacy')}</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;