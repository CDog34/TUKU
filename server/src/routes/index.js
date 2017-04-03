import {setupRouter} from '../services/routerService';
import {homeRoutes} from './homeRoutes';
import {uploadRoutes} from './uploadRoutes';
import {userRoutes} from './userRoutes';
import {imageRoutes} from './imageRoutes';
import {sessionRoutes} from './sessionRoutes';
import {configRoutes} from './configRoutes';

const routers = [
  homeRoutes,
  uploadRoutes,
  userRoutes,
  imageRoutes,
  sessionRoutes,
  configRoutes
];

export function routerInit(app) {
  setupRouter(app, routers);
  app.use((ctx) => {
    ctx.status = 404;
  });
}