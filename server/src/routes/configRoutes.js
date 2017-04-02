import {Router, Methods} from '../services/routerService';
import config from '../config';

export const configRoutes = new Router('/config');

configRoutes
  .add({
    method: Methods.GET,
    uri: '/'
  })
  .bind(async () => ({
    CDNBase: config.CDNBase
  }));