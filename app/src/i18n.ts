import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import languages from '@/config/languages.json';

const isDev = import.meta.env.MODE === 'development';

i18next.on('languageChanged', lang => {
  document.documentElement.setAttribute('lang', lang);
  document.cookie = `i18next=${lang}; path=/`;
});

if (isDev) {
  // debugging functions meant to bse used from the developer console
  (window as any).i18n = i18next;
  (window as any).setLang = (lang: string) => {
    i18next.changeLanguage(lang);
  };
}

export const i18nextPromise = i18next
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: 'front',
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    debug: isDev,
  });
