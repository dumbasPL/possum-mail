import {Sequelize} from 'sequelize-typescript';
import logger from './logger';
const DATABASE_URI = process.env.DATABASE_URI || 'sqlite:./data/database.sqlite';

const sequelize = new Sequelize(DATABASE_URI, {
  models: [__dirname + '/Entities'],
  logging: msg => logger.silly(msg),
});

logger.debug(`Loaded ${sequelize.modelManager.all.length} database models`);

export default sequelize;
