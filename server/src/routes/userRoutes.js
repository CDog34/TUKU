import {Router, Methods} from '../services/routerService';
import {RoleEnum} from '../models/userModel';

export const userRoutes = new Router('/user');

userRoutes
  .add({
    method: Methods.GET,
    uri: '/me',
    roles: [RoleEnum.USER, RoleEnum.ADMIN]
  })
  .bind(async(ctx) => await ctx.getUser());