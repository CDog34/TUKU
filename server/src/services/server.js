import Koa from 'koa';

import config from '../config';
import {routerInit} from '../routes';
import {logStartUp, logForRequest} from '../services/logger';

export function startServer(){
  const startTime = Date.now();
  const app = new Koa();

  app.use(logForRequest());
  // routerInit(app);
  app.listen(config.port, logStartUp(startTime, config.env, config.port));

}