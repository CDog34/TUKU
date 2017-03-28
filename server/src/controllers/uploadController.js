import config from '../config';
import {uploadFile, md5sumFile} from '../services/uploadService';
import {Image} from '../models/imageModel';


export async function handleImageUpload(image, userId) {
  const checkSum = await md5sumFile(image);
  let doUpload = true;
  const existImage = await Image.findByMd5sum(checkSum);
  if (existImage) {
    if (existImage.ownerId === userId)
      return {
        image: existImage,
        CDNBase: config.CDNBase,
        redirectUrl: `${config.CDNBase}${existImage.remoteKey}`
      };
    doUpload = false;
  }
  const newImage = new Image();
  newImage.name = encodeURIComponent(image.name);
  newImage.md5sum = checkSum;
  newImage.ownerId = userId;
  if (doUpload) {
    const res = await uploadFile(image);
    newImage.remoteKey = res.remoteKey;
  } else {
    newImage.remoteKey = existImage.remoteKey;
  }
  await newImage.save();
  return {
    image: newImage,
    CDNBase: config.CDNBase,
    redirectUrl: `${config.CDNBase}${newImage.remoteKey}`
  };
}