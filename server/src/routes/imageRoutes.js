import {Router, Methods} from '../services/routerService';
import {
  listMyImageHistory,
  listAllImages,
  deleteUserImage,
  getOneActiveImage,
  relayImage
} from '../controllers/imageController';
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
    const imageId = ctx.params['imageId'];
    const params = ctx.query['params'] || '';
    const forceRedirect = !!ctx.query['forceRedirect'];
    const imageDocument = await getOneActiveImage(imageId);
    const acceptHeader = ctx.headers['accept'] || '';
    const referer = ctx.headers['referer'] || '';
    const supportWebp = acceptHeader.indexOf('webp') !== -1;
    const imagePath = imageDocument.remoteKey + `!image.${supportWebp ? 'webp' : 'normal'}${params}`;
    if (!forceRedirect){
      if (!referer) return await relayImage(imagePath, ctx);
      for (let i = 0; i < config.imageRelayDomain.length; i++) {
        if (referer.indexOf(config.imageRelayDomain[i]) !== -1) return await relayImage(imagePath, ctx);
      }
    }
    const isHttps = referer.slice(0, 5) === 'https';
    const CDNUrl = `http${isHttps ? 's' : ''}://${config.CDNBase}/`;
    return ctx.redirect(CDNUrl + imagePath);
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