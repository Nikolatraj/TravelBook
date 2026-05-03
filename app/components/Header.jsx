'use client';

import React from 'react'
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
      const { t, i18n } = useTranslation();
  return (
    <section  className='flex flex-row h-14 sm:h-20 items-center'>
        <div className='flex w-1/3 justify-center items-center gap-1 sm:gap-2'>
            <Link href="/destinacije">{t('nav.destinacije')}</Link>
            <Link href="/o-nama">{t('nav.oNama')}</Link>
            <Link href="/contact">{t('nav.kontakt')}</Link>
        </div>

        <div className='flex w-1/3 justify-center items-center gap-1 sm:gap-2'>
            <Image
                src="/logo.png"
                width="300"
                height="70"
                alt="Logo Slika"
                className="h-7 sm:h-10 w-auto"
                
            />
        </div>

        <div className='flex w-1/3 justify-center items-center gap-1 sm:gap-2'>
               <LanguageSwitcher />

        </div>
    </section>
  )
}

export default Header