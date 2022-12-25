import {Permissions} from 'shared-types';
import {enumObject, enumObjectReverse, type EnumKeys} from './enums';

const PermissionsEnum: { [K in EnumKeys<typeof Permissions>]: typeof Permissions[K] } = {
  Active: Permissions.Active,
  Admin: Permissions.Admin,
};

export const permissions = enumObjectReverse(PermissionsEnum);
export const permissionsEntries = Object.entries(enumObject(PermissionsEnum)) as [keyof typeof Permissions, Permissions][];
export const permissionValues = Object.keys(permissions).map(x => +x);

export function decodePermissions(value: number) {
  return permissionValues.filter(val => (value & val) == val).map(perm => permissions[perm]);
}
