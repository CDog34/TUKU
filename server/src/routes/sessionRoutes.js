import {Router, Methods} from '../services/routerService';

export const sessionRoutes = new Router('/session');

sessionRoutes
  .add({
    method: Methods.DELETE,
    uri: '/'
  })
  .bind(async (ctx) => {
    const sess = await ctx.getSession();
    if (sess) await sess.remove();
  });