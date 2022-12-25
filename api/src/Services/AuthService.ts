import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Permissions} from 'shared-types';
import {injectable} from 'tsyringe';
import User, {UserDto} from '../Entities/User';
import {APP_SECRET} from '../env';
import {AuthError, BadRequestError, NotFoundError} from '../lib/errorHandler';
import {mapper} from '../mapper';
import {JWTModel} from '../Models/JWTModel';
import UserService from './UserService';

@injectable()
export class AuthService {

  constructor(
    private userService: UserService,
  ) {}

  createToken(userId: number, permissions: Permissions, securityStamp: string) {
    return jwt.sign({
      ss: securityStamp,
      perm: permissions,
      sub: userId.toString(),
    } satisfies JWTModel, APP_SECRET, {
      expiresIn: '12h',
    });
  }

  async login(username: string, password: string): Promise<{ token: string; user: UserDto; } | null> {
    const user = await User.scope('auth').findOne({
      where: {name: username},
    });

    if (user == null) {
      return null;
    }

    // password will be set because we are using the auth scope
    if (!await bcrypt.compare(password, user.password!)) {
      return null;
    }

    if (!user.hasPermission(Permissions.Active)) {
      throw new AuthError('User is disabled', {t: 'errors.auth.userDisabled'});
    }

    const token = this.createToken(user.id, user.permissions, user.securityStamp!);

    return {
      token,
      user: mapper.map(user, User, UserDto),
    };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<string> {
    let user = await User.scope('auth').findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found', {t: 'errors.notFound.userNotFound'});
    }

    // password will be set because we are using the auth scope
    if (!await bcrypt.compare(currentPassword, user.password!)) {
      throw new BadRequestError('Invalid current password', {t: 'errors.auth.invalidCurrentPassword'});
    }

    // update the password
    await this.userService.setPassword(user, newPassword);
    user = await this.userService.saveUser(user);

    // generate a new token for the user
    const token = this.createToken(user.id, user.permissions, user.securityStamp!);

    return token;
  }

}
