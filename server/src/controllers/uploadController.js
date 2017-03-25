import config from '../config';
import {uploadFile, md5sumFile} from '../services/uploadService';
import {Image} from '../models/imageModel';


export async function handleImageUpload(image) {
  const checkSum = await md5sumFile(image);
  const existImage = await Image.findByMd5sum(checkSum);
  if (existImage) return {
    image: existImage,
    CDNBase: config.CDNBase,
    redirectUrl: `${config.CDNBase}/${existImage.remoteKey}`
  };
  const newImage = new Image();
  newImage.name = encodeURIComponent(image.name);
  newImage.md5sum = checkSum;
  const res = await uploadFile(image);
  newImage.remoteKey = res.remoteKey;
  await newImage.save();
  return {
    image: newImage,
    CDNBase: config.CDNBase,
    redirectUrl: `${config.CDNBase}${newImage.remoteKey}`
  };
}