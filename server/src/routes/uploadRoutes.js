import {Router, Methods} from '../services/routerService';
import {handleImageUpload} from '../controllers/uploadController';

export const uploadRoutes = new Router('/upload');

uploadRoutes
  .add({
    method: Methods.POST,
    uri: '/'
  })
  .bind(async (ctx) => {
    const file = ctx.request.files[0];
    return await handleImageUpload(file);
  });