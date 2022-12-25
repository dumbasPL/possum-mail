import ApiError from './ApiError';

export default class ForbiddenError extends ApiError {

  constructor(public reason: string) {
    super('Forbidden - ' + reason, 403);
  }

}
