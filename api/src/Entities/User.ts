import {AutoMap} from '@automapper/classes';
import {randomBytes} from 'crypto';
import {Optional} from 'sequelize';
import {BeforeSave, BeforeValidate, Column, CreatedAt, DataType, DefaultScope, Model, PrimaryKey, Scopes, Table, Unique, UpdatedAt, Validate} from 'sequelize-typescript';
import {Permissions} from 'shared-types';

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  permissions: Permissions;
  securityStamp: string;
}

interface UserCreationAttributes extends Optional<Omit<UserAttributes, 'securityStamp'>, 'id'> {}

@Table
@DefaultScope(() => ({
  attributes: {
    exclude: ['password', 'securityStamp', 'permissions'],
  },
}))
@Scopes(() => ({
  admin: {
    attributes: {
      include: ['permissions'],
    },
  },
  auth: {
    attributes: ['id', 'name', 'password', 'permissions', 'securityStamp'],
  },
}))
export default class User extends Model<UserAttributes, UserCreationAttributes> {

  @AutoMap()
  @PrimaryKey
  @Column
    id!: number;

  @AutoMap()
  @Unique(true)
  @Column({allowNull: false})
    name!: string;

  @Column({allowNull: false})
    password?: string;

  @AutoMap()
  @Validate({min: 0, max: Number.MAX_SAFE_INTEGER})
  @Column({type: DataType.BIGINT, allowNull: false})
    permissions!: Permissions;

  // 16 bytes hex string
  @Column({type: DataType.STRING(16 * 2), allowNull: false})
    securityStamp?: string;

  @CreatedAt
  @Column
    createdAt!: Date;

  @UpdatedAt
  @Column
    updatedAt!: Date;

  @BeforeSave
  static beforeSaveHook(instance: User) {
    instance.name = instance.name.toLowerCase();
    instance.securityStamp = randomBytes(16).toString('hex');
  }

  @BeforeValidate
  static beforeValidateHook(instance: User) {
    // note: this is a hack to pass validation
    // this value will be overwritten later in the beforeSaveHook
    instance.securityStamp ??= '';
  }

  hasPermission(perm: Permissions) {
    return (this.permissions & perm) === perm;
  }

}

export class UserDto {

  @AutoMap()
    id!: number;

  @AutoMap()
    name!: string;

  @AutoMap()
    permissions!: Permissions;

}
