import {Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

interface DomainsConfig {
  key: 'domains';
  value: string[],
}

type ConfigAttributes = DomainsConfig;

@Table({tableName: 'Config'})
export default class Config extends Model<ConfigAttributes> {

  @PrimaryKey
  @Column({type: DataType.TEXT})
    key!: string;

  @Column({type: DataType.JSON, allowNull: false})
    value!: any;

  @CreatedAt
  @Column
    createdAt!: Date;

  @UpdatedAt
  @Column
    updatedAt!: Date;

}
