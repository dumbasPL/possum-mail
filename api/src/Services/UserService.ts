import bcrypt from 'bcrypt';
import {BCRYPT_ROUNDS} from '../consts';
import User from '../Entities/User';
import {INITIAL_PASSWORD, INITIAL_USERNAME} from '../env';
import logger from '../logger';
import {generate as generatePassword} from 'generate-password';
import {Permissions} from 'shared-types';

export default class UserService {

  private normalizeUsername(name: string) {
    return name.toLowerCase();
  }

  async createUser(name: string, password: string, permissions: Permissions) {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    await User.scope('auth').create({
      name: name,
      password: passwordHash,
      permissions: permissions,
    });
  }

  async getUserById(id: number, scope?: string): Promise<User | null> {
    return await (scope ? User.scope(scope) : User).findByPk(id);
  }

  async getUserByName(name: string): Promise<User | null> {
    return await User.findOne({
      where: {name: this.normalizeUsername(name)},
    });
  }

  async createInitialUser() {
    const usersCount = await User.count();
    if (usersCount > 0) {
      return;
    }

    const username = INITIAL_USERNAME ?? 'admin';
    let password = INITIAL_PASSWORD;

    let printPassword = false;
    if (!password) {
      logger.info('INITIAL_PASSWORD not set, generating random password for the initial user');

      password = generatePassword({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
        strict: false,
        excludeSimilarCharacters: true,
      });

      printPassword = true;
    }

    await this.createUser(username, password, Permissions.Active | Permissions.Admin);
    if (printPassword) {
      logger.info(`Initial admin user created\n\tUsername: ${username}\n\tPassword: ${password}`);
      logger.warn('PLEASE CHANGE THE PASSWORD AFTER LOGGING IN !!!');
    } else {
      logger.info(`Initial admin user created (Username: ${username})`);
    }
  }

  async setPassword(user: User, password: string): Promise<void> {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    user.password = passwordHash;
  }

  async saveUser(user: User): Promise<User> {
    return await user.save();
  }

  async getUserList(scope?: string): Promise<User[]> {
    return await (scope ? User.scope(scope) : User).findAll();
  }

}
