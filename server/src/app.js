import Koa from 'koa';
import bodyParser from 'koa-better-body';
import convert from 'koa-convert';

import config from './config';
import {routerInit} from './routes';
import {logStartUp, logInit, logForRequest} from './services/loggerService';
const startTime = Date.now();

const startServer = () => {
  const app = new Koa();

  app.use(logForRequest());
  app.use(convert(bodyParser({
    fields: 'body'
  })));
  routerInit(app);
  app.listen(config.port, logStartUp(startTime, config.env, config.port));

};

logInit();
startServer();