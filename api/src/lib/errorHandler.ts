import {NextFunction, Request, Response} from 'express';
import {ValidateError} from 'tsoa';
import logger from '../logger';
import type {BadRequestErrorModel, ForbiddenErrorModel, InternalServerErrorModel, NotFoundErrorModel, UnauthorizedErrorModel} from 'shared-types';
import {i18n, TOptions} from 'i18next';

interface TranslatedErrorOptions extends ErrorOptions {
  t?: string | string[]
  tOpt?: TOptions;
}

export class TranslatedError extends Error {

  t?: string | string[];
  tOpt?: TOptions;

  constructor(message?: string, options?: TranslatedErrorOptions) {
    super(message, options);
    this.t = options?.t;
    this.tOpt = options?.tOpt;
  }

  getTranslatedMessage(i18n: i18n): string {
    if (this.t) {
      return i18n.t(this.t, this.tOpt) ?? this.message;
    }
    return this.message;
  }

}

export class AuthError extends TranslatedError {}
export class BadRequestError extends TranslatedError {};
export class ForbiddenError extends TranslatedError {};
export class NotFoundError extends TranslatedError {};

interface ErrorResponse {
  status: number,
  json: Record<string, any>
}

export function handleError(err: any, i18n: i18n): ErrorResponse {
  if (err instanceof ValidateError) {
    return {
      status: 422,
      json: {
        message: 'Validation Failed',
        details: err?.fields,
      }, // FIXME: satisfies
    };
  }

  if (err instanceof BadRequestError) {
    return {
      status: 400,
      json: {
        message: err.getTranslatedMessage(i18n),
      } satisfies BadRequestErrorModel
    };
  }

  if (err instanceof AuthError) {
    return {
      status: 401,
      json: {
        reason: err.getTranslatedMessage(i18n),
      } satisfies UnauthorizedErrorModel
    };
  }

  if (err instanceof ForbiddenError) {
    return {
      status: 403,
      json: {
        reason: err.getTranslatedMessage(i18n),
      } satisfies ForbiddenErrorModel,
    };
  }

  if (err instanceof NotFoundError) {
    return {
      status: 404,
      json: {
        message: err.getTranslatedMessage(i18n),
      } satisfies NotFoundErrorModel,
    };
  }

  logger.error(err);

  if (err instanceof Error) {
    return {
      status: 500,
      json: {
        message: err instanceof TranslatedError ? err.getTranslatedMessage(i18n) : err.message,
        stack: err.stack?.split('\n'),
      } as InternalServerErrorModel
    };
  }

  return {
    status: 500,
    json: {
      message: i18n.t('errors.internalServerError', {defaultValue: 'Internal server error'}),
    } as InternalServerErrorModel,
  };
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response {
  const {status, json} = handleError(err, req.i18n);
  return res.status(status).json(json);
}
