import {DataTypes} from 'sequelize';
import {Migration} from '../migrations';

export const up: Migration = async ({context: queryInterface}) => {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.createTable('Mails', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      messageId: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      from: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fromName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      to: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      htmlBody: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      textBody: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {transaction});

    await queryInterface.createTable('Attachments', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      hash: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      filename: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contentType: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contentId: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      related: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MailId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {transaction});

    await queryInterface.addIndex('Attachments', ['hash'], {name: 'Attachments_hash', transaction});

    await queryInterface.addConstraint('Attachments', {
      type: 'foreign key',
      name: 'Attachments_MailId_fkey',
      fields: ['MailId'],
      references: {
        table: 'Mails',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      transaction,
    });
  });
};

export const down: Migration = async ({context: queryInterface}) => {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.dropTable('Attachments', {transaction});

    await queryInterface.dropTable('Mails', {transaction});
  });
};
