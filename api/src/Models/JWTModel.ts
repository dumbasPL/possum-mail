import {Permissions} from 'shared-types';

export interface JWTModel {
  sub: string, // subject, numeric user ID as string
  ss: string, // security string
  perm: Permissions, // permissions
}

export function isJWTModel(token: any): token is JWTModel {
  if (typeof token != 'object') {
    return false;
  }

  if (typeof token.sub != 'string' || !Number.isInteger(parseInt(token.sub))) {
    return false;
  }

  if (typeof token.ss != 'string') {
    return false;
  }

  if (typeof token.perm != 'number' || token.perm < 0 || !Number.isSafeInteger(token.perm)) {
    return false;
  }

  return true;
}
