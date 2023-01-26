import {Optional} from 'sequelize';
import {Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt} from 'sequelize-typescript';
import Attachment from './Attachment';

interface MailAttributes {
  id: string;
  messageId: string;
  date: Date;
  from: string;
  fromName: string | null;
  to: string;
  subject: string | null;
  htmlBody: string | null;
  textBody: string | null;
}

@Table
export default class Mail extends Model<MailAttributes, Optional<MailAttributes, 'id'>> {

  @PrimaryKey
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id!: string;

  @Unique
  @Column({type: DataType.TEXT, allowNull: true})
    messageId!: string;

  @Column({type: DataType.DATE, allowNull: false})
    date!: Date;

  @Column({type: DataType.TEXT, allowNull: false})
    from!: string;

  @Column({type: DataType.TEXT, allowNull: true})
    fromName!: string | null;

  @Column({type: DataType.TEXT, allowNull: false})
    to!: string;

  @Column({type: DataType.TEXT, allowNull: true})
    subject!: string | null;

  @Column({type: DataType.TEXT, allowNull: true})
    htmlBody!: string | null;

  @Column({type: DataType.TEXT, allowNull: true})
    textBody!: string | null;

  @HasMany(() => Attachment)
    attachments?: Attachment[];

  @CreatedAt
  @Column
    createdAt!: Date;

  @UpdatedAt
  @Column
    updatedAt!: Date;

}
