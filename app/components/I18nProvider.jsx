'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../public/locales/en/translation.json';
import sr from '../../public/locales/sr/translation.json';

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        lng: 'sr',
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            sr: { translation: sr },
        },
        interpolation: { escapeValue: false },
    });
}

export default function I18nProvider({ children }) {
    return <>{children}</>;
}