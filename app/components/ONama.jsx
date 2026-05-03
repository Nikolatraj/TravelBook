'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from './UI/ButtonPrimary';
import ButtonSecondary from './UI/ButtonSecondary';

const ONama = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col lg:flex-row min-h-[800px]">

      {/* left - text content */}
      <div className="flex-1 flex items-center px-8 sm:px-16 lg:px-48 py-16 lg:py-0 bg-white">
        <div className="max-w-full">

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight mb-8 max-w-9/10">
            {t('oNama.heading')}
          </h2>
        <div className="max-w-7/10">
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {t('oNama.p1')}
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-10">
            {t('oNama.p2')}
          </p>
        </div>
          <div className="flex flex-wrap gap-4">
            <ButtonPrimary
              text={t('oNama.btn1')}
              link="/create-your-design"
              variant="black"
            />
            <ButtonSecondary
              text={t('oNama.btn2')}
              link="/albumi"
              variant="black" 
            />
          </div>

        </div>
      </div>

      {/* right - image */}
      <div className="flex-1 relative min-h-[400px] lg:min-h-0">
        <Image
          src="/CoversOnBedMockUp-Travel.webp"
          alt="Travel books"
          fill
          className="object-cover"
        />
      </div>

    </section>
  );
};

export default ONama;