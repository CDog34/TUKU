import {Router, Methods} from '../services/routerService';
import {handleImageUpload} from '../controllers/uploadController';

import config from '../config';
import {ErrorBase} from '../services/errorService';

export const uploadRoutes = new Router('/upload');

uploadRoutes
  .add({
    method: Methods.POST,
    uri: '/'
  })
  .bind(async(ctx) => {
    const file = ctx.request.files[0];
    if (!file || file.type.indexOf('image') === -1) throw new ErrorBase('NOT_IMAGE', 403);
    if (file.size > config.imageSizeLimit) throw new ErrorBase('IMAGE_TOO_LARGE', 403, {limit: config.imageSizeLimit});
    return await handleImageUpload(file);
  });