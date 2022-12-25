import {ForbiddenErrorModel, NotFoundErrorModel, UnauthorizedErrorModel} from 'shared-types';
import {Body, Controller, Get, Put, Response, Route, Security, Tags, Patch} from 'tsoa';
import {injectable} from 'tsyringe';
import {PermissionScopeStrings} from '../authentication';
import {mapper} from '../mapper';
import UserService from '../Services/UserService';
import User, {UserDto} from '../Entities/User';
import {CreateUserModel} from '../Models/CreateUserModel';
import {BadRequestError, NotFoundError} from '../lib/errorHandler';
import {EditUserModel} from '../Models/EditUserModel';

@injectable()
@Route('Users')
@Tags('Users')
@Security('jwt', [PermissionScopeStrings.admin])
@Response<UnauthorizedErrorModel>(401, 'Unauthorized')
@Response<ForbiddenErrorModel>(403, 'Forbidden')
export class UsersController extends Controller {

  constructor(
    private userService: UserService,
  ) {
    super();
  }

  @Get()
  public async listUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUserList('admin');
    return mapper.mapArray(users, User, UserDto);
  }

  @Get('{id}')
  @Response<NotFoundErrorModel>(404, 'Not Found')
  public async getUserById(@Patch() id: number) {
    const user = await this.userService.getUserById(id, 'admin');

    if (user == null) {
      throw new NotFoundError('User not found', {t: 'errors.notFound.userNotFound'});
    }

    return mapper.map(user, User, UserDto);
  }

  @Put()
  public async createUser(@Body() model: CreateUserModel): Promise<void> {
    if (await this.userService.getUserByName(model.username) != null) {
      throw new BadRequestError('Username already taken', {t: 'errors.badRequest.usernameAlreadyTaken'});
    }
    await this.userService.createUser(model.username, model.password, model.permissions);
  }

  @Response<NotFoundErrorModel>(404, 'Not Found')
  @Put('{id}')
  public async editUser(@Patch() id: number, @Body() model: EditUserModel) {
    const user = await this.userService.getUserById(id, 'auth');

    if (user == null) {
      throw new NotFoundError('User not found', {t: 'errors.notFound.userNotFound'});
    }

    if (model.password != null) {
      await this.userService.setPassword(user, model.password);
    }

    if (model.permissions != null) {
      user.permissions = model.permissions;
    }

    await this.userService.saveUser(user);
  }

}
