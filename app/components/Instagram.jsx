import React from 'react'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

const objave = [
    {
        image: '/destinacije/diajn-america.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
    {
        image: '/destinacije/diajn-budapest.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
    {
        image: '/destinacije/diajn-amsterdam.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
    {
        image: '/destinacije/diajn-barcelona.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
    {
        image: '/destinacije/diajn-dubai.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
    {
        image: '/destinacije/diajn-egypt.jpeg',
        link: 'https://www.instagram.com/travelbook.rs/',
    },
];

const Instagram = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-white py-24 px-8 sm:px-16 lg:px-24">

            {/* Centrian tekst */}
            <div className="text-center mb-8 px-8 sm:px-16 lg:px-48">
                <h2 className="text-3xl font-semibold mb-3">{t('instagram.heading')}</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">{t('instagram.link')}</p>
            </div>

            {/* Slike */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {objave.map((objava, index) => (
                    <Link key={index} href={objava.link} target="_blank" rel="noopener noreferrer">
                        <div className="relative aspect-[7/10] rounded-xl overflow-hidden">
                            <Image
                                src={objava.image}
                                alt={`Instagram post ${index + 1}`}
                                fill
                                className="object-cover  hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default Instagram