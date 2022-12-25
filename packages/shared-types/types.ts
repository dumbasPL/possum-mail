export interface UnauthorizedErrorModel {
  reason: string;
}

export interface ForbiddenErrorModel {
  reason: string;
}

export interface BadRequestErrorModel {
  message: string;
}

export interface NotFoundErrorModel {
  message: string;
}


export interface InternalServerErrorModel {
  message: string;
  stack?: string[],
}

// NOTE: largest value here can not exceed Number.MAX_SAFE_INTEGER
export const enum Permissions {
  Active = 1 << 0, // user is active (can login)
  Admin  = 1 << 1, // user is an Administrator
}
