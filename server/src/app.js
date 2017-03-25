import Koa from 'koa';
import config from './config';

const startServer = () => {
  const app = new Koa();

  app.use((ctx) => ctx.body = 'Hello World');
  app.listen(config.port, () => console.info('Server Started'));
};

startServer();