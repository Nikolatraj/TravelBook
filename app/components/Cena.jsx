'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const rows = [
    { label: '52 stranica',     a5: 2400,  a4: 2900  },
    { label: '56-72 stranice',  a5: 2800,  a4: 3600  },
    { label: '76-100 stranice', a5: 3200,  a4: 4300  },
    { label: '104 stranice',    a5: null,  a4: 5000  },
];

const currencies = [
    { code: 'RSD', symbol: 'RSD', rate: 1       },
    { code: 'EUR', symbol: '€',   rate: 117    },
    { code: 'BAM', symbol: 'KM',  rate: 59.94   },
];

function formatPrice(amountRSD, currency) {
    if (amountRSD == null) return '—';
    const converted = Math.round(amountRSD / currency.rate);
    const formatted = converted.toLocaleString('sr-RS');
    return currency.code === 'EUR'
        ? `${converted} ${currency.symbol}`
        : `${formatted} ${currency.symbol}`;
}

const Cena = () => {
    const { t } = useTranslation();
    const [activeCurrency, setActiveCurrency] = useState(currencies[0]);

    return (
        <section className="flex justify-center items-center h-[800px] bg-white -mb-32">
            <div className="w-[780] px-8 h-[600] rounded-2xl shadow-2xl bg-[#FAF8F5] overflow-hidden -mb-2 relative z-10 flex flex-col justify-center items-center">

                {/* header row */}
                <div className="w-full grid grid-cols-3 px-10 pt-8 pb-4 border-b border-gray-100">
                    <div className="flex items-end">
                        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase font-sans">
                            {t('cena.stranice')}
                        </p>
                    </div>

                    {/* A5 */}
                    <div className="flex flex-col items-center gap-2">
                        <div style={{
                            width: '42px', height: '58px',
                            border: '1.5px solid #aaa',
                            borderRadius: '3px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: '700',
                        }}>A5</div>
                        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase font-sans">
                            {t('cena.cena')}
                        </p>
                    </div>

                    {/* A4 */}
                    <div className="flex flex-col items-center gap-2">
                        <div style={{
                            width: '52px', height: '72px',
                            border: '1.5px solid #aaa',
                            borderRadius: '3px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: '700',
                        }}>A4</div>
                        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase font-sans">
                            {t('cena.cena')}
                        </p>
                    </div>
                </div>

                {/* feature rows */}
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className="w-full grid grid-cols-3 px-10 py-4 border-b border-gray-100 last:border-none hover:bg-white transition-colors rounded-xl"
                        style={{ background: i % 2 !== 1 ? '#dddddd' : 'transparent' }}
                    >
                        <p className="text-sm text-gray-500 font-sans self-center">{row.label}</p>
                        <p className="text-sm font-semibold text-gray-800 font-sans text-center self-center">
                            {formatPrice(row.a5, activeCurrency)}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 font-sans text-center self-center">
                            {formatPrice(row.a4, activeCurrency)}
                        </p>
                    </div>
                ))}

                {/* currency switcher */}
                <div className="absolute top-4 right-4 flex gap-2">
                    {currencies.map((c) => (
                        <button
                            key={c.code}
                            onClick={() => setActiveCurrency(c)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors font-sans
                                ${activeCurrency.code === c.code
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                }`}
                        >
                            {c.code}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Cena;
