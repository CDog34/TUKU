import config from '../config';
import {uploadFile} from '../services/uploadService';


export async function handleImageUpload(image) {
  if (image.type.indexOf('image') === -1) throw 'Not Image';
  if (image.size > config.imageSizeLimit) throw 'Too Big';
  return await uploadFile(image);
}