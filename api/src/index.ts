import 'reflect-metadata';
import sequelize from './sequelize';
import logger from './logger';
import {migrateDatabase} from './migrations';
import {initMapper} from './mapper';
import {container} from 'tsyringe';
import UserService from './Services/UserService';
import {loadI18n} from './i18n';
import ConfigService from './Services/ConfigService';
import eventBuss, {initEventBuss} from './eventBuss';
import {createHttpServer} from './app';
import {createMailServer} from './mail';
import {registerServices} from './Services';
import {FsService} from './Services/FsService';

async function main() {
  logger.debug('Starting main');

  await loadI18n();

  registerServices();

  await container.resolve<FsService>('FsService').init();

  await sequelize.authenticate();
  logger.info(`Connected to database ${sequelize.getDatabaseName()} using ${sequelize.getDialect()} v${await sequelize.databaseVersion()}`);

  await migrateDatabase();
  await initEventBuss();

  initMapper();

  await container.resolve(ConfigService).init();
  await container.resolve(UserService).createInitialUser();

  createHttpServer();
  createMailServer();

  eventBuss.emit('initialized');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
