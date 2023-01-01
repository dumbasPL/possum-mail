import {DataType} from 'sequelize-typescript';
import {Migration} from '../migrations';

export const up: Migration = async ({context: queryInterface}) => {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.createTable('Config', {
      key: {
        type: DataType.TEXT,
        primaryKey: true,
      },
      value: {
        type: DataType.JSON,
        allowNull: false,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
      },
    }, {transaction});

    await queryInterface.createFunction(
      'config_change_notify',
      [],
      'trigger',
      'plpgsql',
      `NOTIFY config_updated; RETURN NULL;`,
      undefined,
      {transaction}
    );
    await queryInterface.createTrigger(
      'Config',
      'config_change_notify',
      'after',
      // @ts-ignore - https://github.com/sequelize/sequelize/issues/11420
      {insert: 'insert', update: 'update', delete: 'delete', truncate: 'truncate'},
      'config_change_notify',
      [],
      ['FOR EACH STATEMENT'],
      {transaction},
    );
  });
};

export const down: Migration = async ({context: queryInterface}) => {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.dropTrigger('Config', 'config_change_notify', {transaction});
    await queryInterface.dropFunction('config_change_notify', [], {transaction});

    await queryInterface.dropTable('Config', {transaction});
  });
};
