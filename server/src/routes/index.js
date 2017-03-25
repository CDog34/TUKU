import {setupRouter} from '../services/router';
import {homeRoutes} from './home';
import {uploadRoutes} from './upload';

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