import express from 'express';
import {IncomingMessage} from 'http';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';
import {Permissions} from 'shared-types';
import User, {UserDto} from './Entities/User';
import {APP_SECRET} from './env';
import {AuthError, ForbiddenError} from './lib/errorHandler';
import {mapper} from './mapper';
import {isJWTModel} from './Models/JWTModel';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const PermissionScopes = {
  active: Permissions.Active,
  admin: Permissions.Admin,
} satisfies Record<Lowercase<keyof typeof Permissions>, Permissions>;

export const PermissionScopeStrings = {
  active: 'active',
  admin: 'admin',
} satisfies {[K in keyof typeof PermissionScopes]: K};

const scopeList = Object.values(PermissionScopeStrings);
type Scope = Unpacked<typeof scopeList>;

function isValidScopes(scopes?: string[]): scopes is Scope[] {
  return Array.isArray(scopes) &&
    scopes.every(scope => (scopeList as string[]).includes(scope));
}

export async function authenticateJwt(authorization: string, scopes?: string[]): Promise<UserDto> {
  const [scheme, token] = authorization.split(' ');
  if (scheme != 'Bearer') {
    throw new AuthError('Invalid authorization scheme', {t: 'errors.auth.invalidAuthorizationScheme'});
  }

  let decoded;
  try {
    decoded = jwt.verify(token, APP_SECRET);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new AuthError(
        'Invalid token: ' + error.message,
        {t: [
          `errors.auth.invalidToken.${error.name}`,
          'errors.auth.invalidToken.generic',
        ]}
      );
    }
    throw new AuthError('Invalid token', {t: 'errors.auth.invalidToken.generic'});
  }

  if (!isJWTModel(decoded)) {
    throw new AuthError('Invalid token body', {t: 'errors.auth.invalidTokenBody'});
  }

  const user = await User.findByPk(+decoded.sub, {
    attributes: {
      include: ['securityStamp', 'permissions'],
    },
  }).catch(err => {
    console.error(err);
    throw new AuthError('Unable to find user', {t: 'errors.auth.unableToFindUser'});
  });

  if (user == null) {
    throw new AuthError('User not found', {t: 'errors.auth.userNotFound'});
  }

  if (user.securityStamp! !== decoded.ss) {
    throw new AuthError('Invalid security stamp', {t: 'errors.auth.invalidSecurityStamp'});
  }

  if (!user.hasPermission(Permissions.Active)) {
    throw new AuthError('User is disabled', {t: 'errors.auth.userDisabled'});
  }

  if (isValidScopes(scopes)) {
    const neededPermissions = scopes.map(scope => PermissionScopes[scope]).reduce((prev, cur) => prev | cur, 0);

    // require at least one permission to be present
    if (neededPermissions !== 0 && (neededPermissions & decoded.perm) === 0) {
      throw new ForbiddenError('Insufficient permissions', {t: 'errors.auth.insufficientPermissions'});
    }
  }

  return mapper.map(user, User, UserDto);
}

export async function expressAuthentication(
  request: express.Request | IncomingMessage,
  securityName: string,
  scopes?: string[]
): Promise<Exclude<express.Request['user'], undefined>> {
  if (securityName === 'jwt') {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AuthError('Authorization header missing', {t: 'errors.auth.authorizationHeaderMissing'});
    }

    return await authenticateJwt(authHeader, scopes);
  }

  // Internal error that should never get hit, don't bother translating
  throw new Error('Unsupported securityName: ' + securityName);
}
