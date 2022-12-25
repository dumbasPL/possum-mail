import {UserDto} from '../Entities/User';

export interface LoginModel {
  username: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
  user: UserDto;
}
