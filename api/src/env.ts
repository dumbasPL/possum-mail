import 'dotenv/config';
import {randomBytes} from 'crypto';
import logger from './logger';

// HTTP

export let HTTP_PORT = parseInt(process.env.PORT ?? '');
if (!Number.isInteger(HTTP_PORT)) {
  HTTP_PORT = 3000;
}

export let BASE_PATH = process.env.BASE_PATH!;
if (!BASE_PATH) {
  BASE_PATH = `http://localhost:${HTTP_PORT}/api`;
  logger.warn(`BASE_PATH not set, using ${BASE_PATH} as the base path`);
}

export let APP_SECRET: string | Buffer = process.env.APP_SECRET ?? '';
if (!APP_SECRET) {
  logger.warn('APP_SECRET not set, using a random secret. All users will be logged out on server restart!');
  APP_SECRET = randomBytes(16);
}

// DATABASE

export let DATABASE_URI = process.env.DATABASE_URI!;
if (!DATABASE_URI) {
  DATABASE_URI = 'postgresql://postgres:admin@localhost:5432/postgres';
  logger.warn(`DATABASE_URI not set, using: ${DATABASE_URI}`);
}

// DEV

export const IS_DEV = process.env.NODE_ENV === 'development';

// INITIALIZATION

export const {INITIAL_USERNAME, INITIAL_PASSWORD} = process.env;
