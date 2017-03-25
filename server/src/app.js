import Koa from 'koa';
import config from './config';
import {logStartUp, logInit, logForRequest} from './services/logger';

const startServer = () => {
  const startTime = Date.now();
  const app = new Koa();


  app.use(logForRequest());
  app.use((ctx) => ctx.body = 'Hello World');
  app.listen(config.port, logStartUp(startTime, config.env, config.port));

};

logInit();
startServer();