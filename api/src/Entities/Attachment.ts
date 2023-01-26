import {Optional} from 'sequelize';
import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Index, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';
import Mail from './Mail';

interface AttachmentAttributes {
  id: string;
  hash: Buffer;
  filename: string;
  contentType: string;
  contentId: string | null;
  related: boolean;
  size: number;
  MailId: string;
}

@Table
export default class Attachment extends Model<AttachmentAttributes, Optional<AttachmentAttributes, 'id'>> {

  @PrimaryKey
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id!: string;

  @Index
  @Column({type: DataType.BLOB, allowNull: false})
    hash!: Buffer;

  @Column({type: DataType.TEXT, allowNull: false})
    filename!: string;

  @Column({type: DataType.TEXT, allowNull: false})
    contentType!: string;

  @Column({type: DataType.TEXT, allowNull: true})
    contentId!: string | null;

  @Column({type: DataType.BOOLEAN, allowNull: false})
    related!: boolean;

  @Column({type: DataType.INTEGER, allowNull: false})
    size!: number;

  @Index
  @ForeignKey(() => Mail)
  @Column({type: DataType.UUIDV4, allowNull: false})
    MailId!: string;

  @BelongsTo(() => Mail)
    mail?: Mail;

  @CreatedAt
  @Column
    createdAt!: Date;

  @UpdatedAt
  @Column
    updatedAt!: Date;

}
