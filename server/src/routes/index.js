import {setupRouter} from '../services/routerService';
import {homeRoutes} from './homeRoutes';
import {uploadRoutes} from './uploadRoutes';

const routers = [
  homeRoutes,
  uploadRoutes
];

export function routerInit(app) {
  setupRouter(app, routers);
  app.use((ctx) => {
    ctx.status = 404;
  });
}