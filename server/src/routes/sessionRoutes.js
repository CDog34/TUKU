import {Router, Methods} from '../services/routerService';
import {handleWeiboCallback} from '../controllers/weiboController';
import {createOrUpdateUserFromWeibo} from '../controllers/userController';
import {startWeiboSession} from '../controllers/sessionController';
import config from '../config';


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

sessionRoutes
  .add({
    method: Methods.post,
    uri: '/weibo'
  })
  .bind(async (ctx) => {
    const code = ctx.request.body.code;
    if (!code) throw 'no Code';
    const res = await handleWeiboCallback(code);
    const user = await createOrUpdateUserFromWeibo(res.profile);
    const existedSession = await ctx.getSession();
    return await startWeiboSession(user._id, existedSession);
  });

sessionRoutes
  .add({
    method: Methods.GET,
    uri: '/weibo',
    noReturn: true
  })
  .bind(async (ctx) => {
    return ctx.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${config.weibo.appKey}&response_type=code&redirect_uri=${encodeURIComponent(config.weibo.callbackUrl)}`);
  });