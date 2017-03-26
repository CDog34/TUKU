import {setupRouter} from '../services/routerService';
import {homeRoutes} from './homeRoutes';
import {uploadRoutes} from './uploadRoutes';
import {weiboRouter} from './weiboRouter';

const routers = [
  homeRoutes,
  uploadRoutes,
  weiboRouter
];

export function routerInit(app) {
  setupRouter(app, routers);
  app.use((ctx) => {
    ctx.status = 404;
  });
}