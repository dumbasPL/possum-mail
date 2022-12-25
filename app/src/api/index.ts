import {Configuration, DefaultApi, UserApi, UsersApi} from 'api-client';
import axios, {AxiosError} from 'axios';
import UnauthorizedError from './errors/UnauthorizedError';
import InternalServerError from './errors/InternalServerError';
import type {BadRequestErrorModel, UnauthorizedErrorModel, InternalServerErrorModel, ForbiddenErrorModel} from 'shared-types';
import ApiError from './errors/ApiError';
import BadRequestError from './errors/BadRequestError';
import {useUserStore} from '@/stores/userStore';
import ForbiddenError from './errors/ForbiddenError';

axios.interceptors.response.use(undefined, error => Promise.reject(((): Error => {
  if (error instanceof AxiosError && error.response) {
    switch (error.response.status) {
    case 400:
      return new BadRequestError((error.response.data as BadRequestErrorModel).message);
    case 401:
      return new UnauthorizedError((error.response.data as UnauthorizedErrorModel).reason);
    case 403:
      return new ForbiddenError((error.response.data as ForbiddenErrorModel).reason);
    case 500:
      return new InternalServerError((error.response.data as InternalServerErrorModel).message);
    default:
      return new ApiError(error.message, error.response.status);
    }
  }
  return error;
})()));

const getConfiguration = () => new Configuration({
  accessToken: useUserStore().token ?? undefined,
});

export const useUserApi = (clean: boolean = false) => new UserApi(clean ? undefined : getConfiguration());

export const useUsersApi = () => new UsersApi(getConfiguration());

export const useDefaultApi = () => new DefaultApi(getConfiguration());
