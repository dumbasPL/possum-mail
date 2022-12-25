import ApiError from './ApiError';

export default class InternalServerError extends ApiError {

  constructor(public message: string) {
    super('Internal Server Error', 500);
  }

}
