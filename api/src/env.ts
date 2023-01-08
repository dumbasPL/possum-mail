import 'dotenv/config';
import {randomBytes} from 'crypto';
import logger from './logger';
import path from 'path';

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

// STORAGE

const STORAGE_SERVICES = ['local', 's3'] as const;
type StorageServices = typeof STORAGE_SERVICES[number];

export let STORAGE_SERVICE = process.env.STORAGE_SERVICE as StorageServices;
if (!STORAGE_SERVICE) {
  STORAGE_SERVICE = 'local';
  logger.warn(`STORAGE_SERVICE not set, using: ${STORAGE_SERVICE}`);
} else {
  STORAGE_SERVICE = STORAGE_SERVICE.toLowerCase() as StorageServices;
  if (!STORAGE_SERVICES.includes(STORAGE_SERVICE)) {
    throw new Error(`invalid STORAGE_SERVICES, must be one of: ${STORAGE_SERVICES.join(', ')}`);
  }
}

// STORAGE - LOCAL

export let STORAGE_LOCAL_PATH = process.env.STORAGE_LOCAL_PATH!;
if (STORAGE_SERVICE == 'local' && !STORAGE_LOCAL_PATH) {
  STORAGE_LOCAL_PATH = path.resolve('./data/storage');
  logger.warn(`STORAGE_LOCAL_PATH not set, using: ${STORAGE_LOCAL_PATH}`);
}

// STORAGE - S3

export let STORAGE_S3_ENDPOINT = process.env.STORAGE_S3_ENDPOINT!;
if (STORAGE_SERVICE == 's3' && !STORAGE_S3_ENDPOINT) {
  STORAGE_S3_ENDPOINT = 's3.amazonaws.com';
  logger.warn(`STORAGE_S3_ENDPOINT not set, using: ${STORAGE_S3_ENDPOINT}`);
}

export let STORAGE_S3_REGION = process.env.STORAGE_S3_REGION!;
if (STORAGE_SERVICE == 's3' && !STORAGE_S3_REGION) {
  STORAGE_S3_REGION = 'us-east-1';
  logger.warn(`STORAGE_S3_REGION not set, using: ${STORAGE_S3_REGION}`);
}

export const STORAGE_S3_ACCESS_KEY = process.env.STORAGE_S3_ACCESS_KEY!;
if (STORAGE_SERVICE == 's3' && !STORAGE_S3_ACCESS_KEY) {
  throw new Error(`STORAGE_S3_ACCESS_KEY not set`);
}

export const STORAGE_S3_SECRET_KEY = process.env.STORAGE_S3_SECRET_KEY!;
if (STORAGE_SERVICE == 's3' && !STORAGE_S3_SECRET_KEY) {
  throw new Error(`STORAGE_S3_SECRET_KEY not set`);
}

export const STORAGE_S3_BUCKET_NAME = process.env.STORAGE_S3_BUCKET_NAME!;
if (STORAGE_SERVICE == 's3' && !STORAGE_S3_BUCKET_NAME) {
  throw new Error(`STORAGE_S3_BUCKET_NAME not set`);
}

// DEV

export const IS_DEV = process.env.NODE_ENV === 'development';

// INITIALIZATION

export const {INITIAL_USERNAME, INITIAL_PASSWORD} = process.env;
