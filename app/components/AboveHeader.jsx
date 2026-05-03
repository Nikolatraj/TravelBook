'use client';

import React from 'react'
import { useTranslation } from 'react-i18next';

const AboveHeader = () => {
     const { t } = useTranslation();
    
    // repeat the text multiple times so it loops smoothly
    const items = Array(10).fill(t('aboveHeader.tekst'));
  return (
     <div className="bg-black text-white py-2 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((tekst, index) => (
                    <span key={index} className="mx-8 text-sm">
                        ✦ {tekst}
                    </span>
                ))}
            </div>
        </div>
  )
}

export default AboveHeader