import ApiError from './ApiError';

export default class UnauthorizedError extends ApiError {

  constructor(public reason: string) {
    super('Unauthorized', 401);
  }

}
