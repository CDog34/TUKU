import {Router, Methods} from '../services/routerService';
import config from '../config';

export const homeRoutes = new Router('/');

homeRoutes
  .add({
    method: Methods.GET,
    uri: '/'
  })
  .bind(async(ctx) => {
    const user = await ctx.getUser();
    return {
      user,
      apiVersion: config.version,
      time: Date.now()
    }
  });