import i18next, {LoggerModule} from 'i18next';
import FsBackend from 'i18next-fs-backend';
import httpMiddleware from 'i18next-http-middleware';
import path from 'path';
import logger from './logger';

const subLogger = logger.getSubLogger({name: 'i18n'});

const loggerBackend: LoggerModule = {
  type: 'logger',
  log: (...args: any[]) => subLogger.debug(...args),
  warn: (...args: any[]) => subLogger.warn(...args),
  error: (...args: any[]) => subLogger.error(...args),
};

i18next.on('initialized', options => {
  const count = !options.supportedLngs ? 0 : options.supportedLngs.filter(l => l != 'cimode').length;
  loggerBackend.log(`Initialized i18n with ${count} languages`);
});

const languages = ['pl', 'en'];

export async function loadI18n() {
  return await i18next
    .use(loggerBackend)
    .use(FsBackend)
    .use(httpMiddleware.LanguageDetector)
    .init({
      ns: 'back',
      fallbackLng: 'en',
      supportedLngs: languages,
      preload: languages,
      detection: {
        order: ['cookie'], // only translate when explicitly request by frontend
        lookupCookie: 'i18next',
      },
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      }
      // debug: true,
    });
}

export function getI18nMiddleware() {
  return httpMiddleware.handle(i18next);
}
