import {setupRouter} from '../services/router';
import {homeRoutes} from './home';

const routers = [
  homeRoutes
];

export function routerInit(app) {
  setupRouter(app, routers);
  app.use((ctx) => {
    ctx.status = 404;
  });
}