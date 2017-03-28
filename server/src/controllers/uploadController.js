import config from '../config';
import {uploadFile, md5sumFile} from '../services/uploadService';
import {Image} from '../models/imageModel';
import _ from 'lodash';


export async function handleImageUpload(image, userId) {
  const checkSum = await md5sumFile(image);
  let doUpload = true;

  const existImages = await Image.findByMd5sum(checkSum);
  let existImage = null;
  if (!!existImages && existImages.length) {
    const userIdStr = !!userId ? userId.toString() : undefined;
    existImage = _.find(existImages, (img) => img.ownerId === userIdStr);
    if (existImage)
      return {
        image: existImage,
        CDNBase: config.CDNBase,
        redirectUrl: `${config.CDNBase}${existImage.remoteKey}`
      };
    doUpload = false;
    existImage = existImages[0];
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