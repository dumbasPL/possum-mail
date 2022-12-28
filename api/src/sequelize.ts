import {Sequelize} from 'sequelize-typescript';
import {DATABASE_URI} from './env';
import logger from './logger';

const sequelize = new Sequelize(DATABASE_URI, {
  dialect: 'postgres',
  models: [__dirname + '/Entities'],
  logging: msg => logger.silly(msg),
});

logger.debug(`Loaded ${sequelize.modelManager.all.length} database models`);

export default sequelize;
