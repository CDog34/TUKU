import {Router, Methods} from '../services/routerService';
import {listMyImageHistory, listAllImages, deleteUserImage, getOneActiveImage} from '../controllers/imageController';
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
    method: Methods.GET,
    uri: '/:imageId',
    noReturn: true
  })
  .bind(async (ctx) => {
    const imageId = ctx.params.imageId;
    const imageDocument = await getOneActiveImage(imageId);
    let imageUrl = config.CDNBase + imageDocument.remoteKey;
    const acceptHeader = ctx.headers.accept || '';
    const supportWebp = acceptHeader.indexOf('webp') !== -1;
    imageUrl = imageUrl + `!image.${supportWebp ? 'webp' : 'normal'}`;
    return ctx.redirect(imageUrl);
  });

imageRoutes
  .add({
    method: Methods.DELETE,
    uri: '/:imageId',
    roles: [RoleEnum.USER, RoleEnum.ADMIN]
  })
  .bind(async (ctx) => {
    const user = await ctx.getUser();
    const imageId = ctx.params.imageId;
    const hard = !!ctx.query.hardMode;
    if (!imageId) throw 'No ID';
    await deleteUserImage(imageId, user, hard);
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