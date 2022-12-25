import {Request as ExRequest} from 'express';
import {Body, Controller, Get, Post, Request, Response, Route, Security, Tags} from 'tsoa';
import {injectable} from 'tsyringe';
import {UserDto} from '../Entities/User';
import {LoginModel, LoginResponseModel} from '../Models/LoginModel';
import {UnauthorizedErrorModel} from 'shared-types';
import {AuthService} from '../Services/AuthService';
import {ChangePasswordModel, ChangePasswordResponseModel} from '../Models/ChangePasswordModel';
import {AuthError, BadRequestError} from '../lib/errorHandler';

@injectable()
@Route('auth')
@Tags('User')
@Response<UnauthorizedErrorModel>(401, 'Unauthorized')
export class AuthController extends Controller {

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  @Post('login')
  public async login(@Body() model: LoginModel): Promise<LoginResponseModel> {
    const data = await this.authService.login(model.username, model.password);
    if (data == null) {
      throw new AuthError('Invalid username or password', {t: 'errors.auth.invalidUsernameOrPassword'});
    }

    return data;
  }

  @Post('changePassword')
  @Security('jwt')
  public async changePassword(@Body() model: ChangePasswordModel, @Request() req: ExRequest): Promise<ChangePasswordResponseModel> {
    if (model.currentPassword == model.newPassword) {
      throw new BadRequestError('New password can not be the same as current password', {t: 'errors.badRequest.newPasswordCantBeTheSameAsLast'});
    }

    const token = await this.authService.changePassword(req.user!.id, model.currentPassword, model.newPassword);

    return {token};
  }

  @Get('me')
  @Security('jwt')
  public async getUserInfo(@Request() req: ExRequest): Promise<UserDto> {
    return req.user!;
  }

}
