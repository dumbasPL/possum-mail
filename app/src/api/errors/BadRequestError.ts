import ApiError from './ApiError';

export default class BadRequestError extends ApiError {

  constructor(public message: string) {
    super(message, 400);
  }

}
