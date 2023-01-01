import {Model} from 'sequelize-typescript';
import {injectable, singleton} from 'tsyringe';
import Config from '../Entities/Config';
import Keyv from 'keyv';
import eventBuss from '../eventBuss';
import logger from '../logger';

type extractConfigType<_Type> = _Type extends Model<infer _Type> ? _Type : never;

type ConfigType = extractConfigType<Config>;
type ConfigKeys = ConfigType['key'];

@injectable()
@singleton()
export default class ConfigService {

  private cache = new Keyv<ConfigType['value'] | null>();

  private async get<Key extends ConfigKeys, T extends Extract<ConfigType, {key: Key}>>(key: Key): Promise<T['value'] | null> {
    const cached = await this.cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    const config = await Config.findByPk(key);
    const value = config?.toJSON()?.value ?? null;

    await this.cache.set(key, value);
    return value;
  }

  async init() {
    eventBuss.on('configUpdated', async () => {
      await this.cache.clear();
      logger.info('config updated');
    });
  }

  async getDomains(): Promise<string[]> {
    return await this.get('domains') ?? [];
  }

}
