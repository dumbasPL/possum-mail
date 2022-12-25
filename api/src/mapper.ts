import {createMap, createMapper} from '@automapper/core';
import {sequelize} from '@automapper/sequelize';
import User, {UserDto} from './Entities/User';

export const mapper = createMapper({
  strategyInitializer: sequelize(),
});

export function initMapper() {
  createMap(mapper, User, UserDto);
  createMap(mapper, UserDto, User);
}
