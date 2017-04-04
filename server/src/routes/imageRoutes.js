import {Router, Methods} from '../services/routerService';
import {listMyImageHistory, listAllImages,deleteUserImage} from '../controllers/imageController';
import {RoleEnum} from '../models/userModel';
import config from '../config';

export const imageRoutes = new Router('/image');

imageRoutes
  .add({
    method: Methods.GET,
    uri: '/history'
  })
  .bind(async (ctx) => {
    const user = await ctx.getUser();
    if (!user) return null;
    return await listMyImageHistory(user._id);
  });

imageRoutes
  .add({
    method: Methods.DELETE,
    uri: '/:imageId',
    roles: [RoleEnum.USER, RoleEnum.ADMIN]
  })
  .bind(async (ctx) => {
    const user = await ctx.getUser();
    const imagId = ctx.params.imageId;
    if (!imagId) throw 'No ID';
    return await deleteUserImage(imageId,user);
  });

if (config.env !== 'production') {
  imageRoutes
    .add({
      method: Methods.GET,
      uri: '/'
    })
    .bind(async () => {
      return await listAllImages();
    });
}