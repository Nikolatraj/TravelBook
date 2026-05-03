'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ButtonPrimary from './UI/ButtonPrimary';
import ButtonSecondary   from './UI/ButtonSecondary';

const slides = [
    { image: '/1.png', link: '/create-your-design?theme=newyork' },
    { image: '/2.png', link: '/create-your-design?theme=paris' },
    { image: '/3.png', link: '/create-your-design?theme=london' },
    { image: '/4.png', link: '/create-your-design?theme=tokyo' },
];

const stats = [
    { value: '500+', labelKey: 'hero.stat1' },
    { value: '4.9★', labelKey: 'hero.stat2' },
    { value: '48h',  labelKey: 'hero.stat3' },
];

const Hero = () => {
  const { t } = useTranslation();
  const [currentLink, setCurrentLink] = useState(slides[0].link);

  return (
    <div className="w-full h-[calc(100vh-92px)] sm:h-[calc(100vh-116px)] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper) => setCurrentLink(slides[swiper.realIndex].link)}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <section
              style={{ backgroundImage: `url(${slide.image})` }}
              className="bg-cover bg-center bg-no-repeat w-full h-full relative overflow-hidden"
            >
              {/* dark overlay */}
              <div className="absolute inset-0 bg-[#0a1628]/50" />

              {/* vertical scroll text - right side */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
                <div className="w-px h-16 bg-white/40" />
                <span
                  className="text-white/50 text-xs tracking-widest uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {t('hero.scroll')}
                </span>
                <div className="w-px h-16 bg-white/40" />
              </div>

              {/* content */}
              <div className="relative z-10 h-full flex items-center px-8 sm:px-16 lg:px-48">
                <div className="max-w-4/10">

                  {/* heading */}
                  <h1 className="text-white text-3xl sm:text-4xl lg:text-[50px] font-semibold leading-tight mb-6">
                    {t('hero.heading')}
                  </h1>

                  {/* paragraph */}
                  <p className="text-white/75 text-sm sm:text-base lg:text-[18px] leading-relaxed mb-10 max-w-full px-4 sm:px-8 lg:px-10">
                    {t('hero.paragraf')}
                  </p>

                  {/* buttons */}
                  <div className="flex flex-wrap gap-4 px-4 sm:px-8 lg:px-10 mb-12">
                    <ButtonPrimary text={t('btn.nd')} link={currentLink} />
                    <ButtonSecondary text={t('btn.pr')} link="/recenzije" />
                  </div>

                  {/* stats */}
                  <div className="flex gap-8 px-4 sm:px-8 lg:px-10 border-t border-white/20 pt-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-white text-xl font-bold">{stat.value}</span>
                        <span className="text-white/50 text-xs mt-1">{t(stat.labelKey)}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;