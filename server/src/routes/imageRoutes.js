import {Router, Methods} from '../services/routerService';
import {listMyImageHistory} from '../controllers/imageController';

export const imageRoutes = new Router('/image');

imageRoutes
  .add({
    method: Methods.GET,
    uri: '/history'
  })
  .bind(async(ctx) => {
    const user = await ctx.getUser();
    if (!user) return null;
    return await listMyImageHistory(user._id);
  });