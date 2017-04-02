import {Router, Methods} from '../services/routerService';
import {listMyImageHistory, listAllImages} from '../controllers/imageController';
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