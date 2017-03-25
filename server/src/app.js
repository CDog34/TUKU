import Koa from 'koa';

import config from './config';
import {routerInit} from './routes';
import {logStartUp, logInit, logForRequest} from './services/logger';
const startTime = Date.now();

const startServer = () => {
  const app = new Koa();

  app.use(logForRequest());
  routerInit(app);
  app.listen(config.port, logStartUp(startTime, config.env, config.port));

};

logInit();
startServer();