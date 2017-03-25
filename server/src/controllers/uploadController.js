import config from '../config';
import {uploadFile} from '../services/uploadService';
import {ErrorBase} from '../services/errorService';


export async function handleImageUpload(image) {
  if (image.type.indexOf('image') === -1) throw new ErrorBase('NOT_IMAGE', 403);
  if (image.size > config.imageSizeLimit) throw new ErrorBase('IMAGE_TOO_LARGE', 403, {limit: config.imageSizeLimit});
  return await uploadFile(image);
}