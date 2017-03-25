import Koa from 'koa';

const startServer = () => {
  const app = new Koa();

  app.use((ctx) => ctx.body = 'Hello World');
  app.listen(12530, () => console.log('Server Started'));
};

startServer();