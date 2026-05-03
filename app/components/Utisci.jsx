'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const reviews = [
    {
        text: '"Mislio sam da će moje slike sa putovanja zauvek ostati samo na telefonu. Kada sam ih pretvorio u knjigu, shvatio sam koliko je lepo imati uspomene koje možeš da prelistaš kad god poželiš. Poklon koji je raznežio celu porodicu. Napravili smo zajedničku knjigu sa svih naših putovanja i sada stoji na polici kao pravo malo blago"',
        name: 'Nikola Trajković',
        city: 'NIŠ',
        stars: 5,
    },
    {
        text: '"Fotografije su mi godinama stajale u telefonu. Odlučila sam da napravim knjigu za mamu za rođendan i plakala je od sreće. Kvalitet štampe je neverovatno dobar, papir je lep, a dizajn je bio jednostavan za napraviti."',
        name: 'Milica Đorđević',
        city: 'BEOGRAD',
        stars: 5,
    },
    {
        text: '"Koristio sam Travelbook za naše venčano putovanje. Knjiga je stigla za 2 dana i izgledala je profesionalnije nego što sam očekivao. Svako ko je vidi pita gde smo je napravili."',
        name: 'Stefan Petrović',
        city: 'NOVI SAD',
        stars: 4,
    },
];

const Utisci = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-8 sm:px-16 lg:px-48 bg-[#f5f0eb]">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-[70%] mx-auto">

                {/* left */}
                <div className="flex-1 w-[50%]">
                    <h2 className="text-4xl lg:text-5xl font-semibold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {t('utisci.heading')}
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm font-sans">
                        {t('utisci.paragraf')}
                    </p>
                    <button className="bg-black text-white px-8 py-4 text-sm font-sans tracking-wide hover:bg-gray-800 transition-colors">
                        {t('utisci.btn')} →
                    </button>
                </div>

                {/* right - swiper */}
                <div className="flex-1 w-[50%]">
                    <Swiper
                        modules={[Navigation]}
                        loop
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.utisci-prev',
                            nextEl: '.utisci-next',
                        }}
                    >
                        {reviews.map((review, idx) => {
                            const initials = review.name.split(' ').map(n => n[0]).join('');
                            return (
                                <SwiperSlide key={idx}>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                        <div className="p-8 pb-6">
                                            <div className="text-6xl text-gray-200 font-serif leading-none mb-4">"</div>
                                            <p className="text-gray-700 text-base leading-relaxed font-sans">
                                                {review.text}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between px-6 py-4" style={{ background: '#f472b6' }}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold font-sans">
                                                    {initials}
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-semibold font-sans">{review.name}</p>
                                                    <p className="text-white/70 text-xs font-sans">{review.city}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className="text-white text-sm" style={{ opacity: i < review.stars ? 1 : 0.4 }}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* nav buttons */}
                    <div className="flex gap-3 justify-center mt-6">
                        <button className="utisci-prev w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-colors font-sans">
                            ←
                        </button>
                        <button className="utisci-next w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors font-sans">
                            →
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Utisci;
