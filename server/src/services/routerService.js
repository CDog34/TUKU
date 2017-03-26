import KoaRouter from 'koa-router';
import {logRequestErr, logRouterSetup} from './loggerService';

export const Methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'del',
  HEAD: 'head'
};

export class Router {
  prefix;
  koaRouter;

  constructor(prefix) {
    this.prefix = prefix;
    this.koaRouter = new KoaRouter({prefix});
  }

  handleError(uri, err, ctx) {
    if (!err.isCustomError) {
      logRequestErr(this.prefix + uri, err);
      ctx.status = 500;
    } else {
      ctx.body = err.toObject();
      ctx.status = err.httpStatusCode;
    }
  }

  bindHandler(options, handler) {
    const {uri, method, noReturn} = options;
    if (!uri) {
      throw new Error('No URL');
    }
    this.koaRouter[method](uri, async(ctx, next) => {
      try {
        if (noReturn) return await handler(ctx, next);
        ctx.body = await handler(ctx);
      } catch (err) {
        this.handleError(uri, err, ctx);
      }
    });
  }

  add(options) {
    const method = options.method || Methods.GET;
    if (!options.uri) {
      throw new Error('No URL');
    }
    const noReturn = options.noReturn || false;
    const uri = options.uri;
    return {
      bind: (handler) => this.bindHandler({uri, method, noReturn}, handler)
    };
  }
}

export function setupRouter(app, routers) {
  routers.forEach((router) => {
    app.use(router.koaRouter.routes());
    app.use(router.koaRouter.allowedMethods());
    logRouterSetup(router.prefix);
  });
}
