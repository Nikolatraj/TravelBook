'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import ButtonPrimary from './UI/ButtonPrimary';

const filters = ['Sve', 'Evropa', 'Azija', 'Amerika', 'Australija', 'Afrika'];

const products = [
    { id: 1, image: '/PARS.png', region: 'Evropa', name: 'Italija', price: '2.400 RSD' },
    { id: 2, image: '/PARS.png', region: 'Evropa', name: 'Španija', price: '2.400 RSD' },
    { id: 3, image: '/PARS.png', region: 'Azija', name: 'Japan', price: '2.400 RSD' },
    { id: 4, image: '/PARS.png', region: 'Amerika', name: 'New York', price: '2.400 RSD' },
    { id: 5, image: '/PARS.png', region: 'Evropa', name: 'Pariz', price: '2.400 RSD' },
    { id: 6, image: '/PARS.png', region: 'Azija', name: 'Tajland', price: '2.400 RSD' },
    { id: 7, image: '/PARS.png', region: 'Australija', name: 'Sidney', price: '2.400 RSD' },
    { id: 8, image: '/PARS.png', region: 'Afrika', name: 'Maroko', price: '2.400 RSD' },
];

const PopularniAlbumi = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('Sve');

    const filtered = activeFilter === 'Sve'
        ? products
        : products.filter(p => p.region === activeFilter);

    return (
        <section className="py-16 bg-[#FAF8F5] overflow-hidden">

            {/* heading */}
            <div className="text-center mb-8 px-8 sm:px-16 lg:px-48">
                <h2 className="text-3xl font-semibold mb-3">{t('albumi.heading')}</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">{t('albumi.paragraf')}</p>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-10 px-8 sm:px-16 lg:px-48">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors duration-200
                            ${activeFilter === filter
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black border-gray-300 hover:border-black'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* swiper products */}
            <Swiper
                modules={[FreeMode]}
                freeMode
                slidesPerView={5.5}
                spaceBetween={16}
                slidesOffsetBefore={192}
                className="!overflow-visible"
            >
                {filtered.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div>
                            {/* image */}
                            <div className="relative mb-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-90 object-cover rounded-sm"
                                />
                                <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100 transition-colors">
                                    <ShoppingCart size={24} />
                                </button>
                            </div>

                            {/* info */}
                            <p className="text-xs text-gray-400 mb-1">{product.region}</p>
                            <p className="text-sm font-medium mb-1">{product.name}</p>
                            <p className="text-sm font-bold">{product.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* pogledaj vise button */}
            <div className="flex justify-center mt-12 px-8 sm:px-16 lg:px-48">
              <ButtonPrimary text={t('albumi.btn')} link="/albumi" variant='black'  />

            </div>

        </section>
    );
};

export default PopularniAlbumi;