import {Router, Methods} from '../services/router';

export const uploadRoutes = new Router('/upload');

uploadRoutes
  .add({
    method: Methods.POST,
    uri: '/'
  })
  .bind((ctx) => {
    console.log(ctx.request.files[0].type);
  });