import config from '../config';


export async function handleImageUpload(image) {
  if (image.type.indexOf('image') === -1) throw 'Not Image';
  if (image.size > config.imageSizeLimit) throw 'Too Big';
  console.log(image.size / 1024 / 1024)
}