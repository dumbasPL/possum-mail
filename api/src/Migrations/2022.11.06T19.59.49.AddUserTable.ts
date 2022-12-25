import {DataType} from 'sequelize-typescript';
import {Migration} from '../migrations';

export const up: Migration = async ({context: queryInterface}) => {
  await queryInterface.createTable('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataType.BIGINT,
      allowNull: false,
    },
    securityStamp: {
      type: DataType.STRING(16 * 2), // 16 hex bytes
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
  });
};

export const down: Migration = async ({context: queryInterface}) => {
  await queryInterface.dropTable('Users');
};
