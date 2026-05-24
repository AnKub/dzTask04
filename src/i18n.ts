import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import ukCommon from './locales/uk/common.json';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uk: {
        common: ukCommon,
      },
      en: {
        common: enCommon,
      },
      es: {
        common: esCommon,
      },
    },
    fallbackLng: 'uk',
    supportedLngs: ['uk', 'en', 'es'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;