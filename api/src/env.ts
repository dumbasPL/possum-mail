import 'dotenv/config';
import {randomBytes} from 'crypto';
import logger from './logger';

// GENERIC

export let PORT = parseInt(process.env.PORT ?? '');
if (!Number.isInteger(PORT)) {
  PORT = 3000;
}

export let BASE_PATH = process.env.BASE_PATH!;
if (!BASE_PATH) {
  BASE_PATH = `http://localhost:${PORT}/api`;
  logger.warn(`BASE_PATH not set, using ${BASE_PATH} as the base path`);
}

export let APP_SECRET: string | Buffer = process.env.APP_SECRET ?? '';
if (!APP_SECRET) {
  logger.warn('APP_SECRET not set, using a random secret. All users will be logged out on server restart!');
  APP_SECRET = randomBytes(16);
}

export const IS_DEV = process.env.NODE_ENV === 'development';

// INITIALIZATION

export const {INITIAL_USERNAME, INITIAL_PASSWORD} = process.env;
