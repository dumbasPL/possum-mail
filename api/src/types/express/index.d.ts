/* eslint-disable no-unused-vars */
import {UserDto} from '../../Entities/User';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserDto;
    }
  }
}
