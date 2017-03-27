import {Router, Methods} from '../services/routerService';
import {handleWeiboCallback} from '../controllers/weiboController';
import {createOrUpdateUserFromWeibo} from '../controllers/userController';
import config from '../config';

export const weiboRouter = new Router('/weibo');

weiboRouter
  .add({
    method: Methods.GET,
    uri: '/callback'
  })
  .bind(async(ctx) => {
    const code = ctx.query.code;
    if (!code) throw 'no Code';
    const res = await handleWeiboCallback(code);
    return await createOrUpdateUserFromWeibo(res.profile);
  });

weiboRouter
  .add({
    method: Methods.GET,
    uri: '/auth',
    noReturn: true
  })
  .bind(async(ctx) => {
    return ctx.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${config.weibo.appKey}&response_type=code&redirect_uri=${encodeURIComponent(config.weibo.callbackUrl)}`);
  });